// Constants
const MILLISECONDS_PER_MINUTE = 60000;
const MINIMUM_WORD_LENGTH = 5; // Standard typing test word length

class TypingTest {
    constructor() {
        this.paragraphs = [
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

        this.state = {
            currentParagraphIndex: 0,
            timeElapsed: 0,
            isTestActive: false,
            timerInterval: null
        };

        this.elements = {
            textDisplay: document.getElementById("text-display"),
            textInput: document.getElementById("text-input"),
            timeDisplay: document.getElementById("time"),
            wpmDisplay: document.getElementById("wpm"),
            accuracyDisplay: document.getElementById("accuracy"),
            totalCharactersDisplay: document.getElementById("total-characters"),
            startButton: document.getElementById("start-btn"),
            stopButton: document.getElementById("stop-btn"), // Added stop button
            randomButton: document.getElementById("random-paragraph-btn"),
            typewriterSound: document.getElementById('typewriter-sound')
        };

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.elements.startButton.addEventListener('click', () => this.startTest());
        this.elements.stopButton.addEventListener('click', () => this.stopTest()); // Stop button event listener
        this.elements.randomButton.addEventListener('click', () => this.loadRandomParagraph());
        this.elements.textInput.addEventListener('input', () => this.handleInput());
    }

    startTest() {
        this.state.isTestActive = true;
        this.resetStats();
        this.loadParagraph();
        this.startTimer();
        this.elements.textInput.focus();
    }

    stopTest() {
        // Clear the timer and reset state
        clearInterval(this.state.timerInterval);
        this.state.timerInterval = null;
        this.state.isTestActive = false;

        // Reset displays and input
        this.elements.textInput.value = "";
        this.elements.textDisplay.innerText = "Test stopped. Press 'Start Test' to begin again.";
        this.updateDisplays({ wpm: 0, accuracy: 0, characters: 0, time: 0 });

        alert("Test has been stopped.");
    }

    resetStats() {
        this.state.timeElapsed = 0;
        this.updateDisplays({ wpm: 0, accuracy: 0, characters: 0, time: 0 });
    }

    loadParagraph() {
        this.elements.textDisplay.innerText = this.paragraphs[this.state.currentParagraphIndex];
        this.elements.textInput.value = "";
    }

    loadRandomParagraph() {
        this.state.currentParagraphIndex = Math.floor(Math.random() * this.paragraphs.length);
        this.loadParagraph();
        this.resetStats();
    }

    startTimer() {
        if (this.state.timerInterval) {
            clearInterval(this.state.timerInterval);
        }

        this.state.timerInterval = setInterval(() => {
            this.state.timeElapsed++;
            this.elements.timeDisplay.textContent = this.state.timeElapsed;
            this.updateStats();
        }, 1000);
    }

    handleInput() {
       
        this.updateStats();
        this.checkCompletion();
    }

    playTypewriterSound() {
        this.elements.typewriterSound.currentTime = 0;
        this.elements.typewriterSound.play().catch(error => {
            console.warn('Audio playback failed:', error);
        });
    }

    calculateWPM() {
        if (this.state.timeElapsed === 0) return 0;

        const words = this.elements.textInput.value.trim().split(/\s+/).length;
        const minutes = this.state.timeElapsed / 60;
        return Math.round(words / minutes);
    }

    calculateAccuracy() {
        const targetText = this.elements.textDisplay.innerText;
        const userInput = this.elements.textInput.value;
        const maxLength = Math.max(targetText.length, userInput.length);

        if (maxLength === 0) return 0;

        const correctChars = [...userInput].filter((char, i) => char === targetText[i]).length;
        return Math.round((correctChars / maxLength) * 100);
    }

    updateStats() {
        const stats = {
            wpm: this.calculateWPM(),
            accuracy: this.calculateAccuracy(),
            characters: this.elements.textInput.value.length,
            time: this.state.timeElapsed
        };

        this.updateDisplays(stats);
    }

    updateDisplays(stats) {
        this.elements.wpmDisplay.textContent = stats.wpm;
        this.elements.accuracyDisplay.textContent = stats.accuracy;
        this.elements.totalCharactersDisplay.textContent = stats.characters;
        this.elements.timeDisplay.textContent = stats.time;
    }

    checkCompletion() {
        const isComplete = this.elements.textInput.value.trim() === this.elements.textDisplay.innerText.trim();

        if (!isComplete) return;

        clearInterval(this.state.timerInterval);
        this.state.timerInterval = null;

        const stats = {
            wpm: this.calculateWPM(),
            accuracy: this.calculateAccuracy(),
            characters: this.elements.textInput.value.length,
            time: this.state.timeElapsed
        };

        alert(`Paragraph Complete!\n\nWPM: ${stats.wpm}\nAccuracy: ${stats.accuracy}%\nCharacters Typed: ${stats.characters}\nTime Taken: ${stats.time} seconds`);

        this.state.currentParagraphIndex++;
        if (this.state.currentParagraphIndex >= this.paragraphs.length) {
            alert("All paragraphs completed! Restarting from the first.");
            this.state.currentParagraphIndex = 0;
        }

        this.resetStats();
        this.loadParagraph();
        this.startTimer();
    }
}

// Initialize the typing test
const typingTest = new TypingTest();
