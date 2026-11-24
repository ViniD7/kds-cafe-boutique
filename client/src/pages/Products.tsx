import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import SkeletonLoader from "../components/SkeletonLoader";
import { productAPI } from "../services/api";
import { Product } from "../types/api";

const defaultCatalogProducts: any[] = [
  {
    id: "lata-250g-caparao-reserva-especial",
    name: "Caparaó Reserva Especial 250g",
    category: "graos",
    price: 78.0,
    images: ["/images/canFront.webp"],
    description:
      "Microlote fermentado anaeróbio em altitude extrema. Notas intensas de flor de laranjeira, mel silvestre e pêssego fresco.",
    scaScore: 88.5,
    badge: "Edição Numerada",
    subtitle: "Lata Hermética 250g",
    sensoryNotes: ["Flor de Laranjeira", "Mel Silvestre", "Chocolate 70%"],
    sensoryType: "floral",
    variants: [{ id: "v1", name: "Grãos", price: 78, stock: 10 }],
  },
  {
    id: "sache-250g-cafe-arara-amarelo",
    name: "Arara Amarelo Raro 250g",
    category: "graos",
    price: 49.0,
    images: ["/images/sacheFront.webp"],
    description:
      "Variedade Arara amadurecida lentamente na face leste do pico. Doçura cristalina de manga, damasco e acidez málica sedosa.",
    scaScore: 87.5,
    badge: "Safra Nova",
    subtitle: "Pacote Válvula 250g",
    sensoryNotes: ["Manga em Calda", "Damasco", "Torra Média-Clara"],
    sensoryType: "frutas",
    variants: [{ id: "v2", name: "Moído", price: 49, stock: 15 }],
  },
  {
    id: "sache-250g-catuai-vermelho",
    name: "Catuaí Vermelho 144 250g",
    category: "graos",
    price: 42.0,
    images: ["/images/sacheBk.webp"],
    description:
      "Processo Natural de terreiro suspenso. Notas ricas de cacau belga 70%, toffee amanteigado e finalização aveludada.",
    scaScore: 86.0,
    badge: "Clássico Nobre",
    subtitle: "Pacote Black Matte 250g",
    sensoryNotes: ["Cacau Belga", "Caramelo Toffee", "Corpo Denso"],
    sensoryType: "chocolate",
    variants: [{ id: "v3", name: "Grãos", price: 42, stock: 20 }],
  },
  {
    id: "drip-coffee-box-10-saches",
    name: "Drip Coffee Bag Box (10 Sachês)",
    category: "drip",
    price: 54.0,
    images: ["/images/dripCoffe.webp"],
    description:
      "Café especial moído com precisão e selado com nitrogênio puro. Extração individual direta na xícara em qualquer lugar.",
    scaScore: 86.5,
    badge: "10 Filtros Individuais",
    subtitle: "Drip Bag Portátil",
    sensoryNotes: ["Mel Silvestre", "Praliné", "Praticidade"],
    sensoryType: "chocolate",
    variants: [{ id: "v4", name: "Caixa 10un", price: 54, stock: 12 }],
  },
  {
    id: "capsulas-caparao-terroir-10un",
    name: "Cápsulas Caparaó Terroir (10un)",
    category: "capsulas",
    price: 46.0,
    images: ["/images/capsulaFront.webp"],
    description:
      "Cápsulas biodegradáveis de celulose vegetal compatíveis com Nespresso®. Extração densa com crema persistente.",
    scaScore: 86.0,
    badge: "100% Compostável",
    subtitle: "10 Cápsulas",
    sensoryNotes: ["Biopolímero", "Praliné", "Crema Aveludada"],
    sensoryType: "citrico",
    variants: [{ id: "v5", name: "Caixa 10un", price: 46, stock: 18 }],
  },
  {
    id: "cookie-cups-trio-artesanal",
    name: "Cookie Cups Trio Degustação",
    category: "cookiecups",
    price: 62.0,
    images: ["/images/cupCookie.webp"],
    description:
      "Copinhos artesanais crocantes revestidos internamente com puro chocolate belga. Harmonização lúdica com seu espresso.",
    scaScore: 88.0,
    badge: "Gastronomia",
    subtitle: "Trio 6 unidades",
    sensoryNotes: ["Baunilha", "Cacau 70%", "Coco Queimado"],
    sensoryType: "chocolate",
    variants: [{ id: "v6", name: "Trio 6un", price: 62, stock: 8 }],
  },
  {
    id: "kit-degustacao-caparao-nobre",
    name: "Kit Degustação Caparaó Nobre",
    category: "kits",
    price: 139.0,
    images: ["/images/canTriple.webp"],
    description:
      "Caixa presente rígida contendo 1 Lata Colecionável 250g, 1 Pacote de Arara Amarelo e 2 Cookie Cups artesanais.",
    scaScore: 88.5,
    badge: "Presente Premium",
    subtitle: "Coleção Degustação",
    sensoryNotes: ["Edição Presente", "Guia Barista", "Lacre Dourado"],
    sensoryType: "frutas",
    variants: [{ id: "v7", name: "Kit Completo", price: 139, stock: 5 }],
  },
  {
    id: "saca-verde-atacado-30kg",
    name: "Saca Especial B2B 30kg (Grão Cru)",
    category: "b2b",
    price: 1450.0,
    images: ["/images/sacodecafe.webp"],
    description:
      "Grãos crus selecionados em terreiro suspenso diretamente da fazenda em Pequiá para cafeterias e microtorrefações.",
    scaScore: 87.5,
    badge: "Atacado B2B",
    subtitle: "Saca Juta 30kg",
    sensoryNotes: ["Grão Cru", "Laudo SCA", "Rastreabilidade"],
    sensoryType: "floral",
    variants: [{ id: "v8", name: "Saca 30kg", price: 1450, stock: 4 }],
  },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = searchParams.get("category") || "all";

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(urlCategory);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSensory, setSelectedSensory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await productAPI.getAllProducts();
        if (data && data.length > 0) {
          setAllProducts(data);
        } else {
          setAllProducts(defaultCatalogProducts);
        }
      } catch {
        setAllProducts(defaultCatalogProducts);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setSearchParams(cat === "all" ? {} : { category: cat });
  };

  const filteredAndSortedProducts = useMemo(() => {
    return allProducts
      .filter((p) => {
        // Category filtering
        if (selectedCategory !== "all") {
          const cat = (p.category || "").toLowerCase();
          const name = (p.name || "").toLowerCase();

          if (selectedCategory === "graos") {
            if (
              !cat.includes("grão") &&
              !cat.includes("graos") &&
              !name.includes("café") &&
              !name.includes("arara") &&
              !name.includes("reserva") &&
              !name.includes("catuaí")
            ) {
              return false;
            }
          } else if (selectedCategory === "drip") {
            if (!cat.includes("drip") && !name.includes("drip") && !name.includes("sachê"))
              return false;
          } else if (selectedCategory === "capsulas") {
            if (!cat.includes("cápsula") && !cat.includes("capsula") && !name.includes("cápsula"))
              return false;
          } else if (selectedCategory === "cookiecups") {
            if (!cat.includes("cookie") && !name.includes("cookie") && !name.includes("cup"))
              return false;
          } else if (selectedCategory === "kits") {
            if (!cat.includes("kit") && !name.includes("kit")) return false;
          } else if (selectedCategory === "b2b") {
            if (
              !cat.includes("b2b") &&
              !cat.includes("saca") &&
              !name.includes("saca") &&
              !name.includes("atacado")
            )
              return false;
          }
        }

        // Search query filtering
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = (p.name || "").toLowerCase().includes(q);
          const matchDesc = (p.description || "").toLowerCase().includes(q);
          const matchNotes = (p.sensoryNotes || []).some((n: string) =>
            n.toLowerCase().includes(q)
          );
          if (!matchName && !matchDesc && !matchNotes) return false;
        }

        // Sensory note filtering
        if (selectedSensory) {
          const s = selectedSensory.toLowerCase();
          const pSensory = ((p as any).sensoryType || "").toLowerCase();
          const matchType = pSensory.includes(s);
          const matchNotes = (p.sensoryNotes || []).some((n: string) =>
            n.toLowerCase().includes(s)
          );
          const matchDesc = (p.description || "").toLowerCase().includes(s);
          if (!matchType && !matchNotes && !matchDesc) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "sca-desc") {
          const scaA = (a as any).scaScore || 86;
          const scaB = (b as any).scaScore || 86;
          return scaB - scaA;
        }
        return 0;
      });
  }, [allProducts, selectedCategory, searchQuery, selectedSensory, sortBy]);

  const categoryOptions = [
    { id: "all", label: "Todos os Produtos" },
    { id: "graos", label: "Cafés Especiais 86+ SCA" },
    { id: "drip", label: "Drip Coffee" },
    { id: "capsulas", label: "Cápsulas Compatíveis" },
    { id: "cookiecups", label: "Cookie Cups" },
    { id: "kits", label: "Kits & Presentes" },
    { id: "b2b", label: "Atacado B2B" },
  ];

  const sensoryOptions = [
    { id: "floral", label: "Florais & Jasmim" },
    { id: "chocolate", label: "Chocolate & Caramelo" },
    { id: "frutas", label: "Frutas Amarelas" },
    { id: "citrico", label: "Acidez Cítrica" },
  ];

  return (
    <div className="w-full flex flex-col bg-[#0D0B0A] text-[#F5F2EB] min-h-screen">
      {/* 1. TOP EDITORIAL BANNER - ONYX STYLE */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="max-w-3xl flex flex-col gap-2">
            <div className="flex items-center gap-2 font-mono text-xs text-gold-bright uppercase tracking-widest">
              <span className="w-2 h-2 bg-gold-bright inline-block" />
              <span>Curadoria Safra 2024/2025</span>
              <span className="text-white/30">•</span>
              <span className="text-paper-sand/60">Pequiá, Iúna-ES // 1.400M MASL</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-paper-cream tracking-tight font-normal">
              Catálogo de Safras &amp; Criações de{" "}
              <span className="italic text-gold-bright">Atelier</span>
            </h1>

            <p className="font-sans text-xs sm:text-sm text-paper-sand/70 max-w-2xl font-light leading-relaxed">
              Microlotes numerados, métodos práticos de extração e harmonizações gastronômicas
              cultivadas sob o clima de montanha do Caparaó Capixaba.
            </p>
          </div>

          {/* Quick Summary Stats Strip */}
          <div className="flex items-center gap-4 sm:gap-6 bg-[#161311] px-6 py-4 border border-white/10 self-start lg:self-auto font-mono">
            <div className="flex flex-col">
              <span className="text-[10px] text-paper-sand/50 uppercase tracking-wider">
                Pontuação SCA
              </span>
              <span className="font-serif text-xl text-paper-cream font-bold">
                87.5 <span className="text-xs text-gold-bright font-mono">Média</span>
              </span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex flex-col">
              <span className="text-[10px] text-paper-sand/50 uppercase tracking-wider">
                Lotes Disponíveis
              </span>
              <span className="font-serif text-xl text-paper-cream font-bold">
                {filteredAndSortedProducts.length} Lotes
              </span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex flex-col">
              <span className="text-[10px] text-paper-sand/50 uppercase tracking-wider">Torras</span>
              <span className="text-xs text-gold-bright font-bold flex items-center gap-1 mt-1">
                Semanais
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STICKY INTERACTIVE CONTROL BAR - ONYX STYLE */}
      <section className="sticky top-[73px] z-30 bg-[#0D0B0A]/95 backdrop-blur-md border-y border-white/10 py-3.5 mb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col gap-3">
          {/* Category Tabs */}
          <div className="flex items-center justify-between gap-4 overflow-x-auto pb-1 scrollbar-none">
            <div className="flex items-center gap-2 shrink-0">
              {categoryOptions.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition-all border shrink-0 ${
                      isActive
                        ? "bg-gold-bright text-[#0D0B0A] font-bold border-gold-bright"
                        : "bg-white/[0.03] text-paper-sand/70 border-white/10 hover:border-white/30 hover:text-paper-cream"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            <div className="hidden xl:flex items-center gap-1.5 font-mono text-xs text-paper-sand/50 shrink-0 pl-4 border-l border-white/10">
              <span>{filteredAndSortedProducts.length} itens encontrados</span>
            </div>
          </div>

          {/* Search + Sensory Filters + Sorting Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-2 border-t border-white/5">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[17px] text-paper-sand/50">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por lote, variedade (Arara, Catuaí), método..."
                className="w-full pl-9 pr-8 py-2 bg-[#161311] border border-white/10 focus:border-gold-bright text-xs font-mono text-paper-cream focus:outline-none transition-all placeholder:text-paper-sand/40"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-paper-sand/50 hover:text-paper-cream"
                >
                  <span className="material-symbols-outlined text-[15px]">close</span>
                </button>
              )}
            </div>

            {/* Sensory Chips & Sort */}
            <div className="flex flex-wrap items-center justify-between lg:justify-end gap-3 w-full lg:w-auto">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
                <span className="font-mono text-[10px] uppercase tracking-wider text-paper-sand/50 hidden sm:inline">
                  Sensorial:
                </span>
                {sensoryOptions.map((s) => {
                  const isSensoryActive = selectedSensory === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSensory(isSensoryActive ? null : s.id)}
                      className={`px-3 py-1 font-mono text-[10.5px] border transition-all ${
                        isSensoryActive
                          ? "bg-gold-bright text-[#0D0B0A] font-bold border-gold-bright"
                          : "bg-white/[0.02] border-white/10 text-paper-sand/70 hover:border-white/30 hover:text-paper-cream"
                      }`}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>

              {/* Sort Select */}
              <div className="flex items-center gap-2 pl-2">
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#161311] border border-white/10 px-3 py-1.5 font-mono text-xs text-paper-cream focus:outline-none focus:border-gold-bright cursor-pointer"
                >
                  <option value="featured">Mais Procurados</option>
                  <option value="sca-desc">Maior Pontuação SCA</option>
                  <option value="price-asc">Menor Preço</option>
                  <option value="price-desc">Maior Preço</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT CATALOG GRID */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 pb-24">
        {isLoading ? (
          <SkeletonLoader count={8} />
        ) : (
          <ProductGrid products={filteredAndSortedProducts} />
        )}
      </section>
    </div>
  );
};

export default Products;
