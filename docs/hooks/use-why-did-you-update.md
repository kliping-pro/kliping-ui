---
title: useWhyDidYouUpdate
description: "Mencetak prop mana yang berubah setiap kali komponennya digambar ulang."
---

<ComponentPreview name="UseWhyDidYouUpdateDemo" code="none" />

Alat bantu saat mencari sebab komponen menggambar ulang lebih sering dari
yang masuk akal. Di Vue penyebabnya hampir selalu satu dari dua: sebuah prop
berupa objek atau larik yang dibuat baru di induknya pada tiap render, atau
sebuah fungsi inline yang identitasnya berganti terus.

Hanya berbunyi saat `import.meta.env.DEV`. Itu bukan kehati-hatian berlebih —
composable ini akan ikut tersalin ke project orang, dan `console.log` yang
lolos ke produksi adalah kebocoran kecil yang menetap lama.

Yang dikirim **harus reaktif**: objek `props` sebuah komponen, `reactive()`,
atau getter yang membaca keduanya. Objek biasa tidak punya apa pun untuk
dipantau, jadi composable ini akan diam selamanya — bukan karena tidak ada
yang berubah, melainkan karena perubahannya tidak bisa terlihat. Di dalam
komponen hal ini tidak pernah jadi soal, karena `props` memang selalu reaktif.

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

<InstallCLI name="use-why-did-you-update" />

Tanpa dependensi — tidak ada berkas lain yang ikut terpasang.

</TabItem>

<TabItem value="manual" label="Manual">

Salin kode berikut ke project Anda.

```ts [composables/use-why-did-you-update.ts]
import { watch } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import { toValue } from 'vue'

export type WatchedProps = Record<string, any>

export function useWhyDidYouUpdate(componentName: string, props: MaybeRefOrGetter<WatchedProps>) {
  if (!import.meta.env.DEV) return

  let previous: WatchedProps = { ...toValue(props) }

  watch(
    () => ({ ...toValue(props) }),
    (current) => {
      const allKeys = new Set([...Object.keys(previous), ...Object.keys(current)])

      const changed: WatchedProps = {}
      for (const key of allKeys) {
        if (!Object.is(previous[key], current[key]))
          changed[key] = { from: previous[key], to: current[key] }
      }

      if (Object.keys(changed).length) console.log('[why-did-you-update]', componentName, changed)

      previous = current
    },
  )
}
```

</TabItem>

</Tabs>

## Requirements

| Requirement | Value |
|---|---|
| Project | Vue 3.5+, alias `@` — disiapkan `kliping init` |
| Files | `composables/use-why-did-you-update.ts` |

## API Reference

```ts
export type WatchedProps = Record<string, any>

export function useWhyDidYouUpdate(
  componentName: string,
  props: MaybeRefOrGetter<WatchedProps>,
)
```

### Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `componentName` | `string` | — | Name shown in the console log. |
| `props` | `MaybeRefOrGetter<WatchedProps>` | — | Props, or any object, to watch. May be a ref or getter. |

### Returns

`void` — Nothing; logs changed keys to the console in development only.

## Credits

Berasal dari [shadcn-hooks](https://github.com/Debbl/shadcn-hooks) (MIT, Copyright (c) 2025 Brendan Dash). Bentuk API-nya dari [ahooks](https://github.com/alibaba/hooks) lewat shadcn-hooks. Rantai lengkapnya di [Credits](/credits).
