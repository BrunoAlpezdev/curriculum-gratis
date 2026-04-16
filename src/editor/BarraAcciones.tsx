"use client"

import { useState, useRef } from "react"
import { DownloadSimpleIcon, ArrowCounterClockwiseIcon, SpinnerIcon, SunIcon, MoonIcon, MonitorIcon } from "@phosphor-icons/react"
import { Button } from "@/components/atoms/Button"
import { useCurriculumStore } from "@/lib/store"
import { useTema, type Tema } from "@/lib/useTema"
import type { DatosCurriculum } from "@/types"

const CICLO_TEMA: Record<Tema, Tema> = {
  sistema: "claro",
  claro: "oscuro",
  oscuro: "sistema",
}

const ICONO_TEMA: Record<Tema, React.ReactNode> = {
  claro: <SunIcon size={16} />,
  oscuro: <MoonIcon size={16} />,
  sistema: <MonitorIcon size={16} />,
}

const ETIQUETA_TEMA: Record<Tema, string> = {
  claro: "Claro",
  oscuro: "Oscuro",
  sistema: "Sistema",
}

function aleatorio<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!
}

const PERFILES_MOCK = [
  {
    nombre: "Camila Rojas Fernandez",
    titulo: "Ingeniera de Software Senior",
    email: "camila.rojas@email.com",
    perfil: "Ingeniera de software con 6 años de experiencia desarrollando aplicaciones web escalables. Especializada en React, Node.js y arquitectura de microservicios.",
    cargo1: "Ingeniera de Software Senior", cargo2: "Desarrolladora Full Stack",
    habilidades: ["TypeScript", "React", "Node.js", "PostgreSQL", "Docker", "AWS", "Git", "Scrum"],
  },
  {
    nombre: "Matias Gonzalez Parra",
    titulo: "Diseñador UX/UI",
    email: "matias.gonzalez@email.com",
    perfil: "Diseñador UX/UI con 5 años creando experiencias digitales centradas en el usuario. Experto en design systems, prototipado y research cualitativo.",
    cargo1: "Diseñador UX Senior", cargo2: "Diseñador UI",
    habilidades: ["Figma", "Prototyping", "User Research", "Design Systems", "HTML/CSS", "Accesibilidad", "Illustrator", "Motion Design"],
  },
  {
    nombre: "Valentina Muñoz Lagos",
    titulo: "Analista de Datos",
    email: "valentina.munoz@email.com",
    perfil: "Analista de datos con experiencia en business intelligence y machine learning. Apasionada por transformar datos complejos en insights accionables para la toma de decisiones.",
    cargo1: "Data Analyst Senior", cargo2: "Analista de Business Intelligence",
    habilidades: ["Python", "SQL", "Power BI", "Tableau", "Pandas", "Machine Learning", "Excel Avanzado", "ETL"],
  },
  {
    nombre: "Sebastian Torres Medina",
    titulo: "Contador Auditor",
    email: "sebastian.torres@email.com",
    perfil: "Contador auditor con 8 años de experiencia en auditoria financiera y tributaria. Especializado en IFRS, normativa tributaria chilena y optimizacion de procesos contables.",
    cargo1: "Contador Senior", cargo2: "Analista Contable",
    habilidades: ["IFRS", "Auditoria", "SAP", "Tributaria", "Excel Avanzado", "ERP", "Presupuestos", "Conciliaciones"],
  },
  {
    nombre: "Francisca Herrera Soto",
    titulo: "Project Manager",
    email: "francisca.herrera@email.com",
    perfil: "Project Manager certificada PMP con 7 años liderando proyectos tecnologicos de gran escala. Experiencia en metodologias agiles y gestion de equipos multidisciplinarios.",
    cargo1: "Project Manager Senior", cargo2: "Scrum Master",
    habilidades: ["Scrum", "Kanban", "Jira", "PMP", "Gestion de Riesgos", "Stakeholders", "OKRs", "Confluence"],
  },
  {
    nombre: "Diego Vargas Cifuentes",
    titulo: "Ingeniero Civil Industrial",
    email: "diego.vargas@email.com",
    perfil: "Ingeniero civil industrial con enfoque en optimizacion de procesos y gestion de operaciones. Experiencia en logistica, supply chain y mejora continua con metodologia Lean.",
    cargo1: "Jefe de Operaciones", cargo2: "Analista de Procesos",
    habilidades: ["Lean", "Six Sigma", "SAP", "Power BI", "Gestion de Proyectos", "Logistica", "KPIs", "Simulacion"],
  },
]

const EMPRESAS = ["TechCorp Chile", "StartupLab", "Globant", "Falabella Tech", "Banco Estado", "Entel", "LATAM Airlines", "Walmart Chile", "Cencosud", "BCI Labs"]
const UBICACIONES = ["Santiago, Chile", "Valparaiso, Chile", "Concepcion, Chile", "Viña del Mar, Chile", "La Serena, Chile"]
const INSTITUCIONES = ["Universidad de Chile", "PUC Chile", "Universidad de Santiago", "Universidad Tecnica Federico Santa Maria", "Universidad de Concepcion", "Duoc UC"]
const CARRERAS = ["Ingenieria Civil en Computacion", "Ingenieria Comercial", "Diseño Grafico", "Contabilidad y Auditoria", "Ingenieria Civil Industrial", "Administracion de Empresas"]

