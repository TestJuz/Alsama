import { findTourBySlug, localizePath, routes, stripLanguagePrefix } from "./site";
import { getPageTitle, translateText } from "./nativeI18n";

export const siteBaseUrl = "https://alsamatourscr.com/";
export const siteName = "Alsama Tours";

const pageSeo = {
  home: {
    path: routes.home,
    description: "Plan Costa Rica tours, private transport, shared shuttles, hotels and car rentals with Alsama Tours, a local travel team.",
    image: "og.jpg"
  },
  shuttle: {
    path: routes.shuttle,
    description: "Book shared shuttle routes between Costa Rica airports, hotels, beaches and popular destinations with local travel support.",
    image: "img/hero/3.webp"
  },
  privateTransport: {
    path: routes.privateTransport,
    description: "Compare private transport routes from San Jose and Jaco for families, groups, airport pickups and custom Costa Rica itineraries.",
    image: "img/tours/sj/Manuel_Antonio/1.webp"
  },
  rentACar: {
    path: routes.rentACar,
    description: "Request Costa Rica rent a car options with local route guidance for city, beach, mountain and multi-destination travel.",
    image: "img/hero/2.webp"
  },
  tours: {
    path: routes.tours,
    description: "Explore Costa Rica tours from San Jose and Jaco, including beaches, volcanoes, wildlife, waterfalls and adventure experiences.",
    image: "img/tours/sj/Arenal_Volcano_and_Hot_Springs/Arenal.webp"
  },
  hotels: {
    path: routes.hotels,
    description: "Browse Costa Rica hotel options by region and add lodging to your trip request with Alsama Tours.",
    image: "img/hotels/Hotel_Manuel_Antonio.webp"
  },
  privacy: {
    path: routes.privacy,
    description: "Read the Alsama Tours privacy policy for website forms, cart requests, WhatsApp messages and travel service coordination.",
    image: "og.jpg"
  },
  thankYou: {
    path: routes.thankYou,
    title: {
      en: "Thank You | Alsama Tours",
      es: "Gracias | Alsama Tours",
      fr: "Merci | Alsama Tours"
    },
    description: "Thank you for contacting Alsama Tours. Our local team will review your Costa Rica travel request.",
    image: "og.jpg",
    robots: "noindex, follow"
  },
  toursSanJose: {
    path: routes.toursSanJose,
    title: {
      en: "Tours from San Jose, Costa Rica | Alsama Tours",
      es: "Tours desde San José, Costa Rica | Alsama Tours",
      fr: "Excursions depuis San José, Costa Rica | Alsama Tours"
    },
    description: {
      en: "Compare day tours from San Jose to volcanoes, wildlife, beaches, waterfalls and cultural attractions across Costa Rica.",
      es: "Compara tours desde San José a volcanes, vida silvestre, playas, cataratas y atracciones culturales de Costa Rica.",
      fr: "Comparez les excursions depuis San José vers volcans, faune, plages, cascades et sites culturels du Costa Rica."
    },
    image: "img/tours/sj/Arenal_Volcano_and_Hot_Springs/Arenal.webp"
  },
  toursJaco: {
    path: routes.toursJaco,
    title: {
      en: "Tours from Jaco, Costa Rica | Alsama Tours",
      es: "Tours desde Jacó, Costa Rica | Alsama Tours",
      fr: "Excursions depuis Jacó, Costa Rica | Alsama Tours"
    },
    description: {
      en: "Explore tours from Jaco for rafting, waterfalls, wildlife, rainforest, national parks and ocean experiences on Costa Rica's Central Pacific.",
      es: "Explora tours desde Jacó de rafting, cataratas, vida silvestre, bosque tropical, parques nacionales y experiencias marinas.",
      fr: "Découvrez les excursions depuis Jacó: rafting, cascades, faune, forêt tropicale, parcs nationaux et expériences marines."
    },
    image: "img/tours/jaco/White _Water_Rafting/Rafting-1.webp"
  },
  manuelAntonioDestination: {
    path: routes.manuelAntonioDestination,
    title: {
      en: "Manuel Antonio Tours & Day Trips | Alsama Tours",
      es: "Tours y excursiones a Manuel Antonio | Alsama Tours",
      fr: "Excursions à Manuel Antonio | Alsama Tours"
    },
    description: {
      en: "Plan Manuel Antonio tours with guided wildlife walks, Pacific scenery, beaches and day-trip options from San Jose.",
      es: "Planea tours a Manuel Antonio con caminatas guiadas, vida silvestre, playas del Pacífico y opciones desde San José.",
      fr: "Planifiez Manuel Antonio avec balades guidées, faune tropicale, plages du Pacifique et options depuis San José."
    },
    image: "img/tours/sj/Manuel_Antonio/1.webp"
  },
  arenalDestination: {
    path: routes.arenalDestination,
    title: {
      en: "Arenal Volcano & La Fortuna Tours | Alsama Tours",
      es: "Tours al Volcán Arenal y La Fortuna | Alsama Tours",
      fr: "Excursions au volcan Arenal et à La Fortuna | Alsama Tours"
    },
    description: {
      en: "Explore Arenal Volcano and La Fortuna tours with scenic routes, volcano viewpoints, hot springs and options from San Jose.",
      es: "Explora tours al Volcán Arenal y La Fortuna con rutas escénicas, miradores, aguas termales y opciones desde San José.",
      fr: "Découvrez Arenal et La Fortuna avec routes panoramiques, vues sur le volcan, sources chaudes et options depuis San José."
    },
    image: "img/tours/sj/Arenal_Volcano_and_Hot_Springs/Arenal.webp"
  }
};

