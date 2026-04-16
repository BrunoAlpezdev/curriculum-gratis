import type {
  DatosCurriculum,
  NivelIdioma,
  ColorTema,
  PlantillaId,
  FuenteId,
  Personalizacion,
} from "@/types"

export const NIVELES_IDIOMA: { valor: NivelIdioma; etiqueta: string }[] = [
  { valor: "basico", etiqueta: "Basico" },
  { valor: "intermedio", etiqueta: "Intermedio" },
  { valor: "avanzado", etiqueta: "Avanzado" },
  { valor: "nativo", etiqueta: "Nativo" },
]

export const COLORES_TEMA: {
  valor: ColorTema
  etiqueta: string
  clase: string
  hex: string
} [] = [
  { valor: "azul", etiqueta: "Azul", clase: "bg-blue-600", hex: "#2563eb" },
  { valor: "verde", etiqueta: "Verde", clase: "bg-emerald-600", hex: "#059669" },
  { valor: "rojo", etiqueta: "Rojo", clase: "bg-red-600", hex: "#dc2626" },
  { valor: "morado", etiqueta: "Morado", clase: "bg-purple-600", hex: "#9333ea" },
  { valor: "teal", etiqueta: "Teal", clase: "bg-teal-600", hex: "#0d9488" },
  { valor: "naranja", etiqueta: "Naranja", clase: "bg-orange-600", hex: "#ea580c" },
  { valor: "gris", etiqueta: "Gris", clase: "bg-gray-700", hex: "#374151" },
]

export const PLANTILLAS: { valor: PlantillaId; etiqueta: string; descripcion: string; ats: boolean }[] = [
  { valor: "clasico", etiqueta: "Clasico (ATS)", descripcion: "Estilo Harvard — legible por sistemas ATS", ats: true },
  { valor: "moderno", etiqueta: "Moderno", descripcion: "Sidebar con iconos y color", ats: false },
  { valor: "colorido", etiqueta: "Colorido", descripcion: "Header grande con formas decorativas", ats: false },
  { valor: "minimalista", etiqueta: "Minimalista (ATS)", descripcion: "Plano y elegante — legible por sistemas ATS", ats: true },
]

export const FUENTES: { valor: FuenteId; etiqueta: string; tipo: string; jsPdf: string }[] = [
  { valor: "inter", etiqueta: "Inter", tipo: "Sans-serif", jsPdf: "helvetica" },
  { valor: "roboto", etiqueta: "Roboto", tipo: "Sans-serif", jsPdf: "helvetica" },
  { valor: "lato", etiqueta: "Lato", tipo: "Sans-serif", jsPdf: "helvetica" },
  { valor: "merriweather", etiqueta: "Merriweather", tipo: "Serif", jsPdf: "times" },
  { valor: "libre-baskerville", etiqueta: "Libre Baskerville", tipo: "Serif", jsPdf: "times" },
]

export const FUENTE_CSS: Record<FuenteId, string> = {
  inter: "var(--font-inter)",
  roboto: "var(--font-roboto)",
  lato: "var(--font-lato)",
  merriweather: "var(--font-merriweather)",
  "libre-baskerville": "var(--font-libre-baskerville)",
}

export const PERSONALIZACION_INICIAL: Personalizacion = {
  color: "azul",
  plantilla: "moderno",
  fuente: "inter",
}

export const DATOS_INICIALES: DatosCurriculum = {
  datosPersonales: {
    nombreCompleto: "",
    titulo: "",
    email: "",
    telefono: "",
    ubicacion: "",
  },
  perfil: "",
  experiencia: [],
  educacion: [],
  habilidades: [],
  idiomas: [],
}
