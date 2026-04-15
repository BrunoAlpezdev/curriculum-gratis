"use client"

import { useState } from "react"
import { DownloadSimpleIcon, ArrowCounterClockwiseIcon, SpinnerIcon } from "@phosphor-icons/react"
import { Button } from "@/components/atoms/Button"
import { useCurriculumStore } from "@/lib/store"

export function BarraAcciones() {
  const [descargando, setDescargando] = useState(false)
  const datos = useCurriculumStore((s) => s.datos)
  const personalizacion = useCurriculumStore((s) => s.personalizacion)
  const reiniciar = useCurriculumStore((s) => s.reiniciar)

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
    <div data-no-print className="flex items-center justify-between border-b border-zinc-200 bg-white px-4 py-2.5">
      <div className="flex items-center gap-2">
        <h1 className="text-sm font-bold text-zinc-800">Curriculum Gratis</h1>
        <span className="text-xs text-zinc-400">·</span>
        <span className="text-xs text-zinc-400">100% gratuito</span>
      </div>
      <div className="flex items-center gap-2">
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
