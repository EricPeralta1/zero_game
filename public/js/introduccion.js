// Archivo: introduccion.js

document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('boton_comenzar');
    const introContent = document.getElementById('main-content-area');
    const dynamicContainer = document.getElementById('dynamic-container');

    if (startButton) {
        startButton.addEventListener('click', function() {
            // 1. Ocultar el contenido de introducción del nivel
            if (introContent) {
                introContent.classList.add('d-none');
            }

            // 2. Crear y mostrar la nueva estructura de la "Pantalla de Derrota"
            showDefeatScreen(dynamicContainer);
        });
    }
});




function showDefeatScreen(container) {
    
    const gameOverScreen = document.createElement('div');
    gameOverScreen.className = 'background-level-container d-flex align-items-center justify-content-center';
    // Aplicamos estilos en línea que simulan el fondo oscuro con opacidad (como en tu Blade original)
    gameOverScreen.style.cssText = 'background-color: rgba(0, 0, 0, 0.7); ';


    
    const defeatContainer = document.createElement('div');
    defeatContainer.className = 'defeat-container justify-content-center text-center p-4 rounded shadow-lg';
    defeatContainer.style.cssText = 'background-color: #6C757D; border: 2px solid #495057; max-width: 500px; width: 90%;';


    const title = document.createElement('h2');
    title.className = 'text-white mb-4';
    title.textContent = 'ZERO FUE DERROTADO...';
    title.style.cssText = "font-family: 'VT323', ; font-size: 24px;";
    
    
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'image-wrapper mb-4';
    imageWrapper.style.cssText = 'border: 1px solid #495057; padding: 5px; background-color: #343A40;';
    //imagenes
    const image = document.createElement('img');
    image.src = DEFEAT_IMAGE_SRC;
    image.alt = 'Zero Derrotado';
    image.className = 'img-fluid';
    image.style.cssText = 'max-height: 200px; object-fit: cover;';
    
    imageWrapper.appendChild(image);


    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'd-flex justify-content-center gap-3 mt-4';
    
    // Botón CONTINUAR
    const btnContinue = document.createElement('button');
    btnContinue.className = 'btn btn-warning btn-lg';
    btnContinue.textContent = 'CONTINUAR?';
    btnContinue.style.cssText = "font-family: 'Press Start 2P', cursive; background-color: #fd7e14; border-color: #e66a00; color: white;";
    
    btnContinue.addEventListener('click', () => {
       
        gameOverScreen.remove(); 
        
        introContent.classList.remove('d-none');
    });

    // Botón ABANDONAR
    const btnAbandon = document.createElement('button');
    btnAbandon.className = 'btn btn-danger btn-lg';
    btnAbandon.textContent = 'ABANDONAR';
    btnAbandon.style.cssText = "font-family: 'Press Start 2P', cursive; background-color: #dc3545; border-color: #bd2130; color: white;";
   
    btnAbandon.addEventListener('click', () => {
        
        history.back();
    });


    buttonsDiv.appendChild(btnContinue);
    buttonsDiv.appendChild(btnAbandon);
   
    defeatContainer.appendChild(title);
    defeatContainer.appendChild(imageWrapper);
    defeatContainer.appendChild(buttonsDiv);
    
    gameOverScreen.appendChild(defeatContainer);
    container.appendChild(gameOverScreen);
}