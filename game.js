var color = ["green","red","yellow","blue"];
var gamePattern = [];
var userPattern = [];
var level = 0;

function playAnimation(currentColor){   
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100)
}

function playSound(currentColor){   
    var audio = new Audio("./sounds/" + currentColor + ".mp3");
    audio.play();
}

function checkAnswer(currentLevel){
    if(userPattern[currentLevel] == gamePattern[currentLevel]){

        if(userPattern.length == gamePattern.length){
            userPattern = [];
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        var wrong = new Audio("./sounds/wrong.mp3");
        wrong.play();
        $("h1").text("Game Over. Press any Key To Play")
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },100);

        level = 0;
        gamePattern = [];
        userPattern = [];
        started = false;
    }
}

function nextSequence(){
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 3);
    var randomChosenColour = color[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
}

$(".btn").click(function(){
    if(started == true){
        var colorId = $(this).attr("id");
        playAnimation(colorId);
        playSound(colorId);
        userPattern.push(colorId);
        checkAnswer(userPattern.length-1);
    }
    else{
        // 
    }
})


var started = false;

$(document).keydown(function(){
    if(started == false){
        nextSequence();
        started = true;
    }
})