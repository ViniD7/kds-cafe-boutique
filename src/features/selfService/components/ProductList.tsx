import React, { useMemo, useRef, useState, useCallback, memo } from "react";
import { products } from "@/data/products";
import { useSelfServiceCart } from "../context/SelfServiceCartContext";
import { toast } from "@/hooks/use-toast";
import Colors from "@/Constants/Colors/Colors";
import "./ProductList.css";
import Images from "@/Constants/Images/images";

interface ProductModalProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: any, e: React.MouseEvent) => void;
}

const ProductModal = memo<ProductModalProps>(
  ({ product, isOpen, onClose, onAddToCart }) => {
    if (!isOpen || !product) return null;

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>

          <div
            className="modal-image-container"
            style={{
              backgroundImage: `url(${product.images[0]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {product.images[0] ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="modal-image"
                decoding="async"
              />
            ) : (
              <div className="modal-image-placeholder">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 4H20V20H4V4Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M20 16L14 10L4 20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>

          <div className="modal-details">
            <h2 className="modal-title">{product.name}</h2>
            <p className="modal-description">{product.description}</p>
            <div className="modal-price">
              <span className="modal-currency">R$</span>
              <span className="modal-price-value">
                {product.price.toFixed(2).replace(".", ",")}
              </span>
            </div>
            <button
              className="modal-add-btn"
              onClick={(e) => onAddToCart(product, e)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 5V19M5 12H19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span>Adicionar ao Carrinho</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
);

// Componente memoizado para cada card de produto
const ProductCard = memo(({ 
  product, 
  index, 
  imageErrors, 
  onCardClick, 
  onAddToCart,
  onImageError,
  formatPrice 
}: {
  product: any;
  index: number;
  imageErrors: Set<number>;
  onCardClick: (product: any) => void;
  onAddToCart: (product: any, e: React.MouseEvent) => void;
  onImageError: (productId: number) => void;
  formatPrice: (price: number) => string;
}) => {
  const hasImage = product.images[0] && !imageErrors.has(product.id);

  return (
    <article
      className="product-card"
      style={{ "--animation-order": index } as React.CSSProperties}
      onClick={() => onCardClick(product)}
    >
      <div className="card-media">
        {hasImage ? (
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            onError={() => onImageError(product.id)}
            className="product-image"
            decoding="async"
          />
        ) : (
          <div className="image-placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 4H20V20H4V4Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M20 16L14 10L4 20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
        {product.featured && (
          <span className="featured-badge">Destaque</span>
        )}
      </div>

      <div className="card-details">
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
        </div>
        <div className="product-actions">
          <div className="price-wrapper">
            <span className="currency">R$</span>
            <span className="price-value">
              {formatPrice(product.price)}
            </span>
          </div>

          <button
            className="add-to-cart-btn"
            onClick={(e) => onAddToCart(product, e)}
            aria-label={`Adicionar ${product.name} ao carrinho`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5V19M5 12H19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span>Adicionar</span>
          </button>
        </div>
      </div>
    </article>
  );
});

ProductCard.displayName = 'ProductCard';

const ProductList: React.FC = () => {
  const { addToCart } = useSelfServiceCart();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const productList = useMemo(() => products, []);

  const itemsPerPage = 8; 
  const totalPages = Math.ceil(productList.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const visibleProducts = useMemo(
    () => productList.slice(startIndex, startIndex + itemsPerPage),
    [productList, startIndex],
  );

  const handleAddToCart = useCallback(
    (product: any, e: React.MouseEvent) => {
      e.stopPropagation();
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
      });

      toast({
        title: "✨ Adicionado ao carrinho",
        description: `${product.name} foi adicionado ao seu pedido.`,
      });
    },
    [addToCart],
  );

  const handleImageError = useCallback((productId: number) => {
    setImageErrors((prev) => new Set(prev).add(productId));
  }, []);

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [currentPage, totalPages]);

  const handlePrevPage = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [currentPage]);

  const formatPrice = useCallback((price: number) => {
    return price.toFixed(2).replace(".", ",");
  }, []);

  const handleCardClick = useCallback((product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  }, []);

  return (
    <div className="product-showcase">
      <div className="showcase-header">
        <div className="header-content">
          <h2 className="showcase-title">
            {/* <img
              src={Images.logoKDS}
              alt="KDS Cafés Especiais"
              className="logo-image"
              width="60"
              height="75"
              loading="lazy"
            /> */}
            Nossos Produtos
            {/* <span className="title-accent">✦</span> */}
          </h2>
          {/* <p className="showcase-subtitle">Qualidade e sabor em cada detalhe</p> */}
        </div>

        {totalPages > 1 && (
          <div className="pagination-controls">
            <button
              className="pagination-btn pagination-prev"
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              aria-label="Página anterior"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="pagination-indicator">
              {[...Array(totalPages)].map((_, idx) => (
                <span
                  key={idx}
                  className={`page-dot ${idx === currentPage ? "active" : ""}`}
                  onClick={() => setCurrentPage(idx)}
                />
              ))}
            </div>

            <button
              className="pagination-btn pagination-next"
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
              aria-label="Próxima página"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="products-masonry" ref={scrollContainerRef}>
        {visibleProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            imageErrors={imageErrors}
            onCardClick={handleCardClick}
            onAddToCart={handleAddToCart}
            onImageError={handleImageError}
            formatPrice={formatPrice}
          />
        ))}
      </div>
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ProductList;
