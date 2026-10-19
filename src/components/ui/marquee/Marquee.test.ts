import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Marquee from './Marquee.vue'

describe('marquee', () => {
  it('menggandakan isinya sebanyak repeat', () => {
    const wrapper = mount(Marquee, {
      props: { repeat: 3 },
      slots: { default: '<span class="logo">Kliping</span>' },
    })

    expect(wrapper.findAll('.logo')).toHaveLength(3)
  })

  // Empat salinan dari daftar yang sama akan dibacakan pembaca layar empat kali
  // berturut-turut. Yang pertama saja yang dibiarkan terbaca.
  it('menyembunyikan salinan kedua dan seterusnya dari pembaca layar', () => {
    const wrapper = mount(Marquee, {
      props: { repeat: 4 },
      slots: { default: '<span>Kliping</span>' },
    })

    const jalur = wrapper.findAll('[data-slot="marquee"] > div')
    expect(jalur).toHaveLength(4)
    expect(jalur[0].attributes('aria-hidden')).toBeUndefined()
    expect(jalur[0].attributes('inert')).toBeUndefined()
    for (const salinan of jalur.slice(1)) {
      expect(salinan.attributes('aria-hidden')).toBe('true')
      // Tautan di salinan tersembunyi tidak boleh bisa difokus.
      expect(salinan.attributes('inert')).toBeDefined()
    }
  })

  it('memakai animasi tegak saat vertical', () => {
    const wrapper = mount(Marquee, {
      props: { vertical: true },
      slots: { default: '<span>x</span>' },
    })

    expect(wrapper.get('[data-slot="marquee"]').classes()).toContain('flex-col')
    expect(wrapper.html()).toContain('animate-marquee-vertical')
  })

  it('membalik arah dan menjeda saat hover kalau diminta', () => {
    const wrapper = mount(Marquee, {
      props: { reverse: true, pauseOnHover: true },
      slots: { default: '<span>x</span>' },
    })

    expect(wrapper.html()).toContain('[animation-direction:reverse]')
    expect(wrapper.html()).toContain('group-hover:[animation-play-state:paused]')
  })
})
