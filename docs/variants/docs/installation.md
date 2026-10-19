---
title: Installation
description: "Menyiapkan project sekali, lalu memasang varian dengan satu perintah."
---

Item di sini dipasang dengan CLI `kliping` — CLI yang sama untuk komponen, block, varian, grafik, dan hook. Tidak ada paket yang perlu di-install; perintahnya dijalankan lewat `npx`.

## Siapkan project

Jalankan `init` sekali di project Anda. Di project Vite dan Nuxt, perintah ini juga menyiapkan Tailwind CSS v4 dan alias `@/` kalau belum ada, lalu menulis `components.json`:

<PackageCommand command="npx kliping@latest init" />

Untuk framework lain, ikuti [Installation](/installation).

## Pasang

Tiap halaman varian menuliskan perintahnya sendiri. Bentuknya seperti ini:

<PackageCommand command="npx kliping@latest add button-01" />

## Ke mana berkasnya mendarat

Berkas variannya mendarat di `components/variants/<nama>/` — misalnya `components/variants/button-01/button-01.vue` — dan komponen dasarnya ikut terpasang di `components/ui/`. Komponen yang sudah ada tidak ditimpa tanpa ditanya.

## Setelah itu

Berkasnya milik Anda. Tidak ada versi yang perlu diikuti dan tidak ada pembaruan yang datang sendiri — ubah sesuka Anda.
