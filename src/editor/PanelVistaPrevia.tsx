"use client"

import { useRef, useEffect, useState } from "react"
import { CurriculumVista, A4_WIDTH_PX } from "@/cv/CurriculumVista"
import { useCurriculumStore } from "@/lib/store"

export function PanelVistaPrevia() {
  const datos = useCurriculumStore((s) => s.datos)
  const personalizacion = useCurriculumStore((s) => s.personalizacion)
  const contenedorRef = useRef<HTMLDivElement>(null)
  const [escala, setEscala] = useState(1)

  useEffect(() => {
    function calcularEscala() {
      if (!contenedorRef.current) return
      const anchoDisponible = contenedorRef.current.clientWidth - 32 // padding
      setEscala(Math.min(1, anchoDisponible / A4_WIDTH_PX))
    }

    calcularEscala()
    window.addEventListener("resize", calcularEscala)
    return () => window.removeEventListener("resize", calcularEscala)
  }, [])

  return (
    <div
      ref={contenedorRef}
      className="flex justify-center p-4 h-full overflow-y-auto bg-zinc-100"
    >
      <div
        className="shadow-lg rounded-sm origin-top shrink-0"
        style={{
          transform: `scale(${escala})`,
          width: A4_WIDTH_PX,
        }}
      >
        <CurriculumVista datos={datos} personalizacion={personalizacion} />
      </div>
    </div>
  )
}
