import {
  EnvelopeSimpleIcon,
  PhoneIcon,
  MapPinIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  LightningIcon,
  TranslateIcon,
} from "@phosphor-icons/react"
import type { DatosCurriculum, Personalizacion } from "@/types"
import { getColorHex } from "@/lib/colores"
import { formatearRangoFechas, formatearFechaEducacion } from "@/lib/formato"

interface Props {
  datos: DatosCurriculum
  personalizacion: Personalizacion
}

export function PlantillaModerno({ datos, personalizacion }: Props) {
  const color = getColorHex(personalizacion.color)
  const { datosPersonales: dp } = datos

  return (
    <div className="flex flex-1 text-[12px] leading-snug font-sans">
      {/* Sidebar */}
      <div
        className="w-[33%] px-5 py-6 text-white flex flex-col gap-5"
        style={{ backgroundColor: color }}
      >
        <div>
          <h1 className="text-[18px] font-bold leading-tight">
            {dp.nombreCompleto || "Tu Nombre"}
          </h1>
          {dp.titulo && (
            <p className="text-[11px] mt-1 opacity-90">{dp.titulo}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5 text-[11px]">
          {dp.email && (
            <div className="flex items-center gap-1.5">
              <EnvelopeSimpleIcon size={12} />
              <span className="break-all">{dp.email}</span>
            </div>
          )}
          {dp.telefono && (
            <div className="flex items-center gap-1.5">
              <PhoneIcon size={12} />
              <span>{dp.telefono}</span>
            </div>
          )}
          {dp.ubicacion && (
            <div className="flex items-center gap-1.5">
              <MapPinIcon size={12} />
              <span>{dp.ubicacion}</span>
            </div>
          )}
        </div>

        {datos.habilidades.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <LightningIcon size={13} weight="bold" />
              <h2 className="text-[11px] font-bold uppercase tracking-wide">Competencias</h2>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {datos.habilidades.map((h) => (
                <span
                  key={h}
                  className="rounded-full px-2.5 py-0.5 text-[10px]"
                  style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                >
                  {h}
                </span>
              ))}
            </div>
          </div>
        )}

        {datos.idiomas.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <TranslateIcon size={13} weight="bold" />
              <h2 className="text-[11px] font-bold uppercase tracking-wide">Idiomas</h2>
            </div>
            <div className="flex flex-col gap-1 text-[11px]">
              {datos.idiomas.map((i) => (
                <div key={i.id} className="flex justify-between">
                  <span>{i.nombre || "Idioma"}</span>
                  <span className="opacity-75 capitalize">{i.nivel}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Contenido principal */}
      <div className="flex-1 px-5 py-6 flex flex-col gap-3">
        {datos.perfil && (
          <div>
            <h2
              className="text-[12px] font-bold uppercase tracking-wide mb-1.5 pb-1 border-b-2"
              style={{ color, borderColor: color }}
            >
              Perfil Profesional
            </h2>
            <p className="text-zinc-600 whitespace-pre-line">{datos.perfil}</p>
          </div>
        )}

        {datos.experiencia.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 mb-2 pb-1 border-b-2" style={{ borderColor: color }}>
              <BriefcaseIcon size={14} style={{ color }} weight="bold" />
              <h2 className="text-[12px] font-bold uppercase tracking-wide" style={{ color }}>
                Experiencia Laboral
              </h2>
            </div>
            <div className="flex flex-col gap-2.5">
              {datos.experiencia.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-zinc-800">{exp.cargo || "Cargo"}</h3>
                    <span className="text-[11px] text-zinc-500 shrink-0 ml-2">
                      {formatearRangoFechas(exp.fechaInicio, exp.fechaFin)}
                    </span>
                  </div>
                  <p className="text-zinc-500 italic text-[11px]">
                    {exp.empresa || "Empresa"}
                    {exp.ubicacion && ` · ${exp.ubicacion}`}
                  </p>
                  {exp.descripcion && (
                    <p className="text-zinc-600 mt-0.5 whitespace-pre-line">{exp.descripcion}</p>
                  )}
                  {exp.logros && (
                    <p className="mt-0.5 text-[11px]" style={{ color }}>
                      <span className="font-semibold">Logros: </span>{exp.logros}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {datos.educacion.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 mb-2 pb-1 border-b-2" style={{ borderColor: color }}>
              <GraduationCapIcon size={14} style={{ color }} weight="bold" />
              <h2 className="text-[12px] font-bold uppercase tracking-wide" style={{ color }}>
                Educacion
              </h2>
            </div>
            <div className="flex flex-col gap-2">
              {datos.educacion.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-zinc-800">{edu.titulo || "Titulo"}</h3>
                    <span className="text-[11px] text-zinc-500 shrink-0 ml-2">
                      {formatearFechaEducacion(edu.fechaInicio, edu.fechaFin)}
                    </span>
                  </div>
                  <p className="text-zinc-500 italic text-[11px]">{edu.institucion || "Institucion"}</p>
                  {edu.descripcion && (
                    <p className="text-zinc-600 mt-0.5 text-[11px]">{edu.descripcion}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
