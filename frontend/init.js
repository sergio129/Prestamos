/**
 * Script de inicialización
 * Se asegura de que todos los componentes se carguen en el orden correcto
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando aplicación...');
    
    // Verificar que Font Awesome esté disponible
    if (!document.querySelector('link[href*="font-awesome"]')) {
        console.warn('Font Awesome no detectado, añadiendo...');
        const fontAwesome = document.createElement('link');
        fontAwesome.rel = 'stylesheet';
        fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
        document.head.appendChild(fontAwesome);
    }
    
    // Verificar que Chart.js esté disponible
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js no detectado, añadiendo...');
        const chartJs = document.createElement('script');
        chartJs.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js';
        document.head.appendChild(chartJs);
    }
    
    // Iniciar comprobación de errores
    setTimeout(verificarComponentes, 500);
});

/**
 * Verifica que todos los componentes importantes estén presentes
 */
function verificarComponentes() {
    console.log('Verificando componentes...');
    
    // Verificar botón de dashboard
    const dashboardBtn = document.querySelector('.btn-dashboard-access');
    if (!dashboardBtn) {
        console.error('Botón de dashboard no encontrado, intentando recrear...');
        crearBotonDashboard();
    } else {
        console.log('Botón de dashboard encontrado');
    }
    
    // Verificar otros componentes...
}

/**
 * Crea el botón de acceso al dashboard manualmente
 */
function crearBotonDashboard() {
    const dashboardAccessBtn = document.createElement('button');
    dashboardAccessBtn.type = 'button';
    dashboardAccessBtn.className = 'btn-dashboard-access';
    dashboardAccessBtn.innerHTML = '<i class="fas fa-user-shield"></i> Mi Dashboard Financiero';
    
    // Asignar estilo manualmente en caso de problemas con CSS
    Object.assign(dashboardAccessBtn.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'linear-gradient(135deg, #1a2a6c, #b21f1f)',
        color: 'white',
        border: 'none',
        borderRadius: '30px',
        padding: '10px 20px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        zIndex: '1000',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    });
    
    // Insertar al principio del body
    document.body.insertBefore(dashboardAccessBtn, document.body.firstChild);
    
    // Configurar evento
    dashboardAccessBtn.addEventListener('click', function() {
        console.log('Click en botón de dashboard');
        
        const accessModal = document.getElementById('dashboard-access-modal');
        if (accessModal) {
            accessModal.classList.remove('hidden');
            
            // Si ya hay un PIN guardado, mostrar formulario de login, sino mostrar setup
            const hasPin = localStorage.getItem('dashboardPin');
            if (hasPin) {
                document.getElementById('login-form').classList.add('active');
                document.getElementById('login-form').classList.remove('hidden');
                document.getElementById('setup-form').classList.add('hidden');
                document.getElementById('setup-form').classList.remove('active');
                
                // Enfocar el campo de PIN
                document.getElementById('access-pin').focus();
            } else {
                document.getElementById('setup-form').classList.add('active');
                document.getElementById('setup-form').classList.remove('hidden');
                document.getElementById('login-form').classList.add('hidden');
                document.getElementById('login-form').classList.remove('active');
                
                // Enfocar el primer campo
                document.getElementById('df-ingreso-principal').focus();
            }
        } else {
            console.error('Modal de acceso no encontrado');
            alert('Estamos experimentando problemas técnicos. Por favor, recarga la página.');
        }
    });
    
    console.log('Botón de dashboard creado manualmente');
}
