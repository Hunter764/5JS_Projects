# JavaScript Projects

## Table of Contents

1. [Adventure Game](#adventure-game)
2. [Text-Based Calculator](#text-based-calculator)
3. [Contact Management System](#contact-management-system)
4. [Tic-Tac-Toe](#tic-tac-toe)
5. [Generator and Grader](#generator-and-grader)

---

## Adventure Game

### Introduction

The **Adventure Game** is an interactive text-based game where the player navigates through a maze by making choices. The game starts by asking for the player's name and whether they want to play. Based on the player's choices, different scenarios unfold, leading to either victory or defeat.

### Features
- Interactive user input using `prompt-sync`
- Decision-making with conditional statements
- Simple branching game logic

### Installation
To run this game, you need to install `prompt-sync`. Use the following command to install it:
```sh
npm install prompt-sync
```

### Code Implementation
```javascript
const prompt = require("prompt-sync")()
const name = prompt("What is your name? ")
console.log("Hello", name, "welcome to our game")

const shouldWePlay = prompt("Do want to play? ")

if (shouldWePlay.toLowerCase() === "yes") {
    const leftOrRight = prompt("You enter a Maze, do you want to go left or right? ")
    if (leftOrRight === "left") {
        console.log("You go left and see a bridge...")
        const cross = prompt("Do you want to cross the bridge? ").toLowerCase()
        if (cross === "yes" || cross === "y") {
            console.log("You cross but the bridge was weak so YOU LOST!")
        } else {
            console.log("Good choice... you win")
        }
    } else {
        console.log("You went right and fell off the cliff...")
    }
} else {
    console.log("Okay :(")
}
```

### Example Execution
```
What is your name? Alex
Hello Alex, welcome to our game
Do want to play? yes
You enter a Maze, do you want to go left or right? left
You go left and see a bridge...
Do you want to cross the bridge? yes
You cross but the bridge was weak so YOU LOST!
```

---

## Text-Based Calculator

### Introduction

The **Text-Based Calculator** takes user input for two numbers and an operator, then performs the corresponding mathematical operation.

### Features
- Accepts user input for numbers and operators
- Supports basic arithmetic operations: addition, subtraction, multiplication, and division
- Handles invalid input and prevents division by zero errors

### Installation
```sh
npm install prompt-sync
```

### Code Implementation
```javascript
const prompt = require("prompt-sync")()

function getNumber(numberString){
    while(true){
        const number = parseFloat(prompt("Enter number " + numberString + ": "))
        if (!isNaN(number)){
            return number
        }
        console.log("Invalid input")
    }
}

const number1 = getNumber("One");
const number2 = getNumber("Two");
const operator = prompt("Enter sign: ")
let result;
let valid = true;

switch (operator){
    case "+":
        result = number1 + number2  
        break;
    case "-":
        result = number1 - number2
        break;
    case "*":
        result = number1 * number2
        break;
    case "/":
        if(number2 === 0){
            valid = false
            console.log("Zero division error.")
        }
        result = number1 / number2
        break;    
    default:
        console.log("Invalid Input")
        valid = false;
}

if(valid)
    console.log(number1, operator, number2,"=", result)
```

### Example Execution
```
Enter number One: 10
Enter number Two: 5
Enter sign: +
10 + 5 = 15
```

---

## Contact Management System

### Introduction

The **Contact Management System** allows users to add, delete, view, and search contacts via a command-line interface.

### Features
- Add contacts with name and email
- Delete contacts by selecting from a list
- View and search contacts
- Menu-driven program for easy interaction

### Installation
```sh
npm install prompt-sync
```

### Code Implementation
```javascript
const prompt = require("prompt-sync")();

function printInfo() {
    console.log("Contact Management System");
    console.log("-------------------------");
    console.log("1. Add a Contact");
    console.log("2. Delete a Contact");
    console.log("3. View Contacts");
    console.log("4. Search Contacts");
    console.log("5. Exit");
}

// Code for managing contacts here
```

---

## Tic-Tac-Toe

### Introduction

The **Tic-Tac-Toe** game is a two-player game played on a 3x3 grid. Players take turns marking a space with "X" or "O." The first player to align three marks in a row, column, or diagonal wins. If all spaces are filled without a winner, the game ends in a tie.

### Features
- Two-player alternating turns
- Input validation to prevent invalid moves
- Automatic win detection
- Tie detection when the board is full

### Code Implementation
```javascript
const prompt = require("prompt-sync")()

// Code for Tic-Tac-Toe implementation here
```

### Example Execution
**Winning Scenario:**
```
X Player turn.
Enter row: 1
Enter col: 1
X |   |  
---------
  |   |  
---------
  |   |  

O Player turn.
Enter row: 1
Enter col: 2
X | O |  
---------
  |   |  
---------
  |   |  
...
X has won!
```

**Tie Game Scenario:**
```
X | O | X
---------
X | X | O
---------
O | X | O
Tie game!
```

---


## Generator and Grader

### Introduction

The **Generator and Grader** project is a simple quiz system that loads multiple-choice questions from a JSON file, presents them to the user, and grades their responses. The program allows users to specify the number of questions they want to attempt, selects random questions, and evaluates their performance based on correct answers and the time taken.

### Features
- Loads multiple-choice questions from a JSON file
- Randomly selects a specified number of questions
- Validates user input
- Displays the final score and time taken

### Installation
To run this project, ensure you have `prompt-sync` installed:
```sh
npm install prompt-sync
```

### Code Implementation
```javascript
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
```

### Example Execution
```
Enter the number of questions: 3
What is the capital of France?
1. Berlin
2. Madrid
3. Paris
4. Rome
Enter the number: 3

What is 5 + 3?
1. 6
2. 7
3. 8
4. 9
Enter the number: 3

What is the largest planet in the solar system?
1. Earth
2. Mars
3. Jupiter
4. Saturn
Enter the number: 3

Correct: 3
Time: 12.45 seconds
Score: 100%
```

---
