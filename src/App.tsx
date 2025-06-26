import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header/Header";
import Index from "./pages/Index/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Kits from "./pages/Kits";
import About from "./pages/About";
import Policies from "./pages/Policies";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import { useEffect, useRef, useState } from "react";
import backgroundMusic from "../src/Assets/audio/fundoMusic.mp3";
import "./App.css";

const queryClient = new QueryClient();

const App = () => {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [showMusicControl, setShowMusicControl] = useState(false);
  const [audioReady, setAudioReady] = useState(false);

  // Configuração inicial do áudio
  useEffect(() => {
    const savedPreference = localStorage.getItem("musicPreference");
    const shouldMute = savedPreference === "muted";

    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.muted = shouldMute;
      setIsMuted(shouldMute);

      // Tentar tocar o áudio após interação do usuário
      const handleUserInteraction = () => {
        if (!audioReady) {
          audioRef.current
            .play()
            .then(() => {
              setAudioReady(true);
              document.removeEventListener("click", handleUserInteraction);
            })
            .catch((error) => {
              console.log("Autoplay prevented:", error);
            });
        }
      };

      document.addEventListener("click", handleUserInteraction);

      return () => {
        document.removeEventListener("click", handleUserInteraction);
      };
    }
  }, [audioReady]);

  const toggleMute = () => {
    if (audioRef.current) {
      // Se estiver muted, tentar tocar novamente
      if (isMuted) {
        audioRef.current.play().catch((error) => {
          console.log("Play failed:", error);
        });
      }

      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      localStorage.setItem("musicPreference", !isMuted ? "muted" : "unmuted");
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <audio ref={audioRef} src={backgroundMusic} loop muted={isMuted} />

          <div
            className={`music-control ${showMusicControl ? "visible" : ""}`}
            onMouseEnter={() => setShowMusicControl(true)}
            onMouseLeave={() => setShowMusicControl(false)}
          >
            <button onClick={toggleMute}>
              {isMuted ? <span>🔇</span> : <span>🔊</span>}
            </button>
          </div>

          <Toaster />
          <Sonner />
          <BrowserRouter>
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
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </BrowserRouter>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
