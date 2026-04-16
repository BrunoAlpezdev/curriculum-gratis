"use client"

import { useState, useRef } from "react"
import { DownloadSimpleIcon, ArrowCounterClockwiseIcon, SpinnerIcon, SunIcon, MoonIcon, MonitorIcon } from "@phosphor-icons/react"
import { Button } from "@/components/atoms/Button"
import { useCurriculumStore } from "@/lib/store"
import { useTema, type Tema } from "@/lib/useTema"
import type { DatosCurriculum } from "@/types"

const CICLO_TEMA: Record<Tema, Tema> = {
  sistema: "claro",
  claro: "oscuro",
  oscuro: "sistema",
}

const ICONO_TEMA: Record<Tema, React.ReactNode> = {
  claro: <SunIcon size={16} />,
  oscuro: <MoonIcon size={16} />,
  sistema: <MonitorIcon size={16} />,
}

const ETIQUETA_TEMA: Record<Tema, string> = {
  claro: "Claro",
  oscuro: "Oscuro",
  sistema: "Sistema",
}

const DATOS_MOCK: DatosCurriculum = {
  datosPersonales: {
    nombreCompleto: "Camila Rojas Fernandez",
    titulo: "Ingeniera de Software Senior",
    email: "camila.rojas@email.com",
    telefono: "+56 9 8765 4321",
    ubicacion: "Santiago, Chile",
  },
  perfil:
    "Ingeniera de software con 6 años de experiencia desarrollando aplicaciones web escalables. Especializada en React, Node.js y arquitectura de microservicios. Apasionada por las buenas practicas de desarrollo y la mejora continua de procesos.",
  experiencia: [
    {
      id: crypto.randomUUID(),
      empresa: "TechCorp Chile",
      cargo: "Ingeniera de Software Senior",
      ubicacion: "Santiago, Chile",
      fechaInicio: "2021-03",
      fechaFin: null,
      descripcion:
        "Lider tecnica de un equipo de 5 desarrolladores. Diseño e implementacion de microservicios con Node.js y TypeScript. Migracion de monolito a arquitectura distribuida.",
      logros:
        "Reduccion del tiempo de deploy en un 60%. Mejora del rendimiento de la API principal en un 40%.",
    },
    {
      id: crypto.randomUUID(),
      empresa: "StartupLab",
      cargo: "Desarrolladora Full Stack",
      ubicacion: "Valparaiso, Chile",
      fechaInicio: "2018-06",
      fechaFin: "2021-02",
      descripcion:
        "Desarrollo de plataforma SaaS de gestion de inventario. Implementacion de frontend con React y backend con Express. Integracion con APIs de pago y logistica.",
      logros: "Crecimiento de 0 a 15.000 usuarios activos en 18 meses.",
    },
  ],
  educacion: [
    {
      id: crypto.randomUUID(),
      institucion: "Universidad de Chile",
      titulo: "Ingenieria Civil en Computacion",
      fechaInicio: "2013-03",
      fechaFin: "2018-01",
      descripcion: "Mencion en Ingenieria de Software. Mejor promedio de generacion.",
    },
  ],
  habilidades: [
    "TypeScript",
    "React",
    "Node.js",
    "PostgreSQL",
    "Docker",
    "AWS",
    "Git",
    "Scrum",
  ],
  idiomas: [
    { id: crypto.randomUUID(), nombre: "Español", nivel: "nativo" },
    { id: crypto.randomUUID(), nombre: "Ingles", nivel: "avanzado" },
  ],
}

const TAPS_REQUERIDOS = 5
const VENTANA_MS = 2000

export function BarraAcciones() {
  const [descargando, setDescargando] = useState(false)
  const datos = useCurriculumStore((s) => s.datos)
  const personalizacion = useCurriculumStore((s) => s.personalizacion)
  const reiniciarStore = useCurriculumStore((s) => s.reiniciar)
  const tapsRef = useRef<number[]>([])

  function handleTapTitulo() {
    const ahora = Date.now()
    tapsRef.current = tapsRef.current.filter((t) => ahora - t < VENTANA_MS)
    tapsRef.current.push(ahora)
    if (tapsRef.current.length >= TAPS_REQUERIDOS) {
      tapsRef.current = []
      useCurriculumStore.setState({ datos: DATOS_MOCK })
    }
  }

  function reiniciar() {
    if (window.confirm("¿Seguro que quieres reiniciar? Se borrarán todos los datos del curriculum.")) {
      reiniciarStore()
    }
  }
  const { tema, setTema } = useTema()

  async function descargar() {
    setDescargando(true)
    try {
      const { generarPdf } = await import("@/lib/generar-pdf")
      await generarPdf(datos, personalizacion)
    } finally {
      setDescargando(false)
    }
  }

  return (
    <div data-no-print className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 md:px-4 py-2">
      <div className="flex items-center gap-1.5 min-w-0">
        <h1
          className="text-sm font-bold text-zinc-800 dark:text-zinc-200 truncate cursor-default select-none"
          onClick={handleTapTitulo}
        >
          <span className="md:hidden">CV Gratis</span>
          <span className="hidden md:inline">Generador de Curriculum</span>
        </h1>
        <span className="hidden md:inline text-xs text-zinc-400 dark:text-zinc-500">·</span>
        <span className="hidden md:inline text-xs text-zinc-400 dark:text-zinc-500 shrink-0">100% gratuito</span>
      </div>
      <div className="flex items-center gap-1 md:gap-2 shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:inline-flex"
          onClick={() => setTema(CICLO_TEMA[tema])}
          title={ETIQUETA_TEMA[tema]}
        >
          {ICONO_TEMA[tema]}
        </Button>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={reiniciar} title="Reiniciar">
          <ArrowCounterClockwiseIcon size={16} />
        </Button>
        <Button variant="ghost" size="sm" className="hidden md:inline-flex" onClick={reiniciar}>
          <ArrowCounterClockwiseIcon size={16} />
          Reiniciar
        </Button>
        <Button size="sm" className="whitespace-nowrap" onClick={descargar} disabled={descargando}>
          {descargando ? (
            <SpinnerIcon size={16} className="animate-spin" />
          ) : (
            <DownloadSimpleIcon size={16} />
          )}
          {descargando ? "Descargando..." : "Descargar PDF"}
        </Button>
      </div>
    </div>
  )
}
