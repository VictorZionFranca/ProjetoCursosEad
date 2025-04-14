export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Sistema EAD</h1>
          <div className="flex space-x-4">
            <a
              href="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </a>
            <a
              href="/signup"
              className="border-2 border-blue-700 text-blue-700 px-4 py-2 hover:bg-blue-700 hover:text-white rounded-md transition"
            >
              Registrar-se
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 py-20 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Text content */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Sua plataforma completa de <span className="text-blue-600">cursos online</span>
          </h2>
          <p className="text-lg md:text-xl mb-8 text-gray-600">
            Organize aulas, acompanhe o progresso de alunos e ofereça conteúdos de qualidade em um só lugar.
          </p>
          <a
            href="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition"
          >
            Acessar plataforma
          </a>
        </div>

        {/* Image */}
        <div className="flex-1 mt-10 md:mt-0">
          <img
            src="/images/curso-online.png"
            alt="Cursos online"
            className="rounded-lg w-full object-cover max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto"
          />
        </div>
      </main>

      {/* About the System Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">O que nosso sistema oferece?</h3>
          <p className="text-lg text-gray-600 mb-8">
            Nosso sistema foi projetado para ajudar você a gerenciar seus cursos de maneira fácil e eficiente.
            Com uma interface intuitiva e diversas ferramentas, você pode focar no que realmente importa: o aprendizado.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Gestão de Aulas</h4>
              <p className="text-gray-600">
                Organize suas aulas com facilidade, crie conteúdos interativos, e disponibilize-os para seus alunos de forma simples.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Progresso dos Alunos</h4>
              <p className="text-gray-600">
                Acompanhe o progresso dos seus alunos em tempo real, veja relatórios detalhados e melhore sua abordagem de ensino.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Conteúdos Personalizados</h4>
              <p className="text-gray-600">
                Ofereça conteúdos ricos e personalizados, adaptados ao nível e interesse dos seus alunos, proporcionando uma experiência única.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-600 text-white py-16 px-4 text-center">
        <h3 className="text-3xl font-bold mb-4">Pronto para começar a aprender?</h3>
        <p className="text-lg mb-6">
          Cadastre-se agora e tenha acesso a uma plataforma de ensino completa, com cursos, aulas interativas e muito mais.
        </p>
        <a
          href="/signup"
          className="bg-white text-blue-600 px-6 py-3 rounded-md text-lg font-medium hover:bg-gray-200 transition"
        >
          Criar conta
        </a>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-6 mt-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h4 className="text-lg font-bold">Sistema EAD</h4>
            <p className="text-sm text-gray-400 mt-2">© 2025 Todos os direitos reservados</p>
          </div>
          <div className="flex space-x-6">
            <a href="/about" className="text-sm text-gray-400 hover:text-white">Sobre nós</a>
            <a href="/contact" className="text-sm text-gray-400 hover:text-white">Contato</a>
            <a href="/privacy" className="text-sm text-gray-400 hover:text-white">Política de Privacidade</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
