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
            createPuzzleScreen(dynamicContainer);
        });
    }
});



const gameRoot = document.getElementById('dynamic-container');

function createPuzzleScreen() {
    // Asegúrate de que 'gameRoot' esté definido y sea el contenedor principal del juego
    gameRoot.innerHTML = '';
    
    // Contenedor de fondo general (background-level-container)
    const puzzleScreen = document.createElement('div');
    puzzleScreen.classList.add('background-level-container', 'd-flex', 'justify-content-center', 'align-items-center', 'py-5');
    puzzleScreen.id = 'puzzle-screen';
    
    // 1. Contenedor principal del juego (juego_box, que tendrá el fondo de la cueva)
    const puzzleBox = document.createElement('div');
    puzzleBox.classList.add('juego_box', 'puzzle-cave-container', 'container', 'text-center'); 
    
    // 💡 NUEVO CONTENEDOR INTERNO
    const innerPuzzleBox = document.createElement('div');
    // Le añadimos una clase para poder darle estilo/posicionamiento en CSS
    innerPuzzleBox.classList.add('inner-puzzle-box', 'puzzle-grid-layout'); 
    
    
    // 2. Contenedor para el Título y la Ecuación (HEADER)
    const headerContent = document.createElement('div');
    headerContent.classList.add('header-content', 'grid-area-header'); 
    // ... (El contenido del header se mantiene igual)
    const title = document.createElement('h2');
    title.textContent = 'Encuentra el valor de x';
    title.classList.add('puzzle-title', 'fs-30'); 
    
    const equation = document.createElement('p');
    equation.textContent = '3x + 5 = 11';
    equation.classList.add('puzzle-equation', 'fs-40'); 
    
    headerContent.appendChild(title);
    headerContent.appendChild(equation);


    // 3. Contenedor de Opciones (WRAPPER)
    const optionsWrapper = document.createElement('div');
    optionsWrapper.id = 'options-container-wrapper'; 
    optionsWrapper.classList.add('grid-area-options'); 

    const optionsData = [2, 3, 4, 5];
    
    optionsData.forEach(value => {
        const optionDiv = document.createElement('button');
        optionDiv.classList.add('option', 'btn-option-puzzle', `pos-op-${value}`); 
        optionDiv.setAttribute('data-value', value); 
        optionDiv.textContent = value.toString();
        optionDiv.addEventListener('click', () => handleOptionClick(value)); 
        optionsWrapper.appendChild(optionDiv); 
    });


    // 4. Personaje (CHARACTER)
    const characterImage = document.createElement('img');
    characterImage.id = 'puzzle-character'; 
    characterImage.src = ZERO_IMAGE_SRC;
    characterImage.alt = "Zero pensando";
    // Mantenemos los atributos, aunque se recomienda usar CSS para esto
    characterImage.width = 150; 
    characterImage.height = 200;

    characterImage.classList.add(
        'grid-area-character', 
        'img-fluid', 
        'd-block', 
        'mx-auto', 
        'zero-puzzle-image'
    ); 

    // 5. Ensamblar la vista: Todo dentro de innerPuzzleBox
    innerPuzzleBox.appendChild(headerContent);
    innerPuzzleBox.appendChild(optionsWrapper);
    innerPuzzleBox.appendChild(characterImage); 
    
    // 6. El contenedor interno va dentro de puzzleBox
    puzzleBox.appendChild(innerPuzzleBox);

    puzzleScreen.appendChild(puzzleBox); 
    gameRoot.appendChild(puzzleScreen);

    // --- Fin del Bloque Modificado ---
}



















function showDefeatScreen(container) {
    
    const gameOverScreen = document.createElement('div');

    gameOverScreen.className = 'background-level-container d-flex align-items-center justify-content-center';

   
    const defeatContainer = document.createElement('div');
    
    defeatContainer.className = 'defeat-container justify-content-center text-center p-4 rounded shadow-lg';
    
    const title = document.createElement('h2');
   
    title.className = 'text-white mb-4';
    title.textContent = 'ZERO FUE DERROTADO...';

    
    
    const imageWrapper = document.createElement('div');
   
    imageWrapper.className = 'image-wrapper mb-4';
    

    
    const image = document.createElement('img');
    image.src = DEFEAT_IMAGE_SRC;
    image.alt = 'Zero Derrotado';
   
    image.className = 'img-fluid';
   
    
    imageWrapper.appendChild(image);


    const buttonsDiv = document.createElement('div');
    
    buttonsDiv.className = 'd-flex justify-content-center gap-3 mt-4';
    
   
    const btnContinue = document.createElement('button');
    
    btnContinue.className = 'btn btn-warning btn-lg';
    btnContinue.textContent = 'CONTINUAR?';
   
    
    btnContinue.addEventListener('click', () => {
        gameOverScreen.remove(); 
        introContent.classList.remove('d-none');
    });

    // Botón ABANDONAR
    const btnAbandon = document.createElement('button');
    
    btnAbandon.className = 'btn btn-danger btn-lg';
    btnAbandon.textContent = 'ABANDONAR';
    
   
    btnAbandon.addEventListener('click', () => {
        history.back();
    });

    // ... (el resto de la función para adjuntar elementos sigue igual)
    buttonsDiv.appendChild(btnContinue);
    buttonsDiv.appendChild(btnAbandon);
   
    defeatContainer.appendChild(title);
    defeatContainer.appendChild(imageWrapper);
    defeatContainer.appendChild(buttonsDiv);
    
    gameOverScreen.appendChild(defeatContainer);
    container.appendChild(gameOverScreen);
}