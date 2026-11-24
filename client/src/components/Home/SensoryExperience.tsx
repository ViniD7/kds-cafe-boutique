import { useState } from "react";
import { motion } from "framer-motion";

interface SensoryProfile {
  id: string;
  name: string;
  sca: string;
  color: string;
  notes: string[];
  sweetness: number; // 0 to 10
  acidity: number;
  body: number;
  aroma: number;
  finish: number;
  description: string;
}

const SENSORY_PROFILES: SensoryProfile[] = [
  {
    id: "catuai-fermentado",
    name: "Catuaí Vermelho 144 (Lata Reserva)",
    sca: "88.5 SCA",
    color: "#C2A763",
    notes: ["Chocolate Belga 70%", "Flor de Laranjeira", "Maracujá Silvestre"],
    sweetness: 9.5,
    acidity: 8.8,
    body: 9.2,
    aroma: 9.6,
    finish: 9.4,
    description:
      "Complexidade extraordinária. A fermentação anaeróbia prolongada destaca fragrâncias florais inebriantes com corpo licoroso aveludado.",
  },
  {
    id: "arara-honey",
    name: "Arara Amarelo (Processo Honey)",
    sca: "87.5 SCA",
    color: "#E2C68A",
    notes: ["Manga em Calda", "Damasco", "Mel de Flor de Café"],
    sweetness: 9.8,
    acidity: 8.5,
    body: 8.0,
    aroma: 9.0,
    finish: 8.8,
    description:
      "Doçura pura e cristalina de frutas tropicais maduras. A secagem lenta com a mucilagem natural preserva a intensidade do mel.",
  },
  {
    id: "gourmet-classico",
    name: "Gourmet Torra Média Clássica",
    sca: "86.0 SCA",
    color: "#A88F48",
    notes: ["Caramelo Toffee", "Cacau Tostado", "Avelã"],
    sweetness: 8.5,
    acidity: 6.8,
    body: 9.0,
    aroma: 8.6,
    finish: 8.5,
    description:
      "Equilíbrio absoluto com acidez suave e muito corpo. Ideal para quem busca um café aveludado e reconfortante.",
  },
];

