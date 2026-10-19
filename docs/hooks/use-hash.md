---
title: useHash
description: "Bagian # dari alamat halaman, yang bisa dibaca dan ditulis."
---

<ComponentPreview name="UseHashDemo" code="none" />

Bagian `#` dari alamat halaman, yang bisa dibaca dan ditulis.

Menulis ke sini mengubah alamatnya, dan itu memicu `hashchange` yang lalu
membaca balik nilainya — jadi satu sumber kebenaran, bukan dua yang harus
dijaga tetap sama. Perubahan dari luar (tombol kembali, tautan `#bagian`,
kode lain) ikut terbaca tanpa perlakuan khusus.

Kosong saat dirender di server: di sana tidak ada alamat yang bisa dibaca,
dan `#` memang tidak pernah dikirim ke server oleh peramban mana pun.

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

<InstallCLI name="use-hash" />

Ikut terpasang sendiri: [`is-browser`](/hooks/is-browser), [`try-on-mounted`](/hooks/try-on-mounted), [`use-event-listener`](/hooks/use-event-listener).

</TabItem>

<TabItem value="manual" label="Manual">

Salin dulu [`is-browser`](/hooks/is-browser), [`try-on-mounted`](/hooks/try-on-mounted), [`target`](/hooks/target), [`use-event-listener`](/hooks/use-event-listener) — masing-masing memuat sumbernya di halamannya sendiri — lalu tempel berkas ini.

```ts [composables/use-hash.ts]
import { customRef } from 'vue'
import { isBrowser } from '@/lib/is-browser'
import { tryOnMounted } from '@/lib/try-on-mounted'
import { useEventListener } from '@/composables/use-event-listener'

export function useHash() {
  let value = ''
  let notify: (() => void) | undefined

  const read = () => (isBrowser ? window.location.hash : '')

  const update = () => {
    const next = read()
    if (next === value) return
    value = next
    notify?.()
  }

  const hash = customRef<string>((track, trigger) => {
    notify = trigger
    return {
      get() {
        track()
        return value
      },
      set(next) {
        if (!isBrowser) {
          value = next
          trigger()
          return
        }
        window.location.hash = next
      },
    }
  })

  tryOnMounted(update)
  useEventListener('hashchange', update)

  return hash
}
```

</TabItem>

</Tabs>

## Requirements

| Requirement | Value |
|---|---|
| Project | Vue 3.5+, alias `@` — disiapkan `kliping init` |
| Kliping items | `is-browser`, `try-on-mounted`, `use-event-listener` |
| Files | `composables/use-hash.ts` |

## API Reference

```ts
export function useHash()
```

### Parameters

Tanpa parameter.

### Returns

`Ref<string, string>`

## Credits

Berasal dari [shadcn-hooks](https://github.com/Debbl/shadcn-hooks) (MIT, Copyright (c) 2025 Brendan Dash). Rantai lengkapnya di [Credits](/credits).
