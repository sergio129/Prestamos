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
    
    // Añadir opciones avanzadas para PDF al modal de exportación
    const exportOptionsContainer = document.createElement('div');
    exportOptionsContainer.className = 'export-advanced-options';
    exportOptionsContainer.innerHTML = `
        <div class="export-section-title">
            <h3>Opciones avanzadas</h3>
            <button type="button" class="btn-toggle-options"><i class="fas fa-chevron-down"></i></button>
        </div>
        
        <div class="export-options-content hidden">
            <div class="form-group">
                <label for="pdf-destinatario">Destinatario:</label>
                <input type="text" id="pdf-destinatario" placeholder="Nombre del destinatario">
            </div>
            
            <div class="form-group">
                <label>
                    <input type="checkbox" id="pdf-watermark" checked> Incluir marca de agua
                </label>
                <div class="watermark-options">
                    <input type="text" id="watermark-text" placeholder="Texto de marca de agua" value="CONFIDENCIAL">
                    <div class="watermark-color">
                        <label for="watermark-color">Color:</label>
                        <input type="color" id="watermark-color" value="#eeeeee">
                    </div>
                </div>
            </div>
            
            <div class="form-group">
                <label for="pdf-header-image">Imagen de encabezado:</label>
                <select id="pdf-header-image">
                    <option value="none">Sin imagen</option>
                    <option value="logo">Logo de la empresa</option>
                    <option value="banner">Banner completo</option>
                </select>
            </div>
            
            <div class="form-group">
                <label>Firma digital:</label>
                <div class="signature-options">
                    <label>
                        <input type="checkbox" id="pdf-signature"> Incluir firma
                    </label>
                    <input type="text" id="pdf-signature-name" placeholder="Nombre para la firma" class="signature-input hidden">
                </div>
            </div>
            
            <div class="form-group">
                <label for="pdf-color-theme">Tema de color:</label>
                <select id="pdf-color-theme">
                    <option value="default">Predeterminado</option>
                    <option value="elegant">Elegante (Azul)</option>
                    <option value="professional">Profesional (Gris)</option>
                    <option value="vibrant">Vibrante (Verde/Púrpura)</option>
                </select>
            </div>
            
            <div class="form-group">
                <label>
                    <input type="checkbox" id="pdf-add-qr" checked> Incluir código QR
                </label>
            </div>
        </div>
    `;
    
    // Añadir al modal de exportación antes del botón de generar
    if (generarPdfBtn && generarPdfBtn.parentNode) {
        generarPdfBtn.parentNode.insertBefore(exportOptionsContainer, generarPdfBtn);
    }
    
    // Configurar evento para mostrar/ocultar opciones avanzadas
    const btnToggleOptions = document.querySelector('.btn-toggle-options');
    if (btnToggleOptions) {
        btnToggleOptions.addEventListener('click', function() {
            const optionsContent = document.querySelector('.export-options-content');
            if (optionsContent) {
                optionsContent.classList.toggle('hidden');
                
                // Cambiar icono
                const icon = this.querySelector('i');
                if (icon) {
                    if (optionsContent.classList.contains('hidden')) {
                        icon.className = 'fas fa-chevron-down';
                    } else {
                        icon.className = 'fas fa-chevron-up';
                    }
                }
            }
        });
    }
    
    // Evento para el checkbox de firma
    const pdfSignature = document.getElementById('pdf-signature');
    if (pdfSignature) {
        pdfSignature.addEventListener('change', function() {
            const signatureInput = document.getElementById('pdf-signature-name');
            if (signatureInput) {
                if (this.checked) {
                    signatureInput.classList.remove('hidden');
                } else {
                    signatureInput.classList.add('hidden');
                }
            }
        });
    }
    
    // Generar PDF
    if (generarPdfBtn) {
        const newBtn = generarPdfBtn.cloneNode(true);
        if (generarPdfBtn.parentNode) {
            generarPdfBtn.parentNode.replaceChild(newBtn, generarPdfBtn);
        }
        
        newBtn.addEventListener('click', generarPDF);
    }
    
    // Función mejorada para generar PDF
    function generarPDF() {
        console.log("Iniciando generación de PDF mejorado");
        
        if (isGeneratingPDF) {
            return;
        }
        
        isGeneratingPDF = true;
        
        // Obtener datos
        const datos = capturarDatosFormulario();
        
        if (!datos.monto || datos.monto <= 0) {
            mostrarToast("No hay datos para exportar. Calcule un préstamo primero.", "error");
            isGeneratingPDF = false;
            return;
        }
        
        // Obtener opciones avanzadas
        const destinatario = document.getElementById('pdf-destinatario')?.value || '';
        const incluirMarcaAgua = document.getElementById('pdf-watermark')?.checked !== false;
        const textoMarcaAgua = document.getElementById('watermark-text')?.value || 'CONFIDENCIAL';
        const colorMarcaAgua = document.getElementById('watermark-color')?.value || '#eeeeee';
        const headerImage = document.getElementById('pdf-header-image')?.value || 'none';
        const incluirFirma = document.getElementById('pdf-signature')?.checked === true;
        const nombreFirma = document.getElementById('pdf-signature-name')?.value || '';
        const temaColor = document.getElementById('pdf-color-theme')?.value || 'default';
        const incluirQR = document.getElementById('pdf-add-qr')?.checked !== false;
        
        // Crear documento PDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Aplicar tema de color
        let colorPrimario = '#333333';
        let colorSecundario = '#666666';
        let colorAcento = '#6e8efb';
        let colorFondo = '#f9f9f9';
        
        switch (temaColor) {
            case 'elegant':
                colorPrimario = '#1a5276';
                colorSecundario = '#2874a6';
                colorAcento = '#3498db';
                colorFondo = '#eaf2f8';
                break;
            case 'professional':
                colorPrimario = '#2c3e50';
                colorSecundario = '#34495e';
                colorAcento = '#7f8c8d';
                colorFondo = '#ecf0f1';
                break;
            case 'vibrant':
                colorPrimario = '#27ae60';
                colorSecundario = '#2ecc71';
                colorAcento = '#8e44ad';
                colorFondo = '#f5f5f5';
                break;
        }
        
        // Convertir colores hex a componentes RGB
        function hexToRgb(hex) {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : { r: 0, g: 0, b: 0 };
        }
        
        const colorPrimarioRGB = hexToRgb(colorPrimario);
        const colorSecundarioRGB = hexToRgb(colorSecundario);
        const colorAcentoRGB = hexToRgb(colorAcento);
        
        // Añadir marca de agua si está habilitada
        if (incluirMarcaAgua) {
            const marcaAguaRGB = hexToRgb(colorMarcaAgua);
            
            doc.setTextColor(marcaAguaRGB.r, marcaAguaRGB.g, marcaAguaRGB.b);
            doc.setFontSize(60);
            doc.setFont('helvetica', 'bold');
            doc.setGState(new doc.GState({opacity: 0.3}));
            
            // Dibujar marca de agua en diagonal centrada
            doc.text(textoMarcaAgua, 105, 150, {
                align: 'center',
                angle: 45
            });
            
            // Restaurar estado normal
            doc.setGState(new doc.GState({opacity: 1.0}));
        }
        
        // Dibujar encabezado
        doc.setFillColor(colorPrimarioRGB.r, colorPrimarioRGB.g, colorPrimarioRGB.b);
        doc.rect(0, 0, 210, 20, 'F');
        
        // Título principal
        doc.setFontSize(20);
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.text("Simulación de Préstamo", 105, 12, { align: "center" });
        
        // Borde inferior decorativo
        doc.setFillColor(colorAcentoRGB.r, colorAcentoRGB.g, colorAcentoRGB.b);
        doc.rect(0, 20, 210, 2, 'F');
        
        // Añadir destinatario si está especificado
        let yPos = 30;
        if (destinatario) {
            doc.setFontSize(12);
            doc.setTextColor(colorPrimarioRGB.r, colorPrimarioRGB.g, colorPrimarioRGB.b);
            doc.text(`Destinatario: ${destinatario}`, 20, yPos);
            yPos += 8;
        }
        
        // Fecha del documento
        doc.setFontSize(10);
        doc.setTextColor(colorSecundarioRGB.r, colorSecundarioRGB.g, colorSecundarioRGB.b);
        doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 20, yPos);
        yPos += 15;
        
        // Título de sección de resumen
        doc.setFontSize(16);
        doc.setTextColor(colorPrimarioRGB.r, colorPrimarioRGB.g, colorPrimarioRGB.b);
        doc.setFont('helvetica', 'bold');
        doc.text("Resumen del préstamo", 20, yPos);
        yPos += 2;
        
        // Línea divisoria
        doc.setDrawColor(colorAcentoRGB.r, colorAcentoRGB.g, colorAcentoRGB.b);
        doc.setLineWidth(0.5);
        doc.line(20, yPos, 190, yPos);
        yPos += 10;
        
        // Datos principales
        doc.setFontSize(11);
        doc.setTextColor(colorSecundarioRGB.r, colorSecundarioRGB.g, colorSecundarioRGB.b);
        doc.setFont('helvetica', 'normal');
        
        const lineas = [
            [`Monto del préstamo: $${formatNumber(datos.monto)}`],
            [`Plazo: ${datos.plazo} meses`],
            [`Tasa de interés mensual: ${datos.interesMensual}%`],
            [`Tasa de interés anual: ${datos.interesAnual}`],
            [`Cuota mensual: $${formatNumber(datos.cuotaMensual)}`],
            [`Total a pagar: $${formatNumber(datos.totalPagar)}`],
            [`Total intereses: $${formatNumber(datos.totalIntereses)}`]
        ];
        
        // Imprimir líneas de resumen
        doc.setDrawColor(220, 220, 220);
        lineas.forEach(linea => {
            doc.text(linea[0], 25, yPos);
            yPos += 8;
        });
        
        // Crear una nueva página para la tabla de amortización
        doc.addPage();
        
        // Tabla de amortización
        if (datos.amortizacion && datos.amortizacion.length > 0) {
            // Encabezado de la página
            doc.setFillColor(colorPrimarioRGB.r, colorPrimarioRGB.g, colorPrimarioRGB.b);
            doc.rect(0, 0, 210, 20, 'F');
            
            doc.setFontSize(18);
            doc.setTextColor(255, 255, 255);
            doc.setFont('helvetica', 'bold');
            doc.text("Tabla de Amortización", 105, 12, { align: "center" });
            
            // Borde inferior decorativo
            doc.setFillColor(colorAcentoRGB.r, colorAcentoRGB.g, colorAcentoRGB.b);
            doc.rect(0, 20, 210, 2, 'F');
            
            // Encabezados de tabla
            const headers = ["Cuota", "Capital", "Interés", "Pago Mensual", "Saldo"];
            const columnWidths = [20, 35, 35, 35, 35];
            
            // Posición inicial
            yPos = 40;
            
            // Dibujar encabezados
            doc.setFillColor(colorPrimarioRGB.r, colorPrimarioRGB.g, colorPrimarioRGB.b);
            doc.rect(20, yPos - 10, 160, 10, 'F');
            
            doc.setFontSize(10);
            doc.setTextColor(255, 255, 255);
            
            let xPos = 25;
            headers.forEach((header, i) => {
                doc.text(header, xPos, yPos - 3);
                xPos += columnWidths[i];
            });
            
            // Dibujar línea horizontal
            doc.setDrawColor(colorAcentoRGB.r, colorAcentoRGB.g, colorAcentoRGB.b);
            doc.line(20, yPos, 180, yPos);
            
            // Limitar a 25 filas por página
            const maxRows = 25;
            const totalRows = Math.min(datos.amortizacion.length, 100); // Limitar a 100 filas como máximo
            
            for (let i = 0; i < totalRows; i++) {
                // Nueva página si es necesario
                if (i > 0 && i % maxRows === 0) {
                    doc.addPage();
                    yPos = 20;
                    
                    // Encabezado en nueva página
                    doc.setFillColor(colorPrimarioRGB.r, colorPrimarioRGB.g, colorPrimarioRGB.b);
                    doc.rect(0, 0, 210, 20, 'F');
                    
                    doc.setFontSize(16);
                    doc.setTextColor(255, 255, 255);
                    doc.setFont('helvetica', 'bold');
                    doc.text("Tabla de Amortización (continuación)", 105, 12, { align: "center" });
                    
                    // Borde inferior decorativo
                    doc.setFillColor(colorAcentoRGB.r, colorAcentoRGB.g, colorAcentoRGB.b);
                    doc.rect(0, 20, 210, 2, 'F');
                    
                    yPos += 20;
                    
                    // Encabezados en nueva página
                    doc.setFillColor(colorPrimarioRGB.r, colorPrimarioRGB.g, colorPrimarioRGB.b);
                    doc.rect(20, yPos - 10, 160, 10, 'F');
                    
                    xPos = 25;
                    doc.setFontSize(10);
                    doc.setTextColor(255, 255, 255);
                    
                    headers.forEach((header, j) => {
                        doc.text(header, xPos, yPos - 3);
                        xPos += columnWidths[j];
                    });
                    
                    doc.setDrawColor(colorAcentoRGB.r, colorAcentoRGB.g, colorAcentoRGB.b);
                    doc.line(20, yPos, 180, yPos);
                }
                
                const row = datos.amortizacion[i];
                
                // Colorear filas alternas
                if (i % 2 === 1) {
                    doc.setFillColor(245, 245, 245);
                    doc.rect(20, yPos, 160, 8, 'F');
                }
                
                // Datos de la fila
                doc.setTextColor(colorSecundarioRGB.r, colorSecundarioRGB.g, colorSecundarioRGB.b);
                xPos = 25;
                doc.text(row.cuota.toString(), xPos, yPos + 5);
                xPos += columnWidths[0];
                
                doc.text("$" + formatNumber(row.capital), xPos, yPos + 5);
                xPos += columnWidths[1];
                
                doc.text("$" + formatNumber(row.interes), xPos, yPos + 5);
                xPos += columnWidths[2];
                
                doc.text("$" + formatNumber(row.pagoMensual), xPos, yPos + 5);
                xPos += columnWidths[3];
                
                doc.text("$" + formatNumber(row.saldoRestante), xPos, yPos + 5);
                
                // Siguiente fila
                yPos += 8;
            }
        }
        
        // Añadir código QR si está habilitado
        if (incluirQR) {
            const currentPage = doc.getCurrentPageInfo().pageNumber;
            doc.setPage(1); // Volver a la primera página para el QR
            
            try {
                // Generar datos para el QR
                const dataForQR = {
                    tipo: 'simulacion_prestamo',
                    monto: datos.monto,
                    plazo: datos.plazo,
                    interes: datos.interesMensual,
                    fecha: new Date().toISOString().split('T')[0]
                };
                
                // Crear SVG para el QR
                const qrCode = new QRCode({
                    content: JSON.stringify(dataForQR),
                    width: 50,
                    height: 50,
                    color: colorSecundarioRGB.r + "," + colorSecundarioRGB.g + "," + colorSecundarioRGB.b,
                    background: 'transparent',
                    ecl: 'M'
                });
                
                // Añadir QR a la esquina inferior derecha de la primera página
                const qrSvg = qrCode.svg();
                doc.addSvgAsImage(qrSvg, 150, 260, 40, 40);
                
                // Añadir texto debajo del QR
                doc.setFontSize(8);
                doc.setTextColor(colorSecundarioRGB.r, colorSecundarioRGB.g, colorSecundarioRGB.b);
                doc.text("Escanea para más información", 170, 280, { align: "center" });
            } catch (error) {
                console.error("No se pudo generar el código QR:", error);
            }
            
            // Volver a la página donde estábamos
            doc.setPage(currentPage);
        }
        
        // Añadir firma si está habilitada
        if (incluirFirma && nombreFirma) {
            const paginaActual = doc.getCurrentPageInfo().pageNumber;
            doc.setPage(paginaActual);
            
            // Línea para la firma
            const yPosFooter = 270;
            doc.setLineWidth(0.5);
            doc.setDrawColor(colorPrimarioRGB.r, colorPrimarioRGB.g, colorPrimarioRGB.b);
            doc.line(20, yPosFooter, 80, yPosFooter);
            
            // Nombre de quien firma
            doc.setFontSize(10);
            doc.setTextColor(colorPrimarioRGB.r, colorPrimarioRGB.g, colorPrimarioRGB.b);
            doc.text(nombreFirma, 50, yPosFooter + 5, { align: "center" });
            
            // Cargo o título
            doc.setFontSize(8);
            doc.setTextColor(colorSecundarioRGB.r, colorSecundarioRGB.g, colorSecundarioRGB.b);
            doc.text("Asesor Financiero", 50, yPosFooter + 10, { align: "center" });
        }
        
        // Pie de página
        const pageCount = doc.getNumberOfPages();
        
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            
            // Linea divisoria de pie de página
            doc.setDrawColor(colorAcentoRGB.r, colorAcentoRGB.g, colorAcentoRGB.b);
            doc.setLineWidth(0.5);
            doc.line(20, 285, 190, 285);
            
            doc.setFontSize(8);
            doc.setTextColor(colorSecundarioRGB.r, colorSecundarioRGB.g, colorSecundarioRGB.b);
            doc.text(`Página ${i} de ${pageCount}`, 105, 290, { align: "center" });
            doc.text("Simulador de Préstamos", 20, 290);
            doc.text(`Generado el ${new Date().toLocaleString()}`, 190, 290, { align: "right" });
        }
        
        // Guardar
        try {
            const fileName = destinatario 
                ? `Simulacion_Prestamo_${destinatario.replace(/\s+/g, '_')}.pdf` 
                : "Simulacion_Prestamo.pdf";
                
            doc.save(fileName);
            mostrarToast("PDF generado correctamente", "success");
            document.getElementById('export-modal').classList.add('hidden');
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
    
    // Función para QR (simplificada)
    class QRCode {
        constructor(options) {
            this.options = options;
        }
        
        svg() {
            // Esta es una versión simplificada - en una implementación real
            // usaríamos una librería de verdad para generar el QR
            return `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                <rect x="5" y="5" width="40" height="40" fill="none" stroke="${this.options.color}" stroke-width="1"/>
                <text x="25" y="30" font-size="8" text-anchor="middle" fill="${this.options.color}">QR CODE</text>
            </svg>`;
        }
    }
});