export const SensoryExperience = () => {
  const [selectedProfile, setSelectedProfile] = useState<SensoryProfile>(SENSORY_PROFILES[0]);

  const cx = 160;
  const cy = 160;
  const maxR = 95;

  const calculatePoints = (p: SensoryProfile) => {
    const scores = [p.sweetness, p.aroma, p.finish, p.body, p.acidity];
    return scores
      .map((score, index) => {
        const angle = -Math.PI / 2 + (index * 2 * Math.PI) / 5;
        const r = (score / 10) * maxR;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  };

  const getAxisPoint = (index: number, factor = 1) => {
    const angle = -Math.PI / 2 + (index * 2 * Math.PI) / 5;
    const r = maxR * factor;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  };

  const axisLabels = [
    { label: "Doçura Natural", sub: `${selectedProfile.sweetness}/10` },
    { label: "Aroma & Fragrância", sub: `${selectedProfile.aroma}/10` },
    { label: "Finalização", sub: `${selectedProfile.finish}/10` },
    { label: "Corpo & Densidade", sub: `${selectedProfile.body}/10` },
    { label: "Acidez Málica", sub: `${selectedProfile.acidity}/10` },
  ];

  return (
    <section className="w-full bg-[#0D0B0A] text-[#F5F2EB] py-16 sm:py-24 md:py-32 relative overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6 sm:gap-8 pb-6 sm:pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-2.5 sm:mb-3">
              <span className="w-2.5 h-2.5 bg-gold-bright" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold-bright font-bold">
                Metodologia Sensorial SCA // Análise de Laboratório
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-paper-cream font-normal">
              A Anatomia do <span className="italic text-gold-bright">Sabor</span>
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-paper-sand/70 max-w-md font-light leading-relaxed">
            Cada microlote possui uma assinatura biométrica única desenvolvida pela altitude e
            pós-colheita. Explore o radar sensorial interativo.
          </p>
        </div>

        {/* Profile Selector Tabs */}
        <div className="flex gap-2 mb-8 sm:mb-10 overflow-x-auto pb-1 scrollbar-none">
          {SENSORY_PROFILES.map((prof) => (
            <button
              key={prof.id}
              onClick={() => setSelectedProfile(prof)}
              className={`px-3.5 sm:px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all border shrink-0 ${
                selectedProfile.id === prof.id
                  ? "bg-gold-bright text-[#0D0B0A] font-bold border-gold-bright"
                  : "bg-white/[0.02] text-paper-sand/70 border-white/10 hover:border-white/30 hover:text-paper-cream"
              }`}
            >
              <span>{prof.name}</span>
              <span className="ml-2 text-[10px] opacity-75">[{prof.sca}]</span>
            </button>
          ))}
        </div>

        {/* Interactive Sensory Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center bg-[#161311] p-5 sm:p-8 md:p-12 border border-white/10">
          {/* Left Column: Spider Radar Chart SVG auto-contido */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div className="w-full max-w-[320px] aspect-square flex items-center justify-center">
              <svg viewBox="0 0 320 320" className="w-full h-full overflow-visible">
                {/* Background Concentric Webs */}
                {[0.2, 0.4, 0.6, 0.8, 1.0].map((level) => {
                  const pts = [0, 1, 2, 3, 4]
                    .map((i) => {
                      const pt = getAxisPoint(i, level);
                      return `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
                    })
                    .join(" ");
                  return (
                    <polygon
                      key={level}
                      points={pts}
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth={level === 1.0 ? "1.5" : "0.75"}
                      strokeDasharray={level === 1.0 ? "none" : "3,3"}
                    />
                  );
                })}

                {/* Radar Axis Lines */}
                {[0, 1, 2, 3, 4].map((i) => {
                  const pt = getAxisPoint(i, 1.0);
                  return (
                    <line
                      key={i}
                      x1={cx}
                      y1={cy}
                      x2={pt.x}
                      y2={pt.y}
                      stroke="rgba(255,255,255,0.15)"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Animated Dynamic Profile Polygon */}
                <motion.polygon
                  points={calculatePoints(selectedProfile)}
                  fill="rgba(194, 167, 99, 0.25)"
                  stroke="#C2A763"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  initial={false}
                  animate={{ points: calculatePoints(selectedProfile) }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />

                {/* Point Dots */}
                {[0, 1, 2, 3, 4].map((i) => {
                  const scores = [
                    selectedProfile.sweetness,
                    selectedProfile.aroma,
                    selectedProfile.finish,
                    selectedProfile.body,
                    selectedProfile.acidity,
                  ];
                  const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
                  const r = (scores[i] / 10) * maxR;
                  const x = cx + r * Math.cos(angle);
                  const y = cy + r * Math.sin(angle);
                  return (
                    <motion.circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="#0D0B0A"
                      stroke="#C2A763"
                      strokeWidth="2"
                      initial={false}
                      animate={{ cx: x, cy: y }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                  );
                })}

                {/* Direct SVG Text Labels at Vertices */}
                <text
                  x={cx}
                  y={cy - maxR - 10}
                  textAnchor="middle"
                  fill="#C2A763"
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  DOÇURA
                </text>
                <text
                  x={cx + maxR * 0.95 + 8}
                  y={cy - maxR * 0.31 + 4}
                  textAnchor="start"
                  fill="#F5F2EB"
                  fontSize="10"
                  fontFamily="monospace"
                  opacity="0.85"
                >
                  AROMA
                </text>
                <text
                  x={cx + maxR * 0.59 + 6}
                  y={cy + maxR * 0.81 + 14}
                  textAnchor="start"
                  fill="#F5F2EB"
                  fontSize="10"
                  fontFamily="monospace"
                  opacity="0.85"
                >
                  FINALIZAÇÃO
                </text>
                <text
                  x={cx - maxR * 0.59 - 6}
                  y={cy + maxR * 0.81 + 14}
                  textAnchor="end"
                  fill="#F5F2EB"
                  fontSize="10"
                  fontFamily="monospace"
                  opacity="0.85"
                >
                  CORPO
                </text>
                <text
                  x={cx - maxR * 0.95 - 8}
                  y={cy - maxR * 0.31 + 4}
                  textAnchor="end"
                  fill="#F5F2EB"
                  fontSize="10"
                  fontFamily="monospace"
                  opacity="0.85"
                >
                  ACIDEZ
                </text>
              </svg>
            </div>
          </div>

          {/* Right Column: Tasting Notes & Technical Analysis */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="font-mono text-xs uppercase tracking-widest text-gold-bright mb-1.5 sm:mb-2">
              Certificação SCA Oficial // {selectedProfile.sca}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-paper-cream mb-3 sm:mb-4">
              {selectedProfile.name}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-paper-sand/70 leading-relaxed mb-4 sm:mb-6 font-light">
              {selectedProfile.description}
            </p>

            {/* Sensory Tags */}
            <div className="mb-4 sm:mb-6">
              <span className="font-mono text-[9.5px] sm:text-[10px] uppercase tracking-wider text-paper-sand/50 block mb-2">
                Notas Descritivas em Xícara:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedProfile.notes.map((n, i) => (
                  <span
                    key={i}
                    className="px-2.5 sm:px-3 py-1 bg-white/5 border border-white/10 text-paper-sand/90 font-mono text-xs"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>

            {/* 5-Attribute Meter Bars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-4 sm:pt-6 border-t border-white/10">
              {axisLabels.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 bg-[#0D0B0A] border border-white/5"
                >
                  <span className="font-mono text-xs text-paper-sand/70">{item.label}</span>
                  <span className="font-mono text-xs text-gold-bright font-bold">{item.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SensoryExperience;
