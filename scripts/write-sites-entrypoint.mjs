import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const source = `function withPath(request, pathname) {
  const url = new URL(request.url);
  url.pathname = pathname;
  url.search = "";
  return new Request(url, request);
}

export default {
  async fetch(request, env) {
    let response = await env.ASSETS.fetch(request);

    if (response.status !== 404) {
      return response;
    }

    const url = new URL(request.url);
    if (!url.pathname.startsWith("/dist/")) {
      const distPath = url.pathname === "/" ? "/dist/index.html" : "/dist" + url.pathname;
      response = await env.ASSETS.fetch(withPath(request, distPath));
      if (response.status !== 404) {
        return response;
      }
    }

    if (request.method !== "GET") {
      return response;
    }

    const accept = request.headers.get("accept") || "";
    if (!accept.includes("text/html")) {
      return response;
    }

    response = await env.ASSETS.fetch(withPath(request, "/index.html"));
    if (response.status !== 404) {
      return response;
    }

    return env.ASSETS.fetch(withPath(request, "/dist/index.html"));
  }
};
`;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function languageFromPath(pathname) {
  const match = pathname.match(/^\/(es|fr)(?=\/|$)/);
  return match?.[1] || "en";
}

function basePathFromPath(pathname) {
  const stripped = pathname.replace(/^\/(es|fr)(?=\/|$)/, "");
  return stripped || "/";
}

function localizedPath(basePath, language) {
  if (language === "en") return basePath;
  return `/${language}${basePath === "/" ? "" : basePath}`;
}

function absoluteRouteUrl(pathname) {
  return pathname === "/"
    ? "https://alsamatourscr.com/"
    : `https://alsamatourscr.com${pathname}`;
}

function titleFromPath(pathname) {
  const language = languageFromPath(pathname);
  const basePath = basePathFromPath(pathname);
  const localized = {
    en: {
      "/": "Alsama Tours | Travel Services in Costa Rica",
      "/shuttle": "Shuttle Service | Alsama Tours",
      "/private-transport": "Private Transport | Alsama Tours",
      "/rent-a-car": "Rent a Car | Alsama Tours",
      "/tours": "Tours | Alsama Tours",
      "/tours/san-jose": "Tours from San Jose, Costa Rica | Alsama Tours",
      "/tours/jaco": "Tours from Jaco, Costa Rica | Alsama Tours",
      "/destinations/manuel-antonio": "Manuel Antonio Tours & Day Trips | Alsama Tours",
      "/destinations/arenal": "Arenal Volcano & La Fortuna Tours | Alsama Tours",
      "/hotels": "Hotels | Alsama Tours",
      "/privacy-policy": "Privacy Policy | Alsama Tours"
    },
    es: {
      "/": "Alsama Tours | Servicios de viaje en Costa Rica",
      "/shuttle": "Servicio de shuttle | Alsama Tours",
      "/private-transport": "Transporte privado | Alsama Tours",
      "/rent-a-car": "Alquiler de autos | Alsama Tours",
      "/tours": "Tours | Alsama Tours",
      "/tours/san-jose": "Tours desde San José, Costa Rica | Alsama Tours",
      "/tours/jaco": "Tours desde Jacó, Costa Rica | Alsama Tours",
      "/destinations/manuel-antonio": "Tours y excursiones a Manuel Antonio | Alsama Tours",
      "/destinations/arenal": "Tours al Volcán Arenal y La Fortuna | Alsama Tours",
      "/hotels": "Hoteles | Alsama Tours",
      "/privacy-policy": "Política de privacidad | Alsama Tours"
    },
    fr: {
      "/": "Alsama Tours | Services de voyage au Costa Rica",
      "/shuttle": "Service de navette | Alsama Tours",
      "/private-transport": "Transport privé | Alsama Tours",
      "/rent-a-car": "Location de voiture | Alsama Tours",
      "/tours": "Excursions | Alsama Tours",
      "/tours/san-jose": "Excursions depuis San José, Costa Rica | Alsama Tours",
      "/tours/jaco": "Excursions depuis Jacó, Costa Rica | Alsama Tours",
      "/destinations/manuel-antonio": "Excursions à Manuel Antonio | Alsama Tours",
      "/destinations/arenal": "Excursions au volcan Arenal et à La Fortuna | Alsama Tours",
      "/hotels": "Hôtels | Alsama Tours",
      "/privacy-policy": "Politique de confidentialité | Alsama Tours"
    }
  };
  if (localized[language]?.[basePath]) return localized[language][basePath];

  const slug = basePath.split("/").filter(Boolean).pop() || "Costa Rica Travel";
  const label = slug.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  return `${label} | Alsama Tours`;
}

