"use client"

import { useEffect } from "react"
import { XIcon, ArrowSquareOutIcon } from "@phosphor-icons/react"
import { Button } from "@/components/atoms/Button"

const URL_PDF = "/Bruno_Alexis_Perez_Valenzuela_CV.pdf"

interface Props {
  abierto: boolean
  onCerrar: () => void
}

export function DialogEjemploCv({ abierto, onCerrar }: Props) {
  useEffect(() => {
    if (!abierto) return
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onCerrar()
    }
    document.addEventListener("keydown", handleEscape)
    /* Bloquear scroll del body mientras el dialog esta abierto.
       En mobile el iframe del PDF puede tener su propio scroll y queremos
       que el body no se mueva detras. */
    const overflowPrev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = overflowPrev
    }
  }, [abierto, onCerrar])

  if (!abierto) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="CV de ejemplo"
      className="fixed inset-0 z-50 flex items-stretch justify-center bg-black/60 backdrop-blur-sm md:items-center md:p-6"
      onClick={onCerrar}
    >
      <div
        className="flex w-full flex-col bg-white dark:bg-zinc-900 shadow-2xl md:max-w-3xl md:rounded-xl md:max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-700 px-4 py-3">
          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              CV de ejemplo
            </h2>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
              Inspirate con este modelo. Tus datos no se modificaran.
            </p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <a
              href={URL_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100"
              title="Abrir en pestaña nueva"
            >
              <ArrowSquareOutIcon size={16} />
              <span className="hidden sm:inline">Abrir</span>
            </a>
            <Button variant="ghost" size="icon" onClick={onCerrar} title="Cerrar">
              <XIcon size={18} />
            </Button>
          </div>
        </div>

        <div className="relative flex-1 bg-zinc-100 dark:bg-zinc-800 min-h-0">
          <iframe
            src={URL_PDF}
            title="CV de ejemplo"
            className="h-full w-full border-0"
          />
          {/* Fallback para navegadores mobile que no embeben PDF.
              Se ve solo si el iframe queda en blanco — el usuario puede tocar
              el boton "Abrir" del header para verlo en pestaña nueva. */}
        </div>
      </div>
    </div>
  )
}
