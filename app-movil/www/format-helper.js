/**
 * Funciones auxiliares para formatear valores monetarios
 */

// Formatear resultado monetario sin afectar la entrada
function formatearMoneda(valor, decimales = 0) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: decimales,
        maximumFractionDigits: decimales
    }).format(valor);
}

// Función para aplicar el formato visual a elementos de resultado
function aplicarFormatoMoneda() {
    // Obtener todos los elementos que muestran valores monetarios
    const elementosMonetarios = document.querySelectorAll(
        '.hipoteca-card-value:not([id$="porcentaje"]):not([id$="relacion"]), ' +
        '.vehiculo-card-value:not([id$="porcentaje"]):not([id$="relacion"]), ' +
        '.leasing-card-value:not([id$="porcentaje"]):not([id$="relacion"]), ' +
        '.libranza-card-value:not([id$="porcentaje"]):not([id$="relacion"]), ' +
        '.financiero-card-value:not([id="capacidad-pago"]):not([id="nivel-endeudamiento"]):not([id="balance-financiero"])'
    );

    // Para cada elemento que debe mostrar valor monetario
    elementosMonetarios.forEach(elemento => {
        const textoValor = elemento.textContent;
        // Si ya tiene un valor numérico, lo formateamos
        if (textoValor && textoValor !== '$0') {
            // Eliminar el símbolo $ si ya existe
            const valorNumerico = parseFloat(textoValor.replace(/[$,\.]/g, ''));
            if (!isNaN(valorNumerico)) {
                elemento.textContent = formatearMoneda(valorNumerico).replace('COP', '');
            }
        }
    });
}

// Agregar clases especiales a los inputs monetarios para el estilo visual
function agregarClasesMonetarias() {
    document.querySelectorAll('input[type="number"]').forEach(input => {
        if (input.id.includes('valor') || 
            input.id.includes('monto') || 
            input.id.includes('ingresos') || 
            input.id.includes('salario') ||
            input.id.includes('gastos') ||
            input.id.includes('deudas') ||
            input.id.includes('ahorro') ||
            input.id.includes('descuentos')) {
            
            // Agregar la clase al contenedor padre para mostrar símbolo $ sin interferir con la entrada
            const parent = input.parentElement;
            parent.classList.add('monetary-input');
        }
    });
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    agregarClasesMonetarias();
    
    // Aplicar formato después de cada cálculo
    const botonesCalcular = document.querySelectorAll('.herramientas-btn');
    botonesCalcular.forEach(boton => {
        boton.addEventListener('click', function() {
            // Dar tiempo para que se actualicen los resultados
            setTimeout(aplicarFormatoMoneda, 100);
        });
    });
});
