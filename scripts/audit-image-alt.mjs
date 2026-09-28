import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else if (/\.(jsx|tsx|html)$/.test(entry.name)) files.push(full);
  }
  return files;
}

const files = await walk("src");
files.push("index.html", "public/404.html");

const issues = [];
let total = 0;
let decorative = 0;

for (const file of files) {
  const source = await readFile(file, "utf8");
  const tags = source.match(/<img\b[\s\S]*?\/>/g) || [];

  for (const tag of tags) {
    total += 1;
    const hasAlt = /\balt\s*=/.test(tag);
    const emptyAlt = /\balt\s*=\s*(?:""|''|\{\s*""\s*\}|\{\s*''\s*\})/.test(tag);
    const hidden = /\baria-hidden\s*=\s*(?:"true"|'true'|\{true\})/.test(tag);

    if (!hasAlt) issues.push(`${file}: <img> is missing alt`);
    if (emptyAlt && !hidden) issues.push(`${file}: empty alt is only allowed on explicitly decorative images`);
    if (emptyAlt && hidden) decorative += 1;
  }
}

console.log(`Image ALT audit: ${total} <img> elements, ${decorative} explicitly decorative.`);
if (issues.length) {
  console.error(issues.join("\n"));
  process.exit(1);
}
console.log("All <img> elements have valid ALT handling.");
