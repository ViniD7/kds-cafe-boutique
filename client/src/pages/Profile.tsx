import "./Profile.css";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Profile = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Aqui seria a chamada para atualizar o perfil do usuário
      // await fetch('/api/auth/profile', { ... });
      
      // Simulando chamada API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Perfil atualizado!", {
        description: "Suas informações foram salvas com sucesso.",
      });
      
      setIsEditing(false);
    } catch (error) {
      toast.error("Erro", {
        description: "Não foi possível atualizar o perfil.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="profile-login-container">
        <div className="profile-login-card">
          <p style={{ color: 'var(--text-body)', marginBottom: '20px' }}>Você precisa estar logado para acessar esta página.</p>
          <button 
            onClick={() => window.location.href = "/login"}
            className="btn-save"
          >
            Ir para Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h1 className="profile-title">Meu Perfil</h1>
          <p className="profile-description">Gerencie suas informações pessoais e endereço de entrega.</p>
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="profile-grid">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Nome Completo</label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">E-mail</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone" className="form-label">Telefone</label>
              <input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="address" className="form-label">Endereço Completo</label>
              <input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!isEditing}
                className="form-input"
              />
            </div>
          </div>
          
          {isEditing && (
            <div className="profile-actions">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="btn-cancel"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                disabled={isLoading}
                className="btn-save"
              >
                {isLoading ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </div>
          )}
        </form>

        <div className="profile-footer">
          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className="btn-edit"
            >
              Editar Perfil
            </button>
          ) : <div></div>}
          
          <button 
            onClick={() => window.location.href = "/orders"}
            className="btn-orders"
          >
            Ver Meus Pedidos
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;