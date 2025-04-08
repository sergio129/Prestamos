// Nombre del caché
const CACHE_NAME = 'prestamos-app-cache-v1';

// Archivos a cachear para funcionamiento offline
const FILES_TO_CACHE = [
  './',
  './index.html',
  './styles.css',
  './buttons.css',
  './finanzas-styles.css',
  './estilos-adicionales.css',
  './nuevas-funcionalidades.css',
  './inversiones-styles.css',
  './asesor-virtual-styles.css',
  './hipotecario-styles.css',
  './entidades-styles.css',
  './capacidad-styles.css',
  './comparador-tasas-styles.css',
  './dashboard-styles.css',
  './dashboard-access-styles.css',
  './notificaciones-styles.css',
  './pagos-anticipados-styles.css',
  './tasas-tiempo-real-styles.css',
  './herramientas-avanzadas.css',
  './fixer.js',
  './simulador.js',
  './mejoras.js',
  './accesibilidad.js',
  './pdf-sencillo.js',
  './calculadora-corregida.js',
  './finanzas-avanzadas.js',
  './herramientas-avanzadas.js',
  './init.js',
  './datos-financieros.js',
  './capacidad-endeudamiento.js',
  './comparador-tasas.js',
  './tasas-tiempo-real.js',
  './simulador-inversiones.js',
  './asesor-virtual.js',
  './hipotecario-subsidios.js',
  './comparador-entidades.js',
  './dashboard-financiero.js',
  './contact-panel.js',
  './notificaciones.js',
  './pagos-anticipados.js',
  './offline.js',
  './manifest.json',
  './img/icons/icon-192x192.png'
];

// Evento de instalación del Service Worker
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Instalando');
  
  // Precarga archivos en caché
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Añadiendo archivos al caché');
        return cache.addAll(FILES_TO_CACHE);
      })
      .then(() => {
        // Fuerza que el service worker espere a que termine la instalación
        // antes de activarse
        return self.skipWaiting();
      })
  );
});

// Evento de activación - limpia cachés antiguos
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activado');
  
  const currentCaches = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!currentCaches.includes(cacheName)) {
            console.log('[Service Worker] Eliminando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Permite que el service worker tome control de las páginas inmediatamente
      return self.clients.claim();
    })
  );
});

// Estrategia de caché: Cache primero, luego red con actualización de caché
self.addEventListener('fetch', (event) => {
  // Solo maneja solicitudes GET
  if (event.request.method !== 'GET') return;
  
  // Ignora las solicitudes a la API
  if (event.request.url.includes('/api/')) return;
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Caché hit - devuelve la respuesta
        if (response) {
          console.log('[Service Worker] Sirviendo desde caché:', event.request.url);
          
          // Intenta actualizar el caché en segundo plano
          fetch(event.request).then(function(networkResponse) {
            if (networkResponse) {
              caches.open(CACHE_NAME).then(function(cache) {
                cache.put(event.request, networkResponse.clone());
              });
            }
          }).catch(() => {
            // Error de red, no hacemos nada porque ya tenemos caché
          });
          
          return response;
        }
        
        // No se encontró en caché, intentamos con la red
        console.log('[Service Worker] Solicitando a la red:', event.request.url);
        return fetch(event.request)
          .then((networkResponse) => {
            // Si tenemos una respuesta válida, la guardamos en caché
            if (networkResponse && networkResponse.status === 200) {
              let responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseToCache);
              });
            }
            return networkResponse;
          })
          .catch((error) => {
            console.log('[Service Worker] Error en fetch:', error);
            
            // Si es una solicitud de página HTML, muestra la página offline
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match('./offline.html');
            }
            
            // Para otras solicitudes, simplemente fallamos
            return new Response('No hay conexión a Internet', {
              status: 503,
              statusText: 'Sin conexión'
            });
          });
      })
  );
});

// Evento para sincronización en segundo plano
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-simulaciones') {
    event.waitUntil(sincronizarSimulaciones());
  }
});

// Función para sincronizar simulaciones guardadas localmente cuando vuelve la conexión
async function sincronizarSimulaciones() {
  try {
    // Abre la base de datos IndexedDB
    const simulacionesOffline = await getOfflineSimulaciones();
    
    // Si hay simulaciones para sincronizar
    if (simulacionesOffline && simulacionesOffline.length > 0) {
      // Intenta enviarlas al servidor
      for (const simulacion of simulacionesOffline) {
        try {
          await fetch('/api/simulaciones', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(simulacion)
          });
          
          // Si se envió con éxito, márcala como sincronizada
          await marcarSimulacionSincronizada(simulacion.id);
        } catch (error) {
          console.error('Error al sincronizar simulación:', error);
        }
      }
    }
  } catch (error) {
    console.error('Error en proceso de sincronización:', error);
  }
}

// Placeholder para funciones de IndexedDB (se implementarán en offline.js)
async function getOfflineSimulaciones() {
  // Esta función se implementará en offline.js
  return [];
}

async function marcarSimulacionSincronizada(id) {
  // Esta función se implementará en offline.js
  return;
}