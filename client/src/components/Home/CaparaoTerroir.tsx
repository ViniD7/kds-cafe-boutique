import { motion } from "framer-motion";

export const CaparaoTerroir = () => {
  const terroirMetrics = [
    {
      value: "1.350m - 1.450m",
      label: "Altitude Extrema (MASL)",
      detail:
        "Maturação lenta que desenvolve açúcares complexos e acidez cítrica málica equilibrada.",
      icon: "altitude",
    },
    {
      value: "100% Arábica",
      label: "Botânica Nobre de Montanha",
      detail:
        "Variedades premiadas Catuaí Vermelho 144, Arara Amarelo e seleções raras do Caparaó.",
      icon: "psychiatry",
    },
    {
      value: "12°C - 24°C",
      label: "Amplitude Térmica",
      detail:
        "Noites frias da Serra combinadas com dias ensolarados para fixação máxima de óleos aromáticos.",
      icon: "thermostat",
    },
    {
      value: "Solo Granítico",
      label: "Mineralidade Vulcânica",
      detail:
        "Drenagem natural perfeita e solos minerais que transferem pureza e finalização persistente.",
      icon: "volcano",
    },
  ];

  return (
    <section
      id="terroir"
      className="w-full bg-[#0D0B0A] text-[#F5F2EB] py-24 md:py-36 relative overflow-hidden border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 pb-8 border-b border-white/10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2.5 h-2.5 bg-gold-bright" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold-bright font-bold">
                Geografia Sagrada do Café
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-paper-cream font-normal">
              O Terroir das Alturas do <span className="italic text-gold-bright">Caparaó</span>
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-paper-sand/70 max-w-md font-light leading-relaxed">
            Localizado na divisa entre o Espírito Santo e Minas Gerais, o Caparaó abriga o Pico da
            Bandeira e um dos ecossistemas de cafeicultura de montanha mais reverenciados do planeta.
          </p>
        </div>

        {/* Big Terroir Visual Banner with Inset Coordinates */}
        <div className="relative overflow-hidden border border-white/10 mb-12 aspect-[16/9] sm:aspect-[21/9] bg-[#161311] group">
          <img
            src="/images/fundoFeature.webp"
            alt="Paisagem panorâmica das lavouras de altitude do Caparaó"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B0A] via-[#0D0B0A]/40 to-transparent" />

          {/* Floating Terroir Overlay Coordinates */}
          <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <span className="px-3 py-1 bg-gold-burnished text-[#0D0B0A] font-mono text-[9px] uppercase font-bold tracking-widest mb-2 inline-block">
                Indicação Geográfica Protegida
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-paper-cream">
                Pequiá, Município de Iúna — ES
              </h3>
              <p className="font-mono text-xs text-paper-sand/80 mt-1">
                LAT: 20°21'S // LON: 41°32'W • Vertente Leste do Caparaó
              </p>
            </div>

            <div className="flex items-center gap-6 text-right">
              <div className="bg-[#0D0B0A]/80 backdrop-blur-md p-4 border border-white/10">
                <span className="font-serif text-3xl sm:text-4xl text-gold-bright font-bold block">
                  88+
                </span>
                <span className="font-mono text-[9.5px] uppercase tracking-wider text-paper-sand/70">
                  Pontuação SCA Média
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Terroir Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {terroirMetrics.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="p-6 bg-[#161311] border border-white/10 hover:border-gold-bright/50 transition-colors flex flex-col justify-between"
            >
              <div>
                <span className="material-symbols-outlined text-[24px] text-gold-bright mb-4">
                  {item.icon}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-gold-bright block mb-1">
                  {item.label}
                </span>
                <h4 className="font-serif text-xl text-paper-cream mb-3">{item.value}</h4>
                <p className="font-sans text-xs text-paper-sand/70 font-light leading-relaxed">
                  {item.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaparaoTerroir;
