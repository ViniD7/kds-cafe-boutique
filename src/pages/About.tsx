
import { Coffee, Users, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-brown-900 text-white py-20">
        <div 
          className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-40"
        ></div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-serif mb-6">
              Sobre a <span className="text-gold">KDS Cafés Especiais</span>
            </h1>
            <p className="text-xl mb-0">
              Nossa história, valores e paixão pelo café de qualidade
            </p>
          </div>
        </div>
      </div>
      
      {/* Our Story */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif mb-6">Nossa História</h2>
              <p className="mb-4">
                A KDS Cafés Especiais nasceu em 2018, da paixão de três amigos apaixonados pelo mundo 
                do café. Após anos trabalhando em diferentes áreas do setor cafeeiro, decidimos unir 
                nossos conhecimentos para criar uma marca que valorizasse o café brasileiro de qualidade 
                e proporcionasse aos consumidores uma experiência sensorial completa.
              </p>
              <p className="mb-4">
                Nossa jornada começou com visitas a pequenos produtores em regiões como Sul de Minas, 
                Cerrado Mineiro e Mantiqueira de Minas, onde encontramos cafés excepcionais produzidos 
                por famílias dedicadas à qualidade e sustentabilidade.
              </p>
              <p>
                Hoje, a KDS Cafés Especiais é reconhecida pela qualidade de seus produtos e pelo 
                compromisso com toda a cadeia produtiva, desde o produtor até o consumidor final.
              </p>
            </div>
            <div className="bg-muted h-96 rounded-md">
              <img 
                src="/placeholder.svg" 
                alt="Nossa História" 
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Values */}
      <section className="py-16 bg-secondary/30">
        <div className="container-custom">
          <h2 className="text-3xl font-serif mb-12 text-center">Nossos Valores</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="mb-4 w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                <Coffee size={24} className="text-gold" />
              </div>
              <h3 className="text-xl font-serif mb-3">Qualidade</h3>
              <p className="text-muted-foreground">
                Selecionamos apenas os melhores grãos, colhidos no ponto ideal de maturação 
                e processados com cuidado para preservar todas as suas características.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="mb-4 w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                <Users size={24} className="text-gold" />
              </div>
              <h3 className="text-xl font-serif mb-3">Transparência</h3>
              <p className="text-muted-foreground">
                Acreditamos na importância de conhecer a origem do café que consumimos. 
                Por isso, compartilhamos informações sobre os produtores, regiões e métodos de processamento.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="mb-4 w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                <Heart size={24} className="text-gold" />
              </div>
              <h3 className="text-xl font-serif mb-3">Sustentabilidade</h3>
              <p className="text-muted-foreground">
                Valorizamos práticas sustentáveis em toda a cadeia produtiva, desde o cultivo 
                até a embalagem, buscando minimizar nosso impacto ambiental.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-serif mb-12 text-center">Nossa Equipe</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((member) => (
              <div key={member} className="text-center">
                <div className="w-48 h-48 rounded-full bg-muted mx-auto mb-4 overflow-hidden">
                  <img 
                    src="/placeholder.svg" 
                    alt={`Membro da equipe ${member}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-serif mb-1">Nome do Fundador {member}</h3>
                <p className="text-gold mb-3">Cargo na Empresa</p>
                <p className="text-muted-foreground">
                  Breve descrição sobre a experiência e paixão pelo café desta pessoa.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
