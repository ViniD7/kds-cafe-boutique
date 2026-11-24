import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const BrandStatement = () => {
  return (
    <section className="relative w-full bg-[#0D0B0A] text-[#F5F2EB] py-32 md:py-44 overflow-hidden flex items-center justify-center text-center border-t border-white/10">
      {/* Background Image with Cinematic Dark Tone */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <img
          src="/images/fundoCafe.webp"
          alt="Lavouras do Caparaó sob neblina matinal"
          className="w-full h-full object-cover scale-105 filter brightness-40 contrast-125"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B0A] via-[#0D0B0A]/85 to-[#0D0B0A]" />
      </div>

      {/* Content Container */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center">
        {/* Monogram Seal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-14 h-14 bg-[#161311] border border-white/15 flex items-center justify-center text-gold-bright mb-8"
        >
          <span className="font-serif text-xl tracking-tight">KDS</span>
        </motion.div>

        {/* Small Tagline */}
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold-bright block mb-6">
          Manifesto de Ateliê // 1969
        </span>

        {/* Expressive Headline */}
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-paper-cream font-normal leading-[1.1] tracking-tight max-w-3xl mb-8">
          Mais do que café. Uma história cultivada nas montanhas{" "}
          <span className="italic text-gold-bright">desde 1969.</span>
        </h2>

        {/* Supporting Narrative */}
        <p className="font-sans text-xs sm:text-sm text-paper-sand/70 max-w-xl mb-12 font-light leading-relaxed">
          Convidamos você a desacelerar e experimentar o resultado de mais de meio século de devoção
          ao café especial. Cada xícara é a celebração pura da nobreza do Caparaó.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
          <Link
            to="/produtos"
            className="px-8 py-4 bg-gold-burnished hover:bg-gold-bright text-[#0D0B0A] font-mono text-xs tracking-widest uppercase font-bold transition-all flex items-center justify-center gap-3"
          >
            <span>Explorar Coleção Completa</span>
            <span>→</span>
          </Link>

          <a
            href="https://wa.me/5528999921033?text=Ol%C3%A1%2C%20gostaria%20de%20consultoria%20com%20o%20concierge%20da%20KDS."
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-transparent hover:bg-white/5 text-paper-cream font-mono text-xs tracking-widest uppercase border border-white/20 hover:border-white/50 transition-all flex items-center justify-center gap-3"
          >
            <span className="material-symbols-outlined text-[17px] text-gold-bright">chat</span>
            <span>Falar com o Concierge</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default BrandStatement;
