import canFront from "../Assets/images-webp/canFront.webp";
import canDiagonal from "../Assets/images-webp/canDiagonal.webp";
import canTriple from "../Assets/images-webp/canTriple.webp";
import sacheBk from "../Assets/images-webp/sacheBk.webp";
import sacheBkBack from "../Assets/images-webp/sacheBkBack.webp";
import sacheFront from "../Assets/images-webp/sacheFront.webp";
import sacheDest from "../Assets/images-webp/sacheDest.webp";
import sacheBack from "../Assets/images-webp/sacheBack.webp";
import dripCoffe from "../Assets/images-webp/dripCoffe.webp";
import cupCacau from "../Assets/images-webp/cupCacau.webp";
import cupCookie from "../Assets/images-webp/cupCookie.webp";
import cupCoco from "../Assets/images-webp/cupCoco.webp";
import sacodecafe from "../Assets/images-webp/sacodecafe.webp";
import sacodecafe2 from "../Assets/images-webp/sacodecafe2.webp";
import sacodecafe3 from "../Assets/images-webp/sacodecafe3.webp";
import capsulaFront from "../Assets/images-webp/capsulaFront.webp";
import capsulaBack from "../Assets/images-webp/capsulaBack.webp";
import cafeBackground from "../Assets/images-webp/cafe-background.webp";
import coffeDetails from "../Assets/images-webp/coffeDetails.webp";
import colheita1 from "../Assets/images-webp/colheita1.webp";
import destaque from "../Assets/images-webp/destaque.webp";
import fundoCafe from "../Assets/images-webp/fundoCafe.webp";
import logo from "../Assets/images-webp/logo.webp";

// Imagens específicas da pasta selfServices
import espresso30ml from "../Assets/imagesSelfServices/Espresso30ml.jpg";
import espresso60ml from "../Assets/imagesSelfServices/Espresso60mlEspressoCariocaAmericano.jpg";
import espressoRomano from "../Assets/imagesSelfServices/EspressoRomano.jpg";
import machiatto from "../Assets/imagesSelfServices/Machiatto.jpg";
import machiattoDuplo from "../Assets/imagesSelfServices/MachiattoDuplo.png";
import capuccinoTrufado from "../Assets/imagesSelfServices/CapuccinoItalianoTrufadodocedeleiteeNutella.jpg";
import avelaLatte from "../Assets/imagesSelfServices/AvelãLatteCapuccinoItalianoTrufado.jpg";
import chaiLatteGroup from "../Assets/imagesSelfServices/ChaiLatteMokaVanillaLatteCaramelLatteSaltedCaramelLatteFlatWhite.jpg";
import icedLatte from "../Assets/imagesSelfServices/IcedLatte.jpg";
import icedColdBrewLatte from "../Assets/imagesSelfServices/IcedColdBrewLatte.jpg";
import icedMoka from "../Assets/imagesSelfServices/Icedmoka.jpg";
import vanillaIcedLatte from "../Assets/imagesSelfServices/VanillaicedLatte.jpg";
import saltedCaramelIcedLatte from "../Assets/imagesSelfServices/SaltedCaramelIcedLatte.jpg";
import icedCoffee from "../Assets/imagesSelfServices/IcedCoffee.jpg";
import coldBrew from "../Assets/imagesSelfServices/ColdBrew.jpg";
import espressoTonica from "../Assets/imagesSelfServices/EspressoTônica.jpg";
import matchaLatte from "../Assets/imagesSelfServices/MatchaLatte.jpg";
import matchaIcedLatte from "../Assets/imagesSelfServices/MatchaIcedLatte.jpg";
import ichigoMatcha from "../Assets/imagesSelfServices/IchigoMatchaIcedLatte.jpg";
import passionFurutsu from "../Assets/imagesSelfServices/PasshonFurutsuIcedMatcha.jpg";
import coconutMatcha from "../Assets/imagesSelfServices/CoconutMatcha.jpg";
import dirtyChaiLatte from "../Assets/imagesSelfServices/DirtyChaiLatte.jpg";
import icedChaiLatte from "../Assets/imagesSelfServices/IcedChaiLatte.jpg";
import icedDirtyChaiLatte from "../Assets/imagesSelfServices/IcedDirtyChaiLatte.jpg";
import kdsMontBlanc from "../Assets/imagesSelfServices/KDSMontBlanc.jpg";
import kdsColdMatcha from "../Assets/imagesSelfServices/KDSCold&Matcha.jpg";

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
  "Cafés quentes",
  "Cafés gelados",
  "Matcha",
  "Chai",
  "Autorais",
];

