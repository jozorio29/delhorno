require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");

const MENU_IMAGE = "/placeholder.png";

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    desc: { type: String, required: true, default: "" },
    image: { type: String, required: true, default: MENU_IMAGE },
    price: { type: Number, required: true, min: 0 },
    oldPrice: { type: Number, min: 0 },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    inStock: { type: Boolean, default: true },
    tags: { type: [String], default: [] },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Category =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);
const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

const categories = [
  ["Pizzas clasicas", "pizzas-clasicas"],
  ["Pizzas especiales", "pizzas-especiales"],
  ["Pizzas de la casa", "pizzas-de-la-casa"],
  ["Entradas", "entradas"],
  ["Sandwiches", "sandwiches"],
  ["Empanadas", "empanadas"],
  ["Calzones", "calzones"],
  ["Bebidas sin alcohol", "bebidas"],
  ["Tragos", "tragos"],
  ["Cervezas", "cervezas"],
  ["Agregados", "agregados"],
];

function slugify(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function single(category, name, desc, price, options = {}) {
  return {
    name,
    slug: slugify(`${category}-${name}`),
    desc: desc || "Producto de la carta Del Horno.",
    image: options.image ?? MENU_IMAGE,
    price,
    category,
    inStock: true,
    tags: options.tags ?? [],
    isFeatured: options.isFeatured ?? false,
  };
}

function sizedPizza(category, name, desc, xs, xl, options = {}) {
  return [
    single(category, `${name} XS`, `${desc} 4 porciones.`, xs, options),
    single(category, `${name} XL`, `${desc} 8 porciones.`, xl, options),
  ];
}

function sized(category, name, desc, normal, xl) {
  return [
    single(category, `${name} Normal`, desc, normal),
    single(category, `${name} XL`, desc, xl),
  ];
}

const menu = [
  ...sizedPizza(
    "pizzas-clasicas",
    "Muzzarella",
    "Salsa de tomate, queso muzzarella, aceitunas. Opcional: con ajo.",
    30000,
    60000,
    { tags: ["Clasica"], isFeatured: true }
  ),
  ...sizedPizza(
    "pizzas-clasicas",
    "Jamon y queso",
    "Salsa de tomate, queso muzzarella, jamon.",
    35000,
    65000
  ),
  ...sizedPizza(
    "pizzas-clasicas",
    "Choclo",
    "Salsa de tomate, queso muzzarella, choclo, queso catupiry, aceitunas.",
    30000,
    60000
  ),
  ...sizedPizza(
    "pizzas-clasicas",
    "Palmito",
    "Salsa de tomate, queso muzzarella, palmito, aceitunas.",
    35000,
    65000
  ),
  ...sizedPizza(
    "pizzas-clasicas",
    "Napolitana",
    "Salsa de tomate, queso muzzarella, jamon, rodajas de tomate, aceitunas.",
    35000,
    65000
  ),
  ...sizedPizza(
    "pizzas-clasicas",
    "Margarita",
    "Salsa de tomate, queso muzzarella, tomate, albahaca fresca, aceitunas.",
    35000,
    65000,
    { tags: ["Clasica"] }
  ),
  ...sizedPizza(
    "pizzas-clasicas",
    "Anchoas",
    "Salsa de tomate, queso muzzarella, anchoas, aceitunas.",
    40000,
    70000
  ),
  ...sizedPizza(
    "pizzas-clasicas",
    "Pollo con catupiry",
    "Salsa de tomate, queso muzzarella, pollo, queso catupiry, aceitunas.",
    40000,
    70000
  ),
  ...sizedPizza(
    "pizzas-clasicas",
    "Pepperoni",
    "Salsa de tomate, queso muzzarella, pepperoni, aceitunas.",
    40000,
    70000,
    { tags: ["Mas vendido"], isFeatured: true }
  ),

  ...sizedPizza(
    "pizzas-especiales",
    "Fugazza",
    "Queso muzzarella, cebolla blanca salteada, aceitunas.",
    35000,
    65000
  ),
  ...sizedPizza(
    "pizzas-especiales",
    "Cuatro quesos",
    "Salsa de tomate, queso muzzarella, queso cheddar, queso azul, queso cremoso, aceitunas.",
    40000,
    70000,
    { tags: ["Especial"], isFeatured: true }
  ),
  ...sizedPizza(
    "pizzas-especiales",
    "Calabresa",
    "Salsa pesto, queso muzzarella, calabresa y aceitunas.",
    40000,
    70000
  ),
  ...sizedPizza(
    "pizzas-especiales",
    "Vegetariana",
    "Salsa de tomate, queso muzzarella, choclo, champinon, morron, cebolla morada, aceitunas negras.",
    35000,
    65000
  ),
  ...sizedPizza(
    "pizzas-especiales",
    "Jamon y morron",
    "Salsa de tomate, jamon, morron, huevo y muzzarella, aceitunas.",
    40000,
    70000
  ),
  ...sizedPizza(
    "pizzas-especiales",
    "Mexicana",
    "Salsa de tomate, queso muzzarella, carne picada, salsa extra picante de la casa, aceitunas.",
    40000,
    70000
  ),
  ...sizedPizza(
    "pizzas-especiales",
    "Rucula",
    "Salsa de tomate, queso muzzarella, rucula, aceitunas.",
    40000,
    70000
  ),

  ...sizedPizza(
    "pizzas-de-la-casa",
    "Chicken alfredo",
    "Salsa alfredo, queso muzzarella, pollo, aceitunas.",
    40000,
    70000
  ),
  ...sizedPizza(
    "pizzas-de-la-casa",
    "Meat lovers",
    "Salsa de tomate, queso muzzarella, carne, panceta, pepperoni, aceitunas.",
    40000,
    70000
  ),
  ...sizedPizza(
    "pizzas-de-la-casa",
    "Pesto",
    "Salsa pesto, queso muzzarella, fungi, aceitunas.",
    40000,
    70000
  ),
  ...sizedPizza(
    "pizzas-de-la-casa",
    "Toscana",
    "Salsa de tomate, queso muzzarella, chorizo toscano, panceta, cebolla morada, cebollita verde, salsa especial de la casa, aceitunas.",
    40000,
    70000
  ),
  ...sizedPizza(
    "pizzas-de-la-casa",
    "Carne a la barbacoa",
    "Salsa de tomate, queso muzzarella, carne salteada a la barbacoa, aceitunas.",
    45000,
    75000
  ),
  ...sizedPizza(
    "pizzas-de-la-casa",
    "Lomo salteado",
    "Salsa de tomate, queso muzzarella, carne, cebolla morada, tomate, aceitunas.",
    45000,
    75000
  ),
  ...sizedPizza(
    "pizzas-de-la-casa",
    "Bianca",
    "Salsa de tomate, queso muzzarella, catupiry, lomo, toscana, pepinillos, parmesano.",
    45000,
    75000
  ),

  single("entradas", "Papas fritas", "", 18000),
  single("entradas", "Papas con cheddar", "", 25000),
  single("entradas", "Nuggets", "", 20000),

  ...sized(
    "sandwiches",
    "Panini de pollo",
    "Pesto, tomate, pollo, salsa especial de la casa, rucula, queso crema.",
    30000,
    55000
  ),
  ...sized(
    "sandwiches",
    "Panini de bondiola",
    "Pesto, tomate, bondiola, salsa golf, lechuga repollada, queso crema, muzzarella.",
    35000,
    65000
  ),

  single("empanadas", "Empanada de jamon y queso", "", 7000),
  single("empanadas", "Empanada de choclo", "", 7000),
  single("empanadas", "Empanada de palmito", "", 7000),
  single("empanadas", "Empanada de carne", "", 8000),
  single("empanadas", "Empanada de carne con queso", "", 8000),
  single("empanadas", "Empanada de pollo", "", 8000),
  single("empanadas", "Empanada de desmechado", "", 10000),

  single("calzones", "Calzone de carne", "", 40000),
  single("calzones", "Calzone de pollo catupiry", "", 40000),
  single("calzones", "Calzone napolitana", "", 35000),
  single("calzones", "Calzone cuatro quesos", "", 40000),

  single("bebidas", "Agua 500ml", "Con gas o sin gas.", 5000),
  single("bebidas", "Agua tonica 500ml", "Original, pomelo rosado o Ginger Ale.", 7000),
  single("bebidas", "Gaseosa 500ml", "Coca Cola, Fanta Naranja, Sprite, Schweppes o Guarana.", 8000),
  single("bebidas", "Gaseosa 1lt", "Coca Cola, Fanta Naranja, Sprite, Sprite cero o Fanta Guarana.", 12000),
  single("bebidas", "Acquarius 410ml", "Manzana, naranja o pomelo.", 8000),
  single("bebidas", "Jugo de naranja 1 litro", "", 25000),
  single("bebidas", "Jugo de frutilla 1 litro", "", 30000),
  single("bebidas", "Jugo de pina 1 litro", "", 30000),
  single("bebidas", "Jugo de durazno 1 litro", "", 25000),

  single("tragos", "Caipirinha", "", 20000),
  single("tragos", "Caipiruva", "", 20000),
  single("tragos", "Mojito", "", 20000),
  single("tragos", "Jarra de sangria", "", 30000),
  single("tragos", "Daiquiri", "Frutilla, durazno o pina.", 25000),
  single("tragos", "Fernet con coca", "", 20000),
  single("tragos", "Cuba libre", "", 20000),

  single("cervezas", "Pilsen 750ml", "", 15000),
  single("cervezas", "Patagonia 730ml", "", 20000),
  single("cervezas", "Corona 710ml", "", 20000),
  single("cervezas", "Heineken 650ml", "", 20000),
  single("cervezas", "Munich 600ml", "", 10000),
  single("cervezas", "Michelob 330ml", "", 7000),
  single("cervezas", "Munich ultra 275ml", "", 7000),

  single("agregados", "Extra queso", "", 10000),
  single("agregados", "Aceitunas", "", 5000),
  single("agregados", "Panceta", "", 5000),
  single("agregados", "Aceite de oliva", "", 5000),
  single("agregados", "Ajo", "", 3000),
];

async function run() {
  if (!process.env.MONGODB_URI) {
    throw new Error("Missing MONGODB_URI in .env.local");
  }

  console.log("Connecting to MongoDB...");
  await mongoose.connect(process.env.MONGODB_URI);

  console.log("Upserting categories...");
  const categoryDocs = {};
  for (const [name, slug] of categories) {
    categoryDocs[slug] = await Category.findOneAndUpdate(
      { slug },
      { name, slug },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }

  console.log("Clearing products collection...");
  await Product.deleteMany({});

  console.log("Inserting menu products...");
  await Product.insertMany(
    menu.map((product) => ({
      ...product,
      category: categoryDocs[product.category]._id,
    }))
  );

  console.log(`Seed complete: ${menu.length} products`);
}

run()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect().catch(() => {});
    console.log("Disconnected");
  });
