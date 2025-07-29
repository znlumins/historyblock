import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: string;
  name: string;
  email: string;
  level: string;
  points: number;
  avatar?: string;
  role?: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app start
  useEffect(() => {
    const savedUser = localStorage.getItem("historic_block_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing saved user:", error);
        localStorage.removeItem("historic_block_user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock authentication - in real app, this would be API call
    if (email === "daffa@historic.com" && password === "password123") {
      const userData = {
        id: "1",
        name: "Daffa Ahmad Al Attas",
        email: "daffa@historic.com",
        level: "Level 15 • Master",
        points: 2450,
        avatar: null,
        role: "user" as const,
      };

      setUser(userData);
      localStorage.setItem("historic_block_user", JSON.stringify(userData));
      setLoading(false);
      return true;
    } else if (email === "admin@historic.com" && password === "admin123") {
      const userData = {
        id: "admin",
        name: "Admin Historic Block",
        email: "admin@historic.com",
        level: "Administrator",
        points: 9999,
        avatar: null,
        role: "admin" as const,
      };

      setUser(userData);
      localStorage.setItem("historic_block_user", JSON.stringify(userData));
      setLoading(false);
      return true;
    } else if (email === "adenia@historic.com" && password === "adenia123") {
      const userData = {
        id: "3",
        name: "Adenia Raesita",
        email: "adenia@historic.com",
        level: "Level 11 • Advanced",
        points: 1950,
        avatar: null,
        role: "user" as const,
      };

      setUser(userData);
      localStorage.setItem("historic_block_user", JSON.stringify(userData));
      setLoading(false);
      return true;
    } else if (email === "aymarda@historic.com" && password === "aymarda123") {
      const userData = {
        id: "4",
        name: "Aymardayanti Pagril",
        email: "aymarda@historic.com",
        level: "Level 12 • Expert",
        points: 2180,
        avatar: null,
        role: "user" as const,
      };

      setUser(userData);
      localStorage.setItem("historic_block_user", JSON.stringify(userData));
      setLoading(false);
      return true;
    } else if (email === "user@test.com" && password === "test123") {
      const userData = {
        id: "2",
        name: "Test User",
        email: "user@test.com",
        level: "Level 5 • Beginner",
        points: 450,
        avatar: null,
        role: "user" as const,
      };

      setUser(userData);
      localStorage.setItem("historic_block_user", JSON.stringify(userData));
      setLoading(false);
      return true;
    }

    setLoading(false);
    return false;
  };

  const register = async (
    name: string,
    email: string,
    password: string,
  ): Promise<boolean> => {
    setLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock registration - in real app, this would be API call
    const userData = {
      id: Date.now().toString(),
      name,
      email,
      level: "Level 1 • Beginner",
      points: 0,
      avatar: null,
      role: "user" as const,
    };

    setUser(userData);
    localStorage.setItem("historic_block_user", JSON.stringify(userData));
    setLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("historic_block_user");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
