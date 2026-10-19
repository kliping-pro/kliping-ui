import { describe, expect, it } from 'vitest'
import { clampOffset, percentCrop, pixelCrop, baseScale, frameSize, rotatedSize } from './crop'

describe('rotatedSize', () => {
  it('tidak mengubah apa pun pada nol derajat', () => {
    expect(rotatedSize({ width: 100, height: 50 }, 0)).toEqual({ width: 100, height: 50 })
  })

  it('menukar sisi pada sembilan puluh derajat', () => {
    const hasil = rotatedSize({ width: 100, height: 50 }, 90)
    expect(hasil.width).toBeCloseTo(50)
    expect(hasil.height).toBeCloseTo(100)
  })

  it('melebar ke dua arah pada empat puluh lima derajat', () => {
    const hasil = rotatedSize({ width: 100, height: 100 }, 45)
    expect(hasil.width).toBeCloseTo(141.42, 1)
    expect(hasil.height).toBeCloseTo(141.42, 1)
  })

  it('memperlakukan putaran negatif sama dengan positif', () => {
    expect(rotatedSize({ width: 80, height: 40 }, -30))
      .toEqual(rotatedSize({ width: 80, height: 40 }, 30))
  })
})

describe('frameSize', () => {
  it('mengisi tinggi wadah saat wadahnya lebih lebar dari rasionya', () => {
    expect(frameSize({ width: 800, height: 400 }, 1)).toEqual({ width: 400, height: 400 })
  })

  it('mengisi lebar wadah saat wadahnya lebih tinggi dari rasionya', () => {
    expect(frameSize({ width: 400, height: 800 }, 1)).toEqual({ width: 400, height: 400 })
  })

  it('mengikuti rasio yang bukan satu', () => {
    expect(frameSize({ width: 600, height: 600 }, 16 / 9))
      .toEqual({ width: 600, height: 337.5 })
  })

  it('mengembalikan nol untuk wadah atau rasio yang tidak masuk akal', () => {
    expect(frameSize({ width: 0, height: 100 }, 1)).toEqual({ width: 0, height: 0 })
    expect(frameSize({ width: 100, height: 100 }, 0)).toEqual({ width: 0, height: 0 })
  })
})

describe('baseScale', () => {
  it('memperbesar gambar yang lebih kecil dari bingkainya', () => {
    expect(baseScale({ width: 100, height: 100 }, { width: 400, height: 400 })).toBe(4)
  })

  it('memperkecil gambar yang lebih besar dari bingkainya', () => {
    expect(baseScale({ width: 1000, height: 1000 }, { width: 400, height: 400 })).toBe(0.4)
  })

  it('mengambil sumbu yang paling menuntut, bukan rata-ratanya', () => {
    // 200 lebar butuh skala 2, 400 tinggi butuh skala 1. Yang menang 2 —
    // skala 1 menyisakan celah kosong di kiri dan kanan bingkainya.
    expect(baseScale({ width: 100, height: 400 }, { width: 200, height: 400 })).toBe(2)
  })

  it('ikut memperhitungkan putaran', () => {
    // Diputar sembilan puluh derajat, gambar 100×400 jadi 400×100, dan yang
    // menuntut skala berpindah ke sumbu yang lain.
    expect(baseScale({ width: 100, height: 400 }, { width: 200, height: 400 }, 90)).toBeCloseTo(4)
  })

  it('tidak membagi nol untuk media yang belum termuat', () => {
    expect(baseScale({ width: 0, height: 0 }, { width: 400, height: 400 })).toBe(1)
  })
})

