"use client"

import { useState } from "react"
import { PencilSimpleIcon, EyeIcon, FileTextIcon, EnvelopeIcon } from "@phosphor-icons/react"
import { BarraAcciones } from "@/editor/BarraAcciones"
import { PanelFormulario } from "@/editor/PanelFormulario"
import { PanelFormularioCarta } from "@/editor/PanelFormularioCarta"
import { PanelVistaPrevia } from "@/editor/PanelVistaPrevia"
import { PanelVistaCarta } from "@/editor/PanelVistaCarta"
import { cn } from "@/components/ui/cn"
import { useHidratado } from "@/lib/useHidratado"

type Tab = "editar" | "preview"
export type Modo = "cv" | "carta"

export function Editor() {
  const [tab, setTab] = useState<Tab>("editar")
  const [modo, setModo] = useState<Modo>("cv")
  const hidratado = useHidratado()

  if (!hidratado) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-sm text-zinc-400 dark:text-zinc-500">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col">
      <BarraAcciones modo={modo} />

      {/* Toggle CV / Carta */}
      <div data-no-print className="flex items-center justify-center gap-1 border-b border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/40 py-1.5">
        <button
          type="button"
          onClick={() => setModo("cv")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer",
            modo === "cv"
              ? "bg-blue-600 text-white"
              : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800",
          )}
        >
          <FileTextIcon size={14} />
          Curriculum
        </button>
        <button
          type="button"
          onClick={() => setModo("carta")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer",
            modo === "carta"
              ? "bg-blue-600 text-white"
              : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800",
          )}
        >
          <EnvelopeIcon size={14} />
          Carta de presentacion
        </button>
      </div>

      {/* Tabs mobile */}
      <div data-no-print className="flex md:hidden border-b border-zinc-200 dark:border-zinc-700">
        <button
          type="button"
          onClick={() => setTab("editar")}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium transition-colors cursor-pointer",
            tab === "editar"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-zinc-500 dark:text-zinc-400",
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
              : "text-zinc-500 dark:text-zinc-400",
          )}
        >
          <EyeIcon size={16} />
          Vista Previa
        </button>
      </div>

      {/* Layout principal */}
      <div className="flex flex-1 overflow-hidden">
        <div
          className={cn(
            "w-full md:w-[45%] md:block md:border-r md:border-zinc-200 md:dark:border-zinc-700 overflow-y-auto",
            tab === "editar" ? "block" : "hidden",
          )}
        >
          {modo === "cv" ? <PanelFormulario /> : <PanelFormularioCarta />}
        </div>
        <div
          className={cn(
            "w-full md:w-[55%] md:block overflow-hidden",
            tab === "preview" ? "block" : "hidden",
          )}
        >
          {modo === "cv" ? <PanelVistaPrevia /> : <PanelVistaCarta />}
        </div>
      </div>
    </div>
  )
}
