import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import Images from "@/Constants/Images/images";
import "./Header.css";
import CartDrawer from "../CartDrawer";

const Header = () => {
  const { getCartItemsCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "HOME", path: "/" },
    { name: "PRODUTOS", path: "/produtos" },
    { name: "KITS", path: "/kits" },
    { name: "SOBRE NÓS", path: "/sobre" },
    { name: "POLÍTICAS", path: "/politicas" },
    { name: "CONTATOS", path: "/contato" },
  ];

  const headerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 1.8, // Atraso aumentado para 1.8 segundos
        duration: 1.5, // Duração mais longa
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.header
      className={`header ${isScrolled ? "scrolled" : ""}`}
      initial="hidden"
      animate="visible"
      variants={headerVariants}
    >
      <div className="header-container">
        <div className="header-content">
          <Link to="/" className="logo" aria-label="Ir para página inicial">
            <img
              src={Images.logoKDS}
              alt="KDS Cafés Especiais"
              className="logo-image"
              width="60"
              height="75"
              loading="lazy"
            />
          </Link>

          <nav className="desktop-nav" aria-label="Navegação principal">
            <ul className="nav-list">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`nav-link ${
                      location.pathname === item.path ? "active" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-actions">
            <button
              onClick={() => setIsCartOpen(true)}
              className="cart-button"
              aria-label="Abrir carrinho"
            >
              <div className="cart-icon">
                <ShoppingCart size={27} aria-hidden="true" />
                {getCartItemsCount() > 0 && (
                  <span className="cart-badge">{getCartItemsCount()}</span>
                )}
              </div>
            </button>

            <button
              className="mobile-menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <nav
          className={`mobile-nav ${isMenuOpen ? "open" : ""}`}
          aria-label="Navegação mobile"
          aria-hidden={!isMenuOpen}
        >
          <ul className="mobile-nav-list">
            {menuItems.map((item) => (
              <li key={item.path} className="mobile-nav-item">
                <Link
                  to={item.path}
                  className={`mobile-nav-link ${
                    location.pathname === item.path ? "active" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </motion.header>
  );
};

export default Header;
