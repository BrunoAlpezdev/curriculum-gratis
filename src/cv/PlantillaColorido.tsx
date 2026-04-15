import {
  EnvelopeSimpleIcon,
  PhoneIcon,
  MapPinIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  LightningIcon,
  TranslateIcon,
  UserIcon,
} from "@phosphor-icons/react"
import type { DatosCurriculum, Personalizacion } from "@/types"
import { getColorHex, getColorClaro } from "@/lib/colores"
import { formatearRangoFechas, formatearFechaEducacion } from "@/lib/formato"

interface Props {
  datos: DatosCurriculum
  personalizacion: Personalizacion
}

export function PlantillaColorido({ datos, personalizacion }: Props) {
  const color = getColorHex(personalizacion.color)
  const colorClaro = getColorClaro(color)
  const { datosPersonales: dp } = datos

  return (
    <div className="flex-1 flex flex-col text-[12px] leading-snug font-sans relative overflow-hidden">
      {/* Formas decorativas de fondo */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10" style={{ backgroundColor: color, transform: "translate(30%, -30%)" }} />
      <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full opacity-10" style={{ backgroundColor: color, transform: "translate(-30%, 30%)" }} />

      {/* Header */}
      <div
        className="px-7 py-5 text-white relative overflow-hidden"
        style={{ backgroundColor: color }}
      >
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10 bg-white" style={{ transform: "translate(20%, -50%)" }} />
        <div className="relative">
          <h1 className="text-[22px] font-bold leading-tight">
            {dp.nombreCompleto || "Tu Nombre"}
          </h1>
          {dp.titulo && (
            <p className="text-[13px] mt-0.5 opacity-90">{dp.titulo}</p>
          )}
          <div className="flex flex-wrap gap-4 mt-2 text-[11px] opacity-90">
            {dp.email && (
              <span className="flex items-center gap-1">
                <EnvelopeSimpleIcon size={12} />
                {dp.email}
              </span>
            )}
            {dp.telefono && (
              <span className="flex items-center gap-1">
                <PhoneIcon size={12} />
                {dp.telefono}
              </span>
            )}
            {dp.ubicacion && (
              <span className="flex items-center gap-1">
                <MapPinIcon size={12} />
                {dp.ubicacion}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="px-7 py-4 flex flex-col gap-3 flex-1">
        {/* Perfil */}
        {datos.perfil && (
          <div className="p-3 rounded-lg" style={{ backgroundColor: colorClaro }}>
            <div className="flex items-center gap-1.5 mb-1">
              <UserIcon size={14} style={{ color }} weight="bold" />
              <h2 className="text-[12px] font-bold uppercase tracking-wide" style={{ color }}>
                Perfil Profesional
              </h2>
            </div>
            <p className="text-zinc-600 whitespace-pre-line">{datos.perfil}</p>
          </div>
        )}

        {/* Experiencia */}
        {datos.experiencia.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <BriefcaseIcon size={14} style={{ color }} weight="bold" />
              <h2 className="text-[12px] font-bold uppercase tracking-wide" style={{ color }}>
                Experiencia Laboral
              </h2>
            </div>
            <div className="flex flex-col gap-2.5">
              {datos.experiencia.map((exp) => (
                <div key={exp.id} className="pl-3 border-l-2" style={{ borderColor: color }}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-zinc-800">
                      {exp.cargo || "Cargo"}
                    </h3>
                    <span className="text-[11px] text-zinc-500 shrink-0 ml-2">
                      {formatearRangoFechas(exp.fechaInicio, exp.fechaFin)}
                    </span>
                  </div>
                  <p className="text-zinc-500 italic text-[11px]">
                    {exp.empresa || "Empresa"}
                    {exp.ubicacion && ` · ${exp.ubicacion}`}
                  </p>
                  {exp.descripcion && (
                    <p className="text-zinc-600 mt-0.5 whitespace-pre-line">
                      {exp.descripcion}
                    </p>
                  )}
                  {exp.logros && (
                    <p className="mt-0.5 text-[11px] font-medium" style={{ color }}>
                      Logros: {exp.logros}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Educacion */}
        {datos.educacion.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <GraduationCapIcon size={14} style={{ color }} weight="bold" />
              <h2 className="text-[12px] font-bold uppercase tracking-wide" style={{ color }}>
                Educacion
              </h2>
            </div>
            <div className="flex flex-col gap-2">
              {datos.educacion.map((edu) => (
                <div key={edu.id} className="pl-3 border-l-2" style={{ borderColor: color }}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-zinc-800">
                      {edu.titulo || "Titulo"}
                    </h3>
                    <span className="text-[11px] text-zinc-500 shrink-0 ml-2">
                      {formatearFechaEducacion(edu.fechaInicio, edu.fechaFin)}
                    </span>
                  </div>
                  <p className="text-zinc-500 italic text-[11px]">
                    {edu.institucion || "Institucion"}
                  </p>
                  {edu.descripcion && (
                    <p className="text-zinc-600 mt-0.5 text-[11px]">{edu.descripcion}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Habilidades */}
        {datos.habilidades.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <LightningIcon size={14} style={{ color }} weight="bold" />
              <h2 className="text-[12px] font-bold uppercase tracking-wide" style={{ color }}>
                Competencias
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {datos.habilidades.map((h) => (
                <span
                  key={h}
                  className="rounded-full border px-3 py-0.5 text-[11px] font-medium"
                  style={{ backgroundColor: colorClaro, color, borderColor: `${color}30` }}
                >
                  {h}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Idiomas */}
        {datos.idiomas.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <TranslateIcon size={14} style={{ color }} weight="bold" />
              <h2 className="text-[12px] font-bold uppercase tracking-wide" style={{ color }}>
                Idiomas
              </h2>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-1 text-[11px]">
              {datos.idiomas.map((i) => (
                <span key={i.id} className="text-zinc-700">
                  {i.nombre || "Idioma"}{" "}
                  <span className="capitalize text-zinc-400">({i.nivel})</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
