(function() {
  let arr = [$("#optionA"), $("#optionB"), $("#optionC"), $("#optionD")];
  let randArr = arr[Math.floor(arr.length * Math.random())];
  let btnNext = $("#btnNext");
  let answer = randArr;
  let question = "";
  let answerReal;
  let optionA = $("#optionA");
  let optionB = $("#optionB");
  let optionC = $("#optionC");
  let optionD = $("#optionD");
  var count = 0;
  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;
  let timeLeft = $("#timer");
  let time = 20;
  let interval;
  optionA.hide();
  optionB.hide();
  optionC.hide();
  optionD.hide();

  //   var interval = setInterval(function() {
  //     time--;
  //     timeLeft = time;
  //     console.log(time);
  //     if (time === 0) {
  //       clearInterval(interval);
  //       unanswered++;
  //       $("#unanswered").text(unanswered);
  //       renderQuestion();
  //     }
  //   }, 1000);

  function startGame() {
    $(btnNext).on("click", function nextQuestion() {
      $(".timer").attr("id", "timer");
      timerRun();
      optionA.show();
      optionB.show();
      optionC.show();
      optionD.show();
      btnNext.hide();
      //   console.log(count);
      if (count === 10) {
        $("#container").hide();
        $("#score").show();
      }
      //   function shuffle() {  //---------this function was called to randomize my array(var arr), however it's not needed---
      //     var currentarr = arr.length;
      //     var index, temp;

      //     while (currentarr > 0) {
      //       index = Math.floor(Math.random() * currentarr);
      //       currentarr--;

      //       temp = arr[currentarr];
      //       arr[currentarr] = arr[index];
      //       arr[index] = temp;
      //     }
      //   }
      (function($) {
        //-----------------this function shuffles all the DOM elements after its been called (look down below)------------
        $.fn.shuffle = function() {
          var allElems = this.get(),
            getRandom = function(max) {
              return Math.floor(Math.random() * max);
            },
            shuffled = $.map(allElems, function() {
              var random = getRandom(allElems.length),
                randEl = $(allElems[random]).clone(true)[0];
              allElems.splice(random, 1);
              return randEl;
            });

          this.each(function(i) {
            $(this).replaceWith($(shuffled[i]));
          });

          return $(shuffled);
        };
      })(jQuery);
      //-----------------------here we call the DOM elements to be shuffled---------------------------------------------------
      $("#answers button").shuffle();
      fetch("https://jservice.io/api/random")
        .then(function(response) {
          if (response.status !== 200) {
            console.log(
              "Looks like there was a problem. Status Code: " + response.status
            );
            return;
          }

          // Examine the text in the response
          response.json().then(function(data) {
            //------------------------------FETCHING THE API----------------------------------------------
            console.log(data);
            answerReal = data[0].answer;
            question = data[0].question;
            console.log(question + ": " + answer);
            $("#question").html(question);
            // shuffle($("#answers"));
            console.log(arr);
            $("#optionA").html(answerReal);
            $("#optionA").addClass("secretwinner");
            console.log(answerReal);
          });
        })
        .catch(function(err) {
          console.log("Fetch Error :-S", err);
        });
      fetch("https://jservice.io/api/random")
        .then(function(response) {
          if (response.status !== 200) {
            console.log(
              "Looks like there was a problem. Status Code: " + response.status
            );
            return;
          }

          // Examine the text in the response
          response.json().then(function(data) {
            console.log(data);
            answerNonReal = data[0].answer;
            $("#optionB").html(answerNonReal);
            $("#optionB").addClass("notasecretwinner");
            console.log(answerNonReal); //-----------------------------FETCHING THE API----------------------------------------
          });
        })
        .catch(function(err) {
          console.log("Fetch Error :-S", err);
        });
      fetch("https://jservice.io/api/random")
        .then(function(response) {
          if (response.status !== 200) {
            console.log(
              "Looks like there was a problem. Status Code: " + response.status
            );
            return;
          }

          // Examine the text in the response
          response.json().then(function(data) {
            console.log(data);
            answerNonReal = data[0].answer;
            $("#optionC").html(answerNonReal);
            $("#optionC").addClass("notasecretwinner");
            console.log(answerNonReal); //------------------------------FETCHING THE API---------------------------------------
          });
        })
        .catch(function(err) {
          console.log("Fetch Error :-S", err);
        });
      fetch("https://jservice.io/api/random")
        .then(function(response) {
          if (response.status !== 200) {
            console.log(
              "Looks like there was a problem. Status Code: " + response.status
            );
            return;
          }

          // Examine the text in the response
          response.json().then(function(data) {
            console.log(data);
            answerNonReal = data[0].answer;
            $("#optionD").html(answerNonReal);
            $("#optionD").addClass("notasecretwinner");
            console.log(answerNonReal); //-------------------------------FETCHING THE API--------------------------------------
          });
        })
        .catch(function(err) {
          console.log("Fetch Error :-S", err);
        });
    });
  } //---------------------------------------------------------END-------------------------------------------------------------
  function renderQuestion() {
    clearInterval(interval);
    timerRun();
    count++;
    console.log(count);
    if (count === 10) {
      timer = 0;
      console.log(typeof interval);
      clearInterval(interval);
      $("#container").hide();
      $("#score").show();
    }
    (function($) {
      //-----------------this function shuffles all the DOM elements after its been called (look down below)------------
      $.fn.shuffle = function() {
        var allElems = this.get(),
          getRandom = function(max) {
            return Math.floor(Math.random() * max);
          },
          shuffled = $.map(allElems, function() {
            var random = getRandom(allElems.length),
              randEl = $(allElems[random]).clone(true)[0];
            allElems.splice(random, 1);
            return randEl;
          });

        this.each(function(i) {
          $(this).replaceWith($(shuffled[i]));
        });

        return $(shuffled);
      };
    })(jQuery);
    //-----------------------here we call the DOM elements to be shuffled---------------------------------------------------
    $("#answers button").shuffle();
    fetch("https://jservice.io/api/random")
      .then(function(response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }

        // Examine the text in the response
        response.json().then(function(data) {
          //------------------------------FETCHING THE API----------------------------------------------
          console.log(data);
          answerReal = data[0].answer;
          question = data[0].question;
          console.log(question + ": " + answer);
          $("#question").html(question);
          console.log(arr);
          $("#optionA").html(answerReal);
          $("#optionA").addClass("secretwinner");
          console.log(answerReal);
        });
      })
      .catch(function(err) {
        console.log("Fetch Error :-S", err);
      });
    fetch("https://jservice.io/api/random")
      .then(function(response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }

        // Examine the text in the response
        response.json().then(function(data) {
          console.log(data);
          answerNonReal = data[0].answer;
          $("#optionB").html(answerNonReal);
          $("#optionB").addClass("notasecretwinner");
          console.log(answerNonReal); //-----------------------------FETCHING THE API----------------------------------------
        });
      })
      .catch(function(err) {
        console.log("Fetch Error :-S", err);
      });
    fetch("https://jservice.io/api/random")
      .then(function(response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }

        // Examine the text in the response
        response.json().then(function(data) {
          console.log(data);
          answerNonReal = data[0].answer;
          $("#optionC").html(answerNonReal);
          $("#optionC").addClass("notasecretwinner");
          console.log(answerNonReal); //------------------------------FETCHING THE API---------------------------------------
        });
      })
      .catch(function(err) {
        console.log("Fetch Error :-S", err);
      });
    fetch("https://jservice.io/api/random")
      .then(function(response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }

        // Examine the text in the response
        response.json().then(function(data) {
          console.log(data);
          answerNonReal = data[0].answer;
          $("#optionD").html(answerNonReal);
          $("#optionD").addClass("notasecretwinner");
          console.log(answerNonReal); //-------------------------------FETCHING THE API--------------------------------------
        });
      })
      .catch(function(err) {
        console.log("Fetch Error :-S", err);
      });
  }
  startGame();
  $("#score").hide();
  startAnswers();
  function timerRun() {
    interval = setInterval(function() {
      time--;
      $(timeLeft).text(time);
      console.log(time);
      if (time === 0) {
        unanswered++;
        $("#unanswered").text(unanswered);
        resetTime();
        renderQuestion();
      } else if (count === 10) {
        console.log(count);
        clearInterval(interval);
      }
    }, 1000);
  }
  function stopTimers() {
    clearInterval(interval);
  }
  function resetTime() {
    stopTimers();
    time = 20;
    $(timeLeft).text(time);
  }
  function startAnswers() {
    $(optionA).on("click", function() {
      console.log("this is the correct button");
      console.log("this button is being clicked A");
      correct++;
      $("#correct").text(correct);
      $("#optionA").addClass("correct-button");
      $("#optionA").removeClass("correct-button");
      renderQuestion();
      resetTime();
      timerRun();
    });
    $(optionB).on("click", function() {
      console.log("wrong button");
      console.log("this button is being clicked B");
      incorrect++;
      $("#incorrect").text(incorrect);
      $("#optionB").addClass("incorrect-button");
      $("#optionB").removeClass("incorrect-button");
      renderQuestion();
      resetTime();
      timerRun();
    });
    $(optionC).on("click", function() {
      console.log("wrong button 2");
      console.log("this button is being clicked C");
      incorrect++;
      $("#incorrect").text(incorrect);
      $("#optionC").addClass("incorrect-button");
      $("#optionC").removeClass("incorrect-button");
      renderQuestion();
      resetTime();
      timerRun();
    });
    $(optionD).on("click", function() {
      console.log("wrong button 3");
      console.log("this button is being clicked D");
      incorrect++;
      $("#incorrect").text(incorrect);
      $("#optionD").addClass("incorrect-button");
      $("#optionD").removeClass("incorrect-button");
      renderQuestion();
      resetTime();
      timerRun();
    });
  }
})();
