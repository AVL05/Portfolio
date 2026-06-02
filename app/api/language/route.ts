import { NextRequest, NextResponse } from "next/server";
import type { Language } from "@/lib/language-context";

const isLanguage = (value: string | null): value is Language =>
  value === "es" || value === "en";

const getSafeNextPath = (value: string | null) => {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/";
  }

  return value;
};

export function GET(request: NextRequest) {
  const langParam = request.nextUrl.searchParams.get("lang");
  const language: Language = isLanguage(langParam) ? langParam : "es";
  const nextPath = getSafeNextPath(request.nextUrl.searchParams.get("next"));
  const response = NextResponse.redirect(new URL(nextPath, request.nextUrl.origin));

  response.cookies.set("language", language, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
