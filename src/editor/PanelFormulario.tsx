"use client"

import { FormPersonalizacion } from "@/editor/FormPersonalizacion"
import { FormDatosPersonales } from "@/editor/FormDatosPersonales"
import { FormPerfil } from "@/editor/FormPerfil"
import { FormExperiencia } from "@/editor/FormExperiencia"
import { FormEducacion } from "@/editor/FormEducacion"
import { FormHabilidades } from "@/editor/FormHabilidades"
import { FormIdiomas } from "@/editor/FormIdiomas"
import { GithubLogo, ShieldCheck } from "@phosphor-icons/react"

export function PanelFormulario() {
  return (
    <div className="flex flex-col gap-4 p-4 overflow-y-auto">
      <FormPersonalizacion />
      <FormDatosPersonales />
      <FormPerfil />
      <FormExperiencia />
      <FormEducacion />
      <FormHabilidades />
      <FormIdiomas />

      <div className="mt-8 rounded-lg bg-zinc-50 p-4 border border-zinc-200">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-full bg-green-100 p-1.5 text-green-600">
            <ShieldCheck size={20} weight="fill" />
          </div>
          <div className="flex-1 space-y-1">
            <h4 className="text-sm font-medium text-zinc-900">
              Privacidad garantizada
            </h4>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Tus datos nunca salen de tu dispositivo. No guardamos ninguna
              información en bases de datos ni servidores externos.
            </p>
            <a
              href="https://github.com/BrunoAlpezdev/curriculum-gratis"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 hover:text-blue-600 transition-colors pt-2"
            >
              <GithubLogo size={18} weight="fill" />
              Ver código fuente en GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
