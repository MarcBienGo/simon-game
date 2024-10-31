var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColor;
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameOver = true;

$(document).on("keydown", function(){
    if(gameOver){
        level = 0;
        gamePattern = [];
        gameStart();
    }
});

function gameStart(){
    gameOver = false;
    nextSequence();
}

function nextSequence(){
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(200).fadeIn(200);
    playSound(randomChosenColor);
    userClickedPattern = [];
}

$(".btn").on("click", function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length);
});

function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    var index = currentLevel - 1;

    if(gamePattern[index] != userClickedPattern[index]){
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        if(!gameOver)
            showGameOver();
        gameOver = true;
    }else{
        if(currentLevel == gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
}

function showGameOver(){
    $("h1").text("Game Over, Press Any Key to Restart");
}