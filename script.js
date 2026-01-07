const projects = [
  {
    title: "EXO_SHELL",
    category: "personal",
    file: "sys_01.js",
    tech: ["Node", "Socket.io"],
  },
  {
    title: "PORTFOLIO_V4",
    category: "personal",
    file: "main.css",
    tech: ["Vanilla JS"],
  },
  {
    title: "ODIN_LANDING",
    category: "odin",
    file: "index.html",
    tech: ["HTML", "Flexbox"],
  },
  {
    title: "CALC_MODULE",
    category: "odin",
    file: "calc.js",
    tech: ["JS Logic"],
  },
  {
    title: "NFT_DASHBOARD",
    category: "frontend-mentor",
    file: "ui_card.tsx",
    tech: ["React"],
  },
];

// 1. Initialize Tracks
function initTracks() {
  const tracks = {
    personal: document.getElementById("personal-track"),
    odin: document.getElementById("odin-track"),
    scrimba:
      document.getElementById("scrimba-track") ||
      document.getElementById("odin-track"),
  };

  projects.forEach((project) => {
    const container = tracks[project.category] || tracks["personal"];
    const card = document.createElement("div");
    card.className = "project-card";
    card.setAttribute("data-file", project.file);

    card.innerHTML = `
            <div class="card-header">
                <span class="status-light"></span>
                <span class="code-font">${project.file}</span>
            </div>
            <h3 style="margin: 20px 0; font-size: 2rem;">${project.title}</h3>
            <div class="project-tech" style="margin-bottom: 30px;">
                ${project.tech
                  .map((t) => `<span class="v-tag">${t}</span>`)
                  .join("")}
            </div>
            <div class="card-actions">
                <button class="toggle-btn btn-pulse">DEPLOY</button>
                <button class="toggle-btn" style="background:transparent; border:1px solid var(--slate)">SOURCE</button>
            </div>
        `;

    card.addEventListener("mouseenter", handleHoverTracking);
    container.appendChild(card);
  });
}

// 2. Debug Toggle
const debugBtn = document.getElementById("debugToggle");
debugBtn.addEventListener("click", () => {
  document.body.classList.toggle("debug-on");
  const isOn = document.body.classList.contains("debug-on");
  debugBtn.textContent = isOn ? "ON" : "OFF";
  debugBtn.classList.toggle("active");
});

// 3. Fun Logic: Hover Tracking
let hoverCount = 0;
function handleHoverTracking() {
  hoverCount++;
  if (hoverCount === 5) {
    const note = document.getElementById("scanNotification");
    note.classList.add("show");
    setTimeout(() => note.classList.remove("show"), 4000);
  }
}

// 4. Scan Progress Bar Logic
document.querySelectorAll(".horizontal-scroll").forEach((track) => {
  track.addEventListener("scroll", (e) => {
    const scrollWidth = track.scrollWidth - track.clientWidth;
    const progress = (track.scrollLeft / scrollWidth) * 100;
    track.parentElement.querySelector(
      ".scan-progress"
    ).style.width = `${progress}%`;
  });
});

// 5. Bug Counter (Squash Logic)
let bugs = localStorage.getItem("bugs") || 42;
const bugDisplay = document.getElementById("clickCount");
bugDisplay.textContent = bugs;

document.getElementById("clickCounter").addEventListener("click", () => {
  bugs++;
  bugDisplay.textContent = bugs;
  localStorage.setItem("bugs", bugs);
  // Visual feedback
  bugDisplay.style.transform = "scale(1.2)";
  setTimeout(() => (bugDisplay.style.transform = "scale(1)"), 100);
});

document.addEventListener("DOMContentLoaded", initTracks);
