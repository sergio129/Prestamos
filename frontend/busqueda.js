/**
 * Script independiente para manejar la búsqueda de simulaciones
 */

// Función de búsqueda autónoma
function buscarSimulacionesDirecto() {
    console.log("Ejecutando búsqueda directa");
    
    // Obtener elementos
    const identificacionInput = document.getElementById('search-id');
    const searchResultsContainer = document.getElementById('search-results');
    const resultsTableBody = document.querySelector('#results-table tbody');
    
    if (!identificacionInput) {
        console.error("No se encontró el campo de identificación");
        mostrarMensajeToast("Error: No se encontró el campo de identificación", "error");
        return;
    }
    
    const identificacion = identificacionInput.value.trim();
    
    if (!identificacion) {
        mostrarMensajeToast("Por favor ingrese un número de identificación", "error");
        return;
    }
    
    console.log("Buscando cliente con ID:", identificacion);
    
    if (!searchResultsContainer || !resultsTableBody) {
        console.error("No se encontraron los elementos de resultados");
        mostrarMensajeToast("Error: No se pueden mostrar los resultados", "error");
        return;
    }
    
    // Mostrar cargando
    resultsTableBody.innerHTML = '<tr><td colspan="7" style="text-align:center;">Buscando simulaciones...</td></tr>';
    searchResultsContainer.classList.remove('hidden');
    
    // Realizar la búsqueda
    fetch(`http://localhost:3000/buscar-simulaciones?id=${identificacion}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Datos de respuesta:", data);
            
            // Limpiar tabla
            resultsTableBody.innerHTML = '';
            
            if (data.simulaciones && data.simulaciones.length > 0) {
                // Mostrar resultados
                data.simulaciones.forEach(sim => {
                    const row = document.createElement('tr');
                    
                    // Formato de moneda
                    const formatoMoneda = new Intl.NumberFormat('es-CO', {
                        style: 'currency',
                        currency: 'COP',
                        minimumFractionDigits: 0
                    });
                    
                    const montoFormateado = formatoMoneda.format(sim.monto);
                    
                    row.innerHTML = `
                        <td>${sim.identificacion || ''}</td>
                        <td>${sim.nombre || ''}</td>
                        <td>${montoFormateado}</td>
                        <td>${sim.plazo || ''}</td>
                        <td>${sim.interesMensual || ''}%</td>
                        <td>${sim.fecha || 'N/A'}</td>
                        <td class="action-buttons">
                            <button class="btn-small btn-view" onclick="verSimulacion('${sim.id}')">Ver</button>
                            <button class="btn-small btn-delete" onclick="eliminarSimulacion('${sim.id}')">Eliminar</button>
                        </td>
                    `;
                    resultsTableBody.appendChild(row);
                });
                
                mostrarMensajeToast(`Se encontraron ${data.simulaciones.length} simulaciones`, "success");
            } else {
                // No hay resultados
                resultsTableBody.innerHTML = `
                    <tr>
                        <td colspan="7" style="text-align:center;">
                            No se encontraron simulaciones para esta identificación
                        </td>
                    </tr>
                `;
                mostrarMensajeToast("No se encontraron simulaciones", "info");
            }
        })
        .catch(error => {
            console.error("Error en la búsqueda:", error);
            resultsTableBody.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align:center; color:red;">
                        Error al buscar simulaciones: ${error.message}
                    </td>
                </tr>
            `;
            mostrarMensajeToast("Error al buscar simulaciones", "error");
        });
}

