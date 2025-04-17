"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [cursos, setCursos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const cursosRef = collection(db, "Cursos");
        const cursosSnapshot = await getDocs(cursosRef);
        const cursosColetados = cursosSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCursos(cursosColetados);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar cursos:", error);
        setLoading(false);
      }
    };

    if (user) {
      fetchCursos();
    }
  }, [user]);

  if (!user || loading) return null;

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <main className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-20">Cursos disponíveis</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cursos.length === 0 ? (
            <p>Nenhum curso encontrado.</p>
          ) : (
            cursos.map((curso) => (
              <Link
                href={`/curso/${curso.id}`}
                key={curso.id}
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col w-[300px] h-[360px] font-gothic hover:shadow-xl transition duration-300 cursor-pointer"
              >
                {curso.imagem && (
                  <img
                    src={curso.imagem}
                    alt={curso.titulo}
                    className="w-full h-[172px] object-cover"
                  />
                )}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-md font-semibold mb-2">
                    {truncateText(curso.titulo, 30)}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 flex-1">
                    {truncateText(curso.descricao, 80)}
                  </p>
                  <p className="text-black font-bold">R$ {curso.preco?.toFixed(2)}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
