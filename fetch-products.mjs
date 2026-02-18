#!/usr/bin/env node

/**
 * GNSS.ae → React Product Exporter
 *
 * ┌─────────────────────────────────────────────┐
 * │  HOW TO RUN                                  │
 * ├─────────────────────────────────────────────┤
 * │  1. Make sure you have Node 18+              │
 * │       node -v                                │
 * │     (If not: https://nodejs.org)             │
 * │                                              │
 * │  2. Open terminal, cd to this file's folder  │
 * │                                              │
 * │  3. Run:                                     │
 * │       node fetch-products.mjs                │
 * │                                              │
 * │  4. Output appears in ./products/            │
 * │       products.json                          │
 * │       categories.json                        │
 * │       images/                                │
 * │                                              │
 * │  No npm install needed. Zero dependencies.   │
 * └─────────────────────────────────────────────┘
 */

import fs from "fs/promises";
import path from "path";
import { createWriteStream } from "fs";
import { Readable } from "stream";
import { pipeline } from "stream/promises";

// ─── Config ────────────────────────────────────────────────────────────────
const BASE_URL   = "https://gnss.ae/wp-json/wp/v2";
const PER_PAGE   = 100;
const OUT_DIR    = "./products";
const IMG_DIR    = path.join(OUT_DIR, "images");
const CONCURRENT = 5;
const POLITE_MS  = 300;

