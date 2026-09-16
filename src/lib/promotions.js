import { homeLinks } from "./site";

export const promotionSearchTerms = [
  "promo",
  "promos",
  "promotion",
  "promotions",
  "offer",
  "offers",
  "deal",
  "deals",
  "oferta",
  "ofertas",
  "promocion",
  "promociones",
  "descuento",
  "tortuguero"
];

export const limitedPromotions = [
  {
    id: "tortuguero-october-2026",
    startsAt: "2026-09-16T00:00:00-06:00",
    endsAt: "2026-11-01T00:00:00-06:00",
    image: "img/hotels/Hotel_Los_Amigos_Jungle_Tortuguero.webp",
    href: homeLinks.contact,
    route: [
      [-84.0907, 9.9281],
      [-83.86, 10.19],
      [-83.505, 10.541]
    ],
    markers: [
      { id: "san-jose", coords: [-84.0907, 9.9281] },
      { id: "tortuguero", coords: [-83.505, 10.541] }
    ],
    packages: [
      {
        id: "two-days",
        prices: [
          { room: "single", price: 290 },
          { room: "double", price: 250 },
          { room: "triple", price: 235 }
        ]
      },
      {
        id: "three-days",
        prices: [
          { room: "single", price: 365 },
          { room: "double", price: 330 },
          { room: "triple", price: 300 }
        ]
      }
    ],
    copy: {
      en: {
        eyebrow: "Limited time offer",
        title: "Tortuguero",
        tagline: "Nature that connects you",
        intro: "Rainforest canals, Caribbean wildlife and a multi-day escape with Alsama coordination.",
        validUntil: "Valid through October 31, 2026",
        countdownLabel: "Offer ends in",
        includesTitle: "Includes",
        excludesTitle: "Not included",
        includes: ["Round-trip transportation", "Full board", "Canal tour"],
        excludes: ["Tortuguero National Park entrance"],
        packages: {
          "two-days": "2 days - 1 night",
          "three-days": "3 days - 2 nights"
        },
        rooms: {
          single: "Single",
          double: "Double",
          triple: "Triple"
        },
        rateLabel: "Rack",
        perPerson: "Rates per person in USD. Subject to availability and changes without prior notice.",
        cta: "Ask for this offer",
        mapLabel: "San Jose to Tortuguero",
        highlights: ["Canals", "Rainforest", "Caribbean nature"],
        loopWords: ["Canals", "Wildlife", "Rainforest"],
        expiredTitle: "No active limited-time offers",
        expiredBody: "Stay tuned for future offers. If another promotion opens, it will appear here automatically.",
        upcomingTitle: "Next offer coming soon"
      },
      es: {
        eyebrow: "Promo por tiempo limitado",
        title: "Tortuguero",
        tagline: "Naturaleza que te conecta",
        intro: "Canales de bosque lluvioso, vida silvestre del Caribe y una escapada de varios dias con coordinacion de Alsama.",
        validUntil: "Disponible hasta el 31 de octubre de 2026",
        countdownLabel: "La oferta termina en",
        includesTitle: "Incluye",
        excludesTitle: "No incluye",
        includes: ["Transporte ida y vuelta", "Pension completa", "Tour por los canales"],
        excludes: ["Entrada al Parque Nacional Tortuguero"],
        packages: {
          "two-days": "2 dias - 1 noche",
          "three-days": "3 dias - 2 noches"
        },
        rooms: {
          single: "Sencilla",
          double: "Doble",
          triple: "Triple"
        },
        rateLabel: "Rack",
        perPerson: "Tarifas por persona en dolares americanos. Sujeto a disponibilidad y cambios sin previo aviso.",
        cta: "Consultar esta oferta",
        mapLabel: "San Jose a Tortuguero",
        highlights: ["Canales", "Bosque lluvioso", "Naturaleza del Caribe"],
        loopWords: ["Canales", "Vida silvestre", "Bosque lluvioso"],
        expiredTitle: "No hay ofertas por tiempo limitado activas",
        expiredBody: "Queda atento a futuras ofertas. Si se abre otra promocion, aparecera aqui automaticamente.",
        upcomingTitle: "Proxima oferta pronto"
      },
      fr: {
        eyebrow: "Offre a duree limitee",
        title: "Tortuguero",
        tagline: "La nature qui vous connecte",
        intro: "Canaux de foret tropicale, faune des Caraibes et escapade de plusieurs jours coordonnee par Alsama.",
        validUntil: "Valable jusqu'au 31 octobre 2026",
        countdownLabel: "L'offre se termine dans",
        includesTitle: "Inclus",
        excludesTitle: "Non inclus",
        includes: ["Transport aller-retour", "Pension complete", "Excursion sur les canaux"],
        excludes: ["Entree au parc national de Tortuguero"],
        packages: {
          "two-days": "2 jours - 1 nuit",
          "three-days": "3 jours - 2 nuits"
        },
        rooms: {
          single: "Simple",
          double: "Double",
          triple: "Triple"
        },
        rateLabel: "Rack",
        perPerson: "Tarifs par personne en dollars americains. Sous reserve de disponibilite et de modifications sans preavis.",
        cta: "Demander cette offre",
        mapLabel: "San Jose a Tortuguero",
        highlights: ["Canaux", "Foret tropicale", "Nature caribeenne"],
        loopWords: ["Canaux", "Faune", "Foret tropicale"],
        expiredTitle: "Aucune offre a duree limitee active",
        expiredBody: "Restez attentif aux prochaines offres. Si une autre promotion ouvre, elle apparaitra ici automatiquement.",
        upcomingTitle: "Prochaine offre bientot"
      }
    }
  }
];

export function getPromotionCopy(promotion, language = "en") {
  return promotion.copy[language] || promotion.copy.en;
}

export function isPromotionActive(promotion, now = new Date()) {
  const start = new Date(promotion.startsAt);
  const end = new Date(promotion.endsAt);
  return now >= start && now < end;
}

export function getActivePromotion(now = new Date()) {
  return limitedPromotions.find((promotion) => isPromotionActive(promotion, now));
}

export function getNextPromotion(now = new Date()) {
  return limitedPromotions
    .filter((promotion) => new Date(promotion.startsAt) > now)
    .sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt))[0];
}

export function getPromotionTimeLeft(promotion, now = new Date()) {
  const remaining = Math.max(0, new Date(promotion.endsAt).getTime() - now.getTime());
  const day = 24 * 60 * 60 * 1000;
  const hour = 60 * 60 * 1000;
  const minute = 60 * 1000;

  return {
    days: Math.floor(remaining / day),
    hours: Math.floor((remaining % day) / hour),
    minutes: Math.floor((remaining % hour) / minute),
    seconds: Math.floor((remaining % minute) / 1000)
  };
}
