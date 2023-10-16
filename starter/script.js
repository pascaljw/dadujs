// Mendefinisikan variabel-variabel yang diperlukan
let scores, currentScore, activePlayer, playing;

// Mendapatkan elemen-elemen HTML yang diperlukan
const player0El = document.querySelector('.player-0');
const player1El = document.querySelector('.player-1');
const score0El = document.getElementById('score-0');
const score1El = document.getElementById('score-1');
const current0El = document.getElementById('current-0');
const current1El = document.getElementById('current-1');
const diceEl = document.querySelector('.dice');
const btnNew = document.getElementById('btn-baru');
const btnRoll = document.getElementById('btn-putar');
const btnHold = document.getElementById('btn-tahan');
const giliranMainEl = document.querySelector('.giliran-main');

// Inisialisasi permainan
const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = '0';
  score1El.textContent = '0';
  current0El.textContent = '0';
  current1El.textContent = '0';

  diceEl.style.display = 'none';
  player0El.classList.add('player-active');
  player1El.classList.remove('player-active');
  player0El.classList.remove('player-winner');
  player1El.classList.remove('player-winner');
  giliranMainEl.textContent = 'Giliran: Pemain 1';
  btnRoll.disabled = false;
  btnHold.disabled = false;
};

// Ganti giliran pemain
const switchPlayer = () => {
  currentScore = 0;
  document.getElementById(`current-${activePlayer}`).textContent = '0';
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player-active');
  player1El.classList.toggle('player-active');
  giliranMainEl.value = `Giliran: Pemain ${activePlayer + 1}`;
};

// Event listener untuk tombol Putar Dadu
btnRoll.addEventListener('click', () => {
  if (playing) {
    const dice = Math.floor(Math.random() * 6) + 1;
    diceEl.src = `./images/dadu-${dice}.png`;
    diceEl.style.display = 'block';

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current-${activePlayer}`).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Event listener untuk tombol Tahan
btnHold.addEventListener('click', () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.style.display = 'none';
      document.querySelector(`.player-${activePlayer}`).classList.add('player-winner');
      document.querySelector(`.player-${activePlayer}`).classList.remove('player-active');
      giliranMainEl.textContent = `Pemain ${activePlayer + 1} Menang!`;
      btnRoll.disabled = true;
      btnHold.disabled = true;
    } else {
      switchPlayer();
    }
  }
});

// Event listener untuk tombol Game Baru
btnNew.addEventListener('click', init);

// Inisialisasi permainan saat halaman dimuat
init();
