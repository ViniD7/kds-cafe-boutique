import React, { useState, memo } from "react";
import {
  SelfServiceCartProvider,
  useSelfServiceCartSummary,
} from "./context/SelfServiceCartContext";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Success from "./components/Success";
import MiniCart from "./components/MiniCart";
import { Toaster } from "@/components/ui/toaster";
import { SelfServiceOrder } from "./types";
import { toast } from "@/hooks/use-toast";
import Colors from "@/Constants/Colors/Colors";
import "./SelfService.css";
import Images from "@/Constants/Images/images";

// Componente para exibir subtotal no topo - otimizado com memo
const TopSubtotal = memo(() => {
  const { total, itemCount } = useSelfServiceCartSummary();

  if (itemCount === 0) return null;

  return (
    <div
      className="selfservice-top-subtotal"
      style={{
        background: Colors.primary,
        color: Colors.white,
      }}
    >
      <div className="selfservice-top-subtotal-content">
        <span className="selfservice-top-subtotal-items">
          {itemCount} {itemCount === 1 ? "item" : "itens"}
        </span>
        <span className="selfservice-top-subtotal-value">
          R$ {total.toFixed(2).replace(".", ",")}
        </span>
      </div>
    </div>
  );
});

TopSubtotal.displayName = 'TopSubtotal';

type SelfServiceStep = "products" | "cart" | "checkout" | "success";

const SelfServiceContent: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<SelfServiceStep>("products");
  const [lastOrder, setLastOrder] = useState<SelfServiceOrder | null>(null);

  const handleGoToCart = () => {
    setCurrentStep("cart");
  };

  const handleGoToCheckout = () => {
    setCurrentStep("checkout");
  };

  const handleOrderSuccess = (order: SelfServiceOrder) => {
    setLastOrder(order);
    setCurrentStep("success");
  };

  const handleNewOrder = () => {
    setLastOrder(null);
    setCurrentStep("products");
  };

  const handleBackToProducts = () => {
    setCurrentStep("products");
  };

  return (
    <div
      className="selfservice-container"
      style={{ background: Colors.background }}
    >
      <Toaster />
      <TopSubtotal />

      <img
        src={Images.logoKDS}
        alt="KDS Cafés Especiais"
        className="logo-image"
        width="80"
        height="95"
        loading="lazy"
        style={{ marginBottom: 40, top: 20, left: 20, position: "relative" }}
      />

      <div className="selfservice-content">
        {currentStep === "products" && (
          <div>
            <ProductList />
            <MiniCart onCheckout={handleGoToCheckout} />
          </div>
        )}

        {currentStep === "cart" && <Cart onCheckout={handleGoToCheckout} />}

        {currentStep === "checkout" && (
          <Checkout
            onSuccess={handleOrderSuccess}
            onCancel={handleBackToProducts}
          />
        )}

        {currentStep === "success" && <Success onNewOrder={handleNewOrder} />}
      </div>
    </div>
  );
};

const SelfService: React.FC = () => {
  return (
    <SelfServiceCartProvider>
      <SelfServiceContent />
    </SelfServiceCartProvider>
  );
};

export default SelfService;
