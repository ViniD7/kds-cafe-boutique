import canFront from "../Assets/images/canFront.webp";
import canDiagonal from "../Assets/images/canDiagonal.webp";
import canTriple from "../Assets/images/canTriple.webp";
import sacheBk from "../Assets/images/sacheBk.webp";
import sacheBkBack from "../Assets/images/sacheBkBack.webp";
import sacheFront from "../Assets/images/sacheFront.webp";
import sacheDest from "../Assets/images/sacheDest.webp";
import sacheBack from "../Assets/images/sacheBack.webp";
import dripCoffe from "../Assets/images/dripCoffe.webp";
import cupCacau from "../Assets/images/cupCacau.webp";
import cupCookie from "../Assets/images/cupCookie.webp";
import cupCoco from "../Assets/images/cupCoco.webp";

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
  products: string[]; 
  featured?: boolean;
}

export const categories = [
  "Café especial",
  "Café gourmet",
  "Kits",
  "Cookie Cups",
  "Drip coffee",
  "Cápsulas",
  "Acessórios",

];

export const products: Product[] = [
  {
    id: "prod_001",
    name: "KDS Café Especial Lata",
    description: "Café especial com notas de chocolate, caramelo, frutas amarelas e um toque cítrico de maracujá. Processo natural secado em terreno suspenso, cultivado em Piuma - Caparaó ES, entre 1100 e 1400 metros de altitude. Pontuação 88.",
    shortDescription: "Café especial em lata com notas de chocolate, caramelo e frutas amarelas.",
    price: 42.90,
    images: [
      canFront,
      canDiagonal,
      canTriple
    ],
    variants: [
      { id: "var_001", name: "250g", price: 42.90, stock: 10 }
    ],
    category: "Café especial",
    featured: true
  },
  {
    id: "prod_002",
    name: "KDS Café Especial",
    description: "Café especial da variedade Arara Amarelo com notas de chocolate, caramelo, frutas amarelas e um toque cítrico de maracujá. Processo natural secado em terreno suspenso, cultivado em Piuma - Caparaó ES, entre 1100 e 1400 metros de altitude. Pontuação 88.",
    shortDescription: "Café especial com notas de chocolate, caramelo e frutas amarelas.",
    price: 32.90,
    images: [
      sacheFront, 
      sacheBack,
    ],
    variants: [
      { id: "var_002", name: "250g", price: 32.90, stock: 18 }
    ],
    category: "Café especial",
    featured: false
  },
  {
    id: "prod_003",
    name: "KDS Café Gourmet",
    description: "Café gourmet da variedade 25L Amarelo com notas de chocolate, caramelo e frutas amarelas. Processo natural secado em terreno suspenso, cultivado em Piuma - Caparaó ES, entre 1100 e 1400 metros de altitude. Pontuação 85.",
    shortDescription: "Café gourmet com notas de chocolate, caramelo e frutas amarelas.",
    price: 24.90,
    images: [
      sacheBk, 
      sacheBkBack
    ],
    variants: [
      { id: "var_003", name: "250g", price: 24.90, stock: 25 }
    ],
    category: "Café gourmet",
    featured: false
  },
  {
    id: "prod_004",
    name: "KDS Drip Coffee",
    description: "Café em sachês da variedade Arara Amarelo com notas de chocolate, rapadura e mel. Processo natural secado em terreno suspenso, cultivado em Piuma - Caparaó ES, entre 1100 e 1400 metros de altitude. Pontuação 86,5. Contém 10 sachês de 10g cada (total 100g).",
    shortDescription: "Café em sachês com notas de chocolate, rapadura e mel.",
    price: 29.80,
    images: [
      dripCoffe
    ],
    variants: [
      { id: "var_004", name: "10 sachês (100g)", price: 29.80, stock: 22 }
    ],
    category: "Drip coffee",
    featured: true
  },
  {
    id: "prod_005",
    name: "Cookie Cup Cookie",
    description: "Copinho comestível feito com massa de biscoito de cookie sabor baunilha com raspas de chocolate ao leite, banhado internamente com chocolate belga. Pode receber bebidas ou recheios frios e quentes.",
    shortDescription: "Copinho comestível sabor baunilha com chocolate.",
    price: 15.60,
    images: [
      cupCookie
    ],
    variants: [
      { id: "var_005", name: "1 unidade", price: 15.60, stock: 30 }
    ],
    category: "Cookie Cups",
    featured: true
  },
  {
    id: "prod_006",
    name: "Cookie Cup Cacau",
    description: "Copinho comestível feito com massa de cacau alcalino, banhado internamente com chocolate belga. Pode receber bebidas ou recheios frios e quentes.",
    shortDescription: "Copinho comestível sabor cacau.",
    price: 15.60,
    images: [
      cupCacau
    ],
    variants: [
      { id: "var_006", name: "1 unidade", price: 15.60, stock: 30 }
    ],
    category: "Cookie Cups",
    featured: true
  },
  {
    id: "prod_007",
    name: "Cookie Cup Coco",
    description: "Copinho comestível feito com leite e óleo de coco (massa sem proteína), banhado internamente com chocolate belga. Pode receber bebidas ou recheios frios e quentes.",
    shortDescription: "Copinho comestível sabor coco.",
    price: 15.80,
    images: [
      cupCoco
    ],
    variants: [
      { id: "var_007", name: "1 unidade", price: 15.80, stock: 30 }
    ],
    category: "Cookie Cups",
    featured: false
  },
];

export const kits: Kit[] = [
  {
    id: "kit_001",
    name: "Kit Degustação KDS",
    description: "O Kit Degustação KDS é perfeito para os amantes de café que desejam explorar diferentes perfis de sabor. Contém nossos cafés mais populares: Especial Lata, Especial, Gourmet e Drip Coffee.",
    shortDescription: "Kit com 4 variedades de cafés especiais.",
    price: 75.50,
    originalPrice: 150.50,
    images: [
      "/placeholder.svg"
    ],
    products: ["prod_001", "prod_002", "prod_003", "prod_004"],
    featured: false
  },
  {
    id: "kit_002",
    name: "Kit Café + Cookie Cup",
    description: "Um presente sofisticado para os verdadeiros apreciadores de café. Este kit contém o café Especial Lata acompanhado de um Cookie Cup de sua escolha.",
    shortDescription: "Kit com café especial e cookie cup.",
    price: 55.50,
    originalPrice: 58.50,
    images: [
      "/placeholder.svg"
    ],
    products: ["prod_001", "prod_005"],
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