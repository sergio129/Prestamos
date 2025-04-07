/**
 * Calculadora de Préstamos Hipotecarios con Subsidios
 * Permite simular préstamos para vivienda incluyendo subsidios gubernamentales
 */

(function() {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Inicializando calculadora de préstamos hipotecarios con subsidios...');
        
        // Crear botón
        const hipotecarioBtn = document.createElement('button');
        hipotecarioBtn.type = 'button';
        hipotecarioBtn.className = 'btn btn-hipotecario';
        hipotecarioBtn.innerHTML = '<i class="fas fa-home"></i> Préstamo de Vivienda';
        hipotecarioBtn.style.marginTop = '15px';
        
        // Añadir botón después de otros botones existentes
        const otrosBtn = document.querySelector('.btn-inversion, .btn-capacidad, .btn-comparador');
        if (otrosBtn && otrosBtn.parentNode) {
            otrosBtn.parentNode.appendChild(hipotecarioBtn);
        } else {
            const loanForm = document.getElementById('loan-form');
            if (loanForm && loanForm.parentNode) {
                loanForm.parentNode.appendChild(hipotecarioBtn);
            }
        }
        
        // Crear modal
        const hipotecarioModal = document.createElement('div');
        hipotecarioModal.id = 'hipotecario-modal';
        hipotecarioModal.className = 'modal hidden';
        
        hipotecarioModal.innerHTML = `
            <div class="modal-content hipotecario-content">
                <span class="close-modal">&times;</span>
                <h2>Calculadora de Préstamo para Vivienda</h2>
                
                <div class="tabs">
                    <div class="tab active" data-tab="simulador">Simulador</div>
                    <div class="tab" data-tab="subsidios">Subsidios</div>
                    <div class="tab" data-tab="requisitos">Requisitos</div>
                </div>
                
                <div class="tab-content">
                    <!-- Tab Simulador -->
                    <div class="tab-pane active" id="simulador-tab">
                        <p class="tab-description">Simula tu crédito hipotecario y conoce el valor de las cuotas mensuales.</p>
                        
                        <div class="form-group">
                            <label>Tipo de vivienda:</label>
                            <div class="radio-group">
                                <label>
                                    <input type="radio" name="tipo-vivienda" value="nueva" checked> Vivienda nueva
                                </label>
                                <label>
                                    <input type="radio" name="tipo-vivienda" value="usada"> Vivienda usada
                                </label>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label>Valor de la vivienda:</label>
                            <div class="input-icon">
                                <span class="currency-symbol">$</span>
                                <input type="number" id="valor-vivienda" placeholder="Valor total de la vivienda">
                            </div>
                            <div class="categoria-vivienda" id="categoria-vivienda">
                                <!-- Se actualiza dinámicamente -->
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label>Cuota inicial:</label>
                            <div class="row">
                                <div class="col">
                                    <div class="input-icon">
                                        <span>%</span>
                                        <input type="number" id="porcentaje-cuota-inicial" min="0" max="90" value="30">
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="input-icon">
                                        <span class="currency-symbol">$</span>
                                        <input type="number" id="valor-cuota-inicial" placeholder="Valor de la cuota inicial">
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label>Plazo del crédito:</label>
                            <select id="plazo-hipotecario">
                                <option value="60">5 años</option>
                                <option value="120">10 años</option>
                                <option value="180">15 años</option>
                                <option value="240" selected>20 años</option>
                                <option value="300">25 años</option>
                                <option value="360">30 años</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>Tasa de interés anual:</label>
                            <div class="input-icon">
                                <span>%</span>
                                <input type="number" id="tasa-hipotecario" step="0.01" min="1" max="20" value="10.5">
                            </div>
                            <div class="rate-type">
                                <label>
                                    <input type="radio" name="tipo-tasa" value="fija" checked> Tasa fija
                                </label>
                                <label>
                                    <input type="radio" name="tipo-tasa" value="variable"> Tasa variable
                                </label>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label>¿Aplica a subsidio?</label>
                            <div class="switch-container">
                                <label class="switch">
                                    <input type="checkbox" id="con-subsidio">
                                    <span class="slider round"></span>
                                </label>
                                <span class="switch-label">No</span>
                            </div>
                        </div>
                        
                        <div id="subsidio-options" class="hidden form-group subsidio-options">
                            <label>Subsidio aplicable:</label>
                            <select id="tipo-subsidio">
                                <option value="mi-casa-ya">Mi Casa Ya</option>
                                <option value="frech">Cobertura FRECH</option>
                                <option value="caja-compensacion">Caja de Compensación</option>
                            </select>
                            <div id="subsidio-info" class="subsidio-info">
                                <!-- Se actualiza dinámicamente -->
                            </div>
                        </div>
                        
                        <button id="calcular-hipotecario" class="btn btn-full">Calcular</button>
                        
                        <div id="resultado-hipotecario" class="hidden">
                            <h3>Resultados</h3>
                            
                            <div class="result-cards">
                                <div class="result-card">
                                    <div class="result-card-title">Monto a financiar</div>
                                    <div id="monto-financiar" class="result-card-value">$0</div>
                                </div>
                                
                                <div class="result-card highlight">
                                    <div class="result-card-title">Cuota mensual</div>
                                    <div id="cuota-hipotecario" class="result-card-value">$0</div>
                                    <div class="result-card-subtitle" id="tipo-cuota-info">Cuota fija</div>
                                </div>
                                
                                <div class="result-card">
                                    <div class="result-card-title">Subsidio aplicado</div>
                                    <div id="subsidio-aplicado" class="result-card-value">$0</div>
                                </div>
                            </div>
                            
                            <div class="result-details">
                                <div class="result-item">
                                    <span class="result-label">Valor total de la vivienda:</span>
                                    <span id="resumen-valor-vivienda" class="result-value">$0</span>
                                </div>
                                <div class="result-item">
                                    <span class="result-label">Cuota inicial:</span>
                                    <span id="resumen-cuota-inicial" class="result-value">$0</span>
                                </div>
                                <div class="result-item">
                                    <span class="result-label">Monto del crédito:</span>
                                    <span id="resumen-monto-credito" class="result-value">$0</span>
                                </div>
                                <div class="result-item">
                                    <span class="result-label">Plazo:</span>
                                    <span id="resumen-plazo" class="result-value">0 años</span>
                                </div>
                                <div class="result-item">
                                    <span class="result-label">Tasa de interés:</span>
                                    <span id="resumen-tasa" class="result-value">0%</span>
                                </div>
                                <div class="result-item">
                                    <span class="result-label">Total a pagar:</span>
                                    <span id="resumen-total-pagar" class="result-value">$0</span>
                                </div>
                                <div class="result-item">
                                    <span class="result-label">Total intereses:</span>
                                    <span id="resumen-intereses" class="result-value">$0</span>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <canvas id="chart-hipotecario"></canvas>
                            </div>
                            
                            <div class="affordability-analysis">
                                <h4>Análisis de capacidad de pago</h4>
                                <div class="form-group">
                                    <label for="ingresos-mensuales">¿Cuáles son tus ingresos mensuales?</label>
                                    <div class="input-icon">
                                        <span class="currency-symbol">$</span>
                                        <input type="number" id="ingresos-mensuales" placeholder="Ingresos mensuales">
                                    </div>
                                    <button id="analizar-capacidad" class="btn btn-secondary">Analizar</button>
                                </div>
                                <div id="capacidad-resultado" class="hidden">
                                    <div class="capacidad-meter-container">
                                        <div class="capacidad-meter">
                                            <div id="capacidad-indicator" class="capacidad-indicator"></div>
                                        </div>
                                        <div class="capacidad-labels">
                                            <span>Bajo</span>
                                            <span>Óptimo</span>
                                            <span>Alto</span>
                                        </div>
                                    </div>
                                    <div id="capacidad-mensaje" class="capacidad-mensaje"></div>
                                </div>
                            </div>
                            
                            <div class="action-buttons">
                                <button id="aplicar-hipotecario" class="btn btn-secondary">Aplicar al simulador principal</button>
                                <button id="exportar-hipotecario" class="btn btn-outline">Exportar resultados</button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Tab Subsidios -->
                    <div class="tab-pane" id="subsidios-tab">
                        <p class="tab-description">Información sobre subsidios de vivienda disponibles en Colombia.</p>
                        
                        <div class="subsidios-container">
                            <div class="subsidio-card">
                                <div class="subsidio-header">
                                    <h3>Mi Casa Ya</h3>
                                    <span class="subsidio-badge">Más popular</span>
                                </div>
                                <div class="subsidio-description">
                                    <p>Subsidio directo a la cuota inicial y cobertura a la tasa de interés para familias con ingresos de hasta 4 SMMLV.</p>
                                </div>
                                <div class="subsidio-details">
                                    <div class="subsidio-item">
                                        <span class="subsidio-label">Aplica para:</span>
                                        <span class="subsidio-value">Vivienda nueva (VIS y VIP)</span>
                                    </div>
                                    <div class="subsidio-item">
                                        <span class="subsidio-label">Monto del subsidio:</span>
                                        <span class="subsidio-value">Hasta 30 SMMLV para VIP<br>Hasta 20 SMMLV para VIS</span>
                                    </div>
                                    <div class="subsidio-item">
                                        <span class="subsidio-label">Requisitos básicos:</span>
                                        <ul>
                                            <li>Ingresos familiares hasta 4 SMMLV</li>
                                            <li>No ser propietario de vivienda</li>
                                            <li>No haber recibido subsidios previos</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="subsidio-footer">
                                    <a href="https://minvivienda.gov.co/mi-casa-ya" target="_blank" class="btn-link">Más información</a>
                                </div>
                            </div>
                            
                            <div class="subsidio-card">
                                <div class="subsidio-header">
                                    <h3>FRECH</h3>
                                </div>
                                <div class="subsidio-description">
                                    <p>Cobertura a la tasa de interés que reduce el valor de la cuota mensual durante los primeros años del crédito.</p>
                                </div>
                                <div class="subsidio-details">
                                    <div class="subsidio-item">
                                        <span class="subsidio-label">Aplica para:</span>
                                        <span class="subsidio-value">Vivienda nueva (VIS y No VIS)</span>
                                    </div>
                                    <div class="subsidio-item">
                                        <span class="subsidio-label">Cobertura:</span>
                                        <span class="subsidio-value">5% para VIP<br>4% para VIS<br>2-3% para No VIS</span>
                                    </div>
                                    <div class="subsidio-item">
                                        <span class="subsidio-label">Duración:</span>
                                        <span class="subsidio-value">7 años para VIS y VIP<br>7 años para No VIS</span>
                                    </div>
                                </div>
                                <div class="subsidio-footer">
                                    <a href="https://minvivienda.gov.co" target="_blank" class="btn-link">Más información</a>
                                </div>
                            </div>
                            
                            <div class="subsidio-card">
                                <div class="subsidio-header">
                                    <h3>Cajas de Compensación</h3>
                                </div>
                                <div class="subsidio-description">
                                    <p>Subsidio familiar de vivienda otorgado por las Cajas de Compensación a sus afiliados.</p>
                                </div>
                                <div class="subsidio-details">
                                    <div class="subsidio-item">
                                        <span class="subsidio-label">Aplica para:</span>
                                        <span class="subsidio-value">Vivienda nueva y usada</span>
                                    </div>
                                    <div class="subsidio-item">
                                        <span class="subsidio-label">Monto del subsidio:</span>
                                        <span class="subsidio-value">Hasta 30 SMMLV según ingresos</span>
                                    </div>
                                    <div class="subsidio-item">
                                        <span class="subsidio-label">Requisitos básicos:</span>
                                        <ul>
                                            <li>Estar afiliado a la Caja de Compensación</li>
                                            <li>Ingresos hasta 4 SMMLV</li>
                                            <li>No ser propietario de vivienda</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="subsidio-footer">
                                    <a href="#" class="btn-link">Contactar Caja</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Tab Requisitos -->
                    <div class="tab-pane" id="requisitos-tab">
                        <p class="tab-description">Documentos y requisitos necesarios para solicitar un crédito hipotecario.</p>
                        
                        <div class="accordion">
                            <div class="accordion-item">
                                <div class="accordion-header">
                                    <span>Documentos personales</span>
                                    <i class="fas fa-chevron-down"></i>
                                </div>
                                <div class="accordion-content">
                                    <ul class="requirements-list">
                                        <li>Fotocopia de la cédula de ciudadanía</li>
                                        <li>Declaración de renta (si aplica)</li>
                                        <li>Certificado de ingresos y retenciones</li>
                                        <li>Carta laboral (con antigüedad, cargo y salario)</li>
                                        <li>Extractos bancarios de los últimos 3 meses</li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="accordion-item">
                                <div class="accordion-header">
                                    <span>Documentos laborales (Empleados)</span>
                                    <i class="fas fa-chevron-down"></i>
                                </div>
                                <div class="accordion-content">
                                    <ul class="requirements-list">
                                        <li>Certificación laboral (no mayor a 30 días)</li>
                                        <li>Comprobantes de pago de nómina (últimos 3 meses)</li>
                                        <li>Certificado de ingresos y retenciones del año anterior</li>
                                        <li>Contrato laboral (si aplica)</li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="accordion-item">
                                <div class="accordion-header">
                                    <span>Documentos para independientes</span>
                                    <i class="fas fa-chevron-down"></i>
                                </div>
                                <div class="accordion-content">
                                    <ul class="requirements-list">
                                        <li>Declaración de renta de los últimos 2 años</li>
                                        <li>Estados financieros certificados por contador</li>
                                        <li>Certificado de ingresos firmado por contador</li>
                                        <li>Extractos bancarios de los últimos 6 meses</li>
                                        <li>Certificado de Cámara de Comercio (si aplica)</li>
                                        <li>Copia del RUT actualizado</li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="accordion-item">
                                <div class="accordion-header">
                                    <span>Documentos del inmueble</span>
                                    <i class="fas fa-chevron-down"></i>
                                </div>
                                <div class="accordion-content">
                                    <ul class="requirements-list">
                                        <li>Promesa de compraventa</li>
                                        <li>Certificado de libertad y tradición (no mayor a 30 días)</li>
                                        <li>Escritura de compraventa</li>
                                        <li>Certificado de paz y salvo de impuesto predial</li>
                                        <li>Avalúo comercial del inmueble</li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="accordion-item">
                                <div class="accordion-header">
                                    <span>Requisitos generales</span>
                                    <i class="fas fa-chevron-down"></i>
                                </div>
                                <div class="accordion-content">
                                    <ul class="requirements-list">
                                        <li>Ser mayor de edad y menor de 70 años</li>
                                        <li>Tener historial crediticio favorable</li>
                                        <li>Capacidad de pago (la cuota no debe superar el 30% de los ingresos)</li>
                                        <li>Estabilidad laboral (mínimo 6-12 meses)</li>
                                        <li>Cuota inicial mínima del 20-30% del valor del inmueble</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div class="note-container">
                            <div class="note">
                                <i class="fas fa-info-circle"></i>
                                <div class="note-content">
                                    <p>Esta es una lista general de requisitos. Cada entidad financiera puede solicitar documentos adicionales según sus políticas internas.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(hipotecarioModal);
        
        // Configurar eventos
        hipotecarioBtn.addEventListener('click', function() {
            hipotecarioModal.classList.remove('hidden');
        });
        
        // Cerrar modal
        hipotecarioModal.querySelector('.close-modal').addEventListener('click', function() {
            hipotecarioModal.classList.add('hidden');
        });
        
        // Evitar que los clics dentro del modal cierren el modal
        hipotecarioModal.querySelector('.modal-content').addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        // Cerrar modal al hacer clic fuera del contenido
        hipotecarioModal.addEventListener('click', function() {
            hipotecarioModal.classList.add('hidden');
        });
        
        // Funcionalidad de tabs
        hipotecarioModal.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', function() {
                // Desactivar todos los tabs
                hipotecarioModal.querySelectorAll('.tab').forEach(t => {
                    t.classList.remove('active');
                });
                
                // Desactivar todos los panes
                hipotecarioModal.querySelectorAll('.tab-pane').forEach(p => {
                    p.classList.remove('active');
                });
                
                // Activar el tab seleccionado
                this.classList.add('active');
                
                // Activar el pane correspondiente
                const tabName = this.getAttribute('data-tab');
                const pane = hipotecarioModal.querySelector(`#${tabName}-tab`);
                if (pane) {
                    pane.classList.add('active');
                }
            });
        });
        
        // Acordeón para requisitos
        hipotecarioModal.querySelectorAll('.accordion-header').forEach(header => {
            header.addEventListener('click', function() {
                const accordionItem = this.parentElement;
                accordionItem.classList.toggle('active');
                
                // Rotar el icono
                const icon = this.querySelector('i');
                if (accordionItem.classList.contains('active')) {
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    icon.style.transform = 'rotate(0deg)';
                }
            });
        });
        
        // Switch de subsidio
        const subsidioSwitch = hipotecarioModal.querySelector('#con-subsidio');
        const switchLabel = hipotecarioModal.querySelector('.switch-label');
        const subsidioOptions = hipotecarioModal.querySelector('#subsidio-options');
        
        if (subsidioSwitch) {
            subsidioSwitch.addEventListener('change', function() {
                if (this.checked) {
                    switchLabel.textContent = 'Sí';
                    subsidioOptions.classList.remove('hidden');
                } else {
                    switchLabel.textContent = 'No';
                    subsidioOptions.classList.add('hidden');
                }
            });
        }
        
        // Actualizar cuota inicial al cambiar el porcentaje
        const valorViviendaInput = hipotecarioModal.querySelector('#valor-vivienda');
        const porcentajeCuotaInicial = hipotecarioModal.querySelector('#porcentaje-cuota-inicial');
        const valorCuotaInicial = hipotecarioModal.querySelector('#valor-cuota-inicial');
        
        function actualizarCuotaInicial() {
            const valorVivienda = parseFloat(valorViviendaInput.value) || 0;
            const porcentaje = parseFloat(porcentajeCuotaInicial.value) || 0;
            const valorCuota = valorVivienda * (porcentaje / 100);
            valorCuotaInicial.value = valorCuota.toFixed(0);
            
            // Actualizar categoría de vivienda
            actualizarCategoriaVivienda(valorVivienda);
        }
        
        if (valorViviendaInput && porcentajeCuotaInicial && valorCuotaInicial) {
            valorViviendaInput.addEventListener('input', actualizarCuotaInicial);
            porcentajeCuotaInicial.addEventListener('input', actualizarCuotaInicial);
            
            // También actualizar porcentaje cuando se cambia valor de cuota
            valorCuotaInicial.addEventListener('input', function() {
                const valorVivienda = parseFloat(valorViviendaInput.value) || 0;
                const valorCuota = parseFloat(valorCuotaInicial.value) || 0;
                
                if (valorVivienda > 0) {
                    const porcentaje = (valorCuota / valorVivienda) * 100;
                    porcentajeCuotaInicial.value = porcentaje.toFixed(1);
                }
            });
        }
        
        // Función para actualizar la categoría de vivienda (VIP, VIS, No VIS)
        function actualizarCategoriaVivienda(valorVivienda) {
            const categoriaViviendaEl = hipotecarioModal.querySelector('#categoria-vivienda');
            const salarioMinimo = 1300000; // Valor SMMLV aproximado 2023
            
            if (categoriaViviendaEl) {
                let categoria = '';
                let color = '';
                
                if (valorVivienda <= 90 * salarioMinimo) {
                    categoria = 'Vivienda de Interés Prioritario (VIP)';
                    color = '#4caf50';
                } else if (valorVivienda <= 150 * salarioMinimo) {
                    categoria = 'Vivienda de Interés Social (VIS)';
                    color = '#2196f3';
                } else {
                    categoria = 'Vivienda No VIS';
                    color = '#9e9e9e';
                }
                
                categoriaViviendaEl.innerHTML = `<span style="color: ${color};">${categoria}</span>`;
                categoriaViviendaEl.style.display = valorVivienda > 0 ? 'block' : 'none';
            }
        }
        
        // Mostrar información sobre subsidio seleccionado
        const tipoSubsidio = hipotecarioModal.querySelector('#tipo-subsidio');
        const subsidioInfo = hipotecarioModal.querySelector('#subsidio-info');
        
        if (tipoSubsidio && subsidioInfo) {
            tipoSubsidio.addEventListener('change', function() {
                const tipo = this.value;
                
                let infoHTML = '';
                switch (tipo) {
                    case 'mi-casa-ya':
                        infoHTML = `
                            <p><strong>Mi Casa Ya:</strong> Subsidio directo a la cuota inicial de hasta 30 SMMLV y cobertura a la tasa de interés.</p>
                            <p>Aplica para viviendas VIS y VIP con ingresos hasta 4 SMMLV.</p>
                        `;
                        break;
                    case 'frech':
                        infoHTML = `
                            <p><strong>FRECH:</strong> Cobertura a la tasa de interés que reduce la cuota mensual.</p>
                            <p>VIP: 5 puntos porcentuales durante 7 años</p>
                            <p>VIS: 4 puntos porcentuales durante 7 años</p>
                            <p>No VIS: 2-3 puntos porcentuales durante 7 años</p>
                        `;
                        break;
                    case 'caja-compensacion':
                        infoHTML = `
                            <p><strong>Caja de Compensación:</strong> Subsidio de hasta 30 SMMLV para afiliados.</p>
                            <p>El monto depende de tus ingresos y la categoría de afiliación.</p>
                        `;
                        break;
                }
                
                subsidioInfo.innerHTML = infoHTML;
            });
            
            // Inicializar con la primera opción
            tipoSubsidio.dispatchEvent(new Event('change'));
        }
        
        // Calcular hipotecario
        const calcularHipotecarioBtn = hipotecarioModal.querySelector('#calcular-hipotecario');
        
        if (calcularHipotecarioBtn) {
            calcularHipotecarioBtn.addEventListener('click', function() {
                // Obtener valores
                const valorVivienda = parseFloat(valorViviendaInput.value) || 0;
                const valorCuota = parseFloat(valorCuotaInicial.value) || 0;
                const plazoMeses = parseInt(hipotecarioModal.querySelector('#plazo-hipotecario').value) || 240;
                const tasaAnual = parseFloat(hipotecarioModal.querySelector('#tasa-hipotecario').value) || 10.5;
                const tipoTasa = hipotecarioModal.querySelector('input[name="tipo-tasa"]:checked').value;
                const conSubsidio = hipotecarioModal.querySelector('#con-subsidio').checked;
                
                // Validar entradas
                if (valorVivienda <= 0) {
                    mostrarMensaje("Ingrese un valor válido para la vivienda", "error");
                    return;
                }
                
                if (valorCuota <= 0) {
                    mostrarMensaje("Ingrese un valor válido para la cuota inicial", "error");
                    return;
                }
                
                if (valorCuota >= valorVivienda) {
                    mostrarMensaje("La cuota inicial no puede ser igual o mayor al valor de la vivienda", "error");
                    return;
                }
                
                // Calcular monto a financiar
                const montoFinanciar = valorVivienda - valorCuota;
                
                let subsidioValor = 0;
                let tasaAplicada = tasaAnual;
                
                // Calcular subsidio si aplica
                if (conSubsidio) {
                    const tipoSubsidioSeleccionado = hipotecarioModal.querySelector('#tipo-subsidio').value;
                    const salarioMinimo = 1300000; // Valor SMMLV 2023
                    
                    switch (tipoSubsidioSeleccionado) {
                        case 'mi-casa-ya':
                            // Mi Casa Ya (subsidio directo a cuota inicial)
                            if (valorVivienda <= 90 * salarioMinimo) {
                                // VIP
                                subsidioValor = 30 * salarioMinimo;
                            } else if (valorVivienda <= 150 * salarioMinimo) {
                                // VIS
                                subsidioValor = 20 * salarioMinimo;
                            }
                            break;
                        case 'frech':
                            // FRECH (subsidio a la tasa)
                            if (valorVivienda <= 90 * salarioMinimo) {
                                // VIP
                                tasaAplicada = Math.max(0, tasaAnual - 5);
                            } else if (valorVivienda <= 150 * salarioMinimo) {
                                // VIS
                                tasaAplicada = Math.max(0, tasaAnual - 4);
                            } else {
                                // No VIS
                                tasaAplicada = Math.max(0, tasaAnual - 2.5);
                            }
                            break;
                        case 'caja-compensacion':
                            // Caja de Compensación (subsidio directo)
                            if (valorVivienda <= 150 * salarioMinimo) {
                                subsidioValor = 22 * salarioMinimo;
                            }
                            break;
                    }
                }
                
                // Ajustar monto a financiar si hay subsidio directo
                const montoFinanciarConSubsidio = Math.max(0, montoFinanciar - subsidioValor);
                
                // Calcular tasa mensual
                const tasaMensual = tasaAplicada / 100 / 12;
                
                // Calcular cuota mensual
                const cuotaMensual = calcularCuotaMensual(montoFinanciarConSubsidio, tasaMensual, plazoMeses);
                
                // Calcular total a pagar
                const totalPagar = cuotaMensual * plazoMeses;
                const totalIntereses = totalPagar - montoFinanciarConSubsidio;
                
                // Formatear valores
                const formatoMoneda = new Intl.NumberFormat('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                });
                
                // Mostrar resultados
                hipotecarioModal.querySelector('#monto-financiar').textContent = formatoMoneda.format(montoFinanciarConSubsidio);
                hipotecarioModal.querySelector('#cuota-hipotecario').textContent = formatoMoneda.format(cuotaMensual);
                hipotecarioModal.querySelector('#subsidio-aplicado').textContent = formatoMoneda.format(subsidioValor);
                hipotecarioModal.querySelector('#tipo-cuota-info').textContent = tipoTasa === 'fija' ? 'Cuota fija' : 'Cuota variable (primer mes)';
                
                // Actualizar resumen
                hipotecarioModal.querySelector('#resumen-valor-vivienda').textContent = formatoMoneda.format(valorVivienda);
                hipotecarioModal.querySelector('#resumen-cuota-inicial').textContent = formatoMoneda.format(valorCuota);
                hipotecarioModal.querySelector('#resumen-monto-credito').textContent = formatoMoneda.format(montoFinanciarConSubsidio);
                hipotecarioModal.querySelector('#resumen-plazo').textContent = `${plazoMeses} meses (${plazoMeses/12} años)`;
                hipotecarioModal.querySelector('#resumen-tasa').textContent = `${tasaAplicada}% anual (${(tasaAplicada/12).toFixed(2)}% mensual)`;
                hipotecarioModal.querySelector('#resumen-total-pagar').textContent = formatoMoneda.format(totalPagar);
                hipotecarioModal.querySelector('#resumen-intereses').textContent = formatoMoneda.format(totalIntereses);
                
                // Generar gráfico
                generarGraficoHipotecario(montoFinanciarConSubsidio, totalIntereses, hipotecarioModal);
                
                // Mostrar sección de resultados
                hipotecarioModal.querySelector('#resultado-hipotecario').classList.remove('hidden');
            });
        }
        
        // Analizar capacidad de pago
        const analizarCapacidadBtn = hipotecarioModal.querySelector('#analizar-capacidad');
        
        if (analizarCapacidadBtn) {
            analizarCapacidadBtn.addEventListener('click', function() {
                const ingresosMensuales = parseFloat(hipotecarioModal.querySelector('#ingresos-mensuales').value) || 0;
                const cuotaMensual = parseFloat(hipotecarioModal.querySelector('#cuota-hipotecario').textContent.replace(/\D/g, '')) || 0;
                
                if (ingresosMensuales <= 0) {
                    mostrarMensaje("Ingrese un valor válido para sus ingresos mensuales", "error");
                    return;
                }
                
                if (cuotaMensual <= 0) {
                    mostrarMensaje("Primero debe calcular el préstamo hipotecario", "error");
                    return;
                }
                
                // Calcular relación cuota/ingreso
                const relacion = (cuotaMensual / ingresosMensuales) * 100;
                
                // Establecer el indicador
                const capacidadIndicator = hipotecarioModal.querySelector('#capacidad-indicator');
                capacidadIndicator.style.width = `${Math.min(100, relacion * 2)}%`;
                
                // Definir color y mensaje según la relación
                let color, mensaje;
                
                if (relacion <= 25) {
                    color = '#2ecc71'; // Verde
                    mensaje = `La cuota representa el ${relacion.toFixed(1)}% de tus ingresos. Estás en un rango óptimo de endeudamiento.`;
                } else if (relacion <= 35) {
                    color = '#f39c12'; // Amarillo
                    mensaje = `La cuota representa el ${relacion.toFixed(1)}% de tus ingresos. Estás en el límite recomendado.`;
                } else {
                    color = '#e74c3c'; // Rojo
                    mensaje = `¡Precaución! La cuota representa el ${relacion.toFixed(1)}% de tus ingresos, superior al 35% recomendado.`;
                }
                
                capacidadIndicator.style.backgroundColor = color;
                hipotecarioModal.querySelector('#capacidad-mensaje').textContent = mensaje;
                hipotecarioModal.querySelector('#capacidad-mensaje').style.color = color;
                
                // Mostrar resultado
                hipotecarioModal.querySelector('#capacidad-resultado').classList.remove('hidden');
            });
        }
        
        // Aplicar al simulador principal
        const aplicarHipotecarioBtn = hipotecarioModal.querySelector('#aplicar-hipotecario');
        
        if (aplicarHipotecarioBtn) {
            aplicarHipotecarioBtn.addEventListener('click', function() {
                const monto = parseFloat(hipotecarioModal.querySelector('#resumen-monto-credito').textContent.replace(/\D/g, '')) || 0;
                const plazo = parseInt(hipotecarioModal.querySelector('#plazo-hipotecario').value) || 0;
                const tasaAnual = parseFloat(hipotecarioModal.querySelector('#tasa-hipotecario').value) || 0;
                
                if (monto > 0 && plazo > 0 && tasaAnual > 0) {
                    // Actualizar simulador principal
                    document.getElementById('monto').value = monto;
                    document.getElementById('plazo').value = plazo;
                    document.getElementById('interes-mensual').value = (tasaAnual / 12).toFixed(2);
                    
                    // Cerrar modal
                    hipotecarioModal.classList.add('hidden');
                    
                    // Disparar evento para calcular
                    if (typeof calcularPrestamo === 'function') {
                        calcularPrestamo();
                        mostrarMensaje("Préstamo hipotecario aplicado al simulador principal", "success");
                    }
                } else {
                    mostrarMensaje("No hay datos válidos para aplicar", "error");
                }
            });
        }
        
        // Exportar resultados
        const exportarHipotecarioBtn = hipotecarioModal.querySelector('#exportar-hipotecario');
        
        if (exportarHipotecarioBtn) {
            exportarHipotecarioBtn.addEventListener('click', function() {
                if (typeof html2pdf !== 'function') {
                    mostrarMensaje("La biblioteca html2pdf no está disponible", "error");
                    return;
                }
                
                // Clonar resultado
                const resultado = hipotecarioModal.querySelector('#resultado-hipotecario').cloneNode(true);
                
                // Ocultar botones en el PDF
                const botonesAccion = resultado.querySelector('.action-buttons');
                if (botonesAccion) {
                    botonesAccion.remove();
                }
                
                // Ocultar análisis de capacidad
                const capacidadAnalisis = resultado.querySelector('.affordability-analysis');
                if (capacidadAnalisis) {
                    capacidadAnalisis.remove();
                }
                
                // Crear contenedor
                const contenedor = document.createElement('div');
                contenedor.className = 'pdf-container';
                contenedor.style.padding = '20px';
                contenedor.style.maxWidth = '800px';
                
                // Agregar título
                const titulo = document.createElement('h1');
                titulo.textContent = 'Simulación de Préstamo Hipotecario';
                titulo.style.textAlign = 'center';
                titulo.style.color = '#3498db';
                titulo.style.marginBottom = '20px';
                
                // Agregar fecha
                const fecha = document.createElement('p');
                fecha.textContent = `Generado el ${new Date().toLocaleDateString()}`;
                fecha.style.textAlign = 'center';
                fecha.style.marginBottom = '30px';
                fecha.style.color = '#777';
                
                // Agregar al contenedor
                contenedor.appendChild(titulo);
                contenedor.appendChild(fecha);
                contenedor.appendChild(resultado);
                
                // Configurar opciones
                const opciones = {
                    margin: 10,
                    filename: 'simulacion-hipotecaria.pdf',
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                };
                
                // Generar PDF
                html2pdf().set(opciones).from(contenedor).save();
                
                mostrarMensaje("Generando PDF...", "success");
            });
        }
        
        /**
         * Genera el gráfico del préstamo hipotecario
         * @param {number} montoFinanciar - Monto a financiar
         * @param {number} totalIntereses - Total de intereses
         * @param {HTMLElement} modal - Modal donde está el canvas
         */
        function generarGraficoHipotecario(montoFinanciar, totalIntereses, modal) {
            const canvas = modal.querySelector('#chart-hipotecario');
            if (!canvas) return;
            
            // Verificar que Chart.js esté disponible
            if (typeof Chart === 'undefined') {
                console.warn("Chart.js no está disponible");
                return;
            }
            
            const ctx = canvas.getContext('2d');
            
            // Destruir gráfico anterior si existe
            if (canvas.chart) {
                canvas.chart.destroy();
            }
            
            // Crear gráfico
            canvas.chart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Capital', 'Intereses'],
                    datasets: [{
                        data: [montoFinanciar, totalIntereses],
                        backgroundColor: [
                            'rgba(52, 152, 219, 0.7)',
                            'rgba(231, 76, 60, 0.7)'
                        ],
                        borderColor: [
                            'rgba(52, 152, 219, 1)',
                            'rgba(231, 76, 60, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const value = context.raw;
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = ((value / total) * 100).toFixed(1);
                                    
                                    const formatoMoneda = new Intl.NumberFormat('es-CO', {
                                        style: 'currency',
                                        currency: 'COP',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                    });
                                    
                                    return `${context.label}: ${formatoMoneda.format(value)} (${percentage}%)`;
                                }
                            }
                        }
                    }
                }
            });
        }
        
        /**
         * Calcula la cuota mensual de un préstamo
         * @param {number} monto - Monto del préstamo
         * @param {number} tasaMensual - Tasa de interés mensual en decimal
         * @param {number} plazo - Plazo en meses
         * @returns {number} Cuota mensual
         */
        function calcularCuotaMensual(monto, tasaMensual, plazo) {
            if (tasaMensual === 0) {
                return monto / plazo;
            }
            return monto * tasaMensual * Math.pow(1 + tasaMensual, plazo) / (Math.pow(1 + tasaMensual, plazo) - 1);
        }
        
        /**
         * Muestra un mensaje al usuario
         * @param {string} mensaje - Texto del mensaje
         * @param {string} tipo - Tipo de mensaje (success, error, info, warning)
         */
        function mostrarMensaje(mensaje, tipo) {
            if (typeof window.mostrarToast === 'function') {
                window.mostrarToast(mensaje, tipo);
            } else if (typeof window.mostrarMensaje === 'function') {
                window.mostrarMensaje(mensaje, tipo);
            } else {
                alert(mensaje);
            }
        }
    });
})();
