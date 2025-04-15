"use client";

export default function MeuCarrinhoPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <main className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold mb-6">Meu Carrinho</h1>

        <p className="text-lg text-gray-700 mb-6">
          Aqui você pode visualizar os cursos que adicionou ao seu carrinho. Em breve, você poderá realizar a compra!
        </p>

        {/* Exemplo de itens no carrinho */}
        <div className="mt-8 space-y-4">
          {[{ title: "Curso de HTML e CSS", price: "R$ 99,99" },
            { title: "JavaScript Essencial", price: "R$ 149,99" }]
            .map((item, idx) => (
              <div key={idx} className="flex justify-between items-center bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <span className="text-xl font-semibold text-blue-600">{item.price}</span>
              </div>
            ))}
        </div>

        {/* Botão para finalizar compra */}
        <div className="mt-8 text-center">
          <button className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
            Finalizar Compra
          </button>
        </div>
      </main>
    </div>
  );
}
