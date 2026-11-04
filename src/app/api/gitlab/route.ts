import { NextResponse } from "next/server";
import { fetchGitLabMergeRequests } from "@/lib/gitlab";

export async function GET() {
  try {
    const mrs = await fetchGitLabMergeRequests();
    return NextResponse.json(mrs);
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}

