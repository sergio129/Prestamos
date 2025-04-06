/**
 * Calculadora de TIR (Tasa Interna de Retorno)
 * Permite calcular la rentabilidad real de una inversión o préstamo
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando calculadora TIR...');
    
    // Crear el contenedor principal para las nuevas herramientas si no existe
    let nuevasHerramientas = document.getElementById('nuevas-herramientas');
    
    if (!nuevasHerramientas) {
        nuevasHerramientas = document.createElement('div');
        nuevasHerramientas.id = 'nuevas-herramientas';
        nuevasHerramientas.className = 'nuevas-herramientas';
        
        // Crear encabezado de las herramientas
        const header = document.createElement('div');
        header.className = 'herramientas-header';
        header.innerHTML = `
            <h3>Herramientas Financieras Avanzadas</h3>
            <button id="toggle-herramientas" class="btn btn-sm">
                <i class="fas fa-chevron-down"></i>
            </button>
        `;
        nuevasHerramientas.appendChild(header);
        
        // Crear tabs para las diferentes herramientas
        const tabs = document.createElement('div');
        tabs.className = 'herramientas-tabs';
        tabs.innerHTML = `
            <div class="herramientas-tab active" data-target="tir-panel">Calculadora TIR</div>
            <div class="herramientas-tab" data-target="comparador-panel">Comparador Avanzado</div>
            <div class="herramientas-tab" data-target="analisis-panel">Análisis Financiero</div>
        `;
        nuevasHerramientas.appendChild(tabs);
        
        // Crear contenedor para los paneles
        const paneles = document.createElement('div');
        paneles.className = 'herramientas-paneles';
        
        // Panel de Calculadora TIR
        const tirPanel = document.createElement('div');
        tirPanel.id = 'tir-panel';
        tirPanel.className = 'herramientas-panel active';
        tirPanel.innerHTML = `
            <div class="tir-calculator">
                <h4>Calculadora de Tasa Interna de Retorno (TIR)</h4>
                <p>Calcula la rentabilidad real de tu inversión o préstamo.</p>
                
                <div class="form-group">
                    <label for="tir-inversion-inicial">Inversión/Préstamo inicial:</label>
                    <div class="input-icon">
                        <span class="currency-symbol">$</span>
                        <input type="number" id="tir-inversion-inicial" placeholder="Monto inicial">
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="tir-flujos">Flujos de caja (separados por coma):</label>
                    <input type="text" id="tir-flujos" placeholder="Ej: 1000,1200,1500,1300">
                </div>
                
                <div class="form-group">
                    <label for="tir-periodo">Período (años):</label>
                    <input type="number" id="tir-periodo" min="1" max="30" value="1" step="0.5">
                </div>
                
                <button id="calcular-tir" class="btn">Calcular TIR</button>
                
                <div id="tir-result" class="tir-result hidden">
                    <div class="tir-value" id="tir-valor">0.00%</div>
                    <p class="tir-interpretation" id="tir-interpretacion">
                        La interpretación aparecerá aquí...
                    </p>
                </div>
            </div>
        `;
        paneles.appendChild(tirPanel);
        
        // Panel de Comparador Avanzado (vacío por ahora, se llenará desde su script)
        const comparadorPanel = document.createElement('div');
        comparadorPanel.id = 'comparador-panel';
        comparadorPanel.className = 'herramientas-panel';
        comparadorPanel.innerHTML = '<div id="comparador-contenido"></div>';
        paneles.appendChild(comparadorPanel);
        
        // Panel de Análisis Financiero (vacío por ahora, se llenará desde su script)
        const analisisPanel = document.createElement('div');
        analisisPanel.id = 'analisis-panel';
        analisisPanel.className = 'herramientas-panel';
        analisisPanel.innerHTML = '<div id="analisis-contenido"></div>';
        paneles.appendChild(analisisPanel);
        
        nuevasHerramientas.appendChild(paneles);
        
        // Insertar antes del formulario principal
        const container = document.querySelector('.container');
        container.appendChild(nuevasHerramientas);
        
        // Configurar eventos para las tabs
        document.querySelectorAll('.herramientas-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                // Desactivar todas las tabs y paneles
                document.querySelectorAll('.herramientas-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.herramientas-panel').forEach(p => p.classList.remove('active'));
                
                // Activar la tab y panel seleccionados
                this.classList.add('active');
                const targetPanel = this.getAttribute('data-target');
                document.getElementById(targetPanel).classList.add('active');
            });
        });
        
        // Configurar evento para mostrar/ocultar herramientas
        document.getElementById('toggle-herramientas').addEventListener('click', function() {
            const paneles = document.querySelector('.herramientas-paneles');
            paneles.classList.toggle('hidden');
            
            // Cambiar icono
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-chevron-down')) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    }
    
    // Configurar el evento para calcular TIR
    document.getElementById('calcular-tir').addEventListener('click', function() {
        // Obtener valores de entrada
        const inversionInicial = parseFloat(document.getElementById('tir-inversion-inicial').value) || 0;
        const flujosTexto = document.getElementById('tir-flujos').value;
        const periodo = parseFloat(document.getElementById('tir-periodo').value) || 1;
        
        // Validar entradas
        if (inversionInicial <= 0) {
            mostrarMensajePersonalizado("Ingrese una inversión inicial válida", "error");
            return;
        }
        
        if (!flujosTexto) {
            mostrarMensajePersonalizado("Ingrese flujos de caja separados por coma", "error");
            return;
        }
        
        // Convertir flujos de texto a array de números
        const flujos = flujosTexto.split(',').map(flujo => parseFloat(flujo.trim())).filter(flujo => !isNaN(flujo));
        
        if (flujos.length === 0) {
            mostrarMensajePersonalizado("Ingrese al menos un flujo de caja válido", "error");
            return;
        }
        
        // Calcular TIR
        const tir = calcularTIR(-inversionInicial, ...flujos);
        
        // Mostrar resultado
        const resultadoTIR = document.getElementById('tir-result');
        const valorTIR = document.getElementById('tir-valor');
        const interpretacionTIR = document.getElementById('tir-interpretacion');
        
        resultadoTIR.classList.remove('hidden');
        
        // Anualizar la TIR según el período
        const tirAnual = Math.pow(1 + tir, 1 / periodo) - 1;
        
        valorTIR.textContent = (tirAnual * 100).toFixed(2) + '%';
        
        // Generar interpretación
        let interpretacion = '';
        if (tirAnual > 0.15) {
            interpretacion = 'Excelente rendimiento. Esta inversión/préstamo ofrece una rentabilidad muy alta.';
        } else if (tirAnual > 0.10) {
            interpretacion = 'Buen rendimiento. Esta inversión/préstamo es bastante rentable.';
        } else if (tirAnual > 0.05) {
            interpretacion = 'Rendimiento moderado. Esta inversión/préstamo tiene una rentabilidad aceptable.';
        } else if (tirAnual > 0) {
            interpretacion = 'Rendimiento bajo. Esta inversión/préstamo tiene poca rentabilidad.';
        } else {
            interpretacion = 'Rendimiento negativo. Esta inversión/préstamo no es rentable.';
        }
        
        interpretacionTIR.textContent = interpretacion;
    });
    
    /**
     * Calcula la TIR (Tasa Interna de Retorno) para una serie de flujos de caja
     * @param {number} inicialInversion - Inversión inicial (negativa)
     * @param {number[]} flujos - Flujos de caja futuros
     * @returns {number} - La TIR calculada
     */
    function calcularTIR(inicialInversion, ...flujos) {
        // Agregar inversión inicial al principio de los flujos
        const todosLosFlujos = [inicialInversion, ...flujos];
        
        // Función para calcular el VAN
        function calcularVAN(tasa) {
            return todosLosFlujos.reduce((acumulado, flujo, indice) => {
                return acumulado + flujo / Math.pow(1 + tasa, indice);
            }, 0);
        }
        
        // Buscar la TIR usando el método de bisección
        let tasaInferior = -0.99;
        let tasaSuperior = 10;
        let tasaMedia;
        let van;
        
        // Establecer precisión
        const epsilon = 0.0001;
        
        // Verificar si hay solución
        if (calcularVAN(tasaInferior) * calcularVAN(tasaSuperior) > 0) {
            return NaN; // No hay solución en este rango
        }
        
        // Método de bisección para encontrar la TIR
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
