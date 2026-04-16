"use client"

import { useState, useRef } from "react"
import { DownloadSimpleIcon, ArrowCounterClockwiseIcon, SpinnerIcon, SunIcon, MoonIcon, MonitorIcon, EyeIcon } from "@phosphor-icons/react"
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
    carrera: "Ingenieria Civil en Computacion",
    habilidades: ["TypeScript", "React", "Node.js", "PostgreSQL", "Docker", "AWS", "Git", "Scrum"],
  },
  {
    nombre: "Roberto Mamani Quispe",
    titulo: "Operador de Maquinaria Pesada",
    email: "roberto.mamani@email.com",
    perfil: "Operador de maquinaria pesada con 12 años de experiencia en mineria a gran escala. Certificado en operacion de camiones Komatsu 930E y palas hidraulicas CAT 6060. Comprometido con la seguridad y el cumplimiento de protocolos operacionales.",
    cargo1: "Operador de Camion Minero", cargo2: "Operador de Pala Mecanica",
    carrera: "Tecnico en Maquinaria Pesada",
    habilidades: ["Komatsu 930E", "CAT 6060", "Licencia D", "Seguridad Minera", "Mantencion Preventiva", "Trabajo en Altura", "SAP PM", "Primeros Auxilios"],
  },
  {
    nombre: "Javiera Sepulveda Araya",
    titulo: "Estilista Profesional",
    email: "javiera.sepulveda@email.com",
    perfil: "Estilista profesional con 8 años de experiencia en corte, colorimetria y tratamientos capilares. Especializada en tecnicas de balayage y alisados. Atencion personalizada enfocada en resaltar la imagen de cada cliente.",
    cargo1: "Estilista Senior", cargo2: "Colorista",
    carrera: "Cosmetologia y Estilismo Profesional",
    habilidades: ["Colorimetria", "Balayage", "Corte", "Alisado", "Tratamientos Capilares", "Atencion al Cliente", "Keratina", "Maquillaje"],
  },
  {
    nombre: "Carlos Figueroa Tapia",
    titulo: "Encargado de Bodega e Inventario",
    email: "carlos.figueroa@email.com",
    perfil: "Profesional de logistica con 6 años de experiencia en gestion de inventarios y control de bodega. Manejo avanzado de sistemas WMS y procesos de recepcion, almacenamiento y despacho.",
    cargo1: "Encargado de Bodega", cargo2: "Asistente de Inventario",
    carrera: "Tecnico en Logistica",
    habilidades: ["WMS", "Control de Inventario", "SAP MM", "Despacho", "Recepcion de Mercaderia", "Excel", "Grua Horquilla", "Picking"],
  },
  {
    nombre: "Valentina Muñoz Lagos",
    titulo: "Analista de Datos",
    email: "valentina.munoz@email.com",
    perfil: "Analista de datos con experiencia en business intelligence y machine learning. Apasionada por transformar datos complejos en insights accionables para la toma de decisiones.",
    cargo1: "Data Analyst Senior", cargo2: "Analista de Business Intelligence",
    carrera: "Ingenieria en Informatica",
    habilidades: ["Python", "SQL", "Power BI", "Tableau", "Pandas", "Machine Learning", "Excel Avanzado", "ETL"],
  },
  {
    nombre: "Sebastian Torres Medina",
    titulo: "Contador Auditor",
    email: "sebastian.torres@email.com",
    perfil: "Contador auditor con 8 años de experiencia en auditoria financiera y tributaria. Especializado en IFRS, normativa tributaria chilena y optimizacion de procesos contables.",
    cargo1: "Contador Senior", cargo2: "Analista Contable",
    carrera: "Contabilidad y Auditoria",
    habilidades: ["IFRS", "Auditoria", "SAP", "Tributaria", "Excel Avanzado", "ERP", "Presupuestos", "Conciliaciones"],
  },
  {
    nombre: "Pedro Arancibia Cortes",
    titulo: "Soldador Certificado",
    email: "pedro.arancibia@email.com",
    perfil: "Soldador certificado con 10 años de experiencia en soldadura MIG, TIG y arco manual. Trabajo en plantas industriales, mineria y construccion. Cumplimiento estricto de normas de seguridad y calidad AWS.",
    cargo1: "Soldador Especialista", cargo2: "Ayudante de Soldadura",
    carrera: "Tecnico en Soldadura Industrial",
    habilidades: ["Soldadura MIG", "Soldadura TIG", "Arco Manual", "Lectura de Planos", "AWS D1.1", "Oxicorte", "Seguridad Industrial", "Esmerilado"],
  },
  {
    nombre: "Maria Jose Contreras Vega",
    titulo: "Tecnica en Enfermeria",
    email: "mariajose.contreras@email.com",
    perfil: "Tecnica en enfermeria con 5 años de experiencia en atencion hospitalaria y ambulatoria. Especializada en cuidados del paciente critico, toma de muestras y administracion de medicamentos.",
    cargo1: "Tecnica en Enfermeria", cargo2: "Auxiliar de Enfermeria",
    carrera: "Tecnico en Enfermeria",
    habilidades: ["Toma de Muestras", "Signos Vitales", "RCP", "Administracion de Medicamentos", "Curaciones", "Atencion al Paciente", "Registro Clinico", "Esterilizacion"],
  },
  {
    nombre: "Luis Henriquez Palma",
    titulo: "Electricista Industrial",
    email: "luis.henriquez@email.com",
    perfil: "Electricista industrial con licencia SEC clase A, 9 años de experiencia en instalaciones electricas de media y baja tension. Mantencion preventiva y correctiva en plantas industriales y mineras.",
    cargo1: "Electricista Industrial", cargo2: "Ayudante Electrico",
    carrera: "Tecnico en Electricidad Industrial",
    habilidades: ["Media Tension", "Baja Tension", "Licencia SEC A", "PLC", "Tableros Electricos", "Canalizacion", "Lectura de Planos", "Norma NCH 4/2003"],
  },
  {
    nombre: "Andrea Fuentes Castillo",
    titulo: "Vendedora Retail",
    email: "andrea.fuentes@email.com",
    perfil: "Profesional de ventas con 4 años de experiencia en retail y atencion al cliente. Orientada al cumplimiento de metas y fidelizacion de clientes. Manejo de caja y reposicion de productos.",
    cargo1: "Vendedora Senior", cargo2: "Cajera",
    carrera: "Administracion de Empresas mencion Marketing",
    habilidades: ["Atencion al Cliente", "Ventas", "Caja", "Visual Merchandising", "SAP Retail", "Manejo de Inventario", "Postventa", "Trabajo en Equipo"],
  },
]

