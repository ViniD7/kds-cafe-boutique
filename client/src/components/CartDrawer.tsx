import { useCart } from "@/context/CartContext";
import { formatCurrency, formatWhatsAppMessage } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
  const navigate = useNavigate();

  const total = getCartTotal();
  const count = getCartItemsCount();
  const freeShippingThreshold = 199.0;
  const progress = Math.min(100, Math.round((total / freeShippingThreshold) * 100));
  const diffToFreeShipping = Math.max(0, freeShippingThreshold - total);

  const handleCheckout = () => {
    onClose();
    navigate("/cart");
  };

  const handleWhatsAppOrder = () => {
    const message = formatWhatsAppMessage(cartItems, total);
    const whatsappUrl = `https://wa.me/5528999921033?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-[#0D0B0A]/80 backdrop-blur-sm transition-opacity"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          className="w-screen max-w-md bg-[#0D0B0A] text-[#F5F2EB] flex flex-col justify-between shadow-2xl border-l border-white/10"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 320 }}
        >
          {/* Header */}
          <div className="p-5 border-b border-white/10 bg-[#161311] flex items-center justify-between">
            <div className="flex items-center gap-2.5 font-mono">
              <span className="material-symbols-outlined text-gold-bright text-[22px]">
                shopping_bag
              </span>
              <div>
                <h2 className="font-serif text-lg text-paper-cream leading-tight">
                  Sacola de Reserva
                </h2>
                <span className="text-[11px] text-paper-sand/50">
                  {count} {count === 1 ? "item selecionado" : "itens selecionados"}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-paper-sand/60 hover:text-paper-cream transition-colors"
              aria-label="Fechar gaveta"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Free Shipping Progress Track */}
          <div className="px-5 py-3.5 bg-[#120F0D] border-b border-white/10 font-mono text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-paper-cream flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-bright" />
                {diffToFreeShipping > 0
                  ? `Faltam ${formatCurrency(diffToFreeShipping)} para Frete Cortesia`
                  : "Parabéns! Frete Cortesia Ativado!"}
              </span>
              <span className="text-paper-sand/40 text-[10px]">Meta R$ 199</span>
            </div>
            <div className="w-full bg-white/10 h-1 overflow-hidden">
              <div
                className="bg-gold-bright h-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Items List or Empty State */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-white/10">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-[#161311] border border-white/10 flex items-center justify-center text-gold-bright mb-4">
                  <span className="material-symbols-outlined text-[32px]">shopping_bag</span>
                </div>
                <h3 className="font-serif text-xl text-paper-cream font-normal mb-1">
                  Sua sacola está vazia
                </h3>
                <p className="font-sans text-xs text-paper-sand/60 max-w-xs mb-6">
                  Descubra os cafés raros da safra Caparaó e adicione frescor ao seu dia.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-gold-burnished hover:bg-gold-bright text-[#0D0B0A] font-mono text-xs uppercase tracking-wider font-bold transition-all"
                >
                  Explorar Safras →
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4 items-center">
                  <div className="w-16 h-16 bg-[#161311] p-1.5 border border-white/10 shrink-0 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain filter drop-shadow-sm"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm text-paper-cream truncate">{item.name}</h4>
                    {item.variantName && (
                      <span className="font-mono text-[10.5px] text-paper-sand/50 block">
                        {item.variantName}
                      </span>
                    )}
                    <span className="font-mono text-xs font-bold text-gold-bright block mt-0.5">
                      {formatCurrency(item.price)}
                    </span>
                  </div>

                  {/* Stepper + Delete */}
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <div className="flex items-center bg-[#161311] border border-white/10">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="w-6 h-6 flex items-center justify-center text-paper-sand/60 hover:text-paper-cream text-xs"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-mono text-xs font-bold text-paper-cream">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-paper-sand/60 hover:text-paper-cream text-xs"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-paper-sand/40 hover:text-red-400 transition-colors"
                      title="Remover"
                    >
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Summary & CTAs */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-white/10 bg-[#161311] flex flex-col gap-3 font-mono">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-paper-sand/60">Subtotal</span>
                <span className="font-mono text-xl font-bold text-paper-cream">
                  {formatCurrency(total)}
                </span>
              </div>

              <div className="p-2.5 bg-[#0D0B0A] border border-white/5 flex items-center justify-between text-xs">
                <span className="text-paper-sand/70 flex items-center gap-1">
                  Pix com 5% OFF:
                </span>
                <span className="font-bold text-gold-bright">
                  {formatCurrency(total * 0.95)}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3.5 bg-gold-burnished hover:bg-gold-bright text-[#0D0B0A] font-mono text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[17px]">lock</span>
                <span>Finalizar Pedido →</span>
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-paper-cream font-mono text-xs uppercase tracking-wider border border-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[17px] text-emerald-400">
                  chat
                </span>
                <span>Finalizar via WhatsApp Concierge</span>
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CartDrawer;
