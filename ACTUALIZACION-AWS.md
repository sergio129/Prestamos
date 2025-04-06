# Guía para actualizar la aplicación en AWS después de cambios locales

Cuando realices cambios en tu repositorio local y quieras actualizarlos en tu instancia de AWS, sigue estos pasos:

## Opción 1: Transferir y reconstruir

### 1. Transfiere los archivos actualizados

```bash
# Desde tu máquina local (PowerShell)
scp -i Sheyo_0129.pem -r "C:\Users\Sergio\Desktop\Poryecto Octavio-Sergio\Prestamos" ec2-user@18.191.186.71:~/actualizado
```

### 2. Conéctate a la instancia AWS

```bash
ssh -i Sheyo_0129.pem ec2-user@18.191.186.71
```

### 3. Respaldo de la versión actual (opcional)

```bash
# Respaldar la versión actual (por seguridad)
cp -r ~/Prestamos ~/Prestamos_backup_$(date +%Y%m%d)
```

### 4. Actualizar los archivos

```bash
# Reemplazar los archivos del directorio actual
rm -rf ~/Prestamos
mv ~/actualizado/Prestamos ~/Prestamos
```

### 5. Reconstruir y reiniciar los contenedores

```bash
cd ~/Prestamos
docker-compose down
docker-compose up -d --build
```

## Opción 2: Script de actualización automática

Para automatizar este proceso, puedes crear un script en la raíz de tu proyecto:

1. Crea un archivo llamado `update-aws.sh` en tu máquina local

```bash
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
```

2. Para ejecutar este script en Windows, usa Git Bash o adapta el código para PowerShell.

## Opción 3: Implementar un sistema de CI/CD

Para proyectos más serios, considera implementar un pipeline de CI/CD con GitHub Actions o AWS CodePipeline que automatice todo el proceso de despliegue cuando haces cambios en tu repositorio.

## Verificación después de la actualización

Después de actualizar, siempre verifica que todo funcione correctamente:

1. Comprueba que los contenedores estén en ejecución:
   ```bash
   docker ps
   ```

2. Verifica los logs para detectar errores:
   ```bash
   cd ~/Prestamos
   docker-compose logs
   ```

3. Accede a tu aplicación en el navegador:
   ```
   http://18.191.186.71
   ```

## Si algo sale mal

Si encuentras problemas después de la actualización:

1. Puedes restaurar el respaldo:
   ```bash
   rm -rf ~/Prestamos
   mv ~/Prestamos_backup_YYYYMMDD ~/Prestamos
   cd ~/Prestamos
   docker-compose up -d
   ```

2. O revisar los logs para identificar el problema:
   ```bash
   docker-compose logs
   ```