function generarDatosMock(): DatosCurriculum {
  const perfil = aleatorio(PERFILES_MOCK)
  return {
    datosPersonales: {
      nombreCompleto: perfil.nombre,
      titulo: perfil.titulo,
      email: perfil.email,
      telefono: `+56 9 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`,
      ubicacion: aleatorio(UBICACIONES),
    },
    perfil: perfil.perfil,
    experiencia: [
      {
        id: crypto.randomUUID(),
        empresa: aleatorio(EMPRESAS),
        cargo: perfil.cargo1,
        ubicacion: aleatorio(UBICACIONES),
        fechaInicio: "2021-03",
        fechaFin: null,
        descripcion: "Liderazgo tecnico y desarrollo de soluciones de alto impacto. Colaboracion directa con stakeholders para definir roadmap de producto.",
        logros: "Reduccion de costos operativos en un 30%. Implementacion de procesos que mejoraron la productividad del equipo.",
      },
      {
        id: crypto.randomUUID(),
        empresa: aleatorio(EMPRESAS),
        cargo: perfil.cargo2,
        ubicacion: aleatorio(UBICACIONES),
        fechaInicio: "2018-06",
        fechaFin: "2021-02",
        descripcion: "Desarrollo e implementacion de proyectos clave para el area. Coordinacion con equipos multidisciplinarios.",
        logros: "Reconocimiento como mejor profesional del area en 2020.",
      },
    ],
    educacion: [
      {
        id: crypto.randomUUID(),
        institucion: aleatorio(INSTITUCIONES),
        titulo: aleatorio(CARRERAS),
        fechaInicio: "2013-03",
        fechaFin: "2018-01",
        descripcion: "Graduacion con distincion. Participacion activa en proyectos de investigacion.",
      },
    ],
    habilidades: perfil.habilidades,
    idiomas: [
      { id: crypto.randomUUID(), nombre: "Español", nivel: "nativo" },
      { id: crypto.randomUUID(), nombre: "Ingles", nivel: "avanzado" },
    ],
  }
}

const TAPS_REQUERIDOS = 5
const VENTANA_MS = 2000

export function BarraAcciones() {
  const [descargando, setDescargando] = useState(false)
  const datos = useCurriculumStore((s) => s.datos)
  const personalizacion = useCurriculumStore((s) => s.personalizacion)
  const reiniciarStore = useCurriculumStore((s) => s.reiniciar)
  const tapsRef = useRef<number[]>([])

  function handleTapTitulo() {
    const ahora = Date.now()
    tapsRef.current = tapsRef.current.filter((t) => ahora - t < VENTANA_MS)
    tapsRef.current.push(ahora)
    if (tapsRef.current.length >= TAPS_REQUERIDOS) {
      tapsRef.current = []
      useCurriculumStore.setState({ datos: generarDatosMock() })
    }
  }

  function reiniciar() {
    if (window.confirm("¿Seguro que quieres reiniciar? Se borrarán todos los datos del curriculum.")) {
      reiniciarStore()
    }
  }
  const { tema, setTema } = useTema()

  async function descargar() {
    setDescargando(true)
    try {
      const { generarPdf } = await import("@/lib/generar-pdf")
      await generarPdf(datos, personalizacion)
    } finally {
      setDescargando(false)
    }
  }

  return (
    <div data-no-print className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 md:px-4 py-2">
      <div className="flex items-center gap-1.5 min-w-0">
        <h1
          className="text-sm font-bold text-zinc-800 dark:text-zinc-200 truncate cursor-default select-none"
          onClick={handleTapTitulo}
        >
          <span className="md:hidden">CV Gratis</span>
          <span className="hidden md:inline">Generador de Curriculum</span>
        </h1>
        <span className="hidden md:inline text-xs text-zinc-400 dark:text-zinc-500">·</span>
        <span className="hidden md:inline text-xs text-zinc-400 dark:text-zinc-500 shrink-0">100% gratuito</span>
      </div>
      <div className="flex items-center gap-1 md:gap-2 shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:inline-flex"
          onClick={() => setTema(CICLO_TEMA[tema])}
          title={ETIQUETA_TEMA[tema]}
        >
          {ICONO_TEMA[tema]}
        </Button>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={reiniciar} title="Reiniciar">
          <ArrowCounterClockwiseIcon size={16} />
        </Button>
        <Button variant="ghost" size="sm" className="hidden md:inline-flex" onClick={reiniciar}>
          <ArrowCounterClockwiseIcon size={16} />
          Reiniciar
        </Button>
        <Button size="sm" className="whitespace-nowrap" onClick={descargar} disabled={descargando}>
          {descargando ? (
            <SpinnerIcon size={16} className="animate-spin" />
          ) : (
            <DownloadSimpleIcon size={16} />
          )}
          {descargando ? "Descargando..." : "Descargar PDF"}
        </Button>
      </div>
    </div>
  )
}
