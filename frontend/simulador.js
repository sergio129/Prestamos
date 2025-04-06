// Asegurar que la función buscarSimulaciones sea accesible globalmente
window.buscarSimulaciones = function() {
    console.log("Función de búsqueda iniciada");
    
    const identificacion = document.getElementById('search-id')?.value;
    const searchResultsContainer = document.getElementById('search-results');
    const resultsTable = document.getElementById('results-table')?.querySelector('tbody');
    
    if (!identificacion) {
        window.mostrarToast("Ingrese un número de identificación para buscar", "error");
        return;
    }
    
    if (!searchResultsContainer || !resultsTable) {
        console.error("No se encontraron elementos para mostrar resultados");
        window.mostrarToast("Error al mostrar resultados de búsqueda", "error");
        return;
    }
    
    // Mostrar un mensaje de "Cargando..." mientras se realiza la búsqueda
    resultsTable.innerHTML = '<tr><td colspan="7" style="text-align:center;">Buscando simulaciones...</td></tr>';
    searchResultsContainer.classList.remove('hidden');
    
    fetch(`http://localhost:3000/buscar-simulaciones?id=${identificacion}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la respuesta: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Limpiar tabla de resultados
            resultsTable.innerHTML = '';
            
            if (data.simulaciones && data.simulaciones.length > 0) {
                // Mostrar resultados
                data.simulaciones.forEach(sim => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${sim.identificacion}</td>
                        <td>${sim.nombre}</td>
                        <td>${formatoPeso.format(sim.monto)}</td>
                        <td>${sim.plazo}</td>
                        <td>${sim.interesMensual}%</td>
                        <td>${sim.fecha || 'N/A'}</td>
                        <td class="action-buttons">
                            <button class="btn-small btn-view view-btn" data-id="${sim.id}">Ver</button>
                            <button class="btn-small btn-delete delete-btn" data-id="${sim.id}">Eliminar</button>
                        </td>
                    `;
                    resultsTable.appendChild(row);
                });
                
                // Agregar event listeners a los botones
                document.querySelectorAll('.view-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const simId = this.getAttribute('data-id');
                        mostrarDetalleSimulacion(simId);
                    });
                });
                
                document.querySelectorAll('.delete-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const simId = this.getAttribute('data-id');
                        eliminarSimulacion(simId);
                    });
                });
                
                window.mostrarToast(`Se encontraron ${data.simulaciones.length} simulaciones`, "success");
            } else {
                // No se encontraron resultados
                resultsTable.innerHTML = `
                    <tr>
                        <td colspan="7" style="text-align:center; padding:20px;">
                            No se encontraron simulaciones para esta identificación
                        </td>
                    </tr>
                `;
                window.mostrarToast("No se encontraron simulaciones", "info");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultsTable.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align:center; padding:20px;">
                        Error al buscar simulaciones
                    </td>
                </tr>
            `;
            window.mostrarToast("Error al buscar simulaciones", "error");
        });
};

// También asegurar que la función mostrarToast sea accesible globalmente si no lo es
if (typeof window.mostrarToast !== 'function') {
    window.mostrarToast = function(mensaje, tipo = "success") {
        // Eliminar toast anteriores
        const toastExistente = document.getElementById('toast');
        if (toastExistente) {
            toastExistente.remove();
        }
        
        // Crear el toast
        const toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = `toast toast-${tipo}`;
        
        // Iconos según el tipo de mensaje
        let icono = '';
        switch(tipo) {
            case 'success': icono = '✅'; break;
            case 'error': icono = '❌'; break;
            case 'info': icono = 'ℹ️'; break;
            default: icono = '✅';
        }
        
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-icon">${icono}</span>
                <span class="toast-message">${mensaje}</span>
            </div>
            <span class="toast-close">×</span>
        `;
        
        // Agregar el toast al DOM
        document.body.appendChild(toast);
        
        // Mostrar el toast
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Configurar evento para cerrar el toast
        const closeBtn = toast.querySelector('.toast-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                toast.classList.remove('show');
                setTimeout(() => {
                    toast.remove();
                }, 300);
            });
        }
        
        // Ocultar automáticamente después de 3 segundos
        setTimeout(() => {
            if (document.getElementById('toast')) {
                toast.classList.remove('show');
                setTimeout(() => {
                    if (document.getElementById('toast')) {
                        toast.remove();
                    }
                }, 300);
            }
        }, 3000);
    };
}

