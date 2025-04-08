#!/bin/bash

# Script para liberar el puerto 80 y 8080 antes de iniciar los contenedores
# Debe ejecutarse con permisos de superusuario (sudo)

echo "Identificando procesos que están usando los puertos 80 y 8080..."

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
        echo "No se pudo instalar lsof. Comprueba manualmente qué está usando los puertos."
        exit 1
    fi
fi

# Función para liberar un puerto específico
liberar_puerto() {
    local puerto=$1
    echo "Verificando puerto $puerto..."
    
    # Encontrar procesos usando el puerto
    PROCESOS=$(lsof -i :$puerto -t)

    if [ -z "$PROCESOS" ]; then
        echo "No se encontraron procesos usando el puerto $puerto."
    else
        echo "Procesos encontrados en puerto $puerto: $PROCESOS"
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
        if [ -z "$(lsof -i :$puerto -t)" ]; then
            echo "Puerto $puerto liberado exitosamente."
        else
            echo "ADVERTENCIA: No se pudo liberar el puerto $puerto completamente."
            echo "Procesos restantes: $(lsof -i :$puerto -t)"
        fi
    fi
}

# Liberar puertos necesarios
liberar_puerto 80
liberar_puerto 8080
liberar_puerto 3001

# Detener servicios comunes que pueden estar usando el puerto 80
echo "Intentando detener servicios comunes que podrían estar usando puertos web..."

# Lista de servicios comunes que podrían usar los puertos
SERVICIOS="nginx apache2 httpd caddy lighttpd"

for servicio in $SERVICIOS; do
    if systemctl is-active --quiet $servicio; then
        echo "Deteniendo el servicio $servicio..."
        sudo systemctl stop $servicio
        echo "Deshabilitando el servicio $servicio para que no se inicie automáticamente..."
        sudo systemctl disable $servicio
    fi
done

# Verificar reglas de firewall
echo "Verificando reglas de firewall..."
if command -v ufw &> /dev/null; then
    echo "Estado de UFW:"
    sudo ufw status
    
    # Asegurar que los puertos necesarios estén abiertos
    sudo ufw allow 8080/tcp
    sudo ufw allow 3001/tcp
elif command -v firewall-cmd &> /dev/null; then
    echo "Estado de FirewallD:"
    sudo firewall-cmd --list-all
    
    # Abrir puertos en FirewallD
    sudo firewall-cmd --add-port=8080/tcp --permanent
    sudo firewall-cmd --add-port=3001/tcp --permanent
    sudo firewall-cmd --reload
fi

# Verificar grupos de seguridad de AWS (si estamos en una instancia EC2)
if curl -s http://169.254.169.254/latest/meta-data/instance-id > /dev/null; then
    echo "Instancia EC2 detectada. Verifique que los puertos 8080 y 3001 estén abiertos en su grupo de seguridad."
    echo "Puede hacerlo a través de la consola AWS o mediante AWS CLI."
fi

echo "Verificación final de puertos..."
for puerto in 80 8080 3001; do
    if [ -z "$(lsof -i :$puerto -t)" ]; then
        echo "Puerto $puerto está libre."
    else
        echo "ADVERTENCIA: El puerto $puerto todavía está en uso por: $(lsof -i :$puerto -t)"
    fi
done

echo "Verificación de conectividad de red..."
curl -s https://api.ipify.org
echo " <- IP pública de esta máquina"

echo "Verificación de DNS..."
nslookup 18.191.186.71 || echo "nslookup no disponible o DNS no resuelve"

echo "Recomendaciones:"
echo "1. Verifique que el grupo de seguridad de AWS permita tráfico en los puertos 8080 y 3001"
echo "2. Asegúrese de que la instancia EC2 tenga una IP pública accesible"
echo "3. Si usa Docker en modo 'host', compruebe que los puertos no estén ya en uso"
