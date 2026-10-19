---
title: Vite
description: Memasang dan mengonfigurasi Kliping di project Vite.
---

<Steps>

### Buat project

Mulai dengan membuat project Vue baru memakai `vite`, lalu masuk ke foldernya dan pasang
dependensinya:

```bash
npm create vite@latest my-vue-app -- --template vue-ts --no-interactive
```

```bash
cd my-vue-app
npm install
```

Sudah punya project Vite? Lewati langkah ini. Template JavaScript (`vue`) juga didukung.

::: tip Mulai dari folder kosong
`npx kliping@latest init` di folder kosong membuat project Vite + TypeScript baru sendiri —
  langkah ini dan langkah berikutnya jadi satu.
:::

### Jalankan CLI

Jalankan perintah `init` di folder project Anda:

```bash
npx kliping@latest init
```

Kalau Tailwind CSS v4 atau alias import `@` belum ada, `init` menyiapkannya sendiri:

- memasang `tailwindcss`, `@tailwindcss/vite`, dan `@types/node`;
- menambahkan plugin Tailwind dan `resolve.alias` ke `vite.config`;
- menambahkan `paths` ke `tsconfig.json` dan `tsconfig.app.json` (atau `jsconfig.json` untuk
  project JavaScript), dengan komentar dan format yang tetap;
- menambahkan `@import "tailwindcss"` ke CSS global Anda.

Demo bawaan create-vite yang belum Anda ubah diganti halaman sambutan Kliping yang kecil;
berkas buatan Anda sendiri tidak pernah ditimpa.

Setelah itu Anda akan ditanya beberapa hal untuk mengisi `components.json`, misalnya:

```txt
Which color would you like to use as the base color? › Neutral
```

### Tambahkan komponen

Sekarang Anda bisa mulai menambahkan komponen ke project.

```bash
npx kliping@latest add button
```

Perintah di atas menambahkan komponen `Button` ke `src/components/ui/button`. Setelah itu,
import seperti ini:

```vue:line-numbers{2,7} [src/App.vue]
<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <div>
    <Button>Klik saya</Button>
  </div>
</template>
```

</Steps>

## Menyiapkan sendiri

Ingin tahu persis apa yang diubah, atau `vite.config` Anda memakai bentuk fungsi yang tidak
bisa disunting otomatis? Ikuti [Manual Installation](/installation/manual) untuk Tailwind CSS,
alias `@`, dan `components.json`, lalu lanjutkan dengan `npx kliping@latest add`.
