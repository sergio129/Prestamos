/**
 * Sistema de Notificaciones Inteligentes para Simulador de Préstamos
 * Permite alertar a los usuarios sobre oportunidades de ahorro, recordatorios
 * de pago y cambios en tasas de interés.
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando sistema de notificaciones inteligentes...');
    
    // Crear botón para gestionar notificaciones
    const notificacionesBtn = document.createElement('button');
    notificacionesBtn.className = 'btn btn-notificaciones';
    notificacionesBtn.innerHTML = '<i class="fas fa-bell"></i> Notificaciones';
    notificacionesBtn.title = 'Centro de notificaciones y alertas';
    notificacionesBtn.style.marginTop = '15px';
    
    // Añadir botón después de otros botones existentes
    const otrosBtn = document.querySelector('.btn-inversion, .btn-capacidad, .btn-comparador');
    if (otrosBtn && otrosBtn.parentNode) {
        otrosBtn.parentNode.appendChild(notificacionesBtn);
    } else {
        const loanForm = document.getElementById('loan-form');
        if (loanForm) {
            const formContainer = loanForm.parentNode;
            if (formContainer) {
                formContainer.appendChild(notificacionesBtn);
            }
        }
    }
    
    // Crear el badge de notificaciones
    const notiBadge = document.createElement('span');
    notiBadge.className = 'notification-badge';
    notiBadge.textContent = '0';
    notiBadge.style.display = 'none';
    notificacionesBtn.appendChild(notiBadge);
    
    // Crear modal para notificaciones
    const notificacionesModal = document.createElement('div');
    notificacionesModal.id = 'notificaciones-modal';
    notificacionesModal.className = 'modal hidden';
    notificacionesModal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2><i class="fas fa-bell"></i> Centro de Notificaciones</h2>
            
            <div class="notification-config">
                <h3>Configuración de Alertas</h3>
                <div class="config-option">
                    <label>
                        <input type="checkbox" id="alert-tasas" checked>
                        Alertas de cambios en tasas de interés
                    </label>
                </div>
                <div class="config-option">
                    <label>
                        <input type="checkbox" id="alert-pagos" checked>
                        Recordatorios de pagos
                    </label>
                </div>
                <div class="config-option">
                    <label>
                        <input type="checkbox" id="alert-refinanciacion" checked>
                        Oportunidades de refinanciación
                    </label>
                </div>
                <div class="config-option">
                    <label>
                        <input type="checkbox" id="alert-consejos" checked>
                        Consejos financieros
                    </label>
                </div>
            </div>
            
            <div class="notification-frequency">
                <h3>Frecuencia de Verificación</h3>
                <select id="check-frequency">
                    <option value="daily">Diaria</option>
                    <option value="weekly" selected>Semanal</option>
                    <option value="monthly">Mensual</option>
                </select>
                <button id="save-notification-config" class="btn">Guardar Configuración</button>
            </div>
            
            <div class="notification-list">
                <h3>Notificaciones Recientes</h3>
                <div id="notifications-container">
                    <p class="empty-notification">No hay notificaciones recientes</p>
                </div>
            </div>
        </div>
    `;
    
    // Añadir modal al body
    document.body.appendChild(notificacionesModal);
    
    // Configurar el botón para abrir el modal
    notificacionesBtn.addEventListener('click', function() {
        notificacionesModal.classList.remove('hidden');
        // Al abrir, marcar como leídas
        marcarNotificacionesComoLeidas();
    });
    
    // Configurar el botón para cerrar el modal
    const closeModal = notificacionesModal.querySelector('.close-modal');
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            notificacionesModal.classList.add('hidden');
        });
    }
    
    // Cerrar modal al hacer click fuera
    window.addEventListener('click', function(event) {
        if (event.target === notificacionesModal) {
            notificacionesModal.classList.add('hidden');
        }
    });
    
    // Guardar configuración de notificaciones
    const saveConfigBtn = document.getElementById('save-notification-config');
    if (saveConfigBtn) {
        saveConfigBtn.addEventListener('click', function() {
            const config = {
                alertTasas: document.getElementById('alert-tasas').checked,
                alertPagos: document.getElementById('alert-pagos').checked,
                alertRefinanciacion: document.getElementById('alert-refinanciacion').checked,
                alertConsejos: document.getElementById('alert-consejos').checked,
                checkFrequency: document.getElementById('check-frequency').value,
                lastCheck: Date.now()
            };
            
            localStorage.setItem('notification_config', JSON.stringify(config));
            mostrarMensaje("Configuración de notificaciones guardada", "success");
        });
    }
    
    /**
     * Configuración inicial del sistema de notificaciones
     */
    function setupNotifications() {
        // Cargar configuración o usar valores predeterminados
        const configDefault = {
            alertTasas: true,
            alertPagos: true,
            alertRefinanciacion: true,
            alertConsejos: true,
            checkFrequency: 'weekly',
            lastCheck: 0
        };
        
        const config = JSON.parse(localStorage.getItem('notification_config') || JSON.stringify(configDefault));
        
        // Aplicar configuración a los controles
        document.getElementById('alert-tasas').checked = config.alertTasas;
        document.getElementById('alert-pagos').checked = config.alertPagos;
        document.getElementById('alert-refinanciacion').checked = config.alertRefinanciacion;
        document.getElementById('alert-consejos').checked = config.alertConsejos;
        document.getElementById('check-frequency').value = config.checkFrequency;
        
        // Solicitar permiso para notificaciones del navegador
        if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
            Notification.requestPermission().then(function(permission) {
                if (permission === 'granted') {
                    mostrarMensaje("Notificaciones activadas correctamente", "success");
                }
            });
        }
        
        // Verificar si es necesario realizar comprobaciones
        const now = Date.now();
        let checkInterval = 7 * 24 * 60 * 60 * 1000; // semanal (predeterminado)
        
        if (config.checkFrequency === 'daily') {
            checkInterval = 24 * 60 * 60 * 1000;
        } else if (config.checkFrequency === 'monthly') {
            checkInterval = 30 * 24 * 60 * 60 * 1000;
        }
        
        if (now - config.lastCheck > checkInterval) {
            realizarComprobaciones(config);
            
            // Actualizar timestamp de última comprobación
            config.lastCheck = now;
            localStorage.setItem('notification_config', JSON.stringify(config));
        }
        
        // Cargar y mostrar notificaciones guardadas
        cargarNotificaciones();
    }
    
    /**
     * Realizar comprobaciones para generar notificaciones
     * @param {Object} config - Configuración de notificaciones
     */
    function realizarComprobaciones(config) {
        console.log("Realizando comprobaciones de notificaciones...");
        
        // Si está activada la alerta de tasas, verificar cambios
        if (config.alertTasas) {
            verificarCambiosTasas();
        }
        
        // Si está activada la alerta de refinanciación, buscar oportunidades
        if (config.alertRefinanciacion) {
            buscarOportunidadesRefinanciacion();
        }
        
        // Si está activada la alerta de pagos, verificar próximos pagos
        if (config.alertPagos) {
            verificarProximosPagos();
        }
        
        // Si están activados los consejos, generar consejos personalizados
        if (config.alertConsejos) {
            generarConsejosFinancieros();
        }
    }
    
    /**
     * Verifica cambios en las tasas de interés respecto a simulaciones guardadas
     */
    async function verificarCambiosTasas() {
        try {
            // Simulamos obtener tasas actuales (en una implementación real, esto
            // sería una llamada a un API o servicio externo)
            const tasasActuales = await obtenerTasasActuales();
            const simulaciones = JSON.parse(localStorage.getItem('simulaciones') || '[]');
            
            simulaciones.forEach(sim => {
                // Si hay una tasa significativamente mejor (>0.5% menos)
                if (tasasActuales[sim.tipo] && (sim.tasa - tasasActuales[sim.tipo]) > 0.5) {
                    crearNotificacion(
                        'Oportunidad de ahorro en tasas', 
                        `Las tasas para préstamos ${sim.tipo} han bajado de ${sim.tasa}% a ${tasasActuales[sim.tipo]}%. Podrías ahorrar refinanciando.`,
                        'tasas',
                        'high'
                    );
                }
            });
        } catch (error) {
            console.error('Error al verificar cambios en tasas:', error);
        }
    }
    
    /**
     * Obtiene tasas actuales de interés (simulado)
     * @returns {Promise<Object>} Objeto con tasas por tipo de préstamo
     */
    async function obtenerTasasActuales() {
        // En una implementación real, esto sería una llamada a API
        // Por ahora devolvemos datos simulados
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    'Préstamo Personal': 1.2,
                    'Préstamo Hipotecario': 0.8,
                    'Préstamo Automotriz': 1.0,
                    'Tarjeta de Crédito': 2.5
                });
            }, 500);
        });
    }
    
    /**
     * Busca oportunidades de refinanciación
     */
    function buscarOportunidadesRefinanciacion() {
        const simulaciones = JSON.parse(localStorage.getItem('simulaciones') || '[]');
        
        // Analizar cada simulación guardada para ver si hay oportunidad de refinanciación
        simulaciones.forEach(sim => {
            // Verificar si el préstamo lleva más de 1/3 del plazo pagado
            // y tiene una tasa relativamente alta (>1.5%)
            if (sim.tasa > 1.5 && sim.fecha) {
                const fechaInicio = new Date(sim.fecha);
                const hoy = new Date();
                const mesesTranscurridos = (hoy.getFullYear() - fechaInicio.getFullYear()) * 12 + 
                                          (hoy.getMonth() - fechaInicio.getMonth());
                                          
                if (mesesTranscurridos > sim.plazo / 3) {
                    crearNotificacion(
                        'Analiza refinanciar tu préstamo', 
                        `Tu préstamo de $${sim.monto.toLocaleString()} ha completado ${mesesTranscurridos} meses de ${sim.plazo}. Podrías ahorrar refinanciando el saldo restante.`,
                        'refinanciacion',
                        'medium'
                    );
                }
            }
        });
    }
    
    /**
     * Verifica próximos pagos y envía recordatorios
     */
    function verificarProximosPagos() {
        const simulaciones = JSON.parse(localStorage.getItem('simulaciones') || '[]');
        const fechasPago = JSON.parse(localStorage.getItem('fechas_pago') || '{}');
        
        simulaciones.forEach(sim => {
            if (fechasPago[sim.id]) {
                const fechaPago = new Date(fechasPago[sim.id]);
                const hoy = new Date();
                const diasRestantes = Math.floor((fechaPago - hoy) / (1000 * 60 * 60 * 24));
                
                // Si faltan menos de 5 días para el próximo pago
                if (diasRestantes >= 0 && diasRestantes <= 5) {
                    crearNotificacion(
                        'Recordatorio de pago próximo', 
                        `Tu cuota de $${sim.cuota.toLocaleString()} para el préstamo de $${sim.monto.toLocaleString()} vence en ${diasRestantes} días.`,
                        'pagos',
                        'high'
                    );
                }
            }
        });
    }
    
    /**
     * Genera consejos financieros personalizados
     */
    function generarConsejosFinancieros() {
        const simulaciones = JSON.parse(localStorage.getItem('simulaciones') || '[]');
        const perfilFinanciero = JSON.parse(localStorage.getItem('perfil_financiero') || '{}');
        
        // Ejemplo: Consejo sobre pagos anticipados
        if (simulaciones.length > 0) {
            const simulacionMasReciente = simulaciones[0];
            
            if (simulacionMasReciente.tasa > 1.2) {
                crearNotificacion(
                    'Consejo financiero: Pagos anticipados', 
                    `Considera realizar pagos anticipados a tu préstamo con tasa del ${simulacionMasReciente.tasa}%. Podrías ahorrar significativamente en intereses.`,
                    'consejos',
                    'low'
                );
            }
        }
        
        // Ejemplo: Consejo sobre fondo de emergencia
        if (perfilFinanciero.ahorroMensual && perfilFinanciero.ahorroMensual < 0.1 * perfilFinanciero.ingresoMensual) {
            crearNotificacion(
                'Consejo financiero: Fondo de emergencia', 
                'Tu nivel de ahorro actual podría ser insuficiente para emergencias. Considera aumentar tu ahorro mensual para crear un fondo de emergencia equivalente a 3-6 meses de gastos.',
                'consejos',
                'medium'
            );
        }
    }
    
    /**
     * Crea una nueva notificación
     * @param {string} titulo - Título de la notificación
     * @param {string} mensaje - Mensaje detallado
     * @param {string} tipo - Tipo de notificación (tasas, pagos, refinanciacion, consejos)
     * @param {string} prioridad - Prioridad (high, medium, low)
     */
    function crearNotificacion(titulo, mensaje, tipo, prioridad) {
        // Obtener notificaciones existentes
        const notificaciones = JSON.parse(localStorage.getItem('notificaciones') || '[]');
        
        // Crear nueva notificación
        const nuevaNotificacion = {
            id: Date.now(),
            titulo,
            mensaje,
            tipo,
            prioridad,
            fecha: new Date().toISOString(),
            leida: false
        };
        
        // Añadir al principio del array
        notificaciones.unshift(nuevaNotificacion);
        
        // Limitar a 20 notificaciones
        const notificacionesLimitadas = notificaciones.slice(0, 20);
        
        // Guardar en localStorage
        localStorage.setItem('notificaciones', JSON.stringify(notificacionesLimitadas));
        
        // Mostrar notificación del navegador si está permitido
        mostrarNotificacionNavegador(titulo, mensaje);
        
        // Actualizar UI
        actualizarContadorNotificaciones();
        actualizarListaNotificaciones();
    }
    
    /**
     * Muestra una notificación del navegador si está permitido
     * @param {string} titulo - Título de la notificación
     * @param {string} mensaje - Mensaje detallado
     */
    function mostrarNotificacionNavegador(titulo, mensaje) {
        if (Notification.permission === 'granted') {
            const notification = new Notification(titulo, {
                body: mensaje,
                icon: '/icon.png' // Ruta a un icono para la notificación
            });
            
            notification.onclick = function() {
                window.focus();
                notification.close();
                notificacionesModal.classList.remove('hidden');
            };
        }
    }
    
    /**
     * Actualiza el contador de notificaciones no leídas
     */
    function actualizarContadorNotificaciones() {
        const notificaciones = JSON.parse(localStorage.getItem('notificaciones') || '[]');
        const noLeidas = notificaciones.filter(n => !n.leida).length;
        
        const badge = document.querySelector('.notification-badge');
        if (badge) {
            badge.textContent = noLeidas.toString();
            badge.style.display = noLeidas > 0 ? 'block' : 'none';
        }
    }
    
    /**
     * Actualiza la lista de notificaciones en el modal
     */
    function actualizarListaNotificaciones() {
        const container = document.getElementById('notifications-container');
        if (!container) return;
        
        const notificaciones = JSON.parse(localStorage.getItem('notificaciones') || '[]');
        
        if (notificaciones.length === 0) {
            container.innerHTML = '<p class="empty-notification">No hay notificaciones recientes</p>';
            return;
        }
        
        container.innerHTML = '';
        
        notificaciones.forEach(noti => {
            const fecha = new Date(noti.fecha).toLocaleDateString();
            
            const notiElement = document.createElement('div');
            notiElement.className = `notification-item ${noti.leida ? 'read' : 'unread'} priority-${noti.prioridad}`;
            notiElement.dataset.id = noti.id;
            
            // Ícono según tipo de notificación
            let icono = '';
            switch(noti.tipo) {
                case 'tasas':
                    icono = '<i class="fas fa-percentage"></i>';
                    break;
                case 'pagos':
                    icono = '<i class="fas fa-calendar-check"></i>';
                    break;
                case 'refinanciacion':
                    icono = '<i class="fas fa-sync-alt"></i>';
                    break;
                case 'consejos':
                    icono = '<i class="fas fa-lightbulb"></i>';
                    break;
                default:
                    icono = '<i class="fas fa-bell"></i>';
            }
            
            notiElement.innerHTML = `
                <div class="notification-header">
                    <div class="notification-icon">${icono}</div>
                    <div class="notification-title">${noti.titulo}</div>
                    <div class="notification-date">${fecha}</div>
                </div>
                <div class="notification-body">
                    <p>${noti.mensaje}</p>
                </div>
                <div class="notification-actions">
                    <button class="btn-action btn-read" title="Marcar como leída">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="btn-action btn-delete" title="Eliminar">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            
            container.appendChild(notiElement);
            
            // Configurar botones de acción
            const btnRead = notiElement.querySelector('.btn-read');
            if (btnRead) {
                btnRead.addEventListener('click', function() {
                    marcarNotificacionComoLeida(noti.id);
                });
            }
            
            const btnDelete = notiElement.querySelector('.btn-delete');
            if (btnDelete) {
                btnDelete.addEventListener('click', function() {
                    eliminarNotificacion(noti.id);
                });
            }
        });
    }
    
    /**
     * Marca una notificación como leída
     * @param {number} id - ID de la notificación
     */
    function marcarNotificacionComoLeida(id) {
        const notificaciones = JSON.parse(localStorage.getItem('notificaciones') || '[]');
        
        const index = notificaciones.findIndex(n => n.id === id);
        if (index >= 0) {
            notificaciones[index].leida = true;
            localStorage.setItem('notificaciones', JSON.stringify(notificaciones));
            
            actualizarContadorNotificaciones();
            actualizarListaNotificaciones();
        }
    }
    
    /**
     * Marca todas las notificaciones como leídas
     */
    function marcarNotificacionesComoLeidas() {
        const notificaciones = JSON.parse(localStorage.getItem('notificaciones') || '[]');
        
        notificaciones.forEach(n => n.leida = true);
        localStorage.setItem('notificaciones', JSON.stringify(notificaciones));
        
        actualizarContadorNotificaciones();
        actualizarListaNotificaciones();
    }
    
    /**
     * Elimina una notificación
     * @param {number} id - ID de la notificación
     */
    function eliminarNotificacion(id) {
        let notificaciones = JSON.parse(localStorage.getItem('notificaciones') || '[]');
        
        notificaciones = notificaciones.filter(n => n.id !== id);
        localStorage.setItem('notificaciones', JSON.stringify(notificaciones));
        
        actualizarContadorNotificaciones();
        actualizarListaNotificaciones();
    }
    
    /**
     * Carga las notificaciones guardadas
     */
    function cargarNotificaciones() {
        actualizarContadorNotificaciones();
        actualizarListaNotificaciones();
    }
    
    /**
     * Muestra un mensaje toast personalizado
     * @param {string} mensaje - Mensaje a mostrar
     * @param {string} tipo - Tipo de mensaje: success, error, info, warning
     */
    function mostrarMensaje(mensaje, tipo = "info") {
        // Verificar si ya existe la función en el ámbito global
        if (typeof window.mostrarToast === 'function') {
            window.mostrarToast(mensaje, tipo);
        } else if (typeof mostrarToast === 'function') {
            mostrarToast(mensaje, tipo);
        } else {
            console.log(`[${tipo.toUpperCase()}] ${mensaje}`);
        }
    }
    
    // Inicializar el sistema de notificaciones
    setupNotifications();
    
    // Para simulación de demostración, crear algunas notificaciones iniciales
    setTimeout(() => {
        if (!localStorage.getItem('notificaciones')) {
            crearNotificacion(
                'Bienvenido al sistema de notificaciones', 
                'Recibirás alertas importantes sobre tus préstamos y oportunidades de ahorro.',
                'consejos',
                'medium'
            );
            
            crearNotificacion(
                'Consejo: Pagos anticipados', 
                'Realizar pagos anticipados a tu préstamo puede ahorrarte significativamente en intereses a largo plazo.',
                'consejos',
                'low'
            );
        }
    }, 2000);
});

