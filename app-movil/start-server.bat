@echo off
:: filepath: c:\Users\Sergio\Desktop\Poryecto Octavio-Sergio\Prestamos\app-movil\start-server.bat
echo Iniciando servidor para la aplicación móvil...
echo.

:: Verificar que Node.js está instalado
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Error: Node.js no está instalado o no se encuentra en el PATH.
    echo Por favor, instala Node.js desde https://nodejs.org/
    exit /b 1
)

:: Iniciar el servidor usando npx (viene con Node.js)
echo Iniciando servidor en http://localhost:5000
echo Presiona Ctrl+C para detener el servidor.
echo.

npx serve www

pause