const TRACK_MAP = {
  personal: { id: "EXT-01", title: "PERSONAL_PROJECTS" },
  odin: { id: "FND-02", title: "THE_ODIN_PROJECT" },
  scrimba: { id: "INT-03", title: "SCRIMBA" },
  "frontend-mentor": { id: "UXX-04", title: "FRONTEND_MENTOR" },
};

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

const ASCII_ART =
  " ███████╗██╗  ██╗ ██████╗ ██╗██████╗ \n" +
  " ██╔════╝╚██╗██╔╝██╔════╝███║██╔══██╗\n" +
  " █████╗   ╚███╔╝ ██║     ╚██║██║  ██║\n" +
  " ██╔══╝   ██╔██╗ ██║      ██║██║  ██║\n" +
  " ███████╗██╔╝ ██╗╚██████╗ ██║██████╔╝\n" +
  " ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝╚═════╝ ";

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
