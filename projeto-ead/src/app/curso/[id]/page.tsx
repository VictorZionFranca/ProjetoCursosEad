"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db, auth } from "../../../firebase/config";

export default function CursoDetalhes() {
  const { id } = useParams();
  const router = useRouter();
  const [curso, setCurso] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [adicionando, setAdicionando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  useEffect(() => {
    const fetchCurso = async () => {
      if (!id) return;

      try {
        const docRef = doc(db, "Cursos", id as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCurso(docSnap.data());
        }
      } catch (error) {
        console.error("Erro ao buscar curso:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurso();
  }, [id]);

  const adicionarAoCarrinho = async () => {
    const user = auth.currentUser;
    if (!user || !curso) return;

    setAdicionando(true);

    try {
      const userRef = doc(db, "Users", user.uid);
      await updateDoc(userRef, {
        carrinho: arrayUnion({
          titulo: curso.titulo,
          descricao: curso.descricao,
          imagem: curso.imagem,
          preco: curso.preco,
        }),
      });
      setSucesso(true);
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
    } finally {
      setAdicionando(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Carregando...</p>;
  if (!curso) return <p className="text-center mt-10">Curso não encontrado.</p>;

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 text-gray-800 min-h-screen">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-12">
        {/* Coluna da esquerda */}
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-3xl font-bold">{curso.titulo}</h1>
          <p className="text-gray-600 text-lg">{curso.descricao}</p>
        </div>

        {/* Coluna da direita (card de compra) */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          {curso.imagem && (
            <img
              src={curso.imagem}
              alt={curso.titulo}
              className="w-full h-[200px] object-cover"
            />
          )}
          <div className="p-6">
            <p className="text-2xl font-bold text-gray-900 mb-4">
              R$ {curso.preco?.toFixed(2)}
            </p>
            <button
              onClick={adicionarAoCarrinho}
              disabled={adicionando}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-300"
            >
              {adicionando ? "Adicionando..." : "Adicionar ao Carrinho"}
            </button>

            {sucesso && (
              <p className="text-green-600 text-sm mt-4">
                Curso adicionado ao carrinho com sucesso!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
