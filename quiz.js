


// Quiz page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Quiz data with 20 questions
    const quizData = [
        {
            question: "What percentage of plastic waste is currently recycled globally?",
            answers: ["50%", "25%", "9%", "75%"],
            correct: 2,
            explanation: "Only about 9% of plastic waste is recycled globally. The majority ends up in landfills or the environment."
        },
        {
            question: "How many times can aluminum be recycled?",
            answers: ["5 times", "10 times", "50 times", "Infinitely"],
            correct: 3,
            explanation: "Aluminum can be recycled infinitely without losing its properties, making it one of the most sustainable materials."
        },
        {
            question: "Which material saves the most energy when recycled instead of made new?",
            answers: ["Paper", "Glass", "Aluminum", "Plastic"],
            correct: 2,
            explanation: "Recycling aluminum saves up to 95% of the energy required to make new aluminum from raw materials."
        },
        {
            question: "What does the number inside the recycling symbol on plastic containers indicate?",
            answers: ["How many times it's been recycled", "The type of plastic resin", "The recycling facility code", "The manufacturing date"],
            correct: 1,
            explanation: "The number indicates the type of plastic resin used, which determines how it can be recycled."
        },
        {
            question: "How long does it take for a plastic bottle to decompose in a landfill?",
            answers: ["10 years", "100 years", "450 years", "1000 years"],
            correct: 2,
            explanation: "Plastic bottles can take up to 450 years to decompose, which is why recycling is so important."
        },
        {
            question: "What is the most recycled material in the world?",
            answers: ["Paper", "Steel", "Aluminum", "Glass"],
            correct: 1,
            explanation: "Steel is the most recycled material globally, with recycling rates often exceeding 80%."
        },
        {
            question: "Which of these items should NOT be put in regular recycling bins?",
            answers: ["Cardboard boxes", "Pizza boxes with grease", "Aluminum cans", "Glass bottles"],
            correct: 1,
            explanation: "Greasy pizza boxes contaminate other recyclables and should be composted or thrown away instead."
        },
        {
            question: "How much water can be saved by recycling one ton of paper?",
            answers: ["1,000 gallons", "7,000 gallons", "15,000 gallons", "25,000 gallons"],
            correct: 1,
            explanation: "Recycling one ton of paper saves approximately 7,000 gallons of water compared to making new paper."
        },
        {
            question: "What happens to most electronic waste (e-waste) globally?",
            answers: ["It's properly recycled", "It's exported to developing countries", "It's incinerated safely", "It's reused"],
            correct: 1,
            explanation: "Most e-waste is exported to developing countries, often leading to environmental and health issues."
        },
        {
            question: "What is 'upcycling'?",
            answers: ["Converting waste into new materials of lesser quality", "Converting waste into new materials of higher quality", "Burning waste for energy", "Burying waste in landfills"],
            correct: 1,
            explanation: "Upcycling is the process of transforming waste materials or useless products into new materials or products of better quality or for better environmental value."
        },
        {
            question: "Which of these is a benefit of composting?",
            answers: ["Reduces landfill waste", "Enriches soil", "Reduces need for chemical fertilizers", "All of the above"],
            correct: 3,
            explanation: "Composting helps reduce landfill waste, creates nutrient-rich soil, and lessens the reliance on synthetic fertilizers."
        },
        {
            question: "What does 'reduce, reuse, recycle' prioritize?",
            answers: ["Recycle first, then reuse, then reduce", "Reduce first, then reuse, then recycle", "Reuse first, then reduce, then recycle", "Recycle only"],
            correct: 1,
            explanation: "The hierarchy prioritizes reducing waste generation, then reusing items, and finally recycling what cannot be reduced or reused."
        },
        {
            question: "Which type of plastic is most commonly accepted in curbside recycling programs?",
            answers: ["PET (1) and HDPE (2)", "PVC (3) and LDPE (4)", "PP (5) and PS (6)", "All types of plastic"],
            correct: 0,
            explanation: "PET (Polyethylene Terephthalate) and HDPE (High-Density Polyethylene) are the most widely accepted plastics for recycling."
        },
        {
            question: "What is the primary purpose of a Material Recovery Facility (MRF)?",
            answers: ["To burn waste for energy", "To sort and process recyclable materials", "To bury non-recyclable waste", "To produce new products from raw materials"],
            correct: 1,
            explanation: "A Material Recovery Facility (MRF) is a specialized plant that receives, separates, and prepares recyclable materials for marketing to end-user manufacturers."
        },
        {
            question: "Which gas is significantly reduced when organic waste is composted instead of sent to landfills?",
            answers: ["Carbon Dioxide (CO2)", "Oxygen (O2)", "Methane (CH4)", "Nitrogen (N2)"],
            correct: 2,
            explanation: "When organic waste decomposes in landfills without oxygen, it produces methane, a potent greenhouse gas. Composting reduces methane emissions."
        },
        {
            question: "Approximately how much energy is saved when a glass bottle is recycled compared to making a new one?",
            answers: ["10%", "20%", "30%", "50%"],
            correct: 2,
            explanation: "Recycling glass saves about 30% of the energy needed to make new glass from raw materials."
        },
        {
            question: "What is the term for products designed to be easily recycled at the end of their life?",
            answers: ["Disposable products", "Linear products", "Circular products", "Waste products"],
            correct: 2,
            explanation: "Circular products are designed with their end-of-life in mind, making them easier to recycle or reuse, fitting into a circular economy model."
        },
        {
            question: "Which of these is a common misconception about recycling?",
            answers: ["Recycling saves energy", "Recycling creates jobs", "All plastics are recyclable everywhere", "Recycling reduces pollution"],
            correct: 2,
            explanation: "Not all plastics are recyclable, and acceptance varies greatly by local facility. It's crucial to check local guidelines."
        },
        {
            question: "What is the 'circular economy' concept primarily focused on?",
            answers: ["Taking resources, making products, disposing of waste", "Reducing consumption and production", "Keeping resources in use for as long as possible", "Maximizing landfill capacity"],
            correct: 2,
            explanation: "The circular economy aims to keep resources in use for as long as possible, extract the maximum value from them whilst in use, then recover and regenerate products and materials at the end of each service life."
        },
        {
            question: "What is the main benefit of recycling paper instead of making it from virgin wood pulp?",
            answers: ["It makes stronger paper", "It uses more water", "It saves trees and reduces energy consumption", "It produces more pollution"],
            correct: 2,
            explanation: "Recycling paper significantly reduces the need to cut down trees and uses less energy and water compared to producing paper from virgin pulp."
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let selectedAnswerIndex = null;
    let answered = false;

    // Get DOM elements
    const questionNumberElement = document.getElementById('questionNumber');
    const questionTextElement = document.getElementById('questionText');
    const answersGridElement = document.getElementById('answersGrid');
    const questionFeedbackElement = document.getElementById('questionFeedback');
    const nextBtn = document.getElementById('nextBtn');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const quizContent = document.getElementById('quizContent');
    const quizResults = document.getElementById('quizResults');
    const finalScoreElement = document.getElementById('finalScore');
    const scoreTotalElement = document.querySelector('#quizResults .score-total');
    const scoreMessageElement = document.getElementById('scoreMessage');
    const resultsIconElement = document.getElementById('resultsIcon');

    // Function to load and display the current question
    function loadQuestion() {
        if (currentQuestionIndex < quizData.length) {
            const question = quizData[currentQuestionIndex];
            questionNumberElement.textContent = `Question ${currentQuestionIndex + 1}`;
            questionTextElement.textContent = question.question;
            answersGridElement.innerHTML = ''; // Clear previous answers
            questionFeedbackElement.textContent = ''; // Clear previous feedback
            questionFeedbackElement.classList.remove('show');
            nextBtn.style.display = 'none'; // Hide next button initially
            selectedAnswerIndex = null; // Reset selected answer
            answered = false; // Reset answered state

            // Populate answers
            question.answers.forEach((answer, index) => {
                const answerOption = document.createElement('div');
                answerOption.classList.add('answer-option');
                answerOption.textContent = answer;
                answerOption.dataset.index = index; // Store index for checking
                answerOption.addEventListener('click', () => selectAnswer(answerOption, index));
                answersGridElement.appendChild(answerOption);
            });

            updateProgressBar();
            animateQuestionCard();
        } else {
            showResults();
        }
    }

    // Function to handle answer selection
    function selectAnswer(selectedOption, index) {
        if (answered) return; // Prevent changing answer after submission

        // Remove 'selected' class from all options
        document.querySelectorAll('.answer-option').forEach(option => {
            option.classList.remove('selected');
        });

        // Add 'selected' class to the clicked option
        selectedOption.classList.add('selected');
        selectedAnswerIndex = index;

        // Automatically check answer after selection (or add a submit button)
        checkAnswer();
    }

    // Function to check the selected answer
    function checkAnswer() {
        if (selectedAnswerIndex === null || answered) return;

        answered = true; // Mark question as answered
        const question = quizData[currentQuestionIndex];
        const correctAnswerIndex = question.correct;
        const answerOptions = document.querySelectorAll('.answer-option');

        if (selectedAnswerIndex === correctAnswerIndex) {
            score++;
            answerOptions[selectedAnswerIndex].classList.add('correct');
            questionFeedbackElement.textContent = "Correct! " + (question.explanation || "");
            questionFeedbackElement.style.color = "green";
        } else {
            answerOptions[selectedAnswerIndex].classList.add('incorrect');
            answerOptions[correctAnswerIndex].classList.add('correct'); // Show correct answer
            questionFeedbackElement.textContent = "Incorrect. " + (question.explanation || "");
            questionFeedbackElement.style.color = "red";
        }
        questionFeedbackElement.classList.add('show');
        nextBtn.style.display = 'block'; // Show next button
    }

    // Function to move to the next question
    function nextQuestion() {
        if (answered) { // Only proceed if an answer has been submitted
            currentQuestionIndex++;
            loadQuestion();
        } else {
            displayMessage("Please select an answer before proceeding.", true);
        }
    }

    // Event listener for the Next Question button
    if (nextBtn) {
        nextBtn.addEventListener('click', nextQuestion);
    }

    // Function to update the progress bar
    function updateProgressBar() {
        const progress = ((currentQuestionIndex) / quizData.length) * 100;
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
        if (currentQuestionIndex === quizData.length) {
            progressText.textContent = `Quiz Complete!`;
        }
    }

    // Function to animate the question card
    function animateQuestionCard() {
        if (typeof gsap !== "undefined") {
            gsap.from("#questionCard", {
                duration: 0.5,
              
                y: 50,
                ease: "power3.out"
            });
        }
    }

    // Function to show quiz results
    function showResults() {
        quizContent.style.display = 'none';
        quizResults.style.display = 'block';
        finalScoreElement.textContent = score;
        scoreTotalElement.textContent = `/${quizData.length}`; // Update total questions

        let message = "";
        let icon = "🤔"; // Default icon

        if (score === quizData.length) {
            message = "Amazing! You're a recycling expert!";
            icon = "🏆";
        } else if (score >= quizData.length * 0.75) {
            message = "Excellent job! You know a lot about recycling.";
            icon = "🌟";
        } else if (score >= quizData.length * 0.5) {
            message = "Good effort! Keep learning to improve your score.";
            icon = "♻️";
        } else {
            message = "Don't worry, every step counts! Keep learning and recycling.";
            icon = "🌱";
        }
        scoreMessageElement.textContent = message;
        resultsIconElement.textContent = icon;

        if (typeof gsap !== "undefined") {
            gsap.from("#quizResults", {
                duration: 0.8,
                scale: 0.8,
                opacity: 0,
                ease: "back.out(1.7)"
            });
        }
    }

    // Function to restart the quiz
    window.restartQuiz = () => {
        currentQuestionIndex = 0;
        score = 0;
        selectedAnswerIndex = null;
        answered = false;
        quizResults.style.display = 'none';
        quizContent.style.display = 'block';
        loadQuestion();
    };

    // Share results functions
    window.shareToTwitter = () => {
        const tweetText = `I scored ${score} out of ${quizData.length} on the EcoRecycle Hub Quiz! How well do you know recycling? Take the quiz here: ${window.location.href} #RecyclingQuiz #EcoRecycle`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`, '_blank');
    };

    window.shareToFacebook = () => {
        const shareUrl = window.location.href;
        const quoteText = `I scored ${score} out of ${quizData.length} on the EcoRecycle Hub Quiz! Test your knowledge:`;
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(quoteText)}`, '_blank');
    };

    window.copyResults = () => {
        const resultsText = `My EcoRecycle Hub Quiz Score: ${score} out of ${quizData.length}!`;
        const dummyElement = document.createElement('textarea');
        document.body.appendChild(dummyElement);
        dummyElement.value = resultsText + `\nTake the quiz: ${window.location.href}`;
        dummyElement.select();
        document.execCommand('copy');
        document.body.removeChild(dummyElement);
        displayMessage("Quiz results copied to clipboard!");
    };

    // Custom message box function (replaces alert)
    function displayMessage(message, isError = false) {
        let messageBox = document.getElementById('customMessageBox');
        if (!messageBox) {
            messageBox = document.createElement('div');
            messageBox.id = 'customMessageBox';
            messageBox.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                background-color: #333;
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                z-index: 1001;
                opacity: 0;
                transition: opacity 0.5s ease-in-out;
                font-family: 'Poppins', sans-serif;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                max-width: 80%;
                text-align: center;
            `;
            document.body.appendChild(messageBox);
        }

        messageBox.textContent = message;
        messageBox.style.backgroundColor = isError ? '#dc3545' : '#333';
        messageBox.style.opacity = '1';

        setTimeout(() => {
            messageBox.style.opacity = '0';
        }, 3000);
    }

    // Initial load of the first question
    loadQuestion();
});
