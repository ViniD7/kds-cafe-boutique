import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductGrid from "../components/ProductGrid";
import { productAPI } from "../services/api";
import { Product } from "../types/api";
import SectionHeader from "../components/SectionHeader/SectionHeader";
import "./Products/Products.css";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";
  const currentIndex = Number(searchParams.get("page")) || 0;

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 4;

  // Fetch all products on initial load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await productAPI.getAllProducts();
        setAllProducts(products);
        setFilteredProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
        setAllProducts([]);
        setFilteredProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Update filtered products when category changes
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter(product => product.category === activeCategory);
      setFilteredProducts(filtered);
    }
  }, [activeCategory, allProducts]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const visibleProducts = filteredProducts.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  const setPage = useCallback((page: number) => {
    setSearchParams(prev => {
      prev.set("page", String(page));
      return prev;
    });
  }, [setSearchParams]);

  const nextSlide = useCallback(() => {
    const next = currentIndex === totalPages - 1 ? 0 : currentIndex + 1;
    setPage(next);
  }, [currentIndex, totalPages, setPage]);

  const prevSlide = useCallback(() => {
    const prev = currentIndex === 0 ? totalPages - 1 : currentIndex - 1;
    setPage(prev);
  }, [currentIndex, totalPages, setPage]);

  if (isLoading) {
    return (
      <div className="products-parallax-container fade-in-up" ref={containerRef}>
        <div className="container-custom">
          <p>Carregando produtos...</p>
        </div>
      </div>
    );
  }

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
            {["all", ...Array.from(new Set(allProducts.map(p => p.category))).filter((c: string) => c !== "Kits")].map(
              (category) => (
                <button
                  key={category}
                  type="button"
                  className={`category-pill ${
                    activeCategory === category ? "active" : ""
                  }`}
                  onClick={() => setSearchParams({ category, page: "0" })}
                  aria-pressed={activeCategory === category}
                >
                  {category === "all" ? "Todos" : category}
                  {activeCategory === category && (
                    <div className="active-indicator" />
                  )}
                </button>
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
                    onClick={() => setPage(index)}
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
