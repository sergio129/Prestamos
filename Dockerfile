FROM nginx:alpine

# Instalar dependencias
RUN apk update && apk add --no-cache \
    nodejs \
    npm

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos del proyecto
COPY . /app

# Copiar archivos a directorio de servicio de nginx
RUN cp -r /app/frontend/* /usr/share/nginx/html/

# Exponer puerto 80
EXPOSE 80

# Comando para iniciar nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
