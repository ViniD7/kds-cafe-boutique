import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import { useEffect, useState, lazy, Suspense } from "react";

import Index from "./pages/Index/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Kits from "./pages/Kits";
import KitDetail from "./pages/KitDetail";
import About from "./pages/About";
import Policies from "./pages/Policies";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";

import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

// Componente para rolar para o topo quando a rota mudar
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Lazy load do áudio
const AudioPlayer = lazy(() => import("./components/AudioPlayer"));

const AppLayout = () => {
  const { pathname } = useLocation();
  const hideHeaderFooter = pathname === '/login';

  return (
    <>
      <ScrollToTop />
      {!hideHeaderFooter && <Header />}
      <main>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/produtos" element={<Products />} />
            <Route path="/produtos/:id" element={<ProductDetail />} />
            <Route path="/kits" element={<Kits />} />
            <Route path="/kits/:id" element={<KitDetail />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/politicas" element={<Policies />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </main>
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <CartProvider>
            <Suspense fallback={null}>
              <AudioPlayer />
            </Suspense>
            <Sonner />
            <BrowserRouter>
              <AppLayout />
            </BrowserRouter>
          </CartProvider>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
