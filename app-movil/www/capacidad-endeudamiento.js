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
        capacidadBtn.innerHTML = '<i class="fas fa-calculator"></i> Capacidad de Endeudamiento';
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
            <div class="modal-content capacidad-content">
                <span class="close-modal">&times;</span>
                <h2>Calculadora de Capacidad de Endeudamiento</h2>
                
                <p class="capacidad-description">Esta herramienta te ayuda a calcular cuánto dinero podrías pedir prestado según tus ingresos y gastos mensuales, siguiendo las recomendaciones financieras prudentes.</p>
                
                <div class="capacidad-form">
                    <div class="capacidad-section">
                        <h3><i class="fas fa-money-bill-wave"></i> Ingresos Mensuales</h3>
                        <div class="capacidad-inputs">
                            <div class="field-group">
                                <label for="ingreso-principal">Ingreso principal
                                    <span class="info-tooltip">
                                        <i class="fas fa-info-circle"></i>
                                        <span class="tooltip-text">Tu salario o ingreso principal mensual neto (después de impuestos)</span>
                                    </span>
                                </label>
                                <div class="input-icon">
                                    <span class="currency-symbol">$</span>
                                    <input type="number" id="ingreso-principal" placeholder="Ingreso principal" required>
                                </div>
                            </div>
                            
                            <div class="field-group">
                                <label for="ingresos-adicionales">Ingresos adicionales
                                    <span class="info-tooltip">
                                        <i class="fas fa-info-circle"></i>
                                        <span class="tooltip-text">Otros ingresos recurrentes como arriendos, inversiones, etc.</span>
                                    </span>
                                </label>
                                <div class="input-icon">
                                    <span class="currency-symbol">$</span>
                                    <input type="number" id="ingresos-adicionales" placeholder="Ingresos extras">
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="capacidad-section">
                        <h3><i class="fas fa-hand-holding-usd"></i> Gastos Mensuales Fijos</h3>
                        <div class="capacidad-inputs">
                            <div class="field-group">
                                <label for="gasto-vivienda">Vivienda
                                    <span class="info-tooltip">
                                        <i class="fas fa-info-circle"></i>
                                        <span class="tooltip-text">Arriendo o cuota de hipoteca actual</span>
                                    </span>
                                </label>
                                <div class="input-icon">
                                    <span class="currency-symbol">$</span>
                                    <input type="number" id="gasto-vivienda" placeholder="Arriendo/Hipoteca">
                                </div>
                            </div>
                            
                            <div class="field-group">
                                <label for="gasto-servicios">Servicios
                                    <span class="info-tooltip">
                                        <i class="fas fa-info-circle"></i>
                                        <span class="tooltip-text">Agua, luz, gas, internet, teléfono, etc.</span>
                                    </span>
                                </label>
                                <div class="input-icon">
                                    <span class="currency-symbol">$</span>
                                    <input type="number" id="gasto-servicios" placeholder="Servicios básicos">
                                </div>
                            </div>
                            
                            <div class="field-group">
                                <label for="gasto-alimentacion">Alimentación
                                    <span class="info-tooltip">
                                        <i class="fas fa-info-circle"></i>
                                        <span class="tooltip-text">Mercado, restaurantes y demás gastos de alimentación</span>
                                    </span>
                                </label>
                                <div class="input-icon">
                                    <span class="currency-symbol">$</span>
                                    <input type="number" id="gasto-alimentacion" placeholder="Alimentación">
                                </div>
                            </div>
                            
                            <div class="field-group">
                                <label for="gasto-transporte">Transporte
                                    <span class="info-tooltip">
                                        <i class="fas fa-info-circle"></i>
                                        <span class="tooltip-text">Gasolina, transporte público, mantenimiento vehicular</span>
                                    </span>
                                </label>
                                <div class="input-icon">
                                    <span class="currency-symbol">$</span>
                                    <input type="number" id="gasto-transporte" placeholder="Transporte">
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="capacidad-section">
                        <h3><i class="fas fa-credit-card"></i> Deudas Actuales</h3>
                        <div class="capacidad-inputs">
                            <div class="field-group">
                                <label for="deuda-tc">Tarjetas de crédito
                                    <span class="info-tooltip">
                                        <i class="fas fa-info-circle"></i>
                                        <span class="tooltip-text">Pago mínimo mensual de todas tus tarjetas</span>
                                    </span>
                                </label>
                                <div class="input-icon">
                                    <span class="currency-symbol">$</span>
                                    <input type="number" id="deuda-tc" placeholder="Pago mínimo">
                                </div>
                            </div>
                            
                            <div class="field-group">
                                <label for="deuda-prestamos">Préstamos personales
                                    <span class="info-tooltip">
                                        <i class="fas fa-info-circle"></i>
                                        <span class="tooltip-text">Suma de cuotas de préstamos personales</span>
                                    </span>
                                </label>
                                <div class="input-icon">
                                    <span class="currency-symbol">$</span>
                                    <input type="number" id="deuda-prestamos" placeholder="Cuotas mensuales">
                                </div>
                            </div>
                            
                            <div class="field-group">
                                <label for="deuda-vehiculo">Préstamos de vehículo
                                    <span class="info-tooltip">
                                        <i class="fas fa-info-circle"></i>
                                        <span class="tooltip-text">Cuota mensual de tu crédito de vehículo</span>
                                    </span>
                                </label>
                                <div class="input-icon">
                                    <span class="currency-symbol">$</span>
                                    <input type="number" id="deuda-vehiculo" placeholder="Crédito vehicular">
                                </div>
                            </div>
                            
                            <div class="field-group">
                                <label for="otras-deudas">Otras deudas
                                    <span class="info-tooltip">
                                        <i class="fas fa-info-circle"></i>
                                        <span class="tooltip-text">Otras obligaciones financieras mensuales</span>
                                    </span>
                                </label>
                                <div class="input-icon">
                                    <span class="currency-symbol">$</span>
                                    <input type="number" id="otras-deudas" placeholder="Otras deudas">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <button id="calcular-capacidad" class="btn-calcular-capacidad">Calcular Mi Capacidad</button>
                
                <div id="capacidad-resultado" class="capacidad-resultado hidden">
                    <h3>Resultados de Capacidad de Endeudamiento</h3>
                    
                    <div class="resultado-cards">
                        <div class="resultado-card highlight">
                            <div class="resultado-card-title">Capacidad de Endeudamiento</div>
                            <div id="capacidad-valor" class="resultado-card-value">$0</div>
                            <div class="resultado-card-subtitle">Cuota máxima mensual recomendada</div>
                        </div>
                        
                        <div class="resultado-card">
                            <div class="resultado-card-title">Monto Estimado del Préstamo</div>
                            <div id="monto-estimado" class="resultado-card-value">$0</div>
                            <div class="resultado-card-subtitle">Basado en 36 meses al 18% anual</div>
                        </div>
                        
                        <div class="resultado-card">
                            <div class="resultado-card-title">Relación Deuda/Ingreso</div>
                            <div id="relacion-deuda" class="resultado-card-value">0%</div>
                            <div class="resultado-card-subtitle">Máximo recomendado: 40%</div>
                        </div>
                    </div>
                    
                    <div class="medidor-container">
                        <div class="medidor-title">Medidor de Capacidad Financiera</div>
                        <div class="medidor-capacidad">
                            <div id="medidor-barra" class="medidor-barra"></div>
                        </div>
                        <div class="medidor-labels">
                            <span>0%</span>
                            <span>20%</span>
                            <span>30%</span>
                            <span>40%</span>
                            <span>50%+</span>
                        </div>
                        <div id="medidor-valor" class="medidor-valor">0%</div>
                        <div id="medidor-mensaje" class="medidor-mensaje"></div>
                    </div>
                    
                    <div class="recomendaciones">
                        <h4><i class="fas fa-lightbulb"></i> Recomendaciones Financieras</h4>
                        <ul class="recomendaciones-lista" id="recomendaciones-lista">
                            <!-- Se generan dinámicamente -->
                        </ul>
                    </div>
                    
                    <div class="capacidad-acciones">
                        <button id="aplicar-capacidad" class="btn-aplicar">Aplicar al Simulador</button>
                        <button id="reiniciar-capacidad" class="btn-reiniciar">Reiniciar Cálculo</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(capacidadModal);
        
        // Configurar eventos
        capacidadBtn.addEventListener('click', function() {
            capacidadModal.classList.remove('hidden');
        });
        
        // Cerrar modal
        const closeModalBtn = capacidadModal.querySelector('.close-modal');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', function() {
                capacidadModal.classList.add('hidden');
            });
        }
        
        // Evitar que los clics dentro del modal cierren el modal
        capacidadModal.querySelector('.modal-content').addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        // Cerrar modal al hacer clic fuera del contenido
        capacidadModal.addEventListener('click', function() {
            capacidadModal.classList.add('hidden');
        });
        
        // IMPORTANTE: Calcular capacidad de endeudamiento - CORREGIDO
        const calcularCapacidadBtn = capacidadModal.querySelector('#calcular-capacidad');
        
        if (calcularCapacidadBtn) {
            console.log('Botón de calcular capacidad encontrado');
            
            calcularCapacidadBtn.addEventListener('click', function() {
                console.log('Botón Calcular Capacidad clickeado');
                
                // Obtener valores de ingresos
                const ingresoPrincipal = parseFloat(capacidadModal.querySelector('#ingreso-principal').value) || 0;
                const ingresosAdicionales = parseFloat(capacidadModal.querySelector('#ingresos-adicionales').value) || 0;
                
                console.log('Ingreso principal:', ingresoPrincipal);
                console.log('Ingresos adicionales:', ingresosAdicionales);
                
                // Obtener valores de gastos
                const gastoVivienda = parseFloat(capacidadModal.querySelector('#gasto-vivienda').value) || 0;
                const gastoServicios = parseFloat(capacidadModal.querySelector('#gasto-servicios').value) || 0;
                const gastoAlimentacion = parseFloat(capacidadModal.querySelector('#gasto-alimentacion').value) || 0;
                const gastoTransporte = parseFloat(capacidadModal.querySelector('#gasto-transporte').value) || 0;
                
                console.log('Gastos totales:', gastoVivienda + gastoServicios + gastoAlimentacion + gastoTransporte);
                
                // Obtener valores de deudas
                const deudaTC = parseFloat(capacidadModal.querySelector('#deuda-tc').value) || 0;
                const deudaPrestamos = parseFloat(capacidadModal.querySelector('#deuda-prestamos').value) || 0;
                const deudaVehiculo = parseFloat(capacidadModal.querySelector('#deuda-vehiculo').value) || 0;
                const otrasDeudas = parseFloat(capacidadModal.querySelector('#otras-deudas').value) || 0;
                
                console.log('Deudas totales:', deudaTC + deudaPrestamos + deudaVehiculo + otrasDeudas);
                
                // Validar ingreso principal
                if (ingresoPrincipal <= 0) {
                    mostrarMensaje("Por favor ingresa tu ingreso principal", "error");
                    return;
                }
                
                // Calcular totales
                const ingresoTotal = ingresoPrincipal + ingresosAdicionales;
                const gastoTotal = gastoVivienda + gastoServicios + gastoAlimentacion + gastoTransporte;
                const deudaTotal = deudaTC + deudaPrestamos + deudaVehiculo + otrasDeudas;
                
                // Calcular capacidad de endeudamiento (30% de ingresos netos)
                const ingresoDisponible = ingresoTotal - gastoTotal;
                const capacidadMaxima = ingresoDisponible * 0.3;
                
                console.log('Ingreso disponible:', ingresoDisponible);
                console.log('Capacidad máxima (30%):', capacidadMaxima);
                
                // Calcular relación deuda/ingreso actual
                const relacionDeudaActual = (deudaTotal / ingresoTotal) * 100;
                
                // Calcular capacidad de endeudamiento adicional
                const capacidadAdicional = Math.max(0, capacidadMaxima - deudaTotal);
                
                console.log('Capacidad adicional:', capacidadAdicional);
                
                // Estimar monto de préstamo (36 meses al 18% anual)
                const tasaMensual = 0.18 / 12;
                const plazoMeses = 36;
                const montoEstimado = capacidadAdicional > 0 
                    ? capacidadAdicional * (1 - Math.pow(1 + tasaMensual, -plazoMeses)) / tasaMensual 
                    : 0;
                
                console.log('Monto estimado de préstamo:', montoEstimado);
                
                // Formatear valores
                const formatoMoneda = new Intl.NumberFormat('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                });
                
                const formatoPorcentaje = new Intl.NumberFormat('es-CO', {
                    style: 'percent',
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1
                });
                
                // Actualizar resultados - VERIFICANDO QUE LOS ELEMENTOS EXISTAN
                const capacidadValorElement = capacidadModal.querySelector('#capacidad-valor');
                const montoEstimadoElement = capacidadModal.querySelector('#monto-estimado');
                const relacionDeudaElement = capacidadModal.querySelector('#relacion-deuda');
                
                if (capacidadValorElement) {
                    capacidadValorElement.textContent = formatoMoneda.format(capacidadAdicional);
                    console.log('Capacidad valor actualizado a:', formatoMoneda.format(capacidadAdicional));
                }
                
                if (montoEstimadoElement) {
                    montoEstimadoElement.textContent = formatoMoneda.format(montoEstimado);
                }
                
                if (relacionDeudaElement) {
                    relacionDeudaElement.textContent = formatoPorcentaje.format(relacionDeudaActual / 100);
                }
                
                // Actualizar medidor - usando querySelector dentro del modal
                const medidorBarra = capacidadModal.querySelector('#medidor-barra');
                const medidorValor = capacidadModal.querySelector('#medidor-valor');
                const medidorMensaje = capacidadModal.querySelector('#medidor-mensaje');
                
                // Verificar que los elementos existen
                if (medidorBarra && medidorValor && medidorMensaje) {
                    medidorBarra.style.width = `${Math.min(100, relacionDeudaActual * 2)}%`;
                    medidorValor.textContent = formatoPorcentaje.format(relacionDeudaActual / 100);
                    
                    // Determinar color y mensaje según relación deuda/ingreso
                    let color, mensaje;
                    
                    if (relacionDeudaActual <= 20) {
                        color = '#2ecc71'; // Verde
                        mensaje = "Tu situación financiera es excelente. Tienes amplia capacidad para asumir nuevas deudas.";
                    } else if (relacionDeudaActual <= 30) {
                        color = '#27ae60'; // Verde oscuro
                        mensaje = "Tu situación financiera es buena. Tienes buena capacidad para asumir nuevas deudas.";
                    } else if (relacionDeudaActual <= 40) {
                        color = '#f39c12'; // Amarillo
                        mensaje = "Tu nivel de endeudamiento es moderado. Puedes asumir nuevas deudas pero con precaución.";
                    } else if (relacionDeudaActual <= 50) {
                        color = '#e67e22'; // Naranja
                        mensaje = "Tu nivel de endeudamiento es alto. Es recomendable reducir deudas antes de asumir nuevas.";
                    } else {
                        color = '#e74c3c'; // Rojo
                        mensaje = "Tu nivel de endeudamiento es muy alto. No es recomendable asumir nuevas deudas.";
                    }
                    
                    medidorBarra.style.backgroundColor = color;
                    medidorValor.style.color = color;
                    medidorMensaje.textContent = mensaje;
                } else {
                    console.error('No se encontraron los elementos del medidor');
                }
                
                // Generar recomendaciones - usando querySelector dentro del modal
                const recomendacionesLista = capacidadModal.querySelector('#recomendaciones-lista');
                if (recomendacionesLista) {
                    recomendacionesLista.innerHTML = '';
                    
                    // Lista base de recomendaciones
                    const recomendaciones = [
                        "Mantén siempre un fondo de emergencia equivalente a 3-6 meses de gastos.",
                        "No destines más del 30% de tus ingresos netos al pago de deudas.",
                        "Considera consolidar tus deudas si tienes múltiples préstamos con tasas altas."
                    ];
                    
                    // Añadir recomendaciones específicas según la situación
                    if (relacionDeudaActual > 40) {
                        recomendaciones.unshift("Prioriza pagar tus deudas actuales antes de adquirir nuevos préstamos.");
                    }
                    
                    if (gastoTotal > ingresoTotal * 0.7) {
                        recomendaciones.unshift("Tus gastos fijos son altos en relación a tus ingresos. Considera revisar tu presupuesto.");
                    }
                    
                    if (capacidadAdicional <= 0) {
                        recomendaciones.unshift("No tienes capacidad para asumir nuevas deudas. Enfócate en reducir tus gastos o incrementar tus ingresos.");
                    }
                    
                    // Añadir recomendaciones a la lista
                    recomendaciones.forEach(rec => {
                        const li = document.createElement('li');
                        li.textContent = rec;
                        recomendacionesLista.appendChild(li);
                    });
                } else {
                    console.error('No se encontró la lista de recomendaciones');
                }
                
                // Mostrar resultados - usando querySelector dentro del modal
                const resultadoSection = capacidadModal.querySelector('#capacidad-resultado');
                if (resultadoSection) {
                    resultadoSection.classList.remove('hidden');
                    console.log('Resultados mostrados correctamente');
                } else {
                    console.error('No se encontró la sección de resultados');
                }
            });
        } else {
            console.error('No se encontró el botón de calcular capacidad');
        }
        
        // Aplicar al simulador - CORREGIDO
        const aplicarCapacidadBtn = capacidadModal.querySelector('#aplicar-capacidad');
        if (aplicarCapacidadBtn) {
            aplicarCapacidadBtn.addEventListener('click', function() {
                const montoEstimadoEl = capacidadModal.querySelector('#monto-estimado');
                if (!montoEstimadoEl) {
                    console.error('No se encontró el elemento del monto estimado');
                    return;
                }
                
                const montoEstimado = montoEstimadoEl.textContent;
                const monto = parseFloat(montoEstimado.replace(/[^\d]/g, '')) || 0;
                
                if (monto > 0) {
                    // Actualizar valor en el simulador
                    const montoInput = document.getElementById('monto');
                    if (montoInput) {
                        montoInput.value = monto;
                        
                        // Cerrar modal
                        capacidadModal.classList.add('hidden');
                        
                        // Calcular préstamo si existe la función
                        if (typeof calcularPrestamo === 'function') {
                            calcularPrestamo();
                            mostrarMensaje("Monto aplicado al simulador", "success");
                        } else {
                            mostrarMensaje("Monto aplicado. Ahora puedes calcular tu préstamo", "success");
                        }
                    }
                } else {
                    mostrarMensaje("No hay un monto válido para aplicar", "error");
                }
            });
        }
        
        // Reiniciar cálculo - CORREGIDO
        const reiniciarCapacidadBtn = capacidadModal.querySelector('#reiniciar-capacidad');
        if (reiniciarCapacidadBtn) {
            reiniciarCapacidadBtn.addEventListener('click', function() {
                // Reiniciar formulario
                const inputs = capacidadModal.querySelectorAll('input[type="number"]');
                inputs.forEach(input => {
                    input.value = '';
                });
                
                // Ocultar resultados
                const resultadoSection = capacidadModal.querySelector('#capacidad-resultado');
                if (resultadoSection) {
                    resultadoSection.classList.add('hidden');
                }
                
                // Enfocar el primer campo
                const primerCampo = capacidadModal.querySelector('#ingreso-principal');
                if (primerCampo) {
                    primerCampo.focus();
                }
                
                mostrarMensaje("Formulario reiniciado", "info");
            });
        }
        
        /**
         * Muestra un mensaje al usuario
         * @param {string} mensaje - Texto del mensaje
         * @param {string} tipo - Tipo de mensaje (success, error, info, warning)
         */
        function mostrarMensaje(mensaje, tipo) {
            console.log(`Mensaje (${tipo}): ${mensaje}`);
            
            if (typeof window.mostrarToast === 'function') {
                window.mostrarToast(mensaje, tipo);
            } else if (typeof window.mostrarMensaje === 'function') {
                window.mostrarMensaje(mensaje, tipo);
            } else {
                // Implementación básica si no hay funciones de toast disponibles
                alert(mensaje);
            }
        }
    });
})();
