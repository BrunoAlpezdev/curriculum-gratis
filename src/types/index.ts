// --- Datos del curriculum ---

export interface DatosPersonales {
  nombreCompleto: string
  titulo: string
  email: string
  telefono: string
  ubicacion: string
}

export interface Experiencia {
  id: string
  empresa: string
  cargo: string
  ubicacion: string
  fechaInicio: string
  fechaFin: string | null
  descripcion: string
  logros: string
}

export interface Educacion {
  id: string
  institucion: string
  titulo: string
  fechaInicio: string
  fechaFin: string | null
  descripcion: string
}

export type NivelIdioma = "basico" | "intermedio" | "avanzado" | "nativo"

export interface Idioma {
  id: string
  nombre: string
  nivel: NivelIdioma
}

export interface DatosCurriculum {
  datosPersonales: DatosPersonales
  perfil: string
  experiencia: Experiencia[]
  educacion: Educacion[]
  habilidades: string[]
  idiomas: Idioma[]
}

// --- Personalizacion visual ---

export type ColorTema =
  | "azul"
  | "verde"
  | "rojo"
  | "morado"
  | "teal"
  | "naranja"
  | "gris"

export type PlantillaId = "clasico" | "moderno" | "colorido" | "minimalista"

export interface Personalizacion {
  color: ColorTema
  plantilla: PlantillaId
}
