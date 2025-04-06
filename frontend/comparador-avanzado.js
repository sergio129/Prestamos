/**
 * Comparador Avanzado de Préstamos
 * Permite comparar diferentes opciones de préstamos con análisis detallado
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando comparador avanzado...');
    
    // Esperar a que exista el contenedor del comparador
    const intervalo = setInterval(() => {
        const comparadorContenido = document.getElementById('comparador-contenido');
        if (comparadorContenido) {
            clearInterval(intervalo);
            inicializarComparador(comparadorContenido);
        }
    }, 100);
    
    /**
     * Inicializa el comparador avanzado
     * @param {HTMLElement} contenedor - El contenedor donde se creará el comparador
     */
    function inicializarComparador(contenedor) {
        // Crear la estructura del comparador
        contenedor.innerHTML = `
            <div class="comparador-avanzado">
                <h4>Comparador Avanzado de Préstamos</h4>
                <p>Compara diferentes opciones de préstamos para encontrar la mejor opción.</p>
                
                <div class="comparador-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="comp-monto-base">Monto base:</label>
                            <div class="input-icon">
                                <span class="currency-symbol">$</span>
                                <input type="number" id="comp-monto-base" placeholder="Monto del préstamo">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="comp-plazo-base">Plazo base (meses):</label>
                            <input type="number" id="comp-plazo-base" min="1" max="360" value="12">
                        </div>
                    </div>
                    
                    <div class="opciones-container">
                        <h5>Opciones a comparar</h5>
                        
                        <div class="opcion-comparar" id="opcion1">
                            <div class="opcion-header">
                                <h6>Opción 1</h6>
                                <div class="form-check">
                                    <input type="checkbox" id="opcion1-usar-base" checked>
                                    <label for="opcion1-usar-base">Usar valores base</label>
                                </div>
                            </div>
                            <div class="opcion-body">
                                <div class="form-group">
                                    <label for="opcion1-monto">Monto:</label>
                                    <div class="input-icon">
                                        <span class="currency-symbol">$</span>
                                        <input type="number" id="opcion1-monto" placeholder="Igual que monto base" disabled>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="opcion1-plazo">Plazo (meses):</label>
                                    <input type="number" id="opcion1-plazo" placeholder="Igual que plazo base" disabled>
                                </div>
                                <div class="form-group">
                                    <label for="opcion1-tasa">Tasa de interés mensual (%):</label>
                                    <input type="number" id="opcion1-tasa" step="0.01" min="0.1" max="10" value="1.2">
                                </div>
                                <div class="form-group">
                                    <label for="opcion1-nombre">Nombre/Banco:</label>
                                    <input type="text" id="opcion1-nombre" placeholder="Ej: Banco A">
                                </div>
                            </div>
                        </div>
                        
                        <div class="opcion-comparar" id="opcion2">
                            <div class="opcion-header">
                                <h6>Opción 2</h6>
                                <div class="form-check">
                                    <input type="checkbox" id="opcion2-usar-base" checked>
                                    <label for="opcion2-usar-base">Usar valores base</label>
                                </div>
                            </div>
                            <div class="opcion-body">
                                <div class="form-group">
                                    <label for="opcion2-monto">Monto:</label>
                                    <div class="input-icon">
                                        <span class="currency-symbol">$</span>
                                        <input type="number" id="opcion2-monto" placeholder="Igual que monto base" disabled>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="opcion2-plazo">Plazo (meses):</label>
                                    <input type="number" id="opcion2-plazo" placeholder="Igual que plazo base" disabled>
                                </div>
                                <div class="form-group">
                                    <label for="opcion2-tasa">Tasa de interés mensual (%):</label>
                                    <input type="number" id="opcion2-tasa" step="0.01" min="0.1" max="10" value="1.5">
                                </div>
                                <div class="form-group">
                                    <label for="opcion2-nombre">Nombre/Banco:</label>
                                    <input type="text" id="opcion2-nombre" placeholder="Ej: Banco B">
                                </div>
                            </div>
                        </div>
                        
                        <div class="opcion-comparar" id="opcion3">
                            <div class="opcion-header">
                                <h6>Opción 3</h6>
                                <div class="form-check">
                                    <input type="checkbox" id="opcion3-usar-base" checked>
                                    <label for="opcion3-usar-base">Usar valores base</label>
                                </div>
                            </div>
                            <div class="opcion-body">
                                <div class="form-group">
                                    <label for="opcion3-monto">Monto:</label>
                                    <div class="input-icon">
                                        <span class="currency-symbol">$</span>
                                        <input type="number" id="opcion3-monto" placeholder="Igual que monto base" disabled>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="opcion3-plazo">Plazo (meses):</label>
                                    <input type="number" id="opcion3-plazo" placeholder="Igual que plazo base" disabled>
                                </div>
                                <div class="form-group">
                                    <label for="opcion3-tasa">Tasa de interés mensual (%):</label>
                                    <input type="number" id="opcion3-tasa" step="0.01" min="0.1" max="10" value="1.8">
                                </div>
                                <div class="form-group">
                                    <label for="opcion3-nombre">Nombre/Banco:</label>
                                    <input type="text" id="opcion3-nombre" placeholder="Ej: Banco C">
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <button id="comparar-prestamos" class="btn">Comparar Préstamos</button>
                </div>
                
                <div id="resultados-comparacion" class="hidden">
                    <h5>Resultados de la comparación</h5>
                    <div class="comparator-grid" id="comparator-grid">
                        <!-- Aquí se mostrarán las tarjetas de comparación -->
                    </div>
                </div>
            </div>
        `;
        
        // Configurar eventos para los checkboxes de "Usar valores base"
        for (let i = 1; i <= 3; i++) {
            const checkbox = document.getElementById(`opcion${i}-usar-base`);
            const montoInput = document.getElementById(`opcion${i}-monto`);
            const plazoInput = document.getElementById(`opcion${i}-plazo`);
            
            checkbox.addEventListener('change', function() {
                montoInput.disabled = this.checked;
                plazoInput.disabled = this.checked;
                
                if (this.checked) {
                    montoInput.placeholder = "Igual que monto base";
                    plazoInput.placeholder = "Igual que plazo base";
                } else {
                    montoInput.placeholder = "Monto personalizado";
                    plazoInput.placeholder = "Plazo personalizado";
                }
            });
        }
        
        // Configurar el evento para comparar préstamos
        document.getElementById('comparar-prestamos').addEventListener('click', function() {
            // Obtener valores base
            const montoBase = parseFloat(document.getElementById('comp-monto-base').value);
            const plazoBase = parseInt(document.getElementById('comp-plazo-base').value);
            
            // Validar valores base
            if (!montoBase || montoBase <= 0) {
                mostrarMensajePersonalizado("Ingrese un monto base válido", "error");
                return;
            }
            
            if (!plazoBase || plazoBase <= 0) {
                mostrarMensajePersonalizado("Ingrese un plazo base válido", "error");
                return;
            }
            
            // Recopilar datos de las opciones
            const opciones = [];
            
            for (let i = 1; i <= 3; i++) {
                const usarBase = document.getElementById(`opcion${i}-usar-base`).checked;
                const tasa = parseFloat(document.getElementById(`opcion${i}-tasa`).value);
                let monto = usarBase ? montoBase : parseFloat(document.getElementById(`opcion${i}-monto`).value);
                let plazo = usarBase ? plazoBase : parseInt(document.getElementById(`opcion${i}-plazo`).value);
                const nombre = document.getElementById(`opcion${i}-nombre`).value || `Opción ${i}`;
                
                // Validar tasa
                if (!tasa || tasa <= 0) {
                    mostrarMensajePersonalizado(`Ingrese una tasa válida para la Opción ${i}`, "error");
                    return;
                }
                
                // Si no se usa base, validar los valores personalizados
                if (!usarBase) {
                    if (!monto || monto <= 0) {
                        mostrarMensajePersonalizado(`Ingrese un monto válido para la Opción ${i}`, "error");
                        return;
                    }
                    
                    if (!plazo || plazo <= 0) {
                        mostrarMensajePersonalizado(`Ingrese un plazo válido para la Opción ${i}`, "error");
                        return;
                    }
                }
                
                // Calcular cuota mensual
                const tasaMensual = tasa / 100;
                const cuotaMensual = calcularCuotaMensual(monto, tasaMensual, plazo);
                
                // Calcular total a pagar e intereses
                const totalPagar = cuotaMensual * plazo;
                const totalIntereses = totalPagar - monto;
                
                // Calcular tasa anual equivalente
                const tasaAnual = (Math.pow(1 + tasaMensual, 12) - 1) * 100;
                
                opciones.push({
                    nombre,
                    monto,
                    plazo,
                    tasa,
                    tasaAnual,
                    cuotaMensual,
                    totalPagar,
                    totalIntereses
                });
            }
            
            // Mostrar resultados
            mostrarResultadosComparacion(opciones);
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
     * Muestra los resultados de la comparación
     * @param {Array} opciones - Array con las opciones de préstamos
     */
    function mostrarResultadosComparacion(opciones) {
        const resultadosContainer = document.getElementById('resultados-comparacion');
        const grid = document.getElementById('comparator-grid');
        
        // Mostrar el contenedor de resultados
        resultadosContainer.classList.remove('hidden');
        
        // Encontrar la mejor opción (menor total a pagar)
        const mejorOpcion = opciones.reduce((prev, current) => 
            (prev.totalPagar < current.totalPagar) ? prev : current
        );
        
        // Vaciar el grid
        grid.innerHTML = '';
        
        // Crear el formateador de moneda
        const formatoMoneda = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        });
        
        // Llenar el grid con tarjetas para cada opción
        opciones.forEach(opcion => {
            const esMejorOpcion = opcion.totalPagar === mejorOpcion.totalPagar;
            
            const tarjeta = document.createElement('div');
            tarjeta.className = 'loan-card';
            tarjeta.innerHTML = `
                <div class="loan-card-header">
                    <h6>${opcion.nombre} ${esMejorOpcion ? '<span class="recommendation-badge">Recomendado</span>' : ''}</h6>
                </div>
                <div class="loan-card-body">
                    <div class="metric">
                        <span>Monto:</span>
                        <span>${formatoMoneda.format(opcion.monto)}</span>
                    </div>
                    <div class="metric">
                        <span>Plazo:</span>
                        <span>${opcion.plazo} meses</span>
                    </div>
                    <div class="metric">
                        <span>Tasa mensual:</span>
                        <span>${opcion.tasa.toFixed(2)}%</span>
                    </div>
                    <div class="metric">
                        <span>Tasa anual:</span>
                        <span>${opcion.tasaAnual.toFixed(2)}%</span>
                    </div>
                    <div class="metric">
                        <span>Cuota mensual:</span>
                        <span>${formatoMoneda.format(opcion.cuotaMensual)}</span>
                    </div>
                    <div class="metric">
                        <span>Total a pagar:</span>
                        <span>${formatoMoneda.format(opcion.totalPagar)}</span>
                    </div>
                    <div class="metric">
                        <span>Total intereses:</span>
                        <span>${formatoMoneda.format(opcion.totalIntereses)}</span>
                    </div>
                </div>
            `;
            
            // Resaltar la mejor opción
            if (esMejorOpcion) {
                tarjeta.style.borderColor = '#28a745';
                tarjeta.style.boxShadow = '0 0 10px rgba(40, 167, 69, 0.3)';
            }
            
            grid.appendChild(tarjeta);
        });
        
        // Mostrar mensaje de éxito
        mostrarMensajePersonalizado("Comparación completada con éxito", "success");
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
