#!/bin/bash

# Script para liberar el puerto 80 antes de iniciar los contenedores
# Debe ejecutarse con permisos de superusuario (sudo)

echo "Identificando procesos que están usando el puerto 80..."

# Verificar si lsof está instalado
if ! command -v lsof &> /dev/null; then
    echo "lsof no está instalado. Intentando instalarlo..."
    if command -v apt &> /dev/null; then
        sudo apt update && sudo apt install -y lsof
    elif command -v yum &> /dev/null; then
        sudo yum install -y lsof
    elif command -v dnf &> /dev/null; then
        sudo dnf install -y lsof
    else
        echo "No se pudo instalar lsof. Comprueba manualmente qué está usando el puerto 80."
        exit 1
    fi
fi

# Encontrar procesos usando el puerto 80
PROCESOS=$(lsof -i :80 -t)

if [ -z "$PROCESOS" ]; then
    echo "No se encontraron procesos usando el puerto 80."
else
    echo "Procesos encontrados: $PROCESOS"
    echo "Deteniendo procesos..."
    
    # Detener todos los procesos encontrados
    for pid in $PROCESOS; do
        echo "Deteniendo proceso $pid"
        kill -15 $pid
        sleep 1
        
        # Verificar si el proceso sigue en ejecución
        if ps -p $pid > /dev/null; then
            echo "El proceso $pid no respondió a SIGTERM, usando SIGKILL"
            kill -9 $pid
        fi
    done
    
    # Verificar si el puerto está libre
    sleep 2
    if [ -z "$(lsof -i :80 -t)" ]; then
        echo "Puerto 80 liberado exitosamente."
    else
        echo "ADVERTENCIA: No se pudo liberar el puerto 80 completamente."
        echo "Procesos restantes: $(lsof -i :80 -t)"
        echo "Considere detener estos procesos manualmente o cambiar el puerto en docker-compose.yml"
    fi
fi

# Detener servicios comunes que pueden estar usando el puerto 80
echo "Intentando detener servicios comunes que podrían estar usando el puerto 80..."

# Lista de servicios comunes que podrían usar el puerto 80
SERVICIOS="nginx apache2 httpd caddy lighttpd"

for servicio in $SERVICIOS; do
    if systemctl is-active --quiet $servicio; then
        echo "Deteniendo el servicio $servicio..."
        sudo systemctl stop $servicio
        echo "Deshabilitando el servicio $servicio para que no se inicie automáticamente..."
        sudo systemctl disable $servicio
    fi
done

echo "Verificación final del puerto 80..."
if [ -z "$(lsof -i :80 -t)" ]; then
    echo "Puerto 80 está libre y listo para ser usado."
else
    echo "ADVERTENCIA: El puerto 80 todavía está en uso por: $(lsof -i :80 -t)"
    echo "Recomendación: Modifique el archivo docker-compose.yml para usar un puerto diferente."
fi
