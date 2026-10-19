import { describe, expect, it } from 'vitest'
import {
  isInRange,
  normalizeRange,
  mapPasteToCells,
  moveCursor,
  nextCell,
  serializeClipboard,
  parseClipboard,
} from './grid'

describe('moveCursor', () => {
  it('bergerak satu langkah ke tiap arah', () => {
    const dari = { row: 2, column: 2 }
    expect(moveCursor(dari, 'up', 5, 5)).toEqual({ row: 1, column: 2 })
    expect(moveCursor(dari, 'down', 5, 5)).toEqual({ row: 3, column: 2 })
    expect(moveCursor(dari, 'left', 5, 5)).toEqual({ row: 2, column: 1 })
    expect(moveCursor(dari, 'right', 5, 5)).toEqual({ row: 2, column: 3 })
  })

  it('berhenti di tepi, tidak melingkar', () => {
    expect(moveCursor({ row: 0, column: 0 }, 'up', 5, 5)).toEqual({ row: 0, column: 0 })
    expect(moveCursor({ row: 0, column: 0 }, 'left', 5, 5)).toEqual({ row: 0, column: 0 })
    expect(moveCursor({ row: 4, column: 4 }, 'down', 5, 5)).toEqual({ row: 4, column: 4 })
    expect(moveCursor({ row: 4, column: 4 }, 'right', 5, 5)).toEqual({ row: 4, column: 4 })
  })

  it('tidak keluar batas di petak kosong', () => {
    expect(moveCursor({ row: 0, column: 0 }, 'down', 0, 0)).toEqual({ row: 0, column: 0 })
  })
})

describe('nextCell', () => {
  it('maju satu kolom di tengah baris', () => {
    expect(nextCell({ row: 1, column: 1 }, false, 3, 3)).toEqual({ row: 1, column: 2 })
  })

  it('turun ke awal baris berikutnya di ujung kanan', () => {
    expect(nextCell({ row: 1, column: 2 }, false, 3, 3)).toEqual({ row: 2, column: 0 })
  })

  it('naik ke ujung kanan baris sebelumnya saat mundur dari kolom pertama', () => {
    expect(nextCell({ row: 1, column: 0 }, true, 3, 3)).toEqual({ row: 0, column: 2 })
  })

  it('melingkar dari sel terakhir ke sel pertama', () => {
    expect(nextCell({ row: 2, column: 2 }, false, 3, 3)).toEqual({ row: 0, column: 0 })
  })

  it('melingkar mundur dari sel pertama ke sel terakhir', () => {
    expect(nextCell({ row: 0, column: 0 }, true, 3, 3)).toEqual({ row: 2, column: 2 })
  })

  it('tidak membagi nol di petak kosong', () => {
    expect(nextCell({ row: 0, column: 0 }, false, 0, 0)).toEqual({ row: 0, column: 0 })
  })
})

describe('normalizeRange', () => {
  it('mengurutkan sudutnya apa pun urutan penunjukannya', () => {
    const a = { row: 3, column: 4 }
    const b = { row: 1, column: 2 }
    const harapan = { startRow: 1, startColumn: 2, endRow: 3, endColumn: 4 }

    expect(normalizeRange(a, b)).toEqual(harapan)
    expect(normalizeRange(b, a)).toEqual(harapan)
  })

  it('menerima rentang satu sel', () => {
    const s = { row: 2, column: 2 }
    expect(normalizeRange(s, s)).toEqual({ startRow: 2, startColumn: 2, endRow: 2, endColumn: 2 })
  })
})

describe('isInRange', () => {
  const rentang = { startRow: 1, startColumn: 1, endRow: 3, endColumn: 3 }

  it('menerima sel di dalam dan di tepinya', () => {
    expect(isInRange({ row: 2, column: 2 }, rentang)).toBe(true)
    expect(isInRange({ row: 1, column: 1 }, rentang)).toBe(true)
    expect(isInRange({ row: 3, column: 3 }, rentang)).toBe(true)
  })

  it('menolak sel di luarnya', () => {
    expect(isInRange({ row: 0, column: 2 }, rentang)).toBe(false)
    expect(isInRange({ row: 2, column: 4 }, rentang)).toBe(false)
  })

  it('menolak apa pun kalau tidak ada rentangnya', () => {
    expect(isInRange({ row: 2, column: 2 }, null)).toBe(false)
  })
})

