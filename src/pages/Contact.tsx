
import { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  
  const [formStatus, setFormStatus] = useState<null | { type: "success" | "error"; message: string }>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus({
        type: "success",
        message: "Mensagem enviada com sucesso! Entraremos em contato em breve."
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setFormStatus(null);
      }, 5000);
    }, 1000);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-serif mb-3">
            Entre em <span className="text-gold">Contato</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Estamos à disposição para responder suas dúvidas, ouvir sugestões ou receber feedback sobre nossos produtos.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <div className="bg-white border border-border rounded-lg p-6 md:p-8">
              <h2 className="text-2xl font-serif mb-6">Envie uma Mensagem</h2>
              
              {formStatus && (
                <div className={`p-4 rounded-md mb-6 ${
                  formStatus.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                }`}>
                  {formStatus.message}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      E-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Assunto
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
                    required
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="Dúvida sobre produtos">Dúvida sobre produtos</option>
                    <option value="Informações sobre pedidos">Informações sobre pedidos</option>
                    <option value="Problema com entrega">Problema com entrega</option>
                    <option value="Sugestões">Sugestões</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
                    required
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="bg-gold text-white py-3 px-6 rounded-md font-medium hover:bg-gold/90 transition-colors flex items-center justify-center w-full md:w-auto"
                  >
                    <Send size={18} className="mr-2" />
                    Enviar Mensagem
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Contact Information */}
          <div>
            <div className="bg-white border border-border rounded-lg p-6 md:p-8 mb-8">
              <h2 className="text-2xl font-serif mb-6">Informações de Contato</h2>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="mr-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
                      <Phone size={20} className="text-gold" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Telefone</h3>
                    <p className="text-muted-foreground">
                      <a 
                        href="tel:+551199999999" 
                        className="hover:text-gold transition-colors"
                      >
                        +55 (11) 99999-9999
                      </a>
                    </p>
                    <p className="text-muted-foreground">
                      Segunda a Sexta, 9h às 18h
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
                      <Mail size={20} className="text-gold" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">E-mail</h3>
                    <p className="text-muted-foreground">
                      <a 
                        href="mailto:contato@kdscafes.com.br" 
                        className="hover:text-gold transition-colors"
                      >
                        contato@kdscafes.com.br
                      </a>
                    </p>
                    <p className="text-muted-foreground">
                      Respondemos em até 24 horas úteis
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
                      <MapPin size={20} className="text-gold" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Endereço</h3>
                    <p className="text-muted-foreground">
                      Rua dos Cafés Especiais, 123<br />
                      Centro, São Paulo - SP<br />
                      CEP: 01234-567
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* WhatsApp CTA */}
            <div className="bg-gold/10 border border-gold/30 rounded-lg p-6 text-center">
              <h3 className="text-xl font-serif mb-4">Atendimento pelo WhatsApp</h3>
              <p className="mb-4 text-muted-foreground">
                Para um atendimento mais rápido, fale conosco pelo WhatsApp. Estamos disponíveis de Segunda a Sábado, das 9h às 18h.
              </p>
              <a 
                href="https://wa.me/5511999999999" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gold text-white py-3 px-6 rounded-md font-medium hover:bg-gold/90 transition-colors inline-flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Falar pelo WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