function normalizePath(pathname) {
  const cleaned = String(pathname || routes.home).replace(/\/+$/, "");
  return cleaned || routes.home;
}

function runtimeOrigin() {
  if (typeof window !== "undefined") return window.location.origin;
  return new URL(siteBaseUrl).origin;
}

function runtimeBaseUrl() {
  if (typeof window !== "undefined") return new URL(import.meta.env.BASE_URL, window.location.origin).href;
  return siteBaseUrl;
}

export function absoluteUrl(value = "") {
  if (/^https?:\/\//i.test(value)) return value;
  if (String(value).startsWith("/")) return new URL(value, runtimeOrigin()).href;
  return new URL(value, runtimeBaseUrl()).href;
}

function canonicalUrl(pathname) {
  const normalized = normalizePath(pathname);
  const canonicalPath = normalized === "/" ? "/" : `${normalized}/`;
  return new URL(canonicalPath.replace(/^\/+/, ""), runtimeBaseUrl()).href;
}

function routeKeyFromPath(pathname) {
  const path = normalizePath(pathname);
  return Object.entries(pageSeo).find(([, value]) => value.path === path)?.[0] || null;
}

function localizedDescription(value, language) {
  const source = typeof value === "object" ? (value[language] || value.en) : translateText(value, language);
  return source.length > 160 ? `${source.slice(0, 157).trim()}...` : source;
}

function buildAlternates(basePath) {
  return {
    en: canonicalUrl(localizePath(basePath, "en")),
    es: canonicalUrl(localizePath(basePath, "es")),
    fr: canonicalUrl(localizePath(basePath, "fr")),
    "x-default": canonicalUrl(localizePath(basePath, "en"))
  };
}

export function getRouteSeo(pathname, language = "en") {
  const localizedPathname = normalizePath(pathname);
  const basePath = normalizePath(stripLanguagePrefix(localizedPathname));
  const routeKey = routeKeyFromPath(basePath);

  if (routeKey) {
    const meta = pageSeo[routeKey];
    const title = meta.title?.[language] || getPageTitle(routeKey, language);
    const description = localizedDescription(meta.description, language);
    return {
      title,
      description,
      canonical: canonicalUrl(localizePath(basePath, language)),
      alternates: buildAlternates(basePath),
      image: absoluteUrl(meta.image),
      type: "website",
      robots: meta.robots,
      schema: buildSchema(basePath, language, title, description)
    };
  }

  const tourPrefix = `${routes.tours}/`;
  if (basePath.startsWith(tourPrefix)) {
    const tour = findTourBySlug(basePath.slice(tourPrefix.length));
    if (tour) {
      const title = `${translateText(tour.title, language)} | ${siteName}`;
      const description = localizedDescription(`Book ${tour.title} from ${tour.originLabel}. ${tour.excerpt}`, language);
      return {
        title,
        description,
        canonical: canonicalUrl(localizePath(basePath, language)),
        alternates: buildAlternates(basePath),
        image: absoluteUrl(tour.image),
        type: "article",
        schema: buildSchema(basePath, language, title, description, tour)
      };
    }
  }

  const title = `Page Not Found | ${siteName}`;
  return {
    title,
    description: "This Alsama Tours page could not be found.",
    canonical: canonicalUrl(localizePath(routes.home, language)),
    alternates: buildAlternates(routes.home),
    image: absoluteUrl("og.jpg"),
    type: "website",
    robots: "noindex, follow",
    schema: buildSchema(routes.home, language, title, "This Alsama Tours page could not be found.")
  };
}

function buildSchema(basePath, language, title, description, tour) {
  const localizedPagePath = localizePath(basePath, language);
  const business = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${siteBaseUrl}#local-business`,
    name: siteName,
    url: siteBaseUrl,
    image: absoluteUrl("og.jpg"),
    email: "info@alsamatourscr.com",
    telephone: "+50661672539",
    priceRange: "$$",
    sameAs: [
      "https://www.tripadvisor.es/Attraction_Review-g309293-d23810882-Reviews-Alsama_Tours-San_Jose_San_Jose_Metro_Province_of_San_Jose.html"
    ],
    areaServed: [
      { "@type": "Country", name: "Costa Rica" },
      { "@type": "City", name: "San Jose" },
      { "@type": "City", name: "Jaco" }
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "CR"
    },
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Costa Rica tours" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Private transportation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Shared shuttles" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hotels and car rentals" } }
    ]
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": tour ? "TouristTrip" : "WebPage",
    "@id": `${canonicalUrl(localizedPagePath)}#webpage`,
    inLanguage: language,
    name: title,
    description,
    url: canonicalUrl(localizedPagePath),
    image: tour ? absoluteUrl(tour.image) : absoluteUrl("og.jpg"),
    provider: { "@id": business["@id"] }
  };

  if (tour) {
    webPage.touristType = "Travelers in Costa Rica";
    webPage.offers = {
      "@type": "Offer",
      price: tour.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: canonicalUrl(localizedPagePath)
    };
    webPage.itinerary = tour.locations.map((name) => ({ "@type": "Place", name }));
  }

  const breadcrumbItems = [{ name: translateText("Home", language), path: routes.home }];

  if (tour) {
    breadcrumbItems.push(
      { name: translateText("Tours", language), path: routes.tours },
      { name: title.replace(` | ${siteName}`, ""), path: basePath }
    );
  } else if (basePath !== routes.home) {
    breadcrumbItems.push({ name: title.replace(` | ${siteName}`, ""), path: basePath });
  }

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl(localizedPagePath)}#breadcrumbs`,
    itemListElement: breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonicalUrl(localizePath(item.path, language))
    }))
  };

  return [business, webPage, breadcrumbs];
}

