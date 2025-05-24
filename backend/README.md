# Backend General - MasterCook Academy

Este directorio contiene el microservicio principal del backend para la aplicación MasterCook Academy. Aquí se gestionan funcionalidades como autenticación de usuarios, registro, gestión de talleres, reservas y pagos, integrando varias operaciones en un solo servicio Flask.

## Características principales

- **Registro e inicio de sesión de usuarios**
- **Gestión de talleres** (listar, detalle)
- **Reservas de talleres** (crear, eliminar, ver propias)
- **Procesamiento de pagos** (confirmación de pago de reserva)
- **API RESTful** con respuestas en formato JSON

## Requisitos previos

- Python 3.10 o superior
- MySQL (el servicio `db` en Docker Compose)
- Las dependencias listadas en `requirements.txt`

## Instalación y ejecución local

1. **Instalar dependencias**
   ```bash
   pip install -r requirements.txt