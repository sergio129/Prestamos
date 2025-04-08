/**
 * Script específico para la versión móvil
 * Maneja características específicas de la plataforma móvil
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar la aplicación móvil una vez que el DOM esté listo
    initMobileApp();
});

// Verificar si estamos en un contexto Capacitor/Cordova
function isNativeApp() {
    return typeof window.Capacitor !== 'undefined' || document.URL.includes('http://localhost');
}

// Inicialización de la aplicación móvil
async function initMobileApp() {
    console.log("Inicializando aplicación móvil...");
    
    // Agregar la barra de navegación móvil
    addMobileNavbar();
    
    // Ajustar los elementos de la interfaz para móvil
    adjustUIForMobile();
    
    // Configurar el comportamiento de pull-to-refresh
    setupPullToRefresh();
    
    // Manejar el estado de la red
    setupNetworkHandling();
}

// Agregar barra de navegación móvil
function addMobileNavbar() {
    const navbar = document.createElement('div');
    navbar.className = 'mobile-navbar';
    navbar.innerHTML = `
        <a href="#" class="nav-item active" data-view="calculator">
            <i class="fas fa-calculator"></i>
            <span>Calculadora</span>
        </a>
        <a href="#" class="nav-item" data-view="history">
            <i class="fas fa-history"></i>
            <span>Historial</span>
        </a>
        <a href="#" class="nav-item" data-view="charts">
            <i class="fas fa-chart-pie"></i>
            <span>Gráficos</span>
        </a>
        <a href="#" class="nav-item" data-view="settings">
            <i class="fas fa-cog"></i>
            <span>Ajustes</span>
        </a>
    `;
    
    document.body.appendChild(navbar);
    
    // Configurar eventos de la navegación
    const navItems = navbar.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Cambiar vista según la selección
            changeView(this.dataset.view);
        });
    });
}

// Cambiar entre vistas
function changeView(viewName) {
    console.log(`Cambiando a vista: ${viewName}`);
    
    // Implementar la lógica para cambiar de vista según necesidades
    // Por ejemplo, ocultar/mostrar diferentes secciones
}

// Ajustar UI para móvil
function adjustUIForMobile() {
    // Ajustar tamaños de botones y elementos de formulario para mejor experiencia táctil
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.classList.add('mobile-btn');
    });
    
    // Ajustar tamaño de modales
    const modals = document.querySelectorAll('.modal-content');
    modals.forEach(modal => {
        modal.classList.add('mobile-modal');
    });
}

// Configurar Pull-to-refresh
function setupPullToRefresh() {
    let startY = 0;
    const threshold = 150;
    let isPulling = false;
    
    document.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
        
        // Solo activar pull-to-refresh si estamos al principio de la página
        if (window.scrollY === 0) {
            isPulling = true;
        }
    }, { passive: true });
    
    document.addEventListener('touchmove', function(e) {
        if (!isPulling) return;
        
        const currentY = e.touches[0].clientY;
        const diff = currentY - startY;
        
        // Si estamos arrastrando hacia abajo
        if (diff > 0) {
            // Podríamos mostrar un indicador visual aquí
        }
    }, { passive: true });
    
    document.addEventListener('touchend', function() {
        if (!isPulling) return;
        
        isPulling = false;
        
        // Aquí podríamos implementar la recarga real
        // Por ahora solo recargamos la página
        // location.reload();
    }, { passive: true });
}

// Configurar el manejo de la red
function setupNetworkHandling() {
    // Crear un indicador de estado de red simple
    const networkStatus = document.createElement('div');
    networkStatus.className = 'network-status';
    networkStatus.style.display = 'none';
    networkStatus.textContent = 'Sin conexión';
    document.body.appendChild(networkStatus);
    
    // Escuchar eventos de estado de red
    window.addEventListener('online', function() {
        networkStatus.style.display = 'none';
    });
    
    window.addEventListener('offline', function() {
        networkStatus.style.display = 'block';
    });
    
    // Verificar estado inicial
    if (!navigator.onLine) {
        networkStatus.style.display = 'block';
    }
}
