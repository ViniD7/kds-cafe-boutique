import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProductById } from "@/data/products";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { ArrowLeft, MessageCircle } from "lucide-react";
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

  if (!product) {
    return (
      <div className="not-found">
        <div className="not-found-content">
          <h1 className="not-found-title">Produto não encontrado</h1>
          <Link to="/produtos" className="not-found-link">
            Voltar para a lista de produtos
          </Link>
        </div>
      </div>
    );
  }

  const selectedVariantObj = product.variants.find(
    (v) => v.id === selectedVariant
  );
  const currentPrice = selectedVariantObj?.price || product.price;

  const handleAddToCart = () => {
    addToCart(product.id, quantity, selectedVariant);
  };

  const handleWhatsAppOrder = () => {
    // Create message with product details
    const variantName = selectedVariantObj ? ` (${selectedVariantObj.name})` : "";
    const message = `Olá! Gostaria de comprar: ${product.name}${variantName}%0AQuantidade: ${quantity}%0APreço unitário: ${formatCurrency(currentPrice)}%0APreço total: ${formatCurrency(currentPrice * quantity)}%0A%0AAguardo confirmação do pedido.`;
    
    // WhatsApp link with pre-filled message
    const whatsappUrl = `https://wa.me/5528999921033?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  return (
    <div className="product-detail-container">
      <div className="container-custom">
        {/* Back button */}
        <button onClick={() => navigate(-1)} className="back-button">
          <ArrowLeft size={18} className="mr-2" />
          Voltar
        </button>

        <div className="product-grid">
          {/* Product images */}
          <div>
            <div className="product-image-main">
              <img src={product.images[selectedImage]} alt={product.name} />
            </div>
            <div className="product-thumbnails">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`product-thumbnail ${
                    selectedImage === index ? "active" : ""
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} - Imagem ${index + 1}`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div>
            <h1 className="product-title">{product.name}</h1>
            <div className="product-price">
              <span>{formatCurrency(currentPrice)}</span>
            </div>

            <div className="product-description-container">
              <h3 className="section-title">Descrição</h3>
              <p className="product-description">{product.description}</p>
            </div>

            {/* Variants */}
            <div className="variants-container">
              <h3 className="section-title">Tamanho</h3>
              <div className="variants-list">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant.id)}
                    className={`variant-button ${
                      selectedVariant === variant.id ? "active" : ""
                    }`}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="quantity-container">
              <h3 className="section-title">Quantidade</h3>
              <div className="quantity-control">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="quantity-button"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="quantity-input"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="quantity-button"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="action-buttons">
              <button onClick={handleAddToCart} className="add-to-cart">
                Adicionar ao Carrinho
              </button>
              
              {/* WhatsApp Purchase Button */}
              <button onClick={handleWhatsAppOrder} className="whatsapp-purchase">
                <MessageCircle size={20} className="mr-2" />
                Comprar via WhatsApp
              </button>
            </div>

            {/* Additional info */}
            <div className="additional-info">
              <div className="info-item">
                <h4 className="info-title">Categoria</h4>
                <p className="info-value">{product.category}</p>
              </div>
              <div className="info-item">
                <h4 className="info-title">Disponibilidade</h4>
                <p className="info-value">
                  {selectedVariantObj && selectedVariantObj.stock > 0
                    ? "Em estoque"
                    : "Esgotado"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;