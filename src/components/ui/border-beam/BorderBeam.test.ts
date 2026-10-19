import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BorderBeam from './BorderBeam.vue'

/** Elemen sinarnya — anak dari pembungkus bertopeng. */
function sinar(wrapper: ReturnType<typeof mount>) {
  return wrapper.get('[data-slot="border-beam"] > div')
}

describe('borderBeam', () => {
  it('menempuh jalurnya lewat CSS, bukan lewat JavaScript', () => {
    const wrapper = mount(BorderBeam, { props: { duration: 6, size: 50 } })
    const gaya = sinar(wrapper).attributes('style') ?? ''

    expect(gaya).toContain('animation-name: border-beam')
    expect(gaya).toContain('animation-duration: 6s')
    expect(gaya).toContain('animation-iteration-count: infinite')
    expect(gaya).toContain('offset-path: rect(0 auto auto 0 round 50px)')
  })

  // Ini inti komponennya: posisi awal sinar tidak dibuat dengan keyframes
  // tersendiri, melainkan dengan memulai animasinya seolah sudah berjalan.
  // 25% dari putaran 8 detik = mundur 2 detik.
  it('menerjemahkan initialOffset jadi animation-delay negatif', () => {
    const wrapper = mount(BorderBeam, {
      props: { duration: 8, initialOffset: 25 },
    })

    expect(sinar(wrapper).attributes('style')).toContain('animation-delay: -2s')
  })

  it('menjumlahkan delay ke geseran awalnya', () => {
    const wrapper = mount(BorderBeam, {
      props: { duration: 10, initialOffset: 10, delay: 3 },
    })

    // -(10% × 10 detik) - 3 detik = -4 detik
    expect(sinar(wrapper).attributes('style')).toContain('animation-delay: -4s')
  })

  it('membalik arah tanpa mengganti keyframes-nya', () => {
    const maju = mount(BorderBeam)
    const mundur = mount(BorderBeam, { props: { reverse: true } })

    expect(sinar(maju).attributes('style')).toContain('animation-direction: normal')
    expect(sinar(mundur).attributes('style')).toContain('animation-direction: reverse')
  })

  it('meneruskan warna dan tebal garis sebagai variabel CSS', () => {
    const wrapper = mount(BorderBeam, {
      props: { colorFrom: '#111111', colorTo: '#222222', borderWidth: 3 },
    })

    expect(sinar(wrapper).attributes('style')).toContain('--color-from: #111111')
    expect(sinar(wrapper).attributes('style')).toContain('--color-to: #222222')
    expect(wrapper.get('[data-slot="border-beam"]').attributes('style'))
      .toContain('--border-beam-width: 3px')
  })
})
