FROM dunglas/frankenphp:1-php8.4

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    supervisor \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js 20.x
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN install-php-extensions \
    pdo_pgsql \
    pgsql \
    gd \
    intl \
    zip \
    opcache \
    redis \
    pcntl \
    exif \
    bcmath

# Enable PHP production settings
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

# Set working directory
WORKDIR /app

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy dependency manifests first (these change less frequently)
COPY composer.json composer.lock ./
COPY package.json package-lock.json ./

# Install PHP dependencies (cached until composer.json/lock changes)
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist

# Install Node dependencies (cached until package.json/lock changes)
RUN npm ci

# Copy application files AFTER dependencies are installed
# This ensures code changes don't invalidate dependency installation cache
COPY . .

# Generate optimized autoloader
RUN composer dump-autoload --optimize --no-dev

# Build frontend assets (client + SSR) - now PHP is available for Wayfinder
RUN npm run build:ssr

# Create storage directories and symlink
RUN mkdir -p storage/app/public storage/framework/{cache,sessions,views} storage/logs
RUN php artisan storage:link

# Create supervisor log directory
RUN mkdir -p /var/log/supervisor

# Create Worker script for FrankenPHP
RUN php artisan octane:install --server=frankenphp

# Set permissions (include public for frankenphp-worker.php)
RUN chown -R www-data:www-data /app/storage /app/bootstrap/cache /app/public
RUN chmod -R 775 /app/storage /app/bootstrap/cache /app/public

# Copy supervisor configuration
COPY deployment/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Copy entrypoint
COPY deployment/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose ports
EXPOSE 8000

# Run migrations, optimize, filament:optimize, then start supervisor
CMD ["/entrypoint.sh"]
