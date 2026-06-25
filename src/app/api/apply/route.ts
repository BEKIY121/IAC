import { NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/content";
import type { ApplicationSubmission } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Omit<
      ApplicationSubmission,
      "id" | "createdAt"
    >;

    if (
      !body.founderName?.trim() ||
      !body.email?.trim() ||
      !body.startupName?.trim() ||
      !body.pitch?.trim()
    ) {
      return NextResponse.json(
        { error: "Required fields are missing" },
        { status: 400 }
      );
    }

    const content = await getContent();
    const submission: ApplicationSubmission = {
      id: crypto.randomUUID(),
      founderName: body.founderName.trim(),
      email: body.email.trim(),
      startupName: body.startupName.trim(),
      program: body.program?.trim() || "",
      sector: body.sector?.trim() || "",
      stage: body.stage?.trim() || "",
      pitch: body.pitch.trim(),
      website: body.website?.trim(),
      createdAt: new Date().toISOString(),
    };

    content.applicationSubmissions.unshift(submission);
    await saveContent(content);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Submission failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
