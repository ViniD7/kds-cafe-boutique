import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { productAPI } from "@/services/api";
import { Product } from "@/types/api";
import { formatCurrency, getImageUrl } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

// Default rich product data fallback matching the Stitch design
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
      "Microlote fermentado anaeróbio em altitude extrema nas encostas do Caparaó. Grãos raros de colheita manual seletiva com perfil sensorial extraordinário e corpo sedoso inigualável.",
    scaScore: 88.5,
    badge: "88.5 SCA • Microlote Raro",
    lotNumber: "Lote #04/2024",
    sensoryNotes: ["Chocolate Aveludado", "Maracujá Doce", "Caramelo Toffee", "Acidez Cítrica Fina"],
    producer: "Família Dutra (Sítio Boa Vista)",
    altitude: "1.250m a 1.450m MASL",
    variety: "Arara Amarelo (100% Coffea Arabica)",
    process: "Natural Fermentado Suspenso",
    variants: [
      { id: "v1", name: "Lata 250g", price: 78.0, stock: 15 },
      { id: "v2", name: "Refil 500g", price: 119.0, stock: 10 },
      { id: "v3", name: "Bolsa 1kg", price: 198.0, stock: 8 },
    ],
  },
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
          // If not in API and not exact match, use the primary template enriched with the ID
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
      <div className="w-full min-h-[60vh] flex items-center justify-center bg-surface">
        <div className="flex flex-col items-center gap-3">
          <span className="material-symbols-outlined text-[40px] text-gold-burnished animate-spin">
            progress_activity
          </span>
          <p className="font-sans text-sm text-slate-warm">Carregando detalhes do microlote...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-8 bg-surface text-center">
        <span className="material-symbols-outlined text-[50px] text-slate-warm mb-3">
          search_off
        </span>
        <h1 className="font-serif text-3xl text-espresso-deep font-semibold mb-2">
          Produto não encontrado
        </h1>
        <p className="font-sans text-sm text-slate-warm mb-6 max-w-md">
          O café que você está procurando não existe ou sua safra já foi completamente finalizada.
        </p>
        <Link
          to="/produtos"
          className="px-6 py-3 rounded-lg bg-espresso-deep text-paper-cream font-sans text-xs uppercase tracking-wider font-semibold"
        >
          Explorar Catálogo
        </Link>
      </div>
    );
  }

  const variants = product.variants && product.variants.length > 0
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
      : ["/images/canFront.webp", "/images/canDiagonal.webp", "/images/coffeDetails.webp"];

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      await addToCart(product.id || product._id, quantity, currentVariant.id);
      toast.success(`${product.name} adicionado ao carrinho!`, {
        description: `${quantity}x ${currentVariant.name} • Moagem: ${selectedGrind.toUpperCase()}`,
      });
    } catch {
      toast.error("Não foi possível adicionar o produto ao carrinho.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWhatsAppOrder = () => {
    const message = `Olá! Gostaria de comprar:%0A*${product.name}*%0A• Tamanho/Formato: ${
      currentVariant.name
    }%0A• Moagem: ${selectedGrind}%0A• Quantidade: ${quantity}%0A• Valor unitário: ${formatCurrency(
      currentPrice
    )}%0A• Total: ${formatCurrency(currentPrice * quantity)}%0A%0AAguardo confirmação do envio!`;

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
      desc: "Máximo frescor p/ moer em casa",
    },
    {
      id: "filtro",
      label: "Filtro / V60 / Melitta",
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
    <div className="w-full flex flex-col bg-surface min-h-screen">
      {/* 1. BREADCRUMBS & ROAST STATUS */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-2">
        <div className="flex flex-wrap items-center justify-between gap-y-2 text-slate-warm text-xs font-sans">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2">
            <Link to="/" className="hover:text-espresso-deep transition-colors">
              Início
            </Link>
            <span>/</span>
            <Link to="/produtos" className="hover:text-espresso-deep transition-colors">
              Cafés Especiais
            </Link>
            <span>/</span>
            <span className="text-espresso-deep font-semibold truncate max-w-xs">
              {product.name}
            </span>
          </nav>
          <div className="flex items-center gap-2 text-gold-burnished font-sans uppercase tracking-wider text-[11px] font-semibold">
            <span className="inline-block w-2 h-2 rounded-full bg-gold-bright animate-pulse" />
            <span>Torra da Semana: Lote Recente Finalizado</span>
          </div>
        </div>
      </div>

      {/* 2. TWO-COLUMN PRODUCT SHOWCASE */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Gallery & Guarantees */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Main Image Stage */}
            <div className="relative w-full aspect-[4/3] rounded-2xl bg-paper-sand overflow-hidden shadow-sm border border-border-hairline group flex items-center justify-center p-8">
              <img
                src={imagesList[selectedImage] || imagesList[0]}
                alt={product.name}
                className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="px-3 py-1 rounded-full bg-espresso-deep/90 backdrop-blur-md text-gold-bright font-sans text-[11px] uppercase tracking-widest shadow-sm font-semibold">
                  Safra Caparaó 2024/2025
                </span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="grid grid-cols-4 gap-3">
              {imagesList.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative rounded-xl overflow-hidden aspect-square bg-paper-sand p-2 border transition-all ${
                    selectedImage === idx
                      ? "ring-2 ring-gold-burnished border-gold-burnished"
                      : "border-border-hairline hover:border-gold-burnished/50"
                  }`}
                >
                  <img src={img} alt={`Miniatura ${idx + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>

            {/* Quality Guarantees Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-paper-sand/60 border border-border-hairline">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gold-burnished text-[24px]">
                  air
                </span>
                <div className="flex flex-col">
                  <span className="font-sans text-xs font-semibold text-espresso-deep">
                    Válvula Ativa
                  </span>
                  <span className="font-sans text-[11px] text-slate-warm">
                    Gases sem oxidação
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gold-burnished text-[24px]">
                  local_fire_department
                </span>
                <div className="flex flex-col">
                  <span className="font-sans text-xs font-semibold text-espresso-deep">
                    Torra Semanal
                  </span>
                  <span className="font-sans text-[11px] text-slate-warm">
                    Forno artesanal de precisão
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gold-burnished text-[24px]">
                  verified_user
                </span>
                <div className="flex flex-col">
                  <span className="font-sans text-xs font-semibold text-espresso-deep">
                    100% Rastreável
                  </span>
                  <span className="font-sans text-[11px] text-slate-warm">
                    Origem direta Caparaó ES
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Purchasing Engine */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Header & Badges */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-sans text-[11px] font-bold tracking-wider uppercase">
                  {product.scaScore ? `${product.scaScore} SCA • Microlote Raro` : "88 SCA • Reserva Especial"}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-sans text-[11px]">
                  {product.lotNumber || "Lote #04/2024"}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl text-espresso-deep font-semibold tracking-tight">
                {product.name}
              </h1>

              {/* Barista Reviews */}
              <div className="flex items-center gap-2 pt-1">
                <div className="flex items-center text-gold-burnished">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <span className="font-sans text-xs font-bold text-espresso-deep">5.0</span>
                <span className="font-sans text-xs text-slate-warm">(48 avaliações de mestres e baristas)</span>
              </div>
            </div>

            {/* Sensory Flavor Cloud */}
            <div className="flex flex-col gap-2 p-4 rounded-xl bg-paper-sand border border-border-hairline">
              <span className="font-sans text-[10px] uppercase tracking-widest text-slate-warm font-semibold">
                Perfil Sensorial Predominante
              </span>
              <div className="flex flex-wrap gap-2">
                {(product.sensoryNotes || ["Chocolate Nobre", "Caramelo Toffee", "Flor de Laranjeira", "Pêssego"]).map(
                  (note: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-white text-espresso-deep font-sans text-xs border border-border-hairline shadow-sm flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-burnished" />
                      {note}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Price Panel */}
            <div className="flex flex-col gap-1.5 p-4 rounded-xl bg-paper-sand/50 border border-border-hairline">
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl text-espresso-deep font-bold">
                    {formatCurrency(currentPrice)}
                  </span>
                  {product.originalPrice && product.originalPrice > currentPrice && (
                    <span className="font-sans text-sm text-slate-warm line-through">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                </div>
                <span className="px-2.5 py-1 rounded-md bg-gold-bright/20 text-espresso-deep font-sans text-[11px] font-bold uppercase tracking-wider">
                  5% OFF no Pix: {formatCurrency(pixPrice)}
                </span>
              </div>
              <span className="font-sans text-xs text-slate-warm">
                Ou em até <strong className="text-espresso-deep font-semibold">3x de {formatCurrency(currentPrice / 3)}</strong> sem juros no cartão de crédito
              </span>
            </div>

            {/* Moagem Selector */}
            <div className="flex flex-col gap-2">
              <span className="font-sans text-xs uppercase tracking-wider text-espresso-deep font-bold">
                1. Escolha a Moagem
              </span>
              <div className="grid grid-cols-2 gap-2">
                {grindOptions.map((g) => {
                  const isSelected = selectedGrind === g.id;
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setSelectedGrind(g.id)}
                      className={`p-3 rounded-xl text-left flex flex-col justify-between transition-all border ${
                        isSelected
                          ? "bg-white border-gold-burnished shadow-sm ring-1 ring-gold-burnished"
                          : "bg-paper-sand/50 border-border-hairline hover:bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-sans text-xs font-bold text-espresso-deep">
                          {g.label}
                        </span>
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isSelected ? "bg-gold-burnished" : "bg-transparent"
                          }`}
                        />
                      </div>
                      <span className="font-sans text-[11px] text-slate-warm mt-1">
                        {g.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Formato & Volume Selector */}
            <div className="flex flex-col gap-2">
              <span className="font-sans text-xs uppercase tracking-wider text-espresso-deep font-bold">
                2. Formato &amp; Volume
              </span>
              <div className="grid grid-cols-3 gap-2">
                {variants.map((variant: any, idx: number) => {
                  const isSelected = selectedSizeIndex === idx;
                  return (
                    <button
                      key={variant.id || idx}
                      type="button"
                      onClick={() => setSelectedSizeIndex(idx)}
                      className={`p-3 rounded-xl flex flex-col items-center text-center transition-all border ${
                        isSelected
                          ? "bg-white border-gold-burnished shadow-sm ring-1 ring-gold-burnished"
                          : "bg-paper-sand/50 border-border-hairline hover:bg-white"
                      }`}
                    >
                      <span className="font-sans text-xs font-bold text-espresso-deep">
                        {variant.name}
                      </span>
                      <span className="font-sans text-[11px] text-gold-burnished font-semibold mt-0.5">
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
                <div className="flex items-center bg-paper-sand rounded-xl p-1 border border-border-hairline shadow-sm">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-espresso-deep hover:bg-white transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">remove</span>
                  </button>
                  <span className="w-9 text-center font-sans text-sm font-bold text-espresso-deep">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-espresso-deep hover:bg-white transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                  </button>
                </div>

                {/* Primary Add Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="flex-1 bg-espresso-deep hover:bg-espresso-surface text-paper-cream rounded-xl py-3.5 px-6 shadow-md transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-gold-bright group-hover:scale-110 transition-transform text-[20px]">
                    shopping_bag
                  </span>
                  <span className="font-sans text-xs uppercase tracking-wider font-bold">
                    {isAddingToCart ? "Adicionando..." : "Adicionar à Sacola"}
                  </span>
                </button>
              </div>

              {/* Secondary WhatsApp Concierge Button */}
              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="w-full bg-paper-sand hover:bg-surface-container-high text-espresso-deep py-3 px-4 rounded-xl border border-border-hairline shadow-sm flex items-center justify-center gap-2 transition-colors font-sans text-xs uppercase tracking-wider font-bold"
              >
                <span className="material-symbols-outlined text-[20px] text-gold-burnished">
                  chat
                </span>
                <span>Tirar Dúvidas / Comprar via WhatsApp</span>
              </button>
            </div>

            {/* Shipping Calculator */}
            <div className="p-4 rounded-xl bg-paper-sand/50 border border-border-hairline flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-espresso-deep text-[20px]">
                    local_shipping
                  </span>
                  <span className="font-sans text-xs font-bold text-espresso-deep uppercase tracking-wider">
                    Cálculo de Envio Fresco
                  </span>
                </div>
                <span className="font-sans text-[11px] text-slate-warm">Direto do Caparaó</span>
              </div>

              <form onSubmit={handleCalculateShipping} className="flex items-center gap-2">
                <input
                  type="text"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  placeholder="Digite seu CEP (ex: 29000-000)"
                  maxLength={9}
                  className="flex-1 px-3.5 py-2.5 text-xs font-sans rounded-lg bg-white text-espresso-deep border border-border-hairline focus:border-gold-burnished focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-espresso-deep text-paper-cream hover:bg-espresso-surface px-4 py-2.5 rounded-lg font-sans text-xs uppercase tracking-wider font-bold transition-colors"
                >
                  Calcular
                </button>
              </form>

              {shippingResult && (
                <div className="flex flex-col gap-2 pt-2 border-t border-border-hairline/60 font-sans text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-espresso-deep font-medium">Expresso Caparaó (3-4 dias úteis)</span>
                    <span className="font-bold text-espresso-deep">R$ 14,90</span>
                  </div>
                  <div className="flex items-center justify-between text-gold-burnished font-semibold">
                    <span>Frete Grátis Atelier</span>
                    <span className="text-slate-warm text-[11px]">Em compras acima de R$ 199</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. DOSSIÊ TÉCNICO & RASTREABILIDADE */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16" id="dossie-tecnico">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-border-hairline">
            <div>
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-gold-burnished font-bold block mb-1">
                Curadoria de Precisão
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-espresso-deep font-semibold">
                Dossiê Técnico &amp; Rastreabilidade
              </h2>
            </div>
            <p className="font-sans text-sm text-slate-warm max-w-md font-light">
              Cada grama do lote respeita ciclos lentos de altitude. Colhido a dedo por três gerações
              na Serra do Caparaó.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 7 Columns: Botanical Specs */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-paper-sand/50 border border-border-hairline flex flex-col justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-white text-gold-burnished shadow-sm">
                    <span className="material-symbols-outlined text-[24px]">qr_code_2</span>
                  </div>
                  <div>
                    <span className="font-sans text-[10px] uppercase tracking-wider text-slate-warm">
                      Produtor Responsável
                    </span>
                    <p className="font-sans text-xs font-bold text-espresso-deep">
                      {product.producer || "Família Dutra (Sítio Boa Vista)"}
                    </p>
                  </div>
                </div>
                <p className="font-sans text-xs text-slate-warm mt-3">
                  Tradição familiar de 55 anos dedicada exclusivamente à cafeicultura especial nas
                  encostas do Caparaó.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-paper-sand/50 border border-border-hairline flex flex-col justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-white text-gold-burnished shadow-sm">
                    <span className="material-symbols-outlined text-[24px]">terrain</span>
                  </div>
                  <div>
                    <span className="font-sans text-[10px] uppercase tracking-wider text-slate-warm">
                      Altitude Geográfica
                    </span>
                    <p className="font-sans text-xs font-bold text-espresso-deep">
                      {product.altitude || "1.250m a 1.450m MASL"}
                    </p>
                  </div>
                </div>
                <p className="font-sans text-xs text-slate-warm mt-3">
                  A amplitude térmica acentuada retarda a maturação dos grãos, concentrando açúcares
                  naturais e acidez sedosa.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-paper-sand/50 border border-border-hairline flex flex-col justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-white text-gold-burnished shadow-sm">
                    <span className="material-symbols-outlined text-[24px]">eco</span>
                  </div>
                  <div>
                    <span className="font-sans text-[10px] uppercase tracking-wider text-slate-warm">
                      Variedade Botânica
                    </span>
                    <p className="font-sans text-xs font-bold text-espresso-deep">
                      {product.variety || "100% Coffea Arabica"}
                    </p>
                  </div>
                </div>
                <p className="font-sans text-xs text-slate-warm mt-3">
                  Seleção genética nobre célebre pelo perfil limpo e equilíbrio entre doçura e notas
                  frutadas.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-paper-sand/50 border border-border-hairline flex flex-col justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-white text-gold-burnished shadow-sm">
                    <span className="material-symbols-outlined text-[24px]">filter_drama</span>
                  </div>
                  <div>
                    <span className="font-sans text-[10px] uppercase tracking-wider text-slate-warm">
                      Processamento &amp; Secagem
                    </span>
                    <p className="font-sans text-xs font-bold text-espresso-deep">
                      {product.process || "Natural Fermentado em Terreiro Suspenso"}
                    </p>
                  </div>
                </div>
                <p className="font-sans text-xs text-slate-warm mt-3">
                  Secagem lenta em terreiros suspensos com ventilação natural contínua para
                  desenvolvimento homogêneo.
                </p>
              </div>

              {/* Roast Profile Bar */}
              <div className="sm:col-span-2 p-5 rounded-xl bg-paper-sand border border-border-hairline flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-xs uppercase tracking-wider text-espresso-deep font-bold">
                    Perfil de Torra: Média-Clara (Agtron 65)
                  </span>
                  <span className="font-sans text-[11px] text-gold-burnished font-bold">
                    Equilíbrio Sensorial KDS
                  </span>
                </div>
                <div className="w-full bg-white rounded-full h-3 flex overflow-hidden p-0.5 border border-border-hairline">
                  <div className="h-full bg-amber-200 rounded-l-full w-1/4" title="Clara" />
                  <div
                    className="h-full bg-gold-burnished w-2/5 rounded-r-full shadow-sm"
                    title="Média-Clara (Ponto de Equilíbrio)"
                  />
                  <div className="h-full bg-stone-600 w-1/4 opacity-40" title="Média-Escura" />
                  <div className="h-full bg-stone-900 w-1/6 opacity-30 rounded-r-full" title="Escura" />
                </div>
                <div className="flex justify-between text-slate-warm font-sans text-[10px]">
                  <span>Clara (Floral)</span>
                  <span className="text-espresso-deep font-bold">• Ponto Exato KDS (Agtron 65)</span>
                  <span>Escura (Intensa)</span>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Sensory Spider Radar SVG */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-espresso-surface text-paper-cream border border-border-hairline/20 shadow-md flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-gold-bright font-bold">
                    Análise Sensorial SCA
                  </span>
                  <h3 className="font-serif text-xl text-paper-cream mt-0.5 font-semibold">
                    Radar do Cupping Oficial
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-espresso-deep text-gold-bright font-sans text-xs font-bold border border-gold-bright/30">
                  Nota 88.5
                </span>
              </div>

              {/* Spider Radar Diagram */}
              <div className="py-6 flex items-center justify-center">
                <svg className="w-56 h-56 text-gold-bright" viewBox="0 0 240 240">
                  <polygon
                    fill="none"
                    points="120,20 220,120 120,220 20,120"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="1"
                  />
                  <polygon
                    fill="none"
                    points="120,50 190,120 120,190 50,120"
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="1"
                  />
                  <polygon
                    fill="none"
                    points="120,80 160,120 120,160 80,120"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="1"
                  />
                  <line
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="1"
                    x1="120"
                    x2="120"
                    y1="20"
                    y2="220"
                  />
                  <line
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="1"
                    x1="20"
                    x2="220"
                    y1="120"
                    y2="120"
                  />
                  <polygon
                    fill="rgba(194, 167, 99, 0.35)"
                    points="120,28 208,120 120,205 35,120"
                    stroke="#C2A763"
                    strokeWidth="2"
                  />
                  <circle cx="120" cy="28" fill="#C2A763" r="4" />
                  <circle cx="208" cy="120" fill="#C2A763" r="4" />
                  <circle cx="120" cy="205" fill="#C2A763" r="4" />
                  <circle cx="35" cy="120" fill="#C2A763" r="4" />
                  <text
                    fill="#F4EFEB"
                    fontFamily="Plus Jakarta Sans"
                    fontSize="10"
                    fontWeight="600"
                    textAnchor="middle"
                    x="120"
                    y="14"
                  >
                    DOÇURA (9.2)
                  </text>
                  <text
                    fill="#F4EFEB"
                    fontFamily="Plus Jakarta Sans"
                    fontSize="10"
                    fontWeight="600"
                    textAnchor="end"
                    x="234"
                    y="124"
                  >
                    ACIDEZ (8.8)
                  </text>
                  <text
                    fill="#F4EFEB"
                    fontFamily="Plus Jakarta Sans"
                    fontSize="10"
                    fontWeight="600"
                    textAnchor="middle"
                    x="120"
                    y="235"
                  >
                    CORPO (8.5)
                  </text>
                  <text
                    fill="#F4EFEB"
                    fontFamily="Plus Jakarta Sans"
                    fontSize="10"
                    fontWeight="600"
                    textAnchor="start"
                    x="6"
                    y="124"
                  >
                    RETROGOSTO (9.0)
                  </text>
                </svg>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-paper-sand/10 text-paper-sand/80 font-sans text-xs">
                <span>Avaliador: Lucas Tavares (Q-Grader)</span>
                <span className="text-gold-bright font-bold">Certificação SCA 2024</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HARMONIZAÇÃO SUGERIDA (COOKIE CUPS CROSS-SELL) */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <div className="relative overflow-hidden rounded-2xl bg-espresso-deep text-paper-cream p-8 md:p-12 shadow-xl border border-border-hairline/20">
          <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-gold-burnished/15 blur-3xl pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-gold-bright text-espresso-deep font-sans text-[10px] font-bold uppercase tracking-wider">
                  Harmonização Recomendada
                </span>
                <span className="text-paper-sand/70 font-sans text-xs">Experiência Completa</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-paper-cream font-semibold">
                Beba seu espresso dentro de uma xícara de biscoito amanteigado.
              </h3>
              <p className="font-sans text-sm text-paper-sand/80 max-w-xl font-light leading-relaxed">
                Nossos Cookie Cups KDS são revestidos internamente com puro chocolate belga que
                derrete suavemente ao contato com o café quente.
              </p>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <Link
                to="/produtos/cookie-cups-trio-artesanal"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gold-burnished hover:bg-gold-bright text-espresso-deep font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-md"
              >
                <span>Adicionar Cookie Cups</span>
                <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
