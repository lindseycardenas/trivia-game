$(document).ready(function () {

    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 30;
    var intervalId;
    var userGuess = "";
    var running = false;
    var pick;
    var index;
    var newArray = [];
    var holder = [];


    var options = [
        {
            question: "Which of the following movies was not filmed in Chicago?",
            choice: ["A League of their Own", "American Gangster", "Ferris Bueller", "The Fugitive"],
            answer: 1,

        },
        {
            question: "Which famous person was not born in Chicago?",
            choice: ["Michael Jordan", "Hillary Clinton", "Walt Disney", "Harrison Ford"],
            answer: 0,

        },
        {
            question: "Which major building was burned to the ground and then quickly restructured in the same spot?",
            choice: ["The Chicago Theatre", "Museum of Science and Industry", "McCormick Place Convention Center", "Chicago Water Tower"],
            answer: 2,

        },
        {
            question: "Of all the EL lines, which is the oldest continually operating elevated track in the city?",
            choice: ["Red", "Blue", "Brown", "Purple"],
            answer: 2,

        },
        {
            question: "Which museum is actually a museum and a school?",
            choice: ["Adler Planetarium", "The Field Museum", "Museum of Science and Industry", "The Art Institute of Chicago"],
            answer: 3,

        }];



    $("#reset").hide();
    //click start button to start game
    $("#start").on("click", function () {
        $("#start").hide();
        displayQuestion();
        runTimer();
        for (var i = 0; i < options.length; i++) {
            holder.push(options[i]);
        }
    })
    //timer start
    function runTimer() {
        if (!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer--;

        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answers").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    }

    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }

    function displayQuestion() {

        index = Math.floor(Math.random() * options.length);
        pick = options[index];


        $("#questions").html("<h2>" + pick.question + "</h2>");
        for (var i = 0; i < pick.choice.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice");
            userChoice.html(pick.choice[i]);

            userChoice.attr("data-guessvalue", i);
            $("#answers").append(userChoice);
            //		}
        }

        var qCount = options.length;

        $(".answerchoice").on("click", function () {

            userGuess = parseInt($(this).attr("data-guessvalue"));


            if (userGuess === pick.answer) {
                stop();
                correctCount++;
                userGuess = "";
                $("#answers").html("<p>Correct!</p>");
                hidepicture();

            } else {
                stop();
                wrongCount++;
                userGuess = "";
                $("#answers").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");

            }
        })
    }

    //add pictures here

    function hidepicture() {
        $("#answers").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index, 1);

        var hidpic = setTimeout(function () {
            $("#answers").empty();
            timer = 20;


            if ((wrongCount + correctCount + unanswerCount) === qCount) {
                $("#questions").empty();
                $("#questions").html("<h3>Game Over!  Here's how you did: </h3>");
                $("#answers").append("<h4> Correct: " + correctCount + "</h4>");
                $("#answers").append("<h4> Incorrect: " + wrongCount + "</h4>");
                $("#answers").append("<h4> Unanswered: " + unanswerCount + "</h4>");
                $("#reset").show();
                correctCount = 0;
                wrongCount = 0;
                unanswerCount = 0;

            } else {
                runTimer();
                displayQuestion();

            }
        }, 3000);


        // }

        // $("#reset").on("click", function () {
        //     $("#reset").hide();
        //     $("#answers").empty();
        //     $("#questions").empty();
        //     for (var i = 0; i < holder.length; i++) {
        //         options.push(holder[i]);
        //     }
        //     runTimer();
        //     displayQuestion();

        // })

    });