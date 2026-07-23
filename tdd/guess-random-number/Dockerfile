FROM php:8.4

RUN apt-get update && apt-get install -y --no-install-recommends git unzip libzip-dev inotify-tools && rm -rf /var/lib/apt/lists/* && \
    pecl install -o -f xdebug && docker-php-ext-enable xdebug && \
    docker-php-ext-install zip && \
    curl https://getcomposer.org/composer.phar -o /usr/bin/composer && chmod +x /usr/bin/composer

WORKDIR /srv/workshop-ipc26-munich/tdd/guess-random-number

CMD ["sh", "-c", "composer install --no-interaction && composer test"]