describe('clampOffset', () => {
  const media = { width: 1000, height: 1000 }
  const bingkai = { width: 400, height: 400 }

  it('membiarkan geseran yang masih di dalam batas', () => {
    // Skala 0.5 memberi gambar 500×500 di dalam bingkai 400×400 — sisa 50 tiap sisi.
    expect(clampOffset({ x: 30, y: -20 }, media, bingkai, 0.5)).toEqual({ x: 30, y: -20 })
  })

  it('menjepit geseran yang melewati batas', () => {
    expect(clampOffset({ x: 200, y: -200 }, media, bingkai, 0.5)).toEqual({ x: 50, y: -50 })
  })

  it('memaku ke nol saat medianya tidak lebih besar dari bingkainya', () => {
    expect(clampOffset({ x: 80, y: 80 }, media, bingkai, 0.4)).toEqual({ x: 0, y: 0 })
  })

  it('menjepit tiap sumbu sendiri-sendiri', () => {
    // Gambar 500×2000 di dalam bingkai 400×400: sumbu x sisa 50, sumbu y sisa 800.
    const hasil = clampOffset({ x: 300, y: 300 }, { width: 1000, height: 4000 }, bingkai, 0.5)
    expect(hasil).toEqual({ x: 50, y: 300 })
  })
})

describe('pixelCrop', () => {
  const media = { width: 1000, height: 1000 }
  const bingkai = { width: 400, height: 400 }

  it('memberi seluruh gambar saat bingkainya pas menutupinya', () => {
    expect(pixelCrop(media, bingkai, { x: 0, y: 0 }, 0.4))
      .toEqual({ x: 0, y: 0, width: 1000, height: 1000 })
  })

  it('memusat saat tidak digeser', () => {
    expect(pixelCrop(media, bingkai, { x: 0, y: 0 }, 0.8))
      .toEqual({ x: 250, y: 250, width: 500, height: 500 })
  })

  it('bergeser berlawanan arah dengan geseran gambarnya', () => {
    // Menyeret gambar ke kanan berarti melihat bagian kirinya — kotak
    // potongnya bergerak ke kiri, bukan ke kanan.
    const hasil = pixelCrop(media, bingkai, { x: 80, y: 0 }, 0.8)
    expect(hasil.x).toBe(150)
    expect(hasil.y).toBe(250)
  })

  it('mengecil saat dizum', () => {
    const jauh = pixelCrop(media, bingkai, { x: 0, y: 0 }, 0.4)
    const dekat = pixelCrop(media, bingkai, { x: 0, y: 0 }, 1.6)
    expect(dekat.width).toBeLessThan(jauh.width)
    expect(dekat.width).toBe(250)
  })

  it('memakai ukuran yang sudah diputar', () => {
    const hasil = pixelCrop({ width: 800, height: 400 }, bingkai, { x: 0, y: 0 }, 0.5, 90)
    expect(hasil.width).toBe(800)
    expect(hasil.height).toBe(800)
    // Kerangkanya 400×800 setelah diputar, jadi kotak 800×800 menonjol ke
    // luar di sumbu x — dan memang begitu adanya kalau skalanya diatur
    // sendiri lebih kecil daripada skala dasarnya.
    expect(hasil.x).toBeCloseTo(-200)
    expect(hasil.y).toBeCloseTo(0)
  })
})

describe('percentCrop', () => {
  it('mengubah piksel jadi persen terhadap medianya', () => {
    expect(percentCrop({ x: 250, y: 250, width: 500, height: 500 }, { width: 1000, height: 1000 }))
      .toEqual({ x: 25, y: 25, width: 50, height: 50 })
  })

  it('memakai ukuran terputar sebagai acuannya', () => {
    const hasil = percentCrop({ x: 100, y: 0, width: 200, height: 400 }, { width: 800, height: 400 }, 90)
    expect(hasil.x).toBeCloseTo(25)
    expect(hasil.width).toBeCloseTo(50)
    expect(hasil.height).toBeCloseTo(50)
  })

  it('tidak membagi nol untuk media yang belum termuat', () => {
    expect(percentCrop({ x: 0, y: 0, width: 0, height: 0 }, { width: 0, height: 0 }))
      .toEqual({ x: 0, y: 0, width: 0, height: 0 })
  })
})
