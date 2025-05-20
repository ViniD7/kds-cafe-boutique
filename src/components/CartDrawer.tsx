
import { useCart, CartItemDetail } from "@/context/CartContext";
import { X, Plus, Minus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Link } from "react-router-dom";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { getCartItemDetails, removeFromCart, updateQuantity, getCartTotal, getCartItemsCount } = useCart();
  const cartItems = getCartItemDetails();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50">
      <div 
        className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl p-4 overflow-y-auto transform transition-transform duration-300 ease-in-out"
        style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-serif font-semibold flex items-center">
            <ShoppingCart size={20} className="mr-2" />
            Carrinho de Compras
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-full">
            <X size={20} />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <ShoppingCart size={48} className="text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">Seu carrinho está vazio</p>
            <p className="text-muted-foreground mb-6">Adicione alguns produtos para começar</p>
            <Button onClick={onClose} className="bg-gold hover:bg-gold/90">
              Continuar Comprando
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex border-b border-muted pb-4">
                  <div className="h-20 w-20 flex-shrink-0 bg-muted rounded overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  
                  <div className="ml-4 flex-grow">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{item.name}</h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    
                    {item.variantName && (
                      <p className="text-sm text-muted-foreground">{item.variantName}</p>
                    )}
                    
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center border rounded">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 hover:bg-muted"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-2 text-center w-8">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 hover:bg-muted"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t border-muted pt-4">
              <div className="flex justify-between text-lg font-medium">
                <span>Subtotal ({getCartItemsCount()} itens)</span>
                <span>{formatCurrency(getCartTotal())}</span>
              </div>
              <Link 
                to="/cart" 
                className="block bg-gold text-white rounded-md py-3 px-4 text-center font-medium hover:bg-gold/90 transition-colors w-full"
                onClick={onClose}
              >
                Finalizar Compra
              </Link>
              <button 
                onClick={onClose}
                className="block text-center w-full py-2 text-foreground hover:underline"
              >
                Continuar Comprando
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
