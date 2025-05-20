
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative bg-brown-900 text-white">
      <div 
        className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-40"
      ></div>
      <div className="container-custom relative z-10 py-20 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
            Descubra o mundo dos <span className="text-gold">cafés especiais</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-brown-100">
            Uma experiência sensorial única. Cafés de origem única, cultivados com cuidado e torrados com precisão.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/produtos" 
              className="bg-gold text-white py-3 px-8 rounded-md text-center font-medium hover:bg-gold/90 transition-colors"
            >
              Explorar Cafés
            </Link>
            <Link 
              to="/sobre" 
              className="bg-transparent border border-white text-white py-3 px-8 rounded-md text-center font-medium hover:bg-white/10 transition-colors"
            >
              Conheça Nossa História
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
