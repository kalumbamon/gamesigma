// HANGMAN

// Global variables:

// Array of 5-letter words for the game
const words = ["apple", "grape", "lemon", "mango", "peach", "berry", "melon", "plums", ];

// Variable to store the currently selected word
let selectedWord = "";

// Health counter initialized to 5
let health = 5;

// Score counter initialized to 0
let score = 0;

// Function to initialize the game
function setupGame() {
    // Call function to generate a random word
    selectedWord = generateRandomWord();
    // Set up the initial lives display in HTML
    health = 5;
    score = 0;
    updateLivesDisplay();
    setupWordDisplay();
}

// Function to generate a random word
function generateRandomWord() {
    // Generate a random index within the range of the words array
    const randomIndex = Math.floor(Math.random() * words.length);
    // Select a word from the array using the random index
    return words[randomIndex];
}

// Function to update the hangman drawing based on health
function updateHangman() {

    // Check health value and show corresponding parts
    if (health === 4) {
        document.getElementById("head").style.display = "block";
        document.getElementById("torso").style.display = "block";
    } else if (health === 3) {
        document.getElementById("arm-1").style.display = "block"; // right arm
    } else if (health === 2) {
        document.getElementById("arm-2").style.display = "block"; // left arm
    } else if (health === 1) {
        document.getElementById("foot-1").style.display = "block"; // right leg
    } else if (health === 0) {
        document.getElementById("foot-2").style.display = "block"; // left leg
    }

}

// Function to update lives display
function updateLivesDisplay() {
    document.getElementById("lives").innerText = health;
}

// Function to set up initial word display
function setupWordDisplay() {
    const wordContainer = document.querySelector(".word");
    wordContainer.innerHTML = "";
    selectedWord.split("").forEach((_, i) => {
        const letterElement = document.createElement("div");
        letterElement.className = "letter";
        letterElement.id = `s-${i}`;
        letterElement.innerText = "_";
        wordContainer.appendChild(letterElement);
    });
}

// Function to handle letter guess
function checkLetter() {
    // Check game state
    if (score === selectedWord.length || health === 0) {
        updateHangman();
        updateLivesDisplay();

        setTimeout(() => {
            alert(score === selectedWord.length ? "You already won!" : "Game over!");
        }, 300);
        return;
    }

    // Get user input via prompt
    const letter = prompt("Enter a letter:").toLowerCase();
    // Validate input
    if (!letter || letter.length !== 1 || !/^[a-z]$/.test(letter)) {
        alert("Invalid input!");
        return;
    }

    // Check if the letter is in the current word
    if (selectedWord.includes(letter)) {
        let alreadyRevealed = false;
        selectedWord.split("").forEach((char, i) => {
            if (char === letter) {
                const letterElement = document.getElementById(`s-${i}`);
                if (letterElement.innerText === letter) {
                    alreadyRevealed = true;
                } else {
                    letterElement.innerText = letter;
                    score++;
                }
            }
        });
        if (alreadyRevealed) {
            alert("Letter already revealed!");
        }
    } else {
        // Incorrect guess
        health--;
    }

    // Always update visuals after any guess
    updateHangman();
    updateLivesDisplay();

    // Check win/loss conditions after updates
    if (health === 0) {
        updateHangman();
        updateLivesDisplay();
        setTimeout(() => {
            alert("Game Over!");
        }, 300);
    } else if (score === selectedWord.length) {
        updateHangman();
        updateLivesDisplay();
        setTimeout(() => {
            alert("You Win!");
        }, 300);
    }
}
