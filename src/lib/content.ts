import { promises as fs } from "fs";
import path from "path";
import { defaultContent } from "./seed";
import type { SiteContent, ContentCollection } from "./types";

const isVercel = process.env.VERCEL === "1";

const BUNDLED_CONTENT_FILE = path.join(process.cwd(), "data", "content.json");
const WRITABLE_DIR = isVercel
  ? path.join("/tmp", "iac-data")
  : path.join(process.cwd(), "data");
const WRITABLE_CONTENT_FILE = path.join(WRITABLE_DIR, "content.json");

let cache: SiteContent | null = null;

async function readJsonFile(filePath: string): Promise<SiteContent | null> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as SiteContent;
  } catch {
    return null;
  }
}

async function ensureWritableContent(): Promise<void> {
  try {
    await fs.mkdir(WRITABLE_DIR, { recursive: true });
  } catch {
    return;
  }

  const existing = await readJsonFile(WRITABLE_CONTENT_FILE);
  if (existing) return;

  const bundled = await readJsonFile(BUNDLED_CONTENT_FILE);
  const initial = bundled ?? structuredClone(defaultContent);

  try {
    await fs.writeFile(
      WRITABLE_CONTENT_FILE,
      JSON.stringify(initial, null, 2),
      "utf-8"
    );
  } catch {
    // Read-only filesystem (e.g. some serverless environments)
  }
}

export async function getContent(): Promise<SiteContent> {
  if (cache) return cache;

  await ensureWritableContent();

  const fromWritable = await readJsonFile(WRITABLE_CONTENT_FILE);
  if (fromWritable) {
    cache = fromWritable;
    return cache;
  }

  const fromBundled = await readJsonFile(BUNDLED_CONTENT_FILE);
  if (fromBundled) {
    cache = fromBundled;
    return cache;
  }

  cache = structuredClone(defaultContent);
  return cache;
}

export async function saveContent(content: SiteContent): Promise<void> {
  await ensureWritableContent();

  try {
    await fs.writeFile(
      WRITABLE_CONTENT_FILE,
      JSON.stringify(content, null, 2),
      "utf-8"
    );
  } catch (error) {
    if (!isVercel) throw error;
  }

  cache = content;
}

export function invalidateCache(): void {
  cache = null;
}

export async function getPublishedNews() {
  const content = await getContent();
  return content.news.filter((item) => item.published !== false);
}

export async function addCollectionItem(
  collection: ContentCollection,
  item: Record<string, unknown>
) {
  const content = await getContent();
  const items = content[collection] as Array<{ id: string }>;
  const newItem = {
    ...item,
    id: (item.id as string) || crypto.randomUUID(),
  };
  content[collection] = [...items, newItem] as never;
  await saveContent(content);
  return newItem;
}

export async function updateCollectionItem(
  collection: ContentCollection,
  id: string,
  updates: Record<string, unknown>
) {
  const content = await getContent();
  const items = content[collection] as Array<{ id: string }>;
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return null;

  const updated = { ...items[index], ...updates, id };
  const next = [...items];
  next[index] = updated;
  content[collection] = next as never;
  await saveContent(content);
  return updated;
}

export async function deleteCollectionItem(
  collection: ContentCollection,
  id: string
) {
  const content = await getContent();
  const items = content[collection] as Array<{ id: string }>;
  const filtered = items.filter((item) => item.id !== id);
  if (filtered.length === items.length) return false;

  content[collection] = filtered as never;
  await saveContent(content);
  return true;
}
