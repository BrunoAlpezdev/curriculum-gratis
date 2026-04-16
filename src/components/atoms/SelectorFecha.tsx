"use client"

import { useState, useRef, useEffect, useId } from "react"
import { CaretLeftIcon, CaretRightIcon, CalendarBlankIcon } from "@phosphor-icons/react"
import { cn } from "@/components/ui/cn"
import { MESES } from "@/lib/formato"

const MESES_LISTA = Object.entries(MESES).map(([valor, etiqueta]) => ({
  valor,
  etiqueta,
}))

interface SelectorFechaProps {
  label: string
  valor: string | null
  onChange: (valor: string | null) => void
  permitirPresente?: boolean
  placeholder?: string
}

function parsearAnio(valor: string | null): number {
  if (!valor) return new Date().getFullYear()
  const anio = parseInt(valor.split("-")[0] ?? "", 10)
  return isNaN(anio) ? new Date().getFullYear() : anio
}

function parsearMes(valor: string | null): string | null {
  if (!valor) return null
  return valor.split("-")[1] ?? null
}

function formatearTexto(valor: string | null, placeholder: string): string {
  if (valor === null || valor === "") return placeholder
  const mes = parsearMes(valor)
  const anio = valor.split("-")[0]
  if (!mes || !anio) return placeholder
  return `${MESES[mes] ?? mes} ${anio}`
}

export function SelectorFecha({
  label,
  valor,
  onChange,
  permitirPresente = false,
  placeholder = "Seleccionar",
}: SelectorFechaProps) {
  const autoId = useId()
  const [abierto, setAbierto] = useState(false)
  const [anioVisible, setAnioVisible] = useState(() => parsearAnio(valor))
  const contenedorRef = useRef<HTMLDivElement>(null)

  const mesSeleccionado = parsearMes(valor)
  const anioSeleccionado = valor ? parsearAnio(valor) : null
  const esPresente = valor === null && permitirPresente

  useEffect(() => {
    function handleClickFuera(e: MouseEvent) {
      if (contenedorRef.current && !contenedorRef.current.contains(e.target as Node)) {
        setAbierto(false)
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setAbierto(false)
    }

    if (abierto) {
      document.addEventListener("mousedown", handleClickFuera)
      document.addEventListener("keydown", handleEscape)
      return () => {
        document.removeEventListener("mousedown", handleClickFuera)
        document.removeEventListener("keydown", handleEscape)
      }
    }
  }, [abierto])

  useEffect(() => {
    if (abierto) setAnioVisible(parsearAnio(valor))
  }, [abierto, valor])

  function seleccionarMes(mes: string) {
    onChange(`${anioVisible}-${mes}`)
    setAbierto(false)
  }

  function seleccionarPresente() {
    onChange(null)
    setAbierto(false)
  }

  const textoMostrado = esPresente ? "Presente" : formatearTexto(valor, placeholder)
  const tieneValor = valor !== null && valor !== ""

  return (
    <div ref={contenedorRef} className="relative flex flex-col gap-1.5">
      <label id={autoId} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </label>
      <button
        type="button"
        aria-labelledby={autoId}
        onClick={() => setAbierto(!abierto)}
        className={cn(
          "h-10 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 px-3 text-sm text-left transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none cursor-pointer flex items-center gap-2",
          tieneValor || esPresente ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-400 dark:text-zinc-500",
        )}
      >
        <CalendarBlankIcon size={16} className="text-zinc-400 dark:text-zinc-500 shrink-0" />
        {textoMostrado}
      </button>

      {abierto && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-lg p-3 flex flex-col gap-2">
          {/* Navegacion de año */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setAnioVisible((a) => a - 1)}
              className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <CaretLeftIcon size={16} className="text-zinc-600 dark:text-zinc-400" />
            </button>
            <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
              {anioVisible}
            </span>
            <button
              type="button"
              onClick={() => setAnioVisible((a) => a + 1)}
              className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <CaretRightIcon size={16} className="text-zinc-600 dark:text-zinc-400" />
            </button>
          </div>

          {/* Grid de meses */}
          <div className="grid grid-cols-3 gap-1">
            {MESES_LISTA.map((m) => {
              const seleccionado =
                mesSeleccionado === m.valor && anioSeleccionado === anioVisible
              return (
                <button
                  key={m.valor}
                  type="button"
                  onClick={() => seleccionarMes(m.valor)}
                  className={cn(
                    "py-2 rounded-md text-sm font-medium transition-colors cursor-pointer",
                    seleccionado
                      ? "bg-blue-600 text-white"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800",
                  )}
                >
                  {m.etiqueta}
                </button>
              )
            })}
          </div>

          {/* Boton Presente */}
          {permitirPresente && (
            <button
              type="button"
              onClick={seleccionarPresente}
              className={cn(
                "w-full py-2 rounded-md text-sm font-medium transition-colors cursor-pointer border",
                esPresente
                  ? "bg-blue-600 text-white border-blue-600"
                  : "text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800",
              )}
            >
              Presente
            </button>
          )}
        </div>
      )}
    </div>
  )
}
