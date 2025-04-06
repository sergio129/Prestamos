/**
 * Herramientas Financieras Avanzadas
 * Este archivo integra múltiples herramientas financieras en un solo módulo
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando Herramientas Financieras Avanzadas...');
    
    // Crear botón de herramientas avanzadas
    const container = document.querySelector('.container');
    const btnHerramientas = document.createElement('button');
    btnHerramientas.className = 'btn-herramientas-avanzadas';
    btnHerramientas.innerHTML = '<i class="fas fa-calculator"></i> Herramientas Financieras Avanzadas';
    container.appendChild(btnHerramientas);
    
    // Crear modal de herramientas avanzadas
    const herramientasModal = document.createElement('div');
    herramientasModal.className = 'herramientas-modal';
    herramientasModal.id = 'herramientas-modal';
    
    herramientasModal.innerHTML = `
        <div class="herramientas-container">
            <div class="herramientas-header">
                <h2>Herramientas Financieras Avanzadas</h2>
                <button class="herramientas-close">&times;</button>
            </div>
            
            <div class="herramientas-tabs">
                <div class="herramientas-tab active" data-panel="tir-panel">Calculadora TIR</div>
                <div class="herramientas-tab" data-panel="comparador-panel">Comparador de Préstamos</div>
                <div class="herramientas-tab" data-panel="analisis-panel">Análisis Financiero</div>
            </div>
            
            <div class="herramientas-content">
                <!-- Panel Calculadora TIR -->
                <div id="tir-panel" class="herramientas-panel active">
                    <div class="tir-calculator">
                        <h3>Calculadora de Tasa Interna de Retorno (TIR)</h3>
                        <p>Calcula la rentabilidad real de tu inversión o préstamo.</p>
                        
                        <div class="herramientas-form-group">
                            <label for="tir-inversion">Inversión inicial:</label>
                            <input type="number" id="tir-inversion" placeholder="Monto de inversión inicial">
                        </div>
                        
                        <div class="herramientas-form-group">
                            <label for="tir-flujos">Flujos de caja (separados por coma):</label>
                            <input type="text" id="tir-flujos" placeholder="Ejemplo: 1000,1200,1300,1500">
                        </div>
                        
                        <div class="herramientas-form-group">
                            <label for="tir-periodo">Período (años):</label>
                            <input type="number" id="tir-periodo" min="1" step="0.5" value="1">
                        </div>
                        
                        <button id="calcular-tir" class="herramientas-btn">Calcular TIR</button>
                        
                        <div id="tir-resultado" class="tir-result" style="display: none;">
                            <div id="tir-valor" class="tir-value">0.00%</div>
                            <p id="tir-interpretacion" class="tir-interpretation">La interpretación aparecerá aquí...</p>
                        </div>
                    </div>
                </div>
                
                <!-- Panel Comparador de Préstamos -->
                <div id="comparador-panel" class="herramientas-panel">
                    <h3>Comparador Avanzado de Préstamos</h3>
                    <p>Compara diferentes opciones de préstamos para encontrar la mejor opción.</p>
                    
                    <div class="herramientas-form-row">
                        <div class="herramientas-form-group">
                            <label for="comp-monto">Monto base:</label>
                            <input type="number" id="comp-monto" placeholder="Monto del préstamo">
                        </div>
                        <div class="herramientas-form-group">
                            <label for="comp-plazo">Plazo base (meses):</label>
                            <input type="number" id="comp-plazo" min="1" max="360" value="12">
                        </div>
                    </div>
                    
                    <h4>Opciones a comparar</h4>
                    
                    <div class="herramientas-form-row">
                        <div class="herramientas-form-group">
                            <label for="opcion1-nombre">Opción 1 - Nombre/Banco:</label>
                            <input type="text" id="opcion1-nombre" placeholder="Banco A">
                        </div>
                        <div class="herramientas-form-group">
                            <label for="opcion1-tasa">Tasa de interés mensual (%):</label>
                            <input type="number" id="opcion1-tasa" step="0.01" min="0.1" value="1.2">
                        </div>
                    </div>
                    
                    <div class="herramientas-form-row">
                        <div class="herramientas-form-group">
                            <label for="opcion2-nombre">Opción 2 - Nombre/Banco:</label>
                            <input type="text" id="opcion2-nombre" placeholder="Banco B">
                        </div>
                        <div class="herramientas-form-group">
                            <label for="opcion2-tasa">Tasa de interés mensual (%):</label>
                            <input type="number" id="opcion2-tasa" step="0.01" min="0.1" value="1.5">
                        </div>
                    </div>
                    
                    <div class="herramientas-form-row">
                        <div class="herramientas-form-group">
                            <label for="opcion3-nombre">Opción 3 - Nombre/Banco:</label>
                            <input type="text" id="opcion3-nombre" placeholder="Banco C">
                        </div>
                        <div class="herramientas-form-group">
                            <label for="opcion3-tasa">Tasa de interés mensual (%):</label>
                            <input type="number" id="opcion3-tasa" step="0.01" min="0.1" value="1.8">
                        </div>
                    </div>
                    
                    <button id="comparar-prestamos" class="herramientas-btn">Comparar Préstamos</button>
                    
                    <div id="resultado-comparacion" class="prestamos-grid" style="display: none;">
                        <!-- Resultados dinámicos -->
                    </div>
                </div>
                
                <!-- Panel Análisis Financiero -->
                <div id="analisis-panel" class="herramientas-panel">
                    <h3>Análisis Financiero Personal</h3>
                    <p>Evalúa tu situación financiera y la viabilidad de tus préstamos.</p>
                    
                    <div class="herramientas-form-row">
                        <div class="herramientas-form-group">
                            <label for="analisis-ingresos">Ingresos mensuales:</label>
                            <input type="number" id="analisis-ingresos" placeholder="Ingresos netos mensuales">
                        </div>
                        <div class="herramientas-form-group">
                            <label for="analisis-gastos">Gastos fijos mensuales:</label>
                            <input type="number" id="analisis-gastos" placeholder="Gastos fijos como alquiler, servicios, etc.">
                        </div>
                    </div>
                    
                    <div class="herramientas-form-row">
                        <div class="herramientas-form-group">
                            <label for="analisis-deudas">Pagos de deudas actuales:</label>
                            <input type="number" id="analisis-deudas" placeholder="Suma de cuotas mensuales actuales">
                        </div>
                        <div class="herramientas-form-group">
                            <label for="analisis-ahorro">Ahorro mensual actual:</label>
                            <input type="number" id="analisis-ahorro" placeholder="Monto que ahorras mensualmente">
                        </div>
                    </div>
                    
                    <div class="herramientas-form-row">
                        <div class="herramientas-form-group">
                            <label for="analisis-monto">Monto del nuevo préstamo:</label>
                            <input type="number" id="analisis-monto" placeholder="Monto del préstamo que deseas">
                        </div>
                        <div class="herramientas-form-group">
                            <label for="analisis-plazo">Plazo (meses):</label>
                            <input type="number" id="analisis-plazo" min="1" max="360" value="12">
                        </div>
                        <div class="herramientas-form-group">
                            <label for="analisis-tasa">Tasa de interés mensual (%):</label>
                            <input type="number" id="analisis-tasa" step="0.01" min="0.1" value="1.5">
                        </div>
                    </div>
                    
                    <button id="analizar-finanzas" class="herramientas-btn">Analizar Situación Financiera</button>
                    
                    <div id="resultado-analisis" style="display: none;">
                        <h4>Diagnóstico Financiero</h4>
                        
                        <div class="financiero-dashboard">
                            <div class="financiero-card">
                                <div class="financiero-card-title">Capacidad de Pago</div>
                                <div id="capacidad-pago" class="financiero-card-value">0%</div>
                            </div>
                            <div class="financiero-card">
                                <div class="financiero-card-title">Nivel de Endeudamiento</div>
                                <div id="nivel-endeudamiento" class="financiero-card-value">0%</div>
                            </div>
                            <div class="financiero-card">
                                <div class="financiero-card-title">Liquidez Mensual</div>
                                <div id="liquidez-mensual" class="financiero-card-value">$0</div>
                            </div>
                            <div class="financiero-card">
                                <div class="financiero-card-title">Balance Financiero</div>
                                <div id="balance-financiero" class="financiero-card-value">Pendiente</div>
                            </div>
                        </div>
                        
                        <div class="chart-container">
                            <canvas id="distribucion-chart"></canvas>
                        </div>
                        
                        <div class="recomendaciones-container">
                            <h4>Recomendaciones</h4>
                            <ul id="recomendaciones-lista">
                                <!-- Recomendaciones dinámicas -->
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(herramientasModal);
    
    // Configurar eventos
    
    // Evento para mostrar el modal
    btnHerramientas.addEventListener('click', function() {
        herramientasModal.style.display = 'block';
    });
    
    // Evento para cerrar el modal
    document.querySelector('.herramientas-close').addEventListener('click', function() {
        herramientasModal.style.display = 'none';
    });
    
    // Cerrar modal al hacer clic fuera del contenido
    herramientasModal.addEventListener('click', function(e) {
        if (e.target === herramientasModal) {
            herramientasModal.style.display = 'none';
        }
    });
    
    // Cambio de pestañas
    document.querySelectorAll('.herramientas-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            // Desactivar todas las pestañas y paneles
            document.querySelectorAll('.herramientas-tab').forEach(t => {
                t.classList.remove('active');
            });
            document.querySelectorAll('.herramientas-panel').forEach(p => {
                p.classList.remove('active');
            });
            
            // Activar la pestaña seleccionada
            this.classList.add('active');
            
            // Activar el panel correspondiente
            const panelId = this.getAttribute('data-panel');
            document.getElementById(panelId).classList.add('active');
        });
    });
    
    // ===============================================================
    // Implementación de la Calculadora TIR
    // ===============================================================
    document.getElementById('calcular-tir').addEventListener('click', function() {
        const inversionInicial = parseFloat(document.getElementById('tir-inversion').value);
        const flujosTexto = document.getElementById('tir-flujos').value;
        const periodo = parseFloat(document.getElementById('tir-periodo').value) || 1;
        
        // Validar entradas
        if (!inversionInicial || inversionInicial <= 0) {
            mostrarMensaje("Ingrese una inversión inicial válida", "error");
            return;
        }
        
        if (!flujosTexto) {
            mostrarMensaje("Ingrese los flujos de caja separados por coma", "error");
            return;
        }
        
        // Convertir flujos a array de números
        const flujos = flujosTexto.split(',')
            .map(f => parseFloat(f.trim()))
            .filter(f => !isNaN(f));
        
        if (flujos.length === 0) {
            mostrarMensaje("Ingrese flujos de caja válidos", "error");
            return;
        }
        
        // Calcular TIR
        const tir = calcularTIR(-inversionInicial, ...flujos);
        
        // Anualizar la TIR según el período
        const tirAnual = Math.pow(1 + tir, 1 / periodo) - 1;
        
        // Mostrar resultado
        const resultadoTIR = document.getElementById('tir-resultado');
        const valorTIR = document.getElementById('tir-valor');
        const interpretacionTIR = document.getElementById('tir-interpretacion');
        
        resultadoTIR.style.display = 'block';
        valorTIR.textContent = (tirAnual * 100).toFixed(2) + '%';
        
        // Generar interpretación
        let interpretacion = '';
        if (tirAnual > 0.15) {
            interpretacion = 'Excelente rentabilidad. Esta inversión/préstamo ofrece retornos muy altos.';
        } else if (tirAnual > 0.10) {
            interpretacion = 'Buena rentabilidad. Esta inversión/préstamo genera retornos atractivos.';
        } else if (tirAnual > 0.05) {
            interpretacion = 'Rentabilidad moderada. Esta inversión/préstamo tiene retornos aceptables.';
        } else if (tirAnual > 0) {
            interpretacion = 'Rentabilidad baja. Esta inversión/préstamo tiene retornos limitados.';
        } else {
            interpretacion = 'Rentabilidad negativa. Esta inversión/préstamo no es rentable.';
        }
        
        interpretacionTIR.textContent = interpretacion;
    });
    
    // ===============================================================
    // Implementación del Comparador de Préstamos
    // ===============================================================
    document.getElementById('comparar-prestamos').addEventListener('click', function() {
        const monto = parseFloat(document.getElementById('comp-monto').value);
        const plazo = parseInt(document.getElementById('comp-plazo').value);
        
        // Validar entradas básicas
        if (!monto || monto <= 0) {
            mostrarMensaje("Ingrese un monto válido para el préstamo", "error");
            return;
        }
        
        if (!plazo || plazo <= 0) {
            mostrarMensaje("Ingrese un plazo válido en meses", "error");
            return;
        }
        
        // Recopilar datos de las opciones
        const opciones = [];
        
        for (let i = 1; i <= 3; i++) {
            const nombre = document.getElementById(`opcion${i}-nombre`).value || `Opción ${i}`;
            const tasa = parseFloat(document.getElementById(`opcion${i}-tasa`).value);
            
            if (!tasa || tasa <= 0) {
                mostrarMensaje(`Ingrese una tasa válida para la opción ${i}`, "error");
                return;
            }
            
            // Calcular detalles del préstamo
            const tasaMensual = tasa / 100;
            const cuotaMensual = calcularCuotaMensual(monto, tasaMensual, plazo);
            const totalPagar = cuotaMensual * plazo;
            const totalIntereses = totalPagar - monto;
            const tasaAnual = (Math.pow(1 + tasaMensual, 12) - 1) * 100;
            
            opciones.push({
                nombre: nombre,
                tasa: tasa,
                tasaAnual: tasaAnual,
                cuotaMensual: cuotaMensual,
                totalPagar: totalPagar,
                totalIntereses: totalIntereses
            });
        }
        
        // Encontrar la mejor opción (menor total a pagar)
        const mejorOpcion = opciones.reduce((prev, current) => 
            (prev.totalPagar < current.totalPagar) ? prev : current
        );
        
        // Mostrar resultados
        const resultadoContainer = document.getElementById('resultado-comparacion');
        resultadoContainer.style.display = 'grid';
        resultadoContainer.innerHTML = '';
        
        // Formatear moneda
        const formatoMoneda = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        });
        
        // Crear tarjetas para cada opción
        opciones.forEach(opcion => {
            const esMejorOpcion = opcion === mejorOpcion;
            const card = document.createElement('div');
            card.className = 'prestamo-card';
            
            card.innerHTML = `
                <div class="prestamo-header">
                    <h4>${opcion.nombre} ${esMejorOpcion ? '<span class="recomendado-badge">Recomendado</span>' : ''}</h4>
                </div>
                <div class="prestamo-body">
                    <div class="prestamo-detail">
                        <span>Monto:</span>
                        <strong>${formatoMoneda.format(monto)}</strong>
                    </div>
                    <div class="prestamo-detail">
                        <span>Plazo:</span>
                        <strong>${plazo} meses</strong>
                    </div>
                    <div class="prestamo-detail">
                        <span>Tasa mensual:</span>
                        <strong>${opcion.tasa.toFixed(2)}%</strong>
                    </div>
                    <div class="prestamo-detail">
                        <span>Tasa anual:</span>
                        <strong>${opcion.tasaAnual.toFixed(2)}%</strong>
                    </div>
                    <div class="prestamo-detail">
                        <span>Cuota mensual:</span>
                        <strong>${formatoMoneda.format(opcion.cuotaMensual)}</strong>
                    </div>
                    <div class="prestamo-detail">
                        <span>Total a pagar:</span>
                        <strong>${formatoMoneda.format(opcion.totalPagar)}</strong>
                    </div>
                    <div class="prestamo-detail">
                        <span>Total intereses:</span>
                        <strong>${formatoMoneda.format(opcion.totalIntereses)}</strong>
                    </div>
                </div>
            `;
            
            // Resaltar la mejor opción
            if (esMejorOpcion) {
                card.style.borderColor = '#4caf50';
                card.style.boxShadow = '0 0 8px rgba(76, 175, 80, 0.5)';
            }
            
            resultadoContainer.appendChild(card);
        });
        
        mostrarMensaje("Comparación de préstamos completada", "success");
    });
    
    // ===============================================================
    // Implementación del Análisis Financiero
    // ===============================================================
    document.getElementById('analizar-finanzas').addEventListener('click', function() {
        const ingresos = parseFloat(document.getElementById('analisis-ingresos').value);
        const gastos = parseFloat(document.getElementById('analisis-gastos').value);
        const deudasActuales = parseFloat(document.getElementById('analisis-deudas').value) || 0;
        const ahorroActual = parseFloat(document.getElementById('analisis-ahorro').value) || 0;
        const montoPrestamo = parseFloat(document.getElementById('analisis-monto').value);
        const plazo = parseInt(document.getElementById('analisis-plazo').value);
        const tasa = parseFloat(document.getElementById('analisis-tasa').value);
        
        // Validar entradas
        if (!ingresos || ingresos <= 0) {
            mostrarMensaje("Ingrese un valor válido para ingresos mensuales", "error");
            return;
        }
        
        if (!gastos || gastos < 0) {
            mostrarMensaje("Ingrese un valor válido para gastos mensuales", "error");
            return;
        }
        
        if (!montoPrestamo || montoPrestamo <= 0) {
            mostrarMensaje("Ingrese un monto válido para el préstamo", "error");
            return;
        }
        
        if (!plazo || plazo <= 0) {
            mostrarMensaje("Ingrese un plazo válido en meses", "error");
            return;
        }
        
        if (!tasa || tasa <= 0) {
            mostrarMensaje("Ingrese una tasa de interés válida", "error");
            return;
        }
        
        // Calcular cuota mensual del nuevo préstamo
        const tasaMensual = tasa / 100;
        const cuotaNueva = calcularCuotaMensual(montoPrestamo, tasaMensual, plazo);
        
        // Calcular métricas financieras
        const deudasTotales = deudasActuales + cuotaNueva;
        const capacidadPago = (deudasTotales / ingresos) * 100;
        const gastosTotales = gastos + deudasTotales;
        const nivelEndeudamiento = (gastosTotales / ingresos) * 100;
        const liquidezMensual = ingresos - gastosTotales;
        
        // Evaluar balance financiero
        let balanceFinanciero = '';
        let colorBalance = '';
        
        if (capacidadPago > 40) {
            balanceFinanciero = 'Crítico';
            colorBalance = '#e74c3c';
        } else if (capacidadPago > 30) {
            balanceFinanciero = 'Riesgoso';
            colorBalance = '#e67e22';
        } else if (capacidadPago > 20) {
            balanceFinanciero = 'Precaución';
            colorBalance = '#f1c40f';
        } else {
            balanceFinanciero = 'Saludable';
            colorBalance = '#2ecc71';
        }
        
        // Generar recomendaciones
        const recomendaciones = [];
        
        if (capacidadPago > 35) {
            recomendaciones.push('Considere reducir el monto del préstamo o extender el plazo para disminuir la cuota mensual.');
            recomendaciones.push('Busque formas de aumentar sus ingresos o reducir sus gastos fijos.');
        }
        
        if (nivelEndeudamiento > 70) {
            recomendaciones.push('Su nivel de endeudamiento es muy alto. Enfóquese en pagar deudas antes de adquirir nuevas obligaciones.');
        }
        
        if (liquidezMensual < 0) {
            recomendaciones.push('¡Alerta! Sus gastos superarían sus ingresos. Este préstamo no es viable en su situación actual.');
        } else if (liquidezMensual < (ingresos * 0.1)) {
            recomendaciones.push('Su margen financiero sería muy ajustado. Considere crear un fondo de emergencia antes de adquirir el préstamo.');
        }
        
        if (recomendaciones.length === 0) {
            recomendaciones.push('Su situación financiera es favorable para este préstamo.');
            recomendaciones.push('Considere destinar parte de su liquidez mensual a un fondo de emergencia o inversiones.');
        }
        
        // Mostrar resultados
        document.getElementById('resultado-analisis').style.display = 'block';
        
        // Formatear moneda
        const formatoMoneda = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        });
        
        // Actualizar valores en la UI
        document.getElementById('capacidad-pago').textContent = capacidadPago.toFixed(1) + '%';
        document.getElementById('nivel-endeudamiento').textContent = nivelEndeudamiento.toFixed(1) + '%';
        document.getElementById('liquidez-mensual').textContent = formatoMoneda.format(liquidezMensual);
        
        const balanceElement = document.getElementById('balance-financiero');
        balanceElement.textContent = balanceFinanciero;
        balanceElement.style.color = colorBalance;
        
        // Mostrar recomendaciones
        const listaRecomendaciones = document.getElementById('recomendaciones-lista');
        listaRecomendaciones.innerHTML = '';
        
        recomendaciones.forEach(recomendacion => {
            const li = document.createElement('li');
            li.textContent = recomendacion;
            listaRecomendaciones.appendChild(li);
        });
        
        // Crear gráfico de distribución
        crearGraficoDistribucion({
            gastos: gastos,
            deudasActuales: deudasActuales,
            cuotaNueva: cuotaNueva,
            ahorro: Math.min(ahorroActual, liquidezMensual > 0 ? liquidezMensual : 0),
            liquidez: Math.max(0, liquidezMensual - ahorroActual)
        }, ingresos);
        
        mostrarMensaje("Análisis financiero completado", "success");
    });
    
    // ===============================================================
    // Funciones auxiliares
    // ===============================================================
    
    /**
     * Calcula la TIR (Tasa Interna de Retorno)
     * @param {number} inicial - Inversión inicial (negativa)
     * @param  {...number} flujos - Flujos de caja futuros
     * @returns {number} La TIR calculada
     */
    function calcularTIR(inicial, ...flujos) {
        // Todos los flujos de caja
        const flujosCaja = [inicial, ...flujos];
        
        // Función para calcular VAN
        function calcularVAN(tasa) {
            return flujosCaja.reduce((acumulado, flujo, indice) => {
                return acumulado + flujo / Math.pow(1 + tasa, indice);
            }, 0);
        }
        
        // Método de bisección para encontrar TIR
        let tasaInferior = -0.99;
        let tasaSuperior = 10;
        let tasaMedia, van;
        
        const epsilon = 0.0001;
        
        // Verificar si hay solución
        if (calcularVAN(tasaInferior) * calcularVAN(tasaSuperior) > 0) {
            return 0; // No hay solución
        }
        
        // Iteración para encontrar TIR
        do {
            tasaMedia = (tasaInferior + tasaSuperior) / 2;
            van = calcularVAN(tasaMedia);
            
            if (Math.abs(van) < epsilon) {
                break;
            }
            
            if (van * calcularVAN(tasaInferior) < 0) {
                tasaSuperior = tasaMedia;
            } else {
                tasaInferior = tasaMedia;
            }
            
        } while (Math.abs(tasaSuperior - tasaInferior) > epsilon);
        
        return tasaMedia;
    }
    
    /**
     * Calcula la cuota mensual de un préstamo
     * @param {number} monto - Monto del préstamo
     * @param {number} tasaMensual - Tasa de interés mensual en decimal
     * @param {number} plazo - Plazo en meses
     * @returns {number} Cuota mensual
     */
    function calcularCuotaMensual(monto, tasaMensual, plazo) {
        return monto * (tasaMensual * Math.pow(1 + tasaMensual, plazo)) / (Math.pow(1 + tasaMensual, plazo) - 1);
    }
    
    /**
     * Crea un gráfico de distribución de ingresos
     * @param {Object} datos - Datos para el gráfico
     * @param {number} ingresos - Total de ingresos mensuales
     */
    function crearGraficoDistribucion(datos, ingresos) {
        const canvas = document.getElementById('distribucion-chart');
        
        // Destruir gráfico existente si lo hay
        const graficoExistente = Chart.getChart(canvas);
        if (graficoExistente) {
            graficoExistente.destroy();
        }
        
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
                        datos.gastos,
                        datos.deudasActuales,
                        datos.cuotaNueva,
                        datos.ahorro,
                        datos.liquidez
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
                    }
                }
            }
        });
    }
    
    /**
     * Muestra un mensaje al usuario
     * @param {string} texto - Mensaje a mostrar
     * @param {string} tipo - Tipo de mensaje (success, error, warning, info)
     */
    function mostrarMensaje(texto, tipo) {
        // Intentar usar la función global si existe
        if (typeof window.mostrarToast === 'function') {
            window.mostrarToast(texto, tipo);
            return;
        }
        
        // Si no hay función global, crear un toast propio
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
        toast.className = 'toast';
        toast.style.backgroundColor = tipo === 'error' ? '#e74c3c' : 
                                     tipo === 'success' ? '#2ecc71' : 
                                     tipo === 'warning' ? '#f39c12' : '#3498db';
        toast.style.color = 'white';
        toast.style.padding = '15px 20px';
        toast.style.marginBottom = '10px';
        toast.style.borderRadius = '4px';
        toast.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        toast.textContent = texto;
        
        toastContainer.appendChild(toast);
        
        // Eliminar después de 3 segundos
        setTimeout(() => {
            if (toast.parentNode === toastContainer) {
                toastContainer.removeChild(toast);
            }
        }, 3000);
    }
});
