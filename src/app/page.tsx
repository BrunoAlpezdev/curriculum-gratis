"use client"

import { useState } from "react"
import { PencilSimpleIcon, EyeIcon } from "@phosphor-icons/react"
import { BarraAcciones } from "@/editor/BarraAcciones"
import { PanelFormulario } from "@/editor/PanelFormulario"
import { PanelVistaPrevia } from "@/editor/PanelVistaPrevia"
import { cn } from "@/components/ui/cn"
import { useHidratado } from "@/lib/useHidratado"

type Tab = "editar" | "preview"

export default function Home() {
  const [tab, setTab] = useState<Tab>("editar")
  const hidratado = useHidratado()

  if (!hidratado) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-sm text-zinc-400">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col">
      <BarraAcciones />

      {/* Tabs mobile */}
      <div data-no-print className="flex md:hidden border-b border-zinc-200">
        <button
          type="button"
          onClick={() => setTab("editar")}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium transition-colors cursor-pointer",
            tab === "editar"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-zinc-500",
          )}
        >
          <PencilSimpleIcon size={16} />
          Editar
        </button>
        <button
          type="button"
          onClick={() => setTab("preview")}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium transition-colors cursor-pointer",
            tab === "preview"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-zinc-500",
          )}
        >
          <EyeIcon size={16} />
          Vista Previa
        </button>
      </div>

      {/* Layout principal */}
      <div className="flex flex-1 overflow-hidden">
        {/* Panel formulario */}
        <div
          className={cn(
            "w-full md:w-[45%] md:block md:border-r md:border-zinc-200 overflow-y-auto",
            tab === "editar" ? "block" : "hidden",
          )}
        >
          <PanelFormulario />
        </div>

        {/* Panel vista previa */}
        <div
          className={cn(
            "w-full md:w-[55%] md:block overflow-hidden",
            tab === "preview" ? "block" : "hidden",
          )}
        >
          <PanelVistaPrevia />
        </div>
      </div>
    </div>
  )
}