function setMeta(selector, attrs, content) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    Object.entries(attrs).forEach(([name, value]) => element.setAttribute(name, value));
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setLink(selector, attrs, href) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("link");
    Object.entries(attrs).forEach(([name, value]) => element.setAttribute(name, value));
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

function setJsonLd(id, data) {
  let element = document.getElementById(id);
  if (!element) {
    element = document.createElement("script");
    element.type = "application/ld+json";
    element.id = id;
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(data);
}

export function applySeo(seo) {
  document.title = seo.title;
  setMeta('meta[name="description"]', { name: "description" }, seo.description);
  setMeta('meta[name="robots"]', { name: "robots" }, seo.robots || "index, follow");
  setLink('link[rel="canonical"]', { rel: "canonical" }, seo.canonical);

  Object.entries(seo.alternates || {}).forEach(([hreflang, href]) => {
    setLink(
      `link[rel="alternate"][hreflang="${hreflang}"]`,
      { rel: "alternate", hreflang },
      href
    );
  });

  setMeta('meta[property="og:site_name"]', { property: "og:site_name" }, siteName);
  setMeta('meta[property="og:title"]', { property: "og:title" }, seo.title);
  setMeta('meta[property="og:description"]', { property: "og:description" }, seo.description);
  setMeta('meta[property="og:type"]', { property: "og:type" }, seo.type);
  setMeta('meta[property="og:url"]', { property: "og:url" }, seo.canonical);
  setMeta('meta[property="og:image"]', { property: "og:image" }, seo.image);
  setMeta('meta[property="og:image:alt"]', { property: "og:image:alt" }, `${siteName} Costa Rica travel services`);

  setMeta('meta[name="twitter:card"]', { name: "twitter:card" }, "summary_large_image");
  setMeta('meta[name="twitter:title"]', { name: "twitter:title" }, seo.title);
  setMeta('meta[name="twitter:description"]', { name: "twitter:description" }, seo.description);
  setMeta('meta[name="twitter:image"]', { name: "twitter:image" }, seo.image);
  setJsonLd("alsama-local-business-schema", seo.schema);
}
