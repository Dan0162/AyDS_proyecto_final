# Documentación de la Funcionalidad de Pagos

Este directorio contiene la aplicación Flask responsable de gestionar el procesamiento de pagos dentro de la aplicación multicontenedor.

## Descripción general

El servicio de pagos está diseñado para gestionar la confirmación de pagos y funcionalidades relacionadas para los talleres o servicios ofrecidos en la aplicación. Interactúa con la base de datos para actualizar el estado de las reservas tras un pago exitoso.

## Instrucciones de configuración

1. **Clonar el repositorio**: 
   Clona el repositorio en tu máquina local usando:
   ```
   git clone <repository-url>
   ```

2. **Navegar al directorio de pagos**:
   Cambia al directorio de pagos:
   ```
   cd flask-multi-container-app/payment
   ```

3. **Instalar dependencias**:
   Instala los paquetes de Python requeridos usando pip:
   ```
   pip install -r requirements.txt
   ```

4. **Ejecutar la aplicación**:
   Inicia la aplicación Flask:
   ```
   python app.py
   ```

   La aplicación estará disponible en `http://localhost:5000/pagar` para el procesamiento de pagos.

## Ejemplos de uso

- **Confirmar pago**:
  Para confirmar un pago, envía una solicitud POST al endpoint `/pagar` con el siguiente cuerpo JSON:
  ```json
  {
   "usuario_id": 1,
   "taller_id": 2
  }
  ```

  Una respuesta exitosa indicará que el pago ha sido confirmado.

## Información adicional

Para más detalles sobre la estructura general del proyecto y otras funcionalidades, consulta el archivo `README.md` principal ubicado en el directorio raíz del proyecto.