/**
 * Asesor Financiero Virtual
 * Utiliza análisis de datos para ofrecer recomendaciones personalizadas
 */

(function() {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Inicializando asesor financiero virtual...');
        
        // Crear botón para el asesor virtual
        const asesorBtn = document.createElement('button');
        asesorBtn.type = 'button';
        asesorBtn.className = 'btn btn-asesor';
        asesorBtn.innerHTML = '<i class="fas fa-robot"></i> Asesor Financiero Virtual';
        asesorBtn.style.marginTop = '15px';
        
        // Añadir botón después de los botones existentes
        const capacidadBtn = document.querySelector('.btn-capacidad');
        if (capacidadBtn && capacidadBtn.parentNode) {
            capacidadBtn.parentNode.appendChild(asesorBtn);
        } else {
            const loanForm = document.getElementById('loan-form');
            if (loanForm && loanForm.parentNode) {
                loanForm.parentNode.appendChild(asesorBtn);
            }
        }
        
        // Crear modal del asesor
        const asesorModal = document.createElement('div');
        asesorModal.id = 'asesor-modal';
        asesorModal.className = 'modal hidden';
        
        asesorModal.innerHTML = `
            <div class="modal-content asesor-content">
                <span class="close-modal">&times;</span>
                <div class="asesor-header">
                    <div class="asesor-avatar">
                        <i class="fas fa-robot"></i>
                    </div>
                    <h2>Asesor Financiero Virtual</h2>
                </div>
                
                <div class="asesor-conversation">
                    <div class="asesor-message">
                        <p>¡Hola! Soy tu asesor financiero virtual. Para brindarte la mejor recomendación, 
                        necesito conocer un poco más sobre tu situación financiera y tus objetivos.</p>
                    </div>
                    
                    <div class="user-options">
                        <h3>¿Cuál es tu objetivo principal?</h3>
                        <div class="option-buttons">
                            <button class="option-btn" data-goal="vivienda">Comprar Vivienda</button>
                            <button class="option-btn" data-goal="vehiculo">Adquirir Vehículo</button>
                            <button class="option-btn" data-goal="educacion">Financiar Educación</button>
                            <button class="option-btn" data-goal="negocio">Iniciar Negocio</button>
                            <button class="option-btn" data-goal="consolidar">Consolidar Deudas</button>
                            <button class="option-btn" data-goal="otro">Otro Propósito</button>
                        </div>
                    </div>
                </div>
                
                <div class="asesor-questionnaire hidden" id="questionnaire">
                    <h3>Cuéntame más sobre tu situación</h3>
                    
                    <div class="question-group">
                        <label for="asesor-edad">Edad:</label>
                        <input type="number" id="asesor-edad" min="18" max="100" placeholder="Edad">
                    </div>
                    
                    <div class="question-group">
                        <label for="asesor-ingresos">Ingresos mensuales:</label>
                        <div class="input-icon">
                            <span class="currency-symbol">$</span>
                            <input type="number" id="asesor-ingresos" placeholder="Ingresos mensuales">
                        </div>
                    </div>
                    
                    <div class="question-group">
                        <label for="asesor-gastos">Gastos fijos mensuales:</label>
                        <div class="input-icon">
                            <span class="currency-symbol">$</span>
                            <input type="number" id="asesor-gastos" placeholder="Gastos mensuales">
                        </div>
                    </div>
                    
                    <div class="question-group">
                        <label for="asesor-deudas">Deudas actuales (pago mensual):</label>
                        <div class="input-icon">
                            <span class="currency-symbol">$</span>
                            <input type="number" id="asesor-deudas" placeholder="Pagos mensuales de deudas">
                        </div>
                    </div>
                    
                    <div class="question-group">
                        <label for="asesor-ahorro">Ahorro disponible:</label>
                        <div class="input-icon">
                            <span class="currency-symbol">$</span>
                            <input type="number" id="asesor-ahorro" placeholder="Ahorro disponible">
                        </div>
                    </div>
                    
                    <div class="question-group">
                        <label for="asesor-plazo">¿En cuánto tiempo planeas lograr tu objetivo?</label>
                        <select id="asesor-plazo">
                            <option value="12">1 año o menos</option>
                            <option value="36" selected>1-3 años</option>
                            <option value="60">3-5 años</option>
                            <option value="120">5-10 años</option>
                            <option value="240">Más de 10 años</option>
                        </select>
                    </div>
                    
                    <div class="question-group">
                        <label for="asesor-prioridad">¿Qué priorizas más?</label>
                        <select id="asesor-prioridad">
                            <option value="cuota">Cuota mensual baja</option>
                            <option value="interes">Pagar menos intereses</option>
                            <option value="rapido">Pagar rápidamente</option>
                            <option value="flexible">Flexibilidad en pagos</option>
                        </select>
                    </div>
                    
                    <button id="analizar-situacion" class="btn btn-full">Analizar mi situación</button>
                </div>
                
                <div class="asesor-results hidden" id="asesor-results">
                    <div class="results-header">
                        <h3>Tu Plan Financiero Personalizado</h3>
                        <div class="plan-score">
                            <div class="score-label">Viabilidad</div>
                            <div class="score-value" id="viabilidad-score">85%</div>
                        </div>
                    </div>
                    
                    <div class="results-summary">
                        <p id="resumen-situacion">Basado en tu información, hemos analizado tu situación financiera...</p>
                    </div>
                    
                    <div class="strategy-container">
                        <h4>Estrategia recomendada</h4>
                        <div class="strategy-cards" id="strategy-cards">
                            <!-- Generado dinámicamente -->
                        </div>
                    </div>
                    
                    <div class="roadmap-container">
                        <h4>Hoja de ruta financiera</h4>
                        <div class="timeline" id="timeline">
                            <!-- Generado dinámicamente -->
                        </div>
                    </div>
                    
                    <div class="next-steps">
                        <h4>Próximos pasos</h4>
                        <ul id="next-steps-list">
                            <!-- Generado dinámicamente -->
                        </ul>
                    </div>
                    
                    <div class="warning-container" id="warning-container">
                        <!-- Advertencias si aplican -->
                    </div>
                    
                    <div class="action-buttons">
                        <button id="aplicar-recomendacion" class="btn btn-save">Aplicar recomendación</button>
                        <button id="exportar-plan" class="btn btn-secondary">Exportar plan</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(asesorModal);
        
        // Configurar eventos
        asesorBtn.addEventListener('click', function() {
            asesorModal.classList.remove('hidden');
        });
        
        // Cerrar modal
        asesorModal.querySelector('.close-modal').addEventListener('click', function() {
            asesorModal.classList.add('hidden');
        });
        
        // Opciones de objetivo
        let objetivoSeleccionado = '';
        
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                objetivoSeleccionado = this.getAttribute('data-goal');
                document.querySelector('.user-options').classList.add('hidden');
                document.getElementById('questionnaire').classList.remove('hidden');
                
                // Personalizar cuestionario según objetivo
                personalizarCuestionario(objetivoSeleccionado);
            });
        });
        
        // Analizar situación
        document.getElementById('analizar-situacion').addEventListener('click', function() {
            // Recopilar datos
            const datos = {
                objetivo: objetivoSeleccionado,
                edad: parseInt(document.getElementById('asesor-edad').value) || 30,
                ingresos: parseFloat(document.getElementById('asesor-ingresos').value) || 0,
                gastos: parseFloat(document.getElementById('asesor-gastos').value) || 0,
                deudas: parseFloat(document.getElementById('asesor-deudas').value) || 0,
                ahorro: parseFloat(document.getElementById('asesor-ahorro').value) || 0,
                plazo: parseInt(document.getElementById('asesor-plazo').value) || 36,
                prioridad: document.getElementById('asesor-prioridad').value
            };
            
            // Validar datos
            if (datos.ingresos <= 0) {
                mostrarMensaje("Por favor ingresa tus ingresos mensuales", "error");
                return;
            }
            
            // Realizar análisis
            const recomendacion = analizarSituacionFinanciera(datos);
            
            // Mostrar resultados
            mostrarRecomendacion(recomendacion);
            
            // Mostrar sección de resultados
            document.getElementById('questionnaire').classList.add('hidden');
            document.getElementById('asesor-results').classList.remove('hidden');
        });
        
        // Aplicar recomendación
        document.getElementById('aplicar-recomendacion').addEventListener('click', function() {
            const recomendacionActual = document.getElementById('asesor-results').dataset.recomendacion;
            if (recomendacionActual) {
                const datos = JSON.parse(recomendacionActual);
                
                // Aplicar al simulador principal
                if (datos.monto) document.getElementById('monto').value = datos.monto;
                if (datos.plazo) document.getElementById('plazo').value = datos.plazo;
                if (datos.tasa) document.getElementById('interes-mensual').value = datos.tasa;
                
                // Cerrar modal
                asesorModal.classList.add('hidden');
                
                // Calcular préstamo
                if (typeof calcularPrestamo === 'function') {
                    calcularPrestamo();
                    mostrarMensaje("Recomendación aplicada al simulador", "success");
                } else {
                    mostrarMensaje("La recomendación se ha aplicado, pero debe calcular manualmente", "info");
                }
            }
        });
        
        // Exportar plan
        document.getElementById('exportar-plan').addEventListener('click', function() {
            generarPDFPlan();
        });
        
        /**
         * Personaliza el cuestionario según el objetivo seleccionado
         * @param {string} objetivo - Objetivo financiero seleccionado
         */
        function personalizarCuestionario(objetivo) {
            // Ajustar títulos y preguntas según objetivo
            const titulos = {
                'vivienda': 'Planificación para compra de vivienda',
                'vehiculo': 'Financiación de vehículo',
                'educacion': 'Plan de financiación educativa',
                'negocio': 'Financiación para emprendimiento',
                'consolidar': 'Consolidación de deudas',
                'otro': 'Plan financiero personalizado'
            };
            
            document.querySelector('#questionnaire h3').textContent = titulos[objetivo] || 'Cuéntame más sobre tu situación';
            
            // Añadir preguntas específicas según objetivo
            const preguntasAdicionales = document.createElement('div');
            preguntasAdicionales.className = 'preguntas-adicionales';
            
            switch (objetivo) {
                case 'vivienda':
                    preguntasAdicionales.innerHTML = `
                        <div class="question-group">
                            <label for="valor-vivienda">Valor aproximado de la vivienda:</label>
                            <div class="input-icon">
                                <span class="currency-symbol">$</span>
                                <input type="number" id="valor-vivienda" placeholder="Valor de la vivienda">
                            </div>
                        </div>
                        <div class="question-group">
                            <label for="cuota-inicial">Cuota inicial disponible:</label>
                            <div class="input-icon">
                                <span class="currency-symbol">$</span>
                                <input type="number" id="cuota-inicial" placeholder="Cuota inicial">
                            </div>
                        </div>
                    `;
                    break;
                case 'vehiculo':
                    preguntasAdicionales.innerHTML = `
                        <div class="question-group">
                            <label for="tipo-vehiculo">Tipo de vehículo:</label>
                            <select id="tipo-vehiculo">
                                <option value="nuevo">Nuevo</option>
                                <option value="usado">Usado</option>
                            </select>
                        </div>
                        <div class="question-group">
                            <label for="valor-vehiculo">Valor aproximado del vehículo:</label>
                            <div class="input-icon">
                                <span class="currency-symbol">$</span>
                                <input type="number" id="valor-vehiculo" placeholder="Valor del vehículo">
                            </div>
                        </div>
                    `;
                    break;
                // Otros casos específicos
            }
            
            // Insertar preguntas adicionales antes del botón de análisis
            const botonAnalizar = document.getElementById('analizar-situacion');
            botonAnalizar.parentNode.insertBefore(preguntasAdicionales, botonAnalizar);
        }
        
        /**
         * Analiza la situación financiera y genera recomendaciones
         * @param {Object} datos - Datos financieros del usuario
         * @returns {Object} Recomendación financiera
         */
        function analizarSituacionFinanciera(datos) {
            // Cálculos base
            const ingresoDisponible = datos.ingresos - datos.gastos - datos.deudas;
            const capacidadPago = ingresoDisponible * 0.3; // 30% del ingreso disponible
            const nivelEndeudamiento = ((datos.deudas + capacidadPago) / datos.ingresos) * 100;
            
            // Análisis específico según objetivo
            let recomendacion = {
                viabilidad: 0,
                resumen: '',
                estrategias: [],
                hojaRuta: [],
                proximosPasos: [],
                advertencias: [],
                monto: 0,
                plazo: 0,
                tasa: 0
            };
            
            // Calcular viabilidad base (0-100)
            let viabilidad = 100;
            
            if (ingresoDisponible <= 0) viabilidad = 0;
            else if (nivelEndeudamiento > 60) viabilidad -= 40;
            else if (nivelEndeudamiento > 40) viabilidad -= 20;
            
            if (datos.ahorro <= 0) viabilidad -= 15;
            
            recomendacion.viabilidad = Math.max(0, Math.min(100, viabilidad));
            
            // Análisis específico según objetivo
            switch (datos.objetivo) {
                case 'vivienda':
                    const valorVivienda = parseFloat(document.getElementById('valor-vivienda').value) || 0;
                    const cuotaInicial = parseFloat(document.getElementById('cuota-inicial').value) || 0;
                    
                    if (valorVivienda > 0) {
                        const porcentajeCuotaInicial = (cuotaInicial / valorVivienda) * 100;
                        const montoFinanciar = valorVivienda - cuotaInicial;
                        
                        // Recomendar plazo según capacidad de pago
                        let plazoRecomendado = 240; // 20 años
                        const tasaHipotecaria = 0.8; // 0.8% mensual
                        
                        if (porcentajeCuotaInicial < 20) {
                            recomendacion.viabilidad = Math.max(0, recomendacion.viabilidad - 10);
                            recomendacion.advertencias.push("Una cuota inicial menor al 20% puede resultar en tasas más altas y requisitos adicionales.");
                        }
                        
                        // Calcular cuota con diferentes plazos
                        const cuota20Anios = calcularCuotaMensual(montoFinanciar, tasaHipotecaria/100, 240);
                        const cuota15Anios = calcularCuotaMensual(montoFinanciar, tasaHipotecaria/100, 180);
                        const cuota10Anios = calcularCuotaMensual(montoFinanciar, tasaHipotecaria/100, 120);
                        
                        // Elegir plazo según capacidad y preferencia
                        if (cuota10Anios <= capacidadPago && datos.prioridad === 'interes') {
                            plazoRecomendado = 120;
                        } else if (cuota15Anios <= capacidadPago) {
                            plazoRecomendado = 180;
                        }
                        
                        // Establecer valores recomendados
                        recomendacion.monto = montoFinanciar;
                        recomendacion.plazo = plazoRecomendado;
                        recomendacion.tasa = tasaHipotecaria;
                        
                        // Generar resumen
                        recomendacion.resumen = `Para una vivienda de ${formatoMoneda(valorVivienda)} con una cuota inicial de ${formatoMoneda(cuotaInicial)} (${porcentajeCuotaInicial.toFixed(1)}%), podrías acceder a un préstamo hipotecario de ${formatoMoneda(montoFinanciar)} a ${plazoRecomendado/12} años con una cuota mensual estimada de ${formatoMoneda(calcularCuotaMensual(montoFinanciar, tasaHipotecaria/100, plazoRecomendado))}.`;
                        
                        // Estrategias
                        recomendacion.estrategias = [
                            {
                                titulo: "Préstamo hipotecario tradicional",
                                descripcion: "Financiación a través de banco con tasa fija o variable.",
                                pros: ["Estabilidad en pagos", "Posibilidad de prepagos"],
                                contras: ["Requiere buen historial crediticio", "Proceso de aprobación exigente"]
                            },
                            {
                                titulo: "Leasing habitacional",
                                descripcion: "Alternativa al crédito hipotecario tradicional.",
                                pros: ["Posibles beneficios tributarios", "Menor cuota inicial en algunos casos"],
                                contras: ["La propiedad es del banco hasta el final", "Menos flexibilidad para modificaciones"]
                            }
                        ];
                        
                        // Hoja de ruta
                        recomendacion.hojaRuta = [
                            { fase: "Preparación", accion: "Completar ahorro para cuota inicial", tiempo: "6-12 meses" },
                            { fase: "Solicitud", accion: "Aplicar a préstamos en 3-5 entidades", tiempo: "1 mes" },
                            { fase: "Aprobación", accion: "Proceso de estudio y aprobación", tiempo: "1-2 meses" },
                            { fase: "Compra", accion: "Proceso legal y desembolso", tiempo: "1 mes" }
                        ];
                        
                        // Próximos pasos
                        recomendacion.proximosPasos = [
                            "Verificar tu puntaje crediticio y corregir posibles problemas",
                            "Completar tu ahorro para alcanzar al menos el 20% de cuota inicial",
                            "Recopilar documentos financieros de los últimos 3-6 meses",
                            "Comparar ofertas de al menos 3 entidades financieras"
                        ];
                    }
                    break;
                    
                // Otros casos específicos...
                default:
                    // Recomendación genérica para préstamo personal
                    const montoRecomendado = capacidadPago * 24; // Basado en 24 meses
                    recomendacion.monto = montoRecomendado;
                    recomendacion.plazo = 24;
                    recomendacion.tasa = 1.5;
                    
                    recomendacion.resumen = `Basado en tu situación financiera, podrías acceder a un préstamo personal de aproximadamente ${formatoMoneda(montoRecomendado)} a 24 meses con una cuota mensual estimada de ${formatoMoneda(calcularCuotaMensual(montoRecomendado, 1.5/100, 24))}.`;
                    
                    // Estrategias genéricas
                    recomendacion.estrategias = [
                        {
                            titulo: "Préstamo personal tradicional",
                            descripcion: "Préstamo de libre inversión con entidad bancaria.",
                            pros: ["Versatilidad de uso", "Proceso relativamente sencillo"],
                            contras: ["Tasas de interés más altas", "Puede requerir codeudor"]
                        },
                        {
                            titulo: "Préstamo con cooperativa",
                            descripcion: "Financiación a través de cooperativa financiera.",
                            pros: ["Posibles tasas más favorables", "Menos requisitos en algunos casos"],
                            contras: ["Puede requerir ser asociado", "Montos más limitados"]
                        }
                    ];
            }
            
            return recomendacion;
        }
        
        /**
         * Muestra la recomendación generada
         * @param {Object} recomendacion - Objeto con recomendaciones
         */
        function mostrarRecomendacion(recomendacion) {
            // Almacenar recomendación en el DOM para uso posterior
            document.getElementById('asesor-results').dataset.recomendacion = JSON.stringify({
                monto: recomendacion.monto,
                plazo: recomendacion.plazo,
                tasa: recomendacion.tasa
            });
            
            // Mostrar viabilidad
            document.getElementById('viabilidad-score').textContent = `${recomendacion.viabilidad}%`;
            document.getElementById('viabilidad-score').style.color = recomendacion.viabilidad >= 70 ? '#2ecc71' : 
                                                                      recomendacion.viabilidad >= 40 ? '#f39c12' : '#e74c3c';
            
            // Mostrar resumen
            document.getElementById('resumen-situacion').textContent = recomendacion.resumen;
            
            // Mostrar estrategias
            const strategyCards = document.getElementById('strategy-cards');
            strategyCards.innerHTML = '';
            
            recomendacion.estrategias.forEach(estrategia => {
                const card = document.createElement('div');
                card.className = 'strategy-card';
                
                let prosContrasHTML = '';
                if (estrategia.pros && estrategia.pros.length) {
                    prosContrasHTML += '<div class="pros"><h5>Ventajas</h5><ul>';
                    estrategia.pros.forEach(pro => {
                        prosContrasHTML += `<li>${pro}</li>`;
                    });
                    prosContrasHTML += '</ul></div>';
                }
                
                if (estrategia.contras && estrategia.contras.length) {
                    prosContrasHTML += '<div class="cons"><h5>Consideraciones</h5><ul>';
                    estrategia.contras.forEach(contra => {
                        prosContrasHTML += `<li>${contra}</li>`;
                    });
                    prosContrasHTML += '</ul></div>';
                }
                
                card.innerHTML = `
                    <div class="strategy-title">${estrategia.titulo}</div>
                    <div class="strategy-description">${estrategia.descripcion}</div>
                    <div class="strategy-pros-cons">${prosContrasHTML}</div>
                `;
                
                strategyCards.appendChild(card);
            });
            
            // Mostrar hoja de ruta
            const timeline = document.getElementById('timeline');
            timeline.innerHTML = '';
            
            recomendacion.hojaRuta.forEach((paso, index) => {
                const item = document.createElement('div');
                item.className = 'timeline-item';
                
                item.innerHTML = `
                    <div class="timeline-marker">${index + 1}</div>
                    <div class="timeline-content">
                        <div class="timeline-title">${paso.fase}</div>
                        <div class="timeline-description">${paso.accion}</div>
                        <div class="timeline-time">${paso.tiempo}</div>
                    </div>
                `;
                
                timeline.appendChild(item);
            });
            
            // Mostrar próximos pasos
            const nextStepsList = document.getElementById('next-steps-list');
            nextStepsList.innerHTML = '';
            
            recomendacion.proximosPasos.forEach(paso => {
                const item = document.createElement('li');
                item.textContent = paso;
                nextStepsList.appendChild(item);
            });
            
            // Mostrar advertencias si existen
            const warningContainer = document.getElementById('warning-container');
            warningContainer.innerHTML = '';
            
            if (recomendacion.advertencias && recomendacion.advertencias.length) {
                warningContainer.innerHTML = '<h4><i class="fas fa-exclamation-triangle"></i> Aspectos a considerar</h4><ul></ul>';
                const warningList = warningContainer.querySelector('ul');
                
                recomendacion.advertencias.forEach(advertencia => {
                    const item = document.createElement('li');
                    item.textContent = advertencia;
                    warningList.appendChild(item);
                });
            }
        }
        
        /**
         * Genera un PDF con el plan financiero
         */
        function generarPDFPlan() {
            // Verificar si existe la librería html2pdf
            if (typeof html2pdf !== 'function') {
                mostrarMensaje("No se puede generar el PDF. Falta la librería html2pdf.", "error");
                return;
            }
            
            // Clonar el contenido de resultados para su exportación
            const contenido = document.getElementById('asesor-results').cloneNode(true);
            
            // Ajustar estilos para PDF
            contenido.style.padding = '20px';
            contenido.style.maxWidth = '800px';
            contenido.style.margin = '0 auto';
            contenido.style.backgroundColor = '#fff';
            contenido.style.color = '#333';
            
            // Eliminar botones de acción
            const botonesAccion = contenido.querySelector('.action-buttons');
            if (botonesAccion) {
                botonesAccion.remove();
            }
            
            // Agregar encabezado
            const encabezado = document.createElement('div');
            encabezado.style.textAlign = 'center';
            encabezado.style.marginBottom = '20px';
            encabezado.innerHTML = `
                <h1 style="color: #6e8efb; margin-bottom: 5px;">Plan Financiero Personalizado</h1>
                <p style="color: #777;">Generado el ${new Date().toLocaleDateString()}</p>
            `;
            
            contenido.insertBefore(encabezado, contenido.firstChild);
            
            // Agregar pie de página
            const piePagina = document.createElement('div');
            piePagina.style.borderTop = '1px solid #eee';
            piePagina.style.marginTop = '30px';
            piePagina.style.paddingTop = '20px';
            piePagina.style.fontSize = '12px';
            piePagina.style.color = '#777';
            piePagina.style.textAlign = 'center';
            piePagina.innerHTML = `
                <p>Este plan es una recomendación basada en la información proporcionada. 
                Consulte a un asesor financiero para decisiones importantes.</p>
                <p>© ${new Date().getFullYear()} Simulador de Préstamos</p>
            `;
            
            contenido.appendChild(piePagina);
            
            // Configurar opciones de PDF
            const opt = {
                margin: [10, 10, 10, 10],
                filename: 'plan-financiero-personalizado.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };
            
            // Generar PDF
            html2pdf().set(opt).from(contenido).save();
            
            mostrarMensaje("Generando PDF de tu plan financiero...", "success");
        }
        
        /**
         * Calcula la cuota mensual de un préstamo
         * @param {number} monto - Monto del préstamo
         * @param {number} tasaMensual - Tasa de interés mensual en decimal
         * @param {number} plazo - Plazo en meses
         * @returns {number} Cuota mensual
         */
        function calcularCuotaMensual(monto, tasaMensual, plazo) {
            return monto * (tasaMensual * Math.pow(1 + tasaMensual, plazo)) / (Math.pow(1 + tasaMensual, plazo) - 1);
        }
        
        /**
         * Formatea un número como moneda colombiana
         * @param {number} valor - Valor a formatear
         * @returns {string} Valor formateado como moneda
         */
        function formatoMoneda(valor) {
            return new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(valor);
        }
        
        /**
         * Muestra un mensaje al usuario
         * @param {string} mensaje - Texto del mensaje
         * @param {string} tipo - Tipo de mensaje (success, error, info, warning)
         */
        function mostrarMensaje(mensaje, tipo) {
            // Usar la función global si existe
            if (typeof window.mostrarToast === 'function') {
                window.mostrarToast(mensaje, tipo);
            } else if (typeof window.mostrarMensaje === 'function') {
                window.mostrarMensaje(mensaje, tipo);
            } else {
                // Implementación básica
                alert(mensaje);
            }
        }
    });
})();
