"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { auth } from "../../firebase/config";
import type { User as FirebaseUser } from "firebase/auth";

type HeaderProps = {
  user: FirebaseUser | null; // Permite que user seja null
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Header({ user, menuOpen, setMenuOpen }: HeaderProps) {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fecha o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen, setMenuOpen]);

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-[105rem] mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/inicio">
          <h1 className="text-xl font-bold">Sistema EAD</h1>
        </a>
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md hover:bg-gray-100 transition"
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                ref={dropdownRef}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-[220px] bg-white shadow-lg rounded-lg z-50 py-4 px-6 border-gray-200 border-2"
              >
                {user ? (
                  <>
                    <button
                      onClick={() => router.push("/perfil")}
                      className="block w-full text-left text-lg font-semibold text-gray-800 hover:underline hover:text-blue-600 transition truncate"
                    >
                      {user.displayName || "Usuário sem nome"}
                    </button>
                    <p className="text-xs text-gray-500 mb-4 truncate">
                      {user.email || "Email não disponível"}
                    </p>
                    <ul className="space-y-2 border-t-2 border-gray-300 pt-3">
                      <li>
                        <a
                          href="/meu-aprendizado"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          Meu aprendizado
                        </a>
                      </li>
                      <li>
                        <a
                          href="/meu-carrinho"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          Meu carrinho
                        </a>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="text-sm text-red-600 hover:underline"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <p>Usuário não autenticado</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
