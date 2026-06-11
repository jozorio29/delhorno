import type { Lang } from "./translations";

type Tr = Partial<Record<Exclude<Lang, "es">, string>>;

/**
 * Traducción del menú (nombres, descripciones y categorías de productos).
 * La base de datos queda en español; la traducción se aplica al mostrar,
 * así los productos nuevos que usen estos ingredientes se traducen solos.
 */

const NAMES: Record<string, Tr> = {
  "Jamon y queso": {
    en: "Ham & cheese",
    it: "Prosciutto e formaggio",
    pt: "Presunto e queijo",
    fr: "Jambon-fromage",
    de: "Schinken & Käse",
  },
  Choclo: { en: "Sweet corn", it: "Mais", pt: "Milho", fr: "Maïs", de: "Mais" },
  Palmito: {
    en: "Heart of palm",
    it: "Cuore di palma",
    fr: "Cœur de palmier",
    de: "Palmherzen",
  },
  Anchoas: {
    en: "Anchovies",
    it: "Acciughe",
    pt: "Anchovas",
    fr: "Anchois",
    de: "Sardellen",
  },
  "Pollo con catupiry": {
    en: "Chicken & catupiry",
    it: "Pollo e catupiry",
    pt: "Frango com catupiry",
    fr: "Poulet au catupiry",
    de: "Hähnchen mit Catupiry",
  },
  "Cuatro quesos": {
    en: "Four cheese",
    it: "Quattro formaggi",
    pt: "Quatro queijos",
    fr: "Quatre fromages",
    de: "Vier Käse",
  },
  Vegetariana: { en: "Veggie", fr: "Végétarienne", de: "Vegetarisch" },
  "Jamon y morron": {
    en: "Ham & bell pepper",
    it: "Prosciutto e peperone",
    pt: "Presunto e pimentão",
    fr: "Jambon et poivron",
    de: "Schinken & Paprika",
  },
  Mexicana: { en: "Mexican", it: "Messicana", fr: "Mexicaine", de: "Mexikanisch" },
  Rucula: { en: "Arugula", it: "Rucola", pt: "Rúcula", fr: "Roquette", de: "Rucola" },
  "Carne a la barbacoa": {
    en: "BBQ beef",
    it: "Carne alla barbecue",
    pt: "Carne ao barbecue",
    fr: "Bœuf barbecue",
    de: "BBQ-Rind",
  },
  "Lomo salteado": {
    en: "Sautéed beef",
    it: "Manzo saltato",
    pt: "Lombo salteado",
    fr: "Bœuf sauté",
    de: "Sautiertes Rind",
  },
  "Papas fritas": {
    en: "French fries",
    it: "Patatine fritte",
    pt: "Batata frita",
    fr: "Frites",
    de: "Pommes frites",
  },
  "Papas con cheddar": {
    en: "Cheddar fries",
    it: "Patatine al cheddar",
    pt: "Batata com cheddar",
    fr: "Frites au cheddar",
    de: "Pommes mit Cheddar",
  },
  "Panini de pollo": {
    en: "Chicken panini",
    it: "Panino al pollo",
    pt: "Panini de frango",
    fr: "Panini au poulet",
    de: "Hähnchen-Panini",
  },
  "Panini de bondiola": {
    en: "Pork shoulder panini",
    it: "Panino alla coppa",
    pt: "Panini de copa lombo",
    fr: "Panini à l'échine de porc",
    de: "Schweinenacken-Panini",
  },
  "Empanada de jamon y queso": {
    en: "Ham & cheese empanada",
    it: "Empanada prosciutto e formaggio",
    pt: "Empanada de presunto e queijo",
    fr: "Empanada jambon-fromage",
    de: "Empanada mit Schinken & Käse",
  },
  "Empanada de choclo": {
    en: "Sweet corn empanada",
    it: "Empanada di mais",
    pt: "Empanada de milho",
    fr: "Empanada au maïs",
    de: "Empanada mit Mais",
  },
  "Empanada de palmito": {
    en: "Heart of palm empanada",
    it: "Empanada di cuore di palma",
    pt: "Empanada de palmito",
    fr: "Empanada au cœur de palmier",
    de: "Empanada mit Palmherzen",
  },
  "Empanada de carne": {
    en: "Beef empanada",
    it: "Empanada di carne",
    fr: "Empanada au bœuf",
    de: "Empanada mit Rindfleisch",
  },
  "Empanada de carne con queso": {
    en: "Beef & cheese empanada",
    it: "Empanada di carne e formaggio",
    pt: "Empanada de carne com queijo",
    fr: "Empanada bœuf-fromage",
    de: "Empanada mit Rind & Käse",
  },
  "Empanada de pollo": {
    en: "Chicken empanada",
    it: "Empanada di pollo",
    pt: "Empanada de frango",
    fr: "Empanada au poulet",
    de: "Empanada mit Hähnchen",
  },
  "Empanada de desmechado": {
    en: "Shredded beef empanada",
    it: "Empanada di carne sfilacciata",
    pt: "Empanada de carne desfiada",
    fr: "Empanada de bœuf effiloché",
    de: "Empanada mit zerrupftem Rind",
  },
  "Calzone de carne": {
    en: "Beef calzone",
    it: "Calzone di carne",
    fr: "Calzone au bœuf",
    de: "Calzone mit Rindfleisch",
  },
  "Calzone de pollo catupiry": {
    en: "Chicken & catupiry calzone",
    it: "Calzone pollo e catupiry",
    pt: "Calzone de frango com catupiry",
    fr: "Calzone poulet-catupiry",
    de: "Calzone mit Hähnchen & Catupiry",
  },
  "Calzone napolitana": {
    en: "Neapolitan calzone",
    it: "Calzone napoletano",
    pt: "Calzone napolitano",
    fr: "Calzone napolitain",
  },
  "Calzone cuatro quesos": {
    en: "Four cheese calzone",
    it: "Calzone quattro formaggi",
    pt: "Calzone quatro queijos",
    fr: "Calzone quatre fromages",
    de: "Vier-Käse-Calzone",
  },
  "Agua 500ml": {
    en: "Water 500ml",
    it: "Acqua 500ml",
    pt: "Água 500ml",
    fr: "Eau 500ml",
    de: "Wasser 500ml",
  },
  "Agua tonica 500ml": {
    en: "Tonic water 500ml",
    it: "Acqua tonica 500ml",
    pt: "Água tônica 500ml",
    fr: "Eau tonique 500ml",
    de: "Tonic Water 500ml",
  },
  "Gaseosa 500ml": {
    en: "Soft drink 500ml",
    it: "Bibita 500ml",
    pt: "Refrigerante 500ml",
    fr: "Soda 500ml",
    de: "Softdrink 500ml",
  },
  "Gaseosa 1lt": {
    en: "Soft drink 1L",
    it: "Bibita 1L",
    pt: "Refrigerante 1L",
    fr: "Soda 1L",
    de: "Softdrink 1L",
  },
  "Jugo de naranja 1 litro": {
    en: "Orange juice 1L",
    it: "Succo d'arancia 1L",
    pt: "Suco de laranja 1L",
    fr: "Jus d'orange 1L",
    de: "Orangensaft 1L",
  },
  "Jugo de frutilla 1 litro": {
    en: "Strawberry juice 1L",
    it: "Succo di fragola 1L",
    pt: "Suco de morango 1L",
    fr: "Jus de fraise 1L",
    de: "Erdbeersaft 1L",
  },
  "Jugo de pina 1 litro": {
    en: "Pineapple juice 1L",
    it: "Succo di ananas 1L",
    pt: "Suco de abacaxi 1L",
    fr: "Jus d'ananas 1L",
    de: "Ananassaft 1L",
  },
  "Jugo de durazno 1 litro": {
    en: "Peach juice 1L",
    it: "Succo di pesca 1L",
    pt: "Suco de pêssego 1L",
    fr: "Jus de pêche 1L",
    de: "Pfirsichsaft 1L",
  },
  "Jarra de sangria": {
    en: "Sangria pitcher",
    it: "Caraffa di sangria",
    pt: "Jarra de sangria",
    fr: "Pichet de sangria",
    de: "Sangria-Krug",
  },
  "Fernet con coca": {
    en: "Fernet & coke",
    it: "Fernet e coca",
    pt: "Fernet com coca",
    fr: "Fernet-coca",
    de: "Fernet mit Cola",
  },
  "Extra queso": {
    en: "Extra cheese",
    it: "Formaggio extra",
    pt: "Queijo extra",
    fr: "Fromage en plus",
    de: "Extra Käse",
  },
  Aceitunas: { en: "Olives", it: "Olive", pt: "Azeitonas", fr: "Olives", de: "Oliven" },
  Panceta: { en: "Bacon", it: "Pancetta", pt: "Bacon", fr: "Poitrine fumée", de: "Bacon" },
  "Aceite de oliva": {
    en: "Olive oil",
    it: "Olio d'oliva",
    pt: "Azeite de oliva",
    fr: "Huile d'olive",
    de: "Olivenöl",
  },
  Ajo: { en: "Garlic", it: "Aglio", pt: "Alho", fr: "Ail", de: "Knoblauch" },
};

