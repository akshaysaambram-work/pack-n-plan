import arcjet, { validateEmail } from "@arcjet/next";
import { NextRequest, NextResponse } from "next/server";

const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    validateEmail({
      mode: "LIVE",
      deny: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
    }),
  ],
});

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const decision = await aj.protect(req, {
    email,
  });

  if (decision.isDenied()) {
    return NextResponse.json({ status: 403 });
  }

  return NextResponse.json({
    status: 200,
  });
}
