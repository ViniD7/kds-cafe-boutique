import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProductById } from "@/data/products";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import {
  ArrowLeft,
  MessageCircle,
  ShoppingCart,
  Minus,
  Plus,
} from "lucide-react";
import "./ProductsDetails/ProductsDetails.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = getProductById(id || "");

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants[0].id || ""
  );
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  if (!product) {
    return (
      <div className="not-found">
        <div className="not-found-content">
          <div className="not-found-icon">😔</div>
          <h1 className="not-found-title">Produto não encontrado</h1>
          <p className="not-found-description">
            O produto que você está procurando não existe ou foi removido.
          </p>
          <Link to="/produtos" className="not-found-link">
            Explorar Produtos
          </Link>
        </div>
      </div>
    );
  }

  const selectedVariantObj = product.variants.find(
    (v) => v.id === selectedVariant
  );
  const currentPrice = selectedVariantObj?.price || product.price;
  const isOutOfStock = selectedVariantObj && selectedVariantObj.stock <= 0;

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    addToCart(product.id, quantity, selectedVariant);

    // Feedback visual
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsAddingToCart(false);
  };

  const handleWhatsAppOrder = () => {
    const variantName = selectedVariantObj
      ? ` (${selectedVariantObj.name})`
      : "";
    const message = `Olá! Gostaria de comprar: ${
      product.name
    }${variantName}%0AQuantidade: ${quantity}%0APreço unitário: ${formatCurrency(
      currentPrice
    )}%0APreço total: ${formatCurrency(
      currentPrice * quantity
    )}%0A%0AAguardo confirmação do pedido.`;

    const whatsappUrl = `https://wa.me/5528999921033?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 99) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    if (quantity < 99) setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="product-detail-container">
      <div className="container-custom">
        {/* Navigation */}
        <nav className="breadcrumb">
          <button onClick={() => navigate(-1)} className="back-button">
            <ArrowLeft size={20} />
            <span>Voltar</span>
          </button>
          <div className="breadcrumb-links">
            <span>Produtos</span>
            <span className="breadcrumb-divider">/</span>
            <span className="breadcrumb-current">{product.category}</span>
            <span className="breadcrumb-divider">/</span>
            <span className="breadcrumb-current">{product.name}</span>
          </div>
        </nav>

        <div className="product-grid">
          {/* Product Images */}
          <div className="images-section">
            <div className="image-main-container">
              <div className="product-image-main">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  loading="lazy"
                />
                {isOutOfStock && (
                  <div className="out-of-stock-badge">Esgotado</div>
                )}
              </div>
            </div>

            <div className="thumbnails-container">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`thumbnail-item ${
                    selectedImage === index ? "active" : ""
                  }`}
                  aria-label={`Visualizar imagem ${index + 1}`}
                >
                  <img
                    src={image}
                    alt={`${product.name} - Imagem ${index + 1}`}
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="info-section">
            <div className="product-header">
              <h1 className="product-title">{product.name}</h1>
              <div className="product-price">
                <span className="price-current">
                  {formatCurrency(currentPrice)}
                </span>
                {product.originalPrice &&
                  product.originalPrice > currentPrice && (
                    <span className="price-original">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
              </div>
            </div>

            {/* Description */}
            <div className="description-section">
              <p className="product-description">{product.description}</p>
            </div>

            {/* Variants */}
            {product.variants.length > 0 && (
              <div className="variants-section">
                <h3 className="section-title">
                  Tamanho <span className="required-asterisk">*</span>
                </h3>
                <div className="variants-grid">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant.id)}
                      className={`variant-option ${
                        selectedVariant === variant.id ? "active" : ""
                      } ${variant.stock <= 0 ? "out-of-stock" : ""}`}
                      disabled={variant.stock <= 0}
                    >
                      <span className="variant-name">{variant.name}</span>
                      {variant.stock <= 0 && (
                        <span className="stock-label">Esgotado</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="quantity-section">
              <h3 className="section-title">Quantidade</h3>
              <div className="quantity-selector">
                <button
                  onClick={decrementQuantity}
                  className="quantity-btn"
                  disabled={quantity <= 1}
                  aria-label="Reduzir quantidade"
                >
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="quantity-input"
                  min="1"
                  max="99"
                  aria-label="Quantidade"
                />
                <button
                  onClick={incrementQuantity}
                  className="quantity-btn"
                  disabled={quantity >= 99}
                  aria-label="Aumentar quantidade"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="actions-section">
              <button
                onClick={handleAddToCart}
                className={`add-to-cart-btn ${isAddingToCart ? "adding" : ""} ${
                  isOutOfStock ? "disabled" : ""
                }`}
                disabled={isOutOfStock || isAddingToCart}
              >
                <div className="btn-content">
                  {isAddingToCart ? (
                    <div className="loading-spinner"></div>
                  ) : (
                    <ShoppingCart size={20} />
                  )}
                  <span>
                    {isOutOfStock
                      ? "Esgotado"
                      : isAddingToCart
                      ? "Adicionando..."
                      : "Adicionar ao Carrinho"}
                  </span>
                </div>
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="whatsapp-btn"
                disabled={isOutOfStock}
              >
                <MessageCircle size={20} />
                <span>Comprar via WhatsApp</span>
              </button>
            </div>

            {/* Product Meta */}
            <div className="meta-section">
              <div className="meta-grid">
                <div className="meta-item">
                  <span className="meta-label">Categoria</span>
                  <span className="meta-value">{product.category}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Disponibilidade</span>
                  <span
                    className={`meta-value ${
                      selectedVariantObj && selectedVariantObj.stock > 0
                        ? "in-stock"
                        : "out-of-stock"
                    }`}
                  >
                    {selectedVariantObj && selectedVariantObj.stock > 0
                      ? "Em estoque"
                      : "Esgotado"}
                  </span>
                </div>
                {/* {selectedVariantObj && selectedVariantObj.stock > 0 && (
                  <div className="meta-item">
                    <span className="meta-label">Estoque</span>
                    <span className="meta-value">
                      {selectedVariantObj.stock} unidades
                    </span>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
