import { motion, AnimatePresence } from "framer-motion";
import ProductGrid from "@/components/ProductGrid";
import { kits } from "@/data/products";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import "./Kits/Kits.css";

const Kits = () => {
  return (
    <motion.div
      className="kits-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container-custom">
        <SectionHeader
          title="Kits"
          highlightedText="e Presentes"
          subtitle="Nossos kits são combinações cuidadosamente selecionadas para quem deseja experimentar diferentes cafés ou presentear alguém especial."
        />

        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProductGrid kits={kits} />
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="custom-kits-info"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <h3 className="custom-kits-title">Kits Personalizados</h3>
          <p className="custom-kits-text">
            Você também pode montar seu próprio kit personalizado de acordo com
            suas preferências. Entre em contato conosco para mais informações.
          </p>
          <motion.a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-button"
            whileHover={{ scale: 1.05, backgroundColor: "#a9925d" }}
            whileTap={{ scale: 0.95 }}
          >
            Fale Conosco
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Kits;
