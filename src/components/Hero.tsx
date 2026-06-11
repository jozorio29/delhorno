import Link from "next/link";

const STATS = [
  { value: "4.9", label: "valoración" },
  { value: "30 min", label: "entrega" },
  { value: "+900", label: "pedidos" },
];

const Hero = () => {
  return (
    <section className="hero-section relative flex min-h-[calc(100dvh-5rem)] items-center overflow-hidden text-center">
      <div className="container-shell relative z-10 w-full py-12 md:py-16">
        <div className="hero-fade mx-auto max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.25em] text-[var(--brand)]">
            ENCARNACIÓN · PARAGUAY
          </p>
          <h1 className="mt-5 text-4xl leading-tight md:text-6xl">
            Del Horno
            <br />a tu mesa
          </h1>
          <p className="section-copy mx-auto mt-5 max-w-md text-base md:text-lg">
            Masa artesanal, suave y hecha con pasión.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/menu"
              className="rounded-full bg-[var(--brand)] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-deep)]"
            >
              Hacer mi pedido
            </Link>
          </div>

          <div className="mt-10 flex items-center justify-center gap-8 md:gap-12">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-sm">
                <span className="font-semibold text-[var(--text)]">
                  {stat.value}
                </span>{" "}
                <span className="text-[var(--muted)]">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
