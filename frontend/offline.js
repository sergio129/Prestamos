// Módulo para gestionar funcionalidades offline
const OfflineManager = (() => {
    // Nombre de la base de datos IndexedDB
    const DB_NAME = 'prestamos-offline-db';
    const DB_VERSION = 1;
    const STORE_NAME = 'simulaciones';
    
    let db;
    
    // Inicializa la base de datos
    function initDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);
            
            // Se ejecuta si necesitamos crear/actualizar la estructura de la BD
            request.onupgradeneeded = (event) => {
                db = event.target.result;
                
                // Crea el almacén de objetos para simulaciones si no existe
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
                    // Índice para encontrar simulaciones pendientes de sincronizar
                    store.createIndex('sincronizado', 'sincronizado', { unique: false });
                    store.createIndex('fecha', 'fecha', { unique: false });
                }
            };
            
            // Manejo de error
            request.onerror = (event) => {
                console.error('Error al abrir IndexedDB:', event.target.error);
                reject(event.target.error);
            };
            
            // Conexión exitosa
            request.onsuccess = (event) => {
                db = event.target.result;
                console.log('IndexedDB inicializada correctamente');
                resolve(db);
            };
        });
    }
    
    // Guarda una simulación en IndexedDB
    async function guardarSimulacion(simulacion) {
        // Asegurarse de que la BD está inicializada
        if (!db) {
            await initDB();
        }
        
        return new Promise((resolve, reject) => {
            // Genera un ID único si no tiene uno
            if (!simulacion.id) {
                simulacion.id = `sim_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
            }
            
            // Añade metadatos para el modo offline
            simulacion.fecha = new Date().toISOString();
            simulacion.sincronizado = false;
            
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            
            const request = store.put(simulacion);
            
            request.onerror = (event) => {
                console.error('Error al guardar simulación offline:', event.target.error);
                reject(event.target.error);
            };
            
            request.onsuccess = () => {
                console.log('Simulación guardada en modo offline:', simulacion.id);
                
                // Registra una tarea de sincronización para cuando vuelva la conexión
                if ('serviceWorker' in navigator && 'SyncManager' in window) {
                    navigator.serviceWorker.ready
                        .then(reg => {
                            return reg.sync.register('sync-simulaciones');
                        })
                        .catch(err => console.log('Error al registrar sync:', err));
                }
                
                resolve(simulacion);
            };
        });
    }
    
    // Obtiene todas las simulaciones almacenadas
    async function obtenerSimulaciones() {
        // Asegurarse de que la BD está inicializada
        if (!db) {
            await initDB();
        }
        
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const index = store.index('fecha');
            
            // Obtiene todos los registros ordenados por fecha (más recientes primero)
            const request = index.openCursor(null, 'prev');
            const simulaciones = [];
            
            request.onerror = (event) => {
                console.error('Error al obtener simulaciones:', event.target.error);
                reject(event.target.error);
            };
            
            request.onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    simulaciones.push(cursor.value);
                    cursor.continue();
                } else {
                    resolve(simulaciones);
                }
            };
        });
    }
    
    // Obtiene simulaciones no sincronizadas (para el Service Worker)
    async function obtenerSimulacionesPendientes() {
        // Asegurarse de que la BD está inicializada
        if (!db) {
            await initDB();
        }
        
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const index = store.index('sincronizado');
            
            // Busca simulaciones no sincronizadas
            const request = index.getAll(IDBKeyRange.only(false));
            
            request.onerror = (event) => {
                console.error('Error al obtener simulaciones pendientes:', event.target.error);
                reject(event.target.error);
            };
            
            request.onsuccess = (event) => {
                resolve(event.target.result);
            };
        });
    }
    
    // Marca una simulación como sincronizada
    async function marcarComoSincronizada(id) {
        // Asegurarse de que la BD está inicializada
        if (!db) {
            await initDB();
        }
        
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            
            // Primero obtenemos la simulación
            const getRequest = store.get(id);
            
            getRequest.onerror = (event) => {
                console.error('Error al obtener simulación para sincronizar:', event.target.error);
                reject(event.target.error);
            };
            
            getRequest.onsuccess = (event) => {
                const simulacion = event.target.result;
                if (simulacion) {
                    // Actualiza la bandera de sincronización
                    simulacion.sincronizado = true;
                    
                    // Guarda los cambios
                    const updateRequest = store.put(simulacion);
                    
                    updateRequest.onerror = (event) => {
                        console.error('Error al marcar simulación como sincronizada:', event.target.error);
                        reject(event.target.error);
                    };
                    
                    updateRequest.onsuccess = () => {
                        console.log('Simulación marcada como sincronizada:', id);
                        resolve(true);
                    };
                } else {
                    console.warn('No se encontró la simulación a sincronizar:', id);
                    resolve(false);
                }
            };
        });
    }
    
    // Comprueba si hay conexión a internet
    function hayConexion() {
        return navigator.onLine;
    }
    
    // Intenta sincronizar simulaciones pendientes
    async function sincronizar() {
        // Solo intenta sincronizar si hay conexión
        if (!hayConexion()) {
            console.log('No hay conexión para sincronizar datos');
            return false;
        }
        
        try {
            const pendientes = await obtenerSimulacionesPendientes();
            
            if (pendientes.length === 0) {
                console.log('No hay simulaciones pendientes de sincronizar');
                return true;
            }
            
            console.log(`Sincronizando ${pendientes.length} simulaciones`);
            
            // Intenta enviar cada simulación al servidor
            for (const simulacion of pendientes) {
                try {
                    const response = await fetch('/api/simulaciones', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(simulacion)
                    });
                    
                    if (response.ok) {
                        await marcarComoSincronizada(simulacion.id);
                    } else {
                        console.error('Error al sincronizar con el servidor:', await response.text());
                    }
                } catch (error) {
                    console.error('Error al sincronizar simulación:', error);
                }
            }
            
            return true;
        } catch (error) {
            console.error('Error durante la sincronización:', error);
            return false;
        }
    }
    
    // Muestra un banner informativo sobre el estado de conexión
    function mostrarEstadoConexion() {
        // Si ya existe un banner, lo eliminamos
        const bannerExistente = document.getElementById('offline-banner');
        if (bannerExistente) {
            bannerExistente.remove();
        }
        
        // Crea un nuevo banner
        const banner = document.createElement('div');
        banner.id = 'offline-banner';
        banner.style.position = 'fixed';
        banner.style.top = '0';
        banner.style.left = '0';
        banner.style.right = '0';
        banner.style.padding = '10px';
        banner.style.textAlign = 'center';
        banner.style.zIndex = '9999';
        banner.style.fontWeight = 'bold';
        
        if (navigator.onLine) {
            banner.textContent = '✅ Conexión restaurada';
            banner.style.backgroundColor = '#4caf50';
            banner.style.color = 'white';
            
            // El banner desaparece después de 3 segundos
            setTimeout(() => {
                banner.remove();
            }, 3000);
        } else {
            banner.textContent = '⚠️ Sin conexión - Modo offline activado';
            banner.style.backgroundColor = '#ff9800';
            banner.style.color = 'white';
        }
        
        document.body.appendChild(banner);
    }
    
    // Inicializa los eventos de conexión
    function inicializarEventosConexion() {
        window.addEventListener('online', () => {
            mostrarEstadoConexion();
            // Intenta sincronizar cuando vuelve la conexión
            sincronizar();
        });
        
        window.addEventListener('offline', () => {
            mostrarEstadoConexion();
        });
        
        // Muestra el banner si estamos offline al cargar la página
        if (!navigator.onLine) {
            // Esperamos a que el DOM esté listo
            window.addEventListener('DOMContentLoaded', () => {
                mostrarEstadoConexion();
            });
        }
    }
    
    // Inicializa el módulo
    function init() {
        initDB()
            .then(() => {
                console.log('Sistema offline inicializado correctamente');
                inicializarEventosConexion();
            })
            .catch(error => {
                console.error('Error al inicializar sistema offline:', error);
            });
    }
    
    // Interfaz pública del módulo
    return {
        init,
        guardarSimulacion,
        obtenerSimulaciones,
        sincronizar,
        hayConexion,
        // Exportamos estas funciones para que el service worker pueda usarlas
        obtenerSimulacionesPendientes,
        marcarComoSincronizada
    };
})();

// Expone funciones para que el service worker pueda usarlas
window.getOfflineSimulaciones = OfflineManager.obtenerSimulacionesPendientes;
window.marcarSimulacionSincronizada = OfflineManager.marcarComoSincronizada;

// Inicializa el sistema offline cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    OfflineManager.init();
});

// Exporta el módulo para usarlo en otros archivos
window.OfflineManager = OfflineManager;