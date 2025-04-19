"use client";

import React from "react";

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-6 py-12 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">Sobre o Sistema EAD</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Nossa Missão</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          No Sistema EAD, nossa missão é democratizar o acesso à educação de qualidade por meio da tecnologia.
          Acreditamos que o conhecimento é uma ferramenta poderosa para transformar vidas e abrir portas para o futuro.
          Com isso em mente, desenvolvemos uma plataforma intuitiva, acessível e eficiente, voltada para todos que desejam
          aprender de forma prática e dinâmica, em qualquer lugar do mundo.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Como Surgiu a Plataforma</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          A ideia do Sistema EAD nasceu da necessidade de criar uma solução moderna para o ensino a distância.
          Vimos o quanto era difícil para estudantes encontrarem uma plataforma que fosse ao mesmo tempo simples de usar,
          rica em conteúdo e acessível financeiramente. Assim, unimos tecnologia, design e pedagogia para criar algo
          realmente útil e completo.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">O que Oferecemos</h2>
        <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed">
          <li>Cursos online de diversas áreas com acesso vitalício;</li>
          <li>Interface amigável e pensada para todos os dispositivos (responsiva);</li>
          <li>Área do aluno personalizada para acompanhar o progresso;</li>
          <li>Certificados de conclusão ao término de cada curso;</li>
          <li>Suporte ao aluno e atualizações constantes.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Nosso Compromisso</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Estamos comprometidos em manter altos padrões de qualidade, sempre ouvindo a comunidade e evoluindo com base
          nas suas necessidades. Nosso time trabalha com dedicação para que cada detalhe da plataforma ofereça uma
          experiência única e enriquecedora.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Junte-se a Nós!</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Seja você um estudante, professor ou apaixonado por conhecimento, o Sistema EAD está aqui para te apoiar
          na sua jornada de aprendizado. Continue explorando, aprendendo e evoluindo com a gente. Juntos, podemos
          construir um futuro com mais oportunidades para todos.
        </p>
      </section>
    </div>
  );
}
