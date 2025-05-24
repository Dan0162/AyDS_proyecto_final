# Módulo de Inicio de Sesión y Registro

Este módulo contiene la aplicación Flask para gestionar las funcionalidades de inicio de sesión y registro de usuarios. Proporciona rutas para la autenticación y el registro de usuarios.

## Instrucciones de configuración

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd flask-multi-container-app/login_registration
   ```

2. **Instalar dependencias**
   Asegúrate de tener Python y pip instalados. Luego, instala los paquetes requeridos:
   ```bash
   pip install -r requirements.txt
   ```

3. **Ejecutar la aplicación**
   Puedes ejecutar la aplicación Flask con el siguiente comando:
   ```bash
   python app.py
   ```
   Por defecto, la aplicación se ejecutará en `http://127.0.0.1:5000`.

## Ejemplos de uso

### Registrar un nuevo usuario
Para registrar un nuevo usuario, envía una solicitud POST a `/register` con el siguiente cuerpo JSON:
```json
{
    "username": "tu_usuario",
    "password": "tu_contraseña",
    "nombre": "Tu Nombre"
}
```

### Inicio de sesión de usuario
Para iniciar sesión, envía una solicitud POST a `/login` con el siguiente cuerpo JSON:
```json
{
    "username": "tu_usuario",
    "password": "tu_contraseña"
}
```

## Puntos finales de la API

- **POST /register**: Registrar un nuevo usuario.
- **POST /login**: Autenticar a un usuario.

## Notas
Asegúrate de que tu base de datos esté configurada correctamente y de que los detalles de la conexión en `app.py` sean precisos para un funcionamiento exitoso.