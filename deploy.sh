#!/bin/bash
# ============================================
# Data Farm - cPanel Deployment Helper Script
# ============================================
# Usage: bash deploy.sh [frontend|backend|all]

set -e

# Configuration — update these for your server
CPANEL_USER="${CPANEL_USER:-$(whoami)}"
HOME_DIR="/home/$CPANEL_USER"
REPO_DIR="$HOME_DIR/datafarm-website"
FRONTEND_BUILD_DIR="$HOME_DIR/public_html"
BACKEND_DEPLOY_DIR="$HOME_DIR/api.datafarm.co.tz"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_step() { echo -e "${GREEN}[STEP]${NC} $1"; }
print_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
print_error() { echo -e "${RED}[ERROR]${NC} $1"; }

deploy_frontend() {
    print_step "Deploying frontend..."

    cd "$REPO_DIR/frontend"

    # Check for .env
    if [ ! -f .env ]; then
        print_warn "No .env file found. Creating from example..."
        if [ -f .env.example ]; then
            cp .env.example .env
            print_warn "Please edit frontend/.env with your actual REACT_APP_BACKEND_URL"
            print_warn "Then re-run this script."
            exit 1
        else
            print_error "No .env.example found either. Please create frontend/.env manually."
            exit 1
        fi
    fi

    # Install dependencies
    print_step "Installing frontend dependencies..."
    if command -v yarn &> /dev/null; then
        yarn install --frozen-lockfile 2>/dev/null || yarn install
    else
        npm install
    fi

    # Build
    print_step "Building React app..."
    if command -v yarn &> /dev/null; then
        yarn build
    else
        npm run build
    fi

    # Deploy to public_html
    print_step "Copying build to $FRONTEND_BUILD_DIR..."
    mkdir -p "$FRONTEND_BUILD_DIR"

    # Preserve .well-known directory (used for SSL validation)
    if [ -d "$FRONTEND_BUILD_DIR/.well-known" ]; then
        cp -r "$FRONTEND_BUILD_DIR/.well-known" /tmp/.well-known-backup
    fi

    rm -rf "$FRONTEND_BUILD_DIR"/*

    if [ -d /tmp/.well-known-backup ]; then
        mv /tmp/.well-known-backup "$FRONTEND_BUILD_DIR/.well-known"
    fi

    cp -r build/* "$FRONTEND_BUILD_DIR/"

    # Ensure .htaccess is present
    if [ -f public/.htaccess ]; then
        cp public/.htaccess "$FRONTEND_BUILD_DIR/.htaccess"
    fi

    print_step "Frontend deployed successfully!"
}

deploy_backend() {
    print_step "Deploying backend..."

    mkdir -p "$BACKEND_DEPLOY_DIR"

    # Copy backend files
    print_step "Copying backend files to $BACKEND_DEPLOY_DIR..."
    cp "$REPO_DIR/backend/server.py" "$BACKEND_DEPLOY_DIR/"
    cp "$REPO_DIR/backend/passenger_wsgi.py" "$BACKEND_DEPLOY_DIR/"
    cp "$REPO_DIR/backend/requirements.txt" "$BACKEND_DEPLOY_DIR/"

    # Check for .env
    if [ ! -f "$BACKEND_DEPLOY_DIR/.env" ]; then
        print_warn "No backend .env found. Creating from example..."
        if [ -f "$REPO_DIR/backend/.env.example" ]; then
            cp "$REPO_DIR/backend/.env.example" "$BACKEND_DEPLOY_DIR/.env"
            print_warn "Please edit $BACKEND_DEPLOY_DIR/.env with your actual credentials."
            print_warn "Then restart the Python app in cPanel."
        else
            print_error "No .env.example found. Please create $BACKEND_DEPLOY_DIR/.env manually."
            exit 1
        fi
    fi

    print_step "Backend files deployed!"
    print_step "Remember to:"
    echo "  1. Install dependencies in your Python virtual environment:"
    echo "     pip install -r $BACKEND_DEPLOY_DIR/requirements.txt"
    echo "  2. Restart the Python App in cPanel → Setup Python App"
}

pull_latest() {
    print_step "Pulling latest code from GitHub..."
    cd "$REPO_DIR"
    git pull origin main
}

# Main
case "${1:-all}" in
    frontend)
        pull_latest
        deploy_frontend
        ;;
    backend)
        pull_latest
        deploy_backend
        ;;
    all)
        pull_latest
        deploy_backend
        deploy_frontend
        ;;
    *)
        echo "Usage: bash deploy.sh [frontend|backend|all]"
        exit 1
        ;;
esac

echo ""
print_step "Deployment complete!"
echo "  Frontend: https://datafarm.co.tz"
echo "  Backend:  https://api.datafarm.co.tz/api/"
