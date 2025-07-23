import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProductById } from "@/data/products";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import {
  Heart,
  Share2,
  Truck,
  Shield,
  CreditCard,
  Star,
  ChevronDown,
} from "lucide-react";
import ProductCarousel from "@/components/ProductCarousel";

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
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [sellerInfo, setSellerInfo] = useState(null);
  const [shippingOptions, setShippingOptions] = useState([]);

  useEffect(() => {
    // Simular busca de informações do vendedor e frete
    if (product) {
      setSellerInfo({
        name: "Loja Oficial",
        rating: 4.8,
        sales: 1254,
        positiveFeedback: "98%",
      });

      setShippingOptions([
        { type: "normal", price: 12.9, deliveryDate: "3 dias úteis" },
        { type: "express", price: 24.9, deliveryDate: "1 dia útil" },
        { type: "free", price: 0, deliveryDate: "5 dias úteis" },
      ]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="not-found">
        <h1>Produto não encontrado</h1>
        <Link to="/produtos" className="btn btn-primary">
          Ver todos os produtos
        </Link>
      </div>
    );
  }

  const selectedVariantObj = product.variants.find(
    (v) => v.id === selectedVariant
  );
  const currentPrice = selectedVariantObj?.price || product.price;
  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - currentPrice) / product.originalPrice) * 100
      )
    : 0;

  const handleAddToCart = () => {
    addToCart(product.id, quantity, selectedVariant);
    // Feedback visual
    const btn = document.querySelector(".buy-btn");
    if (btn) {
      btn.innerHTML = "Adicionado ao carrinho!";
      setTimeout(() => {
        btn.innerHTML = "Comprar agora";
      }, 2000);
    }
  };

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={16}
          fill={i < rating ? "currentColor" : "none"}
          className={i < rating ? "text-yellow-400" : "text-gray-300"}
        />
      ));
  };

  return (
    <div className="product-page marketplace-style">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span onClick={() => navigate("/")}>Home</span>
        <span>›</span>
        <span onClick={() => navigate("/categoria")}>{product.category}</span>
        <span>›</span>
        <span className="current">{product.name.substring(0, 50)}...</span>
      </div>

      <div className="product-container">
        {/* Left Column - Images */}
        <div className="product-gallery">
          <div className="main-image">
            <img src={product.images[selectedImage]} alt={product.name} />
            {product.isFreeShipping && (
              <div className="shipping-badge">Frete grátis</div>
            )}
          </div>

          <div className="thumbnails">
            {product.images.slice(0, 6).map((image, index) => (
              <div
                key={index}
                className={`thumbnail ${
                  selectedImage === index ? "active" : ""
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Middle Column - Product Info */}
        <div className="product-info">
          <div className="product-header">
            <div className="condition-tag">Novo | 234 vendidos</div>
            <h1>{product.name}</h1>

            <div className="rating-section">
              <div className="stars">
                {renderStars(product.rating || 4.5)}
                <span>{product.rating || 4.5}</span>
              </div>
              <a href="#reviews" className="reviews-link">
                {product.reviewCount || 128} avaliações
              </a>
            </div>

            <div className="price-section">
              {product.originalPrice && (
                <div className="original-price">
                  {formatCurrency(product.originalPrice)}
                </div>
              )}
              <div className="current-price">
                {formatCurrency(currentPrice)}
                {discountPercentage > 0 && (
                  <span className="discount">{discountPercentage}% OFF</span>
                )}
              </div>
              <div className="installments">
                em 12x de {formatCurrency(currentPrice / 12)} sem juros
              </div>
              <div className="payment-method">
                <CreditCard size={16} /> Aceita cartão
              </div>
            </div>

            <div className="shipping-section">
              <h3>Frete</h3>
              <div className="shipping-options">
                <div className="shipping-option">
                  <Truck size={18} />
                  <div>
                    <div className="shipping-type">Normal</div>
                    <div className="shipping-details">
                      {formatCurrency(shippingOptions[0]?.price || 12.9)} •
                      Chega {shippingOptions[0]?.deliveryDate}
                    </div>
                  </div>
                </div>
                <div className="shipping-option">
                  <Truck size={18} />
                  <div>
                    <div className="shipping-type">Expresso</div>
                    <div className="shipping-details">
                      {formatCurrency(shippingOptions[1]?.price || 24.9)} •
                      Chega {shippingOptions[1]?.deliveryDate}
                    </div>
                  </div>
                </div>
                {product.isFreeShipping && (
                  <div className="shipping-option highlight">
                    <Truck size={18} />
                    <div>
                      <div className="shipping-type">Frete Grátis</div>
                      <div className="shipping-details">
                        Grátis • Chega {shippingOptions[2]?.deliveryDate}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="delivery-zipcode">
                <input type="text" placeholder="Calcular frete para seu CEP" />
                <button>OK</button>
              </div>
            </div>

            <div className="stock-message">
              {selectedVariantObj?.stock > 10 ? (
                <span className="in-stock">Disponível em estoque</span>
              ) : selectedVariantObj?.stock > 0 ? (
                <span className="low-stock">
                  Últimas {selectedVariantObj.stock} unidades!
                </span>
              ) : (
                <span className="out-of-stock">Produto esgotado</span>
              )}
            </div>
          </div>

          <div className="product-actions">
            <div className="quantity-selector">
              <span>Quantidade:</span>
              <div className="quantity-control">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 1;
                    setQuantity(Math.max(1, value));
                  }}
                  min="1"
                />
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              <span className="available-stock">
                ({selectedVariantObj?.stock || 0} disponíveis)
              </span>
            </div>

            <div className="action-buttons">
              <button className="buy-btn" onClick={handleAddToCart}>
                Comprar agora
              </button>
              <button className="add-to-cart-btn">Adicionar ao carrinho</button>
            </div>

            <div className="secure-purchase">
              <Shield size={18} />
              <span>
                Compra garantida, receba o produto que está esperando ou
                devolvemos seu dinheiro.
              </span>
            </div>
          </div>
        </div>

        {/* Right Column - Seller Info */}
        <div className="seller-info">
          <div className="seller-card">
            <h3>Vendido por</h3>
            <div className="seller-name">{sellerInfo?.name}</div>
            <div className="seller-rating">
              {renderStars(sellerInfo?.rating || 4.8)}
              <span>{sellerInfo?.positiveFeedback} positivo</span>
            </div>
            <div className="seller-sales">+{sellerInfo?.sales} vendas</div>

            <div className="seller-benefits">
              <div className="benefit">
                <span>✓</span> Mercado Pontos
              </div>
              <div className="benefit">
                <span>✓</span> Frete Grátis
              </div>
              <div className="benefit">
                <span>✓</span> Full entrega
              </div>
            </div>

            <button className="see-more-btn">Ver mais dados do vendedor</button>
          </div>

          <div className="wishlist-share">
            <button
              className={`wishlist-btn ${isWishlisted ? "active" : ""}`}
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
              {isWishlisted ? "Na lista" : "Adicionar à lista"}
            </button>
            <button className="share-btn">
              <Share2 size={18} />
              Compartilhar
            </button>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="product-tabs">
        <div className="tab active">Descrição</div>
        <div className="tab">Especificações</div>
        <div className="tab">Avaliações ({product.reviewCount || 128})</div>
        <div className="tab">Perguntas (42)</div>
      </div>

      <div className="tab-content">
        <div className="description-section">
          <h2>Descrição do produto</h2>
          <p>{product.description}</p>

          <h3>Características principais</h3>
          <ul>
            {product.features?.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Frequently Bought Together */}
      <div className="frequently-bought">
        <h2>Quem comprou este produto também comprou</h2>
        <ProductCarousel products={product.relatedProducts || []} />
      </div>

      {/* Similar Products */}
      <div className="similar-products">
        <h2>Produtos similares</h2>
        <ProductCarousel products={product.similarProducts || []} />
      </div>

      {/* Recently Viewed */}
      <div className="recently-viewed">
        <h2>Você viu recentemente</h2>
        <ProductCarousel products={product.recentlyViewed || []} />
      </div>
    </div>
  );
};

export default ProductDetail;
