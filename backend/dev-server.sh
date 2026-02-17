#!/bin/bash

# Terminal 404 - PHP Development Server
# This script starts a PHP development server for testing

echo "🚀 Starting Terminal 404 PHP Development Server..."
echo "📍 Server will run on http://localhost:8000"
echo "⚡ Press Ctrl+C to stop"
echo ""

# Navigate to the backend directory
cd "$(dirname "$0")"

# Start PHP built-in server
php -S localhost:8000 -t .

echo ""
echo "✅ Server stopped"
