import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'
import { provideChartContext } from '.'
import ChartLegendContent from './ChartLegendContent.vue'
import ChartTooltipContent from './ChartTooltipContent.vue'

const config = {
  visitors: { label: 'Visitors', color: 'red' },
  chrome: { label: 'Chrome', color: 'blue' },
}

describe('chartTooltipContent', () => {
  // Pola pie chart: nilai field `browser` menamai entri config untuk label dan warna.
  it('mengambil label dan warna dari config lewat nameKey', () => {
    const wrapper = mount(ChartTooltipContent, {
      props: { config, nameKey: 'browser', payload: { browser: 'chrome', visitors: 275 }, hideLabel: true },
    })
    expect(wrapper.text()).toContain('Chrome')
    expect(wrapper.text()).not.toContain('Visitors')
    expect(wrapper.html()).toContain('--color-bg: blue')
  })

  it('color menimpa warna indikator dari config', () => {
    const wrapper = mount(ChartTooltipContent, {
      props: { config, color: 'green', payload: { visitors: 10 }, hideLabel: true },
    })
    expect(wrapper.html()).toContain('--color-bg: green')
  })
})

describe('chartLegendContent', () => {
  function mountLegend(props: Record<string, unknown>) {
    const Icon = defineComponent(() => () => h('svg', { class: 'series-icon' }))
    const Host = defineComponent(() => {
      provideChartContext({ id: 't', config: ref({ visitors: { label: 'Visitors', color: 'red', icon: Icon }, chrome: { label: 'Chrome', color: 'blue' } }) })
      return () => h(ChartLegendContent, props)
    })
    return mount(Host)
  }

  it('hideIcon menampilkan kotak warna alih-alih ikon seri', async () => {
    const shown = mountLegend({})
    await nextTick()
    expect(shown.find('.series-icon').exists()).toBe(true)

    const hidden = mountLegend({ hideIcon: true })
    await nextTick()
    expect(hidden.find('.series-icon').exists()).toBe(false)
  })

  // nameKey tidak berpengaruh di legenda: semua seri config tetap tampil.
  it('nameKey tidak mengubah entri legenda', async () => {
    const wrapper = mountLegend({ nameKey: 'browser' })
    await nextTick()
    expect(wrapper.text()).toContain('Visitors')
    expect(wrapper.text()).toContain('Chrome')
  })
})
