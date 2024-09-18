"use client";

import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';


const Navbar = () => {
  const { username, logout ,isAuthenticated } = useAuth() // ใช้ useAuth เพื่อดึงค่า username และฟังก์ชัน logout

  return (
    <nav className="bg-black text-white border-b border-gray-800">
      
        
          {isAuthenticated ? (
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <nav className="flex items-center space-x-4">
          <Link href="/" className="text-xl font-bold">
            Home
          </Link>
          <Link href="/entry" className="text-sm hover:text-gray-400">
            Entry
          </Link>
          <Link href="/approval" className="text-sm hover:text-gray-400">
            Approval
          </Link>
          <Link href="/add" className="text-sm hover:text-gray-400">
            Add
          </Link>
        </nav>
        <div className="text-sm">
              Welcome! {username} | 
              <button 
                onClick={logout}  // ใช้ฟังก์ชัน logout จาก Context
                className="text-blue-400 hover:underline ml-2"
              >
                Logout
              </button>
            </div>
            </div>
          ) : (
            <div className="container mx-auto px-4 py-4 text-center">
              Welcome to Budget App!
            </div>
          )}
        
      
    </nav>
  );
};

export default Navbar;
