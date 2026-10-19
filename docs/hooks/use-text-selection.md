---
title: useTextSelection
description: "Teks yang sedang disorot, beserta letaknya di layar."
---

<ComponentPreview name="UseTextSelectionDemo" code="none" />

Letaknya yang membuat composable ini berguna: dari situ sebuah bilah alat
kecil — kutip, salin, sorot — bisa muncul tepat di atas teks yang dipilih.

`mousedown` mengosongkan pilihan sebelumnya dan mencatat apakah tekanannya
bermula di dalam target. Tanpa catatan itu, menyeret dari luar lalu berakhir
di dalam akan terbaca sebagai pilihan milik target — padahal bukan. Klik
kanan dilewati karena menu konteks tidak menghapus pilihan yang ada.

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

<InstallCLI name="use-text-selection" />

Ikut terpasang sendiri: [`is-browser`](/hooks/is-browser), [`target`](/hooks/target).

</TabItem>

<TabItem value="manual" label="Manual">

Salin dulu [`is-browser`](/hooks/is-browser), [`target`](/hooks/target) — masing-masing memuat sumbernya di halamannya sendiri — lalu tempel berkas ini.

```ts [composables/use-text-selection.ts]
import { getCurrentScope, onScopeDispose, ref, watch } from 'vue'
import { isBrowser } from '@/lib/is-browser'
import { getTargetElement } from '@/lib/target'
import type { BasicTarget } from '@/lib/target'

export interface SelectionRect {
  top: number
  left: number
  bottom: number
  right: number
  height: number
  width: number
}

const EMPTY_RECT: SelectionRect = {
  top: Number.NaN,
  left: Number.NaN,
  bottom: Number.NaN,
  right: Number.NaN,
  height: Number.NaN,
  width: Number.NaN,
}

function rectFromSelection(selection: Selection | null): SelectionRect {
  if (!selection || selection.rangeCount < 1) return EMPTY_RECT

  const { top, left, bottom, right, height, width } = selection
    .getRangeAt(0)
    .getBoundingClientRect()
  return { top, left, bottom, right, height, width }
}

export function useTextSelection(target?: BasicTarget) {
  const text = ref('')
  const rect = ref<SelectionRect>({ ...EMPTY_RECT })

  let startedInside = false
  let detach: (() => void) | undefined

  const teardown = () => {
    detach?.()
    detach = undefined
  }

  const stopWatch = watch(
    () => getTargetElement(target),
    (element) => {
      teardown()
      if (!isBrowser) return

      const el = (element ?? document) as Document | Element

      const onMouseUp = () => {
        if (typeof window.getSelection !== 'function') return

        const selection = window.getSelection()
        const content = selection ? selection.toString() : ''

        if (content && startedInside) {
          text.value = content
          rect.value = rectFromSelection(selection)
        }
      }

      const onMouseDown = (event: MouseEvent) => {
        if (event.button === 2) return
        if (typeof window.getSelection !== 'function') return

        if (text.value) {
          text.value = ''
          rect.value = { ...EMPTY_RECT }
        }

        startedInside = false
        const selection = window.getSelection()
        if (!selection) return

        selection.removeAllRanges()
        startedInside = 'contains' in el ? el.contains(event.target as Node) : true
      }

      el.addEventListener('mouseup', onMouseUp as EventListener)
      document.addEventListener('mousedown', onMouseDown as EventListener)

      detach = () => {
        el.removeEventListener('mouseup', onMouseUp as EventListener)
        document.removeEventListener('mousedown', onMouseDown as EventListener)
      }
    },
    { immediate: true, flush: 'post' },
  )

  const stop = () => {
    teardown()
    stopWatch()
  }

  if (getCurrentScope()) onScopeDispose(stop)

  return {
    /** Selected text; empty when nothing is selected. Reactive. */
    text,
    /** Bounding box of the selection, in viewport pixels; `NaN` fields when empty. Reactive. */
    rect,
  }
}
```

</TabItem>

</Tabs>

## Requirements

| Requirement | Value |
|---|---|
| Project | Vue 3.5+, alias `@` — disiapkan `kliping init` |
| Kliping items | `is-browser`, `target` |
| Files | `composables/use-text-selection.ts` |

## API Reference

```ts
export interface SelectionRect {
  top: number
  left: number
  bottom: number
  right: number
  height: number
  width: number
}

export function useTextSelection(target?: BasicTarget)
```

### Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `target?` | `BasicTarget` | — | Element whose selection is tracked; leave empty for the whole document. |

### Returns

| Property | Type | Description |
|---|---|---|
| `text` | `Ref<string, string>` | Selected text; empty when nothing is selected. Reactive. |
| `rect` | `Ref<{ top: number; left: number; bottom: number; right: number; height: number; width: number; }, SelectionRect \| { top: number; left: number; bottom: number; right: number; height: number; width: number; }>` | Bounding box of the selection, in viewport pixels; `NaN` fields when empty. Reactive. |

## Credits

Berasal dari [shadcn-hooks](https://github.com/Debbl/shadcn-hooks) (MIT, Copyright (c) 2025 Brendan Dash). Bentuk API-nya dari [ahooks](https://github.com/alibaba/hooks) lewat shadcn-hooks. Rantai lengkapnya di [Credits](/credits).
