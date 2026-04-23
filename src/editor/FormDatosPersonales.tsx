"use client"

import { UserIcon } from "@phosphor-icons/react"
import { Input } from "@/components/atoms/Input"
import { SeccionFormulario } from "@/components/molecules/SeccionFormulario"
import { useCurriculumStore } from "@/lib/store"

export function FormDatosPersonales() {
  const datos = useCurriculumStore((s) => s.datos.datosPersonales)
  const set = useCurriculumStore((s) => s.setDatosPersonales)

  return (
    <SeccionFormulario
      titulo="Datos Personales"
      icono={<UserIcon size={18} />}
      tip={[
        "Pon solo ciudad y país en ubicación — la dirección completa es innecesaria y un riesgo de privacidad.",
        "El título profesional es lo primero que lee el reclutador. Sé específico: 'Desarrollador Frontend React' es mucho mejor que 'Desarrollador'.",
        "Usa un email profesional. Nada de mails de cuando tenías 15 años.",
        "LinkedIn es casi obligatorio hoy. GitHub/portafolio solo si son relevantes para el puesto — no ensucies con enlaces que no aportan.",
        "Los enlaces van sin 'https://' — se ven más limpios y ocupan menos ancho.",
      ]}
    >
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
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="LinkedIn"
          placeholder="linkedin.com/in/usuario"
          value={datos.linkedin}
          onChange={(e) => set({ linkedin: e.target.value })}
        />
        <Input
          label="GitHub"
          placeholder="github.com/usuario"
          value={datos.github}
          onChange={(e) => set({ github: e.target.value })}
        />
      </div>
      <Input
        label="Sitio web o portafolio"
        placeholder="miportafolio.cl"
        value={datos.sitioWeb}
        onChange={(e) => set({ sitioWeb: e.target.value })}
      />
    </SeccionFormulario>
  )
}
