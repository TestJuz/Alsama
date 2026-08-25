import { findTourBySlug, routes } from "./site";
import { getPageTitle, translateText } from "./nativeI18n";

export const siteBaseUrl = "https://alsamatourscr.com/Alsama/";
export const siteName = "Alsama Tours";

const pageSeo = {
  home: {
    path: routes.home,
    description: "Plan Costa Rica tours, private transport, shared shuttles, hotels and car rentals with Alsama Tours, a local travel team.",
    image: "og.png"
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
    image: "og.png"
  },
  thankYou: {
    path: routes.thankYou,
    title: {
      en: "Thank You | Alsama Tours",
      es: "Gracias | Alsama Tours",
      fr: "Merci | Alsama Tours"
    },
    description: "Thank you for contacting Alsama Tours. Our local team will review your Costa Rica travel request.",
    image: "og.png"
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
  const path = normalizePath(pathname).replace(/^\/+/, "");
  return new URL(path, runtimeBaseUrl()).href;
}

function routeKeyFromPath(pathname) {
  const path = normalizePath(pathname);
  return Object.entries(pageSeo).find(([, value]) => value.path === path)?.[0] || "home";
}

function makeDescription(value, language) {
  const text = translateText(value, language);
  return text.length > 160 ? `${text.slice(0, 157).trim()}...` : text;
}

export function getRouteSeo(pathname, language = "en") {
  const path = normalizePath(pathname);
  const tourPrefix = `${routes.tours}/`;

  if (path.startsWith(tourPrefix)) {
    const tour = findTourBySlug(path.slice(tourPrefix.length));
    if (tour) {
      const title = `${translateText(tour.title, language)} | ${siteName}`;
      return {
        title,
        description: makeDescription(`Book ${tour.title} from ${tour.originLabel}. ${tour.excerpt}`, language),
        canonical: canonicalUrl(path),
        image: absoluteUrl(tour.image),
        type: "article",
        schema: buildSchema(path, title, tour.excerpt, tour)
      };
    }
  }

  const knownRoute = Object.values(pageSeo).some((value) => value.path === path);
  if (!knownRoute && path !== routes.home) {
    const title = `Page Not Found | ${siteName}`;
    return {
      title,
      description: "This Alsama Tours page could not be found.",
      canonical: canonicalUrl(routes.home),
      image: absoluteUrl("og.png"),
      type: "website",
      robots: "noindex, follow",
      schema: buildSchema(routes.home, title, "This Alsama Tours page could not be found.")
    };
  }

  const key = routeKeyFromPath(path);
  const meta = pageSeo[key];
  const title = meta.title?.[language] || getPageTitle(key, language);
  return {
    title,
    description: makeDescription(meta.description, language),
    canonical: canonicalUrl(meta.path),
    image: absoluteUrl(meta.image),
    type: "website",
    schema: buildSchema(meta.path, title, meta.description)
  };
}

function buildSchema(pathname, title, description, tour) {
  const business = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${runtimeBaseUrl()}#local-business`,
    name: siteName,
    url: runtimeBaseUrl(),
    image: absoluteUrl("og.png"),
    email: "jeaustin.rdz@gmail.com",
    telephone: "+50661672539",
    priceRange: "$$",
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
    "@id": `${canonicalUrl(pathname)}#webpage`,
    name: title,
    description,
    url: canonicalUrl(pathname),
    image: tour ? absoluteUrl(tour.image) : absoluteUrl("og.png"),
    provider: { "@id": business["@id"] }
  };

  if (tour) {
    webPage.touristType = "Travelers in Costa Rica";
    webPage.offers = {
      "@type": "Offer",
      price: tour.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: canonicalUrl(pathname)
    };
    webPage.itinerary = tour.locations.map((name) => ({ "@type": "Place", name }));
  }

  return [business, webPage];
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
