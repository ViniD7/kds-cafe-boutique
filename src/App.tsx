
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Kits from "./pages/Kits";
import About from "./pages/About";
import Policies from "./pages/Policies";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
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
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
