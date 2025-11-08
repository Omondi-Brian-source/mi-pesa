import { NextRequest, NextResponse } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const auth = NextAuth(authConfig) as any;

export { auth };

export async function GET(req: NextRequest, context: any) {
  return auth.handler(req, context);
}

export async function POST(req: NextRequest, context: any) {
  return auth.handler(req, context);
}
