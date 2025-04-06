/**
 * Análisis Financiero Avanzado
 * Proporciona métricas y gráficos avanzados para analizar la situación financiera
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando análisis financiero...');
    
    // Esperar a que exista el contenedor del análisis
    const intervalo = setInterval(() => {
        const analisisContenido = document.getElementById('analisis-contenido');
        if (analisisContenido) {
            clearInterval(intervalo);
            inicializarAnalisis(analisisContenido);
        }
    }, 100);
    
    /**
     * Inicializa el módulo de análisis financiero
     * @param {HTMLElement} contenedor - El contenedor donde se creará el análisis
     */
    function inicializarAnalisis(contenedor) {
        // Crear la estructura del análisis financiero
        contenedor.innerHTML = `
            <div class="analisis-financiero">
                <h4>Análisis Financiero Personal</h4>
                <p>Analiza tu situación financiera y la viabilidad de tus préstamos.</p>
                
                <div class="analisis-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="analisis-ingresos">Ingresos mensuales:</label>
                            <div class="input-icon">
                                <span class="currency-symbol">$</span>
                                <input type="number" id="analisis-ingresos" placeholder="Tus ingresos mensuales">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="analisis-gastos">Gastos fijos mensuales:</label>
                            <div class="input-icon">
                                <span class="currency-symbol">$</span>
                                <input type="number" id="analisis-gastos" placeholder="Tus gastos mensuales">
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="analisis-deudas">Deudas actuales (mensual):</label>
                            <div class="input-icon">
                                <span class="currency-symbol">$</span>
                                <input type="number" id="analisis-deudas" placeholder="Cuotas mensuales de deudas actuales">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="analisis-ahorro">Ahorro mensual actual:</label>
                            <div class="input-icon">
                                <span class="currency-symbol">$</span>
                                <input type="number" id="analisis-ahorro" placeholder="Tu ahorro mensual">
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="analisis-monto">Monto del nuevo préstamo:</label>
                            <div class="input-icon">
                                <span class="currency-symbol">$</span>
                                <input type="number" id="analisis-monto" placeholder="Monto del préstamo a simular">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="analisis-plazo">Plazo (meses):</label>
                            <input type="number" id="analisis-plazo" min="1" max="360" placeholder="Plazo en meses">
                        </div>
                        <div class="form-group">
                            <label for="analisis-tasa">Tasa de interés mensual (%):</label>
                            <input type="number" id="analisis-tasa" step="0.01" min="0.1" max="10" placeholder="Tasa mensual">
                        </div>
                    </div>
                    
                    <button id="analizar-finanzas" class="btn">Analizar Situación Financiera</button>
                </div>
                
                <div id="resultados-analisis" class="hidden">
                    <h5>Diagnóstico Financiero</h5>
                    
                    <div class="dashboard-metrics">
                        <div class="metric-card">
                            <div class="metric-title">Capacidad de Pago</div>
                            <div class="metric-value" id="capacidad-pago">0%</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-title">Nivel de Endeudamiento</div>
                            <div class="metric-value" id="nivel-endeudamiento">0%</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-title">Liquidez Mensual</div>
                            <div class="metric-value" id="liquidez-mensual">$0</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-title">Balance Financiero</div>
                            <div class="metric-value" id="balance-financiero">Bajo análisis</div>
                        </div>
                    </div>
                    
                    <div class="analisis-grafico">
                        <h6>Distribución de Ingresos</h6>
                        <div class="analysis-chart" id="distribucion-chart"></div>
                    </div>
                    
                    <div class="analisis-recomendaciones">
                        <h6>Recomendaciones</h6>
                        <ul id="lista-recomendaciones">
                            <!-- Se llenará dinámicamente -->
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        // Configurar el evento para analizar finanzas
        document.getElementById('analizar-finanzas').addEventListener('click', function() {
            // Obtener valores de entrada
            const ingresos = parseFloat(document.getElementById('analisis-ingresos').value) || 0;
            const gastos = parseFloat(document.getElementById('analisis-gastos').value) || 0;
            const deudasActuales = parseFloat(document.getElementById('analisis-deudas').value) || 0;
            const ahorroActual = parseFloat(document.getElementById('analisis-ahorro').value) || 0;
            const montoPrestamo = parseFloat(document.getElementById('analisis-monto').value) || 0;
            const plazo = parseInt(document.getElementById('analisis-plazo').value) || 0;
            const tasaMensual = parseFloat(document.getElementById('analisis-tasa').value) || 0;
            
            // Validar entradas
            if (ingresos <= 0) {
                mostrarMensajePersonalizado("Ingrese un valor válido para ingresos mensuales", "error");
                return;
            }
            
            if (montoPrestamo <= 0 || plazo <= 0 || tasaMensual <= 0) {
                mostrarMensajePersonalizado("Complete todos los datos del préstamo", "error");
                return;
            }
            
            // Calcular cuota mensual del nuevo préstamo
            const cuotaMensual = calcularCuotaMensual(montoPrestamo, tasaMensual / 100, plazo);
            
            // Realizar análisis financiero
            const resultadoAnalisis = analizarSituacionFinanciera(
                ingresos, 
                gastos, 
                deudasActuales, 
                ahorroActual,
                cuotaMensual
            );
            
            // Mostrar resultados
            mostrarResultadosAnalisis(resultadoAnalisis, ingresos, gastos, deudasActuales, cuotaMensual, ahorroActual);
        });
    }
    
    /**
     * Calcula la cuota mensual de un préstamo
     * @param {number} monto - Monto del préstamo
     * @param {number} tasaMensual - Tasa de interés mensual en decimal
     * @param {number} plazo - Plazo del préstamo en meses
     * @returns {number} - Cuota mensual
     */
    function calcularCuotaMensual(monto, tasaMensual, plazo) {
        return monto * (tasaMensual * Math.pow(1 + tasaMensual, plazo)) / (Math.pow(1 + tasaMensual, plazo) - 1);
    }
    
    /**
     * Analiza la situación financiera
     * @param {number} ingresos - Ingresos mensuales
     * @param {number} gastos - Gastos fijos mensuales
     * @param {number} deudasActuales - Pagos mensuales de deudas actuales
     * @param {number} ahorroActual - Ahorro mensual actual
     * @param {number} cuotaNueva - Cuota mensual del nuevo préstamo
     * @returns {Object} - Resultado del análisis
     */
    function analizarSituacionFinanciera(ingresos, gastos, deudasActuales, ahorroActual, cuotaNueva) {
        // Calcular capacidad de pago (porcentaje de ingresos que se destinarían a deudas totales)
        const deudasTotales = deudasActuales + cuotaNueva;
        const capacidadPago = (deudasTotales / ingresos) * 100;
        
        // Calcular nivel de endeudamiento total (incluyendo gastos)
        const gastosTotales = gastos + deudasTotales;
        const nivelEndeudamiento = (gastosTotales / ingresos) * 100;
        
        // Calcular liquidez mensual después del nuevo préstamo
        const liquidezMensual = ingresos - gastos - deudasTotales;
        
        // Evaluar balance financiero
        let balanceFinanciero = '';
        let color = '';
        
        if (capacidadPago > 40) {
            balanceFinanciero = 'Crítico';
            color = '#e74c3c'; // Rojo
        } else if (capacidadPago > 30) {
            balanceFinanciero = 'Riesgoso';
            color = '#e67e22'; // Naranja
        } else if (capacidadPago > 20) {
            balanceFinanciero = 'Precaución';
            color = '#f1c40f'; // Amarillo
        } else {
            balanceFinanciero = 'Saludable';
            color = '#2ecc71'; // Verde
        }
        
        // Generar recomendaciones
        const recomendaciones = [];
        
        if (capacidadPago > 35) {
            recomendaciones.push('Considere reducir el monto del préstamo o extender el plazo para disminuir la cuota mensual.');
            recomendaciones.push('Busque formas de aumentar sus ingresos o reducir sus gastos fijos.');
        }
        
        if (nivelEndeudamiento > 70) {
            recomendaciones.push('Su nivel de endeudamiento es muy alto. Enfóquese en pagar deudas antes de adquirir nuevas obligaciones.');
            recomendaciones.push('Elabore un presupuesto estricto para reducir gastos no esenciales.');
        }
        
        if (liquidezMensual < 0) {
            recomendaciones.push('¡Alerta! Sus gastos superarían sus ingresos. Este préstamo no es viable en su situación actual.');
            recomendaciones.push('Reconsidere completamente este préstamo o busque alternativas más económicas.');
        } else if (liquidezMensual < (ingresos * 0.1)) {
            recomendaciones.push('Su margen financiero sería muy ajustado. Considere crear un fondo de emergencia antes de adquirir el préstamo.');
        }
        
        if (recomendaciones.length === 0) {
            recomendaciones.push('Su situación financiera es favorable para este préstamo.');
            recomendaciones.push('Considere destinar parte de su liquidez mensual a un fondo de emergencia o inversiones.');
        }
        
        return {
            capacidadPago,
            nivelEndeudamiento,
            liquidezMensual,
            balanceFinanciero,
            color,
            recomendaciones
        };
    }
    
    /**
     * Muestra los resultados del análisis financiero
     * @param {Object} resultado - Resultado del análisis
     * @param {number} ingresos - Ingresos mensuales
     * @param {number} gastos - Gastos fijos
     * @param {number} deudasActuales - Deudas actuales
     * @param {number} cuotaNueva - Cuota del nuevo préstamo
     * @param {number} ahorroActual - Ahorro actual
     */
    function mostrarResultadosAnalisis(resultado, ingresos, gastos, deudasActuales, cuotaNueva, ahorroActual) {
        const resultadosContainer = document.getElementById('resultados-analisis');
        
        // Mostrar el contenedor de resultados
        resultadosContainer.classList.remove('hidden');
        
        // Formatear valores para mostrar
        const formatoMoneda = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        });
        
        // Actualizar métricas
        document.getElementById('capacidad-pago').textContent = resultado.capacidadPago.toFixed(1) + '%';
        document.getElementById('nivel-endeudamiento').textContent = resultado.nivelEndeudamiento.toFixed(1) + '%';
        document.getElementById('liquidez-mensual').textContent = formatoMoneda.format(resultado.liquidezMensual);
        
        const balanceElement = document.getElementById('balance-financiero');
        balanceElement.textContent = resultado.balanceFinanciero;
        balanceElement.style.color = resultado.color;
        
        // Actualizar recomendaciones
        const listaRecomendaciones = document.getElementById('lista-recomendaciones');
        listaRecomendaciones.innerHTML = '';
        
        resultado.recomendaciones.forEach(recomendacion => {
            const li = document.createElement('li');
            li.textContent = recomendacion;
            listaRecomendaciones.appendChild(li);
        });
        
        // Crear gráfico de distribución de ingresos
        crearGraficoDistribucion(ingresos, gastos, deudasActuales, cuotaNueva, ahorroActual, resultado.liquidezMensual);
        
        // Mostrar mensaje de éxito
        mostrarMensajePersonalizado("Análisis financiero completado", "success");
    }
    
    /**
     * Crea un gráfico de distribución de ingresos
     * @param {number} ingresos - Ingresos mensuales
     * @param {number} gastos - Gastos fijos
     * @param {number} deudasActuales - Deudas actuales
     * @param {number} cuotaNueva - Cuota del nuevo préstamo
     * @param {number} ahorroActual - Ahorro actual
     * @param {number} liquidezRestante - Liquidez restante
     */
    function crearGraficoDistribucion(ingresos, gastos, deudasActuales, cuotaNueva, ahorroActual, liquidezRestante) {
        const canvas = document.getElementById('distribucion-chart');
        
        // Destruir gráfico anterior si existe
        const graficoAnterior = Chart.getChart(canvas);
        if (graficoAnterior) {
            graficoAnterior.destroy();
        }
        
        // Ajustar valores para que sumen 100%
        let total = gastos + deudasActuales + cuotaNueva;
        
        // Si hay liquidez negativa, ajustar los valores
        let ajusteNegativo = 0;
        if (liquidezRestante < 0) {
            ajusteNegativo = Math.abs(liquidezRestante);
            liquidezRestante = 0;
        }
        
        // Considerar ahorro como parte de la distribución si es mayor que cero
        let ahorroAjustado = ahorroActual;
        if (ahorroAjustado > liquidezRestante) {
            ahorroAjustado = liquidezRestante;
        }
        
        // Liquidez libre es lo que queda después de gastos, deudas, cuota nueva y ahorro
        let liquidezLibre = Math.max(0, liquidezRestante - ahorroAjustado);
        
        // Crear nuevo gráfico
        new Chart(canvas, {
            type: 'pie',
            data: {
                labels: [
                    'Gastos fijos',
                    'Deudas actuales',
                    'Nueva cuota',
                    'Ahorro',
                    'Liquidez disponible'
                ],
                datasets: [{
                    data: [
                        gastos,
                        deudasActuales,
                        cuotaNueva,
                        ahorroAjustado,
                        liquidezLibre
                    ],
                    backgroundColor: [
                        '#3498db', // Azul
                        '#e74c3c', // Rojo
                        '#f39c12', // Naranja
                        '#2ecc71', // Verde
                        '#9b59b6'  // Morado
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                const percentage = ((value / ingresos) * 100).toFixed(1);
                                
                                const formatoMoneda = new Intl.NumberFormat('es-CO', {
                                    style: 'currency',
                                    currency: 'COP',
                                    minimumFractionDigits: 0
                                });
                                
                                return `${label}: ${formatoMoneda.format(value)} (${percentage}%)`;
                            }
                        }
                    },
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    }
    
    /**
     * Muestra un mensaje personalizado tipo toast
     * @param {string} mensaje - Mensaje a mostrar
     * @param {string} tipo - Tipo de mensaje: success, error, info, warning
     */
    function mostrarMensajePersonalizado(mensaje, tipo = "info") {
        // Primero intentar usar la función global si existe
        if (typeof window.mostrarToast === 'function') {
            window.mostrarToast(mensaje, tipo);
            return;
        }
        
        // Si no existe, crear un toast simple
        let toastContainer = document.querySelector('.toast-container');
        
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            toastContainer.style.position = 'fixed';
            toastContainer.style.top = '20px';
            toastContainer.style.right = '20px';
            toastContainer.style.zIndex = '10000';
            document.body.appendChild(toastContainer);
        }
        
        const toast = document.createElement('div');
        toast.className = `toast toast-${tipo}`;
        toast.style.minWidth = '250px';
        toast.style.marginBottom = '10px';
        toast.style.padding = '15px';
        toast.style.borderRadius = '4px';
        toast.style.color = 'white';
        toast.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        
        // Establecer color según tipo
        switch (tipo) {
            case 'success': toast.style.backgroundColor = '#2ecc71'; break;
            case 'error': toast.style.backgroundColor = '#e74c3c'; break;
            case 'warning': toast.style.backgroundColor = '#f39c12'; break;
            default: toast.style.backgroundColor = '#3498db'; // info
        }
        
        toast.textContent = mensaje;
        
        toastContainer.appendChild(toast);
        
        // Eliminar después de 3 segundos
        setTimeout(() => {
            if (toast.parentNode === toastContainer) {
                toastContainer.removeChild(toast);
            }
        }, 3000);
    }
});
