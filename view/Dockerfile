FROM php:7.4-apache

RUN apt-get update

RUN apt-get install -y libonig-dev
RUN docker-php-ext-install pdo_mysql mysqli mbstring

COPY css /var/www/html/css
COPY js /var/www/html/js
COPY *.php /var/www/html/
COPY *.html /var/www/html/

RUN echo '\
log_errors = On\n\
error_log = /dev/stderr\n\
error_reporting = E_ALL\n\
' >> /usr/local/etc/php/php.ini
