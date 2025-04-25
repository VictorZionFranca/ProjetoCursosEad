"use client";

import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";

export default function Aprendizado() {
  const [cursos, setCursos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCursosComprados = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const userRef = doc(db, "Users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          // Buscar os cursos no campo 'aprendizado' (onde eles são armazenados após a compra)
          const cursosComprados = userDoc.data()?.aprendizado || [];

          // Garante que cada curso tenha um ID e progresso (evita erro de key e undefined)
          const cursosCompletos = cursosComprados.map(
            (curso: any, index: number) => ({
              id: curso.id || `curso_${index}`, // fallback se faltar ID
              titulo: curso.titulo || "Curso sem título",
              imagem: curso.imagem || "",
              progresso: curso.progresso || 0,
            })
          );

          setCursos(cursosCompletos);
        }
      } catch (error) {
        console.error("Erro ao carregar os cursos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCursosComprados();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-700">
        <p className="text-xl font-medium animate-pulse">
          Carregando cursos...
        </p>
      </div>
    );

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 text-gray-800 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Meu Aprendizado</h1>

        {cursos.length === 0 ? (
          <div className="flex flex-col justify-center mt-10">
            <div className="flex-grow flex items-center justify-center">
              <p className="text-center text-gray-500">
                Você não possui nenhum curso!
              </p>
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cursos.map((curso) => (
              <Link key={curso.id} href={`/curso/${curso.id}/conteudo`}>
                <div className="bg-white shadow-lg rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition">
                  {curso.imagem && (
                    <img
                      src={curso.imagem}
                      alt={curso.titulo}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2">{curso.titulo}</h2>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-green-500 h-3 rounded-full transition-all"
                        style={{ width: `${curso.progresso}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {curso.progresso}% concluído
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
