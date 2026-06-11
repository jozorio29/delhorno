import "server-only";
import { FilterQuery } from "mongoose";
import { connectToDB } from "./db";
import { Product as ProductModel } from "@/models/Products";

export interface Product {
  _id: string;
  title?: string;
  name?: string;
  desc?: string;
  price: number | string;
  image?: string;
  slug?: string;
  category?: {
    _id?: string;
    name: string;
    slug: string;
  };
  inStock?: boolean;
  tags?: string[];
  featured?: boolean;
  isFeatured?: boolean;
}

export interface CardVM {
  id: string;
  title: string;
  desc: string;
  img: string;
  priceText: string;
  badge?: string;
  slug?: string;
}

function toPlainProducts(products: unknown): Product[] {
  return JSON.parse(JSON.stringify(products)) as Product[];
}

async function findProducts(query: FilterQuery<typeof ProductModel> = {}) {
  await connectToDB();

  const products = await ProductModel.find({ inStock: true, ...query })
    .populate("category", "name slug")
    .sort({ "category.slug": 1, name: 1, isFeatured: -1 })
    .lean();

  return toPlainProducts(products);
}

export async function getProducts(): Promise<Product[]> {
  return findProducts();
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return findProducts({ isFeatured: true });
}