// Función para ver detalles de simulación
function verSimulacion(id) {
    console.log("Ver simulación:", id);
    
    fetch(`http://localhost:3000/obtener-simulacion?id=${id}`)
        .then(response => response.json())
        .then(data => {
            if (data.simulacion) {
                const sim = data.simulacion;
                
                // Obtener el modal de detalles
                const detalleModal = document.getElementById('detail-modal');
                const detalleContenido = document.getElementById('simulation-detail');
                
                if (!detalleModal || !detalleContenido) {
                    mostrarMensajeToast("Error: No se encontró el modal de detalles", "error");
                    return;
                }
                
                // Formatear moneda
                const formatoMoneda = new Intl.NumberFormat('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                    minimumFractionDigits: 0
                });
                
                // Crear el contenido HTML para el modal
                let contenidoHTML = `
                    <div class="detail-header">
                        <h3>SIMULACIÓN DE PRÉSTAMO</h3>
                        <p class="detail-date">Fecha: ${sim.fecha || 'N/A'}</p>
                    </div>
                    
                    <div class="detail-section client-info">
                        <h4>Información del Cliente</h4>
                        <div class="detail-grid">
                            <div class="detail-item">
                                <span class="detail-label">ID Cliente:</span>
                                <span class="detail-value">${sim.identificacion}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Nombre:</span>
                                <span class="detail-value">${sim.nombre}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="detail-section loan-info">
                        <h4>Detalles del Préstamo</h4>
                        <div class="detail-grid">
                            <div class="detail-item">
                                <span class="detail-label">Monto del préstamo:</span>
                                <span class="detail-value">${formatoMoneda.format(sim.monto)}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Plazo:</span>
                                <span class="detail-value">${sim.plazo} meses</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Tasa de interés mensual:</span>
                                <span class="detail-value">${sim.interesMensual}%</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Tasa de interés anual:</span>
                                <span class="detail-value">${sim.interesAnual}%</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Cuota mensual:</span>
                                <span class="detail-value">${formatoMoneda.format(sim.cuotaMensual)}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Total a pagar:</span>
                                <span class="detail-value">${formatoMoneda.format(sim.totalPagar)}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Total intereses:</span>
                                <span class="detail-value">${formatoMoneda.format(sim.totalIntereses)}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="detail-section amortization">
                        <h4>TABLA DE AMORTIZACIÓN</h4>
                        <div class="table-responsive">
                            <table class="amortization-table">
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
                
                // Agregar filas de la tabla de amortización
                if (sim.amortizacion && sim.amortizacion.length > 0) {
                    sim.amortizacion.forEach(cuota => {
                        contenidoHTML += `
                            <tr>
                                <td>${cuota.numeroCuota}</td>
                                <td>${formatoMoneda.format(cuota.capital)}</td>
                                <td>${formatoMoneda.format(cuota.interes)}</td>
                                <td>${formatoMoneda.format(cuota.cuota)}</td>
                                <td>${formatoMoneda.format(cuota.saldo)}</td>
                            </tr>
                        `;
                    });
                } else {
                    contenidoHTML += `
                        <tr>
                            <td colspan="5" class="no-data">No hay datos de amortización disponibles</td>
                        </tr>
                    `;
                }
                
                contenidoHTML += `
                                </tbody>
                            </table>
                        </div>
                    </div>
                `;
                
                // Actualizar el contenido del modal
                detalleContenido.innerHTML = contenidoHTML;
                
                // Mostrar el modal
                detalleModal.classList.remove('hidden');
                
                // Agregar evento para cerrar el modal
                document.querySelectorAll('#detail-modal .close-modal, #detail-modal .btn-close-detail').forEach(btn => {
                    btn.addEventListener('click', function() {
                        detalleModal.classList.add('hidden');
                    });
                });
                
                // Cerrar el modal al hacer clic fuera del contenido
                detalleModal.addEventListener('click', function(e) {
                    if (e.target === detalleModal) {
                        detalleModal.classList.add('hidden');
                    }
                });
            } else {
                mostrarMensajeToast("No se encontró la simulación", "error");
            }
        })
        .catch(error => {
            console.error("Error al cargar detalles:", error);
            mostrarMensajeToast("Error al cargar los detalles de la simulación", "error");
        });
}

// Función para eliminar simulación
function eliminarSimulacion(id) {
    console.log("Eliminar simulación:", id);
    
    // Crear un toast de confirmación personalizado
    const confirmToast = document.createElement('div');
    confirmToast.className = 'confirm-toast';
    confirmToast.innerHTML = `
        <div class="confirm-toast-content">
            <p>¿Desea eliminar esta simulación?</p>
            <div class="confirm-toast-buttons">
                <button class="confirm-yes">Eliminar</button>
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
        confirmToast.classList.remove('show');
        setTimeout(() => confirmToast.remove(), 300);
        
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
            mostrarMensajeToast("Simulación eliminada correctamente", "success");
            
            // Refrescar la lista de simulaciones
            buscarSimulacionesDirecto();
        })
        .catch(error => {
            console.error("Error al eliminar:", error);
            mostrarMensajeToast("Error al eliminar la simulación", "error");
        });
    });
    
    confirmToast.querySelector('.confirm-no').addEventListener('click', function() {
        // Solo eliminar el toast de confirmación
        confirmToast.classList.remove('show');
        setTimeout(() => confirmToast.remove(), 300);
    });
}

// Función simple para mostrar mensajes toast
function mostrarMensajeToast(mensaje, tipo) {
    // Si existe la función global mostrarToast, usarla
    if (typeof window.mostrarToast === 'function') {
        window.mostrarToast(mensaje, tipo);
        return;
    }
    
    console.log(`Toast (${tipo}): ${mensaje}`);
    
    // Si no existe, crear un toast simple
    const toast = document.createElement('div');
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.backgroundColor = tipo === 'error' ? '#e74c3c' : 
                                tipo === 'success' ? '#2ecc71' : '#3498db';
    toast.style.color = 'white';
    toast.style.padding = '12px 20px';
    toast.style.borderRadius = '4px';
    toast.style.zIndex = '9999';
    toast.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    toast.textContent = mensaje;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        if (document.body.contains(toast)) {
            document.body.removeChild(toast);
        }
    }, 3000);
}

// Configurar eventos al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    console.log("Script de búsqueda cargado");
    
    // Configurar botón de búsqueda
    const searchButton = document.getElementById('search-id-btn');
    if (searchButton) {
        searchButton.onclick = function(e) {
            e.preventDefault();
            console.log("Botón de búsqueda presionado");
            buscarSimulacionesDirecto();
        };
        console.log("Evento de botón de búsqueda configurado");
    } else {
        console.error("No se encontró el botón de búsqueda");
    }
    
    // Configurar búsqueda con Enter
    const searchInput = document.getElementById('search-id');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                buscarSimulacionesDirecto();
            }
        });
        console.log("Evento de búsqueda por Enter configurado");
    }
    
    // Exponer funciones globalmente
    window.buscarSimulaciones = buscarSimulacionesDirecto;
    window.verSimulacion = verSimulacion;
    window.eliminarSimulacion = eliminarSimulacion;
});
