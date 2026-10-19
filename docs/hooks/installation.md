---
title: Installation
description: "Memasang composable Kliping dengan satu perintah CLI kliping."
---

Composable dipasang dengan CLI `kliping` yang sama dengan yang Anda pakai untuk komponen.
Tidak ada paket yang perlu di-install — perintahnya dijalankan lewat `npx`.

## Pasang

Sebut nama composable-nya:

```bash
npx kliping@latest add use-boolean
```

Beberapa sekaligus juga bisa:

```bash
npx kliping@latest add use-event-listener use-mouse
```

Kalau project belum punya `components.json`, jalankan `npx kliping@latest init` dulu — atau
tambahkan `--yes` pada `add`, yang menjalankan `init` dengan konfigurasi bawaan lebih dulu.
Lihat [Installation](/installation) untuk framework Anda.

## Lewat namespace atau URL

Nama polos seperti `use-boolean` diambil dari registry Kliping. Bentuk ber-namespace dan URL
lengkap menunjuk item yang sama:

```bash
npx kliping@latest add @kliping/use-boolean
```

```bash
npx kliping@latest add https://kliping.pro/r/use-boolean.json
```

`kliping init` menulis namespace `@kliping` ke `components.json` project Anda, jadi bentuk
`@kliping/…` juga dikenali CLI lain yang kompatibel dengan shadcn-vue:

```json [components.json]
{
  "registries": {
    "@kliping": "https://kliping.pro/r/{name}.json"
  },
  "aliases": {
    "composables": "@/composables"
  }
}
```

## Ke mana berkasnya mendarat

`aliases.composables` yang menentukan. Bawaannya `@/composables`, jadi
`use-boolean` mendarat di `src/composables/use-boolean.ts`.

Helper bersama mengikuti `aliases.lib` — `is-browser`, `target`, dan
`try-on-mounted` mendarat di `src/lib/`. Ketiganya **ikut terpasang sendiri**
kalau composable yang Anda pasang membutuhkannya; tidak perlu disebut satu per
satu.

::: tip
Pastikan alias `@` sudah menunjuk `src/` di `tsconfig.json` Anda. Di project Vite dan
Nuxt, `npx kliping@latest init` menyiapkannya sendiri.
:::

## Tanpa CLI

Tiap halaman composable punya tab **Manual** yang memuat sumber utuhnya —
lengkap dengan seluruh rantainya, dalam urutan yang benar untuk ditempel. Salin,
tempel, selesai. Tidak ada yang hilang dibanding memakai CLI.

## Syarat

- **Vue 3.5+** — beberapa composable memakai `useTemplateRef()` dan `useId()`
- **TypeScript** dianjurkan, tapi tidak wajib

Tidak ada syarat lain. Composable di sini tidak menyentuh router, store, maupun
build tool Anda.
