/**
 * API de Tasas en Tiempo Real - Backend
 * Este archivo maneja los endpoints para proporcionar datos actualizados
 * de tasas de interés en tiempo real para diferentes entidades y tipos de préstamos.
 */

const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Datos de tasas en formato JSON (en producción, esto podría venir de una base de datos)
let tasasData = {
    // Datos iniciales para diferentes tipos de préstamos
    personal: [],
    hipotecario: [],
    vehicular: [],
    libranza: [],
    microcredito: [],
    tarjeta: []
};

// Entidades bancarias
const ENTIDADES = [
    { id: 'bancolombia', nombre: 'Bancolombia' },
    { id: 'davivienda', nombre: 'Davivienda' },
    { id: 'bbva', nombre: 'BBVA' },
    { id: 'bogota', nombre: 'Banco de Bogotá' },
    { id: 'occidente', nombre: 'Banco de Occidente' },
    { id: 'popular', nombre: 'Banco Popular' },
    { id: 'scotiabank', nombre: 'Scotiabank Colpatria' },
    { id: 'av-villas', nombre: 'AV Villas' },
    { id: 'falabella', nombre: 'Banco Falabella' },
    { id: 'pichincha', nombre: 'Banco Pichincha' }
];

// Valores por defecto para cada tipo de préstamo
const DEFAULTS = {
    personal: {
        tasaMensual: 1.5,
        tasaAnual: 19.5,
        montoMinimo: 1000000,
        montoMaximo: 50000000
    },
    hipotecario: {
        tasaMensual: 0.8,
        tasaAnual: 10.0,
        montoMinimo: 20000000,
        montoMaximo: 400000000
    },
    vehicular: {
        tasaMensual: 1.2,
        tasaAnual: 15.4,
        montoMinimo: 5000000,
        montoMaximo: 120000000
    },
    libranza: {
        tasaMensual: 1.0,
        tasaAnual: 12.7,
        montoMinimo: 3000000,
        montoMaximo: 100000000
    },
    microcredito: {
        tasaMensual: 2.2,
        tasaAnual: 30.0,
        montoMinimo: 500000,
        montoMaximo: 20000000
    },
    tarjeta: {
        tasaMensual: 2.5,
        tasaAnual: 34.0,
        montoMinimo: 1000000,
        montoMaximo: 30000000
    }
};

// Ruta de archivo para guardar los datos
const dataFilePath = path.join(__dirname, 'data', 'tasas-tiempo-real.json');

// Intentar cargar datos guardados al iniciar
try {
    if (fs.existsSync(dataFilePath)) {
        const rawData = fs.readFileSync(dataFilePath, 'utf8');
        const savedData = JSON.parse(rawData);
        tasasData = { ...tasasData, ...savedData };
        console.log('Datos de tasas cargados desde archivo');
    } else {
        // Si no existe el archivo, inicializar con datos de prueba y guardarlo
        inicializarDatosDePrueba();
        guardarDatos();
        console.log('Datos de tasas inicializados con valores por defecto');
    }
} catch (error) {
    console.error('Error al cargar los datos de tasas:', error);
    // Inicializar con datos de prueba en caso de error
    inicializarDatosDePrueba();
}

/**
 * Inicializa los datos de prueba para todos los tipos de préstamos
 */
function inicializarDatosDePrueba() {
    for (const tipo in DEFAULTS) {
        tasasData[tipo] = generarTasasParaTipo(tipo);
    }
}

/**
 * Genera datos de tasas para un tipo específico de préstamo
 * @param {string} tipo - Tipo de préstamo
 * @returns {Array} Array de objetos con datos de tasas
 */
function generarTasasParaTipo(tipo) {
    const config = DEFAULTS[tipo];
    
    return ENTIDADES.map(entidad => {
        // Variaciones aleatorias para simular diferencias entre entidades
        const variacion = (Math.random() * 0.6) - 0.3; // Entre -0.3% y +0.3%
        const tasaMensual = parseFloat((config.tasaMensual + variacion).toFixed(2));
        const tasaAnual = parseFloat((tasaMensual * 12.5).toFixed(2)); // Aproximación de tasa efectiva anual
        
        // Variación en montos
        const minVariacion = Math.random() * 0.4 + 0.8; // Entre 0.8 y 1.2
        const maxVariacion = Math.random() * 0.4 + 0.9; // Entre 0.9 y 1.3
        
        return {
            entidadId: entidad.id,
            tasaMensual: tasaMensual,
            tasaAnual: tasaAnual,
            montoMinimo: Math.round(config.montoMinimo * minVariacion),
            montoMaximo: Math.round(config.montoMaximo * maxVariacion),
            fechaActualizacion: new Date().toISOString()
        };
    });
}

