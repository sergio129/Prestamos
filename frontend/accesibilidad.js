/**
 * Script para manejar funciones de accesibilidad
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log("Inicializando sistema de accesibilidad...");
    
    // Referencias a elementos
    const a11yHelpBtn = document.getElementById('a11y-help');
    const a11yMenu = document.getElementById('a11y-menu');
    const a11yOptions = document.querySelectorAll('.a11y-option');
    
    // Verificar que existan los elementos necesarios
    if (!a11yHelpBtn || !a11yMenu) {
        console.error("No se encontraron los elementos de accesibilidad");
        return;
    }
    
    // Estado de las opciones de accesibilidad
    let a11ySettings = {
        contrast: false,
        fontSize: false,
        lineSpacing: false,
        focusMode: false
    };
    
    // Cargar configuración guardada
    try {
        const savedSettings = localStorage.getItem('a11y-settings');
        if (savedSettings) {
            a11ySettings = JSON.parse(savedSettings);
            console.log("Configuración de accesibilidad cargada:", a11ySettings);
            
            // Aplicar configuraciones guardadas
            applySettings();
        }
    } catch (error) {
        console.error("Error al cargar configuración de accesibilidad:", error);
    }
    
    // Mostrar/ocultar menú de accesibilidad
    a11yHelpBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        a11yMenu.classList.toggle('show');
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!a11yHelpBtn.contains(e.target) && !a11yMenu.contains(e.target)) {
            a11yMenu.classList.remove('show');
        }
    });
    
    // Manejar clics en opciones
    a11yOptions.forEach(option => {
        // Marcar opciones activas
        const optionType = option.getAttribute('data-option');
        if (a11ySettings[optionType]) {
            option.classList.add('active');
        }
        
        // Añadir evento de clic
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            const type = this.getAttribute('data-option');
            
            // Cambiar estado
            a11ySettings[type] = !a11ySettings[type];
            
            // Actualizar visual
            this.classList.toggle('active', a11ySettings[type]);
            
            // Aplicar cambio
            applyOption(type);
            
            // Guardar configuración
            saveSettings();
        });
    });
    
    // Aplicar todas las configuraciones activas
    function applySettings() {
        Object.keys(a11ySettings).forEach(option => {
            if (a11ySettings[option]) {
                applyOption(option);
                document.querySelector(`.a11y-option[data-option="${option}"]`)?.classList.add('active');
            }
        });
    }
    
    // Aplicar una opción específica
    function applyOption(option) {
        const enabled = a11ySettings[option];
        
        switch (option) {
            case 'contrast':
                document.body.classList.toggle('high-contrast', enabled);
                break;
                
            case 'fontSize':
                document.body.classList.toggle('larger-text', enabled);
                break;
                
            case 'lineSpacing':
                document.body.classList.toggle('wider-spacing', enabled);
                break;
                
            case 'focusMode':
                document.body.classList.toggle('focus-mode', enabled);
                break;
        }
    }
    
    // Guardar configuración en localStorage
    function saveSettings() {
        try {
            localStorage.setItem('a11y-settings', JSON.stringify(a11ySettings));
            console.log("Configuración de accesibilidad guardada");
        } catch (error) {
            console.error("Error al guardar configuración de accesibilidad:", error);
        }
    }
});
