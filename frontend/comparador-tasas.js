/**
 * Comparador de Tasas del Mercado Financiero
 * Permite al usuario comparar tasas de diferentes entidades financieras
 */

(function() {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Inicializando comparador de tasas financieras...');
        
        // Crear botón
        const comparadorBtn = document.createElement('button');
        comparadorBtn.type = 'button';
        comparadorBtn.className = 'btn btn-comparador';
        comparadorBtn.innerHTML = '<i class="fas fa-percentage"></i> Comparador de Tasas';
        comparadorBtn.style.marginTop = '15px';
        
        // Añadir botón después del botón de capacidad
        setTimeout(function() {
            const capacidadBtn = document.querySelector('.btn-capacidad');
            if (capacidadBtn && capacidadBtn.parentNode) {
                capacidadBtn.parentNode.appendChild(comparadorBtn);
            } else {
                const loanForm = document.getElementById('loan-form');
                if (loanForm && loanForm.parentNode) {
                    loanForm.parentNode.appendChild(comparadorBtn);
                }
            }
        }, 100);
        
        // Crear modal
        const comparadorModal = document.createElement('div');
        comparadorModal.id = 'comparador-modal';
        comparadorModal.className = 'modal hidden';
        
        comparadorModal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>Comparador de Tasas del Mercado</h2>
                
                <p class="modal-description">
                    Compara las tasas de interés de diferentes entidades financieras para encontrar la mejor opción.
                </p>
                
                <div class="form-group">
                    <label for="comparador-tipo">Tipo de préstamo:</label>
                    <select id="comparador-tipo">
                        <option value="personal">Préstamo Personal</option>
                        <option value="vehiculo">Préstamo Vehículo</option>
                        <option value="hipotecario">Préstamo Hipotecario</option>
                        <option value="educativo">Préstamo Educativo</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="comparador-monto">Monto aproximado:</label>
                    <div class="input-icon">
                        <span class="currency-symbol">$</span>
                        <input type="number" id="comparador-monto" placeholder="Monto a solicitar">
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="comparador-plazo">Plazo (meses):</label>
                    <select id="comparador-plazo">
                        <option value="12">12 meses</option>
                        <option value="24">24 meses</option>
                        <option value="36" selected>36 meses</option>
                        <option value="48">48 meses</option>
                        <option value="60">60 meses</option>
                    </select>
                </div>
                
                <button id="consultar-tasas" class="btn btn-full">Consultar Tasas</button>
                
                <div id="resultado-tasas" class="hidden">
                    <h3>Tasas del Mercado - Actualizado <span id="fecha-actualizacion"></span></h3>
                    
                    <div class="tabla-tasas-container">
                        <table class="tabla-tasas">
                            <thead>
                                <tr>
                                    <th>Entidad</th>
                                    <th>Tasa E.A.</th>
                                    <th>Tasa Mensual</th>
                                    <th>Cuota Estimada</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody id="tasas-resultados">
                                <!-- Se llenará dinámicamente -->
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="tasas-disclaimer">
                        <p>* Las tasas mostradas son aproximadas y pueden variar según la evaluación crediticia y políticas de cada entidad.</p>
                        <p>* Última actualización de datos: <span id="fecha-actualizacion-footer"></span></p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(comparadorModal);
        
        // Configurar eventos
        comparadorBtn.addEventListener('click', function() {
            comparadorModal.classList.remove('hidden');
        });
        
        // Cerrar modal
        comparadorModal.querySelector('.close-modal').addEventListener('click', function() {
            comparadorModal.classList.add('hidden');
        });
        
        // Consultar tasas
        document.getElementById('consultar-tasas').addEventListener('click', function() {
            const tipoPrestamoSelect = document.getElementById('comparador-tipo');
            const tipoPrestamo = tipoPrestamoSelect.value;
            const tipoPrestamoTexto = tipoPrestamoSelect.options[tipoPrestamoSelect.selectedIndex].text;
            
            const monto = parseFloat(document.getElementById('comparador-monto').value) || 0;
            const plazo = parseInt(document.getElementById('comparador-plazo').value) || 36;
            
            if (monto <= 0) {
                mostrarMensaje("Por favor ingresa un monto válido", "error");
                return;
            }
            
            // Simulación de carga
            mostrarMensaje("Consultando tasas actuales del mercado...", "info");
            
            // Establecer fecha de actualización
            const fechaActual = new Date();
            const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
            const fechaFormateada = fechaActual.toLocaleDateString('es-CO', opciones);
            
            document.getElementById('fecha-actualizacion').textContent = fechaFormateada;
            document.getElementById('fecha-actualizacion-footer').textContent = fechaFormateada;
            
            // Simulación de respuesta (en un caso real, se obtendría de una API)
            setTimeout(function() {
                // Tasas simuladas según el tipo de préstamo
                let tasas = [];
                
                switch(tipoPrestamo) {
                    case 'personal':
                        tasas = [
                            { entidad: 'Banco A', tasaAnual: 24.5, logo: 'bank-a.png' },
                            { entidad: 'Banco B', tasaAnual: 26.8, logo: 'bank-b.png' },
                            { entidad: 'Cooperativa C', tasaAnual: 22.9, logo: 'coop-c.png' },
                            { entidad: 'Banco D', tasaAnual: 25.3, logo: 'bank-d.png' },
                            { entidad: 'Financiera E', tasaAnual: 28.7, logo: 'fin-e.png' }
                        ];
                        break;
                    case 'vehiculo':
                        tasas = [
                            { entidad: 'Banco A', tasaAnual: 18.2, logo: 'bank-a.png' },
                            { entidad: 'Banco B', tasaAnual: 19.5, logo: 'bank-b.png' },
                            { entidad: 'Cooperativa C', tasaAnual: 17.8, logo: 'coop-c.png' },
                            { entidad: 'Banco D', tasaAnual: 18.9, logo: 'bank-d.png' },
                            { entidad: 'Financiera E', tasaAnual: 20.5, logo: 'fin-e.png' }
                        ];
                        break;
                    case 'hipotecario':
                        tasas = [
                            { entidad: 'Banco A', tasaAnual: 11.2, logo: 'bank-a.png' },
                            { entidad: 'Banco B', tasaAnual: 12.5, logo: 'bank-b.png' },
                            { entidad: 'Cooperativa C', tasaAnual: 11.8, logo: 'coop-c.png' },
                            { entidad: 'Banco D', tasaAnual: 10.9, logo: 'bank-d.png' },
                            { entidad: 'Financiera E', tasaAnual: 13.5, logo: 'fin-e.png' }
                        ];
                        break;
                    case 'educativo':
                        tasas = [
                            { entidad: 'Banco A', tasaAnual: 14.5, logo: 'bank-a.png' },
                            { entidad: 'Banco B', tasaAnual: 15.8, logo: 'bank-b.png' },
                            { entidad: 'Cooperativa C', tasaAnual: 13.9, logo: 'coop-c.png' },
                            { entidad: 'Banco D', tasaAnual: 16.3, logo: 'bank-d.png' },
                            { entidad: 'Financiera E', tasaAnual: 14.7, logo: 'fin-e.png' }
                        ];
                        break;
                }
                
                // Calcular tasa mensual y cuotas, ordenar por tasa
                tasas.forEach(tasa => {
                    // Convertir tasa anual a mensual
                    tasa.tasaMensual = Math.pow(1 + tasa.tasaAnual/100, 1/12) - 1;
                    // Calcular cuota mensual
                    tasa.cuotaMensual = calcularCuotaMensual(monto, tasa.tasaMensual, plazo);
                });
                
                // Ordenar por tasa anual (menor a mayor)
                tasas.sort((a, b) => a.tasaAnual - b.tasaAnual);
                
                // Formatear moneda
                const formatoMoneda = new Intl.NumberFormat('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                    minimumFractionDigits: 0
                });
                
                // Mostrar resultados
                const tablaResultados = document.getElementById('tasas-resultados');
                tablaResultados.innerHTML = '';
                
                tasas.forEach((tasa, index) => {
                    const fila = document.createElement('tr');
                    
                    // Destacar la mejor tasa
                    if (index === 0) {
                        fila.className = 'mejor-tasa';
                    }
                    
                    fila.innerHTML = `
                        <td>
                            <div class="entidad-info">
                                <span class="entidad-nombre">${tasa.entidad}</span>
                                ${index === 0 ? '<span class="mejor-tasa-badge">Mejor tasa</span>' : ''}
                            </div>
                        </td>
                        <td>${tasa.tasaAnual.toFixed(2)}%</td>
                        <td>${(tasa.tasaMensual * 100).toFixed(2)}%</td>
                        <td>${formatoMoneda.format(tasa.cuotaMensual)}</td>
                        <td>
                            <button class="btn-aplicar-tasa" data-tasa="${(tasa.tasaMensual * 100).toFixed(2)}">
                                Aplicar
                            </button>
                        </td>
                    `;
                    
                    tablaResultados.appendChild(fila);
                });
                
                // Evento para aplicar tasa seleccionada
                document.querySelectorAll('.btn-aplicar-tasa').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const tasaSeleccionada = parseFloat(this.getAttribute('data-tasa'));
                        
                        // Aplicar tasa al formulario principal
                        document.getElementById('interes-mensual').value = tasaSeleccionada;
                        
                        // También actualizar monto y plazo si tienen valores
                        const montoComparador = document.getElementById('comparador-monto').value;
                        const plazoComparador = document.getElementById('comparador-plazo').value;
                        
                        if (montoComparador) {
                            document.getElementById('monto').value = montoComparador;
                        }
                        
                        if (plazoComparador) {
                            document.getElementById('plazo').value = plazoComparador;
                        }
                        
                        // Cerrar modal
                        comparadorModal.classList.add('hidden');
                        
                        // Mensaje de confirmación
                        mostrarMensaje(`Tasa de ${tasaSeleccionada}% aplicada al simulador`, "success");
                    });
                });
                
                // Mostrar resultados
                document.getElementById('resultado-tasas').classList.remove('hidden');
            }, 1500);
        });
        
        /**
         * Calcular cuota mensual de un préstamo
         * @param {number} monto - Monto del préstamo
         * @param {number} tasaMensual - Tasa de interés mensual en decimal
         * @param {number} plazo - Plazo en meses
         * @returns {number} Cuota mensual
         */
        function calcularCuotaMensual(monto, tasaMensual, plazo) {
            return monto * (tasaMensual * Math.pow(1 + tasaMensual, plazo)) / (Math.pow(1 + tasaMensual, plazo) - 1);
        }
        
        /**
         * Mostrar mensaje al usuario
         * @param {string} mensaje - Texto del mensaje
         * @param {string} tipo - Tipo de mensaje (success, error, info)
         */
        function mostrarMensaje(mensaje, tipo) {
            // Usar la función global si existe
            if (typeof window.mostrarMensaje === 'function') {
                window.mostrarMensaje(mensaje, tipo);
                return;
            }
            
            // Implementación básica si no existe función global
            alert(mensaje);
        }
    });
})();
