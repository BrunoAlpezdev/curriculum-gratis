import { create } from "zustand"
import { persist } from "zustand/middleware"
import type {
  DatosCurriculum,
  DatosPersonales,
  Experiencia,
  Educacion,
  Idioma,
  Personalizacion,
} from "@/types"
import { DATOS_INICIALES, PERSONALIZACION_INICIAL } from "@/lib/constantes"

interface CurriculumStore {
  datos: DatosCurriculum
  personalizacion: Personalizacion

  // Datos personales
  setDatosPersonales: (datos: Partial<DatosPersonales>) => void
  setPerfil: (perfil: string) => void

  // Experiencia
  agregarExperiencia: () => void
  actualizarExperiencia: (id: string, datos: Partial<Experiencia>) => void
  eliminarExperiencia: (id: string) => void

  // Educacion
  agregarEducacion: () => void
  actualizarEducacion: (id: string, datos: Partial<Educacion>) => void
  eliminarEducacion: (id: string) => void

  // Habilidades
  agregarHabilidad: (nombre: string) => void
  eliminarHabilidad: (nombre: string) => void

  // Idiomas
  agregarIdioma: () => void
  actualizarIdioma: (id: string, datos: Partial<Idioma>) => void
  eliminarIdioma: (id: string) => void

  // Personalizacion
  setPersonalizacion: (p: Partial<Personalizacion>) => void

  // Reset
  reiniciar: () => void
}

export const useCurriculumStore = create<CurriculumStore>()(
  persist(
    (set) => ({
      datos: DATOS_INICIALES,
      personalizacion: PERSONALIZACION_INICIAL,

      setDatosPersonales: (nuevos) =>
        set((s) => ({
          datos: {
            ...s.datos,
            datosPersonales: { ...s.datos.datosPersonales, ...nuevos },
          },
        })),

      setPerfil: (perfil) =>
        set((s) => ({ datos: { ...s.datos, perfil } })),

      agregarExperiencia: () =>
        set((s) => ({
          datos: {
            ...s.datos,
            experiencia: [
              ...s.datos.experiencia,
              {
                id: crypto.randomUUID(),
                empresa: "",
                cargo: "",
                ubicacion: "",
                fechaInicio: "",
                fechaFin: null,
                descripcion: "",
                logros: "",
              },
            ],
          },
        })),

      actualizarExperiencia: (id, nuevos) =>
        set((s) => ({
          datos: {
            ...s.datos,
            experiencia: s.datos.experiencia.map((e) =>
              e.id === id ? { ...e, ...nuevos } : e,
            ),
          },
        })),

      eliminarExperiencia: (id) =>
        set((s) => ({
          datos: {
            ...s.datos,
            experiencia: s.datos.experiencia.filter((e) => e.id !== id),
          },
        })),

      agregarEducacion: () =>
        set((s) => ({
          datos: {
            ...s.datos,
            educacion: [
              ...s.datos.educacion,
              {
                id: crypto.randomUUID(),
                institucion: "",
                titulo: "",
                fechaInicio: "",
                fechaFin: null,
                descripcion: "",
              },
            ],
          },
        })),

      actualizarEducacion: (id, nuevos) =>
        set((s) => ({
          datos: {
            ...s.datos,
            educacion: s.datos.educacion.map((e) =>
              e.id === id ? { ...e, ...nuevos } : e,
            ),
          },
        })),

      eliminarEducacion: (id) =>
        set((s) => ({
          datos: {
            ...s.datos,
            educacion: s.datos.educacion.filter((e) => e.id !== id),
          },
        })),

      agregarHabilidad: (nombre) =>
        set((s) => {
          if (s.datos.habilidades.includes(nombre)) return s
          return {
            datos: {
              ...s.datos,
              habilidades: [...s.datos.habilidades, nombre],
            },
          }
        }),

      eliminarHabilidad: (nombre) =>
        set((s) => ({
          datos: {
            ...s.datos,
            habilidades: s.datos.habilidades.filter((h) => h !== nombre),
          },
        })),

      agregarIdioma: () =>
        set((s) => ({
          datos: {
            ...s.datos,
            idiomas: [
              ...s.datos.idiomas,
              {
                id: crypto.randomUUID(),
                nombre: "",
                nivel: "basico",
              },
            ],
          },
        })),

      actualizarIdioma: (id, nuevos) =>
        set((s) => ({
          datos: {
            ...s.datos,
            idiomas: s.datos.idiomas.map((i) =>
              i.id === id ? { ...i, ...nuevos } : i,
            ),
          },
        })),

      eliminarIdioma: (id) =>
        set((s) => ({
          datos: {
            ...s.datos,
            idiomas: s.datos.idiomas.filter((i) => i.id !== id),
          },
        })),

      setPersonalizacion: (p) =>
        set((s) => ({
          personalizacion: { ...s.personalizacion, ...p },
        })),

      reiniciar: () =>
        set({
          datos: DATOS_INICIALES,
          personalizacion: PERSONALIZACION_INICIAL,
        }),
    }),
    {
      name: "curriculum-gratis",
      merge: (persisted, current) => {
        const estado = persisted as Record<string, unknown> | undefined
        return {
          ...current,
          ...estado,
          personalizacion: {
            ...PERSONALIZACION_INICIAL,
            ...(estado?.personalizacion as object),
          },
        } as CurriculumStore
      },
    },
  ),
)
