import { cookies, headers } from "next/headers";
import type { Language } from "@/lib/language-context";

export async function getRequestLanguage(): Promise<Language> {
  const cookieStore = await cookies();
  const cookieLanguage = cookieStore.get("language")?.value;

  if (cookieLanguage === "es" || cookieLanguage === "en") {
    return cookieLanguage;
  }

  const requestHeaders = await headers();
  const browserLanguage = requestHeaders.get("accept-language") ?? "";

  return /(^|,)\s*es(?:-|;|,|$)/i.test(browserLanguage) ? "es" : "en";
}
