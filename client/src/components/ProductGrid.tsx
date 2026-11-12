import { memo } from "react";
import ProductCard from "./ProductCard";
import { Product, Kit } from "@/types/api";

interface ProductGridProps {
  products?: Product[];
  kits?: Kit[];
  title?: string;
}

const ProductGrid = ({ products = [], kits = [], title }: ProductGridProps) => {
  if (products.length === 0 && kits.length === 0) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center text-center p-8 bg-paper-sand/50 rounded-2xl border border-border-hairline">
        <span className="material-symbols-outlined text-[48px] text-gold-burnished mb-3">
          coffee
        </span>
        <h3 className="font-serif text-2xl text-espresso-deep font-semibold mb-2">
          Nenhum café encontrado
        </h3>
        <p className="font-sans text-sm text-slate-warm max-w-md">
          Não encontramos nenhum item correspondente aos critérios selecionados. Tente ajustar os
          filtros ou buscar por outro termo.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {title && (
        <h2 className="font-serif text-2xl text-espresso-deep font-semibold mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
