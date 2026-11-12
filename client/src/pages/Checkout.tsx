import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "../components/CheckoutForm";
import { useLocation, useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { formatCurrency } from "@/lib/utils";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || "");

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const orderId = location.state?.orderId;
  const amount = location.state?.amount;

  useEffect(() => {
    if (!orderId || !amount) {
      navigate("/cart");
      return;
    }

    const fetchPaymentIntent = async () => {
      try {
        const response = await api.post("/payments/create-intent", {
          amount,
          orderId,
        });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error("Erro ao iniciar o checkout", error);
      }
    };
    fetchPaymentIntent();
  }, [orderId, amount, navigate]);

  const appearance = {
    theme: "stripe" as const,
    variables: {
      colorPrimary: "#120F0D",
      colorBackground: "#ffffff",
      colorText: "#120F0D",
      colorDanger: "#ba1a1a",
      fontFamily: "Plus Jakarta Sans, sans-serif",
      borderRadius: "8px",
    },
  };

  return (
    <div className="w-full min-h-screen bg-surface py-12 px-4 md:px-8">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between text-xs font-sans text-slate-warm pb-4 border-b border-border-hairline">
          <Link to="/cart" className="flex items-center gap-1 hover:text-espresso-deep">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Voltar para a Sacola</span>
          </Link>
          <span className="flex items-center gap-1 font-semibold text-espresso-deep">
            <span className="material-symbols-outlined text-[15px] text-gold-burnished">lock</span>
            Checkout 256-Bit SSL
          </span>
        </div>

        {/* Title & Amount */}
        <div className="text-center">
          <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-gold-burnished font-bold block mb-1">
            Atelier KDS • Pagamento Seguro
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-espresso-deep font-semibold">
            Finalizar Pedido
          </h1>
          {amount && (
            <p className="font-sans text-sm text-slate-warm mt-2">
              Valor a liquidar:{" "}
              <strong className="text-espresso-deep font-serif text-lg font-bold">
                {formatCurrency(amount)}
              </strong>
            </p>
          )}
        </div>

        {/* Stripe Elements Box or Loader */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 border border-border-hairline shadow-lg">
          {clientSecret ? (
            <Elements options={{ clientSecret, appearance }} stripe={stripePromise}>
              <CheckoutForm orderId={orderId} />
            </Elements>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
              <span className="material-symbols-outlined text-[40px] text-gold-burnished animate-spin">
                progress_activity
              </span>
              <div>
                <p className="font-sans text-sm font-semibold text-espresso-deep">
                  Preparando ambiente de checkout criptografado...
                </p>
                <p className="font-sans text-xs text-slate-warm mt-1">
                  Conectando com o gateway Stripe de alta segurança.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Trust Badges */}
        <div className="pt-4 grid grid-cols-3 gap-2 text-center text-slate-warm font-sans text-xs">
          <div className="flex flex-col items-center gap-1">
            <span className="material-symbols-outlined text-gold-burnished text-[20px]">
              verified_user
            </span>
            <span>Stripe Certified</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="material-symbols-outlined text-gold-burnished text-[20px]">
              local_shipping
            </span>
            <span>Despacho em 24h</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="material-symbols-outlined text-gold-burnished text-[20px]">
              workspace_premium
            </span>
            <span>Garantia de Origem</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
