/**
 * Módulo para guardar y sincronizar datos financieros del usuario
 * Permite que el dashboard use datos reales basados en las interacciones del usuario
 */

(function() {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Inicializando módulo de datos financieros...');
        
        // Observar cambios en el formulario de capacidad de endeudamiento
        const observarFormularioCapacidad = function() {
            // Esperar a que exista el formulario
            const intervalo = setInterval(() => {
                const calcularCapacidadBtn = document.querySelector('#calcular-capacidad');
                
                if (calcularCapacidadBtn) {
                    clearInterval(intervalo);
                    
                    // Agregar evento al botón de calcular capacidad
                    calcularCapacidadBtn.addEventListener('click', guardarDatosFinancieros);
                }
            }, 1000);
        };
        
        // Observar formulario principal de préstamos
        const observarFormularioPrestamo = function() {
            // Obtener el formulario principal de préstamos
            const loanForm = document.getElementById('loan-form');
            
            if (loanForm) {
                // Guardar los datos del préstamo cuando se calcule
                loanForm.addEventListener('submit', function(e) {
                    // Prevenir la acción predeterminada solo para guardar los datos
                    // No interrumpir el funcionamiento normal
                    
                    // Guardar simulación
                    const monto = parseFloat(document.getElementById('monto')?.value) || 0;
                    const plazo = parseInt(document.getElementById('plazo')?.value) || 0;
                    const interes = parseFloat(document.getElementById('interes-mensual')?.value) || 0;
                    
                    if (monto > 0 && plazo > 0 && interes > 0) {
                        guardarSimulacion('Préstamo Personal', monto, plazo, interes);
                    }
                });
            }
        };
        
        /**
         * Guarda los datos financieros del usuario desde el formulario de capacidad
         */
        function guardarDatosFinancieros() {
            try {
                const capacidadModal = document.getElementById('capacidad-modal');
                
                if (!capacidadModal) return;
                
                const ingresoPrincipal = parseFloat(capacidadModal.querySelector('#ingreso-principal')?.value) || 0;
                const ingresosAdicionales = parseFloat(capacidadModal.querySelector('#ingresos-adicionales')?.value) || 0;
                const gastoVivienda = parseFloat(capacidadModal.querySelector('#gasto-vivienda')?.value) || 0;
                const gastoServicios = parseFloat(capacidadModal.querySelector('#gasto-servicios')?.value) || 0;
                const gastoAlimentacion = parseFloat(capacidadModal.querySelector('#gasto-alimentacion')?.value) || 0;
                const gastoTransporte = parseFloat(capacidadModal.querySelector('#gasto-transporte')?.value) || 0;
                const deudaTC = parseFloat(capacidadModal.querySelector('#deuda-tc')?.value) || 0;
                const deudaPrestamos = parseFloat(capacidadModal.querySelector('#deuda-prestamos')?.value) || 0;
                const deudaVehiculo = parseFloat(capacidadModal.querySelector('#deuda-vehiculo')?.value) || 0;
                const otrasDeudas = parseFloat(capacidadModal.querySelector('#otras-deudas')?.value) || 0;
                
                // Verificar si hay suficientes datos para considerar válido
                if (ingresoPrincipal > 0) {
                    const datos = {
                        ingresos: {
                            principal: ingresoPrincipal,
                            adicionales: ingresosAdicionales
                        },
                        gastos: {
                            vivienda: gastoVivienda,
                            servicios: gastoServicios,
                            alimentacion: gastoAlimentacion,
                            transporte: gastoTransporte
                        },
                        deudas: {
                            tc: deudaTC,
                            prestamos: deudaPrestamos,
                            vehiculo: deudaVehiculo,
                            otras: otrasDeudas
                        },
                        fecha: new Date().toISOString()
                    };
                    
                    // Guardar datos para uso futuro
                    localStorage.setItem('datosFinancieros', JSON.stringify(datos));
                    
                    console.log('Datos financieros guardados:', datos);
                    
                    // Actualizar el dashboard si está disponible
                    if (window.actualizarDashboard) {
                        window.actualizarDashboard();
                    }
                }
            } catch (e) {
                console.error('Error al guardar datos financieros:', e);
            }
        }
        
        /**
         * Guarda una simulación de préstamo
         * @param {string} tipo - Tipo de préstamo
         * @param {number} monto - Monto del préstamo
         * @param {number} plazo - Plazo en meses
         * @param {number} tasa - Tasa de interés mensual
         */
        function guardarSimulacion(tipo, monto, plazo, tasa) {
            try {
                // Obtener simulaciones existentes
                const simulacionesExistentes = JSON.parse(localStorage.getItem('simulaciones') || '[]');
                
                // Crear nueva simulación
                const nuevaSimulacion = {
                    id: Date.now().toString(),
                    tipo: tipo,
                    monto: monto,
                    plazo: plazo,
                    tasa: tasa,
                    fecha: new Date().toISOString()
                };
                
                // Calcular cuota para referencia
                const tasaDecimal = tasa / 100;
                nuevaSimulacion.cuota = calcularCuotaMensual(monto, tasaDecimal, plazo);
                
                // Añadir al principio (para tener las más recientes primero)
                simulacionesExistentes.unshift(nuevaSimulacion);
                
                // Limitar a 10 simulaciones
                const simulacionesLimitadas = simulacionesExistentes.slice(0, 10);
                
                // Guardar en localStorage
                localStorage.setItem('simulaciones', JSON.stringify(simulacionesLimitadas));
                
                console.log('Simulación guardada:', nuevaSimulacion);
                
                // Actualizar el dashboard si está disponible
                if (window.actualizarDashboard) {
                    window.actualizarDashboard();
                }
            } catch (e) {
                console.error('Error al guardar simulación:', e);
            }
        }
        
        /**
         * Calcula la cuota mensual de un préstamo
         * @param {number} monto - Monto del préstamo
         * @param {number} tasaMensual - Tasa de interés mensual en formato decimal
         * @param {number} plazo - Plazo en meses
         * @returns {number} Cuota mensual
         */
        function calcularCuotaMensual(monto, tasaMensual, plazo) {
            if (tasaMensual === 0) {
                return monto / plazo;
            }
            return monto * tasaMensual * Math.pow(1 + tasaMensual, plazo) / (Math.pow(1 + tasaMensual, plazo) - 1);
        }
        
        // Iniciar observadores
        observarFormularioCapacidad();
        observarFormularioPrestamo();
        
        // Exponer función para actualizar el dashboard
        window.actualizarDashboard = function() {
            // Disparar evento personalizado para que el dashboard se actualice
            document.dispatchEvent(new CustomEvent('datosFinancierosActualizados'));
        };
        
        // Exponer función para obtener datos financieros
        window.obtenerDatosFinancieros = function() {
            try {
                const datosGuardados = localStorage.getItem('datosFinancieros');
                
                if (datosGuardados) {
                    return JSON.parse(datosGuardados);
                }
            } catch (e) {
                console.error('Error al obtener datos financieros:', e);
            }
            
            return null;
        };
        
        // Exponer función para obtener simulaciones
        window.obtenerSimulaciones = function() {
            try {
                const simulacionesGuardadas = localStorage.getItem('simulaciones');
                
                if (simulacionesGuardadas) {
                    return JSON.parse(simulacionesGuardadas);
                }
            } catch (e) {
                console.error('Error al obtener simulaciones:', e);
            }
            
            return [];
        };
    });
})();
