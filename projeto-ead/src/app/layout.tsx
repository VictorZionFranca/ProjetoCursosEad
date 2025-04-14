import './globals.css'

export const metadata = {
  title: 'Sistema EAD',
  description: 'Plataforma de cursos online',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  )
}
