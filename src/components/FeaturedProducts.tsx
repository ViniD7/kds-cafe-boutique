import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { getFeaturedProducts, getFeaturedKits } from "@/data/products";
import "./FeaturedProducts/FeacturedProducts.css";

const FeaturedProducts = () => {
  const [activeProject, setActiveProject] = useState(0);
  const projectsRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Combine products and kits
  const products = [...getFeaturedProducts(), ...getFeaturedKits()];

  useEffect(() => {
    if (isInView && !isHovering) {
      const interval = setInterval(() => {
        setActiveProject((prev) => (prev + 1) % products.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isInView, isHovering, products.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
        } else {
          setIsInView(false);
        }
      },
      { threshold: 0.2 }
    );

    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getCardAnimationClass = (index: number) => {
    if (index === activeProject) return "featured-card-active";
    if (index === (activeProject + 1) % products.length)
      return "featured-card-next";
    if (index === (activeProject - 1 + products.length) % products.length)
      return "featured-card-prev";
    return "featured-card-hidden";
  };

  return (
    <section
      id="featured-products"
      ref={projectsRef}
      className="featured-products-section"
    >
      <div className="featured-products-container">
        <div
          className={`featured-products-header ${
            isInView ? "header-visible" : "header-hidden"
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
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="featured-products-inner">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`featured-product-card ${getCardAnimationClass(
                  index
                )}`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="product-card">
                  <div
                    className="product-card-image"
                    style={{
                      backgroundImage: `url(${product.images[0]})`,
                    }}
                  >
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
                        {product.category}
                      </p>
                    </div>

                    <p className="product-description">
                      {product.description ||
                        "Café especial de alta qualidade."}
                    </p>

                    <div className="product-footer">
                      <div className="product-tags">
                        {product.tags?.map((tag, idx) => (
                          <span
                            key={idx}
                            className="product-tag"
                            style={{ animationDelay: `${idx * 300}ms` }}
                          >
                            {tag}
                          </span>
                        ))}
                        {!product.tags && (
                          <>
                            <span className="product-tag">Premium</span>
                            <span
                              className="product-tag"
                              style={{ animationDelay: "300ms" }}
                            >
                              Especial
                            </span>
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
            onClick={() =>
              setActiveProject(
                (prev) => (prev - 1 + products.length) % products.length
              )
            }
            aria-label="Previous product"
          >
            &lt;
          </button>

          <button
            className="carousel-buttons carousel-button-nexts"
            onClick={() =>
              setActiveProject((prev) => (prev + 1) % products.length)
            }
            aria-label="Next product"
          >
            &gt;
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
