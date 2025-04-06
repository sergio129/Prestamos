# Simulador de Préstamos Web

Un simulador simple de préstamos que permite calcular cuotas mensuales, total a pagar e intereses.

## Características

- Cálculo de préstamos usando la fórmula de amortización francesa
- Interfaz simple e intuitiva
- Funcionalidad para guardar simulaciones

## Requisitos

- Node.js (versión 14 o superior)
- npm (normalmente viene con Node.js)

## Instalación

1. Clona este repositorio o descarga los archivos
2. Abre una terminal en la carpeta del proyecto
3. Instala las dependencias:

```bash
npm install
```

## Ejecución

Para iniciar el servidor, ejecuta:

```bash
npm start
```

Luego, abre tu navegador y visita: http://localhost:3000

## Uso

1. Ingresa el monto del préstamo en pesos colombianos (COP)
2. Selecciona el plazo en meses
3. Ingresa la tasa de interés mensual (%)
4. Haz clic en "Calcular"
5. Revisa los resultados de la simulación
6. Opcionalmente, puedes:
   - Ver la tabla de amortización detallada
   - Guardar la simulación ingresando los datos del cliente
   - Buscar simulaciones guardadas por número de identificación

## Estructura de carpetas

```
/simulador-prestamos
│
├── frontend/
│   ├── index.html    # Interfaz de usuario
│   ├── styles.css    # Estilos y apariencia
│   └── simulador.js  # Lógica de cálculo y comunicación con backend
│
├── backend/
│   ├── server.js          # Servidor y rutas API
│   ├── simulaciones.json  # Almacenamiento de simulaciones (formato JSON)
│   └── simulaciones.txt   # Registro en formato texto plano
│
├── package.json
└── README.md
```

## Solución de problemas

Si experimentas problemas donde los elementos no responden a la interacción:

1. Asegúrate de que el servidor esté corriendo (`npm start`)
2. Verifica que no haya errores en la consola del navegador (F12)
3. Prueba cargar la página en modo incógnito o en otro navegador
4. Si persisten los problemas, prueba reinstalar las dependencias:
   ```
   npm install
   ```

## Notas

Este simulador realiza cálculos orientativos y no constituye una oferta real de préstamos.
