/**
 * API de Tasas en Tiempo Real para Sistema de Préstamos
 * Permite obtener, mostrar y actualizar tasas de interés de diferentes entidades financieras
 * en tiempo real para diversos tipos de préstamos.
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando API de Tasas en Tiempo Real...');
    
    // URLs para la API (configurar según el entorno)
    const API_URL = {
        development: 'http://localhost:3000/api/tasas',
        production: '/api/tasas'
    };
    
    // Determinar la URL según el entorno
    const BASE_URL = window.location.hostname === 'localhost' ? 
        API_URL.development : API_URL.production;
    
    // Definición de los tipos de préstamos soportados
    const TIPOS_PRESTAMOS = [
        { id: 'personal', nombre: 'Préstamo Personal' },
        { id: 'hipotecario', nombre: 'Crédito Hipotecario' },
        { id: 'vehicular', nombre: 'Préstamo Vehicular' },
        { id: 'libranza', nombre: 'Libranza' },
        { id: 'microcredito', nombre: 'Microcrédito' },
        { id: 'tarjeta', nombre: 'Tarjeta de Crédito' }
    ];
    
    // Definición de las entidades financieras
    const ENTIDADES = [
        { id: 'bancolombia', nombre: 'Bancolombia' },
        { id: 'davivienda', nombre: 'Davivienda' },
        { id: 'bbva', nombre: 'BBVA' },
        { id: 'bogota', nombre: 'Banco de Bogotá' },
        { id: 'occidente', nombre: 'Banco de Occidente' },
        { id: 'popular', nombre: 'Banco Popular' },
        { id: 'scotiabank', nombre: 'Scotiabank Colpatria' },
        { id: 'av-villas', nombre: 'AV Villas' },
        { id: 'falabella', nombre: 'Banco Falabella' },
        { id: 'pichincha', nombre: 'Banco Pichincha' }
    ];
    
    // Cache de tasas
    let tasasCache = {};
    // Timestamp de la última actualización
    let ultimaActualizacion = null;
    // Intervalo para la actualización automática
    let intervaloActualizacion = null;
    // Tipo de préstamo actualmente seleccionado
    let tipoPrestamoActual = 'personal';
    
    // Verificar si existe el botón de tasas en tiempo real
    // Si no existe, crear botón desplegable y panel oculto
    if (!document.getElementById('tasas-tiempo-real-btn')) {
        crearBotonTasas();
    }
    
    // Iniciar la carga de tasas
    cargarTasasTiempoReal(tipoPrestamoActual);
    
    // Configurar actualización automática cada 5 minutos
    intervaloActualizacion = setInterval(() => {
        cargarTasasTiempoReal(tipoPrestamoActual, true);
    }, 5 * 60 * 1000); // 5 minutos
    
    /**
     * Crea un botón desplegable para acceder a las tasas en tiempo real
     */
    function crearBotonTasas() {
        // Crear botón de tasas en tiempo real
        const botonTasas = document.createElement('div');
        botonTasas.id = 'tasas-tiempo-real-btn';
        botonTasas.className = 'tasas-tiempo-real-btn';
        botonTasas.innerHTML = `<i class="fas fa-chart-line"></i> Tasas de Interés`;
        
        // Crear contenedor principal que estará oculto inicialmente
        const container = document.createElement('div');
        container.id = 'tasas-tiempo-real-container';
        container.className = 'tasas-tiempo-real-container hidden';
        
        // Construir el HTML de la interfaz
        container.innerHTML = `
            <div class="tasas-header">
                <h2><i class="fas fa-chart-line"></i> Tasas de Interés en Tiempo Real</h2>
                <div class="tasas-controles">
                    <select id="tipo-prestamo-selector">
                        ${TIPOS_PRESTAMOS.map(tipo => 
                            `<option value="${tipo.id}">${tipo.nombre}</option>`
                        ).join('')}
                    </select>
                    <button id="actualizar-tasas-btn" class="btn-actualizar">
                        <i class="fas fa-sync-alt"></i> Actualizar
                    </button>
                </div>
            </div>
            
            <div class="tasas-estado">
                <span id="tasas-timestamp">Última actualización: --</span>
                <span id="tasas-estado-conexion">Estado: Esperando datos...</span>
            </div>
            
            <div class="tasas-tabla-container">
                <table class="tasas-tabla">
                    <thead>
                        <tr>
                            <th>Entidad</th>
                            <th>Tasa Mensual</th>
                            <th>Tasa Efectiva Anual</th>
                            <th>Mínimo</th>
                            <th>Máximo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="tasas-tabla-body">
                        <tr>
                            <td colspan="6" class="tasas-cargando">Cargando datos de tasas...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="tasas-grafico-container">
                <canvas id="tasas-grafico"></canvas>
            </div>
            
            <div class="tasas-info">
                <div class="tasas-info-item">
                    <i class="fas fa-info-circle"></i>
                    <p>Las tasas mostradas son referenciales y pueden variar según el perfil crediticio, plazos y condiciones específicas.</p>
                </div>
                <div class="tasas-info-item">
                    <i class="fas fa-clock"></i>
                    <p>Los datos se actualizan automáticamente cada 5 minutos.</p>
                </div>
            </div>
            
            <button id="cerrar-tasas-btn" class="btn-cerrar">
                <i class="fas fa-times"></i> Cerrar
            </button>
        `;
        
        // Añadir los elementos a la página
        const contenedorPrincipal = document.querySelector('.calculadora-container') || 
                                    document.querySelector('.main-container') || 
                                    document.querySelector('.container') || 
                                    document.body;
        
        // Agregar el botón y el contenedor
        contenedorPrincipal.appendChild(botonTasas);
        contenedorPrincipal.appendChild(container);
        
        // Configurar evento para mostrar/ocultar el panel de tasas
        botonTasas.addEventListener('click', function() {
            const tasasContainer = document.getElementById('tasas-tiempo-real-container');
            tasasContainer.classList.toggle('hidden');
            // Actualizar tasas cuando se abre el panel
            if (!tasasContainer.classList.contains('hidden')) {
                cargarTasasTiempoReal(tipoPrestamoActual, true);
            }
        });
        
        // Configurar evento para el botón de cerrar
        document.getElementById('cerrar-tasas-btn').addEventListener('click', function() {
            const tasasContainer = document.getElementById('tasas-tiempo-real-container');
            tasasContainer.classList.add('hidden');
        });
        
        // Configurar eventos para los controles
        document.getElementById('tipo-prestamo-selector').addEventListener('change', (e) => {
            tipoPrestamoActual = e.target.value;
            cargarTasasTiempoReal(tipoPrestamoActual);
        });
        
        document.getElementById('actualizar-tasas-btn').addEventListener('click', () => {
            cargarTasasTiempoReal(tipoPrestamoActual, true);
            
            // Mostrar animación de actualización
            const botonActualizar = document.getElementById('actualizar-tasas-btn');
            botonActualizar.classList.add('rotando');
            botonActualizar.disabled = true;
            
            setTimeout(() => {
                botonActualizar.classList.remove('rotando');
                botonActualizar.disabled = false;
            }, 1500);
        });
    }
    
    /**
     * Carga las tasas de interés desde la API
     * @param {string} tipoPrestamo - Tipo de préstamo para obtener tasas
     * @param {boolean} forzarActualizacion - Indica si se debe forzar la actualización ignorando la caché
     */
    function cargarTasasTiempoReal(tipoPrestamo, forzarActualizacion = false) {
        // Mostrar estado de carga
        actualizarEstadoConexion('loading');
        
        // Verificar si hay datos en caché y no se fuerza actualización
        if (!forzarActualizacion && tasasCache[tipoPrestamo] && 
            ultimaActualizacion && 
            (new Date() - ultimaActualizacion) < 5 * 60 * 1000) { // Cache válida por 5 minutos
            
            mostrarTasas(tasasCache[tipoPrestamo], tipoPrestamo);
            actualizarEstadoConexion('success');
            return;
        }
        
        // Si no hay API real, usamos datos de demo para simular la API
        if (window.location.hostname === 'localhost' && !window.API_TASAS_REAL) {
            // Simulación de retardo de red
            setTimeout(() => {
                const tasasDemo = generarTasasDemo(tipoPrestamo);
                tasasCache[tipoPrestamo] = tasasDemo;
                ultimaActualizacion = new Date();
                
                mostrarTasas(tasasDemo, tipoPrestamo);
                actualizarEstadoConexion('success');
            }, 800);
            return;
        }
        
        // Realizar la petición a la API real
        fetch(`${BASE_URL}/${tipoPrestamo}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error en la API: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                tasasCache[tipoPrestamo] = data;
                ultimaActualizacion = new Date();
                
                mostrarTasas(data, tipoPrestamo);
                actualizarEstadoConexion('success');
            })
            .catch(error => {
                console.error('Error al cargar tasas:', error);
                actualizarEstadoConexion('error', error.message);
                
                // En caso de error, usar datos de demo
                const tasasDemo = generarTasasDemo(tipoPrestamo);
                mostrarTasas(tasasDemo, tipoPrestamo);
            });
    }
    
    /**
     * Muestra las tasas en la interfaz
     * @param {Array} tasas - Array de objetos con datos de tasas
     * @param {string} tipoPrestamo - Tipo de préstamo actual
     */
    function mostrarTasas(tasas, tipoPrestamo) {
        const tablaBody = document.getElementById('tasas-tabla-body');
        const tipoPrestNombre = TIPOS_PRESTAMOS.find(t => t.id === tipoPrestamo)?.nombre || tipoPrestamo;
        
        // Actualizar timestamp
        if (ultimaActualizacion) {
            document.getElementById('tasas-timestamp').textContent = 
                `Última actualización: ${ultimaActualizacion.toLocaleTimeString()}`;
        }
        
        // Limpiar tabla
        tablaBody.innerHTML = '';
        
        // Ordenar tasas de menor a mayor
        tasas.sort((a, b) => a.tasaMensual - b.tasaMensual);
        
        // Llenar tabla con datos
        tasas.forEach(tasa => {
            const fila = document.createElement('tr');
            const entidad = ENTIDADES.find(e => e.id === tasa.entidadId)?.nombre || tasa.entidadId;
            
            fila.innerHTML = `
                <td class="entidad-nombre">
                    <img src="img/bancos/${tasa.entidadId}.png" 
                         alt="${entidad}" 
                         onerror="this.src='img/bancos/default.png';this.onerror='';">
                    <span>${entidad}</span>
                </td>
                <td>${tasa.tasaMensual.toFixed(2)}%</td>
                <td>${tasa.tasaAnual.toFixed(2)}%</td>
                <td>${formatearMonto(tasa.montoMinimo)}</td>
                <td>${formatearMonto(tasa.montoMaximo)}</td>
                <td>
                    <button class="btn-aplicar" data-entidad="${tasa.entidadId}" data-tasa="${tasa.tasaMensual}" 
                            data-tasa-anual="${tasa.tasaAnual}" data-min="${tasa.montoMinimo}" data-max="${tasa.montoMaximo}">
                        Aplicar
                    </button>
                </td>
            `;
            
            tablaBody.appendChild(fila);
        });
        
        // Configurar eventos para los botones de aplicar
        document.querySelectorAll('.btn-aplicar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const entidadId = e.target.dataset.entidad;
                const tasaMensual = parseFloat(e.target.dataset.tasa);
                const tasaAnual = parseFloat(e.target.dataset.tasaAnual);
                const montoMin = parseInt(e.target.dataset.min);
                const montoMax = parseInt(e.target.dataset.max);
                
                const entidad = ENTIDADES.find(e => e.id === entidadId)?.nombre || entidadId;
                
                aplicarTasaAlSimulador(entidad, tasaMensual, montoMin, montoMax);
            });
        });
        
        // Generar y mostrar gráfico
        generarGraficoTasas(tasas, tipoPrestNombre);
    }
    
    /**
     * Actualiza el estado de la conexión mostrado en la interfaz
     * @param {string} estado - Estado de la conexión ('loading', 'success', 'error')
     * @param {string} mensaje - Mensaje opcional para mostrar en caso de error
     */
    function actualizarEstadoConexion(estado, mensaje = '') {
        const estadoEl = document.getElementById('tasas-estado-conexion');
        
        estadoEl.className = ''; // Resetear clases
        
        switch (estado) {
            case 'loading':
                estadoEl.textContent = 'Estado: Cargando...';
                estadoEl.classList.add('estado-cargando');
                break;
            case 'success':
                estadoEl.textContent = 'Estado: Conectado';
                estadoEl.classList.add('estado-conectado');
                break;
            case 'error':
                estadoEl.textContent = `Estado: Error de conexión${mensaje ? ': ' + mensaje : ''}`;
                estadoEl.classList.add('estado-error');
                break;
            default:
                estadoEl.textContent = 'Estado: Desconocido';
        }
    }
    
    /**
     * Aplica la tasa seleccionada al simulador de préstamos
     * @param {string} entidad - Nombre de la entidad financiera
     * @param {number} tasaMensual - Tasa mensual a aplicar
     * @param {number} montoMin - Monto mínimo del préstamo
     * @param {number} montoMax - Monto máximo del préstamo
     */
    function aplicarTasaAlSimulador(entidad, tasaMensual, montoMin, montoMax) {
        // Buscar elementos del simulador
        const interesInput = document.getElementById('interes-mensual');
        const montoInput = document.getElementById('monto');
        
        if (!interesInput || !montoInput) {
            mostrarNotificacion(
                'No se puede aplicar la tasa al simulador', 
                'El simulador no está disponible en esta página.', 
                'warning'
            );
            return;
        }
        
        // Actualizar valores en el simulador
        interesInput.value = tasaMensual.toFixed(2);
        
        // Validar el monto actual contra los límites
        const montoActual = parseFloat(montoInput.value) || 0;
        if (montoActual < montoMin) {
            montoInput.value = montoMin;
        } else if (montoActual > montoMax) {
            montoInput.value = montoMax;
        }
        
        // Actualizar etiqueta de entidad si existe
        const entidadLabel = document.getElementById('entidad-seleccionada');
        if (entidadLabel) {
            entidadLabel.textContent = entidad;
        } else {
            // Crear etiqueta si no existe
            const infoEntidad = document.createElement('div');
            infoEntidad.classList.add('entidad-info');
            infoEntidad.innerHTML = `
                <span class="etiqueta">Entidad:</span>
                <span id="entidad-seleccionada" class="valor">${entidad}</span>
            `;
            
            // Insertar después del elemento de tasa de interés
            const contenedorInteres = interesInput.closest('.form-group');
            if (contenedorInteres) {
                contenedorInteres.parentNode.insertBefore(infoEntidad, contenedorInteres.nextSibling);
            }
        }
        
        // Lanzar el evento de cálculo si existe la función
        if (typeof window.calcularPrestamo === 'function') {
            window.calcularPrestamo();
        }
        
        // Mostrar notificación de éxito
        mostrarNotificacion(
            'Tasa aplicada correctamente', 
            `Se ha aplicado la tasa de ${entidad}: ${tasaMensual.toFixed(2)}% mensual.`, 
            'success'
        );
    }
    
    /**
     * Genera un gráfico comparativo de tasas
     * @param {Array} tasas - Array de objetos con datos de tasas
     * @param {string} tipoPrestamo - Nombre del tipo de préstamo
     */
    function generarGraficoTasas(tasas, tipoPrestamo) {
        const ctx = document.getElementById('tasas-grafico').getContext('2d');
        
        // Destruir gráfico anterior si existe
        if (window.tasasGrafico instanceof Chart) {
            window.tasasGrafico.destroy();
        }
        
        // Preparar datos para el gráfico
        const etiquetas = tasas.map(t => {
            const entidad = ENTIDADES.find(e => e.id === t.entidadId)?.nombre || t.entidadId;
            return entidad;
        });
        
        const datosTasasMensuales = tasas.map(t => t.tasaMensual);
        const datosTasasAnuales = tasas.map(t => t.tasaAnual);
        
        // Calcular tasas promedio
        const promedioMensual = datosTasasMensuales.reduce((sum, t) => sum + t, 0) / datosTasasMensuales.length;
        
        // Crear el gráfico
        window.tasasGrafico = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: etiquetas,
                datasets: [
                    {
                        label: 'Tasa Mensual (%)',
                        data: datosTasasMensuales,
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: `Comparativa de Tasas: ${tipoPrestamo}`
                    },
                    legend: {
                        position: 'top',
                    },
                    annotation: {
                        annotations: {
                            line1: {
                                type: 'line',
                                yMin: promedioMensual,
                                yMax: promedioMensual,
                                borderColor: 'rgb(255, 99, 132)',
                                borderWidth: 2,
                                label: {
                                    content: `Promedio: ${promedioMensual.toFixed(2)}%`,
                                    enabled: true,
                                    position: 'end'
                                }
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Tasa de Interés (%)'
                        }
                    }
                }
            }
        });
    }
    
    /**
     * Genera datos de tasas demo para simulación
     * @param {string} tipoPrestamo - Tipo de préstamo
     * @returns {Array} Array de tasas simuladas
     */
    function generarTasasDemo(tipoPrestamo) {
        // Configuración base según el tipo de préstamo
        let baseConfig = {
            tasaMensual: 1.5,
            tasaAnual: 19.5,
            montoMinimo: 1000000,
            montoMaximo: 50000000
        };
        
        // Ajustar configuración según tipo de préstamo
        switch (tipoPrestamo) {
            case 'hipotecario':
                baseConfig = {
                    tasaMensual: 0.8,
                    tasaAnual: 10.0,
                    montoMinimo: 20000000,
                    montoMaximo: 400000000
                };
                break;
            case 'vehicular':
                baseConfig = {
                    tasaMensual: 1.2,
                    tasaAnual: 15.4,
                    montoMinimo: 5000000,
                    montoMaximo: 120000000
                };
                break;
            case 'libranza':
                baseConfig = {
                    tasaMensual: 1.0,
                    tasaAnual: 12.7,
                    montoMinimo: 3000000,
                    montoMaximo: 100000000
                };
                break;
            case 'microcredito':
                baseConfig = {
                    tasaMensual: 2.2,
                    tasaAnual: 30.0,
                    montoMinimo: 500000,
                    montoMaximo: 20000000
                };
                break;
            case 'tarjeta':
                baseConfig = {
                    tasaMensual: 2.5,
                    tasaAnual: 34.0,
                    montoMinimo: 1000000,
                    montoMaximo: 30000000
                };
                break;
        }
        
        // Generar tasas para cada entidad financiera
        return ENTIDADES.map(entidad => {
            // Calcular variaciones aleatorias para simular diferencias entre entidades
            const variacion = (Math.random() * 0.6) - 0.3; // Entre -0.3% y +0.3%
            const tasaMensual = baseConfig.tasaMensual + variacion;
            const tasaAnual = tasaMensual * 12.5; // Aproximación de tasa efectiva anual
            
            // Variación en montos
            const minVariacion = Math.random() * 0.4 + 0.8; // Entre 0.8 y 1.2
            const maxVariacion = Math.random() * 0.4 + 0.9; // Entre 0.9 y 1.3
            
            return {
                entidadId: entidad.id,
                tasaMensual: tasaMensual,
                tasaAnual: tasaAnual,
                montoMinimo: Math.round(baseConfig.montoMinimo * minVariacion),
                montoMaximo: Math.round(baseConfig.montoMaximo * maxVariacion),
                fechaActualizacion: new Date().toISOString()
            };
        });
    }
    
    /**
     * Formatea un monto a formato de moneda
     * @param {number} monto - Monto a formatear
     * @returns {string} Monto formateado
     */
    function formatearMonto(monto) {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(monto);
    }
    
    /**
     * Muestra una notificación al usuario
     * @param {string} titulo - Título de la notificación
     * @param {string} mensaje - Mensaje detallado
     * @param {string} tipo - Tipo de notificación ('success', 'error', 'warning', 'info')
     */
    function mostrarNotificacion(titulo, mensaje, tipo = 'info') {
        // Intentar usar la función global si existe
        if (typeof window.mostrarToast === 'function') {
            window.mostrarToast(mensaje, tipo);
            return;
        }
        
        // Implementación propia de notificación si no existe la global
        const notificacion = document.createElement('div');
        notificacion.className = `notificacion notificacion-${tipo}`;
        
        const iconos = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        
        notificacion.innerHTML = `
            <div class="notificacion-header">
                <i class="${iconos[tipo] || iconos.info}"></i>
                <span class="notificacion-titulo">${titulo}</span>
                <button class="notificacion-cerrar">&times;</button>
            </div>
            <div class="notificacion-body">
                <p>${mensaje}</p>
            </div>
        `;
        
        // Añadir al DOM
        document.body.appendChild(notificacion);
        
        // Mostrar con animación
        setTimeout(() => {
            notificacion.classList.add('show');
        }, 10);
        
        // Configurar el botón de cierre
        notificacion.querySelector('.notificacion-cerrar').addEventListener('click', () => {
            notificacion.classList.remove('show');
            setTimeout(() => {
                notificacion.remove();
            }, 300);
        });
        
        // Auto-cerrar después de 5 segundos
        setTimeout(() => {
            if (document.body.contains(notificacion)) {
                notificacion.classList.remove('show');
                setTimeout(() => {
                    if (document.body.contains(notificacion)) {
                        notificacion.remove();
                    }
                }, 300);
            }
        }, 5000);
    }
    
    // Exponer algunas funciones al contexto global para uso externo
    window.tasasTiempoReal = {
        actualizar: (tipoPrestamo) => cargarTasasTiempoReal(tipoPrestamo || tipoPrestamoActual, true),
        obtenerTasas: (tipoPrestamo) => tasasCache[tipoPrestamo || tipoPrestamoActual] || [],
        obtenerTipos: () => TIPOS_PRESTAMOS.map(t => ({ id: t.id, nombre: t.nombre })),
        obtenerEntidades: () => ENTIDADES.map(e => ({ id: e.id, nombre: e.nombre }))
    };
});

// Módulo de Tasas de Interés en Tiempo Real
document.addEventListener('DOMContentLoaded', function() {
    // Crear el botón flotante para acceder al panel de tasas
    crearBotonAccesoTasas();
    
    // Inicializar el panel de tasas (oculto por defecto)
    inicializarPanelTasas();
});

function crearBotonAccesoTasas() {
    const boton = document.createElement('div');
    boton.className = 'tasas-tiempo-real-btn';
    boton.innerHTML = '<i class="fas fa-chart-line"></i> Tasas en Tiempo Real';
    boton.title = 'Ver tasas de interés actualizadas';
    
    // Al hacer clic en el botón, mostrar el panel de tasas
    boton.addEventListener('click', function() {
        mostrarPanelTasas();
    });
    
    document.body.appendChild(boton);
}

function inicializarPanelTasas() {
    // Crear el overlay de fondo
    const overlay = document.createElement('div');
    overlay.className = 'tasas-overlay';
    overlay.style.display = 'none';
    
    // Crear el contenedor principal del panel
    const contenedor = document.createElement('div');
    contenedor.className = 'tasas-tiempo-real-container hidden';
    
    // Estructura del panel
    contenedor.innerHTML = `
        <div class="tasas-header">
            <h2><i class="fas fa-chart-line"></i> Tasas de Interés en Tiempo Real</h2>
            <div class="tasas-controles">
                <select id="filtro-entidad">
                    <option value="todas">Todas las entidades</option>
                    <option value="bancos">Bancos</option>
                    <option value="cooperativas">Cooperativas</option>
                    <option value="fintech">Fintech</option>
                </select>
                <select id="filtro-tipo">
                    <option value="todos">Todos los créditos</option>
                    <option value="hipotecario">Hipotecario</option>
                    <option value="consumo">Consumo</option>
                    <option value="vehiculo">Vehículo</option>
                    <option value="comercial">Comercial</option>
                </select>
                <button class="btn-actualizar" id="btn-actualizar-tasas">
                    <i class="fas fa-sync-alt"></i> Actualizar
                </button>
            </div>
        </div>
        
        <div class="tasas-estado">
            <div>
                Última actualización: <span id="tasas-ultima-actualizacion">No disponible</span>
            </div>
            <div>
                Estado: <span id="tasas-estado-conexion" class="estado-loading">Consultando...</span>
            </div>
        </div>
        
        <div class="tasas-tabla-container">
            <table class="tasas-tabla">
                <thead>
                    <tr>
                        <th>Entidad</th>
                        <th>Tipo de Crédito</th>
                        <th>Tasa E.A.</th>
                        <th>Tasa N.M.</th>
                        <th>Plazo Máximo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="tabla-tasas-body">
                    <tr>
                        <td colspan="6" class="tasas-cargando">
                            <i class="fas fa-spinner fa-spin"></i> Cargando información de tasas...
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div class="tasas-grafico-container" id="grafico-tasas">
            <!-- Aquí se renderizará el gráfico -->
        </div>
        
        <div class="tasas-info">
            <div class="tasas-info-item">
                <i class="fas fa-info-circle"></i>
                <p>La información de tasas se actualiza a diario desde fuentes oficiales.</p>
            </div>
            <div class="tasas-info-item">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Las tasas pueden variar según el perfil crediticio del cliente.</p>
            </div>
        </div>
        
        <button class="btn-cerrar" id="btn-cerrar-tasas">
            <i class="fas fa-times"></i> Cerrar
        </button>
    `;
    
    // Agregar elementos al DOM
    document.body.appendChild(overlay);
    document.body.appendChild(contenedor);
    
    // Configurar eventos
    document.getElementById('btn-cerrar-tasas').addEventListener('click', ocultarPanelTasas);
    document.getElementById('btn-actualizar-tasas').addEventListener('click', actualizarTasas);
    overlay.addEventListener('click', ocultarPanelTasas);
    
    // Configurar filtros
    document.getElementById('filtro-entidad').addEventListener('change', aplicarFiltros);
    document.getElementById('filtro-tipo').addEventListener('change', aplicarFiltros);
    
    // Cargar datos iniciales cuando se muestre por primera vez
    contenedor.addEventListener('firstShow', function() {
        cargarDatosTasas();
    });
}

function mostrarPanelTasas() {
    const panel = document.querySelector('.tasas-tiempo-real-container');
    const overlay = document.querySelector('.tasas-overlay');
    
    // Mostrar el overlay y el panel
    overlay.style.display = 'block';
    panel.classList.remove('hidden');
    
    // Si es la primera vez que se muestra, cargar los datos
    if (!panel.dataset.loaded) {
        panel.dataset.loaded = true;
        cargarDatosTasas();
        panel.dispatchEvent(new Event('firstShow'));
    }
}

function ocultarPanelTasas() {
    const panel = document.querySelector('.tasas-tiempo-real-container');
    const overlay = document.querySelector('.tasas-overlay');
    
    panel.classList.add('hidden');
    overlay.style.display = 'none';
}

function cargarDatosTasas() {
    const estadoConexion = document.getElementById('tasas-estado-conexion');
    const tablaTasas = document.getElementById('tabla-tasas-body');
    const btnActualizar = document.getElementById('btn-actualizar-tasas');
    
    // Cambiar estado visual
    estadoConexion.className = 'estado-loading';
    estadoConexion.textContent = 'Consultando...';
    btnActualizar.classList.add('rotando');
    
    // Simulación de carga de datos (en una implementación real, esto sería una llamada a la API)
    setTimeout(function() {
        // Datos simulados
        const tasas = [
            { entidad: 'Banco A', tipo: 'Hipotecario', tasaEA: '10.45%', tasaNM: '0.83%', plazoMaximo: '20 años' },
            { entidad: 'Banco B', tipo: 'Consumo', tasaEA: '14.20%', tasaNM: '1.12%', plazoMaximo: '5 años' },
            { entidad: 'Cooperativa C', tipo: 'Vehículo', tasaEA: '12.30%', tasaNM: '0.97%', plazoMaximo: '7 años' },
            { entidad: 'Fintech D', tipo: 'Consumo', tasaEA: '15.80%', tasaNM: '1.23%', plazoMaximo: '3 años' },
            { entidad: 'Banco E', tipo: 'Comercial', tasaEA: '9.75%', tasaNM: '0.78%', plazoMaximo: '10 años' },
            { entidad: 'Cooperativa F', tipo: 'Hipotecario', tasaEA: '11.20%', tasaNM: '0.89%', plazoMaximo: '15 años' }
        ];
        
        // Actualizar tabla
        renderizarTablaTasas(tasas);
        
        // Actualizar estado
        const fecha = new Date();
        document.getElementById('tasas-ultima-actualizacion').textContent = 
            `${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}`;
        estadoConexion.className = 'estado-success';
        estadoConexion.textContent = 'Datos actualizados';
        btnActualizar.classList.remove('rotando');
        
        // Renderizar gráfico
        renderizarGraficoTasas(tasas);
    }, 1500);
}

function renderizarTablaTasas(tasas) {
    const tablaTasas = document.getElementById('tabla-tasas-body');
    tablaTasas.innerHTML = '';
    
    if (tasas.length === 0) {
        tablaTasas.innerHTML = `
            <tr>
                <td colspan="6" class="tasas-cargando">
                    No se encontraron tasas con los filtros seleccionados
                </td>
            </tr>
        `;
        return;
    }
    
    tasas.forEach(tasa => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${tasa.entidad}</td>
            <td>${tasa.tipo}</td>
            <td>${tasa.tasaEA}</td>
            <td>${tasa.tasaNM}</td>
            <td>${tasa.plazoMaximo}</td>
            <td>
                <button class="tasas-accion-btn" data-entidad="${tasa.entidad}" data-tipo="${tasa.tipo}">
                    <i class="fas fa-calculator"></i> Simular
                </button>
            </td>
        `;
        
        // Agregar evento para simular con estas tasas
        fila.querySelector('.tasas-accion-btn').addEventListener('click', function(e) {
            const entidad = e.target.closest('button').dataset.entidad;
            const tipo = e.target.closest('button').dataset.tipo;
            simularConTasa(entidad, tipo);
        });
        
        tablaTasas.appendChild(fila);
    });
}

