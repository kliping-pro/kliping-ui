---
title: Installation
description: "Menyiapkan project sekali, lalu memasang template dengan satu perintah."
---

Template dirakit dari komponen yang dipasang dengan CLI `kliping` — CLI yang sama untuk komponen, block, varian, grafik, dan hook. Tidak ada paket yang perlu di-install; perintahnya dijalankan lewat `npx`.

## Siapkan project

Jalankan `init` sekali di project Anda. Di project Vite dan Nuxt, perintah ini juga menyiapkan Tailwind CSS v4 dan alias `@/` kalau belum ada, lalu menulis `components.json`:

<PackageCommand command="npx kliping@latest init" />

Untuk framework lain, ikuti [Installation](/installation).

## Pasang

Tiap halaman template menuliskan perintahnya sendiri. Bentuknya seperti ini:

<PackageCommand command="npx kliping@latest add button navigation-menu" />

## Ke mana berkasnya mendarat

Komponen registry-nya mendarat di `components/ui/`. Halaman dan komponen khusus template-nya Anda salin dari tab Code, mengikuti jalur yang tertulis di pohon berkasnya.

## Setelah itu

Berkasnya milik Anda. Tidak ada versi yang perlu diikuti dan tidak ada pembaruan yang datang sendiri — ubah sesuka Anda.
