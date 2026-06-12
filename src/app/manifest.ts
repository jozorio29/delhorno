import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Del Horno Pizzería",
    short_name: "Del Horno",
    description:
      "Pizzas artesanales a la piedra, cerveza y delivery en Encarnación.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf6ef",
    theme_color: "#c0542d",
    icons: [
      {
        src: "/favicon.png",
        sizes: "512x362",
        type: "image/png",
      },
    ],
  };
}