function descriptionFromPath(pathname) {
  const language = languageFromPath(pathname);
  const basePath = basePathFromPath(pathname);
  const descriptions = {
    en: {
      "/": "Plan Costa Rica tours, private transport, shared shuttles, hotels and car rentals with Alsama Tours, a local travel team.",
      "/shuttle": "Book shared shuttle routes between Costa Rica airports, hotels, beaches and popular destinations with local travel support.",
      "/private-transport": "Compare private transport routes from San Jose and Jaco for families, groups, airport pickups and custom Costa Rica itineraries.",
      "/rent-a-car": "Request Costa Rica rent a car options with local route guidance for city, beach, mountain and multi-destination travel.",
      "/tours": "Explore Costa Rica tours from San Jose and Jaco, including beaches, volcanoes, wildlife, waterfalls and adventure experiences.",
      "/tours/san-jose": "Compare day tours from San Jose to volcanoes, wildlife, beaches, waterfalls and cultural attractions across Costa Rica.",
      "/tours/jaco": "Explore tours from Jaco for rafting, waterfalls, wildlife, rainforest, national parks and ocean experiences on Costa Rica's Central Pacific.",
      "/destinations/manuel-antonio": "Plan Manuel Antonio tours with guided wildlife walks, Pacific scenery, beaches and day-trip options from San Jose.",
      "/destinations/arenal": "Explore Arenal Volcano and La Fortuna tours with scenic routes, volcano viewpoints, hot springs and options from San Jose.",
      "/hotels": "Browse Costa Rica hotel options by region and add lodging to your trip request with Alsama Tours."
    },
    es: {
      "/": "Planea tours, transporte privado, shuttles compartidos, hoteles y alquiler de autos en Costa Rica con Alsama Tours.",
      "/tours": "Explora tours en Costa Rica desde San José y Jacó, incluyendo playas, volcanes, vida silvestre, cataratas y aventura.",
      "/tours/san-jose": "Compara tours desde San José a volcanes, vida silvestre, playas, cataratas y atracciones culturales de Costa Rica.",
      "/tours/jaco": "Explora tours desde Jacó de rafting, cataratas, vida silvestre, bosque tropical, parques nacionales y experiencias marinas.",
      "/destinations/manuel-antonio": "Planea tours a Manuel Antonio con caminatas guiadas, vida silvestre, playas del Pacífico y opciones desde San José.",
      "/destinations/arenal": "Explora tours al Volcán Arenal y La Fortuna con rutas escénicas, miradores, aguas termales y opciones desde San José."
    },
    fr: {
      "/": "Planifiez excursions, transport privé, navettes, hôtels et location de voiture au Costa Rica avec Alsama Tours.",
      "/tours": "Découvrez les excursions au Costa Rica depuis San José et Jacó: plages, volcans, faune, cascades et aventure.",
      "/tours/san-jose": "Comparez les excursions depuis San José vers volcans, faune, plages, cascades et sites culturels du Costa Rica.",
      "/tours/jaco": "Découvrez les excursions depuis Jacó: rafting, cascades, faune, forêt tropicale, parcs nationaux et expériences marines.",
      "/destinations/manuel-antonio": "Planifiez Manuel Antonio avec balades guidées, faune tropicale, plages du Pacifique et options depuis San José.",
      "/destinations/arenal": "Découvrez Arenal et La Fortuna avec routes panoramiques, vues sur le volcan, sources chaudes et options depuis San José."
    }
  };
  return descriptions[language]?.[basePath]
    || descriptions.en[basePath]
    || "Explore Costa Rica travel experiences with Alsama Tours, including local booking support and trip coordination.";
}

function withSeo(html, pathname) {
  const language = languageFromPath(pathname);
  const basePath = basePathFromPath(pathname);
  const canonical = absoluteRouteUrl(pathname);
  const title = titleFromPath(pathname);
  const description = descriptionFromPath(pathname);
  const alternates = {
    en: absoluteRouteUrl(localizedPath(basePath, "en")),
    es: absoluteRouteUrl(localizedPath(basePath, "es")),
    fr: absoluteRouteUrl(localizedPath(basePath, "fr")),
    "x-default": absoluteRouteUrl(localizedPath(basePath, "en"))
  };

  let result = html
    .replace(/<html lang="[^"]*">/, `<html lang="${language}">`)
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${escapeHtml(description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${escapeHtml(description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${escapeHtml(description)}" />`);

  for (const [hreflang, href] of Object.entries(alternates)) {
    const pattern = new RegExp(`<link rel="alternate" hreflang="${hreflang}" href="[^"]*" \\/>`);
    const tag = `<link rel="alternate" hreflang="${hreflang}" href="${href}" />`;
    if (pattern.test(result)) {
      result = result.replace(pattern, tag);
    } else {
      result = result.replace("</head>", `    ${tag}\n  </head>`);
    }
  }

  return result;
}

function withIndexRedirect(html, pathname) {
  const canonical = `https://alsamatourscr.com${pathname}/`.replace(/\/{2,}$/, "/");
  const redirectScript = `<script>
      if (window.location.pathname.endsWith("/index.html")) {
        window.location.replace("${pathname}/" + window.location.search + window.location.hash);
      }
    </script>`;
  return html
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace("</head>", `${redirectScript}\n  </head>`);
}

async function writeStaticRouteEntrypoints() {
  const html = await readFile("dist/index.html", "utf8");
  const sitemap = await readFile("public/sitemap.xml", "utf8");
  const urls = [...sitemap.matchAll(/<loc>https:\/\/alsamatourscr\.com([^<]*)<\/loc>/g)];
  const paths = [...new Set(urls.map((match) => match[1] || "/"))];

  for (const pathname of paths) {
    if (pathname === "/") continue;
    const clean = pathname.replace(/^\/+|\/+$/g, "");
    if (!clean) continue;
    const routeHtml = withSeo(html, pathname);
    const dir = path.join("dist", clean);
    await mkdir(dir, { recursive: true });

    // GitHub Pages serves /route/ from /route/index.html.
    // If a visitor explicitly requests /route/index.html, redirect client-side
    // to the single canonical clean URL /route/ to prevent duplicate indexing.
    await writeFile(path.join(dir, "index.html"), withIndexRedirect(routeHtml, pathname));
  }
}

await mkdir("dist/.openai", { recursive: true });
await mkdir("dist/server", { recursive: true });
await copyFile(".openai/hosting.json", "dist/.openai/hosting.json");
await writeFile("dist/index.js", source);
await writeFile("dist/server/index.js", source);
await writeStaticRouteEntrypoints();
