# Paso a paso para desplegar el proyecto en AWS con Docker

Este documento te guía mediante comandos específicos para desplegar la aplicación de Préstamos en tu instancia AWS con IP 54.175.119.96.

## Paso 1: Preparar los archivos en tu máquina local

Primero, asegúrate de tener estos archivos en la raíz de tu proyecto:

### 1.1 Crear un archivo Dockerfile
Crea un archivo llamado `Dockerfile` (sin extensión) en la raíz del proyecto con este contenido:

```dockerfile
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
```

### 1.2 Crear un archivo docker-compose.yml
Crea un archivo llamado `docker-compose.yml` en la raíz del proyecto:

```yaml
version: '3'

services:
  prestamos-app:
    build: .
    ports:
      - "80:80"
    restart: always
    volumes:
      - ./logs:/var/log/nginx
```

## Paso 2: Conexión a la instancia AWS

Desde tu terminal local (PowerShell o Command Prompt):

```bash
# Conectarse a la instancia (asegúrate que el archivo .pem está en el directorio actual)
ssh -i Sheyo_0129.pem ec2-user@54.175.119.96
```

Si tienes problemas con los permisos del archivo .pem en Windows:
```powershell
# En PowerShell (como administrador)
icacls sergio.pem /inheritance:r
icacls sergio.pem /grant:r "%username%":"(R)"
```

## Paso 3: Preparar la instancia EC2

Una vez conectado a la instancia, ejecuta estos comandos:

```bash
# Actualizar el sistema
sudo yum update -y

# Instalar Docker
sudo yum install -y docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ec2-user

# Para que los cambios de grupo surtan efecto, desconéctate y vuelve a conectarte
exit
```

Conéctate nuevamente:
```bash
ssh -i Sheyo_0129.pem ec2-user@18.191.186.71 

Ahora instala Docker Compose:
```bash
# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

## Paso 4: Transferir archivos al servidor

Abandona la sesión SSH (escribe `exit`) y desde tu máquina local, transfiere los archivos:

```bash
# Desde la ubicación de tu archivo .pem en PowerShell
scp -i Sheyo_0129.pem -r "C:\Users\Sergio\Desktop\Poryecto Octavio-Sergio\Prestamos" ec2-user@18.191.186.71:~/
```

## Paso 5: Desplegar la aplicación en Docker

Conéctate nuevamente a la instancia:
```bash
ssh -i Sheyo_0129.pem ec2-user@18.191.186.71
```

Navega al directorio del proyecto y despliega:
```bash
# Ir al directorio del proyecto
cd Prestamos

# Asegurarse de que tenemos los archivos necesarios
ls -la

# Crear directorio para logs
mkdir -p logs

# Construir y arrancar contenedores con Docker Compose
docker-compose up -d --build
```

## Paso 6: Verificar que todo funciona

Verifica que los contenedores estén funcionando:
```bash
docker ps
```

## Paso 7: Accede a tu aplicación

Abre un navegador web y visita:
