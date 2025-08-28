#!/bin/bash

echo "🚀 Deploying URL Shortener to Vercel..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

print_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# Check if git is installed
if ! command -v git &> /dev/null; then
    print_error "Git is not installed. Please install Git first."
    exit 1
fi

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    print_error "This is not a git repository. Please initialize git first."
    exit 1
fi

# Check if we have uncommitted changes
if ! git diff-index --quiet HEAD --; then
    print_warning "You have uncommitted changes. Please commit them first:"
    echo "  git add ."
    echo "  git commit -m 'Your commit message'"
    exit 1
fi

print_step "1. Building the project..."
npm run build

if [ $? -ne 0 ]; then
    print_error "Build failed. Please fix the errors and try again."
    exit 1
fi

print_step "2. Checking git status..."
git status --porcelain

print_step "3. Adding all files..."
git add .

print_step "4. Committing changes..."
git commit -m "🚀 Deploy URL Shortener Professional Edition"

print_step "5. Pushing to GitHub..."
git push origin main

if [ $? -ne 0 ]; then
    print_error "Failed to push to GitHub. Please check your remote configuration."
    exit 1
fi

print_status "✅ Code pushed to GitHub successfully!"
echo ""
echo "🌐 Next steps:"
echo "1. Go to https://vercel.com"
echo "2. Click 'New Project'"
echo "3. Import your GitHub repository"
echo "4. Set environment variables:"
echo "   - NEXT_PUBLIC_APP_URL=https://your-project.vercel.app"
echo "   - DATABASE_URL=your-database-url"
echo "5. Deploy!"
echo ""
echo "📱 Your URLs will work with your real domain instead of localhost!"
echo ""
print_status "Deploy script completed!"
