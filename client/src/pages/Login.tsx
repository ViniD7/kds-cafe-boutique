// src/pages/Auth.tsx
import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Images from "@/Constants/Images/images";
import { useAuth } from "@/context/AuthContext";
import "./Login.css";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(searchParams.get("mode") !== "register"); // true = login, false = register

  useEffect(() => {
    // Sync state if URL changes while component is mounted
    if (searchParams.get("mode") === "register") {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [searchParams]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    // limpa possíveis erros
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { authAPI } = await import("@/services/api");

      if (isLogin) {
        // LOGIN
        await login(formData.email, formData.password);

        toast.success("Bem-vindo de volta!", {
          description: "Login realizado com sucesso.",
        });
        navigate("/");
      } else {
        // REGISTER
        if (formData.password !== formData.confirmPassword) {
          toast.error("Erro", {
            description: "As senhas não coincidem.",
          });
          setIsLoading(false);
          return;
        }

        await register(formData.name, formData.email, formData.password);

        toast.success("Conta criada!", {
          description: "Sua conta foi criada com sucesso.",
        });
        // muda para o modo login após cadastro
        setIsLogin(true);
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }
    } catch (error: any) {
      toast.error(isLogin ? "Acesso Negado" : "Erro no cadastro", {
        description:
          error.response?.data?.message ||
          (isLogin
            ? "E-mail ou senha incorretos."
            : "Não foi possível criar sua conta."),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="auth-card"
      >
        {/* Cabeçalho com logo e título */}
        <div className="auth-header">
          <div className="auth-logo-container">
            <img
              src={Images.logoKDS}
              alt="KDS Café"
              className="auth-logo"
            />
          </div>
          <h2 className="auth-title">
            {isLogin ? "Bem-vindo de volta" : "Crie sua conta"}
          </h2>
          <p className="auth-subtitle">
            {isLogin
              ? "Acesse sua conta com e-mail e senha"
              : "Preencha os dados para começar"}
          </p>
        </div>

        {/* Formulário */}
        <div className="auth-body">
          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="auth-field"
              >
                <label htmlFor="name" className="auth-label">Nome completo</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={handleChange}
                  required={!isLogin}
                  className="auth-input"
                />
              </motion.div>
            )}

            <div className="auth-field">
              <label htmlFor="email" className="auth-label">E-mail</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="auth-input"
              />
            </div>

            <div className="auth-field">
              <div className="auth-field-header">
                <label htmlFor="password" className="auth-label">Senha</label>
                {isLogin && (
                  <Link
                    to="/forgot-password"
                    className="auth-link"
                  >
                    Esqueceu a senha?
                  </Link>
                )}
              </div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="auth-input"
              />
            </div>

            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="auth-field"
              >
                <label htmlFor="confirmPassword" className="auth-label">Confirmar senha</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required={!isLogin}
                  className="auth-input"
                />
              </motion.div>
            )}

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="auth-spinner" size={20} />
                  {isLogin ? "Entrando..." : "Criando conta..."}
                </>
              ) : (
                <>{isLogin ? "Entrar na Loja" : "Criar Conta"}</>
              )}
            </button>
          </form>

          {/* Alternância entre modos */}
          <div className="auth-switch-mode">
            {isLogin ? (
              <>
                Ainda não tem uma conta?{" "}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="auth-link"
                >
                  Criar conta
                </button>
              </>
            ) : (
              <>
                Já possui cadastro?{" "}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="auth-link"
                >
                  Fazer login
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Rodapé com link para home (opcional) */}
      <div className="auth-footer">
        <Link to="/" className="auth-footer-link">
          Voltar para a loja
        </Link>
      </div>
    </div>
  );
};

export default Auth;