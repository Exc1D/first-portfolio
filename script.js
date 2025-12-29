// Click counter
const clickBtn = document.getElementById("clicker");
const clickCount = document.getElementById("clickCount");
let clicks = Number(localStorage.getItem("clicks") || 0);
if (clickCount) clickCount.textContent = clicks;
clickBtn?.addEventListener("click", () => {
  clicks++;
  localStorage.setItem("clicks", clicks);
  clickCount.textContent = clicks;
});

// Smooth scroll
[...document.querySelectorAll("[data-scroll]")].forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelector(btn.dataset.scroll)
      ?.scrollIntoView({ behavior: "smooth" });
  });
});

// Modal
const modal = document.getElementById("modal");
["bookBtn", "bookChat"].forEach((id) => {
  document
    .getElementById(id)
    ?.addEventListener("click", () => modal.classList.add("open"));
});
document
  .getElementById("closeModal")
  ?.addEventListener("click", () => modal.classList.remove("open"));
document
  .getElementById("cancelBooking")
  ?.addEventListener("click", () => modal.classList.remove("open"));

document.getElementById("bookingForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  location.href = `mailto:davidaviado.dla@gmail.com?subject=Chat with ${fd.get(
    "name"
  )}&body=${fd.get("message")}`;
});

// Timer
function tick() {
  const d = new Date();
  const t = [d.getHours(), d.getMinutes(), d.getSeconds()]
    .map((n) => String(n).padStart(2, "0"))
    .join(":");
  document.getElementById("timer").textContent = t;
}
setInterval(tick, 1000);
tick();

// GitHub activity
async function loadGitHub() {
  const user = "Exc1D";
  const targets = [
    document.getElementById("commits"),
    document.getElementById("activityList"),
  ];
  try {
    const res = await fetch(
      `https://api.github.com/users/${user}/events/public`
    );
    const data = await res.json();
    const pushes = data.filter((e) => e.type === "PushEvent").slice(0, 6);
    targets.forEach((t) => (t.innerHTML = ""));
    pushes.forEach((p) =>
      p.payload.commits.slice(0, 2).forEach((c) => {
        targets.forEach((t) => {
          const div = document.createElement("div");
          div.textContent = `${c.message} (${p.repo.name})`;
          t.appendChild(div);
        });
      })
    );
  } catch {
    targets.forEach((t) => (t.textContent = "Unable to load GitHub activity"));
  }
}
loadGitHub();
