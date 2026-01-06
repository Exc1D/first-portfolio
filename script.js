// ==============================
// PROJECT DATA
// ==============================
const projects = [
  {
    title: "Awesome Grade Calculator",
    category: "personal",
    description: "Gamified grading system with MOBA-style ranks.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Exc1D/day-04-epic-grade-calculator",
    demo: "https://exc1d.github.io/day-04-epic-grade-calculator/",
  },
  {
    title: "PX-to-REM Converter",
    category: "personal",
    description: "Interactive converter with dark mode and smart rounding.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Exc1D/px-to-rem",
    demo: "https://exc1d.github.io/px-to-rem/",
  },
];

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
                    }" target="_blank" class="btn btn-primary">Live</a>
                    <a href="${
                      project.github
                    }" target="_blank" class="btn btn-secondary">Code</a>
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
  renderProjects();
  observeElements();
});
