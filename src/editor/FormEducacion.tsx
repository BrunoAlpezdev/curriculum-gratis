"use client"

import { GraduationCapIcon, PlusIcon } from "@phosphor-icons/react"
import { Input } from "@/components/atoms/Input"
import { Textarea } from "@/components/atoms/Textarea"
import { Button } from "@/components/atoms/Button"
import { SeccionFormulario } from "@/components/molecules/SeccionFormulario"
import { EntradaRepetible } from "@/components/molecules/EntradaRepetible"
import { useCurriculumStore } from "@/lib/store"

export function FormEducacion() {
  const educacion = useCurriculumStore((s) => s.datos.educacion)
  const agregar = useCurriculumStore((s) => s.agregarEducacion)
  const actualizar = useCurriculumStore((s) => s.actualizarEducacion)
  const eliminar = useCurriculumStore((s) => s.eliminarEducacion)

  return (
    <SeccionFormulario
      titulo="Educacion y Certificaciones"
      icono={<GraduationCapIcon size={18} />}
    >
      {educacion.map((edu) => (
        <EntradaRepetible key={edu.id} onEliminar={() => eliminar(edu.id)}>
          <Input
            label="Institucion"
            placeholder="Universidad de Chile"
            value={edu.institucion}
            onChange={(e) =>
              actualizar(edu.id, { institucion: e.target.value })
            }
          />
          <Input
            label="Titulo o certificacion"
            placeholder="Ingenieria Civil Informatica"
            value={edu.titulo}
            onChange={(e) =>
              actualizar(edu.id, { titulo: e.target.value })
            }
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Fecha"
              type="month"
              value={edu.fechaInicio}
              onChange={(e) =>
                actualizar(edu.id, { fechaInicio: e.target.value })
              }
            />
            <Input
              label="Fecha fin (opcional)"
              type="month"
              value={edu.fechaFin ?? ""}
              onChange={(e) =>
                actualizar(edu.id, {
                  fechaFin: e.target.value || null,
                })
              }
            />
          </div>
          <Textarea
            label="Descripcion (opcional)"
            placeholder="Menciones, logros academicos..."
            value={edu.descripcion}
            onChange={(e) =>
              actualizar(edu.id, { descripcion: e.target.value })
            }
            rows={2}
          />
        </EntradaRepetible>
      ))}
      <Button variant="secondary" size="sm" onClick={agregar}>
        <PlusIcon size={16} />
        Agregar educacion
      </Button>
    </SeccionFormulario>
  )
}
