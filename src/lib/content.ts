import { promises as fs } from "fs";
import path from "path";
import { defaultContent } from "./seed";
import type { SiteContent, ContentCollection } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const CONTENT_FILE = path.join(DATA_DIR, "content.json");

let cache: SiteContent | null = null;

async function ensureDataFile(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(CONTENT_FILE);
  } catch {
    await fs.writeFile(
      CONTENT_FILE,
      JSON.stringify(defaultContent, null, 2),
      "utf-8"
    );
  }
}

export async function getContent(): Promise<SiteContent> {
  if (cache) return cache;
  await ensureDataFile();
  const raw = await fs.readFile(CONTENT_FILE, "utf-8");
  cache = JSON.parse(raw) as SiteContent;
  return cache;
}

export async function saveContent(content: SiteContent): Promise<void> {
  await ensureDataFile();
  await fs.writeFile(CONTENT_FILE, JSON.stringify(content, null, 2), "utf-8");
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
