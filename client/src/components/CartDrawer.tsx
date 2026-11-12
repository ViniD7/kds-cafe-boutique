import { useCart } from "@/context/CartContext";
import { formatCurrency, formatWhatsAppMessage } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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
        className="fixed inset-0 bg-espresso-deep/60 backdrop-blur-sm transition-opacity"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          className="w-screen max-w-md bg-surface text-on-surface flex flex-col justify-between shadow-2xl border-l border-border-hairline"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Header */}
          <div className="p-5 border-b border-border-hairline bg-surface flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-gold-burnished text-[22px]">
                shopping_bag
              </span>
              <div>
                <h2 className="font-serif text-lg text-espresso-deep font-semibold leading-tight">
                  Sacola de Reserva
                </h2>
                <span className="font-sans text-[11px] text-slate-warm">
                  {count} {count === 1 ? "item selecionado" : "itens selecionados"}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-warm hover:text-espresso-deep rounded-full hover:bg-paper-sand transition-colors"
              aria-label="Fechar gaveta"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Free Shipping Progress Track */}
          <div className="px-5 py-3 bg-paper-sand border-b border-border-hairline">
            <div className="flex items-center justify-between font-sans text-xs mb-1.5">
              <span className="text-espresso-deep font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-gold-burnished text-[16px]">
                  verified
                </span>
                {diffToFreeShipping > 0
                  ? `Faltam ${formatCurrency(diffToFreeShipping)} para Frete Grátis!`
                  : "Parabéns! Você ganhou Frete Grátis!"}
              </span>
              <span className="text-slate-warm text-[10px]">Meta R$ 199</span>
            </div>
            <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-gold-burnished to-gold-bright h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Items List or Empty State */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-border-hairline">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-paper-sand flex items-center justify-center text-gold-burnished mb-4">
                  <span className="material-symbols-outlined text-[32px]">shopping_bag</span>
                </div>
                <h3 className="font-serif text-xl text-espresso-deep font-semibold mb-1">
                  Sua sacola está vazia
                </h3>
                <p className="font-sans text-xs text-slate-warm max-w-xs mb-6">
                  Descubra os cafés raros da safra Caparaó e adicione frescor ao seu dia.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-lg bg-espresso-deep text-paper-cream font-sans text-xs uppercase tracking-wider font-bold hover:bg-espresso-surface transition-all"
                >
                  Continuar Comprando
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-lg bg-paper-sand p-1.5 border border-border-hairline shrink-0 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm text-espresso-deep font-semibold truncate">
                      {item.name}
                    </h4>
                    {item.variantName && (
                      <span className="font-sans text-[11px] text-slate-warm block">
                        {item.variantName}
                      </span>
                    )}
                    <span className="font-serif text-sm font-bold text-espresso-deep block mt-0.5">
                      {formatCurrency(item.price)}
                    </span>
                  </div>

                  {/* Stepper + Delete */}
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <div className="flex items-center bg-paper-sand rounded-md border border-border-hairline">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="w-6 h-6 flex items-center justify-center text-slate-warm hover:text-espresso-deep text-xs"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-sans text-xs font-bold text-espresso-deep">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-slate-warm hover:text-espresso-deep text-xs"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-warm hover:text-red-600 transition-colors"
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
            <div className="p-5 border-t border-border-hairline bg-surface flex flex-col gap-3">
              <div className="flex justify-between items-baseline font-sans">
                <span className="text-xs text-slate-warm">Subtotal</span>
                <span className="font-serif text-xl font-bold text-espresso-deep">
                  {formatCurrency(total)}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-paper-sand flex items-center justify-between text-xs font-sans">
                <span className="text-slate-warm flex items-center gap-1 font-medium">
                  <span className="material-symbols-outlined text-gold-burnished text-[16px]">
                    payments
                  </span>
                  No Pix com 5% OFF:
                </span>
                <span className="font-bold text-gold-burnished font-serif text-sm">
                  {formatCurrency(total * 0.95)}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3.5 rounded-xl bg-espresso-deep hover:bg-espresso-surface text-paper-cream font-sans text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined text-gold-bright text-[18px]">
                  lock
                </span>
                <span>Finalizar Pedido</span>
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-2.5 rounded-xl bg-paper-sand hover:bg-surface-container-high text-espresso-deep font-sans text-xs uppercase tracking-wider font-semibold border border-border-hairline transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px] text-emerald-700">
                  chat
                </span>
                <span>Finalizar via WhatsApp</span>
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CartDrawer;
