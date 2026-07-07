import { asset } from "./site";

const zoneConfigs = [
  {
    id: "manuel-antonio",
    name: "Quepos / Manuel Antonio",
    sourceName: "HOTELES QUEPOS/MANUEL ANTONIO",
    center: [-84.155, 9.409],
    zoom: 11.4,
    image: "img/hotels/Hotel_Manuel_Antonio.webp",
    description: "Beach, rainforest and national park access for travelers who want nature, ocean views and easy tour connections."
  },
  {
    id: "arenal",
    name: "Arenal",
    sourceName: "HOTELES ARENAL",
    center: [-84.674, 10.469],
    zoom: 11.2,
    image: "img/hotels/ARENAL_MANOA.webp",
    description: "Volcano, hot springs and adventure tours around La Fortuna, ideal for families and nature-focused routes."
  },
  {
    id: "monteverde",
    name: "Monteverde",
    sourceName: "HOTELES MONTEVERDE",
    center: [-84.825, 10.316],
    zoom: 12,
    image: "img/hotels/Country_Lodge.webp",
    description: "Cloud forest stays for wildlife, hanging bridges, cool weather and scenic mountain experiences."
  },
  {
    id: "sjo",
    name: "San Jose",
    sourceName: "HOTELES SJO",
    center: [-84.09, 9.934],
    zoom: 11.3,
    image: "img/hotels/Irazu_Hotel_and_Studios.webp",
    description: "City hotels for arrivals, departures, business stays and connections with airport transfers or day tours."
  },
  {
    id: "alajuela",
    name: "Alajuela",
    sourceName: "HOTELES ALAJUELA",
    center: [-84.21, 10],
    zoom: 11.2,
    image: "img/hotels/HAMPTON_BY__HILTON.webp",
    description: "Airport-area hotels for SJO arrivals, departures, layovers and Central Valley connections."
  },
  {
    id: "guanacaste",
    name: "Guanacaste",
    sourceName: "HOTELES GUANACASTE",
    center: [-85.55, 10.38],
    zoom: 8.3,
    image: "img/hotels/Wyndham_Tamarindo.webp",
    description: "Beach-region and airport stays for warm weather, surf towns, family vacations and longer coastal routes."
  },
  {
    id: "jaco",
    name: "Jaco",
    sourceName: "HOTELES JACO",
    center: [-84.63, 9.62],
    zoom: 11,
    image: "img/hotels/Best_Western_Jaco_Beach_(edificio_A).webp",
    description: "Central Pacific beach hotels for Jaco, Playa Hermosa, Punta Leona and nearby coastal routes."
  },
  {
    id: "osa",
    name: "Osa / Puerto Jimenez / Golfito",
    sourceName: "HOTELES OSA PUERTO JIMENEZ GOLFITO",
    center: [-83.38, 8.55],
    zoom: 8.7,
    image: "img/hotels/Danta_Corcovado_Lodge.webp",
    description: "Southern Pacific hotels and lodges for Osa, Puerto Jimenez, Golfito and Corcovado-focused itineraries."
  },
  {
    id: "caribe",
    name: "Caribe",
    sourceName: "HOTELES CARIBE",
    center: [-82.72, 9.65],
    zoom: 11,
    image: "img/hotels/Hotel_Cariblue_Beach_&_Jungle _Resort.webp",
    description: "Caribbean coast stays for Puerto Viejo, beach, jungle and relaxed coastal itineraries."
  }
];

