import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import CompareSlider from './CompareSlider.vue'

async function press(orientation: 'horizontal' | 'vertical', key: string) {
  const wrapper = mount(CompareSlider, { props: { orientation, defaultValue: 50, step: 1 } })
  await wrapper.find('[role="slider"]').trigger('keydown', { key })
  await nextTick()
  return Number(wrapper.find('[role="slider"]').attributes('aria-valuenow'))
}

describe('compareSlider', () => {
  // Horizontal mengikuti pola slider WAI-ARIA: kanan, atas, dan PageUp maju.
  it('horizontal: kanan/atas/PageUp maju, kiri/bawah/PageDown mundur', async () => {
    expect(await press('horizontal', 'ArrowRight')).toBe(51)
    expect(await press('horizontal', 'ArrowUp')).toBe(51)
    expect(await press('horizontal', 'PageUp')).toBe(60)
    expect(await press('horizontal', 'ArrowLeft')).toBe(49)
    expect(await press('horizontal', 'ArrowDown')).toBe(49)
    expect(await press('horizontal', 'PageDown')).toBe(40)
  })

  // Vertikal: nilai = posisi dari atas; yang menggeser pemisah ke atas mundur.
  it('vertikal: bawah/kanan/PageDown maju, atas/kiri/PageUp mundur', async () => {
    expect(await press('vertical', 'ArrowDown')).toBe(51)
    expect(await press('vertical', 'ArrowRight')).toBe(51)
    expect(await press('vertical', 'PageDown')).toBe(60)
    expect(await press('vertical', 'ArrowUp')).toBe(49)
    expect(await press('vertical', 'ArrowLeft')).toBe(49)
    expect(await press('vertical', 'PageUp')).toBe(40)
  })
})
