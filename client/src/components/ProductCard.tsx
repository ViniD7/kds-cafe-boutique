import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const product = !isKit ? (item as Product) : null;
  const kit = isKit ? (item as Kit) : null;

  // Determine badges & details
  const scaScore = product?.scaScore || (name.includes("88") ? 88 : name.includes("87") ? 87 : 86);
  const badge = isKit
    ? "Kit Presente"
    : product?.badge || (product?.featured ? "Destaque" : "Safra Caparaó");
  
  // Format / subtitle
  const subtitle = product?.subtitle || product?.category || (isKit ? "Coleção Especial" : "Microlote Caparaó");
  
  // Sensory notes
  const notes = product?.sensoryNotes || 
    (product?.flavorNotes ? product.flavorNotes.split(",") : ["Chocolate Nobre", "Caramelo"]);

  const detailPath = isKit ? `/kits/${id}` : `/produtos/${id}`;
  const displayImage = images && images.length > 0 ? getImageUrl(images[0]) : "/images/canFront.webp";

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    try {
      await addToCart(id, 1, undefined, isKit);
      toast.success(`${name} adicionado ao carrinho!`, {
        description: "Seu item foi adicionado à sacola de compras.",
      });
    } catch {
      toast.error("Erro ao adicionar produto.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <article className="catalog-card group flex flex-col bg-surface-container-lowest rounded-xl border border-border-hairline hover:border-gold-bright transition-all duration-300 hover:shadow-[0_12px_32px_-8px_rgba(18,15,13,0.08)] overflow-hidden">
      {/* Product Image Area */}
      <Link
        to={detailPath}
        className="relative w-full aspect-[4/3] bg-paper-sand overflow-hidden flex items-center justify-center p-4 focus:outline-none"
      >
        <img
          src={displayImage}
          alt={name}
          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-espresso-deep/90 backdrop-blur-md text-gold-bright border border-gold-bright/30 font-sans text-[10px] font-bold shadow-sm">
            <span className="material-symbols-outlined text-[13px] text-gold-bright">
              military_tech
            </span>
            {scaScore} SCA
          </span>
          {badge && (
            <span className="px-2 py-0.5 rounded-md bg-paper-cream/95 backdrop-blur-sm text-espresso-deep font-sans text-[10px] tracking-wider uppercase font-semibold">
              {badge}
            </span>
          )}
        </div>

        {/* Quick Add Button on Hover */}
        <button
          onClick={handleQuickAdd}
          disabled={isAdding}
          className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-espresso-deep text-paper-cream flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 hover:bg-gold-burnished hover:text-espresso-deep shadow-md active:scale-95"
          title="Adicionar ao Carrinho"
          type="button"
          aria-label="Adicionar ao Carrinho"
        >
          <span className="material-symbols-outlined text-[18px]">
            {isAdding ? "hourglass_empty" : "add_shopping_cart"}
          </span>
        </button>
      </Link>

      {/* Card Information */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-slate-warm font-sans text-[11px] uppercase tracking-wider">
            <span>{subtitle}</span>
            <span>1.350m MASL</span>
          </div>

          <Link to={detailPath}>
            <h3 className="font-serif text-lg text-espresso-deep leading-snug group-hover:text-gold-burnished transition-colors font-semibold">
              {name}
            </h3>
          </Link>

          <p className="font-sans text-xs text-slate-warm line-clamp-2 mt-0.5">
            {description || "Café especial do Caparaó com notas raras e torra artesanal."}
          </p>

          {/* Sensory Notes Pills */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {notes.slice(0, 3).map((note: string, idx: number) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-full bg-paper-sand text-slate-warm font-sans text-[11px] border border-border-hairline"
              >
                {note.trim()}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer: Price & Comprar Button */}
        <div className="pt-4 mt-4 border-t border-border-hairline/60 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-sans text-[10px] text-slate-warm uppercase tracking-wider">
              Preço Atelier
            </span>
            <span className="font-serif text-xl text-espresso-deep font-bold">
              {formatCurrency(price)}
            </span>
          </div>

          <button
            onClick={() => navigate(detailPath)}
            className="px-4 py-2 rounded-lg bg-paper-sand hover:bg-espresso-deep hover:text-paper-cream text-espresso-deep font-sans text-xs tracking-wider uppercase font-semibold transition-all active:scale-95"
            type="button"
          >
            Comprar
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
