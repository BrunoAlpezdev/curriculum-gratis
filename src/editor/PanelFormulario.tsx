"use client"

import { FormPersonalizacion } from "@/editor/FormPersonalizacion"
import { FormDatosPersonales } from "@/editor/FormDatosPersonales"
import { FormPerfil } from "@/editor/FormPerfil"
import { FormExperiencia } from "@/editor/FormExperiencia"
import { FormEducacion } from "@/editor/FormEducacion"
import { FormCursos } from "@/editor/FormCursos"
import { FormProyectos } from "@/editor/FormProyectos"
import { FormHabilidades } from "@/editor/FormHabilidades"
import { FormIdiomas } from "@/editor/FormIdiomas"
import { FormReferencias } from "@/editor/FormReferencias"
import { FormInfoAdicional } from "@/editor/FormInfoAdicional"
import { FormAnalisisAts } from "@/editor/FormAnalisisAts"
import { GithubLogoIcon, ShieldCheckIcon, HeartIcon } from "@phosphor-icons/react"

export function PanelFormulario() {
  return (
    <div className="flex flex-col gap-4 p-4 overflow-y-auto">
      <FormPersonalizacion />
      <FormDatosPersonales />
      <FormPerfil />
      <FormExperiencia />
      <FormEducacion />
      <FormCursos />
      <FormProyectos />
      <FormHabilidades />
      <FormIdiomas />
      <FormReferencias />
      <FormInfoAdicional />
      <FormAnalisisAts />

      <div className="mt-8 rounded-lg bg-zinc-50 dark:bg-zinc-800 p-4 border border-zinc-200 dark:border-zinc-700">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-full bg-green-100 dark:bg-green-900/30 p-1.5 text-green-600 dark:text-green-400">
            <ShieldCheckIcon size={20} weight="fill" />
          </div>
          <div className="flex-1 space-y-1">
            <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Privacidad garantizada
            </h4>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Tus datos nunca salen de tu dispositivo. No guardamos ninguna
              información en bases de datos ni servidores externos.
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-2">
              <a
                href="https://github.com/BrunoAlpezdev/curriculum-gratis"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-blue-600 transition-colors"
              >
                <GithubLogoIcon size={18} weight="fill" />
                GitHub
              </a>
              <a
                href="https://ko-fi.com/brunoalpezdev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#72a4f2] hover:text-[#5b8fd9] transition-colors"
              >
                <HeartIcon size={18} weight="fill" />
                Apoyar en Ko-fi
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
