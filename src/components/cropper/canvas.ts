import type { CropArea, Size } from './crop'
import { rotatedSize } from './crop'

// Dipisahkan dari `potong.ts` karena inilah satu-satunya bagian pemotong yang
// menyentuh DOM. Yang di sebelah bisa diuji tanpa peramban; yang di sini
// tidak, dan mencampur keduanya berarti tidak satu pun bisa.
//
// Urutannya penting dan sengaja dikunci di sini: putar dulu, potong kemudian.
// `pixelCrop` mengembalikan kotak pada kerangka yang sudah diputar, jadi
// memotong dulu lalu memutar memberi daerah yang sama sekali lain.
/** Draws the cropped result onto a canvas, rotating first and cropping after. */
export async function cropToCanvas(
  source: CanvasImageSource & { width?: number, height?: number },
  size: Size,
  crop: CropArea,
  degrees = 0,
  flip = { horizontal: false, vertical: false },
): Promise<HTMLCanvasElement> {
  const rotated = rotatedSize(size, degrees)

  // Kanvas pertama memuat gambar utuh yang sudah diputar. Kanvas kedua
  // memotongnya. Dua kanvas, bukan satu dengan transformasi berlapis —
  // yang berlapis benar juga, tapi tidak ada yang bisa membacanya lagi
  // setelah seminggu.
  const full = document.createElement('canvas')
  full.width = Math.round(rotated.width)
  full.height = Math.round(rotated.height)

  const ctx = full.getContext('2d')
  if (!ctx) throw new Error('2D canvas is not available in this browser.')

  ctx.translate(full.width / 2, full.height / 2)
  ctx.rotate((degrees * Math.PI) / 180)
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
  ctx.drawImage(source, -size.width / 2, -size.height / 2, size.width, size.height)

  const result = document.createElement('canvas')
  result.width = Math.round(crop.width)
  result.height = Math.round(crop.height)

  const resultCtx = result.getContext('2d')
  if (!resultCtx) throw new Error('2D canvas is not available in this browser.')

  resultCtx.drawImage(
    full,
    Math.round(crop.x),
    Math.round(crop.y),
    result.width,
    result.height,
    0,
    0,
    result.width,
    result.height,
  )

  return result
}

/** The cropped result as a `Blob`, ready to upload. */
export function canvasToBlob(canvas: HTMLCanvasElement, type = 'image/png', quality?: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob)
        else reject(new Error('Failed to convert the canvas to a blob.'))
      },
      type,
      quality,
    )
  })
}
