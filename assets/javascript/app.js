$(document).ready(function() {
  $(quizPage).hide();
  $(scoreContainer).hide();
  $("#startButton").on("click", triviaGame.startGame);
  $(document).on("click", ".option", triviaGame.guessChecker);
});
var startGame = $("#startButton");
var timeLeft = $("#timer");
var quizPage = $(".secondpage");
var introPage = $(".firstpage");
var question = $("#question");
var optionA = $("#A");
var optionB = $("#B");
var optionC = $("#C");
var optionD = $("#D");
var scoreContainer = $(".score-container");
var triviaGame = {
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  timer: 3,
  timerOn: false,
  runningQuestionIndex: 0,
  timeLeft: "",
  questions: {
    q1: "How many people live in the state of New York?",
    q2: "What is the tallest building in New York?",
    q3: "How many billionaires live in New York City?",
    q4: "How many different languages are spoken in New York?",
    q5: "What is the monthly cost to park a car in New York City?",
    q6: "Where does the term 'Big Apple' come from originally?"
  },
  options: {
    q1: ["1 Million", "7 Million", "18 Million", "24 Million"],
    q2: [
      "Four World Trade Center",
      "Empire State",
      "432 Park Condominiums",
      "One World Trade Center"
    ],
    q3: ["50", "100", "200", "500"],
    q4: ["800", "1000", "60", "250"],
    q5: ["$30", "$90", "$350", "$600"],
    q6: ["Olympics", "Millionaires", "Horse Racing", "Tourism"]
  },
  answers: {
    q1: ["18 Million"],
    q2: ["One World Trade Center"],
    q3: ["100"],
    q4: ["800"],
    q5: ["$600"],
    q6: ["Horse Racing"]
  },

  startGame: function() {
    triviaGame.correct = 0;
    triviaGame.incorrect = 0;
    triviaGame.unanswered = 0;
    triviaGame.runningQuestionIndex = 0;
    clearInterval(triviaGame.timeLeft);
    introPage.hide();
    quizPage.show();
    timeLeft.text(triviaGame.timer);
    triviaGame.renderQuestion();
  },

  renderQuestion: function() {
    triviaGame.timer = 3;
    $("#timer").text(triviaGame.timer);

    // to prevent timer speed up
    if (!triviaGame.timerOn) {
      triviaGame.timerId = setInterval(triviaGame.timerRunning, 1000);
    }
    var questionContent = Object.values(triviaGame.questions)[
      triviaGame.runningQuestionIndex
    ];
    $("#question").text(questionContent);
    var questionOptions = Object.values(triviaGame.options)[
      triviaGame.runningQuestionIndex
    ];
    $.each(questionOptions, function(index, key) {
      $("#options").append(
        $('<button class="option btn btn-info btn-lg">' + key + "</button>")
      );
    });
  },

  timerRunning: function() {
    if (triviaGame.timer > 0) {
      $("#timer").text(triviaGame.timer);
      triviaGame.timer--;
    }

    if (
      triviaGame.timer === 0 ||
      triviaGame.runningQuestionIndex < Object.keys(triviaGame.questions).length
    ) {
      console.log("?", triviaGame.timer);
      triviaGame.renderQuestion().bind(triviaGame);
      triviaGame.unanswered++;
      $(scoreContainer).html(
        "<h3>Out of time! The answer was " +
          Object.values(triviaGame.answers)[triviaGame.runningQuestionIndex] +
          "</h3>"
      );
      // clearInterval(triviaGame.timer);
    }
    if (
      triviaGame.questions.runningQuestionIndex ===
      Object.keys(triviaGame.questions).length
    ) {
      $(".secondpage").hide();

      $(".firstpage").show();
      $(scoreContainer).html(
        "<h3>Thank you for playing!</h3>" +
          "<p>Correct: " +
          triviaGame.correct +
          "</p>" +
          "<p>Incorrect: " +
          triviaGame.incorrect +
          "</p>" +
          "<p>Unaswered: " +
          triviaGame.unanswered +
          "</p>" +
          "<p>Please play again!</p>"
      );
    }
  },

  guessChecker: function() {
    // timer ID for gameResult setTimeout
    // var resultId;

    // the answer to the current question being asked
    var currentAnswer = Object.values(triviaGame.answers)[
      triviaGame.answers.runningQuestionIndex
    ];

    // answer matches the answer index
    if ($(this).text() === currentAnswer) {
      // turn button green for correct
      $(this)
        .addClass("btn-success")
        .removeClass("btn-info");

      triviaGame.correct++;
      clearInterval(triviaGame.timerId);
      resultId = setTimeout(triviaGame.guessResult, 1000);
      $("#results").html("<h3>Correct Answer!</h3>");
    } else {
      // turn button clicked red for incorrect
      $(this)
        .addClass("btn-danger")
        .removeClass("btn-info");

      triviaGame.incorrect++;
      clearInterval(triviaGame.timerId);
      resultId = setTimeout(triviaGame.guessResult, 1000);
      $(scoreContainer).html(
        "<h3>Better luck next time! " + currentAnswer + "</h3>"
      );
    }
  },
  guessResult: function() {
    // increment to next question set
    triviaGame.runningQuestionIndex++;

    // remove the options and results
    $(".option").remove();
    $(scoreContainer).remove();

    // begin next question
    triviaGame.renderQuestion();
  }
};
