import '../app/globals.css';  // Importando o arquivo de estilos globais com o Tailwind
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
