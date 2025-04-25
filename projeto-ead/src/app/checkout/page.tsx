"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Importando o getAuth para autenticação
import { db } from "../../firebase/config";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const cursoId = searchParams.get("cursoId");
  const cursosIds = searchParams.get("cursos");
  const router = useRouter();

  const [cursos, setCursos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCursos = async () => {
      setLoading(true);

      try {
        if (cursoId) {
          const docRef = doc(db, "Cursos", cursoId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setCursos([{ ...docSnap.data(), id: docSnap.id }]);
          }
        } else if (cursosIds) {
          const cursosArray = JSON.parse(decodeURIComponent(cursosIds));

          const cursosData = await Promise.all(
            cursosArray.map(async (id: string) => {
              const docRef = doc(db, "Cursos", id);
              const docSnap = await getDoc(docRef);
              if (docSnap.exists()) {
                return { ...docSnap.data(), id };
              } else {
                return null;
              }
            })
          );
          setCursos(cursosData.filter((curso) => curso !== null));
        }
      } catch (error) {
        console.error("Erro ao carregar cursos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();
  }, [cursoId, cursosIds]);

  const handleFinalizarCompra = async () => {
    const auth = getAuth(); // Inicializando o auth
    const user = auth.currentUser;
    if (!user || cursos.length === 0) return;

    try {
      const userRef = doc(db, "Users", user.uid);

      // Obter os dados do usuário para acessar o carrinho e o aprendizado
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) {
        alert("Erro ao acessar os dados do usuário.");
        return;
      }

      const userData = userDoc.data();
      const carrinho = userData?.carrinho || [];
      const aprendizado = userData?.aprendizado || [];

      // Filtrar cursos que já estão no carrinho e que serão comprados
      const cursosParaRemover = cursos.filter((curso) =>
        carrinho.some((item: { id: string }) => item.id === curso.id)
      );

      // Filtrar cursos que já estão no aprendizado e não devem ser adicionados novamente
      const cursosNoAprendizado = cursos.filter((curso) =>
        aprendizado.some((item: { id: string }) => item.id === curso.id)
      );

      // Remover os cursos do carrinho no Firebase
      if (cursosParaRemover.length > 0) {
        await updateDoc(userRef, {
          carrinho: arrayRemove(
            ...cursosParaRemover.map((curso) => ({ id: curso.id }))
          ),
        });
      }

      // Adicionar os cursos ao campo 'aprendizado' do usuário no Firebase, se não estiverem no aprendizado
      await updateDoc(userRef, {
        aprendizado: arrayUnion(
          ...cursos
            .filter(
              (curso) =>
                !cursosNoAprendizado.some((item) => item.id === curso.id)
            ) // Evita adicionar se já no aprendizado
            .map((curso) => ({
              id: curso.id,
              titulo: curso.titulo,
              descricao: curso.descricao,
              imagem: curso.imagem,
              preco: curso.preco,
            }))
        ),
      });

      // Limpar o estado local do carrinho após a compra
      setCursos([]); // Limpar a lista de cursos do carrinho localmente

      alert("Compra finalizada com sucesso!");

      // Redirecionar para a página de aprendizado após a compra
      router.push("/meu-aprendizado");
    } catch (error) {
      console.error("Erro ao finalizar compra:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-700">
        <p className="text-xl font-medium animate-pulse">
          Carregando cursos...
        </p>
      </div>
    );
  }

  if (cursos.length === 0) {
    return <p className="text-center mt-10">Cursos não encontrados.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 text-gray-800">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Finalizar Compra</h1>
        <div className="space-y-4">
          {cursos.map((curso) => (
            <div key={curso.id} className="space-y-2">
              {curso.imagem && (
                <img
                  src={curso.imagem}
                  alt={curso.titulo}
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}
              <h2 className="text-xl font-semibold">{curso.titulo}</h2>
              <p className="text-gray-600">{curso.descricao}</p>
              <p className="text-lg font-bold text-green-700">
                R$ {curso.preco?.toFixed(2)}
              </p>
            </div>
          ))}

          <button
            onClick={handleFinalizarCompra}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
}
