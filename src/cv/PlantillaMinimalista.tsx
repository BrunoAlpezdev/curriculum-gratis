import type { DatosCurriculum, Personalizacion } from "@/types"
import { getColorHex } from "@/lib/colores"
import { formatearRangoFechas, formatearFechaEducacion, formatearFecha } from "@/lib/formato"

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
        <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-2 text-[11px] text-zinc-400">
          {dp.email && <span>{dp.email}</span>}
          {dp.telefono && <span>{dp.telefono}</span>}
          {dp.ubicacion && <span>{dp.ubicacion}</span>}
          {dp.linkedin && <span>{dp.linkedin}</span>}
          {dp.github && <span>{dp.github}</span>}
          {dp.sitioWeb && <span>{dp.sitioWeb}</span>}
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

      {datos.cursos.length > 0 && (
        <div className="mb-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2.5">
            Cursos y Certificaciones
          </h2>
          <div className="flex flex-col gap-1.5">
            {datos.cursos.map((curso) => (
              <div key={curso.id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-semibold text-zinc-800">
                      {curso.nombre || "Curso"}
                    </span>
                    {curso.institucion && (
                      <>
                        <span className="text-zinc-400 mx-1.5">—</span>
                        <span className="text-zinc-500">{curso.institucion}</span>
                      </>
                    )}
                  </div>
                  {curso.fecha && (
                    <span className="text-[11px] text-zinc-400 shrink-0 ml-2">
                      {formatearFecha(curso.fecha)}
                    </span>
                  )}
                </div>
                {curso.url && (
                  <p className="text-[11px] text-zinc-400">{curso.url}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {datos.proyectos.length > 0 && (
        <div className="mb-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2.5">
            Proyectos
          </h2>
          <div className="flex flex-col gap-2">
            {datos.proyectos.map((p) => (
              <div key={p.id}>
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-zinc-800">
                    {p.nombre || "Proyecto"}
                  </span>
                  {p.url && (
                    <span className="text-[11px] text-zinc-400 shrink-0 ml-2">
                      {p.url}
                    </span>
                  )}
                </div>
                {p.tecnologias && (
                  <p className="text-[11px] text-zinc-400">{p.tecnologias}</p>
                )}
                {p.descripcion && (
                  <p className="text-zinc-500 mt-0.5 whitespace-pre-line">
                    {p.descripcion}
                  </p>
                )}
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
        <div className="mb-4">
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

      {datos.referencias.length > 0 && (
        <div>
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2.5">
            Referencias
          </h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            {datos.referencias.map((ref) => (
              <div key={ref.id}>
                <p className="font-semibold text-zinc-800">{ref.nombre || "Nombre"}</p>
                {(ref.cargo || ref.empresa) && (
                  <p className="text-zinc-500 text-[11px]">
                    {ref.cargo}
                    {ref.cargo && ref.empresa && " — "}
                    {ref.empresa}
                  </p>
                )}
                {ref.relacion && (
                  <p className="text-zinc-400 text-[11px]">{ref.relacion}</p>
                )}
                <div className="flex flex-wrap gap-x-3 text-[11px] text-zinc-500">
                  {ref.email && <span>{ref.email}</span>}
                  {ref.telefono && <span>{ref.telefono}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(datos.disponibilidad || datos.pretensionesRenta) && (
        <div className="mt-4 pt-3 border-t border-zinc-100 text-[11px] text-zinc-500 flex flex-wrap gap-x-5 gap-y-1">
          {datos.disponibilidad && (
            <span>
              <span className="uppercase tracking-[0.15em] text-[10px] font-semibold text-zinc-400">Disponibilidad:</span>{" "}
              {datos.disponibilidad}
            </span>
          )}
          {datos.pretensionesRenta && (
            <span>
              <span className="uppercase tracking-[0.15em] text-[10px] font-semibold text-zinc-400">Pretension:</span>{" "}
              {datos.pretensionesRenta}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
