const GITHUB_TOKEN =
  "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";
const GITHUB_USERNAME = "Exc1D";

// Projects data
const projects = [
  {
    title: "Awesome Grade Calculator",
    category: "personal",
    description:
      "A gamified project evaluation system with MOBA-style ranking progression, sound effects, and comprehensive statistics tracking.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Exc1D/day-04-epic-grade-calculator",
    demo: "https://exc1d.github.io/day-04-epic-grade-calculator/",
  },
  {
    title: "PX-to-REM Converter",
    category: "personal",
    description:
      "A polished, fully interactive converter with smart rounding, live updates, batch processing, and dark mode.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Exc1D/px-to-rem",
    demo: "https://exc1d.github.io/px-to-rem/",
  },
  {
    title: "EXXEED | The Mission Log",
    category: "personal",
    description:
      "Serverless blogging platform built on Cloudflare Workers with Military/Cyberpunk aesthetic and built-in CMS.",
    tech: ["Cloudflare Workers", "KV Storage", "JavaScript"],
    github: "https://github.com/Exc1D/exxeed-blog",
    demo: "https://iexceed.xyz/",
  },
  {
    title: "Etch-a-Sketch",
    category: "odin",
    description:
      "Interactive browser-based sketching pad with multiple pen modes, adjustable grid sizes, and mobile touch support.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Exc1D/odin-etch-a-sketch",
    demo: "https://exc1d.github.io/odin-etch-a-sketch/",
  },
  {
    title: "Almost Boring Calculator",
    category: "odin",
    description:
      "Fully functional web calculator built with vanilla JavaScript. No advanced methods, just pure functions.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Exc1D/odin-calculator",
    demo: "https://exc1d.github.io/odin-calculator/",
  },
  {
    title: "Kawaii Rock, Paper, Scissors",
    category: "odin",
    description:
      "Web-based mini-game with dynamic scoring, responsive design, and sound effects.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Exc1D/odin-kawaii-rps",
    demo: "https://exc1d.github.io/odin-kawaii-rps/",
  },
  {
    title: "Oldagram",
    category: "scrimba",
    description:
      "Instagram clone with dynamic feed rendering and interactive like functionality with animations.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Exc1D/scrimba-oldagram",
    demo: "https://exc1d.github.io/scrimba-oldagram/",
  },
  {
    title: "Random Passwordinator",
    category: "scrimba",
    description:
      "Dr. Doofenshmirtz-inspired password generator with fun animations and customizable parameters.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Exc1D/Passwordinator",
    demo: "https://exc1d.github.io/Passwordinator/",
  },
  {
    title: "Unit Converter",
    category: "scrimba",
    description:
      "Simple web-based converter for length, volume, and mass. Ready for Chrome extension conversion.",
    tech: ["HTML", "CSS", "JavaScript"],
    github:
      "https://github.com/Exc1D/Unit-Converter-Solo-project-from-Scrimba-",
    demo: "https://exc1d.github.io/Unit-Converter-Solo-project-from-Scrimba-/",
  },
  {
    title: "Product Preview Page",
    category: "frontend-mentor",
    description:
      "First take on responsive CSS design featuring a clean product layout.",
    tech: ["HTML", "CSS"],
    github: "https://github.com/Exc1D/product-preview",
    demo: "https://exc1d.github.io/product-preview/",
  },
  {
    title: "Age Calculator",
    category: "frontend-mentor",
    description: "Elegant age calculator with personality and fun animations.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Exc1D/day-03-age-calculator",
    demo: "https://exc1d.github.io/day-03-age-calculator/",
  },
  {
    title: "Blog Card",
    category: "frontend-mentor",
    description:
      "Solution to Frontend Mentor's challenge showcasing CSS specifications with custom hover effects.",
    tech: ["HTML", "CSS"],
    github: "https://github.com/Exc1D/blog-card",
    demo: "https://exc1d.github.io/blog-card/",
  },
];

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
                    }" target="_blank" class="btn btn-primary">
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

// Fetch GitHub stats
async function fetchGitHubStats() {
  try {
    const headers = {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };

    const userResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}`,
      { headers }
    );

    if (!userResponse.ok) {
      throw new Error(`GitHub API error: ${userResponse.status}`);
    }

    const userData = await userResponse.json();

    const reposResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`,
      { headers }
    );

    if (!reposResponse.ok) {
      throw new Error(`GitHub API error: ${reposResponse.status}`);
    }

    const reposData = await reposResponse.json();

    const totalStars = reposData.reduce(
      (sum, repo) => sum + repo.stargazers_count,
      0
    );
    const totalForks = reposData.reduce(
      (sum, repo) => sum + repo.forks_count,
      0
    );

    document.getElementById("totalRepos").textContent =
      userData.public_repos || 0;
    document.getElementById("totalStars").textContent = totalStars;
    document.getElementById("totalForks").textContent = totalForks;
    document.getElementById("totalFollowers").textContent =
      userData.followers || 0;
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    // Fallback to manual counts
    document.getElementById("totalRepos").textContent = "20+";
    document.getElementById("totalStars").textContent = "--";
    document.getElementById("totalForks").textContent = "--";
    document.getElementById("totalFollowers").textContent = "--";
  }
}

// Fetch GitHub commits
async function fetchGitHubCommits() {
  try {
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
  renderProjects();
  observeElements();
  fetchGitHubStats();
  fetchGitHubCommits();
});
