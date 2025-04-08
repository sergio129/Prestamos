#!/bin/bash
# Script para limpiar copias de seguridad antiguas y mantener solo las últimas 5

# Directorio donde se encuentran las copias de seguridad
BACKUP_DIR=~

# Patrón de carpetas de copias de seguridad
BACKUP_PATTERN="Prestamos_backup_*"

# Número de copias de seguridad a mantener
KEEP_COUNT=5

echo "Limpiando copias de seguridad antiguas..."

# Listar todas las carpetas de backup, ordenar por fecha (de más reciente a más antigua)
# y eliminar todas excepto las 5 más recientes
cd $BACKUP_DIR && ls -1d $BACKUP_PATTERN | sort -r | tail -n +$((KEEP_COUNT+1)) | xargs rm -rf

echo "Limpieza completada. Se mantuvieron las $KEEP_COUNT copias más recientes."

# Mostrar las copias que quedan
echo "Copias de seguridad actuales:"
cd $BACKUP_DIR && ls -1d $BACKUP_PATTERN | sort -r