/**
 * Guarda los datos actualizados en el archivo JSON
 */
function guardarDatos() {
    try {
        // Asegurarse de que el directorio exista
        const dirPath = path.dirname(dataFilePath);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
        
        fs.writeFileSync(dataFilePath, JSON.stringify(tasasData, null, 2), 'utf8');
        console.log('Datos de tasas guardados correctamente');
    } catch (error) {
        console.error('Error al guardar los datos de tasas:', error);
    }
}

// Endpoint para obtener todas las tasas por tipo de préstamo
router.get('/:tipo', (req, res) => {
    const tipo = req.params.tipo;
    
    // Verificar si el tipo de préstamo existe
    if (!tasasData[tipo]) {
        return res.status(404).json({
            error: 'Tipo de préstamo no encontrado',
            tiposDisponibles: Object.keys(tasasData)
        });
    }
    
    // Añadir encabezados CORS para desarrollo local
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    
    // Devolver los datos solicitados
    res.json(tasasData[tipo]);
});

// Endpoint para obtener lista de tipos de préstamos disponibles
router.get('/', (req, res) => {
    const tiposDisponibles = Object.keys(tasasData).map(tipo => ({
        id: tipo,
        nombre: tipo.charAt(0).toUpperCase() + tipo.slice(1),
        cantidadEntidades: tasasData[tipo].length
    }));
    
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    
    res.json(tiposDisponibles);
});

// Endpoint para actualizar tasas (protegido con clave de API)
router.post('/actualizar/:tipo', (req, res) => {
    const apiKey = req.headers['x-api-key'];
    
    // Verificar autenticación (en una aplicación real, esto debería ser más seguro)
    if (!apiKey || apiKey !== process.env.TASAS_API_KEY) {
        return res.status(401).json({ error: 'No autorizado' });
    }
    
    const tipo = req.params.tipo;
    const nuevasTasas = req.body;
    
    // Validar datos
    if (!tasasData[tipo]) {
        return res.status(404).json({ error: 'Tipo de préstamo no encontrado' });
    }
    
    if (!Array.isArray(nuevasTasas)) {
        return res.status(400).json({ error: 'Formato inválido. Se espera un array de tasas' });
    }
    
    // Actualizar los datos
    try {
        tasasData[tipo] = nuevasTasas.map(tasa => ({
            entidadId: tasa.entidadId,
            tasaMensual: parseFloat(tasa.tasaMensual),
            tasaAnual: parseFloat(tasa.tasaAnual),
            montoMinimo: parseInt(tasa.montoMinimo),
            montoMaximo: parseInt(tasa.montoMaximo),
            fechaActualizacion: new Date().toISOString()
        }));
        
        // Guardar los datos actualizados
        guardarDatos();
        
        res.json({ 
            mensaje: `Tasas de ${tipo} actualizadas correctamente`, 
            timestamp: new Date().toISOString() 
        });
    } catch (error) {
        console.error('Error al actualizar tasas:', error);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
});

// Endpoint para actualizar una única tasa
router.post('/actualizar/:tipo/:entidadId', (req, res) => {
    const apiKey = req.headers['x-api-key'];
    
    // Verificar autenticación
    if (!apiKey || apiKey !== process.env.TASAS_API_KEY) {
        return res.status(401).json({ error: 'No autorizado' });
    }
    
    const { tipo, entidadId } = req.params;
    const nuevaTasa = req.body;
    
    // Validaciones
    if (!tasasData[tipo]) {
        return res.status(404).json({ error: 'Tipo de préstamo no encontrado' });
    }
    
    const indiceEntidad = tasasData[tipo].findIndex(t => t.entidadId === entidadId);
    if (indiceEntidad === -1) {
        return res.status(404).json({ error: 'Entidad no encontrada para este tipo de préstamo' });
    }
    
    try {
        // Actualizar solo la tasa específica
        tasasData[tipo][indiceEntidad] = {
            entidadId: entidadId,
            tasaMensual: parseFloat(nuevaTasa.tasaMensual),
            tasaAnual: parseFloat(nuevaTasa.tasaAnual),
            montoMinimo: parseInt(nuevaTasa.montoMinimo),
            montoMaximo: parseInt(nuevaTasa.montoMaximo),
            fechaActualizacion: new Date().toISOString()
        };
        
        // Guardar los datos actualizados
        guardarDatos();
        
        res.json({ 
            mensaje: `Tasa de ${entidadId} para ${tipo} actualizada correctamente`, 
            timestamp: new Date().toISOString() 
        });
    } catch (error) {
        console.error('Error al actualizar tasa individual:', error);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
});

module.exports = router;