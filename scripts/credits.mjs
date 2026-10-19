// Asal tiap item registry, untuk bagian "Credits" di halamannya.
//
// Satu tempat untuk semua generator (komponen, block, variant, chart,
// composable, template), supaya kalimat dan hak ciptanya tidak ditulis ulang di
// tiap skrip. Rincian lengkap tetap di `LICENSE` dan /credits; bagian per
// halaman hanya menunjuk sumber langsung item itu.
//
// Item yang asalnya belum dipastikan sengaja tidak diberi bagian Credits —
// lebih baik kosong daripada menunjuk sumber yang salah.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const readJson = file => JSON.parse(fs.readFileSync(path.join(ROOT, file), 'utf-8'))

export const SOURCES = {
  'shadcn-vue': { name: 'shadcn-vue', url: 'https://github.com/unovue/shadcn-vue', copyright: 'Copyright (c) 2023 unovue' },
  'shadcn-ui-blocks': { name: 'shadcn-ui-blocks', url: 'https://www.shadcnui-blocks.com', copyright: 'Copyright 2025 Shadcn UI Blocks' },
  'creative-tim': { name: 'Creative Tim UI', url: 'https://github.com/creativetimofficial/ui', copyright: 'Copyright (c) 2025 Creative Tim' },
  'dice-ui': { name: 'Dice UI', url: 'https://github.com/sadmann7/diceui', copyright: 'Copyright (c) 2024 Sadman Sakib' },
  'magic-ui': { name: 'Magic UI', url: 'https://github.com/magicuidesign/magicui', copyright: 'Copyright (c) Magic UI' },
  'assistant-ui': { name: 'assistant-ui', url: 'https://github.com/assistant-ui/assistant-ui', copyright: 'Copyright (c) 2026 AgentbaseAI Inc.' },
  'shadcn-hooks': { name: 'shadcn-hooks', url: 'https://github.com/Debbl/shadcn-hooks', copyright: 'Copyright (c) 2025 Brendan Dash' },
}

// Hulu yang lebih jauh dari bentuk API composable (lewat shadcn-hooks).
const HOOK_UPSTREAM = {
  ahooks: { url: 'https://github.com/alibaba/hooks', names: ['use-boolean', 'use-click-away', 'use-controllable-value', 'use-debounce', 'use-debounce-fn', 'use-event-listener', 'use-hover', 'use-in-viewport', 'use-interval', 'use-network', 'use-previous', 'use-reset-state', 'use-text-selection', 'use-throttle', 'use-throttle-fn', 'use-timeout', 'use-why-did-you-update'] },
  'usehooks-ts': { url: 'https://github.com/juliencrn/usehooks-ts', names: ['use-click-any-where', 'use-scroll-lock'] },
}

// Primitif `components/ui` yang berasal dari shadcn-vue.
const SHADCN_VUE_UI = new Set(['accordion', 'alert', 'alert-dialog', 'aspect-ratio', 'avatar', 'badge', 'breadcrumb', 'button', 'button-group', 'calendar', 'card', 'carousel', 'chart', 'checkbox', 'collapsible', 'combobox', 'command', 'context-menu', 'dialog', 'drawer', 'dropdown-menu', 'empty', 'field', 'form', 'hover-card', 'input', 'input-group', 'input-otp', 'item', 'kbd', 'label', 'menubar', 'native-select', 'navigation-menu', 'number-field', 'pagination', 'pin-input', 'popover', 'progress', 'radio-group', 'range-calendar', 'resizable', 'scroll-area', 'select', 'separator', 'sheet', 'sidebar', 'skeleton', 'slider', 'sonner', 'spinner', 'stepper', 'switch', 'table', 'tabs', 'tags-input', 'textarea', 'toggle', 'toggle-group', 'tooltip'])
const MAGIC_UI = new Set(['animated-grid-pattern', 'border-beam', 'dot-pattern', 'particles', 'marquee-basic'])
const ASSISTANT_UI = new Set(['ai-chat', 'ai-thread-list'])

// Block yang datang bersama shadcn-vue (sebelum block shadcn-ui-blocks masuk;
// lihat KLIPING-ROADMAP-FOUNDATION.md §6.3).
const SHADCN_VUE_BLOCK = /^(?:login-0[1-5]|signup-0[1-5]|sidebar-\d+|sidebar-demo|otp-\d+|dashboard-01|products-01|chart-.+)$/
const creativeTimBlocks = new Set(Object.values(readJson('scripts/creative-tim-blocks.json')).map(b => b.name))
const CREATIVE_TIM_VARIANT = /^card-(?:09|1[0-3])$/

const componentSources = readJson('scripts/component-sources.json')
const catalogSource = new Map([...componentSources.components, ...componentSources.utilities]
  .map(c => [c.slug, c.source?.name === 'Creative Tim UI' ? 'creative-tim' : 'dice-ui']))

/** Kunci `SOURCES` untuk sebuah item, atau `null` bila asalnya belum dipastikan. */
export function sourceOf(kind, name) {
  switch (kind) {
    case 'component':
      if (ASSISTANT_UI.has(name)) return 'assistant-ui'
      if (MAGIC_UI.has(name)) return 'magic-ui'
      if (catalogSource.has(name)) return catalogSource.get(name)
      return SHADCN_VUE_UI.has(name) ? 'shadcn-vue' : null
    case 'block':
      if (creativeTimBlocks.has(name)) return 'creative-tim'
      return SHADCN_VUE_BLOCK.test(name) ? 'shadcn-vue' : 'shadcn-ui-blocks'
    case 'variant':
      return CREATIVE_TIM_VARIANT.test(name) ? 'creative-tim' : 'shadcn-ui-blocks'
    case 'chart':
      return 'shadcn-vue'
    case 'hook':
      return 'shadcn-hooks'
    default:
      return null
  }
}

const TEXT = {
  id: {
    from: (s, link) => `Berasal dari ${link} (MIT, ${s.copyright}).`,
    upstream: (n, link) => `Bentuk API-nya dari ${link} lewat ${n}.`,
    more: site => `Rantai lengkapnya di [Credits](${site}/credits).`,
  },
  en: {
    from: (s, link) => `Based on ${link} (MIT, ${s.copyright}).`,
    upstream: (n, link) => `API shape from ${link}, via ${n}.`,
    more: site => `Full chain: [Credits](${site}/credits).`,
  },
}

/**
 * Bagian `## Credits` untuk halaman sebuah item — `[]` bila asalnya belum
 * dipastikan. `lang`: 'id' (situs) atau 'en' (llms); `site`: '' untuk tautan
 * situs, 'https://kliping.pro' untuk berkas agen.
 */
export function creditLines(kind, name, lang = 'id', site = '') {
  const key = sourceOf(kind, name)
  if (!key)
    return []
  const t = TEXT[lang]
  const s = SOURCES[key]
  const parts = [t.from(s, `[${s.name}](${s.url})`)]
  if (kind === 'hook') {
    const up = Object.entries(HOOK_UPSTREAM).find(([, u]) => u.names.includes(name))
    if (up)
      parts.push(t.upstream(s.name, `[${up[0]}](${up[1].url})`))
  }
  parts.push(t.more(site))
  return ['## Credits\n', `${parts.join(' ')}\n`]
}
