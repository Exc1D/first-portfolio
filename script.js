// 1. Live Timer Widget
function updateTimer() {
  const timerElement = document.getElementById("current-time");
  const now = new Date();
  timerElement.innerText = now.toLocaleTimeString("en-US", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}
setInterval(updateTimer, 1000);

// 2. Click Counter Widget (Persistent via LocalStorage)
const clickBtn = document.getElementById("click-me");
const clickDisplay = document.getElementById("click-count");
let count = localStorage.getItem("portfolio-clicks") || 0;
clickDisplay.innerText = count;

clickBtn.addEventListener("click", () => {
  count++;
  clickDisplay.innerText = count;
  localStorage.setItem("portfolio-clicks", count);

  // Add a tiny Apple-like haptic animation
  clickBtn.style.transform = "scale(0.95)";
  setTimeout(() => (clickBtn.style.transform = "scale(1)"), 100);
});

// 3. GitHub Recent Commits Widget
async function fetchGithubActivity() {
  const container = document.getElementById("github-commits");
  try {
    const response = await fetch(
      "https://api.github.com/users/Exc1D/events/public"
    );
    const data = await response.json();

    // Find the first PushEvent
    const lastPush = data.find((event) => event.type === "PushEvent");

    if (lastPush) {
      const repoName = lastPush.repo.name.split("/")[1];
      const message = lastPush.payload.commits[0].message;
      container.innerHTML = `
                <div style="font-size: 0.85rem;">
                    <strong>${repoName}</strong><br>
                    <span style="opacity:0.7">"${message}"</span>
                </div>
            `;
    }
  } catch (err) {
    container.innerText = "Check GitHub for latest updates.";
  }
}
fetchGithubActivity();

// 4. Smooth Reveal Animation on Scroll
const observerOptions = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll(".glass-card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
  observer.observe(card);
});
