const destinationCoordinates = [
  ["Arenal", -84.6453, 10.4717],
  ["Atenas", -84.3784, 9.9781],
  ["Bajos del Toro", -84.3157, 10.2032],
  ["Batan", -83.3428, 10.0845],
  ["Braulio Carrillo", -84.0007, 10.1579],
  ["Britt coffee", -84.1547, 10.0036],
  ["Cahuita", -82.8247, 9.7356],
  ["Caldera", -84.7197, 9.9147],
  ["Cano Blanco", -83.6872, 10.3334],
  ["Caño Blanco", -83.6872, 10.3334],
  ["Caño Negro", -84.7832, 10.9031],
  ["Cartago", -83.9194, 9.8644],
  ["Ciudad Quesada", -84.4303, 10.3238],
  ["Costa Rica rescue center", -84.2142, 10.0202],
  ["Doka", -84.2178, 10.0794],
  ["Dominical", -83.8616, 9.2522],
  ["Esparza", -84.6647, 9.9944],
  ["Esterillos", -84.4755, 9.5267],
  ["Golfito", -83.1822, 8.639],
  ["Grecia", -84.3117, 10.0739],
  ["Guacima", -84.2537, 9.9614],
  ["Playas del Coco", -85.697, 10.5535],
  ["Hermosa", -85.676, 10.5789],
  ["Riu", -85.7684, 10.6427],
  ["Liberia", -85.4377, 10.6346],
  ["Papagayo", -85.6845, 10.6302],
  ["Playa Grande", -85.8351, 10.3373],
  ["Tamarindo", -85.8371, 10.2993],
  ["Conchal", -85.792, 10.4037],
  ["Potrero", -85.7712, 10.447],
  ["Guapiles", -83.7852, 10.2142],
  ["Hacienda Alsacia", -84.2099, 10.1197],
  ["La Chimba", -84.1291, 9.9704],
  ["Heredia", -84.1167, 10.0024],
  ["Irazu", -83.852, 9.9793],
  ["Jacó", -84.6203, 9.614],
  ["Jaco", -84.6203, 9.614],
  ["La Pavona", -83.511, 10.543],
  ["La Paz", -84.1616, 10.2059],
  ["Limon", -83.0339, 9.9907],
  ["Los Chiles", -84.7143, 11.035],
  ["Manuel Antonio", -84.1558, 9.3923],
  ["Monteverde", -84.8255, 10.3008],
  ["Montezuma", -85.0674, 9.6558],
  ["Santa Teresa", -85.1694, 9.6439],
  ["Mal País", -85.1464, 9.5973],
  ["Mal Pais", -85.1464, 9.5973],
  ["Naranjo", -84.3788, 10.0987],
  ["Ojochal", -83.6556, 9.0826],
  ["Orotina", -84.5234, 9.9112],
  ["Palmar", -83.468, 8.9604],
  ["Palmares", -84.4316, 10.056],
  ["Paquera", -84.9354, 9.8202],
  ["Paso Canoas", -82.8353, 8.534],
  ["Peñas Blancas", -85.6322, 11.2137],
  ["Pérez Zeledón", -83.704, 9.3726],
  ["Perez Zeledon", -83.704, 9.3726],
  ["Poas", -84.2335, 10.198],
  ["Poás", -84.2335, 10.198],
  ["Puerto Jimenez", -83.3055, 8.5339],
  ["Puerto Viejo", -82.7537, 9.6554],
  ["Cocles", -82.7246, 9.6467],
  ["Manzanillo", -82.656, 9.6299],
  ["Punta Islita", -85.3916, 9.8566],
  ["Puntarenas", -84.8339, 9.9763],
  ["Puerto Coyote", -85.2468, 9.7869],
  ["Rancho Biriteca", -84.1386, 9.9197],
  ["Rincon de la Vieja", -85.3372, 10.8306],
  ["Samara", -85.5263, 9.881],
  ["San Jose", -84.0907, 9.9281],
  ["San José", -84.0907, 9.9281],
  ["Sarapiqui", -84.0167, 10.4522],
  ["Sarapiquí", -84.0167, 10.4522],
  ["Sarchí", -84.3476, 10.0887],
  ["Sierpe", -83.4716, 8.8583],
  ["Siquirres", -83.5062, 10.0989],
  ["Sixaola", -82.6212, 9.5273],
  ["Sn Gerardo Dota", -83.8038, 9.5498],
  ["San Gerardo", -83.8038, 9.5498],
  ["Sn Ramon", -84.4702, 10.0872],
  ["San Ramon", -84.4702, 10.0872],
  ["San Luis Canopy", -84.827, 10.2849],
  ["Tambor", -85.0264, 9.7389],
  ["Tucan rescue ranch", -84.0662, 10.0387],
  ["Turrialba", -83.6835, 9.9047],
  ["Tiquicia", -84.1087, 9.8847],
  ["Uvita", -83.7397, 9.1636],
  ["Zooave", -84.2724, 10.0059],
  ["Ram Luna", -84.0902, 9.8469],
  ["Alajuela", -84.2142, 10.0162],
  ["GAM", -84.0907, 9.9281],
  ["Ato", -84.2088, 9.9939],
  ["Volcán Irazú", -83.852, 9.9793],
  ["Volcán Poás", -84.2335, 10.198],
  ["Chino Monkey", -84.6442, 9.7003],
  ["Jungle Crocodile", -84.6558, 9.7905]
];

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function findCoordinates(place, base) {
  const normalized = place.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const match = destinationCoordinates.find(([name]) =>
    normalized.includes(name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase())
  );

  if (match) return { lng: match[1], lat: match[2] };
  return base === "JACO" ? { lng: -84.6203, lat: 9.614 } : { lng: -84.0907, lat: 9.9281 };
}

