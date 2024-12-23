import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    nextAuthSecret: process.env.NEXTAUTH_SECRET ? "Set" : "Not set",
    nextAuthUrl: process.env.NEXTAUTH_URL ? "Set" : "Not set",
    databaseUrl: process.env.DATABASE_URL ? "Set" : "Not set",
  });
} 