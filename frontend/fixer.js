/**
 * Script auxiliar para corregir problemas con funciones no disponibles
 */

// Asegurar que buscarSimulaciones esté disponible globalmente
window.buscarSimulaciones = function() {
    console.log("Función de búsqueda ejecutada desde fixer.js");
    
    const identificacion = document.getElementById('search-id')?.value;
    
    if (!identificacion) {
        mostrarMensaje("Ingrese un número de identificación para buscar", "error");
        return;
    }
    
    const searchResultsContainer = document.getElementById('search-results');
    const resultsTable = document.getElementById('results-table')?.querySelector('tbody');
    
    if (!searchResultsContainer || !resultsTable) {
        mostrarMensaje("Error al preparar resultados", "error");
        return;
    }
    
    // Mostrar indicador de carga
    resultsTable.innerHTML = '<tr><td colspan="7" style="text-align:center;">Buscando simulaciones...</td></tr>';
    searchResultsContainer.classList.remove('hidden');
    
    // Realizar la búsqueda
    fetch(`/buscar-simulaciones?id=${identificacion}`)
        .then(response => response.json())
        .then(data => {
            resultsTable.innerHTML = '';
            
            if (data.simulaciones && data.simulaciones.length > 0) {
                // Mostrar resultados
                data.simulaciones.forEach(sim => {
                    const row = document.createElement('tr');
                    const monto = typeof sim.monto === 'number' ? sim.monto.toLocaleString('es-CO') : sim.monto;
                    
                    row.innerHTML = `
                        <td>${sim.identificacion}</td>
                        <td>${sim.nombre}</td>
                        <td>$${monto}</td>
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
                
                // Agregar eventos a los botones
                document.querySelectorAll('.view-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        mostrarMensaje("Ver simulación: " + this.getAttribute('data-id'), "info");
                    });
                });
                
                document.querySelectorAll('.delete-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        mostrarMensaje("Eliminar simulación: " + this.getAttribute('data-id'), "info");
                    });
                });
                
                mostrarMensaje(`Se encontraron ${data.simulaciones.length} simulaciones`, "success");
            } else {
                // No se encontraron resultados
                resultsTable.innerHTML = `
                    <tr>
                        <td colspan="7" style="text-align:center; padding:20px;">
                            No se encontraron simulaciones para esta identificación
                        </td>
                    </tr>
                `;
                mostrarMensaje("No se encontraron simulaciones", "info");
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
            mostrarMensaje("Error al buscar simulaciones", "error");
        });
};

// Función para mostrar mensajes tipo toast
function mostrarMensaje(mensaje, tipo = "success") {
    console.log(`Mensaje (${tipo}): ${mensaje}`);
    
    // Verificar si existe la función global mostrarToast
    if (typeof window.mostrarToast === 'function') {
        window.mostrarToast(mensaje, tipo);
        return;
    }
    
    // Crear un toast simple como respaldo
    const toast = document.createElement('div');
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.padding = '15px 25px';
    toast.style.borderRadius = '4px';
    toast.style.color = 'white';
    toast.style.fontWeight = '500';
    toast.style.zIndex = '9999';
    
    // Colores según el tipo
    if (tipo === 'error') {
        toast.style.backgroundColor = '#e74c3c';
    } else if (tipo === 'success') {
        toast.style.backgroundColor = '#2ecc71';
    } else {
        toast.style.backgroundColor = '#3498db';
    }
    
    toast.textContent = mensaje;
    document.body.appendChild(toast);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        if (document.body.contains(toast)) {
            document.body.removeChild(toast);
        }
    }, 3000);
}

// Verificar al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    console.log("Fixer.js cargado con éxito");
    
    // Agregar eventos a botones críticos
    const searchIdBtn = document.getElementById('search-id-btn');
    if (searchIdBtn) {
        searchIdBtn.addEventListener('click', function() {
            window.buscarSimulaciones();
        });
        console.log("Evento de búsqueda configurado correctamente");
    }
});
