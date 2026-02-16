// ---------- Helpers ----------
const $ = (sel, root = document) => root.querySelector(sel);

function formatUSD(value) {
  // Keep it simple; replace with CRC formatting if needed
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

// ---------- Demo data (replace with your own or fetch from API) ----------
const toursSanJose = [
  {
    title: "Manuel Antonio",
    summary: "One of the most beautiful national parks with beach + wildlife.",
    location: "San José",
    difficulty: "Easy",
    people: "2 People",
    duration: "13 Hours",
    price: 153.93,
    image: "img/tours/sj/Manuel-Antonio.webp"
  },
  {
    title: "Beach Day",
    summary: "A full-day beach escape with pickup options and local stops.",
    location: "Jacó",
    difficulty: "Easy",
    people: "",
    duration: "10 Hours",
    price: 175.71,
    image: "img/tours/sj/beach-day.webp"
  },
  {
    title: "Nature Combo",
    summary: "Coffee tour + nature stops for a full Costa Rica day.",
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
    summary: "Full-day rafting adventure with scenic tropical landscapes.",
    location: "Jacó",
    difficulty: "Medium",
    people: "",
    duration: "1 Day",
    price: 210.0,
    image: "img/tours/jaco/Rafting-1.webp"
  },
  {
    title: "Tortuga Island Tour",
    summary: "Tortuga Island that is known for its immaculate white sand beach and turquoise waters.",
    location: "Jacó",
    difficulty: "Medium",
    people: "",
    duration: "4 Hours",
    price: 161.07,
    image: "img/tours/jaco/Tortuga-7.webp"
  },
  {
    title: "Monkey Mangrove Tour",
    summary: "Relaxing cruise with ocean views and sunset vibes.",
    location: "Jacó",
    difficulty: "Easy",
    people: "",
    duration: "3 Hours",
    price: 80.54,
    image: "img/tours/jaco/Monkey-Tour-9-1.webp"
  }
];

// ---------- Render cards ----------
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
          <a class="btn btn--ghost" href="#contact" aria-label="View details for ${t.title}">
            View Details
          </a>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}


// ---------- Nav interactions ----------
function setupNav() {
  const toggle = $("#navToggle");
  const menu = $("#navMenu");

  toggle.addEventListener("click", () => {
    const isOpen = menu.getAttribute("data-open") === "true";
    menu.setAttribute("data-open", String(!isOpen));
    toggle.setAttribute("aria-expanded", String(!isOpen));
  });

  // Dropdown (Services)
  const dd = document.querySelector("[data-dropdown]");
  const ddBtn = $(".nav__dropdownBtn", dd);

  ddBtn.addEventListener("click", () => {
    const isOpen = dd.getAttribute("data-open") === "true";
    dd.setAttribute("data-open", String(!isOpen));
    ddBtn.setAttribute("aria-expanded", String(!isOpen));
  });

  // Close dropdown/menu on outside click
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

  // Close mobile menu when clicking a link
  menu.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    menu.setAttribute("data-open", "false");
    toggle.setAttribute("aria-expanded", "false");
  });
}

// ---------- Contact form (demo) ----------
function setupForm() {
  const form = document.getElementById("contactForm");
  const hint = document.getElementById("formHint");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    hint.textContent = "Message prepared (demo). Connect this to your backend or email service.";
    form.reset();
  });
}

// ---------- Init ----------
document.addEventListener("DOMContentLoaded", () => {
  $("#year").textContent = String(new Date().getFullYear());
  setupNav();
  setupForm();

  renderTours("cardsSanJose", toursSanJose);
  renderTours("cardsJaco", toursJaco);

  // Demo buttons
  $("#viewAllSJ").addEventListener("click", (e) => {
    e.preventDefault();
    alert("Hook this to a full listing page or filters (San José).");
  });

  $("#viewAllJaco").addEventListener("click", (e) => {
    e.preventDefault();
    alert("Hook this to a full listing page or filters (Jacó).");
  });
});
