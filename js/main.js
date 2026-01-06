// ==============================
// PROJECT DATA
// ==============================
let projects = [];

async function loadProjects() {
  try {
    const res = await fetch("projects.json");
    projects = await res.json();
    renderProjects();
  } catch (err) {
    console.error("Failed to load projects:", err);
  }
}

// ==============================
// PROJECT RENDERING
// ==============================
function renderProjects(filter = "all") {
  const grid = document.getElementById("projectsGrid");

  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  grid.innerHTML = filtered
    .map(
      (project) => `
        <div class="project-card fade-in">
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>

                <div class="project-tech">
                    ${project.tech
                      .map((t) => `<span class="tech-tag">${t}</span>`)
                      .join("")}
                </div>

                <div class="project-links">
                    <a href="${
                      project.demo
                    }" target="_blank" class="neo-btn"><span>Live</span></a>
                    <a href="${
                      project.github
                    }" target="_blank" class="neo-btn"><span>Code</span></a>
                </div>
            </div>
        </div>
    `
    )
    .join("");

  observeElements();
}

// ==============================
// CATEGORY FILTER
// ==============================
document.querySelectorAll(".category-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".category-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderProjects(btn.dataset.category);
  });
});

// ==============================
// FADE-IN OBSERVER
// ==============================
function observeElements() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("visible");
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
}

// ==============================
// INIT
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  loadProjects();
  observeElements();
});
