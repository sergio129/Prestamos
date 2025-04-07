/**
 * Script para las mejoras del módulo de préstamos
 * Incluye: exportación PDF, simulaciones recientes, comparador, gráficos y accesibilidad
 */

document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos
    const recentSimulationsContainer = document.getElementById('recent-simulations');
    const recentList = document.getElementById('recent-list');
    const comparisonContainer = document.getElementById('comparison-container');
    const chartContainer = document.getElementById('chart-container');
    const a11yHelp = document.getElementById('a11y-help');
    const a11yMenu = document.getElementById('a11y-menu');
    const exportModal = document.getElementById('export-modal');
    const generatePDFBtn = document.getElementById('generate-pdf');
    
    // Inicializar todos los componentes
    initRecentSimulations();
    initCharts();
    initA11yFeatures();
    initExportPDF();
    initContactPanel();
    
    /**
     * 1. SIMULACIONES RECIENTES
     */
    function initRecentSimulations() {
        // Cargar simulaciones recientes desde localStorage
        const recientes = localStorage.getItem('recentSimulations');
        
        if (recientes) {
            const simulaciones = JSON.parse(recientes);
            
            if (simulaciones.length > 0) {
                recentSimulationsContainer.classList.remove('hidden');
                renderRecentSimulations(simulaciones);
            }
        }
        
        // Evento para guardar automáticamente simulaciones después de calcular
        document.addEventListener('simulacionCalculada', function(e) {
            if (e.detail) {
                saveToRecent(e.detail);
            }
        });
    }
    
    function renderRecentSimulations(simulaciones) {
        recentList.innerHTML = '';
        
        // Mostrar últimas 5 simulaciones
        simulaciones.slice(0, 5).forEach(sim => {
            const item = document.createElement('div');
            item.className = 'recent-item';
            
            item.innerHTML = `
                <div class="recent-item-details">
                    <span class="recent-item-name">${sim.nombre || 'Simulación'} - $${sim.monto.toLocaleString('es-CO')}</span>
                    <span class="recent-item-info">${sim.plazo} meses - ${sim.interesMensual}% interés</span>
                </div>
                <div class="recent-actions">
                    <button class="btn-small btn-view load-recent" data-id="${sim.id}">Cargar</button>
                    <button class="btn-small btn-delete remove-recent" data-id="${sim.id}">Eliminar</button>
                </div>
            `;
            
            recentList.appendChild(item);
        });
        
        // Añadir eventos a los botones
        document.querySelectorAll('.load-recent').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                loadRecentSimulation(id);
            });
        });
        
        document.querySelectorAll('.remove-recent').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                removeFromRecent(id);
            });
        });
    }
    
    function saveToRecent(simulacion) {
        // Añadir ID único si no tiene
        if (!simulacion.id) {
            simulacion.id = Date.now().toString();
        }
        
        // Guardar fecha
        simulacion.fecha = new Date().toISOString();
        
        // Obtener lista actual
        let simulaciones = [];
        const recientes = localStorage.getItem('recentSimulations');
        
        if (recientes) {
            simulaciones = JSON.parse(recientes);
        }
        
        // Verificar si ya existe y eliminarlo para ponerlo al principio
        const existingIndex = simulaciones.findIndex(s => s.id === simulacion.id);
        if (existingIndex >= 0) {
            simulaciones.splice(existingIndex, 1);
        }
        
        // Añadir al principio de la lista
        simulaciones.unshift(simulacion);
        
        // Limitar a 10 elementos
        if (simulaciones.length > 10) {
            simulaciones = simulaciones.slice(0, 10);
        }
        
        // Guardar en localStorage
        localStorage.setItem('recentSimulations', JSON.stringify(simulaciones));
        
        // Mostrar sección y actualizar lista
        recentSimulationsContainer.classList.remove('hidden');
        renderRecentSimulations(simulaciones);
    }
    
    function loadRecentSimulation(id) {
        const recientes = localStorage.getItem('recentSimulations');
        
        if (recientes) {
            const simulaciones = JSON.parse(recientes);
            const simulacion = simulaciones.find(s => s.id === id);
            
            if (simulacion) {
                // Cargar datos en el formulario
                document.getElementById('monto').value = simulacion.monto;
                document.getElementById('plazo').value = simulacion.plazo;
                document.getElementById('interes-mensual').value = simulacion.interesMensual;
                
                // Disparar evento de cálculo
                if (typeof calcularPrestamo === 'function') {
                    calcularPrestamo();
                    mostrarToast("Simulación cargada correctamente", "success");
                } else {
                    console.error("Función calcularPrestamo no disponible");
                    mostrarToast("Error al cargar la simulación", "error");
                }
            }
        }
    }
    
    function removeFromRecent(id) {
        const recientes = localStorage.getItem('recentSimulations');
        
        if (recientes) {
            let simulaciones = JSON.parse(recientes);
            simulaciones = simulaciones.filter(s => s.id !== id);
            
            localStorage.setItem('recentSimulations', JSON.stringify(simulaciones));
            
            if (simulaciones.length > 0) {
                renderRecentSimulations(simulaciones);
            } else {
                recentSimulationsContainer.classList.add('hidden');
            }
            
            mostrarToast("Simulación eliminada de recientes", "info");
        }
    }
    
    /**
     * 2. GRÁFICOS DE ANÁLISIS
     */
    function initCharts() {
        // Escuchar al evento de simulación calculada
        document.addEventListener('simulacionCalculada', function(e) {
            if (e.detail && e.detail.amortizacion) {
                renderCharts(e.detail);
            }
        });
        
        // Cambio de pestañas
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', function() {
                // Desactivar todas las pestañas
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                
                // Activar la pestaña actual
                this.classList.add('active');
                
                // Mostrar el gráfico correspondiente
                const tabName = this.getAttribute('data-tab');
                updateChart(tabName);
            });
        });
    }
    
    let currentChartData = null;
    let currentChart = null;
    
    function renderCharts(data) {
        currentChartData = data;
        chartContainer.classList.remove('hidden');
        
        // Inicialmente mostrar el gráfico de amortización
        createChart('amortization', data);
    }
    
    function updateChart(type) {
        if (currentChartData) {
            createChart(type, currentChartData);
        }
    }
    
    function createChart(type, data) {
        const ctx = document.getElementById('chart-content');
        
        // Eliminar gráfico anterior si existe
        if (currentChart) {
            currentChart.destroy();
        }
        
        // Preparar datos según el tipo de gráfico
        let chartData = {
            labels: [],
            datasets: []
        };
        
        switch (type) {
            case 'amortization':
                chartData.labels = data.amortizacion.map(item => `Cuota ${item.numeroCuota}`);
                chartData.datasets = [
                    {
                        label: 'Capital',
                        data: data.amortizacion.map(item => item.capital),
                        backgroundColor: 'rgba(110, 142, 251, 0.6)',
                        borderColor: 'rgba(110, 142, 251, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Interés',
                        data: data.amortizacion.map(item => item.interes),
                        backgroundColor: 'rgba(167, 119, 227, 0.6)',
                        borderColor: 'rgba(167, 119, 227, 1)',
                        borderWidth: 1
                    }
                ];
                break;
                
            case 'interest':
                // Calcular acumulados
                let totalCapital = 0;
                let totalInteres = 0;
                
                chartData.labels = ['Distribución del pago'];
                chartData.datasets = [
                    {
                        label: 'Distribución',
                        data: [data.monto, data.totalIntereses],
                        backgroundColor: [
                            'rgba(110, 142, 251, 0.6)',
                            'rgba(167, 119, 227, 0.6)'
                        ],
                        borderColor: [
                            'rgba(110, 142, 251, 1)',
                            'rgba(167, 119, 227, 1)'
                        ],
                        borderWidth: 1
                    }
                ];
                break;
                
            case 'balance':
                chartData.labels = data.amortizacion.map(item => `Cuota ${item.numeroCuota}`);
                chartData.datasets = [
                    {
                        label: 'Saldo Restante',
                        data: data.amortizacion.map(item => item.saldo),
                        backgroundColor: 'rgba(39, 174, 96, 0.2)',
                        borderColor: 'rgba(39, 174, 96, 1)',
                        borderWidth: 2,
                        fill: true
                    }
                ];
                break;
        }
        
        // Crear el gráfico
        currentChart = new Chart(ctx, {
            type: type === 'interest' ? 'pie' : 'bar',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== undefined) {
                                    label += new Intl.NumberFormat('es-CO', { 
                                        style: 'currency', 
                                        currency: 'COP' 
                                    }).format(context.parsed.y);
                                } else if (context.parsed !== undefined) {
                                    label += new Intl.NumberFormat('es-CO', { 
                                        style: 'currency', 
                                        currency: 'COP' 
                                    }).format(context.parsed);
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: type !== 'interest' ? {
                    x: {
                        stacked: type === 'amortization'
                    },
                    y: {
                        stacked: type === 'amortization',
                        ticks: {
                            callback: function(value) {
                                return new Intl.NumberFormat('es-CO', { 
                                    style: 'currency', 
                                    currency: 'COP',
                                    maximumFractionDigits: 0
                                }).format(value);
                            }
                        }
                    }
                } : undefined
            }
        });
    }
    
    /**
     * 3. OPCIONES DE ACCESIBILIDAD
     */
    function initA11yFeatures() {
        // Mostrar/ocultar menú de accesibilidad
        a11yHelp.addEventListener('click', function() {
            a11yMenu.classList.toggle('show');
        });
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (!a11yHelp.contains(e.target) && !a11yMenu.contains(e.target)) {
                a11yMenu.classList.remove('show');
            }
        });
        
        // Opciones de accesibilidad
        document.querySelectorAll('.a11y-option').forEach(option => {
            option.addEventListener('click', function() {
                const optionType = this.getAttribute('data-option');
                applyA11yOption(optionType);
            });
        });
        
        // Cargar preferencias guardadas
        const a11ySettings = localStorage.getItem('a11ySettings');
        if (a11ySettings) {
            const settings = JSON.parse(a11ySettings);
            
            for (const [key, value] of Object.entries(settings)) {
                if (value) {
                    applyA11yOption(key, false);
                }
            }
        }
    }
    
    function applyA11yOption(option, toggle = true) {
        // Obtener configuración actual
        let settings = {};
        const a11ySettings = localStorage.getItem('a11ySettings');
        
        if (a11ySettings) {
            settings = JSON.parse(a11ySettings);
        }
        
        // Aplicar según la opción
        switch (option) {
            case 'contrast':
                if (toggle) settings.contrast = !settings.contrast;
                document.body.classList.toggle('high-contrast', settings.contrast);
                break;
                
            case 'font-size':
                if (toggle) settings.fontSize = !settings.fontSize;
                document.body.classList.toggle('larger-text', settings.fontSize);
                break;
                
            case 'line-spacing':
                if (toggle) settings.lineSpacing = !settings.lineSpacing;
                document.body.classList.toggle('wider-spacing', settings.lineSpacing);
                break;
                
            case 'focus-mode':
                if (toggle) settings.focusMode = !settings.focusMode;
                document.body.classList.toggle('focus-mode', settings.focusMode);
                break;
        }
        
        // Guardar configuración
        localStorage.setItem('a11ySettings', JSON.stringify(settings));
        
        // Actualizar estado visual del botón
        document.querySelector(`.a11y-option[data-option="${option}"]`)
            .classList.toggle('active', settings[option]);
    }
    
    /**
     * 4. EXPORTAR A PDF
     */
    function initExportPDF() {
        // Evento para el botón de exportar en detalles
        document.addEventListener('click', function(e) {
            if (e.target.closest('.export-detail-btn')) {
                exportModal.classList.remove('hidden');
            }
        });
        
        // Evento para cerrar modal
        document.querySelectorAll('#export-modal .close-modal').forEach(btn => {
            btn.addEventListener('click', function() {
                exportModal.classList.add('hidden');
            });
        });
        
        // Generar PDF
        generatePDFBtn.addEventListener('click', function() {
            generarPDF();
        });
    }
    
    function generarPDF() {
        const title = document.getElementById('export-title').value || 'Simulación de Préstamo';
        const includeSummary = document.getElementById('export-summary').checked;
        const includeAmortization = document.getElementById('export-amortization').checked;
        const includeCharts = document.getElementById('export-charts').checked;
        
        // Crear elemento temporal para PDF
        const pdfContainer = document.createElement('div');
        pdfContainer.className = 'pdf-container';
        
        // Estilo especial para PDF
        pdfContainer.innerHTML = `
            <style>
                body { font-family: Arial, sans-serif; color: #333; }
                h1 { color: #6e8efb; text-align: center; margin-bottom: 20px; }
                h2 { color: #a777e3; margin-top: 30px; margin-bottom: 15px; }
                .summary { margin: 20px 0; }
                .summary-item { 
                    padding: 10px; 
                    display: flex; 
                    justify-content: space-between;
                    border-bottom: 1px solid #eee;
                }
                .summary-item .label { font-weight: bold; }
                .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                .table th { 
                    background-color: #f5f5f5; 
                    padding: 10px; 
                    text-align: left;
                    border-bottom: 2px solid #ddd;
                }
                .table td { 
                    padding: 8px; 
                    border-bottom: 1px solid #eee; 
                }
                .table tr:last-child td { font-weight: bold; }
                .footer { 
                    margin-top: 40px; 
                    text-align: center; 
                    font-size: 12px; 
                    color: #777; 
                }
                .chart-image { 
                    width: 100%; 
                    max-height: 300px; 
                    margin: 20px 0; 
                    object-fit: contain; 
                }
            </style>
            <h1>${title}</h1>
        `;
        
        // Obtener datos actuales
        const currentData = currentChartData;
        
        if (!currentData) {
            mostrarToast("No hay datos para exportar", "error");
            return;
        }
        
        // Añadir resumen
        if (includeSummary) {
            let summaryHtml = `
                <h2>Resumen del préstamo</h2>
                <div class="summary">
                    <div class="summary-item">
                        <span class="label">Monto del préstamo:</span>
                        <span class="value">${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(currentData.monto)}</span>
                    </div>
                    <div class="summary-item">
                        <span class="label">Plazo:</span>
                        <span class="value">${currentData.plazo} meses</span>
                    </div>
                    <div class="summary-item">
                        <span class="label">Tasa de interés mensual:</span>
                        <span class="value">${currentData.interesMensual}%</span>
                    </div>
                    <div class="summary-item">
                        <span class="label">Tasa de interés anual:</span>
                        <span class="value">${currentData.interesAnual}%</span>
                    </div>
                    <div class="summary-item">
                        <span class="label">Cuota mensual:</span>
                        <span class="value">${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(currentData.cuotaMensual)}</span>
                    </div>
                    <div class="summary-item">
                        <span class="label">Total a pagar:</span>
                        <span class="value">${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(currentData.totalPagar)}</span>
                    </div>
                    <div class="summary-item">
                        <span class="label">Total intereses:</span>
                        <span class="value">${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(currentData.totalIntereses)}</span>
                    </div>
                </div>
            `;
            
            pdfContainer.innerHTML += summaryHtml;
        }
        
        // Añadir tabla de amortización
        if (includeAmortization && currentData.amortizacion) {
            let tableHtml = `
                <h2>Tabla de Amortización</h2>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Cuota</th>
                            <th>Capital</th>
                            <th>Interés</th>
                            <th>Pago Mensual</th>
                            <th>Saldo Restante</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            currentData.amortizacion.forEach(row => {
                tableHtml += `
                    <tr>
                        <td>${row.numeroCuota}</td>
                        <td>${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(row.capital)}</td>
                        <td>${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(row.interes)}</td>
                        <td>${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(row.cuota)}</td>
                        <td>${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(row.saldo)}</td>
                    </tr>
                `;
            });
            
            tableHtml += `
                    </tbody>
                </table>
            `;
            
            pdfContainer.innerHTML += tableHtml;
        }
        
        // Añadir gráficos
        if (includeCharts && currentChart) {
            pdfContainer.innerHTML += `
                <h2>Gráfico de Análisis</h2>
                <img class="chart-image" src="${currentChart.toBase64Image()}" alt="Gráfico de análisis">
            `;
        }
        
        // Añadir pie de página
        pdfContainer.innerHTML += `
            <div class="footer">
                Documento generado el ${new Date().toLocaleString()} | Simulador de Préstamos
            </div>
        `;
        
        // Opciones para html2pdf
        const options = {
            margin: 10,
            filename: `${title.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        
        // Generar PDF
        html2pdf().from(pdfContainer).set(options).save()
            .then(() => {
                mostrarToast("PDF generado correctamente", "success");
                exportModal.classList.add('hidden');
            })
            .catch(error => {
                console.error("Error generando PDF:", error);
                mostrarToast("Error al generar el PDF", "error");
            });
    }
    
    // Función para mostrar toast (usamos la global o creamos una)
    function mostrarToast(mensaje, tipo) {
        if (typeof window.mostrarToast === 'function') {
            window.mostrarToast(mensaje, tipo);
        } else {
            // Versión simple si no existe la función global
            console.log(`Toast (${tipo}): ${mensaje}`);
            alert(mensaje);
        }
    }

    /**
     * 5. PANEL DE CONTACTO
     */
    function initContactPanel() {
        const contactPanel = document.getElementById('contact-panel');
        const contactToggle = document.getElementById('contact-toggle');
        
        if (contactToggle && contactPanel) {
            contactToggle.addEventListener('click', function() {
                contactPanel.classList.toggle('active');
            });
            
            // Cerrar panel si se hace clic fuera
            document.addEventListener('click', function(e) {
                if (!contactPanel.contains(e.target) && contactPanel.classList.contains('active')) {
                    contactPanel.classList.remove('active');
                }
            });
        }
    }
});
