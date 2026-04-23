"use client"

import { FormDatosPersonales } from "@/editor/FormDatosPersonales"
import { FormCarta } from "@/editor/FormCarta"

export function PanelFormularioCarta() {
  return (
    <div className="flex flex-col gap-4 p-4 overflow-y-auto">
      <FormDatosPersonales />
      <FormCarta />
    </div>
  )
}
