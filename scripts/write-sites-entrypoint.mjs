import { copyFile, mkdir, writeFile } from "node:fs/promises";

const source = `export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);

    if (response.status !== 404 || request.method !== "GET") {
      return response;
    }

    const accept = request.headers.get("accept") || "";
    if (!accept.includes("text/html")) {
      return response;
    }

    const url = new URL(request.url);
    url.pathname = "/";
    url.search = "";

    return env.ASSETS.fetch(new Request(url, request));
  }
};
`;

await mkdir("dist/.openai", { recursive: true });
await copyFile(".openai/hosting.json", "dist/.openai/hosting.json");
await writeFile("dist/index.js", source);