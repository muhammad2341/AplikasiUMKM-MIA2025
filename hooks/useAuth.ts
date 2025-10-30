"use client";
import { useState, useEffect, createContext, useContext } from "react";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    try {
      const userData = localStorage.getItem("umkm-user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Mock login - in real app, call API
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split("@")[0],
        role: email.includes("seller") ? "seller" : "customer",
        phone: "+628123456789",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      localStorage.setItem("umkm-user", JSON.stringify(mockUser));
      localStorage.setItem("umkm-token", "mock-jwt-token");
      setUser(mockUser);
    } catch (error) {
      throw new Error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: any) => {
    setLoading(true);
    try {
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      localStorage.setItem("umkm-user", JSON.stringify(mockUser));
      localStorage.setItem("umkm-token", "mock-jwt-token");
      setUser(mockUser);
    } catch (error) {
      throw new Error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("umkm-user");
    localStorage.removeItem("umkm-token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
