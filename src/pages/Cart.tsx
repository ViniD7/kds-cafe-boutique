
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";
import { Plus, Minus, Trash2, ShoppingCart } from "lucide-react";

const Cart = () => {
  const { getCartItemDetails, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const cartItems = getCartItemDetails();
  
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen py-12">
        <div className="container-custom">
          <h1 className="text-3xl font-serif mb-8">Carrinho de Compras</h1>
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <ShoppingCart size={64} className="text-muted mb-4" />
            <h2 className="text-2xl font-serif mb-4">Seu carrinho está vazio</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Parece que você ainda não adicionou nenhum produto ao seu carrinho. 
              Continue explorando nossa loja para descobrir nossos cafés especiais.
            </p>
            <Link 
              to="/produtos" 
              className="bg-gold text-white py-3 px-8 rounded-md font-medium hover:bg-gold/90 transition-colors"
            >
              Continuar Comprando
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        <h1 className="text-3xl font-serif mb-8">Carrinho de Compras</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Cart Items */}
            <div className="bg-white border border-border rounded-lg overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-border bg-secondary/30">
                <div className="col-span-6">Produto</div>
                <div className="col-span-2 text-center">Preço</div>
                <div className="col-span-2 text-center">Quantidade</div>
                <div className="col-span-2 text-center">Subtotal</div>
              </div>
              
              {cartItems.map((item) => (
                <div key={item.id} className="border-b border-border last:border-0">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center">
                    {/* Product */}
                    <div className="col-span-6 flex items-center space-x-4">
                      <div className="h-20 w-20 flex-shrink-0 bg-muted rounded overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        {item.variantName && (
                          <p className="text-sm text-muted-foreground">{item.variantName}</p>
                        )}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-sm text-muted-foreground hover:text-destructive flex items-center mt-1 md:hidden"
                        >
                          <Trash2 size={14} className="mr-1" />
                          Remover
                        </button>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="md:col-span-2 md:text-center flex justify-between items-center md:block">
                      <div className="text-sm md:hidden">Preço:</div>
                      <div>{formatCurrency(item.price)}</div>
                    </div>
                    
                    {/* Quantity */}
                    <div className="md:col-span-2 md:text-center flex justify-between items-center md:justify-center">
                      <div className="text-sm md:hidden">Quantidade:</div>
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
                    </div>
                    
                    {/* Subtotal */}
                    <div className="md:col-span-2 md:text-center flex justify-between items-center md:block">
                      <div className="text-sm md:hidden">Subtotal:</div>
                      <div className="font-medium">{formatCurrency(item.price * item.quantity)}</div>
                    </div>
                    
                    {/* Remove - Desktop */}
                    <div className="hidden md:flex md:col-span-12 md:justify-end">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm text-muted-foreground hover:text-destructive flex items-center"
                      >
                        <Trash2 size={14} className="mr-1" />
                        Remover
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Cart Actions */}
            <div className="flex justify-between mt-6">
              <Link 
                to="/produtos" 
                className="text-gold hover:underline flex items-center"
              >
                Continuar Comprando
              </Link>
              
              <button
                onClick={clearCart}
                className="text-muted-foreground hover:text-destructive"
              >
                Limpar Carrinho
              </button>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-border rounded-lg p-6">
              <h2 className="text-xl font-serif mb-4">Resumo do Pedido</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(getCartTotal())}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Frete</span>
                  <span>Calculado no checkout</span>
                </div>
                
                <div className="border-t border-border pt-3 mt-3">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{formatCurrency(getCartTotal())}</span>
                  </div>
                </div>
              </div>
              
              <Link 
                to="/checkout"
                className="block w-full bg-gold text-white py-3 rounded-md text-center font-medium hover:bg-gold/90 transition-colors"
              >
                Finalizar Compra
              </Link>
              
              <div className="mt-4 text-sm text-muted-foreground text-center">
                Frete e impostos calculados no checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
