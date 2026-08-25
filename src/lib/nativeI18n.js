import i18next from "i18next";
import { supplementalTranslations } from "./i18nSupplement.js";
import { tourTranslations } from "./i18nTours.js";
import { fixTranslations } from "./i18nFixes.js";
import { tourOverviewFrTranslations } from "./i18nTourOverviewFr.js";
import { completeTranslations } from "./i18nComplete.js";

const exactTranslations = {
  en: {},
  es: {
    "Home": "Inicio", "Services": "Servicios", "Safety": "Seguridad", "Contact": "Contacto", "Back to top": "Volver arriba", "Menu": "Menu",
    "Shuttle": "Shuttle", "Private Transport": "Transporte privado", "Tours": "Tours", "Hotels": "Hoteles", "Rent a Car": "Alquiler de autos",
    "Costa Rica travel services": "Servicios de viaje en Costa Rica", "Discover the best of our country": "Descubre lo mejor de nuestro pais",
    "Tours, hotels, shuttles, transfers and more - build your itinerary in minutes.": "Tours, hoteles, shuttles, traslados y mas: arma tu itinerario en minutos.",
    "Explore services": "Explorar servicios", "Get a quote": "Pedir cotizacion", "Plan my route": "Planear mi ruta",
    "Experience Costa Rica your way": "Vivi Costa Rica a tu manera", "Travel support beyond day tours": "Apoyo de viaje mas alla de los tours de un dia",
    "Our travel services": "Nuestros servicios de viaje", "Transport in Costa Rica": "Transporte en Costa Rica", "Rent a Car in Costa Rica": "Alquiler de autos en Costa Rica",
    "Private transportation": "Transporte privado", "Shared shuttles": "Shuttles compartidos", "Rent a car": "Alquiler de autos", "Vacation packages": "Paquetes vacacionales",
    "Hotels and stays": "Hoteles y estadias", "Day tours": "Tours de un dia", "View private transport": "Ver transporte privado", "View shuttle service": "Ver servicio de shuttle",
    "View rent a car options": "Ver opciones de alquiler", "View hotel options": "Ver opciones de hotel", "See shuttle details": "Ver detalles del shuttle", "See private transport": "Ver transporte privado",
    "Independent travel support": "Apoyo para viajar independiente", "Rent a car with local guidance for your Costa Rica route": "Alquila un auto con guia local para tu ruta por Costa Rica",
    "See vehicle categories": "Ver categorias de vehiculos", "Compare rates": "Comparar tarifas", "Request a quote": "Pedir cotizacion", "Best for": "Ideal para", "Helpful add-ons": "Extras utiles",
    "Vehicle categories": "Categorias de vehiculos", "Economy": "Economico", "Compact and efficient": "Compacto y eficiente", "SUV": "SUV", "Extra comfort and luggage space": "Mas comodidad y espacio para equipaje",
    "4x4": "4x4", "More confidence for remote routes": "Mas confianza para rutas remotas", "Van": "Van", "Groups and shared itineraries": "Grupos e itinerarios compartidos",
    "What we help you coordinate": "Lo que te ayudamos a coordinar", "Before requesting your quote": "Antes de solicitar tu cotizacion", "Request your rent a car quote": "Solicita tu cotizacion de alquiler",
    "Shared shuttle service": "Servicio de shuttle compartido", "Comfortable shared routes between Costa Rica's main destinations": "Rutas compartidas comodas entre los principales destinos de Costa Rica",
    "Request shuttle": "Solicitar shuttle", "Main advantage": "Ventaja principal", "Why choose shuttle": "Por que elegir shuttle", "Need more flexibility?": "Necesitas mas flexibilidad?",
    "Compare with private transport": "Comparar con transporte privado", "Lower transport cost": "Menor costo de transporte", "Common destinations": "Destinos comunes", "Good for light planning": "Bueno para planificacion ligera",
    "Easy to combine": "Facil de combinar", "Request a shuttle quote": "Solicitar cotizacion de shuttle",
    "Direct transport for families, groups and custom itineraries": "Transporte directo para familias, grupos e itinerarios personalizados", "View routes": "Ver rutas", "Request private transport": "Solicitar transporte privado",
    "Families and groups": "Familias y grupos", "Rates": "Tarifas", "Based on route and passengers": "Segun ruta y pasajeros", "Private transport routes": "Rutas de transporte privado",
    "Search": "Buscar", "From": "Desde", "All": "Todos", "Destination map": "Mapa de destinos", "How it works": "Como funciona", "Need a lower-cost option?": "Necesitas una opcion mas economica?",
    "Compare with shuttle": "Comparar con shuttle", "Private transport details": "Detalles del transporte privado", "Passengers": "Pasajeros", "Pickup hotel": "Hotel de recogida", "Departure date": "Fecha de salida",
    "Route": "Ruta", "Estimated total": "Total estimado", "Add to cart": "Agregar al carrito", "Cancel": "Cancelar", "Send request": "Enviar solicitud",
    "Tours in Costa Rica": "Tours en Costa Rica", "View details": "Ver detalles", "Duration": "Duracion", "Price": "Precio", "Easy": "Facil", "Medium": "Medio", "Hard": "Dificil",
    "Featured": "Destacados", "Price (low to high)": "Precio (menor a mayor)", "Price (high to low)": "Precio (mayor a menor)", "Duration (short to long)": "Duracion (corta a larga)",
    "No tour results": "No hay tours", "Hotels in Costa Rica": "Hoteles en Costa Rica", "Hotel zones": "Zonas hoteleras", "All zones": "Todas las zonas", "No hotels found": "No se encontraron hoteles",
    "Room": "Habitacion", "Nights": "Noches", "Ready when you are": "Listos cuando vos estes", "Name": "Nombre", "Message": "Mensaje", "Your name": "Tu nombre", "Selected items": "Servicios seleccionados",
    "Clear": "Limpiar", "Sending...": "Enviando...", "Send": "Enviar", "Cart": "Carrito", "Trip cart": "Carrito de viaje", "Request all": "Solicitar todo", "Clear cart": "Vaciar carrito",
    "Service request": "Solicitud de servicios", "Full name": "Nombre completo", "Phone number": "Telefono", "Selected services": "Servicios seleccionados", "Edit item": "Editar item",
    "Base price": "Precio base", "Coverage": "Cobertura", "Basic insurance": "Seguro basico", "Full cover": "Cobertura completa", "Rent a car rates": "Tarifas de alquiler de autos",
    "Request selected option": "Solicitar opcion seleccionada", "Showing": "Mostrando", "Lowest from": "Desde", "Category": "Categoria", "Transmission": "Transmision", "No vehicle results": "No hay vehiculos",
    "Available shuttle routes": "Rutas de shuttle disponibles", "Schedule": "Horario", "Stops": "Paradas", "Selected shuttle": "Shuttle seleccionado", "Shared service price": "Precio de servicio compartido",
    "Departure window": "Ventana de salida", "Shuttle path map": "Mapa de ruta del shuttle", "No shuttle results": "No hay resultados de shuttle", "Tour details": "Detalles del tour",
    "Overview": "Resumen", "Cost": "Costo", "Included": "Incluido", "Recommendations": "Recomendaciones", "Trip Highlights": "Puntos destacados", "What to expect": "Que esperar",
    "Show Prices": "Ver precios", "/ Adult": "/ Adulto", "Departure": "Salida", "Next departures": "Proximas salidas", "View all tours": "Ver todos los tours", "View trip": "Ver viaje", "Close": "Cerrar"
  },
  fr: {
    "Home": "Accueil", "Services": "Services", "Safety": "Securite", "Contact": "Contact", "Back to top": "Retour en haut", "Menu": "Menu",
    "Shuttle": "Navette", "Private Transport": "Transport prive", "Tours": "Excursions", "Hotels": "Hotels", "Rent a Car": "Location de voiture",
    "Costa Rica travel services": "Services de voyage au Costa Rica", "Discover the best of our country": "Decouvrez le meilleur de notre pays",
    "Tours, hotels, shuttles, transfers and more - build your itinerary in minutes.": "Excursions, hotels, navettes, transferts et plus encore: creez votre itineraire en quelques minutes.",
    "Explore services": "Explorer les services", "Get a quote": "Demander un devis", "Plan my route": "Planifier mon itineraire",
    "Experience Costa Rica your way": "Vivez le Costa Rica a votre facon", "Travel support beyond day tours": "Assistance voyage au-dela des excursions d'une journee",
    "Our travel services": "Nos services de voyage", "Transport in Costa Rica": "Transport au Costa Rica", "Rent a Car in Costa Rica": "Location de voiture au Costa Rica",
    "Private transportation": "Transport prive", "Shared shuttles": "Navettes partagees", "Rent a car": "Location de voiture", "Vacation packages": "Forfaits vacances", "Hotels and stays": "Hotels et sejours", "Day tours": "Excursions d'une journee",
    "View private transport": "Voir transport prive", "View shuttle service": "Voir service de navette", "View rent a car options": "Voir options de location", "View hotel options": "Voir options d'hotel",
    "See shuttle details": "Voir les details de la navette", "See private transport": "Voir le transport prive", "Request a quote": "Demander un devis", "Best for": "Ideal pour", "Helpful add-ons": "Options utiles",
    "Vehicle categories": "Categories de vehicules", "Economy": "Economique", "Compact and efficient": "Compacte et efficace", "SUV": "SUV", "Extra comfort and luggage space": "Plus de confort et d'espace bagages",
    "More confidence for remote routes": "Plus de confiance pour routes reculees", "Van": "Van", "What we help you coordinate": "Ce que nous vous aidons a coordonner", "Before requesting your quote": "Avant de demander votre devis",
    "Shared shuttle service": "Service de navette partagee", "Request shuttle": "Demander une navette", "Main advantage": "Avantage principal", "Why choose shuttle": "Pourquoi choisir la navette", "Need more flexibility?": "Besoin de plus de flexibilite?",
    "Compare with private transport": "Comparer avec le transport prive", "Request a shuttle quote": "Demander un devis de navette", "View routes": "Voir les routes", "Request private transport": "Demander un transport prive",
    "Families and groups": "Familles et groupes", "Rates": "Tarifs", "Private transport routes": "Routes de transport prive", "Search": "Rechercher", "From": "Depuis", "All": "Tous", "Destination map": "Carte des destinations",
    "How it works": "Comment ca marche", "Compare with shuttle": "Comparer avec la navette", "Private transport details": "Details du transport prive", "Passengers": "Passagers", "Pickup hotel": "Hotel de prise en charge",
    "Departure date": "Date de depart", "Route": "Route", "Estimated total": "Total estime", "Add to cart": "Ajouter au panier", "Cancel": "Annuler", "Send request": "Envoyer la demande",
    "Tours in Costa Rica": "Excursions au Costa Rica", "View details": "Voir details", "Duration": "Duree", "Price": "Prix", "Easy": "Facile", "Medium": "Moyen", "Hard": "Difficile", "Featured": "En vedette",
    "Hotels in Costa Rica": "Hotels au Costa Rica", "Hotel zones": "Zones hotelieres", "All zones": "Toutes les zones", "Room": "Chambre", "Nights": "Nuits", "Ready when you are": "Prets quand vous l'etes",
    "Name": "Nom", "Message": "Message", "Your name": "Votre nom", "Selected items": "Elements selectionnes", "Clear": "Effacer", "Sending...": "Envoi...", "Send": "Envoyer", "Cart": "Panier",
    "Trip cart": "Panier de voyage", "Request all": "Tout demander", "Clear cart": "Vider le panier", "Service request": "Demande de service", "Full name": "Nom complet", "Phone number": "Telephone",
    "Coverage": "Couverture", "Basic insurance": "Assurance de base", "Full cover": "Couverture complete", "Rent a car rates": "Tarifs location de voiture", "Showing": "Affichage", "Category": "Categorie", "Transmission": "Transmission",
    "Available shuttle routes": "Routes de navette disponibles", "Schedule": "Horaire", "Stops": "Arrets", "Tour details": "Details de l'excursion", "Overview": "Apercu", "Cost": "Cout", "Included": "Inclus",
    "Recommendations": "Recommandations", "What to expect": "A quoi s'attendre", "Show Prices": "Voir les prix", "/ Adult": "/ Adulte", "Departure": "Depart", "Close": "Fermer"
  }
};


