import html2canvas from "html2canvas-pro"
import { jsPDF } from "jspdf"
import type { DatosCurriculum, Personalizacion } from "@/types"
import { PLANTILLAS } from "@/lib/constantes"
import { A4_WIDTH_PX, A4_HEIGHT_PX } from "@/cv/CurriculumVista"

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

  /* scrollHeight incluye overflow invisible; offsetHeight solo el box renderizado.
     En flex columns el contenido a veces queda flush al border y offsetHeight
     se queda corto — scrollHeight es mas robusto para medir el contenido real. */
  const alturaContenido = Math.max(el.scrollHeight, el.offsetHeight, A4_HEIGHT_PX)

  const canvas = await html2canvas(el, {
    scale: 3,
    useCORS: true,
    backgroundColor: "#ffffff",
    windowWidth: A4_WIDTH_PX,
    windowHeight: alturaContenido,
    width: A4_WIDTH_PX,
    height: alturaContenido,
    onclone: (_doc: Document, elClonado: HTMLElement) => {
      /* No forzamos height — dejamos que el clon crezca con su contenido.
         Forzar height + position absolute colapsaba el rendering a 1 pagina. */
      elClonado.style.width = `${A4_WIDTH_PX}px`
      elClonado.style.minWidth = `${A4_WIDTH_PX}px`
      elClonado.style.maxWidth = `${A4_WIDTH_PX}px`
      elClonado.style.minHeight = `${A4_HEIGHT_PX}px`
      elClonado.style.transform = "none"

      let ancestro: HTMLElement | null = elClonado.parentElement
      while (ancestro) {
        ancestro.style.transform = "none"
        ancestro.style.overflow = "visible"
        ancestro.classList.remove("hidden")
        ancestro = ancestro.parentElement
      }
    },
  })

  /* PNG preserva texto nitido (JPEG generaba halos alrededor de cada letra).
     compress: true en jsPDF aplica deflate al PNG antes de embeberlo. */
  const pdf = new jsPDF({ orientation: "p", unit: "mm", format: "a4", compress: true })

  const imgWidth = A4_WIDTH_MM
  const imgHeight = (canvas.height * A4_WIDTH_MM) / canvas.width

  if (imgHeight <= A4_HEIGHT_MM + A4_TOLERANCIA_MM) {
    const imgData = canvas.toDataURL("image/png")
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, A4_HEIGHT_MM, undefined, "FAST")
  } else {
    /* Multi-pagina: recortamos el canvas en slices de altura A4 y
       embebemos cada uno por separado. Evita depender de PDF viewers
       para clipear una imagen gigante que se extiende mas alla de la pagina. */
    const pxPorMm = canvas.width / A4_WIDTH_MM
    const altoSliceCanvasPx = A4_HEIGHT_MM * pxPorMm
    let offsetPx = 0
    let paginaIdx = 0

    while (offsetPx < canvas.height - 2) {
      const altoRestante = canvas.height - offsetPx
      const alturaEstaSlice = Math.min(altoSliceCanvasPx, altoRestante)

      const sliceCanvas = document.createElement("canvas")
      sliceCanvas.width = canvas.width
      sliceCanvas.height = alturaEstaSlice
      const ctx = sliceCanvas.getContext("2d")
      if (!ctx) break
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height)
      ctx.drawImage(
        canvas,
        0, offsetPx, canvas.width, alturaEstaSlice,
        0, 0, sliceCanvas.width, alturaEstaSlice,
      )

      if (paginaIdx > 0) pdf.addPage()
      const sliceData = sliceCanvas.toDataURL("image/png")
      const sliceAltoMm = alturaEstaSlice / pxPorMm
      pdf.addImage(sliceData, "PNG", 0, 0, imgWidth, sliceAltoMm, undefined, "FAST")

      offsetPx += altoSliceCanvasPx
      paginaIdx += 1
    }
  }

  const nombre = nombreCompleto.trim().replace(/\s+/g, "_") || "curriculum"
  pdf.save(`${nombre}_CV.pdf`)
}
