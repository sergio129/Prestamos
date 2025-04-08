#!/bin/bash

# Script para diagnosticar problemas de conectividad
# Ejecutar con: bash diagnostico.sh

echo "=== DIAGNÓSTICO DE CONECTIVIDAD ==="
echo "Fecha y hora: $(date)"
echo

echo "=== INFORMACIÓN DEL SISTEMA ==="
uname -a
echo

echo "=== PUERTOS EN USO ==="
if command -v netstat &> /dev/null; then
    netstat -tuln
elif command -v ss &> /dev/null; then
    ss -tuln
else
    echo "No se encontró netstat o ss para verificar puertos"
fi
echo

echo "=== CONTENEDORES DOCKER ==="
docker ps -a
echo

echo "=== LOGS DE NGINX ==="
docker logs prestamos-nginx 2>&1 | tail -n 50
echo

echo "=== LOGS DE APP ==="
docker logs prestamos-app 2>&1 | tail -n 50
echo

echo "=== VERIFICACIÓN DE CONECTIVIDAD EXTERNA ==="
echo "Probando conectividad a IP pública..."
curl -v -m 5 http://$(curl -s https://api.ipify.org):8080/ || echo "No se pudo conectar"
echo

echo "=== VERIFICACIÓN DE CONECTIVIDAD INTERNA ==="
echo "Probando conectividad a app desde localhost..."
docker exec prestamos-nginx curl -v -m 5 http://app:3000/status || echo "No se pudo conectar a app desde nginx"
echo

echo "=== CONFIGURACIÓN DE NGINX ==="
docker exec prestamos-nginx cat /etc/nginx/conf.d/default.conf
echo

echo "=== REGLAS DE FIREWALL ==="
if command -v ufw &> /dev/null; then
    ufw status
elif command -v firewall-cmd &> /dev/null; then
    firewall-cmd --list-all
else
    echo "No se encontró ufw o firewall-cmd"
fi
echo

echo "=== RECOMENDACIONES ==="
echo "1. Verifique que los puertos 8080 y 3001 estén abiertos en el grupo de seguridad de AWS"
echo "2. Asegúrese que la aplicación esté escuchando en 0.0.0.0 y no solo en localhost"
echo "3. Revise los logs de Docker para identificar errores específicos"
echo "4. Verifique que la configuración de nginx esté proxy correctamente a la app"
echo "5. Pruebe acceder directamente a la API en puerto 3001 para aislar problemas"
echo

echo "=== FIN DEL DIAGNÓSTICO ==="
