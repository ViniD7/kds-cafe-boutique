import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

export const BeyondCoffee = () => {
  const { addToCart } = useCart();

  const cookieCups = [
    {
      id: "cookie-cup-cacau",
      name: "Cookie Cup Sabor Cacau 70%",
      image: "/images/cupCacau.webp",
      flavor: "Cacau Alcalino & Chocolate Belga",
      description:
        "Massa amanteigada de cacau puro com camada espessa de chocolate meio amargo. Harmoniza com cafés fermentados.",
      price: 15.6,
    },
    {
      id: "cookie-cup-coco",
      name: "Cookie Cup Sabor Coco Queimado",
      image: "/images/cupCoco.webp",
      flavor: "Coco Ralado & Chocolate Nobre",
      description:
        "Leite e óleo de coco na formulação crocante, criando contraste tropical irresistível com a acidez natural do café.",
      price: 15.8,
    },
    {
      id: "cookie-cup-cookie",
      name: "Cookie Cup Baunilha Tradicional",
      image: "/images/cupCookie.webp",
      flavor: "Baunilha Bourbon & Gotas de Chocolate",
      description:
        "O clássico americano reinventado para o ateliê: crocância externa que derrete sutilmente com o calor do primeiro gole.",
      price: 15.6,
    },
  ];

  const handleAddCup = async (cup: any) => {
    try {
      await addToCart(cup.id, 1);
      toast.success(`${cup.name} adicionado à sacola!`);
    } catch {
      toast.error("Erro ao adicionar item.");
    }
  };

  return (
    <section className="w-full bg-[#110E0D] text-[#F5F2EB] py-24 md:py-36 relative overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 pb-8 border-b border-white/10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2.5 h-2.5 bg-gold-bright" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold-bright font-bold">
                Gastronomia de Ateliê // Além do Café
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-paper-cream font-normal">
              Cookie Cups <span className="italic text-gold-bright">Artesanais</span>
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-paper-sand/70 max-w-md font-light leading-relaxed">
            Copinhos artesanais 100% comestíveis e revestidos com chocolate nobre para transformar seu
            espresso em uma sobremesa sensorial inesquecível.
          </p>
        </div>

        {/* 3 Cookie Cups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cookieCups.map((cup, i) => (
            <motion.div
              key={cup.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-[#161311] border border-white/10 hover:border-gold-bright/60 p-6 flex flex-col justify-between group transition-all"
            >
              <div>
                {/* Visual */}
                <div className="aspect-[4/3] bg-[#0D0B0A] border border-white/5 flex items-center justify-center p-4 mb-6">
                  <img
                    src={cup.image}
                    alt={cup.name}
                    className="max-h-full max-w-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <span className="font-mono text-[10px] uppercase tracking-widest text-gold-bright block mb-1">
                  {cup.flavor}
                </span>
                <h4 className="font-serif text-xl text-paper-cream mb-2">{cup.name}</h4>
                <p className="font-sans text-xs text-paper-sand/70 font-light leading-relaxed mb-6">
                  {cup.description}
                </p>
              </div>

              {/* Price and Cart Action */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="font-mono text-xl text-paper-cream font-bold block">
                    {formatCurrency(cup.price)}
                  </span>
                  <span className="font-mono text-[10px] text-paper-sand/50">Unidade individual</span>
                </div>

                <button
                  onClick={() => handleAddCup(cup)}
                  className="px-5 py-2.5 bg-gold-burnished hover:bg-gold-bright text-[#0D0B0A] font-mono text-xs uppercase tracking-wider font-bold transition-colors"
                >
                  + Sacola
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeyondCoffee;
