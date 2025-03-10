const goat = document.getElementById('goat');
const leaf = document.getElementById('leaf');
const bike = document.getElementById('bike');
const scoreDisplay = document.getElementById('score');
let score = 0;
let goatPosition = 125; // Starting position of the goat
let gameInterval;
let gameSpeed = 5; // Speed of object movement

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && goatPosition > 0) {
        goatPosition -= 20;
    } else if (event.key === 'ArrowRight' && goatPosition < 250) {
        goatPosition += 20;
    }
    goat.style.left = goatPosition + 'px';
});

function startGame() {
    // Place initial objects randomly
    resetObject(leaf);
    resetObject(bike);

    gameInterval = setInterval(() => {
        moveObject(leaf);
        moveObject(bike);
        checkCollision();
    }, 20);
}

function moveObject(object) {
    let objectTop = parseInt(window.getComputedStyle(object).getPropertyValue('top'));

    if (objectTop >= 600) { // If object goes off the screen, reset it
        resetObject(object);
    } else {
        object.style.top = objectTop + gameSpeed + 'px';
    }
}

function resetObject(object) {
    object.style.top = '-50px'; // Start off-screen at the top
    object.style.left = Math.floor(Math.random() * 250) + 'px'; // Random X position
}

function checkCollision() {
    let goatRect = goat.getBoundingClientRect();
    let leafRect = leaf.getBoundingClientRect();
    let bikeRect = bike.getBoundingClientRect();

    // Check collision with leaf
    if (goatRect.left < leafRect.right &&
        goatRect.right > leafRect.left &&
        goatRect.top < leafRect.bottom &&
        goatRect.bottom > leafRect.top) {
        score++;
        scoreDisplay.textContent = score;
        resetObject(leaf);
    }

    // Check collision with bike
    if (goatRect.left < bikeRect.right &&
        goatRect.right > bikeRect.left &&
        goatRect.top < bikeRect.bottom &&
        goatRect.bottom > bikeRect.top) {
        clearInterval(gameInterval);
        alert('Game Over! Your Score: ' + score);
        window.location.reload(); // Reloads the page to reset the game
    }
}

// Start the game as soon as the script is loaded
startGame();
