export function asset(path) {
  return `${import.meta.env.BASE_URL}${path}`;
}

export const safetyPdf = asset("Safety.pdf");

export const routes = {
  home: "/",
  shuttle: "/shuttle",
  privateTransport: "/private-transport",
  tours: "/tours",
  toursSanJose: "/tours/san-jose",
  toursJaco: "/tours/jaco",
  hotels: "/hotels",
  rentACar: "/rent-a-car"
};

export const homeLinks = {
  home: { pathname: routes.home, hash: "#home" },
  contact: { pathname: routes.home, hash: "#contact" }
};

export const serviceMenu = [
  { label: "Shuttle", to: routes.shuttle },
  { label: "Private Transport", to: routes.privateTransport },
  { label: "Tours", to: routes.tours },
  { label: "Hotels", to: routes.hotels },
  { label: "Rent a Car", to: routes.rentACar }
];

export const homeGalleryImages = Array.from({ length: 10 }, (_, index) =>
  asset(`img/gallery/${index + 1}.webp`)
);

export const homeHeroImages = [
  asset("img/hero/1.webp"),
  asset("img/hero/2.webp"),
  asset("img/hero/3.webp")
];

export const sanJoseFeaturedTours = [
  {
    title: "Manuel Antonio",
    summary: "A full-day nature experience that can be paired with hotel pickup and private transportation.",
    location: "San Jose",
    difficulty: "Easy",
    people: "2 People",
    duration: "13 Hours",
    price: 153.93,
    image: asset("img/tours/sj/Manuel-Antonio.webp")
  },
  {
    title: "Beach Day",
    summary: "A beach escape from the city with flexible pickup options and easy itinerary coordination.",
    location: "Jaco",
    difficulty: "Easy",
    people: "",
    duration: "10 Hours",
    price: 175.71,
    image: asset("img/tours/sj/beach-day.webp")
  },
  {
    title: "Nature Combo",
    summary: "A balanced day with scenic stops, ideal to include inside a broader Costa Rica vacation package.",
    location: "Alajuela",
    difficulty: "Easy",
    people: "",
    duration: "12 Hours",
    price: 183.45,
    image: asset("img/tours/sj/La-Paz-Waterfall-Gardens-2.webp")
  }
];

export const jacoFeaturedTours = [
  {
    title: "White Water Rafting",
    summary: "Adventure from Jaco with transportation support for travelers building a full multi-day itinerary.",
    location: "Jaco",
    difficulty: "Medium",
    people: "",
    duration: "1 Day",
    price: 210.0,
    image: asset("img/tours/jaco/Rafting-1.webp")
  },
  {
    title: "Tortuga Island Tour",
    summary: "Island excursion that works well with hotel stays, transfers and other Pacific coast services.",
    location: "Jaco",
    difficulty: "Medium",
    people: "",
    duration: "4 Hours",
    price: 161.07,
    image: asset("img/tours/jaco/Tortuga-7.webp")
  },
  {
    title: "Monkey Mangrove Tour",
    summary: "Wildlife-focused outing near Jaco, easy to combine with private transportation and nearby lodging.",
    location: "Jaco",
    difficulty: "Easy",
    people: "",
    duration: "3 Hours",
    price: 80.54,
    image: asset("img/tours/jaco/Monkey-Tour-9-1.webp")
  }
];

export const sanJoseTours = [
  {
    title: "Manuel Antonio",
    excerpt: "A signature nature day trip from San Jose that fits well inside a broader vacation package.",
    image: asset("img/tours/sj/Manuel-Antonio.webp"),
    locations: ["Manuel Antonio"],
    difficulty: "Easy",
    people: "2 People",
    durationText: "13 Hours",
    durationHours: 13,
    price: 153.93,
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
    image: asset("img/tours/sj/beach-day.webp"),
    locations: ["Jaco"],
    difficulty: "Easy",
    people: "",
    durationText: "10 Hours",
    durationHours: 10,
    price: 175.71,
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
    image: asset("img/tours/sj/La-Paz-Waterfall-Gardens-2.webp"),
    locations: ["Alajuela"],
    difficulty: "Easy",
    people: "",
    durationText: "12 Hours",
    durationHours: 12,
    price: 183.45,
    nextDepartures: [
      { date: "February 7, 2026", status: "Available" },
      { date: "February 8, 2026", status: "Available" },
      { date: "February 9, 2026", status: "Available" }
    ],
    availabilityMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  }
];

