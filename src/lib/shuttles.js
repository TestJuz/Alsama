export const shuttleRoutes = [
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
      { name: "Montezuma", lng: -85.0674, lat: 9.6558 },
      { name: "Mal Pais", lng: -85.1464, lat: 9.5973 },
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
