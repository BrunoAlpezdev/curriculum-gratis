"use client"

import { IdentificationCardIcon } from "@phosphor-icons/react"
import { Textarea } from "@/components/atoms/Textarea"
import { SeccionFormulario } from "@/components/molecules/SeccionFormulario"
import { useCurriculumStore } from "@/lib/store"

export function FormPerfil() {
  const perfil = useCurriculumStore((s) => s.datos.perfil)
  const setPerfil = useCurriculumStore((s) => s.setPerfil)

  return (
    <SeccionFormulario
      titulo="Perfil Profesional"
      icono={<IdentificationCardIcon size={18} />}
    >
      <Textarea
        label="Resumen profesional"
        placeholder="Profesional con experiencia en..."
        value={perfil}
        onChange={(e) => setPerfil(e.target.value)}
        rows={4}
      />
    </SeccionFormulario>
  )
}