const rawPrivateTransportRates = {
  GAM: [
    { lugar: "Arenal", pax_1_5: 265, pax_6_mas: 331 },
    { lugar: "Arenal all day max 6 hrs espera", pax_1_5: 414, pax_6_mas: 463 },
    { lugar: "Atenas", pax_1_5: 83, pax_6_mas: 132 },
    { lugar: "Bajos del Toro", pax_1_5: 331, pax_6_mas: 397 },
    { lugar: "Batan", pax_1_5: 331, pax_6_mas: 381 },
    { lugar: "Braulio Carrillo (Rain Forest)", pax_1_5: 248, pax_6_mas: 298 },
    { lugar: "Britt coffee tour", pax_1_5: 165, pax_6_mas: 199 },
    { lugar: "Cahuita", pax_1_5: 414, pax_6_mas: 463 },
    { lugar: "Caldera", pax_1_5: 165, pax_6_mas: 248 },
    { lugar: "Caño Blanco", pax_1_5: null, pax_6_mas: null },
    { lugar: "Caño Negro", pax_1_5: null, pax_6_mas: null },
    { lugar: "Cartago (1 via)", pax_1_5: 141, pax_6_mas: 165 },
    { lugar: "Cartago (max 6 hrs espera)", pax_1_5: 215, pax_6_mas: 248 },
    { lugar: "Ciudad Quesada", pax_1_5: 265, pax_6_mas: 331 },
    { lugar: "Costa Rica rescue center", pax_1_5: 132, pax_6_mas: 165 },
    { lugar: "Doka Coffee Tour", pax_1_5: 149, pax_6_mas: 182 },
    { lugar: "Dominical", pax_1_5: 381, pax_6_mas: 414 },
    { lugar: "Esparza", pax_1_5: 165, pax_6_mas: 199 },
    { lugar: "Esterillos", pax_1_5: 232, pax_6_mas: 265 },
    { lugar: "Golfito", pax_1_5: 662, pax_6_mas: 827 },
    { lugar: "Grecia", pax_1_5: 99, pax_6_mas: 132 },
    { lugar: "Guacima", pax_1_5: 66, pax_6_mas: 83 },
    { lugar: "Playas del Coco, Hermosa, Riu, Liberia, Papagayo", pax_1_5: 381, pax_6_mas: 463 },
    { lugar: "Playa Grande, Tamarindo, Conchal, Potrero", pax_1_5: 414, pax_6_mas: 463 },
    { lugar: "Guapiles", pax_1_5: 248, pax_6_mas: 298 },
    { lugar: "Hacienda Alsacia Starbucks", pax_1_5: 165, pax_6_mas: 199 },
    { lugar: "Hacienda La Chimba half day max 4 hrs", pax_1_5: 132, pax_6_mas: 165 },
    { lugar: "Heredia", pax_1_5: 50, pax_6_mas: 74 },
    { lugar: "Irazu Volcan Tour", pax_1_5: 248, pax_6_mas: 298 },
    { lugar: "Irazu Volcan, Basilica y Ruinas", pax_1_5: 281, pax_6_mas: 331 },
    { lugar: "Irazu Volcan, V. Orosi y Lankaster", pax_1_5: 281, pax_6_mas: 331 },
    { lugar: "Irazu Volcan Tour y Hacienda Orosi", pax_1_5: 331, pax_6_mas: null },
    { lugar: "Jacó all day maximo 6 hrs espera", pax_1_5: 290, pax_6_mas: 331 },
    { lugar: "Jaco GAM", pax_1_5: 199, pax_6_mas: 265 },
    { lugar: "Jaco Transfer In", pax_1_5: 165, pax_6_mas: 248 },
    { lugar: "Jaco Transfer Out", pax_1_5: 165, pax_6_mas: 248 },
    { lugar: "La Pavona (Muelle Tortuguero)", pax_1_5: 298, pax_6_mas: 364 },
    { lugar: "La Paz", pax_1_5: 215, pax_6_mas: 248 },
    { lugar: "Liberia", pax_1_5: 364, pax_6_mas: 414 },
    { lugar: "Limon", pax_1_5: 364, pax_6_mas: 414 },
    { lugar: "Los Chiles", pax_1_5: 447, pax_6_mas: 496 },
    { lugar: "Manuel Antonio", pax_1_5: 265, pax_6_mas: 331 },
    { lugar: "Manuel Antonio all day max 6 hrs espera", pax_1_5: 447, pax_6_mas: 496 },
    { lugar: "Monteverde", pax_1_5: 281, pax_6_mas: 331 },
    { lugar: "Monteverde all day max 6 hrs espera", pax_1_5: 381, pax_6_mas: 430 },
    { lugar: "Montezuma, M. Pais, S. Teresa (Ferry)", pax_1_5: 496, pax_6_mas: 563 },
    { lugar: "Montezuma, M. Pais, S. Teresa (Tierra)", pax_1_5: 662, pax_6_mas: 745 },
    { lugar: "Naranjo", pax_1_5: 116, pax_6_mas: 165 },
    { lugar: "Ojochal Puntarenas", pax_1_5: 447, pax_6_mas: 496 },
    { lugar: "Orotina", pax_1_5: 165, pax_6_mas: 199 },
    { lugar: "Palmar Norte / Sur", pax_1_5: 529, pax_6_mas: 579 },
    { lugar: "Palmares", pax_1_5: 132, pax_6_mas: 182 },
    { lugar: "Paquera (Ferry)", pax_1_5: 414, pax_6_mas: 463 },
    { lugar: "Paquera (Tierra)", pax_1_5: 662, pax_6_mas: 745 },
    { lugar: "Paso Canoas", pax_1_5: 745, pax_6_mas: 827 },
    { lugar: "Peñas Blancas", pax_1_5: 480, pax_6_mas: 546 },
    { lugar: "Pérez Zeledón", pax_1_5: 397, pax_6_mas: 496 },
    { lugar: "Poas Doka Tour", pax_1_5: 232, pax_6_mas: 331 },
    { lugar: "Poas Tour", pax_1_5: 199, pax_6_mas: 248 },
    { lugar: "Poas y La Paz", pax_1_5: 232, pax_6_mas: 265 },
    { lugar: "Poas, Doka y La Paz Tour", pax_1_5: 265, pax_6_mas: 331 },
    { lugar: "Poás, Alsacia tour", pax_1_5: 232, pax_6_mas: 331 },
    { lugar: "Puerto Jimenez", pax_1_5: 662, pax_6_mas: 745 },
    { lugar: "Puerto Viejo / Cocles / Manzanillo", pax_1_5: 430, pax_6_mas: 496 },
    { lugar: "Punta Islita", pax_1_5: 463, pax_6_mas: 496 },
    { lugar: "Puntarenas", pax_1_5: 199, pax_6_mas: 248 },
    { lugar: "Puntarenas all day max 6 hrs espera", pax_1_5: 298, pax_6_mas: 331 },
    { lugar: "Puerto Coyote, por ferry", pax_1_5: 579, pax_6_mas: 579 },
    { lugar: "Rancho Biriteca", pax_1_5: 232, pax_6_mas: 331 },
    { lugar: "Rincon de la Vieja", pax_1_5: 496, pax_6_mas: 546 },
    { lugar: "Samara", pax_1_5: 463, pax_6_mas: 529 },
    { lugar: "San Jose City Tour (3hrs espera)", pax_1_5: 124, pax_6_mas: null },
    { lugar: "San Jose City Tour (4hrs espera)", pax_1_5: 165, pax_6_mas: 215 },
    { lugar: "Sarapiqui", pax_1_5: 215, pax_6_mas: 248 },
    { lugar: "Sarapiquí max 6 hrs espera", pax_1_5: 331, pax_6_mas: 381 },
    { lugar: "Sarchí", pax_1_5: 232, pax_6_mas: null },
    { lugar: "Sierpe", pax_1_5: 496, pax_6_mas: 563 },
    { lugar: "Siquirres", pax_1_5: 281, pax_6_mas: 331 },
    { lugar: "Sixaola", pax_1_5: 463, pax_6_mas: 496 },
    { lugar: "Sn Gerardo Dota", pax_1_5: 414, pax_6_mas: 463 },
    { lugar: "Sn Ramon", pax_1_5: 132, pax_6_mas: 165 },
    { lugar: "San Luis Canopy", pax_1_5: 248, pax_6_mas: null },
    { lugar: "Tambor (Carretera)", pax_1_5: 662, pax_6_mas: 745 },
    { lugar: "Tambor (Ferry)", pax_1_5: 496, pax_6_mas: 579 },
    { lugar: "Transfer In GAM", pax_1_5: 58, pax_6_mas: 74 },
    { lugar: "Transfer Out GAM", pax_1_5: 50, pax_6_mas: 66 },
    { lugar: "Tucan rescue ranch", pax_1_5: 165, pax_6_mas: 199 },
    { lugar: "Turrialba", pax_1_5: 248, pax_6_mas: 298 },
    { lugar: "Tiquicia Mirador (cena) desde Alajuela", pax_1_5: 215, pax_6_mas: 232 },
    { lugar: "Tiquicia Mirador (cena) desde San José", pax_1_5: 215, pax_6_mas: 199 },
    { lugar: "Uvita", pax_1_5: 414, pax_6_mas: 462 },
    { lugar: "Zooave ROUNDTRIP", pax_1_5: 99, pax_6_mas: 165 },
    { lugar: "Ram Luna (cena) desde Alajuela", pax_1_5: 215, pax_6_mas: 269 },
    { lugar: "Ram Luna (cena) desde San José", pax_1_5: 199, pax_6_mas: 252 }
  ],
  JACO: [
    { lugar: "Jacó - San José", pax_1_5: 223, pax_extra: 17 },
    { lugar: "Ato - Jacó Transfer OUT", pax_1_5: 182, pax_extra: 17 },
    { lugar: "Ato - Jacó Transfer IN", pax_1_5: 182, pax_extra: 17 },
    { lugar: "Jacó - Puntarenas", pax_1_5: 149, pax_extra: 17 },
    { lugar: "Jacó - Caldera", pax_1_5: 149, pax_extra: 17 },
    { lugar: "Jacó - Esterillos", pax_1_5: 58, pax_extra: 17 },
    { lugar: "Jacó - Monteverde", pax_1_5: 314, pax_extra: 17 },
    { lugar: "Jacó - Arenal", pax_1_5: 381, pax_extra: 17 },
    { lugar: "Jacó - Manuel Antonio", pax_1_5: 157, pax_extra: 17 },
    { lugar: "Jacó - Dominical", pax_1_5: 232, pax_extra: 17 },
    { lugar: "Jacó - Sierpe", pax_1_5: 447, pax_extra: 17 },
    { lugar: "Jacó - Golfito", pax_1_5: 488, pax_extra: 17 },
    { lugar: "Jacó - Puerto Viejo Limón", pax_1_5: 579, pax_extra: 17 },
    { lugar: "Jacó - Liberia", pax_1_5: 414, pax_extra: 17 },
    { lugar: "Jacó - Tamarindo", pax_1_5: 447, pax_extra: 17 },
    { lugar: "Jacó - Montezuma / Santa Teresa / Mal País", pax_1_5: 496, pax_extra: 17 },
    { lugar: "Jacó - Volcán Poás Tour / Cataratas / Doka", pax_1_5: 364, pax_extra: 17 },
    { lugar: "Jacó - Volcán Irazú", pax_1_5: 414, pax_extra: 17 },
    { lugar: "Jacó - Volcán Irazú - Orosi & Lankester", pax_1_5: 414, pax_extra: 17 },
    { lugar: "Jacó - Volcán Irazú - Ruinas de Cartago & Basilica", pax_1_5: 414, pax_extra: 17 },
    { lugar: "Jacó - Tour de Chino Monkey", pax_1_5: 165, pax_extra: 17 },
    { lugar: "Jacó - Tour Jungle Crocodile", pax_1_5: null, pax_extra: 17 },
    { lugar: "ONE DAY Jacó (Max 6 hrs de espera)", pax_1_5: 248, pax_extra: 17 },
    { lugar: "ONE DAY Jacó - San José (Max 6 hrs de espera)", pax_1_5: 314, pax_extra: 21.64 },
    { lugar: "ONE DAY Jacó - Arenal (Max 6hrs espera)", pax_1_5: 414, pax_extra: 17 },
    { lugar: "ONE DAY Jacó - Manuel Ant (Max 6hrs espera)", pax_1_5: 248, pax_extra: 17 },
    { lugar: "ONE Day Jacó - Monteverde (Max 6hrs espera)", pax_1_5: 414, pax_extra: 17 },
    { lugar: "Jacó - Doka - Volcán Poás Tour", pax_1_5: 331, pax_extra: 17 },
    { lugar: "Cenas en Jacó (3hrs espera)", pax_1_5: 116, pax_extra: 8 }
  ]
};

