import { hotelZones } from "./hotels";
import { getPrivateTransportPriceLabel, privateTransportRoutes } from "./privateTransportRates";
import { rentACarRates } from "./rentacarRates";
import { shuttleRoutes } from "./shuttles";
import { getTourDetailPath, jacoTours, routes, sanJoseTours } from "./site";

function formatUSD(value) {
  if (typeof value !== "number") return "On request";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function normalize(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

const baseStopWords = new Set([
  "a",
  "al",
  "all",
  "and",
  "about",
  "the",
  "to",
  "in",
  "on",
  "for",
  "from",
  "of",
  "or",
  "is",
  "are",
  "show",
  "find",
  "search",
  "see",
  "have",
  "has",
  "need",
  "looking",
  "please",
  "de",
  "del",
  "desde",
  "hasta",
  "para",
  "por",
  "con",
  "sin",
  "y",
  "o",
  "la",
  "el",
  "en",
  "los",
  "las",
  "un",
  "una",
  "que",
  "hay",
  "tiene",
  "tienen",
  "quiero",
  "quisiera",
  "necesito",
  "puedes",
  "podrias",
  "ver",
  "buscar",
  "mostrar",
  "opciones",
  "option",
  "options",
  "precio",
  "cuanto",
  "cuesta",
  "cost",
  "rate",
  "rates",
  "price",
  "precios",
  "information",
  "informacion",
  "service",
  "services",
  "servicio",
  "servicios",
  "available",
  "disponible",
  "disponibles"
]);

const categoryIntentWords = {
  tour: ["tour", "tours", "actividad", "actividades", "excursion", "excursiones", "adventure", "aventura", "trip", "trips", "paseo", "paseos", "day"],
  hotel: ["hotel", "hoteles", "stay", "stays", "lodging", "habitacion", "habitaciones", "room", "rooms", "hospedaje", "hospedajes", "alojamiento", "alojamientos", "resort", "resorts"],
  rent: ["rent", "rental", "rentals", "rentar", "car", "cars", "auto", "autos", "carro", "carros", "alquiler", "alquilar", "vehicle", "vehicles", "vehiculo", "vehiculos"],
  shuttle: ["shuttle", "shuttles", "shared", "compartido", "compartida", "compartidos", "compartidas", "colectivo", "colectiva", "bus", "transport", "transportation", "transporte"],
  private: ["private", "privado", "privada", "privados", "privadas", "transport", "transportation", "transporte", "transfer", "transfers", "traslado", "traslados", "ruta", "route", "routes", "airport", "aeropuerto"],
  all: []
};

const searchTermAliases = {
  playa: ["playa", "beach"],
  playas: ["playas", "beach", "beaches"],
  beach: ["beach", "playa"],
  beaches: ["beaches", "beach", "playa"],
  isla: ["isla", "island"],
  islas: ["islas", "island", "islands"],
  island: ["island", "isla"],
  islands: ["islands", "island", "isla"],
  catarata: ["catarata", "waterfall", "waterfalls"],
  cataratas: ["cataratas", "waterfall", "waterfalls"],
  waterfall: ["waterfall", "waterfalls", "catarata"],
  waterfalls: ["waterfalls", "waterfall", "catarata"],
  naturaleza: ["naturaleza", "nature", "rainforest", "wildlife"],
  nature: ["nature", "naturaleza", "rainforest", "wildlife"],
  bosque: ["bosque", "forest", "rainforest"],
  selva: ["selva", "rainforest", "jungle"],
  rainforest: ["rainforest", "forest", "bosque", "selva"],
  aventura: ["aventura", "adventure", "rafting"],
  adventure: ["adventure", "aventura"],
  rafting: ["rafting", "rapidos"],
  rapidos: ["rapidos", "rafting"],
  monos: ["monos", "monkey", "monkeys"],
  mono: ["mono", "monkey", "monkeys"],
  monkey: ["monkey", "monkeys", "mono"],
  manglar: ["manglar", "mangrove"],
  manglares: ["manglares", "mangrove", "mangroves"],
  mangrove: ["mangrove", "manglar"],
  cafe: ["cafe", "coffee"],
  coffee: ["coffee", "cafe"],
  economico: ["economico", "economy", "economico"],
  economy: ["economy", "economico"],
  compacto: ["compacto", "compact"],
  compact: ["compact", "compacto"],
  lujo: ["lujo", "luxury", "premium"],
  luxury: ["luxury", "lujo", "premium"],
  buseta: ["buseta", "microbus", "hiace"],
  microbus: ["microbus", "buseta", "hiace"],
  manual: ["manual", "man"],
  automatico: ["automatico", "automatic"],
  automatica: ["automatica", "automatic"],
  automatic: ["automatic", "automatico", "automatica"],
  aeropuerto: ["aeropuerto", "airport", "ato"],
  airport: ["airport", "aeropuerto", "ato"]
};

const spanishSignals = [
  "alquiler",
  "alquilar",
  "aeropuerto",
  "alojamiento",
  "automatico",
  "catarata",
  "cataratas",
  "compartido",
  "cuanto",
  "cuesta",
  "de ",
  " en ",
  "hoteles",
  "naturaleza",
  "playa",
  "playas",
  "privado",
  "puedes",
  "quiero",
  "transporte",
  "traslado"
];

const assistantCopy = {
  en: {
    askTitle: "Ask me about the catalog",
    askBody: "You can ask about tours, hotels, rent a car rates, shuttles or private transport routes.",
    hotelFound: "Hotel options found",
    hotelNotFound: "No hotel match found",
    hotelBody: "I found these hotel options:",
    hotelFallback: "Try searching by zone, such as Arenal, Manuel Antonio, Monteverde, San Jose or Guanacaste.",
    rentTitle: "Rent a car rates",
    rentBody: "These are {period} rent-a-car options:",
    rentFallback: "I did not find that vehicle type. Try economy, SUV, 4x4, Hilux, Toyota, Hiace or automatic.",
    shuttleFound: "Shared shuttle routes",
    shuttleNotFound: "No shuttle match found",
    shuttleBody: "These shuttle routes match your question:",
    shuttleFallback: "Try a route or destination like Arenal, Puerto Viejo, Cahuita, Santa Teresa or Montezuma.",
    privateFound: "Private transport routes",
    privateNotFound: "No private route match found",
    privateBody: "These private transport routes match:",
    privateFallback: "Try a destination such as Arenal, Manuel Antonio, Monteverde, Liberia, Jaco, Tamarindo or Puerto Viejo.",
    tourFound: "Tours found",
    tourNotFound: "No tour match found",
    tourBody: "I found these tours:",
    tourFallback: "Try searching for Jaco, San Jose, Manuel Antonio, Tortuga, rafting, beach, nature or La Paz.",
    catalogFound: "Catalog matches",
    catalogMore: "I need a bit more detail",
    catalogBody: "I found this in the travel catalog:",
    catalogFallback: "Ask me about tours, hotels, rent a car, shuttles or private transport routes.",
    rentDescription: (period, basic, full) => `${period} rate with basic insurance ${basic} and full cover ${full}.`
  },
  es: {
    askTitle: "Preguntame sobre el catalogo",
    askBody: "Puedes preguntar por tours, hoteles, rent a car, shuttles o transporte privado.",
    hotelFound: "Hoteles encontrados",
    hotelNotFound: "No encontre hoteles",
    hotelBody: "Encontre estas opciones de hotel:",
    hotelFallback: "Prueba buscar por zona, como Arenal, Manuel Antonio, Monteverde, San Jose o Guanacaste.",
    rentTitle: "Tarifas de rent a car",
    rentBody: "Estas son opciones de rent a car con tarifa {period}:",
    rentFallback: "No encontre ese tipo de vehiculo. Prueba economico, SUV, 4x4, Hilux, Toyota, Hiace o automatico.",
    shuttleFound: "Rutas de shuttle compartido",
    shuttleNotFound: "No encontre shuttle",
    shuttleBody: "Estas rutas de shuttle coinciden con tu pregunta:",
    shuttleFallback: "Prueba una ruta o destino como Arenal, Puerto Viejo, Cahuita, Santa Teresa o Montezuma.",
    privateFound: "Rutas de transporte privado",
    privateNotFound: "No encontre ruta privada",
    privateBody: "Estas rutas de transporte privado coinciden:",
    privateFallback: "Prueba un destino como Arenal, Manuel Antonio, Monteverde, Liberia, Jaco, Tamarindo o Puerto Viejo.",
    tourFound: "Tours encontrados",
    tourNotFound: "No encontre tours",
    tourBody: "Encontre estos tours:",
    tourFallback: "Prueba buscar Jaco, San Jose, Manuel Antonio, Tortuga, rafting, playa, naturaleza o La Paz.",
    catalogFound: "Coincidencias del catalogo",
    catalogMore: "Necesito un poco mas de detalle",
    catalogBody: "Encontre esto en el catalogo:",
    catalogFallback: "Preguntame por tours, hoteles, rent a car, shuttles o transporte privado.",
    rentDescription: (period, basic, full) => `Tarifa ${period} con seguro basico ${basic} y full cover ${full}.`
  }
};

function getSearchTerms(query, category = "all") {
  const intentWords = new Set([...(categoryIntentWords[category] || []), ...(categoryIntentWords.all || [])]);

  return normalize(query)
    .split(/\s+/)
    .map((term) => term.replace(/^[^\w]+|[^\w]+$/g, ""))
    .filter((term) => term && (term.length > 2 || term === "4x4"))
    .filter((term) => !baseStopWords.has(term) && !intentWords.has(term));
}

function getTermOptions(term) {
  return searchTermAliases[term] || [term];
}

function buildFilteredHref(path, params, hash) {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== "")
  );
  const query = new URLSearchParams(filteredParams).toString();
  return `${path}?${query}${hash}`;
}

