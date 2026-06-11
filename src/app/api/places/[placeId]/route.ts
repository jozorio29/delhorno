import { NextResponse } from "next/server";

type GooogleReview = {
  author_name: string;
  rating: number;
  relative_time_description: string;
  text: string;
  profile_photo_url?: string;
};

type PlaceDetailsResponse = {
  result?: {
    name?: string;
    rating?: number;
    user_ratings_total?: number;
    reviews?: GooogleReview[];
  };
  status?: string;
  error_message?: string;
};

export async function GET(
  _req: Request,
  context: { params: Promise<{ placeId: string }> }
) {
  const { placeId } = await context.params;
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Falta GOOGLE_MAPS_API_KEY" },
      { status: 500 }
    );
  }
  const decodedId = decodeURIComponent(placeId);

  const fields = ["name", "rating", "user_ratings_total", "reviews"].join(",");

  const qs = new URLSearchParams({
    place_id: decodedId,
    fields,
    key: apiKey,
    language: "es",
    reviews_sort: "newest", // ordena reseñas
  });

  const url = `https://maps.googleapis.com/maps/api/place/details/json?${qs.toString()}`;

  const res = await fetch(url, { next: { revalidate: 60 * 60 } });
  const data: PlaceDetailsResponse = await res.json();

  if (data.status !== "OK") {
    return NextResponse.json(
      {
        error: "Google Places error",
        status: data.status,
        message: data.error_message,
      },
      { status: 400 }
    );
  }

  return NextResponse.json(data.result, { status: 200 });
}
