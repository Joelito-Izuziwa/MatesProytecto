const cards = document.querySelectorAll('.memory-card');
const restartButton = document.getElementById('restart-button');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.concept === secondCard.dataset.concept;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function shuffleCards() {
    cards.forEach(card => {
        const randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos;
    });
}

function restartGame() {
    // Volver a poner todas las cartas boca abajo
    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard); // Reactivar clic en todas las cartas
    });

    // Rebarajar las cartas
    shuffleCards();

    // Reiniciar el estado del tablero
    resetBoard();
}

// Barajar las cartas al inicio
shuffleCards();

// Añadir el evento a las cartas
cards.forEach(card => card.addEventListener('click', flipCard));

// Añadir el evento al botón de reinicio
restartButton.addEventListener('click', restartGame);
