import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product";

dotenv.config();

const products = [
  {
    name: "KDS Café Especial Lata",
    description:
      "Café especial com notas de chocolate, caramelo, frutas amarelas e toque cítrico de maracujá. Caparaó ES. Pontuação 88.",
    shortDescription:
      "Café especial em lata com notas de chocolate e caramelo.",
    price: 42.9,
    images: [
      "/images/canFront.webp",
      "/images/canDiagonal.webp",
      "/images/canTriple.webp"
    ],
    variants: [{ name: "250g", price: 42.9, stock: 10 }],
    category: "Café especial",
    featured: true
  },
  {
    name: "KDS Café Especial",
    description:
      "Variedade Arara Amarelo com notas de chocolate, caramelo e frutas amarelas.",
    shortDescription:
      "Café especial com notas de chocolate e frutas amarelas.",
    price: 32.9,
    images: ["/images/sacheFront.webp", "/images/sacheBack.webp"],
    variants: [{ name: "250g", price: 32.9, stock: 10 }],
    category: "Café especial",
    featured: false
  },
  {
    name: "KDS Café Gourmet",
    description:
      "Café gourmet variedade 25L Amarelo com notas de chocolate e caramelo.",
    shortDescription:
      "Café gourmet com notas de chocolate e caramelo.",
    price: 24.9,
    images: ["/images/sacheBk.webp", "/images/sacheBkBack.webp"],
    variants: [{ name: "250g", price: 24.9, stock: 10 }],
    category: "Café gourmet",
    featured: false
  },
  {
    name: "KDS Drip Coffee",
    description:
      "Sachês individuais da variedade Arara Amarelo. Contém 10 sachês de 10g.",
    shortDescription:
      "Drip Coffee com notas de chocolate e mel.",
    price: 29.8,
    images: ["/images/dripCoffe.webp"],
    variants: [{ name: "10 sachês (100g)", price: 29.8, stock: 10 }],
    category: "Drip coffee",
    featured: true
  },
  {
    name: "Cookie Cup Cookie",
    description:
      "Copinho comestível sabor baunilha com raspas de chocolate.",
    shortDescription:
      "Cookie cup sabor baunilha.",
    price: 15.6,
    images: ["/images/cupCookie.webp"],
    variants: [{ name: "1 unidade", price: 15.6, stock: 30 }],
    category: "Cookie Cups",
    featured: true
  },
  {
    name: "Cookie Cup Cacau",
    description:
      "Copinho comestível feito com massa de cacau alcalino.",
    shortDescription:
      "Cookie cup sabor cacau.",
    price: 15.6,
    images: ["/images/cupCacau.webp"],
    variants: [{ name: "1 unidade", price: 15.6, stock: 20 }],
    category: "Cookie Cups",
    featured: true
  },
  {
    name: "Cookie Cup Coco",
    description:
      "Copinho comestível feito com leite e óleo de coco.",
    shortDescription:
      "Cookie cup sabor coco.",
    price: 15.8,
    images: ["/images/cupCoco.webp"],
    variants: [{ name: "1 unidade", price: 15.8, stock: 20 }],
    category: "Cookie Cups",
    featured: false
  },
  {
    name: "Cápsulas",
    description:
      "Contém 10 cápsulas 100% arábica de 5g cada. Intensidade 8.",
    shortDescription:
      "10 cápsulas arábica - intensidade 8.",
    price: 24.9,
    images: ["/images/capsulaFront.webp", "/images/capsulaBack.webp"],
    variants: [
      { name: "50g (10 cápsulas)", price: 24.9, stock: 15 }
    ],
    category: "Cápsulas",
    featured: false
  },
  {
    name: "Saca de Café Verde",
    description:
      "Variedade Arara Amarelo - 30kg - Região do Caparaó.",
    shortDescription:
      "Saca de café verde 30kg.",
    price: 1800,
    images: [
      "/images/sacodecafe.webp",
      "/images/sacodecafe2.webp",
      "/images/sacodecafe3.webp"
    ],
    variants: [{ name: "30Kg", price: 1800, stock: 5 }],
    category: "Sacas de Café",
    featured: false
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);

    console.log("Connected to MongoDB");

    await Product.deleteMany({});
    console.log("Old products removed");

    await Product.insertMany(products);
    console.log("Products inserted successfully");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDatabase();