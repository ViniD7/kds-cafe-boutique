import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProductById } from "@/data/products";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { ArrowLeft } from "lucide-react";

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

            {/* Add to cart */}
            <button onClick={handleAddToCart} className="add-to-cart">
              Adicionar ao Carrinho
            </button>

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
