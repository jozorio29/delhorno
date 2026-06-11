import { connectToDB } from "@/lib/db";
import { Product } from "@/models/Products";
import { NextResponse } from "next/server";
import { FilterQuery } from "mongoose";

export async function GET(req: Request) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const isFeatured = searchParams.get("featured");
    const tag = searchParams.get("tag");

    const query: FilterQuery<typeof Product> = { inStock: true };
    if (isFeatured) {
      query.isFeatured = true;
    }
    if (tag) {
      query.tags = tag;
    }

    const products = await Product.find(query)
      .populate("category", "name slug")
      .sort({ "category.slug": 1, name: 1, isFeatured: -1 })
      .lean();
    return NextResponse.json(products);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected products error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
