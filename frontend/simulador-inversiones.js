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
                        <!-- ... contenido existente ... -->
                    </div>
                    
                    <!-- Tab de Comparativa -->
                    <div class="inversion-tab-pane" id="comparativa-pane">
                        <!-- ... contenido existente ... -->
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
        
        // Resto de funciones
        
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