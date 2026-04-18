import React, { useState, useEffect, useRef } from "react";
import { useSelfServiceCart } from "../context/SelfServiceCartContext";
import { toast } from "@/hooks/use-toast";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import Colors from "@/Constants/Colors/Colors";
import "./MiniCart.css";

interface MiniCartProps {
  onCheckout: () => void;
}

const MiniCart: React.FC<MiniCartProps> = ({ onCheckout }) => {
  const { items, total, itemCount, updateQuantity, removeFromCart, clearCart } =
    useSelfServiceCart();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const itemsListRef = useRef<HTMLDivElement>(null);
  const prevItemCountRef = useRef(itemCount);

  // Efeito para controlar o scroll quando novos itens são adicionados
  useEffect(() => {
    // Verificar se o carrinho está expandido e se novos itens foram adicionados
    if (
      isExpanded &&
      itemsListRef.current &&
      itemCount > prevItemCountRef.current
    ) {
      // Aguardar um pequeno delay para o DOM atualizar
      setTimeout(() => {
        if (itemsListRef.current) {
          const thirdItem = itemsListRef.current.querySelector(
            ".minicart-item-row:nth-child(3)",
          );

          if (thirdItem) {
            // Scroll suave até o terceiro item
            thirdItem.scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "nearest",
            });

            // Adicionar classe para efeito visual opcional
            thirdItem.classList.add("highlight-item");
            setTimeout(() => {
              thirdItem.classList.remove("highlight-item");
            }, 1000);
          } else if (itemsListRef.current.children.length > 0) {
            // Se não houver terceiro item, scroll para o último
            const lastItem = itemsListRef.current.lastElementChild;
            if (lastItem) {
              lastItem.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest",
              });
            }
          }
        }
      }, 100);
    }

    // Atualizar a referência do contador anterior
    prevItemCountRef.current = itemCount;
  }, [itemCount, isExpanded]);

  // Efeito para quando o carrinho é expandido
  useEffect(() => {
    if (isExpanded && itemsListRef.current && items.length > 2) {
      // Quando expandir o carrinho, scroll até o terceiro item
      setTimeout(() => {
        if (itemsListRef.current) {
          const thirdItem = itemsListRef.current.querySelector(
            ".minicart-item-row:nth-child(3)",
          );
          if (thirdItem) {
            thirdItem.scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "nearest",
            });
          }
        }
      }, 200);
    }
  }, [isExpanded, items.length]);

  const handleCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione produtos ao carrinho antes de continuar.",
        variant: "destructive",
      });
      return;
    }
    onCheckout();
  };

  const handleClearCart = () => {
    setShowClearConfirm(true);
  };

  const confirmClearCart = () => {
    clearCart();
    setShowClearConfirm(false);
    toast({
      title: "Carrinho limpo",
      description: "Todos os itens foram removidos do carrinho.",
    });
  };

  const cancelClearCart = () => {
    setShowClearConfirm(false);
  };

  return (
    <div className="minicart-wrapper">
      {/* Botão Toggle */}
      <button
        className="minicart-toggle-btn"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <ShoppingCart size={20} />
        <span>{itemCount > 0 ? `Carrinho (${itemCount})` : "Carrinho"}</span>
        <span className="toggle-icon" style={{ zIndex: 2000 }}>
          {isExpanded ? "▲" : "▼"}
        </span>
      </button>

      {/* Carrinho Expandido */}
      {isExpanded && (
        <div className="minicart-expanded">
          {items.length === 0 ? (
            /* Carrinho Vazio */
            <div className="minicart-empty">
              <div className="minicart-empty-icon">🛒</div>
              <p className="minicart-empty-text">Seu carrinho está vazio</p>
              <p className="minicart-empty-hint">
                Adicione produtos para começar
              </p>
            </div>
          ) : (
            <>
              {/* Lista de Itens */}
              <div className="minicart-items-list" ref={itemsListRef}>
                {items.map((item) => (
                  <div key={item.id} className="minicart-item-row">
                    {/* Imagem e Nome */}
                    <div className="minicart-item-product">
                      {item.image && (
                        <div className="minicart-item-image">
                          <img src={item.image} alt={item.name} />
                        </div>
                      )}
                      <div className="minicart-item-info">
                        <h4 className="minicart-item-name">{item.name}</h4>
                        <button
                          className="minicart-remove-btn"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remover
                        </button>
                      </div>
                    </div>

                    {/* Preço */}
                    <div className="minicart-item-price">
                      R$ {item.price.toFixed(2).replace(".", ",")}
                    </div>

                    {/* Quantidade */}
                    <div className="minicart-item-quantity">
                      <div className="quantity-controls">
                        <button
                          className="qty-btn"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <Minus size={14} />
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="minicart-item-subtotal">
                      R${" "}
                      {(item.price * item.quantity)
                        .toFixed(2)
                        .replace(".", ",")}
                    </div>
                  </div>
                ))}
              </div>

              {/* Resumo e Botão Finalizar */}
              <div className="minicart-summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>R$ {total.toFixed(2).replace(".", ",")}</span>
                </div>
                <div className="summary-total">
                  <span>Total</span>
                  <span className="total-value">
                    R$ {total.toFixed(2).replace(".", ",")}
                  </span>
                </div>

                <button
                  className="minicart-checkout-btn"
                  onClick={handleCheckout}
                >
                  Finalizar Compra
                </button>

                <div className="minicart-actions">
                  <button
                    className="minicart-clear-btn"
                    onClick={handleClearCart}
                  >
                    Limpar Pedido
                  </button>
                </div>

                <p className="minicart-note">
                  Pagamento e detalhes no checkout
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Modal de Confirmação - Limpar Pedido */}
      {showClearConfirm && (
        <div className="clear-confirm-overlay" onClick={cancelClearCart}>
          <div
            className="clear-confirm-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="clear-confirm-icon">🗑️</div>
            <h3 className="clear-confirm-title">Limpar Pedido</h3>
            <p className="clear-confirm-text">
              Deseja realmente remover todos os itens do carrinho?
            </p>
            <div className="clear-confirm-actions">
              <button
                className="clear-confirm-cancel"
                onClick={cancelClearCart}
              >
                Cancelar
              </button>
              <button className="clear-confirm-ok" onClick={confirmClearCart}>
                Limpar Tudo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MiniCart;
