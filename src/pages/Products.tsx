
import { useState, useEffect } from "react";
import ProductGrid from "@/components/ProductGrid";
import { categories, products, getProductsByCategory } from "@/data/products";
import { cn } from "@/lib/utils";

const Products = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(getProductsByCategory(activeCategory));
    }
  }, [activeCategory]);

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-serif mb-3">
            Nossos <span className="text-gold">Cafés Especiais</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descubra nossa seleção de cafés especiais, torrados com precisão para destacar 
            suas características únicas e proporcionar uma experiência sensorial completa.
          </p>
        </div>
        
        {/* Categories filter */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setActiveCategory("all")}
              className={cn(
                "px-4 py-2 rounded-md transition-colors",
                activeCategory === "all"
                  ? "bg-gold text-white"
                  : "bg-white border border-border hover:bg-muted"
              )}
            >
              Todos os Cafés
            </button>
            
            {categories.filter(c => c !== "Kits").map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-md transition-colors",
                  activeCategory === category
                    ? "bg-gold text-white"
                    : "bg-white border border-border hover:bg-muted"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Products grid */}
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
};

export default Products;
