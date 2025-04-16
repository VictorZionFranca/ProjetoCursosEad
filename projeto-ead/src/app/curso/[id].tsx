// app/curso/[id].tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

export default function CursoDetalhes() {
  const { id } = useParams();
  const [curso, setCurso] = useState<any>(null);

  useEffect(() => {
    const fetchCurso = async () => {
      if (!id) return;
      const docRef = doc(db, "Cursos", id as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCurso(docSnap.data());
      }
    };
    fetchCurso();
  }, [id]);

  if (!curso) return <p>Carregando...</p>;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
      <h1 className="text-3xl font-bold mb-4">{curso.titulo}</h1>
      <img src={curso.imagem} alt={curso.titulo} className="w-full max-w-xl mb-6" />
      <p className="text-lg text-gray-700 mb-4">{curso.descricao}</p>
      <p className="text-blue-600 font-bold text-xl">R$ {curso.preco?.toFixed(2)}</p>
    </div>
  );
}
