import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import DotPattern from './DotPattern.vue'

// jsdom tidak punya ResizeObserver. Yang dipalsukan di sini bukan sekadar
// kelasnya — callback-nya disimpan supaya uji bisa mengabarkan ukuran wadah
// kapan pun ia mau, dan itulah yang membuat perilaku komponennya bisa diperiksa.
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

describe('dotPattern', () => {
  it('tidak menggambar apa pun sebelum ukuran wadahnya diketahui', () => {
    const wrapper = mount(DotPattern)
    expect(wrapper.findAll('circle')).toHaveLength(0)
  })

  it('mengisi wadahnya sesuai jarak antar titik', async () => {
    const wrapper = mount(DotPattern, { props: { width: 10, height: 10 } })
    await beriUkuran(100, 50)

    // 100/10 kolom × 50/10 baris
    expect(wrapper.findAll('circle')).toHaveLength(50)
  })

  it('menyusun ulang saat wadahnya berubah ukuran', async () => {
    const wrapper = mount(DotPattern, { props: { width: 10, height: 10 } })

    await beriUkuran(100, 50)
    expect(wrapper.findAll('circle')).toHaveLength(50)

    await beriUkuran(200, 50)
    expect(wrapper.findAll('circle')).toHaveLength(100)
  })

  it('menempatkan titik memakai cx dan cy sebagai geseran', async () => {
    const wrapper = mount(DotPattern, {
      props: { width: 10, height: 10, cx: 2, cy: 3 },
    })
    await beriUkuran(20, 10)

    const titik = wrapper.findAll('circle')
    expect(titik[0].attributes('cx')).toBe('2')
    expect(titik[0].attributes('cy')).toBe('3')
    expect(titik[1].attributes('cx')).toBe('12')
  })

  // Denyutnya CSS, jadi yang perlu dibuktikan adalah komponennya memasang
  // kelas dan variabel yang dipakai keyframes-nya — bukan menggerakkan nilai.
  it('menyalakan denyut lewat kelas dan variabel CSS saat glow', async () => {
    const wrapper = mount(DotPattern, {
      props: { width: 10, height: 10, glow: true },
    })
    await beriUkuran(10, 10)

    const titik = wrapper.get('circle')
    expect(titik.classes()).toContain('dot-glow-animate')
    expect(titik.attributes('style')).toContain('--dot-delay')
    expect(titik.attributes('style')).toContain('--dot-duration')
    expect(titik.attributes('fill')).toContain('url(#')
  })

  it('tidak menganimasikan apa pun saat glow mati', async () => {
    const wrapper = mount(DotPattern, { props: { width: 10, height: 10 } })
    await beriUkuran(10, 10)

    const titik = wrapper.get('circle')
    expect(titik.classes()).not.toContain('dot-glow-animate')
    expect(titik.attributes('fill')).toBe('currentColor')
  })

  it('melepas pengamatnya saat dilepas', () => {
    const wrapper = mount(DotPattern)
    wrapper.unmount()
    expect(putusDipanggil).toBe(1)
  })
})
