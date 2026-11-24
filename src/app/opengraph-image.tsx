import { ImageResponse } from "next/og";

export const alt = "JEONSEONG — Java Spring Backend Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 78px",
        background: "linear-gradient(135deg, #f5f5f7 0%, #e7efff 58%, #f3e7ff 100%)",
        color: "#1d1d1f",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, fontWeight: 700 }}>
        <span>JEONSEONG</span><span>PORTFOLIO · 2026</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ color: "#0071e3", fontSize: 30, fontWeight: 700 }}>BACKEND DEVELOPER</span>
        <strong style={{ marginTop: 18, fontSize: 86, lineHeight: 1.02, letterSpacing: "-4px" }}>
          Java · Spring<br />to user experience.
        </strong>
      </div>
      <div style={{ display: "flex", gap: 24, color: "#55555a", fontSize: 22 }}>
        <span>DONDOK</span><span>DEVNEAR</span><span>API · DATA · FLOW</span>
      </div>
    </div>,
    size,
  );
}
