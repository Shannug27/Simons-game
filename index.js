var started=0;
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var buttonColours=["green","red","yellow","blue"];


$(document).keypress(function(){
    if(!started){
        $("h1").text("Level"+level);
        nextSequence();
        started=true;
    }
})

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    makeAnimation(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentlevel){
       if(gamePattern[currentlevel]==userClickedPattern[currentlevel]){
        if(userClickedPattern.length==gamePattern.length){
            nextSequence();
        }
       }
       else{
        $("h1").text("Game over, press any key to resart");
        playSound("wrong");
        $("html").addClass("gameover");
        setTimeout(function(){
            $("html").removeClass("gameover");
        },100);
        startOver();
       }
}

function startOver(){
    level=0;
    started=false;
    gamePattern=[];
}

function playSound(key){
   var sou=new Audio("sounds/"+key+".mp3");
   sou.play();
}
function makeAnimation(key){
    $("#"+key).addClass("pressed");
    setTimeout(function(){
        $("#"+key).removeClass("pressed");
    },1000);
}

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("h1").text("Level"+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}
