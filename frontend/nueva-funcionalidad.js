/**
 * Script para nuevas funcionalidades del proyecto
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Inicializando nuevas funcionalidades...");

    // Ejemplo: Agregar un botón dinámico
    const container = document.querySelector('.container');
    if (container) {
        const newButton = document.createElement('button');
        newButton.textContent = "Nueva Funcionalidad";
        newButton.className = "btn btn-primary";
        newButton.addEventListener('click', function () {
            alert("Nueva funcionalidad activada!");
        });
        container.appendChild(newButton);
    }
});
