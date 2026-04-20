import type { Metadata } from "next"
import { Inter, Roboto, Lato, Merriweather, Libre_Baskerville } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-roboto" })
const lato = Lato({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-lato" })
const merriweather = Merriweather({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-merriweather" })
const libreBaskerville = Libre_Baskerville({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-libre-baskerville" })

const clasesVariablesFuentes = [
  inter.variable,
  roboto.variable,
  lato.variable,
  merriweather.variable,
  libreBaskerville.variable,
].join(" ")

const SITE_URL = "https://curriculum-gratis.cl"
const TITLE = "Curriculum Gratis - Crea tu CV Profesional y Descargalo en PDF"
const DESCRIPTION =
  "Creador de curriculum vitae 100% gratuito. Sin registro, sin pagos, sin trucos. Elige entre 4 plantillas profesionales, personaliza colores y descarga tu CV en PDF al instante. La herramienta mas simple para buscar trabajo."

export const metadata: Metadata = {
  title: {
    default: TITLE,
    template: "%s | Curriculum Gratis",
  },
  description: DESCRIPTION,
  keywords: [
    "curriculum gratis",
    "curriculum vitae gratis",
    "cv gratis",
    "crear curriculum",
    "crear cv",
    "curriculum pdf",
    "curriculum online",
    "plantilla curriculum",
    "curriculum profesional",
    "hacer curriculum gratis",
    "generador de curriculum",
    "curriculum sin registro",
    "curriculum chile",
    "curriculum latinoamerica",
    "curriculum descargar pdf",
  ],
  authors: [{ name: "Curriculum Gratis" }],
  creator: "Curriculum Gratis",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Curriculum Gratis",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.className} ${clasesVariablesFuentes}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("tema");var d=t==="oscuro"||(t!=="claro"&&matchMedia("(prefers-color-scheme:dark)").matches);if(d)document.documentElement.classList.add("dark")}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-screen bg-zinc-50 dark:bg-zinc-950 antialiased">{children}</body>
    </html>
  )
}
