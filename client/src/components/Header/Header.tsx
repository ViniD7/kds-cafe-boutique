import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import Images from "@/Constants/Images/images";
import CartDrawer from "../CartDrawer";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

const Header = () => {
  const { getCartItemsCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [activeMenuHover, setActiveMenuHover] = useState<string>("cafes");

  // Barra de avisos/novidades superior: só exibe quando houver uma novidade ativa
  // Por padrão: null (não exibe nada, mantendo o topo 100% limpo e minimalista)
  const [activeAnnouncement, setActiveAnnouncement] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Sincroniza estado de reprodução do Atelier Soundscape
  useEffect(() => {
    const handleAudioEvent = (e: any) => {
      if (e?.detail?.isPlaying !== undefined) {
        setIsPlayingSound(e.detail.isPlaying);
      }
    };
    window.addEventListener("kds:audio-state", handleAudioEvent);
    if (typeof (window as any).isAudioPlaying === "function") {
      setIsPlayingSound(!!(window as any).isAudioPlaying());
    }
    return () => {
      window.removeEventListener("kds:audio-state", handleAudioEvent);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  // Bloqueia o scroll do body quando o menu arquitetural estiver aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleSound = async () => {
    if (typeof (window as any).toggleAudioPlay === "function") {
      const isPlaying = await (window as any).toggleAudioPlay();
      setIsPlayingSound(isPlaying);
    } else if (typeof (window as any).toggleAudioMute === "function") {
      (window as any).toggleAudioMute();
      if (typeof (window as any).isAudioPlaying === "function") {
        setIsPlayingSound(!!(window as any).isAudioPlaying());
      }
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/produtos?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { id: "cafes", name: "Cafés Especiais", path: "/produtos", tag: "SCA 86+" },
    { id: "kits", name: "Kits & Presentes", path: "/kits", tag: "Edições Raras" },
    { id: "brew", name: "Brew Lab", path: "/#brew-lab", tag: "Guia de Preparo" },
    { id: "historia", name: "Nossa História", path: "/sobre", tag: "Desde 1969" },
    { id: "contato", name: "Concierge", path: "/contato", tag: "Atendimento" },
  ];

  const menuShowcaseData: Record<
    string,
    { title: string; subtitle: string; score: string; image: string; link: string; notes: string }
  > = {
    cafes: {
      title: "Caparaó Reserva Especial",
      subtitle: "Catuaí Vermelho 144 • Fermentação Anaeróbia",
      score: "88.5 SCA",
      image: "/images/canFront.webp",
      link: "/produtos/lata-250g-caparao-reserva-especial",
      notes: "Chocolate 70%, flor de laranjeira e pêssego fresco",
    },
    kits: {
      title: "Kit Degustação Terroir",
      subtitle: "Coleção com 3 Variedades Selecionadas",
      score: "87+ SCA",
      image: "/images/canTriple.webp",
      link: "/kits",
      notes: "Caixa presenteável rígida com selo de cera e guia sensorial",
    },
    brew: {
      title: "KDS Brew Laboratory",
      subtitle: "Parâmetros Científicos de Extração",
      score: "Métodos",
      image: "/images/dripCoffe.webp",
      link: "/#brew-lab",
      notes: "Calculadora de proporção áurea para V60, Chemex e Prensa",
    },
    historia: {
      title: "Pequiá, Iúna • 1.400m MASL",
      subtitle: "Herança da Família Dutra desde 1969",
      score: "Origem",
      image: "/images/storyRef.jpg",
      link: "/sobre",
      notes: "55 anos cultivando grãos de montanha nas encostas do Caparaó",
    },
    contato: {
      title: "Atelier Concierge",
      subtitle: "Consultoria Privada para Cafés e Eventos",
      score: "WhatsApp",
      image: "/images/aurumRef.jpg",
      link: "/contato",
      notes: "Atendimento direto com nossos mestres de torra e baristas",
    },
  };

  const itemsCount = getCartItemsCount();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300">
        {/* BARRA SUPERIOR CONDICIONAL: Só é renderizada se houver alguma novidade ativa */}
        {activeAnnouncement && (
          <div className="w-full bg-[#161311] text-[#F5F2EB] px-4 md:px-8 py-2 flex items-center justify-between text-center border-b border-white/10 text-xs font-mono">
            <div className="flex-1 text-center font-mono text-[10.5px] uppercase tracking-wider text-gold-bright">
              {activeAnnouncement}
            </div>
            <button
              onClick={() => setActiveAnnouncement(null)}
              className="text-paper-sand/60 hover:text-paper-cream p-1 text-xs"
              title="Fechar aviso"
              aria-label="Fechar aviso"
            >
              ✕
            </button>
          </div>
        )}

        {/* HEADER MINIMALISTA PADRÃO ONYX COFFEE LAB */}
        <div
          className={`w-full transition-all duration-300 ${
            isScrolled || (location.pathname !== "/" && location.pathname !== "/sobre")
              ? "bg-[#0D0B0A]/95 backdrop-blur-md border-b border-white/10 py-2 sm:py-2.5"
              : "bg-transparent hover:bg-[#0D0B0A]/85 backdrop-blur-[2px] hover:backdrop-blur-md py-2.5 sm:py-3 border-b border-transparent hover:border-white/5"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
            {/* ESQUERDA: LOGO / MONOGRAMA MINIMALISTA ONYX STYLE */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group focus:outline-none"
              aria-label="KDS Café Boutique - Início"
            >
              <img
                src={Images.logoKDS}
                alt="KDS Café Boutique"
                className="h-8 sm:h-12 w-auto object-contain filter brightness-110 transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* DIREITA: BUSCA, SOUNDSCAPE, LOGIN, BAG E HAMBURGER MENU (EXATAMENTE COMO NA REFERÊNCIA ONYX) */}
            <div className="flex items-center gap-3 sm:gap-6">
              {/* BUSCA / LUPA */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-paper-cream/80 hover:text-gold-bright transition-colors p-1"
                title="Buscar no catálogo"
                aria-label="Buscar"
              >
                <span className="material-symbols-outlined text-[20px] sm:text-[22px]">search</span>
              </button>

              {/* ATELIER SOUNDSCAPE (EQUALIZADOR ESTILO ONYX) */}
              <button
                type="button"
                onClick={handleToggleSound}
                className={`p-1.5 transition-all flex items-center justify-center rounded group ${isPlayingSound
                  ? "text-gold-bright"
                  : "text-paper-cream/80 hover:text-gold-bright"
                  }`}
                title={
                  isPlayingSound
                    ? "Atelier Soundscape: Ativo (Clique para pausar)"
                    : "Atelier Soundscape: Pausado (Clique para ouvir a atmosfera)"
                }
                aria-label={isPlayingSound ? "Pausar Atelier Soundscape" : "Ativar Atelier Soundscape"}
              >
                <div className="flex items-center gap-[3px] h-6 px-1 justify-center">
                  <span
                    className={`w-[2.5px] bg-current rounded-full transition-all duration-300 ${isPlayingSound ? "animate-soundwave-1" : "h-[6px] group-hover:h-[8px]"
                      }`}
                  />
                  <span
                    className={`w-[2.5px] bg-current rounded-full transition-all duration-300 ${isPlayingSound ? "animate-soundwave-2" : "h-[12px] group-hover:h-[14px]"
                      }`}
                  />
                  <span
                    className={`w-[2.5px] bg-current rounded-full transition-all duration-300 ${isPlayingSound ? "animate-soundwave-3" : "h-[18px] group-hover:h-[20px]"
                      }`}
                  />
                  <span
                    className={`w-[2.5px] bg-current rounded-full transition-all duration-300 ${isPlayingSound ? "animate-soundwave-2" : "h-[12px] group-hover:h-[14px]"
                      }`}
                  />
                  <span
                    className={`w-[2.5px] bg-current rounded-full transition-all duration-300 ${isPlayingSound ? "animate-soundwave-1" : "h-[6px] group-hover:h-[8px]"
                      }`}
                  />
                </div>
              </button>

              {/* LOGIN / CONTA */}
              {isAuthenticated ? (
                <Link
                  to="/profile"
                  className="font-mono text-xs uppercase tracking-[0.15em] text-paper-cream/90 hover:text-gold-bright transition-colors"
                >
                  {user?.name ? user.name.split(" ")[0].toUpperCase() : "CONTA"}
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="font-mono text-xs uppercase tracking-[0.15em] text-paper-cream/90 hover:text-gold-bright transition-colors"
                >
                  LOGIN
                </Link>
              )}

              {/* BAG COM CONTADOR */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-1.5 text-paper-cream hover:text-gold-bright transition-colors p-1 relative"
                aria-label="Abrir sacola de compras"
              >
                <span className="material-symbols-outlined text-[20px] sm:text-[22px]">
                  shopping_bag
                </span>
                {itemsCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-gold-bright text-[#0D0B0A] font-mono text-[9.5px] font-bold flex items-center justify-center">
                    {itemsCount}
                  </span>
                )}
              </button>

              {/* BOTÃO DE MENU HAMBURGER (TRÊS LINHAS MINIMALISTAS) */}
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-paper-cream hover:text-gold-bright transition-colors p-1 flex flex-col justify-center items-end gap-1.5 w-6 h-6 focus:outline-none"
                aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={isMenuOpen}
              >
                <span
                  className={`h-[1.5px] bg-paper-cream transition-all duration-300 ${isMenuOpen ? "w-5 rotate-45 translate-y-[6px]" : "w-5"
                    }`}
                />
                <span
                  className={`h-[1.5px] bg-paper-cream transition-all duration-300 ${isMenuOpen ? "opacity-0" : "w-3.5"
                    }`}
                />
                <span
                  className={`h-[1.5px] bg-paper-cream transition-all duration-300 ${isMenuOpen ? "w-5 -rotate-45 -translate-y-[6px]" : "w-5"
                    }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* BARRA DE PESQUISA RÁPIDA (SLIDE DOWN QUANDO CLICA NA LUPA) */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full bg-[#161311] border-b border-white/10 px-4 md:px-8 py-3 overflow-hidden shadow-2xl"
            >
              <form
                onSubmit={handleSearchSubmit}
                className="max-w-3xl mx-auto flex items-center gap-3"
              >
                <span className="material-symbols-outlined text-paper-sand/50 text-[18px]">
                  search
                </span>
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar café por variedade (Catuaí, Arara), método (V60, Drip), nota sensorial..."
                  className="w-full bg-transparent border-none text-xs sm:text-sm font-mono text-paper-cream placeholder:text-paper-sand/40 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-gold-burnished hover:bg-gold-bright text-[#0D0B0A] font-mono text-xs uppercase font-bold"
                >
                  Buscar
                </button>
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="text-paper-sand/50 hover:text-paper-cream p-1 text-xs font-mono"
                >
                  ✕
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* OVERLAY MENU ARQUITETURAL EM TELA CHEIA (ESTILO ONYX COFFEE LAB) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#0D0B0A] text-[#F5F2EB] flex flex-col pt-20 sm:pt-24 overflow-y-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="max-w-7xl mx-auto w-full px-4 md:px-8 py-6 md:py-10 flex-1 flex flex-col lg:flex-row gap-10 justify-between">
              {/* COLUNA ESQUERDA: NAVEGAÇÃO EDITORIAL MONUMENTAL */}
              <div className="w-full lg:w-1/2 flex flex-col justify-between space-y-6">
                <div>
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.25em] text-gold-bright mb-6 pb-2 border-b border-white/10 flex justify-between">
                    <span>Índice do Atelier KDS</span>
                    <span>Caparaó Capixaba // 1969</span>
                  </div>

                  <nav className="flex flex-col space-y-3 sm:space-y-4">
                    {navLinks.map((link, idx) => {
                      const isHovered = activeMenuHover === link.id;
                      return (
                        <div
                          key={link.path}
                          onMouseEnter={() => setActiveMenuHover(link.id)}
                          className="group"
                        >
                          <Link
                            to={link.path}
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-baseline justify-between py-2 border-b border-white/5 transition-all"
                          >
                            <div className="flex items-baseline gap-3 sm:gap-4">
                              <span className="font-mono text-xs text-gold-bright/60 group-hover:text-gold-bright transition-colors">
                                0{idx + 1}.
                              </span>
                              <span
                                className={`font-serif text-2xl sm:text-3xl md:text-4xl transition-all duration-300 ${isHovered
                                  ? "text-paper-cream translate-x-2 italic font-normal"
                                  : "text-paper-sand/70 group-hover:text-paper-cream"
                                  }`}
                              >
                                {link.name}
                              </span>
                            </div>
                            <span className="font-mono text-[10px] uppercase tracking-widest text-gold-bright/80 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline">
                              {link.tag} →
                            </span>
                          </Link>
                        </div>
                      );
                    })}
                  </nav>
                </div>

                {/* ATALHOS RÁPIDOS & CONCIERGE */}
                <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a
                    href="https://wa.me/5528999921033?text=Ol%C3%A1%2C%20gostaria%20de%20consultoria%20sobre%20os%20Caf%C3%A9s%20Especiais%20KDS."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-white/5 border border-white/10 hover:border-gold-bright transition-colors flex items-center gap-3"
                  >
                    <span className="material-symbols-outlined text-gold-bright text-[22px]">
                      support_agent
                    </span>
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-gold-bright block">
                        Concierge Privado
                      </span>
                      <span className="font-sans text-xs text-paper-cream font-medium">
                        +55 (28) 99992-1033
                      </span>
                    </div>
                  </a>

                  <div className="p-4 bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-gold-bright block">
                        Idioma / Language
                      </span>
                      <span className="font-sans text-xs text-paper-cream font-medium">
                        Selecione a Região
                      </span>
                    </div>
                    <LanguageSwitcher />
                  </div>
                </div>
              </div>

              {/* COLUNA DIREITA: VITRINE DO LOTE EM DESTAQUE (ONYX STYLE) */}
              <div className="w-full lg:w-5/12 flex flex-col justify-center">
                {menuShowcaseData[activeMenuHover] && (
                  <motion.div
                    key={activeMenuHover}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#161311] border border-white/10 p-6 md:p-8 flex flex-col relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-bright">
                        Destaque da Coleção
                      </span>
                      <span className="font-mono text-[11px] font-bold text-[#0D0B0A] bg-gold-bright px-2.5 py-0.5">
                        {menuShowcaseData[activeMenuHover].score}
                      </span>
                    </div>

                    <div className="w-full h-44 sm:h-56 md:h-64 flex items-center justify-center my-3 relative">
                      <img
                        src={menuShowcaseData[activeMenuHover].image}
                        alt={menuShowcaseData[activeMenuHover].title}
                        className="max-h-full max-w-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                      />
                    </div>

                    <h4 className="font-serif text-xl sm:text-2xl text-paper-cream mb-1">
                      {menuShowcaseData[activeMenuHover].title}
                    </h4>
                    <p className="font-mono text-xs text-gold-bright/90 mb-2">
                      {menuShowcaseData[activeMenuHover].subtitle}
                    </p>
                    <p className="font-sans text-xs text-paper-sand/70 mb-5 font-light leading-relaxed">
                      {menuShowcaseData[activeMenuHover].notes}
                    </p>

                    <Link
                      to={menuShowcaseData[activeMenuHover].link}
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full py-3 bg-paper-cream hover:bg-gold-bright text-[#0D0B0A] font-mono text-xs uppercase tracking-widest font-bold text-center transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Descobrir Lote</span>
                      <span>→</span>
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>

            {/* RODAPÉ DO MENU OVERLAY */}
            <div className="w-full border-t border-white/10 bg-[#0A0807] px-4 md:px-8 py-3.5">
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-paper-sand/50">
                <div>KDS CAFÉS ESPECIAIS © 1969–2025 • TERROIR CAPARAÓ</div>
                <div className="flex items-center gap-6">
                  <Link
                    to="/politicas"
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:text-gold-bright transition-colors"
                  >
                    POLÍTICAS &amp; FRETE
                  </Link>
                  <Link
                    to="/contato"
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:text-gold-bright transition-colors"
                  >
                    CONTATO
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DRAWER DA SACOLA */}
      <AnimatePresence>
        {isCartOpen && <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

export default Header;
