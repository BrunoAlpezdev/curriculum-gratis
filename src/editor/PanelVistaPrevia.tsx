"use client"

import { useRef, useEffect, useState } from "react"
import { CurriculumVista, A4_WIDTH_PX, A4_HEIGHT_PX } from "@/cv/CurriculumVista"
import { useCurriculumStore } from "@/lib/store"

export function PanelVistaPrevia() {
  const datos = useCurriculumStore((s) => s.datos)
  const personalizacion = useCurriculumStore((s) => s.personalizacion)
  const contenedorRef = useRef<HTMLDivElement>(null)
  const [escala, setEscala] = useState(1)

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

  return (
    <div
      ref={contenedorRef}
      className="p-4 h-full overflow-y-auto bg-zinc-100 dark:bg-zinc-950"
    >
      <div
        className="mx-auto"
        style={{
          width: A4_WIDTH_PX * escala,
          height: A4_HEIGHT_PX * escala,
        }}
      >
        <div
          className="shadow-lg rounded-sm origin-top-left"
          style={{
            transform: `scale(${escala})`,
            width: A4_WIDTH_PX,
            height: A4_HEIGHT_PX,
          }}
        >
          <CurriculumVista datos={datos} personalizacion={personalizacion} />
        </div>
      </div>
    </div>
  )
}
