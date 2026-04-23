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
    /* Multi-pagina con cortes inteligentes.
       En vez de partir al multiplo exacto de A4 (lo que corta titulos y
       parrafos a la mitad), buscamos la fila con mas pixeles blancos
       dentro de un rango cerca del corte ideal. Eso hace que los cortes
       caigan en los "huecos" naturales entre secciones. */
    const pxPorMm = canvas.width / A4_WIDTH_MM
    const altoPaginaPx = A4_HEIGHT_MM * pxPorMm
    const RANGO_BUSQUEDA_PX = Math.round(altoPaginaPx * 0.18) // ~18% de la pagina

    const ctxOrig = canvas.getContext("2d", { willReadFrequently: true })
    const scoresBlanco = ctxOrig ? calcularBlancosPorFila(ctxOrig, canvas) : null

    let offsetPx = 0
    let paginaIdx = 0

    while (offsetPx < canvas.height - 2) {
      const altoRestante = canvas.height - offsetPx
      let alturaEstaSlice: number

      if (altoRestante <= altoPaginaPx) {
        alturaEstaSlice = altoRestante
      } else {
        const corteIdeal = offsetPx + altoPaginaPx
        const corteAjustado = scoresBlanco
          ? mejorCorte(scoresBlanco, corteIdeal, RANGO_BUSQUEDA_PX, offsetPx + altoPaginaPx * 0.6)
          : corteIdeal
        alturaEstaSlice = corteAjustado - offsetPx
      }

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

      offsetPx += alturaEstaSlice
      paginaIdx += 1
    }
  }

  const nombre = nombreCompleto.trim().replace(/\s+/g, "_") || "curriculum"
  pdf.save(`${nombre}_CV.pdf`)
}

/* Cuenta pixeles cercanos al blanco por fila del canvas.
   Una fila con muchos pixeles blancos es un buen candidato a corte
   porque significa que hay espacio entre elementos (gap entre secciones). */
function calcularBlancosPorFila(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
): Uint32Array {
  const { width, height } = canvas
  const scores = new Uint32Array(height)
  /* Leemos en chunks para no crashear con canvases gigantes */
  const CHUNK_FILAS = 512
  for (let yInicio = 0; yInicio < height; yInicio += CHUNK_FILAS) {
    const altoChunk = Math.min(CHUNK_FILAS, height - yInicio)
    const img = ctx.getImageData(0, yInicio, width, altoChunk)
    const data = img.data
    for (let fila = 0; fila < altoChunk; fila++) {
      let blancos = 0
      const offsetFila = fila * width * 4
      for (let col = 0; col < width; col++) {
        const i = offsetFila + col * 4
        if (data[i]! >= 240 && data[i + 1]! >= 240 && data[i + 2]! >= 240) {
          blancos++
        }
      }
      scores[yInicio + fila] = blancos
    }
  }
  return scores
}

/* Encuentra la fila con mas pixeles blancos en [ideal - rango, ideal + rango],
   con restriccion de un minimo (para evitar paginas demasiado cortas).
   Prefiere cortes cerca del ideal si los scores son similares. */
function mejorCorte(
  scoresBlanco: Uint32Array,
  corteIdeal: number,
  rango: number,
  minimo: number,
): number {
  const inicio = Math.max(Math.round(minimo), corteIdeal - rango)
  const fin = Math.min(scoresBlanco.length - 1, corteIdeal + rango)
  if (inicio >= fin) return corteIdeal

  let mejor = corteIdeal
  let mejorPuntaje = -Infinity

  for (let y = inicio; y <= fin; y++) {
    /* Ligera penalidad por distancia al ideal, para desempatar */
    const distancia = Math.abs(y - corteIdeal)
    const puntaje = (scoresBlanco[y] ?? 0) - distancia * 0.5
    if (puntaje > mejorPuntaje) {
      mejorPuntaje = puntaje
      mejor = y
    }
  }
  return mejor
}
