import Contacto from "@/components/Contacto";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Opiniones from "@/components/Opiniones";
import Promos from "@/components/Promos";

export default function Home() {
  const PLACE_ID = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID ?? "";

  return (
    <>
      <Navbar />
      <main className="min-h-dvh text-[var(--text)]">
        <Hero />
        <Promos />
        <Opiniones placeId={PLACE_ID} limit={3} />
        <FAQ />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
