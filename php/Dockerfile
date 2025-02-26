# Use the official PHP image as the base
FROM php:8.1-fpm

# Install dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    unzip \
    git \
    bash \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd zip pdo pdo_mysql

# Set working directory
WORKDIR /var/www

# Copy the composer.json and composer.lock files to the container
COPY composer.json composer.lock ./

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Copy the rest of the application files
COPY . .

# Set proper permissions for the application files
RUN chown -R www-data:www-data /var/www

# Expose port 80
EXPOSE 80

# Run the PHP built-in server for production (or you can configure with Nginx)
CMD ["php-fpm"]
