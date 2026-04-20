"use client"

import { useState, useEffect } from "react"
import { CaretDownIcon, CaretUpIcon, LightbulbIcon } from "@phosphor-icons/react"
import { cn } from "@/components/ui/cn"

const PEEK_KEY = "curriculum-gratis:tip-peek"
const PEEK_EXPIRY_DIAS = 7
let peekGlobalDisparado = false

function debeHacerPeek(): boolean {
  try {
    const guardado = localStorage.getItem(PEEK_KEY)
    if (!guardado) return true
    const diasTranscurridos = (Date.now() - parseInt(guardado, 10)) / 86_400_000
    return diasTranscurridos >= PEEK_EXPIRY_DIAS
  } catch {
    return false
  }
}

function marcarPeekVisto() {
  try {
    localStorage.setItem(PEEK_KEY, Date.now().toString())
  } catch {
    // ignore
  }
}

interface SeccionFormularioProps {
  titulo: string
  icono: React.ReactNode
  children: React.ReactNode
  defaultAbierta?: boolean
  tip?: string[]
}

export function SeccionFormulario({
  titulo,
  icono,
  children,
  defaultAbierta = true,
  tip,
}: SeccionFormularioProps) {
  const [abierta, setAbierta] = useState(defaultAbierta)
  const [overflowVisible, setOverflowVisible] = useState(defaultAbierta)
  const [tipAbierto, setTipAbierto] = useState(false)
  const [lightbulbAnimado, setLightbulbAnimado] = useState(false)

  useEffect(() => {
    if (!tip || !defaultAbierta) return
    if (peekGlobalDisparado) return
    if (!debeHacerPeek()) return

    peekGlobalDisparado = true
    marcarPeekVisto()

    const animar = setTimeout(() => setLightbulbAnimado(true), 300)
    const abrir = setTimeout(() => setTipAbierto(true), 500)
    const cerrar = setTimeout(() => setTipAbierto(false), 3000)

    return () => {
      clearTimeout(animar)
      clearTimeout(abrir)
      clearTimeout(cerrar)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
            {tip && (
              <div className="flex flex-col gap-0">
                <button
                  type="button"
                  onClick={() => setTipAbierto((v) => !v)}
                  className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 w-fit cursor-pointer"
                >
                  <LightbulbIcon
                    size={14}
                    weight="fill"
                    className={lightbulbAnimado ? "tip-wiggle" : ""}
                    onAnimationEnd={() => setLightbulbAnimado(false)}
                  />
                  <span className="text-xs font-medium">Consejos</span>
                  <CaretDownIcon
                    size={12}
                    className={cn(
                      "transition-transform duration-200 text-amber-500 dark:text-amber-400",
                      tipAbierto && "rotate-180",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-200 ease-in-out",
                    tipAbierto ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <ul className="mt-2 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 px-3 py-2.5 flex flex-col gap-1.5">
                      {tip.map((t, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                          <span className="mt-0.5 shrink-0 text-amber-400 dark:text-amber-500">•</span>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
