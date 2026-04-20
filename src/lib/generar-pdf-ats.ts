import { jsPDF } from "jspdf"
import type { DatosCurriculum, Personalizacion } from "@/types"
import { getColorHex } from "@/lib/colores"
import { formatearRangoFechas, formatearFechaEducacion } from "@/lib/formato"
import { FUENTES } from "@/lib/constantes"

const MARGIN = 20
const PAGE_WIDTH = 210
const PAGE_HEIGHT = 297
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2

/**
 * Genera un PDF con texto nativo (ATS-friendly).
 * Usado para las plantillas Clasico y Minimalista.
 */
export function generarPdfAts(
  datos: DatosCurriculum,
  personalizacion: Personalizacion,
) {
  const color = hexToRgb(getColorHex(personalizacion.color))
  const fuenteBase = FUENTES.find((f) => f.valor === personalizacion.fuente)?.jsPdf ?? "helvetica"
  const pdf = new jsPDF("p", "mm", "a4")
  let y = MARGIN

  function checkPage(needed: number) {
    if (y + needed > PAGE_HEIGHT - MARGIN) {
      pdf.addPage()
      y = MARGIN
    }
  }

  function setColor(r: number, g: number, b: number) {
    pdf.setTextColor(r, g, b)
  }

  function setAccent() {
    setColor(color.r, color.g, color.b)
  }

  function setBlack() {
    setColor(24, 24, 27)
  }

  function setMuted() {
    setColor(113, 113, 122)
  }

  // --- Header ---
  const dp = datos.datosPersonales

  pdf.setFont(fuenteBase, "bold")
  pdf.setFontSize(20)
  setBlack()
  pdf.text(dp.nombreCompleto || "Tu Nombre", PAGE_WIDTH / 2, y, { align: "center" })
  y += 7

  if (dp.titulo) {
    pdf.setFontSize(11)
    setMuted()
    pdf.text(dp.titulo, PAGE_WIDTH / 2, y, { align: "center" })
    y += 5
  }

  const contacto = [dp.email, dp.telefono, dp.ubicacion].filter(Boolean).join("  |  ")
  if (contacto) {
    pdf.setFont(fuenteBase, "normal")
    pdf.setFontSize(9)
    setMuted()
    pdf.text(contacto, PAGE_WIDTH / 2, y, { align: "center" })
    y += 4
  }

  // Linea separadora
  setAccent()
  pdf.setLineWidth(0.5)
  pdf.setDrawColor(color.r, color.g, color.b)
  pdf.line(MARGIN, y, PAGE_WIDTH - MARGIN, y)
  y += 6

  // --- Perfil ---
  if (datos.perfil) {
    y = renderSeccion(pdf, "PERFIL PROFESIONAL", y, color, fuenteBase)
    pdf.setFont(fuenteBase, "normal")
    pdf.setFontSize(10)
    setMuted()
    const lines = pdf.splitTextToSize(datos.perfil, CONTENT_WIDTH)
    checkPage(lines.length * 4)
    pdf.text(lines, MARGIN, y)
    y += lines.length * 4 + 4
  }

  // --- Experiencia ---
  if (datos.experiencia.length > 0) {
    y = renderSeccion(pdf, "EXPERIENCIA LABORAL", y, color, fuenteBase)
    for (const exp of datos.experiencia) {
      checkPage(20)

      pdf.setFont(fuenteBase, "bold")
      pdf.setFontSize(10)
      setBlack()
      pdf.text(exp.cargo || "Cargo", MARGIN, y)

      const fecha = formatearRangoFechas(exp.fechaInicio, exp.fechaFin)
      if (fecha) {
        pdf.setFont(fuenteBase, "normal")
        pdf.setFontSize(9)
        setMuted()
        pdf.text(fecha, PAGE_WIDTH - MARGIN, y, { align: "right" })
      }
      y += 4

      const subtitulo = [exp.empresa, exp.ubicacion].filter(Boolean).join(" · ")
      if (subtitulo) {
        pdf.setFont(fuenteBase, "oblique")
        pdf.setFontSize(9)
        setMuted()
        pdf.text(subtitulo, MARGIN, y)
        y += 4
      }

      if (exp.descripcion) {
        pdf.setFont(fuenteBase, "normal")
        pdf.setFontSize(9)
        setColor(82, 82, 91)
        const lines = pdf.splitTextToSize(exp.descripcion, CONTENT_WIDTH)
        checkPage(lines.length * 3.5)
        pdf.text(lines, MARGIN, y)
        y += lines.length * 3.5 + 1
      }

      if (exp.logros) {
        pdf.setFont(fuenteBase, "bold")
        pdf.setFontSize(9)
        setAccent()
        const lines = pdf.splitTextToSize(`Logros: ${exp.logros}`, CONTENT_WIDTH)
        checkPage(lines.length * 3.5)
        pdf.text(lines, MARGIN, y)
        y += lines.length * 3.5 + 1
      }

      y += 2
    }
  }

  // --- Educacion ---
  if (datos.educacion.length > 0) {
    y = renderSeccion(pdf, "EDUCACION", y, color, fuenteBase)
    for (const edu of datos.educacion) {
      checkPage(12)

      pdf.setFont(fuenteBase, "bold")
      pdf.setFontSize(10)
      setBlack()
      pdf.text(edu.titulo || "Titulo", MARGIN, y)

      const fecha = formatearFechaEducacion(edu.fechaInicio, edu.fechaFin)
      if (fecha) {
        pdf.setFont(fuenteBase, "normal")
        pdf.setFontSize(9)
        setMuted()
        pdf.text(fecha, PAGE_WIDTH - MARGIN, y, { align: "right" })
      }
      y += 4

      if (edu.institucion) {
        pdf.setFont(fuenteBase, "oblique")
        pdf.setFontSize(9)
        setMuted()
        pdf.text(edu.institucion, MARGIN, y)
        y += 4
      }

      if (edu.descripcion) {
        pdf.setFont(fuenteBase, "normal")
        pdf.setFontSize(9)
        setColor(82, 82, 91)
        const lines = pdf.splitTextToSize(edu.descripcion, CONTENT_WIDTH)
        pdf.text(lines, MARGIN, y)
        y += lines.length * 3.5 + 1
      }

      y += 2
    }
  }

  // --- Habilidades ---
  if (datos.habilidades.length > 0) {
    y = renderSeccion(pdf, "COMPETENCIAS", y, color, fuenteBase)
    pdf.setFont(fuenteBase, "normal")
    pdf.setFontSize(10)
    setColor(82, 82, 91)
    const texto = datos.habilidades.join("  ·  ")
    const lines = pdf.splitTextToSize(texto, CONTENT_WIDTH)
    checkPage(lines.length * 4)
    pdf.text(lines, MARGIN, y)
    y += lines.length * 4 + 4
  }

  // --- Idiomas ---
  if (datos.idiomas.length > 0) {
    y = renderSeccion(pdf, "IDIOMAS", y, color, fuenteBase)
    pdf.setFont(fuenteBase, "normal")
    pdf.setFontSize(10)
    setColor(82, 82, 91)
    const texto = datos.idiomas
      .map((i) => `${i.nombre || "Idioma"} (${i.nivel})`)
      .join("  ·  ")
    const lines = pdf.splitTextToSize(texto, CONTENT_WIDTH)
    checkPage(lines.length * 4)
    pdf.text(lines, MARGIN, y)
  }

  const nombre = dp.nombreCompleto.trim().replace(/\s+/g, "_") || "curriculum"
  pdf.save(`${nombre}_CV.pdf`)
}

function renderSeccion(
  pdf: jsPDF,
  titulo: string,
  y: number,
  color: { r: number; g: number; b: number },
  fuenteBase: string,
): number {
  if (y + 10 > PAGE_HEIGHT - MARGIN) {
    pdf.addPage()
    y = MARGIN
  }

  pdf.setFont(fuenteBase, "bold")
  pdf.setFontSize(10)
  pdf.setTextColor(color.r, color.g, color.b)
  pdf.text(titulo, MARGIN, y)
  y += 1
  pdf.setDrawColor(color.r, color.g, color.b)
  pdf.setLineWidth(0.3)
  pdf.line(MARGIN, y, PAGE_WIDTH - MARGIN, y)
  y += 5
  return y
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return { r, g, b }
}
