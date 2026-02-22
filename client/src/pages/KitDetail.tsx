import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { productAPI } from "@/services/api";
import { Kit, Product } from "@/types/api";
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
  
  const [kit, setKit] = useState<Kit | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKit = async () => {
      try {
        setLoading(true);
        // For now, treating kits as products in the API
        // In a real implementation, you'd want a dedicated endpoint for kits
        const product = await productAPI.getProductById(id || "");
        
        // If the API returns a product that represents a kit, treat it as such
        if (product) {
          const kitData: Kit = {
            ...product,
            originalPrice: product.price, // Default to same price if not specified
            products: [] // Kit composition would need to be stored differently
          };
          setKit(kitData);
          
          // For now, we'll need to simulate kit products since the API doesn't have a separate kit structure
          // In a real implementation, kits would have a separate API endpoint
        }
      } catch (error) {
        console.error("Error fetching kit:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchKit();
    }
  }, [id]);

  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  if (loading) {
    return (
      <div className="product-detail-container">
        <div className="container-custom">
          <p>Carregando detalhes do kit...</p>
        </div>
      </div>
    );
  }

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

  // For now, assume kits are available since we can't check individual product stock without additional API calls
  const isKitAvailable = true;

  const discount = kit.originalPrice ? calculateDiscount(kit.originalPrice, kit.price) : 0;

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

            {/* Kit Products - placeholder since we don't have a real kit structure */}
            <div className="variants-section">
              <h3 className="section-title">Contém</h3>
              <div className="kit-products-list">
                <p>Informações sobre os produtos contidos no kit estarão disponíveis em breve.</p>
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