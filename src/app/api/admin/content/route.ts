import { NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/content";
import type { SiteConfig } from "@/lib/types";

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

export async function PATCH(request: Request) {
  try {
    const body = (await request.json()) as { siteConfig?: SiteConfig };
    const content = await getContent();

    if (body.siteConfig) {
      content.siteConfig = { ...content.siteConfig, ...body.siteConfig };
    }

    await saveContent(content);
    return NextResponse.json({ success: true, siteConfig: content.siteConfig });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Update failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
