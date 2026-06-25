import { NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/content";
import type { ContactSubmission } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Omit<
      ContactSubmission,
      "id" | "createdAt"
    >;

    if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const content = await getContent();
    const submission: ContactSubmission = {
      id: crypto.randomUUID(),
      name: body.name.trim(),
      email: body.email.trim(),
      subject: body.subject?.trim() || "General Inquiry",
      message: body.message.trim(),
      createdAt: new Date().toISOString(),
    };

    content.contactSubmissions.unshift(submission);
    await saveContent(content);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Submission failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
