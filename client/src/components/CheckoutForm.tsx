import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

interface CheckoutFormProps {
  orderId: string;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ orderId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);
    setErrorMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-success?orderId=${orderId}`,
      },
    });

    if (error) {
      if (error.type === 'card_error' || error.type === 'validation_error') {
        setErrorMessage(error.message ?? 'Ocorreu um erro com o seu cartão.');
      } else {
        setErrorMessage('Ocorreu um erro inesperado de comunicação.');
      }
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <PaymentElement className="mb-6" />
      
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm border border-red-300">
          {errorMessage}
        </div>
      )}

      <button 
        className="checkout-stripe-btn"
        disabled={!stripe || isLoading} 
        style={{
          width: '100%',
          backgroundColor: '#baa460',
          color: 'white',
          fontWeight: '600',
          padding: '14px',
          borderRadius: '8px',
          border: 'none',
          cursor: (!stripe || isLoading) ? 'not-allowed' : 'pointer',
          opacity: (!stripe || isLoading) ? 0.6 : 1,
          transition: 'opacity 0.2s',
          fontSize: '1rem',
          marginTop: '10px'
        }}
        onMouseOver={(e) => { if (!isLoading) e.currentTarget.style.opacity = '0.9'; }}
        onMouseOut={(e) => { if (!isLoading) e.currentTarget.style.opacity = '1'; }}
      >
        {isLoading ? 'Processando...' : 'Pagar Agora'}
      </button>
    </form>
  );
};
