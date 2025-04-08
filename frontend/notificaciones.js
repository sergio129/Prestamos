/**
 * Sistema de Notificaciones para Simulador de Préstamos
 * Permite mostrar alertas, recordatorios y consejos al usuario
 */

(function() {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Inicializando sistema de notificaciones mejorado...');
        
        // Crear contenedor de notificaciones con estilo mejorado
        const notificacionesContainer = document.createElement('div');
        notificacionesContainer.id = 'notificaciones-container';
        notificacionesContainer.className = 'notificaciones-container';
        
        // Crear botón de notificaciones para la barra superior
        const notificacionesBtn = document.createElement('div');
        notificacionesBtn.id = 'notificaciones-btn';
        notificacionesBtn.className = 'notificaciones-btn';
        notificacionesBtn.setAttribute('title', 'Ver notificaciones');
        notificacionesBtn.innerHTML = `
            <i class="fas fa-bell"></i>
            <span class="notificaciones-contador">0</span>
        `;
        
        // Crear panel de notificaciones con diseño mejorado
        const notificacionesPanel = document.createElement('div');
        notificacionesPanel.id = 'notificaciones-panel';
        notificacionesPanel.className = 'notificaciones-panel';
        notificacionesPanel.innerHTML = `
            <div class="notificaciones-header">
                <h3>Notificaciones</h3>
                <button id="marcar-leidas" class="btn-marcar-leidas">
                    <i class="fas fa-check-double"></i> Marcar todas como leídas
                </button>
            </div>
            <div class="notificaciones-tabs">
                <button class="tab-notificacion active" data-tab="todas">Todas</button>
                <button class="tab-notificacion" data-tab="alertas">Alertas</button>
                <button class="tab-notificacion" data-tab="consejos">Consejos</button>
            </div>
            <div class="notificaciones-lista" id="notificaciones-lista">
                <!-- Aquí se insertarán las notificaciones dinámicamente -->
                <div class="notificacion-vacia">
                    <i class="fas fa-bell-slash"></i>
                    <p>No tienes notificaciones por el momento</p>
                </div>
            </div>
        `;
        
        // Agregar elementos al DOM
        notificacionesContainer.appendChild(notificacionesBtn);
        notificacionesContainer.appendChild(notificacionesPanel);
        
        // Agregar contenedor a la página - ahora colocado estratégicamente
        const headerElement = document.querySelector('header');
        if (headerElement) {
            headerElement.appendChild(notificacionesContainer);
        } else {
            document.body.insertBefore(notificacionesContainer, document.body.firstChild);
        }
        
        // Eventos para mostrar/ocultar panel con animación mejorada
        notificacionesBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            notificacionesPanel.classList.toggle('show');
            
            // Si el panel se muestra, marcar notificaciones como vistas
            if (notificacionesPanel.classList.contains('show')) {
                marcarNotificacionesComoVistas();
            }
        });
        
        // Cerrar panel al hacer clic fuera con transición suave
        document.addEventListener('click', function(e) {
            if (!notificacionesPanel.contains(e.target) && e.target !== notificacionesBtn) {
                notificacionesPanel.classList.remove('show');
            }
        });
        
        // Marcar todas como leídas con animación
        document.getElementById('marcar-leidas').addEventListener('click', function(e) {
            e.stopPropagation(); // Evitar que se cierre el panel
            
            // Añadir clase para indicar que se está procesando
            this.classList.add('processing');
            
            // Añadir un pequeño retraso para la animación
            setTimeout(() => {
                marcarTodasComoLeidas();
                this.classList.remove('processing');
            }, 300);
        });
        
        // Cambiar tabs de notificaciones con animación suave
        document.querySelectorAll('.tab-notificacion').forEach(tab => {
            tab.addEventListener('click', function(e) {
                e.stopPropagation(); // Evitar que se cierre el panel
                
                // Desactivar todas las tabs
                document.querySelectorAll('.tab-notificacion').forEach(t => t.classList.remove('active'));
                
                // Activar tab actual con efecto
                this.classList.add('active');
                
                // Filtrar notificaciones con animación
                const tipo = this.getAttribute('data-tab');
                
                // Añadir efecto de fadeout/fadein
                const notificacionesLista = document.getElementById('notificaciones-lista');
                notificacionesLista.style.opacity = '0.5';
                
                setTimeout(() => {
                    filtrarNotificaciones(tipo);
                    notificacionesLista.style.opacity = '1';
                }, 200);
            });
        });
        
        // Inicializar sistema de notificaciones
        inicializarNotificaciones();
        
        /**
         * Inicializa el sistema de notificaciones cargando datos guardados y generando iniciales
         */
        function inicializarNotificaciones() {
            // Cargar notificaciones guardadas
            cargarNotificaciones();
            
            // Generar notificaciones iniciales si es necesario
            if (obtenerNotificaciones().length === 0) {
                generarNotificacionesIniciales();
            }
            
            // Programar notificaciones periódicas
            programarNotificacionesPeriodicas();
            
            // Actualizar contador
            actualizarContadorNotificaciones();
        }
        
        /**
         * Carga las notificaciones guardadas en localStorage
         */
        function cargarNotificaciones() {
            const notificacionesGuardadas = localStorage.getItem('notificaciones');
            
            if (notificacionesGuardadas) {
                const notificaciones = JSON.parse(notificacionesGuardadas);
                renderizarNotificaciones(notificaciones);
            }
        }
        
        /**
         * Genera notificaciones iniciales para nuevos usuarios
         */
        function generarNotificacionesIniciales() {
            const ahora = new Date().getTime();
            
            const notificacionesIniciales = [
                {
                    id: 'bienvenida',
                    tipo: 'consejo',
                    titulo: '¡Bienvenido al Simulador de Préstamos!',
                    mensaje: 'Explora todas las herramientas disponibles para tomar mejores decisiones financieras.',
                    fecha: ahora,
                    leida: false,
                    icono: 'hand-peace'
                },
                {
                    id: 'tasas-actuales',
                    tipo: 'alerta',
                    titulo: 'Tasas de interés actualizadas',
                    mensaje: 'Las tasas de referencia han cambiado. Revisa nuestro comparador de tasas para conocer las mejores opciones del mercado.',
                    fecha: ahora - 60000, // 1 minuto antes
                    leida: false,
                    icono: 'percentage'
                },
                {
                    id: 'tip-ahorro',
                    tipo: 'consejo',
                    titulo: 'Tip de ahorro',
                    mensaje: 'Considera aumentar el plazo de tu préstamo para reducir la cuota mensual, pero ten en cuenta que pagarás más intereses en total.',
                    fecha: ahora - 120000, // 2 minutos antes
                    leida: false,
                    icono: 'piggy-bank'
                }
            ];
            
            guardarNotificaciones(notificacionesIniciales);
            renderizarNotificaciones(notificacionesIniciales);
        }
        
        /**
         * Programa notificaciones periódicas basadas en el uso de la aplicación
         */
        function programarNotificacionesPeriodicas() {
            // Cuando se calcula un préstamo, mostrar consejo de ahorro
            document.addEventListener('calculoPrestamo', function(e) {
                if (e.detail) {
                    // Esperar un poco para mostrar la notificación
                    setTimeout(() => {
                        const simulacion = e.detail;
                        const montoAproximado = Math.round(simulacion.monto / 100000) * 100000;
                        
                        agregarNotificacion({
                            id: 'consejo-simulacion-' + Date.now(),
                            tipo: 'consejo',
                            titulo: 'Consejo para tu préstamo',
                            mensaje: `Para un préstamo de $${montoAproximado.toLocaleString('es-CO')}, considera comparar ofertas de al menos 3 entidades financieras.`,
                            fecha: new Date().getTime(),
                            leida: false,
                            icono: 'lightbulb'
                        });
                    }, 3000);
                }
            });
            
            // Notificación de nuevas tasas cada cierto tiempo
            const ultimaActualizacionTasas = localStorage.getItem('ultimaActualizacionTasas');
            const ahora = new Date().getTime();
            
            if (!ultimaActualizacionTasas || (ahora - parseInt(ultimaActualizacionTasas)) > 86400000) { // 24 horas
                agregarNotificacion({
                    id: 'actualizacion-tasas-' + Date.now(),
                    tipo: 'alerta',
                    titulo: 'Tasas actualizadas',
                    mensaje: 'Las tasas de interés para préstamos personales han sido actualizadas. Verifica el comparador para conocer las mejores opciones.',
                    fecha: new Date().getTime(),
                    leida: false,
                    icono: 'sync'
                });
                
                localStorage.setItem('ultimaActualizacionTasas', ahora.toString());
            }
            
            // Escuchar eventos de guardado de simulaciones
            document.addEventListener('simulacionGuardada', function(e) {
                agregarNotificacion({
                    id: 'simulacion-guardada-' + Date.now(),
                    tipo: 'consejo',
                    titulo: 'Simulación guardada',
                    mensaje: 'Tu simulación ha sido guardada correctamente. Puedes consultarla en cualquier momento desde la sección de búsqueda.',
                    fecha: new Date().getTime(),
                    leida: false,
                    icono: 'save'
                });
            });
            
            // Escuchar errores del servidor
            document.addEventListener('errorServidor', function(e) {
                if (e.detail && e.detail.mensaje) {
                    agregarNotificacion({
                        id: 'error-servidor-' + Date.now(),
                        tipo: 'alerta',
                        titulo: 'Error en el servidor',
                        mensaje: e.detail.mensaje,
                        fecha: new Date().getTime(),
                        leida: false,
                        icono: 'exclamation-triangle'
                    });
                }
            });
        }
        
        /**
         * Renderiza las notificaciones en el panel con animaciones mejoradas
         * @param {Array} notificaciones - Lista de notificaciones a mostrar
         */
        function renderizarNotificaciones(notificaciones) {
            const container = document.getElementById('notificaciones-lista');
            const tipoActivo = document.querySelector('.tab-notificacion.active').getAttribute('data-tab');
            
            // Filtrar según pestaña activa
            const notificacionesFiltradas = filtrarPorTipo(notificaciones, tipoActivo);
            
            if (notificacionesFiltradas.length === 0) {
                container.innerHTML = `
                    <div class="notificacion-vacia">
                        <i class="fas fa-bell-slash"></i>
                        <p>No tienes notificaciones en esta categoría</p>
                    </div>
                `;
                return;
            }
            
            // Ordenar por fecha (más recientes primero)
            notificacionesFiltradas.sort((a, b) => b.fecha - a.fecha);
            
            container.innerHTML = '';
            
            // Insertar notificaciones con retardo para animación
            notificacionesFiltradas.forEach((notificacion, index) => {
                const notificacionEl = document.createElement('div');
                notificacionEl.className = `notificacion-item ${notificacion.leida ? 'leida' : 'no-leida'} ${notificacion.tipo}`;
                notificacionEl.setAttribute('data-id', notificacion.id);
                notificacionEl.style.animationDelay = `${index * 0.05}s`;
                
                // Formatear fecha
                const fecha = new Date(notificacion.fecha);
                const ahora = new Date();
                let fechaFormateada;
                
                if (esMismoDia(fecha, ahora)) {
                    // Si es hoy, mostrar hora
                    fechaFormateada = `Hoy, ${fecha.getHours().toString().padStart(2, '0')}:${fecha.getMinutes().toString().padStart(2, '0')}`;
                } else if (esAyer(fecha, ahora)) {
                    // Si es ayer
                    fechaFormateada = `Ayer, ${fecha.getHours().toString().padStart(2, '0')}:${fecha.getMinutes().toString().padStart(2, '0')}`;
                } else {
                    // Otro día
                    fechaFormateada = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
                }
                
                notificacionEl.innerHTML = `
                    <div class="notificacion-icono ${notificacion.tipo}">
                        <i class="fas fa-${notificacion.icono || (notificacion.tipo === 'alerta' ? 'exclamation-circle' : 'info-circle')}"></i>
                    </div>
                    <div class="notificacion-contenido">
                        <div class="notificacion-titulo">${notificacion.titulo}</div>
                        <div class="notificacion-mensaje">${notificacion.mensaje}</div>
                        <div class="notificacion-fecha">${fechaFormateada}</div>
                    </div>
                    <div class="notificacion-acciones">
                        <button class="btn-notificacion btn-marcar" title="${notificacion.leida ? 'Marcar como no leída' : 'Marcar como leída'}">
                            <i class="fas ${notificacion.leida ? 'fa-envelope' : 'fa-envelope-open'}"></i>
                        </button>
                        <button class="btn-notificacion btn-eliminar" title="Eliminar notificación">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                
                container.appendChild(notificacionEl);
                
                // Agregar eventos a los botones
                const btnMarcar = notificacionEl.querySelector('.btn-marcar');
                const btnEliminar = notificacionEl.querySelector('.btn-eliminar');
                
                btnMarcar.addEventListener('click', function(e) {
                    e.stopPropagation();
                    toggleLeidaNotificacion(notificacion.id);
                });
                
                btnEliminar.addEventListener('click', function(e) {
                    e.stopPropagation();
                    
                    // Añadir efecto de desvanecimiento antes de eliminar
                    notificacionEl.style.opacity = '0';
                    notificacionEl.style.transform = 'translateX(30px)';
                    
                    setTimeout(() => {
                        eliminarNotificacion(notificacion.id);
                    }, 300);
                });
                
                // Al hacer clic en la notificación, marcarla como leída y ejecutar acción
                notificacionEl.addEventListener('click', function() {
                    if (!notificacion.leida) {
                        marcarComoLeida(notificacion.id);
                    }
                    
                    // Realizar acción según tipo de notificación
                    realizarAccionNotificacion(notificacion);
                });
            });
        }
        
        /**
         * Realiza una acción según el tipo de notificación
         * @param {Object} notificacion - La notificación que se ha hecho clic
         */
        function realizarAccionNotificacion(notificacion) {
            // Cerrar panel de notificaciones
            notificacionesPanel.classList.remove('show');
            
            // Acciones específicas según el contenido de la notificación
            if (notificacion.tipo === 'alerta' && notificacion.titulo.includes('Tasas')) {
                // Abrir comparador de tasas
                const comparadorBtn = document.querySelector('.btn-comparador');
                if (comparadorBtn) {
                    setTimeout(() => comparadorBtn.click(), 300);
                }
            } else if (notificacion.mensaje.includes('capacidad de endeudamiento')) {
                // Abrir calculadora de capacidad
                const capacidadBtn = document.querySelector('.btn-capacidad');
                if (capacidadBtn) {
                    setTimeout(() => capacidadBtn.click(), 300);
                }
            } else if (notificacion.id === 'bienvenida') {
                // Mostrar panel de ayuda o tour
                const helpBtn = document.querySelector('.help-button, .tour-button, #a11y-help');
                if (helpBtn) {
                    setTimeout(() => helpBtn.click(), 300);
                }
            }
        }
        
        /**
         * Filtra las notificaciones según el tipo seleccionado
         * @param {string} tipo - Tipo de notificaciones a mostrar
         */
        function filtrarNotificaciones(tipo) {
            const notificaciones = obtenerNotificaciones();
            renderizarNotificaciones(notificaciones);
        }
        
        /**
         * Filtra las notificaciones por tipo
         * @param {Array} notificaciones - Lista de notificaciones
         * @param {string} tipo - Tipo de filtro ('todas', 'alertas', 'consejos')
         * @returns {Array} Notificaciones filtradas
         */
        function filtrarPorTipo(notificaciones, tipo) {
            if (tipo === 'todas') {
                return notificaciones;
            }
            
            if (tipo === 'alertas') {
                return notificaciones.filter(n => n.tipo === 'alerta');
            }
            
            if (tipo === 'consejos') {
                return notificaciones.filter(n => n.tipo === 'consejo');
            }
            
            return notificaciones;
        }
        
        /**
         * Agrega una nueva notificación con animación mejorada
         * @param {Object} notificacion - Datos de la notificación
         */
        function agregarNotificacion(notificacion) {
            // Obtener notificaciones existentes
            const notificaciones = obtenerNotificaciones();
            
            // Verificar si ya existe una notificación con el mismo ID
            const existente = notificaciones.find(n => n.id === notificacion.id);
            if (existente) {
                return; // No duplicar notificaciones con mismo ID
            }
            
            // Agregar nueva notificación
            notificaciones.push(notificacion);
            
            // Guardar notificaciones
            guardarNotificaciones(notificaciones);
            
            // Renderizar notificaciones
            renderizarNotificaciones(notificaciones);
            
            // Actualizar contador
            actualizarContadorNotificaciones();
            
            // Mostrar indicador visual
            mostrarIndicadorNuevaNotificacion();
            
            // Reproducir sonido de notificación si está disponible
            reproducirSonidoNotificacion();
            
            // Si la notificación es crítica, mostrar toast
            if (notificacion.tipo === 'alerta') {
                if (typeof window.mostrarToast === 'function') {
                    window.mostrarToast(notificacion.titulo + ': ' + notificacion.mensaje, 'info');
                }
            }
        }
        
        /**
         * Reproduce un sonido al recibir una notificación
         */
        function reproducirSonidoNotificacion() {
            // Crear audio elemento si no existe
            let sonidoNotificacion = document.getElementById('sonido-notificacion');
            
            if (!sonidoNotificacion) {
                sonidoNotificacion = document.createElement('audio');
                sonidoNotificacion.id = 'sonido-notificacion';
                sonidoNotificacion.src = 'data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';
                sonidoNotificacion.setAttribute('preload', 'auto');
                document.body.appendChild(sonidoNotificacion);
            }
            
            // Reproducir
            sonidoNotificacion.play().catch(e => {
                console.log('No se pudo reproducir el sonido de notificación', e);
            });
        }
        
        /**
         * Muestra un indicador visual de nueva notificación
         */
        function mostrarIndicadorNuevaNotificacion() {
            notificacionesBtn.classList.add('nueva-notificacion');
            
            // Quitar clase después de la animación
            setTimeout(() => {
                notificacionesBtn.classList.remove('nueva-notificacion');
            }, 3000);
        }
        
        /**
         * Elimina una notificación
         * @param {string} id - ID de la notificación a eliminar
         */
        function eliminarNotificacion(id) {
            // Obtener notificaciones existentes
            let notificaciones = obtenerNotificaciones();
            
            // Filtrar la notificación a eliminar
            notificaciones = notificaciones.filter(n => n.id !== id);
            
            // Guardar notificaciones
            guardarNotificaciones(notificaciones);
            
            // Renderizar notificaciones
            renderizarNotificaciones(notificaciones);
            
            // Actualizar contador
            actualizarContadorNotificaciones();
        }
        
        /**
         * Marca/desmarca una notificación como leída
         * @param {string} id - ID de la notificación
         */
        function toggleLeidaNotificacion(id) {
            // Obtener notificaciones existentes
            const notificaciones = obtenerNotificaciones();
            
            // Buscar la notificación
            const notificacion = notificaciones.find(n => n.id === id);
            
            if (notificacion) {
                // Cambiar estado
                notificacion.leida = !notificacion.leida;
                
                // Guardar notificaciones
                guardarNotificaciones(notificaciones);
                
                // Renderizar notificaciones
                renderizarNotificaciones(notificaciones);
                
                // Actualizar contador
                actualizarContadorNotificaciones();
            }
        }
        
        /**
         * Marca una notificación como leída
         * @param {string} id - ID de la notificación
         */
        function marcarComoLeida(id) {
            // Obtener notificaciones existentes
            const notificaciones = obtenerNotificaciones();
            
            // Buscar la notificación
            const notificacion = notificaciones.find(n => n.id === id);
            
            if (notificacion && !notificacion.leida) {
                // Marcar como leída
                notificacion.leida = true;
                
                // Guardar notificaciones
                guardarNotificaciones(notificaciones);
                
                // Renderizar notificaciones
                renderizarNotificaciones(notificaciones);
                
                // Actualizar contador
                actualizarContadorNotificaciones();
            }
        }
        
        /**
         * Marca todas las notificaciones como leídas con efecto visual
         */
        function marcarTodasComoLeidas() {
            // Obtener notificaciones existentes
            const notificaciones = obtenerNotificaciones();
            
            // Verificar si hay notificaciones no leídas
            const hayNoLeidas = notificaciones.some(n => !n.leida);
            
            if (!hayNoLeidas) {
                return; // No hacer nada si todas están leídas
            }
            
            // Añadir efecto visual a todas las notificaciones no leídas
            document.querySelectorAll('.notificacion-item.no-leida').forEach(item => {
                item.style.transition = 'background-color 0.5s ease';
                item.style.backgroundColor = '#d4edda';
                
                setTimeout(() => {
                    item.classList.remove('no-leida');
                    item.classList.add('leida');
                }, 300);
            });
            
            // Pequeño retraso antes de aplicar cambios
            setTimeout(() => {
                // Marcar todas como leídas
                notificaciones.forEach(n => {
                    n.leida = true;
                });
                
                // Guardar notificaciones
                guardarNotificaciones(notificaciones);
                
                // Actualizar contador después de la animación
                actualizarContadorNotificaciones();
                
                // Mostrar mensaje de confirmación
                if (typeof window.mostrarToast === 'function') {
                    window.mostrarToast('Todas las notificaciones han sido marcadas como leídas', 'success');
                }
            }, 500);
        }
        
        /**
         * Marca las notificaciones como vistas (actualiza contador)
         */
        function marcarNotificacionesComoVistas() {
            const contador = document.querySelector('.notificaciones-contador');
            contador.classList.remove('no-leidas');
        }
        
        /**
         * Actualiza el contador de notificaciones no leídas
         */
        function actualizarContadorNotificaciones() {
            const notificaciones = obtenerNotificaciones();
            const noLeidas = notificaciones.filter(n => !n.leida).length;
            
            const contador = document.querySelector('.notificaciones-contador');
            contador.textContent = noLeidas;
            
            if (noLeidas > 0) {
                contador.classList.add('no-leidas');
            } else {
                contador.classList.remove('no-leidas');
            }
        }
        
        /**
         * Obtiene las notificaciones guardadas
         * @returns {Array} Lista de notificaciones
         */
        function obtenerNotificaciones() {
            const notificacionesGuardadas = localStorage.getItem('notificaciones');
            
            if (notificacionesGuardadas) {
                try {
                    return JSON.parse(notificacionesGuardadas);
                } catch (e) {
                    console.error('Error al parsear notificaciones:', e);
                    return [];
                }
            }
            
            return [];
        }
        
        /**
         * Guarda las notificaciones en localStorage
         * @param {Array} notificaciones - Lista de notificaciones
         */
        function guardarNotificaciones(notificaciones) {
            localStorage.setItem('notificaciones', JSON.stringify(notificaciones));
        }
        
        /**
         * Comprueba si dos fechas son del mismo día
         * @param {Date} fecha1 - Primera fecha
         * @param {Date} fecha2 - Segunda fecha
         * @returns {boolean} True si son del mismo día
         */
        function esMismoDia(fecha1, fecha2) {
            return fecha1.getDate() === fecha2.getDate() &&
                   fecha1.getMonth() === fecha2.getMonth() &&
                   fecha1.getFullYear() === fecha2.getFullYear();
        }
        
        /**
         * Comprueba si una fecha es del día anterior a otra
         * @param {Date} fecha - Fecha a comprobar
         * @param {Date} referencia - Fecha de referencia
         * @returns {boolean} True si fecha es el día anterior a referencia
         */
        function esAyer(fecha, referencia) {
            const ayer = new Date(referencia);
            ayer.setDate(ayer.getDate() - 1);
            
            return fecha.getDate() === ayer.getDate() &&
                   fecha.getMonth() === ayer.getMonth() &&
                   fecha.getFullYear() === ayer.getFullYear();
        }
        
        // Escuchar eventos del formulario de préstamo
        const formularioPrestamo = document.getElementById('loan-form');
        if (formularioPrestamo) {
            formularioPrestamo.addEventListener('submit', function(e) {
                // Generar evento personalizado para que el sistema de notificaciones lo capture
                setTimeout(() => {
                    const monto = parseFloat(document.getElementById('monto').value) || 0;
                    const plazo = parseFloat(document.getElementById('plazo').value) || 0;
                    const interes = parseFloat(document.getElementById('interes-mensual').value) || 0;
                    
                    const eventoCalculo = new CustomEvent('calculoPrestamo', {
                        detail: {
                            monto: monto,
                            plazo: plazo,
                            interes: interes
                        }
                    });
                    
                    document.dispatchEvent(eventoCalculo);
                }, 500);
            });
        }
        
        // Escuchar botón de guardar simulación
        const saveBtn = document.getElementById('save-btn');
        if (saveBtn) {
            saveBtn.addEventListener('click', function() {
                // La simulación se guardará en el evento submit del modal, pero agregamos un listener
                const saveForm = document.getElementById('save-form');
                if (saveForm) {
                    const originalSubmit = saveForm.onsubmit;
                    saveForm.onsubmit = function(e) {
                        if (originalSubmit) {
                            originalSubmit.call(this, e);
                        }
                        
                        // Generar evento personalizado después de guardar
                        setTimeout(() => {
                            const eventoGuardado = new CustomEvent('simulacionGuardada');
                            document.dispatchEvent(eventoGuardado);
                        }, 1000);
                    };
                }
            });
        }
        
        // Exponer funciones globalmente
        window.notificaciones = {
            agregar: agregarNotificacion,
            eliminar: eliminarNotificacion,
            marcarLeida: marcarComoLeida,
            marcarTodasLeidas: marcarTodasComoLeidas,
            obtenerNoLeidas: function() {
                const notificaciones = obtenerNotificaciones();
                return notificaciones.filter(n => !n.leida).length;
            },
            actualizarPanel: function() {
                const tipoActivo = document.querySelector('.tab-notificacion.active').getAttribute('data-tab');
                filtrarNotificaciones(tipoActivo);
            }
        };
    });
})();
