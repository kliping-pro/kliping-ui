import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import Particles from './Particles.vue'

// jsdom tidak mengimplementasikan konteks 2D. Yang dipalsukan di sini hanya
// permukaan yang benar-benar dipakai komponennya; kalau ia memanggil sesuatu di
// luar daftar ini, ujinya gagal dengan galat yang menyebut namanya.
function konteksPalsu() {
  return {
    clearRect: vi.fn(),
    translate: vi.fn(),
    beginPath: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    setTransform: vi.fn(),
    fillStyle: '',
  }
}

let konteks: ReturnType<typeof konteksPalsu>
let putusDipanggil = 0

beforeEach(() => {
  konteks = konteksPalsu()
  putusDipanggil = 0

  vi.spyOn(HTMLCanvasElement.prototype, 'getContext')
    .mockReturnValue(konteks as unknown as CanvasRenderingContext2D)

  vi.stubGlobal('ResizeObserver', class {
    observe() {}
    disconnect() {
      putusDipanggil += 1
    }
  })
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('particles', () => {
  it('menggambar sebanyak quantity saat dipasang', () => {
    mount(Particles, { props: { quantity: 12 } })
    expect(konteks.arc).toHaveBeenCalledTimes(12)
  })

  // Ini yang paling penting dari seluruh komponen ini. Di sumbernya gelung
  // rAF-nya memanggil dirinya sendiri selamanya dan tidak pernah dibatalkan:
  // berpindah halaman meninggalkannya tetap berjalan, menggambar ke kanvas yang
  // sudah tidak ada di dokumen.
  it('menghentikan gelung animasinya saat dilepas', () => {
    const batal = vi.spyOn(globalThis, 'cancelAnimationFrame')

    const wrapper = mount(Particles)
    wrapper.unmount()

    expect(batal).toHaveBeenCalledTimes(1)
  })

  it('melepas pendengar tetikus dan pengamat ukurannya saat dilepas', () => {
    const lepas = vi.spyOn(window, 'removeEventListener')

    const wrapper = mount(Particles)
    wrapper.unmount()

    expect(lepas).toHaveBeenCalledWith('mousemove', expect.any(Function))
    expect(putusDipanggil).toBe(1)
  })

  it('mengubah warna tanpa menjalankan gelung kedua', async () => {
    const minta = vi.spyOn(globalThis, 'requestAnimationFrame')

    const wrapper = mount(Particles, { props: { color: '#ffffff' } })
    const sebelum = minta.mock.calls.length

    await wrapper.setProps({ color: '#ff0000' })

    // Warna barunya cuma dicatat; gelungnya yang sudah berjalan tidak digandakan.
    expect(minta.mock.calls.length).toBe(sebelum)
  })

  it('menerima hex tiga digit', () => {
    // Kalau `#f00` tidak dilebarkan jadi `#ff0000`, hasilnya NaN dan tiap
    // partikel digambar dengan fillStyle yang tidak sah.
    mount(Particles, { props: { color: '#f00', quantity: 1 } })
    expect(konteks.fillStyle).toContain('255, 0, 0')
  })
})
