const words = getWordList();
let currentWord = words[Math.floor(Math.random() * words.length)];
console.log(`DEBUG PURPOSES ONLY! THE CURRENT WORD IS: ${currentWord}`);


const board = document.getElementById("board");
const message = document.getElementById("message");
const guessInput = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");

let guesses = [];

function initializeBoard() {
    const letterBoxSize = 45;
    guessInput.setAttribute('maxLength', `${currentWord.length}`);

    for (let i = 0; i < currentWord.length * 6; i++) { // 6 guesses x 5 letters
        board.style.gridTemplateColumns = `repeat(${currentWord.length}, ${letterBoxSize}px)`;
        const letterDiv = document.createElement("div");
        letterDiv.className = "letter";
        letterDiv.style.width = `${letterBoxSize}px`
        letterDiv.style.height = `${letterBoxSize}px`
        board.appendChild(letterDiv);
    }
}

function updateBoard() {
    const letters = document.querySelectorAll(".letter");
    for (let i = 0; i < guesses.length; i++) {
        for (let j = 0; j < guesses[i].length; j++) {
            const letterDiv = letters[i * currentWord.length + j];
            letterDiv.textContent = guesses[i][j];
            if (guesses[i][j] === currentWord[j]) {
                letterDiv.style.backgroundColor = "#28a745"; // correct position
            } else if (currentWord.includes(guesses[i][j])) {
                letterDiv.style.backgroundColor = "#ffc107"; // wrong position
            } else {
                letterDiv.style.backgroundColor = "#dc3545"; // incorrect letter
            }
        }
    }
}

function checkGuess() {
    const guess = guessInput.value.toLowerCase();
    const wordLength = currentWord.length;

    if (guess.length !== currentWord.length) {
        message.textContent = `Please enter a ${wordLength}-letter word.`;
        return;
    }

    // if (!words.includes(guess)) {
    //     message.textContent = "Word not recognized.";
    //     return;
    // }

    guesses.push(guess);
    updateBoard();

    if (guess === currentWord) {
        message.textContent = "Congratulations! You guessed the word!";
        guessButton.disabled = true;
    } else if (guesses.length === 6) {
        message.textContent = `Game Over! The word was ${currentWord}.`;
        guessButton.disabled = true;
    } else {
        message.textContent = "Try again!";
    }

    guessInput.value = "";
    guessInput.focus();
}

message.textContent = "."
guessButton.addEventListener("click", checkGuess);
guessInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        checkGuess();
    }
});

initializeBoard();

function getWordList() {
    return [
        "water", "cycle", "cloud", "rain", "hydro", "steam", "solid", "gas", "liquid", 
        "oxygen", "neon", "argon", "sodium", "zinc", "xenon", "boron", "water", "carbon",
        "snow", "hail", "mist", "drip", "flow", "spray", "flood", "storm",
        "vapor", "drops", "pools", "waves", "glaze", "frost", "sleet", "delta", "basin",
        "gully", "brook", "swale", "evaporation", "condensation", "trans", "infil", "runoff"
    ]
}