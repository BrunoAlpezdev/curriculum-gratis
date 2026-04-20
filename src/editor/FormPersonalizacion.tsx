"use client"

import { PaletteIcon } from "@phosphor-icons/react"
import { SeccionFormulario } from "@/components/molecules/SeccionFormulario"
import { useCurriculumStore } from "@/lib/store"
import { COLORES_TEMA, PLANTILLAS, FUENTES, FUENTE_CSS } from "@/lib/constantes"
import { cn } from "@/components/ui/cn"
import type { ColorTema, PlantillaId, FuenteId } from "@/types"

export function FormPersonalizacion() {
  const personalizacion = useCurriculumStore((s) => s.personalizacion)
  const set = useCurriculumStore((s) => s.setPersonalizacion)

  return (
    <SeccionFormulario
      titulo="Personalizar"
      icono={<PaletteIcon size={18} />}
      tip={[
        "Plantilla: las marcadas con ATS pasan los filtros automáticos de las empresas grandes. Si envías tu CV por un portal de empleo, usa una de esas.",
        "Color: azul o negro para roles corporativos, finanzas, derecho. Colores más fuertes si postulas a diseño o creatividad.",
        "Fuente: las Serif (con remates) van bien para roles clásicos. Las Sans-serif son más modernas y van mejor para tech.",
        "Menos es más — un CV recargado visualmente distrae. El contenido tiene que ser la estrella, no el diseño.",
      ]}
    >
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Plantilla</label>
        <div className="grid grid-cols-2 gap-2">
          {PLANTILLAS.map((p) => (
            <button
              key={p.valor}
              type="button"
              onClick={() => set({ plantilla: p.valor as PlantillaId })}
              className={cn(
                "rounded-lg border p-3 text-left transition-all cursor-pointer",
                personalizacion.plantilla === p.valor
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950 ring-1 ring-blue-500"
                  : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600",
              )}
            >
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{p.etiqueta}</p>
                {p.ats && (
                  <span className="rounded bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-1.5 py-0.5 text-[10px] font-bold leading-none">
                    ATS
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{p.descripcion}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Color</label>
        <div className="flex gap-2 flex-wrap">
          {COLORES_TEMA.map((c) => (
            <button
              key={c.valor}
              type="button"
              onClick={() => set({ color: c.valor as ColorTema })}
              title={c.etiqueta}
              className={cn(
                "h-8 w-8 rounded-full transition-all cursor-pointer",
                c.clase,
                personalizacion.color === c.valor
                  ? "ring-2 ring-offset-2 ring-zinc-400 scale-110 dark:ring-offset-zinc-900"
                  : "hover:scale-105",
              )}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Fuente</label>
        <div className="grid grid-cols-1 gap-2">
          {FUENTES.map((f) => (
            <button
              key={f.valor}
              type="button"
              onClick={() => set({ fuente: f.valor as FuenteId })}
              className={cn(
                "rounded-lg border px-3 py-2 text-left transition-all cursor-pointer flex items-baseline gap-2",
                (personalizacion.fuente ?? "inter") === f.valor
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950 ring-1 ring-blue-500"
                  : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600",
              )}
            >
              <span
                className="text-sm font-medium text-zinc-800 dark:text-zinc-200"
                style={{ fontFamily: FUENTE_CSS[f.valor] }}
              >
                {f.etiqueta}
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">{f.tipo}</span>
            </button>
          ))}
        </div>
      </div>
    </SeccionFormulario>
  )
}
