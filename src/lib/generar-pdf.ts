import html2canvas from "html2canvas-pro"
import { jsPDF } from "jspdf"
import type { DatosCurriculum, Personalizacion } from "@/types"
import { PLANTILLAS } from "@/lib/constantes"
import { getColorHex } from "@/lib/colores"
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
    await generarPdfVisual(datos.datosPersonales.nombreCompleto, personalizacion)
  }
}

async function generarPdfVisual(
  nombreCompleto: string,
  personalizacion: Personalizacion,
) {
  const el = document.getElementById("curriculum-pdf")
  if (!el) return

  /* scrollHeight incluye overflow invisible; offsetHeight solo el box renderizado.
     En flex columns el contenido a veces queda flush al border y offsetHeight
     se queda corto — scrollHeight es mas robusto para medir el contenido real. */
  const alturaContenido = Math.max(el.scrollHeight, el.offsetHeight, A4_HEIGHT_PX)

  /* Medimos posicion (top) de cada h2 relativo al root en CSS px SIN ESCALAR.
     getBoundingClientRect devuelve coords escaladas porque el preview aplica
     transform: scale(...). Dividimos por el factor actual (rect.height /
     scrollHeight) para obtener la posicion en el layout real, que es lo que
     corresponde al canvas de html2canvas. */
  const rootRect = el.getBoundingClientRect()
  const factorPreview = rootRect.height > 0 && el.scrollHeight > 0
    ? rootRect.height / el.scrollHeight
    : 1
  const posicionesH2Css: number[] = []
  el.querySelectorAll("h2").forEach((h2) => {
    const r = (h2 as HTMLElement).getBoundingClientRect()
    posicionesH2Css.push((r.top - rootRect.top) / factorPreview)
  })

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

      /* Ocultamos decorativos — los dibujamos despues con jsPDF en las
         posiciones correctas por pagina (el bottom-left debe quedar al
         fondo de la ULTIMA pagina del PDF, no al fin del contenido). */
      elClonado.querySelectorAll("[data-decorativo]").forEach((nodo) => {
        ;(nodo as HTMLElement).style.display = "none"
      })

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

  /* Sidebar fullbleed (solo Moderno): cuando un slice es mas corto que la
     pagina (ultima pagina o corte inteligente arriba), el sidebar queda
     truncado y se ve blanco debajo. Rellenamos la zona del sidebar con
     el color del tema para que baje hasta el borde de la hoja. */
  const tieneSidebar = personalizacion.plantilla === "moderno"
  const sidebarWidthMm = A4_WIDTH_MM * 0.33
  const sidebarRgb = tieneSidebar ? hexToRgb(getColorHex(personalizacion.color)) : null

  function rellenarSidebar(desdeY: number) {
    if (!tieneSidebar || !sidebarRgb) return
    if (desdeY >= A4_HEIGHT_MM - 0.5) return
    pdf.setFillColor(sidebarRgb.r, sidebarRgb.g, sidebarRgb.b)
    pdf.rect(0, desdeY, sidebarWidthMm, A4_HEIGHT_MM - desdeY, "F")
  }

  if (imgHeight <= A4_HEIGHT_MM + A4_TOLERANCIA_MM) {
    const imgData = canvas.toDataURL("image/png")
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, A4_HEIGHT_MM, undefined, "FAST")
  } else {
    /* Multi-pagina con cortes inteligentes.
       Prioridad: cortar justo antes de un h2 (cortes limpios entre secciones),
       sino cortar en la fila con mas pixeles blancos (gap natural entre items),
       sino cortar exacto en A4 como ultimo recurso. Nunca pasamos A4 para
       evitar que contenido overflowee fuera de la pagina. */
    const pxPorMm = canvas.width / A4_WIDTH_MM
    const altoPaginaPx = A4_HEIGHT_MM * pxPorMm
    /* Umbral minimo: cortes que dejan la pagina al menos al 55% llena.
       Bajo (antes 0.7) porque en Moderno/Colorido las secciones pueden
       ser mas grandes que 30% de pagina y queremos poder empujarlas enteras
       a la siguiente sin amputarlas. */
    const MIN_PAGINA_RATIO = 0.55

    /* Convertir posiciones h2 de CSS px a canvas px.
       Los positions fueron medidos en el DOM original antes del capture;
       el canvas tiene height = alturaContenido * scale, asi que el factor
       de conversion es canvas.height / alturaContenido. */
    const cssACanvas = canvas.height / alturaContenido
    const posicionesH2Canvas = posicionesH2Css
      .map((p) => p * cssACanvas)
      .filter((p) => p > 0) // ignorar el primer h2 si esta al tope

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
        const corteMinimo = offsetPx + altoPaginaPx * MIN_PAGINA_RATIO

        /* 1. Cortar antes de un h2 si hay uno en el rango */
        const candidatosH2 = posicionesH2Canvas.filter(
          (p) => p >= corteMinimo && p <= corteIdeal,
        )
        let corteElegido: number
        if (candidatosH2.length > 0) {
          /* El h2 mas grande (mas cerca del final de la pagina),
             asi maximizamos el contenido que queda en esta pagina */
          corteElegido = Math.max(...candidatosH2)
        } else if (scoresBlanco) {
          /* 2. Fallback a la fila con mas blancos, siempre dentro de [minimo, ideal] */
          corteElegido = mejorCorte(scoresBlanco, corteIdeal, corteMinimo)
        } else {
          corteElegido = corteIdeal
        }
        alturaEstaSlice = corteElegido - offsetPx
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
      rellenarSidebar(sliceAltoMm)

      offsetPx += alturaEstaSlice
      paginaIdx += 1
    }
  }

  /* Decorativos de Colorido: redibujar en posiciones fijas por pagina */
  if (personalizacion.plantilla === "colorido") {
    dibujarDecorativosColorido(pdf, personalizacion)
  }

  const nombre = nombreCompleto.trim().replace(/\s+/g, "_") || "curriculum"
  pdf.save(`${nombre}_CV.pdf`)
}