export const jacoTours = [
  {
    title: "White Water Rafting",
    excerpt: "Full-day adventure from Jaco that can be matched with transfers, lodging and broader trip planning.",
    image: asset("img/tours/jaco/Rafting-1.webp"),
    locations: ["Jaco"],
    difficulty: "Medium",
    people: "",
    durationText: "1 Day",
    durationHours: 24,
    price: 210.0,
    nextDepartures: [
      { date: "February 7, 2026", status: "Available" },
      { date: "February 8, 2026", status: "Available" },
      { date: "February 9, 2026", status: "Available" }
    ],
    availabilityMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
  {
    title: "Tortuga Island Tour",
    excerpt: "Island getaway with beach time, ideal to combine with hotel reservations and coastal transport.",
    image: asset("img/tours/jaco/Tortuga-7.webp"),
    locations: ["Jaco"],
    difficulty: "Medium",
    people: "",
    durationText: "4 Hours",
    durationHours: 4,
    price: 161.07,
    nextDepartures: [
      { date: "February 7, 2026", status: "Available" },
      { date: "February 8, 2026", status: "Available" },
      { date: "February 9, 2026", status: "Available" }
    ],
    availabilityMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
  {
    title: "Monkey Mangrove Tour",
    excerpt: "Easy wildlife option near Jaco with support for pickup logistics and nearby accommodations.",
    image: asset("img/tours/jaco/Monkey-Tour-9-1.webp"),
    locations: ["Jaco"],
    difficulty: "Easy",
    people: "",
    durationText: "3 Hours",
    durationHours: 3,
    price: 80.54,
    nextDepartures: [
      { date: "February 7, 2026", status: "Available" },
      { date: "February 8, 2026", status: "Available" },
      { date: "February 9, 2026", status: "Available" }
    ],
    availabilityMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  }
];

export function slugify(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getTourDetailPath(tour) {
  return `${routes.tours}/${tour.slug || slugify(tour.title)}`;
}

const tourDetailTemplates = {
  "manuel-antonio": {
    subtitle: "National park trails, white sand beaches and tropical wildlife in one classic Costa Rica day trip.",
    overview: [
      "This tour follows the spirit of the Manuel Antonio reference itinerary: a scenic full-day route built around nature, beach time and relaxed exploration. The final operating details can be adjusted around pickup needs, hotel location and season.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere, nibh non commodo dictum, sapien justo facilisis mi, vitae facilisis lorem velit in sem. Curabitur tempus, justo sed feugiat pretium, libero nisl volutpat mi, non luctus lectus nibh a nibh."
    ],
    highlights: ["Swimming", "Beach", "Hiking trails", "Wildlife viewing", "Rainforest scenery", "Photo stops"],
    included: ["Transportation service", "Entrance coordination", "Bilingual guide", "Breakfast", "Lunch"],
    paid: ["Drinks", "Liquors", "Watersports", "Extra snacks"],
    recommendations: ["Closed toe shoes", "Towels", "Sunscreen", "Swim clothes", "Comfortable walking shoes", "Smartphone or camera"]
  },
  "beach-day": {
    subtitle: "A coastal escape with flexible pickup, ocean time and easy logistics from the city.",
    overview: [
      "Beach Day is designed as a simple, comfortable way to include the Pacific coast in a Costa Rica itinerary. The tour can be paired with private transport, hotel planning and other services from Alsama.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et arcu lectus. Morbi viverra, leo vitae gravida placerat, orci lorem hendrerit nibh, vitae dignissim purus metus sed arcu."
    ],
    highlights: ["Beach", "Swimming", "Coastal scenery", "Relaxing day trip", "Flexible pickup", "Ocean views"],
    included: ["Transportation service", "Itinerary coordination", "Bilingual support", "Lunch stop planning"],
    paid: ["Watersports", "Extra meals", "Beach chairs", "Drinks"],
    recommendations: ["Sunscreen", "Towels", "Swim clothes", "Sandals", "Change of clothes", "Reusable water bottle"]
  },
  "nature-combo": {
    subtitle: "Coffee, waterfalls and scenic stops combined into one balanced day from San Jose.",
    overview: [
      "Nature Combo brings together several Costa Rican highlights in a single route, ideal for travelers who want variety without changing hotels. It can connect with lodging, onward transfers and broader vacation planning.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Vivamus mattis dui vitae ante pharetra, sed lacinia lacus vehicula. Integer porta neque eget ex fermentum, at pretium elit bibendum."
    ],
    highlights: ["Coffee experience", "Waterfalls", "Nature stops", "Scenic viewpoints", "Easy walking", "Photo moments"],
    included: ["Transportation service", "Tour coordination", "Bilingual guide", "Breakfast", "Lunch"],
    paid: ["Souvenirs", "Specialty coffee", "Extra drinks", "Optional activities"],
    recommendations: ["Light jacket", "Closed toe shoes", "Sunscreen", "Comfortable clothes", "Camera", "Reusable water bottle"]
  },
  "white-water-rafting": {
    subtitle: "A full-day river adventure from Jaco for travelers who want movement, scenery and adrenaline.",
    overview: [
      "White Water Rafting is the adventure-forward option in the Jaco catalog. The experience works well for travelers who want a day outside the beach town while keeping pickup and logistics organized.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis lacus ut tellus viverra, vel cursus neque posuere. Etiam suscipit nisl nec dui interdum, vitae mattis orci tempor."
    ],
    highlights: ["Rafting", "River scenery", "Adventure", "Team activity", "Tropical landscape", "Full-day outing"],
    included: ["Transportation service", "Rafting equipment coordination", "Guide support", "Lunch"],
    paid: ["Photos", "Extra drinks", "Private guide upgrades", "Additional snacks"],
    recommendations: ["Water shoes", "Quick-dry clothes", "Sunscreen", "Change of clothes", "Towel", "Secure strap for glasses"]
  },
  "tortuga-island-tour": {
    subtitle: "Island scenery, beach time and Pacific coast views in a classic Jaco-area day trip.",
    overview: [
      "Tortuga Island Tour is a coastal escape built around beach time and ocean scenery. It is easy to combine with Jaco lodging, private transportation and a relaxed Costa Rica itinerary.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet neque eget leo malesuada gravida. Cras gravida est vitae ipsum porttitor, sed dignissim nisl sagittis."
    ],
    highlights: ["Island visit", "Beach", "Boat experience", "Swimming", "Coastal views", "Relaxing itinerary"],
    included: ["Transportation coordination", "Boat tour coordination", "Bilingual support", "Lunch"],
    paid: ["Watersports", "Drinks", "Extra snacks", "Optional beach activities"],
    recommendations: ["Sunscreen", "Towels", "Swim clothes", "Dry bag", "Sandals", "Camera"]
  },
  "monkey-mangrove-tour": {
    subtitle: "An easy wildlife-focused outing near Jaco with mangrove scenery and pickup support.",
    overview: [
      "Monkey Mangrove Tour is a compact wildlife option that fits easily into a Jaco stay. It is suited for travelers who want a lighter activity with nature, scenery and simple logistics.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam blandit diam vitae arcu faucibus, quis elementum erat faucibus. Donec consequat, mi at cursus interdum, massa purus pretium augue, vitae luctus libero magna id neque."
    ],
    highlights: ["Wildlife viewing", "Monkey sightings", "Mangrove scenery", "Easy activity", "Nature photography", "Short outing"],
    included: ["Transportation coordination", "Local activity support", "Bilingual assistance"],
    paid: ["Extra drinks", "Photos", "Private pickup upgrades", "Additional snacks"],
    recommendations: ["Comfortable clothes", "Sunscreen", "Insect repellent", "Camera", "Hat", "Reusable water bottle"]
  }
};

function getDefaultTourDetail(tour) {
  return {
    subtitle: `${tour.title} is prepared as a consistent Alsama Tours experience with pickup planning, clear pricing and flexible support.`,
    overview: [
      `${tour.excerpt} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae velit vitae sem pulvinar cursus. Integer et justo sed nibh facilisis aliquet.`,
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus varius lectus in ipsum mattis, a malesuada lorem volutpat."
    ],
    highlights: ["Scenic route", "Local experience", "Flexible planning", "Photo stops", "Costa Rica nature"],
    included: ["Transportation service", "Booking coordination", "Bilingual support"],
    paid: ["Drinks", "Optional upgrades", "Extra activities"],
    recommendations: ["Comfortable shoes", "Sunscreen", "Reusable water bottle", "Camera"]
  };
}

export function getAllTours() {
  return [
    ...sanJoseTours.map((tour) => ({
      ...tour,
      slug: slugify(tour.title),
      origin: "san-jose",
      originLabel: "From San Jose",
      detail: { ...getDefaultTourDetail(tour), ...(tourDetailTemplates[slugify(tour.title)] || {}) }
    })),
    ...jacoTours.map((tour) => ({
      ...tour,
      slug: slugify(tour.title),
      origin: "jaco",
      originLabel: "From Jaco",
      detail: { ...getDefaultTourDetail(tour), ...(tourDetailTemplates[slugify(tour.title)] || {}) }
    }))
  ];
}

export function findTourBySlug(slug) {
  return getAllTours().find((tour) => tour.slug === slug);
}