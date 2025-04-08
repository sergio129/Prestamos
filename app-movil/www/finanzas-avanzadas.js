/**
 * Módulo de finanzas avanzadas - Herramientas financieras de última generación
 * Incluye: análisis de préstamos, optimización financiera, proyecciones, y simulaciones complejas
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log("Inicializando módulo de finanzas avanzadas...");
    
    // Crear botón para herramientas financieras avanzadas
    const finanzasBtn = document.createElement('button');
    finanzasBtn.type = 'button';
    finanzasBtn.className = 'btn btn-finance';
    finanzasBtn.innerHTML = '<i class="fas fa-chart-line"></i> Herramientas financieras';
    finanzasBtn.style.marginTop = '15px';
    finanzasBtn.style.background = 'linear-gradient(to right, #6352c2, #4a1e9e)';
    
    // Añadir botón después del formulario principal
    const loanForm = document.getElementById('loan-form');
    if (loanForm && loanForm.parentNode) {
        loanForm.parentNode.appendChild(finanzasBtn);
    }
    
    // Crear contenedor para el dashboard financiero
    const dashboardContainer = document.createElement('div');
    dashboardContainer.id = 'finance-dashboard';
    dashboardContainer.className = 'finance-dashboard hidden';
    
    dashboardContainer.innerHTML = `
        <div class="dashboard-header">
            <h2>Dashboard Financiero</h2>
            <button class="close-dashboard"><i class="fas fa-times"></i></button>
        </div>
        
        <div class="dashboard-tabs">
            <div class="dashboard-tab active" data-tab="analysis">Análisis</div>
            <div class="dashboard-tab" data-tab="projection">Proyección</div>
            <div class="dashboard-tab" data-tab="optimization">Optimización</div>
            <div class="dashboard-tab" data-tab="scenarios">Escenarios</div>
        </div>
        
        <div class="dashboard-content">
            <!-- Pestaña de Análisis -->
            <div class="dashboard-pane active" id="analysis-pane">
                <div class="analysis-header">
                    <h3>Análisis financiero del préstamo</h3>
                    <p>Comprenda el impacto de su préstamo en su economía personal</p>
                </div>
                
                <div class="analysis-grid">
                    <div class="analysis-card">
                        <div class="card-header">
                            <i class="fas fa-percentage"></i>
                            <h4>Carga financiera</h4>
                        </div>
                        <div class="card-content">
                            <div class="input-group">
                                <label for="ingreso-mensual">Ingreso mensual (COP):</label>
                                <div class="input-icon">
                                    <span class="currency-symbol">$</span>
                                    <input type="number" id="ingreso-mensual" placeholder="0">
                                </div>
                            </div>
                            <button class="btn btn-sm" id="calcular-carga">Calcular</button>
                            <div class="result-display hidden" id="resultado-carga">
                                <div class="percentage-indicator">
                                    <div class="percentage-bar">
                                        <div class="percentage-value" style="width:0%"></div>
                                    </div>
                                    <span class="percentage-text">0%</span>
                                </div>
                                <div class="percentage-message">Carga financiera saludable</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-card">
                        <div class="card-header">
                            <i class="fas fa-money-bill-wave"></i>
                            <h4>Ahorro potencial</h4>
                        </div>
                        <div class="card-content">
                            <div class="savings-options">
                                <div class="option">
                                    <input type="radio" name="savings-option" id="savings-extra" checked>
                                    <label for="savings-extra">Pagos extra</label>
                                </div>
                                <div class="option">
                                    <input type="radio" name="savings-option" id="savings-refinance">
                                    <label for="savings-refinance">Refinanciamiento</label>
                                </div>
                            </div>
                            <div class="input-group" id="extra-payment-group">
                                <label for="pago-extra">Pago extra mensual:</label>
                                <div class="input-icon">
                                    <span class="currency-symbol">$</span>
                                    <input type="number" id="pago-extra" placeholder="0">
                                </div>
                            </div>
                            <div class="input-group hidden" id="refinance-group">
                                <label for="tasa-refinanciamiento">Nueva tasa de interés (%):</label>
                                <input type="number" id="tasa-refinanciamiento" placeholder="0.00" step="0.01">
                            </div>
                            <button class="btn btn-sm" id="calcular-ahorro">Calcular ahorro</button>
                            <div class="result-display hidden" id="resultado-ahorro">
                                <div class="saving-result">
                                    <div class="saving-amount">$0</div>
                                    <div class="saving-detail">
                                        <span class="time-saved">0 meses menos</span>
                                        <span class="interest-saved">0% menos en intereses</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-card wide">
                        <div class="card-header">
                            <i class="fas fa-calendar-alt"></i>
                            <h4>Análisis temporal</h4>
                        </div>
                        <div class="card-content">
                            <div class="timeline-chart-container">
                                <canvas id="timeline-chart"></canvas>
                            </div>
                            <div class="timeline-legend">
                                <div class="legend-item">
                                    <span class="color-dot principal"></span>
                                    <span>Capital pagado</span>
                                </div>
                                <div class="legend-item">
                                    <span class="color-dot interest"></span>
                                    <span>Intereses pagados</span>
                                </div>
                                <div class="legend-item">
                                    <span class="color-dot balance"></span>
                                    <span>Saldo pendiente</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Pestaña de Proyección -->
            <div class="dashboard-pane" id="projection-pane">
                <div class="projection-header">
                    <h3>Proyección financiera personalizada</h3>
                    <p>Visualice cómo este préstamo afectará su situación financiera futura</p>
                </div>
                
                <div class="projection-settings">
                    <div class="setting-group">
                        <h4>Ingresos</h4>
                        <div class="input-group">
                            <label for="ingreso-actual">Ingreso mensual actual:</label>
                            <div class="input-icon">
                                <span class="currency-symbol">$</span>
                                <input type="number" id="ingreso-actual" placeholder="0">
                            </div>
                        </div>
                        <div class="input-group">
                            <label for="crecimiento-ingresos">Crecimiento anual estimado (%):</label>
                            <input type="number" id="crecimiento-ingresos" placeholder="0.0" step="0.1" value="3.0">
                        </div>
                    </div>
                    
                    <div class="setting-group">
                        <h4>Gastos</h4>
                        <div class="input-group">
                            <label for="gastos-actuales">Gastos mensuales (sin préstamo):</label>
                            <div class="input-icon">
                                <span class="currency-symbol">$</span>
                                <input type="number" id="gastos-actuales" placeholder="0">
                            </div>
                        </div>
                        <div class="input-group">
                            <label for="inflacion-estimada">Inflación estimada (%):</label>
                            <input type="number" id="inflacion-estimada" placeholder="0.0" step="0.1" value="4.0">
                        </div>
                    </div>
                    
                    <div class="setting-group">
                        <h4>Ahorros e inversiones</h4>
                        <div class="input-group">
                            <label for="ahorro-mensual">Ahorro mensual objetivo (%):</label>
                            <input type="number" id="ahorro-mensual" placeholder="0" value="10">
                        </div>
                        <div class="input-group">
                            <label for="rendimiento-inversiones">Rendimiento inversiones (%):</label>
                            <input type="number" id="rendimiento-inversiones" placeholder="0.0" step="0.1" value="5.0">
                        </div>
                    </div>
                </div>
                
                <button class="btn" id="generar-proyeccion">Generar proyección</button>
                
                <div class="projection-results hidden">
                    <div class="projection-chart-container">
                        <canvas id="projection-chart"></canvas>
                    </div>
                    
                    <div class="projection-summary">
                        <div class="summary-card">
                            <h5>Balance al finalizar el préstamo</h5>
                            <div class="summary-value" id="balance-final">$0</div>
                        </div>
                        <div class="summary-card">
                            <h5>Capacidad de ahorro promedio</h5>
                            <div class="summary-value" id="ahorro-promedio">$0</div>
                        </div>
                        <div class="summary-card">
                            <h5>Patrimonio proyectado</h5>
                            <div class="summary-value" id="patrimonio-proyectado">$0</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Pestaña de Optimización -->
            <div class="dashboard-pane" id="optimization-pane">
                <div class="optimization-header">
                    <h3>Optimización de préstamo</h3>
                    <p>Encuentre la estructura óptima para su préstamo según sus necesidades</p>
                </div>
                
                <div class="optimization-settings">
                    <div class="setting-column">
                        <h4>Prioridad de optimización</h4>
                        <div class="priority-slider">
                            <span>Cuota mensual baja</span>
                            <input type="range" id="optimization-priority" min="0" max="100" value="50">
                            <span>Menos intereses totales</span>
                        </div>
                        <div class="priority-value">Equilibrado</div>
                    </div>
                    
                    <div class="setting-column">
                        <h4>Restricciones</h4>
                        <div class="input-group">
                            <label for="cuota-maxima">Cuota mensual máxima:</label>
                            <div class="input-icon">
                                <span class="currency-symbol">$</span>
                                <input type="number" id="cuota-maxima" placeholder="Sin límite">
                            </div>
                        </div>
                        <div class="input-group">
                            <label for="plazo-maximo">Plazo máximo (meses):</label>
                            <input type="number" id="plazo-maximo" placeholder="Sin límite" value="60">
                        </div>
                    </div>
                </div>
                
                <button class="btn" id="optimizar-prestamo">Optimizar préstamo</button>
                
                <div class="optimization-results hidden">
                    <h4>Recomendaciones de optimización</h4>
                    
                    <div class="options-grid">
                        <div class="option-card recommended">
                            <div class="option-badge">Recomendado</div>
                            <h5>Equilibrado</h5>
                            <ul class="option-details">
                                <li>Monto: <span id="opt-monto-1">$0</span></li>
                                <li>Plazo: <span id="opt-plazo-1">0 meses</span></li>
                                <li>Interés: <span id="opt-interes-1">0%</span></li>
                                <li>Cuota: <span id="opt-cuota-1">$0</span></li>
                                <li>Total intereses: <span id="opt-total-1">$0</span></li>
                            </ul>
                            <button class="btn btn-sm apply-option" data-option="1">Aplicar</button>
                        </div>
                        
                        <div class="option-card">
                            <h5>Cuota mínima</h5>
                            <ul class="option-details">
                                <li>Monto: <span id="opt-monto-2">$0</span></li>
                                <li>Plazo: <span id="opt-plazo-2">0 meses</span></li>
                                <li>Interés: <span id="opt-interes-2">0%</span></li>
                                <li>Cuota: <span id="opt-cuota-2">$0</span></li>
                                <li>Total intereses: <span id="opt-total-2">$0</span></li>
                            </ul>
                            <button class="btn btn-sm apply-option" data-option="2">Aplicar</button>
                        </div>
                        
                        <div class="option-card">
                            <h5>Menos intereses</h5>
                            <ul class="option-details">
                                <li>Monto: <span id="opt-monto-3">$0</span></li>
                                <li>Plazo: <span id="opt-plazo-3">0 meses</span></li>
                                <li>Interés: <span id="opt-interes-3">0%</span></li>
                                <li>Cuota: <span id="opt-cuota-3">$0</span></li>
                                <li>Total intereses: <span id="opt-total-3">$0</span></li>
                            </ul>
                            <button class="btn btn-sm apply-option" data-option="3">Aplicar</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Pestaña de Escenarios -->
            <div class="dashboard-pane" id="scenarios-pane">
                <div class="scenarios-header">
                    <h3>Análisis de escenarios</h3>
                    <p>Simule diferentes escenarios económicos y su impacto en el préstamo</p>
                </div>
                
                <div class="scenarios-types">
                    <h4>Tipo de escenario a analizar</h4>
                    <div class="scenario-selector">
                        <div class="scenario-option active" data-scenario="rates">
                            <i class="fas fa-percentage"></i>
                            <span>Variación de tasas</span>
                        </div>
                        <div class="scenario-option" data-scenario="income">
                            <i class="fas fa-wallet"></i>
                            <span>Cambio de ingresos</span>
                        </div>
                        <div class="scenario-option" data-scenario="inflation">
                            <i class="fas fa-chart-line"></i>
                            <span>Inflación</span>
                        </div>
                        <div class="scenario-option" data-scenario="stress">
                            <i class="fas fa-exclamation-triangle"></i>
                            <span>Prueba de estrés</span>
                        </div>
                    </div>
                </div>
                
                <!-- Contenedor para configuraciones específicas de escenarios -->
                <div class="scenario-settings">
                    <!-- Escenario: Variación de tasas -->
                    <div class="scenario-config active" id="rates-config">
                        <div class="input-group">
                            <label for="tasa-optimista">Escenario optimista (% de reducción):</label>
                            <input type="number" id="tasa-optimista" value="0.5" step="0.1" min="0">
                        </div>
                        <div class="input-group">
                            <label for="tasa-pesimista">Escenario pesimista (% de aumento):</label>
                            <input type="number" id="tasa-pesimista" value="1.0" step="0.1" min="0">
                        </div>
                        <div class="input-group">
                            <label for="probabilidad-cambio">Probabilidad de cambio (%):</label>
                            <input type="number" id="probabilidad-cambio" value="40" min="0" max="100">
                        </div>
                        <p class="scenario-note">
                            <i class="fas fa-info-circle"></i> Esta simulación proyecta cómo afectaría un cambio en las tasas de interés durante la vida del préstamo.
                        </p>
                    </div>
                    
                    <!-- Escenario: Cambio de ingresos -->
                    <div class="scenario-config" id="income-config">
                        <div class="input-group">
                            <label for="ingreso-aumento">Posible aumento de ingresos (%):</label>
                            <input type="number" id="ingreso-aumento" value="10" min="0">
                        </div>
                        <div class="input-group">
                            <label for="ingreso-reduccion">Posible reducción de ingresos (%):</label>
                            <input type="number" id="ingreso-reduccion" value="15" min="0">
                        </div>
                        <div class="input-group">
                            <label for="mes-cambio">Mes estimado del cambio:</label>
                            <input type="number" id="mes-cambio" value="12" min="1">
                        </div>
                        <p class="scenario-note">
                            <i class="fas fa-info-circle"></i> Proyecta el impacto de cambios en tus ingresos mensuales y cómo afectaría tu capacidad de pago.
                        </p>
                    </div>
                    
                    <!-- Escenario: Inflación -->
                    <div class="scenario-config" id="inflation-config">
                        <div class="input-group">
                            <label for="inflacion-base">Inflación base anual (%):</label>
                            <input type="number" id="inflacion-base" value="4.0" step="0.1" min="0">
                        </div>
                        <div class="input-group">
                            <label for="inflacion-alta">Inflación alta anual (%):</label>
                            <input type="number" id="inflacion-alta" value="7.0" step="0.1" min="0">
                        </div>
                        <div class="input-group">
                            <label for="ajuste-ingresos">Ajuste anual de ingresos (%):</label>
                            <input type="number" id="ajuste-ingresos" value="3.0" step="0.1" min="0">
                        </div>
                        <p class="scenario-note">
                            <i class="fas fa-info-circle"></i> Evalúa cómo diferentes niveles de inflación afectan el valor real de tu cuota mensual y tu poder adquisitivo.
                        </p>
                    </div>
                    
                    <!-- Escenario: Prueba de estrés -->
                    <div class="scenario-config" id="stress-config">
                        <div class="checkbox-group">
                            <label>
                                <input type="checkbox" id="stress-tasa" checked> Aumento drástico de tasas (+3%)
                            </label>
                        </div>
                        <div class="checkbox-group">
                            <label>
                                <input type="checkbox" id="stress-ingresos" checked> Reducción de ingresos (-25%)
                            </label>
                        </div>
                        <div class="checkbox-group">
                            <label>
                                <input type="checkbox" id="stress-inflacion" checked> Inflación acelerada (8% anual)
                            </label>
                        </div>
                        <div class="input-group">
                            <label for="duracion-estres">Duración del período de estrés (meses):</label>
                            <input type="number" id="duracion-estres" value="6" min="1">
                        </div>
                        <p class="scenario-note warning">
                            <i class="fas fa-exclamation-triangle"></i> La prueba de estrés simula condiciones económicas adversas para evaluar la resistencia de su plan financiero.
                        </p>
                    </div>
                </div>
                
                <button class="btn" id="simular-escenario">Simular escenario</button>
                
                <div class="scenario-results hidden">
                    <div class="scenario-chart-container">
                        <canvas id="scenario-chart"></canvas>
                    </div>
                    
                    <div class="scenario-conclusions">
                        <h4>Conclusiones del análisis</h4>
                        <div class="conclusion-card">
                            <div class="conclusion-indicator safe">
                                <i class="fas fa-check-circle"></i>
                                <span id="escenario-estado">Seguro</span>
                            </div>
                            <p id="escenario-conclusion">El préstamo puede mantenerse estable en los escenarios analizados.</p>
                        </div>
                        
                        <div class="metrics-grid">
                            <div class="metric">
                                <div class="metric-label">Impacto en cuota</div>
                                <div class="metric-value" id="impacto-cuota">0%</div>
                            </div>
                            <div class="metric">
                                <div class="metric-label">Probabilidad de dificultad</div>
                                <div class="metric-value" id="prob-dificultad">Baja</div>
                            </div>
                            <div class="metric">
                                <div class="metric-label">Fondo de emergencia recomendado</div>
                                <div class="metric-value" id="fondo-emergencia">$0</div>
                            </div>
                        </div>
                        
                        <div class="recomendaciones">
                            <h5>Recomendaciones</h5>
                            <ul id="escenario-recomendaciones">
                                <li>Mantener un seguimiento regular de las tasas de interés</li>
                                <li>Considerar un fondo de emergencia para imprevistos</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Añadir dashboard al DOM
    document.body.appendChild(dashboardContainer);
    
    // Mostrar/ocultar dashboard
    finanzasBtn.addEventListener('click', function() {
        dashboardContainer.classList.remove('hidden');
        
        // Iniciar la carga de datos
        cargarDatosFinancieros();
    });
    
    // Cerrar dashboard
    const closeBtn = document.querySelector('.close-dashboard');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            dashboardContainer.classList.add('hidden');
        });
    }
    
    // Cambio de pestañas en el dashboard
    const dashboardTabs = document.querySelectorAll('.dashboard-tab');
    const dashboardPanes = document.querySelectorAll('.dashboard-pane');
    
    dashboardTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Quitar clase active de todas las pestañas y paneles
            dashboardTabs.forEach(t => t.classList.remove('active'));
            dashboardPanes.forEach(p => p.classList.remove('active'));
            
            // Añadir clase active a la pestaña seleccionada
            this.classList.add('active');
            
            // Mostrar panel correspondiente
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-pane`).classList.add('active');
        });
    });
    
    // Cambio entre opciones de escenarios
    const scenarioOptions = document.querySelectorAll('.scenario-option');
    const scenarioConfigs = document.querySelectorAll('.scenario-config');
    
    scenarioOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Quitar clase active de todas las opciones y configuraciones
            scenarioOptions.forEach(o => o.classList.remove('active'));
            scenarioConfigs.forEach(c => c.classList.remove('active'));
            
            // Añadir clase active a la opción seleccionada
            this.classList.add('active');
            
            // Mostrar configuración correspondiente
            const scenarioId = this.getAttribute('data-scenario');
            document.getElementById(`${scenarioId}-config`).classList.add('active');
        });
    });
    
    // Eventos para opciones de ahorro (análisis)
    const savingsOptions = document.querySelectorAll('input[name="savings-option"]');
    const extraPaymentGroup = document.getElementById('extra-payment-group');
    const refinanceGroup = document.getElementById('refinance-group');
    
    savingsOptions.forEach(option => {
        option.addEventListener('change', function() {
            if (this.id === 'savings-extra') {
                extraPaymentGroup.classList.remove('hidden');
                refinanceGroup.classList.add('hidden');
            } else {
                extraPaymentGroup.classList.add('hidden');
                refinanceGroup.classList.remove('hidden');
            }
        });
    });
    
    // Evento para calcular carga financiera
    const calcularCargaBtn = document.getElementById('calcular-carga');
    if (calcularCargaBtn) {
        calcularCargaBtn.addEventListener('click', function() {
            const ingresoMensual = parseFloat(document.getElementById('ingreso-mensual').value || 0);
            if (ingresoMensual <= 0) {
                mostrarToast("Por favor ingrese un ingreso mensual válido", "error");
                return;
            }
            
            // Obtener cuota mensual actual
            const cuotaMensualEl = document.getElementById('cuota-mensual');
            const cuotaMensual = cuotaMensualEl ? 
                extraerNumero(cuotaMensualEl.textContent) : 0;
            
            // Calcular porcentaje de carga
            const porcentajeCarga = (cuotaMensual / ingresoMensual) * 100;
            
            // Actualizar UI
            const resultadoCarga = document.getElementById('resultado-carga');
            const percentageBar = resultadoCarga.querySelector('.percentage-value');
            const percentageText = resultadoCarga.querySelector('.percentage-text');
            const percentageMessage = resultadoCarga.querySelector('.percentage-message');
            
            percentageBar.style.width = Math.min(porcentajeCarga, 100) + '%';
            percentageText.textContent = porcentajeCarga.toFixed(1) + '%';
            
            // Color de la barra según nivel de carga
            if (porcentajeCarga <= 20) {
                percentageBar.style.backgroundColor = '#27ae60'; // Verde
                percentageMessage.textContent = 'Carga financiera saludable';
            } else if (porcentajeCarga <= 35) {
                percentageBar.style.backgroundColor = '#f39c12'; // Naranja
                percentageMessage.textContent = 'Carga financiera moderada';
            } else {
                percentageBar.style.backgroundColor = '#e74c3c'; // Rojo
                percentageMessage.textContent = 'Carga financiera elevada';
            }
            
            resultadoCarga.classList.remove('hidden');
        });
    }
    
    // Evento para calcular ahorro en préstamo
    const calcularAhorroBtn = document.getElementById('calcular-ahorro');
    if (calcularAhorroBtn) {
        calcularAhorroBtn.addEventListener('click', function() {
            // Obtener datos del préstamo
            const datosPrestamo = obtenerDatosPrestamo();
            if (!datosPrestamo.monto || !datosPrestamo.plazo || !datosPrestamo.interesMensual) {
                mostrarToast("Primero debe calcular un préstamo", "warning");
                return;
            }
            
            // Si es pago extra
            const extraPaymentOption = document.getElementById('savings-extra');
            if (extraPaymentOption && extraPaymentOption.checked) {
                const pagoExtra = parseFloat(document.getElementById('pago-extra').value || 0);
                if (pagoExtra <= 0) {
                    mostrarToast("Ingrese un valor válido para el pago extra", "warning");
                    return;
                }
                
                // Calcular ahorro con pagos extra
                const resultado = calcularAhorroConPagosExtra(
                    datosPrestamo.monto,
                    datosPrestamo.interesMensual / 100,
                    datosPrestamo.plazo,
                    datosPrestamo.cuotaMensual,
                    pagoExtra
                );
                
                // Mostrar resultados
                mostrarResultadoAhorro(resultado);
                
            } else { // Refinanciación
                const nuevaTasa = parseFloat(document.getElementById('tasa-refinanciamiento').value || 0);
                if (nuevaTasa <= 0) {
                    mostrarToast("Ingrese una tasa de interés válida", "warning");
                    return;
                }
                
                // Calcular ahorro con refinanciación
                const resultado = calcularAhorroConRefinanciacion(
                    datosPrestamo.monto,
                    datosPrestamo.interesMensual,
                    nuevaTasa,
                    datosPrestamo.plazo,
                    datosPrestamo.totalIntereses
                );
                
                // Mostrar resultados
                mostrarResultadoAhorro(resultado);
            }
        });
    }
    
    // Calcular ahorro con pagos extra
    function calcularAhorroConPagosExtra(monto, tasaMensual, plazo, cuotaRegular, pagoExtra) {
        let plazoOriginal = plazo;
        let interesOriginal = 0;
        let saldo = monto;
        
        // Calcular interés original
        for (let i = 0; i < plazoOriginal; i++) {
            const interesMes = saldo * tasaMensual;
            interesOriginal += interesMes;
            const capital = cuotaRegular - interesMes;
            saldo -= capital;
        }
        
        // Resetear para cálculo con pagos extra
        saldo = monto;
        let nuevoPlazo = 0;
        let nuevoInteres = 0;
        
        // Simular nuevo plazo con pagos extra
        while (saldo > 0 && nuevoPlazo < plazoOriginal) {
            const interesMes = saldo * tasaMensual;
            nuevoInteres += interesMes;
            
            // Pago total: cuota regular + extra
            const pagoTotal = cuotaRegular + pagoExtra;
            const capital = pagoTotal - interesMes;
            
            saldo -= capital;
            nuevoPlazo++;
            
            // Evitar errores de redondeo
            if (saldo < 1) saldo = 0;
        }
        
        // Calcular ahorro
        const mesesAhorrados = plazoOriginal - nuevoPlazo;
        const interesAhorrado = interesOriginal - nuevoInteres;
        const porcentajeAhorro = (interesAhorrado / interesOriginal) * 100;
        
        return {
            mesesAhorrados,
            interesAhorrado,
            porcentajeAhorro
        };
    }
    
    // Calcular ahorro con refinanciación
    function calcularAhorroConRefinanciacion(monto, tasaOriginal, nuevaTasa, plazo, interesOriginal) {
        // Convertir a decimales
        const tasaOriginalDecimal = tasaOriginal / 100;
        const nuevaTasaDecimal = nuevaTasa / 100;
        
        // Calcular nueva cuota
        const nuevaCuota = monto * (nuevaTasaDecimal / (1 - Math.pow(1 + nuevaTasaDecimal, -plazo)));
        
        // Calcular nuevo interés total
        const nuevoInteres = (nuevaCuota * plazo) - monto;
        
        // Calcular ahorro
        const interesAhorrado = interesOriginal - nuevoInteres;
        const porcentajeAhorro = (interesAhorrado / interesOriginal) * 100;
        
        return {
            mesesAhorrados: 0, // El plazo se mantiene
            interesAhorrado,
            porcentajeAhorro
        };
    }
    
    // Mostrar resultado de ahorro
    function mostrarResultadoAhorro(resultado) {
        const resultadoAhorro = document.getElementById('resultado-ahorro');
        const savingAmount = resultadoAhorro.querySelector('.saving-amount');
        const timeSaved = resultadoAhorro.querySelector('.time-saved');
        const interestSaved = resultadoAhorro.querySelector('.interest-saved');
        
        // Formatear moneda
        const formatoMoneda = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        });
        
        savingAmount.textContent = formatoMoneda.format(resultado.interesAhorrado);
        timeSaved.textContent = `${resultado.mesesAhorrados} meses menos`;
        interestSaved.textContent = `${resultado.porcentajeAhorro.toFixed(1)}% menos en intereses`;
        
        resultadoAhorro.classList.remove('hidden');
    }
    
    // Función para cargar datos financieros iniciales
    function cargarDatosFinancieros() {
        // Obtener datos del préstamo actual
        const datosPrestamo = obtenerDatosPrestamo();
        
        // Inicializar gráfico de línea temporal si hay datos
        if (datosPrestamo.monto && datosPrestamo.plazo && datosPrestamo.interesMensual) {
            inicializarGraficoTemporal(datosPrestamo);
        }
    }
    
    // Inicializar gráfico de línea temporal
    function inicializarGraficoTemporal(datos) {
        const ctx = document.getElementById('timeline-chart').getContext('2d');
        
        // Generar datos para el gráfico
        const meses = Array.from({length: datos.plazo}, (_, i) => i + 1);
        const datosAmortizacion = generarDatosAmortizacion(
            datos.monto,
            datos.interesMensual / 100,
            datos.plazo,
            datos.cuotaMensual
        );
        
        // Crear gráfico
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: meses,
                datasets: [
                    {
                        label: 'Capital pagado',
                        data: datosAmortizacion.capitalPagado,
                        borderColor: '#6e8efb',
                        backgroundColor: 'rgba(110, 142, 251, 0.1)',
                        fill: true,
                        tension: 0.1
                    },
                    {
                        label: 'Intereses pagados',
                        data: datosAmortizacion.interesPagado,
                        borderColor: '#a777e3',
                        backgroundColor: 'rgba(167, 119, 227, 0.1)',
                        fill: true,
                        tension: 0.1
                    },
                    {
                        label: 'Saldo pendiente',
                        data: datosAmortizacion.saldoPendiente,
                        borderColor: '#e74c3c',
                        backgroundColor: 'rgba(231, 76, 60, 0.1)',
                        fill: true,
                        tension: 0.1
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                const formatoMoneda = new Intl.NumberFormat('es-CO', {
                                    style: 'currency',
                                    currency: 'COP',
                                    minimumFractionDigits: 0
                                });
                                
                                return context.dataset.label + ': ' + formatoMoneda.format(context.raw);
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Mes'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Monto (COP)'
                        },
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString('es-CO');
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Generar datos para amortización
    function generarDatosAmortizacion(monto, tasaMensual, plazo, cuotaMensual) {
        const capitalPagado = [];
        const interesPagado = [];
        const saldoPendiente = [];
        
        let saldo = monto;
        let capitalAcumulado = 0;
        let interesAcumulado = 0;
        
        for (let i = 0; i < plazo; i++) {
            const interesMes = saldo * tasaMensual;
            const capitalMes = cuotaMensual - interesMes;
            
            saldo -= capitalMes;
            saldo = Math.max(0, saldo); // Evitar errores de redondeo
            
            capitalAcumulado += capitalMes;
            interesAcumulado += interesMes;
            
            capitalPagado.push(capitalAcumulado);
            interesPagado.push(interesAcumulado);
            saldoPendiente.push(saldo);
        }
        
        return {
            capitalPagado,
            interesPagado,
            saldoPendiente
        };
    }
    
    // Obtener datos del préstamo actual
    function obtenerDatosPrestamo() {
        // Datos básicos
        const monto = parseFloat(document.getElementById('monto')?.value || 0);
        const plazo = parseInt(document.getElementById('plazo')?.value || 0);
        const interesMensual = parseFloat(document.getElementById('interes-mensual')?.value || 0);
        
        // Resultados
        const cuotaMensualEl = document.getElementById('cuota-mensual');
        const totalPagarEl = document.getElementById('total-pagar');
        const totalInteresesEl = document.getElementById('total-intereses');
        
        const cuotaMensual = extraerNumero(cuotaMensualEl?.textContent || "0");
        const totalPagar = extraerNumero(totalPagarEl?.textContent || "0");
        const totalIntereses = extraerNumero(totalInteresesEl?.textContent || "0");
        
        return {
            monto,
            plazo,
            interesMensual,
            cuotaMensual,
            totalPagar,
            totalIntereses
        };
    }
    
    // Función para mostrar mensajes tipo toast
    function mostrarToast(mensaje, tipo = "info") {
        // Verificar si existe la función en la ventana global
        if (typeof window.mostrarToast === 'function') {
            window.mostrarToast(mensaje, tipo);
            return;
        }
        
        // Implementación de respaldo por si no existe la función global
        // Crear elemento toast si no existe
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
            
            // Añadir estilos básicos si no están definidos
            if (!document.getElementById('toast-styles')) {
                const style = document.createElement('style');
                style.id = 'toast-styles';
                style.textContent = `
                    .toast-container {
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        z-index: 10000;
                    }
                    .toast {
                        min-width: 250px;
                        margin-bottom: 10px;
                        padding: 15px;
                        border-radius: 4px;
                        color: white;
                        font-size: 14px;
                        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                        animation: fadeIn 0.3s, fadeOut 0.5s 2.5s forwards;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .toast.info { background-color: #3498db; }
                    .toast.success { background-color: #2ecc71; }
                    .toast.warning { background-color: #f39c12; }
                    .toast.error { background-color: #e74c3c; }
                    .toast-close {
                        background: none;
                        border: none;
                        color: white;
                        cursor: pointer;
                        font-size: 16px;
                        margin-left: 10px;
                        opacity: 0.7;
                    }
                    .toast-close:hover { opacity: 1; }
                    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                    @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
                `;
                document.head.appendChild(style);
            }
        }
        
        // Crear elemento toast
        const toast = document.createElement('div');
        toast.className = `toast ${tipo}`;
        
        // Contenido del toast
        const content = document.createElement('span');
        content.textContent = mensaje;
        toast.appendChild(content);
        
        // Botón de cierre
        const closeBtn = document.createElement('button');
        closeBtn.className = 'toast-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', () => toastContainer.removeChild(toast));
        toast.appendChild(closeBtn);
        
        // Añadir al contenedor
        toastContainer.appendChild(toast);
        
        // Eliminar automáticamente después de 3 segundos
        setTimeout(() => {
            if (toast.parentNode === toastContainer) {
                toastContainer.removeChild(toast);
            }
        }, 3000);
    }
    
    // Función para extraer número desde texto con formato de moneda
    function extraerNumero(texto) {
        if (!texto) return 0;
        
        // Eliminar todo lo que no sea dígito, punto o coma
        const numeroLimpio = texto.replace(/[^0-9.,]/g, '')
            .replace(/\./g, '')  // quitar puntos de miles
            .replace(',', '.');  // convertir coma decimal a punto
            
        return parseFloat(numeroLimpio) || 0;
    }
    
    // Completar implementación de los demás módulos (proyección, optimización, escenarios)
    // cuando se necesiten

    // Inicializar eventos y funcionalidades para la pestaña de Proyección
    const generarProyeccionBtn = document.getElementById('generar-proyeccion');
    if (generarProyeccionBtn) {
        generarProyeccionBtn.addEventListener('click', function() {
            // Verificar datos del préstamo
            const datosPrestamo = obtenerDatosPrestamo();
            if (!datosPrestamo.monto || !datosPrestamo.plazo || !datosPrestamo.interesMensual) {
                mostrarToast("Primero debe calcular un préstamo", "warning");
                return;
            }
            
            // Obtener datos de proyección
            const ingresoActual = parseFloat(document.getElementById('ingreso-actual').value || 0);
            const crecimientoIngresos = parseFloat(document.getElementById('crecimiento-ingresos').value || 0);
            const gastosActuales = parseFloat(document.getElementById('gastos-actuales').value || 0);
            const inflacionEstimada = parseFloat(document.getElementById('inflacion-estimada').value || 0);
            const ahorroMensual = parseFloat(document.getElementById('ahorro-mensual').value || 0);
            const rendimientoInversiones = parseFloat(document.getElementById('rendimiento-inversiones').value || 0);
            
            // Validar datos
            if (ingresoActual <= 0) {
                mostrarToast("Ingrese un valor válido para el ingreso mensual", "warning");
                return;
            }
            
            // Proyectar datos financieros
            const proyeccion = proyectarDatosFinancieros(
                datosPrestamo,
                ingresoActual,
                crecimientoIngresos / 100,
                gastosActuales,
                inflacionEstimada / 100,
                ahorroMensual / 100,
                rendimientoInversiones / 100
            );
            
            // Mostrar resultados
            mostrarResultadosProyeccion(proyeccion);
            
            // Mostrar contenedor de resultados
            document.querySelector('.projection-results').classList.remove('hidden');
        });
    }
    
    // Función para proyectar datos financieros
    function proyectarDatosFinancieros(prestamo, ingresoInicial, tasaCrecimiento, 
        gastosIniciales, tasaInflacion, porcentajeAhorro, rendimientoInversiones) {
        
        const meses = prestamo.plazo;
        const cuotaMensual = prestamo.cuotaMensual;
        
        let ingresos = [];
        let gastos = [];
        let cuotas = [];
        let ahorros = [];
        let inversiones = 0;
        let patrimonioTotal = 0;
        
        // Tasas mensuales equivalentes
        const crecimientoMensual = Math.pow(1 + tasaCrecimiento, 1/12) - 1;
        const inflacionMensual = Math.pow(1 + tasaInflacion, 1/12) - 1;
        const rendimientoMensual = Math.pow(1 + rendimientoInversiones, 1/12) - 1;
        
        let ingresoActual = ingresoInicial;
        let gastosActuales = gastosIniciales;
        let ahorroAcumulado = 0;
        
        for (let i = 0; i < meses; i++) {
            // Actualizar valores con la inflación y crecimiento
            if (i > 0) {
                ingresoActual *= (1 + crecimientoMensual);
                gastosActuales *= (1 + inflacionMensual);
            }
            
            // Calcular capacidad de ahorro (después de cuota y gastos)
            const capacidadAhorro = Math.max(0, ingresoActual - gastosActuales - cuotaMensual);
            const ahorroMes = capacidadAhorro * porcentajeAhorro;
            
            // Actualizar inversiones con rendimiento
            inversiones *= (1 + rendimientoMensual);
            inversiones += ahorroMes;
            
            // Guardar datos para el mes
            ingresos.push(ingresoActual);
            gastos.push(gastosActuales);
            cuotas.push(cuotaMensual);
            ahorros.push(ahorroMes);
            
            // Acumular ahorro (solo para mostrar)
            ahorroAcumulado += ahorroMes;
        }
        
        // Calcular valores finales
        const ingresoPromedio = ingresos.reduce((a, b) => a + b, 0) / meses;
        const gastoPromedio = gastos.reduce((a, b) => a + b, 0) / meses;
        const ahorroPromedio = ahorros.reduce((a, b) => a + b, 0) / meses;
        const balanceFinal = ingresoPromedio - gastoPromedio - cuotaMensual;
        
        // Patrimonio proyectado (valor de las inversiones al final)
        patrimonioTotal = inversiones;
        
        return {
            ingresos,
            gastos,
            cuotas,
            ahorros,
            ingresoPromedio,
            gastoPromedio,
            ahorroPromedio,
            balanceFinal,
            patrimonioTotal
        };
    }
    
    // Función para mostrar resultados de proyección
    function mostrarResultadosProyeccion(proyeccion) {
        // Formatear valores para mostrar
        const formatoMoneda = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        });
        
        // Actualizar valores en la UI
        document.getElementById('balance-final').textContent = formatoMoneda.format(proyeccion.balanceFinal);
        document.getElementById('ahorro-promedio').textContent = formatoMoneda.format(proyeccion.ahorroPromedio);
        document.getElementById('patrimonio-proyectado').textContent = formatoMoneda.format(proyeccion.patrimonioTotal);
        
        // Crear gráfico de proyección
        const ctx = document.getElementById('projection-chart').getContext('2d');
        
        // Limpiar canvas si ya existe un gráfico
        const chartInstance = Chart.getChart(ctx);
        if (chartInstance) {
            chartInstance.destroy();
        }
        
        // Meses para el eje X
        const meses = Array.from({length: proyeccion.ingresos.length}, (_, i) => i + 1);
        
        // Crear nuevo gráfico
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: meses,
                datasets: [
                    {
                        label: 'Ingresos',
                        data: proyeccion.ingresos,
                        backgroundColor: 'rgba(46, 204, 113, 0.6)',
                        borderColor: 'rgb(46, 204, 113)',
                        borderWidth: 1
                    },
                    {
                        label: 'Gastos',
                        data: proyeccion.gastos,
                        backgroundColor: 'rgba(231, 76, 60, 0.6)',
                        borderColor: 'rgb(231, 76, 60)',
                        borderWidth: 1
                    },
                    {
                        label: 'Cuota préstamo',
                        data: proyeccion.cuotas,
                        backgroundColor: 'rgba(52, 152, 219, 0.6)',
                        borderColor: 'rgb(52, 152, 219)',
                        borderWidth: 1
                    },
                    {
                        label: 'Ahorro',
                        data: proyeccion.ahorros,
                        backgroundColor: 'rgba(155, 89, 182, 0.6)',
                        borderColor: 'rgb(155, 89, 182)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        stacked: false,
                        title: {
                            display: true,
                            text: 'Mes'
                        }
                    },
                    y: {
                        stacked: false,
                        title: {
                            display: true,
                            text: 'Valor (COP)'
                        },
                        ticks: {
                            callback: function(value) {
                                return formatoMoneda.format(value);
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + formatoMoneda.format(context.raw);
                            }
                        }
                    }
                }
            }
        });
        
        // Mostrar mensaje de éxito
        mostrarToast("Proyección financiera generada correctamente", "success");
    }
    
    // Inicializar funcionalidad de optimización de préstamos
    const optimizarPrestamoBtn = document.getElementById('optimizar-prestamo');
    if (optimizarPrestamoBtn) {
        optimizarPrestamoBtn.addEventListener('click', function() {
            // Obtener datos del préstamo actual
            const datosPrestamo = obtenerDatosPrestamo();
            if (!datosPrestamo.monto || !datosPrestamo.plazo || !datosPrestamo.interesMensual) {
                mostrarToast("Primero debe calcular un préstamo", "warning");
                return;
            }
            
            // Obtener prioridad de optimización (0-100)
            const prioridad = parseInt(document.getElementById('optimization-priority').value || 50);
            
            // Obtener restricciones
            const cuotaMaxima = parseFloat(document.getElementById('cuota-maxima').value || 0);
            const plazoMaximo = parseInt(document.getElementById('plazo-maximo').value || 60);
            
            // Generar opciones optimizadas
            const opciones = generarOpcionesOptimizadas(datosPrestamo, prioridad, cuotaMaxima, plazoMaximo);
            
            // Mostrar opciones en la UI
            mostrarOpcionesOptimizadas(opciones);
            
            // Mostrar resultados
            document.querySelector('.optimization-results').classList.remove('hidden');
        });
    }
    
    // Control deslizante de prioridad de optimización
    const prioritySlider = document.getElementById('optimization-priority');
    const priorityValue = document.querySelector('.priority-value');
    
    if (prioritySlider && priorityValue) {
        prioritySlider.addEventListener('input', function() {
            const value = parseInt(this.value);
            let prioridad = "Equilibrado";
            
            if (value < 30) {
                prioridad = "Cuota mínima";
            } else if (value > 70) {
                prioridad = "Menos intereses";
            }
            
            priorityValue.textContent = prioridad;
        });
    }
    
    // Función para generar opciones optimizadas de préstamo
    function generarOpcionesOptimizadas(datosPrestamo, prioridad, cuotaMaxima, plazoMaximo) {
        const monto = datosPrestamo.monto;
        const tasaMensual = datosPrestamo.interesMensual / 100;
        
        // Ajustar restricciones si no se especifican
        if (!cuotaMaxima || cuotaMaxima <= 0) {
            cuotaMaxima = monto; // Un valor alto para que no limite
        }
        
        if (!plazoMaximo || plazoMaximo <= 0) {
            plazoMaximo = 360; // Un valor alto para que no limite
        }
        
        // Opción 1: Equilibrada (opción actual o ligeramente ajustada)
        const opcion1 = {
            monto: monto,
            plazo: datosPrestamo.plazo,
            interes: datosPrestamo.interesMensual,
            cuota: datosPrestamo.cuotaMensual,
            totalIntereses: datosPrestamo.totalIntereses
        };
        
        // Opción 2: Cuota mínima (plazo más largo)
        // Buscar el plazo que genere la cuota más baja sin exceder el plazo máximo
        let plazoOpt2 = Math.min(Math.round(datosPrestamo.plazo * 1.5), plazoMaximo);
        let cuotaOpt2 = calcularCuotaMensual(monto, tasaMensual, plazoOpt2);
        
        // Ajustar si excede la cuota máxima
        while (cuotaOpt2 > cuotaMaxima && plazoOpt2 < plazoMaximo) {
            plazoOpt2 += 1;
            cuotaOpt2 = calcularCuotaMensual(monto, tasaMensual, plazoOpt2);
        }
        
        const totalInteresesOpt2 = (cuotaOpt2 * plazoOpt2) - monto;
        
        const opcion2 = {
            monto: monto,
            plazo: plazoOpt2,
            interes: datosPrestamo.interesMensual,
            cuota: cuotaOpt2,
            totalIntereses: totalInteresesOpt2
        };
        
        // Opción 3: Menos intereses (plazo más corto)
        // Buscar el plazo más corto posible que genere una cuota bajo el límite
        let plazoOpt3 = Math.max(Math.round(datosPrestamo.plazo * 0.7), 1);
        let cuotaOpt3 = calcularCuotaMensual(monto, tasaMensual, plazoOpt3);
        
        // Ajustar si excede la cuota máxima
        while (cuotaOpt3 > cuotaMaxima && plazoOpt3 < plazoMaximo) {
            plazoOpt3 += 1;
            cuotaOpt3 = calcularCuotaMensual(monto, tasaMensual, plazoOpt3);
        }
        
        const totalInteresesOpt3 = (cuotaOpt3 * plazoOpt3) - monto;
        
        const opcion3 = {
            monto: monto,
            plazo: plazoOpt3,
            interes: datosPrestamo.interesMensual,
            cuota: cuotaOpt3,
            totalIntereses: totalInteresesOpt3
        };
        
        return [opcion1, opcion2, opcion3];
    }
    
    // Función para calcular la cuota mensual
    function calcularCuotaMensual(monto, tasaMensual, plazo) {
        return monto * (tasaMensual / (1 - Math.pow(1 + tasaMensual, -plazo)));
    }
    
    // Función para mostrar opciones optimizadas
    function mostrarOpcionesOptimizadas(opciones) {
        // Formatear valores para mostrar
        const formatoMoneda = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        });
        
        // Actualizar valores en la UI para cada opción
        for (let i = 0; i < opciones.length; i++) {
            const indice = i + 1;
            const opcion = opciones[i];
            
            document.getElementById(`opt-monto-${indice}`).textContent = formatoMoneda.format(opcion.monto);
            document.getElementById(`opt-plazo-${indice}`).textContent = opcion.plazo + " meses";
            document.getElementById(`opt-interes-${indice}`).textContent = opcion.interes + "%";
            document.getElementById(`opt-cuota-${indice}`).textContent = formatoMoneda.format(opcion.cuota);
            document.getElementById(`opt-total-${indice}`).textContent = formatoMoneda.format(opcion.totalIntereses);
        }
        
        // Configurar botones para aplicar opciones
        const applyButtons = document.querySelectorAll('.apply-option');
        
        applyButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const optionIndex = parseInt(this.getAttribute('data-option')) - 1;
                const opcion = opciones[optionIndex];
                
                // Actualizar campos del formulario principal
                document.getElementById('monto').value = opcion.monto;
                document.getElementById('plazo').value = opcion.plazo;
                document.getElementById('interes-mensual').value = opcion.interes;
                
                // Disparar evento de cálculo en el formulario
                const submitBtn = document.querySelector('#loan-form button[type="submit"]');
                if (submitBtn) {
                    submitBtn.click();
                }
                
                // Cerrar dashboard
                document.getElementById('finance-dashboard').classList.add('hidden');
                
                // Mostrar mensaje
                mostrarToast("Opción aplicada correctamente", "success");
            });
        });
    }
    
    // Implementar simulación de escenarios
    const simularEscenarioBtn = document.getElementById('simular-escenario');
    if (simularEscenarioBtn) {
        simularEscenarioBtn.addEventListener('click', function() {
            // Obtener datos del préstamo
            const datosPrestamo = obtenerDatosPrestamo();
            if (!datosPrestamo.monto || !datosPrestamo.plazo || !datosPrestamo.interesMensual) {
                mostrarToast("Primero debe calcular un préstamo", "warning");
                return;
            }
            
            // Identificar escenario seleccionado
            const escenarioActivo = document.querySelector('.scenario-option.active');
            if (!escenarioActivo) {
                mostrarToast("Seleccione un escenario a simular", "warning");
                return;
            }
            
            const tipoEscenario = escenarioActivo.getAttribute('data-scenario');
            
            // Simular según el tipo de escenario
            let resultadoSimulacion;
            
            switch (tipoEscenario) {
                case 'rates':
                    const tasaOptimista = parseFloat(document.getElementById('tasa-optimista').value || 0);
                    const tasaPesimista = parseFloat(document.getElementById('tasa-pesimista').value || 0);
                    const probabilidadCambio = parseFloat(document.getElementById('probabilidad-cambio').value || 0);
                    
                    resultadoSimulacion = simularVariacionTasas(
                        datosPrestamo,
                        tasaOptimista / 100,
                        tasaPesimista / 100,
                        probabilidadCambio / 100
                    );
                    break;
                    
                case 'income':
                    const ingresoAumento = parseFloat(document.getElementById('ingreso-aumento').value || 0);
                    const ingresoReduccion = parseFloat(document.getElementById('ingreso-reduccion').value || 0);
                    const mesCambio = parseInt(document.getElementById('mes-cambio').value || 0);
                    
                    resultadoSimulacion = simularCambioIngresos(
                        datosPrestamo,
                        ingresoAumento / 100,
                        ingresoReduccion / 100,
                        mesCambio
                    );
                    break;
                    
                case 'inflation':
                    const inflacionBase = parseFloat(document.getElementById('inflacion-base').value || 0);
                    const inflacionAlta = parseFloat(document.getElementById('inflacion-alta').value || 0);
                    const ajusteIngresos = parseFloat(document.getElementById('ajuste-ingresos').value || 0);
                    
                    resultadoSimulacion = simularInflacion(
                        datosPrestamo,
                        inflacionBase / 100,
                        inflacionAlta / 100,
                        ajusteIngresos / 100
                    );
                    break;
                    
                case 'stress':
                    const incluirAumentoTasas = document.getElementById('stress-tasa').checked;
                    const incluirReduccionIngresos = document.getElementById('stress-ingresos').checked;
                    const incluirInflacion = document.getElementById('stress-inflacion').checked;
                    const duracionEstres = parseInt(document.getElementById('duracion-estres').value || 0);
                    
                    resultadoSimulacion = simularPruebaEstres(
                        datosPrestamo,
                        incluirAumentoTasas,
                        incluirReduccionIngresos,
                        incluirInflacion,
                        duracionEstres
                    );
                    break;
                    
                default:
                    mostrarToast("Tipo de escenario no válido", "error");
                    return;
            }
            
            // Mostrar resultados
            mostrarResultadosEscenario(resultadoSimulacion, tipoEscenario);
            
            // Mostrar sección de resultados
            document.querySelector('.scenario-results').classList.remove('hidden');
        });
    }
    
    // Funciones para simular diferentes escenarios
    function simularVariacionTasas(datosPrestamo, reduccion, aumento, probabilidad) {
        const monto = datosPrestamo.monto;
        const plazo = datosPrestamo.plazo;
        const tasaOriginal = datosPrestamo.interesMensual / 100;
        const cuotaOriginal = datosPrestamo.cuotaMensual;
        const totalOriginal = datosPrestamo.totalPagar;
        
        // Calcular tasas en escenarios
        const tasaOptimista = Math.max(0.0001, tasaOriginal * (1 - reduccion));
        const tasaPesimista = tasaOriginal * (1 + aumento);
        
        // Calcular nuevas cuotas
        const cuotaOptimista = calcularCuotaMensual(monto, tasaOptimista, plazo);
        const cuotaPesimista = calcularCuotaMensual(monto, tasaPesimista, plazo);
        
        // Calcular totales a pagar
        const totalOptimista = cuotaOptimista * plazo;
        const totalPesimista = cuotaPesimista * plazo;
        
        // Impacto en cuota (promedio ponderado)
        const impactoPromedio = 
            (cuotaOptimista - cuotaOriginal) * probabilidad * 0.5 + 
            (cuotaPesimista - cuotaOriginal) * probabilidad * 0.5;
        
        const porcentajeImpacto = (impactoPromedio / cuotaOriginal) * 100;
        
        // Datos para gráfico
        const meses = Array.from({length: plazo}, (_, i) => i + 1);
        const datosOriginales = generarDatosAmortizacion(monto, tasaOriginal, plazo, cuotaOriginal);
        const datosOptimistas = generarDatosAmortizacion(monto, tasaOptimista, plazo, cuotaOptimista);
        const datosPesimistas = generarDatosAmortizacion(monto, tasaPesimista, plazo, cuotaPesimista);
        
        // Determinar nivel de riesgo
        let nivelRiesgo = "Bajo";
        let estado = "Seguro";
        let conclusion = "El préstamo puede mantenerse estable incluso con variaciones en las tasas de interés.";
        let recomendaciones = [
            "Mantener un seguimiento regular de las tasas de interés"
        ];
        
        // Cambiar según impacto
        if (porcentajeImpacto > 10) {
            nivelRiesgo = "Alto";
            estado = "Precaución";
            conclusion = "Las variaciones de tasas podrían impactar significativamente su capacidad de pago.";
            recomendaciones.push("Considerar opciones de tasa fija");
            recomendaciones.push("Explorar estrategias de prepago para reducir la exposición al riesgo de tasa");
        } else if (porcentajeImpacto > 5) {
            nivelRiesgo = "Moderado";
            estado = "Atención";
            conclusion = "El préstamo es moderadamente sensible a cambios en las tasas de interés.";
            recomendaciones.push("Evaluar la posibilidad de refinanciamiento a tasa fija");
        }
        
        // Cálculo del fondo de emergencia recomendado (3 cuotas pesimistas)
        const fondoEmergencia = cuotaPesimista * 3;
        
        return {
            escenario: 'rates',
            cuotaOriginal,
            cuotaOptimista,
            cuotaPesimista,
            totalOriginal,
            totalOptimista,
            totalPesimista,
            impactoPromedio,
            porcentajeImpacto,
            probabilidadCambio: probabilidad,
            meses,
            datosOriginales,
            datosOptimistas,
            datosPesimistas,
            nivelRiesgo,
            estado,
            conclusion,
            recomendaciones,
            fondoEmergencia
        };
    }
    
    function simularCambioIngresos(datosPrestamo, aumento, reduccion, mesCambio) {
        const cuotaMensual = datosPrestamo.cuotaMensual;
        const plazo = datosPrestamo.plazo;
        
        // Asumimos un ingreso inicial que permite una carga financiera del 30%
        const ingresoInicial = cuotaMensual / 0.3;
        
        // Calcular ingresos en diferentes escenarios
        const ingresoOptimista = ingresoInicial * (1 + aumento);
        const ingresoPesimista = ingresoInicial * (1 - reduccion);
        
        // Calcular carga financiera en cada escenario
        const cargaOriginal = (cuotaMensual / ingresoInicial) * 100;
        const cargaOptimista = (cuotaMensual / ingresoOptimista) * 100;
        const cargaPesimista = (cuotaMensual / ingresoPesimista) * 100;
        
        // Determinar nivel de riesgo
        let nivelRiesgo = "Bajo";
        let estado = "Seguro";
        let conclusion = "Los cambios de ingresos proyectados no afectarían significativamente su capacidad de pago.";
        let recomendaciones = [
            "Mantener un fondo de emergencia para imprevistos"
        ];
        
        if (cargaPesimista > 50) {
            nivelRiesgo = "Alto";
            estado = "Riesgo";
            conclusion = "Una reducción de ingresos podría comprometer seriamente su capacidad de pago.";
            recomendaciones = [
                "Considerar un préstamo de menor monto o mayor plazo",
                "Aumentar el fondo de emergencia a 6 meses de gastos",
                "Buscar fuentes adicionales de ingresos"
            ];
        } else if (cargaPesimista > 40) {
            nivelRiesgo = "Moderado";
            estado = "Precaución";
            conclusion = "Una reducción de ingresos aumentaría su carga financiera a niveles considerables.";
            recomendaciones.push("Aumentar su fondo de emergencia");
            recomendaciones.push("Evaluar opciones de refinanciamiento");
        }
        
        // Cálculo del fondo de emergencia recomendado (6 cuotas)
        const fondoEmergencia = cuotaMensual * 6;
        
        // Datos para gráfico de evolución de la carga financiera
        const meses = Array.from({length: plazo}, (_, i) => i + 1);
        const cargaFinanciera = meses.map(mes => {
            if (mes < mesCambio) {
                return cargaOriginal;
            } else {
                // Promedio ponderado entre escenarios (aumento más probable en época temprana)
                const pesoOptimista = Math.max(0.1, 0.5 - (mes / plazo) * 0.3);
                const pesoPesimista = 1 - pesoOptimista;
                return cargaOptimista * pesoOptimista + cargaPesimista * pesoPesimista;
            }
        });
        
        // Marcar regiones de carga financiera
        const regiones = meses.map(mes => {
            const carga = cargaFinanciera[mes - 1];
            if (carga <= 30) return 1; // Saludable
            if (carga <= 40) return 2; // Moderada
            return 3; // Elevada
        });
        
        return {
            escenario: 'income',
            ingresoInicial,
            ingresoOptimista,
            ingresoPesimista,
            cargaOriginal,
            cargaOptimista,
            cargaPesimista,
            mesCambio,
            meses,
            cargaFinanciera,
            regiones,
            nivelRiesgo,
            estado,
            conclusion,
            recomendaciones,
            fondoEmergencia
        };
    }
    
    function simularInflacion(datosPrestamo, inflacionBase, inflacionAlta, ajusteIngresos) {
        const cuotaMensual = datosPrestamo.cuotaMensual;
        const plazo = datosPrestamo.plazo;
        
        // Tasas mensuales equivalentes
        const inflacionBaseMensual = Math.pow(1 + inflacionBase, 1/12) - 1;
        const inflacionAltaMensual = Math.pow(1 + inflacionAlta, 1/12) - 1;
        const ajusteIngresosMensual = Math.pow(1 + ajusteIngresos, 1/12) - 1;
        
        // Datos para el gráfico (valor real de la cuota)
        const meses = Array.from({length: plazo}, (_, i) => i + 1);
        
        // Calcular valor real de la cuota con diferentes escenarios de inflación
        let valorRealBase = Array(plazo).fill(cuotaMensual);
        let valorRealAlta = Array(plazo).fill(cuotaMensual);
        let ingresos = Array(plazo).fill(0);
        
        // Valor inicial para los ingresos (asumiendo carga financiera inicial del 30%)
        let ingresoActual = cuotaMensual / 0.3;
        
        for (let i = 1; i < plazo; i++) {
            // Actualizar valor real de la cuota (inflación acumulada)
            valorRealBase[i] = valorRealBase[i-1] / (1 + inflacionBaseMensual);
            valorRealAlta[i] = valorRealAlta[i-1] / (1 + inflacionAltaMensual);
            
            // Actualizar ingresos con ajuste
            ingresoActual *= (1 + ajusteIngresosMensual);
            ingresos[i] = ingresoActual;
        }
        
        // Calcular indicadores de riesgo
        const diferenciaBase = (valorRealBase[0] - valorRealBase[plazo-1]) / valorRealBase[0] * 100;
        const diferenciaAlta = (valorRealAlta[0] - valorRealAlta[plazo-1]) / valorRealAlta[0] * 100;
        
        // Determinar nivel de riesgo
        let nivelRiesgo = "Bajo";
        let estado = "Positivo";
        let conclusion = "La inflación juega a su favor reduciendo el valor real de su cuota a lo largo del tiempo.";
        let recomendaciones = [
            "Mantener el ritmo de pagos actual"
        ];
        
        // Solo es un problema si el ajuste de ingresos es menor que la inflación
        if (ajusteIngresos < inflacionAlta * 0.7) {
            nivelRiesgo = "Moderado";
            estado = "Atención";
            conclusion = "Si la inflación supera el ajuste de sus ingresos, su capacidad adquisitiva se verá afectada.";
            recomendaciones = [
                "Buscar fuentes de ingresos con ajustes superiores a la inflación",
                "Considerar inversiones que protejan su capital de la inflación"
            ];
        }
        
        // Cálculo del fondo de emergencia recomendado (4 cuotas)
        const fondoEmergencia = cuotaMensual * 4;
        
        return {
            escenario: 'inflation',
            cuotaMensual,
            inflacionBase,
            inflacionAlta,
            ajusteIngresos,
            diferenciaBase,
            diferenciaAlta,
            meses,
            valorRealBase,
            valorRealAlta,
            ingresos,
            nivelRiesgo,
            estado,
            conclusion,
            recomendaciones,
            fondoEmergencia
        };
    }
    
    function simularPruebaEstres(datosPrestamo, incluirAumentoTasas, incluirReduccionIngresos, incluirInflacion, duracionEstres) {
        const monto = datosPrestamo.monto;
        const plazo = datosPrestamo.plazo;
        const tasaOriginal = datosPrestamo.interesMensual / 100;
        const cuotaOriginal = datosPrestamo.cuotaMensual;
        
        // Parámetros de la prueba de estrés
        const aumentoTasa = 0.03; // 3% de aumento
        const reduccionIngresos = 0.25; // 25% de reducción
        const inflacionAcelerada = 0.08; // 8% anual
        
        // Ingresos iniciales (asumiendo carga del 30%)
        const ingresoInicial = cuotaOriginal / 0.3;
        
        // Calcular valores en condiciones de estrés
        const tasaEstres = incluirAumentoTasas ? tasaOriginal + aumentoTasa : tasaOriginal;
        const ingresoEstres = incluirReduccionIngresos ? ingresoInicial * (1 - reduccionIngresos) : ingresoInicial;
        
        // Calcular nueva cuota en condición de estrés (si cambia la tasa)
        const cuotaEstres = incluirAumentoTasas ? 
            calcularCuotaMensual(monto, tasaEstres, plazo) : cuotaOriginal;
        
        // Calcular carga financiera normal vs estrés
        const cargaNormal = (cuotaOriginal / ingresoInicial) * 100;
        const cargaEstres = (cuotaEstres / ingresoEstres) * 100;
        
        // Determinar si puede soportar el estrés
        const estolerancia = cargaEstres <= 60; // 60% es el límite de tolerancia
        
        // Datos para el gráfico
        const meses = Array.from({length: plazo}, (_, i) => i + 1);
        const mesInicioEstres = Math.floor(plazo * 0.3); // Estrés a partir del 30% del plazo
        const mesFinEstres = mesInicioEstres + duracionEstres;
        
        // Generar datos de carga financiera para cada mes
        const cargaFinanciera = meses.map(mes => {
            if (mes >= mesInicioEstres && mes < mesFinEstres) {
                return cargaEstres;
            } else {
                return cargaNormal;
            }
        });
        
        // Determinar nivel de riesgo
        let nivelRiesgo, estado, conclusion, recomendaciones;
        
        if (cargaEstres > 80) {
            nivelRiesgo = "Crítico";
            estado = "Peligro";
            conclusion = "En condiciones de estrés financiero, el préstamo sería insostenible.";
            recomendaciones = [
                "Reconsiderar seriamente este préstamo",
                "Reducir el monto solicitado significativamente",
                "Aumentar el fondo de emergencia a al menos 8 meses"
            ];
        } else if (cargaEstres > 60) {
            nivelRiesgo = "Alto";
            estado = "Riesgo";
            conclusion = "El préstamo sería difícil de mantener en condiciones económicas adversas.";
            recomendaciones = [
                "Considerar reducir el monto del préstamo",
                "Explorar opciones de seguro de desempleo",
                "Crear un fondo de emergencia de 6 meses"
            ];
        } else if (cargaEstres > 40) {
            nivelRiesgo = "Moderado";
            estado = "Precaución";
            conclusion = "El préstamo podría mantenerse en condiciones de estrés, pero con ajustes significativos en su presupuesto.";
            recomendaciones = [
                "Mantener un fondo de emergencia equivalente a 4-6 meses de cuotas",
                "Identificar gastos discrecionales que podrían recortarse"
            ];
        } else {
            nivelRiesgo = "Bajo";
            estado = "Seguro";
            conclusion = "El préstamo es resistente incluso en condiciones económicas adversas.";
            recomendaciones = [
                "Mantener un fondo de emergencia de 3 meses",
                "Continuar con su plan financiero actual"
            ];
        }
        
        // Cálculo del fondo de emergencia recomendado (basado en nivel de riesgo)
        let multiplicadorFondo = 3; // Base: 3 meses
        if (nivelRiesgo === "Moderado") multiplicadorFondo = 5;
        if (nivelRiesgo === "Alto") multiplicadorFondo = 6;
        if (nivelRiesgo === "Crítico") multiplicadorFondo = 8;
        
        const fondoEmergencia = cuotaEstres * multiplicadorFondo;
        
        return {
            escenario: 'stress',
            cuotaOriginal,
            cuotaEstres,
            ingresoInicial,
            ingresoEstres,
            cargaNormal,
            cargaEstres,
            mesInicioEstres,
            mesFinEstres,
            meses,
            cargaFinanciera,
            nivelRiesgo,
            estado,
            conclusion,
            recomendaciones,
            fondoEmergencia,
            estolerancia
        };
    }
    
    // Función para mostrar resultados de escenarios
    function mostrarResultadosEscenario(resultado, tipoEscenario) {
        // Formatear valores para mostrar
        const formatoMoneda = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        });
        
        // Actualizar estado y conclusión
        document.getElementById('escenario-estado').textContent = resultado.estado;
        document.getElementById('escenario-conclusion').textContent = resultado.conclusion;
        
        // Actualizar indicador visual según estado
        const indicador = document.querySelector('.conclusion-indicator');
        indicador.className = 'conclusion-indicator'; // Resetear clases
        
        if (resultado.estado === "Seguro" || resultado.estado === "Positivo") {
            indicador.classList.add('safe');
            indicador.querySelector('i').className = 'fas fa-check-circle';
        } else if (resultado.estado === "Atención" || resultado.estado === "Precaución") {
            indicador.classList.add('warning');
            indicador.querySelector('i').className = 'fas fa-exclamation-circle';
        } else {
            indicador.classList.add('danger');
            indicador.querySelector('i').className = 'fas fa-times-circle';
        }
        
        // Actualizar métricas
        let impactoTexto = "";
        switch (tipoEscenario) {
            case 'rates':
                impactoTexto = resultado.porcentajeImpacto.toFixed(1) + "%";
                break;
            case 'income':
                impactoTexto = resultado.cargaPesimista.toFixed(1) + "%";
                break;
            case 'inflation':
                impactoTexto = resultado.diferenciaAlta.toFixed(1) + "%";
                break;
            case 'stress':
                impactoTexto = resultado.cargaEstres.toFixed(1) + "%";
                break;
        }
        
        document.getElementById('impacto-cuota').textContent = impactoTexto;
        document.getElementById('prob-dificultad').textContent = resultado.nivelRiesgo;
        document.getElementById('fondo-emergencia').textContent = formatoMoneda.format(resultado.fondoEmergencia);
        
        // Actualizar recomendaciones
        const recomendacionesUl = document.getElementById('escenario-recomendaciones');
        recomendacionesUl.innerHTML = '';
        
        resultado.recomendaciones.forEach(recomendacion => {
            const li = document.createElement('li');
            li.textContent = recomendacion;
            recomendacionesUl.appendChild(li);
        });
        
        // Generar gráfico según tipo de escenario
        generarGraficoEscenario(resultado, tipoEscenario);
        
        // Mostrar mensaje de éxito
        mostrarToast("Análisis de escenario completado", "success");
    }
    
    // Función para generar gráfico según el tipo de escenario
    function generarGraficoEscenario(resultado, tipoEscenario) {
        const ctx = document.getElementById('scenario-chart').getContext('2d');
        
        // Limpiar canvas si ya existe un gráfico
        const chartInstance = Chart.getChart(ctx);
        if (chartInstance) {
            chartInstance.destroy();
        }
        
        // Formatear moneda
        const formatoMoneda = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        });
        
        let chartConfig;
        
        switch (tipoEscenario) {
            case 'rates':
                // Gráfico de comparación de saldos pendientes
                chartConfig = {
                    type: 'line',
                    data: {
                        labels: resultado.meses,
                        datasets: [
                            {
                                label: 'Escenario base',
                                data: resultado.datosOriginales.saldoPendiente,
                                borderColor: '#3498db',
                                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                                fill: true,
                                tension: 0.1
                            },
                            {
                                label: 'Escenario optimista',
                                data: resultado.datosOptimistas.saldoPendiente,
                                borderColor: '#2ecc71',
                                backgroundColor: 'rgba(46, 204, 113, 0.1)',
                                fill: true,
                                tension: 0.1
                            },
                            {
                                label: 'Escenario pesimista',
                                data: resultado.datosPesimistas.saldoPendiente,
                                borderColor: '#e74c3c',
                                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                                fill: true,
                                tension: 0.1
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: 'Evolución del saldo en diferentes escenarios de tasas'
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        return context.dataset.label + ': ' + formatoMoneda.format(context.raw);
                                    }
                                }
                            }
                        },
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Mes'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Saldo pendiente'
                                },
                                ticks: {
                                    callback: function(value) {
                                        return formatoMoneda.format(value);
                                    }
                                }
                            }
                        }
                    }
                };
                break;
                
            case 'income':
                // Gráfico de evolución de la carga financiera
                chartConfig = {
                    type: 'line',
                    data: {
                        labels: resultado.meses,
                        datasets: [
                            {
                                label: 'Carga financiera proyectada',
                                data: resultado.cargaFinanciera,
                                borderColor: '#3498db',
                                backgroundColor: function(context) {
                                    const index = context.dataIndex;
                                    const value = context.dataset.data[index];
                                    
                                    if (value <= 30) return 'rgba(46, 204, 113, 0.2)'; // Verde (saludable)
                                    if (value <= 40) return 'rgba(243, 156, 18, 0.2)'; // Naranja (moderada)
                                    return 'rgba(231, 76, 60, 0.2)'; // Rojo (elevada)
                                },
                                fill: true,
                                tension: 0.1,
                                segment: {
                                    borderColor: function(context) {
                                        const index = context.p1DataIndex;
                                        const value = context.line.points[index].parsed.y;
                                        
                                        if (value <= 30) return '#2ecc71'; // Verde (saludable)
                                        if (value <= 40) return '#f39c12'; // Naranja (moderada)
                                        return '#e74c3c'; // Rojo (elevada)
                                    }
                                }
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: 'Evolución de la carga financiera con cambios de ingresos'
                            },
                            annotation: {
                                annotations: {
                                    cambioIngreso: {
                                        type: 'line',
                                        mode: 'vertical',
                                        scaleID: 'x',
                                        value: resultado.mesCambio,
                                        borderColor: '#9b59b6',
                                        borderWidth: 2,
                                        label: {
                                            content: 'Cambio de ingresos',
                                            enabled: true,
                                            position: 'top'
                                        }
                                    },
                                    zonaSaludable: {
                                        type: 'box',
                                        xMin: 0,
                                        xMax: resultado.meses.length,
                                        yMin: 0,
                                        yMax: 30,
                                        backgroundColor: 'rgba(46, 204, 113, 0.1)',
                                        borderColor: 'transparent'
                                    },
                                    zonaModerada: {
                                        type: 'box',
                                        xMin: 0,
                                        xMax: resultado.meses.length,
                                        yMin: 30,
                                        yMax: 40,
                                        backgroundColor: 'rgba(243, 156, 18, 0.1)',
                                        borderColor: 'transparent'
                                    }
                                }
                            }
                        },
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Mes'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Carga financiera (%)'
                                },
                                min: 0,
                                max: Math.max(60, Math.ceil(Math.max(...resultado.cargaFinanciera) / 10) * 10)
                            }
                        }
                    }
                };
                break;
                
            case 'inflation':
                // Gráfico del valor real de la cuota
                chartConfig = {
                    type: 'line',
                    data: {
                        labels: resultado.meses,
                        datasets: [
                            {
                                label: 'Valor nominal de la cuota',
                                data: Array(resultado.meses.length).fill(resultado.cuotaMensual),
                                borderColor: '#3498db',
                                borderWidth: 2,
                                borderDash: [5, 5],
                                fill: false
                            },
                            {
                                label: 'Valor real (inflación base)',
                                data: resultado.valorRealBase,
                                borderColor: '#2ecc71',
                                backgroundColor: 'rgba(46, 204, 113, 0.1)',
                                fill: true,
                                tension: 0.1
                            },
                            {
                                label: 'Valor real (inflación alta)',
                                data: resultado.valorRealAlta,
                                borderColor: '#e74c3c',
                                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                                fill: true,
                                tension: 0.1
                            },
                            {
                                label: 'Ingresos ajustados',
                                data: resultado.ingresos,
                                borderColor: '#9b59b6',
                                borderWidth: 2,
                                fill: false,
                                yAxisID: 'y1'
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: 'Efecto de la inflación en el valor real de la cuota'
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        return context.dataset.label + ': ' + formatoMoneda.format(context.raw);
                                    }
                                }
                            }
                        },
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Mes'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Valor cuota (COP)'
                                },
                                ticks: {
                                    callback: function(value) {
                                        return formatoMoneda.format(value);
                                    }
                                }
                            },
                            y1: {
                                position: 'right',
                                title: {
                                    display: true,
                                    text: 'Ingresos (COP)'
                                },
                                grid: {
                                    drawOnChartArea: false
                                },
                                ticks: {
                                    callback: function(value) {
                                        return formatoMoneda.format(value);
                                    }
                                }
                            }
                        }
                    }
                };
                break;
                
            case 'stress':
                // Crear regiones para el gráfico
                const annotations = {};
                
                // Región de estrés
                annotations.regionEstres = {
                    type: 'box',
                    xMin: resultado.mesInicioEstres,
                    xMax: resultado.mesFinEstres,
                    yMin: 0,
                    yMax: 100,
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    borderColor: 'rgba(231, 76, 60, 0.5)',
                    borderWidth: 1,
                    label: {
                        content: 'Período de estrés',
                        enabled: true,
                        position: 'center'
                    }
                };
                
                // Regiones de carga financiera
                annotations.zonaSaludable = {
                    type: 'box',
                    xMin: 0,
                    xMax: resultado.meses.length,
                    yMin: 0,
                    yMax: 30,
                    backgroundColor: 'rgba(46, 204, 113, 0.05)',
                    borderColor: 'transparent'
                };
                
                annotations.zonaModerada = {
                    type: 'box',
                    xMin: 0,
                    xMax: resultado.meses.length,
                    yMin: 30,
                    yMax: 40,
                    backgroundColor: 'rgba(243, 156, 18, 0.05)',
                    borderColor: 'transparent'
                };
                
                annotations.zonaElevada = {
                    type: 'box',
                    xMin: 0,
                    xMax: resultado.meses.length,
                    yMin: 40,
                    yMax: 60,
                    backgroundColor: 'rgba(231, 76, 60, 0.05)',
                    borderColor: 'transparent'
                };
                
                annotations.zonaCritica = {
                    type: 'box',
                    xMin: 0,
                    xMax: resultado.meses.length,
                    yMin: 60,
                    yMax: 100,
                    backgroundColor: 'rgba(192, 57, 43, 0.05)',
                    borderColor: 'transparent'
                };
                
                // Gráfico de carga financiera en prueba de estrés
                chartConfig = {
                    type: 'line',
                    data: {
                        labels: resultado.meses,
                        datasets: [
                            {
                                label: 'Carga financiera',
                                data: resultado.cargaFinanciera,
                                borderColor: '#3498db',
                                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                                fill: true,
                                tension: 0.1
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: 'Prueba de estrés financiero'
                            },
                            annotation: {
                                annotations: annotations
                            }
                        },
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Mes'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Carga financiera (%)'
                                },
                                min: 0,
                                max: Math.max(80, Math.ceil(Math.max(...resultado.cargaFinanciera) / 10) * 10)
                            }
                        }
                    }
                };
                break;
        }
        
        // Crear gráfico
        new Chart(ctx, chartConfig);
    }
});
