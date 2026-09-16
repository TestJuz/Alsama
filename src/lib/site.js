import { tourGalleryManifest } from "./tourGalleryManifest";

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
  rentACar: "/rent-a-car",
  privacy: "/privacy-policy",
  thankYou: "/thank-you"
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

const availabilityMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const onRequestDepartures = [
  { date: "Daily", status: "On request" },
  { date: "Private groups", status: "Available" },
  { date: "Custom dates", status: "Ask us" }
];

function getTourFolderCover(folder, fallback) {
  const [cover] = tourGalleryManifest[folder] || [];
  return asset(cover || fallback);
}

const tourImages = {
  beach: getTourFolderCover("sj/Beach_Day", "img/tours/sj/Beach_Day/1.webp"),
  laPaz: getTourFolderCover("sj/La_Paz_Waterfall_Gardens", "img/tours/sj/La_Paz_Waterfall_Gardens/La Paz Waterfall.webp"),
  manuelAntonio: getTourFolderCover("sj/Manuel_Antonio", "img/tours/sj/Manuel_Antonio/1.webp"),
  monkey: getTourFolderCover("jaco/Monkey_Mangrove_Tour", "img/tours/jaco/Monkey_Mangrove_Tour/1.webp"),
  rafting: getTourFolderCover("jaco/White _Water_Rafting", "img/tours/jaco/White _Water_Rafting/Rafting-1.webp"),
  tortuga: getTourFolderCover("jaco/Tortuga_Island_Tour", "img/tours/jaco/Tortuga_Island_Tour/1.webp")
};

const sourceTourImages = {
  manuelAntonio: getTourFolderCover("sj/Manuel_Antonio", "img/tours/sj/Manuel_Antonio/1.webp"),
  beachDay: getTourFolderCover("sj/Beach_Day", "img/tours/sj/Beach_Day/1.webp"),
  natureCombo: getTourFolderCover("sj/Natural_Combo", "img/tours/sj/Natural_Combo/Combo.webp"),
  cityBus: getTourFolderCover("sj/City_Bus", "img/gallery/City-bus.webp"),
  laPazWaterfall: getTourFolderCover("sj/La_Paz_Waterfall_Gardens", "img/tours/sj/La_Paz_Waterfall_Gardens/La Paz Waterfall.webp"),
  irazuOrosi: getTourFolderCover("sj/Irazu_Volcano_Orisi_Valley_&_Lankester_Botanic_Garden", "img/tours/sj/Irazu_Volcano_Orisi_Valley_&_Lankester_Botanic_Garden/1.webp"),
  premiumTortuga: getTourFolderCover("sj/Premium Tortuga Island_Tour", "img/tours/sj/Premium Tortuga Island_Tour/1.webp"),
  arenal: getTourFolderCover("sj/Arenal_Volcano_and_Hot_Springs", "img/tours/sj/Arenal_Volcano_and_Hot_Springs/Arenal.webp"),
  folklore: getTourFolderCover("sj/Typical_Dinner_and_Folklore_Show", "img/tours/sj/Typical_Dinner_and_Folklore_Show/1.webp"),
  irazuHalfday: getTourFolderCover("sj/Irazu_Volcano_Halfday", "img/tours/sj/Irazu_Volcano_Halfday/1.webp"),
  whiteWaterRafting: getTourFolderCover("jaco/White _Water_Rafting", "img/tours/jaco/White _Water_Rafting/Rafting-1.webp"),
  aerialTramHighRope: getTourFolderCover("jaco/Half_day_pass_Aerial_Tram_and_High_Rope_Circuit", "img/tours/jaco/Half_day_pass_Aerial_Tram_and_High_Rope_Circuit/Teleferico.webp"),
  seaKayakSnorkel: getTourFolderCover("jaco/Sea_Kayak_&_Snorkel_Tour", "img/tours/jaco/Sea_Kayak_&_Snorkel_Tour/Kayak.webp"),
  canyoning: getTourFolderCover("jaco/Canyoning_Tour", "img/tours/jaco/Canyoning_Tour/Canyoning.webp"),
  extremeAdrenaline: getTourFolderCover("jaco/Extreme_Adrenaline_5_in_1", "img/tours/jaco/Extreme_Adrenaline_5_in_1/5-in-1.webp"),
  carara: getTourFolderCover("jaco/Carara_National_Park", "img/tours/jaco/Carara_National_Park/1.webp"),
  poasLaPaz: getTourFolderCover("jaco/Poas_Volcano_&_La_Paz_Waterfall", "img/tours/jaco/Poas_Volcano_&_La_Paz_Waterfall/Poas-Volcano-y-la-paz-waterfall.webp"),
  safariAdventure: getTourFolderCover("jaco/Safari_Adventure", "img/tours/jaco/Safari_Adventure/Safary-Jaco.webp"),
  aerialTram: getTourFolderCover("jaco/Aerial_Tram", "img/tours/jaco/Aerial_Tram/Teleferico.webp"),
  horsebackWaterfalls: getTourFolderCover("jaco/Horseback_Riding_&_Waterfalls", "img/tours/jaco/Horseback_Riding_&_Waterfalls/Horseback-Riding.webp"),
  monkeyMangrove: getTourFolderCover("jaco/Monkey_Mangrove_Tour", "img/tours/jaco/Monkey_Mangrove_Tour/1.webp"),
  waterfallExperience: getTourFolderCover("jaco/Waterfall_Experience_Tour", "img/tours/jaco/Waterfall_Experience_Tour/Waterfall-Experience.webp"),
  tranopy: getTourFolderCover("jaco/Tranopy_Tour", "img/tours/jaco/Tranopy_Tour/1.webp"),
  tortugaIsland: getTourFolderCover("jaco/Tortuga_Island_Tour", "img/tours/jaco/Tortuga_Island_Tour/1.webp"),
  chocolate: getTourFolderCover("jaco/Chocolate_Tour", "img/tours/jaco/Chocolate_Tour/1.webp")
};

function getTourFolderGallery(folder) {
  if (!folder) return undefined;
  return (tourGalleryManifest[folder] || []).map((image) => asset(image));
}