function includesAny(text, words) {
  return words.some((word) => text.includes(word));
}

function getQuestionLanguage(query) {
  const text = ` ${normalize(query)} `;
  return includesAny(text, spanishSignals) ? "es" : "en";
}
function roomPrice(room) {
  if (typeof room.alta === "number") return room.alta;
  if (typeof room.verde === "number") return room.verde;
  return undefined;
}

function rentPeriodFromQuery(query) {
  const text = normalize(query);
  if (includesAny(text, ["weekly", "semana", "semanal"])) return "semanal";
  if (includesAny(text, ["monthly", "mes", "mensual"])) return "mensual";
  return "diario";
}

function periodLabel(period, language = "en") {
  if (language === "es") {
    if (period === "semanal") return "semanal";
    if (period === "mensual") return "mensual";
    return "diaria";
  }

  if (period === "semanal") return "weekly";
  if (period === "mensual") return "monthly";
  return "daily";
}

const allTours = [
  ...sanJoseTours.map((tour) => ({ ...tour, originLabel: "From San Jose" })),
  ...jacoTours.map((tour) => ({ ...tour, originLabel: "From Jaco" }))
];

export const travelAssistantStats = {
  tours: allTours.length,
  hotelZones: hotelZones.length,
  hotels: hotelZones.reduce((total, zone) => total + zone.hotels.length, 0),
  rentVehicles: rentACarRates.diario.length,
  shuttles: shuttleRoutes.length,
  privateRoutes: privateTransportRoutes.length
};

