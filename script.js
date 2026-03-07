// --- CONFIGURATION ---
const TRACK_MAP = {
  personal: { id: "EXT-01", title: "PERSONAL_PROJECTS" },
  odin: { id: "FND-02", title: "THE_ODIN_PROJECT" },
  scrimba: { id: "INT-03", title: "SCRIMBA" },
  "frontend-mentor": { id: "UXX-04", title: "FRONTEND_MENTOR" },
};

// --- HERO TEXT CONFIGS ---
const ELEGANT_TEXT = {
  heroPrefix: "Developer \u2014 Building beautiful things, one line at a time.",
  heroHighlight: null,
  statusPrefix: "Based in the ",
  statusHighlight: "Philippines",
};

const NERD_TEXT = {
  heroPrefix: "DEV LAB \u2014 ",
  heroHighlight: "BUILDING, BREAKING, LEARNING.",
  statusPrefix: "LOCATION: ",
  statusHighlight: "PHILIPPINES",
};

const NERD_TEXT_DEBUG = {
  heroPrefix: "SYSTEM_READY: ",
  heroHighlight: "INITIATING_NERD_MODE.",
  statusPrefix: "STATUS: ",
  statusHighlight: "SEARCHING_FOR_COFFEE_&_BUGS",
};

// --- SYSTEM TAGS CONFIG ---
const SYSTEM_TAGS_CONFIG = [
  { selector: ".track-section:nth-of-type(1)", text: "[STABLE]" },
  { selector: ".track-section:nth-of-type(2)", text: "[WIP]" },
  { selector: ".track-section:nth-of-type(3)", text: "[EXPERIMENTAL]" },
  { selector: ".track-section:nth-of-type(4)", text: "[v0.3]" },
  { selector: ".tech-stack-section", text: "[NEEDS_COFFEE]" },
  { selector: ".about-container", text: "[WORKS_ON_MY_MACHINE]" },
  { selector: ".cta-box", text: "[SEND_HELP]" },
  { selector: "#maintenance", text: "[BETA]" },
];

// --- CONSOLE ASCII ART ---
const ASCII_ART =
  " ███████╗██╗  ██╗ ██████╗ ██╗██████╗ \n" +
  " ██╔════╝╚██╗██╔╝██╔════╝███║██╔══██╗\n" +
  " █████╗   ╚███╔╝ ██║     ╚██║██║  ██║\n" +
  " ██╔══╝   ██╔██╗ ██║      ██║██║  ██║\n" +
  " ███████╗██╔╝ ██╗╚██████╗ ██║██████╔╝\n" +
  " ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝╚═════╝ ";

// --- TECH BRAND COLORS ---
const TECH_COLORS = {
  'HTML':        { color: '#E34F26', text: '#fff' },
  'CSS':         { color: '#1572B6', text: '#fff' },
  'JS':          { color: '#F7DF1E', text: '#000' },
  'JavaScript':  { color: '#F7DF1E', text: '#000' },
  'React':       { color: '#61DAFB', text: '#000' },
  'Tailwind CSS':{ color: '#06B6D4', text: '#fff' },
  'Node.js':     { color: '#339933', text: '#fff' },
  'Express.js':  { color: '#3c3c3c', text: '#fff' },
  'PostgreSQL':  { color: '#4169E1', text: '#fff' },
  'MongoDB':     { color: '#47A248', text: '#fff' },
  'Cloudflare':  { color: '#F38020', text: '#fff' },
  'KV':          { color: '#F38020', text: '#fff' },
  'Git':         { color: '#F05032', text: '#fff' },
  'GitHub':      { color: '#181717', text: '#fff' },
};

// --- STATE ---
let scrambleListeners = [];
let isNerdMode = false;

