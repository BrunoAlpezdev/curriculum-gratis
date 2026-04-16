"use client"

import { useState } from "react"
import { DownloadSimpleIcon, ArrowCounterClockwiseIcon, SpinnerIcon, SunIcon, MoonIcon, MonitorIcon } from "@phosphor-icons/react"
import { Button } from "@/components/atoms/Button"
import { useCurriculumStore } from "@/lib/store"
import { useTema, type Tema } from "@/lib/useTema"

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

export function BarraAcciones() {
  const [descargando, setDescargando] = useState(false)
  const datos = useCurriculumStore((s) => s.datos)
  const personalizacion = useCurriculumStore((s) => s.personalizacion)
  const reiniciar = useCurriculumStore((s) => s.reiniciar)
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
    <div data-no-print className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5">
      <div className="flex items-center gap-2">
        <h1 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Curriculum Gratis</h1>
        <span className="text-xs text-zinc-400 dark:text-zinc-500">·</span>
        <span className="text-xs text-zinc-400 dark:text-zinc-500">100% gratuito</span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTema(CICLO_TEMA[tema])}
          title={ETIQUETA_TEMA[tema]}
        >
          {ICONO_TEMA[tema]}
        </Button>
        <Button variant="ghost" size="sm" onClick={reiniciar}>
          <ArrowCounterClockwiseIcon size={16} />
          Reiniciar
        </Button>
        <Button size="sm" onClick={descargar} disabled={descargando}>
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