export const privateTransportRoutes = Object.entries(rawPrivateTransportRates).flatMap(([base, items]) =>
  items.map((item, index) => ({
    ...item,
    base,
    id: `${base.toLowerCase()}-${slugify(item.lugar)}-${index}`,
    coordinates: findCoordinates(item.lugar, base)
  }))
);

export function getPrivateTransportPrice(route, passengers) {
  const pax = Math.max(1, Number(passengers) || 1);

  if (route.base === "JACO") {
    if (typeof route.pax_1_5 !== "number") return undefined;
    if (pax <= 5) return route.pax_1_5;
    return route.pax_1_5 + (pax - 5) * route.pax_extra;
  }

  if (pax <= 5) return typeof route.pax_1_5 === "number" ? route.pax_1_5 : undefined;
  return typeof route.pax_6_mas === "number" ? route.pax_6_mas : undefined;
}

export function getPrivateTransportPriceLabel(route) {
  if (route.base === "JACO") {
    if (typeof route.pax_1_5 !== "number") return "Rate on request";
    return `$${route.pax_1_5} / 1-5 pax + $${route.pax_extra} extra pax`;
  }

  const small = typeof route.pax_1_5 === "number" ? `$${route.pax_1_5}` : "Request";
  const large = typeof route.pax_6_mas === "number" ? `$${route.pax_6_mas}` : "Request";
  return `${small} / 1-5 pax · ${large} / 6+ pax`;
}
