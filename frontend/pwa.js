// Registrar el Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(registration => {
        console.log('Service Worker registrado con éxito:', registration.scope);
        
        // Verificar actualizaciones del Service Worker
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // Hay una nueva versión disponible
              mostrarNotificacionActualizacion();
            }
          });
        });
      })
      .catch(error => {
        console.error('Error al registrar el Service Worker:', error);
      });
    
    // Escuchar cambios de estado de la conexión
    window.addEventListener('online', actualizarEstadoConexion);
    window.addEventListener('offline', actualizarEstadoConexion);
    
    // Verificar estado inicial
    actualizarEstadoConexion();
  });
}

// Verificar si hay una nueva versión de la aplicación
function verificarActualizaciones() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistration().then(registration => {
      if (registration) {
        registration.update();
      }
    });
  }
}

// Mostrar notificación de que hay una actualización disponible
function mostrarNotificacionActualizacion() {
  // Crear elemento de notificación
  const notificacion = document.createElement('div');
  notificacion.className = 'actualizacion-notificacion';
  notificacion.innerHTML = `
    <div class="actualizacion-mensaje">
      <p>¡Hay una nueva versión disponible!</p>
      <button id="btn-actualizar" class="btn btn-primary">Actualizar ahora</button>
    </div>
  `;
  
  document.body.appendChild(notificacion);
  
  // Escuchar clic en el botón de actualización
  document.getElementById('btn-actualizar').addEventListener('click', () => {
    window.location.reload();
  });
  
  // Agregar estilos si no están ya en la página
  if (!document.getElementById('estilos-notificacion-actualizacion')) {
    const estilos = document.createElement('style');
    estilos.id = 'estilos-notificacion-actualizacion';
    estilos.textContent = `
      .actualizacion-notificacion {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #3498db;
        color: white;
        padding: 10px 15px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: aparecer 0.3s ease-out;
      }
      .actualizacion-mensaje {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .actualizacion-mensaje p {
        margin: 0;
      }
      @keyframes aparecer {
        from { transform: translateY(100px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
    `;
    document.head.appendChild(estilos);
  }
}

// Actualizar la UI basado en el estado de la conexión
function actualizarEstadoConexion() {
  const estaOnline = navigator.onLine;
  
  // Crear o actualizar el indicador de estado
  let indicadorEstado = document.getElementById('indicador-conexion');
  
  if (!indicadorEstado) {
    indicadorEstado = document.createElement('div');
    indicadorEstado.id = 'indicador-conexion';
    document.body.appendChild(indicadorEstado);
    
    // Agregar estilos si no están ya en la página
    if (!document.getElementById('estilos-indicador-conexion')) {
      const estilos = document.createElement('style');
      estilos.id = 'estilos-indicador-conexion';
      estilos.textContent = `
        #indicador-conexion {
          position: fixed;
          top: 10px;
          right: 10px;
          padding: 5px 10px;
          border-radius: 3px;
          font-size: 12px;
          z-index: 9999;
          transition: all 0.3s ease;
        }
        #indicador-conexion.online {
          background-color: #2ecc71;
          color: white;
          opacity: 0;
          transform: translateY(-10px);
        }
        #indicador-conexion.offline {
          background-color: #e74c3c;
          color: white;
          opacity: 1;
          transform: translateY(0);
        }
        #indicador-conexion.mostrar {
          opacity: 1;
          transform: translateY(0);
        }
      `;
      document.head.appendChild(estilos);
    }
  }
  
  // Actualizar el estado y mensaje
  if (estaOnline) {
    indicadorEstado.className = 'online';
    indicadorEstado.textContent = 'En línea';
    
    // Mostrar brevemente y luego ocultar
    indicadorEstado.classList.add('mostrar');
    setTimeout(() => {
      indicadorEstado.classList.remove('mostrar');
    }, 3000);
    
    // Si estamos ahora online, intentar sincronización
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then(registration => {
        registration.sync.register('sync-simulaciones');
      });
    }
  } else {
    indicadorEstado.className = 'offline';
    indicadorEstado.textContent = 'Sin conexión';
    indicadorEstado.classList.add('mostrar');
  }
}

// Verificar actualizaciones cada cierto tiempo
setInterval(verificarActualizaciones, 30 * 60 * 1000); // Cada 30 minutos