import { memo } from "react";
import ProductCard from "./ProductCard";
import { Product, Kit } from "@/types/api";
import { AspectRatio } from "./ui/aspect-ratio";
import "./ProductGrid/ProductGrid.css";
import Lottie from "lottie-react";
import finishcoffee from "../Assets/lotties/finishcoffee.json";

interface ProductGridProps {
  products?: Product[];
  kits?: Kit[];
  title?: string;
}

const ProductGrid = ({ products = [], kits = [], title }: ProductGridProps) => {
  if (products.length === 0 && kits.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-lottie">
          <Lottie
            animationData={finishcoffee}
            loop={true}
            autoplay={true}
            style={{ width: 350, height: 350 }}
          />
        </div>
        <p className="empty-state-text">Nenhum produto encontrado.</p>
      </div>
    );
  }

  return (
    <div className="product-grid-container">
      {title && <h2 className="product-grid-title">{title}</h2>}
      <div className="grid-layout">
        {products.map((product) => (
          <ProductCard key={product.id} item={product} />
        ))}
        {kits.map((kit) => (
          <ProductCard key={kit.id} item={kit} isKit={true} />
        ))}
      </div>
    </div>
  );
};

export default memo(ProductGrid);
