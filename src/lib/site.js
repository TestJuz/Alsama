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
  privacy: "/privacy-policy"
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
    nextDepartures: onRequestDepartures,
    availabilityMonths
  };
}

export const sanJoseFeaturedTours = [
  {
    title: "Manuel Antonio",
    summary: "National park trails, white sand beaches and tropical wildlife in one classic Costa Rica day trip.",
    location: "San Jose",
    difficulty: "Easy",
    people: "2 People",
    duration: "13 Hours",
    price: 173.94,
    image: sourceTourImages.manuelAntonio,
    imagePosition: "center 52%"
  },
  {
    title: "Arenal Volcano and Hot Springs",
    summary: "Arenal Volcano scenery, La Fortuna views and time to relax in volcanic hot springs.",
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
    summary: "Coffee, Poas Volcano, waterfalls and wildlife combined into one varied day from San Jose.",
    location: "Alajuela",
    difficulty: "Easy",
    people: "",
    duration: "12 Hours",
    price: 207.29,
    image: sourceTourImages.natureCombo,
    imagePosition: "center 44%"
  }
];

export const jacoFeaturedTours = [
  {
    title: "Half day pass: Aerial Tram and High Rope Circuit",
    summary: "A central Pacific adventure park combo with aerial tram views and a high rope challenge circuit.",
    location: "Jaco",
    difficulty: "Medium",
    people: "",
    duration: "9 Hours",
    price: 92.69,
    image: sourceTourImages.aerialTramHighRope,
    imagePosition: "center 44%"
  },
  {
    title: "Sea Kayak & Snorkel Tour",
    summary: "A compact ocean outing with kayaking, snorkeling and beach wildlife options near Jaco.",
    location: "Jaco",
    difficulty: "Easy",
    people: "",
    duration: "3 Hours",
    price: 175.71,
    image: sourceTourImages.seaKayakSnorkel,
    imagePosition: "center 38%"
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
  makeTour("Manuel Antonio", 173.94, { origin: "san-jose", galleryFolder: "sj/Manuel_Antonio", durationText: "13 Hours", durationHours: 13, image: sourceTourImages.manuelAntonio, locations: ["Manuel Antonio"], people: "2 People", excerpt: "National park trails, white sand beaches and tropical wildlife in one classic Costa Rica day trip.", sourceUrl: "https://alsamatourscr.com/trip/manuel-antonio/" }),
  makeTour("Beach Day", 198.56, { origin: "san-jose", galleryFolder: "sj/Beach_Day", durationText: "10 Hours", durationHours: 10, image: sourceTourImages.beachDay, locations: ["Jaco"], excerpt: "A Pacific beach escape with Crocodile Bridge, resort time, beach chairs and buffet lunch.", sourceUrl: "https://alsamatourscr.com/trip/beach-day/" }),
  makeTour("Nature Combo", 207.29, { origin: "san-jose", galleryFolder: "sj/Natural_Combo", durationText: "12 Hours", durationHours: 12, image: sourceTourImages.natureCombo, locations: ["Alajuela", "Poas", "La Paz"], excerpt: "Coffee, Poas Volcano, waterfalls and wildlife combined into one varied day from San Jose.", sourceUrl: "https://alsamatourscr.com/trip/nature-combo/" }),
  makeTour("City Bus", 87.86, { origin: "san-jose", galleryFolder: "sj/City_Bus", durationText: "5 Hours", durationHours: 5, image: sourceTourImages.cityBus, locations: ["San Jose"], excerpt: "A panoramic San Jose sightseeing route by double decker bus with cultural stops and local history.", sourceUrl: "https://alsamatourscr.com/trip/city-bus/" }),
  makeTour("La Paz Waterfall Gardens", 142.96, { origin: "san-jose", galleryFolder: "sj/La_Paz_Waterfall_Gardens", durationText: "8 Hours", durationHours: 8, image: sourceTourImages.laPazWaterfall, locations: ["Alajuela", "Vara Blanca"], excerpt: "Five waterfalls, lush rainforest and one of Costa Rica's best wildlife sanctuary visits.", sourceUrl: "https://alsamatourscr.com/trip/la-paz-waterfall-gardens/" }),
  makeTour("IrazÃº Volcano, Orosi Valley & Lankester Botanic Garden", 142.89, { origin: "san-jose", galleryFolder: "sj/Irazu_Volcano_Orisi_Valley_&_Lankester_Botanic_Garden", durationText: "10 Hours", durationHours: 10, image: sourceTourImages.irazuOrosi, locations: ["Cartago", "Irazu", "Orosi", "Lankester"], excerpt: "Cartago history, Irazu Volcano, Orosi Valley and Lankester Botanic Garden in one scenic route.", sourceUrl: "https://alsamatourscr.com/trip/irazu-volcano-orosi-valley-lankester-botanic-garden/" }),
  makeTour("Premium Tortuga Island Tour", 172.08, { origin: "san-jose", galleryFolder: "sj/Premium Tortuga Island_Tour", durationText: "14 Hours", durationHours: 14, image: sourceTourImages.premiumTortuga, locations: ["Isla Tortuga", "Gulf of Nicoya"], excerpt: "A premium island day with turquoise water, beach time, ocean views and activities in the Gulf of Nicoya.", sourceUrl: "https://alsamatourscr.com/trip/premium-tortuga-island-tour/" }),
  makeTour("Arenal Volcano and Hot Springs", 208.49, { origin: "san-jose", galleryFolder: "sj/Arenal_Volcano_and_Hot_Springs", durationText: "13 Hours", durationHours: 13, image: sourceTourImages.arenal, locations: ["Arenal", "La Fortuna", "San Carlos"], excerpt: "Arenal Volcano scenery, La Fortuna views and time to relax in volcanic hot springs.", sourceUrl: "https://alsamatourscr.com/trip/arenal-volcano-and-hot-springs/" }),
  makeTour("Typical Dinner and Folklore Show", 99.28, { origin: "san-jose", galleryFolder: "sj/Typical_Dinner_and_Folklore_Show", durationText: "5 Hours", durationHours: 5, image: sourceTourImages.folklore, locations: ["San Jose", "Central Valley"], excerpt: "An evening of Central Valley views, Costa Rican folklore, marimba music and traditional buffet dinner.", sourceUrl: "https://alsamatourscr.com/trip/typical-dinner-and-folklore-show/" }),
  makeTour("IrazÃº Volcano Halfday", 90.46, { origin: "san-jose", galleryFolder: "sj/Irazu_Volcano_Halfday", durationText: "8 Hours", durationHours: 8, image: sourceTourImages.irazuHalfday, locations: ["Cartago", "Irazu"], excerpt: "A half-day volcano route from San Jose toward Cartago and the summit landscapes of Irazu.", sourceUrl: "https://alsamatourscr.com/trip/irazu-volcano-halfday/" })
];

export const jacoTours = [
  makeTour("White Water Rafting", 182.42, { origin: "jaco", galleryFolder: "jaco/White _Water_Rafting", durationText: "1 Day", durationHours: 24, difficulty: "Medium", image: sourceTourImages.whiteWaterRafting, locations: ["Jaco", "Rio Savegre"], excerpt: "A family-friendly Savegre River rafting day with rainforest scenery, river time and organized logistics.", sourceUrl: "https://alsamatourscr.com/trip/white-water-rafting/" }),
  makeTour("Half day pass: Aerial Tram and High Rope Circuit", 92.69, { origin: "jaco", galleryFolder: "jaco/Half_day_pass_Aerial_Tram_and_High_Rope_Circuit", durationText: "9 Hours", durationHours: 9, difficulty: "Medium", image: sourceTourImages.aerialTramHighRope, locations: ["Jaco"], excerpt: "A central Pacific adventure park combo with aerial tram views and a high rope challenge circuit.", sourceUrl: "https://alsamatourscr.com/trip/half-day-pass-aerial-tram-and-high-rope-circuit/" }),
  makeTour("Sea Kayak & Snorkel Tour", 175.71, { origin: "jaco", galleryFolder: "jaco/Sea_Kayak_&_Snorkel_Tour", durationText: "3 Hours", durationHours: 3, image: sourceTourImages.seaKayakSnorkel, locations: ["Jaco"], excerpt: "A compact ocean outing with kayaking, snorkeling and beach wildlife options near Jaco.", sourceUrl: "https://alsamatourscr.com/trip/sea-kayak-snorkel-tour/" }),
  makeTour("Canyoning Tour", 107.55, { origin: "jaco", galleryFolder: "jaco/Canyoning_Tour", durationText: "2 Hours", durationHours: 2, difficulty: "Hard", image: sourceTourImages.canyoning, locations: ["Jaco"], excerpt: "A rainforest canyoning adventure with rappelling, waterfalls, natural pools and a high-adrenaline route.", sourceUrl: "https://alsamatourscr.com/trip/canyoning-tour/" }),
  makeTour("Extreme Adrenaline 5 in 1", 86.54, { origin: "jaco", galleryFolder: "jaco/Extreme_Adrenaline_5_in_1", durationText: "5 Hours", durationHours: 5, difficulty: "Medium", image: sourceTourImages.extremeAdrenaline, locations: ["Jaco"], excerpt: "A complete Jaco adventure experience with aerial tram, canopy, hiking, ocean views and forest challenge elements.", sourceUrl: "https://alsamatourscr.com/trip/extreme-adrenaline-5-in-1/" }),
  makeTour("Carara National Park", 115.83, { origin: "jaco", galleryFolder: "jaco/Carara_National_Park", durationText: "5 Hours", durationHours: 5, difficulty: "Medium", image: sourceTourImages.carara, locations: ["Jaco", "Carara"], excerpt: "A Central Pacific national park visit known for transitional forest and scarlet macaw habitat.", sourceUrl: "https://alsamatourscr.com/trip/carara-national-park/" }),
  makeTour("Poas Volcano & La Paz Waterfall", 239.92, { origin: "jaco", galleryFolder: "jaco/Poas_Volcano_&_La_Paz_Waterfall", durationText: "10 Hours", durationHours: 10, difficulty: "Medium", image: sourceTourImages.poasLaPaz, locations: ["Jaco", "Poas", "La Paz"], excerpt: "A volcano and waterfall route from Jaco with Poas cloud forest scenery and La Paz trails.", sourceUrl: "https://alsamatourscr.com/trip/poas-volcano-la-paz-waterfall/" }),
  makeTour("Safari Adventure", 107.55, { origin: "jaco", galleryFolder: "jaco/Safari_Adventure", durationText: "8 Hours", durationHours: 8, image: sourceTourImages.safariAdventure, locations: ["Jaco"], excerpt: "A Jaco-area sightseeing day with monkeys, crocodile river cruise, countryside visits and beach time.", sourceUrl: "https://alsamatourscr.com/trip/safari-adventure/" }),
  makeTour("Aerial Tram", 113.19, { origin: "jaco", galleryFolder: "jaco/Aerial_Tram", durationText: "2 Hours", durationHours: 2, difficulty: "Medium", image: sourceTourImages.aerialTram, locations: ["Jaco"], excerpt: "A treetop aerial tram ride that lets travelers see the Central Pacific forest from above.", sourceUrl: "https://alsamatourscr.com/trip/aerial-tram/" }),
  makeTour("Horseback Riding & Waterfalls", 82.73, { origin: "jaco", galleryFolder: "jaco/Horseback_Riding_&_Waterfalls", durationText: "2 Hours", durationHours: 2, image: sourceTourImages.horsebackWaterfalls, locations: ["Jaco"], excerpt: "A horseback route near Jaco with waterfall and pool time, plus chances to spot tropical wildlife.", sourceUrl: "https://alsamatourscr.com/trip/horseback-riding-waterfalls/" }),
  makeTour("Monkey Mangrove Tour", 91.01, { origin: "jaco", galleryFolder: "jaco/Monkey_Mangrove_Tour", durationText: "5 Hours", durationHours: 5, image: sourceTourImages.monkeyMangrove, locations: ["Jaco", "Los SueÃ±os"], excerpt: "A family-friendly mangrove riverboat experience with white-faced capuchin monkey sightings.", sourceUrl: "https://alsamatourscr.com/trip/monkey-mangrove-tour/" }),
  makeTour("Waterfall Experience Tour", 108.36, { origin: "jaco", galleryFolder: "jaco/Waterfall_Experience_Tour", durationText: "4 Hours", durationHours: 4, difficulty: "Medium", image: sourceTourImages.waterfallExperience, locations: ["Jaco", "Manuel Antonio"], excerpt: "A guided rainforest waterfall trip above the Pacific with pools, trails and mountain views.", sourceUrl: "https://alsamatourscr.com/trip/waterfall-experience-tour/" }),
  makeTour("Tranopy Tour", 85.08, { origin: "jaco", galleryFolder: "jaco/Tranopy_Tour", durationText: "2 Hours", durationHours: 2, image: sourceTourImages.tranopy, locations: ["Jaco"], excerpt: "A Jaco adventure mix with aerial tram scenery and zipline-style forest excitement.", sourceUrl: "https://alsamatourscr.com/trip/tranopy-tour/" }),
  makeTour("Tortuga Island Tour", 182.01, { origin: "jaco", galleryFolder: "jaco/Tortuga_Island_Tour", durationText: "1 Day", durationHours: 24, image: sourceTourImages.tortugaIsland, locations: ["Jaco", "Isla Tortuga", "Puntarenas"], excerpt: "A classic Gulf of Nicoya cruise to Tortuga Island with white sand beach and turquoise water.", sourceUrl: "https://alsamatourscr.com/trip/tortuga-island-tour/" }),
  makeTour("Chocolate Tour", 41.37, { origin: "jaco", galleryFolder: "jaco/Chocolate_Tour", durationText: "2 Hours", durationHours: 2, image: sourceTourImages.chocolate, locations: ["Puntarenas", "Jaco"], excerpt: "A short walk and chocolate experience focused on cacao, forest scenery and local flavors.", sourceUrl: "https://alsamatourscr.com/trip/chocolate-tour/" })
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
    subtitle: "National park trails, white sand beaches and tropical wildlife in one classic Costa Rica day trip.",
    overview: [
      "This tour follows the spirit of the Manuel Antonio reference itinerary: a scenic route built around nature, beach time and relaxed exploration.",
      "Alsama can coordinate pickup details, hotel location, traveler count and seasonal timing before confirming the final operating schedule."
    ],
    highlights: ["Swimming", "Beach", "Hiking trails", "Wildlife viewing", "Rainforest scenery", "Photo stops"],
    included: ["Transportation service", "Entrance coordination", "Bilingual guide", "Breakfast", "Lunch"],
    paid: ["Drinks", "Liquors", "Watersports", "Extra snacks"],
    recommendations: ["Closed toe shoes", "Towels", "Sunscreen", "Swim clothes", "Comfortable walking shoes", "Smartphone or camera"]
  },
  "nature-combo": {
    subtitle: "Coffee, waterfalls and scenic stops combined into one balanced day from San Jose.",
    overview: [
      "Nature Combo brings together several Costa Rican highlights in a single route, ideal for travelers who want variety without changing hotels.",
      "The experience can connect with lodging, onward transfers and broader vacation planning through Alsama Tours."
    ],
    highlights: ["Coffee experience", "Waterfalls", "Nature stops", "Scenic viewpoints", "Easy walking", "Photo moments"],
    included: ["Transportation service", "Tour coordination", "Bilingual guide", "Breakfast", "Lunch"],
    paid: ["Souvenirs", "Specialty coffee", "Extra drinks", "Optional activities"],
    recommendations: ["Light jacket", "Closed toe shoes", "Sunscreen", "Comfortable clothes", "Camera", "Reusable water bottle"]
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
    subtitle: "White sand beach time, Crocodile Bridge and resort comfort from San Jose.",
    overview: [
      "The experience begins with pickup from main San Jose hotels and hotels near Juan Santamaria airport before heading toward the Pacific coast.",
      "The route includes a stop at the famous Crocodile Bridge, beach chairs and umbrellas at the resort, a buffet lunch, and time for beach, trails and the butterfly garden."
    ],
    highlights: ["Swimming", "Beach sports", "Hiking trails", "Crocodile Bridge", "Beach chairs", "Buffet lunch"],
    included: ["Transportation service", "Bilingual guide", "Breakfast", "Lunch"],
    paid: ["Drinks", "Liquors", "Watersports", "Juice"],
    recommendations: ["Closed toe shoes", "Towels", "Sunscreen", "Swim clothes", "Comfortable walking shoes"]
  },
  "city-bus": {
    subtitle: "A panoramic cultural route through San Jose aboard a sightseeing double decker bus.",
    overview: [
      "This sightseeing bus tour takes travelers from their hotel into downtown San Jose to see the city's main historic landmarks and understand Costa Rica's evolution.",
      "Stops and route highlights may include the National Theater lobby, Art Museum, Metropolitan Cathedral, Central Market, National Stadium, National Monument and Democracy Plaza."
    ],
    highlights: ["Capital landmarks", "Guided city walk", "Local history", "Architecture", "Panoramic bus route"],
    included: ["Transportation service", "Local drinks", "Lunch or dinner according to schedule", "Bilingual guide", "Museum tickets"],
    paid: ["Liquors", "Snacks"],
    recommendations: ["Closed toe shoes", "Sunscreen", "Hat", "Raincoat", "Cash", "Comfortable walking shoes"]
  },
  "la-paz-waterfall-gardens": {
    subtitle: "Five waterfalls, lush rainforest and one of Costa Rica's best wildlife sanctuary visits.",
    overview: [
      "La Paz Waterfall Gardens is one of the most popular nature attractions in the San Jose area, featuring five famous waterfalls and a large animal sanctuary.",
      "The visit is focused on Costa Rican wildlife, rainforest scenery, flowing rivers, birds, butterflies, monkeys, hummingbirds, snakes, felines, frogs and more."
    ],
    highlights: ["Waterfalls", "Animal sanctuary", "Bird watching", "Wildlife viewing", "Rainforest scenery"],
    included: ["Transportation service", "Lunch", "Tickets", "Bilingual guide"],
    paid: ["Snacks", "Souvenirs"],
    recommendations: ["Sunscreen", "Hat", "Insect repellent", "Raincoat", "Sunglasses", "Closed toe shoes", "Jacket"]
  },
  "white-water-rafting": {
    subtitle: "A Savegre River rafting day with jungle scenery, waterfalls and Class II-IV rapids.",
    overview: [
      "This family-friendly full-day rafting trip begins with a 4x4 ride into the tropical jungle and remote Savegre scenery before reaching the river route.",
      "The Savegre River offers Class II, III and IV rapids, waterfall stops, tropical wildlife sightings, fruit by the river and a hot Tico-style lunch after the run."
    ],
    highlights: ["Rafting", "Savegre River", "Class II-IV rapids", "Waterfall stop", "Wildlife viewing", "Tico-style lunch"],
    included: ["Transportation service", "Rafting equipment coordination", "Guide support", "Lunch"],
    paid: ["Photos", "Extra drinks", "Private guide upgrades", "Additional snacks"],
    recommendations: ["Water shoes", "Quick-dry clothes", "Sunscreen", "Change of clothes", "Towel", "Secure strap for glasses"]
  },
  "half-day-pass-aerial-tram-and-high-rope-circuit": {
    subtitle: "Aerial tram views and a high rope challenge circuit in the Central Pacific forest.",
    overview: [
      "This package combines relaxation and adrenaline in a Central Pacific adventure park with beach, mountain, waterfall and forest scenery.",
      "Travelers ride the aerial tram, enjoy Sky Deck views, visit the butterfly garden and take on a high rope circuit with bridges, balance challenges and a descent wall."
    ],
    highlights: ["Aerial tram", "High rope circuit", "Sky Deck", "Butterfly garden", "Hanging bridges", "Descent wall"],
    included: ["Helmet"],
    paid: ["Snacks", "Beverages", "Breakfast", "Lunch", "Fast food", "Tea", "Juice"],
    recommendations: ["Closed toe shoes", "Sunscreen", "Insect repellent", "Raincoat", "Sunglasses", "Comfortable walking shoes"]
  },
  "sea-kayak-snorkel-tour": {
    subtitle: "A compact ocean adventure with kayaking, snorkeling and beach wildlife options.",
    overview: [
      "The Sea Kayak and Snorkel Tour is designed for active travelers, families and small groups who want an ocean activity without needing prior experience.",
      "The tour uses easy-to-paddle equipment and can include snorkeling when conditions permit, with options for beachcombing, monkey watching and bird watching."
    ],
    highlights: ["Kayak tour", "Snorkeling", "Swimming", "Beach scenery", "Wildlife viewing"],
    included: ["Fruits", "Water"],
    paid: ["Snacks", "Drinks"],
    recommendations: ["Water shoes", "Sunscreen", "Hat", "Swim clothes", "Insect repellent", "Sunglasses", "Change of clothes and towel"]
  },
  "canyoning-tour": {
    subtitle: "Rainforest hiking, waterfall rappels, natural pools and high-adrenaline canyoning.",
    overview: [
      "The canyoning experience includes rainforest hiking, rappelling down waterfalls, walking through riverbeds and jumping into natural pools.",
      "The route can include a tractor ride, safety briefing, multiple rappel descents, a cannonball jump, guided zip line option and waterfall features."
    ],
    highlights: ["Canyoning", "Waterfall rappels", "Natural pools", "Cannonball jump", "Tractor ride", "Waterfall avalanche"],
    included: ["Fruits", "Water", "Snacks", "Lunch", "Helmet"],
    paid: ["Souvenirs", "Photographs", "Juice", "GoPro during the tour"],
    recommendations: ["Closed toe shoes", "Sunscreen", "Hat", "Insect repellent", "Sunglasses", "Adventure clothes"]
  },
  "extreme-adrenaline-5-in-1": {
    subtitle: "A complete Jaco adventure day with tram, canopy, hiking, rope challenges and ocean views.",
    overview: [
      "Extreme Adrenaline 5 in 1 combines several activities inside a private reserve near Jaco beach for travelers who want a full adventure experience.",
      "The route includes aerial tram views, canopy lines, jungle trekking, rope circuit challenges, bridges, balance elements and a descent wall in the forest."
    ],
    highlights: ["Bird watching", "Ocean and mountain views", "Aerial tram", "Butterfly garden", "Zipline", "Hike", "Canopy"],
    included: ["Water", "Lunch", "Helmet"],
    paid: ["Snacks", "Beverages", "Breakfast", "Juice"],
    recommendations: ["Sunscreen", "Insect repellent", "Sunglasses", "Comfortable walking shoes", "Closed toe shoes", "Waterproof coat", "Camera"]
  },
  "premium-tortuga-island-tour": {
    subtitle: "A premium Gulf of Nicoya island day with beach time, ocean views and a relaxed boat experience.",
    overview: [
      "Premium Tortuga Island Tour is built around a full Pacific island escape from San Jose with turquoise water, white sand and time to enjoy the beach.",
      "Alsama can coordinate pickup, supplier confirmation and any optional beach activities before booking."
    ],
    highlights: ["Isla Tortuga", "Gulf of Nicoya", "Boat ride", "Beach time", "Swimming", "Pacific views"],
    included: ["Transportation coordination", "Boat tour coordination", "Bilingual support", "Lunch"],
    paid: ["Watersports", "Extra drinks", "Souvenirs", "Optional beach activities"],
    recommendations: ["Sunscreen", "Towels", "Swim clothes", "Sandals", "Dry bag", "Camera"]
  },
  "arenal-volcano-and-hot-springs": {
    subtitle: "Arenal Volcano scenery, La Fortuna views and hot springs relaxation in one full-day route.",
    overview: [
      "This San Jose departure heads toward La Fortuna for views of Arenal Volcano and time in volcanic hot springs.",
      "The tour is a good fit for travelers who want mountain scenery, relaxation and a full-day nature experience without changing hotels."
    ],
    highlights: ["Arenal Volcano", "La Fortuna", "Hot springs", "Mountain scenery", "Relaxation", "Photo stops"],
    included: ["Transportation service", "Tour coordination", "Bilingual guide", "Lunch"],
    paid: ["Extra drinks", "Spa upgrades", "Souvenirs", "Personal expenses"],
    recommendations: ["Swim clothes", "Towel", "Sandals", "Light jacket", "Sunscreen", "Camera"]
  },
  "typical-dinner-and-folklore-show": {
    subtitle: "Costa Rican folklore, Central Valley views and a traditional evening dinner experience.",
    overview: [
      "Typical Dinner and Folklore Show is an evening cultural experience with local music, traditional food and Costa Rican dance.",
      "It works well as a lighter San Jose night activity after arrival, meetings or a daytime tour."
    ],
    highlights: ["Folklore show", "Traditional dinner", "Marimba music", "Costa Rican culture", "Central Valley views"],
    included: ["Transportation service", "Dinner coordination", "Bilingual support", "Show admission"],
    paid: ["Liquors", "Souvenirs", "Extra drinks"],
    recommendations: ["Comfortable shoes", "Light jacket", "Camera", "Casual evening clothes"]
  },
  "irazu-volcano-halfday": {
    subtitle: "A half-day volcano route from San Jose toward Cartago and the summit landscapes of Irazu.",
    overview: [
      "Irazu Volcano Halfday focuses on the high-elevation volcano landscapes near Cartago in a shorter format than the full Orosi and Lankester route.",
      "It is useful when travelers want a volcano visit while keeping the rest of the day flexible."
    ],
    highlights: ["Irazu Volcano", "Cartago", "Volcanic crater", "Mountain views", "Half-day route"],
    included: ["Transportation service", "Entrance coordination", "Bilingual guide"],
    paid: ["Meals", "Snacks", "Souvenirs", "Extra drinks"],
    recommendations: ["Jacket", "Closed toe shoes", "Sunscreen", "Hat", "Camera"]
  },
  "irazu-volcano-orosi-valley-lankester-botanic-garden": {
    subtitle: "Cartago history, Irazu Volcano, Orosi Valley and Lankester Botanic Garden in one scenic route.",
    overview: [
      "This full route combines the summit scenery of Irazu Volcano with Cartago, Orosi Valley and the botanical collection at Lankester.",
      "It is a strong San Jose day trip for travelers who want volcano views, gardens, culture and countryside scenery."
    ],
    highlights: ["Irazu Volcano", "Orosi Valley", "Lankester Botanic Garden", "Cartago", "Scenic drive", "Orchids"],
    included: ["Transportation service", "Entrance coordination", "Bilingual guide", "Lunch"],
    paid: ["Souvenirs", "Extra drinks", "Snacks"],
    recommendations: ["Jacket", "Closed toe shoes", "Sunscreen", "Camera", "Comfortable clothes"]
  },
  "carara-national-park": {
    subtitle: "A Central Pacific national park visit known for transitional forest and scarlet macaw habitat.",
    overview: [
      "Carara National Park is a Jaco-area nature tour focused on tropical forest, birdlife and an accessible national park experience.",
      "It is a good match for travelers looking for wildlife, easy hiking and a shorter nature outing from the Central Pacific."
    ],
    highlights: ["Carara National Park", "Scarlet macaws", "Bird watching", "Forest trails", "Wildlife viewing"],
    included: ["Transportation service", "Entrance coordination", "Bilingual guide"],
    paid: ["Meals", "Snacks", "Souvenirs", "Extra drinks"],
    recommendations: ["Closed toe shoes", "Insect repellent", "Sunscreen", "Hat", "Camera", "Reusable water bottle"]
  },
  "poas-volcano-la-paz-waterfall": {
    subtitle: "A volcano and waterfall route from Jaco with Poas cloud forest scenery and La Paz trails.",
    overview: [
      "Poas Volcano and La Paz Waterfall connects the Central Pacific with one of Costa Rica's classic volcano and waterfall areas.",
      "The tour suits travelers who want a long scenic day with crater views, cool mountain weather, waterfalls and nature stops."
    ],
    highlights: ["Poas Volcano", "La Paz Waterfall", "Cloud forest", "Waterfall trails", "Mountain scenery"],
    included: ["Transportation service", "Entrance coordination", "Bilingual guide", "Lunch"],
    paid: ["Souvenirs", "Extra drinks", "Snacks"],
    recommendations: ["Jacket", "Closed toe shoes", "Raincoat", "Sunscreen", "Camera"]
  },
  "safari-adventure": {
    subtitle: "A Jaco-area sightseeing day with wildlife, river scenery, countryside stops and beach time.",
    overview: [
      "Safari Adventure combines several easy Central Pacific stops into one relaxed day from Jaco.",
      "The experience can include monkey viewing, a crocodile river cruise, local countryside scenery and time along the coast."
    ],
    highlights: ["Wildlife viewing", "Crocodile river cruise", "Monkey sightings", "Countryside stops", "Beach time"],
    included: ["Transportation service", "Activity coordination", "Bilingual support"],
    paid: ["Meals", "Extra drinks", "Photos", "Optional activities"],
    recommendations: ["Comfortable clothes", "Sunscreen", "Hat", "Insect repellent", "Camera"]
  },
  "aerial-tram": {
    subtitle: "A treetop aerial tram ride through Central Pacific forest near Jaco.",
    overview: [
      "Aerial Tram is a shorter Jaco nature activity that lets travelers see the forest canopy from above.",
      "It is a gentler adventure option for travelers who want rainforest scenery without a long or difficult hike."
    ],
    highlights: ["Aerial tram", "Rainforest canopy", "Forest views", "Bird watching", "Photo stops"],
    included: ["Tram coordination", "Bilingual support", "Supplier confirmation"],
    paid: ["Meals", "Snacks", "Beverages", "Souvenirs"],
    recommendations: ["Comfortable walking shoes", "Sunscreen", "Insect repellent", "Camera", "Light raincoat"]
  },
  "horseback-riding-waterfalls": {
    subtitle: "A horseback route near Jaco with waterfall and pool time in a tropical setting.",
    overview: [
      "Horseback Riding and Waterfalls is a relaxed adventure tour that combines riding, nature scenery and time around waterfalls.",
      "It is a good option for travelers looking for an outdoor activity that feels active but approachable."
    ],
    highlights: ["Horseback riding", "Waterfalls", "Natural pools", "Tropical scenery", "Wildlife viewing"],
    included: ["Activity coordination", "Guide support", "Helmet"],
    paid: ["Photos", "Extra drinks", "Snacks", "Souvenirs"],
    recommendations: ["Long pants", "Closed toe shoes", "Sunscreen", "Insect repellent", "Towel", "Camera"]
  },
  "monkey-mangrove-tour": {
    subtitle: "A family-friendly mangrove riverboat experience with white-faced capuchin monkey sightings.",
    overview: [
      "Monkey Mangrove Tour is an easy wildlife outing from Jaco focused on mangrove canals, river scenery and monkey sightings.",
      "It is a good fit for families, photographers and travelers who prefer a lighter nature activity."
    ],
    highlights: ["Mangrove boat tour", "Capuchin monkeys", "River scenery", "Wildlife viewing", "Family friendly"],
    included: ["Transportation coordination", "Boat tour coordination", "Bilingual support"],
    paid: ["Photos", "Extra drinks", "Snacks", "Private pickup upgrades"],
    recommendations: ["Comfortable clothes", "Sunscreen", "Insect repellent", "Hat", "Camera"]
  },
  "waterfall-experience-tour": {
    subtitle: "A guided rainforest waterfall trip above the Pacific with pools, trails and mountain views.",
    overview: [
      "Waterfall Experience Tour is a Jaco-area nature outing focused on waterfalls, forest scenery and natural pools.",
      "It works well for travelers who want a refreshing half-day adventure with swimming and easy exploration."
    ],
    highlights: ["Waterfalls", "Natural pools", "Rainforest trails", "Swimming", "Mountain views"],
    included: ["Transportation coordination", "Guide support", "Activity confirmation"],
    paid: ["Meals", "Extra drinks", "Photos", "Souvenirs"],
    recommendations: ["Swim clothes", "Towel", "Closed toe shoes", "Sunscreen", "Insect repellent", "Camera"]
  },
  "tranopy-tour": {
    subtitle: "A Jaco adventure mix with aerial tram scenery and zipline-style forest excitement.",
    overview: [
      "Tranopy Tour combines canopy-style adventure with aerial tram scenery in the Central Pacific forest.",
      "It is a compact activity for travelers who want forest views and a dose of adrenaline near Jaco."
    ],
    highlights: ["Tranopy", "Aerial tram", "Canopy", "Zipline-style adventure", "Forest views"],
    included: ["Activity coordination", "Guide support", "Helmet"],
    paid: ["Meals", "Snacks", "Beverages", "Photos"],
    recommendations: ["Closed toe shoes", "Sunscreen", "Insect repellent", "Comfortable clothes", "Camera"]
  },
  "tortuga-island-tour": {
    subtitle: "A classic Gulf of Nicoya cruise to Tortuga Island with white sand beach and turquoise water.",
    overview: [
      "Tortuga Island Tour from Jaco is a full-day coastal escape with boat travel, island scenery and relaxed beach time.",
      "It is easy to combine with Jaco lodging, private transportation and other Pacific coast services."
    ],
    highlights: ["Isla Tortuga", "Boat ride", "Beach", "Swimming", "Gulf of Nicoya", "Coastal views"],
    included: ["Transportation coordination", "Boat tour coordination", "Bilingual support", "Lunch"],
    paid: ["Watersports", "Extra drinks", "Optional beach activities", "Souvenirs"],
    recommendations: ["Sunscreen", "Towels", "Swim clothes", "Sandals", "Dry bag", "Camera"]
  },
  "chocolate-tour": {
    subtitle: "A short cacao and chocolate experience near Jaco with forest scenery and local flavors.",
    overview: [
      "Chocolate Tour introduces travelers to cacao, local chocolate flavors and a shorter educational activity near Jaco.",
      "It is a practical choice for families or travelers who want a lighter activity between beach, hotel and transport plans."
    ],
    highlights: ["Chocolate tasting", "Cacao", "Local flavors", "Short activity", "Forest scenery"],
    included: ["Activity coordination", "Guide support", "Chocolate tasting"],
    paid: ["Souvenirs", "Extra snacks", "Additional drinks"],
    recommendations: ["Comfortable shoes", "Sunscreen", "Insect repellent", "Camera", "Reusable water bottle"]
  }
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
      detail: { ...getDefaultTourDetail(tour), ...(tourDetailTemplates[slugify(tour.title)] || {}) }
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
