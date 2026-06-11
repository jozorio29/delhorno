import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Historia from "@/components/Historia";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Historia | Del Horno",
  description:
    "Un viaje de tres años para una sola receta: el origen de Del Horno.",
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
