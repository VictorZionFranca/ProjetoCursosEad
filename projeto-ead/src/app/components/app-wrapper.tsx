"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import Header from "./header";
import Footer from "./footer"; // Importa o Footer
import type { User as FirebaseUser } from "firebase/auth";

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);

      if (firebaseUser && (pathname === "/login" || pathname === "/signup")) {
        router.push("/inicio");
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);

  if (loading) return null;

  // Páginas públicas sem header/footer
  const isPublicPage = pathname === "/" || pathname === "/login" || pathname === "/signup";
  if (isPublicPage) return <>{children}</>;

  // Proteção de rota
  if (!user) return null;

  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} user={user} />
      <main>{children}</main>
      <Footer /> {/* Adiciona o Footer aqui */}
    </>
  );
}
