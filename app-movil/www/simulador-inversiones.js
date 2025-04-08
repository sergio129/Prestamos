/**
 * Simulador de Inversiones y Ahorro
 * Permite al usuario modelar estrategias de inversión y calcular rendimientos
 */

(function() {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Inicializando simulador de inversiones...');
        
        // Crear botón
        const inversionBtn = document.createElement('button');
        inversionBtn.type = 'button';
        inversionBtn.className = 'btn btn-inversion';
        inversionBtn.innerHTML = '<i class="fas fa-chart-line"></i> Simulador de Inversiones';
        inversionBtn.style.marginTop = '15px';
        
        // Añadir botón después de otros botones existentes
        const otrosBtn = document.querySelector('.btn-capacidad, .btn-comparador');
        if (otrosBtn && otrosBtn.parentNode) {
            otrosBtn.parentNode.appendChild(inversionBtn);
        } else {
            const loanForm = document.getElementById('loan-form');
            if (loanForm && loanForm.parentNode) {
                loanForm.parentNode.appendChild(inversionBtn);
            }
        }
        
        // Crear modal
        const inversionModal = document.createElement('div');
        inversionModal.id = 'inversion-modal';
        inversionModal.className = 'modal hidden';
        
        inversionModal.innerHTML = `
            <div class="modal-content inversion-content">
                <span class="close-modal">&times;</span>
                <h2>Simulador de Inversiones y Ahorro</h2>
                
                <div class="inversion-tabs">
                    <div class="inversion-tab active" data-tab="ahorro">Plan de Ahorro</div>
                    <div class="inversion-tab" data-tab="inversion">Portafolio de Inversión</div>
                    <div class="inversion-tab" data-tab="comparativa">Comparativa</div>
                </div>
                
                <div class="inversion-tab-content">
                    <!-- Tab de Plan de Ahorro -->
                    <div class="inversion-tab-pane active" id="ahorro-pane">
                        <p class="tab-description">Simula cómo crecerán tus ahorros con aportes periódicos.</p>
                        
                        <div class="form-group">
                            <label for="ahorro-inicial">Ahorro inicial:</label>
                            <div class="input-icon">
                                <span class="currency-symbol">$</span>
                                <input type="number" id="ahorro-inicial" placeholder="Monto inicial">
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="aporte-mensual">Aporte mensual:</label>
                            <div class="input-icon">
                                <span class="currency-symbol">$</span>
                                <input type="number" id="aporte-mensual" placeholder="Aporte periódico">
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="plazo-ahorro">Plazo (años):</label>
                            <input type="number" id="plazo-ahorro" value="5" min="1" max="40">
                        </div>
                        
                        <div class="form-group">
                            <label for="rendimiento-ahorro">Rendimiento anual estimado (%):</label>
                            <input type="number" id="rendimiento-ahorro" value="4.5" step="0.1" min="0" max="20">
                        </div>
                        
                        <div class="form-group">
                            <label for="inflacion-ahorro">Inflación anual estimada (%):</label>
                            <input type="number" id="inflacion-ahorro" value="3.2" step="0.1" min="0" max="15">
                        </div>
                        
                        <button id="calcular-ahorro" class="btn btn-full">Calcular Proyección</button>
                        
                        <div id="resultado-ahorro" class="hidden">
                            <h3>Resultados de tu plan de ahorro</h3>
                            
                            <div class="ahorro-cards">
                                <div class="ahorro-card">
                                    <div class="ahorro-card-title">Capital final</div>
                                    <div id="ahorro-total" class="ahorro-card-value">$0</div>
                                    <div class="ahorro-card-subtitle">Valor futuro total</div>
                                </div>
                                
                                <div class="ahorro-card">
                                    <div class="ahorro-card-title">Intereses ganados</div>
                                    <div id="intereses-ganados" class="ahorro-card-value">$0</div>
                                    <div class="ahorro-card-subtitle">Rendimiento acumulado</div>
                                </div>
                                
                                <div class="ahorro-card">
                                    <div class="ahorro-card-title">Valor real ajustado</div>
                                    <div id="valor-real" class="ahorro-card-value">$0</div>
                                    <div class="ahorro-card-subtitle">Ajustado por inflación</div>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <canvas id="chart-ahorro"></canvas>
                            </div>
                            
                            <div class="ahorro-table-container">
                                <h4>Tabla de proyección anual</h4>
                                <div class="table-responsive">
                                    <table class="ahorro-table">
                                        <thead>
                                            <tr>
                                                <th>Año</th>
                                                <th>Aportes</th>
                                                <th>Intereses</th>
                                                <th>Saldo</th>
                                                <th>Valor real</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tabla-proyeccion">
                                            <!-- Generado dinámicamente -->
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Tab de Portafolio de Inversión -->
                    <div class="inversion-tab-pane" id="inversion-pane">
                        <p class="tab-description">Configura tu portafolio de inversión y simula su rendimiento.</p>
                        
                        <div class="form-group">
                            <label for="capital-inversion">Capital a invertir:</label>
                            <div class="input-icon">
                                <span class="currency-symbol">$</span>
                                <input type="number" id="capital-inversion" placeholder="Monto inicial">
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="plazo-inversion">Plazo (años):</label>
                            <input type="number" id="plazo-inversion" value="5" min="1" max="40">
                        </div>
                        
                        <div class="form-group">
                            <label for="inflacion-inversion">Inflación anual estimada (%):</label>
                            <input type="number" id="inflacion-inversion" value="3.2" step="0.1" min="0" max="15">
                        </div>
                        
                        <div class="form-group">
                            <label>Distribución del portafolio:</label>
                            <div class="slider-group">
                                <label>Renta Fija:</label>
                                <input type="range" id="porcentaje-renta-fija" min="0" max="100" value="25">
                                <span id="valor-renta-fija">25%</span>
                            </div>
                            <div class="slider-group">
                                <label>Renta Variable:</label>
                                <input type="range" id="porcentaje-renta-variable" min="0" max="100" value="25">
                                <span id="valor-renta-variable">25%</span>
                            </div>
                            <div class="slider-group">
                                <label>Inmobiliario:</label>
                                <input type="range" id="porcentaje-inmobiliario" min="0" max="100" value="25">
                                <span id="valor-inmobiliario">25%</span>
                            </div>
                            <div class="slider-group">
                                <label>Alternativas:</label>
                                <input type="range" id="porcentaje-alternativas" min="0" max="100" value="25">
                                <span id="valor-alternativas">25%</span>
                            </div>
                            <div class="total-group">
                                <label>Total Asignado:</label>
                                <span id="total-asignado">100%</span>
                            </div>
                        </div>
                        
                        <button id="calcular-inversion" class="btn btn-full">Calcular Rendimiento</button>
                        
                        <div id="resultado-inversion" class="hidden">
                            <h3>Resultados de tu portafolio de inversión</h3>
                            
                            <div class="inversion-cards">
                                <div class="inversion-card">
                                    <div class="inversion-card-title">Rendimiento Promedio</div>
                                    <div id="rendimiento-promedio" class="inversion-card-value">0%</div>
                                </div>
                                <div class="inversion-card">
                                    <div class="inversion-card-title">Valor Final</div>
                                    <div id="valor-final" class="inversion-card-value">$0</div>
                                </div>
                                <div class="inversion-card">
                                    <div class="inversion-card-title">Crecimiento Real</div>
                                    <div id="crecimiento-real" class="inversion-card-value">0%</div>
                                </div>
                            </div>
                            
                            <div class="risk-indicator-container">
                                <div id="risk-indicator" class="risk-indicator"></div>
                                <p id="risk-description"></p>
                            </div>
                            
                            <div class="chart-container">
                                <canvas id="chart-portfolio-allocation"></canvas>
                                <canvas id="chart-portfolio-growth"></canvas>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Tab de Comparativa -->
                    <div class="inversion-tab-pane" id="comparativa-pane">
                        <p class="tab-description">Compara diferentes alternativas de inversión.</p>
                        
                        <div class="form-group">
                            <label for="monto-comparativa">Monto a invertir:</label>
                            <div class="input-icon">
                                <span class="currency-symbol">$</span>
                                <input type="number" id="monto-comparativa" placeholder="Monto inicial">
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="plazo-comparativa">Plazo (años):</label>
                            <input type="number" id="plazo-comparativa" value="5" min="1" max="40">
                        </div>
                        
                        <div class="form-group">
                            <label for="inflacion-comparativa">Inflación anual estimada (%):</label>
                            <input type="number" id="inflacion-comparativa" value="3.2" step="0.1" min="0" max="15">
                        </div>
                        
                        <div class="form-group">
                            <label>Alternativas:</label>
                            <div class="checkbox-group">
                                <label><input type="checkbox" id="check-cdt"> CDT / Plazo Fijo</label>
                                <input type="number" id="rendimiento-cdt" placeholder="Rendimiento (%)">
                            </div>
                            <div class="checkbox-group">
                                <label><input type="checkbox" id="check-acciones"> Acciones</label>
                                <input type="number" id="rendimiento-acciones" placeholder="Rendimiento (%)">
                            </div>
                            <div class="checkbox-group">
                                <label><input type="checkbox" id="check-fondos"> Fondos de Inversión</label>
                                <input type="number" id="rendimiento-fondos" placeholder="Rendimiento (%)">
                            </div>
                            <div class="checkbox-group">
                                <label><input type="checkbox" id="check-inmobiliario"> Inversión Inmobiliaria</label>
                                <input type="number" id="rendimiento-inmobiliario-comp" placeholder="Rendimiento (%)">
                            </div>
                        </div>
                        
                        <button id="comparar-alternativas" class="btn btn-full">Comparar Alternativas</button>
                        
                        <div id="resultado-comparativa" class="hidden">
                            <h3>Resultados de la comparativa</h3>
                            
                            <div class="comparativa-table-container">
                                <table class="comparativa-table">
                                    <thead>
                                        <tr>
                                            <th>Alternativa</th>
                                            <th>Rendimiento Nominal</th>
                                            <th>Rendimiento Real</th>
                                            <th>Valor Futuro</th>
                                            <th>Valor Real</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tabla-comparativa">
                                        <!-- Generado dinámicamente -->
                                    </tbody>
                                </table>
                            </div>
                            
                            <p id="conclusion-comparativa"></p>
                            
                            <div class="chart-container">
                                <canvas id="chart-comparativa"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(inversionModal);
        
        // Configurar eventos
        inversionBtn.addEventListener('click', function() {
            inversionModal.classList.remove('hidden');
        });
        
        // Cerrar modal
        const closeModal = inversionModal.querySelector('.close-modal');
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                inversionModal.classList.add('hidden');
            });
        }
        
        // Funcionalidad de tabs
        const tabs = inversionModal.querySelectorAll('.inversion-tab');
        if (tabs.length > 0) {
            tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    // Desactivar todos los tabs
                    inversionModal.querySelectorAll('.inversion-tab').forEach(t => {
                        t.classList.remove('active');
                    });
                    
                    // Desactivar todos los panes
                    inversionModal.querySelectorAll('.inversion-tab-pane').forEach(p => {
                        p.classList.remove('active');
                    });
                    
                    // Activar el tab seleccionado
                    this.classList.add('active');
                    
                    // Activar el pane correspondiente
                    const tabName = this.getAttribute('data-tab');
                    const pane = inversionModal.querySelector(`#${tabName}-pane`);
                    if (pane) {
                        pane.classList.add('active');
                    }
                });
            });
        }
        
        // Evitar que los clics dentro del modal cierren el modal
        inversionModal.querySelector('.modal-content').addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        // Cerrar modal al hacer clic fuera del contenido
        inversionModal.addEventListener('click', function() {
            inversionModal.classList.add('hidden');
        });
        
        // Calcular Ahorro
        const calcularAhorroBtn = inversionModal.querySelector('#calcular-ahorro');
        if (calcularAhorroBtn) {
            calcularAhorroBtn.addEventListener('click', function() {
                const ahorroInicial = parseFloat(inversionModal.querySelector('#ahorro-inicial').value) || 0;
                const aporteMensual = parseFloat(inversionModal.querySelector('#aporte-mensual').value) || 0;
                const plazoAnios = parseInt(inversionModal.querySelector('#plazo-ahorro').value) || 5;
                const rendimientoAnual = parseFloat(inversionModal.querySelector('#rendimiento-ahorro').value) || 4.5;
                const inflacionAnual = parseFloat(inversionModal.querySelector('#inflacion-ahorro').value) || 3.2;
                
                if (ahorroInicial < 0 || aporteMensual < 0) {
                    mostrarMensaje("Los valores no pueden ser negativos", "error");
                    return;
                }
                
                if (plazoAnios <= 0 || plazoAnios > 40) {
                    mostrarMensaje("El plazo debe estar entre 1 y 40 años", "error");
                    return;
                }
                
                try {
                    // Calcular proyección
                    const resultado = calcularProyeccionAhorro(ahorroInicial, aporteMensual, plazoAnios, rendimientoAnual, inflacionAnual);
                    
                    // Mostrar resultados
                    mostrarResultadosAhorro(resultado, inversionModal);
                    
                    // Mostrar sección de resultados
                    inversionModal.querySelector('#resultado-ahorro').classList.remove('hidden');
                } catch (error) {
                    console.error("Error al calcular proyección:", error);
                    mostrarMensaje("Ha ocurrido un error al calcular la proyección", "error");
                }
            });
        }
        
        // Slider de asignación de portafolio
        const sliders = ['renta-fija', 'renta-variable', 'inmobiliario', 'alternativas'];
        
        sliders.forEach(tipo => {
            const slider = document.getElementById(`porcentaje-${tipo}`);
            const valor = document.getElementById(`valor-${tipo}`);
            
            if (slider && valor) {
                slider.addEventListener('input', function() {
                    valor.textContent = `${this.value}%`;
                    actualizarTotal();
                });
            }
        });
        
        // Función para actualizar el total de asignación
        function actualizarTotal() {
            let total = 0;
            
            sliders.forEach(tipo => {
                const slider = document.getElementById(`porcentaje-${tipo}`);
                if (slider) {
                    total += parseInt(slider.value || 0);
                }
            });
            
            const totalElement = document.getElementById('total-asignado');
            if (totalElement) {
                totalElement.textContent = `${total}%`;
                totalElement.style.color = total === 100 ? '#2ecc71' : '#e74c3c';
            }
        }
        
        // Calcular Inversión
        const calcularInversionBtn = document.getElementById('calcular-inversion');
        if (calcularInversionBtn) {
            calcularInversionBtn.addEventListener('click', function() {
                const capitalInversion = parseFloat(document.getElementById('capital-inversion').value) || 0;
                const plazoInversion = parseInt(document.getElementById('plazo-inversion').value) || 5;
                const inflacionAnual = parseFloat(document.getElementById('inflacion-inversion').value) || 3.2;
                
                if (capitalInversion <= 0) {
                    mostrarMensaje("El capital a invertir debe ser mayor a cero", "error");
                    return;
                }
                
                // Obtener composición del portafolio
                const portafolio = {
                    rentaFija: {
                        porcentaje: parseInt(document.getElementById('porcentaje-renta-fija').value) || 0,
                        rendimiento: parseFloat(document.getElementById('rendimiento-renta-fija').value) || 0
                    },
                    rentaVariable: {
                        porcentaje: parseInt(document.getElementById('porcentaje-renta-variable').value) || 0,
                        rendimiento: parseFloat(document.getElementById('rendimiento-renta-variable').value) || 0
                    },
                    inmobiliario: {
                        porcentaje: parseInt(document.getElementById('porcentaje-inmobiliario').value) || 0,
                        rendimiento: parseFloat(document.getElementById('rendimiento-inmobiliario').value) || 0
                    },
                    alternativas: {
                        porcentaje: parseInt(document.getElementById('porcentaje-alternativas').value) || 0,
                        rendimiento: parseFloat(document.getElementById('rendimiento-alternativas').value) || 0
                    }
                };
                
                // Verificar que la asignación sume 100%
                const totalAsignado = Object.values(portafolio).reduce((sum, asset) => sum + asset.porcentaje, 0);
                
                if (totalAsignado !== 100) {
                    mostrarMensaje("La asignación del portafolio debe sumar 100%", "error");
                    return;
                }
                
                try {
                    // Calcular resultados
                    const resultado = calcularRendimientoPortafolio(capitalInversion, portafolio, plazoInversion, inflacionAnual);
                    
                    // Mostrar resultados
                    mostrarResultadosInversion(resultado, portafolio);
                    
                    // Mostrar sección de resultados
                    document.getElementById('resultado-inversion').classList.remove('hidden');
                } catch (error) {
                    console.error("Error al calcular rendimiento:", error);
                    mostrarMensaje("Ha ocurrido un error al calcular el rendimiento", "error");
                }
            });
        }
        
        // Comparar Alternativas
        const compararAlternativasBtn = document.getElementById('comparar-alternativas');
        if (compararAlternativasBtn) {
            compararAlternativasBtn.addEventListener('click', function() {
                const montoComparativa = parseFloat(document.getElementById('monto-comparativa').value) || 0;
                const plazoComparativa = parseInt(document.getElementById('plazo-comparativa').value) || 5;
                const inflacionComparativa = parseFloat(document.getElementById('inflacion-comparativa').value) || 3.2;
                
                if (montoComparativa <= 0) {
                    mostrarMensaje("El monto a comparar debe ser mayor a cero", "error");
                    return;
                }
                
                // Obtener alternativas seleccionadas
                const alternativas = [
                    {
                        nombre: 'CDT / Plazo Fijo',
                        activo: document.getElementById('check-cdt').checked,
                        rendimiento: parseFloat(document.getElementById('rendimiento-cdt').value) || 0,
                        color: '#3498db'
                    },
                    {
                        nombre: 'Acciones',
                        activo: document.getElementById('check-acciones').checked,
                        rendimiento: parseFloat(document.getElementById('rendimiento-acciones').value) || 0,
                        color: '#e74c3c'
                    },
                    {
                        nombre: 'Fondos de Inversión',
                        activo: document.getElementById('check-fondos').checked,
                        rendimiento: parseFloat(document.getElementById('rendimiento-fondos').value) || 0,
                        color: '#2ecc71'
                    },
                    {
                        nombre: 'Inversión Inmobiliaria',
                        activo: document.getElementById('check-inmobiliario').checked,
                        rendimiento: parseFloat(document.getElementById('rendimiento-inmobiliario-comp').value) || 0,
                        color: '#f39c12'
                    }
                ];
                
                // Filtrar solo las alternativas activas
                const alternativasActivas = alternativas.filter(alt => alt.activo);
                
                if (alternativasActivas.length === 0) {
                    mostrarMensaje("Debe seleccionar al menos una alternativa", "error");
                    return;
                }
                
                try {
                    // Calcular resultados
                    const resultado = compararAlternativas(montoComparativa, alternativasActivas, plazoComparativa, inflacionComparativa);
                    
                    // Mostrar resultados
                    mostrarResultadosComparativa(resultado, alternativasActivas);
                    
                    // Mostrar sección de resultados
                    document.getElementById('resultado-comparativa').classList.remove('hidden');
                } catch (error) {
                    console.error("Error al comparar alternativas:", error);
                    mostrarMensaje("Ha ocurrido un error al comparar alternativas", "error");
                }
            });
        }
        
        /**
         * Calcula el rendimiento del portafolio de inversión
         * @param {number} capital - Capital a invertir
         * @param {Object} portafolio - Composición del portafolio
         * @param {number} plazo - Plazo en años
         * @param {number} inflacion - Inflación anual en porcentaje
         * @returns {Object} Resultados del rendimiento
         */
        function calcularRendimientoPortafolio(capital, portafolio, plazo, inflacion) {
            // Calcular rendimiento ponderado
            let rendimientoPonderado = 0;
            
            for (const tipo in portafolio) {
                if (portafolio.hasOwnProperty(tipo)) {
                    rendimientoPonderado += (portafolio[tipo].porcentaje / 100) * portafolio[tipo].rendimiento;
                }
            }
            
            // Calcular rendimiento real (descontando inflación)
            const rendimientoReal = ((1 + rendimientoPonderado / 100) / (1 + inflacion / 100) - 1) * 100;
            
            // Calcular valor futuro
            const valorFuturo = capital * Math.pow(1 + rendimientoPonderado / 100, plazo);
            const valorRealFuturo = capital * Math.pow(1 + rendimientoReal / 100, plazo);
            
            // Calcular evolución anual
            const evolucionAnual = [];
            const evolucionRealAnual = [];
            
            for (let anio = 1; anio <= plazo; anio++) {
                evolucionAnual.push(capital * Math.pow(1 + rendimientoPonderado / 100, anio));
                evolucionRealAnual.push(capital * Math.pow(1 + rendimientoReal / 100, anio));
            }
            
            // Calcular nivel de riesgo (simplificado)
            // Basado en ponderación de activos de riesgo (renta variable y alternativas)
            const pesoActivosRiesgo = (portafolio.rentaVariable.porcentaje + portafolio.alternativas.porcentaje) / 100;
            
            // Nivel de riesgo en escala 0-100
            const nivelRiesgo = Math.min(100, Math.max(0, pesoActivosRiesgo * 100));
            
            // Categorizar riesgo
            let categoriaRiesgo = '';
            if (nivelRiesgo < 30) categoriaRiesgo = 'bajo';
            else if (nivelRiesgo < 60) categoriaRiesgo = 'moderado';
            else categoriaRiesgo = 'alto';
            
            return {
                rendimientoPonderado,
                rendimientoReal,
                valorFuturo,
                valorRealFuturo,
                evolucionAnual,
                evolucionRealAnual,
                nivelRiesgo,
                categoriaRiesgo
            };
        }
        
        /**
         * Muestra los resultados del portafolio de inversión
         * @param {Object} resultado - Resultados del cálculo
         * @param {Object} portafolio - Composición del portafolio
         */
        function mostrarResultadosInversion(resultado, portafolio) {
            // Formatear valores para mostrar
            const formatoMoneda = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
            
            const formatoPorcentaje = new Intl.NumberFormat('es-CO', {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            
            // Actualizar tarjetas de resumen
            document.getElementById('rendimiento-promedio').textContent = formatoPorcentaje.format(resultado.rendimientoPonderado / 100);
            document.getElementById('valor-final').textContent = formatoMoneda.format(resultado.valorFuturo);
            document.getElementById('crecimiento-real').textContent = formatoPorcentaje.format(resultado.rendimientoReal / 100);
            
            // Actualizar medidor de riesgo
            const riskIndicator = document.getElementById('risk-indicator');
            riskIndicator.style.width = `${resultado.nivelRiesgo}%`;
            
            // Cambiar color según nivel de riesgo
            if (resultado.categoriaRiesgo === 'bajo') {
                riskIndicator.style.backgroundColor = '#2ecc71';
            } else if (resultado.categoriaRiesgo === 'moderado') {
                riskIndicator.style.backgroundColor = '#f39c12';
            } else {
                riskIndicator.style.backgroundColor = '#e74c3c';
            }
            
            // Actualizar descripción de riesgo
            let riskDescription = '';
            if (resultado.categoriaRiesgo === 'bajo') {
                riskDescription = `Tu portafolio tiene un nivel de riesgo bajo con un rendimiento esperado del ${formatoPorcentaje.format(resultado.rendimientoPonderado / 100)} anual. Adecuado para perfiles conservadores.`;
            } else if (resultado.categoriaRiesgo === 'moderado') {
                riskDescription = `Tu portafolio tiene un nivel de riesgo moderado con un rendimiento esperado del ${formatoPorcentaje.format(resultado.rendimientoPonderado / 100)} anual. Equilibra crecimiento y seguridad.`;
            } else {
                riskDescription = `Tu portafolio tiene un nivel de riesgo alto con un rendimiento esperado del ${formatoPorcentaje.format(resultado.rendimientoPonderado / 100)} anual. Orientado al máximo crecimiento pero con mayor volatilidad.`;
            }
            
            document.getElementById('risk-description').textContent = riskDescription;
            
            // Generar gráficos
            if (typeof Chart !== 'undefined') {
                try {
                    generarGraficoPortafolio(portafolio);
                    generarGraficoCrecimiento(resultado);
                } catch (error) {
                    console.error("Error al generar gráficos:", error);
                }
            } else {
                console.warn("Chart.js no está disponible. No se generarán los gráficos.");
            }
        }
        
        /**
         * Genera el gráfico de composición del portafolio
         * @param {Object} portafolio - Composición del portafolio
         */
        function generarGraficoPortafolio(portafolio) {
            const canvas = document.getElementById('chart-portfolio-allocation');
            if (!canvas) return;
            
            const ctx = canvas.getContext('2d');
            
            // Destruir gráfico existente si hay uno
            if (canvas.chart) {
                canvas.chart.destroy();
            }
            
            // Preparar datos
            const labels = [];
            const data = [];
            const backgroundColors = [];
            
            // Colores para cada tipo de activo
            const colores = {
                rentaFija: 'rgba(54, 162, 235, 0.8)',
                rentaVariable: 'rgba(255, 99, 132, 0.8)',
                inmobiliario: 'rgba(255, 206, 86, 0.8)',
                alternativas: 'rgba(75, 192, 192, 0.8)'
            };
            
            // Nombres legibles
            const nombres = {
                rentaFija: 'Renta Fija',
                rentaVariable: 'Renta Variable',
                inmobiliario: 'Inmobiliario',
                alternativas: 'Alternativas'
            };
            
            // Llenar datos
            for (const tipo in portafolio) {
                if (portafolio.hasOwnProperty(tipo) && portafolio[tipo].porcentaje > 0) {
                    labels.push(`${nombres[tipo]} (${portafolio[tipo].porcentaje}%)`);
                    data.push(portafolio[tipo].porcentaje);
                    backgroundColors.push(colores[tipo]);
                }
            }
            
            // Crear gráfico
            canvas.chart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: labels,
                    datasets: [{
                        data: data,
                        backgroundColor: backgroundColors,
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Distribución del Portafolio',
                            font: {
                                size: 16
                            }
                        },
                        legend: {
                            position: 'bottom'
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const label = context.label || '';
                                    const value = context.parsed || 0;
                                    return `${label}: ${value}%`;
                                }
                            }
                        }
                    }
                }
            });
        }
        
        /**
         * Genera el gráfico de crecimiento del portafolio
         * @param {Object} resultado - Resultados del cálculo
         */
        function generarGraficoCrecimiento(resultado) {
            const canvas = document.getElementById('chart-portfolio-growth');
            if (!canvas) return;
            
            const ctx = canvas.getContext('2d');
            
            // Destruir gráfico existente si hay uno
            if (canvas.chart) {
                canvas.chart.destroy();
            }
            
            // Preparar etiquetas de años
            const labels = Array.from({length: resultado.evolucionAnual.length}, (_, i) => i + 1);
            
            // Crear gráfico
            canvas.chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Valor Nominal',
                            data: resultado.evolucionAnual,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 2,
                            fill: true
                        },
                        {
                            label: 'Valor Real',
                            data: resultado.evolucionRealAnual,
                            backgroundColor: 'rgba(255, 159, 64, 0.2)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 2,
                            borderDash: [5, 5],
                            fill: false
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Proyección de Crecimiento',
                            font: {
                                size: 16
                            }
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                            callbacks: {
                                label: function(context) {
                                    return context.dataset.label + ': ' + formatoMilesComa(context.parsed.y);
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return formatoMilesComa(value);
                                }
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Años'
                            }
                        }
                    }
                }
            });
        }
        
        /**
         * Compara diferentes alternativas de inversión
         * @param {number} monto - Monto a invertir
         * @param {Array} alternativas - Alternativas a comparar
         * @param {number} plazo - Plazo en años
         * @param {number} inflacion - Inflación anual
         * @returns {Array} Resultados de la comparación
         */
        function compararAlternativas(monto, alternativas, plazo, inflacion) {
            const resultados = [];
            
            alternativas.forEach(alt => {
                // Calcular rendimiento real
                const rendimientoReal = ((1 + alt.rendimiento / 100) / (1 + inflacion / 100) - 1) * 100;
                
                // Calcular valor futuro
                const valorFuturo = monto * Math.pow(1 + alt.rendimiento / 100, plazo);
                const valorRealFuturo = monto * Math.pow(1 + rendimientoReal / 100, plazo);
                
                // Calcular evolución anual
                const evolucionAnual = [];
                
                for (let anio = 1; anio <= plazo; anio++) {
                    evolucionAnual.push(monto * Math.pow(1 + alt.rendimiento / 100, anio));
                }
                
                resultados.push({
                    nombre: alt.nombre,
                    rendimiento: alt.rendimiento,
                    rendimientoReal,
                    valorFuturo,
                    valorRealFuturo,
                    evolucionAnual,
                    color: alt.color
                });
            });
            
            // Ordenar por rendimiento de mayor a menor
            resultados.sort((a, b) => b.rendimiento - a.rendimiento);
            
            return resultados;
        }
        
        /**
         * Muestra los resultados de la comparativa de alternativas
         * @param {Array} resultados - Resultados de la comparación
         * @param {Array} alternativas - Alternativas comparadas
         */
        function mostrarResultadosComparativa(resultados, alternativas) {
            // Formatear valores para mostrar
            const formatoMoneda = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
            
            const formatoPorcentaje = new Intl.NumberFormat('es-CO', {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            
            // Llenar tabla comparativa
            const tablaComparativa = document.getElementById('tabla-comparativa');
            tablaComparativa.innerHTML = '';
            
            resultados.forEach(res => {
                const fila = document.createElement('tr');
                
                // Aplicar estilo destacado a la mejor alternativa
                if (res === resultados[0]) {
                    fila.className = 'best-option';
                }
                
                fila.innerHTML = `
                    <td>${res.nombre}</td>
                    <td>${formatoPorcentaje.format(res.rendimiento / 100)}</td>
                    <td>${formatoPorcentaje.format(res.rendimientoReal / 100)}</td>
                    <td>${formatoMoneda.format(res.valorFuturo)}</td>
                    <td>${formatoMoneda.format(res.valorRealFuturo)}</td>
                `;
                
                tablaComparativa.appendChild(fila);
            });
            
            // Generar conclusión
            const mejorAlternativa = resultados[0];
            const conclusion = `Basado en las proyecciones, la alternativa con mayor rentabilidad sería ${mejorAlternativa.nombre} con un valor final de ${formatoMoneda.format(mejorAlternativa.valorFuturo)} (rendimiento anual del ${formatoPorcentaje.format(mejorAlternativa.rendimiento / 100)}). En términos de valor real ajustado por inflación, terminará con ${formatoMoneda.format(mejorAlternativa.valorRealFuturo)}.`;
            
            document.getElementById('conclusion-comparativa').textContent = conclusion;
            
            // Generar gráfico comparativo
            if (typeof Chart !== 'undefined') {
                try {
                    generarGraficoComparativa(resultados);
                } catch (error) {
                    console.error("Error al generar gráfico comparativo:", error);
                }
            } else {
                console.warn("Chart.js no está disponible. No se generará el gráfico.");
            }
        }
        
        /**
         * Genera el gráfico comparativo de alternativas
         * @param {Array} resultados - Resultados de la comparación
         */
        function generarGraficoComparativa(resultados) {
            const canvas = document.getElementById('chart-comparativa');
            if (!canvas) return;
            
            const ctx = canvas.getContext('2d');
            
            // Destruir gráfico existente si hay uno
            if (canvas.chart) {
                canvas.chart.destroy();
            }
            
            // Preparar etiquetas de años
            const plazo = resultados[0].evolucionAnual.length;
            const labels = Array.from({length: plazo}, (_, i) => i + 1);
            
            // Preparar datasets
            const datasets = resultados.map(res => {
                return {
                    label: res.nombre,
                    data: res.evolucionAnual,
                    backgroundColor: res.color + '20', // Transparencia
                    borderColor: res.color,
                    borderWidth: 2,
                    fill: false
                };
            });
            
            // Crear gráfico
            canvas.chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Comparativa de Crecimiento',
                            font: {
                                size: 16
                            }
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                            callbacks: {
                                label: function(context) {
                                    return context.dataset.label + ': ' + formatoMilesComa(context.parsed.y);
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return formatoMilesComa(value);
                                }
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Años'
                            }
                        }
                    }
                }
            });
        }
        
        /**
         * Calcula la proyección de ahorro
         */
        function calcularProyeccionAhorro(ahorroInicial, aporteMensual, plazoAnios, rendimientoAnual, inflacionAnual) {
            // Prevenir NaN o valores inválidos
            ahorroInicial = ahorroInicial || 0;
            aporteMensual = aporteMensual || 0;
            plazoAnios = plazoAnios || 5;
            rendimientoAnual = rendimientoAnual || 4.5;
            inflacionAnual = inflacionAnual || 3.2;
            
            const rendimientoMensual = Math.pow(1 + rendimientoAnual / 100, 1/12) - 1;
            const inflacionMensual = Math.pow(1 + inflacionAnual / 100, 1/12) - 1;
            const meses = plazoAnios * 12;
            
            // Arreglos para almacenar la evolución del ahorro
            const saldosPorAnio = [];
            const aportesPorAnio = [];
            const interesesPorAnio = [];
            const valoresRealesPorAnio = [];
            
            // Variables para seguimiento
            let saldoActual = ahorroInicial;
            let aportesAcumulados = ahorroInicial;
            let interesesAcumulados = 0;
            let valorReal = ahorroInicial;
            
            // Calcular evolución mes a mes
            for (let mes = 1; mes <= meses; mes++) {
                // Calcular interés del mes
                const interesMes = saldoActual * rendimientoMensual;
                interesesAcumulados += interesMes;
                
                // Agregar aporte mensual
                saldoActual += interesMes + aporteMensual;
                aportesAcumulados += aporteMensual;
                
                // Calcular valor real ajustado por inflación
                valorReal = saldoActual / Math.pow(1 + inflacionMensual, mes);
                
                // Guardar datos por año
                if (mes % 12 === 0) {
                    const anio = mes / 12;
                    saldosPorAnio.push(saldoActual);
                    aportesPorAnio.push(aportesAcumulados);
                    interesesPorAnio.push(interesesAcumulados);
                    valoresRealesPorAnio.push(valorReal);
                }
            }
            
            return {
                saldoFinal: saldoActual,
                aportesTotal: aportesAcumulados,
                interesesTotal: interesesAcumulados,
                valorRealFinal: valorReal,
                proyeccionAnual: {
                    anios: Array.from({length: plazoAnios}, (_, i) => i + 1),
                    saldos: saldosPorAnio,
                    aportes: aportesPorAnio,
                    intereses: interesesPorAnio,
                    valoresReales: valoresRealesPorAnio
                }
            };
        }
        
        /**
         * Muestra los resultados de la proyección de ahorro
         */
        function mostrarResultadosAhorro(resultado, modal) {
            // Formatear valores para mostrar
            const formatoMoneda = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
            
            // Actualizar tarjetas de resumen
            modal.querySelector('#ahorro-total').textContent = formatoMoneda.format(resultado.saldoFinal);
            modal.querySelector('#intereses-ganados').textContent = formatoMoneda.format(resultado.interesesTotal);
            modal.querySelector('#valor-real').textContent = formatoMoneda.format(resultado.valorRealFinal);
            
            // Llenar tabla de proyección
            const tablaProyeccion = modal.querySelector('#tabla-proyeccion');
            tablaProyeccion.innerHTML = '';
            
            resultado.proyeccionAnual.anios.forEach((anio, index) => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${anio}</td>
                    <td>${formatoMoneda.format(resultado.proyeccionAnual.aportes[index])}</td>
                    <td>${formatoMoneda.format(resultado.proyeccionAnual.intereses[index])}</td>
                    <td>${formatoMoneda.format(resultado.proyeccionAnual.saldos[index])}</td>
                    <td>${formatoMoneda.format(resultado.proyeccionAnual.valoresReales[index])}</td>
                `;
                tablaProyeccion.appendChild(fila);
            });
            
            // Solo intentar generar el gráfico si Chart está disponible
            if (typeof Chart !== 'undefined') {
                try {
                    generarGraficoAhorro(resultado, modal);
                } catch (error) {
                    console.error("Error al generar gráfico:", error);
                }
            } else {
                console.warn("Chart.js no está disponible. No se generará el gráfico.");
                // Ocultar contenedor del gráfico si no podemos generarlo
                const chartContainer = modal.querySelector('.chart-container');
                if (chartContainer) {
                    chartContainer.style.display = 'none';
                }
            }
        }
        
        /**
         * Genera el gráfico de proyección de ahorro
         */
        function generarGraficoAhorro(resultado, modal) {
            const canvas = modal.querySelector('#chart-ahorro');
            if (!canvas) return;
            
            const ctx = canvas.getContext('2d');
            
            // Destruir gráfico existente si hay uno
            if (canvas.chart) {
                canvas.chart.destroy();
            }
            
            // Crear nuevo gráfico
            canvas.chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: resultado.proyeccionAnual.anios,
                    datasets: [
                        {
                            label: 'Aportes',
                            data: resultado.proyeccionAnual.aportes,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 2,
                            fill: true
                        },
                        {
                            label: 'Saldo Total',
                            data: resultado.proyeccionAnual.saldos,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 2,
                            fill: true
                        },
                        {
                            label: 'Valor Real',
                            data: resultado.proyeccionAnual.valoresReales,
                            backgroundColor: 'rgba(255, 159, 64, 0.2)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 2,
                            borderDash: [5, 5],
                            fill: false
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Proyección de Ahorro',
                            font: {
                                size: 16
                            }
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                            callbacks: {
                                label: function(context) {
                                    return context.dataset.label + ': ' + formatoMilesComa(context.parsed.y);
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return formatoMilesComa(value);
                                }
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Años'
                            }
                        }
                    }
                }
            });
        }
        
        /**
         * Formatea un número con comas como separadores de miles
         */
        function formatoMilesComa(valor) {
            return new Intl.NumberFormat('es-CO', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(valor);
        }
        
        /**
         * Muestra un mensaje al usuario
         */
        function mostrarMensaje(mensaje, tipo) {
            // Usar la función global si existe
            if (typeof window.mostrarToast === 'function') {
                window.mostrarToast(mensaje, tipo);
            } else if (typeof window.mostrarMensaje === 'function') {
                window.mostrarMensaje(mensaje, tipo);
            } else {
                // Implementación básica
                alert(mensaje);
            }
        }
    });
})();