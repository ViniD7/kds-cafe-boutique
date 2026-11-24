import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

interface SignatureProduct {
  id: string;
  name: string;
  subtitle: string;
  category: "all" | "latas" | "saches" | "praticidade";
  price: number;
  pixPrice: number;
  scaScore: number;
  altitude: string;
  variety: string;
  process: string;
  sensoryNotes: string[];
  description: string;
  frontImage: string;
  hoverImage: string;
  badge: string;
}

const SIGNATURE_PRODUCTS: SignatureProduct[] = [
  {
    id: "lata-250g-caparao-reserva-especial",
    name: "Lata Colecionável Caparaó Reserva",
    subtitle: "Safra Exclusiva • Catuaí Vermelho 144",
    category: "latas",
    price: 78.0,
    pixPrice: 74.1,
    scaScore: 88.5,
    altitude: "1.420m MASL",
    variety: "Catuaí Vermelho Fermentado",
    process: "Anaeróbio 72h em Terreiro Suspenso",
    sensoryNotes: ["Chocolate 70%", "Flor de Laranjeira", "Maracujá Doce"],
    description:
      "Nosso café ícone em lata cilíndrica hermética com vedação de alumínio dourado. Perfil licoroso com finalização prolongada.",
    frontImage: "/images/canFront.webp",
    hoverImage: "/images/canDiagonal.webp",
    badge: "88.5 SCA • Edição Numerada",
  },
  {
    id: "sache-250g-cafe-arara-amarelo",
    name: "Café Arara Amarelo de Altitude",
    subtitle: "Pacote Válvula Suíça • Microlote Raro",
    category: "saches",
    price: 49.0,
    pixPrice: 46.55,
    scaScore: 87.5,
    altitude: "1.380m MASL",
    variety: "Arara Amarelo Puro",
    process: "Cereja Descascado (Honey)",
    sensoryNotes: ["Manga em Calda", "Damasco", "Acidez Cítrica"],
    description:
      "Doçura cristalina com nuances de frutas amarelas e mel de flor de laranjeira. Pacote trilaminado com barreira contra UV.",
    frontImage: "/images/sacheFront.webp",
    hoverImage: "/images/sacheBack.webp",
    badge: "87.5 SCA • Safra Nova",
  },
  {
    id: "sache-250g-catuai-vermelho",
    name: "Pouch Gourmet Torra Média",
    subtitle: "Embalagem Black Matte • Tradição Caparaó",
    category: "saches",
    price: 42.0,
    pixPrice: 39.9,
    scaScore: 86.0,
    altitude: "1.350m MASL",
    variety: "Catuaí Vermelho & Amarelo",
    process: "Natural em Terreiro",
    sensoryNotes: ["Caramelo Toffee", "Cacau Belga", "Corpo Denso"],
    description:
      "Equilíbrio clássico para o ritual diário de conhecedores. Torra média que ressalta notas de chocolate e caramelo aveludado.",
    frontImage: "/images/sacheBk.webp",
    hoverImage: "/images/sacheBkBack.webp",
    badge: "86 SCA • Clássico Nobre",
  },
  {
    id: "drip-coffee-box-10-saches",
    name: "Drip Coffee Bag Box (10 Sachês)",
    subtitle: "Café Filtrado Individual de Bolso",
    category: "praticidade",
    price: 54.0,
    pixPrice: 51.3,
    scaScore: 86.5,
    altitude: "1.380m MASL",
    variety: "100% Arábica Selecionado",
    process: "Nitrogênio Puro na Embalagem",
    sensoryNotes: ["Mel Silvestre", "Praliné", "Praticidade"],
    description:
      "A nobreza do café especial coado na xícara em qualquer lugar. 10 filtros individuais lacrados sob nitrogênio alimentar.",
    frontImage: "/images/dripCoffe.webp",
    hoverImage: "/images/capsulaFront.webp",
    badge: "Praticidade Barista",
  },
];

