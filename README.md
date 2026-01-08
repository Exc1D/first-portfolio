Here is a comprehensive `README.md` file tailored specifically for your project. I have written it to match the "Tech/Cyberpunk" aesthetic of your site while providing clear technical documentation.

You can create a file named `README.md` and paste this content inside.

---

# Exc1D // Full-Stack Developer Portfolio

A personal portfolio website featuring a **Cyberpunk / Sci-Fi interface**, Glassmorphism UI elements, and real-time API integrations. Designed to showcase projects with a focus on interactivity, "Nerd Mode" toggles, and dynamic content rendering.

**Live Demo:** [Insert Your Link Here]

## ⚡ Key Features

- **System "Debug Mode":** A toggleable state that reveals grid overlays, changes system text, and alters the visual theme to a "blueprint/wireframe" style.
- **Dynamic Project Tracks:** Projects are loaded via JSON and sorted into horizontal scrolling tracks (Personal, Odin Project, Scrimba, Frontend Mentor).
- **Live GitHub Feed:** Connects to the GitHub API to display the user's 3 most recent push events in real-time.
- **The Repair Shop:** A "Bug Counter" that persists data using `localStorage` and a changelog of site updates.
- **Glassmorphism UI:** Custom CSS implementation of frosted glass effects with dynamic hover states.
- **Responsive Design:** Fully fluid layout that adapts from desktop monitors to mobile viewports.

## 🛠️ Tech Stack

- **Core:** Semantic HTML5, CSS3 (Variables, Flexbox, Grid), Vanilla JavaScript (ES6+).
- **Styling:**
- Custom CSS Variables for theming.
- `backdrop-filter` for glass effects.
- CSS Animations (Glitch effects, Scroll Reveal).

- **Data:**
- `projects.json` for portfolio items.
- `localStorage` for persistent interaction data.
- GitHub REST API for activity feeds.

- **Fonts:** Inter & JetBrains Mono (via Google Fonts).

## 🚀 Installation & Setup

Because this project uses `fetch()` to load JSON data and API requests, **it must be run on a local server** to avoid CORS (Cross-Origin Resource Sharing) errors. You cannot simply open `index.html` directly from a file folder.

### 1. Clone the Repository

```bash
git clone https://github.com/Exc1D/your-repo-name.git
cd your-repo-name

```

### 2. Configure Project Data

The project expects a `projects.json` file in the root directory. Create this file and populate it using the structure below:

```json
[
  {
    "category": "personal",
    "title": "Project Name",
    "description": "Brief description of functionality.",
    "spark": "The motivation behind the project.",
    "tech": ["HTML", "CSS", "JS"],
    "file": "index.html",
    "demo": "https://your-live-demo.com",
    "github": "https://github.com/your/repo"
  },
  {
    "category": "odin",
    "title": "Odin Project Assignment",
    "description": "...",
    "spark": "...",
    "tech": ["React", "Node"],
    "file": "App.jsx",
    "demo": "...",
    "github": "..."
  }
]
```

_Valid categories:_ `personal`, `odin`, `scrimba`, `frontend-mentor`.

### 3. Run Locally

If you use VS Code, install the **Live Server** extension.

1. Open the project folder in VS Code.
2. Right-click `index.html`.
3. Select "Open with Live Server".

## ⚙️ Configuration

### GitHub API Integration

To display your own commits, open `script.js` and modify the username constant at the top:

```javascript
// script.js
const GITHUB_USERNAME = "YourUsername"; // Change "Exc1D" to your handle
```

### Track Categories

To add new project categories, modify the `TRACK_MAP` object in `script.js`:

```javascript
const TRACK_MAP = {
  personal: { id: "EXT-01", title: "PERSONAL_PROJECTS" },
  // Add new categories here
  newCat: { id: "NEW-05", title: "NEW_CATEGORY" },
};
```

## 📂 Project Structure

```text
/
├── index.html       # Main application structure
├── styles.css       # Core styling, variables, and animations
├── script.js        # Logic for API, JSON rendering, and UI interaction
├── projects.json    # (Required) Data file for project cards
└── assets/          # (Optional) Images or icons

```

## 🎨 Design System

- **Primary Ink:** `#080808` (Dark Background)
- **System Accent:** `#f4e04d` (Cyberpunk Yellow)
- **Typography:**
- _Headings/Body:_ Inter
- _Code/Data:_ JetBrains Mono

## 📄 License

This project is open source and available under the [MIT License](https://www.google.com/search?q=LICENSE).

---

**© 2026 EXC1D STUDIO** // _Make things simple but fun._
