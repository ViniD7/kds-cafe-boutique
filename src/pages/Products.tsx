import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductGrid from "@/components/ProductGrid";
import { categories, products, getProductsByCategory } from "@/data/products";
import "./Products/Products.css";

const Products = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(getProductsByCategory(activeCategory));
    }
    setCurrentIndex(0);
  }, [activeCategory]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const visibleProducts = filteredProducts.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  return (
    <div className="products-container">
      <div className="container-custom">
        <div className="products-header">
          <h1 className="products-title">
            Nossos <span>Cafés Especiais</span>
          </h1>
          <p className="products-subtitle">
            Descubra nossa seleção de cafés especiais, torrados com precisão
            para destacar suas características únicas e proporcionar uma
            experiência sensorial completa.
          </p>
        </div>
        <div className="categories-filter">
          <div className="categories-buttons">
            <button
              onClick={() => setActiveCategory("all")}
              className={`category-button ${
                activeCategory === "all" ? "active" : ""
              }`}
            >
              Todos os Cafés
            </button>

            {categories
              .filter((c) => c !== "Kits")
              .map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`category-button ${
                    activeCategory === category ? "active" : ""
                  }`}
                >
                  {category}
                </button>
              ))}
          </div>
        </div>

        <div className="carousel-container">
          <ProductGrid products={visibleProducts} />

          {totalPages > 1 && (
            <div className="carousel-controls">
              <button
                onClick={prevSlide}
                className="carousel-button"
                aria-label="Produtos anteriores"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={nextSlide}
                className="carousel-button"
                aria-label="Próximos produtos"
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
