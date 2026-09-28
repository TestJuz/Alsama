const copy = {
  en: {
    destination: (name) => `${name} destination and travel route in Costa Rica`,
    tour: (title) => `${title} tour experience in Costa Rica`,
    tourFrom: (title, place) => `${title} tour from ${place}, Costa Rica`,
    gallery: (title, index) => `Photo ${index} showing ${title}`,
    tourGallery: (title, index) => `Photo ${index} of the ${title} tour in Costa Rica`,
    hotel: (hotel, zone) => `${hotel} accommodation in ${zone}, Costa Rica`,
    vehicle: (title, model) => `${model} ${title.toLowerCase()} rental vehicle in Costa Rica`,
    promo: (title, tagline) => `${title}: ${tagline}`
  },
  es: {
    destination: (name) => `Destino ${name} y ruta de viaje en Costa Rica`,
    tour: (title) => `Experiencia del tour ${title} en Costa Rica`,
    tourFrom: (title, place) => `Tour ${title} desde ${place}, Costa Rica`,
    gallery: (title, index) => `Foto ${index} de ${title}`,
    tourGallery: (title, index) => `Foto ${index} del tour ${title} en Costa Rica`,
    hotel: (hotel, zone) => `Alojamiento ${hotel} en ${zone}, Costa Rica`,
    vehicle: (title, model) => `Vehículo de alquiler ${model}, categoría ${title.toLowerCase()}, en Costa Rica`,
    promo: (title, tagline) => `${title}: ${tagline}`
  },
  fr: {
    destination: (name) => `Destination ${name} et itinéraire de voyage au Costa Rica`,
    tour: (title) => `Excursion ${title} au Costa Rica`,
    tourFrom: (title, place) => `Excursion ${title} au départ de ${place}, Costa Rica`,
    gallery: (title, index) => `Photo ${index} de ${title}`,
    tourGallery: (title, index) => `Photo ${index} de l'excursion ${title} au Costa Rica`,
    hotel: (hotel, zone) => `Hébergement ${hotel} à ${zone}, Costa Rica`,
    vehicle: (title, model) => `Véhicule de location ${model}, catégorie ${title.toLowerCase()}, au Costa Rica`,
    promo: (title, tagline) => `${title} : ${tagline}`
  }
};

const serviceCopy = {
  "Private transportation": {
    en: "Private transportation vehicle for airport, hotel and beach transfers in Costa Rica",
    es: "Vehículo de transporte privado para traslados entre aeropuerto, hotel y playa en Costa Rica",
    fr: "Véhicule de transport privé pour les transferts entre aéroport, hôtel et plage au Costa Rica"
  },
  "Shared shuttles": {
    en: "Shared shuttle transportation between Costa Rica destinations",
    es: "Transporte en shuttle compartido entre destinos de Costa Rica",
    fr: "Navette partagée entre les destinations du Costa Rica"
  },
  "Rent a car": {
    en: "Rental car for independent travel in Costa Rica",
    es: "Auto de alquiler para viajar de forma independiente en Costa Rica",
    fr: "Voiture de location pour voyager de façon indépendante au Costa Rica"
  },
  "Vacation packages": {
    en: "Costa Rica vacation package with transport, hotels and experiences",
    es: "Paquete vacacional en Costa Rica con transporte, hoteles y experiencias",
    fr: "Forfait vacances au Costa Rica avec transport, hôtels et expériences"
  },
  "Hotels and stays": {
    en: "Hotel accommodation for a Costa Rica itinerary",
    es: "Alojamiento de hotel para un itinerario en Costa Rica",
    fr: "Hébergement hôtelier pour un itinéraire au Costa Rica"
  },
  "Day tours": {
    en: "Costa Rica day tour with beach and nature experiences",
    es: "Tour de un día en Costa Rica con experiencias de playa y naturaleza",
    fr: "Excursion à la journée au Costa Rica avec plage et nature"
  }
};

function languageCopy(language) {
  return copy[language] || copy.en;
}

export function destinationImageAlt(name, language = "en") {
  return languageCopy(language).destination(name);
}

export function tourImageAlt(title, language = "en") {
  return languageCopy(language).tour(title);
}

export function tourFromImageAlt(title, place, language = "en") {
  return languageCopy(language).tourFrom(title, place);
}

export function galleryImageAlt(title, index, language = "en") {
  return languageCopy(language).gallery(title, index);
}

export function tourGalleryImageAlt(title, index, language = "en") {
  return languageCopy(language).tourGallery(title, index);
}

export function hotelImageAlt(hotel, zone, language = "en") {
  return languageCopy(language).hotel(hotel, zone);
}

export function vehicleImageAlt(title, model, language = "en") {
  return languageCopy(language).vehicle(title, model);
}

export function promotionImageAlt(title, tagline, language = "en") {
  return languageCopy(language).promo(title, tagline);
}

export function serviceImageAlt(title, language = "en") {
  return serviceCopy[title]?.[language] || serviceCopy[title]?.en || languageCopy(language).destination(title);
}
