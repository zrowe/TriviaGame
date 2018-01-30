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
var showAnswerTime = 10; // in seconds

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
var Q4 = new QuestionSet("What is Trump?", "A great president", "An eloquent speaker", "A liberal", "A jerk", );

// gather all the Q&A together
var questions = [Q1, Q2, Q3, Q4];



function startRound() {
    currentQuestion = Q1;
    startQuestion(currentQuestion);
}

function nextQuestion() {
    currentQuestion = Q2;
    startQuestion(currentQuestion);	
}

function checkAnswer() {
    console.log(noAnswerTimer);
    clearInterval(noAnswerTimer);
        console.log(noAnswerTimer);
    var usersChoice = this.value;
    if (debug) { console.log(usersChoice) };
    if (currentQuestion.rightChoice === usersChoice) {
        console.log("right");
        correctCount++;
        displayCorrect(currentQuestion);
    } else {
        console.log("wrong");
        incorrectCount++;
        displayIncorrect(currentQuestion);
    }
}

// reveal a question
function startQuestion(currentQuestion) {
    console.log("function startQuestion");
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
    console.log("function displayQuestion");
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
    console.log("function displayCorrect");
    $(".choices").addClass("hide"); //hide questions     
    $("#outcome").text("Correct!");
    $("#outcome").removeClass("hide");
    setTimeout(nextQuestion,showAnswerTime * 1000);
};

function displayIncorrect(currentQuestion) {
    console.log("function displayIncorrect");
    $(".choices").addClass("hide");
    $("#outcome").text("Nope!")
    $("#outcome").removeClass("hide");
    $("#answer-text").text(currentQuestion.rightChoice);
    $("#answer").removeClass("hide");
    setTimeout(nextQuestion,showAnswerTime * 1000);
};

function displayUnanswered(currentQuestion) {
    console.log("function displayUnanswered");
    $(".choices").addClass("hide");
    $("#outcome").text("Out of Time!");
    $("#outcome").removeClass("hide");
    $("#answer-text").text(currentQuestion.rightChoice);
    $("#answer").removeClass("hide");
    setTimeout(nextQuestion,showAnswerTime * 1000);
};
// paint title anc container7k
// paint start a game?
// when pressed, run a game until no more games.
// run a game until no more games.



function askQuestion(currentQuestion) {
    var result = "";
    return result
}


//  then start another question.
$(document).on("click", "#start-game", startRound);
$(document).on("click", ".choices", checkAnswer);