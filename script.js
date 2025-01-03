const questions = [
    {
        question: "What does 'OOP' stand for?",
        answers: [
            { text: "Object Oriented Protocol", correct: false },
            { text: "Object Oriented Programming ", correct: true },
            { text: "Object Oriented Procedure", correct: false },
            { text: "Object Oriented Processing", correct: false },
        ]
    },
    {
        question: "Encapsulation in OOP is achieved by:",
        answers: [
            { text: "Inheriting from another class", correct: false },
            { text: "Declaring all members as public", correct: false },
            { text: "Grouping data members and methods into a single unit", correct: true },
            { text: "Using abstract classes", correct: false },
        ]
    },
    {
        question: "Which of the following is NOT a fundamental concept of OOP?",
        answers: [
            { text: "Inheritance", correct: false },
            { text: "Encapsulation", correct: false },
            { text: "Abstraction", correct: false },
            { text: "Compilation", correct: true },
        ]
    },
    {
        question: "Which keyword in Java is used to implement inheritance?",
        answers: [
            { text: "inherit", correct: false },
            { text: "import", correct: false },
            { text: "extend", correct: true },
            { text: "interface", correct: false },
        ]
    },
    {
        question: "In object-oriented programming, what is an object?",
        answers: [
            { text: "A function", correct: false },
            { text: "A variable", correct: false },
            { text: "A loop", correct: false },
            { text: "An instance of a class", correct: true },
        ]
    },
    {
        question: "Which keyword is used to achieve abstraction in Java?",
        answers: [
            { text: "abstract", correct: false },
            { text: "interface", correct: false },
            { text: "extends", correct: true },
            { text: "implements", correct: false },
        ]
    },
    {
        question: "Which of the following is NOT a principle of OOP?",
        answers: [
            { text: "Modularity", correct: false },
            { text: "Polymorphism", correct: false },
            { text: "Linearity", correct: true },
            { text: "Inheritance", correct: false },
        ]
    },
    {
        question: "In Java, which keyword is used to refer to the current instance of the class?",
        answers: [
            { text: "super", correct: false },
            { text: "self", correct: false },
            { text: "current", correct: false },
            { text: "this ", correct: true },
        ]
    },
    {
        question: "Which keyword is used to create an object in Java",
        answers: [
            { text: "new", correct: true },
            { text: "create", correct: false },
            { text: "object", correct: false },
            { text: "instance", correct: false },
        ]
    },
    {
        question: "What is the purpose of a constructor in Java?",
        answers: [
            { text: "To define methods for a class", correct: false },
            { text: "To create new objects from a class", correct: false },
            { text: "To initialize object variables", correct: true },
            { text: "To override superclass methods", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
    });

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    let message = "";
    if (score === questions.length) {
        message = "Perfect Score!";
    }
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}. ${message}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();


