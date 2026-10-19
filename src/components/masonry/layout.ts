/**
 * Menyusun letak tiap unsur dalam tata letak batu bata.
 *
 * Aturannya satu: tiap unsur ditaruh di kolom yang saat itu paling pendek.
 * Itu yang membuat ujung bawahnya rata meski tinggi tiap unsur berbeda-beda
 * — dan yang membedakannya dari `column-count` milik CSS, yang mengisi kolom
 * satu per satu sampai penuh dan mengubah urutan bacanya.
 */
export interface ItemPosition {
  /** Distance from the container's left edge. */
  x: number
  /** Distance from the container's top edge. */
  y: number
  width: number
}

export interface MasonryLayout {
  positions: ItemPosition[]
  /** The height of the whole layout, used to size the container. */
  height: number
}

/** Places each item in the currently shortest column. */
export function layoutMasonry(
  itemHeights: number[],
  options: { columns: number, columnWidth: number, columnGap: number, rowGap: number },
): MasonryLayout {
  const { columns, columnWidth, columnGap, rowGap } = options

  if (columns <= 0) return { positions: [], height: 0 }

  const columnHeights = Array.from({ length: columns }, () => 0)
  const positions: ItemPosition[] = []

  for (const height of itemHeights) {
    // Kolom terpendek, dan yang paling kiri kalau ada beberapa yang sama —
    // supaya urutan bacanya tetap kiri ke kanan pada baris pertama.
    let shortest = 0
    for (let i = 1; i < columns; i++) {
      if ((columnHeights[i] as number) < (columnHeights[shortest] as number)) shortest = i
    }

    const y = columnHeights[shortest] as number

    positions.push({
      x: shortest * (columnWidth + columnGap),
      y,
      width: columnWidth,
    })

    columnHeights[shortest] = y + height + rowGap
  }

  // Jarak baris terakhir tidak ikut dihitung — kalau ikut, selalu ada ruang
  // kosong menggantung di bawah susunannya.
  const tallest = Math.max(0, ...columnHeights)
  return { positions, height: Math.max(0, tallest - rowGap) }
}

/** How many columns fit in a given width. */
export function getColumnCount(
  containerWidth: number,
  options: { columnWidth: number, columnCount?: number, maxColumnCount?: number, gap: number },
): number {
  if (options.columnCount) return Math.max(1, options.columnCount)
  if (containerWidth <= 0) return 1

  const fit = Math.floor((containerWidth + options.gap) / (options.columnWidth + options.gap))
  const columns = Math.max(1, fit)

  return options.maxColumnCount ? Math.min(columns, options.maxColumnCount) : columns
}
