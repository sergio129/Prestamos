/**
 * Script dedicado a la exportación de PDF
 * Versión optimizada para solucionar problemas de renderizado
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes
    const exportarBtns = document.querySelectorAll('.export-detail-btn');
    const generarPdfBtn = document.getElementById('generate-pdf');
    const exportModal = document.getElementById('export-modal');
    
    // Verificar elementos necesarios
    if (!generarPdfBtn || !exportModal) {
        console.error("Elementos para exportar PDF no encontrados");
        return;
    }
    
    // Configurar evento para botones de exportar
    exportarBtns.forEach(btn => {
        btn.addEventListener('click', function() {
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
    generarPdfBtn.addEventListener('click', function() {
        generarPDF();
    });
    
    // Función principal para generar PDF
    function generarPDF() {
        console.log("Iniciando generación de PDF");
        
        // Obtener datos del formulario y resultados
        const datosPrestamo = obtenerDatosPrestamo();
        
        // Verificar si hay datos
        if (!datosPrestamo.monto || datosPrestamo.monto <= 0) {
            mostrarMensaje("No hay datos para exportar. Calcule un préstamo primero.", "error");
            return;
        }
        
        // Opciones del PDF
        const title = document.getElementById('export-title')?.value || 'Simulación de Préstamo';
        const includeSummary = document.getElementById('export-summary')?.checked !== false;
        const includeAmortization = document.getElementById('export-amortization')?.checked !== false;
        
        try {
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
            
            // Agregar sección de resumen si está seleccionada
            if (includeSummary) {
                const resumenSection = crearSeccionResumen(datosPrestamo);
                contenedor.appendChild(resumenSection);
            }
            
            // Agregar tabla de amortización si está seleccionada
            if (includeAmortization && datosPrestamo.amortizacion && datosPrestamo.amortizacion.length > 0) {
                const amortizacionSection = crearSeccionAmortizacion(datosPrestamo.amortizacion);
                contenedor.appendChild(amortizacionSection);
            }
            
            // Agregar pie de página
            const footer = document.createElement('div');
            footer.style.marginTop = '30px';
            footer.style.textAlign = 'center';
            footer.style.fontSize = '12px';
            footer.style.color = '#666';
            footer.textContent = `Documento generado el ${new Date().toLocaleString()} | Simulador de Préstamos`;
            contenedor.appendChild(footer);
            
            // Añadir temporalmente al DOM
            document.body.appendChild(contenedor);
            contenedor.style.position = 'fixed';
            contenedor.style.top = '-9999px';
            contenedor.style.left = '-9999px';
            
            // Opciones para html2pdf
            const opt = {
                margin: 10,
                filename: `${title.replace(/\s+/g, '_')}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 2,
                    letterRendering: true,
                    useCORS: true
                },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };
            
            // Generar PDF
            html2pdf().from(contenedor).set(opt).save()
            .then(() => {
                mostrarMensaje("PDF generado correctamente", "success");
                exportModal.classList.add('hidden');
                // Eliminar contenedor temporal
                document.body.removeChild(contenedor);
            })
            .catch(error => {
                console.error("Error al generar PDF:", error);
                mostrarMensaje(`Error: ${error.message}`, "error");
                // Eliminar contenedor temporal
                if (document.body.contains(contenedor)) {
                    document.body.removeChild(contenedor);
                }
            });
        } catch (error) {
            console.error("Error en la generación de PDF:", error);
            mostrarMensaje(`Error: ${error.message}`, "error");
        }
    }
    
    // Obtener datos del préstamo desde la interfaz
    function obtenerDatosPrestamo() {
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
            
            const cuotaMensual = extraerNumero(cuotaMensualEl?.textContent || "0");
            const totalPagar = extraerNumero(totalPagarEl?.textContent || "0");
            const totalIntereses = extraerNumero(totalInteresesEl?.textContent || "0");
            
            // Tabla de amortización
            let amortizacion = [];
            const filas = document.querySelectorAll('#amortization-table tbody tr');
            
            if (filas.length > 0) {
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
            } else if (monto > 0 && cuotaMensual > 0 && plazo > 0) {
                // Generar tabla de amortización si no está visible
                amortizacion = generarTablaAmortizacion(monto, interesMensual, plazo, cuotaMensual);
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
            console.error("Error al obtener datos:", error);
            return { monto: 0, plazo: 0, amortizacion: [] };
        }
    }
    
    // Extraer número desde texto (para valores monetarios)
    function extraerNumero(texto) {
        if (!texto) return 0;
        // Eliminar símbolos y espacios
        const limpio = texto.replace(/[$,.\s]/g, '');
        const numero = parseInt(limpio);
        return isNaN(numero) ? 0 : numero;
    }
    
    // Generar tabla de amortización
    function generarTablaAmortizacion(monto, tasa, plazo, cuotaMensual) {
        const amortizacion = [];
        const tasaMensual = tasa / 100;
        let saldo = monto;
        
        for (let i = 1; i <= plazo; i++) {
            const interes = saldo * tasaMensual;
            const capital = cuotaMensual - interes;
            saldo -= capital;
            saldo = Math.max(0, saldo); // Evitar saldo negativo por redondeo
            
            amortizacion.push({
                cuota: i,
                capital: capital,
                interes: interes,
                pagoMensual: cuotaMensual,
                saldoRestante: saldo
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
        const tabla = document.createElement('table');
        tabla.style.width = '100%';
        tabla.style.borderCollapse = 'collapse';
        tabla.style.marginBottom = '20px';
        
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
        tabla.appendChild(thead);
        
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
        
        tabla.appendChild(tbody);
        section.appendChild(tabla);
        
        return section;
    }
    
    // Mostrar mensaje de notificación
    function mostrarMensaje(mensaje, tipo) {
        // Usar la función global si existe
        if (typeof window.mostrarToast === 'function') {
            window.mostrarToast(mensaje, tipo);
            return;
        }
        
        // Respaldo: crear notificación propia
        console.log(`${tipo}: ${mensaje}`);
        
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
