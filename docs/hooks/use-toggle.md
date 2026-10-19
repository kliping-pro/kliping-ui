---
title: useToggle
description: "Membalik sebuah nilai bolak-balik antara dua kemungkinan."
---

<ComponentPreview name="UseToggleDemo" code="none" />

Isinya sengaja setipis mungkin: sebuah `ref` dan empat fungsi biasa. `setup()`
berjalan sekali, jadi keduanya sudah stabil dengan sendirinya — tidak ada yang
perlu dibungkus atau dijaga identitasnya.

Nilai kiri dan kanannya dikunci sekali saat composable ini dipanggil. Yang
bolak-balik adalah nilainya, bukan batas-batasnya.

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

<InstallCLI name="use-toggle" />

Tanpa dependensi — tidak ada berkas lain yang ikut terpasang.

</TabItem>

<TabItem value="manual" label="Manual">

Salin kode berikut ke project Anda.

```ts [composables/use-toggle.ts]
import { ref, toValue } from 'vue'
import type { MaybeRefOrGetter, Ref } from 'vue'

export function useToggle<D = boolean, R = boolean>(
  defaultValue: MaybeRefOrGetter<D> = false as D,
  reverseValue?: MaybeRefOrGetter<R>,
) {
  const left = toValue(defaultValue) as D
  const right = (reverseValue === undefined ? !left : toValue(reverseValue)) as R

  const value = ref(left) as Ref<D | R>

  const set = (next: D | R) => {
    value.value = next
  }

  const toggle = () => {
    value.value = Object.is(value.value, left) ? right : left
  }

  return {
    /** Current value. Reactive. */
    value,
    /** Switches between the two values. */
    toggle,
    /** Sets either value. */
    set,
    /** Sets the left (default) value. */
    setLeft: () => set(left),
    /** Sets the right (reverse) value. */
    setRight: () => set(right),
  }
}
```

</TabItem>

</Tabs>

## Requirements

| Requirement | Value |
|---|---|
| Project | Vue 3.5+, alias `@` — disiapkan `kliping init` |
| Files | `composables/use-toggle.ts` |

## API Reference

```ts
export function useToggle<D = boolean, R = boolean>(
  defaultValue: MaybeRefOrGetter<D> = false as D,
  reverseValue?: MaybeRefOrGetter<R>,
)
```

### Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `defaultValue?` | `MaybeRefOrGetter<D>` | `false as D` | Initial value, and the left value. Default: `false`. |
| `reverseValue?` | `MaybeRefOrGetter<R>` | — | The right value; defaults to the opposite of `defaultValue`. |

### Returns

| Property | Type | Description |
|---|---|---|
| `value` | `Ref<D \| R, D \| R>` | Current value. Reactive. |
| `toggle` | `() => void` | Switches between the two values. |
| `set` | `(next: D \| R) => void` | Sets either value. |
| `setLeft` | `() => void` | Sets the left (default) value. |
| `setRight` | `() => void` | Sets the right (reverse) value. |

## Credits

Berasal dari [shadcn-hooks](https://github.com/Debbl/shadcn-hooks) (MIT, Copyright (c) 2025 Brendan Dash). Rantai lengkapnya di [Credits](/credits).
