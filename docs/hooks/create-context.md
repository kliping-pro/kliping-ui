---
title: createContext
description: "Membagi nilai ke seluruh pohon komponen tanpa mengoper prop."
---

<ComponentPreview name="CreateContextDemo" code="none" />

<NativeClassCallout equivalent="provide() dan inject()" />

Vue menyediakannya sebagai dua fungsi bawaan:

```ts
// Di komponen induk
import { provide } from 'vue'
provide('theme', themeRef)

// Di komponen anak, sedalam apa pun
import { inject } from 'vue'
const theme = inject('theme')
```

## Aman tipe

Pakai `InjectionKey` supaya tipenya ikut terbawa, dan salah ketik jadi error saat
build — bukan `undefined` saat dijalankan.

```ts
// keys.ts
import type { InjectionKey, Ref } from 'vue'

export interface Theme {
  dark: Ref<boolean>
  toggle: () => void
}

export const themeKey = Symbol('theme') as InjectionKey<Theme>
```

```ts
provide(themeKey, { dark, toggle })   // induk
const theme = inject(themeKey)          // anak — tipenya sudah `Theme`
```

## Kalau wajib ada

`inject` mengembalikan `undefined` kalau tidak ada yang menyediakannya. Untuk nilai
yang memang wajib, buat pembungkus kecil yang melempar dengan pesan yang menyebut
sebabnya:

```ts
export function useTheme() {
  const theme = inject(themeKey)
  if (!theme)
    throw new Error('useTheme() was called outside a theme provider')
  return theme
}
```

Itu yang membedakan error yang bisa langsung dibaca dari `Cannot read properties of
undefined` di tempat yang jauh dari sebabnya.

<!--@include: ./_api/create-context.md-->
