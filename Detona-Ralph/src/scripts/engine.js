const state = {
  view: {
    squares: document.querySelectorAll('.square'),
    enemy: document.querySelector('.enemy'),
    timeLeft: document.querySelector('#time-left'),
    score: document.querySelector('#score'),
  },
  values: {
    gameVlocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 60,
  },
  actions: {
    timerId: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(countDown, 1000),
  },
};

function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    state.view.score.textContent = '3';
    state.values.result = 0;
    state.values.currentTime = 60;
    alert('Gamer Over! o seu resultado foi: ' + state.values.result);
    resetGame();
  } else if (state.values.currentTime % 60 === 0) {
    loseLife();
  }
}
function loseLife() {
  let lives = parseInt(state.view.score.textContent);
  if (lives > 0) {
    lives--;
    state.view.score.textContent = lives;
    if (lives === 0) {
      clearInterval(state.actions.timerId);
      clearInterval(state.actions.countDownTimerId);
      state.values.currentTime = 0;
      alert(
        'Você perdeu todas as vidas! Seu resultado foi: ' + state.values.result
      );
    }
  }
}

function resetGame() {
  state.values.result = 0; // Resetting score to 0
  state.values.currentTime = 60; // Resetting time to initial value
  state.view.score.textContent = state.values.result; // Updating score display
  state.view.timeLeft.textContent = state.values.currentTime; // Updating time display
}

function playSound() {
  let audio = new Audio('./src/audios/src_audios_hit.m4a');
  audio.volume = 0.2;
  audio.play();
}

function randomSquare() {
  state.view.squares.forEach(square => {
    square.classList.remove('enemy');
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add('enemy');
  state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
  state.view.squares.forEach(square => {
    square.addEventListener('mousedown', () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound();
      }
    });
  });
}

function init() {
  addListenerHitBox();
}
init();