export const travelAssistantCategories = [
  { id: "all", label: "All / Todo" },
  { id: "tour", label: "Tours" },
  { id: "hotel", label: "Hotels / Hoteles" },
  { id: "rent", label: "Rent a car / Autos" },
  { id: "shuttle", label: "Shuttles / Compartidos" },
  { id: "private", label: "Private / Privado" }
];

export const travelAssistantItems = [
  ...allTours.map((tour) => ({
    type: "tour",
    label: tour.title,
    eyebrow: tour.originLabel,
    description: tour.excerpt,
    price: formatUSD(tour.price),
    meta: [tour.durationText, tour.difficulty, ...tour.locations].filter(Boolean),
    href: getTourDetailPath(tour),
    haystack: `${tour.title} ${tour.originLabel} ${tour.excerpt} ${tour.locations.join(" ")} ${tour.difficulty}`
  })),
  ...hotelZones.flatMap((zone) =>
    zone.hotels.map((hotel) => {
      const lowest = Math.min(
        ...hotel.habitaciones
          .map(roomPrice)
          .filter((value) => typeof value === "number")
      );

      return {
        type: "hotel",
        label: hotel.hotel,
        eyebrow: zone.name,
        description: hotel.description,
        price: Number.isFinite(lowest) ? `From ${formatUSD(lowest)}` : "Rate on request",
        meta: hotel.habitaciones.map((room) => room.tipo),
        href: buildFilteredHref(routes.hotels, { query: hotel.hotel, zone: zone.id, hotel: hotel.hotel }, `#${zone.id}`),
        haystack: `${hotel.hotel} ${zone.name} ${hotel.description} ${hotel.habitaciones.map((room) => room.tipo).join(" ")}`
      };
    })
  ),
  ...rentACarRates.diario.map((vehicle) => ({
    type: "rent",
    label: vehicle.categoria,
    eyebrow: "Rent a car",
    description: vehicle.ejemplo,
    price: `Daily from ${formatUSD(vehicle.seguro_basico)}`,
    meta: [vehicle.transmision || "Ask", "Basic insurance", "Full cover"],
    href: buildFilteredHref(routes.rentACar, { query: `${vehicle.categoria} ${vehicle.ejemplo}`, period: "diario", transmission: vehicle.transmision === "MAN/AUT" ? "" : vehicle.transmision }, "#rates"),
    haystack: `${vehicle.categoria} ${vehicle.ejemplo} ${vehicle.transmision || ""} rent car alquiler auto carro`
  })),
  ...shuttleRoutes.map((route) => ({
    type: "shuttle",
    label: route.service,
    eyebrow: route.region,
    description: route.summary,
    price: formatUSD(route.price),
    meta: [route.schedule, route.departurePeriod, ...route.stops.map((stop) => stop.name)].filter(Boolean),
    href: buildFilteredHref(routes.shuttle, { query: route.service, route: route.id }, "#shuttle-details"),
    haystack: `${route.service} ${route.region} ${route.summary} ${route.stops.map((stop) => stop.name).join(" ")} shuttle shared bus`
  })),
  ...privateTransportRoutes.map((route) => ({
    type: "private",
    label: route.lugar,
    eyebrow: route.base === "JACO" ? "From Jaco" : "From San Jose",
    description: getPrivateTransportPriceLabel(route),
    price: route.base === "JACO" ? formatUSD(route.pax_1_5) : formatUSD(route.pax_1_5),
    meta: [route.base === "JACO" ? "Jaco rate" : "San Jose rate", "Private route"],
    href: buildFilteredHref(routes.privateTransport, { query: route.lugar, base: route.base }, "#private-rates"),
    haystack: `${route.lugar} ${route.base} private transport transporte privado transfer`
  }))
];

