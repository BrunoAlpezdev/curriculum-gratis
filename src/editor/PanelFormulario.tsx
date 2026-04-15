"use client"

import { FormPersonalizacion } from "@/editor/FormPersonalizacion"
import { FormDatosPersonales } from "@/editor/FormDatosPersonales"
import { FormPerfil } from "@/editor/FormPerfil"
import { FormExperiencia } from "@/editor/FormExperiencia"
import { FormEducacion } from "@/editor/FormEducacion"
import { FormHabilidades } from "@/editor/FormHabilidades"
import { FormIdiomas } from "@/editor/FormIdiomas"

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
    </div>
  )
}
