// --- CONFIGURATION ---
const TRACK_MAP = {
  personal: { id: "EXT-01", title: "PERSONAL_PROJECTS" },
  odin: { id: "FND-02", title: "THE_ODIN_PROJECT" },
  scrimba: { id: "INT-03", title: "SCRIMBA" },
  "frontend-mentor": { id: "UXX-04", title: "FRONTEND_MENTOR" },
};

// --- GITHUB CONFIG ---

async function fetchGitHubCommits() {
  const username = "Exc1D";
  const statusElement = document.getElementById("commit-list");

  // helper to turn an ISO date into "x minutes/hours/days ago"
  const timeAgo = (isoString) => {
    const now = new Date();
    const then = new Date(isoString);
    const diffMs = now - then;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHrs = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHrs / 24);

    if (diffSec < 60) return "just now";
    if (diffMin < 60) return `${diffMin} minute${diffMin === 1 ? "" : "s"} ago`;
    if (diffHrs < 24) return `${diffHrs} hour${diffHrs === 1 ? "" : "s"} ago`;
    return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  };

  try {
    // Fetch github events
    const response = await fetch(
      "https://api.github.com/users/Exc1D/events/public"
    );

    if (!response.ok) {
      throw new Error("Github API Error");
    }
    // Parse json
    const events = await response.json();

    // get multiple recent push events, e.g. top 3
    const recentPushes = events
      .filter((event) => event.type === "PushEvent")
      .slice(0, 3);

    if (recentPushes.length === 0) {
      statusElement.textContent = `No recent pushes for ${username}`;
      return;
    }

    // NEW: Fetch commit details for each push so we get the real commit message
    const pushesWithCommits = await Promise.all(
      recentPushes.map(async (event) => {
        const repoName = event.repo.name;
        const commitSha = event.payload.head; // commit SHA from the event

        try {
          const commitResponse = await fetch(
            `https://api.github.com/repos/${repoName}/commits/${commitSha}`
          );

          if (commitResponse.ok) {
            const commitData = await commitResponse.json();
            return {
              repoName,
              message: commitData.commit.message,
              date: event.created_at,
            };
          }
        } catch (err) {
          console.error("Failed to fetch commit:", err);
        }

        // Fallback if fetch fails
        return {
          repoName,
          message: "No commit message available",
          date: event.created_at,
        };
      })
    );

    // Build a small list of recent pushes with real commit messages
    const itemsHtml = pushesWithCommits
      .map((push) => {
        const relTime = timeAgo(push.date);
        return `<li>Push to <strong>${push.repoName}</strong>: "${push.message}" (${relTime})</li>`;
      })
      .join("");

    statusElement.innerHTML = `
      <p>Recent GitHub activity:</p>
      <ul>
        ${itemsHtml}
      </ul>
    `;
  } catch (error) {
    statusElement.textContent = "Unable to load GitHub status";
    console.error(error);
  }
}

// --- CORE APP ---
async function init() {
  try {
    const response = await fetch("projects.json");
    const projects = await response.json();
    renderTracks(projects);
    setupDebugToggle();
    setupScrollEffects();
    setupBugCounter();
    setupAboutToggle();
    fetchGitHubCommits();
    setupScrollReveal();
  } catch (err) {
    console.error("System Initialization Failed:", err);
  }
}

