import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { ShoppingCart, Menu, X, LogOut, User, Headset } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import Images from "@/Constants/Images/images";
import "./Header.css";
import CartDrawer from "../CartDrawer";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

const Header = () => {
  const { t } = useTranslation();
  const { getCartItemsCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScroll = () => {
      setIsScrolled(lastScrollY > 10);
      ticking = false;
    };

    const handleScroll = () => {
      lastScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: t("header.home"), path: "/" },
    { name: t("header.products"), path: "/produtos" },
    { name: t("header.kits"), path: "/kits" },
    { name: t("header.about"), path: "/sobre" },
    { name: t("header.policies"), path: "/politicas" },
    { name: t("header.contact"), path: "/contato" },
  ];

  const headerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 1.8,
        duration: 1.5,
        ease: "easeInOut" as const,
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
                    className={`nav-link ${location.pathname === item.path ? "active" : ""
                      }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-actions">
            <LanguageSwitcher />

            {/* Botões de autenticação */}
            <div className="auth-links">
              {isAuthenticated ? (
                <div className="user-profile-menu">
                  <span className="user-greeting">
                    <User size={18} />
                    {t("header.hello")}, {user?.name ? user.name.split(' ')[0] : t("header.user")}
                  </span>
                </div>
              ) : (
                <>
                  <Link to="/login" className="auth-button">
                    {t("header.login")}
                  </Link>
                  <Link to="/login?mode=register" className="auth-button register">
                    {t("header.register")}
                  </Link>
                </>
              )}
            </div>

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

            {isAuthenticated && (
              <button onClick={handleLogout} className="logout-button" aria-label="Sair">
                <LogOut size={18} />
              </button>
            )}

            <button
              className="mobile-menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X size={24} className="menu-icon" />
              ) : (
                <Menu size={24} className="menu-icon" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                className="mobile-nav-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsMenuOpen(false)}
              />

              <motion.nav
                className="mobile-nav"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                aria-label="Navegação mobile"
              >
                <div className="mobile-nav-content">
                  <div className="mobile-nav-header">
                    <Link
                      to="/"
                      className="mobile-nav-logo"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <img
                        src={Images.logoKDS}
                        alt="KDS Cafés Especiais"
                        width="50"
                        height="62"
                      />
                    </Link>
                    <button
                      className="mobile-nav-close"
                      onClick={() => setIsMenuOpen(false)}
                      aria-label="Fechar menu"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  {isAuthenticated && (
                    <div className="mobile-user-greeting-top">
                      <span className="greeting-text">
                        {t("header.hello")}, {user?.name ? user.name.split(' ')[0] : t("header.user")}
                      </span>
                    </div>
                  )}

                  <ul className="mobile-nav-list">
                    {menuItems.map((item, index) => (
                      <motion.li
                        key={item.path}
                        className="mobile-nav-item"
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                          delay: 0.1 + index * 0.05,
                          type: "spring",
                          stiffness: 200,
                        }}
                      >
                        <Link
                          to={item.path}
                          className={`mobile-nav-link ${location.pathname === item.path ? "active" : ""
                            }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span className="link-text">{item.name}</span>
                          <span className="link-hover"></span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mobile-nav-footer">
                    <a
                      href="https://wa.me/5528999921033?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20Caf%C3%A9s%20da%20KDS."
                      className="mobile-contact-box"
                    >
                      <div className="mobile-contact-icon-wrapper">
                        <Headset size={24} />
                      </div>
                      <div className="mobile-contact-info">
                        <span className="mobile-contact-title">{t("header.quickContact")}</span>
                        <span className="mobile-contact-phone">+55 (28) 99992-1033</span>
                        <span className="mobile-contact-subtitle">Atendimento via WhatsApp</span>
                      </div>
                    </a>

                    <div className="mobile-auth-links">
                      {isAuthenticated ? (
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsMenuOpen(false);
                          }}
                          className="mobile-logout-full"
                          aria-label="Sair"
                        >
                          <LogOut size={20} /> SAIR DA CONTA
                        </button>
                      ) : (
                        <div className="mobile-unauth-container">
                          <Link
                            to="/login"
                            className="mobile-auth-button"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {t("header.login")}
                          </Link>
                          <Link
                            to="/login?mode=register"
                            className="mobile-auth-button register"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {t("header.register")}
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
