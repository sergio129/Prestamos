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
    
    // Nuevo: Añadir opción para incluir marca de agua
    const watermarkContainer = document.createElement('div');
    watermarkContainer.className = 'form-group';
    watermarkContainer.innerHTML = `
        <label>
            <input type="checkbox" id="export-watermark" checked> Incluir marca de agua
        </label>
        <div id="watermark-options" class="watermark-options">
            <input type="text" id="watermark-text" placeholder="Texto para marca de agua" value="CONFIDENCIAL">
            <div class="watermark-color">
                <label for="watermark-color">Color:</label>
                <input type="color" id="watermark-color" value="#eeeeee">
            </div>
        </div>
    `;
    
    // Añadir después de las otras opciones
    const checkboxGroup = document.querySelector('#export-modal .checkbox-group');
    if (checkboxGroup) {
        checkboxGroup.appendChild(watermarkContainer);
    }
    
    // Nuevo: Añadir selector de plantilla
    const templateContainer = document.createElement('div');
    templateContainer.className = 'form-group';
    templateContainer.innerHTML = `
        <label for="export-template">Plantilla:</label>
        <select id="export-template">
            <option value="standard">Estándar</option>
            <option value="professional">Profesional</option>
            <option value="simple">Simple</option>
        </select>
    `;
    
    // Añadir antes de las opciones
    const firstFormGroup = document.querySelector('#export-modal .form-group');
    if (firstFormGroup && firstFormGroup.parentNode) {
        firstFormGroup.parentNode.insertBefore(templateContainer, firstFormGroup);
    }
    
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
        
        // Nuevas opciones
        const useWatermark = document.getElementById('export-watermark')?.checked !== false;
        const watermarkText = document.getElementById('watermark-text')?.value || 'CONFIDENCIAL';
        const watermarkColor = document.getElementById('watermark-color')?.value || '#eeeeee';
        const template = document.getElementById('export-template')?.value || 'standard';
        
        try {
            // Crear elemento contenedor para el PDF
            const contenedor = document.createElement('div');
            contenedor.style.width = '210mm';
            contenedor.style.padding = '15mm';
            contenedor.style.backgroundColor = 'white';
            contenedor.style.color = 'black';
            contenedor.style.fontFamily = 'Arial, sans-serif';
            
            // Aplicar estilos según la plantilla seleccionada
            if (template === 'professional') {
                contenedor.style.fontFamily = 'Helvetica, Arial, sans-serif';
                titulo.style.color = '#1a5276';
                titulo.style.borderBottom = '2px solid #3498db';
                titulo.style.paddingBottom = '10px';
            } else if (template === 'simple') {
                contenedor.style.fontFamily = 'Courier, monospace';
                contenedor.style.fontSize = '12px';
                titulo.style.borderBottom = '1px solid #999';
                titulo.style.fontWeight = 'normal';
            }
            
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
            
            // Agregar marca de agua si está seleccionada
            if (useWatermark) {
                const watermark = document.createElement('div');
                watermark.textContent = watermarkText;
                watermark.style.position = 'fixed';
                watermark.style.top = '50%';
                watermark.style.left = '50%';
                watermark.style.transform = 'translate(-50%, -50%) rotate(-45deg)';
                watermark.style.fontSize = '60px';
                watermark.style.fontWeight = 'bold';
                watermark.style.color = watermarkColor;
                watermark.style.opacity = '0.2';
                watermark.style.pointerEvents = 'none';
                watermark.style.zIndex = '1000';
                watermark.style.width = '100%';
                watermark.style.textAlign = 'center';
                
                contenedor.appendChild(watermark);
            }
            
            // Agregar pie de página
            const footer = document.createElement('div');
            footer.style.marginTop = '30px';
            footer.style.textAlign = 'center';
            footer.style.fontSize = '12px';
            footer.style.color = '#666';
            footer.textContent = `Documento generado el ${new Date().toLocaleString()} | Simulador de Préstamos`;
            contenedor.appendChild(footer);
            
            // Nuevo: Añadir código QR con enlace
            const qrContainer = document.createElement('div');
            qrContainer.style.textAlign = 'center';
            qrContainer.style.marginTop = '20px';
            
            const qrUrl = `https://chart.googleapis.com/chart?cht=qr&chs=150x150&chl=${encodeURIComponent(
                JSON.stringify({
                    tipo: 'simulacion_prestamo',
                    monto: datosPrestamo.monto,
                    plazo: datosPrestamo.plazo,
                    interes: datosPrestamo.interesMensual,
                    fecha: new Date().toISOString().split('T')[0]
                })
            )}`;
            
            const qrImg = document.createElement('img');
            qrImg.src = qrUrl;
            qrImg.alt = 'Código QR';
            qrImg.style.width = '100px';
            qrImg.style.height = '100px';
            
            const qrCaption = document.createElement('p');
            qrCaption.textContent = 'Escanea para más información';
            qrCaption.style.fontSize = '12px';
            qrCaption.style.color = '#666';
            qrCaption.style.marginTop = '5px';
            
            qrContainer.appendChild(qrImg);
            qrContainer.appendChild(qrCaption);
            
            contenedor.appendChild(qrContainer);
            
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
                document.body.removeChild(contenedor);
            })
            .catch(error => {
                console.error("Error al generar PDF:", error);
                mostrarMensaje(`Error: ${error.message}`, "error");
                if (document.body.contains(contenedor)) {
                    document.body.removeChild(contenedor);
                }
            });
        } catch (error) {
            console.error("Error en la generación de PDF:", error);
            mostrarMensaje(`Error: ${error.message}`, "error");
        }
    }
    
    // Nueva función: Previsualizar PDF
    function previsualizarPDF() {
        const datosPrestamo = obtenerDatosPrestamo();
        
        if (!datosPrestamo.monto || datosPrestamo.monto <= 0) {
            mostrarMensaje("No hay datos para exportar. Calcule un préstamo primero.", "error");
            return;
        }
        
        try {
            const contenedor = document.createElement('div');
            
            const previewModal = document.createElement('div');
            previewModal.className = 'modal preview-modal';
            previewModal.innerHTML = `
                <div class="modal-content preview-content">
                    <span class="close-modal">&times;</span>
                    <h2>Vista previa del PDF</h2>
                    <div class="preview-container"></div>
                    <div class="modal-actions">
                        <button class="btn-modal btn-download">Descargar PDF</button>
                        <button class="btn-modal btn-close">Cerrar</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(previewModal);
            previewModal.querySelector('.preview-container').appendChild(contenedor);
            
            previewModal.classList.remove('hidden');
            
            previewModal.querySelector('.close-modal').addEventListener('click', () => {
                previewModal.classList.add('hidden');
                setTimeout(() => previewModal.remove(), 300);
            });
            
            previewModal.querySelector('.btn-close').addEventListener('click', () => {
                previewModal.classList.add('hidden');
                setTimeout(() => previewModal.remove(), 300);
            });
            
            previewModal.querySelector('.btn-download').addEventListener('click', () => {
                generarPDF();
                previewModal.classList.add('hidden');
                setTimeout(() => previewModal.remove(), 300);
            });
        } catch (error) {
            console.error("Error en la previsualización:", error);
            mostrarMensaje(`Error: ${error.message}`, "error");
        }
    }
    
    // Añadir botón de previsualización
    const previewBtn = document.createElement('button');
    previewBtn.className = 'btn preview-btn';
    previewBtn.innerHTML = '<i class="fas fa-eye"></i> Previsualizar';
    previewBtn.style.marginTop = '10px';
    previewBtn.style.backgroundColor = '#3498db';
    previewBtn.style.color = 'white';
    previewBtn.style.border = 'none';
    previewBtn.style.padding = '10px 15px';
    previewBtn.style.borderRadius = '5px';
    previewBtn.style.cursor = 'pointer';
    
    if (generarPdfBtn && generarPdfBtn.parentNode) {
        generarPdfBtn.parentNode.insertBefore(previewBtn, generarPdfBtn.nextSibling);
    }
    
    previewBtn.addEventListener('click', function() {
        previsualizarPDF();
    });
    
    // Nueva función: Enviar PDF por correo
    function enviarPorCorreo() {
        const emailInput = document.createElement('div');
        emailInput.className = 'email-input';
        emailInput.innerHTML = `
            <div class="overlay"></div>
            <div class="email-form">
                <h3>Enviar PDF por correo</h3>
                <div class="form-group">
                    <label for="email-to">Destinatario:</label>
                    <input type="email" id="email-to" placeholder="correo@ejemplo.com" required>
                </div>
                <div class="form-group">
                    <label for="email-subject">Asunto:</label>
                    <input type="text" id="email-subject" value="Simulación de préstamo" required>
                </div>
                <div class="form-group">
                    <label for="email-message">Mensaje:</label>
                    <textarea id="email-message" rows="3">Adjunto encontrará la simulación de préstamo solicitada.</textarea>
                </div>
                <div class="email-actions">
                    <button type="button" class="btn-send">Enviar</button>
                    <button type="button" class="btn-cancel">Cancelar</button>
                </div>
            </div>
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            .email-input {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 9999;
            }
            .overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.7);
            }
            .email-form {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 20px;
                border-radius: 8px;
                width: 90%;
                max-width: 500px;
            }
            .email-form h3 {
                margin-top: 0;
                border-bottom: 1px solid #eee;
                padding-bottom: 10px;
            }
            .email-actions {
                display: flex;
                justify-content: flex-end;
                gap: 10px;
                margin-top: 20px;
            }
            .btn-send, .btn-cancel {
                padding: 8px 15px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }
            .btn-send {
                background: #27ae60;
                color: white;
            }
            .btn-cancel {
                background: #7f8c8d;
                color: white;
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(emailInput);
        
        emailInput.querySelector('.btn-cancel').addEventListener('click', function() {
            emailInput.remove();
            style.remove();
        });
        
        emailInput.querySelector('.overlay').addEventListener('click', function() {
            emailInput.remove();
            style.remove();
        });
        
        emailInput.querySelector('.btn-send').addEventListener('click', function() {
            const email = document.getElementById('email-to')?.value;
            if (!email || !email.includes('@')) {
                alert("Por favor ingrese un correo válido");
                return;
            }
            
            mostrarMensaje("Simulando envío de correo... (Esta es una simulación)", "info");
            setTimeout(() => {
                mostrarMensaje("Correo enviado exitosamente (simulación)", "success");
                emailInput.remove();
                style.remove();
            }, 1500);
        });
    }
    
    // Añadir botón para enviar por correo
    const emailBtn = document.createElement('button');
    emailBtn.className = 'btn email-btn';
    emailBtn.innerHTML = '<i class="fas fa-envelope"></i> Enviar por correo';
    emailBtn.style.marginTop = '10px';
    emailBtn.style.backgroundColor = '#27ae60';
    emailBtn.style.color = 'white';
    emailBtn.style.border = 'none';
    emailBtn.style.padding = '10px 15px';
    emailBtn.style.borderRadius = '5px';
    emailBtn.style.cursor = 'pointer';
    
    if (previewBtn && previewBtn.parentNode) {
        previewBtn.parentNode.insertBefore(emailBtn, previewBtn.nextSibling);
    }
    
    emailBtn.addEventListener('click', function() {
        enviarPorCorreo();
    });
    
    // Obtener datos del préstamo desde la interfaz
    function obtenerDatosPrestamo() {
        try {
            const monto = parseFloat(document.getElementById('monto')?.value || 0);
            const plazo = parseInt(document.getElementById('plazo')?.value || 0);
            const interesMensual = parseFloat(document.getElementById('interes-mensual')?.value || 0);
            const interesAnual = document.getElementById('interes-anual')?.textContent || "0%";
            
            const cuotaMensualEl = document.getElementById('cuota-mensual');
            const totalPagarEl = document.getElementById('total-pagar');
            const totalInteresesEl = document.getElementById('total-intereses');
            
            const cuotaMensual = extraerNumero(cuotaMensualEl?.textContent || "0");
            const totalPagar = extraerNumero(totalPagarEl?.textContent || "0");
            const totalIntereses = extraerNumero(totalInteresesEl?.textContent || "0");
            
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
    
    function extraerNumero(texto) {
        if (!texto) return 0;
        const limpio = texto.replace(/[$,.\s]/g, '');
        const numero = parseInt(limpio);
        return isNaN(numero) ? 0 : numero;
    }
    
    function generarTablaAmortizacion(monto, tasa, plazo, cuotaMensual) {
        const amortizacion = [];
        const tasaMensual = tasa / 100;
        let saldo = monto;
        
        for (let i = 1; i <= plazo; i++) {
            const interes = saldo * tasaMensual;
            const capital = cuotaMensual - interes;
            saldo -= capital;
            saldo = Math.max(0, saldo);
            
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
    
    function crearSeccionResumen(datos) {
        const section = document.createElement('div');
        section.style.marginBottom = '20px';
        
        const title = document.createElement('h2');
        title.textContent = 'Resumen del préstamo';
        title.style.color = '#444';
        title.style.marginBottom = '15px';
        title.style.paddingBottom = '8px';
        title.style.borderBottom = '1px solid #ddd';
        section.appendChild(title);
        
        const contenido = document.createElement('div');
        
        const formatoMoneda = new Intl.NumberFormat('es-CO', {
            style: 'currency', 
            currency: 'COP',
            minimumFractionDigits: 0
        });
        
        const elementos = [
            { label: 'Monto del préstamo:', value: formatoMoneda.format(datos.monto) },
            { label: 'Plazo:', value: `${datos.plazo} meses` },
            { label: 'Tasa de interés mensual:', value: `${datos.interesMensual}%` },
            { label: 'Tasa de interés anual:', value: datos.interesAnual },
            { label: 'Cuota mensual:', value: formatoMoneda.format(datos.cuotaMensual) },
            { label: 'Total a pagar:', value: formatoMoneda.format(datos.totalPagar) },
            { label: 'Total intereses:', value: formatoMoneda.format(datos.totalIntereses) }
        ];
        
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
    
    function crearSeccionAmortizacion(amortizacion) {
        const section = document.createElement('div');
        section.style.marginTop = '30px';
        
        const title = document.createElement('h2');
        title.textContent = 'Tabla de Amortización';
        title.style.color = '#444';
        title.style.marginBottom = '15px';
        title.style.paddingBottom = '8px';
        title.style.borderBottom = '1px solid #ddd';
        section.appendChild(title);
        
        const tabla = document.createElement('table');
        tabla.style.width = '100%';
        tabla.style.borderCollapse = 'collapse';
        tabla.style.marginBottom = '20px';
        
        const formatoMoneda = new Intl.NumberFormat('es-CO', {
            style: 'currency', 
            currency: 'COP',
            minimumFractionDigits: 0
        });
        
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
        
        const tbody = document.createElement('tbody');
        
        const filasAMostrar = amortizacion.length > 30 ? 30 : amortizacion.length;
        
        for (let i = 0; i < filasAMostrar; i++) {
            const fila = amortizacion[i];
            const tr = document.createElement('tr');
            
            if (i % 2 === 1) {
                tr.style.backgroundColor = '#f9f9f9';
            }
            
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
    
    function mostrarMensaje(mensaje, tipo) {
        if (typeof window.mostrarToast === 'function') {
            window.mostrarToast(mensaje, tipo);
            return;
        }
        
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
