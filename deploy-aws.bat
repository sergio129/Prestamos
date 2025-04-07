@echo off
echo === Desplegando aplicación en AWS ===
echo.

REM Configurar variables
set PEM_FILE=Sheyo_0129.pem
set SERVER=ec2-user@18.191.186.71
set REMOTE_PATH=~/Prestamos

REM Verificar que Git Bash esté instalado y obtener su ruta
for /f "tokens=*" %%i in ('where git') do set GIT_PATH=%%i
set GIT_DIR=%GIT_PATH:~0,-7%
set GIT_BASH="%GIT_DIR%bin\bash.exe"

if not exist %GIT_BASH% (
    echo ERROR: No se puede encontrar Git Bash en %GIT_BASH%
    echo Por favor, instala Git para Windows desde https://git-scm.com/download/win
    pause
    exit /b 1
)

REM Obtener la ruta actual
set "CURRENT_DIR=%cd%"

REM Verificar que el archivo .pem existe
if not exist "%CURRENT_DIR%\%PEM_FILE%" (
    echo ERROR: El archivo %PEM_FILE% no se encuentra en el directorio actual.
    echo Por favor, coloca el archivo de clave en: %CURRENT_DIR%
    pause
    exit /b 1
)

echo Transfiriendo archivos a AWS...
%GIT_BASH% -c "cd '%CURRENT_DIR%' && chmod 400 %PEM_FILE% && scp -o StrictHostKeyChecking=no -i %PEM_FILE% -r ./* %SERVER%:%REMOTE_PATH%"

echo Desplegando la aplicación en AWS...
%GIT_BASH% -c "cd '%CURRENT_DIR%' && ssh -o StrictHostKeyChecking=no -i %PEM_FILE% %SERVER% 'cd %REMOTE_PATH% && mkdir -p logs && docker-compose down && docker-compose up -d --build && docker ps'"

echo.
echo === Despliegue completado ===
echo La aplicación está disponible en: http://18.191.186.71
echo.
pause
