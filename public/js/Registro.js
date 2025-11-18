document.addEventListener('DOMContentLoaded', function () {
   
    const form = document.querySelector('form');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('password_confirmation');
    
    // Crear el div para el error
    let matchErrorDiv = document.createElement('div');
    matchErrorDiv.className = 'text-danger mt-2 error-message';
    matchErrorDiv.id = 'password-match-error';
    matchErrorDiv.style.display = 'none'; 

    
    if (confirmPasswordInput) {
        confirmPasswordInput.parentNode.insertBefore(matchErrorDiv, confirmPasswordInput.nextSibling);
    }

    // 2. Escuchar el evento de envío del formulario
    if (form) {
        form.addEventListener('submit', function (event) {
            
            // 3. Comparar las contraseñas
            if (passwordInput && confirmPasswordInput && passwordInput.value !== confirmPasswordInput.value) {
                
                // Las contraseñas NO coinciden:
                event.preventDefault(); 
                
                matchErrorDiv.textContent = 'Las contraseñas no coinciden.';
                matchErrorDiv.style.display = 'block';
                matchErrorDiv.style.fontFamily= 'VT323'
                confirmPasswordInput.focus();
            } else {
                // Si coinciden o si alguno de los campos es nulo (por seguridad)
                matchErrorDiv.style.display = 'none';
            }
        });
        
        // Opcional: Ocultar el error mientras el usuario teclea
        if (passwordInput && confirmPasswordInput) {
             [passwordInput, confirmPasswordInput].forEach(input => {
                input.addEventListener('input', function() {
                    if (matchErrorDiv.style.display === 'block') {
                        matchErrorDiv.style.display = 'none';
                    }
                });
            });
        }
    }
});