/** Segmentos de descripción (separados por comas) — en minúsculas. */
const TERMS: Record<string, Tr> = {
  "salsa de tomate": {
    en: "tomato sauce",
    it: "salsa di pomodoro",
    pt: "molho de tomate",
    fr: "sauce tomate",
    de: "Tomatensauce",
  },
  "queso muzzarella": {
    en: "mozzarella cheese",
    it: "mozzarella",
    pt: "queijo mussarela",
    fr: "mozzarella",
    de: "Mozzarella",
  },
  aceitunas: { en: "olives", it: "olive", pt: "azeitonas", fr: "olives", de: "Oliven" },
  "opcional: con ajo": {
    en: "optional: with garlic",
    it: "opzionale: con aglio",
    pt: "opcional: com alho",
    fr: "en option : avec ail",
    de: "optional: mit Knoblauch",
  },
  jamon: { en: "ham", it: "prosciutto", pt: "presunto", fr: "jambon", de: "Schinken" },
  choclo: { en: "sweet corn", it: "mais", pt: "milho", fr: "maïs", de: "Mais" },
  "queso catupiry": {
    en: "catupiry cheese",
    it: "formaggio catupiry",
    pt: "queijo catupiry",
    fr: "fromage catupiry",
    de: "Catupiry-Käse",
  },
  palmito: {
    en: "heart of palm",
    it: "cuore di palma",
    fr: "cœur de palmier",
    de: "Palmherzen",
  },
  "rodajas de tomate": {
    en: "tomato slices",
    it: "fette di pomodoro",
    pt: "rodelas de tomate",
    fr: "tranches de tomate",
    de: "Tomatenscheiben",
  },
  tomate: { en: "tomato", it: "pomodoro", fr: "tomate", de: "Tomate" },
  "albahaca fresca": {
    en: "fresh basil",
    it: "basilico fresco",
    pt: "manjericão fresco",
    fr: "basilic frais",
    de: "frisches Basilikum",
  },
  anchoas: { en: "anchovies", it: "acciughe", pt: "anchovas", fr: "anchois", de: "Sardellen" },
  pollo: { en: "chicken", it: "pollo", pt: "frango", fr: "poulet", de: "Hähnchen" },
  "cebolla blanca salteada": {
    en: "sautéed white onion",
    it: "cipolla bianca saltata",
    pt: "cebola branca salteada",
    fr: "oignon blanc sauté",
    de: "sautierte weiße Zwiebeln",
  },
  "queso cheddar": {
    en: "cheddar cheese",
    it: "formaggio cheddar",
    pt: "queijo cheddar",
    fr: "fromage cheddar",
    de: "Cheddar",
  },
  "queso azul": {
    en: "blue cheese",
    it: "formaggio erborinato",
    pt: "queijo azul",
    fr: "fromage bleu",
    de: "Blauschimmelkäse",
  },
  "queso cremoso": {
    en: "creamy cheese",
    it: "formaggio cremoso",
    pt: "queijo cremoso",
    fr: "fromage crémeux",
    de: "Frischkäse",
  },
  "salsa pesto": {
    en: "pesto sauce",
    it: "salsa al pesto",
    pt: "molho pesto",
    fr: "sauce pesto",
    de: "Pestosauce",
  },
  "calabresa y aceitunas": {
    en: "calabresa sausage and olives",
    it: "salsiccia calabrese e olive",
    pt: "calabresa e azeitonas",
    fr: "saucisse calabraise et olives",
    de: "Calabresa-Wurst und Oliven",
  },
  champinon: {
    en: "mushrooms",
    it: "champignon",
    pt: "champignon",
    fr: "champignons",
    de: "Champignons",
  },
  morron: { en: "bell pepper", it: "peperone", pt: "pimentão", fr: "poivron", de: "Paprika" },
  "cebolla morada": {
    en: "red onion",
    it: "cipolla rossa",
    pt: "cebola roxa",
    fr: "oignon rouge",
    de: "rote Zwiebeln",
  },
  "aceitunas negras": {
    en: "black olives",
    it: "olive nere",
    pt: "azeitonas pretas",
    fr: "olives noires",
    de: "schwarze Oliven",
  },
  "huevo y muzzarella": {
    en: "egg and mozzarella",
    it: "uovo e mozzarella",
    pt: "ovo e mussarela",
    fr: "œuf et mozzarella",
    de: "Ei und Mozzarella",
  },
  "carne picada": {
    en: "ground beef",
    it: "carne macinata",
    pt: "carne moída",
    fr: "viande hachée",
    de: "Hackfleisch",
  },
  "salsa extra picante de la casa": {
    en: "extra-spicy house sauce",
    it: "salsa extra piccante della casa",
    pt: "molho extra picante da casa",
    fr: "sauce maison extra-piquante",
    de: "extrascharfe Haussauce",
  },
  rucula: { en: "arugula", it: "rucola", pt: "rúcula", fr: "roquette", de: "Rucola" },
  "salsa alfredo": {
    en: "alfredo sauce",
    it: "salsa alfredo",
    pt: "molho alfredo",
    fr: "sauce alfredo",
    de: "Alfredo-Sauce",
  },
  carne: { en: "beef", it: "carne", pt: "carne", fr: "bœuf", de: "Rindfleisch" },
  panceta: { en: "bacon", it: "pancetta", pt: "bacon", fr: "poitrine fumée", de: "Bacon" },
  fungi: { en: "mushrooms", it: "funghi", pt: "cogumelos", fr: "champignons", de: "Pilze" },
  "chorizo toscano": {
    en: "Tuscan sausage",
    it: "salsiccia toscana",
    pt: "linguiça toscana",
    fr: "saucisse toscane",
    de: "toskanische Wurst",
  },
  "cebollita verde": {
    en: "green onion",
    it: "cipollotto",
    pt: "cebolinha",
    fr: "oignon vert",
    de: "Frühlingszwiebeln",
  },
  "salsa especial de la casa": {
    en: "special house sauce",
    it: "salsa speciale della casa",
    pt: "molho especial da casa",
    fr: "sauce spéciale maison",
    de: "spezielle Haussauce",
  },
  "carne salteada a la barbacoa": {
    en: "BBQ sautéed beef",
    it: "carne saltata alla barbecue",
    pt: "carne salteada ao barbecue",
    fr: "bœuf sauté au barbecue",
    de: "sautiertes BBQ-Rindfleisch",
  },
  lomo: { en: "sirloin", it: "lombo", pt: "lombo", fr: "filet", de: "Lende" },
  pepinillos: {
    en: "pickles",
    it: "cetriolini",
    pt: "picles",
    fr: "cornichons",
    de: "Gewürzgurken",
  },
  parmesano: {
    en: "parmesan",
    it: "parmigiano",
    pt: "parmesão",
    fr: "parmesan",
    de: "Parmesan",
  },
  "salsa golf": {
    en: "golf sauce",
    it: "salsa golf",
    pt: "molho golf",
    fr: "sauce golf",
    de: "Golf-Sauce",
  },
  "lechuga repollada": {
    en: "iceberg lettuce",
    it: "lattuga iceberg",
    pt: "alface americana",
    fr: "laitue iceberg",
    de: "Eisbergsalat",
  },
  "queso crema": {
    en: "cream cheese",
    it: "formaggio spalmabile",
    pt: "cream cheese",
    fr: "fromage frais",
    de: "Frischkäse",
  },
  muzzarella: { en: "mozzarella", it: "mozzarella", pt: "mussarela", fr: "mozzarella", de: "Mozzarella" },
  bondiola: {
    en: "pork shoulder",
    it: "coppa di maiale",
    pt: "copa lombo",
    fr: "échine de porc",
    de: "Schweinenacken",
  },
  "4 porciones": { en: "4 slices", it: "4 fette", pt: "4 fatias", fr: "4 parts", de: "4 Stücke" },
  "8 porciones": { en: "8 slices", it: "8 fette", pt: "8 fatias", fr: "8 parts", de: "8 Stücke" },
  "con gas o sin gas": {
    en: "sparkling or still",
    it: "frizzante o naturale",
    pt: "com gás ou sem gás",
    fr: "gazeuse ou plate",
    de: "mit oder ohne Kohlensäure",
  },
  "pomelo rosado o ginger ale": {
    en: "pink grapefruit or ginger ale",
    it: "pompelmo rosa o ginger ale",
    pt: "toranja rosa ou ginger ale",
    fr: "pamplemousse rose ou ginger ale",
    de: "rosa Grapefruit oder Ginger Ale",
  },
  "schweppes o guarana": {
    en: "Schweppes or Guaraná",
    it: "Schweppes o Guaraná",
    pt: "Schweppes ou Guaraná",
    fr: "Schweppes ou Guaraná",
    de: "Schweppes oder Guaraná",
  },
  "sprite cero o fanta guarana": {
    en: "Sprite Zero or Fanta Guaraná",
    it: "Sprite Zero o Fanta Guaraná",
    pt: "Sprite Zero ou Fanta Guaraná",
    fr: "Sprite Zero ou Fanta Guaraná",
    de: "Sprite Zero oder Fanta Guaraná",
  },
  manzana: { en: "apple", it: "mela", pt: "maçã", fr: "pomme", de: "Apfel" },
  "naranja o pomelo": {
    en: "orange or grapefruit",
    it: "arancia o pompelmo",
    pt: "laranja ou toranja",
    fr: "orange ou pamplemousse",
    de: "Orange oder Grapefruit",
  },
  frutilla: { en: "strawberry", it: "fragola", pt: "morango", fr: "fraise", de: "Erdbeere" },
  "durazno o pina": {
    en: "peach or pineapple",
    it: "pesca o ananas",
    pt: "pêssego ou abacaxi",
    fr: "pêche ou ananas",
    de: "Pfirsich oder Ananas",
  },
  "producto de la carta del horno": {
    en: "item from the Del Horno menu",
    it: "prodotto del menu di Del Horno",
    pt: "produto do cardápio do Del Horno",
    fr: "produit de la carte de Del Horno",
    de: "Produkt aus der Karte von Del Horno",
  },
};

