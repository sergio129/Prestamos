/**
 * Funcionalidad del panel de contacto
 */

(function() {
    // Función para inicializar el panel de contacto cuando el DOM esté cargado
    function initContactPanel() {
        console.log('Inicializando panel de contacto...');
        
        const contactToggle = document.getElementById('contact-toggle');
        const contactPanel = document.getElementById('contact-panel');
        
        if (!contactToggle || !contactPanel) {
            console.error('No se encontraron elementos del panel de contacto');
            return;
        }
        
        // Manejar clic en el botón de toggle
        contactToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            contactPanel.classList.toggle('active');
            console.log('Panel de contacto ' + (contactPanel.classList.contains('active') ? 'abierto' : 'cerrado'));
        });
        
        // Cerrar panel al hacer clic en cualquier otra parte
        document.addEventListener('click', function(e) {
            if (contactPanel.classList.contains('active') && 
                !contactPanel.contains(e.target) && 
                e.target !== contactToggle && 
                !contactToggle.contains(e.target)) {
                contactPanel.classList.remove('active');
            }
        });
        
        // Prevenir cierre cuando se hace clic dentro del panel
        contactPanel.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        console.log('Panel de contacto inicializado');
    }
    
    // Ejecutar cuando el DOM esté cargado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initContactPanel);
    } else {
        // DOM ya está cargado
        initContactPanel();
    }
})();
