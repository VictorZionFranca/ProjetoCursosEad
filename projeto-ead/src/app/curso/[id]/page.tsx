"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";

export default function CursoPage() {
  const { id } = useParams();
  const [curso, setCurso] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurso = async () => {
      try {
        const cursoRef = doc(db, "Cursos", id as string);
        const cursoSnap = await getDoc(cursoRef);

        if (cursoSnap.exists()) {
          setCurso(cursoSnap.data());
        } else {
          console.log("Curso não encontrado");
        }
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar curso:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchCurso();
    }
  }, [id]);

  if (loading) return <div className="p-10">Carregando...</div>;
  if (!curso) return <div className="p-10">Curso não encontrado.</div>;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 text-gray-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Esquerda - Informações */}
        <div className="md:col-span-2 space-y-6 ">
          <h1 className="text-4xl font-bold font-gothic">{curso.titulo}</h1>
          <p className="text-lg text-gray-700">{curso.descricao}</p>
        </div>

        {/* Direita - Card */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {curso.imagem && (
            <img
              src={curso.imagem}
              alt={curso.titulo}
              className="w-full h-52 object-cover"
            />
          )}
          <div className="p-6">
            <p className="text-2xl font-bold text-gray-900 mb-4">
              R$ {curso.preco?.toFixed(2)}
            </p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition">
              Comprar curso agora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
