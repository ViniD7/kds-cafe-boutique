import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header/Header";
import Index from "./pages/Index/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Kits from "./pages/Kits";
import About from "./pages/About";
import Policies from "./pages/Policies";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import { useEffect, useRef, useState, lazy, Suspense } from "react";
import "./App.css";
import PreloadResources from "./components/PreloadResource";

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

const App = () => {
  const [showMusicControl, setShowMusicControl] = useState(false);

  return (
    <>
      <PreloadResources />
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <CartProvider>
              <Suspense fallback={null}>
                <AudioPlayer />
              </Suspense>

              <div
                className={`music-control ${showMusicControl ? "visible" : ""}`}
                onMouseEnter={() => setShowMusicControl(true)}
                onMouseLeave={() => setShowMusicControl(false)}
              >
                <button onClick={() => (window as any).toggleAudioMute?.()}>
                  <span>{(window as any).isAudioMuted?.() ? "🔇" : "🔊"}</span>
                </button>
              </div>

              <Toaster />
              <Sonner />
              <BrowserRouter>
                <ScrollToTop />
                <Header />
                <main>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/produtos" element={<Products />} />
                    <Route path="/produtos/:id" element={<ProductDetail />} />
                    <Route path="/kits" element={<Kits />} />
                    <Route path="/sobre" element={<About />} />
                    <Route path="/politicas" element={<Policies />} />
                    <Route path="/contato" element={<Contact />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </BrowserRouter>
            </CartProvider>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;