---
title: Installation
description: "Menyiapkan project sekali, lalu memasang grafik dengan satu perintah."
---

Item di sini dipasang dengan CLI `kliping` — CLI yang sama untuk komponen, block, varian, grafik, dan hook. Tidak ada paket yang perlu di-install; perintahnya dijalankan lewat `npx`.

## Siapkan project

Jalankan `init` sekali di project Anda. Di project Vite dan Nuxt, perintah ini juga menyiapkan Tailwind CSS v4 dan alias `@/` kalau belum ada, lalu menulis `components.json`:

<PackageCommand command="npx kliping@latest init" />

Untuk framework lain, ikuti [Installation](/installation).

## Pasang

Tiap halaman grafik menuliskan perintahnya sendiri. Bentuknya seperti ini:

<PackageCommand command="npx kliping@latest add chart-area-axes" />

## Ke mana berkasnya mendarat

Berkas grafiknya mendarat di `components/charts/<nama>/` — misalnya `components/charts/chart-area-axes/chart-area-axes.vue` — dan komponen Chart beserta pendampingnya ikut terpasang di `components/ui/`.

## Setelah itu

Berkasnya milik Anda. Tidak ada versi yang perlu diikuti dan tidak ada pembaruan yang datang sendiri — ubah sesuka Anda.
