/**
 * Script dedicado a la exportación de PDF
 * Versión optimizada para solucionar problemas de renderizado
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log("Inicializando módulo de PDF...");
    
    // Inicializar componentes
    const exportarBtns = document.querySelectorAll('.export-detail-btn');
    const generarPdfBtn = document.getElementById('generate-pdf');
    const exportModal = document.getElementById('export-modal');
    
    // Verificar elementos necesarios
    if (!generarPdfBtn || !exportModal) {
        console.error("Elementos para exportar PDF no encontrados");
        return;
    }
    
    // Flag para evitar generación duplicada
    let isGeneratingPDF = false;
    
    // Desactivar otros eventos que podrían estar intentando generar PDFs
    if (window.datosPDFGlobal !== undefined) {
        console.warn("Se detectaron múltiples manejadores de PDF. Desactivando anteriores...");
        window.datosPDFGlobal = null;
    }
    
    // Configurar evento para botones de exportar
    exportarBtns.forEach(btn => {
        // Remover eventos existentes para evitar duplicados
        const newBtn = btn.cloneNode(true);
        if (btn.parentNode) {
            btn.parentNode.replaceChild(newBtn, btn);
        }
        
        newBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log("Abriendo modal de exportación");
            exportModal.classList.remove('hidden');
        });
    });
    
    // Configurar evento para cerrar modal
    document.querySelectorAll('#export-modal .close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            exportModal.classList.add('hidden');
        });
    });
    
    // Configurar evento para generar PDF
    // Remover eventos existentes para evitar duplicados
    const newGenerarPdfBtn = generarPdfBtn.cloneNode(true);
    generarPdfBtn.parentNode.replaceChild(newGenerarPdfBtn, generarPdfBtn);
    
    newGenerarPdfBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Evitar múltiples generaciones simultáneas
        if (isGeneratingPDF) {
            console.warn("Ya se está generando un PDF. Espere por favor.");
            return;
        }
        
        isGeneratingPDF = true;
        generarPDF();
    });
    
    // Función principal para generar PDF
    function generarPDF() {
        console.log("Iniciando generación de PDF");
        
        // Variables para depuración
        window.pdfDebug = {
            startTime: new Date(),
            steps: []
        };
        
        function logStep(step) {
            console.log(`PDF - ${step}`);
            window.pdfDebug.steps.push({
                step: step,
                time: new Date()
            });
        }
        
        logStep("Obteniendo datos");
        
        // Obtener datos del formulario y resultados
        const datosPrestamo = obtenerDatosPrestamoDirecto();
        
        // Verificar si hay datos
        if (!datosPrestamo.monto || datosPrestamo.monto <= 0) {
            mostrarMensaje("No hay datos para exportar. Calcule un préstamo primero.", "error");
            isGeneratingPDF = false;
            return;
        }
        
        logStep("Datos obtenidos correctamente");
        console.log("Datos para PDF:", datosPrestamo);
        
        // Opciones del PDF
        const title = document.getElementById('export-title')?.value || 'Simulación de Préstamo';
        const includeSummary = document.getElementById('export-summary')?.checked !== false;
        const includeAmortization = document.getElementById('export-amortization')?.checked !== false;
        
        try {
            logStep("Creando elementos para PDF");
            
            // Crear elemento contenedor para el PDF
            const contenedor = document.createElement('div');
            contenedor.style.width = '210mm';
            contenedor.style.padding = '15mm';
            contenedor.style.backgroundColor = 'white';
            contenedor.style.color = 'black';
            contenedor.style.fontFamily = 'Arial, sans-serif';
            
            // Agregar título
            const titulo = document.createElement('h1');
            titulo.textContent = title;
            titulo.style.textAlign = 'center';
            titulo.style.color = '#333';
            titulo.style.marginBottom = '20px';
            contenedor.appendChild(titulo);
            
            logStep("Creando sección de resumen");
            
            // Agregar sección de resumen si está seleccionada
            if (includeSummary) {
                const resumenSection = crearSeccionResumen(datosPrestamo);
                contenedor.appendChild(resumenSection);
            }
            
            logStep("Creando tabla de amortización");
            
            // Agregar tabla de amortización si está seleccionada
            if (includeAmortization && datosPrestamo.amortizacion && datosPrestamo.amortizacion.length > 0) {
                const amortizacionSection = crearSeccionAmortizacion(datosPrestamo.amortizacion);
                contenedor.appendChild(amortizacionSection);
                
                logStep(`Tabla de amortización creada con ${datosPrestamo.amortizacion.length} filas`);
            } else {
                logStep("No se encontraron datos de amortización");
            }
            
            // Agregar pie de página
            const footer = document.createElement('div');
            footer.style.marginTop = '30px';
            footer.style.textAlign = 'center';
            footer.style.fontSize = '12px';
            footer.style.color = '#666';
            footer.textContent = `Documento generado el ${new Date().toLocaleString()} | Simulador de Préstamos`;
            contenedor.appendChild(footer);
            
            logStep("Añadiendo al DOM para renderizado");
            
            // Añadir temporalmente al DOM para mejor renderizado
            document.body.appendChild(contenedor);
            
            // Estilos específicos para renderizado
            contenedor.style.position = 'fixed';
            contenedor.style.top = '0';
            contenedor.style.left = '0';
            contenedor.style.zIndex = '-9999';
            contenedor.style.opacity = '0';
            
            // Añadir ID para depuración
            contenedor.id = 'pdf-container-temp';
            
            // Esperar a que el DOM se actualice
            setTimeout(() => {
                logStep("Comenzando generación con html2pdf");
                
                // Opciones para html2pdf
                const opt = {
                    margin: 10,
                    filename: `${title.replace(/\s+/g, '_')}.pdf`,
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { 
                        scale: 2,
                        letterRendering: true,
                        useCORS: true,
                        logging: true
                    },
                    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                };
                
                // Generar PDF
                html2pdf()
                    .from(contenedor)
                    .set(opt)
                    .save()
                    .then(() => {
                        logStep("PDF generado exitosamente");
                        mostrarMensaje("PDF generado correctamente", "success");
                        exportModal.classList.add('hidden');
                        
                        // Eliminar contenedor temporal
                        if (document.body.contains(contenedor)) {
                            document.body.removeChild(contenedor);
                        }
                        
                        isGeneratingPDF = false;
                    })
                    .catch(error => {
                        console.error("Error al generar PDF:", error);
                        logStep(`Error en html2pdf: ${error.message}`);
                        mostrarMensaje(`Error al generar PDF: ${error.message}`, "error");
                        
                        // Eliminar contenedor temporal
                        if (document.body.contains(contenedor)) {
                            document.body.removeChild(contenedor);
                        }
                        
                        isGeneratingPDF = false;
                    });
            }, 500); // Dar tiempo para que el DOM se actualice
            
        } catch (error) {
            console.error("Error en la generación de PDF:", error);
            logStep(`Error general: ${error.message}`);
            mostrarMensaje(`Error: ${error.message}`, "error");
            isGeneratingPDF = false;
        }
    }
    
    // Obtener datos directamente del formulario y resultados visibles
    function obtenerDatosPrestamoDirecto() {
        try {
            // Datos básicos
            const monto = parseFloat(document.getElementById('monto')?.value || 0);
            const plazo = parseInt(document.getElementById('plazo')?.value || 0);
            const interesMensual = parseFloat(document.getElementById('interes-mensual')?.value || 0);
            const interesAnual = document.getElementById('interes-anual')?.textContent || "0%";
            
            // Resultados
            const cuotaMensualEl = document.getElementById('cuota-mensual');
            const totalPagarEl = document.getElementById('total-pagar');
            const totalInteresesEl = document.getElementById('total-intereses');
            
            const cuotaMensual = cuotaMensualEl ? extraerNumero(cuotaMensualEl.textContent) : 0;
            const totalPagar = totalPagarEl ? extraerNumero(totalPagarEl.textContent) : 0;
            const totalIntereses = totalInteresesEl ? extraerNumero(totalInteresesEl.textContent) : 0;
            
            console.log("Datos básicos capturados:", {
                monto, plazo, interesMensual, interesAnual,
                cuotaMensual, totalPagar, totalIntereses
            });
            
            // Capturar tabla de amortización
            let amortizacion = [];
            
            // Primero intentar obtener de la tabla visible
            const filas = document.querySelectorAll('#amortization-table tbody tr');
            
            if (filas && filas.length > 0) {
                console.log(`Encontradas ${filas.length} filas en la tabla de amortización`);
                
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
            } else {
                console.log("No se encontraron filas visibles. Generando tabla...");
                
                // Si no hay tabla visible pero tenemos los datos básicos, generarla
                if (monto > 0 && cuotaMensual > 0 && plazo > 0 && interesMensual > 0) {
                    amortizacion = generarTablaAmortizacionCompleta(monto, interesMensual/100, plazo);
                    console.log(`Tabla generada con ${amortizacion.length} filas`);
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
                amortizacion,
                fecha: new Date().toLocaleDateString()
            };
        } catch (error) {
            console.error("Error al obtener datos directamente:", error);
            return { monto: 0, plazo: 0, amortizacion: [] };
        }
    }
    
    // Extraer número desde texto con formato de moneda
    function extraerNumero(texto) {
        if (!texto) return 0;
        
        // Eliminar todo lo que no sea dígito, punto o coma
        const numeroLimpio = texto.replace(/[^0-9.,]/g, '')
            .replace(/\./g, '') // quitar puntos de miles
            .replace(',', '.'); // convertir coma decimal a punto
        
        // Ahora debería ser un número válido
        const valor = parseFloat(numeroLimpio);
        
        if (isNaN(valor)) {
            console.warn(`No se pudo convertir "${texto}" a número. Valor limpio: "${numeroLimpio}"`);
            return 0;
        }
        
        return valor;
    }
    
    // Generar tabla de amortización completa
    function generarTablaAmortizacionCompleta(montoInicial, tasaMensual, plazo) {
        console.log("Generando tabla de amortización para:", {montoInicial, tasaMensual, plazo});
        
        // Calcular cuota mensual: P × ( i / (1 - (1 + i)^-n) )
        const cuotaMensual = montoInicial * (tasaMensual / (1 - Math.pow(1 + tasaMensual, -plazo)));
        
        console.log("Cuota mensual calculada:", cuotaMensual);
        
        const amortizacion = [];
        let saldo = montoInicial;
        
        for (let i = 1; i <= plazo; i++) {
            const interes = saldo * tasaMensual;
            const capital = cuotaMensual - interes;
            saldo = Math.max(0, saldo - capital); // Evitar saldo negativo
            
            amortizacion.push({
                cuota: i,
                capital: capital,
                interes: interes,
                pagoMensual: cuotaMensual,
                saldoRestante: i === plazo ? 0 : saldo // Asegurar que el último pago deje saldo cero
            });
        }
        
        return amortizacion;
    }
    
    // Crear sección de resumen
    function crearSeccionResumen(datos) {
        const section = document.createElement('div');
        section.style.marginBottom = '20px';
        
        // Título
        const title = document.createElement('h2');
        title.textContent = 'Resumen del préstamo';
        title.style.color = '#444';
        title.style.marginBottom = '15px';
        title.style.paddingBottom = '8px';
        title.style.borderBottom = '1px solid #ddd';
        section.appendChild(title);
        
        // Contenido
        const contenido = document.createElement('div');
        
        // Formato moneda
        const formatoMoneda = new Intl.NumberFormat('es-CO', {
            style: 'currency', 
            currency: 'COP',
            minimumFractionDigits: 0
        });
        
        // Datos
        const elementos = [
            { label: 'Monto del préstamo:', value: formatoMoneda.format(datos.monto) },
            { label: 'Plazo:', value: `${datos.plazo} meses` },
            { label: 'Tasa de interés mensual:', value: `${datos.interesMensual}%` },
            { label: 'Tasa de interés anual:', value: datos.interesAnual },
            { label: 'Cuota mensual:', value: formatoMoneda.format(datos.cuotaMensual) },
            { label: 'Total a pagar:', value: formatoMoneda.format(datos.totalPagar) },
            { label: 'Total intereses:', value: formatoMoneda.format(datos.totalIntereses) }
        ];
        
        // Crear lista de elementos
        elementos.forEach(elem => {
            const item = document.createElement('div');
            item.style.display = 'flex';
            item.style.justifyContent = 'space-between';
            item.style.padding = '10px 0';
            item.style.borderBottom = '1px solid #eee';
            
            const label = document.createElement('span');
            label.textContent = elem.label;
            label.style.fontWeight = 'bold';
            
            const value = document.createElement('span');
            value.textContent = elem.value;
            
            item.appendChild(label);
            item.appendChild(value);
            contenido.appendChild(item);
        });
        
        section.appendChild(contenido);
        return section;
    }
    
    // Crear sección de amortización
    function crearSeccionAmortizacion(amortizacion) {
        if (!amortizacion || amortizacion.length === 0) {
            console.error("No hay datos de amortización para mostrar");
            const errorSection = document.createElement('div');
            errorSection.textContent = "No hay datos de amortización disponibles";
            errorSection.style.color = "red";
            errorSection.style.padding = "10px";
            errorSection.style.border = "1px solid red";
            return errorSection;
        }
        
        const section = document.createElement('div');
        section.style.marginTop = '30px';
        
        // Título
        const title = document.createElement('h2');
        title.textContent = 'Tabla de Amortización';
        title.style.color = '#444';
        title.style.marginBottom = '15px';
        title.style.paddingBottom = '8px';
        title.style.borderBottom = '1px solid #ddd';
        section.appendChild(title);
        
        // Tabla
        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.marginBottom = '20px';
        table.border = "1"; // Asegurar que se vean los bordes
        
        // Formato moneda
        const formatoMoneda = new Intl.NumberFormat('es-CO', {
            style: 'currency', 
            currency: 'COP',
            minimumFractionDigits: 0
        });
        
        // Cabecera
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        const headers = ['Cuota', 'Capital', 'Interés', 'Pago Mensual', 'Saldo Restante'];
        headers.forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            th.style.backgroundColor = '#f5f5f5';
            th.style.padding = '10px';
            th.style.textAlign = 'left';
            th.style.borderBottom = '2px solid #ddd';
            headerRow.appendChild(th);
        });
        
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        // Cuerpo de la tabla
        const tbody = document.createElement('tbody');
        
        // Limitar a 30 filas para evitar problemas de rendimiento
        const filasAMostrar = amortizacion.length > 30 ? 30 : amortizacion.length;
        
        for (let i = 0; i < filasAMostrar; i++) {
            const fila = amortizacion[i];
            const tr = document.createElement('tr');
            
            if (i % 2 === 1) {
                tr.style.backgroundColor = '#f9f9f9';
            }
            
            // Propiedades de la fila
            const props = [
                fila.cuota, 
                formatoMoneda.format(fila.capital), 
                formatoMoneda.format(fila.interes), 
                formatoMoneda.format(fila.pagoMensual), 
                formatoMoneda.format(fila.saldoRestante)
            ];
            
            props.forEach(value => {
                const td = document.createElement('td');
                td.textContent = value;
                td.style.padding = '8px';
                td.style.borderBottom = '1px solid #eee';
                td.style.borderRight = '1px solid #eee';
                tr.appendChild(td);
            });
            
            tbody.appendChild(tr);
        }
        
        // Si hay demasiadas filas, mostrar un mensaje
        if (amortizacion.length > 30) {
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            td.setAttribute('colspan', '5');
            td.textContent = `... y ${amortizacion.length - 30} filas más`;
            td.style.textAlign = 'center';
            td.style.padding = '10px';
            td.style.backgroundColor = '#f0f0f0';
            tr.appendChild(td);
            tbody.appendChild(tr);
        }
        
        table.appendChild(tbody);
        section.appendChild(table);
        
        return section;
    }
    
    // Mostrar mensaje de notificación
    function mostrarMensaje(mensaje, tipo) {
        console.log(`PDF - Mensaje (${tipo}): ${mensaje}`);
        
        // Usar la función global si existe
        if (typeof window.mostrarToast === 'function') {
            window.mostrarToast(mensaje, tipo);
            return;
        }
        
        // Respaldo: crear notificación propia
        const toast = document.createElement('div');
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.right = '20px';
        toast.style.backgroundColor = tipo === 'error' ? '#e74c3c' : 
                                      tipo === 'success' ? '#2ecc71' : '#3498db';
        toast.style.color = 'white';
        toast.style.padding = '12px 20px';
        toast.style.borderRadius = '4px';
        toast.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        toast.style.zIndex = '9999';
        toast.textContent = mensaje;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 3000);
    }
});
