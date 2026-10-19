import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import AnimatedGridPattern from './AnimatedGridPattern.vue'

let laporUkuran: ((entri: { contentRect: { width: number, height: number } }[]) => void) | undefined
let putusDipanggil = 0

beforeEach(() => {
  laporUkuran = undefined
  putusDipanggil = 0

  vi.stubGlobal('ResizeObserver', class {
    constructor(cb: typeof laporUkuran) {
      laporUkuran = cb
    }

    observe() {}
    disconnect() {
      putusDipanggil += 1
    }
  })
})

afterEach(() => {
  vi.unstubAllGlobals()
})

function beriUkuran(width: number, height: number) {
  laporUkuran?.([{ contentRect: { width, height } }])
  return nextTick()
}

describe('animatedGridPattern', () => {
  // Sebelum ukurannya terbaca, petak acaknya cuma bisa menghasilkan 0 — seluruh
  // kotak akan menumpuk di pojok kiri atas. Jadi tidak ada yang digambar dulu.
  it('menunggu ukuran wadahnya sebelum menaruh kotak', async () => {
    const wrapper = mount(AnimatedGridPattern, { props: { numSquares: 5 } })
    expect(wrapper.findAll('svg svg rect')).toHaveLength(0)

    await beriUkuran(400, 400)
    expect(wrapper.findAll('svg svg rect')).toHaveLength(5)
  })

  it('menaruh kotak di dalam batas wadahnya', async () => {
    const wrapper = mount(AnimatedGridPattern, {
      props: { numSquares: 20, width: 40, height: 40 },
    })
    await beriUkuran(400, 200)

    for (const kotak of wrapper.findAll('svg svg rect')) {
      const x = Number(kotak.attributes('x'))
      const y = Number(kotak.attributes('y'))
      expect(x).toBeGreaterThanOrEqual(0)
      expect(x).toBeLessThanOrEqual(400)
      expect(y).toBeGreaterThanOrEqual(0)
      expect(y).toBeLessThanOrEqual(200)
    }
  })

  it('menjalankan nyala-padamnya lewat CSS, dua kali bolak-balik', async () => {
    const wrapper = mount(AnimatedGridPattern, {
      props: { numSquares: 1, duration: 3, maxOpacity: 0.7 },
    })
    await beriUkuran(400, 400)

    const gaya = wrapper.get('svg svg rect').attributes('style') ?? ''
    expect(gaya).toContain('animation-name: grid-square-fade')
    expect(gaya).toContain('animation-duration: 3s')
    expect(gaya).toContain('animation-iteration-count: 2')
    expect(gaya).toContain('animation-direction: alternate')
    expect(gaya).toContain('--grid-square-opacity: 0.7')
  })

  // Inti komponennya: setelah animasinya habis, kotaknya pindah petak. Kalau
  // `putaran` tidak ikut jadi bagian key-nya, Vue memakai ulang elemen yang sama
  // dan animasinya yang sudah selesai tidak pernah jalan lagi — kotaknya
  // berpindah sekali lalu diam selamanya.
  it('memindahkan kotak dan memasang ulang elemennya setelah animasinya habis', async () => {
    const wrapper = mount(AnimatedGridPattern, {
      props: { numSquares: 1, width: 10, height: 10 },
    })
    await beriUkuran(500, 500)

    const sebelum = wrapper.get('svg svg rect').element

    // Dipicu berkali-kali: satu petak acak bisa saja terpilih ulang, tapi
    // elemennya tetap harus diganti tiap kali.
    await wrapper.get('svg svg rect').trigger('animationend')
    const sesudah = wrapper.get('svg svg rect').element

    expect(sesudah).not.toBe(sebelum)
  })

  it('memberi tiap kotak delay bertahap supaya tidak menyala serempak', async () => {
    const wrapper = mount(AnimatedGridPattern, { props: { numSquares: 3 } })
    await beriUkuran(400, 400)

    const kotak = wrapper.findAll('svg svg rect')
    expect(kotak[0].attributes('style')).toContain('animation-delay: 0s')
    expect(kotak[1].attributes('style')).toContain('animation-delay: 0.1s')
    expect(kotak[2].attributes('style')).toContain('animation-delay: 0.2s')
  })

  it('melepas pengamatnya saat dilepas', () => {
    const wrapper = mount(AnimatedGridPattern)
    wrapper.unmount()
    expect(putusDipanggil).toBe(1)
  })
})
