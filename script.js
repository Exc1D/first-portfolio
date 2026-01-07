/**
 * EXC1D SYSTEM CORE v1.0.0
 * Logic for: Debug Mode, Horizontal Tracks, Scanning Progress, and UI Toggles
 */

// --- 1. PROJECT DATABASE ---
// Organized by Track ID as per Brand Blueprint
const trackData = [
  {
    id: "EXT-01",
    title: "CORE_SYSTEMS", // Personal Projects
    projects: [
      {
        name: "EXO_SHELL",
        file: "sys_01.js",
        tech: ["Node.js", "Socket.io"],
        spark: "Achieved sub-10ms latency in data transfer.",
        fix: "Refactored event listeners to prevent memory leaks.",
        size: "14.2kb",
      },
      {
        name: "PORTFOLIO_V4",
        file: "main.css",
        tech: ["Vanilla JS", "CSS3"],
        spark: "Built a custom glitch engine without external libraries.",
        fix: "Optimized scroll-snapping for mobile performance.",
        size: "8.5kb",
      },
    ],
  },
  {
    id: "FND-02",
    title: "FOUNDATION_PROTOCOLS", // The Odin Project
    projects: [
      {
        name: "ODIN_LANDING",
        file: "index.html",
        tech: ["HTML5", "Flexbox"],
        spark: "100% responsive layout matching high-fidelity figma.",
        fix: "Solved z-index stacking context in sticky headers.",
        size: "4.1kb",
      },
      {
        name: "CALC_MODULE",
        file: "calc.js",
        tech: ["JS Logic"],
        spark: "Handles complex floating point and negative arithmetic.",
        fix: "Implemented defensive checks for division by zero.",
        size: "12.0kb",
      },
    ],
  },
  {
    id: "INT-03",
    title: "INTERACTIVE_LOGS", // Scrimba
    projects: [
      {
        name: "MOVIE_WATCHLIST",
        file: "app.js",
        tech: ["API", "JSON"],
        spark: "Real-time search with local storage persistence.",
        fix: "Handled asynchronous API rate-limiting errors.",
        size: "11.2kb",
      },
      {
        name: "UNIT_CONVERTER",
        file: "index.js",
        tech: ["Math JS"],
        spark: "Instant conversion updates via 'input' event listeners.",
        fix: "Sanitized input to prevent non-numeric characters.",
        size: "2.8kb",
      },
    ],
  },
  {
    id: "UXX-04",
    title: "INTERFACE_STRESS_TESTS", // Frontend Mentor
    projects: [
      {
        name: "NFT_CARD",
        file: "card.css",
        tech: ["CSS Grid"],
        spark: "Used CSS filters for a holographic hover effect.",
        fix: "Normalized image aspect ratios across screen sizes.",
        size: "5.4kb",
      },
      {
        name: "DASHBOARD_UI",
        file: "ui.html",
        tech: ["Accessible HTML"],
        spark: "Achieved perfect 100/100 Lighthouse accessibility score.",
        fix: "Fixed contrast ratios for WCAG AA compliance.",
        size: "18.9kb",
      },
    ],
  },
];

// --- 2. INITIALIZATION ENGINE ---
function init() {
  renderTracks();
  setupDebugToggle();
  setupScrollEffects();
  setupBugCounter();
  setupAboutToggle();
}

// --- 3. CORE FUNCTIONS ---

