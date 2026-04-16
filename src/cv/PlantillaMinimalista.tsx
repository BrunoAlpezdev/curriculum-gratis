import type { DatosCurriculum, Personalizacion } from "@/types"
import { getColorHex } from "@/lib/colores"
import { formatearRangoFechas, formatearFechaEducacion } from "@/lib/formato"

interface Props {
  datos: DatosCurriculum
  personalizacion: Personalizacion
}

export function PlantillaMinimalista({ datos, personalizacion }: Props) {
  const color = getColorHex(personalizacion.color)
  const { datosPersonales: dp } = datos

  return (
    <div className="px-10 py-8 flex-1 text-[12px] leading-snug">
      {/* Header minimalista */}
      <div className="mb-5">
        <h1 className="text-[28px] font-light text-zinc-900 tracking-tight">
          {dp.nombreCompleto || "Tu Nombre"}
        </h1>
        {dp.titulo && (
          <p className="text-[13px] font-medium mt-0.5" style={{ color }}>
            {dp.titulo}
          </p>
        )}
        <div className="flex gap-4 mt-2 text-[11px] text-zinc-400">
          {dp.email && <span>{dp.email}</span>}
          {dp.telefono && <span>{dp.telefono}</span>}
          {dp.ubicacion && <span>{dp.ubicacion}</span>}
        </div>
        <div className="mt-3 h-px bg-zinc-200" />
      </div>

      {datos.perfil && (
        <div className="mb-4">
          <p className="text-zinc-500 whitespace-pre-line">{datos.perfil}</p>
        </div>
      )}

      {datos.experiencia.length > 0 && (
        <div className="mb-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2.5">
            Experiencia
          </h2>
          <div className="flex flex-col gap-2.5">
            {datos.experiencia.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-semibold text-zinc-800">{exp.cargo || "Cargo"}</span>
                    <span className="text-zinc-400 mx-1.5">—</span>
                    <span className="text-zinc-500">{exp.empresa || "Empresa"}</span>
                  </div>
                  <span className="text-[11px] text-zinc-400 shrink-0 ml-2">
                    {formatearRangoFechas(exp.fechaInicio, exp.fechaFin)}
                  </span>
                </div>
                {exp.descripcion && (
                  <p className="text-zinc-500 mt-0.5 whitespace-pre-line">{exp.descripcion}</p>
                )}
                {exp.logros && (
                  <p className="text-zinc-600 mt-0.5 text-[11px]">{exp.logros}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {datos.educacion.length > 0 && (
        <div className="mb-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2.5">
            Educacion
          </h2>
          <div className="flex flex-col gap-2">
            {datos.educacion.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-semibold text-zinc-800">{edu.titulo || "Titulo"}</span>
                    <span className="text-zinc-400 mx-1.5">—</span>
                    <span className="text-zinc-500">{edu.institucion || "Institucion"}</span>
                  </div>
                  <span className="text-[11px] text-zinc-400 shrink-0 ml-2">
                    {formatearFechaEducacion(edu.fechaInicio, edu.fechaFin)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {datos.habilidades.length > 0 && (
        <div className="mb-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2">
            Competencias
          </h2>
          <div className="flex flex-wrap gap-2">
            {datos.habilidades.map((h) => (
              <span
                key={h}
                className="rounded-full border border-zinc-200 px-3 py-0.5 text-[11px] text-zinc-600"
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      )}

      {datos.idiomas.length > 0 && (
        <div>
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2">
            Idiomas
          </h2>
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-[11px]">
            {datos.idiomas.map((i) => (
              <span key={i.id} className="text-zinc-600">
                {i.nombre || "Idioma"} ({i.nivel})
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
