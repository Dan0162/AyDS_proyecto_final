# Usa una imagen oficial de Node.js versión 18 como base para el contenedor
FROM node:18

# Establece el directorio de trabajo dentro del contenedor en /app
WORKDIR /app

# Copia los archivos de definición de dependencias al directorio de trabajo
COPY package*.json ./

# Instala las dependencias listadas en package.json dentro del contenedor
RUN npm install

# Define el comando por defecto para ejecutar el contenedor:
# iniciar la aplicación
CMD ["npm", "start"]
