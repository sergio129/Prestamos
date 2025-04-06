const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

// Crear la aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de middleware
app.use(cors()); // Permitir solicitudes cross-origin
app.use(bodyParser.json()); // Parsear solicitudes JSON
app.use(express.static(path.join(__dirname, '../frontend'))); // Servir archivos estáticos

// Rutas a los archivos de simulaciones
const archivoSimulacionesJSON = path.join(__dirname, 'simulaciones.json');
const archivoSimulacionesTXT = path.join(__dirname, 'simulaciones.txt');

// Asegurarse de que los archivos existan
if (!fs.existsSync(archivoSimulacionesJSON)) {
    fs.writeFileSync(archivoSimulacionesJSON, JSON.stringify({ simulaciones: [] }));
    console.log("Archivo JSON de simulaciones creado");
}

if (!fs.existsSync(archivoSimulacionesTXT)) {
    fs.writeFileSync(archivoSimulacionesTXT, "REGISTRO DE SIMULACIONES DE PRÉSTAMOS\n========================================\n\n");
    console.log("Archivo TXT de simulaciones creado");
}

// Función para leer simulaciones desde JSON
function leerSimulaciones() {
    try {
        const contenido = fs.readFileSync(archivoSimulacionesJSON, 'utf8');
        return JSON.parse(contenido);
    } catch (error) {
        console.error('Error al leer simulaciones:', error);
        return { simulaciones: [] };
    }
}

// Función para escribir simulaciones en JSON
function escribirSimulacionesJSON(datos) {
    try {
        fs.writeFileSync(archivoSimulacionesJSON, JSON.stringify(datos, null, 2));
        return true;
    } catch (error) {
        console.error('Error al escribir simulaciones en JSON:', error);
        return false;
    }
}

// Función para agregar simulación al archivo TXT
function escribirSimulacionTXT(simulacion) {
    try {
        const fecha = new Date().toLocaleString();
        let textoSimulacion = `
=================================================================
SIMULACIÓN DE PRÉSTAMO - ${fecha}
=================================================================
ID Cliente: ${simulacion.identificacion}
Nombre: ${simulacion.nombre}
Monto del préstamo: $${simulacion.monto.toLocaleString('es-CO')}
Plazo: ${simulacion.plazo} meses
Tasa de interés mensual: ${simulacion.interesMensual}%
Tasa de interés anual: ${simulacion.interesAnual}%
Cuota mensual: $${simulacion.cuotaMensual.toLocaleString('es-CO')}
Total a pagar: $${simulacion.totalPagar.toLocaleString('es-CO')}
Total intereses: $${simulacion.totalIntereses.toLocaleString('es-CO')}
-----------------------------------------------------------------
TABLA DE AMORTIZACIÓN:
-----------------------------------------------------------------
`;

        // Agregar tabla de amortización si existe
        if (simulacion.amortizacion && simulacion.amortizacion.length > 0) {
            textoSimulacion += "Cuota | Capital | Interés | Pago Mensual | Saldo Restante\n";
            textoSimulacion += "-".repeat(70) + "\n";
            
            simulacion.amortizacion.forEach(cuota => {
                textoSimulacion += `${cuota.numeroCuota.toString().padEnd(5)} | `;
                textoSimulacion += `$${cuota.capital.toFixed(2).padEnd(10)} | `;
                textoSimulacion += `$${cuota.interes.toFixed(2).padEnd(10)} | `;
                textoSimulacion += `$${cuota.cuota.toFixed(2).padEnd(12)} | `;
                textoSimulacion += `$${cuota.saldo.toFixed(2)}\n`;
            });
        } else {
            textoSimulacion += "No hay datos de amortización disponibles.\n";
        }
        
        textoSimulacion += "=================================================================\n\n";
        
        // Verificar si el archivo existe y está vacío o sólo tiene el encabezado
        let contenidoActual = "";
        if (fs.existsSync(archivoSimulacionesTXT)) {
            contenidoActual = fs.readFileSync(archivoSimulacionesTXT, 'utf8');
        }
        
        // Si está vacío o sólo tiene el encabezado, agregar encabezado nuevo
        if (!contenidoActual || contenidoActual.trim() === "REGISTRO DE SIMULACIONES DE PRÉSTAMOS\n========================================") {
            contenidoActual = "REGISTRO DE SIMULACIONES DE PRÉSTAMOS\n========================================\n\n";
        }
        
        // Escribir todo el contenido de nuevo (el existente + el nuevo)
        fs.writeFileSync(archivoSimulacionesTXT, contenidoActual + textoSimulacion);
        
        console.log("Simulación guardada en archivo TXT con tabla de amortización");
        return true;
    } catch (error) {
        console.error('Error al escribir simulación en TXT:', error);
        return false;
    }
}

