import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/db";
import { workspacesTable } from "@/db/schema";

export async function POST(request: NextRequest) {
  const { name } = await request.json();
  console.log(name);
  return NextResponse.json({ message: "Workspace created" });
}

export async function GET() {
  try {
    const workspaces = await db.select().from(workspacesTable);
    return NextResponse.json(workspaces);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch workspaces" },
      { status: 500 }
    );
  }
}
