FROM php:8.2-cli

# Install PDO MySQL extension
RUN docker-php-ext-install pdo pdo_mysql mysqli

# Set working directory
WORKDIR /app

# Copy application files
COPY . .

# Expose port (Railway sets PORT env var)
EXPOSE 8080

# Start PHP built-in server
CMD php -S 0.0.0.0:${PORT:-8080} router.php