const CATEGORIES: Record<string, Tr> = {
  "Pizzas clasicas": {
    en: "Classic pizzas",
    it: "Pizze classiche",
    pt: "Pizzas clássicas",
    fr: "Pizzas classiques",
    de: "Klassische Pizzen",
  },
  "Pizzas especiales": {
    en: "Special pizzas",
    it: "Pizze speciali",
    pt: "Pizzas especiais",
    fr: "Pizzas spéciales",
    de: "Spezielle Pizzen",
  },
  "Pizzas de la casa": {
    en: "House pizzas",
    it: "Pizze della casa",
    pt: "Pizzas da casa",
    fr: "Pizzas de la maison",
    de: "Hauspizzen",
  },
  Entradas: { en: "Starters", it: "Antipasti", fr: "Entrées", de: "Vorspeisen" },
  Sandwiches: { it: "Panini", pt: "Sanduíches", fr: "Sandwichs" },
  Calzones: { it: "Calzoni", de: "Calzone" },
  "Bebidas sin alcohol": {
    en: "Non-alcoholic drinks",
    it: "Bevande analcoliche",
    pt: "Bebidas sem álcool",
    fr: "Boissons sans alcool",
    de: "Alkoholfreie Getränke",
  },
  Tragos: { en: "Cocktails", it: "Cocktail", pt: "Drinks", fr: "Cocktails", de: "Cocktails" },
  Cervezas: { en: "Beers", it: "Birre", pt: "Cervejas", fr: "Bières", de: "Biere" },
  Agregados: { en: "Extras", it: "Extra", pt: "Adicionais", fr: "Suppléments", de: "Extras" },
};

