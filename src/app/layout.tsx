import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Curriculum Gratis - Crea tu CV profesional sin costo",
  description:
    "Creador de curriculum vitae 100% gratuito. Sin cuentas, sin pagos, sin trucos. Crea tu CV profesional y descargalo en PDF.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={inter.className}>
      <body className="min-h-screen bg-zinc-50 antialiased">{children}</body>
    </html>
  )
}
