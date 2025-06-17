const words = [
  "apple", "banana", "orange", "grape", "mango",
  "school", "computer", "javascript", "python", "science",
  "dream", "future", "smile", "friend", "challenge",
  "sunshine", "planet", "rocket", "keyboard", "laptop",
  "teacher", "student", "engineer", "travel", "adventure"
];

let currentWord = "";
let score = 0;

const wordEl = document.getElementById("word");
const guessEl = document.getElementById("guess");
const resultEl = document.getElementById("result");
const checkBtn = document.getElementById("checkBtn");
const nextBtn = document.getElementById("nextBtn");
const tryAgainBtn = document.getElementById("tryAgainBtn");
const scoreEl = document.getElementById("score");
const container = document.querySelector(".container");

function shuffle(word) {
  return word.split('').sort(() => 0.5 - Math.random()).join('');
}

function newWord() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  wordEl.innerText = shuffle(currentWord);
  guessEl.value = "";
  resultEl.innerText = "";
  guessEl.style.display = "inline";
  checkBtn.style.display = "inline";
  nextBtn.style.display = "none";
  tryAgainBtn.style.display = "none";
}

function checkGuess() {
  const userGuess = guessEl.value.toLowerCase();
  if (userGuess === currentWord) {
    resultEl.innerText = "Correct!";
    score++;
    scoreEl.innerText = `Score: ${score}`;
    fireConfetti();
    nextBtn.style.display = "inline";
    checkBtn.style.display = "none";
    tryAgainBtn.style.display = "none";
  } else {
    resultEl.innerText = "Oops! Try again!";
    container.classList.add("shake");
    setTimeout(() => container.classList.remove("shake"), 500);
    tryAgainBtn.style.display = "inline";
    checkBtn.style.display = "none";
    nextBtn.style.display = "none";
  }
}

function resetTry() {
  resultEl.innerText = "";
  guessEl.value = "";
  checkBtn.style.display = "inline";
  tryAgainBtn.style.display = "none";
}

function fireConfetti() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");
  canvas.width = container.offsetWidth;
  canvas.height = container.offsetHeight;

  let particles = [];
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 5 + 1,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      tilt: Math.random() * 10 - 10
    });
  }

  let angle = 0;
  const confettiInterval = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    angle += 0.01;
    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];
      p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
      p.x += Math.sin(angle);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    }
  }, 20);

  setTimeout(() => {
    clearInterval(confettiInterval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, 1500);
}

newWord();
