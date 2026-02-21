import { useEffect, useRef } from "react";

interface ScrollOptimizerProps {
  children: React.ReactNode;
}

const ScrollOptimizer = ({ children }: ScrollOptimizerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Otimização de scroll com throttling mais agressivo
    let ticking = false;
    let lastScrollY = window.scrollY;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDelta = Math.abs(currentScrollY - lastScrollY);

          // Aplicar otimizações apenas se o scroll for significativo
          if (scrollDelta > 10) {
            // Forçar composição de camadas para melhor performance
            container.style.willChange = "transform";

            // Limpar will-change após um tempo
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
              if (container) {
                container.style.willChange = "auto";
              }
            }, 50);
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    // Debounce para eventos de resize
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Recalcular layouts se necessário
        if (container) {
          container.style.willChange = "auto";
        }
      }, 100);
    };

    // Otimizações para dispositivos móveis
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      // Reduzir complexidade de animações em mobile
      container.style.transform = "translateZ(0)";
      container.style.backfaceVisibility = "hidden";
    }

    // Otimizações para dispositivos com baixa performance
    const isLowPerformance = navigator.hardwareConcurrency <= 4;
    if (isLowPerformance) {
      // Desabilitar algumas otimizações em dispositivos lentos
      container.style.willChange = "auto";
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      clearTimeout(scrollTimeout);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        transform: "translateZ(0)", // Forçar aceleração de hardware
        backfaceVisibility: "hidden", // Otimização adicional
        perspective: "1000px", // Melhorar performance 3D
      }}
    >
      {children}
    </div>
  );
};

export default ScrollOptimizer;
