import html2canvas from "html2canvas-pro"
import { jsPDF } from "jspdf"
import type { DatosCurriculum, Personalizacion } from "@/types"
import { PLANTILLAS } from "@/lib/constantes"

const A4_WIDTH_MM = 210
const A4_HEIGHT_MM = 297
const A4_TOLERANCIA_MM = 2

/**
 * Genera PDF con el metodo apropiado segun la plantilla:
 * - ATS (clasico, minimalista): texto nativo con jsPDF
 * - Visual (moderno, colorido): captura con html2canvas
 */
export async function generarPdf(
  datos: DatosCurriculum,
  personalizacion: Personalizacion,
) {
  const plantilla = PLANTILLAS.find((p) => p.valor === personalizacion.plantilla)

  if (plantilla?.ats) {
    const { generarPdfAts } = await import("@/lib/generar-pdf-ats")
    generarPdfAts(datos, personalizacion)
  } else {
    await generarPdfVisual(datos.datosPersonales.nombreCompleto)
  }
}

async function generarPdfVisual(nombreCompleto: string) {
  const el = document.getElementById("curriculum-pdf")
  if (!el) return

  const canvas = await html2canvas(el, {
    scale: 3,
    useCORS: true,
    backgroundColor: "#ffffff",
  })

  const imgData = canvas.toDataURL("image/jpeg", 0.95)
  const pdf = new jsPDF("p", "mm", "a4")

  const imgWidth = A4_WIDTH_MM
  const imgHeight = (canvas.height * A4_WIDTH_MM) / canvas.width

  if (imgHeight <= A4_HEIGHT_MM + A4_TOLERANCIA_MM) {
    pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, A4_HEIGHT_MM)
  } else {
    let posY = 0
    while (posY < imgHeight) {
      if (posY > 0) pdf.addPage()
      pdf.addImage(imgData, "JPEG", 0, -posY, imgWidth, imgHeight)
      posY += A4_HEIGHT_MM
    }
  }

  const nombre = nombreCompleto.trim().replace(/\s+/g, "_") || "curriculum"
  pdf.save(`${nombre}_CV.pdf`)
}