const SIZE_SUFFIX = /\s+(XS|XL|Normal)$/i;

function capitalizeLike(source: string, value: string) {
  if (!value) return value;
  const first = source.charAt(0);
  if (first === first.toUpperCase()) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  return value;
}

function trTerm(token: string, lang: Exclude<Lang, "es">) {
  const found = TERMS[token.trim().toLowerCase()]?.[lang];
  return found ? capitalizeLike(token.trim(), found) : token;
}

/** Traduce el nombre de un producto (respeta el sufijo de tamaño XS/XL/Normal). */
export function trName(name: string | undefined, lang: Lang): string {
  if (!name) return "";
  if (lang === "es") return name;
  const match = name.match(SIZE_SUFFIX);
  const base = name.replace(SIZE_SUFFIX, "").trim();
  const translated = NAMES[base]?.[lang] ?? base;
  return match ? `${translated}${match[0]}` : translated;
}

/** Traduce una descripción compuesta por ingredientes separados por comas. */
export function trDesc(desc: string | undefined, lang: Lang): string | undefined {
  if (!desc || lang === "es") return desc;

  return desc
    .split(". ")
    .map((piece) => {
      const hasDot = piece.endsWith(".");
      const body = hasDot ? piece.slice(0, -1) : piece;
      const translated = body
        .split(", ")
        .map((token) => trTerm(token, lang))
        .join(", ");
      return translated + (hasDot ? "." : "");
    })
    .join(". ");
}

/** Traduce el nombre de una categoría. */
export function trCategory(name: string | undefined, lang: Lang): string {
  if (!name) return "";
  if (lang === "es") return name;
  return CATEGORIES[name]?.[lang] ?? name;
}