// ─── Helpers ───────────────────────────────────────────────────────────────
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} – ${url}`);
  return {
    data: await res.json(),
    totalPages: parseInt(res.headers.get("x-wp-totalpages") || "1", 10),
    totalItems: parseInt(res.headers.get("x-wp-total") || "0", 10),
  };
}

function stripHTML(html = "") {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&#8217;/g, "\u2019").replace(/&#8216;/g, "\u2018")
    .replace(/&#8220;/g, "\u201C").replace(/&#8221;/g, "\u201D")
    .replace(/&#038;/g, "&").replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function prog(label, done, total) {
  process.stdout.write(`\r   ${label}: ${done}/${total}`);
  if (done === total) process.stdout.write("\n");
}

// ─── 1. Fetch all products ─────────────────────────────────────────────────
async function fetchAllProducts() {
  console.log("\n⏳ Fetching products…");
  const first = await fetchJSON(`${BASE_URL}/product?per_page=${PER_PAGE}&page=1`);
  console.log(`   Found ${first.totalItems} products across ${first.totalPages} page(s).`);

  let all = [...first.data];
  for (let page = 2; page <= first.totalPages; page++) {
    const { data } = await fetchJSON(`${BASE_URL}/product?per_page=${PER_PAGE}&page=${page}`);
    all.push(...data);
    prog("Pages", page, first.totalPages);
    await sleep(POLITE_MS);
  }
  console.log(`✅ Fetched ${all.length} products.`);
  return all;
}

// ─── 2. Resolve media IDs → image URLs ─────────────────────────────────────
async function resolveMedia(ids) {
  const unique = [...new Set(ids.filter(Boolean))];
  console.log(`\n⏳ Resolving ${unique.length} media items…`);
  const map = new Map();

  for (let i = 0; i < unique.length; i += 20) {
    const batch = unique.slice(i, i + 20);
    await Promise.all(
      batch.map(async (id) => {
        try {
          const { data } = await fetchJSON(`${BASE_URL}/media/${id}`);
          map.set(id, {
            url: data.source_url,
            alt: data.alt_text || "",
            width: data.media_details?.width || null,
            height: data.media_details?.height || null,
          });
        } catch (e) {
          console.warn(`\n   ⚠ media/${id}: ${e.message}`);
        }
      })
    );
    prog("Media", Math.min(i + 20, unique.length), unique.length);
    await sleep(POLITE_MS);
  }
  console.log(`✅ Resolved ${map.size}/${unique.length} media items.`);
  return map;
}

// ─── 3. Resolve categories ─────────────────────────────────────────────────
async function resolveCategories(ids) {
  const unique = [...new Set(ids.filter(Boolean))];
  if (!unique.length) return new Map();
  console.log(`\n⏳ Resolving ${unique.length} categories…`);
  const map = new Map();

  for (let i = 0; i < unique.length; i += 100) {
    const batch = unique.slice(i, i + 100);
    try {
      const { data } = await fetchJSON(
        `${BASE_URL}/product_cat?include=${batch.join(",")}&per_page=100`
      );
      for (const c of data) {
        map.set(c.id, { name: c.name, slug: c.slug, parent: c.parent });
      }
    } catch (e) {
      console.warn(`\n   ⚠ categories batch: ${e.message}`);
    }
    await sleep(POLITE_MS);
  }
  console.log(`✅ Resolved ${map.size} categories.`);
  return map;
}

// ─── 4. Download images ────────────────────────────────────────────────────
async function downloadImages(imageQueue) {
  if (!imageQueue.length) return;
  console.log(`\n⏳ Downloading ${imageQueue.length} images…`);
  await fs.mkdir(IMG_DIR, { recursive: true });

  const queue = [...imageQueue];
  let done = 0;
  const total = queue.length;

  async function worker() {
    while (queue.length) {
      const { url, dest } = queue.shift();
      try {
        try { await fs.access(dest); done++; prog("Images", done, total); continue; } catch {}
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        await pipeline(Readable.fromWeb(res.body), createWriteStream(dest));
      } catch (e) {
        console.warn(`\n   ⚠ ${path.basename(dest)}: ${e.message}`);
      }
      done++;
      prog("Images", done, total);
    }
  }

  await Promise.all(Array.from({ length: CONCURRENT }, () => worker()));
  console.log(`✅ Downloaded images.`);
}

// ─── 5. Transform ──────────────────────────────────────────────────────────
function transform(raw, mediaMap, catMap) {
  const imageQueue = [];

  const products = raw.map((p, index) => {
    const media = mediaMap.get(p.featured_media);
    const ext = media?.url
      ? path.extname(new URL(media.url).pathname) || ".jpg"
      : null;
    const localFile = media ? `images/${p.slug}${ext}` : null;

    if (media) {
      imageQueue.push({
        url: media.url,
        dest: path.join(IMG_DIR, `${p.slug}${ext}`),
      });
    }

    return {
      id: index + 1,
      slug: p.slug,
      title: stripHTML(p.title?.rendered),
      excerpt: stripHTML(p.excerpt?.rendered),
      contentHtml: p.content?.rendered || "",
      date: p.date,
      categories: (p.product_cat || []).map(
        (cid) => catMap.get(cid) || { name: "Unknown", slug: "" }
      ),
      brands: (p.brands || []).map((b) => ({ name: b.name, slug: b.slug })),
      image: localFile
        ? { file: localFile, alt: media.alt, width: media.width, height: media.height }
        : null,
    };
  });

  return { products, imageQueue };
}

// ─── Main ──────────────────────────────────────────────────────────────────
async function main() {
  console.log("🚀 GNSS.ae Product Exporter");

  const raw      = await fetchAllProducts();
  const mediaMap = await resolveMedia(raw.map((p) => p.featured_media));
  const catMap   = await resolveCategories(raw.flatMap((p) => p.product_cat || []));

  const { products, imageQueue } = transform(raw, mediaMap, catMap);

  await fs.mkdir(OUT_DIR, { recursive: true });
  await downloadImages(imageQueue);

  const productsPath = path.join(OUT_DIR, "products.json");
  await fs.writeFile(productsPath, JSON.stringify(products, null, 2), "utf-8");
  console.log(`\n📄 ${productsPath}  (${products.length} products)`);

  const catsPath = path.join(OUT_DIR, "categories.json");
  await fs.writeFile(catsPath, JSON.stringify([...catMap.values()], null, 2), "utf-8");
  console.log(`📄 ${catsPath}`);

  console.log("\n────────────────────────────────────────");
  console.log("🎉 All done! Your export is in ./products/");
  console.log("────────────────────────────────────────\n");
}

main().catch((e) => {
  console.error("\n💥 Fatal:", e);
  process.exit(1);
});
