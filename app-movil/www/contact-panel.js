/**
 * Script para el panel de contacto
 * Asegura que el panel de contacto se muestre correctamente y sea interactivo
 */

(function() {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Inicializando panel de contacto...');
        
        // Verificar si ya existe el panel de contacto
        let contactPanel = document.getElementById('contact-panel');
        
        // Si no existe, crearlo
        if (!contactPanel) {
            console.log('Panel de contacto no encontrado, creándolo...');
            
            // Crear el panel de contacto
            contactPanel = document.createElement('div');
            contactPanel.className = 'contact-panel';
            contactPanel.id = 'contact-panel';
            
            contactPanel.innerHTML = `
                <div class="contact-toggle" id="contact-toggle">
                    <i class="fas fa-comments"></i>
                </div>
                <div class="contact-content">
                    <h3>Contáctenos</h3>
                    <div class="contact-options">
                        <a href="https://wa.me/573103904286" target="_blank" class="contact-option whatsapp">
                            <i class="fab fa-whatsapp"></i>
                            <span>WhatsApp</span>
                        </a>
                        <a href="https://facebook.com/" target="_blank" class="contact-option facebook">
                            <i class="fab fa-facebook"></i>
                            <span>Facebook</span>
                        </a>
                        <a href="https://instagram.com/" target="_blank" class="contact-option instagram">
                            <i class="fab fa-instagram"></i>
                            <span>Instagram</span>
                        </a>
                        <a href="mailto:info@prestamos.com" class="contact-option email">
                            <i class="fas fa-envelope"></i>
                            <span>Email</span>
                        </a>
                    </div>
                </div>
            `;
            
            document.body.appendChild(contactPanel);
        }
        
        // Configurar evento toggle
        const contactToggle = document.getElementById('contact-toggle');
        if (contactToggle) {
            console.log('Toggle encontrado, configurando evento');
            contactToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                contactPanel.classList.toggle('active');
                console.log('Panel de contacto: ' + (contactPanel.classList.contains('active') ? 'abierto' : 'cerrado'));
            });
        } else {
            console.error('No se encontró el toggle del panel de contacto');
        }
        
        // Cerrar el panel al hacer clic fuera de él
        document.addEventListener('click', function(e) {
            if (contactPanel && contactPanel.classList.contains('active')) {
                // Verificar si el clic fue dentro del panel
                if (!contactPanel.contains(e.target)) {
                    contactPanel.classList.remove('active');
                }
            }
        });
        
        // Prevenir que los clics dentro del panel lo cierren
        contactPanel.addEventListener('click', function(e) {
            // No propagar clics dentro del panel
            e.stopPropagation();
        });

        // Asegurarse de que las opciones de contacto funcionen correctamente
        const contactOptions = contactPanel.querySelectorAll('.contact-option');
        contactOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                // Permitir que los enlaces funcionen normalmente
                console.log('Opción de contacto seleccionada: ' + this.getAttribute('href'));
            });
        });

        // Asegurarse de que el panel esté visible
        if (contactPanel) {
            // Asignar estilos explícitamente para asegurar visibilidad
            contactPanel.style.position = 'fixed';
            contactPanel.style.bottom = '20px';
            contactPanel.style.right = '20px';
            contactPanel.style.zIndex = '999';
            
            // Asegurarse de que el panel no esté oculto
            contactPanel.style.display = 'block';
        }
    }

    // Inicializar cuando el DOM esté completamente cargado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initContactPanel);
    } else {
        // Si el DOM ya está cargado
        initContactPanel();
    }

    // También inicializar con una pequeña demora para asegurar que todo esté cargado
    setTimeout(initContactPanel, 1000);
})();
