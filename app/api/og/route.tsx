import { ImageResponse } from "next/og";

const translations = {
  es: {
    subtitle: "Desarrollador Web Full-Stack Junior",
    stack: "React, Next.js, PHP y Laravel · Valencia",
  },
  en: {
    subtitle: "Junior Full-Stack Web Developer",
    stack: "React, Next.js, PHP and Laravel · Valencia",
  },
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // ?lang=es|en
    const lang = (searchParams.get("lang") ||
      "es") as keyof typeof translations;
    const t = translations[lang] || translations.es;

    // ?title=<title>
    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "Alex Vicente López";

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f0e0d",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #2a2724",
            padding: "60px 80px",
            borderRadius: "20px",
            backgroundColor: "#161513",
          }}
        >
          <div
            style={{
              fontSize: 60,
              fontWeight: "bold",
              color: "#ece8e1",
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 24,
              maxWidth: 900,
              textAlign: "center",
              color: "#e0956a",
              letterSpacing: "0.03em",
              textTransform: "uppercase",
            }}
          >
            {t.subtitle}
          </div>
          <div style={{ fontSize: 22, marginTop: 18, color: "#9d968c", textAlign: "center" }}>
            {t.stack}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 20,
            color: "#9d968c",
          }}
        >
          aleviclop.dev
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    );
  } catch {
    return new Response("Failed to generate the image", {
      status: 500,
    });
  }
}
