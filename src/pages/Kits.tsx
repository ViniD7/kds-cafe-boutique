
import ProductGrid from "@/components/ProductGrid";
import { kits } from "@/data/products";

const Kits = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-serif mb-3">
            <span className="text-gold">Kits</span> e Presentes
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nossos kits são combinações cuidadosamente selecionadas para quem deseja 
            experimentar diferentes cafés ou presentear alguém especial.
          </p>
        </div>
        
        <ProductGrid kits={kits} />
        
        {/* Additional info */}
        <div className="mt-16 bg-secondary/30 rounded-lg p-6 text-center">
          <h3 className="text-xl font-serif mb-4">Kits Personalizados</h3>
          <p className="mb-6 text-muted-foreground">
            Você também pode montar seu próprio kit personalizado de acordo com suas preferências.
            Entre em contato conosco para mais informações.
          </p>
          <a 
            href="https://wa.me/5511999999999" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-gold text-white py-2 px-6 rounded-md font-medium hover:bg-gold/90 transition-colors"
          >
            Fale Conosco
          </a>
        </div>
      </div>
    </div>
  );
};

export default Kits;
