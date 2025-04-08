/**
 * Registro del Service Worker para habilitar funcionalidades PWA
 * Este archivo debe incluirse en el index.html principal
 */

// Registrar Service Worker solo si el navegador lo soporta
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registrado con éxito:', registration.scope);
        
        // Verificar actualizaciones del Service Worker
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          console.log('Nuevo Service Worker instalándose:', newWorker);
          
          // Notificar al usuario cuando hay una nueva versión
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('Nueva versión disponible');
              mostrarNotificacionActualizacion();
            }
          });
        });
      })
      .catch(error => {
        console.error('Error al registrar Service Worker:', error);
      });
      
    // Escuchar por actualizaciones del Service Worker
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        refreshing = true;
        window.location.reload();
      }
    });
  });
}

/**
 * Muestra una notificación para actualizar la aplicación
 */
function mostrarNotificacionActualizacion() {
  const notificacion = document.createElement('div');
  notificacion.className = 'actualizacion-notificacion';
  notificacion.innerHTML = `
    <p>¡Hay una nueva versión disponible!</p>
    <button id="actualizar-app-btn">Actualizar ahora</button>
  `;
  
  document.body.appendChild(notificacion);
  
  document.getElementById('actualizar-app-btn').addEventListener('click', () => {
    window.location.reload();
    notificacion.remove();
  });
}