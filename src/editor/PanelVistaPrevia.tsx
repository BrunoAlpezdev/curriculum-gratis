"use client"

import { useRef, useEffect, useState } from "react"
import { WarningIcon } from "@phosphor-icons/react"
import { CurriculumVista, A4_WIDTH_PX, A4_HEIGHT_PX } from "@/cv/CurriculumVista"
import { useCurriculumStore } from "@/lib/store"

const TOLERANCIA_PX = 8

export function PanelVistaPrevia() {
  const datos = useCurriculumStore((s) => s.datos)
  const personalizacion = useCurriculumStore((s) => s.personalizacion)
  const contenedorRef = useRef<HTMLDivElement>(null)
  const cvRef = useRef<HTMLDivElement>(null)
  const [escala, setEscala] = useState(1)
  const [alturaCv, setAlturaCv] = useState(A4_HEIGHT_PX)

  useEffect(() => {
    const el = contenedorRef.current
    if (!el) return

    const observer = new ResizeObserver(() => {
      const anchoDisponible = el.clientWidth - 32 // padding
      if (anchoDisponible > 0) {
        setEscala(Math.min(1, anchoDisponible / A4_WIDTH_PX))
      }
    })

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const el = cvRef.current
    if (!el) return

    const observer = new ResizeObserver(() => {
      setAlturaCv(el.offsetHeight)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const paginas = Math.max(1, Math.ceil(alturaCv / A4_HEIGHT_PX))
  const excede = alturaCv > A4_HEIGHT_PX + TOLERANCIA_PX

  return (
    <div
      ref={contenedorRef}
      className="p-4 h-full overflow-y-auto bg-zinc-100 dark:bg-zinc-950 relative"
    >
      {excede && (
        <div
          data-no-print
          className="sticky top-0 z-10 mb-3 mx-auto max-w-md flex items-start gap-2 rounded-lg border border-amber-300 dark:border-amber-600/50 bg-amber-50 dark:bg-amber-950/40 px-3 py-2 text-[12px] text-amber-800 dark:text-amber-200 shadow-sm"
        >
          <WarningIcon size={16} weight="fill" className="shrink-0 mt-0.5 text-amber-500" />
          <div className="flex-1">
            <p className="font-semibold">Tu CV ocupa {paginas} páginas</p>
            <p className="text-amber-700 dark:text-amber-300/90 leading-snug">
              Lo ideal es 1 página. Acorta el perfil, consolida experiencias antiguas o quita habilidades irrelevantes.
            </p>
          </div>
        </div>
      )}
      <div
        className="mx-auto"
        style={{
          width: A4_WIDTH_PX * escala,
          height: alturaCv * escala,
        }}
      >
        <div
          ref={cvRef}
          className="shadow-lg rounded-sm origin-top-left"
          style={{
            transform: `scale(${escala})`,
            width: A4_WIDTH_PX,
            minHeight: A4_HEIGHT_PX,
          }}
        >
          <CurriculumVista datos={datos} personalizacion={personalizacion} />
        </div>
      </div>
    </div>
  )
}
