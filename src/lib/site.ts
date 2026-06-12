const configuredUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  process.env.VERCEL_URL;

const normalizedUrl = configuredUrl
  ? configuredUrl.startsWith("http")
    ? configuredUrl
    : `https://${configuredUrl}`
  : "http://localhost:3000";

export const siteConfig = {
  name: "Del Horno Pizzería",
  shortName: "Del Horno",
  description:
    "Pizzas artesanales a la piedra, cerveza y delivery en Encarnación, Paraguay.",
  url: normalizedUrl.replace(/\/$/, ""),
  locale: "es_PY",
  phone: "+595982000763",
  address: {
    street: "14 de Mayo",
    city: "Encarnación",
    country: "PY",
  },
  social: {
    instagram: "https://www.instagram.com/delhornopizzeria/",
    facebook:
      "https://www.facebook.com/people/Del-Horno-Pizzeria/61582955600278/",
  },
};
