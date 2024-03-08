//TODO: add delay when finishing user input
//TODO: so that the next pattern sequence is easier to understand

// checks if each element in userInput array & pattern sequence match
function doesInputMatch(input, pattern) {
    for (var i = 0; i < input.length; i++) {
        if (input[i] !== pattern[i]) {
            return false;
        }
    }
    return true;
}

// add the next color to the pattern sequence
function updatePattern(pattern, key) {
    pattern.push(key);
    console.log(pattern);
}

// select a starting color 1-4 (G, R, Y, B)
function patternMaker(pattern) {
    var randNum = Math.floor(Math.random() * 4) + 1;

    switch (randNum) {
        case 1:
            updatePattern(pattern, "w")
            break;
        case 2:
            updatePattern(pattern, "i");
            break;
        case 3:
            updatePattern(pattern, "s");
            break;
        case 4:
            updatePattern(pattern, "k");
            break;
        default:
    }
}

// displays error message and animates game over state
function errorAnimation() {
    var timeout;
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    timeout = setTimeout(function () {
        $("body").removeClass("game-over");
    }, 500);
    $("#level-title").text("Wrong!! Press A to play again");
}

// add and remove animate class for button div
function buttonAnimation(buttonColor) {
    var timeout;
    $("." + buttonColor).addClass("pressed");
    timeout = setTimeout(function () {
        $("." + buttonColor).removeClass("pressed");
    }, 200);
}

// plays the right audio according to the input 
function playSound(key) {
    let audio = [];
    audio[0] = new Audio("sounds/green.mp3");
    audio[1] = new Audio("sounds/red.mp3");
    audio[2] = new Audio("sounds/yellow.mp3");
    audio[3] = new Audio("sounds/blue.mp3");

    switch (key) {
        case "w":
            audio[0].play();
            buttonAnimation("green");
            break;
        case "i":
            audio[1].play();
            buttonAnimation("red");
            break;
        case "s":
            audio[2].play();
            buttonAnimation("yellow")
            break;
        case "k":
            audio[3].play();
            buttonAnimation("blue")
            break;
        default:
    }
}

// save user inputs as an array
// delete "a" if at the start of the array
function updateInput(input, key) {
    input.push(key);
    if (input[0] === "a") {
        input.shift();
    }
    console.log(input);
}

// plays pattern sequence at the start of each level
function playPatternSequence(pattern) {
    for (let i = 0; i < pattern.length; i++) {
        setTimeout(function () {
            playSound(pattern[i]);
        }, i * 1000)
    }
}

// Call patternStarter,
// create list of colors one by one 
// check if input matches with list's order
// update text every time a sequence of inputs is complete
function resetInputList(input) {
    return input = [];
}

function resetPatternList(pattern) {
    return pattern = [];
}

function displayLevel(levelCounter) {
    $("#level-title").text("Level " + levelCounter);
}

//* start main()

var inputList = [];         // Tracks user input
var patternList = [];       // Tracks pattern sequence
var levelCounter;           // Tracks level
var isCorrectInput;         // if input and pattern match, boolean stays true


// play sounds when clicked on
$(".btn").on("click", function (event) {
    var buttonInnerHtml = this.innerHTML;
    playSound(buttonInnerHtml);
});

$(document).on("keydown", function (event) {
    // when input equals a:
    // reset pattern and input list
    if (event.key === "a") {
        console.log(event.key);
        inputList = resetInputList(inputList);
        patternList = resetPatternList(patternList);
        isCorrectInput = true;
        levelCounter = 1;
        displayLevel(levelCounter);
        patternMaker(patternList);
        setTimeout(function () {
            playPatternSequence(patternList);
        }, 500);
    }
    // update user input and check if 
    // input is true to pattern each time
    updateInput(inputList, event.key);
    if (inputList.length > 0) {
        isCorrectInput = doesInputMatch(inputList, patternList);
        if (patternList.length === 0) {
            isCorrectInput = true;
        }
        console.log(isCorrectInput);
        if (!isCorrectInput) {
            errorAnimation();
        }
    }

    // when user input matches pattern sequence completly
    if (inputList.length === patternList.length) {
        if (isCorrectInput) {
            inputList = resetInputList(inputList);
            levelCounter++;
            displayLevel(levelCounter);
            patternMaker(patternList);
            setTimeout(function () {
                playPatternSequence(patternList);
            }, 1000);
        }
        else {
            errorAnimation();
        }
    }
    playSound(event.key);
});


