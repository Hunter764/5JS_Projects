const prompt = require("prompt-sync")();
const fs = require("fs"); // File system for loading files

function loadQuestions() {
    try {
        // Loading questions from JSON file
        const data = fs.readFileSync("questions.json", "utf8");
        const questions = JSON.parse(data).questions;
        return questions;
    } catch (e) {
        console.log("Error occurred while loading file:", e);
        return [];
    }
}

function getRandomQuestions(questions, numQuestions) {
    numQuestions = Math.min(numQuestions, questions.length); // Ensure numQuestions does not exceed available questions

    // Fisher-Yates shuffle for better randomization
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }

    return questions.slice(0, numQuestions);
}

function askQuestion(question) {
    console.log(question.question);
    for (let i = 0; i < question.options.length; i++) {
        console.log(`${i + 1}. ${question.options[i]}`);
    }

    const choice = parseInt(prompt("Enter the number: "));
    if (isNaN(choice) || choice < 1 || choice > question.options.length) {
        console.log("Invalid choice. Please try again.");
        return false;
    }

    return question.options[choice - 1] === question.answer;
}

// Get user input for number of questions
let numQuestions = parseInt(prompt("Enter the number of questions: "), 10);
if (isNaN(numQuestions) || numQuestions <= 0) {
    console.log("Invalid input. Defaulting to all available questions.");
    numQuestions = Infinity; // Ensures we get all available questions
}

// Load questions and pick random ones
const questions = loadQuestions();
const randomQuestions = getRandomQuestions(questions, numQuestions);

let correct = 0;
const startTime = Date.now();

for (let question of randomQuestions) {
    const isCorrect = askQuestion(question);
    console.log();
    if (isCorrect) correct++;
}

const totalTime = (Date.now() - startTime) / 1000; // Convert to seconds
console.log("Correct:", correct);
console.log("Time:", totalTime.toFixed(2), "seconds");
console.log("Score:", Math.round((correct / numQuestions) * 100) + "%");