Object.assign(exactTranslations.en, completeTranslations.en);
Object.assign(exactTranslations.es, supplementalTranslations.es, tourTranslations.es, fixTranslations.es, completeTranslations.es);
Object.assign(exactTranslations.fr, supplementalTranslations.fr, tourTranslations.fr, fixTranslations.fr, tourOverviewFrTranslations, completeTranslations.fr);

i18next.init({
  lng: "en",
  fallbackLng: false,
  resources: {
    en: { translation: exactTranslations.en },
    es: { translation: exactTranslations.es },
    fr: { translation: exactTranslations.fr }
  },
  interpolation: { escapeValue: false }
});
const titles = {
  en: { home: "Alsama Tours | Travel Services in Costa Rica", shuttle: "Shuttle Service | Alsama Tours", privateTransport: "Private Transport | Alsama Tours", rentACar: "Rent a Car | Alsama Tours", tours: "Tours | Alsama Tours", tourDetail: "Tour Detail | Alsama Tours", hotels: "Hotels | Alsama Tours" },
  es: { home: "Alsama Tours | Servicios de viaje en Costa Rica", shuttle: "Servicio de shuttle | Alsama Tours", privateTransport: "Transporte privado | Alsama Tours", rentACar: "Alquiler de autos | Alsama Tours", tours: "Tours | Alsama Tours", tourDetail: "Detalle del tour | Alsama Tours", hotels: "Hoteles | Alsama Tours" },
  fr: { home: "Alsama Tours | Services de voyage au Costa Rica", shuttle: "Service de navette | Alsama Tours", privateTransport: "Transport prive | Alsama Tours", rentACar: "Location de voiture | Alsama Tours", tours: "Excursions | Alsama Tours", tourDetail: "Detail de l'excursion | Alsama Tours", hotels: "Hotels | Alsama Tours" }
};

