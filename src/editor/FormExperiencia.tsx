"use client"

import { BriefcaseIcon, PlusIcon } from "@phosphor-icons/react"
import { Input } from "@/components/atoms/Input"
import { Textarea } from "@/components/atoms/Textarea"
import { Button } from "@/components/atoms/Button"
import { SeccionFormulario } from "@/components/molecules/SeccionFormulario"
import { EntradaRepetible } from "@/components/molecules/EntradaRepetible"
import { useCurriculumStore } from "@/lib/store"

export function FormExperiencia() {
  const experiencia = useCurriculumStore((s) => s.datos.experiencia)
  const agregar = useCurriculumStore((s) => s.agregarExperiencia)
  const actualizar = useCurriculumStore((s) => s.actualizarExperiencia)
  const eliminar = useCurriculumStore((s) => s.eliminarExperiencia)

  return (
    <SeccionFormulario
      titulo="Experiencia Laboral"
      icono={<BriefcaseIcon size={18} />}
    >
      {experiencia.map((exp) => (
        <EntradaRepetible key={exp.id} onEliminar={() => eliminar(exp.id)}>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Empresa"
              placeholder="Empresa S.A."
              value={exp.empresa}
              onChange={(e) =>
                actualizar(exp.id, { empresa: e.target.value })
              }
            />
            <Input
              label="Cargo"
              placeholder="Analista de datos"
              value={exp.cargo}
              onChange={(e) =>
                actualizar(exp.id, { cargo: e.target.value })
              }
            />
          </div>
          <Input
            label="Ubicacion"
            placeholder="Santiago, Chile"
            value={exp.ubicacion}
            onChange={(e) =>
              actualizar(exp.id, { ubicacion: e.target.value })
            }
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Fecha inicio"
              type="month"
              value={exp.fechaInicio}
              onChange={(e) =>
                actualizar(exp.id, { fechaInicio: e.target.value })
              }
            />
            <Input
              label="Fecha fin"
              type="month"
              placeholder="Presente"
              value={exp.fechaFin ?? ""}
              onChange={(e) =>
                actualizar(exp.id, {
                  fechaFin: e.target.value || null,
                })
              }
            />
          </div>
          <Textarea
            label="Descripcion"
            placeholder="Responsabilidades principales..."
            value={exp.descripcion}
            onChange={(e) =>
              actualizar(exp.id, { descripcion: e.target.value })
            }
            rows={3}
          />
          <Textarea
            label="Logros"
            placeholder="Reduccion de costos en un 15%..."
            value={exp.logros}
            onChange={(e) =>
              actualizar(exp.id, { logros: e.target.value })
            }
            rows={2}
          />
        </EntradaRepetible>
      ))}
      <Button variant="secondary" size="sm" onClick={agregar}>
        <PlusIcon size={16} />
        Agregar experiencia
      </Button>
    </SeccionFormulario>
  )
}
