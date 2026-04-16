"use client"

import { UserIcon } from "@phosphor-icons/react"
import { Input } from "@/components/atoms/Input"
import { SeccionFormulario } from "@/components/molecules/SeccionFormulario"
import { useCurriculumStore } from "@/lib/store"

export function FormDatosPersonales() {
  const datos = useCurriculumStore((s) => s.datos.datosPersonales)
  const set = useCurriculumStore((s) => s.setDatosPersonales)

  return (
    <SeccionFormulario titulo="Datos Personales" icono={<UserIcon size={18} />}>
      <Input
        label="Nombre completo"
        placeholder="Camila Gavilán"
        value={datos.nombreCompleto}
        onChange={(e) => set({ nombreCompleto: e.target.value })}
      />
      <Input
        label="Titulo profesional"
        placeholder="Ingeniera de Software"
        value={datos.titulo}
        onChange={(e) => set({ titulo: e.target.value })}
      />
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Email"
          type="email"
          placeholder="camila@email.com"
          value={datos.email}
          onChange={(e) => set({ email: e.target.value })}
        />
        <Input
          label="Telefono"
          type="tel"
          placeholder="+56 9 1234 5678"
          value={datos.telefono}
          onChange={(e) => set({ telefono: e.target.value })}
        />
      </div>
      <Input
        label="Ubicacion"
        placeholder="Santiago, Chile"
        value={datos.ubicacion}
        onChange={(e) => set({ ubicacion: e.target.value })}
      />
    </SeccionFormulario>
  )
}
