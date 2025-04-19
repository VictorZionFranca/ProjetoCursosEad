"use client";

import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function MeuCarrinhoPage() {
  const [carrinho, setCarrinho] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCarrinho = async () => {
      const user = auth.currentUser;
      if (!user) {
        router.push("/login");
        return;
      }

      try {
        const userRef = doc(db, "Users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setCarrinho(data.carrinho || []);
        }
      } catch (error) {
        console.error("Erro ao buscar carrinho:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarrinho();
  }, [router]);

  const removerDoCarrinho = async (index: number) => {
    const user = auth.currentUser;
    if (!user) return;

    const novoCarrinho = [...carrinho];
    novoCarrinho.splice(index, 1);

    try {
      const userRef = doc(db, "Users", user.uid);
      await updateDoc(userRef, { carrinho: novoCarrinho });
      setCarrinho(novoCarrinho);
    } catch (error) {
      console.error("Erro ao remover curso do carrinho:", error);
    }
  };

  if (loading) return <p className="text-center mt-10">Carregando...</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 text-gray-800">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-10">Meu Carrinho</h1>

        {carrinho.length === 0 ? (
          <p className="text-center text-gray-500">Seu carrinho está vazio.</p>
        ) : (
          <div className="space-y-6">
            {carrinho.map((curso, index) => (
              <div
                key={index}
                className="bg-white shadow-sm rounded-xl p-4 flex items-center justify-between hover:shadow-md transition"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={curso.imagem}
                    alt={curso.titulo}
                    className="w-[120px] h-[65px] object-cover rounded"
                  />
                  <div>
                    <h2 className="font-semibold text-md">{curso.titulo}</h2>
                    <p className="text-sm text-gray-600 line-clamp-2 max-w-lg">
                      {curso.descricao}
                    </p>
                    <p className="text-sm text-blue-600 font-bold mt-1">
                      R$ {curso.preco.toFixed(2)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removerDoCarrinho(index)}
                  className="text-red-500 text-sm font-medium hover:underline"
                >
                  Remover
                </button>
              </div>
            ))}

            <div className="text-right mt-6">
              <p className="text-xl font-bold">
                Total: R${" "}
                {carrinho.reduce((acc, curso) => acc + curso.preco, 0).toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
