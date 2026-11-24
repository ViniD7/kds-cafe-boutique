import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { productAPI } from "@/services/api";
import { Product } from "@/types/api";
import { formatCurrency, getImageUrl } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

// Default rich product data fallback matching the Onyx Coffee Lab design
const defaultProductData: Record<string, any> = {
  "lata-250g-caparao-reserva-especial": {
    id: "lata-250g-caparao-reserva-especial",
    name: "Lata Colecionável 250g Café Reserva da Família",
    category: "graos",
    price: 78.0,
    originalPrice: 85.0,
    images: [
      "/images/canFront.webp",
      "/images/canDiagonal.webp",
      "/images/canTriple.webp",
      "/images/coffeDetails.webp",
    ],
    description:
      "Microlote fermentado anaeróbio em altitude extrema nas encostas do Caparaó. Grãos raros de colheita manual seletiva com perfil sensorial extraordinário e finalização prolongada.",
    scaScore: 88.5,
    badge: "88.5 SCA • Microlote Raro",
    lotNumber: "Lote #04/2024",
    sensoryNotes: [
      "Chocolate Belga 70%",
      "Flor de Laranjeira",
      "Pêssego Fresco",
      "Acidez Cítrica Fina",
    ],
    producer: "Família Dutra (Sítio Boa Vista)",
    altitude: "1.350m a 1.450m MASL",
    variety: "Catuaí Vermelho 144 (100% Coffea Arabica)",
    process: "Anaeróbio 72h em Terreiro Suspenso",
    variants: [
      { id: "v1", name: "Lata 250g", price: 78.0, stock: 15 },
      { id: "v2", name: "Refil 500g", price: 119.0, stock: 10 },
      { id: "v3", name: "Bolsa 1kg", price: 198.0, stock: 8 },
    ],
  },
};

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedGrind, setSelectedGrind] = useState("graos");
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [cep, setCep] = useState("");
  const [shippingResult, setShippingResult] = useState<boolean>(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await productAPI.getProductById(id);
        if (data) {
          setProduct(data);
        } else if (defaultProductData[id]) {
          setProduct(defaultProductData[id]);
        } else {
          setProduct({
            ...defaultProductData["lata-250g-caparao-reserva-especial"],
            id,
            name: id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
          });
        }
      } catch {
        if (defaultProductData[id]) {
          setProduct(defaultProductData[id]);
        } else {
          setProduct({
            ...defaultProductData["lata-250g-caparao-reserva-especial"],
            id,
            name: id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full min-h-[70vh] flex items-center justify-center bg-[#0D0B0A] text-[#F5F2EB]">
        <div className="flex flex-col items-center gap-3">
          <span className="material-symbols-outlined text-[40px] text-gold-bright animate-spin">
            progress_activity
          </span>
          <p className="font-mono text-xs uppercase tracking-widest text-paper-sand/60">
            Carregando microlote KDS...
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center p-8 bg-[#0D0B0A] text-[#F5F2EB] text-center">
        <span className="material-symbols-outlined text-[48px] text-gold-bright mb-3">
          coffee
        </span>
        <h1 className="font-serif text-3xl text-paper-cream font-normal mb-2">
          Microlote não encontrado
        </h1>
        <p className="font-sans text-xs sm:text-sm text-paper-sand/60 mb-6 max-w-md">
          Este lote já foi completamente finalizado ou não está disponível nesta safra.
        </p>
        <Link
          to="/produtos"
          className="px-6 py-3 bg-gold-burnished hover:bg-gold-bright text-[#0D0B0A] font-mono text-xs uppercase tracking-widest font-bold"
        >
          Explorar Catálogo →
        </Link>
      </div>
    );
  }

  const variants =
    product.variants && product.variants.length > 0
      ? product.variants
      : [
          { id: "v1", name: "Lata 250g", price: product.price || 78, stock: 10 },
          { id: "v2", name: "Refil 500g", price: (product.price || 78) * 1.8, stock: 8 },
          { id: "v3", name: "Bolsa 1kg", price: (product.price || 78) * 3.2, stock: 5 },
        ];

  const currentVariant = variants[selectedSizeIndex] || variants[0];
  const currentPrice = currentVariant.price || product.price || 78;
  const pixPrice = currentPrice * 0.95;

  const imagesList =
    product.images && product.images.length > 0
      ? product.images.map((img: string) => getImageUrl(img))
      : ["/images/canFront.webp", "/images/canDiagonal.webp", "/images/canTriple.webp"].map(
          getImageUrl
        );

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      await addToCart(product.id || product._id, quantity, currentVariant.id);
      toast.success(`${product.name} adicionado à sacola!`, {
        description: `${quantity}x ${currentVariant.name} • Moagem: ${selectedGrind.toUpperCase()}`,
      });
    } catch {
      toast.error("Não foi possível adicionar o produto ao carrinho.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWhatsAppOrder = () => {
    const message = `Olá! Gostaria de encomendar:%0A*${product.name}*%0A• Volume: ${
      currentVariant.name
    }%0A• Moagem: ${selectedGrind}%0A• Quantidade: ${quantity}%0A• Valor unitário: ${formatCurrency(
      currentPrice
    )}%0A• Total: ${formatCurrency(currentPrice * quantity)}%0A%0AEnvio para o Caparaó.`;

    const whatsappUrl = `https://wa.me/5528999921033?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleCalculateShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (cep.length >= 8) {
      setShippingResult(true);
    }
  };

  const grindOptions = [
    {
      id: "graos",
      label: "Em Grãos Inteiros",
      desc: "Máximo frescor para moer em casa",
    },
    {
      id: "filtro",
      label: "Filtro / V60 / Chemex",
      desc: "Moagem média calibrada",
    },
    {
      id: "espresso",
      label: "Espresso & Cafeteira",
      desc: "Moagem fina sensorial",
    },
    {
      id: "prensa",
      label: "Prensa Francesa",
      desc: "Moagem grossa sem resíduos",
    },
  ];

  return (
    <div className="w-full flex flex-col bg-[#0D0B0A] text-[#F5F2EB] min-h-screen">
      {/* 1. BREADCRUMBS & ONYX PROVENANCE STRIP */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-y-2 text-paper-sand/60 text-xs font-mono pb-4 border-b border-white/10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2">
            <Link to="/" className="hover:text-gold-bright transition-colors uppercase">
              Início
            </Link>
            <span>/</span>
            <Link to="/produtos" className="hover:text-gold-bright transition-colors uppercase">
              Cafés Especiais
            </Link>
            <span>/</span>
            <span className="text-paper-cream truncate max-w-xs">{product.name}</span>
          </nav>
          <div className="flex items-center gap-2 text-gold-bright uppercase tracking-wider text-[11px] font-bold">
            <span className="w-2 h-2 bg-gold-bright inline-block" />
            <span>TORRA SEMANAL // EXPEDIÇÃO EM ATÉ 48H</span>
          </div>
        </div>
      </div>

      {/* 2. TWO-COLUMN PRODUCT SHOWCASE (ONYX ARCHITECTURAL STAGE) */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Sticky Gallery & Archival Packaging View */}
          <div className="lg:col-span-7 flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
            {/* Main Image Stage */}
            <div className="relative w-full aspect-[4/3] bg-[#161311] border border-white/10 overflow-hidden flex items-center justify-center p-8 group">
              <img
                src={imagesList[selectedImage] || imagesList[0]}
                alt={product.name}
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)] transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="px-3 py-1 bg-[#0D0B0A] border border-gold-bright/30 text-gold-bright font-mono text-[10.5px] uppercase tracking-widest font-bold">
                  SAFRA 2024/2025 // CAPARAÓ
                </span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="grid grid-cols-4 gap-3">
              {imagesList.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-square bg-[#161311] p-3 border transition-all ${
                    selectedImage === idx
                      ? "border-gold-bright shadow-lg"
                      : "border-white/10 hover:border-white/30"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Miniatura ${idx + 1}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>

            {/* Quality Guarantees Bar - Onyx Minimal Style */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-5 bg-[#161311] border border-white/10">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gold-bright text-[22px]">air</span>
                <div className="flex flex-col">
                  <span className="font-mono text-xs text-paper-cream font-bold">Válvula Ativa</span>
                  <span className="font-sans text-[11px] text-paper-sand/60">Gases sem oxidação</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gold-bright text-[22px]">
                  local_fire_department
                </span>
                <div className="flex flex-col">
                  <span className="font-mono text-xs text-paper-cream font-bold">Torra Sob Demanda</span>
                  <span className="font-sans text-[11px] text-paper-sand/60">Artesanal semanal</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gold-bright text-[22px]">
                  verified_user
                </span>
                <div className="flex flex-col">
                  <span className="font-mono text-xs text-paper-cream font-bold">100% Rastreável</span>
                  <span className="font-sans text-[11px] text-paper-sand/60">Pequiá, Iúna-ES</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Purchasing Engine */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Header & Badges */}
            <div className="flex flex-col gap-2 pb-6 border-b border-white/10">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-3 py-1 bg-gold-bright text-[#0D0B0A] font-mono text-[10.5px] font-bold tracking-wider uppercase">
                  {product.scaScore ? `${product.scaScore} SCA • Microlote Raro` : "88.5 SCA"}
                </span>
                <span className="px-2.5 py-1 bg-white/5 border border-white/10 text-paper-sand/70 font-mono text-[10.5px]">
                  {product.lotNumber || "LOTE #04/2024"}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl text-paper-cream font-normal">
                {product.name}
              </h1>

              <p className="font-sans text-xs sm:text-sm text-paper-sand/75 font-light leading-relaxed mt-2">
                {product.description}
              </p>
            </div>

            {/* Sensory Flavor Spectrum */}
            <div className="p-5 bg-[#161311] border border-white/10">
              <span className="font-mono text-[10px] uppercase tracking-widest text-gold-bright block mb-3">
                Perfil Sensorial Predominante
              </span>
              <div className="flex flex-wrap gap-2">
                {(
                  product.sensoryNotes || [
                    "Chocolate Belga 70%",
                    "Flor de Laranjeira",
                    "Pêssego Fresco",
                    "Acidez Cítrica Fina",
                  ]
                ).map((note: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white/5 border border-white/10 text-paper-cream font-mono text-xs"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Price Panel */}
            <div className="p-5 bg-[#161311] border border-white/10 flex flex-col gap-2">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-3xl text-paper-cream font-bold">
                  {formatCurrency(currentPrice)}
                </span>
                <span className="px-2.5 py-1 bg-gold-bright text-[#0D0B0A] font-mono text-xs font-bold">
                  {formatCurrency(pixPrice)} no Pix (-5%)
                </span>
              </div>
              <span className="font-mono text-[11px] text-paper-sand/60">
                Ou até 3x de {formatCurrency(currentPrice / 3)} sem juros no cartão de crédito
              </span>
            </div>

            {/* Moagem Selector */}
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-paper-sand/80">
                1. Selecione a Moagem:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {grindOptions.map((g) => {
                  const isSelected = selectedGrind === g.id;
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setSelectedGrind(g.id)}
                      className={`p-3 text-left flex flex-col justify-between transition-all border ${
                        isSelected
                          ? "bg-[#161311] border-gold-bright text-paper-cream"
                          : "bg-white/[0.02] border-white/10 text-paper-sand/60 hover:border-white/30"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-xs font-bold text-paper-cream">
                          {g.label}
                        </span>
                        <span
                          className={`w-2 h-2 ${
                            isSelected ? "bg-gold-bright" : "bg-transparent border border-white/30"
                          }`}
                        />
                      </div>
                      <span className="font-sans text-[10px] text-paper-sand/50">{g.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Formato & Volume Selector */}
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-paper-sand/80">
                2. Formato &amp; Volume:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {variants.map((variant: any, idx: number) => {
                  const isSelected = selectedSizeIndex === idx;
                  return (
                    <button
                      key={variant.id || idx}
                      type="button"
                      onClick={() => setSelectedSizeIndex(idx)}
                      className={`p-3 text-center transition-all border flex flex-col items-center ${
                        isSelected
                          ? "bg-[#161311] border-gold-bright text-paper-cream"
                          : "bg-white/[0.02] border-white/10 text-paper-sand/60 hover:border-white/30"
                      }`}
                    >
                      <span className="font-mono text-xs font-bold text-paper-cream">
                        {variant.name}
                      </span>
                      <span className="font-mono text-[11px] text-gold-bright mt-1">
                        {formatCurrency(variant.price || currentPrice)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions: Quantity + Add to Cart + WhatsApp */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Counter */}
                <div className="flex items-center bg-[#161311] border border-white/10 p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-paper-cream hover:bg-white/10 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">remove</span>
                  </button>
                  <span className="w-8 text-center font-mono text-sm font-bold text-paper-cream">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-paper-cream hover:bg-white/10 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                  </button>
                </div>

                {/* Primary Add Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="flex-1 bg-gold-burnished hover:bg-gold-bright text-[#0D0B0A] font-mono text-xs uppercase tracking-widest font-bold py-3.5 px-6 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                  <span>{isAddingToCart ? "Adicionando..." : "Adicionar à Sacola"}</span>
                </button>
              </div>

              {/* Secondary WhatsApp Concierge Button */}
              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="w-full bg-[#161311] hover:bg-white/10 text-paper-cream py-3 px-4 border border-white/10 flex items-center justify-center gap-2 transition-colors font-mono text-xs uppercase tracking-wider"
              >
                <span className="material-symbols-outlined text-[18px] text-gold-bright">chat</span>
                <span>Comprar / Tirar Dúvidas via Concierge WhatsApp</span>
              </button>
            </div>

            {/* Shipping Calculator */}
            <div className="p-4 bg-[#161311] border border-white/10 flex flex-col gap-3 font-mono">
              <div className="flex items-center justify-between text-xs">
                <span className="text-paper-cream font-bold">Cálculo de Envio Direto</span>
                <span className="text-paper-sand/50">Frete grátis &gt; R$ 199</span>
              </div>

              <form onSubmit={handleCalculateShipping} className="flex items-center gap-2">
                <input
                  type="text"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  placeholder="Digite seu CEP"
                  maxLength={9}
                  className="flex-1 px-3 py-2 text-xs bg-[#0D0B0A] border border-white/10 focus:border-gold-bright text-paper-cream focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-paper-cream text-[#0D0B0A] hover:bg-gold-bright px-4 py-2 font-mono text-xs uppercase font-bold transition-colors"
                >
                  Calcular
                </button>
              </form>

              {shippingResult && (
                <div className="flex flex-col gap-1.5 pt-2 border-t border-white/10 text-xs">
                  <div className="flex justify-between">
                    <span className="text-paper-sand/80">Expresso Caparaó (3-4 dias)</span>
                    <span className="font-bold text-paper-cream">R$ 14,90</span>
                  </div>
                  <div className="flex justify-between text-gold-bright font-bold">
                    <span>Frete Cortesia</span>
                    <span>Acima de R$ 199</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. DOSSIÊ TÉCNICO & TRANSPARÊNCIA (ONYX ARCHIVAL METRICS) */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16 border-t border-white/10">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold-bright font-bold block mb-2">
                Transparência Científica // Dossiê do Lote
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-paper-cream font-normal">
                Rastreabilidade de Ateliê
              </h2>
            </div>
            <p className="font-sans text-xs sm:text-sm text-paper-sand/70 max-w-md font-light">
              Cada grama do lote respeita ciclos lentos de montanha. Colhido a dedo por três
              gerações nas encostas do Pico da Bandeira.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 bg-[#161311] border border-white/10">
              <span className="font-mono text-[10px] uppercase tracking-widest text-gold-bright block mb-1">
                Produtor Responsável
              </span>
              <h4 className="font-serif text-lg text-paper-cream mb-2">
                {product.producer || "Família Dutra (Sítio Boa Vista)"}
              </h4>
              <p className="font-sans text-xs text-paper-sand/65 font-light">
                55 anos de dedicação ininterrupta à cafeicultura no Caparaó Capixaba.
              </p>
            </div>

            <div className="p-6 bg-[#161311] border border-white/10">
              <span className="font-mono text-[10px] uppercase tracking-widest text-gold-bright block mb-1">
                Altitude Geográfica
              </span>
              <h4 className="font-serif text-lg text-paper-cream mb-2">
                {product.altitude || "1.350m a 1.450m MASL"}
              </h4>
              <p className="font-sans text-xs text-paper-sand/65 font-light">
                Amplitude térmica que retarda a maturação e concentra açúcares complexos.
              </p>
            </div>

            <div className="p-6 bg-[#161311] border border-white/10">
              <span className="font-mono text-[10px] uppercase tracking-widest text-gold-bright block mb-1">
                Variedade Botânica
              </span>
              <h4 className="font-serif text-lg text-paper-cream mb-2">
                {product.variety || "Catuaí Vermelho 144"}
              </h4>
              <p className="font-sans text-xs text-paper-sand/65 font-light">
                100% Coffea Arabica com pureza varietal e doçura aveludada.
              </p>
            </div>

            <div className="p-6 bg-[#161311] border border-white/10">
              <span className="font-mono text-[10px] uppercase tracking-widest text-gold-bright block mb-1">
                Processamento
              </span>
              <h4 className="font-serif text-lg text-paper-cream mb-2">
                {product.process || "Terreiro Suspenso"}
              </h4>
              <p className="font-sans text-xs text-paper-sand/65 font-light">
                Secagem lenta com aeração contínua até 11% de umidade perfeita.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
