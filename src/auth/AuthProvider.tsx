import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { refreshSession } from "../api/auth";
import { baseFetch } from "../lib/baseFetch";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refresh: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Attempt refresh on app load
  useEffect(() => {
    refreshSession().then((result) => {
      setIsAuthenticated(result)
    });
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    const res = await baseFetch("/auth/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ username, password }),
    });

    setIsAuthenticated(res.ok)
    return res.ok
  };

  const refresh = async (): Promise<boolean> => {
    const res = await fetch("/auth/refresh/", {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      setIsAuthenticated(false);
      return false;
    }

    setIsAuthenticated(true);
    return true;
  };

  const logout = async () => {
    await fetch("/auth/logout/", {
      method: "POST",
      credentials: "include",
    });

    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, refresh }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
