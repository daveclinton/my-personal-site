import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title");
    const date = searchParams.get("date");

    if (!title) {
      return new Response("Missing title parameter", { status: 400 });
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            backgroundColor: "#fff", // fallback color
            backgroundImage:
              "radial-gradient(ellipse at right, #374151, #111827, #000000)", // radial gradient
            color: "#000", // text color
            padding: "40px",
          }}
        >
          <div
            style={{
              fontSize: 60,
              fontWeight: "bold",
              color: "#fff",
              marginBottom: "20px",
              lineHeight: 1.2,
            }}
          >
            {title}
          </div>
          {date && (
            <div style={{ fontSize: 30, color: "#fff" }}>
              {new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          )}
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              right: "40px",
              fontSize: 24,
              color: "#fff",
            }}
          >
            By David Clinton
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
