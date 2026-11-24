import { motion } from "framer-motion";

export const ArtOfCoffee = () => {
  const steps = [
    {
      num: "01",
      title: "Triagem Óptica das Cerejas",
      subtitle: "Maturação Ideal",
      description:
        "Apenas frutos perfeitamente maduros são colhidos. A separação por densidade elimina quaisquer grãos defeituosos ainda no lavador.",
      icon: "center_focus_strong",
    },
    {
      num: "02",
      title: "Colheita Manual de Altitude",
      subtitle: "Montanhas Íngremes",
      description:
        "Nas encostas de até 1.450m do Caparaó, a mecanização é impossível. Toda a colheita é feita manualmente, fruto a fruto.",
      icon: "pan_tool",
    },
    {
      num: "03",
      title: "Fermentação de Precisão",
      subtitle: "Anaeróbia & Honey",
      description:
        "Microlotes fermentam em tanques lacrados sem oxigênio por até 72h, potencializando notas exóticas de flor de laranjeira e pêssego.",
      icon: "science",
    },
    {
      num: "04",
      title: "Terreiros Suspensos",
      subtitle: "Secagem Lenta ao Sol",
      description:
        "Grãos secam suspensos a 1 metro do solo sobre telas vazadas com aeração 360°, sendo revolvidos até 16 vezes por dia até 11% de umidade.",
      icon: "wb_sunny",
    },
    {
      num: "05",
      title: "Classificação Oficial SCA",
      subtitle: "Q-Grader Certificado",
      description:
        "Provas cegas avaliam fragrância, sabor, acidez, corpo e equilíbrio. Apenas lotes com 86 a 88.5+ pontos integram a seleção KDS.",
      icon: "verified",
    },
    {
      num: "06",
      title: "Torra Artesanal sob Demanda",
      subtitle: "Curva Térmica Dedicada",
      description:
        "Torrefação em micro-lotes de 10kg com curvas de calor customizadas para cada variedade, assegurando frescor inigualável na xícara.",
      icon: "local_fire_department",
    },
  ];

  return (
    <section className="w-full bg-[#110E0D] text-[#F5F2EB] py-24 md:py-36 relative overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 pb-8 border-b border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-2.5 h-2.5 bg-gold-bright" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold-bright font-bold">
              Da Semente à Xícara // Protocolo KDS
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-paper-cream font-normal">
            A Arte do Café de <span className="italic text-gold-bright">Atelier</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-paper-sand/70 mt-4 font-light leading-relaxed">
            Cada microlote KDS passa por um rito de seis etapas onde a ciência da torrefação se curva
            diante da sabedoria da natureza.
          </p>
        </div>

        {/* 6-Step Visual Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((st, i) => (
            <motion.div
              key={st.num}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="p-7 bg-[#161311] border border-white/10 hover:border-gold-bright/50 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 font-mono text-xs">
                  <span className="text-gold-bright font-bold tracking-widest">{st.num}.</span>
                  <span className="text-paper-sand/50 uppercase tracking-wider">{st.subtitle}</span>
                </div>
                <h4 className="font-serif text-xl text-paper-cream mb-3">{st.title}</h4>
                <p className="font-sans text-xs text-paper-sand/70 font-light leading-relaxed">
                  {st.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArtOfCoffee;
