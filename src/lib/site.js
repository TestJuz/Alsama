export function asset(path) {
  return `${import.meta.env.BASE_URL}${path}`;
}

export const safetyPdf = asset("Safety.pdf");

export const routes = {
  home: "/",
  shuttle: "/shuttle",
  privateTransport: "/private-transport",
  toursSanJose: "/tours/san-jose",
  toursJaco: "/tours/jaco",
  rentACar: "/rent-a-car"
};

export const homeLinks = {
  home: { pathname: routes.home, hash: "#home" },
  contact: { pathname: routes.home, hash: "#contact" }
};

export const serviceMenu = [
  { label: "Shuttle", to: routes.shuttle },
  { label: "Private Transport", to: routes.privateTransport },
  { label: "Tours San Jose", to: routes.toursSanJose },
  { label: "Tours Jaco", to: routes.toursJaco },
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
