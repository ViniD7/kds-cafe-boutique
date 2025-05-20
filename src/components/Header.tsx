
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Menu, X } from "lucide-react";
import CartDrawer from "./CartDrawer";

const Header = () => {
  const { getCartItemsCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Produtos", path: "/produtos" },
    { name: "Kits", path: "/kits" },
    { name: "Sobre nós", path: "/sobre" },
    { name: "Políticas", path: "/politicas" },
    { name: "Contato", path: "/contato" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl md:text-3xl font-serif font-bold text-foreground">
            KDS <span className="text-gold">Cafés Especiais</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-foreground hover:text-gold transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Cart & Mobile Menu Icons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleCart}
              className="relative p-1 text-foreground hover:text-gold transition-colors"
            >
              <ShoppingCart size={24} />
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {getCartItemsCount()}
                </span>
              )}
            </button>

            <button
              className="md:hidden text-foreground hover:text-gold transition-colors"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t mt-4">
            <ul className="space-y-4">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="block text-foreground hover:text-gold transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};

export default Header;
