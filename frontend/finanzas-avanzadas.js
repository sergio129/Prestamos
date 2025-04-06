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
});