// Ruta principal - sirve la aplicación
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Ruta para guardar simulaciones
app.post('/guardar-simulacion', (req, res) => {
    console.log("==== SOLICITUD DE GUARDADO RECIBIDA ====");
    
    try {
        // Obtener datos de la simulación
        const simulacion = req.body;
        
        console.log("Datos recibidos:", {
            "ID": simulacion.id,
            "Cliente": simulacion.nombre,
            "Identificación": simulacion.identificacion,
            "Monto": simulacion.monto,
            "Plazo": simulacion.plazo,
            "Tabla de amortización": simulacion.amortizacion ? `${simulacion.amortizacion.length} cuotas` : "No disponible"
        });
        
        // Validar que la simulación contenga los datos necesarios
        if (!simulacion.monto || !simulacion.plazo || !simulacion.interesMensual || 
            !simulacion.identificacion || !simulacion.nombre) {
            console.error("ERROR: Datos incompletos en la simulación recibida");
            return res.status(400).json({ error: 'Datos de simulación incompletos' });
        }
        
        // Asegurar que los valores numéricos sean números
        simulacion.monto = Number(simulacion.monto);
        simulacion.plazo = Number(simulacion.plazo);
        simulacion.interesMensual = Number(simulacion.interesMensual);
        simulacion.interesAnual = Number(simulacion.interesAnual || 0);
        simulacion.cuotaMensual = Number(simulacion.cuotaMensual);
        simulacion.totalPagar = Number(simulacion.totalPagar);
        simulacion.totalIntereses = Number(simulacion.totalIntereses);
        
        // Formatear la tabla de amortización si existe
        if (simulacion.amortizacion && Array.isArray(simulacion.amortizacion)) {
            simulacion.amortizacion = simulacion.amortizacion.map(cuota => ({
                numeroCuota: Number(cuota.numeroCuota),
                capital: Number(cuota.capital),
                interes: Number(cuota.interes),
                cuota: Number(cuota.cuota),
                saldo: Number(cuota.saldo)
            }));
        }
        
        // Generar ID único si no existe
        simulacion.id = simulacion.id || Date.now().toString();
        
        // PASO 1: Guardar en el archivo JSON
        console.log("Guardando en JSON...");
        let datos = { simulaciones: [] };
        
        // Leer archivo JSON existente
        try {
            if (fs.existsSync(archivoSimulacionesJSON)) {
                const contenido = fs.readFileSync(archivoSimulacionesJSON, 'utf8');
                datos = JSON.parse(contenido);
            }
        } catch (err) {
            console.error("Error al leer JSON, se creará uno nuevo:", err);
        }
        
        // Agregar la nueva simulación
        datos.simulaciones.push(simulacion);
        
        // Escribir el archivo JSON actualizado
        const jsonGuardado = fs.writeFileSync(archivoSimulacionesJSON, JSON.stringify(datos, null, 2));
        console.log("JSON guardado correctamente");
        
        // PASO 2: Guardar en el archivo TXT
        console.log("Guardando en TXT...");
        
        // Verificar que el directorio exista
        const directorioBackend = path.dirname(archivoSimulacionesTXT);
        if (!fs.existsSync(directorioBackend)) {
            fs.mkdirSync(directorioBackend, { recursive: true });
            console.log("Directorio backend creado");
        }
        
        // Preparar datos para TXT
        const fecha = new Date().toLocaleString();
        let textoSimulacion = `
=================================================================
SIMULACIÓN DE PRÉSTAMO - ${fecha}
=================================================================
ID Cliente: ${simulacion.identificacion}
Nombre: ${simulacion.nombre}
Monto del préstamo: $${simulacion.monto.toLocaleString('es-CO')}
Plazo: ${simulacion.plazo} meses
Tasa de interés mensual: ${simulacion.interesMensual}%
Tasa de interés anual: ${simulacion.interesAnual}%
Cuota mensual: $${simulacion.cuotaMensual.toLocaleString('es-CO')}
Total a pagar: $${simulacion.totalPagar.toLocaleString('es-CO')}
Total intereses: $${simulacion.totalIntereses.toLocaleString('es-CO')}
-----------------------------------------------------------------
TABLA DE AMORTIZACIÓN:
-----------------------------------------------------------------
`;
        
        // Agregar tabla de amortización
        if (simulacion.amortizacion && simulacion.amortizacion.length > 0) {
            textoSimulacion += "Cuota | Capital       | Interés      | Pago Mensual  | Saldo Restante\n";
            textoSimulacion += "-".repeat(70) + "\n";
            
            simulacion.amortizacion.forEach(cuota => {
                textoSimulacion += `${String(cuota.numeroCuota).padEnd(6)} | `;
                textoSimulacion += `$${cuota.capital.toFixed(2).padEnd(12)} | `;
                textoSimulacion += `$${cuota.interes.toFixed(2).padEnd(11)} | `;
                textoSimulacion += `$${cuota.cuota.toFixed(2).padEnd(13)} | `;
                textoSimulacion += `$${cuota.saldo.toFixed(2)}\n`;
            });
        } else {
            textoSimulacion += "No hay datos de amortización disponibles.\n";
        }
        
        textoSimulacion += "=================================================================\n\n";
        
        // Verificar si el archivo existe y leer contenido
        let contenidoActual = "";
        
        try {
            if (fs.existsSync(archivoSimulacionesTXT)) {
                contenidoActual = fs.readFileSync(archivoSimulacionesTXT, 'utf8');
            }
        } catch (err) {
            console.error("Error al leer archivo TXT, se creará uno nuevo:", err);
        }
        
        // Si el archivo está vacío o solo tiene encabezado, inicializarlo
        if (!contenidoActual || contenidoActual.trim().length < 100) {
            contenidoActual = `REGISTRO DE SIMULACIONES DE PRÉSTAMOS
========================================

Este archivo almacena el historial de simulaciones de préstamos junto con sus tablas de amortización.
Cada simulación incluye la información del cliente, los parámetros del préstamo y el detalle de cada cuota.

Formato:
- Datos personales del cliente
- Condiciones del préstamo (monto, plazo, tasa)
- Resultados (cuota mensual, total a pagar, intereses)
- Tabla de amortización completa

`;
        }
        
        // Escribir archivo TXT actualizado
        fs.writeFileSync(archivoSimulacionesTXT, contenidoActual + textoSimulacion);
        console.log("TXT guardado correctamente");
        
        // Enviar respuesta exitosa
        console.log("Simulación guardada con éxito en ambos formatos");
        res.status(200).json({ message: 'Simulación guardada con éxito', id: simulacion.id });
        
    } catch (error) {
        console.error("ERROR CRÍTICO al guardar simulación:", error);
        res.status(500).json({ error: 'Error al procesar la simulación: ' + error.message });
    }
});

