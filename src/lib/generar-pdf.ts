import html2canvas from "html2canvas-pro"
import { jsPDF } from "jspdf"

const A4_WIDTH_MM = 210
const A4_HEIGHT_MM = 297
// Tolerancia de 2mm para redondeo de pixeles
const A4_TOLERANCIA_MM = 2

/**
 * Captura el CV del preview exactamente como se ve y lo descarga como PDF.
 * El elemento #curriculum-pdf tiene ancho fijo de 794px (A4 a 96dpi).
 */
export async function generarPdf(nombreCompleto: string) {
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
    // Cabe en una pagina — escalar para llenar el A4 exacto
    pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, A4_HEIGHT_MM)
  } else {
    // Multiples paginas
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
