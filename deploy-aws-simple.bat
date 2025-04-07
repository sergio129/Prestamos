@echo off
echo === Desplegando aplicación en AWS ===

REM Configurar variables
set PEM_FILE=Sheyo_0129.pem
set SERVER=ec2-user@18.191.186.71

REM Abrir Git Bash directamente para ejecutar los comandos
start "" "C:\Program Files\Git\bin\bash.exe" -c "cd '%cd%' && chmod 400 %PEM_FILE% && echo 'Transfiriendo archivos...' && scp -o StrictHostKeyChecking=no -i %PEM_FILE% -r ./* %SERVER%:~/Prestamos && echo 'Desplegando...' && ssh -o StrictHostKeyChecking=no -i %PEM_FILE% %SERVER% 'cd ~/Prestamos && mkdir -p logs && docker-compose down && docker-compose up -d --build && docker ps' && echo 'Despliegue completado. La aplicación está disponible en: http://18.191.186.71' && read -p 'Presiona Enter para continuar...'"

echo Abriendo Git Bash para completar el despliegue...
