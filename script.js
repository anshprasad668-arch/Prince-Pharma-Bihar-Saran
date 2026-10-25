// Prince Pharma website interactions
document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("active");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
      const icon = menuToggle.querySelector("i");
      if (icon) icon.className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
    });
    navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      const icon = menuToggle.querySelector("i");
      if (icon) icon.className = "fa-solid fa-bars";
    }));
  }

  const backToTop = document.getElementById("backToTop");
  const updateBackToTop = () => {
    if (backToTop) backToTop.classList.toggle("visible", window.scrollY > 350);
  };
  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();
  if (backToTop) backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Keep WhatsApp links visibly unconfigured until the owner supplies a real number.
  ["contactWhatsApp", "whatsappFloat"].forEach(id => {
    const link = document.getElementById(id);
    if (!link) return;
    link.addEventListener("click", event => {
      if (link.getAttribute("href") === "#") {
        event.preventDefault();
        const notice = document.getElementById("whatsappNotice");
        if (notice) notice.hidden = false;
        else alert("WhatsApp is not configured yet. Add the store's WhatsApp number in script.js first.");
      }
    });
  });
});
