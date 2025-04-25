"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase/config";

export default function ConteudoCurso() {
  const { id } = useParams();
  const [curso, setCurso] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurso = async () => {
      try {
        const docRef = doc(db, "Cursos", id as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCurso(docSnap.data());
        }
      } catch (error) {
        console.error("Erro ao carregar conteúdo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurso();
  }, [id]);
  
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-700">
        <p className="text-xl font-medium animate-pulse">
          Carregando cursos...
        </p>
      </div>
    );

  if (!curso) return <p className="text-center mt-10">Curso não encontrado.</p>;

  return (
    <div className="min-h-screen bg-white px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{curso.titulo}</h1>
        <p className="text-gray-700 mb-4">{curso.descricao}</p>

        <div className="bg-gray-100 p-6 rounded-lg shadow mt-6">
          <h2 className="text-xl font-semibold mb-2">Conteúdo do curso</h2>
          <p className="text-sm text-gray-600">Em breve: lista de aulas, vídeos e materiais...</p>
        </div>
      </div>
    </div>
  );
}