// Ruta para buscar simulaciones por ID de cliente - corregida para logear más información
app.get('/buscar-simulaciones', (req, res) => {
    const identificacion = req.query.id;
    
    console.log("==== SOLICITUD DE BÚSQUEDA RECIBIDA ====");
    console.log("Buscando simulaciones para ID:", identificacion);
    
    if (!identificacion) {
        console.log("ERROR: No se proporcionó un ID para buscar");
        return res.status(400).json({ error: 'Debe proporcionar un ID para buscar' });
    }
    
    try {
        // Leer simulaciones
        console.log("Leyendo archivo de simulaciones JSON");
        let datos = { simulaciones: [] };
        
        if (fs.existsSync(archivoSimulacionesJSON)) {
            const contenido = fs.readFileSync(archivoSimulacionesJSON, 'utf8');
            try {
                datos = JSON.parse(contenido);
                console.log(`Archivo leído correctamente, contiene ${datos.simulaciones.length} simulaciones`);
            } catch (e) {
                console.error("Error al parsear JSON:", e);
                // Crear una copia de respaldo del archivo corrupto
                const backupPath = `${archivoSimulacionesJSON}.backup-${Date.now()}`;
                fs.copyFileSync(archivoSimulacionesJSON, backupPath);
                console.log(`Se creó una copia de seguridad en ${backupPath}`);
                
                // Reiniciar con un objeto vacío
                datos = { simulaciones: [] };
            }
        } else {
            console.log("ADVERTENCIA: El archivo de simulaciones no existe, se creará uno nuevo");
            // Crear directorio si no existe
            const dir = path.dirname(archivoSimulacionesJSON);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            // Crear archivo vacío
            fs.writeFileSync(archivoSimulacionesJSON, JSON.stringify({ simulaciones: [] }));
        }
        
        // Filtrar por identificación - asegurarnos de comparar strings
        const idBuscado = identificacion.toString().trim();
        console.log("Buscando coincidencias con ID:", idBuscado);
        
        const simulacionesFiltradas = datos.simulaciones.filter(sim => {
            if (!sim || !sim.identificacion) return false;
            const idSim = (sim.identificacion || "").toString().trim();
            const coincide = idSim === idBuscado;
            return coincide;
        });
        
        console.log(`Se encontraron ${simulacionesFiltradas.length} simulaciones para el ID ${idBuscado}`);
        
        // Enviar resultado al cliente
        res.json({ 
            simulaciones: simulacionesFiltradas,
            mensaje: `Se encontraron ${simulacionesFiltradas.length} simulaciones` 
        });
    } catch (error) {
        console.error('Error al buscar simulaciones:', error);
        res.status(500).json({ error: 'Error al buscar simulaciones: ' + error.message });
    }
});

