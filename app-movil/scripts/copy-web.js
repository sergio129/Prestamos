/**
 * Script para copiar archivos desde frontend a www
 * Compatible con Windows, macOS y Linux
 */

const fs = require('fs');
const path = require('path');

// Rutas de origen y destino
const sourceDir = path.join(__dirname, '..', '..', 'frontend');
const targetDir = path.join(__dirname, '..', 'www');

// Función para crear un directorio si no existe
function ensureDirectoryExists(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
    console.log(`Directorio creado: ${directory}`);
  }
}

// Función para copiar archivos de forma recursiva
function copyFiles(source, target) {
  // Asegurarse de que el directorio de destino existe
  ensureDirectoryExists(target);

  // Leer todos los elementos en el directorio fuente
  const items = fs.readdirSync(source);

  // Copiar cada elemento
  items.forEach(item => {
    const sourcePath = path.join(source, item);
    const targetPath = path.join(target, item);

    // Verificar si es un directorio o un archivo
    const stat = fs.statSync(sourcePath);

    if (stat.isDirectory()) {
      // Si es un directorio, llamada recursiva
      copyFiles(sourcePath, targetPath);
    } else {
      // Si es un archivo, copiarlo
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`Archivo copiado: ${sourcePath} -> ${targetPath}`);
    }
  });
}

// Ejecutar la copia de archivos
console.log('Iniciando copia de archivos de frontend a www...');

try {
  copyFiles(sourceDir, targetDir);
  console.log('Copia completada con éxito.');
} catch (error) {
  console.error('Error al copiar archivos:', error);
  process.exit(1);
}
