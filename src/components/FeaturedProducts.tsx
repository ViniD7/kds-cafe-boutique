import ProductGrid from "./ProductGrid";
import {
  categories,
  getFeaturedProducts,
  getFeaturedKits,
} from "@/data/products";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./FeaturedProducts/FeacturedProducts.css"; // Import the CSS file

const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const featuredProducts = getFeaturedProducts();
  const featuredKits = getFeaturedKits();

  const filteredProducts =
    activeTab === "all"
      ? featuredProducts
      : featuredProducts.filter((p) => p.category === activeTab);

  const filteredKits =
    activeTab === "all"
      ? featuredKits
      : activeTab === "Kits"
      ? featuredKits
      : [];

  return (
    <section className="featured-products">
      <div className="container-custom">
        <div className="text-center">
          <h2 className="featured-products-title">
            Nossos <span>Destaques</span>
          </h2>
          <p className="featured-products-subtitle">
            Selecionamos cuidadosamente nossos melhores produtos para você
            experimentar o verdadeiro sabor do café especial.
          </p>
        </div>

        <div className="tab-buttons">
          <button
            onClick={() => setActiveTab("all")}
            className={`tab-button ${activeTab === "all" ? "active" : ""}`}
          >
            Todos
          </button>

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`tab-button ${activeTab === category ? "active" : ""}`}
            >
              {category}
            </button>
          ))}
        </div>

        <ProductGrid products={filteredProducts} kits={filteredKits} />

        <div className="text-center">
          <Link to="/produtos" className="view-all-button">
            Ver Todos os Produtos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