function renderizarGraficoTasas(tasas) {
    const graficoContainer = document.getElementById('grafico-tasas');
    
    // Aquí iría el código para renderizar un gráfico con las tasas
    // (Utilizando una librería como Chart.js o D3.js)
    graficoContainer.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <p><i class="fas fa-chart-bar" style="font-size: 24px; color: #3498db;"></i></p>
            <p>Gráfico comparativo de tasas por entidad y tipo de crédito</p>
            <p style="font-size: 12px; color: #666;">(Visualización gráfica de tasas)</p>
        </div>
    `;
}

function aplicarFiltros() {
    const filtroEntidad = document.getElementById('filtro-entidad').value;
    const filtroTipo = document.getElementById('filtro-tipo').value;
    
    // En una implementación real, aquí se filtrarían los datos
    // Por ahora, simplemente recargamos todo
    cargarDatosTasas();
}

function actualizarTasas() {
    cargarDatosTasas();
}

function simularConTasa(entidad, tipo) {
    // Función para simular un crédito con la tasa seleccionada
    // Aquí se podría abrir el simulador con los parámetros preestablecidos
    console.log(`Simulando crédito ${tipo} con ${entidad}`);
    alert(`Simulando crédito ${tipo} con ${entidad}`);
    
    // En una implementación real, podríamos redirigir al simulador:
    // window.location.href = `simulador.html?entidad=${entidad}&tipo=${tipo}`;
}