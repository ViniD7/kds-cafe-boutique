
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import { Link } from "react-router-dom";
import { Coffee, Package, Award, Truck } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Features Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                <Coffee size={28} className="text-gold" />
              </div>
              <h3 className="font-serif text-xl mb-2">Cafés Selecionados</h3>
              <p className="text-muted-foreground">
                Selecionamos os melhores grãos das regiões produtoras do Brasil.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                <Package size={28} className="text-gold" />
              </div>
              <h3 className="font-serif text-xl mb-2">Embalagem Protetora</h3>
              <p className="text-muted-foreground">
                Nossos cafés são embalados logo após a torra, preservando o aroma e sabor.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                <Award size={28} className="text-gold" />
              </div>
              <h3 className="font-serif text-xl mb-2">Qualidade Premiada</h3>
              <p className="text-muted-foreground">
                Cafés premiados nacional e internacionalmente por sua excelência.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                <Truck size={28} className="text-gold" />
              </div>
              <h3 className="font-serif text-xl mb-2">Entrega Rápida</h3>
              <p className="text-muted-foreground">
                Enviamos seu pedido em até 24 horas após a confirmação do pagamento.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <FeaturedProducts />
      
      {/* About Section */}
      <section className="py-16 bg-brown-800 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif mb-4">
                Nossa <span className="text-gold">História</span>
              </h2>
              <p className="mb-4">
                A KDS Cafés Especiais nasceu da paixão por café e da busca pela excelência. 
                Trabalhamos diretamente com produtores selecionados, garantindo a qualidade 
                desde o cultivo até a xícara.
              </p>
              <p className="mb-6">
                Nossa missão é proporcionar uma experiência sensorial única, apresentando ao 
                consumidor os diferentes perfis de sabor que o café brasileiro pode oferecer.
              </p>
              <Link 
                to="/sobre" 
                className="inline-block bg-gold text-white py-3 px-8 rounded-md font-medium hover:bg-gold/90 transition-colors"
              >
                Conheça mais
              </Link>
            </div>
            <div className="bg-muted h-96 rounded-md">
              <img 
                src="/placeholder.svg" 
                alt="KDS Cafés Especiais" 
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 bg-secondary/50">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-serif mb-4">
              Receba Novidades e <span className="text-gold">Ofertas Especiais</span>
            </h2>
            <p className="text-muted-foreground mb-6">
              Inscreva-se em nossa newsletter para receber dicas sobre café, 
              informações sobre novos produtos e ofertas exclusivas.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="flex-grow bg-white border border-border rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-gold"
                required
              />
              <button 
                type="submit"
                className="bg-gold text-white py-3 px-6 rounded-md font-medium hover:bg-gold/90 transition-colors"
              >
                Inscrever-se
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
