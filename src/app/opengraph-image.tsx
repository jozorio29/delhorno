import { ImageResponse } from "next/og";

export const alt = "Del Horno Pizzería en Encarnación";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background:
            "radial-gradient(circle at center, #fff8ed 0%, #f4e4cf 58%, #e7cdb1 100%)",
          color: "#21150d",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          padding: "70px",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "#c0542d",
            display: "flex",
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: 8,
          }}
        >
          ENCARNACIÓN · PARAGUAY
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "serif",
            fontSize: 96,
            fontWeight: 700,
            marginTop: 30,
          }}
        >
          Del Horno Pizzería
        </div>
        <div
          style={{
            color: "#765f4b",
            display: "flex",
            fontSize: 34,
            marginTop: 22,
          }}
        >
          Pizza artesanal a la piedra, cerveza y delivery
        </div>
      </div>
    ),
    size
  );
}
