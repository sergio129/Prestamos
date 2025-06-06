/**
 * Simulador de Pagos Anticipados Avanzado para Sistema de Préstamos
 * Permite a los usuarios simular diferentes estrategias de pagos anticipados
 * para ver el impacto en el plazo, cuota y ahorro total de intereses.
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando simulador de pagos anticipados avanzado...');
    
    // Crear botón para acceder al simulador
    const pagosAnticipadosBtn = document.createElement('button');
    pagosAnticipadosBtn.className = 'btn btn-pagos-anticipados';
    pagosAnticipadosBtn.innerHTML = '<i class="fas fa-money-bill-wave"></i> Pagos Anticipados';
    pagosAnticipadosBtn.title = 'Simular estrategias de pagos anticipados';
    pagosAnticipadosBtn.style.marginTop = '10px';
    
    // Añadir botón después de los botones existentes en la sección de resultados
    const btnGroup = document.querySelector('.buttons-group');
    if (btnGroup) {
        btnGroup.appendChild(pagosAnticipadosBtn);
    }
    
    // Crear modal para el simulador de pagos anticipados
    const pagosAnticipadosModal = document.createElement('div');
    pagosAnticipadosModal.id = 'pagos-anticipados-modal';
    pagosAnticipadosModal.className = 'modal hidden';
    pagosAnticipadosModal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2><i class="fas fa-money-bill-wave"></i> Simulador de Pagos Anticipados</h2>
            
            <div class="prestamo-actual-info">
                <h3>Préstamo Actual</h3>
                <div class="prestamo-details">
                    <div class="prestamo-detail">
                        <span>Monto:</span>
                        <span id="pa-monto-actual">$0</span>
                    </div>
                    <div class="prestamo-detail">
                        <span>Plazo:</span>
                        <span id="pa-plazo-actual">0 meses</span>
                    </div>
                    <div class="prestamo-detail">
                        <span>Tasa Mensual:</span>
                        <span id="pa-tasa-actual">0%</span>
                    </div>
                    <div class="prestamo-detail">
                        <span>Cuota Mensual:</span>
                        <span id="pa-cuota-actual">$0</span>
                    </div>
                    <div class="prestamo-detail">
                        <span>Total Intereses:</span>
                        <span id="pa-intereses-actual">$0</span>
                    </div>
                </div>
            </div>
            
            <div class="estrategias-container">
                <h3>Estrategias de Pagos Anticipados</h3>
                
                <div class="tabs estrategias-tabs">
                    <div class="tab active" data-tab="mensual">Pago Extra Mensual</div>
                    <div class="tab" data-tab="trimestral">Pago Trimestral</div>
                    <div class="tab" data-tab="unico">Pago Único</div>
                    <div class="tab" data-tab="personalizado">Personalizado</div>
                </div>
                
                <div class="tab-content" id="tab-mensual">
                    <p>Simula realizar un pago extra adicional cada mes.</p>
                    <div class="form-group">
                        <label for="pago-extra-mensual">Monto extra mensual (COP):</label>
                        <div class="input-icon">
                            <span class="currency-symbol">$</span>
                            <input type="number" id="pago-extra-mensual" min="10000" step="10000" value="100000">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="destino-mensual">Aplicar a:</label>
                        <select id="destino-mensual">
                            <option value="reducir-plazo" selected>Reducir plazo (misma cuota)</option>
                            <option value="reducir-cuota">Reducir cuota (mismo plazo)</option>
                        </select>
                    </div>
                    <button id="simular-mensual" class="btn">Calcular Ahorro</button>
                </div>
                
                <div class="tab-content hidden" id="tab-trimestral">
                    <p>Simula realizar un pago extra cada tres meses.</p>
                    <div class="form-group">
                        <label for="pago-extra-trimestral">Monto extra trimestral (COP):</label>
                        <div class="input-icon">
                            <span class="currency-symbol">$</span>
                            <input type="number" id="pago-extra-trimestral" min="50000" step="50000" value="500000">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="destino-trimestral">Aplicar a:</label>
                        <select id="destino-trimestral">
                            <option value="reducir-plazo" selected>Reducir plazo (misma cuota)</option>
                            <option value="reducir-cuota">Reducir cuota (mismo plazo)</option>
                        </select>
                    </div>
                    <button id="simular-trimestral" class="btn">Calcular Ahorro</button>
                </div>
                
                <div class="tab-content hidden" id="tab-unico">
                    <p>Simula realizar un único pago extra significativo.</p>
                    <div class="form-group">
                        <label for="pago-extra-unico">Monto único (COP):</label>
                        <div class="input-icon">
                            <span class="currency-symbol">$</span>
                            <input type="number" id="pago-extra-unico" min="100000" step="100000" value="1000000">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="mes-pago-unico">Cuota donde aplicar:</label>
                        <input type="number" id="mes-pago-unico" min="1" max="120" value="6">
                        <span class="hint">Número de cuota donde aplicar el pago extra</span>
                    </div>
                    <div class="form-group">
                        <label for="destino-unico">Aplicar a:</label>
                        <select id="destino-unico">
                            <option value="reducir-plazo" selected>Reducir plazo (misma cuota)</option>
                            <option value="reducir-cuota">Reducir cuota (mismo plazo)</option>
                        </select>
                    </div>
                    <button id="simular-unico" class="btn">Calcular Ahorro</button>
                </div>
                
                <div class="tab-content hidden" id="tab-personalizado">
                    <p>Define tu propia estrategia personalizada de pagos anticipados.</p>
                    <div id="pagos-personalizados-container">
                        <div class="pago-personalizado">
                            <div class="form-group">
                                <label>Cuota:</label>
                                <input type="number" class="mes-pago" min="1" max="120" value="6">
                            </div>
                            <div class="form-group">
                                <label>Monto (COP):</label>
                                <div class="input-icon">
                                    <span class="currency-symbol">$</span>
                                    <input type="number" class="monto-pago" min="50000" step="50000" value="500000">
                                </div>
                            </div>
                            <button class="btn-eliminar-pago"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                    <button id="agregar-pago" class="btn btn-small"><i class="fas fa-plus"></i> Añadir pago</button>
                    
                    <div class="form-group" style="margin-top: 20px;">
                        <label for="destino-personalizado">Aplicar a:</label>
                        <select id="destino-personalizado">
                            <option value="reducir-plazo" selected>Reducir plazo (misma cuota)</option>
                            <option value="reducir-cuota">Reducir cuota (mismo plazo)</option>
                        </select>
                    </div>
                    <button id="simular-personalizado" class="btn">Calcular Ahorro</button>
                </div>
            </div>
            
            <div id="resultados-pagos-anticipados" class="hidden">
                <h3>Resultados de la Simulación</h3>
                
                <div class="comparacion-container">
                    <div class="comparacion-item original">
                        <h4>Préstamo Original</h4>
                        <div class="comparacion-detail">
                            <span>Plazo:</span>
                            <span id="comp-plazo-original">0 meses</span>
                        </div>
                        <div class="comparacion-detail">
                            <span>Cuota Mensual:</span>
                            <span id="comp-cuota-original">$0</span>
                        </div>
                        <div class="comparacion-detail">
                            <span>Total a Pagar:</span>
                            <span id="comp-total-original">$0</span>
                        </div>
                        <div class="comparacion-detail">
                            <span>Total Intereses:</span>
                            <span id="comp-intereses-original">$0</span>
                        </div>
                    </div>
                    
                    <div class="comparacion-item con-pagos">
                        <h4>Con Pagos Anticipados</h4>
                        <div class="comparacion-detail">
                            <span>Plazo:</span>
                            <span id="comp-plazo-pagos">0 meses</span>
                        </div>
                        <div class="comparacion-detail">
                            <span>Cuota Mensual:</span>
                            <span id="comp-cuota-pagos">$0</span>
                        </div>
                        <div class="comparacion-detail">
                            <span>Total a Pagar:</span>
                            <span id="comp-total-pagos">$0</span>
                        </div>
                        <div class="comparacion-detail">
                            <span>Total Intereses:</span>
                            <span id="comp-intereses-pagos">$0</span>
                        </div>
                    </div>
                    
                    <div class="comparacion-item ahorro">
                        <h4>Ahorro</h4>
                        <div class="comparacion-detail">
                            <span>Tiempo:</span>
                            <span id="ahorro-plazo">0 meses</span>
                        </div>
                        <div class="comparacion-detail">
                            <span>En Cuota:</span>
                            <span id="ahorro-cuota">$0</span>
                        </div>
                        <div class="comparacion-detail">
                            <span>Total:</span>
                            <span id="ahorro-total">$0</span>
                        </div>
                        <div class="comparacion-detail">
                            <span>En Intereses:</span>
                            <span id="ahorro-intereses">$0</span>
                        </div>
                    </div>
                </div>
                
                <div class="grafico-container">
                    <canvas id="grafico-comparativo"></canvas>
                </div>
                
                <div class="amortizacion-tabs">
                    <button class="btn btn-tab active" data-tab="original">Tabla Original</button>
                    <button class="btn btn-tab" data-tab="anticipado">Tabla con Pagos Anticipados</button>
                </div>
                
                <div class="tabla-amortizacion-container" id="tab-amortizacion-original">
                    <div class="table-responsive">
                        <table class="amortizacion-table">
                            <thead>
                                <tr>
                                    <th>Cuota</th>
                                    <th>Cuota Mensual</th>
                                    <th>Capital</th>
                                    <th>Intereses</th>
                                    <th>Saldo Restante</th>
                                </tr>
                            </thead>
                            <tbody id="tabla-amortizacion-original">
                                <!-- Generado dinámicamente -->
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div class="tabla-amortizacion-container hidden" id="tab-amortizacion-anticipado">
                    <div class="table-responsive">
                        <table class="amortizacion-table">
                            <thead>
                                <tr>
                                    <th>Cuota</th>
                                    <th>Cuota Mensual</th>
                                    <th>Capital</th>
                                    <th>Intereses</th>
                                    <th>Pago Extra</th>
                                    <th>Saldo Restante</th>
                                </tr>
                            </thead>
                            <tbody id="tabla-amortizacion-anticipado">
                                <!-- Generado dinámicamente -->
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div class="aplicar-btn-container">
                    <button id="aplicar-a-simulador" class="btn btn-save">
                        <i class="fas fa-check-circle"></i> Aplicar al Simulador
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Añadir modal al DOM
    document.body.appendChild(pagosAnticipadosModal);
    
    // Obtener referencias a elementos importantes
    const closeModal = pagosAnticipadosModal.querySelector('.close-modal');
    const estrategiasTabs = pagosAnticipadosModal.querySelectorAll('.estrategias-tabs .tab');
    const tabContents = pagosAnticipadosModal.querySelectorAll('.tab-content');
    const amortizacionTabs = pagosAnticipadosModal.querySelectorAll('.amortizacion-tabs .btn-tab');
    const amortizacionTabContents = pagosAnticipadosModal.querySelectorAll('.tabla-amortizacion-container');
    const agregarPagoBtn = document.getElementById('agregar-pago');
    const pagosPersonalizadosContainer = document.getElementById('pagos-personalizados-container');
    
    // Botones de simulación
    const simularMensualBtn = document.getElementById('simular-mensual');
    const simularTrimestralBtn = document.getElementById('simular-trimestral');
    const simularUnicoBtn = document.getElementById('simular-unico');
    const simularPersonalizadoBtn = document.getElementById('simular-personalizado');
    const aplicarSimuladorBtn = document.getElementById('aplicar-a-simulador');
    
    // Configurar eventos
    pagosAnticipadosBtn.addEventListener('click', function() {
        // Cargar datos del préstamo actual
        const prestamo = obtenerDatosPrestamo();
        if (!prestamo.monto || !prestamo.plazo || !prestamo.interesMensual) {
            // No hay un préstamo calculado
            if (typeof window.mostrarToast === 'function') {
                window.mostrarToast("Primero debes calcular un préstamo", "warning");
            } else {
                alert("Primero debes calcular un préstamo");
            }
            return;
        }
        
        // Actualizar información del préstamo en el modal
        actualizarInfoPrestamo(prestamo);
        
        // Mostrar modal
        pagosAnticipadosModal.classList.remove('hidden');
        
        // Ocultar sección de resultados si estaba visible
        document.getElementById('resultados-pagos-anticipados').classList.add('hidden');
    });
    
    // Cerrar modal con el botón X
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            pagosAnticipadosModal.classList.add('hidden');
        });
    }
    
    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', function(event) {
        if (event.target === pagosAnticipadosModal) {
            pagosAnticipadosModal.classList.add('hidden');
        }
    });
    
    // Cambiar entre tabs de estrategias
    estrategiasTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Desactivar todas las tabs
            estrategiasTabs.forEach(t => t.classList.remove('active'));
            
            // Ocultar todos los contenidos
            tabContents.forEach(content => content.classList.add('hidden'));
            
            // Activar tab seleccionada
            this.classList.add('active');
            
            // Mostrar contenido correspondiente
            const tabId = 'tab-' + this.getAttribute('data-tab');
            document.getElementById(tabId).classList.remove('hidden');
        });
    });
    
    // Cambiar entre tabs de amortización
    amortizacionTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Desactivar todas las tabs
            amortizacionTabs.forEach(t => t.classList.remove('active'));
            
            // Ocultar todos los contenidos
            amortizacionTabContents.forEach(content => content.classList.add('hidden'));
            
            // Activar tab seleccionada
            this.classList.add('active');
            
            // Mostrar contenido correspondiente
            const tabId = 'tab-amortizacion-' + this.getAttribute('data-tab');
            document.getElementById(tabId).classList.remove('hidden');
        });
    });
    
    // Agregar pago personalizado
    if (agregarPagoBtn) {
        agregarPagoBtn.addEventListener('click', function() {
            const nuevoPago = document.createElement('div');
            nuevoPago.className = 'pago-personalizado';
            nuevoPago.innerHTML = `
                <div class="form-group">
                    <label>Cuota:</label>
                    <input type="number" class="mes-pago" min="1" max="120" value="12">
                </div>
                <div class="form-group">
                    <label>Monto (COP):</label>
                    <div class="input-icon">
                        <span class="currency-symbol">$</span>
                        <input type="number" class="monto-pago" min="50000" step="50000" value="500000">
                    </div>
                </div>
                <button class="btn-eliminar-pago"><i class="fas fa-trash"></i></button>
            `;
            
            pagosPersonalizadosContainer.appendChild(nuevoPago);
            
            // Configurar botón de eliminar
            const btnEliminar = nuevoPago.querySelector('.btn-eliminar-pago');
            btnEliminar.addEventListener('click', function() {
                nuevoPago.remove();
            });
        });
    }
    
    // Configurar botón de eliminar para el primer pago personalizado (el que viene por defecto)
    const btnEliminarInicial = pagosPersonalizadosContainer.querySelector('.btn-eliminar-pago');
    if (btnEliminarInicial) {
        btnEliminarInicial.addEventListener('click', function() {
            this.closest('.pago-personalizado').remove();
        });
    }
    
    // Simular estrategia de pago mensual
    if (simularMensualBtn) {
        simularMensualBtn.addEventListener('click', function() {
            const prestamo = obtenerDatosPrestamo();
            const pagoExtra = parseFloat(document.getElementById('pago-extra-mensual').value) || 0;
            const destino = document.getElementById('destino-mensual').value;
            
            if (pagoExtra <= 0) {
                if (typeof window.mostrarToast === 'function') {
                    window.mostrarToast("Ingresa un monto válido para el pago extra", "warning");
                }
                return;
            }
            
            const resultado = simularPagosMensuales(prestamo, pagoExtra, destino);
            mostrarResultadosSimulacion(prestamo, resultado);
        });
    }
    
    // Simular estrategia de pago trimestral
    if (simularTrimestralBtn) {
        simularTrimestralBtn.addEventListener('click', function() {
            const prestamo = obtenerDatosPrestamo();
            const pagoExtra = parseFloat(document.getElementById('pago-extra-trimestral').value) || 0;
            const destino = document.getElementById('destino-trimestral').value;
            
            if (pagoExtra <= 0) {
                if (typeof window.mostrarToast === 'function') {
                    window.mostrarToast("Ingresa un monto válido para el pago extra", "warning");
                }
                return;
            }
            
            const resultado = simularPagosTrimestales(prestamo, pagoExtra, destino);
            mostrarResultadosSimulacion(prestamo, resultado);
        });
    }
    
    // Simular estrategia de pago único
    if (simularUnicoBtn) {
        simularUnicoBtn.addEventListener('click', function() {
            const prestamo = obtenerDatosPrestamo();
            const pagoExtra = parseFloat(document.getElementById('pago-extra-unico').value) || 0;
            const mesPago = parseInt(document.getElementById('mes-pago-unico').value) || 1;
            const destino = document.getElementById('destino-unico').value;
            
            if (pagoExtra <= 0) {
                if (typeof window.mostrarToast === 'function') {
                    window.mostrarToast("Ingresa un monto válido para el pago extra", "warning");
                }
                return;
            }
            
            if (mesPago <= 0 || mesPago > prestamo.plazo) {
                if (typeof window.mostrarToast === 'function') {
                    window.mostrarToast(`El mes debe estar entre 1 y ${prestamo.plazo}`, "warning");
                }
                return;
            }
            
            const pagos = [{
                mes: mesPago,
                monto: pagoExtra
            }];
            
            const resultado = simularPagosPersonalizados(prestamo, pagos, destino);
            mostrarResultadosSimulacion(prestamo, resultado);
        });
    }
    
    // Simular estrategia personalizada
    if (simularPersonalizadoBtn) {
        simularPersonalizadoBtn.addEventListener('click', function() {
            const prestamo = obtenerDatosPrestamo();
            const pagosInputs = document.querySelectorAll('.pago-personalizado');
            const destino = document.getElementById('destino-personalizado').value;
            
            if (pagosInputs.length === 0) {
                if (typeof window.mostrarToast === 'function') {
                    window.mostrarToast("Debes agregar al menos un pago extra", "warning");
                }
                return;
            }
            
            const pagos = [];
            let valido = true;
            
            pagosInputs.forEach(pagoInput => {
                const mes = parseInt(pagoInput.querySelector('.mes-pago').value) || 0;
                const monto = parseFloat(pagoInput.querySelector('.monto-pago').value) || 0;
                
                if (mes <= 0 || mes > prestamo.plazo) {
                    if (typeof window.mostrarToast === 'function') {
                        window.mostrarToast(`El mes debe estar entre 1 y ${prestamo.plazo}`, "warning");
                    }
                    valido = false;
                    return;
                }
                
                if (monto <= 0) {
                    if (typeof window.mostrarToast === 'function') {
                        window.mostrarToast("Todos los montos deben ser mayores a cero", "warning");
                    }
                    valido = false;
                    return;
                }
                
                pagos.push({
                    mes: mes,
                    monto: monto
                });
            });
            
            if (!valido) return;
            
            // Ordenar pagos por mes
            pagos.sort((a, b) => a.mes - b.mes);
            
            const resultado = simularPagosPersonalizados(prestamo, pagos, destino);
            mostrarResultadosSimulacion(prestamo, resultado);
        });
    }
    
    // Aplicar simulación al simulador principal
    if (aplicarSimuladorBtn) {
        aplicarSimuladorBtn.addEventListener('click', function() {
            const montoInput = document.getElementById('monto');
            const plazoInput = document.getElementById('plazo');
            
            if (!montoInput || !plazoInput) {
                if (typeof window.mostrarToast === 'function') {
                    window.mostrarToast("No se puede aplicar al simulador", "error");
                }
                return;
            }
            
            // Obtener valores del préstamo con pagos anticipados
            const plazoNuevo = parseInt(document.getElementById('comp-plazo-pagos').textContent) || 0;
            
            if (plazoNuevo <= 0) {
                if (typeof window.mostrarToast === 'function') {
                    window.mostrarToast("No hay una simulación válida para aplicar", "warning");
                }
                return;
            }
            
            // Actualizar formulario principal
            plazoInput.value = plazoNuevo;
            
            // Cerrar modal
            pagosAnticipadosModal.classList.add('hidden');
            
            // Calcular préstamo
            if (typeof window.calcularPrestamo === 'function') {
                window.calcularPrestamo();
                
                if (typeof window.mostrarToast === 'function') {
                    window.mostrarToast("Plazo actualizado con base en la simulación de pagos anticipados", "success");
                }
            }
        });
    }
    
    /**
     * Obtiene los datos del préstamo actual desde el formulario principal
     * @returns {Object} Objeto con datos del préstamo
     */
    function obtenerDatosPrestamo() {
        // Datos básicos
        const monto = parseFloat(document.getElementById('monto')?.value || 0);
        const plazo = parseInt(document.getElementById('plazo')?.value || 0);
        const interesMensual = parseFloat(document.getElementById('interes-mensual')?.value || 0) / 100; // Convertir a decimal
        
        // Resultados
        const cuotaMensualEl = document.getElementById('cuota-mensual');
        const totalPagarEl = document.getElementById('total-pagar');
        const totalInteresesEl = document.getElementById('total-intereses');
        
        let cuotaMensual = 0;
        let totalPagar = 0;
        let totalIntereses = 0;
        
        // Extraer valores numéricos de los elementos de resultados
        if (cuotaMensualEl) {
            const textoValor = cuotaMensualEl.textContent.replace(/[^\d,]/g, '').replace(',', '.');
            cuotaMensual = parseFloat(textoValor) || 0;
        }
        
        if (totalPagarEl) {
            const textoValor = totalPagarEl.textContent.replace(/[^\d,]/g, '').replace(',', '.');
            totalPagar = parseFloat(textoValor) || 0;
        }
        
        if (totalInteresesEl) {
            const textoValor = totalInteresesEl.textContent.replace(/[^\d,]/g, '').replace(',', '.');
            totalIntereses = parseFloat(textoValor) || 0;
        }
        
        // Si no tiene cuota mensual calculada, calcularla
        if (cuotaMensual <= 0 && monto > 0 && plazo > 0 && interesMensual > 0) {
            cuotaMensual = calcularCuotaMensual(monto, interesMensual, plazo);
            totalPagar = cuotaMensual * plazo;
            totalIntereses = totalPagar - monto;
        }
        
        return {
            monto,
            plazo,
            interesMensual,
            cuotaMensual,
            totalPagar,
            totalIntereses
        };
    }
    
    /**
     * Actualiza la información del préstamo en el modal
     * @param {Object} prestamo - Datos del préstamo
     */
    function actualizarInfoPrestamo(prestamo) {
        const formatoPeso = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
        
        // Actualizar información del préstamo actual
        document.getElementById('pa-monto-actual').textContent = formatoPeso.format(prestamo.monto);
        document.getElementById('pa-plazo-actual').textContent = `${prestamo.plazo} meses`;
        document.getElementById('pa-tasa-actual').textContent = `${(prestamo.interesMensual * 100).toFixed(2)}%`;
        document.getElementById('pa-cuota-actual').textContent = formatoPeso.format(prestamo.cuotaMensual);
        document.getElementById('pa-intereses-actual').textContent = formatoPeso.format(prestamo.totalIntereses);
    }
    
    /**
     * Calcula la cuota mensual de un préstamo
     * @param {number} monto - Monto del préstamo
     * @param {number} tasaMensual - Tasa de interés mensual en formato decimal
     * @param {number} plazo - Plazo en meses
     * @returns {number} Cuota mensual
     */
    function calcularCuotaMensual(monto, tasaMensual, plazo) {
        // Fórmula: P × r × (1 + r)^n / ((1 + r)^n - 1)
        // Donde P = monto, r = tasa mensual, n = plazo
        if (tasaMensual === 0) {
            return monto / plazo;
        }
        const factor = Math.pow(1 + tasaMensual, plazo);
        return monto * tasaMensual * factor / (factor - 1);
    }
    
    /**
     * Simula una estrategia de pagos mensuales adicionales
     * @param {Object} prestamo - Datos del préstamo original
     * @param {number} pagoExtra - Monto extra a pagar cada mes
     * @param {string} destino - 'reducir-plazo' o 'reducir-cuota'
     * @returns {Object} Resultados de la simulación
     */
    function simularPagosMensuales(prestamo, pagoExtra, destino) {
        const monto = prestamo.monto;
        const tasaMensual = prestamo.interesMensual;
        const plazoOriginal = prestamo.plazo;
        const cuotaOriginal = prestamo.cuotaMensual;
        
        // Generar la tabla de amortización con pagos extra
        let saldoRestante = monto;
        let cuotaActual = cuotaOriginal;
        let plazoActual = plazoOriginal;
        let totalPagado = 0;
        let totalIntereses = 0;
        let pagosMensuales = [];
        
        if (destino === 'reducir-plazo') {
            // La cuota mensual se mantiene igual, se reduce el plazo
            let mesPago = 1;
            
            while (saldoRestante > 0 && mesPago <= plazoOriginal) {
                const interesMes = saldoRestante * tasaMensual;
                const capitalMes = cuotaOriginal - interesMes;
                let saldoNuevo = saldoRestante - capitalMes;
                
                // Aplicar pago extra si es posible y no es la última cuota
                let pagoExtraAplicado = 0;
                if (saldoNuevo > 0) {
                    pagoExtraAplicado = Math.min(pagoExtra, saldoNuevo);
                    saldoNuevo -= pagoExtraAplicado;
                }
                
                saldoRestante = saldoNuevo;
                totalPagado += cuotaOriginal + pagoExtraAplicado;
                totalIntereses += interesMes;
                
                pagosMensuales.push({
                    cuota: mesPago,
                    cuotaMensual: cuotaOriginal,
                    capital: capitalMes,
                    intereses: interesMes,
                    pagoExtra: pagoExtraAplicado,
                    saldoRestante: saldoRestante
                });
                
                mesPago++;
            }
            
            plazoActual = mesPago - 1;
        } else if (destino === 'reducir-cuota') {
            // El plazo se mantiene igual, se reduce la cuota mensual
            for (let mes = 1; mes <= plazoOriginal; mes++) {
                // Si se ha hecho un pago extra en el mes anterior, recalcular la cuota
                if (mes > 1 && pagosMensuales[mes - 2].pagoExtra > 0) {
                    cuotaActual = calcularCuotaMensual(saldoRestante, tasaMensual, plazoOriginal - mes + 1);
                }
                
                const interesMes = saldoRestante * tasaMensual;
                const capitalMes = cuotaActual - interesMes;
                let saldoNuevo = saldoRestante - capitalMes;
                
                // Aplicar pago extra si es posible y no es la última cuota
                let pagoExtraAplicado = 0;
                if (mes < plazoOriginal && saldoNuevo > 0) {
                    pagoExtraAplicado = Math.min(pagoExtra, saldoNuevo);
                    saldoNuevo -= pagoExtraAplicado;
                }
                
                saldoRestante = saldoNuevo;
                totalPagado += cuotaActual + pagoExtraAplicado;
                totalIntereses += interesMes;
                
                pagosMensuales.push({
                    cuota: mes,
                    cuotaMensual: cuotaActual,
                    capital: capitalMes,
                    intereses: interesMes,
                    pagoExtra: pagoExtraAplicado,
                    saldoRestante: saldoRestante
                });
                
                // Si ya se pagó todo, terminar
                if (saldoRestante <= 0) {
                    plazoActual = mes;
                    break;
                }
            }
        }
        
        return {
            plazo: plazoActual,
            cuotaMensual: cuotaActual,
            totalPagar: totalPagado,
            totalIntereses: totalIntereses,
            pagosDetallados: pagosMensuales
        };
    }
    
    /**
     * Simula una estrategia de pagos trimestrales adicionales
     * @param {Object} prestamo - Datos del préstamo original
     * @param {number} pagoExtra - Monto extra a pagar cada trimestre
     * @param {string} destino - 'reducir-plazo' o 'reducir-cuota'
     * @returns {Object} Resultados de la simulación
     */
    function simularPagosTrimestales(prestamo, pagoExtra, destino) {
        const monto = prestamo.monto;
        const tasaMensual = prestamo.interesMensual;
        const plazoOriginal = prestamo.plazo;
        const cuotaOriginal = prestamo.cuotaMensual;
        
        // Generar la tabla de amortización con pagos extra trimestrales
        let saldoRestante = monto;
        let cuotaActual = cuotaOriginal;
        let plazoActual = plazoOriginal;
        let totalPagado = 0;
        let totalIntereses = 0;
        let pagosMensuales = [];
        
        if (destino === 'reducir-plazo') {
            // La cuota mensual se mantiene igual, se reduce el plazo
            let mesPago = 1;
            
            while (saldoRestante > 0 && mesPago <= plazoOriginal) {
                const interesMes = saldoRestante * tasaMensual;
                const capitalMes = cuotaOriginal - interesMes;
                let saldoNuevo = saldoRestante - capitalMes;
                
                // Aplicar pago extra trimestral (en los meses 3, 6, 9, 12, etc.)
                let pagoExtraAplicado = 0;
                if (mesPago % 3 === 0 && saldoNuevo > 0) {
                    pagoExtraAplicado = Math.min(pagoExtra, saldoNuevo);
                    saldoNuevo -= pagoExtraAplicado;
                }
                
                saldoRestante = saldoNuevo;
                totalPagado += cuotaOriginal + pagoExtraAplicado;
                totalIntereses += interesMes;
                
                pagosMensuales.push({
                    cuota: mesPago,
                    cuotaMensual: cuotaOriginal,
                    capital: capitalMes,
                    intereses: interesMes,
                    pagoExtra: pagoExtraAplicado,
                    saldoRestante: saldoRestante
                });
                
                mesPago++;
                
                // Si ya se pagó todo, terminar
                if (saldoRestante <= 0) {
                    break;
                }
            }
            
            plazoActual = mesPago - 1;
        } else if (destino === 'reducir-cuota') {
            // El plazo se mantiene igual, se reduce la cuota mensual
            for (let mes = 1; mes <= plazoOriginal; mes++) {
                // Recalcular la cuota después de un pago trimestral
                if (mes > 1 && (mes - 1) % 3 === 0) {
                    cuotaActual = calcularCuotaMensual(saldoRestante, tasaMensual, plazoOriginal - mes + 1);
                }
                
                const interesMes = saldoRestante * tasaMensual;
                const capitalMes = cuotaActual - interesMes;
                let saldoNuevo = saldoRestante - capitalMes;
                
                // Aplicar pago extra trimestral (en los meses 3, 6, 9, 12, etc.)
                let pagoExtraAplicado = 0;
                if (mes % 3 === 0 && mes < plazoOriginal && saldoNuevo > 0) {
                    pagoExtraAplicado = Math.min(pagoExtra, saldoNuevo);
                    saldoNuevo -= pagoExtraAplicado;
                }
                
                saldoRestante = saldoNuevo;
                totalPagado += cuotaActual + pagoExtraAplicado;
                totalIntereses += interesMes;
                
                pagosMensuales.push({
                    cuota: mes,
                    cuotaMensual: cuotaActual,
                    capital: capitalMes,
                    intereses: interesMes,
                    pagoExtra: pagoExtraAplicado,
                    saldoRestante: saldoRestante
                });
                
                // Si ya se pagó todo, terminar
                if (saldoRestante <= 0) {
                    plazoActual = mes;
                    break;
                }
            }
        }
        
        return {
            plazo: plazoActual,
            cuotaMensual: cuotaActual,
            totalPagar: totalPagado,
            totalIntereses: totalIntereses,
            pagosDetallados: pagosMensuales
        };
    }
    
    /**
     * Simula una estrategia de pagos personalizados
     * @param {Object} prestamo - Datos del préstamo original
     * @param {Array} pagosExtra - Array de objetos {mes, monto} con los pagos extra
     * @param {string} destino - 'reducir-plazo' o 'reducir-cuota'
     * @returns {Object} Resultados de la simulación
     */
    function simularPagosPersonalizados(prestamo, pagosExtra, destino) {
        const monto = prestamo.monto;
        const tasaMensual = prestamo.interesMensual;
        const plazoOriginal = prestamo.plazo;
        const cuotaOriginal = prestamo.cuotaMensual;
        
        // Crear un mapa para facilitar la búsqueda de pagos extra por mes
        const mapaPagosExtra = {};
        pagosExtra.forEach(pago => {
            mapaPagosExtra[pago.mes] = pago.monto;
        });
        
        // Generar la tabla de amortización con pagos extra personalizados
        let saldoRestante = monto;
        let cuotaActual = cuotaOriginal;
        let plazoActual = plazoOriginal;
        let totalPagado = 0;
        let totalIntereses = 0;
        let pagosMensuales = [];
        
        if (destino === 'reducir-plazo') {
            // La cuota mensual se mantiene igual, se reduce el plazo
            let mesPago = 1;
            
            while (saldoRestante > 0 && mesPago <= plazoOriginal) {
                const interesMes = saldoRestante * tasaMensual;
                const capitalMes = cuotaOriginal - interesMes;
                let saldoNuevo = saldoRestante - capitalMes;
                
                // Aplicar pago extra si existe para este mes
                let pagoExtraAplicado = 0;
                if (mapaPagosExtra[mesPago] && saldoNuevo > 0) {
                    pagoExtraAplicado = Math.min(mapaPagosExtra[mesPago], saldoNuevo);
                    saldoNuevo -= pagoExtraAplicado;
                }
                
                saldoRestante = saldoNuevo;
                totalPagado += cuotaOriginal + pagoExtraAplicado;
                totalIntereses += interesMes;
                
                pagosMensuales.push({
                    cuota: mesPago,
                    cuotaMensual: cuotaOriginal,
                    capital: capitalMes,
                    intereses: interesMes,
                    pagoExtra: pagoExtraAplicado,
                    saldoRestante: saldoRestante
                });
                
                mesPago++;
                
                // Si ya se pagó todo, terminar
                if (saldoRestante <= 0) {
                    break;
                }
            }
            
            plazoActual = mesPago - 1;
        } else if (destino === 'reducir-cuota') {
            // El plazo se mantiene igual, se reduce la cuota mensual
            for (let mes = 1; mes <= plazoOriginal; mes++) {
                // Recalcular la cuota si hubo un pago extra en el mes anterior
                if (mes > 1 && pagosMensuales[mes - 2].pagoExtra > 0) {
                    cuotaActual = calcularCuotaMensual(saldoRestante, tasaMensual, plazoOriginal - mes + 1);
                }
                
                const interesMes = saldoRestante * tasaMensual;
                const capitalMes = cuotaActual - interesMes;
                let saldoNuevo = saldoRestante - capitalMes;
                
                // Aplicar pago extra si existe para este mes
                let pagoExtraAplicado = 0;
                if (mapaPagosExtra[mes] && saldoNuevo > 0) {
                    pagoExtraAplicado = Math.min(mapaPagosExtra[mes], saldoNuevo);
                    saldoNuevo -= pagoExtraAplicado;
                }
                
                saldoRestante = saldoNuevo;
                totalPagado += cuotaActual + pagoExtraAplicado;
                totalIntereses += interesMes;
                
                pagosMensuales.push({
                    cuota: mes,
                    cuotaMensual: cuotaActual,
                    capital: capitalMes,
                    intereses: interesMes,
                    pagoExtra: pagoExtraAplicado,
                    saldoRestante: saldoRestante
                });
                
                // Si ya se pagó todo, terminar
                if (saldoRestante <= 0) {
                    plazoActual = mes;
                    break;
                }
            }
        }
        
        return {
            plazo: plazoActual,
            cuotaMensual: cuotaActual,
            totalPagar: totalPagado,
            totalIntereses: totalIntereses,
            pagosDetallados: pagosMensuales
        };
    }
    
    /**
     * Genera la tabla de amortización original
     * @param {Object} prestamo - Datos del préstamo
     * @returns {Array} Tabla de amortización
     */
    function generarAmortizacionOriginal(prestamo) {
        const monto = prestamo.monto;
        const tasaMensual = prestamo.interesMensual;
        const plazo = prestamo.plazo;
        const cuotaMensual = prestamo.cuotaMensual;
        
        let saldoRestante = monto;
        const tabla = [];
        
        for (let mes = 1; mes <= plazo; mes++) {
            const interesMes = saldoRestante * tasaMensual;
            const capitalMes = cuotaMensual - interesMes;
            saldoRestante -= capitalMes;
            
            if (saldoRestante < 0.01) saldoRestante = 0;
            
            tabla.push({
                cuota: mes,
                cuotaMensual: cuotaMensual,
                capital: capitalMes,
                intereses: interesMes,
                saldoRestante: saldoRestante
            });
        }
        
        return tabla;
    }
    
    /**
     * Muestra los resultados de la simulación en el modal
     * @param {Object} prestamoOriginal - Datos del préstamo original
     * @param {Object} resultadoSimulacion - Resultados de la simulación
     */
    function mostrarResultadosSimulacion(prestamoOriginal, resultadoSimulacion) {
        const formatoPeso = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
        
        // Actualizar sección de resultados
        document.getElementById('comp-plazo-original').textContent = `${prestamoOriginal.plazo} meses`;
        document.getElementById('comp-cuota-original').textContent = formatoPeso.format(prestamoOriginal.cuotaMensual);
        document.getElementById('comp-total-original').textContent = formatoPeso.format(prestamoOriginal.totalPagar);
        document.getElementById('comp-intereses-original').textContent = formatoPeso.format(prestamoOriginal.totalIntereses);
        
        document.getElementById('comp-plazo-pagos').textContent = `${resultadoSimulacion.plazo} meses`;
        document.getElementById('comp-cuota-pagos').textContent = formatoPeso.format(resultadoSimulacion.cuotaMensual);
        document.getElementById('comp-total-pagos').textContent = formatoPeso.format(resultadoSimulacion.totalPagar);
        document.getElementById('comp-intereses-pagos').textContent = formatoPeso.format(resultadoSimulacion.totalIntereses);
        
        // Calcular ahorros
        const ahorroPlazo = prestamoOriginal.plazo - resultadoSimulacion.plazo;
        const ahorroCuota = prestamoOriginal.cuotaMensual - resultadoSimulacion.cuotaMensual;
        const ahorroTotal = prestamoOriginal.totalPagar - resultadoSimulacion.totalPagar;
        const ahorroIntereses = prestamoOriginal.totalIntereses - resultadoSimulacion.totalIntereses;
        
        document.getElementById('ahorro-plazo').textContent = `${ahorroPlazo} meses`;
        document.getElementById('ahorro-cuota').textContent = formatoPeso.format(ahorroCuota);
        document.getElementById('ahorro-total').textContent = formatoPeso.format(ahorroTotal);
        document.getElementById('ahorro-intereses').textContent = formatoPeso.format(ahorroIntereses);
        
        // Mostrar tabla de amortización original
        const tablaOriginal = generarAmortizacionOriginal(prestamoOriginal);
        const tablaOriginalContainer = document.getElementById('tabla-amortizacion-original');
        let tablaOriginalHTML = '';
        
        tablaOriginal.forEach(fila => {
            tablaOriginalHTML += `
                <tr>
                    <td>${fila.cuota}</td>
                    <td>${formatoPeso.format(fila.cuotaMensual)}</td>
                    <td>${formatoPeso.format(fila.capital)}</td>
                    <td>${formatoPeso.format(fila.intereses)}</td>
                    <td>${formatoPeso.format(fila.saldoRestante)}</td>
                </tr>
            `;
        });
        
        tablaOriginalContainer.innerHTML = tablaOriginalHTML;
        
        // Mostrar tabla de amortización con pagos anticipados
        const tablaAnticipada = resultadoSimulacion.pagosDetallados;
        const tablaAnticipadaContainer = document.getElementById('tabla-amortizacion-anticipado');
        let tablaAnticipadaHTML = '';
        
        tablaAnticipada.forEach(fila => {
            tablaAnticipadaHTML += `
                <tr>
                    <td>${fila.cuota}</td>
                    <td>${formatoPeso.format(fila.cuotaMensual)}</td>
                    <td>${formatoPeso.format(fila.capital)}</td>
                    <td>${formatoPeso.format(fila.intereses)}</td>
                    <td>${formatoPeso.format(fila.pagoExtra)}</td>
                    <td>${formatoPeso.format(fila.saldoRestante)}</td>
                </tr>
            `;
        });
        
        tablaAnticipadaContainer.innerHTML = tablaAnticipadaHTML;
        
        // Mostrar sección de resultados
        const resultadosContainer = document.getElementById('resultados-pagos-anticipados');
        resultadosContainer.classList.remove('hidden');
        
        // Estructura clara de secciones en orden correcto
        const seccionesOrdenadas = [
            'comparacion-container',       // 1. Comparación de datos
            'grafico-container',           // 2. Gráfico
            'amortizacion-tabs',           // 3. Botones de tabla
            'tab-amortizacion-original',   // 4. Tabla original
            'tab-amortizacion-anticipado', // 5. Tabla con pagos anticipados
            'aplicar-btn-container'        // 6. Botón de aplicar
        ];
        
        // Reordenar elementos en el DOM si es necesario
        const fragments = {};
        seccionesOrdenadas.forEach(id => {
            const elemento = resultadosContainer.querySelector(`#${id}`) || 
                            resultadosContainer.querySelector(`.${id}`);
            if (elemento) {
                fragments[id] = elemento;
                elemento.remove();
            }
        });
        
        // Volver a añadir en el orden correcto
        seccionesOrdenadas.forEach(id => {
            if (fragments[id]) {
                resultadosContainer.appendChild(fragments[id]);
            }
        });
        
        // Generar gráfico comparativo después de reorganizar elementos
        generarGraficoComparativo(prestamoOriginal, resultadoSimulacion);
    }
    
    /**
     * Genera un gráfico comparativo entre el préstamo original y con pagos anticipados
     * @param {Object} prestamoOriginal - Datos del préstamo original
     * @param {Object} resultadoSimulacion - Resultados de la simulación
     */
    function generarGraficoComparativo(prestamoOriginal, resultadoSimulacion) {
        // Preparar datos para el gráfico
        const ctxGrafico = document.getElementById('grafico-comparativo').getContext('2d');
        
        // Destruir gráfico existente si hay uno
        if (window.graficoComparativo instanceof Chart) {
            window.graficoComparativo.destroy();
        }
        
        // Datos para el gráfico
        const etiquetas = ['Plazo (meses)', 'Cuota Mensual', 'Total a Pagar', 'Total Intereses'];
        
        const datosOriginal = [
            prestamoOriginal.plazo,
            prestamoOriginal.cuotaMensual,
            prestamoOriginal.totalPagar,
            prestamoOriginal.totalIntereses
        ];
        
        const datosPagosAnticipados = [
            resultadoSimulacion.plazo,
            resultadoSimulacion.cuotaMensual,
            resultadoSimulacion.totalPagar,
            resultadoSimulacion.totalIntereses
        ];
        
        // Crear gráfico
        window.graficoComparativo = new Chart(ctxGrafico, {
            type: 'bar',
            data: {
                labels: etiquetas,
                datasets: [
                    {
                        label: 'Préstamo Original',
                        data: datosOriginal,
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Con Pagos Anticipados',
                        data: datosPagosAnticipados,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Comparación de Préstamos'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let value = context.raw;
                                if (context.datasetIndex === 0) {
                                    // Préstamo original
                                    if (context.dataIndex === 0) {
                                        return 'Original: ' + value + ' meses';
                                    } else {
                                        // Es un valor monetario
                                        return 'Original: $' + value.toLocaleString('es-CO');
                                    }
                                } else {
                                    // Con pagos anticipados
                                    if (context.dataIndex === 0) {
                                        return 'Con pagos: ' + value + ' meses';
                                    } else {
                                        // Es un valor monetario
                                        return 'Con pagos: $' + value.toLocaleString('es-CO');
                                    }
                                }
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value, index, values) {
                                if (index === 0) {
                                    // Plazo
                                    return value + ' meses';
                                } else {
                                    // Valor monetario
                                    return '$' + value.toLocaleString('es-CO');
                                }
                            }
                        }
                    }
                }
            }
        });
    }
});