describe('parseClipboard', () => {
  it('memisah kolom dengan tab dan baris dengan baris baru', () => {
    expect(parseClipboard('a\tb\nc\td')).toEqual([['a', 'b'], ['c', 'd']])
  })

  it('menghitung CRLF sebagai satu pemisah', () => {
    expect(parseClipboard('a\tb\r\nc\td')).toEqual([['a', 'b'], ['c', 'd']])
  })

  it('tidak menambah baris kosong di ujung', () => {
    expect(parseClipboard('a\tb\n')).toEqual([['a', 'b']])
  })

  it('mempertahankan medan kosong', () => {
    expect(parseClipboard('a\t\tc')).toEqual([['a', '', 'c']])
  })

  it('menjaga baris baru di dalam medan berkutip', () => {
    // `split('\n')` akan memotong ini jadi dua baris petak — dan alamat dua
    // baris yang tertempel jadi dua baris data adalah kerusakan yang tidak
    // terlihat sampai ada yang membacanya lagi.
    expect(parseClipboard('"Jl. Merdeka 1\nJakarta"\tDKI')).toEqual([['Jl. Merdeka 1\nJakarta', 'DKI']])
  })

  it('menjaga tab di dalam medan berkutip', () => {
    expect(parseClipboard('"a\tb"\tc')).toEqual([['a\tb', 'c']])
  })

  it('mengubah kutip ganda jadi satu kutip', () => {
    expect(parseClipboard('"kata ""kunci"""\tb')).toEqual([['kata "kunci"', 'b']])
  })

  it('membiarkan kutip di tengah medan apa adanya', () => {
    expect(parseClipboard('5" pipa\tb')).toEqual([['5" pipa', 'b']])
  })

  it('mengembalikan larik kosong untuk teks kosong', () => {
    expect(parseClipboard('')).toEqual([])
  })
})

describe('serializeClipboard', () => {
  it('menggabungkan dengan tab dan baris baru', () => {
    expect(serializeClipboard([['a', 'b'], ['c', 'd']])).toBe('a\tb\nc\td')
  })

  it('mengurung medan yang mengandung pemisah', () => {
    expect(serializeClipboard([['a\tb', 'c']])).toBe('"a\tb"\tc')
    expect(serializeClipboard([['a\nb', 'c']])).toBe('"a\nb"\tc')
  })

  it('menggandakan kutip di dalam medan', () => {
    expect(serializeClipboard([['kata "kunci"']])).toBe('"kata ""kunci"""')
  })

  it('bolak-balik tanpa kehilangan apa pun', () => {
    const asal = [['a\tb', 'kata "kunci"'], ['Jl. Merdeka\nJakarta', '']]
    expect(parseClipboard(serializeClipboard(asal))).toEqual(asal)
  })
})

describe('mapPasteToCells', () => {
  it('menempatkan tiap nilai relatif terhadap sel awalnya', () => {
    expect(mapPasteToCells({ row: 1, column: 1 }, [['a', 'b']], 5, 5)).toEqual([
      { row: 1, column: 1, value: 'a' },
      { row: 1, column: 2, value: 'b' },
    ])
  })

  it('membuang baris yang jatuh di luar petak', () => {
    const hasil = mapPasteToCells({ row: 1, column: 0 }, [['a'], ['b'], ['c']], 2, 2)
    expect(hasil).toEqual([{ row: 1, column: 0, value: 'a' }])
  })

  it('membuang kolom yang jatuh di luar petak', () => {
    const hasil = mapPasteToCells({ row: 0, column: 1 }, [['a', 'b', 'c']], 2, 2)
    expect(hasil).toEqual([{ row: 0, column: 1, value: 'a' }])
  })

  it('tidak melebarkan petak', () => {
    expect(mapPasteToCells({ row: 5, column: 5 }, [['a']], 2, 2)).toEqual([])
  })
})
