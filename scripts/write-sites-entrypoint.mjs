import { copyFile, mkdir, writeFile } from "node:fs/promises";

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

await mkdir("dist/.openai", { recursive: true });
await mkdir("dist/server", { recursive: true });
await copyFile(".openai/hosting.json", "dist/.openai/hosting.json");
await writeFile("dist/index.js", source);
await writeFile("dist/server/index.js", source);