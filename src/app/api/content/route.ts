import { NextResponse } from "next/server";
import { getContent } from "@/lib/content";

export async function GET() {
  const content = await getContent();
  const { contactSubmissions, applicationSubmissions, ...publicContent } =
    content;

  return NextResponse.json({
    ...publicContent,
    news: publicContent.news.filter((item) => item.published !== false),
  });
}
