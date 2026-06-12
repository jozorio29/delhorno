import Contacto from "@/components/Contacto";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Opiniones from "@/components/Opiniones";
import Promos from "@/components/Promos";
import { siteConfig } from "@/lib/site";

export default function Home() {
  const PLACE_ID = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID ?? "";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "LocalBusiness"],
    "@id": `${siteConfig.url}/#restaurant`,
    name: siteConfig.name,
    image: `${siteConfig.url}/del-horno-brand-v2.png`,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    priceRange: "$$",
    servesCuisine: ["Pizza", "Comida italiana", "Cerveza"],
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressCountry: siteConfig.address.country,
    },
    areaServed: {
      "@type": "City",
      name: "Encarnación",
    },
    sameAs: [siteConfig.social.instagram, siteConfig.social.facebook],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday"],
        opens: "09:30",
        closes: "13:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday"],
        opens: "19:00",
        closes: "23:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Friday", "Saturday"],
        opens: "09:30",
        closes: "13:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Friday", "Saturday"],
        opens: "19:00",
        closes: "23:59",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "19:00",
        closes: "23:00",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
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