export const SignatureCollection = () => {
  const [activeTab, setActiveTab] = useState<"all" | "latas" | "saches" | "praticidade">("all");
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);
  const { addToCart } = useCart();

  const filteredProducts =
    activeTab === "all"
      ? SIGNATURE_PRODUCTS
      : SIGNATURE_PRODUCTS.filter((p) => p.category === activeTab);

  const handleQuickAdd = async (product: SignatureProduct) => {
    try {
      await addToCart(product.id, 1);
      toast.success(`${product.name} adicionado à sacola!`);
    } catch {
      toast.error("Erro ao adicionar produto.");
    }
  };

  return (
    <section
      id="signature-collection"
      className="w-full bg-[#0D0B0A] text-[#F5F2EB] py-16 sm:py-24 md:py-32 relative overflow-hidden border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6 sm:gap-8 pb-6 sm:pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-2.5 sm:mb-3">
              <span className="w-2.5 h-2.5 bg-gold-bright" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold-bright font-bold">
                Coleção de Safras KDS
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-paper-cream font-normal">
              Signature <span className="italic text-gold-bright">Coffee Lots</span>
            </h2>
          </div>

          {/* Minimalist Filter Tabs com scroll horizontal suave no mobile */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none w-full md:w-auto">
            {[
              { id: "all", label: "Todos os Lotes" },
              { id: "latas", label: "Latas" },
              { id: "saches", label: "Pacotes Pouch" },
              { id: "praticidade", label: "Drip Coffee" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 sm:px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all border shrink-0 ${
                  activeTab === tab.id
                    ? "bg-gold-bright text-[#0D0B0A] font-bold border-gold-bright"
                    : "bg-white/[0.03] text-paper-sand/70 border-white/10 hover:border-white/30 hover:text-paper-cream"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ONYX BENTO GRID STAGE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {/* TILE 1: HEROIC SPECIAL RESERVE (SPAN 8 COLS) */}
          {filteredProducts[0] && (
            <div
              onMouseEnter={() => setHoveredProductId(filteredProducts[0].id)}
              onMouseLeave={() => setHoveredProductId(null)}
              className="lg:col-span-8 bg-[#161311] border border-white/10 hover:border-gold-bright/60 transition-all p-5 sm:p-8 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/10 font-mono text-[11px] sm:text-xs">
                <span className="text-gold-bright font-bold tracking-widest uppercase">
                  {filteredProducts[0].badge}
                </span>
                <span className="text-paper-sand/60 tracking-wider">
                  {filteredProducts[0].altitude}
                </span>
              </div>

              {/* Center Interactive Packaging Stage with Hover Cross-fade */}
              <div className="my-6 sm:my-8 flex flex-col md:flex-row items-center gap-6 sm:gap-8 justify-between">
                <div className="w-full md:w-1/2 h-52 sm:h-72 md:h-80 flex items-center justify-center relative">
                  <img
                    src={filteredProducts[0].frontImage}
                    alt={filteredProducts[0].name}
                    className={`max-h-full max-w-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] transition-all duration-700 ${
                      hoveredProductId === filteredProducts[0].id
                        ? "opacity-0 scale-95"
                        : "opacity-100 scale-100"
                    }`}
                  />
                  <img
                    src={filteredProducts[0].hoverImage}
                    alt={`${filteredProducts[0].name} vista diagonal`}
                    className={`absolute inset-0 m-auto max-h-full max-w-full object-contain filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.95)] transition-all duration-700 ${
                      hoveredProductId === filteredProducts[0].id
                        ? "opacity-100 scale-105"
                        : "opacity-0 scale-95"
                    }`}
                  />
                </div>

                <div className="w-full md:w-1/2 flex flex-col justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-gold-bright block mb-1">
                    {filteredProducts[0].variety}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-paper-cream mb-2">
                    {filteredProducts[0].name}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-paper-sand/70 font-light leading-relaxed mb-4 sm:mb-6">
                    {filteredProducts[0].description}
                  </p>

                  {/* Flavor Spectrum Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-4 sm:mb-6">
                    {filteredProducts[0].sensoryNotes.map((note) => (
                      <span
                        key={note}
                        className="px-2.5 py-1 bg-white/5 border border-white/10 text-paper-sand/90 font-mono text-[10px] sm:text-[10.5px] uppercase"
                      >
                        {note}
                      </span>
                    ))}
                  </div>

                  {/* Pricing and Action */}
                  <div className="pt-3 sm:pt-4 border-t border-white/10 flex items-baseline justify-between mb-4">
                    <div>
                      <span className="font-mono text-xl sm:text-2xl text-paper-cream font-bold block">
                        {formatCurrency(filteredProducts[0].price)}
                      </span>
                      <span className="font-mono text-[10.5px] text-gold-bright">
                        {formatCurrency(filteredProducts[0].pixPrice)} no Pix (-5%)
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                    <button
                      onClick={() => handleQuickAdd(filteredProducts[0])}
                      className="py-3 bg-gold-burnished hover:bg-gold-bright text-[#0D0B0A] font-mono text-xs uppercase tracking-widest font-bold transition-colors text-center"
                    >
                      + Adicionar
                    </button>
                    <Link
                      to={`/produtos/${filteredProducts[0].id}`}
                      className="py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-paper-cream font-mono text-xs uppercase tracking-widest font-medium transition-colors text-center"
                    >
                      Ver Detalhes →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TILE 2: TRANSPARENCY & HERITAGE (SPAN 4 COLS) */}
          <div className="lg:col-span-4 bg-[#110E0D] border border-white/10 p-5 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/10 font-mono text-xs uppercase tracking-widest text-gold-bright">
                <span>Transparência KDS</span>
                <span>Desde 1969</span>
              </div>
              <h4 className="font-serif text-xl sm:text-2xl text-paper-cream my-3 sm:my-4 leading-tight">
                Origem Rastreável &amp; Comércio Justo
              </h4>
              <p className="font-sans text-xs text-paper-sand/70 font-light leading-relaxed mb-4 sm:mb-6">
                Cultivado na encosta do Pico da Bandeira pela Família Dutra. Pagamos mais de 2.5x o
                valor de mercado pela excelência de colheita manual e pontuações SCA elevadas.
              </p>

              <div className="space-y-2.5 sm:space-y-3 font-mono text-xs">
                <div className="flex justify-between py-1.5 sm:py-2 border-b border-white/5">
                  <span className="text-paper-sand/50">Produtor:</span>
                  <span className="text-paper-cream">Família Dutra</span>
                </div>
                <div className="flex justify-between py-1.5 sm:py-2 border-b border-white/5">
                  <span className="text-paper-sand/50">Altitude:</span>
                  <span className="text-paper-cream">1.350m — 1.450m</span>
                </div>
                <div className="flex justify-between py-1.5 sm:py-2 border-b border-white/5">
                  <span className="text-paper-sand/50">Curadoria SCA:</span>
                  <span className="text-gold-bright font-bold">86 a 88.5+ Pts</span>
                </div>
                <div className="flex justify-between py-1.5 sm:py-2 border-b border-white/5">
                  <span className="text-paper-sand/50">Frequência Torra:</span>
                  <span className="text-paper-cream">Semanal sob Demanda</span>
                </div>
              </div>
            </div>

            <Link
              to="/sobre"
              className="mt-6 sm:mt-8 py-3 w-full bg-white/5 hover:bg-white/10 border border-white/10 text-paper-sand/90 hover:text-paper-cream font-mono text-xs uppercase tracking-widest text-center transition-colors block"
            >
              Conhecer a Fazenda →
            </Link>
          </div>

          {/* TILES 3, 4, 5: COMPACT BENTO LOTS */}
          {filteredProducts.slice(1).map((prod) => (
            <div
              key={prod.id}
              onMouseEnter={() => setHoveredProductId(prod.id)}
              onMouseLeave={() => setHoveredProductId(null)}
              className="lg:col-span-4 bg-[#161311] border border-white/10 hover:border-gold-bright/60 transition-all p-5 sm:p-6 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-[10.5px] sm:text-[11px]">
                  <span className="text-gold-bright font-bold uppercase">{prod.badge}</span>
                  <span className="text-paper-sand/50">{prod.altitude}</span>
                </div>

                <div className="h-44 sm:h-48 flex items-center justify-center my-4 sm:my-6 relative">
                  <img
                    src={prod.frontImage}
                    alt={prod.name}
                    className={`max-h-full max-w-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.85)] transition-all duration-500 ${
                      hoveredProductId === prod.id ? "opacity-0 scale-95" : "opacity-100 scale-100"
                    }`}
                  />
                  <img
                    src={prod.hoverImage}
                    alt={prod.name}
                    className={`absolute inset-0 m-auto max-h-full max-w-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)] transition-all duration-500 ${
                      hoveredProductId === prod.id ? "opacity-100 scale-105" : "opacity-0 scale-95"
                    }`}
                  />
                </div>

                <span className="font-mono text-[9.5px] uppercase tracking-widest text-gold-bright block mb-1">
                  {prod.variety}
                </span>
                <h4 className="font-serif text-lg sm:text-xl text-paper-cream mb-2 group-hover:text-gold-bright transition-colors">
                  {prod.name}
                </h4>
                <p className="font-sans text-xs text-paper-sand/65 font-light line-clamp-2 mb-3 sm:mb-4">
                  {prod.description}
                </p>

                {/* Notes */}
                <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
                  {prod.sensoryNotes.map((note) => (
                    <span
                      key={note}
                      className="px-2 py-0.5 bg-white/5 border border-white/10 text-paper-sand/80 font-mono text-[9.5px]"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 sm:pt-4 border-t border-white/10">
                <div className="flex items-baseline justify-between mb-3 sm:mb-4">
                  <span className="font-mono text-lg sm:text-xl text-paper-cream font-bold">
                    {formatCurrency(prod.price)}
                  </span>
                  <span className="font-mono text-[10px] text-gold-bright">
                    {formatCurrency(prod.pixPrice)} Pix
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleQuickAdd(prod)}
                    className="py-2.5 bg-gold-burnished hover:bg-gold-bright text-[#0D0B0A] font-mono text-xs uppercase tracking-wider font-bold transition-colors text-center"
                  >
                    + Bag
                  </button>
                  <Link
                    to={`/produtos/${prod.id}`}
                    className="py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-paper-cream font-mono text-xs uppercase tracking-wider font-medium transition-colors text-center"
                  >
                    Detalhes →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignatureCollection;
