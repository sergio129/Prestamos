/**
 * Script para las mejoras del módulo de préstamos - Versión corregida
 * Incluye: exportación PDF, simulaciones recientes, comparador, gráficos y accesibilidad
 */

// Variable global para almacenar los datos actuales de simulación
let datosPDFGlobal = null;

document.addEventListener('DOMContentLoaded', function() {
    console.log("Inicializando mejoras del sistema...");
    
    // Referencias a elementos
    const recentSimulationsContainer = document.getElementById('recent-simulations');
    const recentList = document.getElementById('recent-list');
    const comparisonContainer = document.getElementById('comparison-container');
    const chartContainer = document.getElementById('chart-container');
    const exportModal = document.getElementById('export-modal');
    const generatePDFBtn = document.getElementById('generate-pdf');
    
    // Inicializar sistema de exportación PDF de forma segura
    try {
        if (generatePDFBtn) {
            initExportPDF();
            console.log("Sistema de exportación PDF inicializado");
        } else {
            console.warn("Botón para generar PDF no encontrado");
        }
    } catch (error) {
        console.warn("No se pudo inicializar el sistema de exportación PDF:", error);
    }
    
    // Capturar datos cuando se calcule una simulación - de forma segura
    try {
        const loanForm = document.getElementById('loan-form');
        if (loanForm) {
            loanForm.addEventListener('submit', function(e) {
                setTimeout(hookSimulacionData, 500);
            });
            console.log("Evento de captura de datos configurado");
        } else {
            console.warn("Formulario de préstamo no encontrado");
        }
    } catch (error) {
        console.warn("Error al configurar captura de datos:", error);
    }
    
    // Asignar eventos a botones de exportación de forma segura
    try {
        document.querySelectorAll('.export-detail-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                console.log("Botón exportar PDF presionado");
                if (exportModal) {
                    exportModal.classList.remove('hidden');
                } else {
                    console.error("Modal de exportación no encontrado");
                    mostrarMensajeToast("Error al abrir ventana de exportación", "error");
                }
            });
        });
        console.log("Botones de exportación configurados");
    } catch (error) {
        console.warn("Error al configurar botones de exportación:", error);
    }
    
    // Función para capturar datos de simulación actual
    function hookSimulacionData() {
        console.log("Capturando datos de simulación para PDF");
        
        try {
            // Capturar datos básicos de la simulación
            const monto = parseFloat(document.getElementById('monto')?.value || 0);
            const plazo = parseInt(document.getElementById('plazo')?.value || 0);
            const interesMensual = parseFloat(document.getElementById('interes-mensual')?.value || 0);
            const interesAnual = document.getElementById('interes-anual')?.textContent || "0%";
            
            // Capturar resultados
            const cuotaMensualStr = document.getElementById('cuota-mensual')?.textContent || "$0";
            const totalPagarStr = document.getElementById('total-pagar')?.textContent || "$0";
            const totalInteresesStr = document.getElementById('total-intereses')?.textContent || "$0";
            
            // Convertir valores de texto a números
            const cuotaMensual = extraerNumeroDesdeMoneda(cuotaMensualStr);
            const totalPagar = extraerNumeroDesdeMoneda(totalPagarStr);
            const totalIntereses = extraerNumeroDesdeMoneda(totalInteresesStr);
            
            // Capturar tabla de amortización
            const tablaAmortizacion = [];
            const filas = document.querySelectorAll('#amortization-table tbody tr');
            
            filas.forEach((fila, index) => {
                const celdas = fila.querySelectorAll('td');
                if (celdas.length >= 5) {
                    tablaAmortizacion.push({
                        numeroCuota: index + 1,
                        capital: extraerNumeroDesdeMoneda(celdas[1]?.textContent || "0"),
                        interes: extraerNumeroDesdeMoneda(celdas[2]?.textContent || "0"),
                        cuota: extraerNumeroDesdeMoneda(celdas[3]?.textContent || "0"),
                        saldo: extraerNumeroDesdeMoneda(celdas[4]?.textContent || "0")
                    });
                }
            });
            
            // Si no hay datos en la tabla de amortización pero hay un monto y cuota mensual,
            // podemos generar una tabla básica
            if (tablaAmortizacion.length === 0 && monto > 0 && cuotaMensual > 0 && plazo > 0) {
                console.log("Generando tabla de amortización básica");
                let saldoRestante = monto;
                
                for (let i = 1; i <= plazo; i++) {
                    const interesCuota = saldoRestante * (interesMensual / 100);
                    const capitalCuota = cuotaMensual - interesCuota;
                    saldoRestante -= capitalCuota;
                    
                    tablaAmortizacion.push({
                        numeroCuota: i,
                        capital: capitalCuota,
                        interes: interesCuota,
                        cuota: cuotaMensual,
                        saldo: i === plazo ? 0 : saldoRestante
                    });
                }
            }
            
            // Guardar datos capturados
            datosPDFGlobal = {
                monto: monto,
                plazo: plazo,
                interesMensual: interesMensual,
                interesAnual: interesAnual,
                cuotaMensual: cuotaMensual,
                totalPagar: totalPagar,
                totalIntereses: totalIntereses,
                amortizacion: tablaAmortizacion,
                fecha: new Date().toLocaleDateString(),
                nombre: document.getElementById('nombre')?.value || "Simulación de préstamo",
                identificacion: document.getElementById('identificacion')?.value || "Usuario actual"
            };
            
            console.log("Datos capturados para PDF:", datosPDFGlobal);
        } catch (error) {
            console.error("Error al capturar datos para PDF:", error);
        }
    }
    
    // Función para extraer número desde un texto con formato de moneda
    function extraerNumeroDesdeMoneda(texto) {
        if (!texto) return 0;
        
        // Eliminar símbolos de moneda, puntos de miles y espacios
        const textoLimpio = texto.replace(/[$,.€\s]/g, '');
        // Reemplazar coma decimal por punto si existe
        const numeroTexto = textoLimpio.replace(/,/g, '.');
        
        return parseFloat(numeroTexto) || 0;
    }
    
    // Inicializar sistema de exportación a PDF
    function initExportPDF() {
        if (generatePDFBtn) {
            generatePDFBtn.addEventListener('click', generarPDF);
        }
        
        // Cerrar modal de exportación al hacer clic en X
        document.querySelectorAll('#export-modal .close-modal').forEach(btn => {
            btn.addEventListener('click', function() {
                const exportModal = document.getElementById('export-modal');
                if (exportModal) {
                    exportModal.classList.add('hidden');
                }
            });
        });
    }
    
    // Función para generar PDF
    function generarPDF() {
        console.log("Iniciando generación de PDF...");
        
        // Si no hay datos, intentar capturarlos ahora
        if (!datosPDFGlobal || !datosPDFGlobal.monto) {
            hookSimulacionData();
            
            if (!datosPDFGlobal || !datosPDFGlobal.monto) {
                mostrarMensajeToast("No hay datos para exportar. Calcule un préstamo primero.", "error");
                return;
            }
        }
        
        const title = document.getElementById('export-title')?.value || 'Simulación de Préstamo';
        const includeSummary = document.getElementById('export-summary')?.checked !== false;
        const includeAmortization = document.getElementById('export-amortization')?.checked !== false;
        const includeCharts = document.getElementById('export-charts')?.checked !== false;
        
        // Crear elemento para PDF
        const pdfContainer = document.createElement('div');
        pdfContainer.className = 'pdf-container';
        
        // Estilos para el PDF
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
            </style>
            <h1>${title}</h1>
        `;
        
        // Formatear moneda para el PDF
        const formatMoney = (value) => {
            return new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0
            }).format(value);
        };
        
        // Añadir resumen si está seleccionado
        if (includeSummary) {
            pdfContainer.innerHTML += `
                <h2>Resumen del préstamo</h2>
                <div class="summary">
                    <div class="summary-item">
                        <span class="label">Monto del préstamo:</span>
                        <span class="value">${formatMoney(datosPDFGlobal.monto)}</span>
                    </div>
                    <div class="summary-item">
                        <span class="label">Plazo:</span>
                        <span class="value">${datosPDFGlobal.plazo} meses</span>
                    </div>
                    <div class="summary-item">
                        <span class="label">Tasa de interés mensual:</span>
                        <span class="value">${datosPDFGlobal.interesMensual}%</span>
                    </div>
                    <div class="summary-item">
                        <span class="label">Tasa de interés anual:</span>
                        <span class="value">${datosPDFGlobal.interesAnual}</span>
                    </div>
                    <div class="summary-item">
                        <span class="label">Cuota mensual:</span>
                        <span class="value">${formatMoney(datosPDFGlobal.cuotaMensual)}</span>
                    </div>
                    <div class="summary-item">
                        <span class="label">Total a pagar:</span>
                        <span class="value">${formatMoney(datosPDFGlobal.totalPagar)}</span>
                    </div>
                    <div class="summary-item">
                        <span class="label">Total intereses:</span>
                        <span class="value">${formatMoney(datosPDFGlobal.totalIntereses)}</span>
                    </div>
                </div>
            `;
        }
        
        // Añadir tabla de amortización si está seleccionada
        if (includeAmortization && datosPDFGlobal.amortizacion && datosPDFGlobal.amortizacion.length > 0) {
            pdfContainer.innerHTML += `
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
            
            datosPDFGlobal.amortizacion.forEach(row => {
                pdfContainer.innerHTML += `
                    <tr>
                        <td>${row.numeroCuota}</td>
                        <td>${formatMoney(row.capital)}</td>
                        <td>${formatMoney(row.interes)}</td>
                        <td>${formatMoney(row.cuota)}</td>
                        <td>${formatMoney(row.saldo)}</td>
                    </tr>
                `;
            });
            
            pdfContainer.innerHTML += `
                    </tbody>
                </table>
            `;
        }
        
        // Pie de página
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
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        
        // Generar PDF con manejo de errores mejorado
        try {
            // Verificar que html2pdf existe
            if (typeof html2pdf !== 'function') {
                throw new Error("Biblioteca html2pdf no encontrada");
            }
            
            html2pdf().from(pdfContainer).set(options).save()
                .then(() => {
                    mostrarMensajeToast("PDF generado correctamente", "success");
                    const exportModal = document.getElementById('export-modal');
                    if (exportModal) {
                        exportModal.classList.add('hidden');
                    }
                })
                .catch(err => {
                    console.error("Error al generar PDF:", err);
                    mostrarMensajeToast("Error al generar el PDF: " + err.message, "error");
                });
        } catch (error) {
            console.error("Error al iniciar generación de PDF:", error);
            mostrarMensajeToast("Error al generar el PDF: " + error.message, "error");
        }
    }
    
    // Función para mostrar mensajes toast
    function mostrarMensajeToast(mensaje, tipo) {
        if (typeof window.mostrarToast === 'function') {
            window.mostrarToast(mensaje, tipo);
        } else {
            console.log(`Toast (${tipo}): ${mensaje}`);
            
            // Toast básico como respaldo
            const toast = document.createElement('div');
            toast.style.position = 'fixed';
            toast.style.bottom = '20px';
            toast.style.right = '20px';
            toast.style.backgroundColor = tipo === 'error' ? '#e74c3c' : 
                                        tipo === 'success' ? '#2ecc71' : '#3498db';
            toast.style.color = 'white';
            toast.style.padding = '12px 20px';
            toast.style.borderRadius = '4px';
            toast.style.zIndex = '9999';
            toast.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
            toast.textContent = mensaje;
            
            document.body.appendChild(toast);
            
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 3000);
        }
    }
});
