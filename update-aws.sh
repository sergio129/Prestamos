#!/bin/bash
# Script para actualizar la aplicación en AWS

# Variables (modifica según tu configuración)
PEM_FILE="Sheyo_0129.pem"
SERVER="ec2-user@18.191.186.71"
LOCAL_PATH="C:\Users\Sergio\Desktop\Poryecto Octavio-Sergio\Prestamos"
REMOTE_PATH="~/Prestamos"

# Transferir archivos (Windows PowerShell)
echo "Transfiriendo archivos a AWS..."
scp -i $PEM_FILE -r "$LOCAL_PATH" $SERVER:~/temp_update

# Ejecutar actualización en el servidor
ssh -i $PEM_FILE $SERVER "
    echo 'Respaldando versión anterior...'
    cp -r $REMOTE_PATH ${REMOTE_PATH}_backup_\$(date +%Y%m%d) 2>/dev/null || true
    
    echo 'Actualizando archivos...'
    rm -rf $REMOTE_PATH
    mv ~/temp_update/Prestamos $REMOTE_PATH
    
    echo 'Reconstruyendo contenedores Docker...'
    cd $REMOTE_PATH
    docker-compose down
    docker-compose up -d --build
    
    echo 'Verificando estado...'
    docker ps
"

echo "¡Actualización completada!"