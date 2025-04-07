/**
 * Calculadora de Capacidad de Endeudamiento
 * Permite al usuario calcular cuánto puede pedir prestado basado en sus ingresos y gastos
 */

(function() {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Inicializando calculadora de capacidad de endeudamiento...');
        
        // Crear botón
        const capacidadBtn = document.createElement('button');
        capacidadBtn.type = 'button';
        capacidadBtn.className = 'btn btn-capacidad';
        capacidadBtn.innerHTML = '<i class="fas fa-wallet"></i> Capacidad de Endeudamiento';
        capacidadBtn.style.marginTop = '15px';
        
        // Añadir botón después del formulario principal
        const loanForm = document.getElementById('loan-form');
        if (loanForm && loanForm.parentNode) {
            loanForm.parentNode.appendChild(capacidadBtn);
        }
        
        // Crear modal
        const capacidadModal = document.createElement('div');
        capacidadModal.id = 'capacidad-modal';
        capacidadModal.className = 'modal hidden';
        
        capacidadModal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>Calculadora de Capacidad de Endeudamiento</h2>
                
                <p class="modal-description">
                    Esta herramienta te ayuda a determinar cuánto puedes solicitar en préstamos
                    según tus ingresos y situación financiera actual.
                </p>
                
                <div class="form-group">
                    <label for="capacidad-ingresos">Ingresos mensuales:</label>
                    <div class="input-icon">
                        <span class="currency-symbol">$</span>
                        <input type="number" id="capacidad-ingresos" placeholder="Tus ingresos mensuales">
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="capacidad-gastos">Gastos fijos mensuales:</label>
                    <div class="input-icon">
                        <span class="currency-symbol">$</span>
                        <input type="number" id="capacidad-gastos" placeholder="Suma de gastos mensuales">
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="capacidad-deudas">Pago de deudas actual:</label>
                    <div class="input-icon">
                        <span class="currency-symbol">$</span>
                        <input type="number" id="capacidad-deudas" placeholder="Total de cuotas actuales">
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="capacidad-plazo">Plazo (meses):</label>
                    <select id="capacidad-plazo">
                        <option value="12">12 meses</option>
                        <option value="24">24 meses</option>
                        <option value="36" selected>36 meses</option>
                        <option value="48">48 meses</option>
                        <option value="60">60 meses</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="capacidad-tasa">Tasa de interés mensual (%):</label>
                    <input type="number" id="capacidad-tasa" step="0.01" min="0.1" value="1.5">
                </div>
                
                <button id="calcular-capacidad" class="btn btn-full">Calcular Capacidad</button>
                
                <div id="resultado-capacidad" class="hidden">
                    <h3>Resultados</h3>
                    
                    <div class="capacidad-resultados">
                        <div class="capacidad-card">
                            <div class="capacidad-card-title">Disponible para pago de deudas</div>
                            <div id="capacidad-disponible" class="capacidad-card-value">$0</div>
                            <div class="capacidad-card-subtitle">30% de tus ingresos disponibles</div>
                        </div>
                        
                        <div class="capacidad-card highlight">
                            <div class="capacidad-card-title">Monto máximo recomendado</div>
                            <div id="capacidad-monto" class="capacidad-card-value">$0</div>
                            <div class="capacidad-card-subtitle">Préstamo que podrías solicitar</div>
                        </div>
                        
                        <div class="capacidad-card">
                            <div class="capacidad-card-title">Cuota mensual estimada</div>
                            <div id="capacidad-cuota" class="capacidad-card-value">$0</div>
                            <div class="capacidad-card-subtitle">Pagos mensuales</div>
                        </div>
                    </div>
                    
                    <div class="capacidad-nivel">
                        <h4>Tu nivel de endeudamiento</h4>
                        <div class="nivel-barra-container">
                            <div id="nivel-barra" class="nivel-barra"></div>
                        </div>
                        <div id="nivel-mensaje" class="nivel-mensaje"></div>
                    </div>
                    
                    <button id="aplicar-capacidad" class="btn btn-secondary">Usar este monto</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(capacidadModal);
        
        // Configurar eventos
        capacidadBtn.addEventListener('click', function() {
            capacidadModal.classList.remove('hidden');
        });
        
        // Cerrar modal
        capacidadModal.querySelector('.close-modal').addEventListener('click', function() {
            capacidadModal.classList.add('hidden');
        });
        
        // Calcular capacidad
        document.getElementById('calcular-capacidad').addEventListener('click', function() {
            const ingresos = parseFloat(document.getElementById('capacidad-ingresos').value) || 0;
            const gastos = parseFloat(document.getElementById('capacidad-gastos').value) || 0;
            const deudas = parseFloat(document.getElementById('capacidad-deudas').value) || 0;
            const plazo = parseInt(document.getElementById('capacidad-plazo').value) || 36;
            const tasa = parseFloat(document.getElementById('capacidad-tasa').value) || 1.5;
            
            if (ingresos <= 0) {
                mostrarMensaje("Por favor ingresa tus ingresos mensuales", "error");
                return;
            }
            
            // Capacidad máxima de endeudamiento (30% de ingresos)
            const capacidadMaxima = ingresos * 0.3;
            const disponibleParaDeuda = Math.max(0, capacidadMaxima - deudas);
            
            // Cálculo del préstamo máximo
            const tasaMensual = tasa / 100;
            const montoMaximo = calcularPrestamoMaximo(disponibleParaDeuda, tasaMensual, plazo);
            
            // Calcular cuota mensual del préstamo máximo
            const cuotaMensual = calcularCuotaMensual(montoMaximo, tasaMensual, plazo);
            
            // Calcular nivel de endeudamiento
            const nivelEndeudamiento = ((deudas + cuotaMensual) / ingresos) * 100;
            
            // Formatear moneda
            const formatoMoneda = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0
            });
            
            // Mostrar resultados
            document.getElementById('capacidad-disponible').textContent = formatoMoneda.format(disponibleParaDeuda);
            document.getElementById('capacidad-monto').textContent = formatoMoneda.format(montoMaximo);
            document.getElementById('capacidad-cuota').textContent = formatoMoneda.format(cuotaMensual);
            
            // Mostrar nivel de endeudamiento
            const nivelBarra = document.getElementById('nivel-barra');
            const nivelMensaje = document.getElementById('nivel-mensaje');
            
            nivelBarra.style.width = Math.min(nivelEndeudamiento, 100) + '%';
            
            if (nivelEndeudamiento > 40) {
                nivelBarra.style.backgroundColor = '#e74c3c'; // Rojo
                nivelMensaje.textContent = 'Nivel de endeudamiento alto. Se recomienda precaución.';
                nivelMensaje.style.color = '#e74c3c';
            } else if (nivelEndeudamiento > 30) {
                nivelBarra.style.backgroundColor = '#f39c12'; // Naranja
                nivelMensaje.textContent = 'Nivel de endeudamiento moderado. Se encuentra en el límite recomendado.';
                nivelMensaje.style.color = '#f39c12';
            } else {
                nivelBarra.style.backgroundColor = '#2ecc71'; // Verde
                nivelMensaje.textContent = 'Nivel de endeudamiento saludable. Tienes buena capacidad de pago.';
                nivelMensaje.style.color = '#2ecc71';
            }
            
            document.getElementById('resultado-capacidad').classList.remove('hidden');
        });
        
        // Aplicar el monto calculado al formulario principal
        document.getElementById('aplicar-capacidad').addEventListener('click', function() {
            const montoCalculado = document.getElementById('capacidad-monto').textContent;
            const montoNumerico = parseFloat(montoCalculado.replace(/[^\d.-]/g, ''));
            
            if (montoNumerico > 0) {
                document.getElementById('monto').value = montoNumerico;
                capacidadModal.classList.add('hidden');
                
                // Actualizar tasa y plazo también
                const plazo = document.getElementById('capacidad-plazo').value;
                const tasa = document.getElementById('capacidad-tasa').value;
                
                document.getElementById('plazo').value = plazo;
                document.getElementById('interes-mensual').value = tasa;
                
                mostrarMensaje("Monto aplicado al simulador", "success");
            }
        });
        
        /**
         * Calcular monto máximo de préstamo según capacidad de pago mensual
         * @param {number} capacidadPago - Monto mensual disponible para pagar
         * @param {number} tasaMensual - Tasa de interés mensual en decimal
         * @param {number} plazo - Plazo en meses
         * @returns {number} Monto máximo del préstamo
         */
        function calcularPrestamoMaximo(capacidadPago, tasaMensual, plazo) {
            // Fórmula: Capacidad de pago * [(1 - (1 + tasa)^-plazo) / tasa]
            return capacidadPago * ((1 - Math.pow(1 + tasaMensual, -plazo)) / tasaMensual);
        }
        
        /**
         * Calcular cuota mensual de un préstamo
         * @param {number} monto - Monto del préstamo
         * @param {number} tasaMensual - Tasa de interés mensual en decimal
         * @param {number} plazo - Plazo en meses
         * @returns {number} Cuota mensual
         */
        function calcularCuotaMensual(monto, tasaMensual, plazo) {
            return monto * (tasaMensual * Math.pow(1 + tasaMensual, plazo)) / (Math.pow(1 + tasaMensual, plazo) - 1);
        }
        
        /**
         * Mostrar mensaje al usuario
         * @param {string} mensaje - Texto del mensaje
         * @param {string} tipo - Tipo de mensaje (success, error, info)
         */
        function mostrarMensaje(mensaje, tipo) {
            // Usar la función global si existe
            if (typeof window.mostrarMensaje === 'function') {
                window.mostrarMensaje(mensaje, tipo);
                return;
            }
            
            // Implementación básica si no existe función global
            alert(mensaje);
        }
    });
})();
