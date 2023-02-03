
'use strict';

//selecting elements

// btn 
const btnNew = document.getElementById('btn--new');
const btnRoll = document.getElementById('btn--roll');
const btnHold = document.getElementById('btn--hold');
// score
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.getElementById('dice');
// player
const player0El = document.getElementById('player--0');
const player1El = document.getElementById('player--1');

//global variables 
let scores, currentScore, activePlayer, dice;

//functions

function init() {
    
    score0El.innerText = 0;
    score1El.innerText = 0;
    current0El.innerText = 0;
    current1El.innerText = 0;

  //player 
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');


    btnRoll.classList.remove('hidden');
    btnHold.classList.remove('hidden');

    

    diceEl.classList.add('hidden');


    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    dice = 0;
}

function getRandomNumber(num) {
    return Math.floor(Math.random() * num) + 1;
}

function switchPlayer() {
  //toggle player active class
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');

    document.getElementById(`score--${activePlayer}`).innerText =
    scores[activePlayer];
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).innerText = currentScore;


    activePlayer = activePlayer === 0 ? 1 : 0;
}

//Event listeners

btnRoll.addEventListener('click', function () {
  //1. Generate Random dice
    dice = getRandomNumber(6);

  //2. Display dice on UI
    diceEl.classList.remove('hidden');
    
    diceEl.src = `./image/dice-${dice}.webp`;

  //3.check dice === 1
    if (dice !== 1) {
    //add dice to current score
    currentScore = currentScore + dice;
    //display current score on UI
    document.getElementById(`current--${activePlayer}`).innerText =
    currentScore;
    } else {
    //switch player
    switchPlayer();
    }
});

btnHold.addEventListener('click', function () {
  //1. Add current score to score
    scores[activePlayer] = scores[activePlayer] + currentScore;
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).innerText = currentScore;

  //2. check if score >=100
    if (scores[activePlayer] >= 100) {
    //player wins
    document
      .getElementById(`player--${activePlayer}`)
      .classList.remove('player--active');
    document
      .getElementById(`player--${activePlayer}`)
      .classList.add('player--winner');

    document.getElementById(`score--${activePlayer}`).innerText =
      scores[activePlayer];

    diceEl.classList.add('hidden');
    btnRoll.classList.add('hidden');
    btnHold.classList.add('hidden');
} else {
    //switch player
    switchPlayer();
}
});

btnNew.addEventListener('click', function () {
    init();
});

//initial setup
init();