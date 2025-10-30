const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: 2,
  },
  {
    question: "Which is the largest planet in our solar system?",
    options: ["Earth", "Jupiter", "Saturn", "Mars"],
    answer: 1,
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "Ernest Hemingway", "Jane Austen", "Mark Twain"],
    answer: 0,
  },
  {
    question: "What is the smallest prime number?",
    options: ["1", "2", "3", "5"],
    answer: 1,
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["O2", "H2O", "CO2", "H2"],
    answer: 1,
  },
  {
    question: "What is the speed of light?",
    options: ["299,792 km/s", "150,000 km/s", "300,000 km/s", "100,000 km/s"],
    answer: 0,
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Michelangelo", "Raphael"],
    answer: 1,
  },
  {
    question: "What is the capital of Japan?",
    options: ["Tokyo", "Kyoto", "Osaka", "Nagoya"],
    answer: 0,
  },
  {
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    answer: 2,
  },
  {
    question: "What is the powerhouse of the cell?",
    options: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"],
    answer: 2,
  },
  {
    question: "What is the square root of 64?",
    options: ["6", "7", "8", "9"],
    answer: 2,
  },
  {
    question: "What is the capital of Canada?",
    options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
    answer: 2,
  },
  {
    question: "What is the boiling point of water in Celsius?",
    options: ["50°C", "75°C", "100°C", "125°C"],
    answer: 2,
  },
  {
    question: "Which element has the atomic number 1?",
    options: ["Oxygen", "Hydrogen", "Carbon", "Nitrogen"],
    answer: 1,
  },
  {
    question: "Who discovered gravity?",
    options: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Marie Curie"],
    answer: 1,
  },
];

// The code below remains unchanged for handling quiz functionality.
let currentQuestionIndex = 0;
let score = 0;
let shuffledQuestions = [];

// DOM Elements
const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const scoreText = document.getElementById("score-text");
const restartBtn = document.getElementById("restart-btn");

// Start Quiz
startBtn.addEventListener("click", () => {
  shuffledQuestions = quizData.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  score = 0;
  startScreen.classList.add("hidden");
  questionContainer.classList.remove("hidden");
  loadQuestion();
});

// Load Question
function loadQuestion() {
  resetState();
  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option-btn");
    if (index === currentQuestion.answer) {
      button.dataset.correct = true;
    }
    button.addEventListener("click", selectAnswer);
    optionsContainer.appendChild(button);
  });
}

// Reset State
function resetState() {
  nextBtn.classList.add("hidden");
  while (optionsContainer.firstChild) {
    optionsContainer.removeChild(optionsContainer.firstChild);
  }
}

// Select Answer
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  Array.from(optionsContainer.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
    button.disabled = true;
  });
  if (correct) {
    score++;
  }
  nextBtn.classList.remove("hidden");
}

// Set Status Class
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("incorrect");
  }
}

// Clear Status Class
function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("incorrect");
}

// Next Question
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < shuffledQuestions.length) {
    loadQuestion();
  } else {
    showScore();
  }
});

// Show Score
function showScore() {
  questionContainer.classList.add("hidden");
  scoreContainer.classList.remove("hidden");
  scoreText.textContent = `You scored ${score} out of ${quizData.length}`;
}

// Restart Quiz
restartBtn.addEventListener("click", () => {
  scoreContainer.classList.add("hidden");
  startScreen.classList.remove("hidden");
});