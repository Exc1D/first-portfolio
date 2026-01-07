// --- PROJECT DATA ---
// You can add more projects here easily!
const trackData = [
  {
    id: "EXT-01",
    title: "CORE_SYSTEMS",
    projects: [
      {
        name: "EXO_SHELL",
        file: "sys_01.js",
        tech: ["Node.js", "Socket.io"],
        spark: "Achieved sub-10ms latency.",
        fix: "Refactored event listeners to prevent memory leaks.",
        size: "14.2kb",
      },
      {
        name: "PORTFOLIO_V4",
        file: "main.css",
        tech: ["Vanilla JS", "CSS3"],
        spark: "Custom glitch engine built with CSS keys.",
        fix: "Optimized scroll-snapping for mobile browsers.",
        size: "8.5kb",
      },
    ],
  },
  {
    id: "FND-02",
    title: "FOUNDATION_PROTOCOLS",
    projects: [
      {
        name: "ODIN_LANDING",
        file: "index.html",
        tech: ["HTML5", "Flexbox"],
        spark: "Pixel-perfect layout matching figma design.",
        fix: "Fixed z-index stacking issues in the navigation.",
        size: "4.1kb",
      },
      {
        name: "CALC_MODULE",
        file: "calc.js",
        tech: ["JS Logic"],
        spark: "Handles complex floating point arithmetic.",
        fix: "Implemented defensive checks for division by zero.",
        size: "12.0kb",
      },
    ],
  },
];

// --- INITIALIZATION ---
function init() {
  renderTracks();
  setupDebugToggle();
  setupBugCounter();
  setupScrollEffects();
}

// 1. Render Tracks and Projects
function renderTracks() {
  const container = document.getElementById("project-tracks");

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
                            <button class="btn-primary">DEPLOY</button>
                            <button class="btn-secondary">SOURCE</button>
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

// 2. Debug Toggle Logic
function setupDebugToggle() {
  const btn = document.getElementById("debugToggle");
  const statusText = document.getElementById("debugStatus");

  // Elements we want to swap text for
  const heroSubline = document.getElementById("hero-text");
  const statusTag = document.getElementById("status-text");

  btn.addEventListener("click", () => {
    // 1. Toggle the class on the body
    document.body.classList.toggle("debug-on");
    const isOn = document.body.classList.contains("debug-on");

    // 2. Update the button appearance
    statusText.textContent = isOn ? "ON" : "OFF";
    btn.style.backgroundColor = isOn ? "var(--orange)" : "transparent";
    btn.style.color = isOn ? "black" : "white";

    // 3. THE SWAP: Professional vs Candid Copy
    if (isOn) {
      heroSubline.textContent = heroSubline.getAttribute("data-debug");
      statusTag.textContent = statusTag.getAttribute("data-debug");
    } else {
      // Restore original HTML (including spans for colors)
      heroSubline.innerHTML =
        'SIMPLE BUT FUN. <span class="highlight">HUMBLE BUT HIGH-VOLTAGE.</span>';
      statusTag.innerHTML =
        '[ STATUS: <span class="orange-text">LEARNING_&_FIXING</span> ]';
    }
  });
}

// 3. Scroll & Scanning Logic
function setupScrollEffects() {
  const scrollContainers = document.querySelectorAll(".track-scroll-container");

  scrollContainers.forEach((container) => {
    container.addEventListener("scroll", () => {
      const parent = container.parentElement;
      const progressBar = parent.querySelector(".progress-bar");
      const scanLabel = parent.querySelector(".scan-label");

      // Calculate percentage
      const scrollWidth = container.scrollWidth - container.clientWidth;
      const scrollLeft = container.scrollLeft;
      const percent = Math.round((scrollLeft / scrollWidth) * 100);

      // Update UI
      progressBar.style.width = `${percent}%`;
      scanLabel.style.opacity = "1";
      scanLabel.textContent = `SCANNING: ${percent}%`;

      // Notification Trigger
      if (percent === 100) {
        showNotification();
      }
    });
  });
}

function showNotification() {
  const note = document.getElementById("scanNote");
  note.classList.add("show");
  setTimeout(() => note.classList.remove("show"), 3000);
}

// 4. Bug Counter (Maintenance Section)
function setupBugCounter() {
  const bugArea = document.getElementById("bugCounter");
  const display = document.getElementById("clickCount");

  // Load from memory
  let count = parseInt(localStorage.getItem("bugs")) || 42;
  display.textContent = count;

  bugArea.addEventListener("click", () => {
    count++;
    display.textContent = count;
    localStorage.setItem("bugs", count);

    // Simple scale effect on click
    display.style.transform = "scale(1.1)";
    setTimeout(() => (display.style.transform = "scale(1)"), 100);
  });
}

// Run the app
document.addEventListener("DOMContentLoaded", init);