function clean(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

const routeTermTranslations = {
  en: [
    [" y ", " and "], ["Volc\u00e1n", "Volcano"], ["Cataratas", "Waterfalls"], ["Tour de", "Tour of"], ["Muelle", "dock"], ["Pta Uva", "Punta Uva"],
    ["ONE DAY", "Full day"], ["ONE Day", "Full day"], ["all day", "all day"], ["maximo", "maximum"], ["Maximo", "Maximum"],
    ["max", "maximum"], ["Max", "Maximum"], ["hrs de espera", "hours waiting"], ["hrs espera", "hours waiting"], ["espera", "waiting"],
    ["1 via", "one way"], ["por ferry", "by ferry"], ["Carretera", "by road"], ["Tierra", "land route"],
    ["Transfer IN", "Inbound transfer"], ["Transfer OUT", "Outbound transfer"], ["Transfer In", "Inbound transfer"], ["Transfer Out", "Outbound transfer"],
    ["Volcan ", "Volcano "], ["Volcan,", "Volcano,"], ["Basilica y Ruinas", "Basilica and Ruins"], ["Ruinas de Cartago & Basilica", "Cartago Ruins and Basilica"],
    ["Cenas en", "Dinner in"], ["cena", "dinner"], ["desde", "from"], ["ROUNDTRIP", "round trip"]
  ],
  es: [
    ["Pta Uva", "Punta Uva"], ["Transfer IN", "Traslado de entrada"], ["Transfer OUT", "Traslado de salida"],
    ["ONE DAY", "Dia completo"], ["ONE Day", "Dia completo"], ["all day", "dia completo"], ["Rain Forest", "Bosque lluvioso"],
    ["Coffee Tour", "Tour de cafe"], ["coffee tour", "tour de cafe"], ["Transfer IN", "Traslado de entrada"], ["Transfer OUT", "Traslado de salida"],
    ["Transfer In", "Traslado de entrada"], ["Transfer Out", "Traslado de salida"], ["ROUNDTRIP", "ida y vuelta"], ["1 via", "una via"],
    ["maximo", "maximo"], ["Maximo", "Maximo"], ["max", "max."], ["Max", "Max."], ["hrs espera", "horas de espera"],
    ["hrs de espera", "horas de espera"], ["Volcan", "Volcan"], ["Poas", "Poas"], ["Irazu", "Irazu"], ["Jaco", "Jaco"], ["San Jose", "San Jose"]
  ],
  fr: [
    [" y ", " et "], ["Volcan", "volcan"], ["Volc\u00e1n", "volcan"], ["Iraz\u00fa", "Irazu"], ["Cataratas", "cascades"], ["Tour de", "Excursion de"], ["Tour", "Excursion"], ["tour", "excursion"], ["Muelle", "embarcadere"], ["Pta Uva", "Punta Uva"],
    ["ONE DAY", "Journee complete"], ["ONE Day", "Journee complete"], ["all day", "journee complete"], ["Rain Forest", "Foret tropicale"],
    ["Coffee Tour", "Excursion cafe"], ["coffee tour", "excursion cafe"], ["Transfer IN", "Transfert aller"], ["Transfer OUT", "Transfert retour"],
    ["Transfer In", "Transfert aller"], ["Transfer Out", "Transfert retour"], ["ROUNDTRIP", "aller-retour"], ["1 via", "aller simple"],
    ["por ferry", "par ferry"], ["Carretera", "par la route"], ["Tierra", "par voie terrestre"], ["maximo", "maximum"],
    ["Maximo", "Maximum"], ["max", "max."], ["Max", "Max."], ["hrs de espera", "h d'attente"], ["hrs espera", "h d'attente"],
    ["espera", "attente"], ["Basilica y Ruinas", "basilique et ruines"], ["Ruinas de Cartago & Basilica", "ruines de Cartago et basilique"],
    ["Cenas en", "Diner a"], ["cena", "diner"], ["desde", "depuis"]
  ]
};

function replaceAllLiteral(value, search, replacement) {
  return value.split(search).join(replacement);
}

function translateRouteTerms(text, language) {
  const replacements = routeTermTranslations[language] || [];
  return replacements.reduce((current, pair) => replaceAllLiteral(current, pair[0], pair[1]), text);
}

function translateDynamicText(text, language) {
  const showingOf = text.match(/^Showing (\d+) of (\d+) tours$/);
  if (showingOf) {
    if (language === "es") return "Mostrando " + showingOf[1] + " de " + showingOf[2] + " tours";
    if (language === "fr") return "Affichage de " + showingOf[1] + " sur " + showingOf[2] + " excursions";
  }

  const priceJaco = text.match(/^\$(\d+(?:\.\d+)?) \/ 1-5 passengers \+ \$(\d+(?:\.\d+)?) extra passenger$/);
  if (priceJaco) {
    if (language === "es") return "$" + priceJaco[1] + " / 1-5 pasajeros + $" + priceJaco[2] + " pasajero adicional";
    if (language === "fr") return "$" + priceJaco[1] + " / 1-5 passagers + $" + priceJaco[2] + " passager supplementaire";
  }

  const priceRange = text.match(/^(.+) \/ 1-5 passengers .+? (.+) \/ 6\+ passengers$/);
  if (priceRange) {
    if (language === "es") return priceRange[1] + " / 1-5 pasajeros - " + priceRange[2] + " / 6+ pasajeros";
    if (language === "fr") return priceRange[1] + " / 1-5 passagers - " + priceRange[2] + " / 6+ passagers";
  }

  const calculation = text.match(/^Calculation uses the listed tour price per person for (\d+) adult(s?) and (\d+) child(?:ren)?\.$/);
  if (calculation) {
    if (language === "es") return "El calculo usa el precio publicado del tour por persona para " + calculation[1] + " adulto" + (calculation[1] === "1" ? "" : "s") + " y " + calculation[3] + " nino" + (calculation[3] === "1" ? "" : "s") + ".";
    if (language === "fr") return "Le calcul utilise le prix publie de l'excursion par personne pour " + calculation[1] + " adulte" + (calculation[1] === "1" ? "" : "s") + " et " + calculation[3] + " enfant" + (calculation[3] === "1" ? "" : "s") + ".";
  }

  const totalUses = text.match(/^Total uses the selected (.+) rate and rounds the rental duration up to the next billing unit\.(?: Minimum duration: (\d+) days\.)?$/);
  if (totalUses) {
    const period = translateText(totalUses[1], language).toLowerCase();
    if (language === "es") return "El total usa la tarifa " + period + " seleccionada y redondea la duracion del alquiler a la siguiente unidad de cobro." + (totalUses[2] ? " Duracion minima: " + totalUses[2] + " dias." : "");
    if (language === "fr") return "Le total utilise le tarif " + period + " selectionne et arrondit la duree de location a l'unite de facturation suivante." + (totalUses[2] ? " Duree minimale : " + totalUses[2] + " jours." : "");
  }

  const stopOnRoute = text.match(/^Stop (\d+) on the (.+) route\.$/);
  if (stopOnRoute) {
    if (language === "es") return "Parada " + stopOnRoute[1] + " en la ruta " + stopOnRoute[2] + ".";
    if (language === "fr") return "Arret " + stopOnRoute[1] + " sur la route " + stopOnRoute[2] + ".";
  }

  const viewImage = text.match(/^View (.+) image$/);
  if (viewImage) {
    if (language === "es") return "Ver imagen de " + translateText(viewImage[1], language);
    if (language === "fr") return "Voir l'image de " + translateText(viewImage[1], language);
  }

  const openImage = text.match(/^Open (.+) image (\d+)$/);
  if (openImage) {
    if (language === "es") return "Abrir imagen " + openImage[2] + " de " + translateText(openImage[1], language);
    if (language === "fr") return "Ouvrir l'image " + openImage[2] + " de " + translateText(openImage[1], language);
  }

  const actionTitle = text.match(/^(Edit|Remove|Show) (.+)$/);
  if (actionTitle) {
    const verbs = { Edit: { es: "Editar", fr: "Modifier" }, Remove: { es: "Eliminar", fr: "Supprimer" }, Show: { es: "Mostrar", fr: "Afficher" } };
    if (language === "es" || language === "fr") return verbs[actionTitle[1]][language] + " " + translateText(actionTitle[2], language);
  }

  const defaultTour = text.match(/^(.+) is prepared as a consistent Alsama Tours experience with pickup planning, clear pricing and flexible support\.$/);
  if (defaultTour) {
    if (language === "es") return translateText(defaultTour[1], language) + " se prepara como una experiencia consistente de Alsama Tours con planificacion de recogida, precios claros y apoyo flexible.";
    if (language === "fr") return translateText(defaultTour[1], language) + " est preparee comme une experience Alsama Tours coherente, avec planification de la prise en charge, prix clairs et assistance flexible.";
  }

  const availableTour = text.match(/^(.+) available through Alsama Tours with booking support, pickup planning and clear per-person pricing\.$/);
  if (availableTour) {
    if (language === "es") return translateText(availableTour[1], language) + " disponible con Alsama Tours, con apoyo de reserva, planificacion de recogida y precio claro por persona.";
    if (language === "fr") return translateText(availableTour[1], language) + " disponible avec Alsama Tours, avec assistance de reservation, planification de prise en charge et prix clair par personne.";
  }

  const rentalCategory = text.match(/^(.+) rental category with (.+)\.$/);
  if (rentalCategory) {
    if (language === "es") return "Categoria de alquiler " + translateText(rentalCategory[1], language) + " con " + translateText(rentalCategory[2], language).toLowerCase() + ".";
    if (language === "fr") return "Categorie de location " + translateText(rentalCategory[1], language) + " avec " + translateText(rentalCategory[2], language).toLowerCase() + ".";
  }

  return null;
}


export function translateText(value, language) {
  const text = clean(value);
  if (!text) return text;

  const found = i18next.t(text, { lng: language, defaultValue: "" });
  if (found) return found;

  const maps = exactTranslations[language] || {};
  const dynamic = translateDynamicText(text, language);
  if (dynamic) return dynamic;

  const showing = text.match(/^Showing (\d+) (.+)$/);
  if (showing) return (maps.Showing || "Showing") + " " + showing[1] + " " + translateText(showing[2], language);

  const genericHotel = text.match(/^(.+) hotel option in (.+) with listed room rates for trip planning\.$/);
  if (genericHotel) {
    if (language === "es") return genericHotel[1] + " es una opcion de hotel en " + genericHotel[2] + " con tarifas de habitacion listadas para planificar el viaje.";
    if (language === "fr") return genericHotel[1] + " est une option d'hotel a " + genericHotel[2] + " avec des tarifs de chambre indiques pour planifier le voyage.";
  }

  const selected = text.match(/^Selected items \((\d+)\)$/);
  if (selected) {
    if (language === "es") return "Servicios seleccionados (" + selected[1] + ")";
    if (language === "fr") return "Elements selectionnes (" + selected[1] + ")";
  }

  const passengers = text.match(/^(\d+) passenger(s?)$/);
  if (passengers) {
    if (language === "es") return passengers[1] + " pasajero" + (passengers[1] === "1" ? "" : "s");
    if (language === "fr") return passengers[1] + " passager" + (passengers[1] === "1" ? "" : "s");
  }

  const adults = text.match(/^(\d+) adult(s?)$/);
  if (adults) {
    if (language === "es") return adults[1] + " adulto" + (adults[1] === "1" ? "" : "s");
    if (language === "fr") return adults[1] + " adulte" + (adults[1] === "1" ? "" : "s");
  }

  const children = text.match(/^(\d+) child(?:ren)?$/);
  if (children) {
    if (language === "es") return children[1] + " nino" + (children[1] === "1" ? "" : "s");
    if (language === "fr") return children[1] + " enfant" + (children[1] === "1" ? "" : "s");
  }

  const days = text.match(/^(\d+) day(s?)$/);
  if (days) {
    if (language === "es") return days[1] + " dia" + (days[1] === "1" ? "" : "s");
    if (language === "fr") return days[1] + " jour" + (days[1] === "1" ? "" : "s");
  }

  const nights = text.match(/^(\d+) night(s?)$/);
  if (nights) {
    if (language === "es") return nights[1] + " noche" + (nights[1] === "1" ? "" : "s");
    if (language === "fr") return nights[1] + " nuit" + (nights[1] === "1" ? "" : "s");
  }

  const stops = text.match(/^(\d+) stop(s?)$/);
  if (stops) {
    if (language === "es") return stops[1] + " parada" + (stops[1] === "1" ? "" : "s");
    if (language === "fr") return stops[1] + " arret" + (stops[1] === "1" ? "" : "s");
  }

  const hotels = text.match(/^(\d+) hotel(s?)$/);
  if (hotels) return hotels[1] + " " + translateText(hotels[1] === "1" ? "hotel" : "hotels", language);

  const options = text.match(/^(\d+) options$/);
  if (options) return options[1] + " " + translateText("options", language);

  const selectedItems = text.match(/^(\d+) selected item(s?)$/);
  if (selectedItems) {
    if (language === "es") return selectedItems[1] + " servicio" + (selectedItems[1] === "1" ? "" : "s") + " seleccionado" + (selectedItems[1] === "1" ? "" : "s");
    if (language === "fr") return selectedItems[1] + " element" + (selectedItems[1] === "1" ? "" : "s") + " selectionne" + (selectedItems[1] === "1" ? "" : "s");
  }

  const units = text.match(/^(\d+) (.+) unit(s?)$/);
  if (units) {
    if (language === "es") return units[1] + " unidad" + (units[1] === "1" ? "" : "es") + " " + translateText(units[2], language).toLowerCase();
    if (language === "fr") return units[1] + " unite" + (units[1] === "1" ? "" : "s") + " " + translateText(units[2], language).toLowerCase();
  }

  if (text.startsWith("From ")) return (maps.From || "From") + " " + text.slice(5);
  if (text.startsWith("To ")) {
    if (language === "es") return "Hasta " + text.slice(3);
    if (language === "fr") return "Jusqu'au " + text.slice(3);
  }
  if (text.startsWith("Departure ")) return (maps.Departure || "Departure") + " " + text.slice(10);
  if (text.startsWith("Check-in ")) {
    if (language === "es") return "Entrada " + text.slice(9);
    if (language === "fr") return "Arrivee " + text.slice(9);
  }
  if (text.startsWith("Check-out ")) {
    if (language === "es") return "Salida " + text.slice(10);
    if (language === "fr") return "Depart " + text.slice(10);
  }

  return translateRouteTerms(text, language);
}

export function getPageTitle(key, language) {
  return titles[language]?.[key] || titles.en[key];
}

export function setI18nLanguage(language) {
  if (i18next.language !== language) i18next.changeLanguage(language);
}


