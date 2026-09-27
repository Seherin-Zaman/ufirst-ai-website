import { ImageResponse } from "next/og";

export const alt = "uFirst.Ai — AI-Powered Business Automation Platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #06173b 0%, #0b2554 60%, #123872 100%)",
          color: "#f3f7fd",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 56, height: 56, borderRadius: 999, background: "linear-gradient(180deg, #4ba3db, #22406a)", display: "flex" }} />
          <div style={{ fontSize: 44, fontWeight: 700, display: "flex" }}>
            uFirst<span style={{ color: "#6fd0fb", marginLeft: 12 }}>AI</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, maxWidth: 950, display: "flex" }}>
            Build Smarter. Automate Faster. Scale with AI.
          </div>
          <div style={{ fontSize: 32, color: "#b3c3de", display: "flex" }}>
            AI Agents, Automation and Custom AI Solutions
          </div>
        </div>
      </div>
    ),
    size,
  );
}
