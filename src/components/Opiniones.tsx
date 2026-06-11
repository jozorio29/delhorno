"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n/LanguageProvider";

type Review = {
  author_name: string;
  rating: number;
  relative_time_description: string;
  text: string;
  profile_photo_url?: string;
};

type PlaceVM = {
  name: string;
  rating: number;
  user_ratings_total: number;
  reviews: Review[];
};

const Opiniones = ({
  placeId,
  limit,
}: {
  placeId: string;
  limit?: number;
}) => {
  const { t } = useI18n();
  const [data, setData] = useState<PlaceVM | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!placeId || placeId.startsWith("http")) return;

    const controller = new AbortController();

    async function loadPlace() {
      try {
        const res = await fetch(
          `/api/places/${encodeURIComponent(placeId)}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("No se pudieron cargar las reseñas");

        setData(await res.json());
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error(error);
          setHasError(true);
        }
      }
    }

    loadPlace();
    return () => controller.abort();
  }, [placeId]);

  if (!placeId) {
    console.error("❌ Falta placeId en <Opiniones />");
    return null;
  }
  if (placeId.startsWith("http")) {
    console.error(
      "❌ placeId parece ser una URL, no un Google Place ID:",
      placeId
    );
    return null;
  }

  return (
    <section id="opiniones" className="container-shell reveal py-16 md:py-20">
      <div className="reveal reveal-1 mb-10">
        <p className="text-xs font-bold tracking-[0.2em] text-[#ad4f2b] dark:text-[#e08a6a]">
          {t("reviews_eyebrow")}
        </p>
        <h2 className="section-title mt-2">{t("reviews_title")}</h2>
        {data && (
          <p className="mt-3 text-base text-[var(--muted)]">
            ⭐ {data.rating.toFixed(1)} · {data.user_ratings_total}{" "}
            {t("reviews_count")}
          </p>
        )}
        {!data && !hasError && (
          <p className="mt-3 text-base text-[var(--muted)]">
            {t("reviews_loading")}
          </p>
        )}
      </div>

      {data && (
        <div className="stagger-grid grid gap-8 md:grid-cols-3">
          {data.reviews
            .filter((r) => r.text && r.text.trim() !== "")
            .slice(0, limit)
            .map((review, i) => (
              <article
                key={`${review.author_name}-${i}`}
                className="glass-surface flex flex-col justify-between rounded-2xl p-6"
              >
                <div className="mb-4 flex items-center gap-4">
                  {review.profile_photo_url ? (
                    <Image
                      src={review.profile_photo_url}
                      alt={review.author_name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-zinc-300" />
                  )}
                  <div>
                    <div className="font-semibold">{review.author_name}</div>
                    <div className="text-xs text-[var(--muted)]">
                      {review.relative_time_description}
                    </div>
                  </div>
                </div>
                <div className="mb-4 text-lg text-amber-500">
                  {"★".repeat(Math.round(review.rating))}
                  {"☆".repeat(5 - Math.round(review.rating))}
                </div>
                <p className="flex-1 text-center leading-relaxed text-zinc-800 dark:text-zinc-200">
                  {review.text}
                </p>
              </article>
            ))}
        </div>
      )}
    </section>
  );
};

export default Opiniones;
