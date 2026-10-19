---
title: Nuxt
description: Memasang dan mengonfigurasi Kliping di project Nuxt.
---

<Steps>

### Buat project

Mulai dengan membuat project Nuxt baru:

```bash
npm create nuxt@latest
```

Sudah punya project Nuxt 3 atau Nuxt 4? Lewati langkah ini.

::: tip Mulai dari folder kosong
`npx kliping@latest init --template nuxt` di folder kosong membuat project Nuxt 4 baru
  sendiri, dari template yang ada di dalam CLI — langkah ini dan langkah berikutnya jadi satu.
:::

::: warning npm 10 dan project Nuxt baru
npm 10 (bawaan Node.js 22) crash dengan pesan `edgesOut` saat memasang project Nuxt 4 baru —
  ini bug npm, `npm create nuxt` pun kena. Pakai pnpm, atau perbarui npm:

  ```bash
  pnpm dlx kliping@latest init --template nuxt
  ```
:::

### Jalankan CLI

Jalankan perintah `init` di folder project Anda:

```bash
npx kliping@latest init
```

Kalau Tailwind CSS v4 belum ada, `init` menyiapkannya sendiri:

- memasang `tailwindcss`, `@tailwindcss/vite`, dan module `shadcn-nuxt` sebagai
  devDependency;
- membuat `assets/css/tailwind.css` (di dalam `app/` untuk Nuxt 4) berisi
  `@import "tailwindcss"`;
- menambahkan plugin Tailwind ke `vite.plugins`, berkas CSS tadi ke `css`, dan
  `shadcn-nuxt` ke `modules` di `nuxt.config`;
- menjalankan `nuxt prepare`.

Module `shadcn-nuxt` mendaftarkan folder komponen ke fitur auto-import Nuxt, supaya console
Anda tidak dipenuhi peringatan.

Setelah itu Anda akan ditanya beberapa hal untuk mengisi `components.json`, misalnya:

```txt
Which color would you like to use as the base color? › Neutral
```

### Atur prefix komponen (opsional)

Secara bawaan `shadcn-nuxt` memberi awalan `Ui` pada komponen yang di-auto-import, jadi
`Button` dipakai sebagai `<UiButton>`. Untuk memakai nama aslinya, kosongkan prefix-nya di
`nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  // ...
  modules: ['shadcn-nuxt'],
  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: '@/components/ui'
  }
})
```

### Tambahkan plugin ssrWidth (opsional)

Sebagian komponen perlu nilai `ssrWidth` yang diatur lewat VueUse, agar tidak terjadi error
hydration di perangkat mobile.

Tambahkan plugin berikut ke aplikasi Nuxt Anda di `app/plugins/ssr-width.ts`.

Penjelasan lebih lanjut ada di [`useSSRWidth`](https://vueuse.org/core/useSSRWidth/).

```ts
import { provideSSRWidth } from '@vueuse/core'

export default defineNuxtPlugin((nuxtApp) => {
  provideSSRWidth(1024, nuxtApp.vueApp)
})
```

### Tambahkan komponen

Sekarang Anda bisa mulai menambahkan komponen ke project.

```bash
npx kliping@latest add button
```

Perintah di atas menambahkan komponen `Button` ke project Anda. Fitur auto-import Nuxt yang
akan mengurus import-nya, jadi Anda bisa langsung memakainya (`<UiButton>` kalau prefix
bawaan tidak Anda ubah):

```vue:line-numbers{3} [pages/index.vue]
<template>
  <div>
    <Button>Klik saya</Button>
  </div>
</template>
```

</Steps>

## Menyiapkan sendiri

Lebih suka mengatur Tailwind CSS sendiri — misalnya lewat module `@nuxtjs/tailwindcss` —
atau `nuxt.config` Anda tidak bisa disunting otomatis? Siapkan Tailwind CSS v4, pasang
`shadcn-nuxt` (`npx nuxi@latest module add shadcn-nuxt`), lalu jalankan
`npx kliping@latest init`. `init` hanya menyentuh bagian yang belum ada. Langkah manual
lengkapnya ada di [Manual Installation](/installation/manual).
