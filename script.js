// Click Counter (simulated global counter)
let clickCount = 0;

// Load counter from storage
async function loadCounter() {
  try {
    const result = await window.storage.get("global_click_count", true);
    if (result && result.value) {
      clickCount = parseInt(result.value);
      document.getElementById("clickCount").textContent =
        clickCount.toLocaleString();
    }
  } catch (error) {
    // Key doesn't exist yet, start from 0
    clickCount = 0;
  }
}

async function incrementCounter() {
  clickCount++;
  document.getElementById("clickCount").textContent =
    clickCount.toLocaleString();

  // Save to persistent storage
  try {
    await window.storage.set("global_click_count", clickCount.toString(), true);
  } catch (error) {
    console.error("Failed to save counter:", error);
  }

  // Add animation
  const counterEl = document.getElementById("clickCount");
  counterEl.style.transform = "scale(1.2)";
  setTimeout(() => {
    counterEl.style.transform = "scale(1)";
  }, 200);
}

// Load counter on page load
loadCounter();

// Uptime Timer
let startTime = Date.now();

function updateUptime() {
  const elapsed = Date.now() - startTime;
  const hours = Math.floor(elapsed / 3600000);
  const minutes = Math.floor((elapsed % 3600000) / 60000);
  const seconds = Math.floor((elapsed % 60000) / 1000);

  const timeString = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  document.getElementById("uptime").textContent = timeString;
  document.getElementById("footerTime").textContent = timeString;
}

setInterval(updateUptime, 1000);

// Fetch Recent GitHub Commits
async function fetchCommits() {
  try {
    const response = await fetch(
      "https://api.github.com/users/Exc1D/events/public?per_page=3"
    );
    const events = await response.json();

    const commitList = document.getElementById("commitList");
    commitList.innerHTML = "";

    const pushEvents = events.filter((e) => e.type === "PushEvent").slice(0, 3);

    if (pushEvents.length === 0) {
      commitList.innerHTML =
        '<div class="commit-item"><div class="commit-message">No recent commits found</div></div>';
      return;
    }

    pushEvents.forEach((event) => {
      const commit = event.payload.commits[0];
      const repo = event.repo.name;
      const hash = commit.sha.substring(0, 7);
      const message =
        commit.message.substring(0, 60) +
        (commit.message.length > 60 ? "..." : "");

      const commitItem = document.createElement("div");
      commitItem.className = "commit-item";
      commitItem.innerHTML = `
                        <div class="commit-hash">[${hash}] ${repo}</div>
                        <div class="commit-message">${message}</div>
                    `;
      commitList.appendChild(commitItem);
    });
  } catch (error) {
    const commitList = document.getElementById("commitList");
    commitList.innerHTML =
      '<div class="commit-item"><div class="commit-message">Unable to fetch commits</div></div>';
  }
}

fetchCommits();

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Skill bars animation on scroll
const observerOptions = {
  threshold: 0.5,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target
        .getAttribute("style")
        .match(/width:\s*(\d+%)/)[1];
    }
  });
}, observerOptions);

document.querySelectorAll(".skill-progress").forEach((bar) => {
  observer.observe(bar);
});
