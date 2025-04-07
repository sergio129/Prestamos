# Instrucciones para desplegar en AWS desde Windows

## Método 1: Usando Git Bash (recomendado)

1. Abre Git Bash desde el menú de inicio o haciendo clic derecho en el explorador de archivos y seleccionando "Git Bash Here"

2. Navega al directorio del proyecto (si no estás ya ahí):
   ```bash
   cd "/c/Users/Sergio/Desktop/Poryecto Octavio-Sergio/Prestamos"
   ```

3. Ejecuta los siguientes comandos para desplegar en AWS:
   ```bash
   # Transfiere los archivos a AWS
   scp -i Sheyo_0129.pem -r ./* ec2-user@18.191.186.71:~/Prestamos
   
   # Conéctate a la instancia
   ssh -i Sheyo_0129.pem ec2-user@18.191.186.71
   
   # Ya dentro de la instancia, ejecuta:
   cd Prestamos
   mkdir -p logs
   
   # Instalar Docker si no está instalado
   if ! command -v docker &> /dev/null; then
       sudo yum update -y
       sudo yum install -y docker
       sudo systemctl start docker
       sudo systemctl enable docker
       sudo usermod -aG docker ec2-user
       # Reconectar para aplicar cambios de grupo
       exit
       # (Tendrás que volver a conectarte con ssh después de esto)
   fi
   
   # Vuelve a conectarte si fue necesario salir
   # ssh -i Sheyo_0129.pem ec2-user@18.191.186.71
   # cd Prestamos
   
   # Instalar Docker Compose
   if ! command -v docker-compose &> /dev/null; then
       sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
       sudo chmod +x /usr/local/bin/docker-compose
   fi
   
   # Desplegar
   docker-compose up -d --build
   ```

4. Verifica que la aplicación esté funcionando accediendo a http://18.191.186.71 en tu navegador

## Método 2: Usando el script PowerShell

1. Abre PowerShell como administrador
2. Navega al directorio del proyecto:
   ```powershell
   cd "C:\Users\Sergio\Desktop\Poryecto Octavio-Sergio\Prestamos"
   ```
3. Ejecuta el script PowerShell:
   ```powershell
   .\deploy-aws.ps1
   ```

## Solución de problemas

Si encuentras errores con WSL como:
