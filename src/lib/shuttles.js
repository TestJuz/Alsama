export const shuttleRoutes = [
  {
    id: "san-jose-manuel-antonio",
    service: "San Jose - Manuel Antonio",
    price: 61,
    schedule: "7:00 AM",
    departureTime: "07:00",
    departurePeriod: "Morning",
    region: "Central Pacific",
    summary: "Main shared shuttle from San Jose and SJO Airport toward Quepos and Manuel Antonio.",
    viewport: {
      center: [-84.22, 9.66],
      zoom: 8.4
    },
    stops: [
      { name: "San Jose", lng: -84.0907, lat: 9.9281 },
      { name: "SJO Airport", lng: -84.2088, lat: 9.9989 },
      { name: "Jaco", lng: -84.626, lat: 9.615 },
      { name: "Quepos", lng: -84.161, lat: 9.431 },
      { name: "Manuel Antonio", lng: -84.139, lat: 9.392 }
    ]
  },
  {
    id: "san-jose-arenal",
    service: "San Jose - Arenal / La Fortuna",
    price: 57,
    schedule: "7:30 AM",
    departureTime: "07:30",
    departurePeriod: "Morning",
    region: "Northern",
    summary: "Popular route from the capital area to La Fortuna, Arenal Volcano and nearby hot springs.",
    viewport: {
      center: [-84.36, 10.2],
      zoom: 8.65
    },
    stops: [
      { name: "San Jose", lng: -84.0907, lat: 9.9281 },
      { name: "SJO Airport", lng: -84.2088, lat: 9.9989 },
      { name: "San Ramon", lng: -84.4702, lat: 10.088 },
      { name: "La Fortuna", lng: -84.6453, lat: 10.4717 },
      { name: "Arenal", lng: -84.703, lat: 10.463 }
    ]
  },
  {
    id: "san-jose-jaco",
    service: "San Jose - Jaco",
    price: 45,
    schedule: "8:00 AM",
    departureTime: "08:00",
    departurePeriod: "Morning",
    region: "Central Pacific",
    summary: "Direct shared shuttle from San Jose and SJO Airport to Jaco beach.",
    viewport: {
      center: [-84.36, 9.79],
      zoom: 9.1
    },
    stops: [
      { name: "San Jose", lng: -84.0907, lat: 9.9281 },
      { name: "SJO Airport", lng: -84.2088, lat: 9.9989 },
      { name: "Atenas", lng: -84.3836, lat: 9.9797 },
      { name: "Tarcoles", lng: -84.6346, lat: 9.7696 },
      { name: "Jaco", lng: -84.626, lat: 9.615 }
    ]
  },
  {
    id: "san-jose-monteverde",
    service: "San Jose - Monteverde",
    price: 59,
    schedule: "8:00 AM",
    departureTime: "08:00",
    departurePeriod: "Morning",
    region: "Mountain",
    summary: "Shared mountain route from San Jose toward Santa Elena and Monteverde Cloud Forest.",
    viewport: {
      center: [-84.47, 10.12],
      zoom: 8.55
    },
    stops: [
      { name: "San Jose", lng: -84.0907, lat: 9.9281 },
      { name: "SJO Airport", lng: -84.2088, lat: 9.9989 },
      { name: "San Ramon", lng: -84.4702, lat: 10.088 },
      { name: "Santa Elena", lng: -84.8254, lat: 10.3155 },
      { name: "Monteverde", lng: -84.825, lat: 10.315 }
    ]
  },
  {
    id: "san-jose-limon",
    service: "San Jose - Limon",
    price: 52,
    schedule: "7:00 AM",
    departureTime: "07:00",
    departurePeriod: "Morning",
    region: "Caribbean",
    summary: "Main Caribbean shuttle from San Jose to Guapiles and Limon.",
    viewport: {
      center: [-83.58, 10.05],
      zoom: 8.55
    },
    stops: [
      { name: "San Jose", lng: -84.0907, lat: 9.9281 },
      { name: "Santo Domingo", lng: -84.086, lat: 9.983 },
      { name: "Guapiles", lng: -83.7852, lat: 10.2142 },
      { name: "Siquirres", lng: -83.506, lat: 10.097 },
      { name: "Limon", lng: -83.0339, lat: 9.9907 }
    ]
  },
  {
    id: "manuel-antonio-san-jose",
    service: "Manuel Antonio - San Jose",
    price: 61,
    schedule: "1:30 PM",
    departureTime: "13:30",
    departurePeriod: "Afternoon",
    region: "Return route",
    summary: "Return shuttle from Manuel Antonio and Quepos back to SJO Airport and San Jose.",
    viewport: {
      center: [-84.22, 9.66],
      zoom: 8.4
    },
    stops: [
      { name: "Manuel Antonio", lng: -84.139, lat: 9.392 },
      { name: "Quepos", lng: -84.161, lat: 9.431 },
      { name: "Jaco", lng: -84.626, lat: 9.615 },
      { name: "SJO Airport", lng: -84.2088, lat: 9.9989 },
      { name: "San Jose", lng: -84.0907, lat: 9.9281 }
    ]
  },
  {
    id: "arenal-san-jose",
    service: "Arenal / La Fortuna - San Jose",
    price: 57,
    schedule: "12:30 PM",
    departureTime: "12:30",
    departurePeriod: "Afternoon",
    region: "Return route",
    summary: "Return connection from Arenal and La Fortuna to San Jose and the airport area.",
    viewport: {
      center: [-84.36, 10.2],
      zoom: 8.65
    },
    stops: [
      { name: "Arenal", lng: -84.703, lat: 10.463 },
      { name: "La Fortuna", lng: -84.6453, lat: 10.4717 },
      { name: "San Ramon", lng: -84.4702, lat: 10.088 },
      { name: "SJO Airport", lng: -84.2088, lat: 9.9989 },
      { name: "San Jose", lng: -84.0907, lat: 9.9281 }
    ]
  },
  {
    id: "jaco-san-jose",
    service: "Jaco - San Jose",
    price: 45,
    schedule: "2:00 PM",
    departureTime: "14:00",
    departurePeriod: "Afternoon",
    region: "Return route",
    summary: "Afternoon return shuttle from Jaco to SJO Airport and San Jose.",
    viewport: {
      center: [-84.36, 9.79],
      zoom: 9.1
    },
    stops: [
      { name: "Jaco", lng: -84.626, lat: 9.615 },
      { name: "Tarcoles", lng: -84.6346, lat: 9.7696 },
      { name: "Atenas", lng: -84.3836, lat: 9.9797 },
      { name: "SJO Airport", lng: -84.2088, lat: 9.9989 },
      { name: "San Jose", lng: -84.0907, lat: 9.9281 }
    ]
  },
  {
    id: "monteverde-jaco",
    service: "Monteverde - Jaco",
    price: 58,
    schedule: "8:30 AM",
    departureTime: "08:30",
    departurePeriod: "Morning",
    region: "Return route",
    summary: "Mountain-to-beach shuttle from Monteverde and Santa Elena to Jaco.",
    viewport: {
      center: [-84.75, 9.99],
      zoom: 8.9
    },
    stops: [
      { name: "Monteverde", lng: -84.825, lat: 10.315 },
      { name: "Santa Elena", lng: -84.8254, lat: 10.3155 },
      { name: "Puntarenas", lng: -84.838, lat: 9.9778 },
      { name: "Tarcoles", lng: -84.6346, lat: 9.7696 },
      { name: "Jaco", lng: -84.626, lat: 9.615 }
    ]
  },
  {
    id: "monteverde-san-jose",
    service: "Monteverde - San Jose",
    price: 59,
    schedule: "1:00 PM",
    departureTime: "13:00",
    departurePeriod: "Afternoon",
    region: "Return route",
    summary: "Return shuttle from Monteverde to the airport area and San Jose.",
    viewport: {
      center: [-84.47, 10.12],
      zoom: 8.55
    },
    stops: [
      { name: "Monteverde", lng: -84.825, lat: 10.315 },
      { name: "Santa Elena", lng: -84.8254, lat: 10.3155 },
      { name: "San Ramon", lng: -84.4702, lat: 10.088 },
      { name: "SJO Airport", lng: -84.2088, lat: 9.9989 },
      { name: "San Jose", lng: -84.0907, lat: 9.9281 }
    ]
  },
  {
    id: "nicoya-peninsula-loop",
    service: "Shuttle Santa Teresa, Montezuma, Mal Pais, Tambor",
    price: 66,
    schedule: "6:00-7:00 AM",
    departureTime: "06:00",
    departurePeriod: "Morning",
    region: "Pacific",
    summary: "Shared shuttle covering the main beach towns and transfer points on the Nicoya Peninsula.",
    viewport: {
      center: [-85.1, 9.66],
      zoom: 11.15
    },
    stops: [
      { name: "Santa Teresa", lng: -85.1694, lat: 9.6439 },
      { name: "Mal Pais", lng: -85.1464, lat: 9.5973 },
      { name: "Montezuma", lng: -85.0674, lat: 9.6558 },
      { name: "Tambor", lng: -85.0264, lat: 9.7389 }
    ]
  },
  {
    id: "arenal-punta-uva-manzanillo",
    service: "Arenal - Pta Uva/Manzanillo",
    price: 93,
    schedule: "6:00 AM",
    departureTime: "06:00",
    departurePeriod: "Morning",
    region: "Caribbean",
    summary: "Morning shuttle from Arenal to the southern Caribbean coast, connecting with Punta Uva and Manzanillo.",
    viewport: {
      center: [-83.7, 10.08],
      zoom: 8.05
    },
    stops: [
      { name: "Arenal / La Fortuna", lng: -84.6453, lat: 10.4717 },
      { name: "Guapiles", lng: -83.7852, lat: 10.2142 },
      { name: "Limon", lng: -83.0339, lat: 9.9907 },
      { name: "Cahuita", lng: -82.8247, lat: 9.7356 },
      { name: "Puerto Viejo", lng: -82.7537, lat: 9.6554 },
      { name: "Punta Uva", lng: -82.6911, lat: 9.6395 },
      { name: "Manzanillo", lng: -82.656, lat: 9.6299 }
    ]
  },
  {
    id: "arenal-puerto-viejo",
    service: "Arenal - Puerto Viejo",
    price: 93,
    schedule: "1:00 PM",
    departureTime: "13:00",
    departurePeriod: "Afternoon",
    region: "Caribbean",
    summary: "Afternoon shuttle from Arenal into Puerto Viejo with the main Caribbean road corridor shown on the map.",
    viewport: {
      center: [-83.8, 10.15],
      zoom: 8.2
    },
    stops: [
      { name: "Arenal / La Fortuna", lng: -84.6453, lat: 10.4717 },
      { name: "Guapiles", lng: -83.7852, lat: 10.2142 },
      { name: "Limon", lng: -83.0339, lat: 9.9907 },
      { name: "Cahuita", lng: -82.8247, lat: 9.7356 },
      { name: "Puerto Viejo", lng: -82.7537, lat: 9.6554 }
    ]
  },
  {
    id: "arenal-cahuita",
    service: "Arenal - Cahuita",
    price: 93,
    schedule: "1:00 PM",
    departureTime: "13:00",
    departurePeriod: "Afternoon",
    region: "Caribbean",
    summary: "Shared shuttle from Arenal to Cahuita, useful for travelers continuing toward the central Caribbean coast.",
    viewport: {
      center: [-83.95, 10.18],
      zoom: 8.45
    },
    stops: [
      { name: "Arenal / La Fortuna", lng: -84.6453, lat: 10.4717 },
      { name: "Guapiles", lng: -83.7852, lat: 10.2142 },
      { name: "Limon", lng: -83.0339, lat: 9.9907 },
      { name: "Cahuita", lng: -82.8247, lat: 9.7356 }
    ]
  }
];

export function getFallbackRouteCoordinates(route) {
  return route.stops.map((stop) => [stop.lng, stop.lat]);
}
