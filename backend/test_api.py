#!/usr/bin/env python3
"""
Terminal 404 - Backend API Testing Suite
Testes de funcionalidade e segurança
"""

import sys
import json
import time
from datetime import datetime

try:
    import requests
except ImportError:
    print("❌ requests library not found. Installing...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "requests"])
    import requests

# Configuration
API_BASE_URL = "http://localhost:5000"
COLORS = {
    'green': '\033[92m',
    'red': '\033[91m',
    'yellow': '\033[93m',
    'blue': '\033[94m',
    'cyan': '\033[96m',
    'reset': '\033[0m'
}

def print_colored(text, color='reset'):
    """Print colored text"""
    print(f"{COLORS.get(color, '')}{text}{COLORS['reset']}")

def print_header(text):
    """Print section header"""
    print("\n" + "=" * 60)
    print_colored(f"  {text}", 'cyan')
    print("=" * 60)

def print_test(name, passed, details=""):
    """Print test result"""
    status = f"{COLORS['green']}✅ PASS{COLORS['reset']}" if passed else f"{COLORS['red']}❌ FAIL{COLORS['reset']}"
    print(f"{status} - {name}")
    if details:
        print(f"       {details}")

class APITester:
    def __init__(self, base_url):
        self.base_url = base_url
        self.passed_tests = 0
        self.failed_tests = 0
        self.total_tests = 0

    def test_health_check(self):
        """Test health check endpoint"""
        print_header("Testing Health Check")
        
        try:
            response = requests.get(f"{self.base_url}/api/health", timeout=5)
            
            # Test 1: Status Code
            self.total_tests += 1
            passed = response.status_code == 200
            if passed:
                self.passed_tests += 1
            print_test("Health endpoint returns 200", passed)
            
            # Test 2: Response is JSON
            self.total_tests += 1
            try:
                data = response.json()
                passed = True
                self.passed_tests += 1
            except:
                passed = False
            print_test("Health endpoint returns valid JSON", passed)
            
            # Test 3: Has required fields
            self.total_tests += 1
            if passed:
                has_fields = all(key in data for key in ['status', 'version', 'timestamp'])
                if has_fields:
                    self.passed_tests += 1
                print_test("Health response has required fields", has_fields, 
                          f"Fields: {list(data.keys())}")
            
            # Test 4: Security Headers
            self.total_tests += 1
            headers_to_check = [
                'X-Content-Type-Options',
                'X-Frame-Options',
                'X-XSS-Protection',
                'Strict-Transport-Security'
            ]
            has_headers = all(header in response.headers for header in headers_to_check)
            if has_headers:
                self.passed_tests += 1
            print_test("Security headers present", has_headers,
                      f"Found {sum(1 for h in headers_to_check if h in response.headers)}/{len(headers_to_check)}")
            
        except requests.exceptions.ConnectionError:
            print_colored("❌ Cannot connect to server. Is it running?", 'red')
            self.failed_tests += 4
            self.total_tests += 4
        except Exception as e:
            print_colored(f"❌ Error: {str(e)}", 'red')
            self.failed_tests += 4
            self.total_tests += 4

    def test_access_log_valid(self):
        """Test access log endpoint with valid data"""
        print_header("Testing Access Log - Valid Data")
        
        payload = {
            "name": "Test User",
            "message": "This is a test message from the automated test suite."
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/send-access-log",
                json=payload,
                timeout=10
            )
            
            # Test 1: Status Code
            self.total_tests += 1
            passed = response.status_code == 200
            if passed:
                self.passed_tests += 1
            print_test("Valid request returns 200", passed, 
                      f"Status: {response.status_code}")
            
            # Test 2: Response structure
            self.total_tests += 1
            try:
                data = response.json()
                has_success = 'success' in data and data['success'] == True
                if has_success:
                    self.passed_tests += 1
                print_test("Response indicates success", has_success,
                          f"Response: {json.dumps(data, indent=2)}")
            except:
                print_test("Response indicates success", False, "Invalid JSON response")
            
        except Exception as e:
            print_colored(f"❌ Error: {str(e)}", 'red')
            self.failed_tests += 2
            self.total_tests += 2

    def test_access_log_invalid(self):
        """Test access log endpoint with invalid data"""
        print_header("Testing Access Log - Invalid Data")
        
        test_cases = [
            {
                "name": "Empty name",
                "payload": {"name": "", "message": "Valid message here"},
                "expected_status": 400
            },
            {
                "name": "Empty message",
                "payload": {"name": "Valid Name", "message": ""},
                "expected_status": 400
            },
            {
                "name": "Short message",
                "payload": {"name": "Valid Name", "message": "Short"},
                "expected_status": 400
            },
            {
                "name": "Missing name field",
                "payload": {"message": "Valid message here"},
                "expected_status": 400
            },
            {
                "name": "Missing message field",
                "payload": {"name": "Valid Name"},
                "expected_status": 400
            },
            {
                "name": "Message with URL",
                "payload": {"name": "Valid Name", "message": "Check this out http://malicious.com"},
                "expected_status": 400
            }
        ]
        
        for test_case in test_cases:
            try:
                response = requests.post(
                    f"{self.base_url}/api/send-access-log",
                    json=test_case["payload"],
                    timeout=5
                )
                
                self.total_tests += 1
                passed = response.status_code == test_case["expected_status"]
                if passed:
                    self.passed_tests += 1
                else:
                    self.failed_tests += 1
                
                print_test(
                    test_case["name"],
                    passed,
                    f"Expected {test_case['expected_status']}, got {response.status_code}"
                )
                
                # Small delay to avoid rate limiting during tests
                time.sleep(0.5)
                
            except Exception as e:
                self.total_tests += 1
                self.failed_tests += 1
                print_test(test_case["name"], False, f"Error: {str(e)}")

    def test_rate_limiting(self):
        """Test rate limiting"""
        print_header("Testing Rate Limiting")
        
        print_colored("⚠️  This will make 5 rapid requests to test rate limiting...", 'yellow')
        
        payload = {
            "name": "Rate Limit Test",
            "message": "Testing rate limiting functionality of the API"
        }
        
        responses = []
        for i in range(5):
            try:
                response = requests.post(
                    f"{self.base_url}/api/send-access-log",
                    json=payload,
                    timeout=5
                )
                responses.append(response.status_code)
                time.sleep(0.2)  # Small delay between requests
            except Exception as e:
                responses.append(None)
        
        self.total_tests += 1
        # At least one should be rate limited (429) if rate limiting works
        has_rate_limit = 429 in responses
        if has_rate_limit:
            self.passed_tests += 1
        
        print_test(
            "Rate limiting is active",
            has_rate_limit,
            f"Responses: {responses}"
        )
        
        if has_rate_limit:
            print_colored("   ℹ️  Rate limiting is working correctly!", 'green')
        else:
            print_colored("   ⚠️  Rate limiting may not be configured properly", 'yellow')

    def test_error_handling(self):
        """Test error handling"""
        print_header("Testing Error Handling")
        
        # Test 1: Invalid JSON
        try:
            response = requests.post(
                f"{self.base_url}/api/send-access-log",
                data="invalid json",
                headers={"Content-Type": "application/json"},
                timeout=5
            )
            
            self.total_tests += 1
            passed = response.status_code in [400, 500]
            if passed:
                self.passed_tests += 1
            print_test("Invalid JSON handled", passed, 
                      f"Status: {response.status_code}")
        except Exception as e:
            self.total_tests += 1
            self.failed_tests += 1
            print_test("Invalid JSON handled", False, f"Error: {str(e)}")
        
        # Test 2: Wrong endpoint
        try:
            response = requests.get(f"{self.base_url}/api/nonexistent", timeout=5)
            
            self.total_tests += 1
            passed = response.status_code == 404
            if passed:
                self.passed_tests += 1
            print_test("Non-existent endpoint returns 404", passed,
                      f"Status: {response.status_code}")
        except Exception as e:
            self.total_tests += 1
            self.failed_tests += 1
            print_test("Non-existent endpoint returns 404", False, f"Error: {str(e)}")

    def run_all_tests(self):
        """Run all tests"""
        start_time = time.time()
        
        print_colored("\n" + "=" * 60, 'cyan')
        print_colored("  Terminal 404 - Backend API Test Suite", 'cyan')
        print_colored("=" * 60, 'cyan')
        print(f"Testing API at: {self.base_url}")
        print(f"Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        
        # Run all test suites
        self.test_health_check()
        self.test_access_log_valid()
        self.test_access_log_invalid()
        self.test_error_handling()
        self.test_rate_limiting()
        
        # Calculate results
        elapsed_time = time.time() - start_time
        self.failed_tests = self.total_tests - self.passed_tests
        
        # Print summary
        print_header("Test Summary")
        print(f"Total Tests:  {self.total_tests}")
        print_colored(f"Passed:       {self.passed_tests} ✅", 'green')
        if self.failed_tests > 0:
            print_colored(f"Failed:       {self.failed_tests} ❌", 'red')
        else:
            print_colored(f"Failed:       {self.failed_tests}", 'green')
        print(f"Success Rate: {(self.passed_tests/self.total_tests*100):.1f}%")
        print(f"Elapsed Time: {elapsed_time:.2f}s")
        
        print("\n" + "=" * 60 + "\n")
        
        if self.failed_tests == 0:
            print_colored("🎉 All tests passed! Backend is working correctly.", 'green')
            return 0
        else:
            print_colored(f"⚠️  {self.failed_tests} test(s) failed. Please review the results above.", 'yellow')
            return 1

if __name__ == "__main__":
    tester = APITester(API_BASE_URL)
    exit_code = tester.run_all_tests()
    sys.exit(exit_code)
