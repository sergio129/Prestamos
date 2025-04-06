/**
 * Calculadora avanzada de préstamos - Versión corregida
 * Implementa pestañas que funcionan correctamente
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log("Inicializando calculadora avanzada corregida");
    
    // Crear botón de calculadora avanzada
    const advancedBtn = document.createElement('button');
    advancedBtn.type = 'button';
    advancedBtn.className = 'btn btn-advanced';
    advancedBtn.innerHTML = '<i class="fas fa-calculator"></i> Calculadora avanzada';
    advancedBtn.style.marginTop = '15px';
    
    // Añadir botón después del formulario principal
    const loanForm = document.getElementById('loan-form');
    if (loanForm && loanForm.parentNode) {
        loanForm.parentNode.appendChild(advancedBtn);
    }
    
    // Crear modal de calculadora avanzada
    const advancedModal = document.createElement('div');
    advancedModal.id = 'advanced-modal';
    advancedModal.className = 'modal hidden';
    
    advancedModal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Calculadora Avanzada de Préstamos</h2>
            
            <div class="calculadora-tabs">
                <div class="calculadora-tab active" data-tab-id="capacidad-pago-tab">Capacidad de pago</div>
                <div class="calculadora-tab" data-tab-id="prestamo-maximo-tab">Préstamo máximo</div>
                <div class="calculadora-tab" data-tab-id="comparativa-tab">Comparativa</div>
            </div>
            
            <div class="calculadora-tab-content">
                <!-- Capacidad de pago -->
                <div class="calculadora-tab-pane active" id="capacidad-pago-tab">
                    <p>Calcule cuánto puede pagar mensualmente según sus ingresos y gastos.</p>
                    
                    <div class="form-group">
                        <label for="ingresos-mensuales">Ingresos mensuales (COP):</label>
                        <div class="input-icon">
                            <span class="currency-symbol">$</span>
                            <input type="number" id="ingresos-mensuales" placeholder="Ingresos mensuales">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="gastos-fijos">Gastos fijos mensuales (COP):</label>
                        <div class="input-icon">
                            <span class="currency-symbol">$</span>
                            <input type="number" id="gastos-fijos" placeholder="Gastos fijos">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="porcentaje-deuda">Porcentaje máximo para deuda (%):</label>
                        <input type="range" id="porcentaje-deuda" min="10" max="50" value="30" step="5">
                        <div class="range-value"><span id="porcentaje-valor">30</span>%</div>
                    </div>
                    
                    <button type="button" class="btn" id="calcular-capacidad">Calcular capacidad</button>
                    
                    <div id="resultado-capacidad" class="resultado hidden">
                        <h3>Resultado:</h3>
                        <div class="result-item">
                            <p>Capacidad de pago mensual:</p>
                            <p id="capacidad-mensual">$0</p>
                        </div>
                        <div class="result-item">
                            <p>Préstamo estimado (12 meses):</p>
                            <p id="prestamo-12">$0</p>
                        </div>
                        <div class="result-item">
                            <p>Préstamo estimado (24 meses):</p>
                            <p id="prestamo-24">$0</p>
                        </div>
                        <div class="result-item">
                            <p>Préstamo estimado (36 meses):</p>
                            <p id="prestamo-36">$0</p>
                        </div>
                    </div>
                </div>
                
                <!-- Préstamo máximo -->
                <div class="calculadora-tab-pane" id="prestamo-maximo-tab">
                    <p>Calcule el monto máximo que puede solicitar según su capacidad de pago.</p>
                    
                    <div class="form-group">
                        <label for="cuota-maxima">Cuota máxima mensual (COP):</label>
                        <div class="input-icon">
                            <span class="currency-symbol">$</span>
                            <input type="number" id="cuota-maxima" placeholder="Cuota mensual máxima">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="plazo-maximo">Plazo (meses):</label>
                        <input type="number" id="plazo-maximo" min="1" max="120" value="36">
                    </div>
                    
                    <div class="form-group">
                        <label for="interes-maximo">Tasa de interés mensual (%):</label>
                        <input type="number" id="interes-maximo" min="0.1" max="10" step="0.1" value="1.5">
                    </div>
                    
                    <button type="button" class="btn" id="calcular-maximo">Calcular monto máximo</button>
                    
                    <div id="resultado-maximo" class="resultado hidden">
                        <h3>Resultado:</h3>
                        <div class="result-item highlight">
                            <p>Monto máximo de préstamo:</p>
                            <p id="monto-maximo">$0</p>
                        </div>
                        <div class="result-item">
                            <p>Total a pagar:</p>
                            <p id="total-maximo">$0</p>
                        </div>
                        <div class="result-item">
                            <p>Total intereses:</p>
                            <p id="intereses-maximo">$0</p>
                        </div>
                    </div>
                </div>
                
                <!-- Comparativa -->
                <div class="calculadora-tab-pane" id="comparativa-tab">
                    <p>Compare diferentes opciones de préstamo.</p>
                    
                    <div class="grid-2">
                        <div class="comparison-col">
                            <h3>Opción 1</h3>
                            <div class="form-group">
                                <label>Monto:</label>
                                <div class="input-icon">
                                    <span class="currency-symbol">$</span>
                                    <input type="number" id="comp1-monto" value="10000">
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Plazo (meses):</label>
                                <input type="number" id="comp1-plazo" value="12">
                            </div>
                            <div class="form-group">
                                <label>Interés mensual (%):</label>
                                <input type="number" id="comp1-interes" value="1.5" step="0.1">
                            </div>
                        </div>
                        
                        <div class="comparison-col">
                            <h3>Opción 2</h3>
                            <div class="form-group">
                                <label>Monto:</label>
                                <div class="input-icon">
                                    <span class="currency-symbol">$</span>
                                    <input type="number" id="comp2-monto" value="10000">
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Plazo (meses):</label>
                                <input type="number" id="comp2-plazo" value="24">
                            </div>
                            <div class="form-group">
                                <label>Interés mensual (%):</label>
                                <input type="number" id="comp2-interes" value="1.2" step="0.1">
                            </div>
                        </div>
                    </div>
                    
                    <button type="button" class="btn" id="comparar">Comparar opciones</button>
                    
                    <div id="resultado-comparativa" class="resultado hidden">
                        <h3>Comparativa:</h3>
                        <div class="comparison-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Concepto</th>
                                        <th>Opción 1</th>
                                        <th>Opción 2</th>
                                        <th>Diferencia</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Cuota mensual</td>
                                        <td id="comp1-cuota">$0</td>
                                        <td id="comp2-cuota">$0</td>
                                        <td id="diff-cuota">$0</td>
                                    </tr>
                                    <tr>
                                        <td>Total a pagar</td>
                                        <td id="comp1-total">$0</td>
                                        <td id="comp2-total">$0</td>
                                        <td id="diff-total">$0</td>
                                    </tr>
                                    <tr>
                                        <td>Total intereses</td>
                                        <td id="comp1-intereses">$0</td>
                                        <td id="comp2-intereses">$0</td>
                                        <td id="diff-intereses">$0</td>
                                    </tr>
                                    <tr>
                                        <td>Costo por año</td>
                                        <td id="comp1-costo-anual">$0</td>
                                        <td id="comp2-costo-anual">$0</td>
                                        <td id="diff-costo-anual">$0</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div id="comparison-conclusion" class="comparison-conclusion">
                            <!-- Conclusión generada dinámicamente -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Añadir modal al DOM
    document.body.appendChild(advancedModal);
    
    // Configurar eventos
    advancedBtn.addEventListener('click', function() {
        advancedModal.classList.remove('hidden');
    });
    
    // Cerrar modal
    document.querySelector('#advanced-modal .close-modal').addEventListener('click', function() {
        advancedModal.classList.add('hidden');
    });
    
    // Configurar pestañas
    const tabs = document.querySelectorAll('.calculadora-tab');
    const tabContents = document.querySelectorAll('.calculadora-tab-pane');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Eliminar clase active de todas las pestañas y contenidos
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Activar pestaña actual
            this.classList.add('active');
            
            // Activar contenido correspondiente
            const tabId = this.getAttribute('data-tab-id');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Resto de la lógica para la calculadora avanzada
    
    // Actualizar valor del porcentaje
    const porcentajeSlider = document.getElementById('porcentaje-deuda');
    const porcentajeValor = document.getElementById('porcentaje-valor');
    
    if (porcentajeSlider && porcentajeValor) {
        porcentajeSlider.addEventListener('input', function() {
            porcentajeValor.textContent = this.value;
        });
    }
    
    // Calcular capacidad de pago
    const calcularCapacidadBtn = document.getElementById('calcular-capacidad');
    if (calcularCapacidadBtn) {
        calcularCapacidadBtn.addEventListener('click', function() {
            const ingresos = parseFloat(document.getElementById('ingresos-mensuales')?.value || 0);
            const gastos = parseFloat(document.getElementById('gastos-fijos')?.value || 0);
            const porcentaje = parseFloat(document.getElementById('porcentaje-deuda')?.value || 30);
            
            if (ingresos <= 0) {
                alert("Por favor ingrese sus ingresos mensuales");
                return;
            }
            
            // Calcular capacidad de pago
            const ingresosDisponibles = ingresos - gastos;
            if (ingresosDisponibles <= 0) {
                alert("Sus gastos superan sus ingresos. No tiene capacidad de endeudamiento.");
                return;
            }
            
            const capacidadPago = ingresosDisponibles * (porcentaje / 100);
            
            // Calcular préstamos estimados
            const interesMensual = 0.015; // 1.5% mensual
            
            // Función para calcular monto de préstamo según capacidad de pago
            function calcularPrestamo(cuota, plazo, tasa) {
                return cuota * (1 - Math.pow(1 + tasa, -plazo)) / tasa;
            }
            
            const prestamo12 = calcularPrestamo(capacidadPago, 12, interesMensual);
            const prestamo24 = calcularPrestamo(capacidadPago, 24, interesMensual);
            const prestamo36 = calcularPrestamo(capacidadPago, 36, interesMensual);
            
            // Formatear moneda
            const formatoMoneda = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0
            });
            
            // Mostrar resultados
            document.getElementById('capacidad-mensual').textContent = formatoMoneda.format(capacidadPago);
            document.getElementById('prestamo-12').textContent = formatoMoneda.format(prestamo12);
            document.getElementById('prestamo-24').textContent = formatoMoneda.format(prestamo24);
            document.getElementById('prestamo-36').textContent = formatoMoneda.format(prestamo36);
            
            // Mostrar sección de resultados
            document.getElementById('resultado-capacidad').classList.remove('hidden');
        });
    }
    
    // Calcular monto máximo
    const calcularMaximoBtn = document.getElementById('calcular-maximo');
    if (calcularMaximoBtn) {
        calcularMaximoBtn.addEventListener('click', function() {
            const cuotaMaxima = parseFloat(document.getElementById('cuota-maxima')?.value || 0);
            const plazo = parseInt(document.getElementById('plazo-maximo')?.value || 36);
            const interesMensual = parseFloat(document.getElementById('interes-maximo')?.value || 1.5) / 100;
            
            if (cuotaMaxima <= 0) {
                alert("Por favor ingrese una cuota máxima válida");
                return;
            }
            
            // Calcular monto máximo: C × (1 - (1 + i)^-n) / i
            const montoMaximo = cuotaMaxima * (1 - Math.pow(1 + interesMensual, -plazo)) / interesMensual;
            const totalPagar = cuotaMaxima * plazo;
            const totalIntereses = totalPagar - montoMaximo;
            
            // Formatear moneda
            const formatoMoneda = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0
            });
            
            // Mostrar resultados
            document.getElementById('monto-maximo').textContent = formatoMoneda.format(montoMaximo);
            document.getElementById('total-maximo').textContent = formatoMoneda.format(totalPagar);
            document.getElementById('intereses-maximo').textContent = formatoMoneda.format(totalIntereses);
            
            // Mostrar sección de resultados
            document.getElementById('resultado-maximo').classList.remove('hidden');
        });
    }
    
    // Comparar opciones
    const compararBtn = document.getElementById('comparar');
    if (compararBtn) {
        compararBtn.addEventListener('click', function() {
            // Obtener datos opción 1
            const monto1 = parseFloat(document.getElementById('comp1-monto')?.value || 0);
            const plazo1 = parseInt(document.getElementById('comp1-plazo')?.value || 12);
            const interes1 = parseFloat(document.getElementById('comp1-interes')?.value || 1.5) / 100;
            
            // Obtener datos opción 2
            const monto2 = parseFloat(document.getElementById('comp2-monto')?.value || 0);
            const plazo2 = parseInt(document.getElementById('comp2-plazo')?.value || 24);
            const interes2 = parseFloat(document.getElementById('comp2-interes')?.value || 1.2) / 100;
            
            if (monto1 <= 0 || monto2 <= 0) {
                alert("Por favor ingrese montos válidos para ambas opciones");
                return;
            }
            
            // Calcular cuota opción 1: P × i / (1 - (1 + i)^-n)
            const cuota1 = monto1 * interes1 / (1 - Math.pow(1 + interes1, -plazo1));
            const total1 = cuota1 * plazo1;
            const intereses1 = total1 - monto1;
            const costoAnual1 = intereses1 / (plazo1 / 12);
            
            // Calcular cuota opción 2
            const cuota2 = monto2 * interes2 / (1 - Math.pow(1 + interes2, -plazo2));
            const total2 = cuota2 * plazo2;
            const intereses2 = total2 - monto2;
            const costoAnual2 = intereses2 / (plazo2 / 12);
            
            // Calcular diferencias
            const diffCuota = cuota1 - cuota2;
            const diffTotal = total1 - total2;
            const diffIntereses = intereses1 - intereses2;
            const diffCostoAnual = costoAnual1 - costoAnual2;
            
            // Formatear moneda
            const formatoMoneda = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0
            });
            
            // Mostrar resultados
            document.getElementById('comp1-cuota').textContent = formatoMoneda.format(cuota1);
            document.getElementById('comp1-total').textContent = formatoMoneda.format(total1);
            document.getElementById('comp1-intereses').textContent = formatoMoneda.format(intereses1);
            document.getElementById('comp1-costo-anual').textContent = formatoMoneda.format(costoAnual1);
            
            document.getElementById('comp2-cuota').textContent = formatoMoneda.format(cuota2);
            document.getElementById('comp2-total').textContent = formatoMoneda.format(total2);
            document.getElementById('comp2-intereses').textContent = formatoMoneda.format(intereses2);
            document.getElementById('comp2-costo-anual').textContent = formatoMoneda.format(costoAnual2);
            
            document.getElementById('diff-cuota').textContent = formatoMoneda.format(Math.abs(diffCuota));
            document.getElementById('diff-total').textContent = formatoMoneda.format(Math.abs(diffTotal));
            document.getElementById('diff-intereses').textContent = formatoMoneda.format(Math.abs(diffIntereses));
            document.getElementById('diff-costo-anual').textContent = formatoMoneda.format(Math.abs(diffCostoAnual));
            
            // Añadir colores según qué opción es mejor
            document.getElementById('diff-cuota').className = diffCuota > 0 ? 'better-2' : 'better-1';
            document.getElementById('diff-total').className = diffTotal > 0 ? 'better-2' : 'better-1';
            document.getElementById('diff-intereses').className = diffIntereses > 0 ? 'better-2' : 'better-1';
            document.getElementById('diff-costo-anual').className = diffCostoAnual > 0 ? 'better-2' : 'better-1';
            
            // Generar conclusión
            let conclusion = '';
            if (diffCostoAnual > 0) {
                conclusion = `<strong>La opción 2 es más económica a largo plazo</strong> con un ahorro anual de ${formatoMoneda.format(Math.abs(diffCostoAnual))}.`;
            } else if (diffCostoAnual < 0) {
                conclusion = `<strong>La opción 1 es más económica a largo plazo</strong> con un ahorro anual de ${formatoMoneda.format(Math.abs(diffCostoAnual))}.`;
            } else {
                conclusion = 'Ambas opciones tienen un costo anual similar.';
            }
            
            if (diffCuota > 0) {
                conclusion += ` La opción 2 tiene una cuota mensual ${formatoMoneda.format(Math.abs(diffCuota))} menor.`;
            } else if (diffCuota < 0) {
                conclusion += ` La opción 1 tiene una cuota mensual ${formatoMoneda.format(Math.abs(diffCuota))} menor.`;
            }
            
            document.getElementById('comparison-conclusion').innerHTML = conclusion;
            
            // Mostrar sección de resultados
            document.getElementById('resultado-comparativa').classList.remove('hidden');
        });
    }
});
