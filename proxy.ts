import arcjet, { createMiddleware, detectBot, shield } from "@arcjet/next";

const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    shield({
      mode: "LIVE",
    }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE", "TWITTER_CRAWLER"],
    }),
  ],
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

export default createMiddleware(aj);
