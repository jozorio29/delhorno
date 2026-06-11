import { model, models, Schema } from "mongoose";
import "./Category";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    inStock: { type: Boolean, default: true },
    tags: { type: [String], default: [] },
    isFeatured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Product = models.Product || model("Product", ProductSchema);
