import { describe, expect, it } from 'vitest'
import {
  readTimeRanges,
  formatRemaining,
  formatTime,
  clampTime,
  nextPlaybackRate,
  progressPercent,
  bufferedPercent,
} from './time'

describe('formatTime', () => {
  it('menulis menit dan detik tanpa jam', () => {
    expect(formatTime(0)).toBe('0:00')
    expect(formatTime(9)).toBe('0:09')
    expect(formatTime(75)).toBe('1:15')
    expect(formatTime(599)).toBe('9:59')
  })

  it('tidak pernah menulis enam puluh detik', () => {
    expect(formatTime(60)).toBe('1:00')
    expect(formatTime(3600)).toBe('1:00:00')
  })

  it('memunculkan jam hanya kalau ada', () => {
    expect(formatTime(3599)).toBe('59:59')
    expect(formatTime(3661)).toBe('1:01:01')
  })

  it('bisa dipaksa menulis jam', () => {
    expect(formatTime(75, true)).toBe('0:01:15')
  })

  it('membulatkan ke bawah, bukan ke terdekat', () => {
    // 59,9 detik yang dibulatkan ke terdekat jadi 1:00 — dan penunjuk waktu
    // yang sudah menulis 1:00 sementara medianya belum sampai ke sana
    // membuat lompatan mundur saat detiknya benar-benar berganti.
    expect(formatTime(59.9)).toBe('0:59')
  })

  it('memberi tanda hubung untuk yang belum diketahui', () => {
    expect(formatTime(Number.NaN)).toBe('--:--')
    expect(formatTime(Number.POSITIVE_INFINITY)).toBe('--:--')
    expect(formatTime(-5)).toBe('--:--')
  })
})

describe('formatRemaining', () => {
  it('menulis sisanya dengan tanda kurang', () => {
    expect(formatRemaining(30, 100)).toBe('-1:10')
  })

  it('tidak pernah menulis sisa negatif', () => {
    expect(formatRemaining(120, 100)).toBe('-0:00')
  })

  it('menyerah untuk durasi yang belum diketahui', () => {
    expect(formatRemaining(30, Number.NaN)).toBe('--:--')
  })
})

describe('readTimeRanges', () => {
  /** `TimeRanges` tiruan — antarmukanya cuma tiga anggota. */
  function rentangPalsu(potongan: [number, number][]): TimeRanges {
    return {
      length: potongan.length,
      start: (i: number) => potongan[i]![0],
      end: (i: number) => potongan[i]![1],
    } as TimeRanges
  }

  it('mengubah tiap potongan jadi objek', () => {
    expect(readTimeRanges(rentangPalsu([[0, 10], [20, 30]]))).toEqual([
      { start: 0, end: 10 },
      { start: 20, end: 30 },
    ])
  })

  it('memberi larik kosong untuk yang belum ada', () => {
    expect(readTimeRanges(null)).toEqual([])
    expect(readTimeRanges(undefined)).toEqual([])
  })
})

describe('bufferedPercent', () => {
  it('memakai rentang yang memuat posisi sekarang', () => {
    expect(bufferedPercent([{ start: 0, end: 50 }], 10, 100)).toBe(50)
  })

  it('mengabaikan rentang yang tidak memuat posisi sekarang', () => {
    // Potongan tersangga jauh di depan bukan janji bahwa yang di antaranya
    // sudah siap — dan batang penuh akan menjanjikan persis itu.
    expect(bufferedPercent([{ start: 80, end: 100 }], 10, 100)).toBe(0)
  })

  it('memilih rentang yang tepat dari beberapa', () => {
    const rentang = [{ start: 0, end: 20 }, { start: 60, end: 90 }]
    expect(bufferedPercent(rentang, 70, 100)).toBe(90)
  })

  it('tidak melewati seratus', () => {
    expect(bufferedPercent([{ start: 0, end: 120 }], 10, 100)).toBe(100)
  })

  it('menyerah untuk durasi yang belum diketahui', () => {
    expect(bufferedPercent([{ start: 0, end: 50 }], 10, Number.NaN)).toBe(0)
    expect(bufferedPercent([{ start: 0, end: 50 }], 10, 0)).toBe(0)
  })
})

describe('progressPercent', () => {
  it('menghitung persen biasa', () => {
    expect(progressPercent(25, 100)).toBe(25)
  })

  it('menjepit ke nol dan seratus', () => {
    expect(progressPercent(-5, 100)).toBe(0)
    expect(progressPercent(150, 100)).toBe(100)
  })

  it('menyerah untuk durasi yang belum diketahui', () => {
    expect(progressPercent(10, Number.NaN)).toBe(0)
  })
})

describe('clampTime', () => {
  it('membiarkan waktu yang di dalam rentang', () => {
    expect(clampTime(30, 100)).toBe(30)
  })

  it('tidak pernah negatif', () => {
    expect(clampTime(-10, 100)).toBe(0)
  })

  it('berhenti sedikit sebelum ujungnya', () => {
    expect(clampTime(100, 100)).toBe(99.99)
    expect(clampTime(500, 100)).toBe(99.99)
  })

  it('menyerah untuk durasi yang belum diketahui', () => {
    expect(clampTime(30, Number.NaN)).toBe(0)
  })
})

describe('nextPlaybackRate', () => {
  const daftar = [0.5, 1, 1.5, 2]

  it('maju satu langkah', () => {
    expect(nextPlaybackRate(1, daftar)).toBe(1.5)
  })

  it('berputar kembali ke awal', () => {
    expect(nextPlaybackRate(2, daftar)).toBe(0.5)
  })

  it('mengembalikan yang pertama untuk kecepatan di luar daftar', () => {
    expect(nextPlaybackRate(1.75, daftar)).toBe(0.5)
  })

  it('tidak mengubah apa pun kalau daftarnya kosong', () => {
    expect(nextPlaybackRate(1, [])).toBe(1)
  })
})
