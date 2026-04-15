import type {
  DatosCurriculum,
  NivelIdioma,
  ColorTema,
  PlantillaId,
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

export const PLANTILLAS: { valor: PlantillaId; etiqueta: string; descripcion: string }[] = [
  { valor: "clasico", etiqueta: "Clasico", descripcion: "Estilo Harvard, limpio y profesional" },
  { valor: "moderno", etiqueta: "Moderno", descripcion: "Sidebar con iconos y color" },
  { valor: "colorido", etiqueta: "Colorido", descripcion: "Header grande con formas decorativas" },
  { valor: "minimalista", etiqueta: "Minimalista", descripcion: "Plano y elegante, sin adornos" },
]

export const PERSONALIZACION_INICIAL: Personalizacion = {
  color: "azul",
  plantilla: "moderno",
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
