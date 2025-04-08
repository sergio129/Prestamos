# Aplicación Móvil de Simulador de Préstamos

Este directorio contiene la configuración necesaria para generar una aplicación móvil nativa a partir de la aplicación web de simulación de préstamos.

## Requisitos previos

Para construir la aplicación móvil necesitarás:

- Node.js (versión 14 o superior)
- NPM (viene con Node.js)
- Android Studio (para compilar la versión Android)
- Xcode (solo en macOS, para compilar la versión iOS)
- Capacitor CLI (se instalará automáticamente con las dependencias)

## Instalación

1. Instala las dependencias:

```bash
cd app-movil
npm install
```

2. Copia los archivos web a la carpeta www:

```bash
npm run copy-web
```

3. Inicializa las plataformas:

> **Nota**: Si ya has inicializado las plataformas anteriormente, puedes omitir este paso o consultar la sección "Reinstalar plataformas" más abajo.

```bash
# Para Android
npm run init-android

# Para iOS (solo macOS)
npm run init-ios
```

## Desarrollo y compilación

### Probar la aplicación en un navegador

Para probar la aplicación en un navegador, puedes usar diferentes métodos:

#### Método 1: Usando npx (recomendado para Windows)
```bash
# Copiar los archivos web
npm run copy-web

# Servir la aplicación usando npx (sin necesidad de instalación global)
npx serve www
```

#### Método 2: Usando Node.js HTTP-Server
```bash
# Instalar http-server globalmente (solo necesario una vez)
npm install -g http-server

# Copiar los archivos web y servir la aplicación
npm run copy-web
http-server www
```

#### Método 3: Usar Python (si está instalado)
```bash
# Copiar los archivos web
npm run copy-web

# Servir la aplicación usando el servidor HTTP de Python
cd www
python -m http.server 8000
```

> **Nota**: Estos comandos iniciarán un servidor web local. La URL exacta se mostrará en la consola al ejecutar el comando.

> **Nota para usuarios de Windows**: Si encuentras errores de seguridad con PowerShell, puedes:
> 1. Usar el método con `npx` que suele funcionar sin problemas de permisos
> 2. Ejecutar PowerShell como administrador
> 3. Cambiar la política de ejecución temporalmente: `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`

### Abrir el proyecto en Android Studio

```bash
npm run open-android
```

### Abrir el proyecto en Xcode (solo macOS)

```bash
npm run open-ios
```

## Construir la APK/IPA

### Android

1. Abre el proyecto en Android Studio:
```bash
npm run open-android
```

2. Desde Android Studio, selecciona `Build > Build Bundle(s) / APK(s) > Build APK(s)`

3. La APK generada estará disponible en:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

### iOS (solo macOS)

1. Abre el proyecto en Xcode:
```bash
npm run open-ios
```

2. Selecciona un dispositivo o simulador de iOS

3. Desde Xcode, selecciona `Product > Archive` para generar un IPA para distribución

## Estructura del proyecto

- `capacitor.config.json`: Configuración de Capacitor
- `package.json`: Dependencias y scripts de npm
- `www/`: Directorio que contiene la aplicación web (copiada desde `../frontend`)
- `android/`: Directorio del proyecto Android (generado automáticamente)
- `ios/`: Directorio del proyecto iOS (generado automáticamente)
- `scripts/`: Scripts de utilidad para el proyecto

## Solución de problemas comunes

### Error al copiar archivos en Windows
Si encuentras errores como "Ya existe el subdirectorio o el archivo", intenta ejecutar:
```bash
node scripts/copy-web.js
```
Esto utilizará un script Node.js específicamente diseñado para ser compatible con Windows.

### Error "platform already exists"
Si al ejecutar `npm run init-android` o `npm run init-ios` obtienes un error indicando que la plataforma ya existe, tienes dos opciones:

1. **Sincronizar los cambios** sin reinstalar la plataforma (recomendado si ya has personalizado el proyecto nativo):
   ```bash
   npx cap sync
   ```

2. **Reinstalar la plataforma** (ADVERTENCIA: esto eliminará todos los cambios personalizados en el proyecto nativo):
   ```bash
   # Para Android
   rm -rf android    # En Windows: rmdir /s /q android
   npm run init-android

   # Para iOS
   rm -rf ios        # En Windows: rmdir /s /q ios
   npm run init-ios
   ```

### Error "The serve command has been removed"
Si ves este error al ejecutar `npm start`, es porque versiones recientes de Capacitor han eliminado el comando `serve`. Usa la alternativa mencionada en la sección "Probar la aplicación en un navegador".

### Error de seguridad en PowerShell (Windows)
Si ves un error como "No se puede cargar el archivo... no está firmado digitalmente", tienes varias opciones:

1. **Usar npx directamente** (más sencillo):
   ```bash
   npx serve www
   ```

2. **Cambiar temporalmente la política de ejecución** (solo afecta a la sesión actual):
   ```bash
   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
   serve www
   ```

3. **Usar CMD en lugar de PowerShell**:
   ```cmd
   cd C:\Users\Sergio\Desktop\Poryecto Octavio-Sergio\Prestamos\app-movil
   npx serve www
   ```

4. **Servir la aplicación con Visual Studio Code**:
   - Instala la extensión "Live Server"
   - Haz clic derecho en el archivo `www/index.html`
   - Selecciona "Open with Live Server"

### Problemas con la versión de Java en Android Studio
Android Studio requiere una versión específica de Java. Si encuentras errores relacionados con Java:

1. Asegúrate de tener instalado JDK 11 o superior
2. Configura la variable de entorno JAVA_HOME para que apunte a la ubicación correcta del JDK
3. Reinicia Android Studio después de configurar las variables de entorno

### Errores de compilación en Android
Si encuentras errores al compilar el proyecto Android:

1. En Android Studio, ve a `File > Sync Project with Gradle Files`
2. Actualiza las dependencias: `Tools > SDK Manager` y asegúrate de tener instaladas las versiones correctas del SDK
3. Limpia el proyecto: `Build > Clean Project`

## Modificar la aplicación

Si necesitas modificar la aplicación web, es recomendable hacer los cambios directamente en la carpeta `frontend` del proyecto principal y luego ejecutar `npm run copy-web` para actualizar la carpeta `www`.

## Flujo de trabajo recomendado

1. Desarrolla y prueba tu aplicación en el navegador primero (`npm start`)
2. Una vez que estés satisfecho con los cambios, sincroniza con las plataformas nativas (`npx cap sync`)
3. Abre el proyecto nativo (`npm run open-android` o `npm run open-ios`) para probar en un emulador o dispositivo real
4. Compila la versión final cuando todo esté listo

## Notas adicionales

- La aplicación móvil utiliza los mismos archivos que la versión web, pero con algunas adaptaciones para mejorar la experiencia en dispositivos móviles.
- Se ha añadido un archivo `mobile-app.js` con funcionalidades específicas para dispositivos móviles.
- El archivo `mobile-styles.css` contiene estilos específicos para la versión móvil.
