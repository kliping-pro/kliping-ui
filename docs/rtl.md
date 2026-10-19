---
title: RTL
description: Dukungan tata letak kanan ke kiri untuk komponen Kliping.
---

Komponen Kliping mendukung tata letak kanan ke kiri (RTL) sejak awal. Perataan teks, posisi
elemen, dan style yang punya arah otomatis menyesuaikan untuk bahasa seperti Arab, Ibrani,
dan Persia.

Saat komponen dipasang, CLI otomatis mengubah class posisi fisik menjadi padanan logisnya,
sehingga komponen Anda berfungsi mulus baik dalam konteks LTR maupun RTL.

## Mulai

<Steps>

### Aktifkan RTL

Jalankan `init` dengan flag `--rtl`, baik di project baru maupun di folder kosong:

```bash
npx kliping@latest init --rtl
```

Perintah ini menghasilkan file `components.json` dengan flag `rtl: true`.

```json:line-numbers{4} [components.json]
{
  "$schema": "https://kliping.pro/schema.json",
  "style": "nova",
  "rtl": true
}
```

Untuk project yang sudah berjalan, isi `rtl: true` di `components.json` Anda lalu lihat [Memigrasikan komponen yang sudah ada](#memigrasikan-komponen-yang-sudah-ada) di bawah.

### Tentukan arah dokumen

Tambahkan atribut `dir="rtl"` dan `lang="ar"` pada tag `html`. Ganti `lang="ar"` sesuai bahasa yang Anda tuju.

Untuk Vite, aturlah di `index.html`:

```html:line-numbers{2} [index.html]
<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

Untuk Nuxt, aturlah lewat `useHead` di `app.vue`:

```vue:line-numbers [app.vue]
<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: 'ar',
    dir: 'rtl',
  },
})
</script>
```

### Pasang ConfigProvider

Bungkus aplikasi Anda dengan komponen [`ConfigProvider`](https://reka-ui.com/docs/utilities/config-provider)
dari `reka-ui` beserta prop `dir="rtl"`, supaya semua komponen membaca arah yang benar:

```vue:line-numbers{2,6,10} [App.vue]
<script setup lang="ts">
import { ConfigProvider } from 'reka-ui'
</script>

<template>
  <ConfigProvider dir="rtl">
    <RouterView />
  </ConfigProvider>
</template>
```

### Pasang font

Agar tampilan RTL maksimal, pakailah font yang benar-benar mendukung bahasa yang Anda tuju.
[Noto](https://fonts.google.com/noto) adalah keluarga font yang cocok untuk ini, dan serasi
dipadukan dengan Inter maupun Geist.

Pasang fontnya lewat [Fontsource](https://fontsource.org/fonts/noto-sans-arabic):

```bash
npm install @fontsource-variable/noto-sans-arabic
```

Import font tersebut di file CSS Anda:

```css:line-numbers{3,6} [src/assets/index.css]
@import "tailwindcss";
@import "tw-animate-css";
@import "@fontsource-variable/noto-sans-arabic";

@theme inline {
  --font-sans: "Noto Sans Arabic Variable", sans-serif;
}
```

Untuk bahasa lain, misalnya Ibrani, Anda bisa memakai `@fontsource-variable/noto-sans-hebrew`.

### Tambahkan komponen

Sekarang Anda siap menambahkan komponen ke project. Urusan RTL akan ditangani CLI secara otomatis.

```bash
npx kliping@latest add card
```

</Steps>

## Cara kerjanya

Saat Anda menambahkan komponen dengan `rtl: true` di `components.json`, CLI otomatis mengubah
class-nya agar kompatibel dengan RTL:

- Class posisi fisik seperti `left-*` dan `right-*` diubah menjadi padanan logisnya, `start-*` dan `end-*`.
- Class perataan teks dan jarak antar elemen ikut disesuaikan.
- Ikon yang didukung otomatis dibalik memakai `rtl:rotate-180`.

## Rekomendasi font

Agar tampilan RTL maksimal, pakailah font yang benar-benar mendukung bahasa yang Anda tuju.
[Noto](https://fonts.google.com/noto) adalah keluarga font yang cocok untuk ini, dan serasi
dipadukan dengan Inter maupun Geist.

Lihat bagian [Mulai](#mulai) untuk langkah pemasangan dan konfigurasi fontnya.

## Animasi

CLI juga menangani class animasi, mengubah animasi berarah fisik menjadi padanan logisnya.
Contohnya, `slide-in-from-right` menjadi `slide-in-from-end`.

Dengan begitu animasi pada dropdown, popover, dan tooltip bergerak ke arah yang benar sesuai
arah teks dokumen.

**Catatan soal tw-animate-css:**

Ada [masalah yang sudah diketahui](https://github.com/Wombosvideo/tw-animate-css/issues/67)
pada library `tw-animate-css`, di mana utility slide logis belum bekerja sebagaimana mestinya.
Untuk sementara, pastikan Anda meneruskan atribut `dir` ke elemen portal.

```vue:line-numbers
<Popover>
  <PopoverTrigger>Open</PopoverTrigger>
  <PopoverContent dir="rtl">
    <div>Content</div>
  </PopoverContent>
</Popover>
```

```vue:line-numbers
<Tooltip>
  <TooltipTrigger>Open</TooltipTrigger>
  <TooltipContent dir="rtl">
    <div>Content</div>
  </TooltipContent>
</Tooltip>
```

## Memigrasikan komponen yang sudah ada

Kalau Anda sudah memasang komponen sebelum mengaktifkan RTL, migrasikan lewat CLI seperti berikut:

<Steps>

### Jalankan perintah migrate

```bash
npx kliping@latest migrate rtl [path]
```

`[path]` menerima sebuah path atau pola glob. Kalau tidak Anda isi, seluruh file di folder `ui` akan dimigrasikan.

```bash
# Migrasikan satu file tertentu
npx kliping@latest migrate rtl src/components/ui/button/button.vue

# Migrasikan semua file yang cocok dengan pola glob
npx kliping@latest migrate rtl "src/components/ui/**"
```

Perintah ini sekaligus memperbarui `components.json` Anda menjadi `rtl: true`. Lihat
[dokumentasi CLI](/cli#migrate-rtl) untuk detailnya.

### Penyesuaian manual (opsional)

Komponen berikut tidak ikut dimigrasikan otomatis oleh CLI, jadi mungkin perlu Anda sesuaikan sendiri:

- [Calendar](/components/calendar)
- [Pagination](/components/pagination)
- [Sidebar](/components/sidebar)

### Sesuaikan ikon

Sebagian ikon seperti `ArrowRight` atau `ChevronLeft` perlu class `rtl:rotate-180` agar
terbalik dengan benar. Tambahkan class tersebut pada komponen ikonnya.

```vue:line-numbers
<ArrowRight class="rtl:rotate-180" />
```

### Pasang ConfigProvider

Bungkus aplikasi Anda dengan komponen `ConfigProvider` dari `reka-ui`. Lihat bagian
[Mulai](#mulai) untuk detailnya.

</Steps>
