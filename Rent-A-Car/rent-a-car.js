const $ = (sel, root = document) => root.querySelector(sel);

function setupNav() {
  const toggle = $("#navToggle");
  const menu = $("#navMenu");

  toggle.addEventListener("click", () => {
    const isOpen = menu.getAttribute("data-open") === "true";
    menu.setAttribute("data-open", String(!isOpen));
    toggle.setAttribute("aria-expanded", String(!isOpen));
  });

  const dd = document.querySelector("[data-dropdown]");
  const ddBtn = $(".nav__dropdownBtn", dd);

  ddBtn.addEventListener("click", () => {
    const isOpen = dd.getAttribute("data-open") === "true";
    dd.setAttribute("data-open", String(!isOpen));
    ddBtn.setAttribute("aria-expanded", String(!isOpen));
  });

  document.addEventListener("click", (e) => {
    const clickedInsideDropdown = dd.contains(e.target);
    if (!clickedInsideDropdown) {
      dd.removeAttribute("data-open");
      ddBtn.setAttribute("aria-expanded", "false");
    }

    const clickedToggle = toggle.contains(e.target);
    const clickedInsideMenu = menu.contains(e.target);
    if (!clickedToggle && !clickedInsideMenu && menu.getAttribute("data-open") === "true") {
      menu.setAttribute("data-open", "false");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  menu.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    menu.setAttribute("data-open", "false");
    toggle.setAttribute("aria-expanded", "false");
  });
}

function setupForm() {
  const form = $("#contactForm");
  const hint = $("#formHint");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    hint.textContent = "Request prepared. Connect this form to your backend or email service.";
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  $("#year").textContent = String(new Date().getFullYear());
  setupNav();
  setupForm();
});
