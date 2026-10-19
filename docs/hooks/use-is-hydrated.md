---
title: useIsHydrated
description: "Apakah halamannya sudah dihidrasi di peramban."
---

<ComponentPreview name="UseIsHydratedDemo" code="none" />

Ini salah satu dari sedikit composable "lifecycle" yang **tetap perlu ada di
Vue**, tidak seperti `useMount` atau `useUpdateEffect` yang cuma menamai ulang
sesuatu yang sudah bawaan. Sebabnya nyata: dokumentasi Kliping dirender di
server, dan HTML yang dihasilkan harus sama persis dengan gambaran pertama di
peramban. Menggambar sesuatu yang cuma bisa diketahui di peramban — lebar
layar, isi `localStorage`, waktu setempat — membuat keduanya berbeda, dan Vue
membuang lalu menggambar ulang bagiannya.

Polanya:

```vue
<button :disabled="!terhidrasi">Salin</button>
```

`onMounted` tidak pernah berjalan di server, jadi nilainya `false` saat
dirender di sana dan `false` juga pada gambaran pertama di peramban. Itulah
yang membuat keduanya cocok.

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

<InstallCLI name="use-is-hydrated" />

Ikut terpasang sendiri: [`try-on-mounted`](/hooks/try-on-mounted).

</TabItem>

<TabItem value="manual" label="Manual">

Salin dulu [`is-browser`](/hooks/is-browser), [`try-on-mounted`](/hooks/try-on-mounted) — masing-masing memuat sumbernya di halamannya sendiri — lalu tempel berkas ini.

```ts [composables/use-is-hydrated.ts]
import { readonly, ref } from 'vue'
import { tryOnMounted } from '@/lib/try-on-mounted'

export function useIsHydrated() {
  const isHydrated = ref(false)

  tryOnMounted(() => {
    isHydrated.value = true
  })

  return readonly(isHydrated)
}
```

</TabItem>

</Tabs>

## Requirements

| Requirement | Value |
|---|---|
| Project | Vue 3.5+, alias `@` — disiapkan `kliping init` |
| Kliping items | `try-on-mounted` |
| Files | `composables/use-is-hydrated.ts` |

## API Reference

```ts
export function useIsHydrated()
```

### Parameters

Tanpa parameter.

### Returns

`Readonly<Ref<boolean, boolean>>` — Whether the app has hydrated on the client (`false` during SSR). Reactive, read-only.

## Credits

Berasal dari [shadcn-hooks](https://github.com/Debbl/shadcn-hooks) (MIT, Copyright (c) 2025 Brendan Dash). Rantai lengkapnya di [Credits](/credits).
