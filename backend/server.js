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

// Ruta al archivo de simulaciones
const archivoSimulaciones = path.join(__dirname, 'simulaciones.json');

// Asegurarse de que el archivo exista
if (!fs.existsSync(archivoSimulaciones)) {
    fs.writeFileSync(archivoSimulaciones, JSON.stringify({ simulaciones: [] }));
}

// Función para leer simulaciones
function leerSimulaciones() {
    try {
        const contenido = fs.readFileSync(archivoSimulaciones, 'utf8');
        return JSON.parse(contenido);
    } catch (error) {
        console.error('Error al leer simulaciones:', error);
        return { simulaciones: [] };
    }
}

// Función para escribir simulaciones
function escribirSimulaciones(datos) {
    try {
        fs.writeFileSync(archivoSimulaciones, JSON.stringify(datos, null, 2));
        return true;
    } catch (error) {
        console.error('Error al escribir simulaciones:', error);
        return false;
    }
}

// Ruta principal - sirve la aplicación
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Ruta para guardar simulaciones
app.post('/guardar-simulacion', (req, res) => {
    // Obtener datos de la simulación
    const simulacion = req.body;
    
    // Validar que la simulación contenga los datos necesarios
    if (!simulacion.monto || !simulacion.plazo || !simulacion.interesMensual || 
        !simulacion.identificacion || !simulacion.nombre) {
        return res.status(400).json({ error: 'Datos de simulación incompletos' });
    }
    
    try {
        // Leer simulaciones existentes
        const datos = leerSimulaciones();
        
        // Generar ID único
        const id = Date.now().toString();
        
        // Agregar simulación con ID
        datos.simulaciones.push({
            id: id,
            ...simulacion
        });
        
        // Guardar datos actualizados
        if (escribirSimulaciones(datos)) {
            // También guardar en archivo de texto plano para compatibilidad
            const textoSimulacion = `ID: ${id} | Cliente: ${simulacion.nombre} | Identificación: ${simulacion.identificacion} | Monto: ${simulacion.monto} | Plazo: ${simulacion.plazo} meses | Interés: ${simulacion.interesMensual}% | Fecha: ${simulacion.fecha}\n`;
            fs.appendFileSync(path.join(__dirname, 'simulaciones.txt'), textoSimulacion);
            
            res.status(200).json({ message: 'Simulación guardada con éxito' });
        } else {
            res.status(500).json({ error: 'Error al guardar la simulación' });
        }
    } catch (error) {
        console.error('Error al procesar la simulación:', error);
        res.status(500).json({ error: 'Error al procesar la simulación' });
    }
});

// Ruta para buscar simulaciones por ID de cliente
app.get('/buscar-simulaciones', (req, res) => {
    const identificacion = req.query.id;
    
    if (!identificacion) {
        return res.status(400).json({ error: 'Debe proporcionar un ID para buscar' });
    }
    
    try {
        // Leer simulaciones
        const datos = leerSimulaciones();
        
        // Filtrar por identificación
        const simulacionesFiltradas = datos.simulaciones.filter(
            sim => sim.identificacion === identificacion
        );
        
        res.json({ simulaciones: simulacionesFiltradas });
    } catch (error) {
        console.error('Error al buscar simulaciones:', error);
        res.status(500).json({ error: 'Error al buscar simulaciones' });
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

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
