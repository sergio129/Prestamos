#!/bin/bash
# Script para desplegar la aplicación de Préstamos en una instancia EC2 de AWS

# Asegurar que el script detenga la ejecución en caso de error
set -e

echo "=== Iniciando despliegue de aplicación Préstamos en AWS ==="

# Verificar que Docker esté instalado
if ! command -v docker &> /dev/null; then
    echo "Docker no está instalado. Instalando Docker..."
    sudo apt-get update
    sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
    sudo apt-get update
    sudo apt-get install -y docker-ce
    sudo systemctl enable docker
    sudo systemctl start docker
    sudo usermod -aG docker $USER
    echo "Docker instalado correctamente."
fi

# Verificar que Docker Compose esté instalado
if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose no está instalado. Instalando Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    echo "Docker Compose instalado correctamente."
fi

# Crear directorio para los logs si no existe
mkdir -p logs

# Construir y levantar los contenedores con Docker Compose
echo "Construyendo y desplegando contenedores..."
docker-compose up -d --build

echo "=== Despliegue completado con éxito ==="
echo "La aplicación está disponible en http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)"
