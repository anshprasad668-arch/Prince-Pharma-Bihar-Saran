// ===== Prince Pharma – settings (edit here) =====
const CONFIG = {
  whatsappNumber: "916201091610"   // country code + number, no + or spaces
};
// The WhatsApp welcome messages (English + Hindi) are in i18n.js
// ================================================

const waUrl = text => `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;

document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
  const ui = () => (window.PP ? PP.ui() : {});

  // Mobile menu
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("navLinks");
  const setMenu = open => {
    nav.classList.toggle("active", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", (open ? ui().closeNav : ui().openNav) || "Menu");
    const i = toggle.querySelector("i");
    if (i) i.className = open ? "fa-solid fa-xmark" : "fa-solid fa-bars";
  };
  if (toggle && nav) {
    toggle.addEventListener("click", () => setMenu(!nav.classList.contains("active")));
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
    setMenu(false);
    document.addEventListener("pplangchange", () => setMenu(nav.classList.contains("active")));
  }

  // Replay the hero entrance animation when the visitor switches language
  const hero = document.getElementById("home");
  document.addEventListener("pplangchange", () => {
    if (!hero || window.scrollY > 400) return;
    hero.classList.remove("animate");
    void hero.offsetWidth;          // restart the CSS animations
    hero.classList.add("animate");
  });

  // Back to top
  const top = document.getElementById("backToTop");
  if (top) {
    const upd = () => top.classList.toggle("visible", window.scrollY > 350);
    window.addEventListener("scroll", upd, { passive: true }); upd();
    top.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  // Every WhatsApp button opens WhatsApp with a pre-filled welcome message (in the chosen language)
  const setWaLinks = () => {
    document.querySelectorAll("[data-wa-link]").forEach(link => {
      const who = link.dataset.waWho;
      const msg = who ? ui().waWho(who) : ui().waDefault;
      link.href = waUrl(msg);
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });
  };
  setWaLinks();
  document.addEventListener("pplangchange", setWaLinks);

  // Chat box -> WhatsApp
  const form = document.getElementById("chatForm");
  const err = document.getElementById("chatError");
  if (form) {
    const showErr = (t, field) => { err.textContent = t; err.hidden = false; field.focus(); };
    form.addEventListener("submit", e => {
      e.preventDefault();
      const name = form.name.value.trim();
      const topic = form.topic.options[form.topic.selectedIndex].textContent.trim();
      const message = form.message.value.trim();
      if (name.length < 2) return showErr(ui().errName, form.name);
      if (message.length < 3) return showErr(ui().errMsg, form.message);
      err.hidden = true;
      window.open(waUrl(ui().waForm(name, topic, message)), "_blank", "noopener");
    });
    document.addEventListener("pplangchange", () => { err.hidden = true; });
  }
});
