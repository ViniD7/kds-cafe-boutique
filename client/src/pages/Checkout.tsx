import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CheckoutForm } from '../components/CheckoutForm';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';

// Inicializa a SDK do Stripe com a chave pública
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Assuming orderId and amount are passed via state from the Cart page
  const orderId = location.state?.orderId;
  const amount = location.state?.amount;

  useEffect(() => {
    if (!orderId || !amount) {
      // If we don't have order details, redirect back to cart
      navigate('/cart');
      return;
    }

    const fetchPaymentIntent = async () => {
      try {
        const response = await api.post('/payments/create-intent', {
          amount,
          orderId
        });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error("Erro ao iniciar o checkout", error);
      }
    };
    fetchPaymentIntent();
  }, [orderId, amount, navigate]);

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#2563eb', // Adjust to match the site's primary color
    },
  };

  return (
    <div style={{ minHeight: '80vh', padding: '120px 20px 60px', backgroundColor: 'hsl(var(--surface-alt))' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: 'hsl(var(--card))', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '30px', textAlign: 'center', color: 'hsl(var(--text-heading))' }}>
          Finalizar Pagamento
        </h1>
        
        {clientSecret ? (
          <Elements options={{ clientSecret, appearance }} stripe={stripePromise}>
            <CheckoutForm orderId={orderId} />
          </Elements>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 0' }}>
            <p style={{ color: 'hsl(var(--text-body))', fontSize: '1.1rem' }}>Preparando o checkout seguro...</p>
            <div style={{ marginTop: '20px', width: '40px', height: '40px', border: '3px solid hsl(var(--border))', borderTopColor: 'hsl(var(--gold))', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
