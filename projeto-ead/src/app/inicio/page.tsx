"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

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

  if (!user) return null; // Espera o usuário estar autenticado antes de renderizar

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Conteúdo */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-6">Cursos disponíveis</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Curso de HTML e CSS",
              desc: "Aprenda a construir sites modernos do zero.",
            },
            {
              title: "JavaScript Essencial",
              desc: "Domine a linguagem da web com aulas práticas.",
            },
            {
              title: "React para Iniciantes",
              desc: "Construa aplicações web com React e componentes.",
            },
          ].map((curso, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">{curso.title}</h3>
              <p className="text-gray-600">{curso.desc}</p>
              <button className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                Acessar curso
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
