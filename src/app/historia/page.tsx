import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Historia from "@/components/Historia";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Nuestra historia",
  description:
    "Un viaje de tres años para una sola receta: el origen de Del Horno.",
  alternates: {
    canonical: "/historia",
  },
  openGraph: {
    title: "Nuestra historia | Del Horno Pizzería",
    description:
      "Un viaje de tres años para una sola receta: el origen de Del Horno.",
    url: "/historia",
  },
};

export default function HistoriaPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-dvh">
        <Historia />
      </main>
      <Footer />
    </>
  );
}
