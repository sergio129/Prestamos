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
                <div class="herramientas-tab" data-panel="hipotecario-panel">Préstamos Hipotecarios</div>
                <div class="herramientas-tab" data-panel="vehiculo-panel">Préstamos Vehículos</div>
                <div class="herramientas-tab" data-panel="leasing-panel">Leasing</div>
                <div class="herramientas-tab" data-panel="libranza-panel">Libranza</div>
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
                
                <!-- Panel Préstamos Hipotecarios -->
                <div id="hipotecario-panel" class="herramientas-panel">
                    <h3>Calculadora de Préstamos Hipotecarios</h3>
                    <p class="panel-description">
                        Calcula y analiza préstamos hipotecarios para adquisición de vivienda. Esta herramienta te ayuda a determinar 
                        cuotas, plazos óptimos, comparar opciones UVR vs tasa fija y evaluar tu capacidad de endeudamiento para 
                        comprar tu casa o apartamento.
                    </p>
                    
                    <div class="herramientas-form-row">
                        <div class="herramientas-form-group">
                            <label for="hipo-valor-inmueble">Valor del inmueble:</label>
                            <input type="number" id="hipo-valor-inmueble" placeholder="Valor total del inmueble">
                        </div>
                        <div class="herramientas-form-group">
                            <label for="hipo-monto-prestamo">Monto a financiar:</label>
                            <input type="number" id="hipo-monto-prestamo" placeholder="Monto que necesitas financiar">
                        </div>
                    </div>
                    
                    <div class="herramientas-form-row">
                        <div class="herramientas-form-group">
                            <label for="hipo-tipo-tasa">Tipo de tasa:</label>
                            <select id="hipo-tipo-tasa">
                                <option value="fija">Tasa fija</option>
                                <option value="uvr">UVR (Unidad de Valor Real)</option>
                            </select>
                        </div>
                        <div class="herramientas-form-group">
                            <label for="hipo-tasa">Tasa de interés (% anual):</label>
                            <input type="number" id="hipo-tasa" step="0.01" min="0.1" value="10.5">
                        </div>
                    </div>
                    
                    <div class="herramientas-form-row">
                        <div class="herramientas-form-group">
                            <label for="hipo-plazo">Plazo (años):</label>
                            <select id="hipo-plazo">
                                <option value="5">5 años</option>
                                <option value="10">10 años</option>
                                <option value="15">15 años</option>
                                <option value="20" selected>20 años</option>
                                <option value="30">30 años</option>
                            </select>
                        </div>
                        <div class="herramientas-form-group">
                            <label for="hipo-ingresos">Ingresos mensuales:</label>
                            <input type="number" id="hipo-ingresos" placeholder="Tus ingresos mensuales">
                        </div>
                    </div>
                    
                    <button id="calcular-hipoteca" class="herramientas-btn">Calcular Préstamo Hipotecario</button>
                    
                    <div id="resultado-hipoteca" style="display: none;">
                        <h4>Resultados del Cálculo Hipotecario</h4>
                        
                        <div class="hipoteca-detalles">
                            <div class="hipoteca-resumen">
                                <div class="hipoteca-card">
                                    <div class="hipoteca-card-title">Cuota mensual</div>
                                    <div id="hipo-cuota" class="hipoteca-card-value">$0</div>
                                </div>
                                <div class="hipoteca-card">
                                    <div class="hipoteca-card-title">Total de intereses</div>
                                    <div id="hipo-intereses" class="hipoteca-card-value">$0</div>
                                </div>
                                <div class="hipoteca-card">
                                    <div class="hipoteca-card-title">Relación cuota/ingreso</div>
                                    <div id="hipo-relacion" class="hipoteca-card-value">0%</div>
                                </div>
                                <div class="hipoteca-card">
                                    <div class="hipoteca-card-title">Costo total</div>
                                    <div id="hipo-total" class="hipoteca-card-value">$0</div>
                                </div>
                            </div>
                            
                            <div class="hipoteca-amortizacion">
                                <h5>Tabla de amortización simplificada</h5>
                                <div class="hipoteca-table-container">
                                    <table class="hipoteca-table">
                                        <thead>
                                            <tr>
                                                <th>Año</th>
                                                <th>Pago anual</th>
                                                <th>Capital</th>
                                                <th>Intereses</th>
                                                <th>Saldo restante</th>
                                            </tr>
                                        </thead>
                                        <tbody id="hipo-amortizacion">
                                            <!-- Se llenará dinámicamente -->
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            
                            <div class="hipoteca-viabilidad">
                                <h5>Análisis de viabilidad</h5>
                                <div id="hipo-viabilidad-mensaje" class="hipoteca-viabilidad-mensaje"></div>
                                <ul id="hipo-recomendaciones" class="hipoteca-recomendaciones">
                                    <!-- Se llenará dinámicamente -->
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Panel Préstamos Vehículos -->
                <div id="vehiculo-panel" class="herramientas-panel">
                    <h3>Calculadora de Préstamos para Vehículos</h3>
                    <p class="panel-description">
                        Planifica la financiación de tu automóvil nuevo o usado. Esta herramienta te ayuda a calcular cuotas mensuales,
                        comparar diferentes plazos, evaluar tasas de interés especiales y determinar el valor máximo del vehículo que
                        puedes adquirir según tu capacidad de pago.
                    </p>
                    
                    <div class="herramientas-form-row">
                        <div class="herramientas-form-group">
                            <label for="vehiculo-valor">Valor del vehículo:</label>
                            <input type="number" id="vehiculo-valor" placeholder="Valor del vehículo">
                        </div>
                        <div class="herramientas-form-group">
                            <label for="vehiculo-cuota-inicial">Cuota inicial (%):</label>
                            <input type="number" id="vehiculo-cuota-inicial" min="0" max="90" value="20">
                        </div>
                    </div>
                    
                    <div class="herramientas-form-row">
                        <div class="herramientas-form-group">
                            <label for="vehiculo-tasa">Tasa de interés (% anual):</label>
                            <input type="number" id="vehiculo-tasa" step="0.01" min="0.1" value="12.5">
                        </div>
                        <div class="herramientas-form-group">
                            <label for="vehiculo-plazo">Plazo (meses):</label>
                            <select id="vehiculo-plazo">
                                <option value="12">12 meses</option>
                                <option value="24">24 meses</option>
                                <option value="36">36 meses</option>
                                <option value="48" selected>48 meses</option>
                                <option value="60">60 meses</option>
                                <option value="72">72 meses</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="herramientas-form-row">
                        <div class="herramientas-form-group">
                            <label for="vehiculo-ingresos">Ingresos mensuales:</label>
                            <input type="number" id="vehiculo-ingresos" placeholder="Tus ingresos mensuales">
                        </div>
                        <div class="herramientas-form-group">
                            <label for="vehiculo-tipo">Tipo de vehículo:</label>
                            <select id="vehiculo-tipo">
                                <option value="nuevo">Nuevo</option>
                                <option value="usado">Usado</option>
                            </select>
                        </div>
                    </div>
                    
                    <button id="calcular-vehiculo" class="herramientas-btn">Calcular Préstamo Vehículo</button>
                    
                    <div id="resultado-vehiculo" style="display: none;">
                        <h4>Resultados del Préstamo de Vehículo</h4>
                        
                        <div class="vehiculo-resumen">
                            <div class="vehiculo-card">
                                <div class="vehiculo-card-title">Valor a financiar</div>
                                <div id="vehiculo-monto-financiar" class="vehiculo-card-value">$0</div>
                            </div>
                            <div class="vehiculo-card">
                                <div class="vehiculo-card-title">Cuota mensual</div>
                                <div id="vehiculo-cuota" class="vehiculo-card-value">$0</div>
                            </div>
                            <div class="vehiculo-card">
                                <div class="vehiculo-card-title">Total intereses</div>
                                <div id="vehiculo-intereses-total" class="vehiculo-card-value">$0</div>
                            </div>
                            <div class="vehiculo-card">
                                <div class="vehiculo-card-title">Costo total</div>
                                <div id="vehiculo-total" class="vehiculo-card-value">$0</div>
                            </div>
                        </div>
                        
                        <div class="vehiculo-analisis">
                            <h5>Análisis de Capacidad de Pago</h5>
                            <div class="capacidad-pago-barra">
                                <div id="vehiculo-barra-capacidad" class="capacidad-pago-progreso"></div>
                            </div>
                            <div id="vehiculo-capacidad-mensaje" class="capacidad-pago-mensaje"></div>
                            
                            <div class="vehiculo-recomendaciones">
                                <h5>Recomendaciones</h5>
                                <ul id="vehiculo-recomendaciones-lista">
                                    <!-- Se llenará dinámicamente -->
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Panel Leasing -->
                <div id="leasing-panel" class="herramientas-panel">
                    <h3>Calculadora de Leasing</h3>
                    <p class="panel-description">
                        Evalúa opciones de leasing financiero para activos productivos, maquinaria o vehículos. 
                        Esta herramienta te permite comparar leasing vs. crédito tradicional, calcular el canon mensual, 
                        evaluar la opción de compra y entender los beneficios tributarios del leasing.
                    </p>
                    
                    <div class="herramientas-form-row">
                        <div class="herramientas-form-group">
                            <label for="leasing-valor-activo">Valor del activo:</label>
                            <input type="number" id="leasing-valor-activo" placeholder="Valor del activo a financiar">
                        </div>
                        <div class="herramientas-form-group">
                            <label for="leasing-tipo">Tipo de leasing:</label>
                            <select id="leasing-tipo">
                                <option value="financiero">Leasing Financiero</option>
                                <option value="operativo">Leasing Operativo</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="herramientas-form-row">
                        <div class="herramientas-form-group">
                            <label for="leasing-plazo">Plazo (meses):</label>
                            <select id="leasing-plazo">
                                <option value="24">24 meses</option>
                                <option value="36" selected>36 meses</option>
                                <option value="48">48 meses</option>
                                <option value="60">60 meses</option>
                            </select>
                        </div>
                        <div class="herramientas-form-group">
                            <label for="leasing-tasa">Tasa de interés (% anual):</label>
                            <input type="number" id="leasing-tasa" step="0.01" min="0.1" value="12.0">
                        </div>
                    </div>
                    
                    <div class="herramientas-form-row">
                        <div class="herramientas-form-group">
                            <label for="leasing-opcion-compra">Opción de compra (%):</label>
                            <input type="number" id="leasing-opcion-compra" min="0" max="20" value="10">
                        </div>
                        <div class="herramientas-form-group">
                            <label for="leasing-tasa-impuesto">Tasa de impuesto de renta (%):</label>
                            <input type="number" id="leasing-tasa-impuesto" min="0" max="40" value="32">
                        </div>
                    </div>
                    
                    <button id="calcular-leasing" class="herramientas-btn">Calcular Leasing</button>
                    
                    <div id="resultado-leasing" style="display: none;">
                        <h4>Resultados del Cálculo de Leasing</h4>
                        
                        <div class="leasing-resumen">
                            <div class="leasing-card">
                                <div class="leasing-card-title">Canon mensual</div>
                                <div id="leasing-canon" class="leasing-card-value">$0</div>
                            </div>
                            <div class="leasing-card">
                                <div class="leasing-card-title">Valor opción de compra</div>
                                <div id="leasing-valor-opcion" class="leasing-card-value">$0</div>
                            </div>
                            <div class="leasing-card">
                                <div class="leasing-card-title">Costo financiero total</div>
                                <div id="leasing-costo-total" class="leasing-card-value">$0</div>
                            </div>
                            <div class="leasing-card">
                                <div class="leasing-card-title">Beneficio tributario estimado</div>
                                <div id="leasing-beneficio" class="leasing-card-value">$0</div>
                            </div>
                        </div>
                        
                        <div class="leasing-comparacion">
                            <h5>Comparación Leasing vs. Crédito Tradicional</h5>
                            <div class="leasing-table-container">
                                <table class="leasing-table">
                                    <thead>
                                        <tr>
                                            <th>Concepto</th>
                                            <th>Leasing</th>
                                            <th>Crédito Tradicional</th>
                                            <th>Diferencia</th>
                                        </tr>
                                    </thead>
                                    <tbody id="leasing-comparacion-tabla">
                                        <!-- Se llenará dinámicamente -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        <div class="leasing-recomendaciones">
                            <h5>Recomendaciones y Consideraciones</h5>
                            <ul id="leasing-recomendaciones-lista">
                                <!-- Se llenará dinámicamente -->
                            </ul>
                        </div>
                    </div>
                </div>
                
                <!-- Panel Libranza -->
                <div id="libranza-panel" class="herramientas-panel">
                    <h3>Calculadora de Préstamos por Libranza</h3>
                    <p class="panel-description">
                        Calcula préstamos por libranza o descuento de nómina. Esta herramienta te permite evaluar tu capacidad de 
                        endeudamiento según tus ingresos, simular préstamos con descuento directo de nómina y planificar créditos 
                        de libre inversión o destinación específica que se pagan automáticamente con tu salario.
                    </p>
                    
                    <div class="herramientas-form-row">
                        <div class="herramientas-form-group">
                            <label for="libranza-salario">Salario mensual:</label>
                            <input type="number" id="libranza-salario" placeholder="Tu salario mensual">
                        </div>
                        <div class="herramientas-form-group">
                            <label for="libranza-descuentos">Descuentos actuales:</label>
                            <input type="number" id="libranza-descuentos" placeholder="Otros descuentos de nómina">
                        </div>
                    </div>
                    
                    <div class="herramientas-form-row">
                        <div class="herramientas-form-group">
                            <label for="libranza-monto">Monto a solicitar:</label>
                            <input type="number" id="libranza-monto" placeholder="Monto del préstamo">
                        </div>
                        <div class="herramientas-form-group">
                            <label for="libranza-plazo">Plazo (meses):</label>
                            <select id="libranza-plazo">
                                <option value="12">12 meses</option>
                                <option value="24">24 meses</option>
                                <option value="36" selected>36 meses</option>
                                <option value="48">48 meses</option>
                                <option value="60">60 meses</option>
                                <option value="72">72 meses</option>
                                <option value="84">84 meses</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="herramientas-form-row">
                        <div class="herramientas-form-group">
                            <label for="libranza-tasa">Tasa de interés (% anual):</label>
                            <input type="number" id="libranza-tasa" step="0.01" min="0.1" value="14.5">
                        </div>
                        <div class="herramientas-form-group">
                            <label for="libranza-tipo-contrato">Tipo de contrato:</label>
                            <select id="libranza-tipo-contrato">
                                <option value="indefinido">Indefinido</option>
                                <option value="fijo">Término fijo</option>
                                <option value="publico">Sector público</option>
                                <option value="pensionado">Pensionado</option>
                            </select>
                        </div>
                    </div>
                    
                    <button id="calcular-libranza" class="herramientas-btn">Calcular Préstamo por Libranza</button>
                    
                    <div id="resultado-libranza" style="display: none;">
                        <h4>Resultados del Préstamo por Libranza</h4>
                        
                        <div class="libranza-resumen">
                            <div class="libranza-card">
                                <div class="libranza-card-title">Cuota mensual</div>
                                <div id="libranza-cuota" class="libranza-card-value">$0</div>
                            </div>
                            <div class="libranza-card">
                                <div class="libranza-card-title">Capacidad máxima de descuento</div>
                                <div id="libranza-capacidad" class="libranza-card-value">$0</div>
                            </div>
                            <div class="libranza-card">
                                <div class="libranza-card-title">% de ingresos comprometidos</div>
                                <div id="libranza-porcentaje" class="libranza-card-value">0%</div>
                            </div>
                            <div class="libranza-card">
                                <div class="libranza-card-title">Total a pagar</div>
                                <div id="libranza-total" class="libranza-card-value">$0</div>
                            </div>
                        </div>
                        
                        <div class="libranza-viabilidad">
                            <h5>Análisis de Viabilidad</h5>
                            <div class="libranza-meter-container">
                                <div class="libranza-meter">
                                    <div id="libranza-meter-fill" class="libranza-meter-fill"></div>
                                </div>
                                <div id="libranza-viabilidad-texto" class="libranza-viabilidad-texto"></div>
                            </div>
                            
                            <div class="libranza-alternativas" id="libranza-alternativas" style="display: none;">
                                <h5>Alternativas sugeridas</h5>
                                <div id="libranza-alternativas-content">
                                    <!-- Se llenará dinámicamente -->
                                </div>
                            </div>
                        </div>
                        
                        <div class="libranza-recomendaciones">
                            <h5>Recomendaciones</h5>
                            <ul id="libranza-recomendaciones-lista">
                                <!-- Se llenará dinámicamente -->
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
    
    // ===============================================================
    // Implementación de eventos para módulos adicionales
    // ===============================================================
    
    // Evento para calcular préstamos hipotecarios
    document.getElementById('calcular-hipoteca').addEventListener('click', function() {
        const valorInmueble = parseFloat(document.getElementById('hipo-valor-inmueble').value);
        const montoPrestamo = parseFloat(document.getElementById('hipo-monto-prestamo').value);
        const tipoTasa = document.getElementById('hipo-tipo-tasa').value;
        const tasaAnual = parseFloat(document.getElementById('hipo-tasa').value);
        const plazoAnios = parseInt(document.getElementById('hipo-plazo').value);
        const ingresosMensuales = parseFloat(document.getElementById('hipo-ingresos').value);
        
        // Validar datos
        if (!valorInmueble || valorInmueble <= 0) {
            mostrarMensaje("Ingrese un valor válido para el inmueble", "error");
            return;
        }
        
        if (!montoPrestamo || montoPrestamo <= 0) {
            mostrarMensaje("Ingrese un monto válido a financiar", "error");
            return;
        }
        
        if (montoPrestamo > valorInmueble * 0.8) {
            mostrarMensaje("El monto a financiar no debe superar el 80% del valor del inmueble", "warning");
            return;
        }
        
        if (!tasaAnual || tasaAnual <= 0) {
            mostrarMensaje("Ingrese una tasa de interés válida", "error");
            return;
        }
        
        if (!ingresosMensuales || ingresosMensuales <= 0) {
            mostrarMensaje("Ingrese sus ingresos mensuales", "error");
            return;
        }
        
        // Conversión a meses y tasa mensual
        const plazoMeses = plazoAnios * 12;
        const tasaMensual = tipoTasa === 'fija' 
            ? Math.pow(1 + tasaAnual/100, 1/12) - 1 
            : tasaAnual / 1200;
        
        // Cálculos hipotecarios
        const cuotaMensual = calcularCuotaMensual(montoPrestamo, tasaMensual, plazoMeses);
        const totalPagar = cuotaMensual * plazoMeses;
        const totalIntereses = totalPagar - montoPrestamo;
        const relacionCuotaIngreso = (cuotaMensual / ingresosMensuales) * 100;
        
        // Generar tabla de amortización
        const tablaAmortizacion = [];
        let saldoRestante = montoPrestamo;
        
        for (let anio = 1; anio <= plazoAnios; anio++) {
            let capitalAnual = 0;
            let interesAnual = 0;
            let pagoAnual = 0;
            
            for (let mes = 1; mes <= 12 && saldoRestante > 0; mes++) {
                const interesMes = saldoRestante * tasaMensual;
                let capitalMes = cuotaMensual - interesMes;
                
                if (capitalMes > saldoRestante) capitalMes = saldoRestante;
                
                const pagoMes = capitalMes + interesMes;
                
                capitalAnual += capitalMes;
                interesAnual += interesMes;
                pagoAnual += pagoMes;
                
                saldoRestante -= capitalMes;
                if (saldoRestante < 0) saldoRestante = 0;
            }
            
            tablaAmortizacion.push({
                anio: anio,
                capital: capitalAnual,
                interes: interesAnual,
                pago: pagoAnual,
                saldo: saldoRestante
            });
        }
        
        // Formatear moneda colombiana
        const formatoMoneda = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
        
        // Actualizar interface con resultados
        document.getElementById('hipo-cuota').textContent = formatoMoneda.format(cuotaMensual);
        document.getElementById('hipo-intereses').textContent = formatoMoneda.format(totalIntereses);
        document.getElementById('hipo-relacion').textContent = relacionCuotaIngreso.toFixed(1) + '%';
        document.getElementById('hipo-total').textContent = formatoMoneda.format(totalPagar);
        
        // Mostrar tabla de amortización
        const tablaElement = document.getElementById('hipo-amortizacion');
        tablaElement.innerHTML = '';
        
        tablaAmortizacion.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.anio}</td>
                <td>${formatoMoneda.format(row.pago)}</td>
                <td>${formatoMoneda.format(row.capital)}</td>
                <td>${formatoMoneda.format(row.interes)}</td>
                <td>${formatoMoneda.format(row.saldo)}</td>
            `;
            tablaElement.appendChild(tr);
        });
        
        // Analizar viabilidad
        let mensajeViabilidad;
        let recomendaciones = [];
        
        if (relacionCuotaIngreso > 40) {
            mensajeViabilidad = '<span style="color: #e74c3c;">Riesgo Alto:</span> La cuota supera el 40% de tus ingresos.';
            recomendaciones.push("Considera un monto menor o un plazo más largo para reducir la cuota.");
            recomendaciones.push("Evalúa aumentar tu cuota inicial para reducir el monto a financiar.");
        } else if (relacionCuotaIngreso > 30) {
            mensajeViabilidad = '<span style="color: #f39c12;">Precaución:</span> La cuota está entre el 30% y 40% de tus ingresos.';
            recomendaciones.push("Tu capacidad de pago es aceptable, pero deberías tener un fondo de emergencia.");
            recomendaciones.push("Considera opciones para mejorar tu flujo de caja.");
        } else {
            mensajeViabilidad = '<span style="color: #2ecc71;">Viable:</span> La cuota está por debajo del 30% de tus ingresos.';
            recomendaciones.push("Tu capacidad de pago es adecuada para este préstamo hipotecario.");
            recomendaciones.push("Considera hacer pagos adicionales a capital para reducir intereses.");
        }
        
        if (tipoTasa === 'uvr') {
            recomendaciones.push("Con sistema UVR, tu cuota aumentará con la inflación. Asegúrate que tus ingresos también aumenten.");
        }
        
        // Mostrar análisis y recomendaciones
        document.getElementById('hipo-viabilidad-mensaje').innerHTML = mensajeViabilidad;
        
        const recomendacionesList = document.getElementById('hipo-recomendaciones');
        recomendacionesList.innerHTML = '';
        
        recomendaciones.forEach(rec => {
            const li = document.createElement('li');
            li.textContent = rec;
            recomendacionesList.appendChild(li);
        });
        
        // Mostrar resultados
        document.getElementById('resultado-hipoteca').style.display = 'block';
        mostrarMensaje("Cálculo hipotecario completado", "success");
    });
    
    // Evento para calcular préstamos de vehículos
    document.getElementById('calcular-vehiculo').addEventListener('click', function() {
        const valorVehiculo = parseFloat(document.getElementById('vehiculo-valor').value);
        const porcentajeCuotaInicial = parseFloat(document.getElementById('vehiculo-cuota-inicial').value);
        const tasaAnual = parseFloat(document.getElementById('vehiculo-tasa').value);
        const plazoMeses = parseInt(document.getElementById('vehiculo-plazo').value);
        const ingresosMensuales = parseFloat(document.getElementById('vehiculo-ingresos').value);
        const tipoVehiculo = document.getElementById('vehiculo-tipo').value;
        
        // Validaciones
        if (!valorVehiculo || valorVehiculo <= 0) {
            mostrarMensaje("Ingrese un valor válido para el vehículo", "error");
            return;
        }
        
        if (isNaN(porcentajeCuotaInicial) || porcentajeCuotaInicial < 0 || porcentajeCuotaInicial > 100) {
            mostrarMensaje("La cuota inicial debe estar entre 0% y 100%", "error");
            return;
        }
        
        if (!tasaAnual || tasaAnual <= 0) {
            mostrarMensaje("Ingrese una tasa de interés válida", "error");
            return;
        }
        
        if (!ingresosMensuales || ingresosMensuales <= 0) {
            mostrarMensaje("Ingrese sus ingresos mensuales", "error");
            return;
        }
        
        // Cálculos
        const cuotaInicial = valorVehiculo * (porcentajeCuotaInicial / 100);
        const montoFinanciar = valorVehiculo - cuotaInicial;
        const tasaMensual = Math.pow(1 + tasaAnual/100, 1/12) - 1;
        const cuotaMensual = calcularCuotaMensual(montoFinanciar, tasaMensual, plazoMeses);
        const totalIntereses = (cuotaMensual * plazoMeses) - montoFinanciar;
        const porcentajeCapacidad = (cuotaMensual / ingresosMensuales) * 100;
        
        // Formatear moneda
        const formatoMoneda = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
        
        // Actualizar resultados
        document.getElementById('vehiculo-monto-financiar').textContent = formatoMoneda.format(montoFinanciar);
        document.getElementById('vehiculo-cuota').textContent = formatoMoneda.format(cuotaMensual);
        document.getElementById('vehiculo-intereses-total').textContent = formatoMoneda.format(totalIntereses);
        document.getElementById('vehiculo-total').textContent = formatoMoneda.format(montoFinanciar + totalIntereses);
        
        // Análisis de capacidad de pago
        const barraCapacidad = document.getElementById('vehiculo-barra-capacidad');
        let mensajeCapacidad;
        let colorBarra;
        
        if (porcentajeCapacidad > 30) {
            mensajeCapacidad = "La cuota excede el 30% recomendado de tus ingresos.";
            colorBarra = "#e74c3c"; // Rojo
        } else if (porcentajeCapacidad > 20) {
            mensajeCapacidad = "La cuota es manejable pero ocupa una porción significativa de tus ingresos.";
            colorBarra = "#f39c12"; // Naranja
        } else {
            mensajeCapacidad = "La cuota se encuentra dentro de un rango saludable respecto a tus ingresos.";
            colorBarra = "#2ecc71"; // Verde
        }
        
        // Actualizar barra visual
        barraCapacidad.style.width = Math.min(porcentajeCapacidad * 3, 100) + '%';
        barraCapacidad.style.backgroundColor = colorBarra;
        document.getElementById('vehiculo-capacidad-mensaje').textContent = mensajeCapacidad;
        
        // Generar recomendaciones
        const recomendaciones = [];
        
        if (porcentajeCapacidad > 30) {
            recomendaciones.push("Aumenta la cuota inicial para reducir el monto financiado.");
            recomendaciones.push("Considera un plazo más largo para reducir la cuota mensual.");
            recomendaciones.push("Busca un vehículo de menor valor más acorde a tu capacidad de pago.");
        } else if (porcentajeCapacidad > 20) {
            recomendaciones.push("Ten un fondo de emergencia para cubrir al menos 3 meses de cuotas.");
            recomendaciones.push("No olvides incluir en tu presupuesto gastos de seguro, impuestos y mantenimiento.");
        } else {
            recomendaciones.push("Tu capacidad de pago es excelente para este préstamo.");
            recomendaciones.push("Podrías considerar un plazo más corto para pagar menos intereses en total.");
        }
        
        // Agregar recomendaciones específicas por tipo de vehículo
        if (tipoVehiculo === 'usado') {
            recomendaciones.push("Para vehículos usados, considera un presupuesto adicional para posibles reparaciones.");
            recomendaciones.push("Revisa el historial del vehículo y realiza una revisión técnica completa.");
        } else {
            recomendaciones.push("Para vehículos nuevos, consulta si hay descuentos por pago de contado parcial.");
            recomendaciones.push("Compara el financiamiento del concesionario con otras entidades financieras.");
        }
        
        // Mostrar recomendaciones
        const listaRecomendaciones = document.getElementById('vehiculo-recomendaciones-lista');
        listaRecomendaciones.innerHTML = '';
        
        recomendaciones.forEach(rec => {
            const li = document.createElement('li');
            li.textContent = rec;
            listaRecomendaciones.appendChild(li);
        });
        
        // Mostrar resultados
        document.getElementById('resultado-vehiculo').style.display = 'block';
        mostrarMensaje("Cálculo de préstamo de vehículo completado", "success");
    });
    
    // Evento para calcular leasing
    document.getElementById('calcular-leasing').addEventListener('click', function() {
        const valorActivo = parseFloat(document.getElementById('leasing-valor-activo').value);
        const tipoLeasing = document.getElementById('leasing-tipo').value;
        const plazoMeses = parseInt(document.getElementById('leasing-plazo').value);
        const tasaAnual = parseFloat(document.getElementById('leasing-tasa').value);
        const porcentajeOpcionCompra = parseFloat(document.getElementById('leasing-opcion-compra').value);
        const tasaImpuesto = parseFloat(document.getElementById('leasing-tasa-impuesto').value);
        
        // Validaciones
        if (!valorActivo || valorActivo <= 0) {
            mostrarMensaje("Ingrese un valor válido para el activo", "error");
            return;
        }
        
        if (!tasaAnual || tasaAnual <= 0) {
            mostrarMensaje("Ingrese una tasa de interés válida", "error");
            return;
        }
        
        if (isNaN(porcentajeOpcionCompra) || porcentajeOpcionCompra < 0 || porcentajeOpcionCompra > 30) {
            mostrarMensaje("La opción de compra debe estar entre 0% y 30%", "error");
            return;
        }
        
        // Cálculos
        const valorOpcionCompra = valorActivo * (porcentajeOpcionCompra / 100);
        const montoFinanciar = valorActivo - valorOpcionCompra;
        const tasaMensual = Math.pow(1 + tasaAnual/100, 1/12) - 1;
        const canonMensual = calcularCuotaMensual(montoFinanciar, tasaMensual, plazoMeses);
        const costoFinancieroTotal = (canonMensual * plazoMeses) + valorOpcionCompra - valorActivo;
        
        // Calculamos beneficios tributarios
        let beneficioTributario = 0;
        if (tipoLeasing === 'financiero') {
            // Depreciacón + intereses
            const depreciacionTotal = valorActivo;
            const interesesTotales = (canonMensual * plazoMeses) - montoFinanciar;
            beneficioTributario = (depreciacionTotal + interesesTotales) * (tasaImpuesto / 100);
        } else {
            // Todo el canon es deducible en operativo
            beneficioTributario = canonMensual * plazoMeses * (tasaImpuesto / 100);
        }
        
        // Comparación con crédito tradicional
        const cuotaCreditoTradicional = calcularCuotaMensual(valorActivo, tasaMensual, plazoMeses);
        const totalCreditoTradicional = cuotaCreditoTradicional * plazoMeses;
        const interesesCredito = totalCreditoTradicional - valorActivo;
        const beneficioTributarioCredito = interesesCredito * (tasaImpuesto / 100);
        
        // Flujos netos
        const flujoNetoLeasing = (canonMensual * plazoMeses) + valorOpcionCompra - beneficioTributario;
        const flujoNetoCredito = totalCreditoTradicional - beneficioTributarioCredito;
        const diferenciaFlujoNeto = flujoNetoCredito - flujoNetoLeasing;
        
        // Formatear moneda
        const formatoMoneda = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
        
        // Mostrar resultados
        document.getElementById('leasing-canon').textContent = formatoMoneda.format(canonMensual);
        document.getElementById('leasing-valor-opcion').textContent = formatoMoneda.format(valorOpcionCompra);
        document.getElementById('leasing-costo-total').textContent = formatoMoneda.format(costoFinancieroTotal);
        document.getElementById('leasing-beneficio').textContent = formatoMoneda.format(beneficioTributario);
        
        // Llenar tabla comparativa
        document.getElementById('leasing-comparacion-tabla').innerHTML = `
            <tr>
                <td>Pago mensual</td>
                <td>${formatoMoneda.format(canonMensual)}</td>
                <td>${formatoMoneda.format(cuotaCreditoTradicional)}</td>
                <td>${formatoMoneda.format(cuotaCreditoTradicional - canonMensual)}</td>
            </tr>
            <tr>
                <td>Total pagos</td>
                <td>${formatoMoneda.format(canonMensual * plazoMeses + valorOpcionCompra)}</td>
                <td>${formatoMoneda.format(totalCreditoTradicional)}</td>
                <td>${formatoMoneda.format(totalCreditoTradicional - (canonMensual * plazoMeses + valorOpcionCompra))}</td>
            </tr>
            <tr>
                <td>Beneficio tributario</td>
                <td>${formatoMoneda.format(beneficioTributario)}</td>
                <td>${formatoMoneda.format(beneficioTributarioCredito)}</td>
                <td>${formatoMoneda.format(beneficioTributario - beneficioTributarioCredito)}</td>
            </tr>
            <tr>
                <td>Costo neto (después de impuestos)</td>
                <td>${formatoMoneda.format(flujoNetoLeasing)}</td>
                <td>${formatoMoneda.format(flujoNetoCredito)}</td>
                <td style="color: ${diferenciaFlujoNeto > 0 ? '#2ecc71' : '#e74c3c'}">${formatoMoneda.format(Math.abs(diferenciaFlujoNeto))}</td>
            </tr>
        `;
        
        // Recomendaciones
        const recomendaciones = [];
        
        if (diferenciaFlujoNeto > 0) {
            recomendaciones.push(`El leasing es más favorable que el crédito tradicional por ${formatoMoneda.format(diferenciaFlujoNeto)}.`);
        } else {
            recomendaciones.push(`El crédito tradicional es más favorable que el leasing por ${formatoMoneda.format(Math.abs(diferenciaFlujoNeto))}.`);
        }
        
        if (tipoLeasing === 'financiero') {
            recomendaciones.push("En leasing financiero, el activo aparecerá en tu balance, afectando tus indicadores de endeudamiento.");
            recomendaciones.push("Al finalizar el contrato, podrás ejercer la opción de compra por el valor residual pactado.");
        } else {
            recomendaciones.push("En leasing operativo, el activo no aparece en tu balance, mejorando tus indicadores financieros.");
            recomendaciones.push("Al finalizar el contrato, deberás devolver el activo o negociar una extensión.");
        }
        
        recomendaciones.push("Consulta con tu contador los beneficios tributarios específicos según la normativa vigente.");
        
        // Mostrar recomendaciones
        const listaRecomendaciones = document.getElementById('leasing-recomendaciones-lista');
        listaRecomendaciones.innerHTML = '';
        
        recomendaciones.forEach(rec => {
            const li = document.createElement('li');
            li.textContent = rec;
            listaRecomendaciones.appendChild(li);
        });
        
        // Mostrar resultados
        document.getElementById('resultado-leasing').style.display = 'block';
        mostrarMensaje("Cálculo de leasing completado", "success");
    });
    
    // Evento para calcular libranza
    document.getElementById('calcular-libranza').addEventListener('click', function() {
        const salarioMensual = parseFloat(document.getElementById('libranza-salario').value);
        const descuentosActuales = parseFloat(document.getElementById('libranza-descuentos').value) || 0;
        const montoSolicitado = parseFloat(document.getElementById('libranza-monto').value);
        const plazoMeses = parseInt(document.getElementById('libranza-plazo').value);
        const tasaAnual = parseFloat(document.getElementById('libranza-tasa').value);
        const tipoContrato = document.getElementById('libranza-tipo-contrato').value;
        
        // Validaciones
        if (!salarioMensual || salarioMensual <= 0) {
            mostrarMensaje("Ingrese un salario mensual válido", "error");
            return;
        }
        
        if (!montoSolicitado || montoSolicitado <= 0) {
            mostrarMensaje("Ingrese un monto a solicitar válido", "error");
            return;
        }
        
        if (!tasaAnual || tasaAnual <= 0) {
            mostrarMensaje("Ingrese una tasa de interés válida", "error");
            return;
        }
        
        // Cálculos
        const tasaMensual = Math.pow(1 + tasaAnual/100, 1/12) - 1;
        const cuotaMensual = calcularCuotaMensual(montoSolicitado, tasaMensual, plazoMeses);
        const capacidadMaxima = salarioMensual * 0.5; // 50% del salario es el máximo legal
        const totalDescuentos = descuentosActuales + cuotaMensual;
        const porcentajeComprometido = (totalDescuentos / salarioMensual) * 100;
        
        // Formatear moneda
        const formatoMoneda = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
        
        // Mostrar resultados básicos
        document.getElementById('libranza-cuota').textContent = formatoMoneda.format(cuotaMensual);
        document.getElementById('libranza-capacidad').textContent = formatoMoneda.format(capacidadMaxima);
        document.getElementById('libranza-porcentaje').textContent = porcentajeComprometido.toFixed(1) + '%';
        document.getElementById('libranza-total').textContent = formatoMoneda.format(cuotaMensual * plazoMeses);
        
        // Análisis de viabilidad
        let esViable = totalDescuentos <= capacidadMaxima;
        let viabilidadTexto = "";
        let colorMedidor = "";
        let porcentajeMedidor = 0;
        
        if (!esViable) {
            viabilidadTexto = "No viable: Los descuentos superarían el límite legal del 50% de tu salario.";
            colorMedidor = "#e74c3c"; // Rojo
            porcentajeMedidor = 100;
        } else if (porcentajeComprometido > 40) {
            viabilidadTexto = "Riesgo alto: El préstamo compromete más del 40% de tu salario.";
            colorMedidor = "#e67e22"; // Naranja
            porcentajeMedidor = 80;
        } else if (porcentajeComprometido > 30) {
            viabilidadTexto = "Precaución: El préstamo compromete entre 30% y 40% de tu salario.";
            colorMedidor = "#f1c40f"; // Amarillo
            porcentajeMedidor = 60;
        } else {
            viabilidadTexto = "Viable: El préstamo compromete menos del 30% de tu salario.";
            colorMedidor = "#2ecc71"; // Verde
            porcentajeMedidor = 40;
        }
        
        // Actualizar medidor visual
        const medidorFill = document.getElementById('libranza-meter-fill');
        medidorFill.style.width = porcentajeMedidor + '%';
        medidorFill.style.backgroundColor = colorMedidor;
        document.getElementById('libranza-viabilidad-texto').textContent = viabilidadTexto;
        
        // Recomendaciones y alternativas
        const recomendaciones = [];
        
        // Recomendaciones según tipo de contrato
        switch (tipoContrato) {
            case 'indefinido':
                recomendaciones.push("Tu contrato indefinido te brinda estabilidad para este tipo de préstamo.");
                break;
            case 'fijo':
                recomendaciones.push("Asegúrate que el plazo del préstamo no exceda la duración de tu contrato.");
                break;
            case 'publico':
                recomendaciones.push("Como empleado público, consulta entidades que ofrezcan tasas preferenciales para este sector.");
                break;
            case 'pensionado':
                recomendaciones.push("Como pensionado, puedes acceder a condiciones especiales en varias entidades financieras.");
                break;
        }
        
        // Mostrar alternativas si no es viable
        if (!esViable) {
            recomendaciones.push("Considera solicitar un monto menor o extender el plazo para reducir la cuota mensual.");
            
            // Calcular opciones alternativas
            const montoMaximo = calcularMontoMaximo(capacidadMaxima - descuentosActuales, tasaMensual, plazoMeses);
            const plazoNecesario = calcularPlazoNecesario(montoSolicitado, tasaMensual, capacidadMaxima - descuentosActuales);
            
            document.getElementById('libranza-alternativas').style.display = 'block';
            document.getElementById('libranza-alternativas-content').innerHTML = `
                <p><strong>Alternativas a considerar:</strong></p>
                <ul>
                    <li>Monto máximo que puedes solicitar al mismo plazo: ${formatoMoneda.format(montoMaximo)}</li>
                    <li>Plazo mínimo necesario para el monto solicitado: ${plazoNecesario} meses</li>
                </ul>
            `;
        } else {
            document.getElementById('libranza-alternativas').style.display = 'none';
            
            if (porcentajeComprometido > 40) {
                recomendaciones.push("Aunque es viable legalmente, tu margen financiero será muy ajustado. Reconsidéralo.");
            } else if (porcentajeComprometido > 30) {
                recomendaciones.push("Mantén un fondo de emergencia para cubrir al menos 3 meses de cuotas.");
            } else {
                recomendaciones.push("Tu situación financiera es favorable para este préstamo por libranza.");
                recomendaciones.push("Considera hacer pagos anticipados para reducir intereses cuando sea posible.");
            }
        }
        
        // Mostrar recomendaciones
        const listaRecomendaciones = document.getElementById('libranza-recomendaciones-lista');
        listaRecomendaciones.innerHTML = '';
        
        recomendaciones.forEach(rec => {
            const li = document.createElement('li');
            li.textContent = rec;
            listaRecomendaciones.appendChild(li);
        });
        
        // Mostrar resultados
        document.getElementById('resultado-libranza').style.display = 'block';
        mostrarMensaje("Cálculo de préstamo por libranza completado", "success");
    });
    
    /**
     * Calcula el monto máximo financiable según la cuota máxima
     * @param {number} cuotaMaxima - Cuota mensual máxima
     * @param {number} tasaMensual - Tasa mensual en decimal
     * @param {number} plazo - Plazo en meses
     * @returns {number} - Monto máximo
     */
    function calcularMontoMaximo(cuotaMaxima, tasaMensual, plazo) {
        const factor = (tasaMensual * Math.pow(1 + tasaMensual, plazo)) / (Math.pow(1 + tasaMensual, plazo) - 1);
        return cuotaMaxima / factor;
    }
    
    /**
     * Calcula el plazo necesario para un monto y cuota máxima
     * @param {number} monto - Monto a financiar
     * @param {number} tasaMensual - Tasa mensual en decimal
     * @param {number} cuotaMaxima - Cuota mensual máxima
     * @returns {number} - Plazo en meses
     */
    function calcularPlazoNecesario(monto, tasaMensual, cuotaMaxima) {
        // Si la cuota no cubre ni los intereses
        if (cuotaMaxima <= monto * tasaMensual) {
            return "No viable";
        }
        
        let plazo = 1;
        let cuotaActual = calcularCuotaMensual(monto, tasaMensual, plazo);
        
        while (cuotaActual > cuotaMaxima && plazo < 360) {
            plazo++;
            cuotaActual = calcularCuotaMensual(monto, tasaMensual, plazo);
        }
        
        return plazo < 360 ? plazo : "No viable";
    }
    
    // ===============================================================
    // Mejorar formato de moneda en todos los inputs y resultados
    // ===============================================================
    
    // Convertir los inputs numéricos a formato de moneda
    document.querySelectorAll('input[type="number"]').forEach(input => {
        if (input.id.includes('monto') || input.id.includes('valor') || 
            input.id.includes('ingresos') || input.id.includes('gastos') || 
            input.id.includes('deudas') || input.id.includes('ahorro') || 
            input.id.includes('salario') || input.id.includes('descuentos')) {
            
            input.addEventListener('focus', function() {
                // Al enfocar, convertir a número simple para editar
                const valor = this.value.replace(/[^\d.-]/g, '');
                this.value = valor;
            });
            
            input.addEventListener('blur', function() {
                // Al perder el foco, formatear como moneda si tiene valor
                if (this.value && !isNaN(parseFloat(this.value))) {
                    const formatter = new Intl.NumberFormat('es-CO', {
                        style: 'decimal',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                    });
                    this.value = formatter.format(parseFloat(this.value));
                }
            });
            
            // Formatear valores existentes al cargar
            if (input.value && !isNaN(parseFloat(input.value))) {
                const formatter = new Intl.NumberFormat('es-CO', {
                    style: 'decimal',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                });
                input.value = formatter.format(parseFloat(input.value));
            }
        }
    });
});
