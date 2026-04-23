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

  /* Si el contenido excede una pagina, usamos la altura real del elemento.
     html2canvas recorta al valor de `height`, asi que fijarlo en A4_HEIGHT_PX
     truncaba CVs largos a la primera pagina. */
  const alturaReal = Math.max(el.offsetHeight, A4_HEIGHT_PX)

  const canvas = await html2canvas(el, {
    scale: 3,
    useCORS: true,
    backgroundColor: "#ffffff",
    windowWidth: A4_WIDTH_PX,
    windowHeight: alturaReal,
    width: A4_WIDTH_PX,
    height: alturaReal,
    onclone: (_doc: Document, elClonado: HTMLElement) => {
      /* Forzar dimensiones exactas A4 en el clon para que
         no dependa del layout del padre ni del DPI del device */
      elClonado.style.width = `${A4_WIDTH_PX}px`
      elClonado.style.minWidth = `${A4_WIDTH_PX}px`
      elClonado.style.maxWidth = `${A4_WIDTH_PX}px`
      elClonado.style.minHeight = `${A4_HEIGHT_PX}px`
      elClonado.style.height = `${alturaReal}px`
      elClonado.style.transform = "none"
      elClonado.style.position = "absolute"
      elClonado.style.top = "0"
      elClonado.style.left = "0"

      let ancestro: HTMLElement | null = elClonado.parentElement
      while (ancestro) {
        ancestro.style.transform = "none"
        ancestro.style.overflow = "visible"
        ancestro.classList.remove("hidden")
        ancestro = ancestro.parentElement
      }
    },
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
