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
    const cuotaMensualEl = document.getElementById('cuota-mensual');
    const totalPagarEl = document.getElementById('total-pagar');
    const totalInteresesEl = document.getElementById('total-intereses');
    const saveBtn = document.getElementById('save-btn');
    const saveMessage = document.getElementById('save-message');
    
    // Referencias específicas para la tabla de amortización
    const showAmortizationBtn = document.getElementById('show-amortization-btn');
    const hideAmortizationBtn = document.getElementById('hide-amortization-btn');
    const amortizationTableContainer = document.getElementById('amortization-table-container');
    const amortizationTableBody = document.getElementById('amortization-table')?.querySelector('tbody');
    
    // Verificar componentes de la tabla de amortización
    console.log("Verificando componentes de la tabla de amortización:");
    console.log("- Botón mostrar tabla:", showAmortizationBtn ? "Encontrado" : "NO ENCONTRADO");
    console.log("- Contenedor tabla:", amortizationTableContainer ? "Encontrado" : "NO ENCONTRADO");
    console.log("- Tabla:", document.getElementById('amortization-table') ? "Encontrada" : "NO ENCONTRADA");
    console.log("- Cuerpo tabla:", amortizationTableBody ? "Encontrado" : "NO ENCONTRADO");
    
    // Otras referencias a modales
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
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            console.log("Botón guardar presionado");
            if (saveModal) saveModal.classList.remove('hidden');
        });
    }
    
    if (document.getElementById('search-btn')) {
        document.getElementById('search-btn').addEventListener('click', function(e) {
            e.preventDefault();
            console.log("Botón buscar presionado");
            if (searchModal) searchModal.classList.remove('hidden');
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
    
    // Event listener específico para la tabla de amortización
    if (showAmortizationBtn) {
        showAmortizationBtn.addEventListener('click', function() {
            console.log("Botón de tabla de amortización presionado");
            mostrarTablaAmortizacion();
        });
    } else {
        console.error("El botón para mostrar la tabla de amortización no se encontró en el DOM");
    }
    
    if (hideAmortizationBtn && amortizationTableContainer) {
        hideAmortizationBtn.addEventListener('click', function() {
            console.log("Ocultando tabla de amortización");
            amortizationTableContainer.classList.add('hidden');
        });
    }
    
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
            if (cuotaMensualEl)
                cuotaMensualEl.textContent = formatoPeso.format(cuotaMensual);
            
            if (totalPagarEl)
                totalPagarEl.textContent = formatoPeso.format(totalPagar);
            
            if (totalInteresesEl)
                totalInteresesEl.textContent = formatoPeso.format(totalIntereses);
            
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
    
    // Función para mostrar la tabla de amortización - CORREGIDA
    function mostrarTablaAmortizacion() {
        console.log("Iniciando función mostrarTablaAmortizacion");
        
        // Verificar que el contenedor de la tabla exista
        if (!amortizationTableContainer) {
            console.error("ERROR: No se encontró el contenedor de la tabla de amortización.");
            alert("Error: No se puede mostrar la tabla de amortización.");
            return;
        }
        
        // Verificar que haya datos para mostrar
        if (tablaAmortizacion.length === 0) {
            console.error("ERROR: No hay datos de amortización para mostrar.");
            alert("Primero debe calcular un préstamo.");
            return;
        }
        
        // Obtener la referencia al cuerpo de la tabla directamente
        const tbody = document.querySelector('#amortization-table tbody');
        if (!tbody) {
            console.error("ERROR: No se encontró el cuerpo de la tabla de amortización.");
            alert("Error: No se puede mostrar la tabla de amortización.");
            return;
        }
        
        console.log("Generando tabla con", tablaAmortizacion.length, "filas");
        
        // Limpiar tabla existente
        tbody.innerHTML = '';
        
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
            tbody.appendChild(row);
        });
        
        // Mostrar la tabla
        amortizationTableContainer.classList.remove('hidden');
        console.log("Tabla de amortización mostrada correctamente");
    }
    
    // Función simple para mostrar mensajes
    function mostrarMensaje(mensaje) {
        console.log("Mensaje:", mensaje);
        alert(mensaje); // Temporalmente usamos alert para asegurar que el mensaje sea visible
    }
    
    console.log("Inicialización completada");
});
