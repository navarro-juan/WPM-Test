const paragraphs = [
    "In a quiet village nestled between towering mountains, a group of friends discovered an ancient map that promised to lead them to hidden treasure, igniting their adventurous spirits and sparking a quest of a lifetime.",
    "As the sun dipped below the horizon, painting the sky in shades of orange and purple, the ocean waves whispered secrets to those willing to listen, a reminder of nature's timeless beauty and mystery.",
    "In a world where technology ruled, a curious inventor designed a quirky robot that could dance and tell jokes, bringing joy and laughter to people who had forgotten the simple pleasures of life.",
    "Amidst the bustling city streets, a young artist painted vibrant murals on forgotten walls, transforming dull spaces into colorful expressions of hope and creativity, inspiring passersby to see beauty in the everyday.",
    "Beneath the sprawling oak tree, children gathered to hear the wise old storyteller weave enchanting tales of bravery, friendship, and magic, igniting their imaginations and creating memories that would last a lifetime.",
    "As the clock struck midnight, a mysterious fog rolled into town, cloaking everything in silence and intrigue, while curious souls ventured outside to uncover the secrets hidden in the moonlit shadows.",
    "In a quaint bookstore, a solitary reader discovered a dusty tome filled with forgotten lore, revealing ancient secrets and powerful spells that would forever change the course of their destiny.",
    "On the first day of spring, wildflowers burst into bloom, carpeting the fields in vibrant hues, while gentle breezes carried the sweet fragrance of renewal, reminding everyone that change can be beautiful.",
    "During a fierce thunderstorm, a small kitten sought shelter under a porch, where a kind-hearted stranger discovered the frightened creature, igniting a heartwarming friendship that would bring joy to both lives.",
    "In a distant galaxy, explorers traveled light-years in search of new worlds, encountering alien civilizations and learning the importance of understanding and respect in a universe filled with diverse cultures."
];

let currentParagraphIndex = 0;
let timeElapsed = 0;
let timerInterval;

// Select DOM elements
const textDisplay = document.getElementById("text-display");
const textInput = document.getElementById("text-input");
const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const totalCharactersDisplay = document.getElementById("total-characters");
const startButton = document.getElementById("start-btn");
const typewriterSound = document.getElementById('typewriter-sound');

// Load a new paragraph
function loadParagraph() {
    textDisplay.innerText = paragraphs[currentParagraphIndex];
    textInput.value = "";
    timeElapsed = 0;
    timeDisplay.textContent = 0;
    wpmDisplay.textContent = 0;
    accuracyDisplay.textContent = 0;
    totalCharactersDisplay.textContent = 0;
}

// Load a random paragraph
function loadRandomParagraph() {
    currentParagraphIndex = Math.floor(Math.random() * paragraphs.length);
    loadParagraph();
}

// Event listener for random paragraph button
document.getElementById("random-paragraph-btn").addEventListener("click", () => {
    loadRandomParagraph();
});

// Check if the user has finished typing the current paragraph
function checkCompletion() {
    return textInput.value === textDisplay.innerText;
}

// Handle completion and load the next paragraph
function handleCompletion() {
    if (checkCompletion()) {
        currentParagraphIndex++;
        if (currentParagraphIndex < paragraphs.length) {
            loadParagraph();
        } else {
            alert("Test complete! Restarting...");
            currentParagraphIndex = 0;
            loadParagraph();
        }
    }
}

// Calculate WPM
function calculateWPM() {
    if (timeElapsed > 0) { // Ensure some time has passed
        const wordsTyped = textInput.value.split(' ').length;
        const minutesElapsed = timeElapsed / 60;
        const wpm = Math.round(wordsTyped / minutesElapsed);
        wpmDisplay.textContent = isNaN(wpm) ? 0 : wpm;
    }
}

// Calculate Accuracy
function calculateAccuracy() {
    const totalCharacters = textDisplay.innerText.length;
    const typedCharacters = textInput.value.split('').length;
    const correctCharacters = textInput.value.split('').filter((char, index) => char === textDisplay.innerText[index]).length;
    const accuracy = Math.round((correctCharacters / Math.max(totalCharacters, typedCharacters)) * 100); // Avoid division by zero
    accuracyDisplay.textContent = isNaN(accuracy) ? 0 : accuracy;
}

// Start the typing test
startButton.addEventListener('click', () => {
    startTimer();
    loadParagraph();
    textInput.focus();
});

// Timer functionality
function startTimer() {
    timerInterval = setInterval(() => {
        timeElapsed++;
        timeDisplay.textContent = timeElapsed;
    }, 1000);
}

// Play typing sound and check completion on input
textInput.addEventListener('input', () => {
    typewriterSound.currentTime = 0;
    typewriterSound.play();
    
    // Update results
    calculateWPM();
    calculateAccuracy();
    totalCharactersDisplay.textContent = textInput.value.length;

    // Check for completion
    handleCompletion();
});
