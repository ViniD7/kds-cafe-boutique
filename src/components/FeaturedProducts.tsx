
import ProductGrid from "./ProductGrid";
import { categories, getFeaturedProducts, getFeaturedKits } from "@/data/products";
import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const featuredProducts = getFeaturedProducts();
  const featuredKits = getFeaturedKits();
  
  const filteredProducts = activeTab === "all" 
    ? featuredProducts 
    : featuredProducts.filter(p => p.category === activeTab);
  
  const filteredKits = activeTab === "all" 
    ? featuredKits 
    : activeTab === "Kits" ? featuredKits : [];

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif mb-3">
            Nossos <span className="text-gold">Destaques</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Selecionamos cuidadosamente nossos melhores produtos para você experimentar o verdadeiro sabor do café especial.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab("all")}
            className={cn(
              "px-4 py-2 rounded-md transition-colors",
              activeTab === "all"
                ? "bg-gold text-white"
                : "bg-white hover:bg-gray-100"
            )}
          >
            Todos
          </button>
          
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={cn(
                "px-4 py-2 rounded-md transition-colors",
                activeTab === category
                  ? "bg-gold text-white"
                  : "bg-white hover:bg-gray-100"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <ProductGrid 
          products={filteredProducts} 
          kits={filteredKits} 
        />

        <div className="text-center mt-12">
          <Link 
            to="/produtos" 
            className="inline-block bg-gold text-white py-3 px-8 rounded-md font-medium hover:bg-gold/90 transition-colors"
          >
            Ver Todos os Produtos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
