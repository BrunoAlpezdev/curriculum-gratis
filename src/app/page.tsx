import { Editor } from "@/editor/Editor"

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Curriculum Gratis",
  url: "https://curriculum-gratis.cl",
  description:
    "Creador de curriculum vitae 100% gratuito. Sin registro, sin pagos, sin trucos. Elige entre 4 plantillas profesionales, personaliza colores y descarga tu CV en PDF al instante.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "CLP",
  },
  featureList: [
    "Crear curriculum vitae gratis",
    "4 plantillas profesionales",
    "7 colores personalizables",
    "Descarga en PDF",
    "Sin registro ni cuenta",
    "Datos guardados en tu navegador",
  ],
  inLanguage: "es",
}

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Es realmente gratis crear un curriculum?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Si, 100% gratis. No pedimos registro, no hay pagos ocultos, no hay marcas de agua. Creas tu CV y lo descargas en PDF sin costo.",
      },
    },
    {
      "@type": "Question",
      name: "¿Necesito crear una cuenta?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Tus datos se guardan automaticamente en tu navegador. No necesitas cuenta, email ni contrasena.",
      },
    },
    {
      "@type": "Question",
      name: "¿Puedo descargar mi curriculum en PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Si. Haz click en Descargar PDF y se descarga automaticamente. El PDF es de alta calidad, listo para enviar a empleadores.",
      },
    },
    {
      "@type": "Question",
      name: "¿Que plantillas de curriculum tienen disponibles?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tenemos 4 plantillas: Clasico (estilo Harvard), Moderno (con sidebar), Colorido (con header grande y formas decorativas), y Minimalista (plano y elegante). Todas son personalizables con 7 colores.",
      },
    },
  ],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />

      {/* Contenido SEO — visible para Google, oculto visualmente */}
      <div className="sr-only">
        <h1>Curriculum Gratis — Crea tu CV Profesional y Descargalo en PDF</h1>
        <p>
          El creador de curriculum vitae mas simple y gratuito. Sin registro, sin
          pagos, sin trucos. Perfecto para buscar trabajo en Chile y
          Latinoamerica.
        </p>
        <h2>Crea tu curriculum en minutos</h2>
        <p>
          Llena tus datos personales, experiencia laboral, educacion,
          habilidades e idiomas. Ve la vista previa en tiempo real y descarga tu
          CV profesional en PDF con un click.
        </p>
        <h2>4 plantillas profesionales gratuitas</h2>
        <ul>
          <li>Clasico — Estilo Harvard, limpio y profesional</li>
          <li>Moderno — Sidebar con iconos y color</li>
          <li>Colorido — Header grande con formas decorativas</li>
          <li>Minimalista — Plano y elegante, sin adornos</li>
        </ul>
        <h2>Personaliza tu curriculum</h2>
        <p>
          Elige entre 7 colores de acento: azul, verde, rojo, morado, teal,
          naranja y gris. Cambia de plantilla con un click y ve los cambios al
          instante.
        </p>
        <h2>Preguntas frecuentes</h2>
        <h3>¿Es realmente gratis crear un curriculum?</h3>
        <p>
          Si, 100% gratis. No pedimos registro, no hay pagos ocultos, no hay
          marcas de agua. Creas tu CV y lo descargas en PDF sin costo.
        </p>
        <h3>¿Necesito crear una cuenta?</h3>
        <p>
          No. Tus datos se guardan automaticamente en tu navegador. No necesitas
          cuenta, email ni contrasena.
        </p>
        <h3>¿Puedo descargar mi curriculum en PDF?</h3>
        <p>
          Si. Haz click en Descargar PDF y se descarga automaticamente. El PDF
          es de alta calidad, listo para enviar a empleadores.
        </p>
      </div>

      <Editor />
    </>
  )
}
