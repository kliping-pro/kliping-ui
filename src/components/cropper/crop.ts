/**
 * Perhitungan pemotong gambar.
 *
 * Dipisahkan dari komponennya karena inilah bagian yang sebenarnya bisa
 * salah. Sisanya — penyeretan, penggeser, tombol — susunan yang kelirunya
 * langsung terlihat; yang di sini kelirunya baru ketahuan setelah gambar
 * hasil potongannya diunduh dan ternyata bergeser beberapa piksel.
 *
 * Semua fungsi di sini murni, jadi bisa diuji tanpa DOM sama sekali.
 */

export interface Size {
  width: number
  height: number
}

export interface Point {
  x: number
  y: number
}

export interface CropArea {
  x: number
  y: number
  width: number
  height: number
}

// Persegi 100×50 yang diputar 45 derajat memerlukan kotak 106×106 untuk
// memuatnya. Ini yang dipakai menjepit geseran: yang harus menutupi bingkai
// potong bukan gambarnya, melainkan kotak pembatas gambar yang sudah diputar.
/** The bounding box size of a rectangle after rotation. */
export function rotatedSize(size: Size, degrees: number): Size {
  const rad = (degrees * Math.PI) / 180
  const cos = Math.abs(Math.cos(rad))
  const sin = Math.abs(Math.sin(rad))

  return {
    width: size.width * cos + size.height * sin,
    height: size.width * sin + size.height * cos,
  }
}

// Bingkainya sebesar mungkin tanpa keluar dari wadah — itu yang membuat
// daerah yang dipotong terlihat sejelas-jelasnya, dan itu pula yang membuat
// penyeretan terasa tepat karena satu piksel di layar mendekati satu piksel
// di hasilnya.
/** The crop frame size inside its container, following the requested aspect ratio. */
export function frameSize(container: Size, aspectRatio: number): Size {
  if (container.width <= 0 || container.height <= 0 || aspectRatio <= 0)
    return { width: 0, height: 0 }

  const containerRatio = container.width / container.height

  return containerRatio > aspectRatio
    ? { width: container.height * aspectRatio, height: container.height }
    : { width: container.width, height: container.width / aspectRatio }
}

// Inilah skala pada zum satu. Zum dua berarti dua kali skala ini — bukan dua
// kali ukuran aslinya. Kalau zum satu berarti ukuran asli, gambar yang lebih
// kecil dari bingkainya akan menyisakan celah kosong di hasil potongannya,
// dan tidak ada yang menginginkan itu.
/** The smallest scale at which the media fully covers the crop frame. */
export function baseScale(media: Size, frame: Size, degrees = 0): number {
  if (media.width <= 0 || media.height <= 0) return 1

  const rotated = rotatedSize(media, degrees)

  return Math.max(frame.width / rotated.width, frame.height / rotated.height)
}

// Geserannya dihitung dari titik tengah, jadi batasnya setangkup: setengah
// dari selisih antara media yang sudah diskala dan bingkainya. Media yang
// lebih kecil dari bingkainya di satu sumbu — mungkin saja, kalau skalanya
// diatur sendiri — dipaku ke nol di sumbu itu, bukan dibiarkan bergoyang.
/** Clamps the offset so the crop frame never leaves the media. */
export function clampOffset(offset: Point, media: Size, frame: Size, scale: number, degrees = 0): Point {
  const rotated = rotatedSize(media, degrees)

  const maxX = Math.max(0, (rotated.width * scale - frame.width) / 2)
  const maxY = Math.max(0, (rotated.height * scale - frame.height) / 2)

  return {
    x: Math.min(Math.max(offset.x, -maxX), maxX),
    y: Math.min(Math.max(offset.y, -maxY), maxY),
  }
}

// "Yang sudah diputar" penting: kalau ada putaran, kotak ini menunjuk ke
// kanvas berisi gambar yang sudah diputar, bukan ke berkas aslinya. Itu
// memang cara satu-satunya — daerah potong pada gambar yang diputar bukan
// persegi lagi pada gambar aslinya, jadi tidak ada kotak di berkas asli yang
// bisa mewakilinya.
//
// `cropToCanvas` di sebelah memutar dulu lalu memotong dengan kotak ini,
// dan urutan itulah yang membuat keduanya cocok.
/** The crop area in source pixels, in the rotated frame of reference. */
export function pixelCrop(media: Size, frame: Size, offset: Point, scale: number, degrees = 0): CropArea {
  const rotated = rotatedSize(media, degrees)

  const width = frame.width / scale
  const height = frame.height / scale

  return {
    x: (rotated.width - width) / 2 - offset.x / scale,
    y: (rotated.height - height) / 2 - offset.y / scale,
    width,
    height,
  }
}

// Persen bertahan terhadap penggantian ukuran berkas: gambar yang sama
// diunggah ulang dengan resolusi berbeda tetap terpotong di tempat yang sama.
// Piksel tidak.
/** The crop area in percent, for storing results in a database. */
export function percentCrop(crop: CropArea, media: Size, degrees = 0): CropArea {
  const rotated = rotatedSize(media, degrees)
  if (rotated.width <= 0 || rotated.height <= 0)
    return { x: 0, y: 0, width: 0, height: 0 }

  return {
    x: (crop.x / rotated.width) * 100,
    y: (crop.y / rotated.height) * 100,
    width: (crop.width / rotated.width) * 100,
    height: (crop.height / rotated.height) * 100,
  }
}
