let playing = false;
let score;
let trialLeft;
let step;
let action;
let fruits = ["apple", "banana", "berry", "grapes", "kiwi", "lichi", "mango", "orange", "peach", "pineapple", "watermelon"];

$(() => {
    // click on start / reset button
    $("#startreset").click(() => {
        // if we are playing
        if (playing) {
            // reload page
            location.reload();
        } else {
            // if we are not playing
            // hide the game over box
            $("#gameover").hide();
            // change the text to Reset Game
            $("#startreset").html("Reset Game");
            // start playing game
            playing = true;
            // score initialize to 0
            score = 0;
            $("#scorevalue").html(score);
            // show the trial or life left
            $("#trialleft").show();
            // setting initial trial value
            trialLeft = 3;
            // adding trial hearts
            addHearts();
            // start sending fruits
            startAction();
        }
    });

    function addHearts() {
        // clear hearts
        $("#trialleft").empty();
        // fill with hearts
        for (let i = 0; i < trialLeft; i++) {
            $("#trialleft").append('<img src="./Assets/img/heart.png" class="heart">');
        }
    }

    // start sending fruits
    function startAction() {
        // generate fruits
        $("#fruit").show();
        // generate random fruit
        chooseFruit();
        // random position
        $("#fruit").css({ "left": Math.round(650 * Math.random()), "top": -50 });
        // generate steps
        step = 1 + Math.round(5 * Math.random());
        // move fruit down by steps every 10ms
        action = setInterval(() => {
            $("#fruit").css("top", $("#fruit").position().top + step);
            // to check if fruit is too low
            if ($("#fruit").position().top > $("#fruitContainer").height()) {
                // check if we have life left
                if (trialLeft > 1) {
                    $("#fruit").show();
                    chooseFruit();
                    $("#fruit").css({ "left": Math.round(650 * Math.random()), "top": -50 });
                    step = 1 + Math.round(5 * Math.random());
                    // reduce the life or trial
                    trialLeft--;
                    // populate hearts
                    addHearts();
                } else { // game over
                    playing = false;
                    // we are not playing game
                    $("#startreset").html("Start Game");
                    $("#gameover").show();
                    $("#gameover").html("<p>Game Over!</p><p>Your Score is " + score + "</p>");
                    // hide the trial or life left
                    $("#trialleft").hide();
                    stopAction();
                }
            }
        }, 10);
    }

    // generate random fruit
    function chooseFruit() {
        let rand = fruits[Math.floor(Math.random() * fruits.length)];
        $("#fruit").attr('src', './Assets/img/' + rand + '.png');
    }

    function stopAction() {
        clearInterval(action);
        // hide the fruits
        $("#fruit").hide(); // ✅ fixed selector
    }

    // slice the fruits
    $("#fruit").mouseover(() => {
        // increase the score by one
        score++;
        // update score value
        $("#scorevalue").html(score);
        // play the sound
        $("#slicesound")[0].play();
        // stop fruit
        clearInterval(action);
        // hide fruit animate
        $("#fruit").hide("explode", 200); // ✅ fixed selector
        // send new fruit
        setTimeout(startAction, 400);
    });
});
