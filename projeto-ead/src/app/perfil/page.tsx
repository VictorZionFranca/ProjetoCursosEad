"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../firebase/config";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function PerfilPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [foto, setFoto] = useState("");

  const [feedback, setFeedback] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
        setEmail(user.email || "");
        setNome(user.displayName || "");

        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setBio(data.bio || "");
          setFoto(data.foto || "");
        }
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSalvar = async () => {
    if (!user) return;

    if (foto.length > 1024) {
      setFeedback({ message: "A URL da foto é muito longa!", type: "error" });
      setTimeout(() => setFeedback(null), 2000);
      return;
    }

    try {
      await updateProfile(user, {
        displayName: nome,
        photoURL: foto,
      });

      await setDoc(doc(db, "Users", user.uid), {
        bio,
        foto,
      });

      setFeedback({ message: "Perfil atualizado com sucesso!", type: "success" });
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      setFeedback({ message: "Erro ao atualizar perfil.", type: "error" });
    } finally {
      setTimeout(() => setFeedback(null), 2000);
    }
  };

  if (loading) return <div className="p-10">Carregando...</div>;

  // Função para gerar as iniciais (primeiras duas letras do nome)
  const getIniciais = (nome: string) => {
    const palavras = nome.split(" ");
    const iniciais = palavras
      .slice(0, 2)
      .map((palavra) => palavra.charAt(0).toUpperCase())
      .join("");
    return iniciais || "?";
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 text-gray-800">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 font-gothic">Editar Perfil</h1>

        {/* Feedback de sucesso ou erro */}
        {feedback && (
          <div
            className={`mb-4 px-4 py-3 rounded transition-opacity duration-500 ${
              feedback.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {feedback.message}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-6">
          {/* Foto de Perfil */}
          <div className="flex flex-col items-center md:items-start">
            <div className="w-32 h-32 rounded-full border border-gray-300 bg-gray-200 flex items-center justify-center overflow-hidden">
              {foto ? (
                <img
                  src={foto}
                  alt="Foto de Perfil"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-700 font-bold text-lg">
                  {getIniciais(nome)}
                </span>
              )}
            </div>
            <input
              type="text"
              placeholder="URL da foto"
              value={foto}
              onChange={(e) => setFoto(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full mt-4"
            />
          </div>

          {/* Informações do Perfil */}
          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nome</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                disabled
                className="border border-gray-200 bg-gray-100 rounded px-3 py-2 w-full cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Biografia</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>

            <button
              onClick={handleSalvar}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition"
            >
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
