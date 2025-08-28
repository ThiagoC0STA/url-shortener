#!/bin/bash

echo "🚀 Deploying URL Shortener..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

print_status "Building Docker image..."
docker build -t url-shortener .

if [ $? -ne 0 ]; then
    print_error "Failed to build Docker image"
    exit 1
fi

print_status "Starting services with Docker Compose..."
docker-compose up -d

if [ $? -ne 0 ]; then
    print_error "Failed to start services"
    exit 1
fi

print_status "Waiting for services to be ready..."
sleep 10

# Check if the app is running
if curl -f http://localhost:3000/api/urls &> /dev/null; then
    print_status "✅ URL Shortener is running successfully!"
    echo ""
    echo "🌐 Access your application at: http://localhost:3000"
    echo "📊 API endpoint: http://localhost:3000/api/shorten"
    echo ""
    echo "📋 Useful commands:"
    echo "  - View logs: docker-compose logs -f"
    echo "  - Stop services: docker-compose down"
    echo "  - Restart services: docker-compose restart"
    echo "  - View running containers: docker-compose ps"
else
    print_warning "Application might still be starting up. Please wait a moment and check http://localhost:3000"
fi

echo ""
print_status "Deployment completed!"
