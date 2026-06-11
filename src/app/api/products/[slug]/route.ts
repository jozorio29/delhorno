import { connectToDB } from "@/lib/db";
import { Product } from "@/models/Products";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  await connectToDB();
  const product = await Product.findOne({ slug }).lean();
  if (!product) {
    return new NextResponse("No se encontro el producto", { status: 404 });
  }
  return NextResponse.json(product);
}
