import i18next from "i18next";
import { supplementalTranslations } from "./i18nSupplement.js";
import { tourTranslations } from "./i18nTours.js";
import { fixTranslations } from "./i18nFixes.js";
import { tourOverviewFrTranslations } from "./i18nTourOverviewFr.js";

const exactTranslations = {
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


Object.assign(exactTranslations.es, supplementalTranslations.es, tourTranslations.es, fixTranslations.es);
Object.assign(exactTranslations.fr, supplementalTranslations.fr, tourTranslations.fr, fixTranslations.fr, tourOverviewFrTranslations);

i18next.init({
  lng: "en",
  fallbackLng: "en",
  resources: {
    en: { translation: {} },
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

export function translateText(value, language) {
  const text = clean(value);
  if (!text || language === "en") return text;
  const found = i18next.t(text, { lng: language, defaultValue: "" });
  if (found) return found;
  const maps = exactTranslations[language] || {};
  const showing = text.match(/^Showing (\d+) (.+)$/);
  if (showing) return `${maps.Showing || "Showing"} ${showing[1]} ${translateText(showing[2], language)}`;
  const genericHotel = text.match(/^(.+) hotel option in (.+) with listed room rates for trip planning\.$/);
  if (genericHotel) {
    return language === "es"
      ? `${genericHotel[1]} es una opcion de hotel en ${genericHotel[2]} con tarifas de habitacion listadas para planificar el viaje.`
      : `${genericHotel[1]} est une option d'hotel a ${genericHotel[2]} avec des tarifs de chambre indiques pour planifier le voyage.`;
  }
  const selected = text.match(/^Selected items \((\d+)\)$/);
  if (selected) return language === "es" ? `Servicios seleccionados (${selected[1]})` : `Elements selectionnes (${selected[1]})`;
  const passengers = text.match(/^(\d+) passenger(s?)$/);
  if (passengers) return language === "es" ? `${passengers[1]} pasajero${passengers[1] === "1" ? "" : "s"}` : `${passengers[1]} passager${passengers[1] === "1" ? "" : "s"}`;
  const adults = text.match(/^(\d+) adult(s?)$/);
  if (adults) return language === "es" ? `${adults[1]} adulto${adults[1] === "1" ? "" : "s"}` : `${adults[1]} adulte${adults[1] === "1" ? "" : "s"}`;
  const children = text.match(/^(\d+) child(?:ren)?$/);
  if (children) return language === "es" ? `${children[1]} nino${children[1] === "1" ? "" : "s"}` : `${children[1]} enfant${children[1] === "1" ? "" : "s"}`;
  const days = text.match(/^(\d+) day(s?)$/);
  if (days) return language === "es" ? `${days[1]} dia${days[1] === "1" ? "" : "s"}` : `${days[1]} jour${days[1] === "1" ? "" : "s"}`;
  const nights = text.match(/^(\d+) night(s?)$/);
  if (nights) return language === "es" ? `${nights[1]} noche${nights[1] === "1" ? "" : "s"}` : `${nights[1]} nuit${nights[1] === "1" ? "" : "s"}`;
  const stops = text.match(/^(\d+) stop(s?)$/);
  if (stops) return language === "es" ? `${stops[1]} parada${stops[1] === "1" ? "" : "s"}` : `${stops[1]} arret${stops[1] === "1" ? "" : "s"}`;
  const hotels = text.match(/^(\d+) hotel(s?)$/);
  if (hotels) return `${hotels[1]} ${translateText(hotels[1] === "1" ? "hotel" : "hotels", language)}`;
  const options = text.match(/^(\d+) options$/);
  if (options) return `${options[1]} ${translateText("options", language)}`;
  const selectedItems = text.match(/^(\d+) selected item(s?)$/);
  if (selectedItems) return language === "es" ? `${selectedItems[1]} servicio${selectedItems[1] === "1" ? "" : "s"} seleccionado${selectedItems[1] === "1" ? "" : "s"}` : `${selectedItems[1]} element${selectedItems[1] === "1" ? "" : "s"} selectionne${selectedItems[1] === "1" ? "" : "s"}`;
  const units = text.match(/^(\d+) (.+) unit(s?)$/);
  if (units) return language === "es" ? `${units[1]} unidad${units[1] === "1" ? "" : "es"} ${translateText(units[2], language).toLowerCase()}` : `${units[1]} unite${units[1] === "1" ? "" : "s"} ${translateText(units[2], language).toLowerCase()}`;
  if (text.startsWith("From ")) return `${maps.From || "From"} ${text.slice(5)}`;
  if (text.startsWith("To ")) return language === "es" ? `Hasta ${text.slice(3)}` : `Jusqu'au ${text.slice(3)}`;
  if (text.startsWith("Departure ")) return `${maps.Departure || "Departure"} ${text.slice(10)}`;
  if (text.startsWith("Check-in ")) return language === "es" ? `Entrada ${text.slice(9)}` : `Arrivee ${text.slice(9)}`;
  if (text.startsWith("Check-out ")) return language === "es" ? `Salida ${text.slice(10)}` : `Depart ${text.slice(10)}`;
  return text;
}

export function getPageTitle(key, language) {
  return titles[language]?.[key] || titles.en[key];
}

export function setI18nLanguage(language) {
  if (i18next.language !== language) i18next.changeLanguage(language);
}