// Ruta para obtener una simulación específica por ID
app.get('/obtener-simulacion', (req, res) => {
    const id = req.query.id;
    
    if (!id) {
        return res.status(400).json({ error: 'Debe proporcionar un ID para buscar' });
    }
    
    try {
        // Leer simulaciones
        const datos = leerSimulaciones();
        
        // Buscar por ID
        const simulacion = datos.simulaciones.find(sim => sim.id === id);
        
        if (simulacion) {
            res.json({ simulacion });
        } else {
            res.status(404).json({ error: 'Simulación no encontrada' });
        }
    } catch (error) {
        console.error('Error al obtener simulación:', error);
        res.status(500).json({ error: 'Error al obtener simulación' });
    }
});

// Nueva ruta para eliminar simulaciones
app.delete('/eliminar-simulacion', (req, res) => {
    const id = req.query.id;
    
    console.log("==== SOLICITUD DE ELIMINACIÓN RECIBIDA ====");
    console.log("ID a eliminar:", id);
    
    if (!id) {
        console.log("ERROR: No se proporcionó un ID para eliminar");
        return res.status(400).json({ error: 'Debe proporcionar un ID para eliminar' });
    }
    
    try {
        // Leer simulaciones existentes
        console.log("Leyendo archivo de simulaciones JSON");
        let datos = { simulaciones: [] };
        
        if (fs.existsSync(archivoSimulacionesJSON)) {
            const contenido = fs.readFileSync(archivoSimulacionesJSON, 'utf8');
            try {
                datos = JSON.parse(contenido);
                console.log(`Archivo leído correctamente, contiene ${datos.simulaciones.length} simulaciones`);
            } catch (e) {
                console.error("Error al parsear JSON:", e);
                return res.status(500).json({ error: 'Error al leer el archivo de simulaciones' });
            }
        } else {
            console.log("ADVERTENCIA: El archivo de simulaciones no existe");
            return res.status(404).json({ error: 'No se encontró el archivo de simulaciones' });
        }
        
        // Buscar la simulación a eliminar
        const simulacionIndex = datos.simulaciones.findIndex(sim => sim.id === id);
        
        if (simulacionIndex === -1) {
            console.log(`No se encontró simulación con ID ${id}`);
            return res.status(404).json({ error: 'Simulación no encontrada' });
        }
        
        // Guardar información de la simulación a eliminar para el registro
        const simulacionEliminada = datos.simulaciones[simulacionIndex];
        
        // Eliminar la simulación
        datos.simulaciones.splice(simulacionIndex, 1);
        console.log(`Simulación con ID ${id} eliminada del array`);
        
        // Guardar los cambios en el archivo JSON
        fs.writeFileSync(archivoSimulacionesJSON, JSON.stringify(datos, null, 2));
        console.log("Cambios guardados en el archivo JSON");
        
        // Registrar la eliminación en el archivo TXT
        const fechaEliminacion = new Date().toLocaleString();
        const registro = `\n[ELIMINACIÓN - ${fechaEliminacion}] ID: ${id}, Cliente: ${simulacionEliminada.nombre}, Identificación: ${simulacionEliminada.identificacion}\n`;
        
        fs.appendFileSync(archivoSimulacionesTXT, registro);
        console.log("Registro de eliminación añadido al archivo TXT");
        
        res.status(200).json({ 
            message: 'Simulación eliminada con éxito',
            id: id
        });
    } catch (error) {
        console.error('Error al eliminar simulación:', error);
        res.status(500).json({ error: 'Error al eliminar simulación: ' + error.message });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Archivos de simulaciones:
    - JSON: ${archivoSimulacionesJSON}
    - TXT: ${archivoSimulacionesTXT}`);
});
