"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { logout as performLogout } from "@/services/budget-item";
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

// สร้าง type สำหรับ Context
interface AuthContextType {
  username: string | null;
  login: (username: string) => void;
  logout: () => void;
  clearExpired: () => void;
  isAuthenticated: boolean;
  requireAuth: () => void; // ฟังก์ชันใหม่
}

// สร้าง Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook เพื่อเรียกใช้ AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// สร้าง Provider สำหรับ AuthContext
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }else{
        router.push('/login');
    }
    return () => setUsername("");
  }, []);

  const login = (username: string) => {
    localStorage.setItem('username', username);
    setUsername(username);
  };

  const logout = async () => {
    try {
        const response = await performLogout();
        Swal.fire({
          title: 'Logout Successful!',
          text: response.message,
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6',
        }).then(() => {
            localStorage.removeItem('username');
            setUsername(null);
            router.push('/login');
        });
      } catch (err: any) {
        Swal.fire({
          title: 'Logout Failed',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Try Again',
          confirmButtonColor: '#d33',
        });
      }
  };
  const clearExpired = async () => {
    try {
        await performLogout();
            localStorage.removeItem('username');
            setUsername(null);
            router.push('/login');
      } catch (err: any) {
          return err.message
      }
  };

  const isAuthenticated = !!username;

  // ฟังก์ชันใหม่
  const requireAuth = () => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ username, login, logout, clearExpired, isAuthenticated, requireAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
