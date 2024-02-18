import { connectDatabase } from "@/config/databaseConnection";
import { NextRequest, NextResponse } from "next/server";

connectDatabase();

export async function POST(request: NextRequest) {
  try {
    const requestFromBody = await request.json();

    const { fullname, email, password, username } = requestFromBody;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
