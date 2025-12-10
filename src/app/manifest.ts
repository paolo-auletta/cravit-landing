import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cravit - Find your Next Craving",
    short_name: "Cravit",
    description:
      "Discover, rate, and explore restaurants effortlessly with Cravit's curated food journaling app.",
    start_url: "/",
    display: "standalone",
    background_color: "#FDF8F3",
    theme_color: "#FF6B35",
    orientation: "portrait",
    categories: ["food", "lifestyle", "social"],
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
