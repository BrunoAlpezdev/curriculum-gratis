"use client"

import { useState, useMemo } from "react"
import { TargetIcon, CheckCircleIcon, XCircleIcon } from "@phosphor-icons/react"
import { Textarea } from "@/components/atoms/Textarea"
import { SeccionFormulario } from "@/components/molecules/SeccionFormulario"
import { useCurriculumStore } from "@/lib/store"
import { analizar } from "@/lib/analisis-ats"

export function FormAnalisisAts() {
  const datos = useCurriculumStore((s) => s.datos)
  const [jd, setJd] = useState("")

  const resultado = useMemo(() => analizar(jd, datos), [jd, datos])
  const porcentaje = resultado.totalClaves > 0
    ? Math.round((resultado.encontradas / resultado.totalClaves) * 100)
    : 0

  const colorPorcentaje =
    porcentaje >= 70
      ? "text-emerald-600 dark:text-emerald-400"
      : porcentaje >= 40
        ? "text-amber-600 dark:text-amber-400"
        : "text-red-600 dark:text-red-400"

  return (
    <SeccionFormulario
      titulo="Analisis ATS vs Oferta"
      icono={<TargetIcon size={18} />}
      defaultAbierta={false}
      tip={[
        "Pega la descripción del puesto al que postulas. Comparamos las palabras clave con las que ya están en tu CV.",
        "Un match de 70%+ es bueno. Menos de 40% significa que el CV está mal alineado con el puesto.",
        "No rellenes tu CV con keywords solo por pasar un ATS — los reclutadores humanos detectan el relleno al instante.",
        "El análisis es 100% local, la descripción nunca sale de tu navegador.",
      ]}
    >
      <Textarea
        label="Descripcion del puesto (Job Description)"
        placeholder="Pega aqui el texto del aviso de trabajo..."
        value={jd}
        onChange={(e) => setJd(e.target.value)}
        rows={5}
      />

      {jd.trim().length > 0 && resultado.totalClaves > 0 && (
        <div className="flex flex-col gap-3 rounded-lg border border-zinc-200 dark:border-zinc-700 p-3 bg-zinc-50/50 dark:bg-zinc-800/50">
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Coincidencia con el puesto
            </span>
            <span className={`text-2xl font-bold ${colorPorcentaje}`}>
              {porcentaje}%
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
            <div
              className={`h-full transition-all ${
                porcentaje >= 70
                  ? "bg-emerald-500"
                  : porcentaje >= 40
                    ? "bg-amber-500"
                    : "bg-red-500"
              }`}
              style={{ width: `${porcentaje}%` }}
            />
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {resultado.encontradas} de {resultado.totalClaves} palabras clave presentes en tu CV
          </p>

          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-1.5">
              {resultado.palabras
                .filter((p) => !p.enCv)
                .map((p) => (
                  <span
                    key={p.palabra}
                    className="inline-flex items-center gap-1 rounded-full bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/50 px-2 py-0.5 text-[11px] text-red-700 dark:text-red-300"
                    title={`Aparece ${p.frecuencia}× en la oferta`}
                  >
                    <XCircleIcon size={12} weight="fill" />
                    {p.palabra}
                  </span>
                ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {resultado.palabras
                .filter((p) => p.enCv)
                .map((p) => (
                  <span
                    key={p.palabra}
                    className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 px-2 py-0.5 text-[11px] text-emerald-700 dark:text-emerald-400"
                  >
                    <CheckCircleIcon size={12} weight="fill" />
                    {p.palabra}
                  </span>
                ))}
            </div>
          </div>
        </div>
      )}
    </SeccionFormulario>
  )
}
