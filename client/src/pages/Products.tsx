import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import SkeletonLoader from "../components/SkeletonLoader";
import { productAPI } from "../services/api";
import { Product } from "../types/api";

// Curated items from the Stitch Modern Editorial design
const defaultCatalogProducts: any[] = [
  {
    id: "lata-250g-caparao-reserva-especial",
    name: "Caparaó Reserva Especial 250g",
    category: "graos",
    price: 78.0,
    images: ["/images/canFront.webp"],
    description:
      "Microlote fermentado anaeróbio em altitude extrema. Notas intensas de flor de laranjeira, mel silvestre e pêssego fresco.",
    scaScore: 88,
    badge: "Edição Limitada",
    subtitle: "Lata Hermética 250g",
    sensoryNotes: ["Flor de Laranjeira", "Mel Silvestre", "Torra Clara"],
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
      "Variedade Arara amadurecida lentamente na face leste do pico. Doçura caramelizada de manga, damasco e acidez málica sedosa.",
    scaScore: 87,
    badge: "Colheita Seletiva",
    subtitle: "Pacote Válvula 250g",
    sensoryNotes: ["Manga & Damasco", "Doçura Alta", "Torra Média-Clara"],
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
      "Processo Natural de terreiro suspenso. Notas ricas de chocolate amargo 70%, toffee amanteigado e finalização aveludada.",
    scaScore: 86,
    badge: "Clássico Encorpado",
    subtitle: "Pacote Válvula 250g",
    sensoryNotes: ["Cacau Belga", "Caramelo Toffee", "Corpo Licoroso"],
    sensoryType: "chocolate",
    variants: [{ id: "v3", name: "Grãos", price: 42, stock: 20 }],
  },
  {
    id: "drip-coffee-box-10-saches",
    name: "Drip Coffee Bag Box",
    category: "drip",
    price: 54.0,
    images: ["/images/sacheDest.webp"],
    description:
      "Café especial moído com precisão e selado com nitrogênio para frescor absoluto. Extração individual direta na xícara.",
    scaScore: 86,
    badge: "10 Drip Bags",
    subtitle: "Caixa com 10 Drips",
    sensoryNotes: ["Filtro Individual", "Sem Aparelhos", "Origem Caparaó"],
    sensoryType: "chocolate",
    variants: [{ id: "v4", name: "Caixa 10un", price: 54, stock: 12 }],
  },
  {
    id: "capsulas-caparao-terroir-10un",
    name: "Cápsulas Caparaó Terroir",
    category: "capsulas",
    price: 46.0,
    images: ["/images/capsulaFront.webp"],
    description:
      "Cápsulas biodegradáveis de celulose vegetal compatíveis com Nespresso®. Extração densa com notas de praliné e tangerina.",
    scaScore: 86,
    badge: "100% Compostável",
    subtitle: "10 Cápsulas",
    sensoryNotes: ["Biopolímero Zero Lixo", "Praliné de Avelã", "Crema Aveludada"],
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
      "Copinhos artesanais crocantes revestidos internamente com puro chocolate belga. Harmonização lúdica e requintada para seu espresso.",
    scaScore: 88,
    badge: "Exclusividade",
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
    scaScore: 88,
    badge: "Presente Premium",
    subtitle: "Coleção Degustação",
    sensoryNotes: ["Edição Presente", "Guia Sensorial", "Fita Dourada"],
    sensoryType: "frutas",
    variants: [{ id: "v7", name: "Kit Completo", price: 139, stock: 5 }],
  },
  {
    id: "saca-verde-atacado-30kg",
    name: "Saca Especial B2B 30kg",
    category: "b2b",
    price: 1450.0,
    images: ["/images/sacodecafe.webp"],
    description:
      "Grãos crus selecionados em terreiro suspenso diretamente da fazenda em Pequiá para cafeterias e microtorrefações.",
    scaScore: 87,
    badge: "Atacado B2B",
    subtitle: "Saca Juta 30kg",
    sensoryNotes: ["Grão Cru", "Laudo SCA Oficial", "Rastreabilidade"],
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
            if (!cat.includes("grão") && !cat.includes("graos") && !name.includes("café") && !name.includes("arara") && !name.includes("reserva")) {
              return false;
            }
          } else if (selectedCategory === "drip") {
            if (!cat.includes("drip") && !name.includes("drip") && !name.includes("sachê")) return false;
          } else if (selectedCategory === "capsulas") {
            if (!cat.includes("cápsula") && !cat.includes("capsula") && !name.includes("cápsula")) return false;
          } else if (selectedCategory === "cookiecups") {
            if (!cat.includes("cookie") && !name.includes("cookie") && !name.includes("cup")) return false;
          } else if (selectedCategory === "kits") {
            if (!cat.includes("kit") && !name.includes("kit")) return false;
          } else if (selectedCategory === "b2b") {
            if (!cat.includes("b2b") && !cat.includes("saca") && !name.includes("saca") && !name.includes("atacado")) return false;
          }
        }

        // Search query filtering
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = (p.name || "").toLowerCase().includes(q);
          const matchDesc = (p.description || "").toLowerCase().includes(q);
          const matchNotes = (p.sensoryNotes || []).some((n: string) => n.toLowerCase().includes(q));
          if (!matchName && !matchDesc && !matchNotes) return false;
        }

        // Sensory note filtering
        if (selectedSensory) {
          const s = selectedSensory.toLowerCase();
          const pSensory = ((p as any).sensoryType || "").toLowerCase();
          const matchType = pSensory.includes(s);
          const matchNotes = (p.sensoryNotes || []).some((n: string) => n.toLowerCase().includes(s));
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
    { id: "drip", label: "Drip Coffee & Sachês" },
    { id: "capsulas", label: "Cápsulas Compatíveis" },
    { id: "cookiecups", label: "Cookie Cups Artesanais" },
    { id: "kits", label: "Kits & Presentes" },
    { id: "b2b", label: "Atacado B2B (Sacas)" },
  ];

  const sensoryOptions = [
    { id: "floral", label: "Florais & Jasmim" },
    { id: "chocolate", label: "Chocolate & Caramelo" },
    { id: "frutas", label: "Frutas Amarelas" },
    { id: "citrico", label: "Acidez Cítrica" },
  ];

  return (
    <div className="w-full flex flex-col bg-surface min-h-screen">
      {/* 1. TOP EDITORIAL BANNER */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-border-hairline pb-8">
          <div className="max-w-3xl flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-gold-bright animate-pulse" />
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-gold-burnished font-bold">
                Curadoria Safra 2024/2025
              </span>
              <span className="text-slate-warm/50 text-[11px]">•</span>
              <span className="font-sans text-[11px] uppercase tracking-wider text-slate-warm">
                Caparaó Terroir • 1.350m a 1.450m MASL
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl text-espresso-deep tracking-tight font-semibold">
              Catálogo de Cafés &amp; Criações Artesanais
            </h1>

            <p className="font-sans text-sm sm:text-base text-slate-warm max-w-2xl font-light leading-relaxed">
              Microlotes numerados, métodos práticos de extração e harmonizações gastronômicas
              cultivadas sob o clima singular de montanha do Caparaó Capixaba.
            </p>
          </div>

          {/* Quick Summary Stats Strip */}
          <div className="flex items-center gap-4 sm:gap-6 bg-paper-sand px-6 py-4 rounded-xl border border-border-hairline self-start lg:self-auto shadow-sm">
            <div className="flex flex-col">
              <span className="font-sans text-[10px] text-slate-warm uppercase tracking-wider">
                Pontuação Média
              </span>
              <span className="font-serif text-xl text-espresso-deep font-bold">
                87.2{" "}
                <span className="font-sans text-xs text-gold-burnished font-semibold">SCA</span>
              </span>
            </div>
            <div className="h-8 w-px bg-border-hairline" />
            <div className="flex flex-col">
              <span className="font-sans text-[10px] text-slate-warm uppercase tracking-wider">
                Lotes Ativos
              </span>
              <span className="font-serif text-xl text-espresso-deep font-bold">
                {filteredAndSortedProducts.length} Registros
              </span>
            </div>
            <div className="h-8 w-px bg-border-hairline" />
            <div className="flex flex-col">
              <span className="font-sans text-[10px] text-slate-warm uppercase tracking-wider">
                Envios Frescos
              </span>
              <span className="font-sans text-xs text-espresso-deep font-bold flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-[15px] text-gold-bright">
                  schedule
                </span>
                48h da Torra
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STICKY INTERACTIVE CONTROL BAR */}
      <section className="sticky top-20 z-40 bg-surface/95 backdrop-blur-md border-y border-border-hairline shadow-sm py-3 mb-8">
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
                    className={`px-4 py-2 rounded-full font-sans text-xs uppercase tracking-wider font-semibold transition-all shrink-0 ${
                      isActive
                        ? "bg-espresso-deep text-paper-cream shadow-sm"
                        : "bg-paper-sand hover:bg-surface-container-high text-slate-warm hover:text-espresso-deep border border-border-hairline"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            <div className="hidden xl:flex items-center gap-1.5 text-slate-warm shrink-0 pl-4 border-l border-border-hairline">
              <span className="font-sans text-[11px] uppercase tracking-wider">Disponíveis:</span>
              <span className="font-sans text-xs font-bold text-espresso-deep">
                {filteredAndSortedProducts.length} criações
              </span>
            </div>
          </div>

          {/* Search + Sensory Filters + Sorting Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-2 border-t border-border-hairline/60">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-slate-warm">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por lote, variedade (Arara, Catuaí), método..."
                className="w-full pl-9 pr-8 py-2 bg-paper-sand focus:bg-white text-xs font-sans text-espresso-deep rounded-lg border border-border-hairline focus:border-gold-burnished focus:outline-none transition-all placeholder:text-slate-warm/70"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-warm hover:text-espresso-deep"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              )}
            </div>

            {/* Sensory Chips & Sort */}
            <div className="flex flex-wrap items-center justify-between lg:justify-end gap-3 w-full lg:w-auto">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
                <span className="font-sans text-[10px] uppercase tracking-wider text-slate-warm hidden sm:inline">
                  Sensorial:
                </span>
                {sensoryOptions.map((s) => {
                  const isSensoryActive = selectedSensory === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSensory(isSensoryActive ? null : s.id)}
                      className={`px-3 py-1 rounded-full font-sans text-[11px] border transition-all ${
                        isSensoryActive
                          ? "bg-gold-burnished text-espresso-deep font-bold border-gold-bright"
                          : "bg-paper-sand hover:bg-surface-container-high border-border-hairline text-slate-warm"
                      }`}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>

              {/* Sort Select */}
              <div className="flex items-center gap-2 pl-2">
                <label
                  htmlFor="sort-select"
                  className="font-sans text-[10px] uppercase tracking-wider text-slate-warm hidden sm:inline"
                >
                  Ordenar:
                </label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-paper-sand border border-border-hairline rounded-lg px-3 py-1.5 font-sans text-xs text-espresso-deep focus:outline-none focus:border-gold-burnished cursor-pointer"
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
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 pb-20">
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
