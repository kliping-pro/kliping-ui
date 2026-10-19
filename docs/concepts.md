---
title: Concepts
description: Peta Kliping dari akarnya — jenis item, bagaimana mereka tersusun dari component sampai template, ke mana berkasnya mendarat, dan cara membaca setiap bagian halaman dokumentasi.
---

Kliping bukan pustaka yang dipasang lalu dipanggil dari `node_modules`. Setiap item
adalah **kode sumber** yang disalin `kliping add` ke project Anda — sesudah itu kodenya
milik Anda, diubah di editor Anda sendiri. Halaman ini memetakan seluruh bagiannya,
supaya Anda (dan agen AI yang Anda pakai) tahu harus mulai dari mana.

## Tangga susunan

Item Kliping tersusun bertingkat. Tiap tingkat dibangun dari tingkat di bawahnya:

| Tingkat | Isinya | Contoh | Kapan dipakai |
|---|---|---|---|
| **Component** | satu bagian UI yang bisa dipakai di mana saja, dengan props | [`button`](/components/button), [`dialog`](/components/dialog) | membangun UI sendiri dari bawah |
| **Variant** | satu component yang sudah diberi gaya dan susunan jadi | [`button-03`](/variants/docs/button-03) | butuh tampilan siap pakai satu component |
| **Block** | satu *section* halaman, tersusun dari banyak component | [`pricing-01`](/blocks/docs/pricing-01), [`hero-01`](/blocks/docs/hero-01) | menyusun halaman dengan cepat |
| **Page** | beberapa block yang ditumpuk berurutan | navbar → hero → pricing → footer | landing page, dashboard |
| **Template** | beberapa halaman utuh dengan rute | [Templates](/templates/docs/) | memulai situs lengkap |

Di samping tangga itu ada tiga jenis pendukung:

| Jenis | Isinya | Contoh |
|---|---|---|
| **Chart** | kartu grafik Unovis yang mengikuti warna tema | [`chart-bar-default`](/charts/docs/chart-bar-default) |
| **Hook** (composable) | logika tanpa tampilan | [`use-boolean`](/hooks/use-boolean) |
| **Lib** | helper yang dipakai item lain | `cn()` di `lib/utils`, `create-context` |

Prinsipnya: **pakai tingkat tertinggi yang sudah ada, lalu ubah isinya.** Block yang
mendekati kebutuhan lebih cepat daripada menyusun ulang dari component — dan tetap
konsisten dengan tema Anda.

## Ke mana berkasnya mendarat

`kliping add` menulis berkas ke alias yang diatur `components.json` (bawaannya `@` →
`src/`):

| Jenis | Folder di project | Diimpor dari |
|---|---|---|
| Component | `components/ui/<nama>/` | `@/components/ui/<nama>` |
| Variant | `components/variants/<nama>/<nama>.vue` | `@/components/variants/<nama>/<nama>.vue` |
| Block | `components/blocks/<nama>/<nama>.vue` | `@/components/blocks/<nama>/<nama>.vue` |
| Chart | `components/charts/<nama>/<nama>.vue` | `@/components/charts/<nama>/<nama>.vue` |
| Hook | `composables/<nama>.ts` | `@/composables/<nama>` |
| Lib | `lib/<nama>.ts` | `@/lib/<nama>` |

Ketergantungan ikut terpasang sendiri. Memasang `pricing-01` juga memasang `button`
dan `separator` yang dipakainya, paket npm yang dibutuhkan, dan variabel tema. Daftar
lengkapnya ada di bagian **Requirements** tiap halaman.

## Dari kalimat sampai halaman

Ada tiga jalan menuju halaman jadi, dengan hasil yang sama — berkas `.vue` di project
Anda:

1. **Manual** — `npx kliping@latest add navbar-01 hero-01 footer-01`, lalu impor
   ketiganya di halaman Anda.
2. **[Builder](/builder)** — seret block ke kanvas, urutkan, lalu salin satu perintah
   `add … --page src/LandingPage.vue` yang sekaligus menulis halamannya.
3. **Agen AI** — sambungkan [server MCP](/mcp) Kliping ke editor Anda, lalu minta
   "buatkan dashboard dari komponen Kliping". Agen mencari di katalog, membaca
   dokumentasinya, dan menjalankan perintah yang sama.

Semuanya **front-end saja**: block membawa data contoh. Menyambungkannya ke API atau
database Anda adalah langkah berikutnya.

## Membaca halaman dokumentasi

Setiap halaman item memakai susunan yang sama. Sebagian besar bagiannya disusun
otomatis dari kode, jadi selalu sama dengan yang terpasang:

| Bagian | Isinya | Ada di |
|---|---|---|
| **Installation** | satu perintah `kliping add` | semua |
| **Usage** | cara impor dan merender; untuk variant, props komponen induk yang dipakainya | semua |
| **Sample content** | data contoh yang perlu diganti (nama konstanta, jumlah & bentuk butir), gambar dari host luar, tautan `#`, form yang belum mengirim | block, variant |
| **Data** | bentuk `chartData` dan seri di `chartConfig` (label & warna) | chart |
| **Requirements** | versi project, paket npm, item Kliping yang ikut, berkas yang ditulis | semua |
| **API Reference** | props, events, slots, dan atribut `data-*` tiap bagian | component |

### Cara membaca API Reference

| Kolom | Artinya |
|---|---|
| `max?` | nama prop; `?` berarti **opsional**, tanpa `?` berarti **wajib** |
| Type | tipe TypeScript-nya; `"start" \| "end"` berarti salah satu nilai itu |
| Default | nilai bila prop tidak diisi; `—` berarti tidak ada nilai bawaan |
| Description | apa efeknya (dari komentar JSDoc di kode sumber, berbahasa Inggris) |
| `@update:modelValue` | event; bagian Payload menunjukkan nilai yang dikirim |
| `#default` | slot; bagian Props berisi nilai yang diteruskan ke slot itu |
| `[data-state]` | atribut di elemen yang bisa dipakai untuk styling (`data-[state=open]:…`) |

Props `as` dan `asChild` datang dari [Reka UI](https://reka-ui.com/docs/guides/composition):
`as` mengganti elemen yang dirender, `asChild` meneruskan atribut dan perilaku ke
elemen di slot bawaannya.

## Untuk agen AI

Supaya agen tidak menebak dan tidak membakar token untuk membaca halaman HTML utuh:

- [`/llms.txt`](https://kliping.pro/llms.txt) — katalog seluruh item dan cara memasangnya.
- `/llms/components/<nama>.md`, `/llms/blocks/<nama>.md`, `/llms/variants/<nama>.md`,
  `/llms/charts/<nama>.md` — ringkasan satu item (± 1–3 KB) untuk agen: pasang, impor,
  data contoh, Requirements, API.
- [Server MCP](/mcp) — mencari, membaca, dan memasang item langsung dari editor.
