import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductGrid from "@/components/ProductGrid";
import { categories, products, getProductsByCategory } from "@/data/products";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import "./Products/Products.css";

const Products = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 4;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

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
    <div className="products-parallax-container fade-in-up" ref={containerRef}>
      <div className="parallax-background" />
      <div className="container-custom">
        <SectionHeader
          title="Nossos"
          highlightedText="Cafés Especiais"
          subtitle="Descubra nossa seleção de cafés especiais, torrados com precisão para destacar suas características únicas e proporcionar uma experiência sensorial completa."
        />

        {/* Category Filter */}
        <div className="categories-wrapper fade-in-delayed">
          <div
            className="categories-scroller"
            style={{
              justifyContent: isMobile ? "flex-start" : "center",
              padding: isMobile ? "0.5rem 1rem" : "0.5rem",
            }}
          >
            {["all", ...categories.filter((c) => c !== "Kits")].map(
              (category) => (
                <div
                  key={category}
                  className={`category-pill ${
                    activeCategory === category ? "active" : ""
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category === "all" ? "Todos" : category}
                  {activeCategory === category && (
                    <div className="active-indicator" />
                  )}
                </div>
              )
            )}
          </div>
        </div>

        {/* Product Carousel */}
        <div className="carousel-container fade-in-delayed">
          <div className="slide-container">
            <ProductGrid products={visibleProducts} />
          </div>

          {totalPages > 1 && (
            <>
              <div className="carousel-indicators">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <div
                    key={index}
                    className={`indicator ${
                      index === currentIndex ? "active" : ""
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>

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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
