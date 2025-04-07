#!/bin/bash
# Script para actualizar la aplicación de Préstamos en AWS
# IMPORTANTE: Ejecutar desde Git Bash, no desde CMD o PowerShell

# Variables (modifica según tu configuración)
PEM_FILE="Sheyo_0129.pem"
SERVER="ec2-user@18.191.186.71"
REMOTE_PATH="~/Prestamos"

# Verificar que estamos en Git Bash
if [[ "$OSTYPE" != "msys"* && "$OSTYPE" != "cygwin"* ]]; then
    echo "Error: Este script debe ejecutarse en Git Bash"
    echo "Por favor, haz clic derecho en la carpeta y selecciona 'Git Bash Here'"
    exit 1
fi

# Verificar que el archivo .pem existe
if [ ! -f "$PEM_FILE" ]; then
    echo "Error: El archivo $PEM_FILE no existe en el directorio actual"
    echo "Por favor, coloca el archivo $PEM_FILE en el mismo directorio que este script"
    exit 1
fi

# Ajustar permisos del archivo .pem si se ejecuta como administrador
# En Windows con Git Bash, esto es importante para SSH
chmod 400 "$PEM_FILE" 2>/dev/null
echo "Permisos del archivo .pem ajustados para mayor seguridad"

echo "=== Actualizando aplicación en AWS ==="

# Transfiere archivos al servidor
echo "Transfiriendo archivos a AWS..."
scp -o StrictHostKeyChecking=no -i "$PEM_FILE" -r ./* "$SERVER:$REMOTE_PATH"

# Ejecuta comandos en el servidor remoto
echo "Ejecutando actualización en el servidor..."
ssh -o StrictHostKeyChecking=no -i "$PEM_FILE" "$SERVER" "
    cd $REMOTE_PATH
    mkdir -p logs
    
    # Si se ejecuta como root, cambiar propietario de los archivos
    # Esto es útil si se ejecuta como administrador en Windows
    if [[ \$(id -u) -eq 0 ]]; then
        chown -R ec2-user:ec2-user .
    fi
    
    docker-compose down
    docker-compose up -d --build
    docker ps
"

echo "=== Actualización completada ==="
echo "La aplicación está disponible en: http://18.191.186.71"
echo "Recuerda: si encuentras errores de permisos, puedes ejecutar:"
echo "chmod -R 755 ~/Prestamos (en la instancia AWS)"