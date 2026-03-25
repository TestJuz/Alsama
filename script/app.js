const $ = (sel, root = document) => root.querySelector(sel);

function formatUSD(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

const toursSanJose = [
  {
    title: "Manuel Antonio",
    summary: "A full-day nature experience that can be paired with hotel pickup and private transportation.",
    location: "San Jose",
    difficulty: "Easy",
    people: "2 People",
    duration: "13 Hours",
    price: 153.93,
    image: "img/tours/sj/Manuel-Antonio.webp"
  },
  {
    title: "Beach Day",
    summary: "A beach escape from the city with flexible pickup options and easy itinerary coordination.",
    location: "Jaco",
    difficulty: "Easy",
    people: "",
    duration: "10 Hours",
    price: 175.71,
    image: "img/tours/sj/beach-day.webp"
  },
  {
    title: "Nature Combo",
    summary: "A balanced day with scenic stops, ideal to include inside a broader Costa Rica vacation package.",
    location: "Alajuela",
    difficulty: "Easy",
    people: "",
    duration: "12 Hours",
    price: 183.45,
    image: "img/tours/sj/La-Paz-Waterfall-Gardens-2.webp"
  }
];

const toursJaco = [
  {
    title: "White Water Rafting",
    summary: "Adventure from Jaco with transportation support for travelers building a full multi-day itinerary.",
    location: "Jaco",
    difficulty: "Medium",
    people: "",
    duration: "1 Day",
    price: 210.0,
    image: "img/tours/jaco/Rafting-1.webp"
  },
  {
    title: "Tortuga Island Tour",
    summary: "Island excursion that works well with hotel stays, transfers and other Pacific coast services.",
    location: "Jaco",
    difficulty: "Medium",
    people: "",
    duration: "4 Hours",
    price: 161.07,
    image: "img/tours/jaco/Tortuga-7.webp"
  },
  {
    title: "Monkey Mangrove Tour",
    summary: "Wildlife-focused outing near Jaco, easy to combine with private transportation and nearby lodging.",
    location: "Jaco",
    difficulty: "Easy",
    people: "",
    duration: "3 Hours",
    price: 80.54,
    image: "img/tours/jaco/Monkey-Tour-9-1.webp"
  }
];

function renderTours(containerId, tours) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  tours.forEach((t) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div class="card__media">
        <img src="${t.image}" alt="${t.title}" loading="lazy">
      </div>
      <div class="card__body">
        <h3 class="card__title">${t.title}</h3>
        <p class="muted" style="margin:0">${t.summary}</p>

        <div class="card__meta">
          <span class="badge">${t.location}</span>
          <span class="badge">${t.difficulty}</span>
          ${t.people ? `<span class="badge">${t.people}</span>` : ""}
          <span class="badge">${t.duration}</span>
        </div>

        <div class="card__priceRow">
          <span class="price">${formatUSD(t.price)}</span>
          <a class="btn btn--ghost" href="#contact" aria-label="Request details for ${t.title}">
            Request Info
          </a>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

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
  const form = document.getElementById("contactForm");
  const hint = document.getElementById("formHint");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    hint.textContent = "Message prepared. Connect this form to your backend or email service.";
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  $("#year").textContent = String(new Date().getFullYear());
  setupNav();
  setupForm();

  renderTours("cardsSanJose", toursSanJose);
  renderTours("cardsJaco", toursJaco);

  $("#viewAllSJ").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "tours/SanJose/index.html";
  });

  $("#viewAllJaco").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "tours/Jaco/index.html";
  });
});