// =======================
// PRODUCTS
// =======================

export const products: Product[] = [
  // ===== CAFÉS FIXOS =====
  {
    id: "prod_001",
    name: "KDS Café Especial Lata",
    description: "Café especial em lata.",
    shortDescription: "Café especial.",
    price: 42.9,
    images: [canFront, canDiagonal, canTriple],
    variants: [{ id: "var_001", name: "250g", price: 42.9, stock: 10 }],
    category: "Café especial",
  },
  {
    id: "prod_002",
    name: "KDS Café Especial",
    description: "Café especial.",
    shortDescription: "Café especial.",
    price: 32.9,
    images: [sacheFront, sacheDest, sacheBk],
    variants: [{ id: "var_002", name: "250g", price: 32.9, stock: 10 }],
    category: "Café especial",
  },
  {
    id: "prod_003",
    name: "KDS Café Gourmet",
    description: "Café gourmet.",
    shortDescription: "Café gourmet.",
    price: 24.9,
    images: [sacheBack, sacheBkBack, destaque],
    variants: [{ id: "var_003", name: "250g", price: 24.9, stock: 10 }],
    category: "Café especial",
  },

  // ===== CAFÉS QUENTES =====
  {
    id: "p4",
    name: "Espresso 30ml",
    description: "Dose de espresso (30ml) servida em copo de 100ml.",
    shortDescription: "Espresso clássico.",
    price: 9.9,
    images: [espresso30ml, dripCoffe],
    variants: [{ id: "v4", name: "padrão", price: 9.9, stock: 999 }],
    category: "Cafés quentes"
  },
  {
    id: "p5",
    name: "Espresso duplo 60ml",
    description: "Duas doses de espresso (60ml) servidas em copo de 100ml.",
    shortDescription: "Espresso duplo.",
    price: 14.9,
    images: [espresso60ml, cafeBackground],
    variants: [{ id: "v5", name: "padrão", price: 14.9, stock: 999 }],
    category: "Cafés quentes"
  },
  {
    id: "p6",
    name: "Espresso romano",
    description: "Espresso (30ml) com zest de limão siciliano (1g).",
    shortDescription: "Espresso com limão.",
    price: 9.9,
    images: [espressoRomano, coffeDetails],
    variants: [{ id: "v6", name: "padrão", price: 9.9, stock: 999 }],
    category: "Cafés quentes"
  },
  {
    id: "p7",
    name: "Machiatto",
    description: "Espresso (30ml) com crema de leite vaporizado.",
    shortDescription: "Espresso com leite.",
    price: 9.9,
    images: [machiatto, fundoCafe],
    variants: [{ id: "v7", name: "padrão", price: 9.9, stock: 999 }],
    category: "Cafés quentes"
  },
  {
    id: "p8",
    name: "Machiatto duplo",
    description: "Espresso duplo (60ml) com crema de leite vaporizado.",
    shortDescription: "Macchiato mais cremoso.",
    price: 12.9,
    images: [machiattoDuplo, coffeDetails],
    variants: [{ id: "v8", name: "padrão", price: 12.9, stock: 999 }],
    category: "Cafés quentes"
  },
  {
    id: "p9",
    name: "Espresso Carioca",
    description: "Espresso (30ml) com 30ml de água quente.",
    shortDescription: "Espresso mais suave.",
    price: 9.9,
    images: [espresso60ml, colheita1],
    variants: [{ id: "v9", name: "padrão", price: 9.9, stock: 999 }],
    category: "Cafés quentes"
  },
  {
    id: "p10",
    name: "Americano",
    description: "Espresso duplo (60ml) com 60ml de água quente.",
    shortDescription: "Café leve e longo.",
    price: 12.9,
    images: [espresso60ml, cafeBackground],
    variants: [{ id: "v10", name: "padrão", price: 12.9, stock: 999 }],
    category: "Cafés quentes"
  },
  {
    id: "p11",
    name: "Capuccino Italiano",
    description: "Espresso (30ml) com leite vaporizado.",
    shortDescription: "Capuccino clássico.",
    price: 12.9,
    images: [chaiLatteGroup, fundoCafe],
    variants: [{ id: "v11", name: "padrão", price: 12.9, stock: 999 }],
    category: "Cafés quentes"
  },
  {
    id: "p12",
    name: "Flat white",
    description: "Espresso duplo (60ml) com leite vaporizado.",
    shortDescription: "Mais café, menos leite.",
    price: 14.9,
    images: [chaiLatteGroup, cafeBackground],
    variants: [{ id: "v12", name: "padrão", price: 14.9, stock: 999 }],
    category: "Cafés quentes"
  },
  {
    id: "p13",
    name: "Moka",
    description: "Espresso (30ml) com calda de chocolate (30g) e leite vaporizado.",
    shortDescription: "Café com chocolate.",
    price: 14.9,
    images: [chaiLatteGroup, cupCacau],
    variants: [{ id: "v13", name: "padrão", price: 14.9, stock: 999 }],
    category: "Cafés quentes"
  },
  {
    id: "p14",
    name: "Vanilla Latte",
    description: "Espresso (30ml) com xarope de baunilha (10ml) e leite vaporizado.",
    shortDescription: "Café com baunilha.",
    price: 14.9,
    images: [chaiLatteGroup, cupCookie],
    variants: [{ id: "v14", name: "padrão", price: 14.9, stock: 999 }],
    category: "Cafés quentes"
  },
  {
    id: "p15",
    name: "Caramel Latte",
    description: "Espresso (30ml) com calda de caramelo (30g) e leite vaporizado.",
    shortDescription: "Café com caramelo.",
    price: 14.9,
    images: [chaiLatteGroup, coffeDetails],
    variants: [{ id: "v15", name: "padrão", price: 14.9, stock: 999 }],
    category: "Cafés quentes"
  },
  {
    id: "p16",
    name: "Salted Caramel Latte",
    description: "Espresso (30ml) com xarope de caramelo salgado (10ml) e leite vaporizado.",
    shortDescription: "Caramelo salgado.",
    price: 15.9,
    images: [chaiLatteGroup, fundoCafe],
    variants: [{ id: "v16", name: "padrão", price: 15.9, stock: 999 }],
    category: "Cafés quentes"
  },
  {
    id: "p17",
    name: "Avelã Latte",
    description: "Espresso (30ml) com xarope de avelã (20ml) e leite vaporizado.",
    shortDescription: "Café com avelã.",
    price: 15.9,
    images: [avelaLatte, dripCoffe],
    variants: [{ id: "v17", name: "padrão", price: 15.9, stock: 999 }],
    category: "Cafés quentes"
  },
  {
    id: "p18",
    name: "Capuccino Italiano Trufado",
    description: "Espresso (30ml) com leite vaporizado e borda trufada (Nutella ou doce de leite).",
    shortDescription: "Capuccino trufado.",
    price: 16.9,
    images: [capuccinoTrufado, cupCacau],
    variants: [{ id: "v18", name: "padrão", price: 16.9, stock: 999 }],
    category: "Cafés quentes"
  },

  // ===== GELADOS =====
  {
    id: "p19",
    name: "Iced Latte",
    description: "Espresso duplo (60ml) com leite gelado e gelo.",
    shortDescription: "Café gelado com leite.",
    price: 14.9,
    images: [icedLatte, cupCoco],
    variants: [{ id: "v19", name: "350ml", price: 14.9, stock: 999 }],
    category: "Cafés gelados"
  },
  {
    id: "p20",
    name: "Iced Cold Brew Latte",
    description: "Cold brew (80ml) com leite gelado (80ml) e gelo.",
    shortDescription: "Cold brew com leite.",
    price: 16.9,
    images: [icedColdBrewLatte, cafeBackground],
    variants: [{ id: "v20", name: "350ml", price: 16.9, stock: 999 }],
    category: "Cafés gelados"
  },
  {
    id: "p21",
    name: "Iced Moka",
    description: "Espresso duplo (60ml) com calda de chocolate (40g) e leite gelado.",
    shortDescription: "Moka gelado.",
    price: 16.9,
    images: [icedMoka, cupCacau],
    variants: [{ id: "v21", name: "350ml", price: 16.9, stock: 999 }],
    category: "Cafés gelados"
  },
  {
    id: "p22",
    name: "Vanilla Iced Latte",
    description: "Espresso duplo (60ml) com leite gelado e baunilha.",
    shortDescription: "Latte gelado de baunilha.",
    price: 16.9,
    images: [vanillaIcedLatte, cupCookie],
    variants: [{ id: "v22", name: "350ml", price: 16.9, stock: 999 }],
    category: "Cafés gelados"
  },
  {
    id: "p23",
    name: "Salted Caramel Iced Latte",
    description: "Espresso duplo (60ml) com caramelo salgado, leite gelado e gelo.",
    shortDescription: "Caramelo gelado.",
    price: 17.9,
    images: [saltedCaramelIcedLatte, cupCoco],
    variants: [{ id: "v23", name: "350ml", price: 17.9, stock: 999 }],
    category: "Cafés gelados"
  },
  {
    id: "p24",
    name: "Iced Coffee",
    description: "Espresso duplo (60ml) com gelo.",
    shortDescription: "Café gelado.",
    price: 12.9,
    images: [icedCoffee, coffeDetails],
    variants: [{ id: "v24", name: "350ml", price: 12.9, stock: 999 }],
    category: "Cafés gelados"
  },
  {
    id: "p25",
    name: "Iced Coffee 500ml",
    description: "Espresso duplo (60ml) + espresso (30ml) com gelo.",
    shortDescription: "Café gelado 500ml.",
    price: 15.9,
    images: [icedCoffee, dripCoffe],
    variants: [{ id: "v25", name: "500ml", price: 15.9, stock: 999 }],
    category: "Cafés gelados"
  },
  {
    id: "p26",
    name: "Cold Brew",
    description: "Café extraído a frio servido com gelo.",
    shortDescription: "Cold brew.",
    price: 14.9,
    images: [coldBrew, fundoCafe],
    variants: [{ id: "v26", name: "350ml", price: 14.9, stock: 999 }],
    category: "Cafés gelados"
  },
  {
    id: "p27",
    name: "Cold Brew 500ml",
    description: "Cold brew servido com gelo (500ml).",
    shortDescription: "Cold brew grande.",
    price: 17.9,
    images: [coldBrew, colheita1],
    variants: [{ id: "v27", name: "500ml", price: 17.9, stock: 999 }],
    category: "Cafés gelados"
  },
  {
    id: "p28",
    name: "Espresso Tônica",
    description: "Espresso duplo (60ml) com gelo e água tônica finalizada por cima.",
    shortDescription: "Café com tônica.",
    price: 14.9,
    images: [espressoTonica, cafeBackground],
    variants: [{ id: "v28", name: "350ml", price: 14.9, stock: 999 }],
    category: "Cafés gelados"
  },
  {
    id: "p29",
    name: "Espresso Tônica 500ml",
    description: "Versão 500ml do espresso tônica.",
    shortDescription: "Tônica grande.",
    price: 17.9,
    images: [espressoTonica, coffeDetails],
    variants: [{ id: "v29", name: "500ml", price: 17.9, stock: 999 }],
    category: "Cafés gelados"
  },

  // ===== MATCHA =====
  {
    id: "p30",
    name: "Matcha Latte",
    description: "Matcha (1g) com água quente (50ml) e leite vaporizado.",
    shortDescription: "Matcha quente.",
    price: 16.9,
    images: [matchaLatte, cafeBackground],
    variants: [{ id: "v30", name: "padrão", price: 16.9, stock: 999 }],
    category: "Matcha"
  },
  {
    id: "p31",
    name: "Matcha Iced Latte",
    description: "Matcha (1g) com água quente e leite gelado.",
    shortDescription: "Matcha gelado.",
    price: 17.9,
    images: [matchaIcedLatte, dripCoffe],
    variants: [{ id: "v31", name: "padrão", price: 17.9, stock: 999 }],
    category: "Matcha"
  },
  {
    id: "p32",
    name: "Ichigo Matcha Iced Latte",
    description: "Matcha com leite gelado e calda/geleia de morango.",
    shortDescription: "Matcha com morango.",
    price: 18.9,
    images: [ichigoMatcha, cupCacau],
    variants: [{ id: "v32", name: "padrão", price: 18.9, stock: 999 }],
    category: "Matcha"
  },
  {
    id: "p33",
    name: "Passion Furutsu Iced Matcha",
    description: "Matcha com leite gelado e calda/geleia de maracujá.",
    shortDescription: "Matcha com maracujá.",
    price: 18.9,
    images: [passionFurutsu, cupCookie],
    variants: [{ id: "v33", name: "padrão", price: 18.9, stock: 999 }],
    category: "Matcha"
  },
  {
    id: "p34",
    name: "Coconut Matcha",
    description: "Água de coco com cold foam de matcha.",
    shortDescription: "Matcha com coco.",
    price: 17.9,
    images: [coconutMatcha, cupCoco],
    variants: [{ id: "v34", name: "padrão", price: 17.9, stock: 999 }],
    category: "Matcha"
  },

  // ===== CHAI =====
  {
    id: "p35",
    name: "Chai Latte",
    description: "Chá preto com especiarias vaporizado até formar crema.",
    shortDescription: "Chai quente.",
    price: 14.9,
    images: [chaiLatteGroup, cafeBackground],
    variants: [{ id: "v35", name: "padrão", price: 14.9, stock: 999 }],
    category: "Chai"
  },
  {
    id: "p36",
    name: "Dirty Chai Latte",
    description: "Chai latte com adição de espresso (30ml).",
    shortDescription: "Chai com café.",
    price: 16.9,
    images: [dirtyChaiLatte, dripCoffe],
    variants: [{ id: "v36", name: "padrão", price: 16.9, stock: 999 }],
    category: "Chai"
  },
  {
    id: "p37",
    name: "Iced Chai Latte",
    description: "Chai (180ml) com gelo.",
    shortDescription: "Chai gelado.",
    price: 15.9,
    images: [icedChaiLatte, cafeBackground],
    variants: [{ id: "v37", name: "padrão", price: 15.9, stock: 999 }],
    category: "Chai"
  },
  {
    id: "p38",
    name: "Iced Dirty Chai Latte",
    description: "Chai com espresso duplo (60ml) e gelo.",
    shortDescription: "Chai gelado com café.",
    price: 17.9,
    images: [icedDirtyChaiLatte, coffeDetails],
    variants: [{ id: "v38", name: "padrão", price: 17.9, stock: 999 }],
    category: "Chai"
  },

  // ===== AUTORAIS =====
  {
    id: "p39",
    name: "KDS Mont Blanc",
    description: "Cold brew infusionado com laranja por 18h, finalizado com cold foam de baunilha e zest de laranja Bahia.",
    shortDescription: "Cold brew com laranja.",
    price: 18.9,
    images: [kdsMontBlanc, destaque],
    variants: [{ id: "v39", name: "padrão", price: 18.9, stock: 999 }],
    category: "Autorais"
  },
  {
    id: "p40",
    name: "KDS Cold & Matcha",
    description: "Cold brew infusionado por 18h com cold foam de matcha.",
    shortDescription: "Cold brew com matcha.",
    price: 18.9,
    images: [kdsColdMatcha, logo],
    variants: [{ id: "v40", name: "padrão", price: 18.9, stock: 999 }],
    category: "Autorais"
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
    images: ["/placeholder.svg"],
    products: ["prod_001", "prod_002", "prod_003"],
    featured: false
  },
  {
    id: "kit_002",
    name: "Kit Café + Cookie Cup",
    description: "Um presente sofisticado para os verdadeiros apreciadores de café. Este kit contém o café Especial Lata acompanhado de um Cookie Cup de sua escolha.",
    shortDescription: "Kit com café especial e cookie cup.",
    price: 55.50,
    originalPrice: 58.50,
    images: ["/placeholder.svg"],
    products: ["prod_001"],
    featured: false
  },
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