# Proyecto Symfony + Angular - Carlos Arnanz

Este repositorio combina un backend en Symfony, un frontend en Angular y una base de datos PostgreSQL. Es una base robusta pensada para prácticas y proyectos que quieran un stack moderno con tecnologías desacopladas y fáciles de desplegar.

## Tecnologías principales

- **Frontend:** Angular 20 con arquitectura modular y componentes reutilizables.
- **Backend:** Symfony 7 (PHP 8.3) funcionando como API RESTful sólida.
- **Base de datos:** PostgreSQL para persistencia confiable.
- **Infraestructura:** Orquestación sencilla con Docker y Docker Compose para levantar todo en contenedores.

## Estructura del proyecto

- `angular-frontend/` — Aplicación frontend Angular con SPA y compilación en caliente para desarrollo rápido.
- `symfony-backend/` — API RESTful en Symfony que gestiona lógica de negocio y acceso a datos.
- `docs/` — Documentación técnica y guías para la configuración y uso del proyecto.

## Instalación rápida

1. Clona el repositorio.
2. Ejecuta `docker compose up -d` en la raíz para levantar backend, frontend y base de datos en contenedores.
3. Abre el navegador en [http://localhost:4200](http://localhost:4200) para acceder a la aplicación.
