import { ImageResponse } from "next/og";

export const alt = "Dreli — Own your rhythm";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#f6f0e7",
        color: "#102b3e",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        padding: "70px",
        width: "100%",
      }}
    >
      <div
        style={{
          alignItems: "center",
          display: "flex",
          fontSize: 30,
          fontWeight: 700,
          gap: 12,
        }}
      >
        <span
          style={{
            alignItems: "center",
            background: "#167788",
            borderRadius: 12,
            color: "#fffdf9",
            display: "flex",
            height: 42,
            justifyContent: "center",
            width: 42,
          }}
        >
          d
        </span>
        dreli
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ color: "#53705b", fontSize: 22, letterSpacing: 3 }}>
          OWN YOUR RHYTHM
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "serif",
            fontSize: 76,
            letterSpacing: -3,
            lineHeight: 1.05,
            marginTop: 22,
          }}
        >
          Menos abas abertas.
          <br />
          Mais espaço na cabeça.
        </div>
      </div>
      <div style={{ color: "#68716b", display: "flex", fontSize: 24 }}>
        Seu espaço pessoal para o que importa.
      </div>
    </div>,
  );
}
