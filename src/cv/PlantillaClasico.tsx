import type { DatosCurriculum, Personalizacion } from "@/types"
import { getColorHex } from "@/lib/colores"
import { formatearRangoFechas, formatearFechaEducacion } from "@/lib/formato"

interface Props {
  datos: DatosCurriculum
  personalizacion: Personalizacion
}

export function PlantillaClasico({ datos, personalizacion }: Props) {
  const color = getColorHex(personalizacion.color)
  const { datosPersonales: dp } = datos

  return (
    <div className="px-10 py-8 flex-1 text-[12px] leading-snug font-serif">
      {/* Header centrado estilo Harvard */}
      <div className="text-center mb-4 pb-3 border-b-2" style={{ borderColor: color }}>
        <h1 className="text-[22px] font-bold text-zinc-900">
          {dp.nombreCompleto || "Tu Nombre"}
        </h1>
        {dp.titulo && (
          <p className="text-[13px] text-zinc-600 mt-0.5">{dp.titulo}</p>
        )}
        <div className="flex items-center justify-center gap-3 mt-2 text-zinc-500 text-[11px]">
          {dp.email && <span>{dp.email}</span>}
          {dp.email && dp.telefono && <span>|</span>}
          {dp.telefono && <span>{dp.telefono}</span>}
          {(dp.email || dp.telefono) && dp.ubicacion && <span>|</span>}
          {dp.ubicacion && <span>{dp.ubicacion}</span>}
        </div>
      </div>

      {datos.perfil && (
        <div className="mb-4">
          <h2
            className="text-[12px] font-bold uppercase tracking-wider mb-1.5 pb-0.5 border-b"
            style={{ color, borderColor: color }}
          >
            Perfil Profesional
          </h2>
          <p className="text-zinc-600 whitespace-pre-line">{datos.perfil}</p>
        </div>
      )}

      {datos.experiencia.length > 0 && (
        <div className="mb-4">
          <h2
            className="text-[12px] font-bold uppercase tracking-wider mb-1.5 pb-0.5 border-b"
            style={{ color, borderColor: color }}
          >
            Experiencia Laboral
          </h2>
          <div className="flex flex-col gap-2.5">
            {datos.experiencia.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-zinc-800">
                    {exp.cargo || "Cargo"}{exp.empresa ? `, ${exp.empresa}` : ""}
                  </h3>
                  <span className="text-[11px] text-zinc-500 shrink-0 ml-2">
                    {formatearRangoFechas(exp.fechaInicio, exp.fechaFin)}
                  </span>
                </div>
                {exp.ubicacion && (
                  <p className="text-zinc-500 italic text-[11px]">{exp.ubicacion}</p>
                )}
                {exp.descripcion && (
                  <p className="text-zinc-600 mt-0.5 whitespace-pre-line">{exp.descripcion}</p>
                )}
                {exp.logros && (
                  <p className="text-zinc-700 mt-0.5 italic text-[11px]">Logros: {exp.logros}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {datos.educacion.length > 0 && (
        <div className="mb-4">
          <h2
            className="text-[12px] font-bold uppercase tracking-wider mb-1.5 pb-0.5 border-b"
            style={{ color, borderColor: color }}
          >
            Educacion
          </h2>
          <div className="flex flex-col gap-2">
            {datos.educacion.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-zinc-800">
                    {edu.titulo || "Titulo"}{edu.institucion ? `, ${edu.institucion}` : ""}
                  </h3>
                  <span className="text-[11px] text-zinc-500 shrink-0 ml-2">
                    {formatearFechaEducacion(edu.fechaInicio, edu.fechaFin)}
                  </span>
                </div>
                {edu.descripcion && (
                  <p className="text-zinc-600 mt-0.5 text-[11px]">{edu.descripcion}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {datos.habilidades.length > 0 && (
        <div className="mb-4">
          <h2
            className="text-[12px] font-bold uppercase tracking-wider mb-1.5 pb-0.5 border-b"
            style={{ color, borderColor: color }}
          >
            Competencias
          </h2>
          <div className="flex flex-wrap gap-2">
            {datos.habilidades.map((h) => (
              <span
                key={h}
                className="rounded border border-zinc-200 px-2.5 py-0.5 text-[11px] text-zinc-700"
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      )}

      {datos.idiomas.length > 0 && (
        <div>
          <h2
            className="text-[12px] font-bold uppercase tracking-wider mb-1.5 pb-0.5 border-b"
            style={{ color, borderColor: color }}
          >
            Idiomas
          </h2>
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-[11px] text-zinc-700">
            {datos.idiomas.map((i) => (
              <span key={i.id}>
                {i.nombre || "Idioma"}{" "}
                <span className="capitalize text-zinc-500">({i.nivel})</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
