"""
Terminal 404 - Secure Backend API
Python Flask Backend with Enhanced Security Features
Version: 4.0.0
"""

import os
import re
import logging
import smtplib
import secrets
import hashlib
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime, timedelta
from functools import wraps
from collections import defaultdict
from typing import Dict, Any

from flask import Flask, request, jsonify, abort
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_cors import CORS
from werkzeug.exceptions import HTTPException
import bleach

# ==================== SECURITY CONFIGURATION ====================

# Secure Logging Configuration
logging.basicConfig(
    filename='security.log',
    level=logging.INFO,
    format='%(asctime)s | [%(levelname)s] | IP:%(remote_addr)s | %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)

# Separate logger for security events
security_logger = logging.getLogger('security')
security_handler = logging.FileHandler('security_events.log')
security_handler.setLevel(logging.WARNING)
security_formatter = logging.Formatter(
    '%(asctime)s | [SECURITY] | %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
security_handler.setFormatter(security_formatter)
security_logger.addHandler(security_handler)

# ==================== FLASK APP INITIALIZATION ====================

app = Flask(__name__)

# Security Headers Configuration
@app.after_request
def set_security_headers(response):
    """Add comprehensive security headers to all responses"""
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'DENY'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    response.headers['Content-Security-Policy'] = "default-src 'self'"
    response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    response.headers['Permissions-Policy'] = 'geolocation=(), microphone=(), camera=()'
    return response

# CORS Configuration with Restrictions
CORS(app, resources={
    r"/api/*": {
        "origins": os.getenv('ALLOWED_ORIGINS', '*').split(','),
        "methods": ["POST", "OPTIONS"],
        "allow_headers": ["Content-Type"],
        "max_age": 3600
    }
})

# Advanced Rate Limiting with Multiple Strategies
limiter = Limiter(
    key_func=get_remote_address,
    app=app,
    default_limits=["100 per day", "30 per hour"],
    storage_uri="memory://",
    strategy="fixed-window",
    headers_enabled=True,
    swallow_errors=False
)

# ==================== EMAIL CONFIGURATION ====================

SMTP_SERVER = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
SMTP_PORT = int(os.getenv('SMTP_PORT', 587))
SMTP_USER = os.getenv('SMTP_USER', 'terminallocal404@gmail.com')
SMTP_PASS = os.getenv('SMTP_PASS', '')  # MUST be set via environment variable
ADMIN_EMAIL = os.getenv('ADMIN_EMAIL', SMTP_USER)

# ==================== SECURITY UTILITIES ====================

# IP Blacklist Management
ip_blacklist = set()
failed_attempts: Dict[str, list] = defaultdict(list)
MAX_FAILED_ATTEMPTS = 5
BLACKLIST_DURATION = timedelta(hours=1)

class SecurityValidator:
    """Comprehensive security validation utilities"""
    
    @staticmethod
    def validate_email(email: str) -> bool:
        """Validate email format with strict regex"""
        if not email or len(email) > 254:
            return False
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return bool(re.match(pattern, email))
    
    @staticmethod
    def sanitize_input(text: str, max_length: int = 1000) -> str:
        """Sanitize and clean user input"""
        if not text:
            return ""
        
        # Truncate to max length
        text = text[:max_length]
        
        # Remove potentially dangerous HTML/scripts
        text = bleach.clean(
            text,
            tags=[],
            attributes={},
            strip=True
        )
        
        # Remove control characters except newlines and tabs
        text = ''.join(char for char in text if ord(char) >= 32 or char in '\n\t')
        
        return text.strip()
    
    @staticmethod
    def validate_string_field(value: str, min_len: int = 2, max_len: int = 500) -> bool:
        """Validate string field constraints"""
        if not value or not isinstance(value, str):
            return False
        value = value.strip()
        return min_len <= len(value) <= max_len
    
    @staticmethod
    def generate_request_token() -> str:
        """Generate secure random token for request tracking"""
        return secrets.token_urlsafe(32)
    
    @staticmethod
    def hash_ip(ip: str) -> str:
        """Hash IP address for privacy-compliant logging"""
        salt = os.getenv('IP_HASH_SALT', 'terminal404_default_salt')
        return hashlib.sha256(f"{ip}{salt}".encode()).hexdigest()[:16]

def check_ip_blacklist(f):
    """Decorator to check if IP is blacklisted"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        client_ip = get_remote_address()
        
        if client_ip in ip_blacklist:
            security_logger.warning(f"Blocked request from blacklisted IP: {client_ip}")
            abort(403, description="Access forbidden")
        
        return f(*args, **kwargs)
    return decorated_function

def track_failed_attempt(ip: str):
    """Track failed attempts and blacklist if threshold exceeded"""
    now = datetime.now()
    failed_attempts[ip].append(now)
    
    # Remove old attempts
    failed_attempts[ip] = [
        attempt for attempt in failed_attempts[ip]
        if now - attempt < BLACKLIST_DURATION
    ]
    
    # Blacklist if too many failures
    if len(failed_attempts[ip]) >= MAX_FAILED_ATTEMPTS:
        ip_blacklist.add(ip)
        security_logger.warning(f"IP {ip} blacklisted due to {len(failed_attempts[ip])} failed attempts")
        return True
    
    return False

# ==================== REQUEST VALIDATION ====================

def validate_access_log_request(data: Dict[str, Any]) -> tuple:
    """
    Validate access log request data
    Returns: (is_valid, error_message, sanitized_data)
    """
    validator = SecurityValidator()
    
    # Check if data exists
    if not data:
        return False, "Invalid or missing JSON data", None
    
    # Extract and validate fields
    name = data.get('name', '').strip()
    message = data.get('message', '').strip()
    
    # Validate name
    if not validator.validate_string_field(name, min_len=2, max_len=100):
        return False, "Name must be between 2 and 100 characters", None
    
    # Validate message
    if not validator.validate_string_field(message, min_len=10, max_len=2000):
        return False, "Message must be between 10 and 2000 characters", None
    
    # Sanitize inputs
    sanitized_data = {
        'name': validator.sanitize_input(name, max_length=100),
        'message': validator.sanitize_input(message, max_length=2000)
    }
    
    # Additional validation: check for spam patterns
    spam_patterns = [
        r'(https?://)',  # URLs
        r'(\b[A-Z]{10,}\b)',  # Excessive caps
        r'(.)\1{10,}',  # Repeated characters
    ]
    
    for pattern in spam_patterns:
        if re.search(pattern, sanitized_data['message'], re.IGNORECASE):
            return False, "Message contains suspicious patterns", None
    
    return True, None, sanitized_data

# ==================== EMAIL FUNCTIONALITY ====================

def send_secure_email(recipient: str, subject: str, body_html: str) -> bool:
    """Send email with error handling and security checks"""
    
    # Validate SMTP configuration
    if not SMTP_PASS:
        app.logger.warning("SMTP password not configured. Skipping email send. (Set SMTP_PASS environment variable)")
        return False
    
    try:
        msg = MIMEMultipart('alternative')
        msg['From'] = SMTP_USER
        msg['To'] = recipient
        msg['Subject'] = subject
        msg['X-Mailer'] = 'Terminal404-SecureMailer/4.0'
        
        # Add email body
        msg.attach(MIMEText(body_html, 'html', 'utf-8'))
        
        # Send email with timeout
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT, timeout=10) as server:
            server.set_debuglevel(0)
            server.starttls()
            server.login(SMTP_USER, SMTP_PASS)
            server.send_message(msg)
        
        return True
        
    except smtplib.SMTPAuthenticationError:
        app.logger.error("SMTP authentication failed. If using Gmail, ensure you are using an 'App Password', not your account password.")
        return False
    except smtplib.SMTPException as e:
        app.logger.error(f"SMTP error: {str(e)}")
        return False
    except Exception as e:
        app.logger.error(f"Email sending error: {str(e)}")
        return False

# ==================== API ENDPOINTS ====================

@app.before_request
def log_request():
    """Log all incoming requests for security monitoring"""
    if request.path.startswith('/api/'):
        client_ip = get_remote_address()
        hashed_ip = SecurityValidator.hash_ip(client_ip)
        app.logger.info(
            f"Request: {request.method} {request.path} | "
            f"IP_Hash: {hashed_ip} | "
            f"User-Agent: {request.headers.get('User-Agent', 'Unknown')}"
        )

@app.route('/api/health', methods=['GET'])
@limiter.limit("10 per minute")
def health_check():
    """Health check endpoint for monitoring"""
    return jsonify({
        "status": "healthy",
        "version": "4.0.0",
        "timestamp": datetime.now().isoformat()
    }), 200

@app.route('/api/send-access-log', methods=['POST'])
@limiter.limit("3 per minute")
@check_ip_blacklist
def send_access_log():
    """
    Secure endpoint for processing access logs
    Implements multiple security layers and validations
    """
    client_ip = get_remote_address()
    request_id = SecurityValidator.generate_request_token()
    
    try:
        # Parse JSON with size limit
        if request.content_length and request.content_length > 10 * 1024:  # 10KB limit
            security_logger.warning(f"Request too large from {client_ip}")
            abort(413, description="Request entity too large")
        
        data = request.get_json(force=False, silent=False)
        
        # Validate request data
        is_valid, error_msg, sanitized_data = validate_access_log_request(data)
        
        if not is_valid:
            track_failed_attempt(client_ip)
            security_logger.warning(
                f"Invalid request from {client_ip}: {error_msg} | Request ID: {request_id}"
            )
            return jsonify({
                "success": False,
                "error": error_msg,
                "request_id": request_id
            }), 400
        
        # Extract sanitized data
        name = sanitized_data['name']
        message = sanitized_data['message']
        
        # Log to file with request ID
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        hashed_ip = SecurityValidator.hash_ip(client_ip)
        
        log_entry = (
            f"[{timestamp}] ACCESS_LOG | "
            f"RequestID: {request_id} | "
            f"IP_Hash: {hashed_ip} | "
            f"User: {name} | "
            f"Message: {message[:100]}..."
        )
        app.logger.info(log_entry)
        
        # Prepare secure email
        email_subject = f"🔐 Terminal 404 - Novo Log de Acesso"
        email_body = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                body {{
                    background-color: #000000;
                    color: #00E5FF;
                    font-family: 'Courier New', monospace;
                    padding: 20px;
                    margin: 0;
                }}
                .container {{
                    max-width: 600px;
                    margin: 0 auto;
                    border: 2px solid #00E5FF;
                    padding: 30px;
                    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
                }}
                .header {{
                    border-bottom: 2px solid #00E5FF;
                    padding-bottom: 15px;
                    margin-bottom: 25px;
                }}
                .field {{
                    background-color: #111;
                    border-left: 3px solid #00E5FF;
                    padding: 12px;
                    margin: 15px 0;
                }}
                .label {{
                    color: #00FF88;
                    font-weight: bold;
                    text-transform: uppercase;
                    font-size: 11px;
                    letter-spacing: 1px;
                }}
                .value {{
                    color: #FFFFFF;
                    margin-top: 5px;
                    word-wrap: break-word;
                }}
                .message-box {{
                    background-color: #0a0a0a;
                    border: 1px solid #00E5FF;
                    padding: 20px;
                    margin: 20px 0;
                    color: #FFFFFF;
                    white-space: pre-wrap;
                    font-family: monospace;
                }}
                .footer {{
                    margin-top: 30px;
                    padding-top: 20px;
                    border-top: 1px dashed #00E5FF;
                    font-size: 10px;
                    color: #666;
                    text-align: center;
                }}
                .security-badge {{
                    display: inline-block;
                    background: #00E5FF;
                    color: #000;
                    padding: 5px 15px;
                    border-radius: 3px;
                    font-weight: bold;
                    font-size: 12px;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1 style="margin:0; color:#00E5FF;">
                        ⚡ TERMINAL 404 - SECURITY LOG
                    </h1>
                    <div style="margin-top:10px;">
                        <span class="security-badge">PYTHON BACKEND v4.0</span>
                    </div>
                </div>
                
                <div class="field">
                    <div class="label">🕒 Timestamp</div>
                    <div class="value">{timestamp}</div>
                </div>
                
                <div class="field">
                    <div class="label">🆔 Request ID</div>
                    <div class="value">{request_id}</div>
                </div>
                
                <div class="field">
                    <div class="label">🌐 IP Hash (Privacy Protected)</div>
                    <div class="value">{hashed_ip}</div>
                </div>
                
                <div class="field">
                    <div class="label">👤 Usuário</div>
                    <div class="value">{name}</div>
                </div>
                
                <div class="field">
                    <div class="label">📝 Mensagem</div>
                    <div class="message-box">{message}</div>
                </div>
                
                <div class="footer">
                    <p>
                        🔒 Terminal 404 Secure Backend API<br>
                        Multi-layer Security System | Rate Limited | Input Sanitized<br>
                        © 2025 Terminal 404 - All Rights Reserved
                    </p>
                </div>
            </div>
        </body>
        </html>
        """
        
        # Send email
        email_sent = send_secure_email(ADMIN_EMAIL, email_subject, email_body)
        
        if not email_sent:
            app.logger.error(f"Failed to send email for request {request_id}")
            # Don't expose email failure to client for security
        
        # Success response
        return jsonify({
            "success": True,
            "message": "Access log processed successfully",
            "request_id": request_id,
            "timestamp": timestamp
        }), 200
        
    except Exception as e:
        # Log error without exposing details
        security_logger.error(
            f"Error processing request {request_id} from {client_ip}: {str(e)}"
        )
        
        return jsonify({
            "success": False,
            "error": "Internal server error",
            "request_id": request_id
        }), 500

# ==================== ERROR HANDLERS ====================

@app.errorhandler(400)
def bad_request(e):
    return jsonify({
        "success": False,
        "error": "Bad request",
        "message": str(e.description)
    }), 400

@app.errorhandler(403)
def forbidden(e):
    return jsonify({
        "success": False,
        "error": "Forbidden",
        "message": "Access denied"
    }), 403

@app.errorhandler(404)
def not_found(e):
    return jsonify({
        "success": False,
        "error": "Not found",
        "message": "Endpoint not found"
    }), 404

@app.errorhandler(413)
def request_too_large(e):
    return jsonify({
        "success": False,
        "error": "Request too large",
        "message": "Request entity too large"
    }), 413

@app.errorhandler(429)
def ratelimit_handler(e):
    return jsonify({
        "success": False,
        "error": "Rate limit exceeded",
        "message": "Too many requests. Please try again later."
    }), 429

@app.errorhandler(500)
def internal_error(e):
    return jsonify({
        "success": False,
        "error": "Internal server error",
        "message": "An unexpected error occurred"
    }), 500

@app.errorhandler(Exception)
def handle_exception(e):
    """Handle unexpected exceptions"""
    if isinstance(e, HTTPException):
        return e
    
    # Log the error
    app.logger.error(f"Unhandled exception: {str(e)}")
    
    return jsonify({
        "success": False,
        "error": "Internal server error"
    }), 500

# ==================== APPLICATION ENTRY POINT ====================

if __name__ == '__main__':
    # Force port 5001 to resolve "Address already in use" on 5000
    # and match vite.config.ts proxy settings
    PORT = int(os.getenv('FLASK_PORT', 5001))
    
    # Check if port is available
    import socket
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    result = sock.connect_ex(('127.0.0.1', PORT))
    if result == 0:
        print(f"\n\033[93m⚠️  WARNING: Port {PORT} is already in use!\033[0m")
        print(f"\033[93m    Please kill the process using port {PORT} or check if another instance is running.\033[0m")
        # Optional: Try next port
        # PORT += 1
        # print(f"\033[92m    Trying port {PORT}...\033[0m")
    sock.close()

    print(f"\n\033[96m🚀 Terminal 404 Backend Starting...\033[0m")
    print(f"\033[96m👉 Server running on: http://0.0.0.0:{PORT}\033[0m")
    print(f"\033[90m   (Press CTRL+C to quit)\033[0m\n")

    # Production configuration
    app.run(
        host=os.getenv('FLASK_HOST', '0.0.0.0'),
        port=PORT,
        debug=os.getenv('FLASK_DEBUG', 'False').lower() == 'true',
        threaded=True
    )
