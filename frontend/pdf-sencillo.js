/**
 * Script simplificado para generación de PDF
 * Versión que garantiza la generación correcta sin problemas
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log("Inicializando generador de PDF simple");
    
    // Referencias a elementos
    const exportarBtns = document.querySelectorAll('.export-detail-btn');
    const generarPdfBtn = document.getElementById('generate-pdf');
    const exportModal = document.getElementById('export-modal');
    
    // Bandera para prevenir múltiples generaciones
    let isGeneratingPDF = false;
    
    // Configurar eventos
    if (exportarBtns.length > 0) {
        exportarBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                console.log("Abriendo modal de exportación");
                exportModal.classList.remove('hidden');
            });
        });
    }
    
    // Cerrar modal
    document.querySelectorAll('#export-modal .close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            exportModal.classList.add('hidden');
        });
    });
    
    // Generar PDF
    if (generarPdfBtn) {
        generarPdfBtn.addEventListener('click', function() {
            if (isGeneratingPDF) {
                return;
            }
            
            isGeneratingPDF = true;
            generarPDFSimple();
        });
    }
    
    // Función simplificada para generar PDF
    function generarPDFSimple() {
        // Obtener datos
        const datos = capturarDatosFormulario();
        
        if (!datos.monto || datos.monto <= 0) {
            mostrarToast("No hay datos para exportar. Calcule un préstamo primero.", "error");
            isGeneratingPDF = false;
            return;
        }
        
        console.log("Generando PDF con datos:", datos);
        
        // Crear documento PDF directamente sin usar elementos HTML intermedios
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Título
        doc.setFontSize(22);
        doc.setTextColor(33, 33, 33);
        doc.text("Simulación de Préstamo", 105, 20, { align: "center" });
        
        // Fecha
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(`Generado el ${new Date().toLocaleDateString()}`, 105, 30, { align: "center" });
        
        // Resumen
        doc.setFontSize(16);
        doc.setTextColor(33, 33, 33);
        doc.text("Resumen del préstamo", 20, 45);
        
        doc.setFontSize(11);
        doc.setTextColor(60, 60, 60);
        
        // Datos principales
        const lineas = [
            [`Monto del préstamo: $${formatNumber(datos.monto)}`],
            [`Plazo: ${datos.plazo} meses`],
            [`Tasa de interés mensual: ${datos.interesMensual}%`],
            [`Tasa de interés anual: ${datos.interesAnual}`],
            [`Cuota mensual: $${formatNumber(datos.cuotaMensual)}`],
            [`Total a pagar: $${formatNumber(datos.totalPagar)}`],
            [`Total intereses: $${formatNumber(datos.totalIntereses)}`]
        ];
        
        // Imprimir líneas
        doc.setDrawColor(220, 220, 220);
        let y = 55;
        lineas.forEach(linea => {
            doc.text(linea[0], 25, y);
            y += 10;
        });
        
        // Tabla de amortización
        if (datos.amortizacion && datos.amortizacion.length > 0) {
            doc.addPage();
            
            doc.setFontSize(16);
            doc.setTextColor(33, 33, 33);
            doc.text("Tabla de Amortización", 105, 20, { align: "center" });
            
            // Encabezados
            const headers = ["Cuota", "Capital", "Interés", "Pago Mensual", "Saldo"];
            const columnWidths = [20, 35, 35, 35, 35];
            
            // Posición inicial
            y = 40;
            
            // Dibujar encabezados
            doc.setFillColor(240, 240, 240);
            doc.rect(20, y - 10, 160, 10, 'F');
            
            doc.setFontSize(10);
            doc.setTextColor(50, 50, 50);
            
            let x = 25;
            headers.forEach((header, i) => {
                doc.text(header, x, y - 3);
                x += columnWidths[i];
            });
            
            // Dibujar línea horizontal
            doc.setDrawColor(200, 200, 200);
            doc.line(20, y, 180, y);
            
            // Limitar a 25 filas por página
            const maxRows = 25;
            const totalRows = Math.min(datos.amortizacion.length, 100); // Limitar a 100 filas como máximo
            
            for (let i = 0; i < totalRows; i++) {
                // Nueva página si es necesario
                if (i > 0 && i % maxRows === 0) {
                    doc.addPage();
                    y = 20;
                    doc.setFontSize(12);
                    doc.text("Tabla de Amortización (continuación)", 105, y, { align: "center" });
                    y += 20;
                    
                    doc.setFillColor(240, 240, 240);
                    doc.rect(20, y - 10, 160, 10, 'F');
                    
                    x = 25;
                    doc.setFontSize(10);
                    headers.forEach((header, j) => {
                        doc.text(header, x, y - 3);
                        x += columnWidths[j];
                    });
                    
                    doc.line(20, y, 180, y);
                }
                
                const row = datos.amortizacion[i];
                
                // Colorear filas alternas
                if (i % 2 === 1) {
                    doc.setFillColor(245, 245, 245);
                    doc.rect(20, y, 160, 8, 'F');
                }
                
                // Datos de la fila
                x = 25;
                doc.text(row.cuota.toString(), x, y + 5);
                x += columnWidths[0];
                
                doc.text("$" + formatNumber(row.capital), x, y + 5);
                x += columnWidths[1];
                
                doc.text("$" + formatNumber(row.interes), x, y + 5);
                x += columnWidths[2];
                
                doc.text("$" + formatNumber(row.pagoMensual), x, y + 5);
                x += columnWidths[3];
                
                doc.text("$" + formatNumber(row.saldoRestante), x, y + 5);
                
                // Siguiente fila
                y += 8;
            }
            
            // Si hay más filas, mostrar mensaje
            if (datos.amortizacion.length > 100) {
                y += 10;
                doc.setFontSize(10);
                doc.setTextColor(100, 100, 100);
                doc.text(`... y ${datos.amortizacion.length - 100} filas más`, 105, y, { align: "center" });
            }
        }
        
        // Pie de página
        doc.setFontSize(10);
        doc.setTextColor(150, 150, 150);
        const pageCount = doc.getNumberOfPages();
        
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.text(`Página ${i} de ${pageCount}`, 105, 290, { align: "center" });
            doc.text("Simulador de Préstamos", 20, 290);
            doc.text(`Generado el ${new Date().toLocaleString()}`, 180, 290, { align: "right" });
        }
        
        // Guardar
        try {
            doc.save("Simulacion_Prestamo.pdf");
            mostrarToast("PDF generado correctamente", "success");
            exportModal.classList.add('hidden');
        } catch (error) {
            console.error("Error al guardar PDF:", error);
            mostrarToast("Error al generar el PDF", "error");
        }
        
        isGeneratingPDF = false;
    }
    
    // Función para capturar datos del formulario
    function capturarDatosFormulario() {
        // Datos básicos
        const monto = parseFloat(document.getElementById('monto')?.value || 0);
        const plazo = parseInt(document.getElementById('plazo')?.value || 0);
        const interesMensual = parseFloat(document.getElementById('interes-mensual')?.value || 0);
        const interesAnual = document.getElementById('interes-anual')?.textContent || "0%";
        
        // Resultados
        const cuotaMensualEl = document.getElementById('cuota-mensual');
        const totalPagarEl = document.getElementById('total-pagar');
        const totalInteresesEl = document.getElementById('total-intereses');
        
        const cuotaMensual = extraerNumero(cuotaMensualEl?.textContent || "0");
        const totalPagar = extraerNumero(totalPagarEl?.textContent || "0");
        const totalIntereses = extraerNumero(totalInteresesEl?.textContent || "0");
        
        // Tabla de amortización
        let amortizacion = [];
        const tabla = document.getElementById('amortization-table');
        
        if (tabla) {
            const filas = tabla.querySelectorAll('tbody tr');
            
            filas.forEach((fila, idx) => {
                const celdas = fila.querySelectorAll('td');
                if (celdas.length >= 5) {
                    amortizacion.push({
                        cuota: idx + 1,
                        capital: extraerNumero(celdas[1]?.textContent || "0"),
                        interes: extraerNumero(celdas[2]?.textContent || "0"),
                        pagoMensual: extraerNumero(celdas[3]?.textContent || "0"),
                        saldoRestante: extraerNumero(celdas[4]?.textContent || "0")
                    });
                }
            });
        }
        
        // Si no hay tabla visible, generar una
        if (amortizacion.length === 0 && monto > 0 && cuotaMensual > 0) {
            const tasaMensual = interesMensual / 100;
            let saldo = monto;
            
            for (let i = 1; i <= plazo; i++) {
                const interes = saldo * tasaMensual;
                const capital = cuotaMensual - interes;
                saldo = Math.max(0, saldo - capital);
                
                amortizacion.push({
                    cuota: i,
                    capital: capital,
                    interes: interes,
                    pagoMensual: cuotaMensual,
                    saldoRestante: saldo
                });
            }
        }
        
        return {
            monto,
            plazo,
            interesMensual,
            interesAnual,
            cuotaMensual,
            totalPagar,
            totalIntereses,
            amortizacion
        };
    }
    
    // Función para extraer número desde texto con formato de moneda
    function extraerNumero(texto) {
        if (!texto) return 0;
        
        // Eliminar todo lo que no sea dígito, punto o coma
        const numeroLimpio = texto.replace(/[^0-9.,]/g, '')
            .replace(/\./g, '')  // quitar puntos de miles
            .replace(',', '.');  // convertir coma decimal a punto
            
        return parseFloat(numeroLimpio) || 0;
    }
    
    // Formatear número para mostrar en el PDF
    function formatNumber(num) {
        return new Intl.NumberFormat('es-CO', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(num);
    }
    
    // Mostrar mensajes
    function mostrarToast(mensaje, tipo) {
        if (typeof window.mostrarToast === 'function') {
            window.mostrarToast(mensaje, tipo);
            return;
        }
        
        console.log(`Toast (${tipo}): ${mensaje}`);
        alert(mensaje);
    }
});
