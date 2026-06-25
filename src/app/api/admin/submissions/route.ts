import { NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/content";

export async function GET() {
  const content = await getContent();
  return NextResponse.json({
    contactSubmissions: content.contactSubmissions,
    applicationSubmissions: content.applicationSubmissions,
  });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const id = searchParams.get("id");

  if (!type || !id || (type !== "contact" && type !== "application")) {
    return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
  }

  const content = await getContent();

  if (type === "contact") {
    content.contactSubmissions = content.contactSubmissions.filter(
      (s) => s.id !== id
    );
  } else {
    content.applicationSubmissions = content.applicationSubmissions.filter(
      (s) => s.id !== id
    );
  }

  await saveContent(content);

  return NextResponse.json({ success: true });
}
