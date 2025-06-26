import { useState } from "react";
import { Link } from "react-router-dom";
import { Product, Kit } from "@/data/products";
import {
  formatCurrency,
  truncateText,
  calculateDiscount,
  getImageUrl,
} from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import "./ProductCard/ProductCard.css";

interface ProductCardProps {
  item: Product | Kit;
  isKit?: boolean;
}

const ProductCard = ({ item, isKit = false }: ProductCardProps) => {
  const { id, name, shortDescription, price, images } = item;
  const kit = isKit ? (item as Kit) : null;
  const discount = kit ? calculateDiscount(kit.originalPrice, kit.price) : 0;

  const [imageLoaded, setImageLoaded] = useState(false);
  const mainImage = images[0];

  return (
    <Link
      to={isKit ? `/kits/${id}` : `/produtos/${id}`}
      className="product-card-link"
    >
      <div className="product-card-container">
        <div className="product-image-container">
          <AspectRatio ratio={1 / 1}>
            {mainImage && (
              <>
                <div
                  className={`loading-skeleton ${
                    imageLoaded ? "hidden" : "block"
                  }`}
                ></div>
                <img
                  src={getImageUrl(mainImage)}
                  alt={name}
                  className={`product-image ${
                    imageLoaded ? "image-loaded" : "image-loading"
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  loading="lazy"
                />
              </>
            )}

            {isKit && discount > 0 && (
              <div className="discount-badge">{discount}% OFF</div>
            )}

            <div className="image-overlay"></div>
          </AspectRatio>
        </div>

        <div className="product-content">
          <h3 className="product-title">{name}</h3>
          <p className="product-description">
            {truncateText(shortDescription, 60)}
          </p>

          <div className="price-container">
            <span className="current-price">{formatCurrency(price)}</span>

            {isKit && kit && (
              <span className="original-price">
                {formatCurrency(kit.originalPrice)}
              </span>
            )}
          </div>

          <span className="sr-only">Ver detalhes do produto {name}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
