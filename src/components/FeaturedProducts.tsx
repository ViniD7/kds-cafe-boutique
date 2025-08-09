import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { getFeaturedProducts, getFeaturedKits } from "@/data/products";
import "./FeaturedProducts/FeacturedProducts.css";

const FeaturedProducts = () => {
  const [activeProject, setActiveProject] = useState(0);
  const projectsRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [hasAnimated, setHasAnimated] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);

  // Combine products and kits - memoizado para evitar re-criação
  const products = useMemo(
    () => [...getFeaturedProducts(), ...getFeaturedKits()],
    []
  );

  // Otimizar o intervalo do carrossel
  const nextProject = useCallback(() => {
    setActiveProject((prev) => (prev + 1) % products.length);
  }, [products.length]);

  const prevProject = useCallback(() => {
    setActiveProject((prev) => (prev - 1 + products.length) % products.length);
  }, [products.length]);

  useEffect(() => {
    if (isInView && !isHovering) {
      const interval = setInterval(nextProject, 4000);
      return () => clearInterval(interval);
    }
  }, [isInView, isHovering, nextProject]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setIsInView(true);
          setHasAnimated(true);
          setHeaderVisible(true);
        } else if (entries[0].isIntersecting && hasAnimated) {
          setHeaderVisible(true);
        } else if (!entries[0].isIntersecting && !hasAnimated) {
          setIsInView(false);
          setHeaderVisible(false);
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  // Lazy load images com debounce
  const handleImageLoad = useCallback((imageSrc: string) => {
    setLoadedImages((prev) => new Set(prev).add(imageSrc));
  }, []);

  const getCardAnimationClass = useCallback(
    (index: number) => {
      if (index === activeProject) return "featured-card-active";
      if (index === (activeProject + 1) % products.length)
        return "featured-card-next";
      if (index === (activeProject - 1 + products.length) % products.length)
        return "featured-card-prev";
      return "featured-card-hidden";
    },
    [activeProject, products.length]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  return (
    <section
      id="featured-products"
      ref={projectsRef}
      className="featured-products-section"
    >
      <div className="featured-products-container">
        <div
          className={`featured-products-header ${
            headerVisible ? "header-visible" : "header-hidden"
          }`}
        >
          <h2 className="featured-products-title">
            Nossos <span>Produtos</span>
          </h2>
          <p className="featured-products-subtitle">
            Selecionamos cuidadosamente nossos melhores produtos para você
            experimentar o verdadeiro sabor do café especial.
          </p>
        </div>

        <div
          className="featured-products-carousel"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="featured-products-inner">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`featured-product-card ${getCardAnimationClass(
                  index
                )}`}
              >
                <div className="product-card">
                  <div
                    className="product-card-image"
                    style={{
                      backgroundImage: loadedImages.has(product.images[0])
                        ? `url(${product.images[0]})`
                        : "none",
                    }}
                  >
                    {!loadedImages.has(product.images[0]) && (
                      <div className="product-image-skeleton"></div>
                    )}
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="product-image-lazy"
                      onLoad={() => handleImageLoad(product.images[0])}
                      loading="lazy"
                    />
                    <div className="product-image-overlay"></div>
                    <div className="product-image-content">
                      <h3 className="product-category">
                        {product.name.toUpperCase()}
                      </h3>
                      <div className="product-divider"></div>
                      <p className="product-name-overlay">{product.name}</p>
                    </div>
                  </div>

                  <div className="product-card-content">
                    <div className="product-text-content">
                      <h3 className="product-title">{product.name}</h3>
                      <p className="product-category-text">
                        {"category" in product ? product.category : "Kit"}
                      </p>
                    </div>

                    <p className="product-description">
                      {product.description ||
                        "Café especial de alta qualidade."}
                    </p>

                    <div className="product-footer">
                      <div className="product-tags">
                        {"tags" in product &&
                          Array.isArray(product.tags) &&
                          product.tags.map((tag, idx) => (
                            <span key={idx} className="product-tag">
                              {tag}
                            </span>
                          ))}
                        {(!("tags" in product) ||
                          !Array.isArray(product.tags) ||
                          !product.tags.length) && (
                          <>
                            <span className="product-tag">Premium</span>
                            <span className="product-tag">Especial</span>
                          </>
                        )}
                      </div>

                      <div className="product-details-link">
                        <span>Ver detalhes</span>
                        <span className="link-underline"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-buttons carousel-button-prevs"
            onClick={prevProject}
            aria-label="Previous product"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            className="carousel-buttons carousel-button-nexts"
            onClick={nextProject}
            aria-label="Next product"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 6L15 12L9 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="carousel-indication">
            {products.map((_, idx) => (
              <button
                key={idx}
                className={`carousel-indicator ${
                  activeProject === idx ? "active" : ""
                }`}
                onClick={() => setActiveProject(idx)}
                aria-label={`Go to product ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="view-all-container">
          <Link to="/produtos" className="view-all-button">
            Ver Todos os Produtos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
