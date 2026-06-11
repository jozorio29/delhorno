"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";

const PROMOS = [
  {
    id: "students",
    image: "/promo-students.jpg",
    alt: "Pizza grande en el salón de Del Horno",
    eyebrow: "Promo estudiantes",
    title: "Ahorrá Gs. 10.000",
    description: "En pizzas XL, cualquier sabor.",
    detail: "De 09:00 a 14:00",
    href: "/arma-tu-pizza",
    action: "Elegir mi pizza",
    accent: "bg-[#285721]",
    imagePosition: "object-center",
  },
  {
    id: "beer",
    image: "/promo-beer.jpg",
    alt: "Dos chopps de cerveza brindando",
    eyebrow: "Hoy la segunda va gratis",
    title: "2x1 en Chopp Munich",
    description: "Los martes son para disfrutar.",
    detail: "Todos los martes",
    href: "/menu#cervezas",
    action: "Ver cervezas",
    accent: "bg-[#8b1718]",
    imagePosition: "object-center",
  },
  {
    id: "pizza-friday",
    image: "/promo-pizza-friday.jpg",
    alt: "Pizza clásica compartida entre varias personas",
    eyebrow: "Sabores clásicos",
    title: "Viernes de Pizza Corrida",
    description: "Gs. 50.000 por persona.",
    detail: "De 11:30 a 13:00",
    href: "/arma-tu-pizza",
    action: "Ver sabores",
    accent: "bg-[#8b1718]",
    imagePosition: "object-center",
  },
];

const AUTOPLAY_DELAY = 6000;

const Promos = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + PROMOS.length) % PROMOS.length);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % PROMOS.length);
  }, []);

  const goPrevious = useCallback(() => {
    setActiveIndex(
      (current) => (current - 1 + PROMOS.length) % PROMOS.length
    );
  }, []);

  // El autoplay lo dispara la barra de progreso del dot activo (onAnimationEnd),
  // así la animación y el cambio de slide quedan perfectamente sincronizados.

  return (
    <section id="promos" className="container-shell reveal py-16 md:py-20">
      <div className="reveal reveal-1 mb-8">
        <p className="text-xs font-bold tracking-[0.24em] text-[var(--brand)]">
          PROMOCIONES
        </p>
        <h2 className="section-title mt-2">Siempre hay una buena excusa</h2>
        <p className="section-copy mt-3 max-w-xl">
          Beneficios para compartir, disfrutar y volver más seguido.
        </p>
      </div>

      <div
        role="region"
        aria-roledescription="carrusel"
        aria-label="Promociones de Del Horno"
        tabIndex={0}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setIsPaused(false);
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") goPrevious();
          if (event.key === "ArrowRight") goNext();
        }}
        onTouchStart={(event) => {
          touchStartX.current = event.touches[0]?.clientX ?? null;
          setIsPaused(true);
        }}
        onTouchEnd={(event) => {
          const startX = touchStartX.current;
          const endX = event.changedTouches[0]?.clientX;
          touchStartX.current = null;
          setIsPaused(false);

          if (startX == null || endX == null) return;
          const distance = endX - startX;
          if (Math.abs(distance) < 45) return;
          if (distance > 0) goPrevious();
          else goNext();
        }}
        className="relative overflow-hidden rounded-3xl bg-[#28150f] shadow-[0_20px_60px_rgba(74,38,22,0.16)] outline-none ring-[var(--brand)] focus-visible:ring-2"
      >
        <div className="relative min-h-[560px] md:min-h-[520px]">
          {PROMOS.map((promo, index) => {
            const isActive = index === activeIndex;

            return (
              <article
                key={promo.id}
                aria-hidden={!isActive}
                aria-label={`${index + 1} de ${PROMOS.length}`}
                className={`absolute inset-0 transition duration-700 ease-out ${
                  isActive
                    ? "z-10 translate-x-0 opacity-100"
                    : "pointer-events-none z-0 translate-x-8 opacity-0"
                }`}
              >
                <Image
                  src={promo.image}
                  alt={promo.alt}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 1280px"
                  className={`object-cover ${promo.imagePosition}`}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20 md:hidden" />

                <div className="relative flex min-h-[560px] items-end p-6 pb-20 text-white md:min-h-[520px] md:items-center md:p-14 lg:p-16">
                  <div className="max-w-xl">
                    <span
                      className={`inline-flex rounded-md px-4 py-2 text-xs font-black uppercase tracking-[0.16em] ${promo.accent}`}
                    >
                      {promo.eyebrow}
                    </span>
                    <h3 className="mt-5 text-4xl font-bold leading-[0.95] text-[#fff8e9] md:text-6xl">
                      {promo.title}
                    </h3>
                    <p className="mt-4 text-lg font-semibold text-white/90 md:text-2xl">
                      {promo.description}
                    </p>
                    <p className="mt-2 text-sm font-medium text-white/70 md:text-base">
                      {promo.detail}
                    </p>
                    <Link
                      href={promo.href}
                      tabIndex={isActive ? 0 : -1}
                      className="mt-7 inline-flex rounded-full bg-[#fff8e9] px-6 py-3 text-sm font-bold text-[#7e2f1d] transition hover:bg-white"
                    >
                      {promo.action}
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <button
          type="button"
          onClick={goPrevious}
          aria-label="Promoción anterior"
          className="absolute left-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-sm transition hover:bg-[var(--brand)] md:grid"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Siguiente promoción"
          className="absolute right-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-sm transition hover:bg-[var(--brand)] md:grid"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>

        <div
          className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/30 px-3 py-2 backdrop-blur-sm"
          role="tablist"
          aria-label="Elegir promoción"
        >
          {PROMOS.map((promo, index) => (
            <button
              type="button"
              key={promo.id}
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Mostrar promoción ${index + 1}: ${promo.title}`}
              onClick={() => goTo(index)}
              className={`h-2.5 overflow-hidden rounded-full transition-all ${
                index === activeIndex
                  ? "w-8 bg-white/30"
                  : "w-2.5 bg-white/45 hover:bg-white/75"
              }`}
            >
              {index === activeIndex && (
                <span
                  key={activeIndex}
                  onAnimationEnd={goNext}
                  className="promo-progress block h-full w-full rounded-full bg-[#fff8e9]"
                  style={{
                    animationDuration: `${AUTOPLAY_DELAY}ms`,
                    animationPlayState: isPaused ? "paused" : "running",
                  }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="absolute right-5 top-5 z-20 rounded-full bg-black/35 px-3 py-1.5 text-xs font-bold text-white/90 backdrop-blur-sm">
          {activeIndex + 1} / {PROMOS.length}
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-[var(--muted)] md:hidden">
        Deslizá hacia los lados para ver más promociones.
      </p>
    </section>
  );
};

export default Promos;
