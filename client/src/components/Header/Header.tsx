import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import Images from "@/Constants/Images/images";
import CartDrawer from "../CartDrawer";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { formatCurrency } from "@/lib/utils";

const Header = () => {
  const { t } = useTranslation();
  const { getCartItemsCount, getCartTotal } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleSound = () => {
    if (typeof window.toggleAudioMute === "function") {
      window.toggleAudioMute();
      if (typeof window.isAudioMuted === "function") {
        setIsPlayingSound(!window.isAudioMuted());
      }
    }
  };

  const navLinks = [
    { name: t("header.home", "Início"), path: "/" },
    { name: t("header.products", "Cafés Especiais"), path: "/produtos" },
    { name: t("header.kits", "Kits & Presentes"), path: "/kits" },
    { name: t("header.about", "Nossa História"), path: "/sobre" },
    { name: t("header.policies", "Políticas"), path: "/politicas" },
    { name: t("header.contact", "Contato"), path: "/contato" },
  ];

  const total = getCartTotal();
  const itemsCount = getCartItemsCount();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full z-50">
        {/* TOPBAR: Modern Editorial Terroir & Shipping Bar */}
        <div className="w-full bg-espresso-deep text-paper-cream px-4 md:px-8 py-2 flex items-center justify-between text-center border-b border-border-hairline/20 text-xs">
          <div className="hidden md:flex items-center gap-1.5 font-sans uppercase tracking-widest text-gold-bright text-[11px] font-medium">
            <span className="w-2 h-2 rounded-full bg-gold-bright animate-pulse"></span>
            Caparaó Terroir • 1.350m MASL
          </div>

          <div className="flex-1 text-center font-sans tracking-widest uppercase text-paper-sand/90 text-[11px]">
            Frete grátis em pedidos acima de R$ 199{" "}
            <span className="text-gold-bright mx-2">•</span> Safra Caparaó 2024/2025{" "}
            <span className="text-gold-bright mx-2">•</span> Torras artesanais semanais
          </div>

          <div className="hidden md:flex items-center gap-1.5 font-sans text-paper-sand/80 text-[11px]">
            <span className="material-symbols-outlined text-[15px] text-gold-bright">
              verified
            </span>
            SCA 86+ Curadoria
          </div>
        </div>

        {/* MAIN NAVIGATION BAR */}
        <div
          className={`w-full transition-all duration-300 ${
            isScrolled
              ? "bg-surface/95 backdrop-blur-md shadow-md border-b border-border-hairline"
              : "bg-surface/85 backdrop-blur-sm border-b border-border-hairline/60"
          }`}
        >
          <div className="max-w-7xl mx-auto h-20 px-4 md:px-8 flex items-center justify-between gap-4">
            {/* BRAND LOGO */}
            <Link
              to="/"
              className="flex items-center gap-3 group focus:outline-none"
              aria-label="KDS Cafés Especiais - Início"
            >
              <img
                src={Images.logoKDS}
                alt="KDS Cafés Especiais"
                className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="hidden sm:flex flex-col text-left">
                <span className="font-serif text-xl tracking-tight text-espresso-deep font-semibold leading-none">
                  KDS
                </span>
                <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold-burnished mt-0.5 font-medium">
                  Cafés Especiais
                </span>
              </div>
            </Link>

            {/* DESKTOP NAV LINKS */}
            <nav className="hidden lg:flex items-center gap-6" aria-label="Navegação principal">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`font-sans text-sm tracking-wide transition-colors py-1 relative ${
                      isActive
                        ? "text-espresso-deep font-semibold"
                        : "text-slate-warm hover:text-espresso-deep font-medium"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-bright rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ACTIONS & CONTROLS */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* ATELIER SOUND CONTROL */}
              <button
                type="button"
                onClick={handleToggleSound}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-paper-sand border border-border-hairline text-slate-warm hover:text-espresso-deep hover:border-gold-bright transition-all"
                title="Atelier Soundscape"
              >
                <span className="material-symbols-outlined text-[16px] text-gold-burnished">
                  {isPlayingSound ? "volume_up" : "graphic_eq"}
                </span>
                <span className="font-sans text-[11px] tracking-wider uppercase font-semibold hidden xl:inline">
                  Atelier Sound
                </span>
              </button>

              {/* LANGUAGE SELECTOR */}
              <div className="hidden md:flex items-center">
                <LanguageSwitcher />
              </div>

              {/* AUTH / PROFILE */}
              {isAuthenticated ? (
                <div className="flex items-center gap-1.5">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-paper-sand hover:bg-surface-container-high border border-border-hairline text-espresso-deep text-xs font-medium transition-colors"
                    title="Minha Conta"
                  >
                    <span className="material-symbols-outlined text-[18px] text-gold-burnished">
                      person
                    </span>
                    <span className="hidden md:inline font-sans">
                      {user?.name ? user.name.split(" ")[0] : "Conta"}
                    </span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-1.5 rounded-full text-slate-warm hover:text-red-700 hover:bg-paper-sand transition-colors"
                    title="Sair"
                    aria-label="Sair"
                  >
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="p-2 text-slate-warm hover:text-espresso-deep transition-colors rounded-full hover:bg-paper-sand"
                  title="Entrar na Conta"
                  aria-label="Entrar na Conta"
                >
                  <span className="material-symbols-outlined text-[20px]">person</span>
                </Link>
              )}

              {/* CART TRIGGER BUTTON */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2 pl-3 pr-3.5 py-1.5 rounded-full bg-espresso-deep text-paper-cream shadow-sm hover:bg-espresso-surface transition-all border border-gold-bright/35 group"
                aria-label="Abrir carrinho de compras"
              >
                <span className="material-symbols-outlined text-[19px] text-gold-bright group-hover:scale-110 transition-transform">
                  shopping_bag
                </span>
                {itemsCount > 0 && (
                  <span className="font-sans text-[11px] font-bold bg-gold-burnished text-espresso-deep w-5 h-5 rounded-full flex items-center justify-center leading-none">
                    {itemsCount}
                  </span>
                )}
                {total > 0 && (
                  <span className="hidden md:inline font-sans text-xs font-semibold tracking-wider text-paper-sand/90 pl-0.5">
                    {formatCurrency(total)}
                  </span>
                )}
              </button>

              {/* MOBILE MENU TOGGLE */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-espresso-deep rounded-lg hover:bg-paper-sand transition-colors"
                aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={isMenuOpen}
              >
                <span className="material-symbols-outlined text-[24px]">
                  {isMenuOpen ? "close" : "menu"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER NAVIGATION */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-espresso-deep/60 backdrop-blur-sm z-50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMenuOpen(false)}
            />

            <motion.nav
              className="fixed top-0 right-0 bottom-0 w-full max-w-xs sm:max-w-sm bg-espresso-deep text-paper-cream z-50 flex flex-col justify-between shadow-2xl border-l border-border-hairline/20 lg:hidden p-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              aria-label="Navegação mobile"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-6 border-b border-border-hairline/15">
                  <Link
                    to="/"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2.5"
                  >
                    <img
                      src={Images.logoKDS}
                      alt="KDS Cafés Especiais"
                      className="h-10 w-auto object-contain"
                    />
                    <div className="flex flex-col text-left">
                      <span className="font-serif text-lg text-paper-cream leading-tight">
                        KDS
                      </span>
                      <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-gold-bright">
                        Boutique &amp; Torrefação
                      </span>
                    </div>
                  </Link>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-1.5 text-paper-sand/80 hover:text-paper-cream rounded-full hover:bg-white/10"
                    aria-label="Fechar menu"
                  >
                    <span className="material-symbols-outlined text-[22px]">close</span>
                  </button>
                </div>

                {/* Mobile User Greeting */}
                {isAuthenticated && (
                  <div className="mt-4 p-3 rounded-lg bg-espresso-surface border border-gold-bright/20 flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-gold-bright text-[20px]">
                      account_circle
                    </span>
                    <span className="font-sans text-xs text-paper-sand">
                      Olá, <strong className="text-paper-cream">{user?.name || "Cliente"}</strong>
                    </span>
                  </div>
                )}

                {/* Mobile Links */}
                <ul className="mt-6 space-y-2">
                  {navLinks.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                      <li key={link.path}>
                        <Link
                          to={link.path}
                          onClick={() => setIsMenuOpen(false)}
                          className={`flex items-center justify-between px-3.5 py-3 rounded-lg text-sm tracking-wide font-sans transition-all ${
                            isActive
                              ? "bg-gold-burnished text-espresso-deep font-bold"
                              : "text-paper-sand/90 hover:bg-white/5 hover:text-paper-cream"
                          }`}
                        >
                          <span>{link.name}</span>
                          <span className="material-symbols-outlined text-[18px]">
                            chevron_right
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Drawer Footer */}
              <div className="pt-6 border-t border-border-hairline/15 space-y-4">
                <div className="flex justify-center pb-2">
                  <LanguageSwitcher />
                </div>

                <a
                  href="https://wa.me/5528999921033?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20Caf%C3%A9s%20da%20KDS."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-espresso-surface border border-gold-bright/25 hover:border-gold-bright transition-all"
                >
                  <span className="material-symbols-outlined text-[24px] text-gold-bright">
                    support_agent
                  </span>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] uppercase tracking-wider text-gold-burnished font-semibold">
                      Concierge &amp; WhatsApp
                    </span>
                    <span className="text-xs text-paper-cream font-medium">
                      +55 (28) 99992-1033
                    </span>
                  </div>
                </a>

                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full py-2.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                    Sair da Conta
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="py-2.5 rounded-lg bg-espresso-surface border border-gold-bright/30 text-paper-cream text-center text-xs font-semibold uppercase tracking-wider hover:bg-espresso-surface/80 transition-colors"
                    >
                      Entrar
                    </Link>
                    <Link
                      to="/login?mode=register"
                      onClick={() => setIsMenuOpen(false)}
                      className="py-2.5 rounded-lg bg-gold-burnished text-espresso-deep text-center text-xs font-bold uppercase tracking-wider hover:bg-gold-bright transition-colors"
                    >
                      Cadastrar
                    </Link>
                  </div>
                )}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* CART DRAWER */}
      <AnimatePresence>
        {isCartOpen && <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

export default Header;
