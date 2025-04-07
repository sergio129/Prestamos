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
        
        document.body.appendChild(inversionModal);
        
        // Configurar eventos
        inversionBtn.addEventListener('click', function() {
            inversionModal.classList.remove('hidden');
        });
        
        // Cerrar modal
        inversionModal.querySelector('.close-modal').addEventListener('click', function() {
            inversionModal.classList.add('hidden');
        });
        
        /**
         * Calcula la proyección de ahorro
         * @param {number} ahorroInicial - Monto inicial
         * @param {number} aporteMensual - Aporte mensual
         * @param {number} plazoAnios - Plazo en años
         * @param {number} rendimientoAnual - Rendimiento anual en porcentaje
         * @param {number} inflacionAnual - Inflación anual en porcentaje
         * @returns {Object} Resultado de la proyección
         */
        function calcularProyeccionAhorro(ahorroInicial, aporteMensual, plazoAnios, rendimientoAnual, inflacionAnual) {
            const rendimientoMensual = Math.pow(1 + rendimientoAnual / 100, 1/12) - 1;
            const inflacionMensual = Math.pow(1 + inflacionAnual / 100, 1/12) - 1;
            const meses = plazoAnios * 12;
            
            const saldosPorAnio = [];
            const aportesPorAnio = [];
            const interesesPorAnio = [];
            const valoresRealesPorAnio = [];
            
            let saldoActual = ahorroInicial;
            let aportesAcumulados = ahorroInicial;
            let interesesAcumulados = 0;
            let valorReal = ahorroInicial;
            
            for (let mes = 1; mes <= meses; mes++) {
                const interesMes = saldoActual * rendimientoMensual;
                interesesAcumulados += interesMes;
                
                saldoActual += interesMes + aporteMensual;
                aportesAcumulados += aporteMensual;
                
                valorReal = saldoActual / Math.pow(1 + inflacionMensual, mes);
                
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
         * @param {Object} resultado - Objeto con los resultados de la proyección
         */
        function mostrarResultadosAhorro(resultado) {
            const formatoMoneda = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
            
            document.getElementById('ahorro-total').textContent = formatoMoneda.format(resultado.saldoFinal);
            document.getElementById('intereses-ganados').textContent = formatoMoneda.format(resultado.interesesTotal);
            document.getElementById('valor-real').textContent = formatoMoneda.format(resultado.valorRealFinal);
            
            const tablaProyeccion = document.getElementById('tabla-proyeccion');
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
            
            generarGraficoAhorro(resultado);
        }
        
        /**
         * Genera el gráfico de proyección de ahorro
         * @param {Object} resultado - Resultado de la proyección
         */
        function generarGraficoAhorro(resultado) {
            const ctx = document.getElementById('chart-ahorro').getContext('2d');
            
            if (window.chartAhorro) {
                window.chartAhorro.destroy();
            }
            
            window.chartAhorro = new Chart(ctx, {
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
         * Calcula el rendimiento del portafolio de inversión
         * @param {number} capital - Capital a invertir
         * @param {Object} portafolio - Composición del portafolio
         * @param {number} plazo - Plazo en años
         * @param {number} inflacion - Inflación anual en porcentaje
         * @returns {Object} Resultados del rendimiento
         */
        function calcularRendimientoPortafolio(capital, portafolio, plazo, inflacion) {
            let rendimientoPonderado = 0;
            
            for (const tipo in portafolio) {
                if (portafolio.hasOwnProperty(tipo)) {
                    rendimientoPonderado += (portafolio[tipo].porcentaje / 100) * portafolio[tipo].rendimiento;
                }
            }
            
            const rendimientoReal = ((1 + rendimientoPonderado / 100) / (1 + inflacion / 100) - 1) * 100;
            
            const valorFuturo = capital * Math.pow(1 + rendimientoPonderado / 100, plazo);
            const valorRealFuturo = capital * Math.pow(1 + rendimientoReal / 100, plazo);
            
            const evolucionAnual = [];
            const evolucionRealAnual = [];
            
            for (let anio = 1; anio <= plazo; anio++) {
                evolucionAnual.push(capital * Math.pow(1 + rendimientoPonderado / 100, anio));
                evolucionRealAnual.push(capital * Math.pow(1 + rendimientoReal / 100, anio));
            }
            
            const pesoActivosRiesgo = (portafolio.rentaVariable.porcentaje + portafolio.alternativas.porcentaje) / 100;
            
            const nivelRiesgo = Math.min(100, Math.max(0, pesoActivosRiesgo * 100));
            
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
            
            document.getElementById('rendimiento-promedio').textContent = formatoPorcentaje.format(resultado.rendimientoPonderado / 100);
            document.getElementById('valor-final').textContent = formatoMoneda.format(resultado.valorFuturo);
            document.getElementById('crecimiento-real').textContent = formatoPorcentaje.format(resultado.rendimientoReal / 100);
            
            const riskIndicator = document.getElementById('risk-indicator');
            riskIndicator.style.width = `${resultado.nivelRiesgo}%`;
            
            if (resultado.categoriaRiesgo === 'bajo') {
                riskIndicator.style.backgroundColor = '#2ecc71';
            } else if (resultado.categoriaRiesgo === 'moderado') {
                riskIndicator.style.backgroundColor = '#f39c12';
            } else {
                riskIndicator.style.backgroundColor = '#e74c3c';
            }
            
            let riskDescription = '';
            if (resultado.categoriaRiesgo === 'bajo') {
                riskDescription = `Tu portafolio tiene un nivel de riesgo bajo con un rendimiento esperado del ${formatoPorcentaje.format(resultado.rendimientoPonderado / 100)} anual. Adecuado para perfiles conservadores.`;
            } else if (resultado.categoriaRiesgo === 'moderado') {
                riskDescription = `Tu portafolio tiene un nivel de riesgo moderado con un rendimiento esperado del ${formatoPorcentaje.format(resultado.rendimientoPonderado / 100)} anual. Equilibra crecimiento y seguridad.`;
            } else {
                riskDescription = `Tu portafolio tiene un nivel de riesgo alto con un rendimiento esperado del ${formatoPorcentaje.format(resultado.rendimientoPonderado / 100)} anual. Orientado al máximo crecimiento pero con mayor volatilidad.`;
            }
            
            document.getElementById('risk-description').textContent = riskDescription;
            
            generarGraficoPortafolio(portafolio);
            generarGraficoCrecimiento(resultado);
        }
        
        /**
         * Genera el gráfico de composición del portafolio
         * @param {Object} portafolio - Composición del portafolio
         */
        function generarGraficoPortafolio(portafolio) {
            const ctx = document.getElementById('chart-portfolio-allocation').getContext('2d');
            
            if (window.chartPortfolio) {
                window.chartPortfolio.destroy();
            }
            
            const labels = [];
            const data = [];
            const backgroundColors = [];
            
            const colores = {
                rentaFija: 'rgba(54, 162, 235, 0.8)',
                rentaVariable: 'rgba(255, 99, 132, 0.8)',
                inmobiliario: 'rgba(255, 206, 86, 0.8)',
                alternativas: 'rgba(75, 192, 192, 0.8)'
            };
            
            const nombres = {
                rentaFija: 'Renta Fija',
                rentaVariable: 'Renta Variable',
                inmobiliario: 'Inmobiliario',
                alternativas: 'Alternativas'
            };
            
            for (const tipo in portafolio) {
                if (portafolio.hasOwnProperty(tipo) && portafolio[tipo].porcentaje > 0) {
                    labels.push(`${nombres[tipo]} (${portafolio[tipo].porcentaje}%)`);
                    data.push(portafolio[tipo].porcentaje);
                    backgroundColors.push(colores[tipo]);
                }
            }
            
            window.chartPortfolio = new Chart(ctx, {
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
            const ctx = document.getElementById('chart-portfolio-growth').getContext('2d');
            
            if (window.chartGrowth) {
                window.chartGrowth.destroy();
            }
            
            const labels = Array.from({length: resultado.evolucionAnual.length}, (_, i) => i + 1);
            
            window.chartGrowth = new Chart(ctx, {
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
         * @returns {Object} Resultados de la comparación
         */
        function compararAlternativas(monto, alternativas, plazo, inflacion) {
            const resultados = [];
            
            alternativas.forEach(alt => {
                const rendimientoReal = ((1 + alt.rendimiento / 100) / (1 + inflacion / 100) - 1) * 100;
                
                const valorFuturo = monto * Math.pow(1 + alt.rendimiento / 100, plazo);
                const valorRealFuturo = monto * Math.pow(1 + rendimientoReal / 100, plazo);
                
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
            
            resultados.sort((a, b) => b.rendimiento - a.rendimiento);
            
            return resultados;
        }
        
        /**
         * Muestra los resultados de la comparativa de alternativas
         * @param {Array} resultados - Resultados de la comparación
         * @param {Array} alternativas - Alternativas comparadas
         */
        function mostrarResultadosComparativa(resultados, alternativas) {
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
            
            const tablaComparativa = document.getElementById('tabla-comparativa');
            tablaComparativa.innerHTML = '';
            
            resultados.forEach(res => {
                const fila = document.createElement('tr');
                
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
            
            const mejorAlternativa = resultados[0];
            const conclusion = `Basado en las proyecciones, la alternativa con mayor rentabilidad sería ${mejorAlternativa.nombre} con un valor final de ${formatoMoneda.format(mejorAlternativa.valorFuturo)} (rendimiento anual del ${formatoPorcentaje.format(mejorAlternativa.rendimiento / 100)}). En términos de valor real ajustado por inflación, terminará con ${formatoMoneda.format(mejorAlternativa.valorRealFuturo)}.`;
            
            document.getElementById('conclusion-comparativa').textContent = conclusion;
            
            generarGraficoComparativa(resultados);
        }
        
        /**
         * Genera el gráfico comparativo de alternativas
         * @param {Array} resultados - Resultados de la comparación
         */
        function generarGraficoComparativa(resultados) {
            const ctx = document.getElementById('chart-comparativa').getContext('2d');
            
            if (window.chartComparativa) {
                window.chartComparativa.destroy();
            }
            
            const plazo = resultados[0].evolucionAnual.length;
            const labels = Array.from({length: plazo}, (_, i) => i + 1);
            
            const datasets = resultados.map(res => {
                return {
                    label: res.nombre,
                    data: res.evolucionAnual,
                    backgroundColor: res.color + '20',
                    borderColor: res.color,
                    borderWidth: 2,
                    fill: false
                };
            });
            
            window.chartComparativa = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options: {
                    responsive: true,
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
         * Formatea un número con comas como separadores de miles
         * @param {number} valor - Valor a formatear
         * @returns {string} Valor formateado
         */
        function formatoMilesComa(valor) {
            return new Intl.NumberFormat('es-CO', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(valor);
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
    });
})();