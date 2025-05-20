
export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  images: string[];
  variants: ProductVariant[];
  category: string;
  featured?: boolean;
}

export interface Kit {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice: number;
  images: string[];
  products: string[]; // Product IDs
  featured?: boolean;
}

export const categories = [
  "Cafés Torrados",
  "Cafés Moídos",
  "Kits"
];

export const products: Product[] = [
  {
    id: "prod_001",
    name: "Café Especial Bourbon Amarelo",
    description: "Um café de torra média, com notas de chocolate ao leite, caramelo e finalização cítrica suave. Produzido nas montanhas de Minas Gerais, o Bourbon Amarelo é conhecido pelo seu equilíbrio perfeito entre doçura e acidez, ideal para ser apreciado a qualquer hora do dia.",
    shortDescription: "Café especial com notas de chocolate e caramelo.",
    price: 49.90,
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    variants: [
      { id: "var_001", name: "250g", price: 49.90, stock: 20 },
      { id: "var_002", name: "500g", price: 89.90, stock: 15 },
      { id: "var_003", name: "1kg", price: 169.90, stock: 10 }
    ],
    category: "Cafés Torrados",
    featured: true
  },
  {
    id: "prod_002",
    name: "Café Especial Catuaí Vermelho",
    description: "Um café de torra clara, destacando notas florais, frutadas e uma acidez pronunciada e agradável. Cultivado em altitude acima de 1200m, este café proporciona uma experiência sensorial única com seu corpo leve e aroma intenso.",
    shortDescription: "Café especial com notas florais e frutadas.",
    price: 54.90,
    images: [
      "/placeholder.svg", 
      "/placeholder.svg", 
      "/placeholder.svg"
    ],
    variants: [
      { id: "var_004", name: "250g", price: 54.90, stock: 18 },
      { id: "var_005", name: "500g", price: 99.90, stock: 12 },
      { id: "var_006", name: "1kg", price: 189.90, stock: 8 }
    ],
    category: "Cafés Torrados",
    featured: true
  },
  {
    id: "prod_003",
    name: "Café Especial Topázio - Moído",
    description: "Um café moído na hora, preservando todos os aromas e sabores. Com torra média-escura, apresenta notas de chocolate amargo, nozes e caramelo. Moagem média, ideal para métodos como Hario V60, Chemex e Kalita Wave.",
    shortDescription: "Café especial moído com notas de chocolate e nozes.",
    price: 44.90,
    images: [
      "/placeholder.svg", 
      "/placeholder.svg", 
      "/placeholder.svg"
    ],
    variants: [
      { id: "var_007", name: "250g", price: 44.90, stock: 25 },
      { id: "var_008", name: "500g", price: 79.90, stock: 20 },
      { id: "var_009", name: "1kg", price: 149.90, stock: 15 }
    ],
    category: "Cafés Moídos",
    featured: false
  },
  {
    id: "prod_004",
    name: "Café Especial Acaiá - Moído",
    description: "Café de origem única, moído com precisão para preparos em cafeteira italiana ou espresso. Torra média com notas de frutas vermelhas, chocolate e um toque de especiarias. Um café complexo e elegante.",
    shortDescription: "Café especial moído com notas de frutas vermelhas.",
    price: 47.90,
    images: [
      "/placeholder.svg", 
      "/placeholder.svg", 
      "/placeholder.svg"
    ],
    variants: [
      { id: "var_010", name: "250g", price: 47.90, stock: 22 },
      { id: "var_011", name: "500g", price: 85.90, stock: 18 },
      { id: "var_012", name: "1kg", price: 159.90, stock: 12 }
    ],
    category: "Cafés Moídos",
    featured: true
  }
];

export const kits: Kit[] = [
  {
    id: "kit_001",
    name: "Kit Degustação KDS",
    description: "O Kit Degustação KDS é perfeito para os amantes de café que desejam explorar diferentes perfis de sabor. Contém 250g de cada um dos nossos cafés mais populares: Bourbon Amarelo, Catuaí Vermelho, Topázio e Acaiá.",
    shortDescription: "Kit com 4 variedades de cafés especiais.",
    price: 179.90,
    originalPrice: 197.60,
    images: [
      "/placeholder.svg", 
      "/placeholder.svg", 
      "/placeholder.svg"
    ],
    products: ["prod_001", "prod_002", "prod_003", "prod_004"],
    featured: true
  },
  {
    id: "kit_002",
    name: "Kit Presente Premium",
    description: "Um presente sofisticado para os verdadeiros apreciadores de café. Este kit contém 500g dos nossos cafés premiados Bourbon Amarelo e Catuaí Vermelho, acompanhado de uma caneca exclusiva KDS Cafés Especiais.",
    shortDescription: "Kit premium com 2 cafés especiais e caneca exclusiva.",
    price: 209.90,
    originalPrice: 239.80,
    images: [
      "/placeholder.svg", 
      "/placeholder.svg", 
      "/placeholder.svg"
    ],
    products: ["prod_001", "prod_002"],
    featured: false
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getKitById = (id: string): Kit | undefined => {
  return kits.find(kit => kit.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getFeaturedKits = (): Kit[] => {
  return kits.filter(kit => kit.featured);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};
