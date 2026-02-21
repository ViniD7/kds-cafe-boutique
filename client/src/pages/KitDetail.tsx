import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getKitById, getProductById } from "@/data/products";
import { formatCurrency, calculateDiscount } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import {
  ArrowLeft,
  MessageCircle,
  ShoppingCart,
  Minus,
  Plus,
} from "lucide-react";
import "./ProductsDetails/ProductsDetails.css";

const KitDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const kit = getKitById(id || "");

  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  if (!kit) {
    return (
      <div className="not-found">
        <div className="not-found-content">
          <div className="not-found-icon">😔</div>
          <h1 className="not-found-title">Kit não encontrado</h1>
          <p className="not-found-description">
            O kit que você está procurando não existe ou foi removido.
          </p>
          <Link to="/kits" className="not-found-link">
            Explorar Kits
          </Link>
        </div>
      </div>
    );
  }

  // Check if kit is available (all products in kit are available)
  const isKitAvailable = kit.products.every((productId) => {
    const product = getProductById(productId);
    return product?.variants.some((variant) => variant.stock > 0) ?? false;
  });

  const discount = calculateDiscount(kit.originalPrice, kit.price);

  const handleAddToCart = async () => {
    if (!isKitAvailable) return;
    
    setIsAddingToCart(true);
    addToCart(kit.id, quantity, undefined, true);

    // Feedback visual
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsAddingToCart(false);
  };

  const handleWhatsAppOrder = () => {
    const message = `Olá! Gostaria de comprar: ${
      kit.name
    }%0AQuantidade: ${quantity}%0APreço unitário: ${formatCurrency(
      kit.price
    )}%0APreço total: ${formatCurrency(
      kit.price * quantity
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

  // Get product details for the kit
  const kitProducts = kit.products.map(productId => getProductById(productId)).filter(Boolean);

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
            <span>Kits</span>
            <span className="breadcrumb-divider">/</span>
            <span className="breadcrumb-current">{kit.name}</span>
          </div>
        </nav>

        <div className="product-grid">
          {/* Product Images */}
          <div className="images-section">
            <div className="image-main-container">
              <div className="product-image-main">
                <img
                  src={kit.images[0] || "/placeholder.svg"}
                  alt={kit.name}
                  loading="lazy"
                />
                {!isKitAvailable && (
                  <div className="out-of-stock-badge">Indisponível</div>
                )}
                {discount > 0 && (
                  <div className="discount-badge">{discount}% OFF</div>
                )}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="info-section">
            <div className="product-header">
              <h1 className="product-title">{kit.name}</h1>
              <div className="product-price">
                <span className="price-current">
                  {formatCurrency(kit.price)}
                </span>
                {kit.originalPrice && kit.originalPrice > kit.price && (
                  <span className="price-original">
                    {formatCurrency(kit.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="description-section">
              <p className="product-description">{kit.description}</p>
            </div>

            {/* Kit Products */}
            <div className="variants-section">
              <h3 className="section-title">Contém</h3>
              <div className="kit-products-list">
                {kitProducts.map((product) => (
                  <div key={product?.id} className="kit-product-item">
                    <span className="product-name">{product?.name}</span>
                    <span className="product-stock">
                      {product?.variants.some(v => v.stock > 0) ? (
                        <span className="in-stock">Disponível</span>
                      ) : (
                        <span className="out-of-stock">Esgotado</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="quantity-section">
              <h3 className="section-title">Quantidade</h3>
              <div className="quantity-selector">
                <button
                  onClick={decrementQuantity}
                  className="quantity-btn"
                  disabled={quantity <= 1 || !isKitAvailable}
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
                  disabled={!isKitAvailable}
                />
                <button
                  onClick={incrementQuantity}
                  className="quantity-btn"
                  disabled={quantity >= 99 || !isKitAvailable}
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
                  !isKitAvailable ? "disabled" : ""
                }`}
                disabled={!isKitAvailable || isAddingToCart}
              >
                <div className="btn-content">
                  {isAddingToCart ? (
                    <div className="loading-spinner"></div>
                  ) : (
                    <ShoppingCart size={20} />
                  )}
                  <span>
                    {!isKitAvailable
                      ? "Indisponível"
                      : isAddingToCart
                      ? "Adicionando..."
                      : "Adicionar ao Carrinho"}
                  </span>
                </div>
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="whatsapp-btn"
                disabled={!isKitAvailable}
              >
                <MessageCircle size={20} />
                <span>Comprar via WhatsApp</span>
              </button>
            </div>

            {/* Product Meta */}
            <div className="meta-section">
              <div className="meta-grid">
                <div className="meta-item">
                  <span className="meta-label">Disponibilidade</span>
                  <span
                    className={`meta-value ${
                      isKitAvailable ? "in-stock" : "out-of-stock"
                    }`}
                  >
                    {isKitAvailable ? "Disponível" : "Indisponível"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KitDetail;