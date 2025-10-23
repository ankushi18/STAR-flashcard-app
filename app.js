// This file is your starting point for all the JavaScript logic.
console.log("app.js is connected!");

// --- 1. GET ALL THE ELEMENTS ---
// Form elements
const addCardForm = document.getElementById("add-card-form");
const questionInput = document.getElementById("question-input");
const situationInput = document.getElementById("situation-input");
const taskInput = document.getElementById("task-input");
const actionInput = document.getElementById("action-input");
const resultInput = document.getElementById("result-input");
const saveSuccessMsg = document.getElementById("save-success-msg");

// Flashcard viewer elements
const flashcard = document.getElementById("flashcard");
const cardCounter = document.getElementById("card-counter");
const cardQuestion = document.getElementById("card-question");
const cardAnswerSituation = document.getElementById("answer-situation");
const cardAnswerTask = document.getElementById("answer-task");
const cardAnswerAction = document.getElementById("answer-action");
const cardAnswerResult = document.getElementById("answer-result");

// Navigation buttons
const prevBtn = document.getElementById("prev-btn");
const flipBtn = document.getElementById("flip-btn");
const nextBtn = document.getElementById("next-btn");


// --- 2. INITIALIZE STATE ---
let deck = []; // This will hold our card objects
let currentCardIndex = 0;


// --- 3. CORE FUNCTIONS ---

// Function to load the deck from localStorage
function loadDeck() {
    const savedDeck = localStorage.getItem('starDeck');
    if (savedDeck) {
        deck = JSON.parse(savedDeck);
    }
}

// Function to save the deck to localStorage
function saveDeck() {
    localStorage.setItem('starDeck', JSON.stringify(deck));
}

// Function to update the flashcard display
function updateDisplay() {
    if (deck.length === 0) {
        // No cards in the deck
        cardCounter.textContent = "Card 0 of 0";
        cardQuestion.textContent = "Your question will appear here. Add a card to get started!";
        // Clear the back
        cardAnswerSituation.textContent = "";
        cardAnswerTask.textContent = "";
        cardAnswerAction.textContent = "";
        cardAnswerResult.textContent = "";
        // Hide navigation
        prevBtn.style.display = 'none';
        flipBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        return;
    }

    // Show navigation
    prevBtn.style.display = 'inline-block';
    flipBtn.style.display = 'inline-block';
    nextBtn.style.display = 'inline-block';

    // Get the current card
    const currentCard = deck[currentCardIndex];

    // Update the card counter
    cardCounter.textContent = `Card ${currentCardIndex + 1} of ${deck.length}`;
    
    // Update the card front (question)
    cardQuestion.textContent = currentCard.question;
    
    // Update the card back (answer)
    cardAnswerSituation.textContent = currentCard.situation;
    cardAnswerTask.textContent = currentCard.task;
    cardAnswerAction.textContent = currentCard.action;
    cardAnswerResult.textContent = currentCard.result;

    // Make sure the card is flipped to the front
    flashcard.classList.remove('flipped');
}

// --- 4. EVENT LISTENERS ---

// Event Listener: Save a new card (Form Submission)
addCardForm.addEventListener("submit", (e) => {
    // Prevent the form from actually submitting
    e.preventDefault();

    // Get the values from the form
    const newCard = {
        question: questionInput.value,
        situation: situationInput.value,
        task: taskInput.value,
        action: actionInput.value,
        result: resultInput.value,
    };

    // Add the new card to our deck
    deck.push(newCard);
    
    // Save the updated deck to localStorage
    saveDeck();

    // Show a success message
    saveSuccessMsg.style.display = "block";
    setTimeout(() => {
        saveSuccessMsg.style.display = "none";
    }, 2000); // Hide after 2 seconds

    // Clear the form fields
    addCardForm.reset();

    // Set the current card to the one just added
    currentCardIndex = deck.length - 1;

    // Update the display
    updateDisplay();
});

// Event Listener: Flip the card
flipBtn.addEventListener("click", () => {
    flashcard.classList.toggle('flipped');
});

// Event Listener: Go to the next card
nextBtn.addEventListener("click", () => {
    if (deck.length === 0) return;
    
    currentCardIndex++;
    if (currentCardIndex >= deck.length) {
        currentCardIndex = 0; // Wrap around to the beginning
    }
    updateDisplay();
});

// Event Listener: Go to the previous card
prevBtn.addEventListener("click", () => {
    if (deck.length === 0) return;

    currentCardIndex--;
    if (currentCardIndex < 0) {
        currentCardIndex = deck.length - 1; // Wrap around to the end
    }
    updateDisplay();
});


// --- 5. INITIAL PAGE LOAD ---
loadDeck();
updateDisplay();