export function slugify(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getTourImage(title, origin) {
  const normalized = slugify(title);

  if (normalized.includes("tortuga")) return tourImages.tortuga;
  if (normalized.includes("rafting") || normalized.includes("rapidos") || normalized.includes("pacuare") || normalized.includes("savegre") || normalized.includes("naranjo")) return tourImages.rafting;
  if (normalized.includes("manuel-antonio") || normalized.includes("carara") || normalized.includes("national-park")) return tourImages.manuelAntonio;
  if (normalized.includes("monkey") || normalized.includes("mangrove") || normalized.includes("damas") || normalized.includes("cocodrilos")) return tourImages.monkey;
  if (normalized.includes("beach") || normalized.includes("catamaran") || normalized.includes("whale") || normalized.includes("pesca")) return tourImages.beach;
  if (origin === "jaco") return tourImages.monkey;
  return tourImages.laPaz;
}

function inferLocations(title, fallback = []) {
  const normalized = slugify(title);
  const locations = [];

  if (normalized.includes("arenal") || normalized.includes("baldi")) locations.push("Arenal", "La Fortuna");
  if (normalized.includes("manuel-antonio")) locations.push("Manuel Antonio");
  if (normalized.includes("tortuga")) locations.push("Isla Tortuga");
  if (normalized.includes("teleferico") || normalized.includes("tranopy")) locations.push("Rainforest Adventures");
  if (normalized.includes("pacuare")) locations.push("Rio Pacuare");
  if (normalized.includes("tortuguero")) locations.push("Tortuguero");
  if (normalized.includes("jaco")) locations.push("Jaco");
  if (normalized.includes("irazu")) locations.push("Irazu");
  if (normalized.includes("orosi")) locations.push("Orosi");
  if (normalized.includes("lankester")) locations.push("Lankester");
  if (normalized.includes("poas")) locations.push("Poas");
  if (normalized.includes("doka")) locations.push("Doka");
  if (normalized.includes("la-paz")) locations.push("La Paz");
  if (normalized.includes("grecia")) locations.push("Grecia");
  if (normalized.includes("sarchi")) locations.push("Sarchi");
  if (normalized.includes("monteverde")) locations.push("Monteverde");
  if (normalized.includes("fortuna")) locations.push("La Fortuna");
  if (normalized.includes("celeste") || normalized.includes("tenorio")) locations.push("Rio Celeste", "Tenorio");
  if (normalized.includes("carara")) locations.push("Carara");
  if (normalized.includes("damas")) locations.push("Damas Island");
  if (normalized.includes("ballena") || normalized.includes("whale")) locations.push("Marino Ballena");
  if (normalized.includes("coffee") || normalized.includes("cafe")) locations.push("Coffee Tour");

  return [...new Set(locations.length ? locations : fallback)];
}

function makeTour(title, price, options = {}) {
  const normalized = slugify(title);
  const hasChildrenRate = normalized.includes("ninos") || normalized.includes("children");
  const hasMinimum = normalized.includes("min-2-pax") || normalized.includes("2-pax");
  const durationText = options.durationText || "Full day";

  return {
    title,
    excerpt: options.excerpt || `${title} available through Alsama Tours with booking support, pickup planning and clear per-person pricing.`,
    image: options.image || getTourImage(title, options.origin),
    imagePosition: options.imagePosition || "center 48%",
    gallery: options.gallery || getTourFolderGallery(options.galleryFolder),
    galleryFolder: options.galleryFolder,
    sourceUrl: options.sourceUrl,
    locations: options.locations || inferLocations(title, options.fallbackLocations),
    difficulty: options.difficulty || "Easy",
    people: options.people ?? (hasChildrenRate ? "Children rate" : hasMinimum ? "Min 2 pax" : ""),
    durationText,
    durationHours: options.durationHours || (durationText === "Half day" ? 5 : durationText === "2 Hours" ? 2 : durationText === "1.5 Hours" ? 1.5 : 10),
    price,
    nextDepartures: options.nextDepartures || onRequestDepartures,
    availabilityMonths
  };
}

export const sanJoseFeaturedTours = [
  {
    title: "Manuel Antonio",
    summary: "Guided national park trails, Pacific coast scenery, tropical wildlife and beach time.",
    location: "San Jose",
    difficulty: "Easy",
    people: "",
    duration: "14 Hours",
    price: 173.94,
    image: sourceTourImages.manuelAntonio,
    imagePosition: "center 52%"
  },
  {
    title: "Arenal Volcano and Hot Springs",
    summary: "Arenal views, Sarchi culture, volcano viewpoint stops and time to relax in hot springs.",
    location: "San Jose",
    difficulty: "Easy",
    people: "",
    duration: "13 Hours",
    price: 208.49,
    image: sourceTourImages.arenal,
    imagePosition: "center 50%"
  },
  {
    title: "Nature Combo",
    summary: "Coffee culture, Poas Volcano, La Paz waterfalls, wildlife sanctuary trails and buffet lunch.",
    location: "Alajuela",
    difficulty: "Easy",
    people: "",
    duration: "10 Hours",
    price: 207.29,
    image: sourceTourImages.natureCombo,
    imagePosition: "center 44%"
  }
];

export const jacoFeaturedTours = [
  {
    title: "Half day pass: Aerial Tram and High Rope Circuit",
    summary: "Aerial tram forest views paired with canopy-style adventure and a high rope circuit.",
    location: "Jaco",
    difficulty: "Medium",
    people: "",
    duration: "4 Hours",
    price: 92.69,
    image: sourceTourImages.aerialTramHighRope,
    imagePosition: "center 44%"
  },
  {
    title: "White Water Rafting",
    summary: "A family-friendly Savegre River rafting day with rainforest scenery, river time and organized logistics.",
    location: "Jaco",
    difficulty: "Medium",
    people: "",
    duration: "1 Day",
    price: 182.42,
    image: sourceTourImages.whiteWaterRafting,
    imagePosition: "center 42%"
  }
];

export const sanJoseTours = [
  makeTour("Manuel Antonio", 173.94, { origin: "san-jose", galleryFolder: "sj/Manuel_Antonio", durationText: "14 Hours", durationHours: 14, image: sourceTourImages.manuelAntonio, locations: ["Manuel Antonio", "Quepos"], people: "", excerpt: "Guided national park trails, Pacific coast scenery, tropical wildlife and beach time.", sourceUrl: "https://alsamatourscr.com/trip/manuel-antonio/" }),
  makeTour("Beach Day", 198.56, { origin: "san-jose", galleryFolder: "sj/Beach_Day", durationText: "12 Hours", durationHours: 12, image: sourceTourImages.beachDay, locations: ["Central Pacific"], excerpt: "A relaxed Pacific beach day with resort access, lunch, natural trails and butterfly garden time.", sourceUrl: "https://alsamatourscr.com/trip/beach-day/" }),
  makeTour("Nature Combo", 207.29, { origin: "san-jose", galleryFolder: "sj/Natural_Combo", durationText: "10 Hours", durationHours: 10, image: sourceTourImages.natureCombo, locations: ["Alajuela", "Poas", "La Paz"], excerpt: "Coffee culture, Poas Volcano, La Paz waterfalls, wildlife sanctuary trails and buffet lunch.", sourceUrl: "https://alsamatourscr.com/trip/nature-combo/" }),
  makeTour("City Bus", 87.86, { origin: "san-jose", galleryFolder: "sj/City_Bus", durationText: "6 Hours", durationHours: 6, image: sourceTourImages.cityBus, locations: ["San Jose"], excerpt: "A double-decker San Jose city tour with museums, markets, historic stops and a local meal.", sourceUrl: "https://alsamatourscr.com/trip/city-bus/" }),
  makeTour("La Paz Waterfall Gardens", 142.96, { origin: "san-jose", galleryFolder: "sj/La_Paz_Waterfall_Gardens", durationText: "8 Hours", durationHours: 8, image: sourceTourImages.laPazWaterfall, locations: ["Alajuela", "Vara Blanca", "La Paz"], excerpt: "Waterfall trails, lush rainforest and a wildlife sanctuary with lunch from San Jose.", sourceUrl: "https://alsamatourscr.com/trip/la-paz-waterfall-gardens/" }),
  makeTour("Irazu Volcano, Orosi Valley & Lankester Botanic Garden", 142.89, { origin: "san-jose", galleryFolder: "sj/Irazu_Volcano_Orisi_Valley_&_Lankester_Botanic_Garden", durationText: "10 Hours", durationHours: 10, image: sourceTourImages.irazuOrosi, locations: ["Cartago", "Irazu", "Orosi", "Lankester"], excerpt: "Cartago history, Irazu Volcano, Orosi Valley and Lankester Botanic Garden in one scenic route.", sourceUrl: "https://alsamatourscr.com/trip/irazu-volcano-orosi-valley-lankester-botanic-garden/" }),
  makeTour("Premium Tortuga Island Tour", 172.08, { origin: "san-jose", galleryFolder: "sj/Premium Tortuga Island_Tour", durationText: "14 Hours", durationHours: 14, image: sourceTourImages.premiumTortuga, locations: ["Isla Tortuga", "Gulf of Nicoya"], excerpt: "A premium island day with turquoise water, beach time, ocean views and activities in the Gulf of Nicoya.", sourceUrl: "https://alsamatourscr.com/trip/premium-tortuga-island-tour/" }),
  makeTour("Arenal Volcano and Hot Springs", 208.49, { origin: "san-jose", galleryFolder: "sj/Arenal_Volcano_and_Hot_Springs", durationText: "13 Hours", durationHours: 13, image: sourceTourImages.arenal, locations: ["Arenal", "La Fortuna", "Sarchi"], excerpt: "Arenal views, Sarchi culture, volcano viewpoint stops and time to relax in hot springs.", sourceUrl: "https://alsamatourscr.com/trip/arenal-volcano-and-hot-springs/" }),
  makeTour("Typical Dinner and Folklore Show", 99.28, { origin: "san-jose", galleryFolder: "sj/Typical_Dinner_and_Folklore_Show", durationText: "6 Hours", durationHours: 6, image: sourceTourImages.folklore, locations: ["San Jose", "Central Valley"], excerpt: "A traditional Costa Rican evening with local dinner, music, dance and cultural performances.", sourceUrl: "https://alsamatourscr.com/trip/typical-dinner-and-folklore-show/" }),
  makeTour("Irazu Volcano Halfday", 90.46, { origin: "san-jose", galleryFolder: "sj/Irazu_Volcano_Halfday", durationText: "6 Hours", durationHours: 6, image: sourceTourImages.irazuHalfday, locations: ["Cartago", "Irazu"], excerpt: "A shorter route to Irazu Volcano with Cartago scenery, crater views and Basilica history.", sourceUrl: "https://alsamatourscr.com/trip/irazu-volcano-halfday/" })
];

export const jacoTours = [
  makeTour("White Water Rafting", 182.42, { origin: "jaco", galleryFolder: "jaco/White _Water_Rafting", durationText: "4 Hours", durationHours: 4, difficulty: "Medium", image: sourceTourImages.whiteWaterRafting, locations: ["Central Pacific", "Rio Savegre", "Rio Naranjo"], excerpt: "Rafting routes for families or adrenaline seekers with river scenery, guide support and meals.", sourceUrl: "https://alsamatourscr.com/trip/white-water-rafting/" }),
  makeTour("Half day pass: Aerial Tram and High Rope Circuit", 92.69, { origin: "jaco", galleryFolder: "jaco/Half_day_pass_Aerial_Tram_and_High_Rope_Circuit", durationText: "4 Hours", durationHours: 4, difficulty: "Medium", image: sourceTourImages.aerialTramHighRope, locations: ["Jaco", "Central Pacific"], excerpt: "Aerial tram forest views paired with canopy-style adventure and a high rope circuit.", sourceUrl: "https://alsamatourscr.com/trip/half-day-pass-aerial-tram-and-high-rope-circuit/" }),
  makeTour("Carara National Park", 115.83, { origin: "jaco", galleryFolder: "jaco/Carara_National_Park", durationText: "4 Hours", durationHours: 4, difficulty: "Medium", image: sourceTourImages.carara, locations: ["Jaco", "Carara", "Tarcoles"], excerpt: "Guided trails through transitional forest with birdlife, scarlet macaws and a Tarcoles River stop.", sourceUrl: "https://alsamatourscr.com/trip/carara-national-park/" }),
  makeTour("Aerial Tram", 113.19, { origin: "jaco", galleryFolder: "jaco/Aerial_Tram", durationText: "2 Hours", durationHours: 2, difficulty: "Medium", image: sourceTourImages.aerialTram, locations: ["Jaco", "Central Pacific"], excerpt: "A peaceful aerial tram ride through transitional rainforest with Pacific views and guided nature insight.", sourceUrl: "https://alsamatourscr.com/trip/aerial-tram/" }),
  makeTour("Monkey Mangrove Tour", 91.01, { origin: "jaco", galleryFolder: "jaco/Monkey_Mangrove_Tour", durationText: "5 Hours", durationHours: 5, image: sourceTourImages.monkeyMangrove, locations: ["Jaco", "Los Suenos", "Mangroves"], excerpt: "A mangrove boat tour with white-faced monkeys, birds, reptiles and tropical river scenery.", sourceUrl: "https://alsamatourscr.com/trip/monkey-mangrove-tour/" }),
  makeTour("Waterfall Experience Tour", 108.36, { origin: "jaco", galleryFolder: "jaco/Waterfall_Experience_Tour", durationText: "4 Hours", durationHours: 4, difficulty: "Medium", image: sourceTourImages.waterfallExperience, locations: ["Jaco", "Central Pacific"], excerpt: "A 4x4 waterfall adventure with jungle scenery, natural pools, swimming and optional jumps.", sourceUrl: "https://alsamatourscr.com/trip/waterfall-experience-tour/" }),
  makeTour("Tranopy Tour", 85.08, { origin: "jaco", galleryFolder: "jaco/Tranopy_Tour", durationText: "4 Hours", durationHours: 4, image: sourceTourImages.tranopy, locations: ["Jaco", "Central Pacific"], excerpt: "Canopy-style forest adventure with elevated platforms, Pacific views and aerial tram scenery.", sourceUrl: "https://alsamatourscr.com/trip/tranopy-tour/" }),
  makeTour("Tortuga Island Tour", 182.01, { origin: "jaco", galleryFolder: "jaco/Tortuga_Island_Tour", durationText: "8 Hours", durationHours: 8, image: sourceTourImages.tortugaIsland, locations: ["Jaco", "Los Suenos", "Isla Tortuga"], excerpt: "A yacht or catamaran trip from the Jaco area to Tortuga Island with beach time and lunch.", sourceUrl: "https://alsamatourscr.com/trip/tortuga-island-tour/" }),
  makeTour("Chocolate Tour", 41.37, { origin: "jaco", galleryFolder: "jaco/Chocolate_Tour", durationText: "2 Hours", durationHours: 2, image: sourceTourImages.chocolate, locations: ["Puntarenas", "Jaco"], excerpt: "A chocolate experience with a forest walk, cacao history, hands-on production and tasting.", sourceUrl: "https://alsamatourscr.com/trip/chocolate-tour/" })
];


export const tourOrigins = [
  { value: "san-jose", label: "From San Jose", description: "Tours and experiences from the original San Jose catalog.", tours: sanJoseTours },
  { value: "jaco", label: "From Jaco", description: "Adventure, beach, wildlife and nature tours from the original Jaco catalog.", tours: jacoTours }
];

export function getTourDetailPath(tour) {
  return `${routes.tours}/${tour.slug || slugify(tour.title)}`;
}

const tourDetailTemplates = {
  "manuel-antonio": {
    subtitle: "Guided national park trails, Pacific coast scenery, tropical wildlife and beach time.",
    overview: [
      "This tour travels along the Pacific coast toward Quepos and Manuel Antonio, passing ocean views, coastal towns and palm plantations before reaching the park.",
      "Inside the park, a bilingual guide leads the trail walk with chances to see monkeys, iguanas, tropical birds and sloths, followed by time to relax on the beach."
    ],
    highlights: ["Manuel Antonio", "Quepos", "Hiking trails", "Wildlife viewing", "Beach time", "Pacific views"],
    included: ["Transportation service", "Entrance coordination", "Bilingual guide", "Beach time", "Lunch"],
    paid: ["Extra drinks", "Souvenirs", "Personal expenses"],
    recommendations: ["Comfortable clothes", "Closed toe shoes", "Sunscreen", "Sunglasses", "Swim clothes", "Camera"]
  },
  "nature-combo": {
    subtitle: "Coffee culture, Poas Volcano, La Paz waterfalls, wildlife sanctuary trails and buffet lunch.",
    overview: [
      "Nature Combo brings together three classic Costa Rica stops: a coffee experience with breakfast, the crater area of Poas Volcano and the La Paz Waterfall Gardens.",
      "The La Paz visit includes rainforest paths, the Magia Blanca waterfall area, wildlife sanctuary exhibits and a buffet-style lunch."
    ],
    highlights: ["Coffee experience", "Poas Volcano", "La Paz Waterfall", "Waterfalls", "Animal sanctuary", "Buffet lunch"],
    included: ["Transportation service", "Breakfast", "Lunch", "Tickets", "Bilingual guide"],
    paid: ["Souvenirs", "Specialty coffee", "Extra drinks", "Personal expenses"],
    recommendations: ["Raincoat", "Comfortable walking shoes", "Long pants", "Insect repellent", "Camera"]
  },
  "savegre-river-rafting": {
    subtitle: "A full-day river adventure for travelers who want movement, scenery and adrenaline.",
    overview: [
      "Savegre River Rafting is an adventure-forward option with river scenery and organized pickup support.",
      "It works well for travelers who want a day outside the beach town while keeping logistics coordinated."
    ],
    highlights: ["Rafting", "River scenery", "Adventure", "Team activity", "Tropical landscape", "Full-day outing"],
    included: ["Transportation service", "Rafting equipment coordination", "Guide support", "Lunch"],
    paid: ["Photos", "Extra drinks", "Private guide upgrades", "Additional snacks"],
    recommendations: ["Water shoes", "Quick-dry clothes", "Sunscreen", "Change of clothes", "Towel", "Secure strap for glasses"]
  },
  "crucero-a-isla-tortuga-jaco": {
    subtitle: "Island scenery, beach time and Pacific coast views in a classic Jaco-area day trip.",
    overview: [
      "The Tortuga Island cruise is a coastal escape built around beach time and ocean scenery.",
      "It is easy to combine with Jaco lodging, private transportation and a relaxed Costa Rica itinerary."
    ],
    highlights: ["Island visit", "Beach", "Boat experience", "Swimming", "Coastal views", "Relaxing itinerary"],
    included: ["Transportation coordination", "Boat tour coordination", "Bilingual support", "Lunch"],
    paid: ["Watersports", "Drinks", "Extra snacks", "Optional beach activities"],
    recommendations: ["Sunscreen", "Towels", "Swim clothes", "Dry bag", "Sandals", "Camera"]
  },
  "monkey-mangrove-safari-isla-damas": {
    subtitle: "An easy wildlife-focused outing with mangrove scenery and pickup support.",
    overview: [
      "Monkey Mangrove Safari is a compact wildlife option that fits easily into a coastal stay.",
      "It is suited for travelers who want a lighter activity with nature, scenery and simple logistics."
    ],
    highlights: ["Wildlife viewing", "Monkey sightings", "Mangrove scenery", "Easy activity", "Nature photography", "Short outing"],
    included: ["Transportation coordination", "Local activity support", "Bilingual assistance"],
    paid: ["Extra drinks", "Photos", "Private pickup upgrades", "Additional snacks"],
    recommendations: ["Comfortable clothes", "Sunscreen", "Insect repellent", "Camera", "Hat", "Reusable water bottle"]
  },
  "beach-day": {
    subtitle: "A relaxed Pacific beach day with resort access, lunch, natural trails and butterfly garden time.",
    overview: [
      "Beach Day is designed for travelers who want an easy Pacific escape with resort access, calm beach time and a relaxed lunch included.",
      "The resort setting can include natural trails and a butterfly garden, giving the day a simple mix of beach, rest and light nature exploration."
    ],
    highlights: ["Beach", "Swimming", "Resort access", "Lunch", "Hiking trails", "Butterfly garden"],
    included: ["Transportation service", "Resort access", "Lunch"],
    paid: ["Drinks", "Watersports", "Extra snacks", "Personal expenses"],
    recommendations: ["Hat", "Light clothes", "Sunscreen", "Swim clothes", "Towels", "Camera"]
  },
  "city-bus": {
    subtitle: "A double-decker San Jose city tour with museums, markets, historic stops and a local meal.",
    overview: [
      "This San Jose city tour uses a double-decker sightseeing bus to connect the capital's main cultural and historic highlights.",
      "The route can include the Central Market, National Theater lobby, Gold Museum, Art Museum, Central Avenue and a typical lunch or dinner according to the selected schedule."
    ],
    highlights: ["Capital landmarks", "Central Market", "Museum tickets", "Local history", "Panoramic bus route", "Local drinks"],
    included: ["Transportation service", "Lunch or dinner according to schedule", "Museum tickets", "Bilingual guide"],
    paid: ["Liquors", "Snacks", "Souvenirs"],
    recommendations: ["Comfortable walking shoes", "Long pants", "Camera"]
  },
  "la-paz-waterfall-gardens": {
    subtitle: "Waterfall trails, lush rainforest and a wildlife sanctuary with lunch from San Jose.",
    overview: [
      "La Paz Waterfall Gardens is one of Costa Rica's most scenic nature stops, combining rainforest trails, waterfalls and a wildlife sanctuary in one visit.",
      "The tour is ideal for travelers who want to see waterfalls, tropical plants and rescued wildlife such as sloths, monkeys and exotic birds without changing hotels."
    ],
    highlights: ["Waterfalls", "Animal sanctuary", "Bird watching", "Wildlife viewing", "Rainforest scenery", "Lunch"],
    included: ["Transportation service", "Lunch", "Tickets", "Bilingual guide"],
    paid: ["Snacks", "Souvenirs", "Extra drinks"],
    recommendations: ["Raincoat", "Comfortable walking shoes", "Long pants", "Camera", "Jacket"]
  },
  "white-water-rafting": {
    subtitle: "Rafting routes for families or adrenaline seekers with river scenery, guide support and meals.",
    overview: [
      "The rafting program offers options for travelers who want either a family-friendly river experience or a stronger adrenaline route.",
      "The Savegre route is known for class II and III rapids with rainforest scenery, while the Naranjo option can bring class III and IV rapids through canyon and rural landscapes."
    ],
    highlights: ["Rafting", "River scenery", "Class II-IV rapids", "Adventure", "Guide support", "Lunch"],
    included: ["Transportation service", "Rafting equipment coordination", "Guide support", "Breakfast", "Lunch", "Snacks"],
    paid: ["Photos", "Extra drinks", "Personal expenses"],
    recommendations: ["Water shoes", "Swim clothes", "Sunscreen", "Towels", "Change of clothes", "Camera"]
  },
  "half-day-pass-aerial-tram-and-high-rope-circuit": {
    subtitle: "Aerial tram forest views paired with canopy-style adventure and a high rope circuit.",
    overview: [
      "This Jaco-area adventure combines forest scenery with a more active route through the Central Pacific canopy.",
      "The experience can include an aerial tram, canopy-style sections, natural trails and a high rope circuit set above the forest floor."
    ],
    highlights: ["Aerial tram", "Canopy", "High rope circuit", "Forest views", "Ocean and mountain views", "Adventure"],
    included: ["Transportation service", "Bilingual guide", "Aerial tram", "Helmet"],
    paid: ["Snacks", "Beverages", "Breakfast", "Lunch", "Photos"],
    recommendations: ["Closed toe shoes", "Sunscreen", "Insect repellent", "Sunglasses", "Comfortable walking shoes", "Camera"]
  },
  "premium-tortuga-island-tour": {
    subtitle: "A Gulf of Nicoya catamaran day with beach time, lunch, live music and island activities.",
    overview: [
      "The Tortuga Island catamaran departs toward the Gulf of Nicoya for white sand, turquoise water and about five hours to enjoy the island.",
      "The onboard and beach experience can include light breakfast, fruit, ceviche, refreshments, live music, lunch and optional island activities such as snorkeling, kayaking or banana boat."
    ],
    highlights: ["Isla Tortuga", "Gulf of Nicoya", "Boat ride", "Beach time", "Swimming", "Watersports"],
    included: ["Transportation service", "Boat tour coordination", "Bilingual guide", "Breakfast", "Lunch", "Drinks"],
    paid: ["Souvenirs", "Optional beach activities", "Personal expenses"],
    recommendations: ["Light clothes", "Swim clothes", "Towels", "Sunscreen", "Hat", "Camera"]
  },
  "arenal-volcano-and-hot-springs": {
    subtitle: "Arenal views, Sarchi culture, volcano viewpoint stops and time to relax in hot springs.",
    overview: [
      "This full-day route visits one of Costa Rica's most famous areas, with cultural time in Sarchi and views of Arenal Volcano and Lake Arenal along the way.",
      "The day finishes with time in natural hot spring pools and a buffet-style meal in a resort setting before returning to San Jose."
    ],
    highlights: ["Arenal Volcano", "La Fortuna", "Sarchi", "Hot springs", "Mountain scenery", "Relaxation"],
    included: ["Transportation service", "Bilingual guide", "Lunch", "Dinner", "Tickets"],
    paid: ["Extra drinks", "Spa upgrades", "Souvenirs", "Personal expenses"],
    recommendations: ["Swim clothes", "Sandals", "Sunscreen", "Insect repellent", "Change of clothes", "Camera"]
  },
  "typical-dinner-and-folklore-show": {
    subtitle: "A traditional Costa Rican evening with local dinner, music, dance and cultural performances.",
    overview: [
      "This cultural evening combines local gastronomy with a colorful traditional show in a warm, festive setting.",
      "Guests enjoy a typical dinner while music, folkloric dances, costumes and cultural performances bring Costa Rican traditions to life."
    ],
    highlights: ["Folklore show", "Traditional dinner", "Costa Rican culture", "Local history", "Marimba music"],
    included: ["Transportation service", "Dinner coordination", "Bilingual support", "Show admission"],
    paid: ["Liquors", "Souvenirs", "Extra drinks"],
    recommendations: ["Comfortable shoes", "Light jacket", "Camera", "Casual evening clothes"]
  },
  "irazu-volcano-halfday": {
    subtitle: "A shorter route to Irazu Volcano with Cartago scenery, crater views and Basilica history.",
    overview: [
      "This route climbs toward Irazu Volcano through farms and changing mountain scenery before reaching the crater area.",
      "On clear days the summit can offer long-distance views, and the route continues toward Cartago with time around the Basilica of Our Lady of the Angels."
    ],
    highlights: ["Irazu Volcano", "Cartago", "Volcanic crater", "Mountain views", "Basilica"],
    included: ["Transportation service", "Entrance coordination", "Bilingual guide"],
    paid: ["Meals", "Snacks", "Souvenirs", "Extra drinks"],
    recommendations: ["Jacket", "Comfortable walking shoes", "Raincoat", "Long pants", "Camera"]
  },
  "irazu-volcano-orosi-valley-lankester-botanic-garden": {
    subtitle: "Irazu Volcano, Cartago, Lankester Botanic Garden and Orosi Valley in one scenic route.",
    overview: [
      "This Cartago route begins at Irazu Volcano, where visitors can see the main crater areas and high-elevation landscapes.",
      "The day continues through Cartago, Lankester Botanic Garden and the scenic Orosi Valley, with colonial history, orchids and a typical lunch in the region."
    ],
    highlights: ["Irazu Volcano", "Orosi Valley", "Lankester Botanic Garden", "Cartago", "Scenic drive", "Orchids"],
    included: ["Transportation service", "Entrance coordination", "Bilingual guide", "Lunch"],
    paid: ["Souvenirs", "Extra drinks", "Snacks"],
    recommendations: ["Jacket", "Comfortable walking shoes", "Raincoat", "Long pants", "Camera"]
  },
  "carara-national-park": {
    subtitle: "Guided trails through transitional forest with birdlife, scarlet macaws and a Tarcoles River stop.",
    overview: [
      "Carara National Park protects a transitional forest known for rich biodiversity and a large percentage of Costa Rica's bird species.",
      "The guided walk focuses on birds, forest sounds and wildlife, with possible stops around viewpoints and the Tarcoles River bridge to observe crocodiles safely from above."
    ],
    highlights: ["Carara National Park", "Scarlet macaws", "Bird watching", "Forest trails", "Tarcoles", "Wildlife viewing"],
    included: ["Transportation service", "Entrance coordination", "Bilingual guide"],
    paid: ["Meals", "Snacks", "Souvenirs", "Extra drinks"],
    recommendations: ["Comfortable clothes", "Closed toe shoes", "Sunscreen", "Sunglasses", "Camera"]
  },
  "aerial-tram": {
    subtitle: "A peaceful aerial tram ride through transitional rainforest with Pacific views and guided nature insight.",
    overview: [
      "Aerial Tram explores the forest from the ground level up into the treetops, offering a calm way to see the Central Pacific rainforest canopy.",
      "During the ride, travelers can enjoy forest and ocean views while learning about the biodiversity of the region."
    ],
    highlights: ["Aerial tram", "Rainforest canopy", "Forest views", "Pacific views", "Bird watching", "Photo stops"],
    included: ["Transportation service", "Bilingual guide", "Aerial tram"],
    paid: ["Meals", "Snacks", "Beverages", "Souvenirs"],
    recommendations: ["Comfortable clothes", "Closed toe shoes", "Sunscreen", "Sunglasses", "Camera"]
  },
  "monkey-mangrove-tour": {
    subtitle: "A mangrove boat tour with white-faced monkeys, birds, reptiles and tropical river scenery.",
    overview: [
      "This mangrove tour navigates a river ecosystem where freshwater and saltwater meet, surrounded by lush vegetation and abundant wildlife.",
      "The main attraction is the white-faced capuchin monkey, while the route can also reveal birds, turtles, crocodiles, termite nests and other species in their natural habitat."
    ],
    highlights: ["Mangrove boat tour", "Capuchin monkeys", "River scenery", "Wildlife viewing", "Bird watching", "Family friendly"],
    included: ["Transportation service", "Boat tour coordination", "Bilingual guide"],
    paid: ["Photos", "Extra drinks", "Snacks", "Private pickup upgrades"],
    recommendations: ["Comfortable clothes", "Closed toe shoes", "Sunscreen", "Sunglasses", "Camera"]
  },
  "waterfall-experience-tour": {
    subtitle: "A 4x4 waterfall adventure with jungle scenery, natural pools, swimming and optional jumps.",
    overview: [
      "This waterfall adventure starts with a safari-style 4x4 route through jungle landscapes and Pacific viewpoints.",
      "After a short walk into a river canyon, travelers can swim in spring-fed natural pools, stand beneath waterfalls and, for the more adventurous, jump into pools from different heights."
    ],
    highlights: ["Waterfalls", "Natural pools", "Swimming", "Mountain views", "Adventure", "Rainforest scenery"],
    included: ["Transportation service", "Bilingual guide", "Breakfast", "Lunch"],
    paid: ["Extra drinks", "Photos", "Souvenirs"],
    recommendations: ["Comfortable clothes", "Closed toe shoes", "Sunscreen", "Sunglasses", "Camera"]
  },
  "tranopy-tour": {
    subtitle: "Canopy-style forest adventure with elevated platforms, Pacific views and aerial tram scenery.",
    overview: [
      "Tranopy combines the feeling of flying over the treetops with the scenery of the Central Pacific forest.",
      "The route is designed for adventure and safety, using elevated platforms, forest views and Pacific scenery for a compact adrenaline experience near Jaco."
    ],
    highlights: ["Tranopy", "Canopy", "Aerial tram", "Zipline-style adventure", "Forest views", "Pacific views"],
    included: ["Transportation service", "Bilingual guide", "Aerial tram", "Helmet"],
    paid: ["Meals", "Snacks", "Beverages", "Photos"],
    recommendations: ["Comfortable clothes", "Closed toe shoes", "Sunscreen", "Sunglasses", "Camera"]
  },
  "tortuga-island-tour": {
    subtitle: "A yacht or catamaran trip from the Jaco area to Tortuga Island with beach time and lunch.",
    overview: [
      "This Jaco-area Tortuga Island trip starts with transportation toward Los Suenos, then a boat crossing of about 45 minutes to the island.",
      "Once on the island, travelers have about five hours for beach time, swimming, relaxing under the palms and optional activities such as snorkeling, ecological walks or banana boat."
    ],
    highlights: ["Isla Tortuga", "Boat ride", "Beach", "Swimming", "Gulf of Nicoya", "Coastal views"],
    included: ["Transportation service", "Boat tour coordination", "Bilingual guide", "Breakfast", "Lunch", "Drinks"],
    paid: ["Watersports", "Extra drinks", "Optional beach activities", "Souvenirs"],
    recommendations: ["Light clothes", "Swim clothes", "Towels", "Sunscreen", "Hat", "Camera"]
  },
  "chocolate-tour": {
    subtitle: "A chocolate experience with a forest walk, cacao history, hands-on production and tasting.",
    overview: [
      "The chocolate experience begins with an easy forest walk through the Central Pacific transition forest, with time to learn about the area's flora and fauna.",
      "The cacao portion explores varieties, history, traditional production and tasting, including cacao fruit and different chocolates paired with tropical fruit."
    ],
    highlights: ["Chocolate tasting", "Cacao", "Forest scenery", "Local flavors", "Short activity", "Easy walking"],
    included: ["Bilingual guide", "Chocolate tasting", "Fruits", "Lunch"],
    paid: ["Souvenirs", "Extra snacks", "Additional drinks"],
    recommendations: ["Comfortable clothes", "Closed toe shoes", "Sunscreen", "Sunglasses", "Camera"]
  }
};

const pdfTourDetailUpdates = {
  "manuel-antonio": { overview: ["This tour travels along the Pacific coast toward Quepos and Manuel Antonio, passing ocean views, coastal towns and palm plantations before reaching the park.", "Inside the park, a bilingual guide leads the trail walk with chances to see monkeys, iguanas, tropical birds and sloths, followed by time to relax on the beach."], highlights: ["Manuel Antonio", "Quepos", "Hiking trails", "Wildlife viewing", "Beach time", "Pacific views"], included: ["Transportation service", "Entrance coordination", "Bilingual guide", "Beach time", "Lunch"], paid: ["Extra drinks", "Souvenirs", "Personal expenses"], recommendations: ["Comfortable clothes", "Closed toe shoes", "Sunscreen", "Sunglasses", "Camera"] },
  "nature-combo": { overview: ["Nature Combo brings together three classic Costa Rica stops: a coffee experience with breakfast, the crater area of Poas Volcano and the La Paz Waterfall Gardens.", "The La Paz visit includes rainforest paths, the Magia Blanca waterfall area, wildlife sanctuary exhibits and a buffet-style lunch."], highlights: ["Coffee experience", "Poas Volcano", "La Paz Waterfall", "Waterfalls", "Animal sanctuary", "Buffet lunch"], included: ["Transportation service", "Breakfast", "Lunch", "Tickets", "Bilingual guide"], paid: ["Souvenirs", "Specialty coffee", "Extra drinks", "Personal expenses"], recommendations: ["Raincoat", "Comfortable walking shoes", "Long pants", "Insect repellent", "Camera"] },
  "beach-day": { overview: ["Beach Day is designed for travelers who want an easy Pacific escape with resort access, calm beach time and a relaxed lunch included.", "The resort setting can include natural trails and a butterfly garden, giving the day a simple mix of beach, rest and light nature exploration."], highlights: ["Beach", "Swimming", "Resort access", "Lunch", "Hiking trails", "Butterfly garden"], included: ["Transportation service", "Resort access", "Lunch"], paid: ["Drinks", "Watersports", "Extra snacks", "Personal expenses"], recommendations: ["Hat", "Light clothes", "Sunscreen", "Swim clothes", "Towels", "Camera"] },
  "city-bus": { overview: ["This San Jose city tour uses a double-decker sightseeing bus to connect the capital's main cultural and historic highlights.", "The route can include the Central Market, National Theater lobby, Gold Museum, Art Museum, Central Avenue and a typical lunch or dinner according to the selected schedule."], highlights: ["Capital landmarks", "Central Market", "Museum tickets", "Local history", "Panoramic bus route", "Local drinks"], included: ["Transportation service", "Lunch or dinner according to schedule", "Museum tickets", "Bilingual guide"], paid: ["Liquors", "Snacks", "Souvenirs"], recommendations: ["Comfortable walking shoes", "Long pants", "Camera"] },
  "la-paz-waterfall-gardens": { overview: ["La Paz Waterfall Gardens is one of the most popular nature attractions in the San Jose area, featuring five famous waterfalls and a large animal sanctuary.", "The visit is focused on Costa Rican wildlife, rainforest scenery, flowing rivers, birds, butterflies, monkeys, hummingbirds, snakes, felines, frogs and more."], highlights: ["Waterfalls", "Animal sanctuary", "Bird watching", "Wildlife viewing", "Rainforest scenery", "Lunch"], included: ["Transportation service", "Lunch", "Tickets", "Bilingual guide"], paid: ["Snacks", "Souvenirs", "Extra drinks"], recommendations: ["Raincoat", "Comfortable walking shoes", "Long pants", "Camera", "Jacket"] },
  "white-water-rafting": { overview: ["The rafting program offers options for travelers who want either a family-friendly river experience or a stronger adrenaline route.", "The Savegre route is known for class II and III rapids with rainforest scenery, while the Naranjo option can bring class III and IV rapids through canyon and rural landscapes."], highlights: ["Rafting", "River scenery", "Class II-IV rapids", "Adventure", "Guide support", "Lunch"], included: ["Transportation service", "Rafting equipment coordination", "Guide support", "Breakfast", "Lunch", "Snacks"], paid: ["Photos", "Extra drinks", "Personal expenses"], recommendations: ["Light clothes", "Swim clothes", "Towels", "Sunscreen", "Hat", "Camera"] },
  "half-day-pass-aerial-tram-and-high-rope-circuit": { overview: ["This package combines relaxation and adrenaline in a Central Pacific adventure park with beach, mountain, waterfall and forest scenery.", "Travelers ride the aerial tram, enjoy Sky Deck views, visit the butterfly garden and take on a high rope circuit with bridges, balance challenges and a descent wall."], highlights: ["Aerial tram", "Canopy", "High rope circuit", "Sky Deck", "Butterfly garden", "Ocean and mountain views"], included: ["Transportation service", "Bilingual guide", "Aerial tram", "Helmet"], paid: ["Snacks", "Beverages", "Breakfast", "Lunch", "Photos"], recommendations: ["Closed toe shoes", "Sunscreen", "Insect repellent", "Sunglasses", "Comfortable walking shoes", "Camera"] },
  "premium-tortuga-island-tour": { overview: ["Premium Tortuga Island Tour is built around a full Pacific island escape from San Jose with turquoise water, white sand and time to enjoy the beach.", "Alsama can coordinate pickup, supplier confirmation and any optional beach activities before booking."], highlights: ["Isla Tortuga", "Gulf of Nicoya", "Boat ride", "Beach time", "Swimming", "Watersports"], included: ["Transportation service", "Boat tour coordination", "Bilingual guide", "Breakfast", "Lunch", "Drinks"], paid: ["Souvenirs", "Optional beach activities", "Personal expenses"], recommendations: ["Light clothes", "Swim clothes", "Towels", "Sunscreen", "Hat", "Camera"] },
  "arenal-volcano-and-hot-springs": { overview: ["This San Jose departure heads toward La Fortuna for views of Arenal Volcano and time in volcanic hot springs.", "The tour is a good fit for travelers who want mountain scenery, relaxation and a full-day nature experience without changing hotels."], highlights: ["Arenal Volcano", "La Fortuna", "Sarchi", "Hot springs", "Mountain scenery", "Relaxation"], included: ["Transportation service", "Bilingual guide", "Lunch", "Dinner", "Tickets"], paid: ["Extra drinks", "Spa upgrades", "Souvenirs", "Personal expenses"], recommendations: ["Swim clothes", "Sandals", "Sunscreen", "Insect repellent", "Change of clothes", "Camera"] },
  "typical-dinner-and-folklore-show": { overview: ["Typical Dinner and Folklore Show is an evening cultural experience with local music, traditional food and Costa Rican dance.", "It works well as a lighter San Jose night activity after arrival, meetings or a daytime tour."], highlights: ["Folklore show", "Traditional dinner", "Costa Rican culture", "Local history", "Marimba music"], included: ["Transportation service", "Dinner coordination", "Bilingual support", "Show admission"], paid: ["Liquors", "Souvenirs", "Extra drinks"], recommendations: ["Comfortable shoes", "Light jacket", "Camera", "Casual evening clothes"] },
  "irazu-volcano-halfday": { overview: ["Irazu Volcano Halfday focuses on the high-elevation volcano landscapes near Cartago in a shorter format than the full Orosi and Lankester route.", "It is useful when travelers want a volcano visit while keeping the rest of the day flexible."], highlights: ["Irazu Volcano", "Cartago", "Volcanic crater", "Mountain views", "Basilica"], included: ["Transportation service", "Entrance coordination", "Bilingual guide"], paid: ["Meals", "Snacks", "Souvenirs", "Extra drinks"], recommendations: ["Jacket", "Comfortable walking shoes", "Raincoat", "Long pants", "Camera"] },
  "irazu-volcano-orosi-valley-lankester-botanic-garden": { overview: ["This full route combines the summit scenery of Irazu Volcano with Cartago, Orosi Valley and the botanical collection at Lankester.", "It is a strong San Jose day trip for travelers who want volcano views, gardens, culture and countryside scenery."], highlights: ["Irazu Volcano", "Orosi Valley", "Lankester Botanic Garden", "Cartago", "Scenic drive", "Orchids"], included: ["Transportation service", "Entrance coordination", "Bilingual guide", "Lunch"], paid: ["Souvenirs", "Extra drinks", "Snacks"], recommendations: ["Jacket", "Comfortable walking shoes", "Raincoat", "Long pants", "Camera"] },
  "carara-national-park": { overview: ["Carara National Park is a Jaco-area nature tour focused on tropical forest, birdlife and an accessible national park experience.", "It is a good match for travelers looking for wildlife, easy hiking and a shorter nature outing from the Central Pacific."], highlights: ["Carara National Park", "Scarlet macaws", "Bird watching", "Forest trails", "Tarcoles", "Wildlife viewing"], included: ["Transportation service", "Entrance coordination", "Bilingual guide"], paid: ["Meals", "Snacks", "Souvenirs", "Extra drinks"], recommendations: ["Comfortable clothes", "Closed toe shoes", "Insect repellent", "Water", "Camera"] },
  "aerial-tram": { overview: ["Aerial Tram is a shorter Jaco nature activity that lets travelers see the forest canopy from above.", "It is a gentler adventure option for travelers who want rainforest scenery without a long or difficult hike."], highlights: ["Aerial tram", "Rainforest canopy", "Forest views", "Pacific views", "Bird watching", "Photo stops"], included: ["Transportation service", "Bilingual guide", "Aerial tram"], paid: ["Meals", "Snacks", "Beverages", "Souvenirs"], recommendations: ["Comfortable clothes", "Closed toe shoes", "Sunscreen", "Sunglasses", "Camera"] },
  "monkey-mangrove-tour": { overview: ["Monkey Mangrove Tour is an easy wildlife outing from Jaco focused on mangrove canals, river scenery and monkey sightings.", "It is a good fit for families, photographers and travelers who prefer a lighter nature activity."], highlights: ["Mangrove boat tour", "Capuchin monkeys", "River scenery", "Wildlife viewing", "Bird watching", "Family friendly"], included: ["Transportation service", "Boat tour coordination", "Bilingual guide"], paid: ["Photos", "Extra drinks", "Snacks", "Private pickup upgrades"], recommendations: ["Comfortable clothes", "Closed toe shoes", "Sunscreen", "Sunglasses", "Camera"] },
  "waterfall-experience-tour": { overview: ["Waterfall Experience Tour is a Jaco-area nature outing focused on waterfalls, forest scenery and natural pools.", "It works well for travelers who want a refreshing half-day adventure with swimming and easy exploration."], highlights: ["Waterfalls", "Natural pools", "Swimming", "Mountain views", "Adventure", "Rainforest scenery"], included: ["Transportation service", "Bilingual guide", "Breakfast", "Lunch"], paid: ["Extra drinks", "Photos", "Souvenirs"], recommendations: ["Comfortable clothes", "Closed toe shoes", "Sunscreen", "Sunglasses", "Camera"] },
  "tranopy-tour": { overview: ["Tranopy Tour combines canopy-style adventure with aerial tram scenery in the Central Pacific forest.", "It is a compact activity for travelers who want forest views and a dose of adrenaline near Jaco."], highlights: ["Tranopy", "Canopy", "Aerial tram", "Zipline-style adventure", "Forest views", "Pacific views"], included: ["Transportation service", "Bilingual guide", "Aerial tram", "Helmet"], paid: ["Meals", "Snacks", "Beverages", "Photos"], recommendations: ["Comfortable clothes", "Closed toe shoes", "Sunscreen", "Sunglasses", "Camera"] },
  "tortuga-island-tour": { overview: ["Tortuga Island Tour from Jaco is a full-day coastal escape with boat travel, island scenery and relaxed beach time.", "It is easy to combine with Jaco lodging, private transportation and other Pacific coast services."], highlights: ["Isla Tortuga", "Boat ride", "Beach", "Swimming", "Gulf of Nicoya", "Coastal views"], included: ["Transportation service", "Boat tour coordination", "Bilingual guide", "Breakfast", "Lunch", "Drinks"], paid: ["Watersports", "Extra drinks", "Optional beach activities", "Souvenirs"], recommendations: ["Light clothes", "Swim clothes", "Towels", "Sunscreen", "Hat", "Camera"] },
  "chocolate-tour": { overview: ["Chocolate Tour introduces travelers to cacao, local chocolate flavors and a shorter educational activity near Jaco.", "It is a practical choice for families or travelers who want a lighter activity between beach, hotel and transport plans."], highlights: ["Chocolate tasting", "Cacao", "Forest scenery", "Local flavors", "Short activity", "Easy walking"], included: ["Bilingual guide", "Chocolate tasting", "Fruits", "Lunch"], paid: ["Souvenirs", "Extra snacks", "Additional drinks"], recommendations: ["Comfortable clothes", "Closed toe shoes", "Sunscreen", "Sunglasses", "Camera"] }
};


function getDefaultTourDetail(tour) {
  return {
    subtitle: `${tour.title} is prepared as a consistent Alsama Tours experience with pickup planning, clear pricing and flexible support.`,
    overview: [
      tour.excerpt,
      "Final schedules, pickup points and included items can vary by season and supplier, so Alsama confirms the exact details before booking."
    ],
    highlights: ["Local experience", "Flexible planning", "Pickup coordination", "Photo stops", "Costa Rica scenery"],
    included: ["Booking coordination", "Bilingual support", "Tour supplier confirmation"],
    paid: ["Optional upgrades", "Extra activities", "Personal expenses"],
    recommendations: ["Comfortable shoes", "Sunscreen", "Reusable water bottle", "Camera"]
  };
}

function getToursWithOrigin() {
  return tourOrigins.flatMap((origin) =>
    origin.tours.map((tour) => ({
      ...tour,
      origin: origin.value,
      originLabel: origin.label,
      detail: { ...getDefaultTourDetail(tour), ...(tourDetailTemplates[slugify(tour.title)] || {}), ...(pdfTourDetailUpdates[slugify(tour.title)] || {}) }
    }))
  );
}

function addUniqueSlugs(tours) {
  const baseCounts = tours.reduce((counts, tour) => {
    const baseSlug = slugify(tour.title);
    counts.set(baseSlug, (counts.get(baseSlug) || 0) + 1);
    return counts;
  }, new Map());
  const used = new Map();

  return tours.map((tour) => {
    const baseSlug = slugify(tour.title);
    const scopedSlug = baseCounts.get(baseSlug) > 1 ? `${tour.origin}-${baseSlug}` : baseSlug;
    const count = (used.get(scopedSlug) || 0) + 1;
    used.set(scopedSlug, count);

    return {
      ...tour,
      slug: count > 1 ? `${scopedSlug}-${count}` : scopedSlug
    };
  });
}

export function getAllTours() {
  return addUniqueSlugs(getToursWithOrigin());
}

export function findTourBySlug(slug) {
  return getAllTours().find((tour) => tour.slug === slug);
}

