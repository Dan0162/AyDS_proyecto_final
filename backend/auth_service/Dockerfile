# Imagen base de python
FROM python:3.10

# Copiamos todos los archivos del proyecto al directorio
WORKDIR /app

# Copiamos solo el archivo de dependencias
COPY requirements.txt .

# Define el comando por defecto que se ejecutará al iniciar el contenedor: ejecutar app.py con python
RUN pip install --no-cache-dir -r requirements.txt

# Instala las dependencias definidas en requirements.txt sin usar caché
COPY . /app

CMD ["python", "app.py"]