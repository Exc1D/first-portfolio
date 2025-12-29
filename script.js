// 1. Click Counter Logic
let count = localStorage.getItem("clickCount") || 0;
const counterDisplay = document.getElementById("click-counter");
const clickBtn = document.getElementById("click-me");

counterDisplay.innerText = count;

clickBtn.addEventListener("click", () => {
  count++;
  localStorage.setItem("clickCount", count);
  counterDisplay.innerText = count;
  // Add a little sound or haptic feedback feel here if desired
});

// 2. Session Timer Logic
let seconds = 0;
let minutes = 0;
const timerDisplay = document.getElementById("timer");

setInterval(() => {
  seconds++;
  if (seconds >= 60) {
    minutes++;
    seconds = 0;
  }
  const m = minutes < 10 ? "0" + minutes : minutes;
  const s = seconds < 10 ? "0" + seconds : seconds;
  timerDisplay.innerText = `${m}:${s}`;
}, 1000);

// 3. Simple Console Greeting
console.log(
  "%c TACTICAL_OS LOADED: Welcome Operator Aviado",
  "color: #00f3ff; font-weight: bold; font-size: 1.2rem;"
);
