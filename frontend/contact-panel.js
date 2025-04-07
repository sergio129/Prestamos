/**
 * Funcionalidad del panel de contacto
 * Este archivo gestiona la interactividad del panel de contacto flotante
 */

(function() {
    // Ejecutar cuando el DOM esté completamente cargado
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Inicializando panel de contacto...');
        
        // Obtener elementos
        const contactPanel = document.getElementById('contact-panel');
        const contactToggle = document.getElementById('contact-toggle');
        
        if (!contactPanel || !contactToggle) {
            console.error('No se encontraron los elementos del panel de contacto');
            return;
        }
        
        // Evento de clic en el botón de toggle
        contactToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Evitar propagación
            contactPanel.classList.toggle('active');
            console.log('Panel de contacto: ' + (contactPanel.classList.contains('active') ? 'abierto' : 'cerrado'));
        });
        
        // Evento para cerrar el panel cuando se hace clic fuera
        document.addEventListener('click', function(e) {
            if (contactPanel.classList.contains('active')) {
                // Verificar si el clic fue fuera del panel y no en el botón de toggle
                if (!contactPanel.contains(e.target) && e.target !== contactToggle && !contactToggle.contains(e.target)) {
                    contactPanel.classList.remove('active');
                    console.log('Panel de contacto cerrado por clic externo');
                }
            }
        });
        
        // Prevenir que los clics dentro del panel se propaguen al documento
        contactPanel.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        console.log('Panel de contacto inicializado');
    });
})();
