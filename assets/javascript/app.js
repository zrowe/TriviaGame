//Trivia Game

// housekeeping

var debug = true;

var maxWaitSecs = 30; // how log to wait for an answer
var maxShowSecs = 5; // How long to show the answer

var correctCount = 0; //correct answer count
var incorrectCount = 0; // incorrect answer count
var unansweredCount = 0; // unanswered count

var noAnswerTimer; // holds ID of timer waiting for answer
var remainingSecs; // remaining maxWaitSecs
var showAnswerTime = 3; // in seconds

var qindex; // index of current question in question set.

// Blueprint for a question/answer set
function QuestionSet(question, choice1, choice2,
    choice3, choice4, rightChoice) {
    this.question = question;
    this.choice1 = choice1;
    this.choice2 = choice2;
    this.choice3 = choice3;
    this.choice4 = choice4;
    this.rightChoice = rightChoice;
};

// load the question-answer sets
var Q1 = new QuestionSet("What is red?", "Blue", "Green", "Yellow", "Red", "Red");
var Q2 = new QuestionSet("Who is Paul?", "Billy", "Jim", "Paul", "Jack", "Paul");
var Q3 = new QuestionSet("What is water?", "A liquid", "A solid", "A gas", "An herb", "A liquid");
var Q4 = new QuestionSet("What is Trump?", "A great president", "An eloquent speaker", "A liberal", "A jerk", "A jerk");

// gather all the Q&A together
var questions = [Q1, Q2, Q3, Q4];


function startRound() {
    if (debug) { console.log("function startRound") };
    $("#go-again").addClass("hide");
    $("#start-game").addClass("hide");
    qindex = 0; // set the start of game
    currentQuestion = questions[qindex];
    startQuestion(currentQuestion);
}

function nextQuestion() {
    if (debug) { console.log("function nextQuestion") };
    if (qindex < questions.length - 1) {
        qindex++;
        currentQuestion = questions[qindex];
        startQuestion(currentQuestion);
    } else {
        showStats() // this never returns. Go-again button will rekick game.
    }
}

function checkAnswer() {
    if (debug) { console.log("function checkAnswer") };
    clearInterval(noAnswerTimer);
    var usersChoice = this.value;
    if (debug) { console.log(usersChoice) };
    if (currentQuestion.rightChoice === usersChoice) {
        if (debug) { console.log("answer correct") };
        correctCount++;
        displayCorrect(currentQuestion);
    } else {
        if (debug) { console.log("answer wrong") };
        incorrectCount++;
        displayIncorrect(currentQuestion);
    }
}

// reveal a question
function startQuestion(currentQuestion) {
    if (debug) { console.log("function startQuestion") };
    displayQuestion(currentQuestion);
    remainingSecs = maxWaitSecs;
    $("#secs").text(remainingSecs);
    noAnswerTimer = setInterval(countdown_trigger, 1000)
}

function countdown_trigger() {
    if (remainingSecs > 0) {
        remainingSecs--;
        $("#secs").text(remainingSecs);
    } else {
        clearInterval(noAnswerTimer);
        unansweredCount++;
        displayUnanswered(currentQuestion);
    }
}

function displayQuestion(currentQuestion) {
    if (debug) { console.log("function displayQuestion") };
    $("#scoreboard").addClass("hide");
    $("#outcome").addClass("hide");
    $("#answer").addClass("hide");
    $(".choices").removeClass("hide");
    $("#question").text(currentQuestion.question);
    $("#choice-1").text(currentQuestion.choice1);
    $("#choice-1").val(currentQuestion.choice1);
    $("#choice-2").text(currentQuestion.choice2);
    $("#choice-2").val(currentQuestion.choice2);
    $("#choice-3").text(currentQuestion.choice3);
    $("#choice-3").val(currentQuestion.choice3);
    $("#choice-4").text(currentQuestion.choice4);
    $("#choice-4").val(currentQuestion.choice4);
};

function displayCorrect(currentQuestion) {
    if (debug) { console.log("function displayCorrect") };
    $(".choices").addClass("hide"); //hide questions     
    $("#outcome").text("Correct!");
    $("#outcome").removeClass("hide");
    setTimeout(nextQuestion, showAnswerTime * 1000);
};

function displayIncorrect(currentQuestion) {
    if (debug) { console.log("function displayIncorrect") };
    $(".choices").addClass("hide");
    $("#outcome").text("Nope!")
    $("#outcome").removeClass("hide");
    $("#answer-text").text(currentQuestion.rightChoice);
    $("#answer").removeClass("hide");
    setTimeout(nextQuestion, showAnswerTime * 1000);
};

function displayUnanswered(currentQuestion) {
    if (debug) { console.log("function displayUnanswered") };
    $(".choices").addClass("hide");
    $("#outcome").text("Out of Time!");
    $("#outcome").removeClass("hide");
    $("#answer-text").text(currentQuestion.rightChoice);
    $("#answer").removeClass("hide");
    setTimeout(nextQuestion, showAnswerTime * 1000);
};

// show stats and reveal play again? button
function showStats() {
    if (debug) { console.log("function showstats") };
    $("#num-correct").text(correctCount);
    $("#num-incorrect").text(incorrectCount);
    $("#num-unanswered").text(unansweredCount);
    $("#scoreboard").removeClass("hide");
    $("#go-again").removeClass("hide");
};


// Starts here: 3 buttons control the game:

//  start-game = the opening start button
//  choices    = the answerpicking buttons
//. go-again.  = a restart button at the end of the game.
//
$(document).on("click", "#start-game", startRound);
$(document).on("click", ".choices", checkAnswer);
$(document).on("click", "#go-again", startRound);