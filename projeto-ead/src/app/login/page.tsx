"use client";

import { useState } from "react";
import { login } from "../services/auth";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.replace("/inicio");
    } catch (error: any) {
      setErrorMessage("Email ou senha inválidos!");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-12 text-center">Bem-vindo de volta!</h1>
      
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Imagem visível apenas em telas grandes */}
        <img
          src="/images/cursos2.png"
          alt=""
          className="hidden lg:block w-[800px] h-[260px] rounded-tr-full object-cover"
        />

        <div className="max-w-md w-full bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Login
          </h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="seuemail@exemplo.com"
                required
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="********"
                required
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-4 transform cursor-pointer"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5 text-gray-800" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-gray-800" />
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Entrar
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-4">
            Ainda não tem uma conta?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Cadastre-se
            </a>
          </p>
        </div>
      </div>

      {/* Mensagem de erro */}
      {errorMessage && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
