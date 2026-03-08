let scrambleListeners = [];
let isNerdMode = false;

function scrambleText(element) {
  const original =
    element.getAttribute("data-original") || element.textContent;
  if (!element.getAttribute("data-original")) {
    element.setAttribute("data-original", original);
  }

  const chars = "!<>-_\\/[]{}=+*^?#@~|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let frame = 0;
  const totalFrames = original.length * 3;

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
    if (el._scrambleInterval) {
      clearInterval(el._scrambleInterval);
      el._scrambleInterval = null;
    }
    const original = el.getAttribute("data-original");
    if (original) el.textContent = original;
  });
  scrambleListeners = [];
}

function glitchTransition(callback) {
  const overlay = document.createElement("div");
  overlay.className = "glitch-overlay";

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

  setTimeout(() => {
    if (callback) callback();
  }, 160);

  setTimeout(() => {
    overlay.remove();
  }, 620);
}

function dissolveTransition(callback) {
  const overlay = document.createElement("div");
  overlay.className = "dissolve-overlay";
  document.body.appendChild(overlay);

  if (callback) callback();

  setTimeout(() => overlay.remove(), 1100);
}

function injectSystemTags() {
  SYSTEM_TAGS_CONFIG.forEach(({ selector, text }) => {
    const el = document.querySelector(selector);
    if (!el) return;
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

function applyNerdLabels() {
  document.querySelectorAll("[data-nerd]").forEach((el) => {
    if (!el.dataset.elegant) el.dataset.elegant = el.textContent.trim();
    el.textContent = el.dataset.nerd;
  });
}

function resetNerdLabels() {
  document.querySelectorAll("[data-nerd]").forEach((el) => {
    if (el.dataset.elegant) el.textContent = el.dataset.elegant;
  });
}

function setupNerdModeToggle() {
  const btn = document.getElementById("debugToggle");
  const heroSub = document.getElementById("hero-text");
  const statusT = document.getElementById("status-text");
  const note = document.getElementById("scanNote");

  btn.addEventListener("click", () => {
    if (isNerdMode) {
      dissolveTransition(() => {
        document.body.classList.remove("nerd-mode");
        document.getElementById("debugStatus").textContent = "OFF";
        isNerdMode = false;

        heroSub.textContent =
          "Developer \u2014 Building beautiful things, one line at a time.";
        statusT.textContent = "";
        statusT.append("Based in the ");
        const span = document.createElement("span");
        span.className = "highlight";
        span.textContent = "Philippines";
        statusT.appendChild(span);

        note.textContent = "Thanks for visiting \u2014 scroll down to explore.";

        resetNerdLabels();
        removeSystemTags();
        teardownTextScramble();
      });
    } else {
      glitchTransition(() => {
        document.body.classList.add("nerd-mode");
        document.getElementById("debugStatus").textContent = "ON";
        isNerdMode = true;

        setHeroText(heroSub, statusT, NERD_TEXT);
        applyNerdLabels();

        note.textContent = "SCAN_COMPLETE: HIGH_POTENTIAL_DETECTED";

        injectSystemTags();
        setupTextScramble();
        printConsoleEasterEggs();
      });
    }
  });
}

function setupNotification() {
  const note = document.getElementById("scanNote");
  setTimeout(() => {
    note.classList.add("show");
    setTimeout(() => note.classList.remove("show"), 4000);
  }, 800);
}

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

    const items = pushesWithCommits.map((push) => {
      const li = document.createElement("li");
      const dateSpan = document.createElement("span");
      dateSpan.className = "commit-date";
      dateSpan.textContent = timeAgo(push.date);
      const repoStrong = document.createElement("strong");
      repoStrong.textContent = push.repoName;
      li.appendChild(dateSpan);
      li.appendChild(document.createTextNode("Push to "));
      li.appendChild(repoStrong);
      li.appendChild(document.createTextNode(`: "${push.message}"`));
      return li;
    });
    statusElement.replaceChildren(...items);
  } catch (error) {
    statusElement.innerHTML =
      '<li class="loading-text">Unable to load GitHub status.</li>';
    console.error(error);
  }
}

function setupCaseStudyToggles() {
  document.querySelectorAll(".case-study-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const panel = btn.nextElementSibling;
      const isOpen = panel.classList.contains("is-open");
      panel.classList.toggle("is-open", !isOpen);
      btn.setAttribute("aria-expanded", String(!isOpen));
      panel.setAttribute("aria-hidden", String(isOpen));
      btn.querySelector(".cs-arrow").textContent = isOpen ? "\u25BC" : "\u25B2";
    });
  });
}

