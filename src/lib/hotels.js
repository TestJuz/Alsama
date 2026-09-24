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
    ["Hotel Manuel Antonio", [["Sencilla", 167.14, 141.43], ["Doble", 182.86, 157.14], ["Triple", 198.57, 172.86], ["Cuadruple", 214.29, 180.71]]],
    ["Divisamar", [["Sencilla", null]]],
    ["Kamuk BW", [["Standard", 145.71, 137.14], ["Superior", 268.57, 178.57]]],
    ["Hotel Manuel Antonio Park", [["Habitacion Deluxe cama King", 257.14, 185.71], ["Habitacion Deluxe dos camas twin", 257.14, 185.71], ["Habitacion Deluxe dos camas triple", 314.29, 200]]],
    ["La Vela Hotel", [["Sencilla", null]]],
    ["Hotel Parador", [["Sencilla", null]]]
  ],
  arenal: [
    ["Arenal Manoa", [["Superior", 458.57, 180], ["Premium", 481.43, 180], ["Chato Suites", 1000, 180]]],
    ["Las Colinas", [["Single estandar terraza", null, null], ["Single estandar balcon privado", null, null], ["Single estandar 1er nivel", null, null], ["Doble estandar terraza", null, null], ["Doble estandar balcon privado", null, null], ["Doble estandar 1er nivel", null, null]]],
    ["La Fortuna Lodge", [["Superior queen", 171.43], ["Superior twin", 211.43], ["Superior", 160, 131.43], ["Premium", 188.57, 160]]],
    ["Arenal Springs Resort & Spa", [["Master Suite hasta 10 personas", 1055.36, 975]]],
    ["Montana de Fuego", [["Estandar Sencilla", null], ["Doble", null, null], ["Superior Sencilla", null], ["Deluxe Jardin Sencilla", null]]],
    ["San Bosco Inn", [["Estandar Sencilla", null, null], ["Doble", null, null]]]
  ],
  monteverde: [
    ["Country Lodge", [["Clasica queen", 168], ["Clasica twin", 216], ["Superior", 162.29, 154.29], ["Premium", 206.86, 201.14]]],
    ["Poco a Poco", [["Bromelia", 342.86, 285.71], ["Quetzal", 400, 331.43], ["Garden Family", 514.29, 457.14], ["Forest Deluxe con Jacuzzi", 605.71], ["Garden Superior", 605.71, 520], ["Forest Deluxe", 565.71, 520]]],
    ["Sibu Lodge", [["Lantana", 228.57, 205.71], ["Guaria", 342.86, 297.14], ["Forest Superior", 331.43, 285.71]]],
    ["El Establo", [["Deluxe single o doble", null, null], ["Familiar single o doble", null, null]]]
  ],
  sjo: [
    ["Irazu Hotel & Studios", [["Estandar Sencilla", 127.14], ["Estandar Doble", 127.14]]],
    ["Holiday Inn SJ La Sabana by IHG", [["Estandar Sencilla", 141.43], ["Estandar Doble", 141.43]]],
  ],
  alajuela: [
    ["Hampton by Hilton", [["Estandar Sencilla", 164.29], ["Estandar Doble", 164.29], ["Estandar Triple", 178.57], ["Estandar Cuadruple", 192.86], ["Studio Sencillo", 178.57], ["Studio Doble", 178.57]]],
    ["Holiday Inn Express de IHG", [["Estandar Sencilla", null], ["Estandar Doble", null], ["Estandar Triple", null], ["Estandar Cuadruple", null], ["Studio Sencillo", null], ["Studio Doble", null]]],
    ["Hilton Garden Inn Aeropuerto", [["Habitacion Estandar", 175.71, 170], ["Triple", 14.29], ["Cuadruple", 28.57]]],
    ["Hotel Martino Resort & Spa", [["Deluxe Suite", null], ["Estandar sencilla", null]]]
  ],
  guanacaste: [
    ["Hilton Garden Inn Aeropuerto Liberia", [["Estandar single", 178.57], ["Estandar Doble", 200], ["Triple", 221.43], ["Cuadruple", 242.86]]],
    ["Hampton by Hilton Guanacaste Airport", [["Estandar single", 150], ["Estandar Doble", 150], ["Triple", 164.29], ["Cuadruple", 178.57]]],
    ["Wyndham Tamarindo", [["Standard Ocean View", 335.71, 184.29]]],
    ["Best Western El Sitio", [["Estandar single", null], ["Estandar Doble", null], ["Triple", null], ["Cuadruple", null]]],
    ["Boyeros", [["Estandar single", null], ["Estandar Doble", null], ["Triple", null, null], ["Cuadruple", null, null], ["Quintuple", null, null], ["Sencilla", null], ["Doble", null]]]
  ],
  jaco: [
    ["Best Western Jaco Beach (edificio A)", [["Single", null, null], ["Doble", null, null], ["Triple", null, null], ["Cuadruple", null, null], ["Single fin de semana", null, null], ["Doble fin de semana", null, null], ["Triple fin de semana", null, null], ["Cuadruple fin de semana", null, null]]],
    ["Terrazas del Pacifico", [["Estandar Sencilla", null, null], ["Estandar Doble", null, null], ["Estandar Triple", null, null], ["Estandar Cuadruple", null, null], ["Superior Sencilla", null, null], ["Superior Doble", null, null], ["Superior Triple", null, null], ["Superior Cuadruple", null, null]]],
    ["Arenas, Punta Leona", [["Sencilla", null, null], ["Doble", null, null], ["Triple", null, null], ["Superior Sencilla", null, null], ["Superior Doble", null, null], ["Superior Triple", null, null]]]
  ],
  osa: [
    ["Danta Corcovado Lodge", [["Doble o sencilla", null, null]]],
    ["Peninsula Curio Collection by Hilton", [["Doble o sencilla", 1210, 292.86], ["Triple", 1247.14, 327.14], ["Cuadruple", 1282.86, 361.43]]]
  ],
  caribe: [
    ["Hotel Cariblue Beach & Jungle Resort", [["Habitacion max 1 pax", 116.86, 88.57], ["Habitacion 3 pax", 121.43], ["Maximo dos habitaciones 4 pax", 144.29]]],
    ["La Kukula", [["Standard Doble", 218.57, 164.29], ["Standard Triple", 221.43, 178.57]]]
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
