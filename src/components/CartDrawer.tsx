import { useCart, CartItemDetail } from "@/context/CartContext";
import { X, Plus, Minus, ShoppingCart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatWhatsAppMessage } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./cartDrawer/CartDrawer.css";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const {
    getCartItemDetails,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartItemsCount,
  } = useCart();
  const cartItems = getCartItemDetails();
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWhatsAppOrder = () => {
    const message = formatWhatsAppMessage(cartItems, getCartTotal());
    const whatsappUrl = `https://wa.me/5528999921033?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-drawer-overlay" onClick={onClose}></div>
      <div
        className={`cart-drawer ${isOpen ? "cart-drawer-open" : ""} ${
          isHeaderScrolled ? "scrolled" : ""
        }`}
      >
        <div className="cart-drawer-header">
          <h2 className="cart-drawer-title">
            <ShoppingCart size={20} className="cart-drawer-title-icon" />
            Carrinho de Compras
          </h2>
          <button onClick={onClose} className="cart-drawer-close-btn">
            <X size={20} />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-drawer-empty">
            <ShoppingCart size={48} className="cart-drawer-empty-icon" />
            <p className="cart-drawer-empty-title">Seu carrinho está vazio</p>
            <p className="cart-drawer-empty-subtitle">
              Adicione alguns produtos para começar
            </p>
            <Button onClick={onClose} className="cart-drawer-continue-btn">
              Continuar Comprando
            </Button>
          </div>
        ) : (
          <>
            <div className="cart-drawer-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-img"
                    />
                  </div>

                  <div className="cart-item-content">
                    <div className="cart-item-header">
                      <h3 className="cart-item-name">{item.name}</h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="cart-item-remove-btn"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    {item.variantName && (
                      <p className="cart-item-variant">{item.variantName}</p>
                    )}

                    <div className="cart-item-footer">
                      <div className="quantity-controls">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="quantity-btn"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="quantity-display">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="quantity-btn"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="cart-item-price">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-drawer-footer">
              <div className="cart-subtotal">
                <span>Subtotal ({getCartItemsCount()} itens)</span>
                <span>{formatCurrency(getCartTotal())}</span>
              </div>

              <button
                onClick={handleWhatsAppOrder}
                className="whatsapp-order-btn"
              >
                <MessageCircle size={20} className="whatsapp-icon" />
                Comprar via WhatsApp
              </button>

              {/* <Link to="/cart" className="checkout-btn" onClick={onClose}>
                Finalizar Compra
              </Link> */}
              <button onClick={onClose} className="continue-shopping-btn">
                Continuar Comprando
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