const hotelImages = {
  "Hotel Manuel Antonio": "img/hotels/Hotel_Manuel_Antonio.webp",
  Divisamar: "img/hotels/Divisamar.webp",
  "Kamuk BW": "img/hotels/Kamuk_BW.webp",
  "Hotel Manuel Antonio Park": "img/hotels/Hotel_Manuel_Antonio_Park.webp",
  "La Vela Hotel": "img/hotels/La_Vela_Hotel.webp",
  "Hotel Parador": "img/hotels/Hotel_Parador.webp",
  "Arenal Manoa": "img/hotels/ARENAL_MANOA.webp",
  "Las Colinas": "img/hotels/Las_Colinas.webp",
  "La Fortuna Lodge": "img/hotels/LA_FORTUNA_LODGE.webp",
  "Arenal Springs Resort & Spa": "img/hotels/ARENAL_SPRINGS_RESORT_&_SPA.webp",
  "Montana de Fuego": "img/hotels/Montaña_de_Fuego.webp",
  "San Bosco Inn": "img/hotels/San_Bosco_Inn.webp",
  "Country Lodge": "img/hotels/Country_Lodge.webp",
  "Poco a Poco": "img/hotels/Hotel_Spa_Poco_a_Poco.webp",
  "Sibu Lodge": "img/hotels/Sibu_Lodge.webp",
  "El Establo": "img/hotels/El_Establo.webp",
  "Irazu Hotel & Studios": "img/hotels/Irazu_Hotel_and_Studios.webp",
  "Holiday Inn SJ La Sabana by IHG": "img/hotels/Holiday_Inn_SJ_La_Sabana_by_IHG.webp",
  "Hampton by Hilton": "img/hotels/HAMPTON_BY__HILTON.webp",
  "Holiday Inn Express de IHG": "img/hotels/Holiday_Inn_Express_de_IHG.webp",
  "Hilton Garden Inn Aeropuerto": "img/hotels/HILTON_GARDENN_IN_AEROPUERTO.webp",
  "Hotel Martino Resort & Spa": "img/hotels/Hotel_Martino_Resort_&_Spa.webp",
  "Hilton Garden Inn Aeropuerto Liberia": "img/hotels/HILTON_GARDENN_IN_AEROPUERTO_LIBERIA.webp",
  "Hampton by Hilton Guanacaste Airport": "img/hotels/Hampton_by_Hilton_Guanacaste_Airport.webp",
  "Wyndham Tamarindo": "img/hotels/Wyndham_Tamarindo.webp",
  "Best Western El Sitio": "img/hotels/Best_Western_El_Sitio.webp",
  Boyeros: "img/hotels/Boyeros.webp",
  "Best Western Jaco Beach (edificio A)": "img/hotels/Best_Western_Jaco_Beach_(edificio_A).webp",
  "Terrazas del Pacifico": "img/hotels/Terrazas_del_Pacifico.webp",
  "Arenas, Punta Leona": "img/hotels/Arenas_Punta_Leona.webp",
  "Danta Corcovado Lodge": "img/hotels/Danta_Corcovado_Lodge.webp",
  "Peninsula Curio Collection by Hilton": "img/hotels/Hotel_Botanika_Osa_Peninsula_Curio_Collection_by_Hilton.webp",
  "Hotel Cariblue Beach & Jungle Resort": "img/hotels/Hotel_Cariblue_Beach_&_Jungle _Resort.webp",
  "La Kukula": "img/hotels/La_Kukula.webp"
};

const coordinates = {
  "Hotel Manuel Antonio": [-84.159, 9.389],
  Divisamar: [-84.158, 9.402],
  "Kamuk BW": [-84.162, 9.431],
  "Hotel Manuel Antonio Park": [-84.159, 9.389],
  "La Vela Hotel": [-84.158, 9.39],
  "Hotel Parador": [-84.167, 9.403],
  "Arenal Manoa": [-84.718, 10.491],
  "Las Colinas": [-84.644, 10.47],
  "La Fortuna Lodge": [-84.641, 10.47],
  "Arenal Springs Resort & Spa": [-84.709, 10.495],
  "Montana de Fuego": [-84.733, 10.484],
  "San Bosco Inn": [-84.644, 10.47],
  "Country Lodge": [-84.823, 10.317],
  "Poco a Poco": [-84.819, 10.315],
  "Sibu Lodge": [-84.813, 10.321],
  "El Establo": [-84.827, 10.31],
  "Irazu Hotel & Studios": [-84.115, 9.947],
  "Holiday Inn SJ La Sabana by IHG": [-84.107, 9.936],
  "Hampton by Hilton": [-84.204, 9.999],
  "Holiday Inn Express de IHG": [-84.204, 9.996],
  "Hilton Garden Inn Aeropuerto": [-84.208, 10],
  "Hotel Martino Resort & Spa": [-84.244, 10.015],
  "Hilton Garden Inn Aeropuerto Liberia": [-85.538, 10.595],
  "Hampton by Hilton Guanacaste Airport": [-85.545, 10.596],
  "Wyndham Tamarindo": [-85.83, 10.304],
  "Best Western El Sitio": [-85.437, 10.631],
  Boyeros: [-85.438, 10.635],
  "Best Western Jaco Beach (edificio A)": [-84.635, 9.618],
  "Terrazas del Pacifico": [-84.598, 9.572],
  "Arenas, Punta Leona": [-84.663, 9.696],
  "Danta Corcovado Lodge": [-83.443, 8.57],
  "Peninsula Curio Collection by Hilton": [-83.301, 8.535],
  "Hotel Cariblue Beach & Jungle Resort": [-82.737, 9.655],
  "La Kukula": [-82.71, 9.641]
};

