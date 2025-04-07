(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const entidadesModal = document.getElementById('entidades-modal');
        const entidadesList = document.getElementById('entidades-list');
        const entidadesDetails = document.getElementById('entidades-details');
        const reviewsContainer = document.getElementById('reviews-container');

        if (!entidadesModal || !entidadesList || !entidadesDetails || !reviewsContainer) {
            console.error('No se encontraron los elementos necesarios en el DOM.');
            return;
        }

        entidadesList.addEventListener('click', function(event) {
            const target = event.target.closest('.entidad-item');
            if (!target) return;

            const entidadId = target.getAttribute('data-id');
            const entidad = obtenerEntidadPorId(entidadId);

            if (!entidad) {
                console.error('Entidad no encontrada.');
                return;
            }

            // Mostrar detalles de la entidad
            mostrarDetallesEntidad(entidad);
        });

        /**
         * Obtiene una entidad por su ID
         * @param {string} id - ID de la entidad
         * @returns {Object|null} Entidad encontrada o null
         */
        function obtenerEntidadPorId(id) {
            // Aquí deberías implementar la lógica para obtener la entidad por su ID
            // Por ejemplo, buscar en un array de entidades precargadas
            return null; // Cambiar por la lógica real
        }

        /**
         * Muestra los detalles de una entidad
         * @param {Object} entidad - Entidad seleccionada
         */
        function mostrarDetallesEntidad(entidad) {
            if (!entidad) return;

            // Actualizar contenido de detalles
            entidadesDetails.querySelector('.entidad-nombre').textContent = entidad.nombre;
            entidadesDetails.querySelector('.entidad-descripcion').textContent = entidad.descripcion;

            // Mostrar opiniones
            if (entidad.opiniones && entidad.opiniones.length > 0) {
                entidad.opiniones.forEach(opinion => {
                    const reviewStars = Array(5).fill('').map((_, i) => {
                        return i < opinion.calificacion 
                            ? '<i class="fas fa-star"></i>' 
                            : '<i class="far fa-star"></i>';
                    }).join('');
                    
                    const review = document.createElement('div');
                    review.className = 'review-card';
                    review.innerHTML = `
                        <div class="review-header">
                            <div class="review-user">${opinion.usuario}</div>
                            <div class="review-rating">
                                <div class="stars">${reviewStars}</div>
                                <span>${opinion.calificacion}.0</span>
                            </div>
                        </div>
                        <div class="review-content">
                            <p>${opinion.comentario}</p>
                        </div>
                    `;
                    
                    reviewsContainer.appendChild(review);
                });
            } else {
                reviewsContainer.innerHTML = `
                    <div class="no-reviews">
                        <i class="far fa-comment-dots"></i>
                        <p>No hay opiniones disponibles para esta entidad.</p>
                    </div>
                `;
            }
            
            // Añadir eventos a los botones de simular
            entidadesModal.querySelectorAll('.btn-simulate').forEach(btn => {
                btn.addEventListener('click', function() {
                    const tipo = this.getAttribute('data-tipo');
                    simularProducto(entidad, tipo);
                });
            });
            
            // Mostrar la sección de detalles
            entidadesModal.querySelector('#entidades-results').classList.add('hidden');
            entidadesModal.querySelector('#entidades-comparison').classList.add('hidden');
            entidadesModal.querySelector('#entidades-details').classList.remove('hidden');
        }
        
        /**
         * Simula un producto específico de una entidad
         * @param {Object} entidad - Entidad seleccionada
         * @param {string} tipo - Tipo de producto a simular
         */
        function simularProducto(entidad, tipo) {
            if (!entidad || !entidad.productos || !entidad.productos[tipo]) {
                mostrarMensaje("No se puede simular este producto", "error");
                return;
            }
            
            const producto = entidad.productos[tipo];
            
            // Actualizar valores en el simulador principal
            const monto = document.getElementById('monto');
            const plazo = document.getElementById('plazo');
            const interesMensual = document.getElementById('interes-mensual');
            
            if (monto && plazo && interesMensual) {
                // Usar el punto medio del rango para monto y plazo
                const montoPromedio = (producto.montoMinimo + producto.montoMaximo) / 2;
                const plazoPromedio = Math.min(Math.max(producto.plazoMinimo, 12), producto.plazoMaximo);
                const tasaPromedio = (producto.tasaMinima + producto.tasaMaxima) / 2;
                
                // Actualizar valores
                monto.value = montoPromedio.toFixed(0);
                plazo.value = plazoPromedio;
                interesMensual.value = (tasaPromedio / 12).toFixed(2);
                
                // Cerrar modal
                entidadesModal.classList.add('hidden');
                
                // Disparar cálculo si existe la función
                if (typeof calcularPrestamo === 'function') {
                    calcularPrestamo();
                    mostrarMensaje(`Simulando préstamo ${getProductName(tipo)} de ${entidad.nombre}`, "success");
                } else {
                    mostrarMensaje(`Valores de ${entidad.nombre} aplicados al simulador`, "success");
                }
            }
        }
        
        /**
         * Obtiene el nombre legible de un tipo de producto
         * @param {string} tipo - Código del tipo de producto
         * @returns {string} Nombre legible
         */
        function getProductName(tipo) {
            const nombres = {
                'personal': 'Préstamo Personal',
                'hipotecario': 'Crédito Hipotecario',
                'vehiculo': 'Préstamo Vehículo',
                'libranza': 'Libranza',
                'educativo': 'Crédito Educativo'
            };
            
            return nombres[tipo] || tipo.charAt(0).toUpperCase() + tipo.slice(1);
        }
        
        /**
         * Obtiene la descripción del nivel de requisitos
         * @param {number} nivel - Nivel de requisitos (1-5)
         * @returns {string} Descripción del nivel
         */
        function getNivelRequisitos(nivel) {
            const niveles = {
                1: 'Muy fácil',
                2: 'Fácil',
                3: 'Moderado',
                4: 'Exigente',
                5: 'Muy exigente'
            };
            
            return niveles[nivel] || 'Moderado';
        }
        
        /**
         * Calcula la cuota mensual de un préstamo
         * @param {number} monto - Monto del préstamo
         * @param {number} tasaMensual - Tasa de interés mensual en decimal
         * @param {number} plazo - Plazo en meses
         * @returns {number} Cuota mensual
         */
        function calcularCuotaMensual(monto, tasaMensual, plazo) {
            if (tasaMensual === 0) {
                return monto / plazo;
            }
            return monto * tasaMensual * Math.pow(1 + tasaMensual, plazo) / (Math.pow(1 + tasaMensual, plazo) - 1);
        }
        
        /**
         * Muestra un mensaje al usuario
         * @param {string} mensaje - Texto del mensaje
         * @param {string} tipo - Tipo de mensaje (success, error, info, warning)
         */
        function mostrarMensaje(mensaje, tipo) {
            if (typeof window.mostrarToast === 'function') {
                window.mostrarToast(mensaje, tipo);
            } else if (typeof window.mostrarMensaje === 'function') {
                window.mostrarMensaje(mensaje, tipo);
            } else {
                alert(mensaje);
            }
        }
    });
})();