function renderTracks(projects) {
  const app = document.getElementById("project-tracks");

  // Define categories for display and order
  const categories = [
    "the-odin-project",
    "scrimba",
    "frontend-mentor",
    "personal",
  ];

  categories.forEach((category) => {
    const filtered = projects.filter(
      (project) => project.category === category
    );
    if (filtered.length > 0) {
      const cardsHTML = filtered
        .map(
          (project) => `
        <article class="card">
          <img class="card-image" src="${project.image}" alt="Screenshot of ${
            project.title
          }">
          <div class="card-content">
            <p class="card-title">${project.title}</p>
            <p class="card-desc">${project.description}</p>
            <div class="card-tech">
              ${project.tech
                .map((tech) => `<span class="tech-tag">${tech}</span>`)
                .join("")}
            </div>
            <div class="card-actions">
              <a href="${
                project.demo
              }" class="primary-card-btn" target="_blank">DEMO</a>
              <a href="${
                project.github
              }" class="card-btn" target="_blank">CODE</a>
            </div>
          </div>
        </article>`
        )
        .join("");

      const trackSection = `
      <section class="track-section" aria-labelledby="projects-heading">
        <h3>${category.replaceAll("-", " ").toUpperCase()}</h3>
        <div class="track">
          ${cardsHTML}
        </div>
      </section>
      `;

      app.innerHTML += trackSection;
    }
  });
}

function setupDebugToggle() {
  const btn = document.getElementById("debugToggle");
  const heroSub = document.getElementById("hero-text");
  const statusT = document.getElementById("status-text");

  btn.addEventListener("click", () => {
    document.body.classList.toggle("debug-on");
    const isOn = document.body.classList.contains("debug-on");
    document.getElementById("debugStatus").textContent = isOn ? "ON" : "OFF";

    if (isOn) {
      heroSub.innerHTML =
        'SYSTEM_READY: <span class="highlight">INITIATING_NERD_MODE.</span>';
      statusT.innerHTML =
        '[ STATUS: <span class="orange-text">SEARCHING_FOR_COFFEE_&_BUGS</span> ]';
    } else {
      heroSub.innerHTML =
        'WEB DEVELOPER IN TRAINING. <span class="highlight">MAKE THINGS SIMPLE BUT FUN</span>';
      statusT.innerHTML =
        '[ LOCATION: <span class="orange-text">PHILIPPINES</span> ]';
    }
  });
}

function setupScrollEffects() {
  document.addEventListener(
    "scroll",
    () => {
      const containers = document.querySelectorAll(".track-scroll-container");
      containers.forEach((container) => {
        const scrollWidth = container.scrollWidth - container.clientWidth;
        const percent =
          Math.round((container.scrollLeft / scrollWidth) * 100) || 0;
        const parent = container.parentElement;
        parent.querySelector(".progress-bar").style.width = `${percent}%`;
        parent.querySelector(
          ".scan-label"
        ).textContent = `SCANNING: ${percent}%`;
        parent.querySelector(".scan-label").style.opacity = "1";
      });
    },
    true
  );
}

// --- SCROLL REVEAL ENGINE ---
function setupScrollReveal() {
  const observerOptions = {
    threshold: 0.15, // Section must be 15% visible to trigger
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        // Once visible, stop observing to save system resources
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Apply to all elements with the 'reveal' class
  const revealElements = document.querySelectorAll(".reveal");
  revealElements.forEach((el) => observer.observe(el));
}

function setupBugCounter() {
  const area = document.getElementById("bugCounter");
  const display = document.getElementById("clickCount");
  let count = parseInt(localStorage.getItem("bugs")) || 42;
  display.textContent = count;
  area.addEventListener("click", () => {
    count++;
    display.textContent = count;
    localStorage.setItem("bugs", count);
    display.style.transform = "scale(1.2)";
    setTimeout(() => (display.style.transform = "scale(1)"), 100);
  });
}

function setupAboutToggle() {
  const expBtn = document.getElementById("showExperience");
  const eduBtn = document.getElementById("showEducation");
  const expView = document.getElementById("experience-view");
  const eduView = document.getElementById("education-view");

  expBtn.addEventListener("click", () => {
    expBtn.classList.add("active");
    eduBtn.classList.remove("active");
    expView.classList.add("active");
    eduView.classList.remove("active");
  });
  eduBtn.addEventListener("click", () => {
    eduBtn.classList.add("active");
    expBtn.classList.remove("active");
    eduView.classList.add("active");
    expView.classList.remove("active");
  });
}

document.addEventListener("DOMContentLoaded", init);