const descriptions = {
  "Hotel Manuel Antonio": "A practical Manuel Antonio option close to the beach and national park area, useful for travelers prioritizing location.",
  "Country Lodge": "A cozy Monteverde base with room types for travelers exploring the cloud forest area.",
  "Poco a Poco": "A polished Monteverde hotel option for travelers wanting comfort near town and nature activities.",
  "Sibu Lodge": "A Monteverde lodge-style stay with family and forest-facing room options.",
  "Irazu Hotel & Studios": "A San Jose city hotel option useful before or after flights and for short urban stays.",
};

const hotelRows = {
  "manuel-antonio": [
    ["Hotel Manuel Antonio", [["Sencilla", 193.59, 163.81], ["Doble", 211.79, 182.01], ["Triple", 230, 200.21], ["Cuadruple", 248.2, 209.31]]],
    ["Divisamar", [["Sencilla", 194.75]]],
    ["Kamuk BW", [["Standard", 168.77, 158.85], ["Superior", 311.07, 206.83]]],
    ["Hotel Manuel Antonio Park", [["Habitacion Deluxe cama King", 297.84, 215.1], ["Habitacion Deluxe dos camas twin", 297.84, 215.1], ["Habitacion Deluxe dos camas triple", 364.02, 231.65]]],
    ["La Vela Hotel", [["Sencilla", null]]],
    ["Hotel Parador", [["Sencilla", null]]]
  ],
  arenal: [
    ["Arenal Manoa", [["Superior", 531.14, 208.49], ["Premium", 557.61, 208.49], ["Chato Suites", 1158.25, 208.49]]],
    ["Las Colinas", [["Single estandar terraza", 198.84, 109.12], ["Single estandar balcon privado", 207.33, 116.4], ["Single estandar 1er nivel", 186.71, 96.99], ["Doble estandar terraza", 147.92, 122.46], ["Doble estandar balcon privado", 156.4, 128.52], ["Doble estandar 1er nivel", 135.8, 110.33]]],
    ["La Fortuna Lodge", [["Superior queen", 198.56], ["Superior twin", 244.89], ["Superior", 185.32, 152.23], ["Premium", 218.41, 185.32]]],
    ["Arenal Springs Resort & Spa", [["Master Suite hasta 10 personas", 1222.37, 1129.29]]],
    ["Montana de Fuego", [["Estandar Sencilla", 194.75], ["Doble", 287, 194.75], ["Superior Sencilla", 219.64], ["Deluxe Jardin Sencilla", 266.5]]],
    ["San Bosco Inn", [["Estandar Sencilla", 108.36, 79.07], ["Doble", 131.79, 92.25]]]
  ],
  monteverde: [
    ["Country Lodge", [["Clasica queen", 194.59], ["Clasica twin", 250.18], ["Superior", 187.97, 178.7], ["Premium", 239.59, 232.97]]],
    ["Poco a Poco", [["Bromelia", 397.11, 330.93], ["Quetzal", 463.3, 383.88], ["Garden Family", 595.67, 529.49], ["Forest Deluxe con Jacuzzi", 701.57], ["Garden Superior", 701.57, 602.29], ["Forest Deluxe", 655.24, 602.29]]],
    ["Sibu Lodge", [["Lantana", 264.74, 238.27], ["Guaria", 397.11, 344.17], ["Forest Superior", 383.88, 330.93]]],
    ["El Establo", [["Deluxe single o doble", 351.43, 256.25], ["Familiar single o doble", 497.86, 402.68]]]
  ],
  sjo: [
    ["Irazu Hotel & Studios", [["Estandar Sencilla", 147.26], ["Estandar Doble", 147.26]]],
    ["Holiday Inn SJ La Sabana by IHG", [["Estandar Sencilla", 163.81], ["Estandar Doble", 163.81]]],
  ],
  alajuela: [
    ["Hampton by Hilton", [["Estandar Sencilla", 190.28], ["Estandar Doble", 190.28], ["Estandar Triple", 206.83], ["Estandar Cuadruple", 223.38], ["Studio Sencillo", 206.83], ["Studio Doble", 206.83]]],
    ["Holiday Inn Express de IHG", [["Estandar Sencilla", null], ["Estandar Doble", null], ["Estandar Triple", null], ["Estandar Cuadruple", null], ["Studio Sencillo", null], ["Studio Doble", null]]],
    ["Hilton Garden Inn Aeropuerto", [["Habitacion Estandar", 203.52, 196.9], ["Triple", 16.55], ["Cuadruple", 33.09]]],
    ["Hotel Martino Resort & Spa", [["Deluxe Suite", 205], ["Estandar sencilla", null]]]
  ],
  guanacaste: [
    ["Hilton Garden Inn Aeropuerto Liberia", [["Estandar single", 206.83], ["Estandar Doble", 231.65], ["Triple", 256.47], ["Cuadruple", 281.29]]],
    ["Hampton by Hilton Guanacaste Airport", [["Estandar single", 173.74], ["Estandar Doble", 173.74], ["Triple", 190.28], ["Cuadruple", 206.83]]],
    ["Wyndham Tamarindo", [["Standard Ocean View", 388.84, 213.45]]],
    ["Best Western El Sitio", [["Estandar single", 140.57], ["Estandar Doble", 180.11], ["Triple", 225.5], ["Cuadruple", 263.57]]],
    ["Boyeros", [["Estandar single", 130.69], ["Estandar Doble", 148.11], ["Triple", 189.19, 180.47], ["Cuadruple", 226.53, 219.06], ["Quintuple", 261.38, 253.91], ["Sencilla", 121.98], ["Doble", 139.4]]]
  ],
  jaco: [
    ["Best Western Jaco Beach (edificio A)", [["Single", 225.5, 210.86], ["Doble", 383.64, 354.36], ["Triple", 553.5, 524.21], ["Cuadruple", 723.36, 694.07], ["Single fin de semana", 188.89, 165.46], ["Doble fin de semana", 328, 269.43], ["Triple fin de semana", 470.04, 396.82], ["Cuadruple fin de semana", 612.07, 524.21]]],
    ["Terrazas del Pacifico", [["Estandar Sencilla", 190.94, 125.34], ["Estandar Doble", 190.94, 125.34], ["Estandar Triple", 243.66, 178.06], ["Estandar Cuadruple", 296.37, 230.77], ["Superior Sencilla", 214.37, 155.8], ["Superior Doble", 214.37, 155.8], ["Superior Triple", 267.09, 208.51], ["Superior Cuadruple", 319.8, 261.23]]],
    ["Arenas, Punta Leona", [["Sencilla", 256.25, 174.25], ["Doble", 297.25, 202.07], ["Triple", 373.39, 253.32], ["Superior Sencilla", 284.07, 202.07], ["Superior Doble", 351.43, 197.68], ["Superior Triple", 455.39, 333.86]]]
  ],
  osa: [
    ["Danta Corcovado Lodge", [["Doble o sencilla", 209.39, 153.75]]],
    ["Peninsula Curio Collection by Hilton", [["Doble o sencilla", 1401.48, 339.2], ["Triple", 1444.5, 378.91], ["Cuadruple", 1485.87, 418.62]]]
  ],
  caribe: [
    ["Hotel Cariblue Beach & Jungle Resort", [["Habitacion max 1 pax", 135.35, 102.59], ["Habitacion 3 pax", 140.64], ["Maximo dos habitaciones 4 pax", 167.12]]],
    ["La Kukula", [["Standard Doble", 253.16, 190.28], ["Standard Triple", 256.47, 206.83]]]
  ]
};

function toRoom([tipo, alta, verde = null]) {
  return { tipo, alta, verde };
}

function describeHotel(zoneName, hotelName) {
  return descriptions[hotelName] || `${hotelName} hotel option in ${zoneName} with listed room rates for trip planning.`;
}

export const hotelZones = zoneConfigs.map((zone) => ({
  ...zone,
  image: asset(zone.image),
  hotels: hotelRows[zone.id].map(([hotel, rooms]) => ({
    hotel,
    description: describeHotel(zone.name, hotel),
    coordinates: coordinates[hotel],
    image: asset(hotelImages[hotel] || zone.image),
    habitaciones: rooms.map(toRoom)
  }))
}));
