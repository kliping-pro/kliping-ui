---
title: Skills
description: Membekali asisten AI Anda dengan pemahaman mendalam soal komponen, pola, dan praktik terbaik di Kliping.
---

Skill memberi asisten AI seperti Claude Code konteks yang sadar-project soal komponen di sini. Setelah dipasang, asisten AI Anda tahu cara menemukan, memasang, menyusun, dan menyesuaikan komponen memakai API dan pola yang tepat untuk project Anda.

Contohnya, Anda bisa meminta asisten AI Anda:

- _"Tambahkan form login dengan isian email dan password."_
- _"Buatkan halaman pengaturan berisi form untuk memperbarui data profil."_
- _"Bangun dashboard dengan sidebar, kartu statistik, dan data table."_
- _"Ganti ke --preset [KODE]"_

Skill ini membaca `components.json` di project Anda lalu memberi tahu asisten soal framework, alias, komponen yang sudah terpasang, library ikon, dan base library Anda — supaya kode yang dihasilkan benar sejak percobaan pertama.

---

## Pemasangan

Kliping belum punya skill sendiri. Yang tersedia sekarang adalah skill milik shadcn-vue, yang
juga memahami komponen primitif Kliping karena Kliping di-fork dari shadcn-vue v2.8.2:

```bash
npx skills add unovue/shadcn-vue
```

Setelah terpasang, asisten AI Anda otomatis memuatnya setiap kali bekerja dengan komponen tersebut.
Penjelasan lebih lanjut soal skill ada di [skills.sh](https://skills.sh).

::: warning Skill ini memanggil CLI shadcn-vue
Skill shadcn-vue menjalankan perintah CLI `shadcn-vue`, yang tidak mengenal block, varian,
  grafik, dan hook Kliping. Minta asisten Anda memakai `npx kliping@latest add <nama>` untuk
  memasang item, atau sambungkan [server MCP Kliping](/mcp) — server itu memang dibuat untuk
  registry Kliping.
:::

---

## Isinya Apa Saja

Skill ini membekali asisten AI Anda dengan pengetahuan berikut:

### Konteks Project

Di tiap interaksi, skill menjalankan perintah `info --json` milik CLI shadcn-vue untuk membaca konfigurasi project Anda: framework, versi Tailwind, alias, base library (`reka`), library ikon, komponen yang terpasang, dan path berkas yang sudah diselesaikan.

### Perintah CLI

Referensi perintah CLI shadcn-vue: `init`, `add`, `search`, `view`, `docs`, `diff`, `info`, dan `build`. CLI `kliping` punya perintah dengan nama yang sama — lihat [CLI](/cli) untuk perbedaannya.

### Tema dan Kustomisasi

Cara kerja CSS variable, warna OKLCH, mode gelap, warna kustom, radius sudut, dan varian komponen — lengkap dengan panduan untuk Tailwind v3 maupun v4.

### Membuat Registry

Cara membangun dan menerbitkan registry komponen sendiri: format `registry.json`, jenis item, objek berkas, dependency, CSS variable, proses build, hosting, dan konfigurasi penggunanya.

### Server MCP

Cara menyiapkan server MCP shadcn-vue beserta tool-nya, yang memungkinkan asisten AI mencari, menelusuri, dan memasang komponen dari registry. Untuk item Kliping, pakai server MCP `kliping` — lihat [Server MCP](/mcp).

---

## Cara Kerjanya

1. **Deteksi project** — skill aktif begitu menemukan berkas `components.json` di project Anda.
2. **Penyuntikan konteks** — skill menjalankan `info --json` milik CLI shadcn-vue untuk membaca konfigurasi project Anda, lalu menyisipkan hasilnya ke konteks asisten.
3. **Penegakan pola** — asisten mengikuti aturan komposisi yang berlaku: memakai `FieldGroup` untuk form, `ToggleGroup` untuk kumpulan pilihan, warna bermakna, dan API yang sesuai base-nya.
4. **Penelusuran komponen** — asisten memakai perintah `docs` dan `search`, atau tool MCP, untuk menemukan komponen beserta dokumentasinya sebelum menulis kode. Untuk item Kliping, arahkan ke `npx kliping@latest search <kata>` atau server MCP Kliping.

## Bacaan Lanjutan

- [CLI](/cli) — referensi lengkap perintah CLI `kliping`
- [Server MCP](/mcp) — menyambungkan server MCP untuk mengakses registry
- [Tema & Kustomisasi](/theming) — CSS variable dan penyesuaian tampilan
- [Registry](/registry/) — membangun dan menerbitkan registry sendiri
- [skills.sh](https://skills.sh) — mengenal skill untuk asisten AI