/* Dibuja los circulos decorativos de Colorido:
   - top-right en la pagina 1
   - bottom-left en la ultima pagina
   Ambos con el color del tema al ~10% de opacidad (simulada mezclando
   con blanco, ya que el background detras de los circulos es white). */
function dibujarDecorativosColorido(pdf: jsPDF, personalizacion: Personalizacion) {
  const rgb = hexToRgb(getColorHex(personalizacion.color))
  /* Mezcla alpha 0.1 sobre blanco: out = 0.9*255 + 0.1*color */
  const r = Math.round(255 * 0.9 + rgb.r * 0.1)
  const g = Math.round(255 * 0.9 + rgb.g * 0.1)
  const b = Math.round(255 * 0.9 + rgb.b * 0.1)
  pdf.setFillColor(r, g, b)

  const totalPaginas = pdf.getNumberOfPages()

  /* Top-right en pagina 1.
     En el DOM: w-32 (128px) con translate(30%, -30%) desde top-0 right-0.
     Centro ≈ a 25.6px del right y 25.6px del top → ~6.8mm, radio ~16.9mm */
  pdf.setPage(1)
  pdf.circle(A4_WIDTH_MM - 6.8, 6.8, 16.9, "F")

  /* Bottom-left en la ultima pagina.
     En el DOM: w-24 (96px) con translate(-30%, 30%) desde bottom-0 left-0.
     Centro ≈ a 19.2px del left y 19.2px del bottom → ~5.1mm, radio ~12.7mm */
  pdf.setPage(totalPaginas)
  pdf.circle(5.1, A4_HEIGHT_MM - 5.1, 12.7, "F")
}

/* Cuenta pixeles cercanos al blanco por fila del canvas, pero SOLO en la
   region del body (columnas derechas). En Moderno el sidebar izquierdo
   es siempre color solido → toda fila tiene ~33% de columnas no-blancas
   incluso en los gaps entre lineas de texto, lo que borraba el contraste
   entre gap y texto. Al mirar solo el body detectamos gaps reales. */
function calcularBlancosPorFila(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
): Uint32Array {
  const { width, height } = canvas
  const scores = new Uint32Array(height)
  /* Arrancar al 35% para saltar el sidebar de Moderno.
     En plantillas sin sidebar (Colorido) igual funciona: solo mira
     la parte central/derecha del body, donde esta el grueso del texto. */
  const colInicio = Math.floor(width * 0.35)
  const CHUNK_FILAS = 512
  for (let yInicio = 0; yInicio < height; yInicio += CHUNK_FILAS) {
    const altoChunk = Math.min(CHUNK_FILAS, height - yInicio)
    const img = ctx.getImageData(0, yInicio, width, altoChunk)
    const data = img.data
    for (let fila = 0; fila < altoChunk; fila++) {
      let blancos = 0
      const offsetFila = fila * width * 4
      for (let col = colInicio; col < width; col++) {
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

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return { r, g, b }
}

/* Encuentra la fila con mas pixeles blancos en [minimo, ideal].
   Busca SOLO hacia arriba (nunca pasa el ideal) para no overflowear
   el contenido fuera del A4. Prefiere cortes cerca del ideal. */
function mejorCorte(
  scoresBlanco: Uint32Array,
  corteIdeal: number,
  minimo: number,
): number {
  const inicio = Math.max(0, Math.round(minimo))
  const fin = Math.min(scoresBlanco.length - 1, Math.round(corteIdeal))
  if (inicio >= fin) return corteIdeal

  let mejor = corteIdeal
  let mejorPuntaje = -Infinity

  for (let y = inicio; y <= fin; y++) {
    /* Ligera penalidad por distancia al ideal, para desempatar */
    const distancia = corteIdeal - y
    const puntaje = (scoresBlanco[y] ?? 0) - distancia * 0.5
    if (puntaje > mejorPuntaje) {
      mejorPuntaje = puntaje
      mejor = y
    }
  }
  return mejor
}
