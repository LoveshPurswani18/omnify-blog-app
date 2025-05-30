import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { getCurrentUser } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  const login = async (username, password) => {
    const res = await axios.post("https://omnify-backend-495525526179.asia-south1.run.app/api/token/", {
      username,
      password,
    });
    // const res = await loginUser({ username, password });
    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);
    setUser(jwtDecode(res.data.access));
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
  };

  const refreshAccessToken = async () => {
    const refresh = localStorage.getItem("refresh");
    if (!refresh) {
      logout();
      return null;
    }

    try {
      const res = await axios.post("https://omnify-backend-495525526179.asia-south1.run.app/api/token/refresh/", {
        refresh,
      });
      localStorage.setItem("access", res.data.access);
      return res.data.access;
    } catch (error) {
      console.error(error);
      logout();
      return null;
    }
  };

  const checkAuth = async () => {
    let token = localStorage.getItem("access");

    if (!token) {
      setLoading(false);
      return logout();
    }

    try {
      const res = await getCurrentUser(token);
      setUser(res.data);
    } catch (err) {
      console.error(err);
      const newAccess = await refreshAccessToken();
      if (newAccess) {
        try {
          const res = await getCurrentUser(newAccess);
          setUser(res.data);
        } catch {
          logout();
        }
      } else {
        logout();
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);