import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const toursDir = path.join(rootDir, "public", "img", "tours");
const outputPath = path.join(rootDir, "src", "lib", "tourGalleryManifest.js");
const imageExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"]);

async function listImages(folder) {
  const entries = await readdir(folder, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && imageExtensions.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
}

async function buildManifest() {
  const manifest = {};
  const origins = await readdir(toursDir, { withFileTypes: true });

  for (const origin of origins) {
    if (!origin.isDirectory()) continue;

    const originDir = path.join(toursDir, origin.name);
    const tourFolders = await readdir(originDir, { withFileTypes: true });

    for (const tourFolder of tourFolders) {
      if (!tourFolder.isDirectory()) continue;

      const galleryKey = `${origin.name}/${tourFolder.name}`;
      const images = await listImages(path.join(originDir, tourFolder.name));

      if (images.length) {
        manifest[galleryKey] = images.map((image) => `img/tours/${galleryKey}/${image}`);
      }
    }
  }

  const source = `export const tourGalleryManifest = ${JSON.stringify(manifest, null, 2)};\n`;
  await writeFile(outputPath, source, "utf8");
}

buildManifest().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});