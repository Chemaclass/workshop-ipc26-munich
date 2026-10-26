const form = document.querySelector('#guess-form');
const input = document.querySelector('#guess-input');
const feedback = document.querySelector('#feedback');
const feedbackText = document.querySelector('.feedback-text');
const feedbackIcon = document.querySelector('.feedback-icon');
const attemptDots = [...document.querySelectorAll('.attempt-dot')];
const attemptCount = document.querySelector('.attempt-count');
const attempts = document.querySelector('.attempts');
const gameOver = document.querySelector('#game-over');
const playAgain = document.querySelector('#play-again');

let answer;
let guessesUsed;
let finished;

function startGame() {
  answer = Math.floor(Math.random() * 100) + 1;
  guessesUsed = 0;
  finished = false;

  form.hidden = false;
  input.disabled = false;
  input.value = '';
  gameOver.hidden = true;
  attempts.classList.remove('is-finished');
  for (const dot of attemptDots) {
    dot.classList.add('is-available');
  }
  updateAttempts();
  showFeedback('Make your first guess. You’ve got this!', '✦', 'is-neutral');
  input.focus();
}

function showFeedback(message, icon, mood) {
  feedbackText.textContent = message;
  feedbackIcon.textContent = icon;
  feedback.className = `feedback ${mood}`;
}

function updateAttempts() {
  const remaining = attemptDots.length - guessesUsed;
  attemptCount.textContent = `${remaining} left`;
  attempts.setAttribute('aria-label', `${remaining} guesses remaining`);
  for (const [index, dot] of attemptDots.entries()) {
    dot.classList.toggle('is-available', index >= guessesUsed);
  }
}

function endGame() {
  finished = true;
  input.disabled = true;
  form.hidden = true;
  gameOver.hidden = false;
  playAgain.focus();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const guess = Number(input.value);
  if (
    !input.value.trim() ||
    !Number.isInteger(guess) ||
    guess < 1 ||
    guess > 100
  ) {
    showFeedback(
      'Pick a whole number from 1 to 100 to play.',
      '↗',
      'is-warning',
    );
    input.focus();
    return;
  }

  if (finished) return;

  guessesUsed += 1;
  updateAttempts();

  if (guess === answer) {
    showFeedback(
      `You got it! The number was ${answer}. Brilliant guess!`,
      '✦',
      'is-success',
    );
    endGame();
    return;
  }

  if (guessesUsed === attemptDots.length) {
    attempts.classList.add('is-finished');
    showFeedback(
      `Ah, so close! The number was ${answer}. Ready for another?`,
      '↗',
      'is-warning',
    );
    endGame();
    return;
  }

  showFeedback(
    guess < answer
      ? 'A little higher — try again!'
      : 'A little lower — try again!',
    guess < answer ? '↑' : '↓',
    'is-hint',
  );
  input.value = '';
  input.focus();
});

playAgain.addEventListener('click', startGame);

startGame();
