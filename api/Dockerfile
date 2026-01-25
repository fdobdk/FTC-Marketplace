FROM php:8.2-cli

# Install PDO MySQL extension
RUN docker-php-ext-install pdo pdo_mysql mysqli

# Set working directory
WORKDIR /app

# Copy application files
COPY . .

# Expose port (Railway sets PORT env var)
EXPOSE 8080

# Use shell form to ensure environment variables are expanded
CMD ["sh", "-c", "php -S 0.0.0.0:${PORT:-8080} router.php"]
