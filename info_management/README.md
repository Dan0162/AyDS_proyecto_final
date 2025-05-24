# API de Gestión de Información

Este directorio contiene la aplicación Flask para gestionar la información relacionada con los talleres o servicios. La aplicación proporciona endpoints para consultar y actualizar información sobre los talleres disponibles.

## Instrucciones de configuración

1. **Clonar el repositorio**:
   ```
   git clone <repository-url>
   cd flask-multi-container-app/info_management
   ```

2. **Instalar dependencias**:
   Se recomienda usar un entorno virtual. Puedes crear uno usando:
   ```
   python -m venv venv
   source venv/bin/activate  # En Windows usa `venv\Scripts\activate`
   ```
   Luego instala los paquetes requeridos:
   ```
   pip install -r requirements.txt
   ```

3. **Ejecutar la aplicación**:
   Puedes iniciar la aplicación Flask ejecutando:
   ```
   python app.py
   ```
   La aplicación estará accesible en `http://localhost:5000`.

## Ejemplos de uso

- **Obtener todos los talleres**:
  ```
  GET /talleres
  ```

- **Obtener detalles de un taller específico**:
  ```
  GET /talleres/<id>
  ```

- **Actualizar información del taller**:
  ```
  PUT /talleres/<id>
  ```

Asegúrate de consultar el archivo `app.py` para obtener detalles específicos sobre los endpoints y los formatos de solicitud/respuesta.