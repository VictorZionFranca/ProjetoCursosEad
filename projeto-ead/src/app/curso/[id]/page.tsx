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
  const [jaAdicionado, setJaAdicionado] = useState(false);
  const [jaComprado, setJaComprado] = useState(false);
  const [noAprendizado, setNoAprendizado] = useState(false); // Adicionando estado para verificar se já está no aprendizado

  useEffect(() => {
    const fetchCurso = async () => {
      if (!id) return;

      try {
        const docRef = doc(db, "Cursos", id as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCurso({ id: docSnap.id, ...docSnap.data() }); // Adicionando o ID aqui
        }
      } catch (error) {
        console.error("Erro ao buscar curso:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurso();
  }, [id]);

  useEffect(() => {
    const checkCarrinhoECursoComprado = async () => {
      const user = auth.currentUser;
      if (!user || !curso) return;

      try {
        const userRef = doc(db, "Users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const carrinho = userDoc.data()?.carrinho || [];
          const cursosComprados = userDoc.data()?.cursosComprados || [];
          const aprendizado = userDoc.data()?.aprendizado || []; // Verificando o aprendizado

          // Verifica se o curso já foi adicionado ao carrinho ou comprado
          const cursoNoCarrinho = carrinho.some(
            (item: any) => item.id === curso.id
          );
          const cursoComprado = cursosComprados.some(
            (item: any) => item.id === curso.id
          );
          const cursoNoAprendizado = aprendizado.some(
            (item: any) => item.id === curso.id
          );

          setJaAdicionado(cursoNoCarrinho);
          setJaComprado(cursoComprado);
          setNoAprendizado(cursoNoAprendizado); // Atualizando estado se o curso já está no aprendizado
        }
      } catch (error) {
        console.error("Erro ao verificar o carrinho e cursos comprados:", error);
      }
    };

    checkCarrinhoECursoComprado();
  }, [curso]);

  const adicionarAoCarrinho = async () => {
    const user = auth.currentUser;
    if (!user || !curso) return;

    setAdicionando(true);

    try {
      const userRef = doc(db, "Users", user.uid);
      await updateDoc(userRef, {
        carrinho: arrayUnion({
          id: curso.id,
          titulo: curso.titulo,
          descricao: curso.descricao,
          imagem: curso.imagem,
          preco: curso.preco,
        }),
      });
      setSucesso(true);
      setJaAdicionado(true); // Marca como adicionado ao carrinho
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
    } finally {
      setAdicionando(false);
    }
  };

  const handleComprarAgora = () => {
    if (!curso?.id || loading) return; // Verifica se está carregando antes de redirecionar
    router.push(`/checkout?cursoId=${curso.id}`);
  };

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

            {/* Verifica se o curso já foi comprado, está no aprendizado ou adicionado ao carrinho */}
            {jaComprado || noAprendizado ? (
              <p className="text-green-600 text-sm text-center mb-4">
                Você já possui esse curso.
              </p>
            ) : (
              <>
                {jaAdicionado ? (
                  <p className="text-blue-600 text-sm text-center mb-4">
                    Curso adicionado ao carrinho...
                  </p>
                ) : (
                  <button
                    onClick={adicionarAoCarrinho}
                    disabled={adicionando}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition duration-300"
                  >
                    {adicionando ? "Adicionando..." : "Adicionar ao Carrinho"}
                  </button>
                )}

                <button
                  onClick={handleComprarAgora}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition mt-4"
                >
                  Comprar Agora
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
