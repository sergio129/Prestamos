// Simplified JavaScript to fix interaction issues
document.addEventListener('DOMContentLoaded', function() {
    console.log("Inicializando simulador de préstamos...");
    
    // Referencias a elementos DOM básicos
    const loanForm = document.getElementById('loan-form');
    const montoInput = document.getElementById('monto');
    const plazoInput = document.getElementById('plazo');
    const interesMensualInput = document.getElementById('interes-mensual');
    const interesAnualEl = document.getElementById('interes-anual');
    const resultsContainer = document.getElementById('results');
    
    // Registrar en consola si falta algún elemento esencial
    if (!loanForm) console.error("No se encontró el formulario de préstamos");
    if (!montoInput) console.error("No se encontró el campo de monto");
    if (!plazoInput) console.error("No se encontró el campo de plazo");
    if (!interesMensualInput) console.error("No se encontró el campo de interés mensual");
    
    // Variables para cálculos
    let resultadoActual = {};
    let tablaAmortizacion = [];
    
    // Formatear como pesos colombianos
    const formatoPeso = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    });
    
    // Actualizar tasa anual cuando cambia la tasa mensual
    if (interesMensualInput && interesAnualEl) {
        interesMensualInput.addEventListener('input', actualizarTasaAnual);
        actualizarTasaAnual(); // Actualizar inicialmente
    }
    
    // Event listeners principales
    if (loanForm) {
        loanForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log("Formulario enviado - calculando préstamo...");
            calcularPrestamo();
        });
    }
    
    // Listeners para botones adicionales - solo si existen
    if (document.getElementById('save-btn')) {
        document.getElementById('save-btn').addEventListener('click', function() {
            console.log("Botón guardar presionado");
            const modal = document.getElementById('save-modal');
            if (modal) modal.classList.remove('hidden');
        });
    }
    
    if (document.getElementById('search-btn')) {
        document.getElementById('search-btn').addEventListener('click', function(e) {
            e.preventDefault();
            console.log("Botón buscar presionado");
            const modal = document.getElementById('search-modal');
            if (modal) modal.classList.remove('hidden');
        });
    }
    
    // Cerrar modales
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            console.log("Cerrando modal");
            const modales = document.querySelectorAll('.modal');
            modales.forEach(modal => modal.classList.add('hidden'));
        });
    });
    
    // Función para actualizar tasa anual
    function actualizarTasaAnual() {
        if (!interesMensualInput || !interesAnualEl) return;
        
        const tasaMensual = parseFloat(interesMensualInput.value) || 0;
        const tasaAnual = (Math.pow(1 + tasaMensual/100, 12) - 1) * 100;
        interesAnualEl.textContent = tasaAnual.toFixed(2) + '%';
    }
    
    // Función para calcular préstamo
    function calcularPrestamo() {
        if (!montoInput || !plazoInput || !interesMensualInput) {
            console.error("Faltan campos necesarios para el cálculo");
            return;
        }
        
        const monto = parseFloat(montoInput.value);
        const plazo = parseInt(plazoInput.value);
        const interesMensual = parseFloat(interesMensualInput.value);
        
        console.log("Calculando préstamo con valores:", {monto, plazo, interesMensual});
        
        // Validar entradas
        if (isNaN(monto) || monto <= 0 || isNaN(plazo) || plazo <= 0 || isNaN(interesMensual) || interesMensual <= 0) {
            mostrarMensaje("Por favor, complete todos los campos con valores válidos");
            return;
        }
        
        try {
            // Calcular
            const interesMensualDecimal = interesMensual / 100;
            const cuotaMensual = monto * (interesMensualDecimal / (1 - Math.pow(1 + interesMensualDecimal, -plazo)));
            const totalPagar = cuotaMensual * plazo;
            const totalIntereses = totalPagar - monto;
            
            // Mostrar resultados
            if (document.getElementById('cuota-mensual'))
                document.getElementById('cuota-mensual').textContent = formatoPeso.format(cuotaMensual);
            
            if (document.getElementById('total-pagar'))
                document.getElementById('total-pagar').textContent = formatoPeso.format(totalPagar);
            
            if (document.getElementById('total-intereses'))
                document.getElementById('total-intereses').textContent = formatoPeso.format(totalIntereses);
            
            // Guardar para uso posterior
            resultadoActual = {
                monto, plazo, interesMensual,
                cuotaMensual, totalPagar, totalIntereses
            };
            
            // Calcular tabla de amortización para uso posterior
            calcularTablaAmortizacion(monto, interesMensualDecimal, cuotaMensual, plazo);
            
            // Mostrar sección de resultados
            if (resultsContainer) resultsContainer.classList.remove('hidden');
            
            console.log("Cálculo completado con éxito");
        } catch (error) {
            console.error("Error en el cálculo:", error);
            mostrarMensaje("Ocurrió un error al calcular el préstamo");
        }
    }
    
    // Función para calcular la tabla de amortización
    function calcularTablaAmortizacion(monto, interesMensual, cuotaMensual, plazo) {
        let saldo = monto;
        tablaAmortizacion = [];
        
        for (let i = 1; i <= plazo; i++) {
            const interesCuota = saldo * interesMensual;
            const capitalCuota = cuotaMensual - interesCuota;
            saldo -= capitalCuota;
            
            if (i === plazo) saldo = 0; // Ajuste para última cuota
            
            tablaAmortizacion.push({
                numeroCuota: i,
                capital: capitalCuota,
                interes: interesCuota,
                cuota: cuotaMensual,
                saldo: saldo
            });
        }
    }
    
    // Función simple para mostrar mensajes
    function mostrarMensaje(mensaje) {
        console.log("Mensaje:", mensaje);
        alert(mensaje); // Temporalmente usamos alert para asegurar que el mensaje sea visible
    }
    
    console.log("Inicialización completada");
});