const EMPRESAS = [
  "TechCorp Chile", "Falabella", "Banco Estado", "LATAM Airlines", "Cencosud",
  "Minera Escondida", "Codelco", "SQM", "Sodimac", "Lider Express",
  "Clinica Alemana", "Hospital Regional", "Salon Estilo", "Beauty Center",
  "Constructora Echeverria", "Logistica Andina", "Frigorifico del Sur",
]
const UBICACIONES = [
  "Santiago, Chile", "Valparaiso, Chile", "Concepcion, Chile",
  "Antofagasta, Chile", "Calama, Chile", "Iquique, Chile",
  "Copiapo, Chile", "La Serena, Chile", "Temuco, Chile", "Rancagua, Chile",
]
const INSTITUCIONES = [
  "Universidad de Chile", "PUC Chile", "Universidad de Santiago",
  "UTFSM", "Duoc UC", "INACAP", "CFT Santo Tomas",
  "Instituto AIEP", "CFT CENCO", "Liceo Industrial",
]

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
        titulo: perfil.carrera,
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

const DATOS_EJEMPLO: DatosCurriculum = {
  datosPersonales: {
    nombreCompleto: "Bruno Alexis Perez Valenzuela",
    titulo: "Ingeniero en Informatica",
    email: "brunoalpezdev@gmail.com",
    telefono: "+56 9 4896 2736",
    ubicacion: "Chile",
  },
  perfil:
    "Ingeniero en Informatica con experiencia en automatizacion, analisis de datos y reestructuracion de procesos complejos. Especializado en Tecnologias Web y Python para automatizaciones, optimizacion de procesos y generacion de herramientas internas orientadas a operaciones y toma de decisiones. Experiencia previa en liderazgo tecnico y modernizacion de sistemas internos.",
  experiencia: [
    {
      id: crypto.randomUUID(),
      empresa: "Freightsimple",
      cargo: "Fullstack Engineer",
      ubicacion: "Canada (Remoto)",
      fechaInicio: "2025-10",
      fechaFin: null,
      descripcion:
        "Lidere como Lead Engineer dos proyectos estrategicos en paralelo: migracion de herramienta interna core y establecimiento de estandares de calidad de codigo, asegurando continuidad operativa y mejoras arquitectonicas sin degradar performance. Defini decisiones arquitectonicas clave para reducir deuda tecnica y desarrolle nuevas features para la herramienta interna. Gestione iteraciones del equipo bajo flujo Kanban en Linear.",
      logros: "",
    },
    {
      id: crypto.randomUUID(),
      empresa: "TechLex Matthei",
      cargo: "Analista de Base de Datos y Desarrollador",
      ubicacion: "Chile",
      fechaInicio: "2025-03",
      fechaFin: "2025-10",
      descripcion:
        "Automatizacion de procesos internos con Python, reduciendo tareas manuales de mas de 8 horas a menos de 10 minutos. Desarrollo de herramientas internas para procesamiento y validacion de datos sensibles. Monitoreo de desempeño y analisis de consistencia de datos operativos. Optimizacion de consultas PostgreSQL para reducir carga en infraestructura cloud.",
      logros: "",
    },
  ],
  educacion: [
    {
      id: crypto.randomUUID(),
      institucion: "IP Duoc UC",
      titulo: "Ingenieria en Informatica",
      fechaInicio: "2021-03",
      fechaFin: "2024-12",
      descripcion: "",
    },
  ],
  habilidades: [
    "Python",
    "React",
    "Next.js",
    "Flask",
    "Django",
    "PostgreSQL",
    "MySQL",
    "SQL",
    "Excel",
    "Automatizacion ETL",
    "Pentaho",
    "Kotlin",
  ],
  idiomas: [
    { id: crypto.randomUUID(), nombre: "Español", nivel: "nativo" },
    { id: crypto.randomUUID(), nombre: "Ingles", nivel: "avanzado" },
  ],
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

  function cargarEjemplo() {
    useCurriculumStore.setState({ datos: DATOS_EJEMPLO })
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
        <Button variant="ghost" size="sm" className="hidden md:inline-flex" onClick={cargarEjemplo}>
          <EyeIcon size={16} />
          Ver ejemplo
        </Button>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={cargarEjemplo} title="Ver ejemplo">
          <EyeIcon size={16} />
        </Button>
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
