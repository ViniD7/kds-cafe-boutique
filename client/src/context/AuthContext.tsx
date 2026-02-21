import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { authAPI } from "../services/api";
import { User } from "../types/api";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Verificar se o usuário já está logado ao carregar a aplicação
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userData = await authAPI.getProfile();
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Token inválido ou expirado:", error);
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { user: userData } = await authAPI.login({ email, password });
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  };

  const logout = () => {
    authAPI.logout(); // Chama a API de logout
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const { user: userData } = await authAPI.register({ name, email, password });
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Erro no registro:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      logout,
      register,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};