function renderFeaturedProjects(projects) {
  const grid = document.querySelector(".featured-grid");
  if (!grid) return;

  const featured = projects.filter((p) => p.featured);

  featured.forEach((project) => {
    const article = document.createElement("article");
    article.className = "featured-card";

    const imageWrap = document.createElement("div");
    imageWrap.className = "featured-card-image-wrap";
    const img = document.createElement("img");
    img.className = "featured-card-image";
    img.src = project.image;
    img.alt = "Screenshot of " + project.title;
    img.loading = "lazy";
    imageWrap.appendChild(img);

    const body = document.createElement("div");
    body.className = "featured-card-body";

    const titleEl = document.createElement("p");
    titleEl.className = "card-title featured-card-title";
    titleEl.textContent = project.title;

    const descEl = document.createElement("p");
    descEl.className = "card-desc featured-card-desc";
    descEl.textContent = project.description;

    const techDiv = document.createElement("div");
    techDiv.className = "card-tech";
    project.tech.forEach((t) => {
      const span = document.createElement("span");
      span.className = "tech-tag";
      span.textContent = t;
      const c = TECH_COLORS[t];
      if (c) {
        span.style.setProperty("--tech-color", c.color);
        span.style.setProperty("--tech-text-color", c.text);
      }
      techDiv.appendChild(span);
    });

    const actions = document.createElement("div");
    actions.className = "card-actions";
    const demoLink = document.createElement("a");
    demoLink.href = project.demo;
    demoLink.className = "primary-card-btn";
    demoLink.target = "_blank";
    demoLink.rel = "noopener";
    demoLink.textContent = "DEMO";
    const codeLink = document.createElement("a");
    codeLink.href = project.github;
    codeLink.className = "card-btn";
    codeLink.target = "_blank";
    codeLink.rel = "noopener";
    codeLink.textContent = "CODE";
    actions.appendChild(demoLink);
    actions.appendChild(codeLink);

    body.appendChild(titleEl);
    body.appendChild(descEl);
    body.appendChild(techDiv);
    body.appendChild(actions);

    if (project.caseStudy) {
      const toggleBtn = document.createElement("button");
      toggleBtn.className = "case-study-toggle font-mono";
      toggleBtn.setAttribute("aria-expanded", "false");
      const labelSpan = document.createElement("span");
      labelSpan.className = "cs-label";
      labelSpan.textContent = "Case Study";
      labelSpan.dataset.nerd = "CASE_STUDY";
      const arrowSpan = document.createElement("span");
      arrowSpan.className = "cs-arrow";
      arrowSpan.textContent = "\u25BC";
      toggleBtn.appendChild(labelSpan);
      toggleBtn.appendChild(document.createTextNode(" "));
      toggleBtn.appendChild(arrowSpan);

      const panel = document.createElement("div");
      panel.className = "case-study-panel";
      panel.setAttribute("aria-hidden", "true");

      [
        { key: "problem", label: "PROBLEM" },
        { key: "approach", label: "APPROACH" },
        { key: "learned", label: "LEARNED" },
      ].forEach(({ key, label }) => {
        const sub = document.createElement("div");
        sub.className = "cs-subsection";
        const heading = document.createElement("p");
        heading.className = "cs-heading font-mono";
        heading.textContent = label;
        const text = document.createElement("p");
        text.className = "cs-text";
        text.textContent = project.caseStudy[key];
        sub.appendChild(heading);
        sub.appendChild(text);
        panel.appendChild(sub);
      });

      body.appendChild(toggleBtn);
      body.appendChild(panel);
    }

    article.appendChild(imageWrap);
    article.appendChild(body);
    grid.appendChild(article);
  });

  setupCaseStudyToggles();
}

function setupAllProjectsToggle() {
  const btn = document.getElementById("toggle-all-projects");
  const tracks = document.getElementById("project-tracks");
  if (!btn || !tracks) return;

  btn.addEventListener("click", () => {
    const isHidden = tracks.hasAttribute("hidden");
    if (isHidden) {
      tracks.removeAttribute("hidden");
      btn.textContent = "Hide All Projects";
    } else {
      tracks.setAttribute("hidden", "");
      btn.textContent = "Show All Projects";
    }
  });
}

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

function initContactForm() {
  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("contact-feedback");
  if (!form || !feedback) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector("[type='submit']");
    submitBtn.disabled = true;
    submitBtn.textContent = "SENDING...";

    try {
      const data = new FormData(form);
      const response = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        feedback.textContent = "Message sent! I'll get back to you soon.";
        feedback.className = "contact-feedback contact-feedback--success font-mono";
        form.reset();
      } else {
        throw new Error("Server error");
      }
    } catch {
      feedback.textContent = "Something went wrong. Try emailing me directly.";
      feedback.className = "contact-feedback contact-feedback--error font-mono";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
    }
  });
}

async function init() {
  try {
    const response = await fetch("projects.json");
    const projects = await response.json();

    renderFeaturedProjects(projects);
    renderTracks(projects);
    setupAllProjectsToggle();
    setupNerdModeToggle();
    setupScrollEffects();
    setupBugCounter();
    setupAboutToggle();
    setupScrollReveal();
    setupNotification();
    fetchGitHubCommits();
    initContactForm();
  } catch (err) {
    console.error("System Initialization Failed:", err);
  }
}

document.addEventListener("DOMContentLoaded", init);