// ============================================================
// TEXT SCRAMBLE
// ============================================================
function scrambleText(element) {
  const original =
    element.getAttribute("data-original") || element.textContent;
  if (!element.getAttribute("data-original")) {
    element.setAttribute("data-original", original);
  }

  const chars = "!<>-_\\/[]{}=+*^?#@~|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let frame = 0;
  const totalFrames = original.length * 3;

  // Cancel any in-progress scramble
  if (element._scrambleInterval) {
    clearInterval(element._scrambleInterval);
  }

  element._scrambleInterval = setInterval(() => {
    element.textContent = original
      .split("")
      .map((char, i) => {
        if (char === " ") return " ";
        if (frame / 3 > i) return original[i];
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join("");

    frame++;
    if (frame >= totalFrames) {
      element.textContent = original;
      clearInterval(element._scrambleInterval);
      element._scrambleInterval = null;
    }
  }, 25);
}

function setupTextScramble() {
  const headings = document.querySelectorAll(
    ".section-title, .track-section h3, .pane-title, .cta-title, .repair-info .section-title"
  );
  headings.forEach((el) => {
    const handler = () => scrambleText(el);
    el.addEventListener("mouseenter", handler);
    el.style.cursor = "default";
    scrambleListeners.push({ el, handler });
  });
}

function teardownTextScramble() {
  scrambleListeners.forEach(({ el, handler }) => {
    el.removeEventListener("mouseenter", handler);
    // Restore original text if scramble was in progress
    if (el._scrambleInterval) {
      clearInterval(el._scrambleInterval);
      el._scrambleInterval = null;
    }
    const original = el.getAttribute("data-original");
    if (original) el.textContent = original;
  });
  scrambleListeners = [];
}

// ============================================================
// GLITCH TRANSITION (elegant → nerd)
// ============================================================
function glitchTransition(callback) {
  const overlay = document.createElement("div");
  overlay.className = "glitch-overlay";

  // Random horizontal tear bars
  for (let i = 0; i < 7; i++) {
    const bar = document.createElement("div");
    bar.className = "glitch-bar";
    bar.style.top = `${5 + Math.random() * 88}%`;
    bar.style.height = `${1 + Math.random() * 5}%`;
    bar.style.animationDelay = `${Math.random() * 0.18}s`;
    bar.style.opacity = `${0.2 + Math.random() * 0.5}`;
    overlay.appendChild(bar);
  }

  document.body.appendChild(overlay);

  // Swap theme at peak of the flash
  setTimeout(() => {
    if (callback) callback();
  }, 160);

  // Clean up overlay
  setTimeout(() => {
    overlay.remove();
  }, 620);
}

// ============================================================
// DISSOLVE TRANSITION (nerd → elegant)
// ============================================================
function dissolveTransition(callback) {
  const overlay = document.createElement("div");
  overlay.className = "dissolve-overlay";
  document.body.appendChild(overlay);

  if (callback) callback();

  setTimeout(() => overlay.remove(), 1100);
}

// ============================================================
// SYSTEM TAGS
// ============================================================
function injectSystemTags() {
  SYSTEM_TAGS_CONFIG.forEach(({ selector, text }) => {
    const el = document.querySelector(selector);
    if (!el) return;
    // Ensure relative positioning for absolute tag placement
    const pos = getComputedStyle(el).position;
    if (pos === "static") el.style.position = "relative";

    const tag = document.createElement("span");
    tag.className = "system-tag";
    tag.textContent = text;
    el.appendChild(tag);
  });
}

function removeSystemTags() {
  document.querySelectorAll(".system-tag").forEach((tag) => tag.remove());
}

// ============================================================
// CONSOLE EASTER EGGS
// ============================================================
function printConsoleEasterEggs() {
  console.clear();
  console.log(
    "%c" + ASCII_ART,
    "color: #dc143c; font-family: monospace; font-size: 10px; line-height: 1.4;"
  );
  console.log(
    "%c NERD_MODE: ACTIVATED ",
    "background: #dc143c; color: #fff; font-size: 14px; padding: 4px 10px; font-weight: bold; font-family: monospace;"
  );
  console.log(
    "%c You found the dev console. You are one of us. ",
    "color: #dc143c; font-style: italic; font-family: monospace;"
  );
  console.log(
    "%c Try clicking the bug counter. A lot. ",
    "color: #666; font-family: monospace;"
  );
  console.log(
    "%c ─────────────────────────────────────── ",
    "color: #333;"
  );
  console.log(
    "%c github.com/Exc1D  //  davidaviado.dla@gmail.com ",
    "color: #888; font-family: monospace; font-size: 11px;"
  );
}

// ============================================================
// SET HERO TEXT
// ============================================================
function setHeroText(heroSub, statusT, config) {
  heroSub.textContent = "";
  heroSub.append(config.heroPrefix);

  if (config.heroHighlight) {
    const span = document.createElement("span");
    span.className = "highlight";
    span.textContent = config.heroHighlight;
    heroSub.appendChild(span);
  }

  statusT.textContent = "";
  statusT.append(config.statusPrefix);

  const span = document.createElement("span");
  span.className = "highlight";
  span.textContent = config.statusHighlight;
  statusT.appendChild(span);
}

// ============================================================
// NERD MODE TOGGLE
// ============================================================
function setupNerdModeToggle() {
  const btn = document.getElementById("debugToggle");
  const heroSub = document.getElementById("hero-text");
  const statusT = document.getElementById("status-text");
  const note = document.getElementById("scanNote");

  btn.addEventListener("click", () => {
    if (isNerdMode) {
      // --- PEACEFUL EXIT: nerd → elegant ---
      dissolveTransition(() => {
        document.body.classList.remove("nerd-mode");
        document.getElementById("debugStatus").textContent = "OFF";
        isNerdMode = false;

        // Restore hero text
        heroSub.textContent =
          "Developer \u2014 Building beautiful things, one line at a time.";
        statusT.textContent = "";
        statusT.append("Based in the ");
        const span = document.createElement("span");
        span.className = "highlight";
        span.textContent = "Philippines";
        statusT.appendChild(span);

        // Restore notification
        note.textContent = "Thanks for visiting \u2014 scroll down to explore.";

        // Remove nerd features
        removeSystemTags();
        teardownTextScramble();
      });
    } else {
      // --- VIOLENT ENTRY: elegant → nerd ---
      glitchTransition(() => {
        document.body.classList.add("nerd-mode");
        document.getElementById("debugStatus").textContent = "ON";
        isNerdMode = true;

        // Swap hero text
        setHeroText(heroSub, statusT, NERD_TEXT);

        // Swap notification
        note.textContent = "SCAN_COMPLETE: HIGH_POTENTIAL_DETECTED";

        // Activate nerd features
        injectSystemTags();
        setupTextScramble();
        printConsoleEasterEggs();
      });
    }
  });
}

// ============================================================
// NOTIFICATION
// ============================================================
function setupNotification() {
  const note = document.getElementById("scanNote");
  setTimeout(() => {
    note.classList.add("show");
    setTimeout(() => note.classList.remove("show"), 4000);
  }, 800);
}

// ============================================================
// GITHUB COMMITS
// ============================================================
async function fetchGitHubCommits() {
  const username = "Exc1D";
  const statusElement = document.getElementById("commit-list");

  const timeAgo = (isoString) => {
    const now = new Date();
    const then = new Date(isoString);
    const diffMs = now - then;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHrs = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHrs / 24);

    if (diffSec < 60) return "just now";
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHrs < 24) return `${diffHrs}h ago`;
    return `${diffDays}d ago`;
  };

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/events/public`
    );

    if (!response.ok) throw new Error("GitHub API Error");

    const events = await response.json();
    const recentPushes = events
      .filter((event) => event.type === "PushEvent")
      .slice(0, 3);

    if (recentPushes.length === 0) {
      statusElement.innerHTML =
        '<li class="loading-text">No recent activity found.</li>';
      return;
    }

    const pushesWithCommits = await Promise.all(
      recentPushes.map(async (event) => {
        const repoName = event.repo.name;
        const commitSha = event.payload.head;

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

        return {
          repoName,
          message: "No commit message available",
          date: event.created_at,
        };
      })
    );

    statusElement.innerHTML = pushesWithCommits
      .map(
        (push) =>
          `<li><span class="commit-date">${timeAgo(push.date)}</span>Push to <strong>${push.repoName}</strong>: "${push.message}"</li>`
      )
      .join("");
  } catch (error) {
    statusElement.innerHTML =
      '<li class="loading-text">Unable to load GitHub status.</li>';
    console.error(error);
  }
}

// ============================================================
// RENDER TRACKS
// ============================================================
function renderTracks(projects) {
  const app = document.getElementById("project-tracks");

  const categories = [
    "the-odin-project",
    "scrimba",
    "frontend-mentor",
    "personal",
  ];

  categories.forEach((category) => {
    const filtered = projects.filter((p) => p.category === category);
    if (filtered.length === 0) return;

    // Title case for elegant mode; CSS handles uppercase in nerd mode
    const displayName = category
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    const cardsHTML = filtered
      .map(
        (project) => `
        <article class="card">
          <img class="card-image" src="${project.image}" alt="Screenshot of ${project.title}" loading="lazy">
          <div class="card-content">
            <p class="card-title">${project.title}</p>
            <p class="card-desc">${project.description}</p>
            <div class="card-tech">
              ${project.tech.map((t) => { const c = TECH_COLORS[t]; const s = c ? ` style="--tech-color:${c.color};--tech-text-color:${c.text}"` : ''; return `<span class="tech-tag"${s}>${t}</span>`; }).join("")}
            </div>
            <div class="card-actions">
              <a href="${project.demo}" class="primary-card-btn" target="_blank" rel="noopener">DEMO</a>
              <a href="${project.github}" class="card-btn" target="_blank" rel="noopener">CODE</a>
            </div>
          </div>
        </article>`
      )
      .join("");

    app.innerHTML += `
      <section class="track-section reveal" aria-labelledby="track-${category}">
        <h3 id="track-${category}">${displayName}</h3>
        <div class="track">${cardsHTML}</div>
      </section>`;
  });
}

// ============================================================
// SCROLL EFFECTS (track progress bars)
// ============================================================
function setupScrollEffects() {
  document.addEventListener(
    "scroll",
    () => {
      const containers = document.querySelectorAll(".track");
      containers.forEach((container) => {
        const scrollWidth = container.scrollWidth - container.clientWidth;
        if (scrollWidth <= 0) return;
        const percent =
          Math.round((container.scrollLeft / scrollWidth) * 100) || 0;
        const parent = container.parentElement;
        const bar = parent.querySelector(".progress-bar");
        if (bar) bar.style.width = `${percent}%`;
      });
    },
    true
  );
}

// ============================================================
// SCROLL REVEAL
// ============================================================
function setupScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

// ============================================================
// BUG COUNTER
// ============================================================
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
    setTimeout(() => (display.style.transform = "scale(1)"), 150);
  });
}

// ============================================================
// ABOUT TOGGLE
// ============================================================
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

// ============================================================
// INIT
// ============================================================
async function init() {
  try {
    const response = await fetch("projects.json");
    const projects = await response.json();

    renderTracks(projects);
    setupNerdModeToggle();
    setupScrollEffects();
    setupBugCounter();
    setupAboutToggle();
    setupScrollReveal();
    setupNotification();
    fetchGitHubCommits();
  } catch (err) {
    console.error("System Initialization Failed:", err);
  }
}

document.addEventListener("DOMContentLoaded", init);
