
import { useState } from "react";
import { Link } from "react-router-dom";
import { Product, Kit } from "@/data/products";
import { formatCurrency, truncateText, calculateDiscount, getImageUrl } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ProductCardProps {
  item: Product | Kit;
  isKit?: boolean;
}

const ProductCard = ({ item, isKit = false }: ProductCardProps) => {
  const { id, name, shortDescription, price, images } = item;
  const kit = isKit ? item as Kit : null;
  const discount = kit ? calculateDiscount(kit.originalPrice, kit.price) : 0;
  
  const [imageLoaded, setImageLoaded] = useState(false);
  const mainImage = images[0];
  
  return (
    <Link 
      to={isKit ? `/kits/${id}` : `/produtos/${id}`}
      className="group"
    >
      <div className="bg-white border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="product-image-container">
          <AspectRatio ratio={1/1}>
            {mainImage && (
              <>
                <div className={`image-placeholder absolute inset-0 ${imageLoaded ? 'hidden' : 'block'}`}></div>
                <img 
                  src={getImageUrl(mainImage)} 
                  alt={name}
                  className={`product-image group-hover:scale-105 ${imageLoaded ? 'image-loaded' : 'image-loading'}`}
                  onLoad={() => setImageLoaded(true)}
                  loading="lazy"
                />
              </>
            )}
            
            {isKit && discount > 0 && (
              <div className="absolute top-3 right-3 bg-gold text-white text-xs font-bold px-2 py-1 rounded z-10">
                {discount}% OFF
              </div>
            )}
          </AspectRatio>
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
