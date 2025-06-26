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
      <div className="min-h-screen py-12 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif mb-4">Produto não encontrado</h1>
          <Link to="/produtos" className="text-gold hover:underline">
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
    <div className="min-h-screen py-40">
      <div className="container-custom">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft size={18} className="mr-2" />
          Voltar
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product images */}
          <div>
            <div className="bg-muted aspect-square mb-4 rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-muted rounded overflow-hidden border-2 ${
                    selectedImage === index
                      ? "border-gold"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} - Imagem ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div>
            <h1 className="text-3xl font-serif mb-2">{product.name}</h1>
            <div className="mb-6">
              <span className="text-2xl font-medium">
                {formatCurrency(currentPrice)}
              </span>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Descrição</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {/* Variants */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Tamanho</h3>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant.id)}
                    className={`border rounded-md px-4 py-2 transition-colors ${
                      selectedVariant === variant.id
                        ? "bg-gold text-white border-gold"
                        : "border-border hover:border-gold"
                    }`}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="font-medium mb-2">Quantidade</h3>
              <div className="flex items-center">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="w-10 h-10 border rounded-l-md flex items-center justify-center hover:bg-muted"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-16 h-10 border-t border-b text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border rounded-r-md flex items-center justify-center hover:bg-muted"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-gold text-white py-3 rounded-md font-medium hover:bg-gold/90 transition-colors mb-4"
            >
              Adicionar ao Carrinho
            </button>

            {/* Additional info */}
            <div className="border-t border-border pt-6 mt-6">
              <div className="mb-3">
                <h4 className="font-medium mb-1">Categoria</h4>
                <p className="text-muted-foreground">{product.category}</p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Disponibilidade</h4>
                <p className="text-muted-foreground">
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
