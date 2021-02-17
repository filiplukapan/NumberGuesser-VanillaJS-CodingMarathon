// game values

let min = 1,
    max = 10,
    winningNumber = getRandomNum(min, max),
    guessesLeft = 3;

// UI elements

const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');


// assign min and max

minNum.textContent = min;
maxNum.textContent = max;


//play again event listener
game.addEventListener('mousedown', function(e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
});

//listen for guess

guessBtn.addEventListener('click', function() {

    let guess = parseInt(guessInput.value);
    console.log(guess);

    //validate input
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }
    
    //check if won
    if (guess === winningNumber) {

        gameOver(true, `${winningNumber} is correct! YOU WON THE GAME.`, 'green');
        
    } else {
        //wrong number
        
        if (guessesLeft === 0) {
            
            gameOver(false, `GAME OVER! The correct number was ${winningNumber}.`, 'red');
            
        } else {
            guessesLeft -= 1;
            //wrong number, game continous
            guessInput.style.borderColor = 'orange';
            guessInput.style.borderWidth = '2px';
            //clear guess input
            guessInput.value = '';
            
            setMessage(`Guess is not correct. You have ${guessesLeft} guesses left.`, 'orange');
        }
        
    }
});


//game over
function gameOver(won, msg) {
    
    let color;
    won === true ? color = 'green' : color = 'red';

    guessInput.disabled = true;
    guessInput.style.borderColor = color;
    message.style.color = color;
    guessInput.style.borderWidth = '2px';

    setMessage(msg);

    //play again?
    guessBtn.className += 'play-again';
    guessBtn.value = 'Play again!';
}

//set random number
function getRandomNum(min, max){

    return Math.floor(Math.random()*(max-min+1)+min);

}

//display message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}

