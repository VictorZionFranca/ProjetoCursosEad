// app/components/footer.tsx

export default function Footer() {
    return (
      <footer className="bg-gray-900 text-gray-400 text-sm mt-12 border-t">
        <div className="max-w-[105rem] mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Coluna 1 */}
          <div>
            <h3 className="text-white font-semibold mb-4">Sobre o Sistema EAD</h3>
            <p className="text-gray-400">
              Uma plataforma de aprendizado online moderna, intuitiva e acessível para todos os públicos.
            </p>
          </div>
  
          {/* Coluna 2 */}
          <div>
            <h3 className="text-white font-semibold mb-4">Links úteis</h3>
            <ul className="space-y-2">
              <li><a href="/sobre" className="hover:underline">Sobre</a></li>
              <li><a href="/contato" className="hover:underline">Contato</a></li>
              <li><a href="/termos" className="hover:underline">Termos de Uso</a></li>
              <li><a href="/privacidade" className="hover:underline">Política de Privacidade</a></li>
            </ul>
          </div>
  
          {/* Coluna 3 */}
          <div>
            <h3 className="text-white font-semibold mb-4">Redes sociais</h3>
            <ul className="space-y-2">
              <li><a href="/inicio" className="hover:underline">Instagram</a></li>
              <li><a href="/inicio" className="hover:underline">Facebook</a></li>
              <li><a href="/inicio" className="hover:underline">LinkedIn</a></li>
            </ul>
          </div>
        </div>
  
        {/* Parte inferior */}
        <div className="border-t border-gray-700 text-center py-6 text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Sistema EAD. Todos os direitos reservados.
        </div>
      </footer>
    );
  }
  