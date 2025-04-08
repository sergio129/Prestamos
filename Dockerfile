FROM nginx:alpine

# Instalar Node.js y npm
RUN apk update && apk add --no-cache \
    nodejs \
    npm

# Configurar directorio de trabajo
WORKDIR /app

# Copiar todos los archivos al contenedor
COPY . /app

# Instalar dependencias de Node.js
RUN cd /app/backend && npm install

# Copiar frontend a directorio de nginx
RUN cp -r /app/frontend/* /usr/share/nginx/html/

# Configurar el comando para iniciar el servidor
CMD sh -c "cd /app/backend && node server.js & nginx -g 'daemon off;'"
