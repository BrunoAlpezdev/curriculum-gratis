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
  const [overflowVisible, setOverflowVisible] = useState(defaultAbierta)

  function toggle() {
    const siguiente = !abierta
    setAbierta(siguiente)
    if (!siguiente) setOverflowVisible(false)
  }

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
      <button
        type="button"
        onClick={toggle}
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
          "grid transition-[grid-template-rows,opacity] duration-300 ease-in-out",
          abierta ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
        onTransitionEnd={() => {
          if (abierta) setOverflowVisible(true)
        }}
      >
        <div className={cn("min-h-0", overflowVisible ? "overflow-visible" : "overflow-hidden")}>
          <div className="border-t border-zinc-100 dark:border-zinc-800 px-4 py-4 flex flex-col gap-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
