# Usa una imagen oficial de Node.js versión 18 como base para el contenedor
FROM node:18
# Establece el directorio de trabajo dentro del contenedor en /app
WORKDIR /app
# Copia todos los archivos del proyecto frontend (código, config, etc.) al directorio de trabajo
COPY . .
# Instala las dependencias listadas en package.json dentro del contenedor
RUN npm install
# Construye la versión optimizada del frontend (React produce los archivos en la carpeta 'build')
RUN npm run build
# Instala globalmente el servidor estático 'serve' para servir la app construida
RUN npm install -g serve
# Define el comando por defecto para ejecutar el contenedor:
# servir la carpeta 'build' en el puerto 3000
CMD ["serve", "-s", "build", "-l", "3000"]