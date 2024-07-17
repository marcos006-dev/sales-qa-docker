<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

You may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains over 2000 video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the Laravel [Patreon page](https://patreon.com/taylorotwell).

### Premium Partners

- **[Vehikl](https://vehikl.com/)**
- **[Tighten Co.](https://tighten.co)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Cubet Techno Labs](https://cubettech.com)**
- **[Cyber-Duck](https://cyber-duck.co.uk)**
- **[Many](https://www.many.co.uk)**
- **[Webdock, Fast VPS Hosting](https://www.webdock.io/en)**
- **[DevSquad](https://devsquad.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel/)**
- **[OP.GG](https://op.gg)**
- **[WebReinvent](https://webreinvent.com/?utm_source=laravel&utm_medium=github&utm_campaign=patreon-sponsors)**
- **[Lendio](https://lendio.com)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).


# Instructivo para levantar el proyecto Laravel con Docker

## Requisitos previos

- **Docker**: Versión utilizada: `24.0.6, build ed223bc`.
- **Docker Compose**: Versión utilizada: `v2.21.0-desktop.1`.
- **Chocolatey**
- **Make**

### Instalar Make

#### Windows:

1. Instalar Chocolatey: [Instrucciones de instalación](https://chocolatey.org/install)
2. Instalar Make con Chocolatey: [Paquete Make en Chocolatey](https://community.chocolatey.org/packages/make)

#### Linux:

```sh
sudo apt update
sudo apt install make
```

## Pasos para levantar el proyecto en entorno de desarrollo

1. **Clonar el repositorio del proyecto.**
2. **Crear el archivo de entorno `.env` en base al `.env.example`.** Es importante configurar correctamente el archivo `.env` para evitar fallos en la creación de los contenedores.

### Iniciar los contenedores de desarrollo

Para iniciar los contenedores de desarrollo y construir las imágenes:

```sh
make dev_install
```

Si se necesita construir los contenedores sin usar la caché de Docker:

```sh
make dev_install_no_cache
```

### Configurar permisos y dependencias

Ejecutar el siguiente comando para configurar los permisos y enlaces simbólicos, e instalar las dependencias de Composer y NPM:

```sh
make dev_setup
```

Este comando realiza las siguientes acciones:
- Configura los permisos para las carpetas `storage` y `bootstrap/cache`.
- Instala las dependencias de Composer.
- Instala las dependencias de NPM.
- Ejecuta el comando para crear el enlace simbólico.

### Ejecutar migraciones y seeders

Para ejecutar las migraciones y sembrar la base de datos:

```sh
make dev_migration
```

### Iniciar el servidor de desarrollo con Vite

Para ejecutar Vite en modo desarrollo con hot module replacement:

```sh
make dev_vite
```

### Limpiar el entorno de desarrollo

Para detener y limpiar los contenedores de desarrollo:

```sh
make dev_clear
```

## Pasos para levantar el proyecto en entorno de producción

1. **Clonar el repositorio del proyecto.**
2. **Crear el archivo de entorno `.env` en base al `.env.example`.** Es importante configurar correctamente el archivo `.env` para evitar fallos en la creación de los contenedores.

### Iniciar los contenedores de producción

Para iniciar los contenedores de producción y construir las imágenes:

```sh
make prod_install
```

### Configurar permisos y dependencias

Ejecutar el siguiente comando para configurar los permisos e instalar las dependencias de Composer y NPM:

```sh
make prod_setup
```

Este comando realiza las siguientes acciones:
- Configura los permisos para las carpetas `storage` y `bootstrap/cache`.
- Instala las dependencias de Composer.
- Instala las dependencias de NPM.

### Ejecutar migraciones

Para ejecutar las migraciones:

```sh
make prod_migrate
```

### Compilar los assets con Vite en modo producción

Para compilar los assets con Vite en modo producción:

```sh
make prod_vite
```

### Limpiar el entorno de producción

Para detener y limpiar los contenedores de producción:

```sh
make prod_clear
```

## Acceder a la terminal de los contenedores

### Acceso a la terminal del contenedor PHP

```sh
make sshphp
```

### Acceso a la terminal del contenedor MySQL

```sh
make sshmysql
```

### Acceso a la terminal del contenedor Nginx

```sh
make sshnginx
```

## Notas adicionales

- Se borraron los archivos `package.lock` y `yarn.lock` porque generaban errores al momento de instalar los paquetes. Se recomienda borrar los `^` de los `package.json` y `composer.json` para evitar que busquen una versión superior a la indicada y así prevenir conflictos.
- Al momento de levantar el proyecto, este puede funcionar un poco lento debido a limitaciones propias de Windows. Se recomienda instalar Ubuntu a través de la Microsoft Store y clonar el proyecto allí para una inicialización más rápida.
