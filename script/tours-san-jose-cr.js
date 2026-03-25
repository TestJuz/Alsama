const TOURS = [
  {
    title: "Manuel Antonio",
    excerpt: "A signature nature day trip from San Jose that fits well inside a broader vacation package.",
    image: "../img/tours/sj/Manuel-Antonio.webp",
    locations: ["Manuel Antonio"],
    difficulty: "Easy",
    people: "2 People",
    durationText: "13 Hours",
    durationHours: 13,
    price: 153.93,
    detailsUrl: "#contact",
    nextDepartures: [
      { date: "February 7, 2026", status: "Available" },
      { date: "February 8, 2026", status: "Available" },
      { date: "February 9, 2026", status: "Available" }
    ],
    availabilityMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
  {
    title: "Beach Day",
    excerpt: "A full-day beach option with city pickup, ideal for travelers also needing transport and hotel support.",
    image: "../img/tours/sj/beach-day.webp",
    locations: ["Jaco"],
    difficulty: "Easy",
    people: "",
    durationText: "10 Hours",
    durationHours: 10,
    price: 175.71,
    detailsUrl: "#contact",
    nextDepartures: [
      { date: "February 7, 2026", status: "Available" },
      { date: "February 8, 2026", status: "Available" },
      { date: "February 9, 2026", status: "Available" }
    ],
    availabilityMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
  {
    title: "Nature Combo",
    excerpt: "Coffee, waterfalls and scenic stops in a route that can connect with hotels and onward transfers.",
    image: "../img/tours/sj/La-Paz-Waterfall-Gardens-2.webp",
    locations: ["Alajuela"],
    difficulty: "Easy",
    people: "",
    durationText: "12 Hours",
    durationHours: 12,
    price: 183.45,
    detailsUrl: "#contact",
    nextDepartures: [
      { date: "February 7, 2026", status: "Available" },
      { date: "February 8, 2026", status: "Available" },
      { date: "February 9, 2026", status: "Available" }
    ],
    availabilityMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  }
];

const $ = (sel, root = document) => root.querySelector(sel);

function formatUSD(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function uniq(arr) {
  return [...new Set(arr)];
}

const state = {
  q: "",
  difficulty: "",
  location: "",
  sort: "featured",
  page: 1,
  pageSize: 6
};

function buildLocationOptions() {
  const locations = uniq(TOURS.flatMap((t) => t.locations));
  const sel = $("#location");
  locations.forEach((loc) => {
    const opt = document.createElement("option");
    opt.value = loc;
    opt.textContent = loc;
    sel.appendChild(opt);
  });
}

function applyFilters() {
  const q = state.q.trim().toLowerCase();

  let list = TOURS.filter((t) => {
    const hay = `${t.title} ${t.excerpt} ${t.locations.join(" ")}`.toLowerCase();
    if (q && !hay.includes(q)) return false;
    if (state.difficulty && t.difficulty !== state.difficulty) return false;
    if (state.location && !t.locations.includes(state.location)) return false;
    return true;
  });

  if (state.sort === "price_asc") list.sort((a, b) => a.price - b.price);
  if (state.sort === "price_desc") list.sort((a, b) => b.price - a.price);
  if (state.sort === "duration_asc") {
    list.sort((a, b) => (a.durationHours ?? 999) - (b.durationHours ?? 999));
  }

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

  $("#resultsMeta").textContent = `Showing ${total} experiences`;
  $("#pageMeta").textContent = `Page ${state.page} of ${pages}`;

  $("#prevBtn").disabled = state.page <= 1;
  $("#nextBtn").disabled = state.page >= pages;

  cards.innerHTML = "";

  if (total === 0) {
    empty.hidden = false;
    return;
  }
  empty.hidden = true;

  slice.forEach((t) => {
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
          ${t.locations.map((loc) => `<span class="badge">${loc}</span>`).join("")}
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

        <a class="btn btn--primary card__cta" href="${t.detailsUrl}">Request details</a>

        <div class="subblock">
          <p class="subblock__title">Next departures</p>
          <div class="departures">
            ${t.nextDepartures.map((d) => `<span class="chip">${d.date} (${d.status})</span>`).join("")}
          </div>

          <p class="subblock__title">Availability</p>
          <div class="months">
            ${t.availabilityMonths.map((m) => `<span class="month">${m}</span>`).join("")}
          </div>
        </div>
      </div>
    `;
    cards.appendChild(el);
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
  const form = $("#contactForm");
  const hint = $("#formHint");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    hint.textContent = "Message prepared. Connect this form to your backend or email service.";
    form.reset();
  });
}

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
    state.page += 1;
    render(applyFilters());
  });
}

document.addEventListener("DOMContentLoaded", () => {
  $("#year").textContent = String(new Date().getFullYear());

  setupNav();
  setupForm();
  buildLocationOptions();
  bindControls();

  render(applyFilters());
});