document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const loanForm = document.getElementById('loan-form');
    const interesMensualInput = document.getElementById('interes-mensual');
    const interesAnualEl = document.getElementById('interes-anual');
    const resultsContainer = document.getElementById('results');
    const cuotaMensualEl = document.getElementById('cuota-mensual');
    const totalPagarEl = document.getElementById('total-pagar');
    const totalInteresesEl = document.getElementById('total-intereses');
    const saveBtn = document.getElementById('save-btn');
    const saveMessage = document.getElementById('save-message');
    
    // Referencias para búsqueda y tabla de amortización
    const searchBtn = document.getElementById('search-btn');
    const searchIdBtn = document.getElementById('search-id-btn');
    const showAmortizationBtn = document.getElementById('show-amortization-btn');
    const hideAmortizationBtn = document.getElementById('hide-amortization-btn');
    const amortizationTableContainer = document.getElementById('amortization-table-container');
    
    // Referencias a modales
    const saveModal = document.getElementById('save-modal');
    const searchModal = document.getElementById('search-modal');
    
    // Variables para almacenar los resultados del cálculo
    let resultadoActual = {};
    let tablaAmortizacion = [];
    
    // Formatear como pesos colombianos
    const formatoPeso = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    });
    
    // Event listeners
    if (interesMensualInput && interesAnualEl) {
        interesMensualInput.addEventListener('input', actualizarTasaAnual);
        actualizarTasaAnual();
    }
    
    if (loanForm) {
        loanForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calcularPrestamo();
        });
    }
    
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            if (saveModal) {
                abrirModal(saveModal);
            } else {
                mostrarToast("Error: No se encontró el modal de guardado", "error");
            }
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (searchModal) {
                abrirModal(searchModal);
            } else {
                mostrarToast("Error: No se encontró el modal de búsqueda", "error");
            }
        });
    }
    
    // Asegurar que el botón de búsqueda en el modal funcione
    if (searchIdBtn) {
        searchIdBtn.addEventListener('click', function() {
            buscarSimulaciones();
        });
    } else {
        console.error("No se encontró el botón de búsqueda en el modal");
    }
    
    // Permitir búsqueda con Enter en el campo de búsqueda
    const searchIdInput = document.getElementById('search-id');
    if (searchIdInput) {
        searchIdInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                buscarSimulaciones();
            }
        });
    }
    
    if (showAmortizationBtn) {
        showAmortizationBtn.addEventListener('click', function() {
            mostrarTablaAmortizacion();
        });
    }
    
    if (hideAmortizationBtn && amortizationTableContainer) {
        hideAmortizationBtn.addEventListener('click', function() {
            amortizationTableContainer.classList.add('hidden');
        });
    }
    
    // Cerrar modales
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', function() {
            cerrarModales();
        });
    });
    
    // Event listener para el formulario de guardado
    const saveForm = document.getElementById('save-form');
    if (saveForm) {
        saveForm.addEventListener('submit', function(e) {
            e.preventDefault();
            guardarSimulacion();
        });
    }
    
    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', function(e) {
        if (saveModal && e.target === saveModal) {
            cerrarModales();
        } else if (searchModal && e.target === searchModal) {
            cerrarModales();
        }
    });
    
    // Función para mostrar toast - usada en lugar de alerts
    window.mostrarToast = function(mensaje, tipo = "success") {
        // Eliminar toast anteriores
        const toastExistente = document.getElementById('toast');
        if (toastExistente) {
            toastExistente.remove();
        }
        
        // Crear el toast
        const toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = `toast toast-${tipo}`;
        
        // Iconos según el tipo de mensaje
        let icono = '';
        switch(tipo) {
            case 'success': icono = '✅'; break;
            case 'error': icono = '❌'; break;
            case 'info': icono = 'ℹ️'; break;
            default: icono = '✅';
        }
        
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-icon">${icono}</span>
                <span class="toast-message">${mensaje}</span>
            </div>
            <span class="toast-close">×</span>
        `;
        
        // Agregar el toast al DOM
        document.body.appendChild(toast);
        
        // Mostrar el toast
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Configurar evento para cerrar el toast
        const closeBtn = toast.querySelector('.toast-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                toast.classList.remove('show');
                setTimeout(() => {
                    toast.remove();
                }, 300);
            });
        }
        
        // Ocultar automáticamente después de 3 segundos
        setTimeout(() => {
            if (document.getElementById('toast')) {
                toast.classList.remove('show');
                setTimeout(() => {
                    if (document.getElementById('toast')) {
                        toast.remove();
                    }
                }, 300);
            }
        }, 3000);
    };
    
    // Función para abrir modal
    function abrirModal(modal) {
        if (modal) {
            modal.classList.remove('hidden');
        }
    }
    
    // Función para cerrar todos los modales
    function cerrarModales() {
        if (saveModal) saveModal.classList.add('hidden');
        if (searchModal) searchModal.classList.add('hidden');
    }
    
    // Función para actualizar la tasa anual basada en la mensual
    function actualizarTasaAnual() {
        if (!interesMensualInput || !interesAnualEl) return;
        
        const tasaMensual = parseFloat(interesMensualInput.value) || 0;
        
        // Calcular tasa anual (fórmula de interés compuesto)
        const tasaAnual = (Math.pow(1 + tasaMensual/100, 12) - 1) * 100;
        
        // Mostrar con dos decimales
        interesAnualEl.textContent = tasaAnual.toFixed(2) + '%';
    }
    
    // Función para calcular el préstamo
    function calcularPrestamo() {
        const monto = parseFloat(document.getElementById('monto')?.value || 0);
        const plazo = parseInt(document.getElementById('plazo')?.value || 0);
        const interesMensual = parseFloat(document.getElementById('interes-mensual')?.value || 0);
        
        // Validar entradas
        if (monto <= 0 || plazo <= 0 || interesMensual <= 0) {
            mostrarToast("Por favor, complete todos los campos con valores válidos", "error");
            return;
        }
        
        // Convertir interés mensual a decimal
        const interesMensualDecimal = interesMensual / 100;
        
        // Calcular cuota mensual: P × ( i / (1 - (1 + i)^-n) )
        const cuotaMensual = monto * (interesMensualDecimal / (1 - Math.pow(1 + interesMensualDecimal, -plazo)));
        
        // Calcular totales
        const totalPagar = cuotaMensual * plazo;
        const totalIntereses = totalPagar - monto;
        
        // Mostrar resultados si los elementos existen
        if (cuotaMensualEl) cuotaMensualEl.textContent = formatoPeso.format(cuotaMensual);
        if (totalPagarEl) totalPagarEl.textContent = formatoPeso.format(totalPagar);
        if (totalInteresesEl) totalInteresesEl.textContent = formatoPeso.format(totalIntereses);
        
        // Calcular tabla de amortización
        calcularTablaAmortizacion(monto, interesMensualDecimal, cuotaMensual, plazo);
        
        // Guardar resultados para usar al guardar la simulación
        resultadoActual = {
            monto: monto,
            plazo: plazo,
            interesMensual: interesMensual,
            interesAnual: parseFloat(interesAnualEl?.textContent || "0"),
            cuotaMensual: cuotaMensual,
            totalPagar: totalPagar,
            totalIntereses: totalIntereses
        };
        
        // Mostrar sección de resultados
        if (resultsContainer) resultsContainer.classList.remove('hidden');
        
        // Mostrar toast de éxito
        mostrarToast("Cálculo realizado con éxito", "success");
    }
    
    // Función para calcular la tabla de amortización
    function calcularTablaAmortizacion(monto, interesMensual, cuotaMensual, plazo) {
        let saldo = monto;
        tablaAmortizacion = [];
        
        for (let i = 1; i <= plazo; i++) {
            // Calcular interés y capital de la cuota actual
            const interesCuota = saldo * interesMensual;
            const capitalCuota = cuotaMensual - interesCuota;
            
            // Actualizar saldo
            saldo -= capitalCuota;
            
            // Si es la última cuota, ajustar para evitar pequeñas diferencias por redondeo
            if (i === plazo) {
                saldo = 0;
            }
            
            // Guardar información de la cuota
            tablaAmortizacion.push({
                numeroCuota: i,
                capital: capitalCuota,
                interes: interesCuota,
                cuota: cuotaMensual,
                saldo: saldo
            });
        }
    }
    
    // Función para mostrar la tabla de amortización
    function mostrarTablaAmortizacion() {
        if (!amortizationTableContainer) {
            mostrarToast("Error al mostrar la tabla de amortización", "error");
            return;
        }
        
        if (tablaAmortizacion.length === 0) {
            mostrarToast("Primero debe calcular un préstamo", "error");
            return;
        }
        
        // Obtener referencia a la tabla
        const amortizationTable = document.getElementById('amortization-table')?.querySelector('tbody');
        if (!amortizationTable) {
            mostrarToast("Error al encontrar la tabla de amortización", "error");
            return;
        }
        
        // Limpiar tabla existente
        amortizationTable.innerHTML = '';
        
        // Agregar filas a la tabla
        tablaAmortizacion.forEach(cuota => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${cuota.numeroCuota}</td>
                <td>${formatoPeso.format(cuota.capital)}</td>
                <td>${formatoPeso.format(cuota.interes)}</td>
                <td>${formatoPeso.format(cuota.cuota)}</td>
                <td>${formatoPeso.format(cuota.saldo)}</td>
            `;
            amortizationTable.appendChild(row);
        });
        
        // Mostrar la tabla
        amortizationTableContainer.classList.remove('hidden');
        
        // Mostrar toast de éxito
        mostrarToast("Tabla de amortización generada", "success");
    }
    
    // Función para guardar la simulación
    function guardarSimulacion() {
        // Verificar que haya un resultado para guardar
        if (!resultadoActual.monto) {
            mostrarToast("Primero debe calcular un préstamo", "error");
            cerrarModales();
            return;
        }
        
        // Obtener datos del cliente
        const identificacion = document.getElementById('identificacion')?.value;
        const nombre = document.getElementById('nombre')?.value;
        
        if (!identificacion || !nombre) {
            mostrarToast("Por favor complete todos los campos", "error");
            return;
        }
        
        // Preparar datos completos para guardar
        const simulacionCompleta = {
            ...resultadoActual,
            identificacion: identificacion,
            nombre: nombre,
            fecha: new Date().toISOString().split('T')[0],
            amortizacion: tablaAmortizacion
        };
        
        // Enviar datos al backend
        fetch('http://localhost:3000/guardar-simulacion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(simulacionCompleta)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .then(data => {
            // Mostrar mensaje de éxito
            mostrarToast("Simulación guardada con éxito", "success");
            cerrarModales();
            
            // Limpiar formulario de guardado
            if (document.getElementById('identificacion')) document.getElementById('identificacion').value = '';
            if (document.getElementById('nombre')) document.getElementById('nombre').value = '';
        })
        .catch(error => {
            console.error('Error:', error);
            mostrarToast("Error al guardar la simulación", "error");
        });
    }
    
    // Nueva función para mostrar detalle de simulación en modal
    function mostrarDetalleSimulacion(id) {
        console.log("Mostrando detalle de simulación:", id);
        
        fetch(`http://localhost:3000/obtener-simulacion?id=${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener detalles');
                }
                return response.json();
            })
            .then(data => {
                if (!data.simulacion) {
                    throw new Error('No se encontró la simulación');
                }
                
                const sim = data.simulacion;
                const detailModal = document.getElementById('detail-modal');
                const detailContainer = document.getElementById('simulation-detail');
                
                if (!detailModal || !detailContainer) {
                    mostrarToast("Error al mostrar los detalles", "error");
                    return;
                }
                
                // Crear contenido HTML para los detalles de la simulación
                let detailHTML = `
                    <div class="simulation-header">
                        <h3>Detalles de la Simulación</h3>
                        <div class="simulation-info">
                            <div class="simulation-info-item">
                                <span class="label">ID Cliente:</span>
                                <span class="value">${sim.identificacion}</span>
                            </div>
                            <div class="simulation-info-item">
                                <span class="label">Nombre:</span>
                                <span class="value">${sim.nombre}</span>
                            </div>
                            <div class="simulation-info-item">
                                <span class="label">Monto:</span>
                                <span class="value">${formatoPeso.format(sim.monto)}</span>
                            </div>
                            <div class="simulation-info-item">
                                <span class="label">Plazo:</span>
                                <span class="value">${sim.plazo} meses</span>
                            </div>
                            <div class="simulation-info-item">
                                <span class="label">Tasa mensual:</span>
                                <span class="value">${sim.interesMensual}%</span>
                            </div>
                            <div class="simulation-info-item">
                                <span class="label">Tasa anual:</span>
                                <span class="value">${sim.interesAnual}%</span>
                            </div>
                            <div class="simulation-info-item">
                                <span class="label">Cuota mensual:</span>
                                <span class="value">${formatoPeso.format(sim.cuotaMensual)}</span>
                            </div>
                            <div class="simulation-info-item">
                                <span class="label">Total a pagar:</span>
                                <span class="value">${formatoPeso.format(sim.totalPagar)}</span>
                            </div>
                            <div class="simulation-info-item">
                                <span class="label">Total intereses:</span>
                                <span class="value">${formatoPeso.format(sim.totalIntereses)}</span>
                            </div>
                            <div class="simulation-info-item">
                                <span class="label">Fecha:</span>
                                <span class="value">${sim.fecha || 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                    <div class="amortization-section">
                        <h4 class="amortization-title">TABLA DE AMORTIZACIÓN</h4>
                        <div class="table-responsive">
                            <table class="detail-table">
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
                
                // Agregar filas de amortización si existen
                if (sim.amortizacion && sim.amortizacion.length > 0) {
                    sim.amortizacion.forEach(cuota => {
                        detailHTML += `
                            <tr>
                                <td>${cuota.numeroCuota}</td>
                                <td>${formatoPeso.format(cuota.capital)}</td>
                                <td>${formatoPeso.format(cuota.interes)}</td>
                                <td>${formatoPeso.format(cuota.cuota)}</td>
                                <td>${formatoPeso.format(cuota.saldo)}</td>
                            </tr>
                        `;
                    });
                } else {
                    detailHTML += `
                        <tr>
                            <td colspan="5" style="text-align:center; padding:20px;">
                                No hay datos de amortización disponibles
                            </td>
                        </tr>
                    `;
                }
                
                detailHTML += `
                                </tbody>
                            </table>
                        </div>
                    </div>
                `;
                
                // Actualizar contenido del modal
                detailContainer.innerHTML = detailHTML;
                
                // Mostrar modal
                detailModal.classList.remove('hidden');
                
                // Configurar el botón para cerrar el modal
                document.querySelector('.btn-close-detail').addEventListener('click', function() {
                    detailModal.classList.add('hidden');
                });
                
                // Cerrar modal al hacer clic en X
                detailModal.querySelector('.close-modal').addEventListener('click', function() {
                    detailModal.classList.add('hidden');
                });
                
                // Cerrar modal al hacer clic fuera del contenido
                detailModal.addEventListener('click', function(e) {
                    if (e.target === detailModal) {
                        detailModal.classList.add('hidden');
                    }
                });
            })
            .catch(error => {
                console.error("Error al mostrar detalles:", error);
                mostrarToast("No se pudieron cargar los detalles", "error");
            });
    }
    
    // Nueva función para eliminar simulación
    function eliminarSimulacion(id) {
        console.log("Eliminando simulación:", id);
        
        // Crear un toast de confirmación personalizado
        const confirmToast = document.createElement('div');
        confirmToast.className = 'confirm-toast';
        confirmToast.innerHTML = `
            <div class="confirm-toast-content">
                <p>¿Está seguro de eliminar esta simulación?</p>
                <div class="confirm-toast-buttons">
                    <button class="confirm-yes">Sí, eliminar</button>
                    <button class="confirm-no">Cancelar</button>
                </div>
            </div>
        `;
        document.body.appendChild(confirmToast);
        
        // Mostrar el toast
        setTimeout(() => {
            confirmToast.classList.add('show');
        }, 10);
        
        // Manejadores de eventos para los botones
        confirmToast.querySelector('.confirm-yes').addEventListener('click', function() {
            // Eliminar el toast de confirmación
            confirmToast.remove();
            
            // Realizar la eliminación
            fetch(`http://localhost:3000/eliminar-simulacion?id=${id}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al eliminar');
                }
                return response.json();
            })
            .then(data => {
                mostrarToast("Simulación eliminada correctamente", "success");
                
                // Refrescar la lista de simulaciones
                buscarSimulaciones();
            })
            .catch(error => {
                console.error("Error al eliminar:", error);
                mostrarToast("Error al eliminar la simulación", "error");
            });
        });
        
        confirmToast.querySelector('.confirm-no').addEventListener('click', function() {
            // Solo eliminar el toast de confirmación
            confirmToast.classList.remove('show');
            setTimeout(() => {
                confirmToast.remove();
            }, 300);
        });
    }
    
    // Función para cargar una simulación guardada
    function cargarSimulacion(id) {
        fetch(`http://localhost:3000/obtener-simulacion?id=${id}`)
            .then(response => response.json())
            .then(data => {
                if (data.simulacion) {
                    // Cargar datos en el formulario
                    document.getElementById('monto').value = data.simulacion.monto;
                    document.getElementById('plazo').value = data.simulacion.plazo;
                    document.getElementById('interes-mensual').value = data.simulacion.interesMensual;
                    
                    // Calcular el préstamo con estos datos
                    calcularPrestamo();
                    
                    // Si tiene tabla de amortización, cargarla
                    if (data.simulacion.amortizacion) {
                        tablaAmortizacion = data.simulacion.amortizacion;
                        mostrarTablaAmortizacion();
                    }
                    
                    // Cerrar el modal de búsqueda
                    cerrarModales();
                    
                    // Mostrar mensaje
                    mostrarToast(`Simulación cargada para ${data.simulacion.nombre}`, "success");
                } else {
                    mostrarToast("No se pudo cargar la simulación", "error");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                mostrarToast("Error al cargar la simulación", "error");
            });
    }
});
