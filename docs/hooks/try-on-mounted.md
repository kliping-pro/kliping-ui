---
title: tryOnMounted
description: "Jalankan sesuatu setelah komponennya terpasang, atau sekarang juga kalau tidak ada komponennya."
---

<ComponentPreview name="TryOnMountedDemo" code="none" />

Jalankan sesuatu setelah komponennya terpasang — atau sekarang juga, kalau
memang tidak ada komponennya.

`onMounted` di luar `setup()` tidak melakukan apa-apa dan mencetak peringatan.
Itu jadi soal karena composable dipanggil dari dua tempat: dari komponen, dan
dari `effectScope()` lepas — termasuk di dalam uji, di mana peringatan itu
membanjiri keluaran tanpa menandakan kesalahan apa pun.

Yang dijaga tetap sama di kedua jalur: pekerjaannya tidak pernah berjalan di
server. Di dalam komponen itu dijamin `onMounted` sendiri; di luar komponen,
`isBrowser` yang menjaganya.

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

<InstallCLI name="try-on-mounted" />

Ikut terpasang sendiri: [`is-browser`](/hooks/is-browser).

</TabItem>

<TabItem value="manual" label="Manual">

Salin dulu [`is-browser`](/hooks/is-browser) — masing-masing memuat sumbernya di halamannya sendiri — lalu tempel berkas ini.

```ts [lib/try-on-mounted.ts]
import { getCurrentInstance, onMounted } from 'vue'
import { isBrowser } from '@/lib/is-browser'

export function tryOnMounted(fn: () => void) {
  if (getCurrentInstance()) {
    onMounted(fn)
    return
  }

  if (isBrowser) fn()
}
```

</TabItem>

</Tabs>

<!--@include: ./_api/try-on-mounted.md-->
