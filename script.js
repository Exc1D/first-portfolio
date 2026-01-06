let projects = [];

// Load projects from JSON
async function loadProjects() {
  try {
    const response = await fetch("projects.json");
    projects = await response.json();
    renderProjects();
  } catch (error) {
    console.error("Error loading projects:", error);
  }
}

let currentCategory = "all";
let virtualScrollOffset = 0;
const ITEMS_PER_PAGE = 6;

// Render projects with virtual scrolling
function renderProjects(filter = "all") {
  currentCategory = filter;
  const grid = document.getElementById("projectsGrid");
  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  grid.innerHTML = filteredProjects
    .map(
      (project, index) => `
        <div class="project-card fade-in" style="animation-delay: ${
          index * 0.1
        }s">
            <div class="project-content">
                <div class="project-header">
                    <div>
                        <h3 class="project-title">${project.title}</h3>
                    </div>
                    <span class="project-category-tag">${
                      project.category
                    }</span>
                </div>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.tech
                      .map((tech) => `<span class="tech-tag">${tech}</span>`)
                      .join("")}
                </div>
                <div class="project-links">
                    <a href="${
                      project.demo
                    }" target="_blank" class="btn-cta btn-cta-primary">
                        <i class="fas fa-external-link-alt"></i>
                        Live Demo
                    </a>
                    <a href="${
                      project.github
                    }" target="_blank" class="btn btn-secondary">
                        <i class="fab fa-github"></i>
                        Code
                    </a>
                </div>
            </div>
        </div>
    `
    )
    .join("");

  observeElements();
}

// Category filter
document.querySelectorAll(".category-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".category-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderProjects(btn.dataset.category);
  });
});

// Click counter
let clickCount = 0;
const clickCounter = document.getElementById("clickCounter");
const clickCountDisplay = document.getElementById("clickCount");

clickCounter.addEventListener("click", () => {
  clickCount++;
  clickCountDisplay.textContent = clickCount;
  try {
    localStorage.setItem("portfolioClicks", clickCount);
  } catch (e) {
    console.log("localStorage not available");
  }
});

// Load saved click count
try {
  const savedClicks = localStorage.getItem("portfolioClicks");
  if (savedClicks) {
    clickCount = parseInt(savedClicks);
    clickCountDisplay.textContent = clickCount;
  }
} catch (e) {
  console.log("localStorage not available");
}

// Live timer
let seconds = 0;
const timerDisplay = document.getElementById("liveTimer");

setInterval(() => {
  seconds++;
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  timerDisplay.textContent = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}, 1000);

// Fetch GitHub commits
async function fetchGitHubCommits() {
  try {
    // Load environment variables
    const envResponse = await fetch(".env");
    const envText = await envResponse.text();
    const envVars = {};
    envText.split("\n").forEach((line) => {
      const [key, value] = line.split("=");
      if (key && value) {
        envVars[key.trim()] = value.trim();
      }
    });

    const GITHUB_TOKEN = envVars.GITHUB_TOKEN;
    const GITHUB_USERNAME = envVars.GITHUB_USERNAME;

    const headers = {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };

    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/events/public`,
      { headers }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const events = await response.json();

    const commits = events
      .filter((event) => event.type === "PushEvent")
      .slice(0, 5)
      .map((event) => ({
        message: event.payload.commits[0]?.message || "Commit",
        repo: event.repo.name,
        time: new Date(event.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
      }));

    const commitList = document.getElementById("commitList");
    if (commits.length > 0) {
      commitList.innerHTML = commits
        .map(
          (commit) => `
                <li class="commit-item">
                    <div class="commit-dot"></div>
                    <span class="commit-message">${commit.message.substring(
                      0,
                      60
                    )}${commit.message.length > 60 ? "..." : ""}</span>
                    <span class="commit-time">${commit.time}</span>
                </li>
            `
        )
        .join("");
    } else {
      commitList.innerHTML =
        '<li class="commit-item"><div class="commit-dot"></div><span class="commit-message">No recent activity</span></li>';
    }
  } catch (error) {
    console.error("Error fetching GitHub commits:", error);
    document.getElementById("commitList").innerHTML = `
            <li class="commit-item">
                <div class="commit-dot"></div>
                <span class="commit-message">Could not load recent activity</span>
            </li>
        `;
  }
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Intersection Observer for fade-in animations
function observeElements() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  loadProjects();
  observeElements();
  fetchGitHubCommits();
});
