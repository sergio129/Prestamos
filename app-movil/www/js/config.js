/**
 * Configuración global para la aplicación
 */
const API_CONFIG = {
    // Base URL para peticiones de API - se ajusta automáticamente según el entorno
    BASE_URL: '',
    
    // Endpoints de API
    ENDPOINTS: {
        BUSCAR_SIMULACIONES: '/buscar-simulaciones',
        GUARDAR_SIMULACION: '/guardar-simulacion',
        OBTENER_SIMULACION: '/obtener-simulacion',
        ELIMINAR_SIMULACION: '/eliminar-simulacion'
    },
    
    // Función para obtener la URL completa de un endpoint
    getUrl: function(endpoint) {
        return this.BASE_URL + endpoint;
    }
};

// Si estamos en desarrollo local, usa el hostname actual
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // Configuración para desarrollo local
    API_CONFIG.BASE_URL = 'http://localhost:3000';
}
