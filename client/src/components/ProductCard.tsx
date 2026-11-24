import { useState } from "react";
import { Link } from "react-router-dom";
import { Product, Kit } from "@/types/api";
import { formatCurrency, getImageUrl } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

interface ProductCardProps {
  item: Product | Kit;
  isKit?: boolean;
}

const ProductCard = ({ item, isKit = false }: ProductCardProps) => {
  const { id, name, price, images, description } = item;
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const product = !isKit ? (item as Product) : null;
  const scaScore =
    product?.scaScore || (name.includes("88") ? 88.5 : name.includes("87") ? 87.5 : 86.0);
  const badge = isKit
    ? "Kit Presente"
    : product?.badge || (product?.featured ? "Lote Raro" : "Safra Caparaó");

  const subtitle =
    product?.subtitle || product?.category || (isKit ? "Coleção Degustação" : "1.400M MASL");
  const notes =
    product?.sensoryNotes ||
    (product?.flavorNotes
      ? product.flavorNotes.split(",")
      : ["Chocolate Nobre", "Flor de Laranjeira"]);

  const detailPath = isKit ? `/kits/${id}` : `/produtos/${id}`;
  const displayImage =
    images && images.length > 0 ? getImageUrl(images[0]) : getImageUrl("/images/canFront.webp");
  const pixPrice = price * 0.95;

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    try {
      await addToCart(id, 1, undefined, isKit);
      toast.success(`${name} adicionado à sacola!`, {
        description: "Seu café foi reservado no carrinho de compras.",
      });
    } catch {
      toast.error("Erro ao adicionar produto.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <article className="group flex flex-col bg-[#161311] border border-white/10 hover:border-gold-bright transition-all duration-300 relative overflow-hidden">
      {/* Product Image Area - Onyx High-Contrast Minimal Stage */}
      <Link
        to={detailPath}
        className="relative w-full aspect-[4/3] bg-[#0D0B0A] overflow-hidden flex items-center justify-center p-6 focus:outline-none"
      >
        <img
          src={displayImage}
          alt={name}
          className="max-h-full max-w-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.85)] transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          <span className="px-2.5 py-0.5 bg-[#0D0B0A]/90 border border-gold-bright/40 text-gold-bright font-mono text-[10px] font-bold">
            {scaScore} SCA
          </span>
          {badge && (
            <span className="px-2 py-0.5 bg-white/10 text-paper-sand font-mono text-[9px] uppercase tracking-wider">
              {badge}
            </span>
          )}
        </div>

        {/* Quick Add Button */}
        <button
          onClick={handleQuickAdd}
          disabled={isAdding}
          className="absolute bottom-3 right-3 px-3 py-1.5 bg-gold-burnished hover:bg-gold-bright text-[#0D0B0A] font-mono text-[11px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0"
          title="Adicionar à Sacola"
          type="button"
        >
          {isAdding ? "Adicionando..." : "+ Sacola"}
        </button>
      </Link>

      {/* Card Information */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-paper-sand/50 font-mono text-[10px] uppercase tracking-wider">
            <span>{subtitle}</span>
            <span>1.400M MASL</span>
          </div>

          <Link to={detailPath}>
            <h3 className="font-serif text-lg text-paper-cream group-hover:text-gold-bright transition-colors">
              {name}
            </h3>
          </Link>

          <p className="font-sans text-xs text-paper-sand/70 font-light line-clamp-2 mt-0.5">
            {description || "Café especial das montanhas do Caparaó com torra de ateliê sob demanda."}
          </p>

          {/* Sensory Notes Pills */}
          <div className="flex flex-wrap gap-1 pt-2">
            {notes.slice(0, 3).map((note: string, idx: number) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-white/5 border border-white/10 text-paper-sand/80 font-mono text-[9.5px]"
              >
                {note.trim()}
              </span>
            ))}
          </div>
        </div>

        {/* Price and Action */}
        <div className="pt-4 border-t border-white/10 mt-4 flex items-baseline justify-between">
          <div>
            <span className="font-mono text-lg text-paper-cream font-bold block">
              {formatCurrency(price)}
            </span>
            <span className="font-mono text-[10px] text-gold-bright">
              {formatCurrency(pixPrice)} no Pix (-5%)
            </span>
          </div>
          <Link
            to={detailPath}
            className="font-mono text-xs text-paper-sand/60 hover:text-gold-bright transition-colors"
          >
            Detalhes →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
