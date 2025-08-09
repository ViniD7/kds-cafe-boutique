import { Coffee, Users, Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import "./About/About.css";

const About = () => {
  const storyRef = useRef<HTMLElement>(null);
  const valuesRef = useRef<HTMLElement>(null);
  const teamRef = useRef<HTMLElement>(null);
  const videosRef = useRef<HTMLElement>(null);
  const [openVideo, setOpenVideo] = useState<string | null>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "50px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    if (storyRef.current) observer.observe(storyRef.current);
    if (valuesRef.current) observer.observe(valuesRef.current);
    if (teamRef.current) observer.observe(teamRef.current);
    if (videosRef.current) observer.observe(videosRef.current);

    return () => observer.disconnect();
  }, []);

  // Dados dos vídeos - SUBSTITUA OS IDs PELOS SEUS VÍDEOS REAIS
  const videos = [
    {
      id: "f-wjJs6FjLg", // Troque pelo ID real (após v= na URL do YouTube)
      title: "UNBOXING ÉPICO com KDS Cafés Especiais! ☕🔥- Café Especial",
      thumb: "hqdefault.jpg",
      key: "video1",
    },
    {
      id: "A8GIASeOk08",
      title: "KDS - Chocolate ✨☕ - Café Especial",
      thumb: "hqdefault.jpg",
      key: "video2",
    },
    {
      id: "XwmpcLsDVOs",
      title: "KDS Drip Coffee - Café Especial",
      thumb: "hqdefault.jpg",
      key: "video3",
    },
  ];

  return (
    <div className="about-container">
      <div className="hero-section">
        <div className="hero-background"></div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Sobre a <span>KDS Cafés Especiais</span>
            </h1>
            <p className="hero-subtitle">
              Nossa história, valores e paixão pelo café de qualidade
            </p>
          </div>
        </div>
      </div>

      {/* Seção História */}
      <section ref={storyRef} className="story-section">
        <div className="story-container">
          <div className="story-grid">
            <div className="story-content">
              <h2 className="story-title">Nossa História</h2>
              <p className="story-text">
                A história da KDS Cafés Especiais começa em 1969, no coração do
                Caparaó Capixaba, com o plantio dos primeiros pés de café
                arábica por nossa família. Ao longo das gerações, o amor pelo
                campo e pela cultura cafeeira se manteve vivo, impulsionando a
                busca constante por qualidade e inovação. Em 2021, nasceu
                oficialmente a KDS Cafés Especiais, com o propósito de
                transformar tradição em sabor, levando cafés únicos e cheios de
                história para cada xícara.
              </p>
              <p className="story-text">
                Nossa jornada começou com visitas a pequenos produtores em
                regiões como Sul de Minas, Cerrado Mineiro e Mantiqueira de
                Minas, onde encontramos cafés excepcionais produzidos por
                famílias dedicadas à qualidade e sustentabilidade.
              </p>
              <p className="story-text">
                Hoje, a KDS Cafés Especiais é reconhecida pela qualidade de seus
                produtos e pelo compromisso com toda a cadeia produtiva, desde o
                produtor até o consumidor final.
              </p>
            </div>
            <div className="story-image"></div>
          </div>
        </div>
      </section>

      {/* Seção Valores */}
      <section ref={valuesRef} className="values-section">
        <div className="values-container">
          <h2 className="values-title">Nossos Valores</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <Coffee size={24} />
              </div>
              <h3 className="value-card-title">Qualidade</h3>
              <p className="value-card-text">
                Selecionamos apenas os melhores grãos, colhidos no ponto ideal
                de maturação e processados com cuidado para preservar todas as
                suas características.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <Users size={24} />
              </div>
              <h3 className="value-card-title">Transparência</h3>
              <p className="value-card-text">
                Acreditamos na importância de conhecer a origem do café que
                consumimos. Por isso, compartilhamos informações sobre os
                produtores, regiões e métodos de processamento.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <Heart size={24} />
              </div>
              <h3 className="value-card-title">Sustentabilidade</h3>
              <p className="value-card-text">
                Valorizamos práticas sustentáveis em toda a cadeia produtiva,
                desde o cultivo até a embalagem, buscando minimizar nosso
                impacto ambiental.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Equipe */}
      <section ref={teamRef} className="team-section">
        <div className="team-container">
          <h2 className="team-title">Nossa Equipe</h2>
          <div className="team-grid">
            {[1, 2, 3].map((member) => (
              <div key={member} className="team-member">
                <div className="member-photo">
                  <img src="/placeholder.svg" alt={`Membro ${member}`} />
                </div>
                <h3 className="member-name">Nome do Fundador {member}</h3>
                <p className="member-role">Cargo na Empresa</p>
                <p className="member-bio">Breve descrição sobre esta pessoa.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section ref={videosRef} className="videos-section">
        <div className="videos-container">
          {/* <h2 className="videos-title">Nossos Vídeos</h2> */}
          <div className="videos-grid">
            {videos.map((video) => (
              <div key={video.id} className="video-card">
                <div className="video-wrapper">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0&modestbranding=1`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
