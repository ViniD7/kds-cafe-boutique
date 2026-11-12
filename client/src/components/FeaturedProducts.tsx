import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productAPI } from "../services/api";
import { Product } from "../types/api";
import { useCart } from "../context/CartContext";
import { formatCurrency, getImageUrl } from "../lib/utils";
import { toast } from "sonner";

// Curated fallback products matching the Stitch Modern Editorial specification
const fallbackFeatured = [
  {
    id: "lata-colecionavel-250g",
    name: "Lata Colecionável 250g",
    category: "graos",
    price: 78.0,
    images: ["/images/canFront.webp"],
    description: "Reserva Especial • Catuaí Vermelho Fermentado",
    scaScore: 88,
    badge: "Edição Numerada",
    sensoryNotes: ["Chocolate 70%", "Maracujá Doce"],
  },
  {
    id: "cafe-arara-amarelo-250g",
    name: "Café Arara Amarelo 250g",
    category: "graos",
    price: 49.0,
    images: ["/images/sacheFront.webp"],
    description: "Microlote 1.400m • Processo Honey",
    scaScore: 87,
    badge: "Safra Nova",
    sensoryNotes: ["Flor de Laranjeira", "Pêssego em Calda"],
  },
  {
    id: "drip-coffee-pocket-box",
    name: "Drip Coffee Pocket Box",
    category: "drip",
    price: 54.0,
    images: ["/images/sacheBk.webp"],
    description: "Praticidade Gourmet • Filtrado individual onde estiver",
    scaScore: 86,
    badge: "10 Sachês",
    sensoryNotes: ["Caramelo Toffee", "Acidez Suave"],
  },
  {
    id: "cookie-cups-trio-degustacao",
    name: "Cookie Cups Trio Degustação",
    category: "cookie-cups",
    price: 62.0,
    images: ["/images/canTriple.webp"],
    description: "Copinhos artesanais comestíveis recheados para café",
    badge: "Exclusividade",
    sensoryNotes: ["Baunilha", "Cacau 70%", "Coco Queimado"],
  },
];

const FeaturedProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        const data = await productAPI.getAllProducts({ featured: true });
        if (data && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(fallbackFeatured);
        }
      } catch (err) {
        console.warn("Using fallback featured items:", err);
        setProducts(fallbackFeatured);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  const handleQuickAdd = async (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await addToCart(product.id || product._id, 1);
      toast.success(`${product.name} adicionado ao carrinho!`, {
        description: "Seu café especial está te esperando na sacola.",
      });
    } catch {
      toast.error("Não foi possível adicionar o produto ao carrinho.");
    }
  };

  const filteredProducts = products.filter((p) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "graos") return p.category?.toLowerCase().includes("grão") || p.category === "graos" || p.name?.toLowerCase().includes("grão") || p.name?.toLowerCase().includes("café");
    if (activeCategory === "drip") return p.category?.toLowerCase().includes("drip") || p.name?.toLowerCase().includes("drip");
    if (activeCategory === "cookie-cups") return p.category?.toLowerCase().includes("cookie") || p.name?.toLowerCase().includes("cookie");
    return true;
  });

  return (
    <section className="w-full py-16 md:py-24 bg-surface" id="catalogo">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-border-hairline">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-gold-burnished" />
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-gold-burnished font-bold">
                Safras &amp; Coleções
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-espresso-deep font-semibold">
              Seleção de Lotes Nobres
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full font-sans text-xs tracking-wider uppercase font-semibold transition-all ${
                activeCategory === "all"
                  ? "bg-espresso-deep text-paper-cream shadow-sm"
                  : "bg-paper-sand hover:bg-surface-container-high text-slate-warm hover:text-espresso-deep"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setActiveCategory("graos")}
              className={`px-4 py-2 rounded-full font-sans text-xs tracking-wider uppercase font-semibold transition-all ${
                activeCategory === "graos"
                  ? "bg-espresso-deep text-paper-cream shadow-sm"
                  : "bg-paper-sand hover:bg-surface-container-high text-slate-warm hover:text-espresso-deep"
              }`}
            >
              Grãos &amp; Moído
            </button>
            <button
              onClick={() => setActiveCategory("drip")}
              className={`px-4 py-2 rounded-full font-sans text-xs tracking-wider uppercase font-semibold transition-all ${
                activeCategory === "drip"
                  ? "bg-espresso-deep text-paper-cream shadow-sm"
                  : "bg-paper-sand hover:bg-surface-container-high text-slate-warm hover:text-espresso-deep"
              }`}
            >
              Drip Bags
            </button>
            <button
              onClick={() => setActiveCategory("cookie-cups")}
              className={`px-4 py-2 rounded-full font-sans text-xs tracking-wider uppercase font-semibold transition-all ${
                activeCategory === "cookie-cups"
                  ? "bg-espresso-deep text-paper-cream shadow-sm"
                  : "bg-paper-sand hover:bg-surface-container-high text-slate-warm hover:text-espresso-deep"
              }`}
            >
              Cookie Cups
            </button>
          </div>
        </div>

        {/* 4 Card Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.slice(0, 4).map((product) => {
            const prodImage = product.images?.[0]
              ? getImageUrl(product.images[0])
              : "/images/canFront.webp";
            const sca = product.scaScore || (product.name.includes("88") ? 88 : 87);
            const badge = product.badge || (product.featured ? "Destaque" : "Safra Nova");
            const notes =
              product.sensoryNotes ||
              (product.flavorNotes ? product.flavorNotes.split(",") : ["Chocolate 70%", "Floral"]);

            return (
              <div
                key={product.id || product._id}
                className="bg-surface-container-lowest rounded-xl border border-border-hairline hover:border-gold-bright transition-all duration-300 flex flex-col group overflow-hidden shadow-sm hover:shadow-xl"
              >
                {/* Image Container with Badges */}
                <Link
                  to={`/produtos/${product.id || product._id}`}
                  className="relative w-full aspect-square bg-paper-sand/50 overflow-hidden flex items-center justify-center p-6 focus:outline-none"
                >
                  <img
                    src={prodImage}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 items-start">
                    <span className="px-2.5 py-1 rounded bg-espresso-deep text-gold-bright font-sans text-[10px] font-bold tracking-wider uppercase border border-gold-bright/30">
                      {badge}
                    </span>
                  </div>

                  {sca && (
                    <div className="absolute top-3.5 right-3.5">
                      <span className="px-2 py-0.5 rounded-full bg-gold-bright/20 border border-gold-burnished text-espresso-deep font-sans text-[11px] font-bold">
                        {sca} SCA
                      </span>
                    </div>
                  )}
                </Link>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Sensory Notes Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {notes.map((note: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-full bg-paper-sand text-slate-warm text-[11px] font-medium border border-border-hairline"
                        >
                          {note.trim()}
                        </span>
                      ))}
                    </div>

                    <Link to={`/produtos/${product.id || product._id}`}>
                      <h3 className="font-serif text-lg text-espresso-deep group-hover:text-gold-burnished transition-colors font-semibold leading-snug">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="font-sans text-xs text-slate-warm mt-1.5 line-clamp-2">
                      {product.description || "Café especial colhido manualmente no Caparaó."}
                    </p>
                  </div>

                  {/* Bottom Price & Add to Cart */}
                  <div className="mt-5 pt-4 border-t border-border-hairline flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-warm block uppercase tracking-wider font-semibold">
                        Preço Atelier
                      </span>
                      <span className="font-serif text-xl text-espresso-deep font-bold">
                        {formatCurrency(product.price || 0)}
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleQuickAdd(product, e)}
                      className="w-10 h-10 rounded-full bg-espresso-deep text-paper-cream hover:bg-gold-burnished hover:text-espresso-deep flex items-center justify-center transition-all shadow-sm active:scale-95"
                      title="Adicionar ao Carrinho"
                      aria-label="Adicionar ao Carrinho"
                    >
                      <span className="material-symbols-outlined text-[19px]">
                        add_shopping_cart
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            to="/produtos"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-paper-sand hover:bg-espresso-deep text-espresso-deep hover:text-paper-cream font-sans text-xs uppercase tracking-wider font-bold border border-border-hairline hover:border-espresso-deep transition-all duration-300"
          >
            <span>Ver Todo o Catálogo</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