// A. RENDER TRACKS: Dynamically builds the project horizontal sections
function renderTracks() {
  const container = document.getElementById("project-tracks");
  if (!container) return;

  trackData.forEach((track) => {
    const trackSection = document.createElement("div");
    trackSection.className = "track-group";

    trackSection.innerHTML = `
            <div class="track-header font-mono">
                <span class="track-id">${track.id}</span>
                <span class="track-divider"></span>
                <h2 class="track-title">${track.title}</h2>
                <div class="scan-label">SCANNING: 0%</div>
            </div>
            
            <div class="track-scroll-container">
                ${track.projects
                  .map(
                    (p) => `
                    <div class="project-card">
                        <div class="debug-metadata font-mono">[SIZE: ${
                          p.size
                        } // STATUS: STABLE]</div>
                        
                        <div class="card-top">
                            <div class="status-indicator font-mono">
                                <div class="dot"></div>
                                <span>${p.file}</span>
                            </div>
                            <div class="tech-tags font-mono">
                                ${p.tech
                                  .map((t) => `<span class="tag">${t}</span>`)
                                  .join("")}
                            </div>
                        </div>

                        <h3 class="project-name">${p.name}</h3>
                        
                        <div class="project-insight font-mono">
                            <div class="insight-row"><span class="insight-label">>> SPARK:</span> ${
                              p.spark
                            }</div>
                            <div class="insight-row"><span class="insight-label">>> FIX:</span> ${
                              p.fix
                            }</div>
                        </div>

                        <div class="card-actions font-mono">
                            <button class="btn-primary" onclick="alert('System Deploying...')">DEPLOY</button>
                            <button class="btn-secondary" onclick="alert('Accessing Source...')">SOURCE</button>
                        </div>
                    </div>
                `
                  )
                  .join("")}
            </div>
            
            <div class="progress-container">
                <div class="progress-bar"></div>
            </div>
        `;

    container.appendChild(trackSection);
  });
}

// B. DEBUG TOGGLE: Switches grid, metadata, and copy
function setupDebugToggle() {
  const btn = document.getElementById("debugToggle");
  const statusText = document.getElementById("debugStatus");
  const heroSubline = document.getElementById("hero-text");
  const statusTag = document.getElementById("status-text");

  if (!btn) return;

  btn.addEventListener("click", () => {
    const isCurrentlyOff = !document.body.classList.contains("debug-on");

    // Toggle Body Class
    document.body.classList.toggle("debug-on");

    // Update Button UI
    statusText.textContent = isCurrentlyOff ? "ON" : "OFF";
    btn.style.backgroundColor = isCurrentlyOff
      ? "var(--orange)"
      : "transparent";
    btn.style.color = isCurrentlyOff ? "black" : "white";

    // Swap Copy (Professional vs Candid/Technical)
    if (isCurrentlyOff) {
      heroSubline.textContent = heroSubline.getAttribute("data-debug");
      statusTag.textContent = statusTag.getAttribute("data-debug");
    } else {
      // Restore Original HTML with highlighting
      heroSubline.innerHTML =
        'SIMPLE BUT FUN. <span class="highlight">HUMBLE BUT HIGH-VOLTAGE.</span>';
      statusTag.innerHTML =
        '[ STATUS: <span class="orange-text">LEARNING_&_FIXING</span> ]';
    }
  });
}

// C. SCROLL EFFECTS: Progress bars and Scan completion notification
function setupScrollEffects() {
  const scrollContainers = document.querySelectorAll(".track-scroll-container");

  scrollContainers.forEach((container) => {
    container.addEventListener("scroll", () => {
      const parent = container.parentElement;
      const progressBar = parent.querySelector(".progress-bar");
      const scanLabel = parent.querySelector(".scan-label");

      const scrollWidth = container.scrollWidth - container.clientWidth;
      const scrollLeft = container.scrollLeft;
      const percent = Math.round((scrollLeft / scrollWidth) * 100);

      progressBar.style.width = `${percent}%`;
      scanLabel.style.opacity = "1";
      scanLabel.textContent = `SCANNING: ${percent}%`;

      // Trigger toast on completion
      if (percent === 100) {
        const note = document.getElementById("scanNote");
        note.classList.add("show");
        setTimeout(() => note.classList.remove("show"), 4000);
      }
    });
  });
}

// D. BUG COUNTER: Interactive "Repair Shop" Logic
function setupBugCounter() {
  const bugArea = document.getElementById("bugCounter");
  const display = document.getElementById("clickCount");

  if (!bugArea) return;

  let count = parseInt(localStorage.getItem("bugs")) || 42;
  display.textContent = count;

  bugArea.addEventListener("click", () => {
    count++;
    display.textContent = count;
    localStorage.setItem("bugs", count);

    // Haptic-style visual feedback
    display.style.transform = "scale(1.1) rotate(-2deg)";
    display.style.color = "white";
    setTimeout(() => {
      display.style.transform = "scale(1) rotate(0deg)";
      display.style.color = "var(--orange)";
    }, 100);
  });
}

// E. ABOUT TOGGLE: Switches between Experience and Education panes
function setupAboutToggle() {
  const expBtn = document.getElementById("showExperience");
  const eduBtn = document.getElementById("showEducation");
  const expView = document.getElementById("experience-view");
  const eduView = document.getElementById("education-view");

  if (!expBtn || !eduBtn) return;

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

// --- 4. START SYSTEM ---
document.addEventListener("DOMContentLoaded", init);
