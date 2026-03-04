// ---------- Data ----------
// Cards include: title, excerpt, tags, duration, price, view details,
// next departures, and availability months.
const TOURS = [
  {
    title: "White Water Rafting",
    excerpt: "Full-day rafting adventure with scenic tropical landscapes.",
    image: "../img/tours/jaco/Rafting-1.webp",
    locations: ["Jaco"],
    difficulty: "Medium",
    people: "",
    durationText: "1 Day",
    durationHours: 24,
    price: 210.00,
    detailsUrl: "#",
    nextDepartures: [
      { date: "February 7, 2026", status: "Available" },
      { date: "February 8, 2026", status: "Available" },
      { date: "February 9, 2026", status: "Available" }
    ],
    availabilityMonths: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  },
  {
    title: "Tortuga Island Tour",
    excerpt: "Tortuga Island is known for white sand beach and turquoise waters.",
    image: "../img/tours/jaco/Tortuga-7.webp",
    locations: ["Jaco"],
    difficulty: "Medium",
    people: "",
    durationText: "4 Hours",
    durationHours: 4,
    price: 161.07,
    detailsUrl: "#",
    nextDepartures: [
      { date: "February 7, 2026", status: "Available" },
      { date: "February 8, 2026", status: "Available" },
      { date: "February 9, 2026", status: "Available" }
    ],
    availabilityMonths: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  },
  {
    title: "Monkey Mangrove Tour",
    excerpt: "Relaxing mangrove and wildlife experience near Jaco.",
    image: "../img/tours/jaco/Monkey-Tour-9-1.webp",
    locations: ["Jaco"],
    difficulty: "Easy",
    people: "",
    durationText: "3 Hours",
    durationHours: 3,
    price: 80.54,
    detailsUrl: "#",
    nextDepartures: [
      { date: "February 7, 2026", status: "Available" },
      { date: "February 8, 2026", status: "Available" },
      { date: "February 9, 2026", status: "Available" }
    ],
    availabilityMonths: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  }
];

// ---------- Helpers ----------
const $ = (sel, root = document) => root.querySelector(sel);

function formatUSD(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function uniq(arr) {
  return [...new Set(arr)];
}

// ---------- State ----------
const state = {
  q: "",
  difficulty: "",
  location: "",
  sort: "featured",
  page: 1,
  pageSize: 6
};

function buildLocationOptions() {
  const locations = uniq(TOURS.flatMap(t => t.locations));
  const sel = $("#location");
  locations.forEach(loc => {
    const opt = document.createElement("option");
    opt.value = loc;
    opt.textContent = loc;
    sel.appendChild(opt);
  });
}

function applyFilters() {
  const q = state.q.trim().toLowerCase();

  let list = TOURS.filter(t => {
    const hay = `${t.title} ${t.excerpt} ${t.locations.join(" ")}`.toLowerCase();
    if (q && !hay.includes(q)) return false;
    if (state.difficulty && t.difficulty !== state.difficulty) return false;
    if (state.location && !t.locations.includes(state.location)) return false;
    return true;
  });

  // Sorting
  if (state.sort === "price_asc") list.sort((a,b) => a.price - b.price);
  if (state.sort === "price_desc") list.sort((a,b) => b.price - a.price);
  if (state.sort === "duration_asc") list.sort((a,b) => (a.durationHours ?? 999) - (b.durationHours ?? 999));
  // featured = keep order

  return list;
}

function paginate(list) {
  const total = list.length;
  const pages = Math.max(1, Math.ceil(total / state.pageSize));
  state.page = Math.min(state.page, pages);

  const start = (state.page - 1) * state.pageSize;
  const slice = list.slice(start, start + state.pageSize);

  return { slice, total, pages };
}

function render(list) {
  const { slice, total, pages } = paginate(list);
  const cards = $("#cards");
  const empty = $("#emptyState");

  $("#resultsMeta").textContent = `Showing ${total} tours`;
  $("#pageMeta").textContent = `Page ${state.page} of ${pages}`;

  $("#prevBtn").disabled = state.page <= 1;
  $("#nextBtn").disabled = state.page >= pages;

  cards.innerHTML = "";

  if (total === 0) {
    empty.hidden = false;
    return;
  }
  empty.hidden = true;

  slice.forEach(t => {
    const el = document.createElement("article");
    el.className = "card";
    el.innerHTML = `
      <div class="card__media">
        <img src="${t.image}" alt="${t.title}" loading="lazy">
      </div>
      <div class="card__body">
        <h3 class="card__title">${t.title}</h3>
        <p class="card__desc">${t.excerpt}</p>

        <div class="tags">
          ${t.locations.map(loc => `<span class="badge">${loc}</span>`).join("")}
          <span class="badge">${t.difficulty}</span>
          ${t.people ? `<span class="badge">${t.people}</span>` : ""}
        </div>

        <div class="price-row">
          <div>
            <div class="muted" style="font-size:13px;">Duration</div>
            <div style="font-weight:600;">${t.durationText}</div>
          </div>

          <div style="text-align:right;">
            <div class="muted" style="font-size:13px;">Price</div>
            <div class="price">${formatUSD(t.price)}</div>
          </div>
        </div>

        <a class="btn btn--primary card__cta" href="${t.detailsUrl}">View Details</a>

        <div class="subblock">
          <p class="subblock__title">Next Departures</p>
          <div class="departures">
            ${t.nextDepartures.map(d => `<span class="chip">${d.date} (${d.status})</span>`).join("")}
          </div>

          <p class="subblock__title">Availability</p>
          <div class="months">
            ${t.availabilityMonths.map(m => `<span class="month">${m}</span>`).join("")}
          </div>
        </div>
      </div>
    `;
    cards.appendChild(el);
  });
}

// ---------- Nav + Form ----------
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
    hint.textContent = "Message prepared (demo). Connect this to your backend or email service.";
    form.reset();
  });
}

// ---------- Events ----------
function bindControls() {
  $("#q").addEventListener("input", (e) => {
    state.q = e.target.value;
    state.page = 1;
    render(applyFilters());
  });

  $("#difficulty").addEventListener("change", (e) => {
    state.difficulty = e.target.value;
    state.page = 1;
    render(applyFilters());
  });

  $("#location").addEventListener("change", (e) => {
    state.location = e.target.value;
    state.page = 1;
    render(applyFilters());
  });

  $("#sort").addEventListener("change", (e) => {
    state.sort = e.target.value;
    state.page = 1;
    render(applyFilters());
  });

  $("#prevBtn").addEventListener("click", () => {
    state.page = Math.max(1, state.page - 1);
    render(applyFilters());
  });

  $("#nextBtn").addEventListener("click", () => {
    state.page = state.page + 1;
    render(applyFilters());
  });
}

// ---------- Init ----------
document.addEventListener("DOMContentLoaded", () => {
  $("#year").textContent = String(new Date().getFullYear());

  setupNav();
  setupForm();
  buildLocationOptions();
  bindControls();

  render(applyFilters());
});
