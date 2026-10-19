import { describe, expect, it } from 'vitest'
import { getColumnCount, layoutMasonry } from './layout'

describe('layoutMasonry', () => {
  it('menaruh tiap unsur di kolom terpendek', () => {
    const { positions } = layoutMasonry([100, 50, 30], {
      columns: 2,
      columnWidth: 200,
      columnGap: 10,
      rowGap: 10,
    })

    // Dua pertama mengisi kedua kolom; yang ketiga jatuh ke kolom kedua
    // karena kolom itu lebih pendek.
    expect(positions[0]).toEqual({ x: 0, y: 0, width: 200 })
    expect(positions[1]).toEqual({ x: 210, y: 0, width: 200 })
    expect(positions[2]).toEqual({ x: 210, y: 60, width: 200 })
  })

  it('memilih kolom paling kiri saat beberapa sama pendeknya', () => {
    const { positions } = layoutMasonry([50, 50, 20], {
      columns: 3,
      columnWidth: 100,
      columnGap: 0,
      rowGap: 0,
    })
    expect(positions[2]?.x).toBe(200)
  })

  it('tidak menyisakan jarak baris menggantung di bawah', () => {
    const { height } = layoutMasonry([100], {
      columns: 1,
      columnWidth: 100,
      columnGap: 0,
      rowGap: 20,
    })
    expect(height).toBe(100)
  })

  it('mengembalikan kosong kalau kolomnya nol', () => {
    expect(layoutMasonry([10], { columns: 0, columnWidth: 10, columnGap: 0, rowGap: 0 }))
      .toEqual({ positions: [], height: 0 })
  })
})

describe('getColumnCount', () => {
  it('menghitung dari lebar wadahnya', () => {
    expect(getColumnCount(640, { columnWidth: 200, gap: 20 })).toBe(3)
    expect(getColumnCount(200, { columnWidth: 200, gap: 20 })).toBe(1)
  })

  it('menghormati batas atasnya', () => {
    expect(getColumnCount(2000, { columnWidth: 200, gap: 20, maxColumnCount: 4 })).toBe(4)
  })

  it('memakai jumlah tetap kalau diminta', () => {
    expect(getColumnCount(100, { columnWidth: 200, gap: 20, columnCount: 5 })).toBe(5)
  })

  it('tidak pernah kurang dari satu', () => {
    expect(getColumnCount(10, { columnWidth: 200, gap: 20 })).toBe(1)
  })
})
