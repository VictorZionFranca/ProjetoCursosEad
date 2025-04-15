"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import Header from "./header";
import type { User as FirebaseUser } from "firebase/auth";

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false); // Finaliza o carregamento após verificar o estado de autenticação

      // Se o usuário não estiver autenticado e estiver na página de login ou signup, redireciona para a página inicial
      if (firebaseUser && (pathname === "/login" || pathname === "/signup")) {
        router.push("/inicio"); // Redireciona para a página inicial após login
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);

  if (loading) {
    return null; 
  }

  // Permite acessar as páginas públicas ("/", "/login", "/signup") sem autenticação
  if (pathname === "/" || pathname === "/login" || pathname === "/signup") {
    return <>{children}</>;
  }

  // Se o usuário não estiver autenticado e tentar acessar uma página protegida, renderiza nada
  if (!user) {
    return null;
  }

  return (
    <>
      {/* Exibe o Header apenas nas páginas que não são de login ou cadastro */}
      {user && pathname !== "/login" && pathname !== "/signup" && (
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} user={user} />
      )}
      <main>{children}</main>
    </>
  );
}
