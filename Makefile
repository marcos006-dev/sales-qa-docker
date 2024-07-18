# Makefile para ejecutar un proyecto Laravel con Sail

# Variables
APP_NAME = php

# Desarrollo
dev_install:
	docker-compose -f docker-compose.dev.yml up -d --build

dev_install_no_cache:
	docker-compose -f docker-compose.dev.yml build --no-cache
	docker-compose -f docker-compose.dev.yml up -d --force-recreate

dev_setup:
	docker-compose -f docker-compose.dev.yml exec phpmyadmin chmod 777 /sessions
	docker-compose -f docker-compose.dev.yml exec $(APP_NAME) bash -c "chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache && chmod -R 775 /var/www/storage /var/www/bootstrap/cache"
	docker-compose -f docker-compose.dev.yml exec $(APP_NAME) composer install
	docker-compose -f docker-compose.dev.yml exec $(APP_NAME) npm install
	docker-compose -f docker-compose.dev.yml exec $(APP_NAME) php artisan key:generate
	docker-compose -f docker-compose.dev.yml exec $(APP_NAME) php artisan storage:link

dev_migration:
	docker-compose -f docker-compose.dev.yml exec $(APP_NAME) php artisan migrate:fresh --seed
	docker-compose -f docker-compose.dev.yml exec $(APP_NAME) php artisan create:modules-permissions

dev_vite:
	docker-compose -f docker-compose.dev.yml exec $(APP_NAME) npm run dev --watch

dev_migrate:
	docker-compose -f docker-compose.dev.yml exec $(APP_NAME) php artisan migrate

dev_clear:
	docker-compose -f docker-compose.dev.yml down

# Producción

prod_install:
	docker-compose -f docker-compose.prod.yml up -d --build

prod_setup:
	docker-compose -f docker-compose.prod.yml exec $(APP_NAME) bash -c "chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache && chmod -R 775 /var/www/storage /var/www/bootstrap/cache"
	docker-compose -f docker-compose.prod.yml exec $(APP_NAME) composer install --no-dev
	docker-compose -f docker-compose.prod.yml exec $(APP_NAME) npm install
	docker-compose -f docker-compose.dev.yml exec $(APP_NAME) php artisan key:generate
	docker-compose -f docker-compose.dev.yml exec $(APP_NAME) php artisan storage:link

prod_migration:
	docker-compose -f docker-compose.prod.yml exec $(APP_NAME) php artisan migrate:fresh --seed
	docker-compose -f docker-compose.prod.yml exec $(APP_NAME) php artisan create:modules-permissions

prod_clear:
	docker-compose -f docker-compose.prod.yml down

prod_migrate:
	docker-compose -f docker-compose.prod.yml exec $(APP_NAME) php artisan migrate

prod_vite:
	docker-compose -f docker-compose.prod.yml exec $(APP_NAME) npm run build


# Comandos para los contenedores

# acceso a la terminal de los contenedores
sshphp:
	docker-compose exec php bash

sshmysql:
	docker-compose exec mysql bash

sshnginx:
	docker-compose exec nginx bash