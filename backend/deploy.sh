#!/bin/bash

# Terminal 404 - Backend Deployment Script
# Enhanced Security Python Backend

set -e  # Exit on error

echo "🚀 Terminal 404 - Backend Deployment Script"
echo "=============================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Check if Python 3 is installed
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python 3 is not installed. Please install Python 3.8 or higher.${NC}"
    exit 1
fi

PYTHON_VERSION=$(python3 --version | cut -d' ' -f2)
echo -e "${GREEN}✅ Python $PYTHON_VERSION detected${NC}"
echo ""

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo -e "${YELLOW}📦 Creating virtual environment...${NC}"
    python3 -m venv venv
    echo -e "${GREEN}✅ Virtual environment created${NC}"
else
    echo -e "${CYAN}ℹ️  Virtual environment already exists${NC}"
fi
echo ""

# Activate virtual environment
echo -e "${YELLOW}🔌 Activating virtual environment...${NC}"
source venv/bin/activate

# Upgrade pip
echo -e "${YELLOW}⬆️  Upgrading pip...${NC}"
pip install --upgrade pip --quiet
echo -e "${GREEN}✅ pip upgraded${NC}"
echo ""

# Install dependencies
echo -e "${YELLOW}📥 Installing dependencies...${NC}"
pip install -r requirements.txt --quiet
echo -e "${GREEN}✅ Dependencies installed${NC}"
echo ""

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚙️  Creating .env file from template...${NC}"
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo -e "${GREEN}✅ .env file created${NC}"
        echo -e "${YELLOW}⚠️  Please edit .env file and add your credentials:${NC}"
        echo -e "${CYAN}   - SMTP_PASS (required)${NC}"
        echo -e "${CYAN}   - IP_HASH_SALT (recommended)${NC}"
        echo -e "${CYAN}   - ALLOWED_ORIGINS (for production)${NC}"
        echo ""
        read -p "Press enter to continue after editing .env file..."
    else
        echo -e "${RED}❌ .env.example not found. Please create .env manually.${NC}"
        exit 1
    fi
else
    echo -e "${CYAN}ℹ️  .env file already exists${NC}"
fi
echo ""

# Validate .env configuration
echo -e "${YELLOW}🔍 Validating configuration...${NC}"

if ! grep -q "SMTP_PASS=" .env || grep -q "SMTP_PASS=$" .env || grep -q "SMTP_PASS=your_app_specific_password_here" .env; then
    echo -e "${RED}❌ SMTP_PASS is not configured in .env${NC}"
    echo -e "${YELLOW}⚠️  Email functionality will not work without SMTP password${NC}"
    echo ""
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    echo -e "${GREEN}✅ SMTP_PASS configured${NC}"
fi

if grep -q "FLASK_DEBUG=True" .env; then
    echo -e "${YELLOW}⚠️  WARNING: FLASK_DEBUG is set to True${NC}"
    echo -e "${YELLOW}   This should be False in production!${NC}"
fi

echo -e "${GREEN}✅ Configuration validated${NC}"
echo ""

# Create log files if they don't exist
echo -e "${YELLOW}📝 Setting up log files...${NC}"
touch security.log
touch security_events.log
chmod 644 security.log security_events.log
echo -e "${GREEN}✅ Log files ready${NC}"
echo ""

# Display deployment options
echo -e "${CYAN}=============================================="
echo -e "Choose deployment mode:${NC}"
echo ""
echo "1) Development Mode (Flask built-in server)"
echo "2) Production Mode (Gunicorn - 4 workers)"
echo "3) Production Mode (Gunicorn - custom workers)"
echo "4) Test Connection"
echo "5) Exit"
echo ""
read -p "Select option (1-5): " -n 1 -r
echo
echo ""

case $REPLY in
    1)
        echo -e "${CYAN}🚀 Starting in Development Mode...${NC}"
        echo -e "${YELLOW}⚠️  NOT recommended for production use${NC}"
        echo ""
        python3 app.py
        ;;
    2)
        echo -e "${CYAN}🚀 Starting in Production Mode (4 workers)...${NC}"
        echo -e "${GREEN}✅ Using Gunicorn with 4 workers${NC}"
        echo ""
        gunicorn -w 4 \
                 -b 0.0.0.0:5001 \
                 --timeout 30 \
                 --access-logfile - \
                 --error-logfile - \
                 app:app
        ;;
    3)
        echo -e "${CYAN}🚀 Starting in Production Mode (custom)...${NC}"
        read -p "Number of workers (recommended: 2-4): " workers
        read -p "Port (default 5001): " port
        port=${port:-5001}
        echo ""
        echo -e "${GREEN}✅ Starting with $workers workers on port $port${NC}"
        echo ""
        gunicorn -w $workers \
                 -b 0.0.0.0:$port \
                 --timeout 30 \
                 --access-logfile - \
                 --error-logfile - \
                 app:app
        ;;
    4)
        echo -e "${CYAN}🧪 Testing connection...${NC}"
        echo ""
        python3 -c "
import os
from dotenv import load_dotenv
load_dotenv()

print('Configuration Test:')
print('=' * 50)
print(f'SMTP_SERVER: {os.getenv(\"SMTP_SERVER\")}')
print(f'SMTP_PORT: {os.getenv(\"SMTP_PORT\")}')
print(f'SMTP_USER: {os.getenv(\"SMTP_USER\")}')
print(f'SMTP_PASS: {\"✅ Configured\" if os.getenv(\"SMTP_PASS\") else \"❌ Not configured\"}')
print(f'FLASK_DEBUG: {os.getenv(\"FLASK_DEBUG\", \"False\")}')
print(f'ALLOWED_ORIGINS: {os.getenv(\"ALLOWED_ORIGINS\", \"*\")}')
print('=' * 50)
"
        echo ""
        echo -e "${GREEN}✅ Configuration test complete${NC}"
        ;;
    5)
        echo -e "${CYAN}👋 Exiting...${NC}"
        exit 0
        ;;
    *)
        echo -e "${RED}❌ Invalid option${NC}"
        exit 1
        ;;
esac
