#!/bin/bash
set -e

echo "[entrypoint] Running database migrations..."
php /app/artisan migrate --force

echo "[entrypoint] Caching config, routes, views..."
php /app/artisan optimize

echo "[entrypoint] Optimizing Filament..."
php /app/artisan filament:optimize

echo "[entrypoint] Starting supervisord..."
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
