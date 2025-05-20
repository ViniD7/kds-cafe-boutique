
import { Link } from "react-router-dom";
import { Product, Kit } from "@/data/products";
import { formatCurrency, truncateText, calculateDiscount } from "@/lib/utils";

interface ProductCardProps {
  item: Product | Kit;
  isKit?: boolean;
}

const ProductCard = ({ item, isKit = false }: ProductCardProps) => {
  const { id, name, shortDescription, price, images } = item;
  const kit = isKit ? item as Kit : null;
  const discount = kit ? calculateDiscount(kit.originalPrice, kit.price) : 0;
  
  return (
    <Link 
      to={isKit ? `/kits/${id}` : `/produtos/${id}`}
      className="group"
    >
      <div className="bg-white border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="relative aspect-square bg-muted">
          <img 
            src={images[0]} 
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {isKit && discount > 0 && (
            <div className="absolute top-3 right-3 bg-gold text-white text-xs font-bold px-2 py-1 rounded">
              {discount}% OFF
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-serif font-medium text-lg mb-1">{name}</h3>
          <p className="text-muted-foreground text-sm mb-3">
            {truncateText(shortDescription, 60)}
          </p>
          
          <div className="flex items-baseline">
            <span className="text-lg font-semibold">{formatCurrency(price)}</span>
            
            {isKit && kit && (
              <span className="ml-2 text-sm line-through text-muted-foreground">
                {formatCurrency(kit.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
