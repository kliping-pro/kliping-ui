/**
 * Perhitungan petak data: kemudi kursor, rentang pilihan, dan papan klip.
 *
 * Dipisahkan dari komponennya karena inilah bagian yang sebenarnya bisa
 * salah, dan salahnya merusak data orang. Sel tertempel bergeser satu kolom
 * berarti seluruh kolom di sebelahnya tertimpa nilai yang bukan miliknya —
 * dan itu baru ketahuan setelah disimpan.
 */

export interface Cell {
  row: number
  column: number
}

export interface CellRange {
  startRow: number
  startColumn: number
  endRow: number
  endColumn: number
}

export type Direction = 'up' | 'down' | 'left' | 'right'

const OFFSETS: Record<Direction, Cell> = {
  up: { row: -1, column: 0 },
  down: { row: 1, column: 0 },
  left: { row: 0, column: -1 },
  right: { row: 0, column: 1 },
}

// Tidak melingkar ke sisi seberang. Kursor yang tiba-tiba melompat dari
// kolom terakhir baris ini ke kolom pertama baris berikutnya terasa seperti
// kesalahan, dan lembar sebar mana pun tidak melakukannya.
/** Moves the cursor one step, stopping at the edges. */
export function moveCursor(cursor: Cell, direction: Direction, rowCount: number, columnCount: number): Cell {
  const offset = OFFSETS[direction]

  return {
    row: Math.min(Math.max(cursor.row + offset.row, 0), Math.max(0, rowCount - 1)),
    column: Math.min(Math.max(cursor.column + offset.column, 0), Math.max(0, columnCount - 1)),
  }
}

// Yang ini memang melingkar — ke awal baris berikutnya di ujung kanan, dan ke
// ujung kanan baris sebelumnya saat Shift+Tab di kolom pertama. Tab memang
// berarti "berikutnya" dan bukan "ke kanan", dan itu bedanya dengan panah.
/** The next cell when Tab is pressed, wrapping around rows. */
export function nextCell(cursor: Cell, backward: boolean, rowCount: number, columnCount: number): Cell {
  if (rowCount <= 0 || columnCount <= 0) return { row: 0, column: 0 }

  const flat = cursor.row * columnCount + cursor.column + (backward ? -1 : 1)
  const total = rowCount * columnCount
  const wrapped = ((flat % total) + total) % total

  return { row: Math.floor(wrapped / columnCount), column: wrapped % columnCount }
}

/** A range from two corners, sorted ascending regardless of selection order. */
export function normalizeRange(a: Cell, b: Cell): CellRange {
  return {
    startRow: Math.min(a.row, b.row),
    startColumn: Math.min(a.column, b.column),
    endRow: Math.max(a.row, b.row),
    endColumn: Math.max(a.column, b.column),
  }
}

/** Whether the cell lies inside the range. */
export function isInRange(cell: Cell, range: CellRange | null): boolean {
  if (!range) return false

  return cell.row >= range.startRow
    && cell.row <= range.endRow
    && cell.column >= range.startColumn
    && cell.column <= range.endColumn
}

// Pemisah kolomnya tab dan pemisah barisnya baris baru — itu yang dipakai
// Excel, Google Sheets, dan Numbers saat menyalin ke papan klip. Medan yang
// mengandung tab atau baris baru dikurung tanda kutip ganda, dan kutip di
// dalam medan digandakan; keduanya ditangani di sini.
//
// Diurai huruf demi huruf, bukan dengan `split`. `split('\n')` memotong medan
// berkutip yang isinya beberapa baris jadi beberapa baris petak — dan itu
// persis jenis kerusakan yang tidak terlihat sampai ada yang menempel alamat
// dua baris.
/** Parses spreadsheet-style clipboard text into a two-dimensional array. */
export function parseClipboard(text: string): string[][] {
  if (!text) return []

  const rows: string[][] = []
  let columns: string[] = []
  let field = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const char = text[i]

    if (inQuotes) {
      if (char === '"') {
        // Dua kutip berturut-turut satu kutip harfiah, bukan penutup.
        if (text[i + 1] === '"') {
          field += '"'
          i++
        }
        else {
          inQuotes = false
        }
      }
      else {
        field += char
      }
      continue
    }

    if (char === '"' && field === '') {
      inQuotes = true
    }
    else if (char === '\t') {
      columns.push(field)
      field = ''
    }
    else if (char === '\n' || char === '\r') {
      // CRLF dihitung satu pemisah, bukan dua.
      if (char === '\r' && text[i + 1] === '\n') i++

      columns.push(field)
      rows.push(columns)
      columns = []
      field = ''
    }
    else {
      field += char
    }
  }

  // Baris terakhir tanpa baris baru di ujungnya tetap terhitung. Yang berakhir
  // dengan baris baru tidak menambah baris kosong.
  if (field !== '' || columns.length) {
    columns.push(field)
    rows.push(columns)
  }

  return rows
}

/** Serializes a two-dimensional array into spreadsheet-style text, ready to copy. */
export function serializeClipboard(rows: string[][]): string {
  return rows
    .map(columns => columns.map(quoteField).join('\t'))
    .join('\n')
}

/** Quotes a field that contains a separator or a quote. */
function quoteField(field: string): string {
  if (!/["\t\n\r]/.test(field)) return field

  return `"${field.replaceAll('"', '""')}"`
}

// Yang jatuh di luar petak dibuang, tidak melebarkan petaknya. Menempel
// seratus baris ke petak yang tinggal sepuluh barisnya berarti sembilan puluh
// baris hilang — dan itu memang yang diinginkan: menambah baris diam-diam
// atas nama tempelan menciptakan data yang tidak pernah diminta siapa pun.
/** Maps pasted data onto the cells that actually exist, dropping the overflow. */
export function mapPasteToCells(
  start: Cell,
  data: string[][],
  rowCount: number,
  columnCount: number,
): { row: number, column: number, value: string }[] {
  const result: { row: number, column: number, value: string }[] = []

  for (const [i, columns] of data.entries()) {
    const row = start.row + i
    if (row >= rowCount) break

    for (const [j, value] of columns.entries()) {
      const column = start.column + j
      if (column >= columnCount) continue

      result.push({ row, column, value })
    }
  }

  return result
}
