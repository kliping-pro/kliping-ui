/**
 * Menggambar busur sebagai jalur SVG.
 *
 * Nol derajat menunjuk ke atas, dan sudut bertambah searah jarum jam — bukan
 * kesepakatan bawaan koordinat SVG, tapi yang diharapkan siapa pun yang
 * menyebut "gauge mulai dari jam 12". Pergeserannya ditangani di
 * `polarToCartesian`.
 */
function polarToCartesian(centerX: number, centerY: number, radius: number, angle: number) {
  const radian = ((angle - 90) * Math.PI) / 180
  return {
    x: centerX + radius * Math.cos(radian),
    y: centerY + radius * Math.sin(radian),
  }
}

// Lingkaran penuh digambar sebagai dua setengah lingkaran, bukan satu busur.
// Alasannya ada di spesifikasi SVG: busur yang titik awal dan akhirnya sama
// persis tidak digambar sama sekali — panjangnya nol, dan tidak ada cara
// menyatakan "yang saya maksud keliling penuh".
/** The SVG `d` path for one arc; a full circle is drawn as two half circles. */
export function getArcPath(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number,
): string {
  const diff = endAngle - startAngle

  if (Math.abs(diff) >= 360) {
    const start = polarToCartesian(x, y, radius, startAngle)
    const middle = polarToCartesian(x, y, radius, startAngle + 180)
    return [
      'M', start.x, start.y,
      'A', radius, radius, 0, 0, 1, middle.x, middle.y,
      'A', radius, radius, 0, 0, 1, start.x, start.y,
    ].join(' ')
  }

  const start = polarToCartesian(x, y, radius, startAngle)
  const end = polarToCartesian(x, y, radius, endAngle)

  // Busur yang lebih dari setengah lingkaran perlu ditandai, kalau tidak SVG
  // menggambar sisi pendeknya.
  const largeArc = diff <= 180 ? '0' : '1'

  return ['M', start.x, start.y, 'A', radius, radius, 0, largeArc, 1, end.x, end.y].join(' ')
}

const normalizeAngle = (angle: number) => ((angle % 360) + 360) % 360

// Pada lingkaran penuh jawabannya pusat lingkaran. Pada busur sepotong bukan:
// setengah lingkaran bawah punya pusat visual jauh di atas pusat lingkarannya,
// dan teks yang ditaruh di pusat lingkaran akan tampak melayang di luar
// busurnya.
//
// Yang dihitung kotak pembatas busurnya. Titik ujung saja tidak cukup — busur
// yang melewati puncak atau dasar lingkaran menyentuh batas yang lebih jauh
// dari kedua ujungnya, jadi keduanya diperiksa terpisah.
/** The vertical midpoint of an arc's bounding box, for placing its value text. */
export function getArcCenterY(
  center: number,
  radius: number,
  startAngle: number,
  endAngle: number,
): number {
  if (Math.abs(endAngle - startAngle) >= 360) return center

  const startY = center - radius * Math.cos((startAngle * Math.PI) / 180)
  const endY = center - radius * Math.cos((endAngle * Math.PI) / 180)

  let top = Math.min(startY, endY)
  let bottom = Math.max(startY, endY)

  const start = normalizeAngle(startAngle)
  const end = normalizeAngle(endAngle)

  const passesTop = start > end ? start <= 270 || end >= 270 : start <= 270 && end >= 270
  const passesBottom = start > end ? start <= 90 || end >= 90 : start <= 90 && end >= 90

  if (passesTop) top = Math.min(top, center - radius)
  if (passesBottom) bottom = Math.max(bottom, center + radius)

  return (top + bottom) / 2
}
