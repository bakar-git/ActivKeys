#!/bin/bash

# Define colors for output

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Log function
log() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')] $1${NC}"
}

error() {
    echo -e "${RED}[$(date '+%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
    exit 1
}

warning() {
    echo -e "${YELLOW}[$(date '+%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

# Define project directory - replace with your actual path
PROJECT_DIR="/home/ankasky/public_html/activkeys.ankasky.com"

# Navigate to project directory
log "Changing to project directory: $PROJECT_DIR"
cd $PROJECT_DIR || error "Could not change to project directory"

# Pull latest changes from the repository
log "Pulling latest changes from repository..."
git pull origin main || error "Failed to pull from repository"

# Install/update Node.js dependencies
#log "Installing Node.js dependencies..."
npm ci || error "npm clean install failed"

# Install/update Composer dependencies
#log "Installing Composer dependencies..."
composer install --no-dev --optimize-autoloader || error "Composer install failed"

# Build frontend assets
#log "Building frontend assets..."
npm run build || error "Frontend build failed"

# Clear various caches
#log "Clearing and optimizing application caches..."
php artisan filament:optimize-clear || warning "Filament optimize clear failed"
php artisan optimize:clear || warning "Optimize clear failed"

# Run database migrations
#log "Running database migrations..."
# php artisan migrate --force || warning "Database migration failed"

# Create storage symlink if it doesn't exist
#if [ ! -L "public/storage" ]; then
#    log "Creating storage symlink..."
#    php artisan storage:link || warning "Failed to create storage link"
#else
#    log "Storage symlink already exists"
#fi

# Optimize the application
log "Optimizing the application..."
php artisan optimize || warning "Application optimization failed"
php artisan filament:optimize || warning "Filament optimization failed"

# Additional tasks
log "Clearing old logs (keeping last 5 days)..."
find $PROJECT_DIR/storage/logs -name "laravel-*.log" -type f -mtime +5 -delete

# Set proper permissions
#log "Setting proper file permissions..."
#find $PROJECT_DIR -type f -exec chmod 644 {} \;
#find $PROJECT_DIR -type d -exec chmod 755 {} \;
#chmod -R 775 $PROJECT_DIR/storage $PROJECT_DIR/bootstrap/cache

log "Deployment completed successfully!"
