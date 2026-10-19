import { describe, expect, it } from 'vitest'
import { moveBetween, moveItem } from './move'

describe('moveItem', () => {
  it('memindahkan ke depan', () => {
    expect(moveItem(['a', 'b', 'c', 'd'], 2, 0)).toEqual(['c', 'a', 'b', 'd'])
  })

  it('memindahkan ke belakang', () => {
    expect(moveItem(['a', 'b', 'c', 'd'], 0, 2)).toEqual(['b', 'c', 'a', 'd'])
  })

  it('mengembalikan array baru, bukan yang lama', () => {
    const asal = ['a', 'b']
    const hasil = moveItem(asal, 0, 1)
    expect(hasil).not.toBe(asal)
    expect(asal).toEqual(['a', 'b'])
  })

  it('mengabaikan indeks yang di luar jangkauan', () => {
    expect(moveItem(['a', 'b'], 0, 5)).toEqual(['a', 'b'])
    expect(moveItem(['a', 'b'], -1, 0)).toEqual(['a', 'b'])
    expect(moveItem(['a', 'b'], 1, 1)).toEqual(['a', 'b'])
  })
})

describe('moveBetween', () => {
  it('memindahkan antar dua daftar', () => {
    expect(moveBetween(['a', 'b'], ['x', 'y'], 0, 1)).toEqual({
      source: ['b'],
      target: ['x', 'a', 'y'],
    })
  })

  it('menjepit posisi tujuan ke dalam jangkauan', () => {
    expect(moveBetween(['a'], ['x'], 0, 99)).toEqual({ source: [], target: ['x', 'a'] })
  })

  it('membiarkan keduanya kalau indeks asalnya kosong', () => {
    expect(moveBetween(['a'], ['x'], 5, 0)).toEqual({ source: ['a'], target: ['x'] })
  })
})
