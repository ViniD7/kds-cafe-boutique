import { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import "./Contact/Contact.css";
import SectionHeader from "@/components/SectionHeader/SectionHeader";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<null | {
    type: "success" | "error";
    message: string;
  }>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create WhatsApp message with form data
    const message =
      `*Nova mensagem de contato*%0A%0A` +
      `*Nome:* ${formData.name}%0A` +
      `*E-mail:* ${formData.email}%0A` +
      `*Telefone:* ${formData.phone || "Não informado"}%0A` +
      `*Assunto:* ${formData.subject}%0A%0A` +
      `*Mensagem:*%0A${formData.message}`;

    // WhatsApp link with pre-filled message
    const whatsappUrl = `https://wa.me/5528999921033?text=${message}`;
    window.open(whatsappUrl, "_blank");

    // Show success message
    setFormStatus({
      type: "success",
      message: "Mensagem enviada com sucesso! Entraremos em contato em breve.",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

    setIsSubmitting(false);

    // Clear success message after 5 seconds
    setTimeout(() => {
      setFormStatus(null);
    }, 5000);
  };

  return (
    <div className="contact-container">
      <div className="container-custom">
        <div className="contact-header">
          <SectionHeader
            title="Entre em"
            highlightedText="Contato"
            subtitle="Estamos à disposição para responder suas dúvidas, ouvir sugestões ou receber feedback sobre nossos produtos."
          />
        </div>

        <div className="contact-grid">
          {/* Contact Form */}
          <div>
            <div className="contact-form-container">
              <div className="form-header">
                <h2 className="form-title">Envie uma Mensagem</h2>
                <div className="form-decoration"></div>
              </div>

              {formStatus && (
                <div className={`form-status ${formStatus.type}`}>
                  {formStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    required
                    placeholder="Digite seu Nome completo"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      E-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      required
                      placeholder="Usuário@dominio"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    Assunto
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="Dúvida sobre produtos">
                      Dúvida sobre produtos
                    </option>
                    <option value="Informações sobre pedidos">
                      Informações sobre pedidos
                    </option>
                    <option value="Problema com entrega">
                      Problema com entrega
                    </option>
                    <option value="Sugestões">Sugestões</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="form-textarea"
                    required
                    placeholder="Fale conosco!"
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    className={`submit-button ${
                      isSubmitting ? "submitting" : ""
                    }`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="spinner"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send size={18} style={{ marginRight: "0.5rem" }} />
                        Enviar Mensagem
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <div className="contact-info-container">
              <div className="info-header">
                <h2 className="form-title">Informações de Contato</h2>
                <div className="info-decoration"></div>
              </div>

              <div className="info-items-container">
                <div className="info-item">
                  <div className="info-icon">
                    <div className="icon-container">
                      <Phone size={20} />
                    </div>
                  </div>
                  <div className="info-content">
                    <h3>Telefone</h3>
                    <p>
                      <a href="tel:+5528999921033" className="info-link">
                        +55 (28) 99992-1033
                      </a>
                    </p>
                    <p className="info-detail">Segunda a Sexta, 9h às 18h</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <div className="icon-container">
                      <Mail size={20} />
                    </div>
                  </div>
                  <div className="info-content">
                    <h3>E-mail</h3>
                    <p>
                      <a
                        href="mailto:contato@kdscafes.com.br"
                        className="info-link"
                      >
                        kdscafesespeciais@gmail.com
                      </a>
                    </p>
                    <p className="info-detail">
                      Respondemos em até 24 horas úteis
                    </p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <div className="icon-container">
                      <MapPin size={20} />
                    </div>
                  </div>
                  <div className="info-content">
                    <h3>Endereço</h3>
                    <p>
                      KdsCafésEspeciais
                      <br />
                      Pequiá, Iúna - ES
                      <br />
                      CEP: 29390-000
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="whatsapp-cta">
              <div className="whatsapp-icon-container">
                <svg
                  className="whatsapp-icon"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <h3 className="whatsapp-title">Atendimento pelo WhatsApp</h3>
              <p className="whatsapp-description">
                Para um atendimento mais rápido, fale conosco pelo WhatsApp.
                Estamos disponíveis de Segunda a Sábado, das 9h às 18h.
              </p>
              <a
                href="https://wa.me/5528999921033"
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-button"
              >
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
