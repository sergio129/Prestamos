/**
 * Comparador de Tasas del Mercado Financiero
 * Permite al usuario comparar tasas de diferentes entidades financieras
 */

(function() {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Inicializando comparador de tasas del mercado...');
        
        // Crear botón
        const comparadorBtn = document.createElement('button');
        comparadorBtn.type = 'button';
        comparadorBtn.className = 'btn btn-comparador';
        comparadorBtn.innerHTML = '<i class="fas fa-exchange-alt"></i> Comparar Tasas';
        comparadorBtn.style.marginTop = '15px';
        
        // Añadir botón después del formulario principal
        const loanForm = document.getElementById('loan-form');
        if (loanForm && loanForm.parentNode) {
            loanForm.parentNode.appendChild(comparadorBtn);
        }
        
        // Crear modal
        const comparadorModal = document.createElement('div');
        comparadorModal.id = 'comparador-modal';
        comparadorModal.className = 'modal hidden';
        
        comparadorModal.innerHTML = `
            <div class="modal-content comparador-content">
                <span class="close-modal">&times;</span>
                <h2>Comparador de Tasas del Mercado</h2>
                
                <p class="comparador-description">Compara las tasas de interés que ofrecen diferentes entidades financieras para diversos tipos de préstamos en Colombia. Esta herramienta te ayudará a encontrar la mejor opción para tu crédito.</p>
                
                <div class="comparador-filtros">
                    <div class="filtros-title">
                        <i class="fas fa-filter"></i> Filtros de Búsqueda
                    </div>
                    <div class="filtros-grid">
                        <div class="filtro-grupo">
                            <label for="tipo-prestamo">Tipo de Préstamo:</label>
                            <select id="tipo-prestamo">
                                <option value="personal">Crédito de Consumo</option>
                                <option value="hipotecario">Crédito Hipotecario</option>
                                <option value="vehiculo">Crédito de Vehículo</option>
                                <option value="libranza">Libranza</option>
                                <option value="tarjeta">Tarjeta de Crédito</option>
                                <option value="microempresa">Microcrédito</option>
                            </select>
                        </div>
                        
                        <div class="filtro-grupo">
                            <label for="monto-prestamo">Monto del Préstamo:</label>
                            <div class="input-icon">
                                <span class="currency-symbol">$</span>
                                <input type="number" id="monto-prestamo" placeholder="Ej: 10,000,000" value="10000000">
                            </div>
                        </div>
                        
                        <div class="filtro-grupo">
                            <label for="plazo-meses">Plazo (meses):</label>
                            <select id="plazo-meses">
                                <option value="12">12 meses</option>
                                <option value="24">24 meses</option>
                                <option value="36" selected>36 meses</option>
                                <option value="48">48 meses</option>
                                <option value="60">60 meses</option>
                                <option value="72">72 meses</option>
                                <option value="84">84 meses</option>
                                <option value="120">120 meses</option>
                                <option value="180">180 meses</option>
                                <option value="240">240 meses</option>
                                <option value="360">360 meses</option>
                            </select>
                        </div>
                        
                        <div class="filtro-grupo">
                            <label for="perfil-cliente">Perfil de Cliente:</label>
                            <select id="perfil-cliente">
                                <option value="general">General</option>
                                <option value="empleado">Empleado</option>
                                <option value="independiente">Independiente</option>
                                <option value="pensionado">Pensionado</option>
                            </select>
                        </div>
                    </div>
                    
                    <button id="comparar-tasas" class="btn-comparar">Comparar Tasas</button>
                </div>
                
                <div id="comparador-resultado" class="comparador-resultado hidden">
                    <h3>Resultados de la Comparación</h3>
                    
                    <div class="tasas-table-container">
                        <table class="tasas-table">
                            <thead>
                                <tr>
                                    <th class="sortable">Entidad</th>
                                    <th class="sortable sorting-asc">Tasa (E.A.)</th>
                                    <th class="sortable">Tasa Mensual</th>
                                    <th class="sortable">Cuota Mensual</th>
                                    <th>Requisitos</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody id="tasas-resultados">
                                <!-- Generado dinámicamente -->
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="grafico-container">
                        <div class="grafico-title">Comparativa de Cuotas por Entidad</div>
                        <canvas id="chart-tasas"></canvas>
                    </div>
                    
                    <div class="conclusiones">
                        <h4><i class="fas fa-lightbulb"></i> Conclusiones y Recomendaciones</h4>
                        <div id="recomendaciones-container">
                            <!-- Generado dinámicamente -->
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(comparadorModal);
        
        // Configurar eventos
        comparadorBtn.addEventListener('click', function() {
            comparadorModal.classList.remove('hidden');
        });
        
        // Cerrar modal
        const closeModalBtn = comparadorModal.querySelector('.close-modal');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', function() {
                comparadorModal.classList.add('hidden');
            });
        }
        
        // Evitar que los clics dentro del modal cierren el modal
        comparadorModal.querySelector('.modal-content').addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        // Cerrar modal al hacer clic fuera del contenido
        comparadorModal.addEventListener('click', function() {
            comparadorModal.classList.add('hidden');
        });
        
        // Base de datos de entidades financieras reales con tasas actualizadas 2023
        const entidadesFinancieras = {
            personal: [
                {
                    nombre: "Bancolombia",
                    logo: "https://www.bancolombia.com/wcm/connect/www.bancolombia.com-26918/9e051e42-f457-4a69-bb30-72db1f9de201/Logo-bancolombia.png?MOD=AJPERES",
                    tasaEA: 29.04,
                    requisitos: "Score crediticio mínimo 600, ingresos desde $1.000.000, copia de cédula, certificado laboral con mínimo 6 meses.",
                    tiempoAprobacion: "24-48 horas"
                },
                {
                    nombre: "Banco de Bogotá",
                    logo: "https://www.bancodebogota.com/wps/themes/html/banco-de-bogota/images/logo.svg",
                    tasaEA: 28.88,
                    requisitos: "Score crediticio mínimo 625, ingresos desde $1.200.000, antigüedad laboral mínima de 6 meses.",
                    tiempoAprobacion: "1-3 días hábiles"
                },
                {
                    nombre: "Davivienda",
                    logo: "https://www.davivienda.com/wps/wcm/connect/personas/9083cd5d-5674-4584-8146-a17bb81a32d9/LogoDavivienda-Blanco.png?MOD=AJPERES",
                    tasaEA: 29.12,
                    requisitos: "Score crediticio mínimo 580, ingresos mínimos de $900.000, documento de identidad.",
                    tiempoAprobacion: "1-2 días hábiles"
                },
                {
                    nombre: "BBVA",
                    logo: "https://www.bbva.com/wp-content/uploads/2019/04/Logo-BBVA-1024x576.jpg",
                    tasaEA: 28.06,
                    requisitos: "Score crediticio mínimo 610, ingresos desde $1.100.000, documento de identidad y extractos bancarios.",
                    tiempoAprobacion: "24-72 horas"
                },
                {
                    nombre: "Banco de Occidente",
                    logo: "https://www.bancodeoccidente.com.co/wps/themes/html/banco-de-occidente/images/logo.svg",
                    tasaEA: 29.22,
                    requisitos: "Score crediticio mínimo 600, ingresos mínimos de $1.200.000, certificación laboral.",
                    tiempoAprobacion: "2-4 días hábiles"
                },
                {
                    nombre: "Scotiabank Colpatria",
                    logo: "https://scotiabankfiles.azureedge.net/scotiabank-colombia/Global-Elements/logos/colpatria-red.svg",
                    tasaEA: 29.76,
                    requisitos: "Score crediticio mínimo 590, ingresos desde $1.000.000, antigüedad laboral mínima de 8 meses.",
                    tiempoAprobacion: "2-3 días hábiles"
                },
                {
                    nombre: "Banco Popular",
                    logo: "https://www.bancopopular.com.co/wps/wcm/connect/bancopopular/68baca8a-ca9a-4fae-95c4-6a2278ffa3a0/logo-banco-popular.svg?MOD=AJPERES&CACHEID=ROOTWORKSPACE.Z18_NH941K82NOIE0QDLRTCPI3017-68baca8a-ca9a-4fae-95c4-6a2278ffa3a0-nsoOB9l",
                    tasaEA: 28.12,
                    requisitos: "Score crediticio mínimo 580, ingresos desde $950.000, ser empleado o pensionado.",
                    tiempoAprobacion: "3-5 días hábiles"
                },
                {
                    nombre: "Banco Falabella",
                    logo: "https://www.bancofalabella.com.co/assets/img/logo-banco-falabella.svg",
                    tasaEA: 29.81,
                    requisitos: "Score crediticio mínimo 570, ingresos desde $850.000, documento de identidad.",
                    tiempoAprobacion: "1-2 días hábiles"
                }
            ],
            hipotecario: [
                {
                    nombre: "Bancolombia",
                    logo: "https://www.bancolombia.com/wcm/connect/www.bancolombia.com-26918/9e051e42-f457-4a69-bb30-72db1f9de201/Logo-bancolombia.png?MOD=AJPERES",
                    tasaEA: 12.85,
                    requisitos: "Ingresos desde $2.500.000, cuota inicial mínima del 30%, no estar reportado en centrales de riesgo.",
                    tiempoAprobacion: "10-15 días hábiles"
                },
                {
                    nombre: "Davivienda",
                    logo: "https://www.davivienda.com/wps/wcm/connect/personas/9083cd5d-5674-4584-8146-a17bb81a32d9/LogoDavivienda-Blanco.png?MOD=AJPERES",
                    tasaEA: 12.60,
                    requisitos: "Ingresos mínimos de $2.300.000, cuota inicial del 20% para VIS y 30% para No VIS.",
                    tiempoAprobacion: "8-12 días hábiles"
                },
                {
                    nombre: "BBVA",
                    logo: "https://www.bbva.com/wp-content/uploads/2019/04/Logo-BBVA-1024x576.jpg",
                    tasaEA: 11.90,
                    requisitos: "Ingresos desde $2.200.000, cuota inicial desde el 20%, documentos de identidad y financieros.",
                    tiempoAprobacion: "7-14 días hábiles"
                },
                {
                    nombre: "Banco de Bogotá",
                    logo: "https://www.bancodebogota.com/wps/themes/html/banco-de-bogota/images/logo.svg",
                    tasaEA: 12.95,
                    requisitos: "Ingresos mínimos de $2.400.000, cuota inicial mínima del 30%, buen historial crediticio.",
                    tiempoAprobacion: "10-15 días hábiles"
                },
                {
                    nombre: "Scotiabank Colpatria",
                    logo: "https://scotiabankfiles.azureedge.net/scotiabank-colombia/Global-Elements/logos/colpatria-red.svg",
                    tasaEA: 12.20,
                    requisitos: "Ingresos desde $2.000.000, cuota inicial del 20% para VIS y 30% para No VIS.",
                    tiempoAprobacion: "10-12 días hábiles"
                },
                {
                    nombre: "Banco Itaú",
                    logo: "https://www.itau.co/documents/177137/177349/LogotipoItau_Marca2016.jpg",
                    tasaEA: 12.75,
                    requisitos: "Ingresos mínimos de $2.300.000, cuota inicial mínima del 30%, antigüedad laboral mínima 1 año.",
                    tiempoAprobacion: "8-15 días hábiles"
                }
            ],
            vehiculo: [
                {
                    nombre: "Bancolombia",
                    logo: "https://www.bancolombia.com/wcm/connect/www.bancolombia.com-26918/9e051e42-f457-4a69-bb30-72db1f9de201/Logo-bancolombia.png?MOD=AJPERES",
                    tasaEA: 18.90,
                    requisitos: "Ingresos desde $1.500.000, cuota inicial mínima del 10%, vehículo nuevo o usado hasta 5 años.",
                    tiempoAprobacion: "24-48 horas"
                },
                {
                    nombre: "BBVA",
                    logo: "https://www.bbva.com/wp-content/uploads/2019/04/Logo-BBVA-1024x576.jpg",
                    tasaEA: 17.80,
                    requisitos: "Ingresos mínimos de $1.400.000, financiación hasta el 90% para vehículos nuevos.",
                    tiempoAprobacion: "1-3 días hábiles"
                },
                {
                    nombre: "RCI Banque (Renault)",
                    logo: "https://www.rcibanque.es/rci-banque/img/logo.png",
                    tasaEA: 16.95,
                    requisitos: "Ingresos desde $1.300.000, exclusivo para vehículos Renault nuevos.",
                    tiempoAprobacion: "24-48 horas"
                },
                {
                    nombre: "Banco Finandina",
                    logo: "https://www.bancofinandina.com/site/Portals/0/logoBancoFinandina.png",
                    tasaEA: 17.20,
                    requisitos: "Ingresos mínimos de $1.200.000, especializado en crédito de vehículos.",
                    tiempoAprobacion: "1-2 días hábiles"
                },
                {
                    nombre: "Banco de Occidente",
                    logo: "https://www.bancodeoccidente.com.co/wps/themes/html/banco-de-occidente/images/logo.svg",
                    tasaEA: 18.40,
                    requisitos: "Ingresos desde $1.500.000, financiación hasta el 80% para vehículos nuevos y usados.",
                    tiempoAprobacion: "2-4 días hábiles"
                },
                {
                    nombre: "Davivienda",
                    logo: "https://www.davivienda.com/wps/wcm/connect/personas/9083cd5d-5674-4584-8146-a17bb81a32d9/LogoDavivienda-Blanco.png?MOD=AJPERES",
                    tasaEA: 18.80,
                    requisitos: "Ingresos mínimos de $1.500.000, financiación hasta el 90% para vehículos nuevos.",
                    tiempoAprobacion: "2-3 días hábiles"
                }
            ],
            libranza: [
                {
                    nombre: "Banco Popular",
                    logo: "https://www.bancopopular.com.co/wps/wcm/connect/bancopopular/68baca8a-ca9a-4fae-95c4-6a2278ffa3a0/logo-banco-popular.svg?MOD=AJPERES&CACHEID=ROOTWORKSPACE.Z18_NH941K82NOIE0QDLRTCPI3017-68baca8a-ca9a-4fae-95c4-6a2278ffa3a0-nsoOB9l",
                    tasaEA: 15.20,
                    requisitos: "Empleados con contrato formal o pensionados, convenio con la empresa, antigüedad mínima 6 meses.",
                    tiempoAprobacion: "2-5 días hábiles"
                },
                {
                    nombre: "Davivienda",
                    logo: "https://www.davivienda.com/wps/wcm/connect/personas/9083cd5d-5674-4584-8146-a17bb81a32d9/LogoDavivienda-Blanco.png?MOD=AJPERES",
                    tasaEA: 16.30,
                    requisitos: "Empleados o pensionados, convenio con la empresa, antigüedad mínima 4 meses.",
                    tiempoAprobacion: "3-5 días hábiles"
                },
                {
                    nombre: "Bancolombia",
                    logo: "https://www.bancolombia.com/wcm/connect/www.bancolombia.com-26918/9e051e42-f457-4a69-bb30-72db1f9de201/Logo-bancolombia.png?MOD=AJPERES",
                    tasaEA: 15.80,
                    requisitos: "Empleados en empresas con convenio, antigüedad mínima 6 meses, no tener reportes negativos.",
                    tiempoAprobacion: "3-6 días hábiles"
                },
                {
                    nombre: "BBVA",
                    logo: "https://www.bbva.com/wp-content/uploads/2019/04/Logo-BBVA-1024x576.jpg",
                    tasaEA: 15.50,
                    requisitos: "Empleados o pensionados, convenio con la empresa, antigüedad mínima 6 meses.",
                    tiempoAprobacion: "3-5 días hábiles"
                },
                {
                    nombre: "Banco de Bogotá",
                    logo: "https://www.bancodebogota.com/wps/themes/html/banco-de-bogota/images/logo.svg",
                    tasaEA: 15.90,
                    requisitos: "Empleados o pensionados, convenio activo con la empresa, mínimo 6 meses de antigüedad.",
                    tiempoAprobacion: "4-7 días hábiles"
                }
            ],
            tarjeta: [
                {
                    nombre: "Bancolombia",
                    logo: "https://www.bancolombia.com/wcm/connect/www.bancolombia.com-26918/9e051e42-f457-4a69-bb30-72db1f9de201/Logo-bancolombia.png?MOD=AJPERES",
                    tasaEA: 30.90,
                    requisitos: "Ingresos desde $900.000, buen historial crediticio, documento de identidad.",
                    tiempoAprobacion: "Inmediata - 3 días"
                },
                {
                    nombre: "Davivienda",
                    logo: "https://www.davivienda.com/wps/wcm/connect/personas/9083cd5d-5674-4584-8146-a17bb81a32d9/LogoDavivienda-Blanco.png?MOD=AJPERES",
                    tasaEA: 31.20,
                    requisitos: "Ingresos mínimos de $850.000, no estar reportado en centrales de riesgo.",
                    tiempoAprobacion: "24-72 horas"
                },
                {
                    nombre: "Banco Falabella",
                    logo: "https://www.bancofalabella.com.co/assets/img/logo-banco-falabella.svg",
                    tasaEA: 31.50,
                    requisitos: "Ingresos desde $750.000, documento de identidad, facilidad de aprobación.",
                    tiempoAprobacion: "Inmediata - 48 horas"
                },
                {
                    nombre: "Scotiabank Colpatria",
                    logo: "https://scotiabankfiles.azureedge.net/scotiabank-colombia/Global-Elements/logos/colpatria-red.svg",
                    tasaEA: 31.25,
                    requisitos: "Ingresos mínimos de $800.000, historial crediticio aceptable.",
                    tiempoAprobacion: "1-3 días hábiles"
                },
                {
                    nombre: "BBVA",
                    logo: "https://www.bbva.com/wp-content/uploads/2019/04/Logo-BBVA-1024x576.jpg",
                    tasaEA: 30.40,
                    requisitos: "Ingresos desde $900.000, historial crediticio positivo.",
                    tiempoAprobacion: "24-72 horas"
                },
                {
                    nombre: "Banco de Bogotá",
                    logo: "https://www.bancodebogota.com/wps/themes/html/banco-de-bogota/images/logo.svg",
                    tasaEA: 31.10,
                    requisitos: "Ingresos mínimos de $850.000, documento de identidad, historial crediticio.",
                    tiempoAprobacion: "1-3 días hábiles"
                },
                {
                    nombre: "Nu Bank",
                    logo: "https://assets-global.website-files.com/613a0c9cbec1af2ad9c06236/613a0c9cbec1af75c1c06363_logoNubank.svg",
                    tasaEA: 29.90,
                    requisitos: "Ingresos desde $700.000, aprobación basada en análisis de perfil, no necesariamente historial crediticio.",
                    tiempoAprobacion: "Inmediata - 48 horas"
                },
                {
                    nombre: "Banco Itaú",
                    logo: "https://www.itau.co/documents/177137/177349/LogotipoItau_Marca2016.jpg",
                    tasaEA: 30.80,
                    requisitos: "Ingresos desde $1.000.000, buen historial crediticio, documento de identidad.",
                    tiempoAprobacion: "2-4 días hábiles"
                }
            ],
            microempresa: [
                {
                    nombre: "Bancamía",
                    logo: "https://www.bancamia.com.co/hubfs/logo-bancamia-negativo-header.svg",
                    tasaEA: 38.50,
                    requisitos: "Microempresarios con negocio establecido mínimo 6 meses, documento de identidad.",
                    tiempoAprobacion: "3-5 días hábiles"
                },
                {
                    nombre: "Banco Mundo Mujer",
                    logo: "https://www.bmm.com.co/wp-content/uploads/2023/06/logo-banco-mundo-mujer.svg",
                    tasaEA: 38.10,
                    requisitos: "Negocio propio con mínimo 6 meses, no requiere codeudor para montos pequeños.",
                    tiempoAprobacion: "2-4 días hábiles"
                },
                {
                    nombre: "Bancolombia Microfinanzas",
                    logo: "https://www.bancolombia.com/wcm/connect/www.bancolombia.com-26918/9e051e42-f457-4a69-bb30-72db1f9de201/Logo-bancolombia.png?MOD=AJPERES",
                    tasaEA: 37.50,
                    requisitos: "Negocio en funcionamiento mínimo 1 año, documento de identidad, referencias comerciales.",
                    tiempoAprobacion: "5-8 días hábiles"
                },
                {
                    nombre: "Banco de Bogotá Microfinanzas",
                    logo: "https://www.bancodebogota.com/wps/themes/html/banco-de-bogota/images/logo.svg",
                    tasaEA: 37.80,
                    requisitos: "Microempresa con mínimo 1 año de funcionamiento, documento de identidad.",
                    tiempoAprobacion: "4-7 días hábiles"
                },
                {
                    nombre: "Bancoldex (Microcrédito)",
                    logo: "https://www.bancoldex.com/sites/default/files/logo-bancoldex_0.jpg",
                    tasaEA: 34.20,
                    requisitos: "Empresa formal con mínimo 2 años de operación, estados financieros, plan de inversión.",
                    tiempoAprobacion: "10-15 días hábiles"
                }
            ]
        };
        
        // Comparar tasas
        const compararTasasBtn = comparadorModal.querySelector('#comparar-tasas');
        if (compararTasasBtn) {
            compararTasasBtn.addEventListener('click', function() {
                console.log('Comparando tasas...');
                
                // Obtener valores seleccionados
                const tipoPrestamo = comparadorModal.querySelector('#tipo-prestamo').value;
                const montoPrestamo = parseFloat(comparadorModal.querySelector('#monto-prestamo').value) || 10000000;
                const plazoMeses = parseInt(comparadorModal.querySelector('#plazo-meses').value) || 36;
                const perfilCliente = comparadorModal.querySelector('#perfil-cliente').value;
                
                // Validar entrada
                if (montoPrestamo <= 0) {
                    mostrarMensaje("Ingresa un monto válido para el préstamo", "error");
                    return;
                }
                
                // Obtener entidades para este tipo de préstamo
                const entidades = entidadesFinancieras[tipoPrestamo] || [];
                
                if (entidades.length === 0) {
                    mostrarMensaje("No se encontraron datos para este tipo de préstamo", "warning");
                    return;
                }
                
                // Calcular tasas y cuotas
                const resultados = entidades.map(entidad => {
                    // Ajustar tasa según perfil y monto (simulación)
                    let tasaAjustada = entidad.tasaEA;
                    
                    // Ajustes por perfil
                    if (perfilCliente === 'empleado') tasaAjustada -= 0.3;
                    else if (perfilCliente === 'pensionado') tasaAjustada -= 0.5;
                    else if (perfilCliente === 'independiente') tasaAjustada += 0.2;
                    
                    // Ajustes por monto
                    if (montoPrestamo > 50000000) tasaAjustada -= 0.4;
                    else if (montoPrestamo > 20000000) tasaAjustada -= 0.2;
                    
                    // Calcular tasa mensual
                    const tasaMensual = Math.pow(1 + tasaAjustada / 100, 1/12) - 1;
                    
                    // Calcular cuota mensual
                    const cuotaMensual = calcularCuotaMensual(montoPrestamo, tasaMensual, plazoMeses);
                    
                    return {
                        ...entidad,
                        tasaAjustada: tasaAjustada,
                        tasaMensual: tasaMensual * 100,
                        cuotaMensual: cuotaMensual
                    };
                });
                
                // Ordenar por tasa (de menor a mayor)
                resultados.sort((a, b) => a.tasaAjustada - b.tasaAjustada);
                
                // Mostrar resultados
                mostrarResultadosComparacion(resultados, tipoPrestamo, montoPrestamo, plazoMeses);
                
                // Mostrar sección de resultados
                comparadorModal.querySelector('#comparador-resultado').classList.remove('hidden');
            });
        }
        
        /**
         * Calcular cuota mensual de un préstamo
         * @param {number} monto - Monto del préstamo
         * @param {number} tasaMensual - Tasa de interés mensual en decimal
         * @param {number} plazo - Plazo en meses
         * @returns {number} Cuota mensual
         */
        function calcularCuotaMensual(monto, tasaMensual, plazo) {
            if (tasaMensual === 0) {
                return monto / plazo;
            }
            return monto * tasaMensual * Math.pow(1 + tasaMensual, plazo) / (Math.pow(1 + tasaMensual, plazo) - 1);
        }
        
        /**
         * Mostrar mensaje al usuario
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
        
        /**
         * Mostrar resultados de la comparación
         * @param {Array} resultados - Lista de resultados de entidades financieras
         * @param {string} tipoPrestamo - Tipo de préstamo seleccionado
         * @param {number} montoPrestamo - Monto del préstamo
         * @param {number} plazoMeses - Plazo en meses
         */
        function mostrarResultadosComparacion(resultados, tipoPrestamo, montoPrestamo, plazoMeses) {
            const tablaResultados = document.getElementById('tasas-resultados');
            tablaResultados.innerHTML = '';
            
            const formatoMoneda = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0
            });
            
            resultados.forEach((resultado, index) => {
                const fila = document.createElement('tr');
                
                if (index === 0) {
                    fila.className = 'mejor-tasa';
                }
                
                fila.innerHTML = `
                    <td>
                        <div class="entidad-info">
                            <img src="${resultado.logo}" alt="${resultado.nombre}" class="entidad-logo">
                            <span class="entidad-nombre">${resultado.nombre}</span>
                        </div>
                    </td>
                    <td>${resultado.tasaAjustada.toFixed(2)}%</td>
                    <td>${resultado.tasaMensual.toFixed(2)}%</td>
                    <td>${formatoMoneda.format(resultado.cuotaMensual)}</td>
                    <td>${resultado.requisitos}</td>
                    <td>
                        <button class="btn-aplicar-tasa" data-tasa="${resultado.tasaMensual.toFixed(2)}">
                            Aplicar
                        </button>
                    </td>
                `;
                
                tablaResultados.appendChild(fila);
            });
            
            document.querySelectorAll('.btn-aplicar-tasa').forEach(btn => {
                btn.addEventListener('click', function() {
                    const tasaSeleccionada = parseFloat(this.getAttribute('data-tasa'));
                    
                    document.getElementById('interes-mensual').value = tasaSeleccionada;
                    
                    const montoComparador = document.getElementById('monto-prestamo').value;
                    const plazoComparador = document.getElementById('plazo-meses').value;
                    
                    if (montoComparador) {
                        document.getElementById('monto').value = montoComparador;
                    }
                    
                    if (plazoComparador) {
                        document.getElementById('plazo').value = plazoComparador;
                    }
                    
                    comparadorModal.classList.add('hidden');
                    
                    mostrarMensaje(`Tasa de ${tasaSeleccionada}% aplicada al simulador`, "success");
                });
            });
        }
    });
})();
