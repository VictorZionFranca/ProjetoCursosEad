// src/app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import AppWrapper from "./components/app-wrapper";

export const metadata = {
  title: "Sistema EAD",
  description: "Plataforma de cursos online",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
