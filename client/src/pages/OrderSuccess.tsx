import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CheckCircle2, Package, ArrowRight } from "lucide-react";
import api from "@/services/api";
import { useCart } from "@/context/CartContext";

const OrderSuccess = () => {
  const location = useLocation();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const { clearCart } = useCart();
  
  useEffect(() => {
    // Pegar o payment_intent e orderId da URL
    const searchParams = new URLSearchParams(location.search);
    const paymentIntent = searchParams.get("payment_intent");
    const paymentIntentClientSecret = searchParams.get("payment_intent_client_secret");
    const redirectStatus = searchParams.get("redirect_status");
    const orderId = searchParams.get("orderId");

    if (redirectStatus === "succeeded") {
      setStatus("success");
      // Execute apenas uma vez para evitar loop
      const hasCleared = sessionStorage.getItem(`cleared_cart_${orderId}`);
      if (!hasCleared) {
        clearCart();
        sessionStorage.setItem(`cleared_cart_${orderId}`, 'true');
        
        if (orderId) {
          api.patch(`/orders/${orderId}`, { status: 'Pago' }).catch(console.error);
        }
      }
    } else {
      setStatus("error");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  return (
    <div style={{ minHeight: '70vh', padding: '120px 20px', backgroundColor: 'hsl(var(--surface))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '600px', width: '100%', backgroundColor: 'hsl(var(--card))', padding: '50px 30px', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', textAlign: 'center' }}>
        
        {status === "loading" && (
          <div>
            <div style={{ width: '50px', height: '50px', border: '4px solid hsl(var(--border))', borderTopColor: 'hsl(var(--gold))', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
            <h1 style={{ fontSize: '1.5rem', color: 'hsl(var(--text-heading))' }}>Verificando seu pagamento...</h1>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {status === "success" && (
          <div>
            <div style={{ width: '80px', height: '80px', backgroundColor: '#ecfdf5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <CheckCircle2 size={40} color="#10b981" />
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'hsl(var(--text-heading))', marginBottom: '10px' }}>
              Pagamento Confirmado!
            </h1>
            <p style={{ color: 'hsl(var(--text-body))', fontSize: '1.1rem', marginBottom: '30px', lineHeight: '1.6' }}>
              Uhul! Seu pedido foi recebido e o pagamento foi aprovado com sucesso. Nossos baristas já estão preparando o seu café especial!
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '300px', margin: '0 auto' }}>
              <Link 
                to="/produtos"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', backgroundColor: 'hsl(var(--gold))', color: 'white', padding: '14px 24px', borderRadius: '8px', fontWeight: '600', textDecoration: 'none', transition: 'opacity 0.2s' }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                <Package size={20} />
                Continuar Comprando
              </Link>
              
              <Link 
                to="/profile"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', backgroundColor: 'transparent', border: '1px solid hsl(var(--border))', color: 'hsl(var(--text-subtle))', padding: '14px 24px', borderRadius: '8px', fontWeight: '600', textDecoration: 'none', transition: 'background 0.2s' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'hsl(var(--surface-alt))'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Ver Meus Pedidos
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        )}

        {status === "error" && (
          <div>
            <div style={{ width: '80px', height: '80px', backgroundColor: '#fef2f2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <CheckCircle2 size={40} color="#ef4444" />
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'hsl(var(--text-heading))', marginBottom: '10px' }}>
              Ops! Algo deu errado.
            </h1>
            <p style={{ color: 'hsl(var(--text-body))', fontSize: '1.1rem', marginBottom: '30px' }}>
              Não conseguimos confirmar o pagamento no momento. Se o erro persistir, entre em contato conosco.
            </p>
            <Link 
                to="/cart"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'hsl(var(--gold))', color: 'white', padding: '14px 24px', borderRadius: '8px', fontWeight: '600', textDecoration: 'none' }}
              >
                Voltar ao Carrinho
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSuccess;
