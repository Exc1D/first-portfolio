// --- CONFIGURATION ---
const TRACK_MAP = {
  personal: { id: "EXT-01", title: "PERSONAL_PROJECTS" },
  odin: { id: "FND-02", title: "THE_ODIN_PROJECT" },
  scrimba: { id: "INT-03", title: "SCRIMBA" },
  "frontend-mentor": { id: "UXX-04", title: "FRONTEND_MENTOR" },
};

// --- GITHUB CONFIG ---
const GITHUB_USERNAME = "Exc1D";

async function fetchGitHubCommits() {
  const commitList = document.getElementById("commit-list");
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/events/public`
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    const data = await response.json();

    const pushes = data
      .filter(
        (event) =>
          event.type === "PushEvent" && event.payload.commits?.length > 0
      )
      .slice(0, 3);

    if (pushes.length === 0) {
      commitList.innerHTML = "<li>NO_RECENT_PUSH_DATA_FOUND</li>";
      return;
    }

    commitList.innerHTML = pushes
      .map((push) => {
        const { repo, payload, created_at } = push;
        const repoName = repo.name.split("/")[1];
        const { message } = payload.commits[0];
        const date = new Date(created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });

        return `
                <li>
                    <span class="commit-date">[${date}]</span>
                    <span><b class="highlight">${repoName}</b>: ${message}</span>
                </li>
            `;
      })
      .join("");
  } catch (err) {
    commitList.innerHTML = "<li>FAILED_TO_CONNECT_TO_GITHUB_API</li>";
    console.error("GitHub Fetch Error:", err);
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
  } catch (err) {
    console.error("System Initialization Failed:", err);
  }
}

function renderTracks(projects) {
  const container = document.getElementById("project-tracks");

  // Group projects by category
  Object.keys(TRACK_MAP).forEach((cat) => {
    const catProjects = projects.filter((p) => p.category === cat);
    if (catProjects.length === 0) return;

    const trackSection = document.createElement("div");
    trackSection.className = "track-group";
    trackSection.innerHTML = `
            <div class="track-header font-mono">
                <span class="track-id">${TRACK_MAP[cat].id}</span>
                <span class="track-divider"></span>
                <h2 class="track-title">${TRACK_MAP[cat].title}</h2>
                <div class="scan-label">SCANNING: 0%</div>
            </div>
            <div class="track-scroll-container">
                ${catProjects
                  .map(
                    (p) => `
                    <div class="project-card">
                        <div class="debug-metadata">[FILE_SIZE: ${Math.floor(
                          Math.random() * 20
                        )}kb // TYPE: ${p.tech[0]}]</div>
                        <div class="card-top">
                            <div class="status-indicator font-mono"><div class="dot"></div><span>${
                              p.file || "index.html"
                            }</span></div>
                            <div class="tech-tags font-mono">${p.tech
                              .map((t) => `<span class="tag">${t}</span>`)
                              .join("")}</div>
                        </div>
                        <h3 class="project-name">${p.title}</h3>
                        <div class="project-insight font-mono">
                            <div class="insight-row"><span class="insight-label">>> SPARK:</span> ${
                              p.spark || p.description
                            }</div>
                            <div class="insight-row"><span class="insight-label">>> FIX:</span> ${
                              p.fix || "Optimized code structure."
                            }</div>
                        </div>
                        <div class="card-actions font-mono">
                            <a href="${
                              p.demo
                            }" target="_blank" class="btn-primary">DEPLOY</a>
                            <a href="${
                              p.github
                            }" target="_blank" class="btn-secondary">SOURCE</a>
                        </div>
                    </div>
                `
                  )
                  .join("")}
            </div>
            <div class="progress-container"><div class="progress-bar"></div></div>
        `;
    container.appendChild(trackSection);
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
      heroSub.textContent = heroSub.dataset.debug;
      statusT.textContent = statusT.dataset.debug;
    } else {
      heroSub.innerHTML =
        'SIMPLE BUT FUN. <span class="highlight">HUMBLE BUT HIGH-VOLTAGE.</span>';
      statusT.innerHTML =
        '[ STATUS: <span class="orange-text">LEARNING_&_FIXING</span> ]';
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
