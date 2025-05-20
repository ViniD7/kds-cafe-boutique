
import ProductCard from "./ProductCard";
import { Product, Kit } from "@/data/products";
import { AspectRatio } from "./ui/aspect-ratio";

interface ProductGridProps {
  products?: Product[];
  kits?: Kit[];
  title?: string;
}

const ProductGrid = ({ products = [], kits = [], title }: ProductGridProps) => {
  if (products.length === 0 && kits.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Nenhum produto encontrado.</p>
      </div>
    );
  }

  return (
    <div>
      {title && (
        <h2 className="text-2xl md:text-3xl font-serif mb-6">{title}</h2>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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

export default ProductGrid;
