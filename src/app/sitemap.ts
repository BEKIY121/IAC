import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { siteConfig } = await getContent();
  const base = siteConfig.url.replace(/\/$/, "");

  const routes = [
    "",
    "/about/",
    "/programs/",
    "/services/",
    "/startups/",
    "/resources/",
    "/news/",
    "/contact/",
    "/apply/",
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/news/" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
