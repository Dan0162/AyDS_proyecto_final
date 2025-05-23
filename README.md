# Plataforma Master Cook Academy

Este proyecto se desarrolló durante un curso de Análisis y Diseño de Software y se enfoca en la construcción de una **plataforma web escalable basada en microservicios** para Master Cook Academy. La solución aprovecha la **contenerización** y el **despliegue en la nube** para gestionar eficientemente las reservas de talleres para estudiantes y las tareas administrativas de la academia.

---

## Problemática

Master Cook Academy necesita desarrollar una plataforma web para permitir que sus estudiantes gestionen sus reservas y a la administración controlar talleres, cupos e instrucciones de forma eficiente. Se debe implementar la solución de manera que sea **escalable**, **basada en microservicios** y **desplegada en la nube**.

---

## Servicios Front-end

El front-end es una aplicación web creada con **React.js** que ofrece las siguientes características y validaciones:

* **Inicio de sesión**: Autenticación de usuarios segura.
* **Registro de cuentas**: Creación de nuevas cuentas de usuario.
* **Filtrado por categorías**: Búsqueda de talleres por categorías.
* **Reserva de talleres**: Reservar talleres disponibles.
* **Visualización de talleres**: Ver información detallada sobre los talleres.
* **Pago de taller (simulación)**: Simulación del pago del taller (no implementado completamente como un servicio en vivo).

**Figura 1: Diagrama de Casos de Uso**

![Casos de Uso Proyecto Final ADS](https://github.com/user-attachments/assets/ec3386f7-7cdd-4142-a192-440d1960fdf0)


---

## Servicios Back-end

El back-end se subdivide en varios microservicios, construidos principalmente con **Python** y **Flask**:

### Manejo de los Talleres

(Aquí se añadirían más detalles sobre las funcionalidades específicas y las APIs para la gestión de talleres, por ejemplo, creación de talleres, actualización de detalles, gestión de aforos.)

### Login y Registro de Cuentas

Este servicio maneja la autenticación de usuarios y la creación de cuentas, asegurando un acceso seguro a la plataforma.

### Pasarela de Pago

Aunque no está completamente implementada para transacciones en vivo, esta se diseñó como un microservicio separado para manejar simulaciones de pago, demostrando la arquitectura modular.

---

## Base de Datos

La base de datos fue desarrollada con **MySQL** en función a las necesidades del cliente, conteniendo diferentes tablas para el ingreso de los datos relevantes, como usuarios, talleres y reservas. Se mantiene el archivo de la creación de la base para utilización en casos locales.

**Diagrama Entidad-Relación:**

![ER MasterCook](https://github.com/user-attachments/assets/3a17d53a-2371-4c7c-b343-f2de7216f435)

---

## Despliegue

Todos los servicios para este proyecto se mantienen y despliegan utilizando **Google Cloud**, garantizando escalabilidad y confiabilidad.
