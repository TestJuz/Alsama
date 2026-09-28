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

function titleFromPath(pathname) {
  if (pathname === "/inicio") return "Alsama Tours | Costa Rica Tours, Shuttles & Travel Services";
  if (pathname === "/shuttle") return "Shared Shuttle Costa Rica | Alsama Tours";
  if (pathname === "/private-transport") return "Private Transportation Costa Rica | Alsama Tours";
  if (pathname === "/rent-a-car") return "Rent a Car Costa Rica | Alsama Tours";
  if (pathname === "/tours") return "Costa Rica Tours from San Jose & Jaco | Alsama Tours";
  if (pathname === "/hotels") return "Hotels in Costa Rica | Alsama Tours";
  if (pathname === "/privacy-policy") return "Privacy Policy | Alsama Tours";
  const slug = pathname.split("/").filter(Boolean).pop() || "Costa Rica Travel";
  const label = slug.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  return `${label} | Alsama Tours`;
}

function descriptionFromPath(pathname) {
  if (pathname === "/inicio") return "Plan Costa Rica tours, private transportation, shared shuttles, hotels and car rentals with Alsama Tours.";
  if (pathname === "/shuttle") return "Book shared shuttle transportation between Costa Rica airports, hotels, beaches and popular destinations.";
  if (pathname === "/private-transport") return "Book private transportation in Costa Rica for airport pickups, families, groups and custom itineraries.";
  if (pathname === "/rent-a-car") return "Request Costa Rica car rental options with local travel and route support.";
  if (pathname === "/tours") return "Explore Costa Rica tours from San Jose and Jaco, including beaches, volcanoes, wildlife, waterfalls and adventure.";
  if (pathname === "/hotels") return "Browse Costa Rica hotel options by region and add lodging to your trip with Alsama Tours.";
  if (pathname === "/privacy-policy") return "Read the Alsama Tours privacy policy for website forms, travel requests and communications.";
  return "Explore this Costa Rica tour with Alsama Tours, including local booking support, transportation planning and trip coordination.";
}

function withSeo(html, pathname) {
  const canonical = `https://alsamatourscr.com${pathname}`;
  const title = titleFromPath(pathname);
  const description = descriptionFromPath(pathname);

  return html
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${escapeHtml(description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${escapeHtml(description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${escapeHtml(description)}" />`);
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

    // Support both /route/ and extensionless /route on GitHub Pages.
    await writeFile(path.join(dir, "index.html"), routeHtml);
    await writeFile(path.join("dist", `${clean}.html`), routeHtml);
  }
}

await mkdir("dist/.openai", { recursive: true });
await mkdir("dist/server", { recursive: true });
await copyFile(".openai/hosting.json", "dist/.openai/hosting.json");
await writeFile("dist/index.js", source);
await writeFile("dist/server/index.js", source);
await writeStaticRouteEntrypoints();
