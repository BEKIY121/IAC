import { NextResponse } from "next/server";
import { getContent, addCollectionItem } from "@/lib/content";
import { COLLECTIONS, type ContentCollection } from "@/lib/types";

function isCollection(value: string): value is ContentCollection {
  return COLLECTIONS.includes(value as ContentCollection);
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ collection: string }> }
) {
  const { collection } = await params;
  if (!isCollection(collection)) {
    return NextResponse.json({ error: "Invalid collection" }, { status: 400 });
  }

  const content = await getContent();
  return NextResponse.json(content[collection]);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ collection: string }> }
) {
  const { collection } = await params;
  if (!isCollection(collection)) {
    return NextResponse.json({ error: "Invalid collection" }, { status: 400 });
  }

  try {
    const item = await request.json();
    const newItem = await addCollectionItem(collection, item);
    return NextResponse.json({ success: true, item: newItem }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Create failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