export function searchTravelAssistantItems(query, category = "all", limit = 12) {
  const terms = getSearchTerms(query, category);
  const termOptions = terms.map(getTermOptions);

  return travelAssistantItems
    .filter((item) => category === "all" || item.type === category)
    .map((item) => {
      const haystack = normalize(item.haystack);
      const score = termOptions.length
        ? termOptions.reduce((total, options) => total + (options.some((term) => haystack.includes(term)) ? 1 : 0), 0)
        : 1;
      return { ...item, score, normalizedHaystack: haystack };
    })
    .filter(
      (item) =>
        !termOptions.length || termOptions.every((options) => options.some((term) => item.normalizedHaystack.includes(term)))
    )
    .sort((a, b) => b.score - a.score || a.label.localeCompare(b.label))
    .slice(0, limit)
    .map(({ normalizedHaystack, ...item }) => item);
}
function summarizeItems(items) {
  return items
    .slice(0, 4)
    .map((item) => `${item.label} (${item.eyebrow}) - ${item.price}`)
    .join("\n");
}

export function answerTravelQuestion(question) {
  const text = normalize(question);
  const language = getQuestionLanguage(question);
  const copy = assistantCopy[language];

  if (!text.trim()) {
    return {
      title: copy.askTitle,
      body: copy.askBody,
      items: searchTravelAssistantItems("", "all", 6)
    };
  }

  if (includesAny(text, ["hotel", "hoteles", "stay", "lodging", "habitacion", "habitaciones", "hospedaje", "alojamiento", "room", "rooms", "resort"])) {
    const items = searchTravelAssistantItems(question, "hotel", 6);
    return {
      title: items.length ? copy.hotelFound : copy.hotelNotFound,
      body: items.length ? `${copy.hotelBody}\n${summarizeItems(items)}` : copy.hotelFallback,
      items
    };
  }

  if (includesAny(text, ["rent", "rental", "car", "cars", "auto", "autos", "carro", "carros", "alquiler", "alquilar", "vehicle", "vehiculo", "suv", "4x4"])) {
    const period = rentPeriodFromQuery(question);
    const source = rentACarRates[period] || rentACarRates.diario;
    const rentTerms = getSearchTerms(question, "rent");
    const rentTermOptions = rentTerms.map(getTermOptions);
    const matches = rentTermOptions.length
      ? source
          .filter((item) => {
            const haystack = normalize(`${item.categoria} ${item.ejemplo} ${item.transmision || ""}`);
            return rentTermOptions.every((options) => options.some((term) => haystack.includes(term)));
          })
          .slice(0, 5)
      : source.slice(0, 5);

    const periodText = periodLabel(period, language);
    const items = matches.map((vehicle) => ({
      type: "rent",
      label: vehicle.categoria,
      eyebrow: vehicle.ejemplo,
      description: copy.rentDescription(periodText, formatUSD(vehicle.seguro_basico), formatUSD(vehicle.full_cover)),
      price: formatUSD(vehicle.seguro_basico),
      meta: [vehicle.transmision || "Ask", periodText],
      href: buildFilteredHref(routes.rentACar, { query: `${vehicle.categoria} ${vehicle.ejemplo}`, period, transmission: vehicle.transmision === "MAN/AUT" ? "" : vehicle.transmision }, "#rates")
    }));

    return {
      title: copy.rentTitle,
      body: items.length ? `${copy.rentBody.replace("{period}", periodText)}\n${summarizeItems(items)}` : copy.rentFallback,
      items
    };
  }

  if (includesAny(text, ["shuttle", "shuttles", "shared", "compartido", "compartida", "colectivo"])) {
    const items = searchTravelAssistantItems(question, "shuttle", 6);
    return {
      title: items.length ? copy.shuttleFound : copy.shuttleNotFound,
      body: items.length ? `${copy.shuttleBody}\n${summarizeItems(items)}` : copy.shuttleFallback,
      items
    };
  }

  if (includesAny(text, ["private", "privado", "privada", "transport", "transportation", "transporte", "transfer", "traslado", "ruta", "route", "airport", "aeropuerto"])) {
    const items = searchTravelAssistantItems(question, "private", 6);
    return {
      title: items.length ? copy.privateFound : copy.privateNotFound,
      body: items.length ? `${copy.privateBody}\n${summarizeItems(items)}` : copy.privateFallback,
      items
    };
  }

  if (includesAny(text, ["tour", "tours", "actividad", "actividades", "excursion", "excursiones", "jaco", "san jose", "manuel antonio", "tortuga", "rafting", "playa", "beach", "isla", "island", "naturaleza", "nature", "catarata", "waterfall", "monkey", "mono", "mangrove", "manglar"])) {
    const items = searchTravelAssistantItems(question, "tour", 6);
    return {
      title: items.length ? copy.tourFound : copy.tourNotFound,
      body: items.length ? `${copy.tourBody}\n${summarizeItems(items)}` : copy.tourFallback,
      items
    };
  }

  const items = searchTravelAssistantItems(question, "all", 8);
  return {
    title: items.length ? copy.catalogFound : copy.catalogMore,
    body: items.length ? `${copy.catalogBody}\n${summarizeItems(items)}` : copy.catalogFallback,
    items
  };
}