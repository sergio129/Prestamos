/**
 * Dashboard Financiero Personal
 * Permite al usuario visualizar y gestionar su situación financiera
 */

(function() {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Inicializando Dashboard Financiero...');
        
        // Crear botón de acceso al dashboard en la parte superior
        const dashboardAccessBtn = document.createElement('button');
        dashboardAccessBtn.type = 'button';
        dashboardAccessBtn.className = 'btn-dashboard-access';
        dashboardAccessBtn.innerHTML = '<i class="fas fa-user-shield"></i> Mi Dashboard Financiero';
        
        // Insertar el botón en el header o al principio del body
        const header = document.querySelector('header');
        if (header) {
            header.appendChild(dashboardAccessBtn);
        } else {
            const firstElement = document.body.firstChild;
            document.body.insertBefore(dashboardAccessBtn, firstElement);
        }
        
        // Crear modal de acceso al dashboard
        const dashboardAccessModal = document.createElement('div');
        dashboardAccessModal.id = 'dashboard-access-modal';
        dashboardAccessModal.className = 'modal hidden';
        
        dashboardAccessModal.innerHTML = `
            <div class="modal-content access-content">
                <span class="close-modal">&times;</span>
                <div id="login-form" class="active">
                    <h2>Acceso Dashboard Financiero</h2>
                    <p class="access-description">Ingresa para acceder a tu información financiera personalizada</p>
                    
                    <div class="form-group">
                        <label for="access-pin">PIN de acceso</label>
                        <div class="input-with-icon">
                            <i class="fas fa-lock"></i>
                            <input type="password" id="access-pin" placeholder="Ingresa tu PIN de 4 dígitos" maxlength="4" pattern="[0-9]*" inputmode="numeric">
                        </div>
                        <p class="form-hint">Si es tu primera vez, crea un PIN de 4 dígitos</p>
                    </div>
                    
                    <button id="btn-dashboard-login" class="btn-primary">Acceder</button>
                    
                    <div class="login-options">
                        <button id="btn-first-time" class="btn-text">Es mi primera vez</button>
                        <button id="btn-forgot-pin" class="btn-text">Olvidé mi PIN</button>
                    </div>
                </div>
                
                <div id="setup-form" class="hidden">
                    <h2>Configura tu Dashboard</h2>
                    <p class="access-description">Completa tu información financiera para personalizar tu experiencia</p>
                    
                    <div class="form-tabs">
                        <button class="tab-btn active" data-tab="ingresos">Ingresos</button>
                        <button class="tab-btn" data-tab="gastos">Gastos</button>
                        <button class="tab-btn" data-tab="deudas">Deudas</button>
                    </div>
                    
                    <div class="tab-content">
                        <div id="tab-ingresos" class="tab-pane active">
                            <div class="form-group">
                                <label for="df-ingreso-principal">Ingreso principal mensual</label>
                                <div class="input-with-icon">
                                    <i class="fas fa-dollar-sign"></i>
                                    <input type="number" id="df-ingreso-principal" placeholder="Ej: 2,500,000">
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="df-ingresos-adicionales">Ingresos adicionales mensuales</label>
                                <div class="input-with-icon">
                                    <i class="fas fa-dollar-sign"></i>
                                    <input type="number" id="df-ingresos-adicionales" placeholder="Ej: 500,000">
                                </div>
                                <p class="form-hint">Incluye arriendos, freelance, inversiones, etc.</p>
                            </div>
                            
                            <div class="form-actions">
                                <button id="btn-next-gastos" class="btn-primary">Siguiente: Gastos</button>
                            </div>
                        </div>
                        
                        <div id="tab-gastos" class="tab-pane">
                            <div class="form-group">
                                <label for="df-gasto-vivienda">Vivienda (arriendo/cuota)</label>
                                <div class="input-with-icon">
                                    <i class="fas fa-home"></i>
                                    <input type="number" id="df-gasto-vivienda" placeholder="Ej: 800,000">
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="df-gasto-servicios">Servicios básicos</label>
                                <div class="input-with-icon">
                                    <i class="fas fa-lightbulb"></i>
                                    <input type="number" id="df-gasto-servicios" placeholder="Ej: 200,000">
                                </div>
                                <p class="form-hint">Agua, luz, gas, internet, celular, etc.</p>
                            </div>
                            
                            <div class="form-group">
                                <label for="df-gasto-alimentacion">Alimentación</label>
                                <div class="input-with-icon">
                                    <i class="fas fa-utensils"></i>
                                    <input type="number" id="df-gasto-alimentacion" placeholder="Ej: 600,000">
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="df-gasto-transporte">Transporte</label>
                                <div class="input-with-icon">
                                    <i class="fas fa-car"></i>
                                    <input type="number" id="df-gasto-transporte" placeholder="Ej: 150,000">
                                </div>
                            </div>
                            
                            <div class="form-actions">
                                <button id="btn-prev-ingresos" class="btn-outline">Atrás: Ingresos</button>
                                <button id="btn-next-deudas" class="btn-primary">Siguiente: Deudas</button>
                            </div>
                        </div>
                        
                        <div id="tab-deudas" class="tab-pane">
                            <div class="form-group">
                                <label for="df-deuda-tc">Tarjetas de crédito (pago mínimo)</label>
                                <div class="input-with-icon">
                                    <i class="fas fa-credit-card"></i>
                                    <input type="number" id="df-deuda-tc" placeholder="Ej: 150,000">
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="df-deuda-prestamos">Préstamos personales</label>
                                <div class="input-with-icon">
                                    <i class="fas fa-hand-holding-usd"></i>
                                    <input type="number" id="df-deuda-prestamos" placeholder="Ej: 300,000">
                                </div>
                                <p class="form-hint">Suma de cuotas mensuales de tus préstamos personales</p>
                            </div>
                            
                            <div class="form-group">
                                <label for="df-deuda-vehiculo">Préstamo de vehículo</label>
                                <div class="input-with-icon">
                                    <i class="fas fa-car-alt"></i>
                                    <input type="number" id="df-deuda-vehiculo" placeholder="Ej: 450,000">
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="df-otras-deudas">Otras deudas</label>
                                <div class="input-with-icon">
                                    <i class="fas fa-file-invoice-dollar"></i>
                                    <input type="number" id="df-otras-deudas" placeholder="Ej: 100,000">
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="df-new-pin">Crea tu PIN de acceso</label>
                                <div class="input-with-icon">
                                    <i class="fas fa-lock"></i>
                                    <input type="password" id="df-new-pin" placeholder="4 dígitos" maxlength="4" pattern="[0-9]*" inputmode="numeric">
                                </div>
                                <p class="form-hint">Este PIN te permitirá acceder a tu dashboard financiero</p>
                            </div>
                            
                            <div class="form-actions">
                                <button id="btn-prev-gastos" class="btn-outline">Atrás: Gastos</button>
                                <button id="btn-save-financial-data" class="btn-primary">Guardar y Acceder</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(dashboardAccessModal);
        
        // Crear modal para el dashboard (en lugar de insertarlo directamente en la página)
        const dashboardModal = document.createElement('div');
        dashboardModal.id = 'dashboard-modal';
        dashboardModal.className = 'modal dashboard-modal hidden';
        
        dashboardModal.innerHTML = `
            <div class="modal-content dashboard-modal-content">
                <div class="dashboard-modal-header">
                    <h2>Dashboard Financiero Personal</h2>
                    <span class="close-modal">&times;</span>
                </div>
                <div class="dashboard-modal-body">
                    <div class="dashboard-grid">
                        <!-- Resumen de situación financiera -->
                        <div class="dashboard-card">
                            <div class="card-header">
                                <h3><i class="fas fa-wallet"></i> Resumen Financiero</h3>
                                <button class="btn-refresh" data-section="financial-summary">
                                    <i class="fas fa-sync-alt"></i>
                                </button>
                            </div>
                            <div class="card-body">
                                <div class="health-indicator">
                                    <div class="indicator-bar">
                                        <div class="indicator-fill" id="health-indicator-fill"></div>
                                    </div>
                                    <div class="indicator-label">Salud Financiera: <span class="indicator-value" id="health-status">Calculando...</span></div>
                                </div>
                                
                                <div class="financial-summary">
                                    <div class="summary-item">
                                        <span class="summary-label">Capacidad de endeudamiento</span>
                                        <span class="summary-value" id="dash-capacidad">Calculando...</span>
                                    </div>
                                    <div class="summary-item">
                                        <span class="summary-label">Préstamos activos</span>
                                        <span class="summary-value" id="dash-prestamos">0</span>
                                    </div>
                                    <div class="summary-item">
                                        <span class="summary-label">Deuda total</span>
                                        <span class="summary-value" id="dash-deuda">Calculando...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Mejores tasas del mercado -->
                        <div class="dashboard-card">
                            <div class="card-header">
                                <h3><i class="fas fa-percentage"></i> Mejores Tasas Actuales</h3>
                                <button class="btn-refresh" data-section="best-rates">
                                    <i class="fas fa-sync-alt"></i>
                                </button>
                            </div>
                            <div class="card-body">
                                <div id="best-rates-container" class="best-rates-container">
                                    <div class="loading-spinner">
                                        <i class="fas fa-spinner fa-spin"></i>
                                        <span>Cargando tasas actualizadas...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Simulaciones recientes y acciones rápidas -->
                        <div class="dashboard-card">
                            <div class="card-header">
                                <h3><i class="fas fa-bolt"></i> Acciones Rápidas</h3>
                            </div>
                            <div class="card-body">
                                <div class="quick-actions">
                                    <button class="quick-action-btn" id="quick-loan">
                                        <i class="fas fa-hand-holding-usd"></i>
                                        <span>Simular Préstamo</span>
                                    </button>
                                    <button class="quick-action-btn" id="quick-capacity">
                                        <i class="fas fa-calculator"></i>
                                        <span>Capacidad de Endeudamiento</span>
                                    </button>
                                    <button class="quick-action-btn" id="quick-compare">
                                        <i class="fas fa-exchange-alt"></i>
                                        <span>Comparar Tasas</span>
                                    </button>
                                    <button class="quick-action-btn" id="quick-invest">
                                        <i class="fas fa-chart-line"></i>
                                        <span>Simulador de Inversiones</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Simulaciones recientes -->
                        <div class="dashboard-card">
                            <div class="card-header">
                                <h3><i class="fas fa-history"></i> Simulaciones Recientes</h3>
                                <button class="btn-refresh" data-section="recent-simulations">
                                    <i class="fas fa-sync-alt"></i>
                                </button>
                            </div>
                            <div class="card-body">
                                <div id="simulaciones-recientes" class="simulaciones-container">
                                    <div class="loading-spinner">
                                        <i class="fas fa-spinner fa-spin"></i>
                                        <span>Cargando simulaciones...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Editar datos financieros -->
                        <div class="dashboard-card">
                            <div class="card-header">
                                <h3><i class="fas fa-edit"></i> Mis Datos Financieros</h3>
                            </div>
                            <div class="card-body">
                                <p class="card-text">Actualiza tu información financiera para obtener recomendaciones más precisas.</p>
                                <button id="btn-editar-datos" class="btn-action-secondary">
                                    <i class="fas fa-pencil-alt"></i> Editar Datos Financieros
                                </button>
                            </div>
                        </div>
                        
                        <!-- Seguridad -->
                        <div class="dashboard-card">
                            <div class="card-header">
                                <h3><i class="fas fa-lock"></i> Seguridad</h3>
                            </div>
                            <div class="card-body">
                                <p class="card-text">Gestiona la seguridad de tu dashboard financiero.</p>
                                <button id="btn-cambiar-pin" class="btn-action-secondary">
                                    <i class="fas fa-key"></i> Cambiar PIN de Acceso
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Recomendaciones personalizadas -->
                    <div class="recommendations-panel">
                        <div class="panel-header">
                            <h3><i class="fas fa-lightbulb"></i> Recomendaciones Personalizadas</h3>
                            <button class="btn-refresh" data-section="recommendations">
                                <i class="fas fa-sync-alt"></i>
                            </button>
                        </div>
                        <div class="panel-body">
                            <div id="recommendations-container" class="recommendations-slider">
                                <!-- Se generará dinámicamente -->
                                <div class="loading-spinner">
                                    <i class="fas fa-spinner fa-spin"></i>
                                    <span>Analizando tu perfil financiero...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(dashboardModal);
        
        // Eventos para el modal de acceso
        dashboardAccessBtn.addEventListener('click', function() {
            dashboardAccessModal.classList.remove('hidden');
            
            // Si ya hay un PIN guardado, mostrar formulario de login, sino mostrar setup
            const hasPin = localStorage.getItem('dashboardPin');
            if (hasPin) {
                document.getElementById('login-form').classList.add('active');
                document.getElementById('login-form').classList.remove('hidden');
                document.getElementById('setup-form').classList.add('hidden');
                document.getElementById('setup-form').classList.remove('active');
                
                // Enfocar el campo de PIN
                document.getElementById('access-pin').focus();
            } else {
                document.getElementById('setup-form').classList.add('active');
                document.getElementById('setup-form').classList.remove('hidden');
                document.getElementById('login-form').classList.add('hidden');
                document.getElementById('login-form').classList.remove('active');
                
                // Enfocar el primer campo
                document.getElementById('df-ingreso-principal').focus();
            }
        });
        
        // Cerrar modal
        dashboardAccessModal.querySelector('.close-modal').addEventListener('click', function() {
            dashboardAccessModal.classList.add('hidden');
        });
        
        // Evitar que los clics dentro del modal lo cierren
        dashboardAccessModal.querySelector('.modal-content').addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        // Cerrar modal al hacer clic fuera del contenido
        dashboardAccessModal.addEventListener('click', function() {
            dashboardAccessModal.classList.add('hidden');
        });
        
        // Navegación entre tabs del formulario
        dashboardAccessModal.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Activar botón seleccionado
                dashboardAccessModal.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Mostrar contenido de la pestaña
                dashboardAccessModal.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
                dashboardAccessModal.querySelector(`#tab-${tabId}`).classList.add('active');
            });
        });
        
        // Eventos para navegación del formulario
        document.getElementById('btn-next-gastos').addEventListener('click', function() {
            dashboardAccessModal.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            dashboardAccessModal.querySelector('[data-tab="gastos"]').classList.add('active');
            
            dashboardAccessModal.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
            dashboardAccessModal.querySelector('#tab-gastos').classList.add('active');
        });
        
        document.getElementById('btn-prev-ingresos').addEventListener('click', function() {
            dashboardAccessModal.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            dashboardAccessModal.querySelector('[data-tab="ingresos"]').classList.add('active');
            
            dashboardAccessModal.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
            dashboardAccessModal.querySelector('#tab-ingresos').classList.add('active');
        });
        
        document.getElementById('btn-next-deudas').addEventListener('click', function() {
            dashboardAccessModal.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            dashboardAccessModal.querySelector('[data-tab="deudas"]').classList.add('active');
            
            dashboardAccessModal.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
            dashboardAccessModal.querySelector('#tab-deudas').classList.add('active');
        });
        
        document.getElementById('btn-prev-gastos').addEventListener('click', function() {
            dashboardAccessModal.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            dashboardAccessModal.querySelector('[data-tab="gastos"]').classList.add('active');
            
            dashboardAccessModal.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
            dashboardAccessModal.querySelector('#tab-gastos').classList.add('active');
        });
        
        // Es mi primera vez (pasar a formulario de configuración)
        document.getElementById('btn-first-time').addEventListener('click', function() {
            document.getElementById('login-form').classList.add('hidden');
            document.getElementById('login-form').classList.remove('active');
            document.getElementById('setup-form').classList.remove('hidden');
            document.getElementById('setup-form').classList.add('active');
            
            // Enfocar el primer campo
            document.getElementById('df-ingreso-principal').focus();
        });
        
        // Olvidé mi PIN
        document.getElementById('btn-forgot-pin').addEventListener('click', function() {
            const confirmReset = confirm("¿Estás seguro que deseas reiniciar tu PIN? Esto eliminará tus datos financieros guardados.");
            
            if (confirmReset) {
                localStorage.removeItem('dashboardPin');
                localStorage.removeItem('datosFinancieros');
                
                // Mostrar formulario de configuración
                document.getElementById('login-form').classList.add('hidden');
                document.getElementById('login-form').classList.remove('active');
                document.getElementById('setup-form').classList.remove('hidden');
                document.getElementById('setup-form').classList.add('active');
                
                // Enfocar el primer campo
                document.getElementById('df-ingreso-principal').focus();
                
                // Mostrar mensaje
                mostrarMensaje("PIN reiniciado. Por favor, configura tu dashboard nuevamente.", "info");
            }
        });
        
        // Acceder al dashboard (iniciar sesión)
        document.getElementById('btn-dashboard-login').addEventListener('click', function() {
            const pin = document.getElementById('access-pin').value;
            const storedPin = localStorage.getItem('dashboardPin');
            
            if (pin && pin === storedPin) {
                // PIN correcto, mostrar dashboard
                dashboardAccessModal.classList.add('hidden');
                document.getElementById('access-pin').value = '';
                
                // Mostrar el dashboard
                mostrarDashboard();
                
                // Mensaje de bienvenida
                mostrarMensaje("Bienvenido a tu Dashboard Financiero Personal", "success");
            } else {
                // PIN incorrecto
                mostrarMensaje("PIN incorrecto. Inténtalo de nuevo.", "error");
                document.getElementById('access-pin').value = '';
                document.getElementById('access-pin').focus();
            }
        });
        
        // Guardar datos financieros y PIN
        document.getElementById('btn-save-financial-data').addEventListener('click', function() {
            // Obtener todos los valores del formulario
            const ingresoPrincipal = parseFloat(document.getElementById('df-ingreso-principal').value) || 0;
            const ingresosAdicionales = parseFloat(document.getElementById('df-ingresos-adicionales').value) || 0;
            const gastoVivienda = parseFloat(document.getElementById('df-gasto-vivienda').value) || 0;
            const gastoServicios = parseFloat(document.getElementById('df-gasto-servicios').value) || 0;
            const gastoAlimentacion = parseFloat(document.getElementById('df-gasto-alimentacion').value) || 0;
            const gastoTransporte = parseFloat(document.getElementById('df-gasto-transporte').value) || 0;
            const deudaTC = parseFloat(document.getElementById('df-deuda-tc').value) || 0;
            const deudaPrestamos = parseFloat(document.getElementById('df-deuda-prestamos').value) || 0;
            const deudaVehiculo = parseFloat(document.getElementById('df-deuda-vehiculo').value) || 0;
            const otrasDeudas = parseFloat(document.getElementById('df-otras-deudas').value) || 0;
            const newPin = document.getElementById('df-new-pin').value;
            
            // Validar datos mínimos
            if (ingresoPrincipal <= 0) {
                mostrarMensaje("Por favor, ingresa tu ingreso principal.", "error");
                document.getElementById('df-ingreso-principal').focus();
                return;
            }
            
            // Validar PIN
            if (!newPin || newPin.length !== 4 || !/^\d{4}$/.test(newPin)) {
                mostrarMensaje("Por favor, crea un PIN de 4 dígitos.", "error");
                document.getElementById('df-new-pin').focus();
                return;
            }
            
            // Guardar PIN
            localStorage.setItem('dashboardPin', newPin);
            
            // Crear objeto de datos financieros
            const datosFinancieros = {
                ingresos: {
                    principal: ingresoPrincipal,
                    adicionales: ingresosAdicionales
                },
                gastos: {
                    vivienda: gastoVivienda,
                    servicios: gastoServicios,
                    alimentacion: gastoAlimentacion,
                    transporte: gastoTransporte
                },
                deudas: {
                    tc: deudaTC,
                    prestamos: deudaPrestamos,
                    vehiculo: deudaVehiculo,
                    otras: otrasDeudas
                },
                fecha: new Date().toISOString()
            };
            
            // Guardar datos financieros
            localStorage.setItem('datosFinancieros', JSON.stringify(datosFinancieros));
            
            // Cerrar modal
            dashboardAccessModal.classList.add('hidden');
            
            // Mostrar el dashboard
            mostrarDashboard();
            
            // Mostrar mensaje de éxito
            mostrarMensaje("Información financiera guardada correctamente.", "success");
        });
        
        // Función para mostrar el dashboard después de autenticación
        function mostrarDashboard() {
            // Mostrar el modal del dashboard en lugar de insertarlo en la página
            dashboardModal.classList.remove('hidden');
            
            // Inicializar datos del dashboard
            inicializarDashboard();
        }
        
        // Eventos del modal del dashboard
        dashboardModal.querySelector('.close-modal').addEventListener('click', function() {
            dashboardModal.classList.add('hidden');
        });
        
        // Evitar que los clics dentro del contenido cierren el modal
        dashboardModal.querySelector('.modal-content').addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        // Cerrar modal al hacer clic fuera del contenido
        dashboardModal.addEventListener('click', function() {
            dashboardModal.classList.add('hidden');
        });
        
        // Botón de editar datos financieros
        document.getElementById('btn-editar-datos').addEventListener('click', function() {
            // Cerrar modal del dashboard
            dashboardModal.classList.add('hidden');
            
            // Mostrar formulario de configuración
            document.getElementById('dashboard-access-modal').classList.remove('hidden');
            document.getElementById('login-form').classList.add('hidden');
            document.getElementById('login-form').classList.remove('active');
            document.getElementById('setup-form').classList.remove('hidden');
            document.getElementById('setup-form').classList.add('active');
            
            // Prellenar los campos con los datos existentes
            const datosFinancieros = obtenerDatosFinancieros();
            if (datosFinancieros) {
                document.getElementById('df-ingreso-principal').value = datosFinancieros.ingresos.principal || '';
                document.getElementById('df-ingresos-adicionales').value = datosFinancieros.ingresos.adicionales || '';
                document.getElementById('df-gasto-vivienda').value = datosFinancieros.gastos.vivienda || '';
                document.getElementById('df-gasto-servicios').value = datosFinancieros.gastos.servicios || '';
                document.getElementById('df-gasto-alimentacion').value = datosFinancieros.gastos.alimentacion || '';
                document.getElementById('df-gasto-transporte').value = datosFinancieros.gastos.transporte || '';
                document.getElementById('df-deuda-tc').value = datosFinancieros.deudas.tc || '';
                document.getElementById('df-deuda-prestamos').value = datosFinancieros.deudas.prestamos || '';
                document.getElementById('df-deuda-vehiculo').value = datosFinancieros.deudas.vehiculo || '';
                document.getElementById('df-otras-deudas').value = datosFinancieros.deudas.otras || '';
            }
        });
        
        // Botón de cambiar PIN
        document.getElementById('btn-cambiar-pin').addEventListener('click', function() {
            const nuevoPin = prompt("Ingresa un nuevo PIN de 4 dígitos:");
            
            if (nuevoPin && nuevoPin.length === 4 && /^\d{4}$/.test(nuevoPin)) {
                localStorage.setItem('dashboardPin', nuevoPin);
                mostrarMensaje("PIN actualizado correctamente", "success");
            } else if (nuevoPin) {
                mostrarMensaje("El PIN debe tener 4 dígitos numéricos", "error");
            }
        });
        
        // Inicializar datos del dashboard
        inicializarDashboard();
        
        /**
         * Inicializa los datos del dashboard obteniendo información de varias fuentes
         */
        function inicializarDashboard() {
            // Calcular la capacidad de endeudamiento
            calcularCapacidadEndeudamiento();
            
            // Obtener mejores tasas del mercado
            obtenerMejoresTasas();
            
            // Generar recomendaciones personalizadas
            generarRecomendaciones();
            
            // Actualizar estado financiero
            actualizarEstadoFinanciero();
            
            // Cargar simulaciones recientes
            cargarSimulacionesRecientes();
        }
        
        /**
         * Carga las simulaciones recientes del usuario
         */
        function cargarSimulacionesRecientes() {
            const container = document.getElementById('simulaciones-recientes');
            if (!container) return;
            
            // Obtener simulaciones guardadas
            const simulaciones = window.obtenerSimulaciones ? window.obtenerSimulaciones() : [];
            
            if (simulaciones && simulaciones.length > 0) {
                container.innerHTML = '';
                
                // Crear elemento para cada simulación
                simulaciones.slice(0, 5).forEach(sim => { // Mostrar solo las 5 más recientes
                    const fecha = new Date(sim.fecha);
                    const fechaFormateada = fecha.toLocaleDateString('es-CO', { 
                        day: '2-digit', 
                        month: '2-digit', 
                        year: 'numeric' 
                    });
                    
                    const formatoMoneda = new Intl.NumberFormat('es-CO', {
                        style: 'currency',
                        currency: 'COP',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                    });
                    
                    const simItem = document.createElement('div');
                    simItem.className = 'simulacion-item';
                    simItem.innerHTML = `
                        <div class="simulacion-title">${sim.tipo} - ${formatoMoneda.format(sim.monto)}</div>
                        <div class="simulacion-details">
                            <span>Plazo: ${sim.plazo} meses</span>
                            <span>Tasa: ${sim.tasa}%</span>
                        </div>
                        <div class="simulacion-fecha">${fechaFormateada}</div>
                    `;
                    
                    // Agregar evento para recargar simulación
                    simItem.addEventListener('click', function() {
                        // Cerrar modal del dashboard
                        dashboardModal.classList.add('hidden');
                        
                        // Aplicar valores al formulario principal
                        const montoInput = document.getElementById('monto');
                        const plazoInput = document.getElementById('plazo');
                        const interesInput = document.getElementById('interes-mensual');
                        
                        if (montoInput && plazoInput && interesInput) {
                            montoInput.value = sim.monto;
                            plazoInput.value = sim.plazo;
                            interesInput.value = sim.tasa;
                            
                            // Enfocar y calcular
                            setTimeout(() => {
                                montoInput.focus();
                                montoInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                
                                // Calcular préstamo automáticamente
                                if (typeof calcularPrestamo === 'function') {
                                    calcularPrestamo();
                                } else {
                                    // Buscar y hacer clic en el botón de calcular
                                    const calcularBtn = document.querySelector('#loan-form button[type="submit"]');
                                    if (calcularBtn) {
                                        calcularBtn.click();
                                    }
                                }
                                
                                mostrarMensaje("Simulación recargada", "success");
                            }, 100);
                        }
                    });
                    
                    container.appendChild(simItem);
                });
            } else {
                container.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-history"></i>
                        <p>No hay simulaciones recientes</p>
                    </div>
                `;
            }
        }
        
        /**
         * Actualiza una sección específica del dashboard
         * @param {string} section - Identificador de la sección a actualizar
         */
        function actualizarSeccion(section) {
            switch(section) {
                case 'financial-summary':
                    calcularCapacidadEndeudamiento();
                    actualizarEstadoFinanciero();
                    break;
                case 'best-rates':
                    obtenerMejoresTasas();
                    break;
                case 'recommendations':
                    generarRecomendaciones();
                    break;
            }
        }
        
        /**
         * Calcula la capacidad de endeudamiento basada en datos guardados o simulados
         */
        function calcularCapacidadEndeudamiento() {
            // Intentar obtener datos de localStorage
            const datosFinancieros = obtenerDatosFinancieros();
            
            // Formatear moneda
            const formatoMoneda = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
            
            if (datosFinancieros) {
                // Calcular capacidad de endeudamiento (30% de ingresos netos)
                const ingresoTotal = datosFinancieros.ingresos.principal + datosFinancieros.ingresos.adicionales;
                const gastoTotal = datosFinancieros.gastos.vivienda + datosFinancieros.gastos.servicios + 
                                datosFinancieros.gastos.alimentacion + datosFinancieros.gastos.transporte;
                const deudaTotal = datosFinancieros.deudas.tc + datosFinancieros.deudas.prestamos + 
                                datosFinancieros.deudas.vehiculo + datosFinancieros.deudas.otras;
                
                const ingresoDisponible = ingresoTotal - gastoTotal;
                const capacidadMaxima = ingresoDisponible * 0.3;
                const capacidadAdicional = Math.max(0, capacidadMaxima - deudaTotal);
                
                // Actualizar la interfaz
                const capacidadElement = document.getElementById('dash-capacidad');
                if (capacidadElement) {
                    capacidadElement.textContent = formatoMoneda.format(capacidadAdicional);
                }
                
                const deudaElement = document.getElementById('dash-deuda');
                if (deudaElement) {
                    deudaElement.textContent = formatoMoneda.format(deudaTotal);
                }
                
                const prestamosElement = document.getElementById('dash-prestamos');
                if (prestamosElement) {
                    // Contar préstamos activos (simplificado)
                    const numPrestamos = (datosFinancieros.deudas.prestamos > 0 ? 1 : 0) + 
                                        (datosFinancieros.deudas.vehiculo > 0 ? 1 : 0) +
                                        (datosFinancieros.deudas.otras > 0 ? 1 : 0);
                    prestamosElement.textContent = numPrestamos;
                }
            } else {
                // Si no hay datos, usar datos de simulación
                const capacidadElement = document.getElementById('dash-capacidad');
                if (capacidadElement) {
                    // Generar un valor aleatorio entre 1,000,000 y 5,000,000
                    const capacidadSimulada = Math.floor(Math.random() * 4000000) + 1000000;
                    capacidadElement.textContent = formatoMoneda.format(capacidadSimulada);
                }
                
                const deudaElement = document.getElementById('dash-deuda');
                if (deudaElement) {
                    // Generar deuda simulada
                    const deudaSimulada = Math.floor(Math.random() * 20000000) + 5000000;
                    deudaElement.textContent = formatoMoneda.format(deudaSimulada);
                }
            }
        }
        
        /**
         * Actualiza el indicador de salud financiera
         */
        function actualizarEstadoFinanciero() {
            const datosFinancieros = obtenerDatosFinancieros();
            
            let porcentajeSalud = 70; // Valor predeterminado
            let estadoTexto = 'Buena';
            
            if (datosFinancieros) {
                // Calcular relación deuda/ingreso
                const ingresoTotal = datosFinancieros.ingresos.principal + datosFinancieros.ingresos.adicionales;
                const deudaTotal = datosFinancieros.deudas.tc + datosFinancieros.deudas.prestamos + 
                                datosFinancieros.deudas.vehiculo + datosFinancieros.deudas.otras;
                
                const relacionDeudaIngreso = (deudaTotal / ingresoTotal) * 100;
                
                // Determinar salud financiera basada en relación deuda/ingreso
                if (relacionDeudaIngreso <= 20) {
                    porcentajeSalud = 90;
                    estadoTexto = 'Excelente';
                } else if (relacionDeudaIngreso <= 30) {
                    porcentajeSalud = 75;
                    estadoTexto = 'Buena';
                } else if (relacionDeudaIngreso <= 40) {
                    porcentajeSalud = 50;
                    estadoTexto = 'Regular';
                } else if (relacionDeudaIngreso <= 50) {
                    porcentajeSalud = 30;
                    estadoTexto = 'Atención';
                } else {
                    porcentajeSalud = 15;
                    estadoTexto = 'Crítica';
                }
            }
            
            // Actualizar indicador visual
            const indicatorFill = document.getElementById('health-indicator-fill');
            const healthStatus = document.getElementById('health-status');
            
            if (indicatorFill) {
                indicatorFill.style.width = `${porcentajeSalud}%`;
                
                // Actualizar color según el porcentaje
                if (porcentajeSalud >= 75) {
                    indicatorFill.style.background = 'linear-gradient(to right, #2ecc71, #27ae60)';
                } else if (porcentajeSalud >= 50) {
                    indicatorFill.style.background = 'linear-gradient(to right, #f1c40f, #f39c12)';
                } else if (porcentajeSalud >= 25) {
                    indicatorFill.style.background = 'linear-gradient(to right, #e67e22, #d35400)';
                } else {
                    indicatorFill.style.background = 'linear-gradient(to right, #e74c3c, #c0392b)';
                }
            }
            
            if (healthStatus) {
                healthStatus.textContent = estadoTexto;
                
                // Actualizar color del texto según el estado
                if (estadoTexto === 'Excelente' || estadoTexto === 'Buena') {
                    healthStatus.style.color = '#27ae60';
                } else if (estadoTexto === 'Regular') {
                    healthStatus.style.color = '#f39c12';
                } else {
                    healthStatus.style.color = '#e74c3c';
                }
            }
        }
        
        /**
         * Obtiene las mejores tasas del mercado financiero
         */
        function obtenerMejoresTasas() {
            const container = document.getElementById('best-rates-container');
            if (!container) return;
            
            // Mostrar indicador de carga
            container.innerHTML = `
                <div class="loading-spinner">
                    <i class="fas fa-spinner fa-spin"></i>
                    <span>Cargando tasas actualizadas...</span>
                </div>
            `;
            
            // Simular tiempo de carga
            setTimeout(() => {
                // Intentar obtener tasas del módulo de comparador de tasas
                if (typeof window.entidadesFinancieras !== 'undefined') {
                    // Si el módulo está disponible, usar esos datos
                    actualizarTasasConDatosReales(container);
                } else {
                    // Usar datos simulados
                    actualizarTasasSimuladas(container);
                }
            }, 1000);
        }
        
        /**
         * Actualiza las mejores tasas con datos reales del módulo de comparador de tasas
         * @param {HTMLElement} container - Contenedor donde mostrar las tasas
         */
        function actualizarTasasConDatosReales(container) {
            // Esta función asume que window.entidadesFinancieras está disponible desde comparador-tasas.js
            // En una implementación real, deberías asegurarte de que esta variable sea accesible
            
            try {
                const personal = [...window.entidadesFinancieras.personal].sort((a, b) => a.tasaEA - b.tasaEA)[0];
                const hipotecario = [...window.entidadesFinancieras.hipotecario].sort((a, b) => a.tasaEA - b.tasaEA)[0];
                const vehiculo = [...window.entidadesFinancieras.vehiculo].sort((a, b) => a.tasaEA - b.tasaEA)[0];
                
                container.innerHTML = `
                    <div class="best-rates-container">
                        <div class="rate-category">
                            <div class="category-title">Crédito Consumo</div>
                            <div class="best-rate">
                                <div class="rate-entity">${personal.nombre}</div>
                                <div class="rate-value">${personal.tasaEA.toFixed(2)}% E.A.</div>
                            </div>
                        </div>
                        
                        <div class="rate-category">
                            <div class="category-title">Hipotecario</div>
                            <div class="best-rate">
                                <div class="rate-entity">${hipotecario.nombre}</div>
                                <div class="rate-value">${hipotecario.tasaEA.toFixed(2)}% E.A.</div>
                            </div>
                        </div>
                        
                        <div class="rate-category">
                            <div class="category-title">Vehículos</div>
                            <div class="best-rate">
                                <div class="rate-entity">${vehiculo.nombre}</div>
                                <div class="rate-value">${vehiculo.tasaEA.toFixed(2)}% E.A.</div>
                            </div>
                        </div>
                    </div>
                `;
            } catch (error) {
                console.error('Error al cargar tasas reales:', error);
                actualizarTasasSimuladas(container);
            }
        }
        
        /**
         * Actualiza las mejores tasas con datos simulados
         * @param {HTMLElement} container - Contenedor donde mostrar las tasas
         */
        function actualizarTasasSimuladas(container) {
            container.innerHTML = `
                <div class="best-rates-container">
                    <div class="rate-category">
                        <div class="category-title">Crédito Consumo</div>
                        <div class="best-rate">
                            <div class="rate-entity">BBVA</div>
                            <div class="rate-value">28.06% E.A.</div>
                        </div>
                    </div>
                    
                    <div class="rate-category">
                        <div class="category-title">Hipotecario</div>
                        <div class="best-rate">
                            <div class="rate-entity">BBVA</div>
                            <div class="rate-value">11.90% E.A.</div>
                        </div>
                    </div>
                    
                    <div class="rate-category">
                        <div class="category-title">Vehículos</div>
                        <div class="best-rate">
                            <div class="rate-entity">RCI Banque</div>
                            <div class="rate-value">16.95% E.A.</div>
                        </div>
                    </div>
                </div>
            `;
        }
        
        /**
         * Genera recomendaciones personalizadas basadas en los datos financieros
         */
        function generarRecomendaciones() {
            const container = document.getElementById('recommendations-container');
            if (!container) return;
            
            // Mostrar indicador de carga
            container.innerHTML = `
                <div class="loading-spinner">
                    <i class="fas fa-spinner fa-spin"></i>
                    <span>Analizando tu perfil financiero...</span>
                </div>
            `;
            
            // Simular tiempo de carga
            setTimeout(() => {
                const datosFinancieros = obtenerDatosFinancieros();
                
                // Array para almacenar recomendaciones
                const recomendaciones = [];
                
                if (datosFinancieros) {
                    // Calcular relación deuda/ingreso
                    const ingresoTotal = datosFinancieros.ingresos.principal + datosFinancieros.ingresos.adicionales;
                    const deudaTotal = datosFinancieros.deudas.tc + datosFinancieros.deudas.prestamos + 
                                    datosFinancieros.deudas.vehiculo + datosFinancieros.deudas.otras;
                    
                    const relacionDeudaIngreso = (deudaTotal / ingresoTotal) * 100;
                    
                    // Recomendaciones basadas en situación financiera
                    if (relacionDeudaIngreso > 40) {
                        recomendaciones.push({
                            icon: 'hand-holding-usd',
                            title: 'Consolidación de Deudas',
                            text: 'Tu nivel de endeudamiento es alto. Considera consolidar tus deudas en un solo préstamo con menor tasa.',
                            action: 'Explorar opciones',
                            onClick: 'mostrarConsolidacion'
                        });
                    }
                    
                    if (datosFinancieros.deudas.tc > 0) {
                        recomendaciones.push({
                            icon: 'credit-card',
                            title: 'Refinanciación de Tarjetas',
                            text: 'Las tarjetas de crédito suelen tener tasas muy altas. Considera un préstamo personal para pagarlas.',
                            action: 'Calcular ahorro',
                            onClick: 'calcularAhorroTC'
                        });
                    }
                }
                
                // Siempre añadir algunas recomendaciones generales
                recomendaciones.push({
                    icon: 'piggy-bank',
                    title: 'Fondo de Emergencia',
                    text: 'Es recomendable tener un fondo de emergencia equivalente a 3-6 meses de gastos.',
                    action: 'Aprender más',
                    onClick: 'aprenderFondoEmergencia'
                });
                
                recomendaciones.push({
                    icon: 'home',
                    title: 'Simulador Hipotecario',
                    text: 'Explora nuestro simulador hipotecario con subsidios para conocer tus opciones de vivienda.',
                    action: 'Ir al simulador',
                    onClick: 'abrirSimuladorHipotecario'
                });
                
                recomendaciones.push({
                    icon: 'chart-line',
                    title: 'Invertir tus Ahorros',
                    text: 'Descubre cómo hacer crecer tu dinero con diferentes opciones de inversión.',
                    action: 'Simular inversión',
                    onClick: 'abrirSimuladorInversiones'
                });
                
                // Mostrar recomendaciones
                container.innerHTML = '';
                
                // Crear slider de recomendaciones
                const sliderWrapper = document.createElement('div');
                sliderWrapper.className = 'recommendations-wrapper';
                
                recomendaciones.forEach(recomendacion => {
                    const recomendacionEl = document.createElement('div');
                    recomendacionEl.className = 'recommendation-item';
                    
                    recomendacionEl.innerHTML = `
                        <div class="recommendation-icon">
                            <i class="fas fa-${recomendacion.icon}"></i>
                        </div>
                        <div class="recommendation-content">
                            <div class="recommendation-title">${recomendacion.title}</div>
                            <div class="recommendation-text">${recomendacion.text}</div>
                            <button class="btn-action" data-action="${recomendacion.onClick}">
                                ${recomendacion.action}
                            </button>
                        </div>
                    `;
                    
                    sliderWrapper.appendChild(recomendacionEl);
                });
                
                container.appendChild(sliderWrapper);
                
                // Configurar eventos para botones de acción
                container.querySelectorAll('.btn-action').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const action = this.getAttribute('data-action');
                        ejecutarAccionRecomendacion(action);
                    });
                });
                
                // Si hay más de una recomendación, añadir controles de navegación
                if (recomendaciones.length > 1) {
                    // Crear indicadores de página
                    const paginationContainer = document.createElement('div');
                    paginationContainer.className = 'slider-pagination';
                    
                    for (let i = 0; i < recomendaciones.length; i++) {
                        const indicator = document.createElement('span');
                        indicator.className = i === 0 ? 'page-indicator active' : 'page-indicator';
                        indicator.setAttribute('data-index', i);
                        
                        indicator.addEventListener('click', function() {
                            const index = parseInt(this.getAttribute('data-index'));
                            navigateSlider(index);
                        });
                        
                        paginationContainer.appendChild(indicator);
                    }
                    
                    container.appendChild(paginationContainer);
                    
                    // Agregar navegación automática
                    let currentSlide = 0;
                    const intervalTime = 5000; // 5 segundos
                    
                    const slideInterval = setInterval(() => {
                        currentSlide = (currentSlide + 1) % recomendaciones.length;
                        navigateSlider(currentSlide);
                    }, intervalTime);
                    
                    // Detener navegación automática al interactuar
                    container.addEventListener('mouseenter', () => {
                        clearInterval(slideInterval);
                    });
                    
                    container.addEventListener('mouseleave', () => {
                        clearInterval(slideInterval);
                        
                        // Reiniciar intervalo
                        setInterval(() => {
                            currentSlide = (currentSlide + 1) % recomendaciones.length;
                            navigateSlider(currentSlide);
                        }, intervalTime);
                    });
                    
                    // Función para navegar entre slides
                    function navigateSlider(index) {
                        const slideWidth = container.offsetWidth;
                        sliderWrapper.style.transform = `translateX(-${index * slideWidth}px)`;
                        
                        // Actualizar indicadores
                        container.querySelectorAll('.page-indicator').forEach((indicator, i) => {
                            if (i === index) {
                                indicator.classList.add('active');
                            } else {
                                indicator.classList.remove('active');
                            }
                        });
                        
                        currentSlide = index;
                    }
                }
            }, 1500);
        }
        
        /**
         * Ejecuta una acción basada en una recomendación
         * @param {string} action - Nombre de la acción a ejecutar
         */
        function ejecutarAccionRecomendacion(action) {
            switch(action) {
                case 'mostrarConsolidacion':
                    // Abrir el simulador de préstamos con valores para consolidación
                    const montoInput = document.getElementById('monto');
                    const plazoInput = document.getElementById('plazo');
                    
                    if (montoInput && plazoInput) {
                        // Obtener el total de deudas
                        const datosFinancieros = obtenerDatosFinancieros();
                        
                        if (datosFinancieros) {
                            const deudaTotal = datosFinancieros.deudas.tc + datosFinancieros.deudas.prestamos + 
                                            datosFinancieros.deudas.vehiculo + datosFinancieros.deudas.otras;
                            
                            montoInput.value = deudaTotal;
                            plazoInput.value = 36; // 3 años por defecto
                            
                            // Enfocar y desplazarse al formulario
                            montoInput.focus();
                            montoInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            
                            // Mostrar mensaje
                            mostrarMensaje('Se han configurado los valores para consolidar tus deudas.', 'info');
                        }
                    }
                    break;
                
                case 'calcularAhorroTC':
                    // Implementar lógica para calcular ahorro en tarjetas
                    mostrarMensaje('Calculando ahorro potencial en tus tarjetas de crédito...', 'info');
                    break;
                
                case 'aprenderFondoEmergencia':
                    // Mostrar información sobre fondos de emergencia
                    mostrarVentanaInformativa('Fondo de Emergencia', `
                        <h3>¿Qué es un fondo de emergencia?</h3>
                        <p>Un fondo de emergencia es dinero que ahorras específicamente para cubrir gastos inesperados o pérdidas de ingresos.</p>
                        
                        <h3>¿Por qué es importante?</h3>
                        <p>Te protege financieramente ante situaciones imprevistas como problemas médicos, reparaciones urgentes o pérdida de empleo, evitando que recurras a deudas con altos intereses.</p>
                        
                        <h3>¿Cuánto debería ahorrar?</h3>
                        <p>Los expertos financieros recomiendan tener entre 3 y 6 meses de gastos guardados en tu fondo de emergencia.</p>
                        
                        <h3>¿Dónde guardar este dinero?</h3>
                        <p>En una cuenta de ahorros o instrumento financiero que sea:</p>
                        <ul>
                            <li>Líquido (fácil acceso)</li>
                            <li>Seguro (sin riesgo de pérdida)</li>
                            <li>Que genere algo de interés para contrarrestar la inflación</li>
                        </ul>
                    `);
                    break;
                
                case 'abrirSimuladorHipotecario':
                    // Abrir simulador hipotecario
                    const hipotecarioBtn = document.querySelector('.btn-hipotecario');
                    if (hipotecarioBtn) {
                        hipotecarioBtn.click();
                    }
                    break;
                
                case 'abrirSimuladorInversiones':
                    // Abrir simulador de inversiones
                    const inversionBtn = document.querySelector('.btn-inversion');
                    if (inversionBtn) {
                        inversionBtn.click();
                    }
                    break;
            }
        }
        
        /**
         * Obtiene los datos financieros del usuario desde localStorage o del módulo de capacidad
         * @returns {Object|null} Objeto con datos financieros o null si no hay datos
         */
        function obtenerDatosFinancieros() {
            // Primero intentar obtener datos guardados en localStorage
            const datosGuardados = localStorage.getItem('datosFinancieros');
            
            if (datosGuardados) {
                try {
                    return JSON.parse(datosGuardados);
                } catch (e) {
                    console.error('Error al parsear datos financieros:', e);
                }
            }
            
            // Intentar obtener datos del formulario de capacidad, si existe
            try {
                const formularioCapacidad = document.getElementById('capacidad-modal');
                
                if (formularioCapacidad) {
                    const ingresoPrincipal = parseFloat(formularioCapacidad.querySelector('#ingreso-principal')?.value) || 0;
                    const ingresosAdicionales = parseFloat(formularioCapacidad.querySelector('#ingresos-adicionales')?.value) || 0;
                    const gastoVivienda = parseFloat(formularioCapacidad.querySelector('#gasto-vivienda')?.value) || 0;
                    const gastoServicios = parseFloat(formularioCapacidad.querySelector('#gasto-servicios')?.value) || 0;
                    const gastoAlimentacion = parseFloat(formularioCapacidad.querySelector('#gasto-alimentacion')?.value) || 0;
                    const gastoTransporte = parseFloat(formularioCapacidad.querySelector('#gasto-transporte')?.value) || 0;
                    const deudaTC = parseFloat(formularioCapacidad.querySelector('#deuda-tc')?.value) || 0;
                    const deudaPrestamos = parseFloat(formularioCapacidad.querySelector('#deuda-prestamos')?.value) || 0;
                    const deudaVehiculo = parseFloat(formularioCapacidad.querySelector('#deuda-vehiculo')?.value) || 0;
                    const otrasDeudas = parseFloat(formularioCapacidad.querySelector('#otras-deudas')?.value) || 0;
                    
                    // Verificar si hay suficientes datos para considerar válido
                    if (ingresoPrincipal > 0) {
                        const datos = {
                            ingresos: {
                                principal: ingresoPrincipal,
                                adicionales: ingresosAdicionales
                            },
                            gastos: {
                                vivienda: gastoVivienda,
                                servicios: gastoServicios,
                                alimentacion: gastoAlimentacion,
                                transporte: gastoTransporte
                            },
                            deudas: {
                                tc: deudaTC,
                                prestamos: deudaPrestamos,
                                vehiculo: deudaVehiculo,
                                otras: otrasDeudas
                            }
                        };
                        
                        // Guardar para uso futuro
                        localStorage.setItem('datosFinancieros', JSON.stringify(datos));
                        
                        return datos;
                    }
                }
            } catch (e) {
                console.error('Error al obtener datos del formulario de capacidad:', e);
            }
            
            // Si no hay datos guardados ni en el formulario, devolver null
            return null;
        }
        
        /**
         * Muestra una ventana informativa
         * @param {string} titulo - Título de la ventana
         * @param {string} contenido - Contenido HTML de la ventana
         */
        function mostrarVentanaInformativa(titulo, contenido) {
            // Crear modal
            const modal = document.createElement('div');
            modal.className = 'modal info-modal';
            
            modal.innerHTML = `
                <div class="modal-content info-content">
                    <span class="close-modal">&times;</span>
                    <h2>${titulo}</h2>
                    <div class="info-body">
                        ${contenido}
                    </div>
                    <div class="info-footer">
                        <button class="btn-entendido">Entendido</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Configurar eventos
            modal.querySelector('.close-modal').addEventListener('click', function() {
                modal.remove();
            });
            
            modal.querySelector('.btn-entendido').addEventListener('click', function() {
                modal.remove();
            });
            
            // Evitar que los clics dentro del modal lo cierren
            modal.querySelector('.modal-content').addEventListener('click', function(e) {
                e.stopPropagation();
            });
            
            // Cerrar modal al hacer clic fuera del contenido
            modal.addEventListener('click', function() {
                modal.remove();
            });
        }
        
        /**
         * Muestra un mensaje al usuario
         * @param {string} mensaje - Texto del mensaje
         * @param {string} tipo - Tipo de mensaje (success, error, info, warning)
         */
        function mostrarMensaje(mensaje, tipo) {
            if (typeof window.mostrarToast === 'function') {
                window.mostrarToast(mensaje, tipo);
            } else if (typeof window.mostrarMensaje === 'function') {
                window.mostrarMensaje(mensaje, tipo);
            } else {
                alert(mensaje);
            }
        }
        
        // Configurar Acciones Rápidas
        const quickLoanBtn = document.getElementById('quick-loan');
        if (quickLoanBtn) {
            quickLoanBtn.addEventListener('click', function() {
                // Cerrar modal del dashboard
                dashboardModal.classList.add('hidden');
                
                // Enfocar el formulario de préstamo principal
                const montoInput = document.getElementById('monto');
                if (montoInput) {
                    setTimeout(() => {
                        montoInput.focus();
                        montoInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 100);
                }
            });
        }
        
        const quickCapacityBtn = document.getElementById('quick-capacity');
        if (quickCapacityBtn) {
            quickCapacityBtn.addEventListener('click', function() {
                // Cerrar modal del dashboard
                dashboardModal.classList.add('hidden');
                
                // Abrir el modal de capacidad de endeudamiento
                const capacidadBtn = document.querySelector('.btn-capacidad');
                if (capacidadBtn) {
                    capacidadBtn.click();
                }
            });
        }
        
        const quickCompareBtn = document.getElementById('quick-compare');
        if (quickCompareBtn) {
            quickCompareBtn.addEventListener('click', function() {
                // Cerrar modal del dashboard
                dashboardModal.classList.add('hidden');
                
                // Abrir el comparador de tasas
                const comparadorBtn = document.querySelector('.btn-comparador');
                if (comparadorBtn) {
                    comparadorBtn.click();
                }
            });
        }
        
        const quickInvestBtn = document.getElementById('quick-invest');
        if (quickInvestBtn) {
            quickInvestBtn.addEventListener('click', function() {
                // Cerrar modal del dashboard
                dashboardModal.classList.add('hidden');
                
                // Abrir el simulador de inversiones
                const inversionBtn = document.querySelector('.btn-inversion');
                if (inversionBtn) {
                    inversionBtn.click();
                }
            });
        }
    });
})();
