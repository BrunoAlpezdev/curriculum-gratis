"use client"

import { useState } from "react"
import { CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react"
import { cn } from "@/components/ui/cn"

interface SeccionFormularioProps {
  titulo: string
  icono: React.ReactNode
  children: React.ReactNode
  defaultAbierta?: boolean
}

export function SeccionFormulario({
  titulo,
  icono,
  children,
  defaultAbierta = true,
}: SeccionFormularioProps) {
  const [abierta, setAbierta] = useState(defaultAbierta)

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
      <button
        type="button"
        onClick={() => setAbierta(!abierta)}
        className="flex w-full items-center justify-between px-4 py-3 cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <span className="text-zinc-500 dark:text-zinc-400">{icono}</span>
          <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{titulo}</h3>
        </div>
        {abierta ? (
          <CaretUpIcon size={16} className="text-zinc-400 dark:text-zinc-500" />
        ) : (
          <CaretDownIcon size={16} className="text-zinc-400 dark:text-zinc-500" />
        )}
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all",
          abierta ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="border-t border-zinc-100 dark:border-zinc-800 px-4 py-4 flex flex-col gap-4">
          {children}
        </div>
      </div>
    </div>
  )
}
