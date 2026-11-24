import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { productAPI } from "@/services/api";
import { Kit } from "@/types/api";
import { formatCurrency, getImageUrl } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const defaultKitData: Record<string, any> = {
  "kit-degustacao-caparao-nobre": {
    id: "kit-degustacao-caparao-nobre",
    name: "Kit Degustação Caparaó Nobre",
    category: "kits",
    price: 139.0,
    originalPrice: 155.0,
    images: ["/images/canTriple.webp", "/images/canDiagonal.webp", "/images/cupCookie.webp"],
    description:
      "Caixa presente rígida contendo 1 Lata Colecionável 250g de Catuaí Vermelho Fermentado (88.5 SCA), 1 Pacote de Arara Amarelo (87.5 SCA) e 2 Cookie Cups artesanais revestidos com chocolate belga. Acompanha guia de prova e lacre de cera dourada.",
    badge: "Coleção Degustação",
    sensoryNotes: ["Edição Presente", "Guia Sensorial", "Lacre Dourado"],
  },
};

const KitDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [kit, setKit] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    const fetchKit = async () => {
      try {
        setLoading(true);
        const product = await productAPI.getProductById(id || "");
        if (product) {
          setKit(product);
        } else if (defaultKitData[id || ""]) {
          setKit(defaultKitData[id || ""]);
        } else {
          setKit(defaultKitData["kit-degustacao-caparao-nobre"]);
        }
      } catch (error) {
        if (defaultKitData[id || ""]) {
          setKit(defaultKitData[id || ""]);
        } else {
          setKit(defaultKitData["kit-degustacao-caparao-nobre"]);
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchKit();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="w-full min-h-[70vh] flex items-center justify-center bg-[#0D0B0A] text-[#F5F2EB]">
        <div className="flex flex-col items-center gap-3">
          <span className="material-symbols-outlined text-[40px] text-gold-bright animate-spin">
            progress_activity
          </span>
          <p className="font-mono text-xs uppercase tracking-widest text-paper-sand/60">
            Carregando kit especial...
          </p>
        </div>
      </div>
    );
  }

  if (!kit) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center p-8 bg-[#0D0B0A] text-[#F5F2EB] text-center">
        <span className="material-symbols-outlined text-[48px] text-gold-bright mb-3">
          inventory_2
        </span>
        <h1 className="font-serif text-3xl text-paper-cream font-normal mb-2">
          Kit não encontrado
        </h1>
        <p className="font-sans text-xs sm:text-sm text-paper-sand/60 mb-6 max-w-md">
          Este kit já foi descontinuado ou não está disponível no momento.
        </p>
        <Link
          to="/kits"
          className="px-6 py-3 bg-gold-burnished hover:bg-gold-bright text-[#0D0B0A] font-mono text-xs uppercase tracking-widest font-bold"
        >
          Explorar Kits →
        </Link>
      </div>
    );
  }

  const currentPrice = kit.price || 139;
  const pixPrice = currentPrice * 0.95;
  const imagesList =
    kit.images && kit.images.length > 0
      ? kit.images.map((img: string) => getImageUrl(img))
      : ["/images/canTriple.webp"].map(getImageUrl);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      await addToCart(kit.id, quantity, undefined, true);
      toast.success(`${kit.name} adicionado à sacola!`);
    } catch {
      toast.error("Erro ao adicionar kit.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWhatsAppOrder = () => {
    const message = `Olá! Gostaria de encomendar o kit de presente:%0A*${kit.name}*%0A• Quantidade: ${quantity}%0A• Total: ${formatCurrency(
      currentPrice * quantity
    )}%0A%0AEnvio direto do Caparaó.`;

    const whatsappUrl = `https://wa.me/5528999921033?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="w-full flex flex-col bg-[#0D0B0A] text-[#F5F2EB] min-h-screen">
      {/* 1. BREADCRUMBS */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-4">
        <div className="flex items-center gap-2 text-paper-sand/60 text-xs font-mono pb-4 border-b border-white/10">
          <Link to="/" className="hover:text-gold-bright transition-colors uppercase">
            Início
          </Link>
          <span>/</span>
          <Link to="/kits" className="hover:text-gold-bright transition-colors uppercase">
            Kits &amp; Presentes
          </Link>
          <span>/</span>
          <span className="text-paper-cream truncate max-w-xs">{kit.name}</span>
        </div>
      </div>

      {/* 2. PRODUCT STAGE */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="relative w-full aspect-[4/3] bg-[#161311] border border-white/10 overflow-hidden flex items-center justify-center p-8">
              <img
                src={imagesList[selectedImage] || imagesList[0]}
                alt={kit.name}
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)]"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-[#0D0B0A] border border-gold-bright/30 text-gold-bright font-mono text-[10.5px] uppercase tracking-widest font-bold">
                  COLEÇÃO PRESENTEÁVEL // EDIÇÃO ESPECIAL
                </span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {imagesList.length > 1 && (
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
            )}
          </div>

          {/* Right Column: Purchasing Engine */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="pb-6 border-b border-white/10">
              <span className="px-3 py-1 bg-gold-bright text-[#0D0B0A] font-mono text-[10.5px] font-bold tracking-wider uppercase inline-block mb-3">
                {kit.badge || "Kit Degustação"}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-paper-cream font-normal mb-3">
                {kit.name}
              </h1>
              <p className="font-sans text-xs sm:text-sm text-paper-sand/75 font-light leading-relaxed">
                {kit.description}
              </p>
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
                Ou até 3x sem juros no cartão de crédito • Frete grátis neste item
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-center gap-3">
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

              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="w-full bg-[#161311] hover:bg-white/10 text-paper-cream py-3 px-4 border border-white/10 flex items-center justify-center gap-2 transition-colors font-mono text-xs uppercase tracking-wider"
              >
                <span className="material-symbols-outlined text-[18px] text-gold-bright">chat</span>
                <span>Pedir via WhatsApp Concierge</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KitDetail;
