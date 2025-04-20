"use client";

import { useState, useEffect } from "react";

export default function Contato() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    const response = await fetch("https://formspree.io/f/xdkerqnz", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
    }
  };

  useEffect(() => {
    if (status === "success" || status === "error") {
      const timer = setTimeout(() => {
        setStatus("idle");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Entre em Contato</h1>
      <p className="text-gray-600 text-center mb-8">
        Tem dúvidas, sugestões ou precisa de ajuda? Envie uma mensagem e responderemos o mais rápido possível.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
        <div>
          <label htmlFor="nome" className="block font-medium text-gray-700">Nome</label>
          <input
            type="text"
            name="nome"
            id="nome"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label htmlFor="mensagem" className="block font-medium text-gray-700">Mensagem</label>
          <textarea
            name="mensagem"
            id="mensagem"
            rows={5}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
        >
          {status === "sending" ? "Enviando..." : "Enviar Mensagem"}
        </button>

        {status === "success" && (
          <p className="text-green-600 text-sm mt-2 text-center">Mensagem enviada com sucesso!</p>
        )}
        {status === "error" && (
          <p className="text-red-600 text-sm mt-2 text-center">Ocorreu um erro ao enviar. Tente novamente.</p>
        )}
      </form>
    </div>
  );
}
