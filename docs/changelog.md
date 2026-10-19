---
title: Changelog
description: Pembaruan dan pengumuman terbaru dari Kliping.
---

## 18 Oktober 2026 — CLI kliping 0.1.0 terbit

Kliping kini punya CLI sendiri, terbit di npm sebagai [`kliping`](https://www.npmjs.com/package/kliping).
Semua item Kliping — komponen, block, varian, grafik, dan hook — dipasang dengan satu CLI yang
sama:

```bash
npx kliping@latest init
```

```bash
npx kliping@latest add button hero-01 use-boolean
```

Yang baru:

- **`init` menyiapkan project sendiri.** Di project Vite (TypeScript maupun JavaScript) atau
  Nuxt 3/4 yang sudah ada, `init` memasang Tailwind CSS v4 dan alias import `@` kalau belum
  ada — tidak ada lagi langkah manual. Lalu ia memasang dasar Kliping (helper `cn()` beserta
  dependensinya dan token tema) dan menulis `components.json`.
- **Project baru dari folder kosong.** Jalankan `init` di folder kosong, dan CLI membuat project
  Vite + TypeScript atau Nuxt 4 dari template yang ada di dalamnya — tanpa mengunduh dari
  repository pihak ketiga.
- **Nama polos langsung ke registry Kliping.** `add button`, `add hero-01`, `add button-01`,
  `add chart-area-axes`, `add use-boolean`; bentuk `@kliping/<nama>` dan URL juga jalan.
- **`diff`** menunjukkan apa yang berubah antara item terpasang dan versinya di registry.
- **Deskripsi registry berbahasa Inggris**, supaya keluaran CLI, server MCP, dan editor Anda
  terbaca sama di mana pun.

CLI-nya butuh Node.js 22.12 atau lebih baru. Panduan lengkapnya ada di halaman [CLI](/cli),
langkah per framework di [Installation](/installation).

## Agustus 2026 — Kliping lahir

Kliping resmi berdiri sebagai fork dari [shadcn-vue](https://github.com/unovue/shadcn-vue) v2.8.2
(commit `3f048df`).

Yang berubah di rilis pertama ini:

- **Identitas project.** Nama, lisensi, README, konfigurasi deploy, dan seluruh branding
  situs berpindah ke Kliping. Atribusi ke shadcn-vue dan shadcn/ui tetap tercantum.
- **Dokumentasi Bahasa Indonesia.** Halaman-halaman inti ditulis ulang dari nol — bukan
  hasil terjemahan mesin. Dokumentasi per komponen menyusul bertahap.

Yang **belum** berubah, dan sengaja begitu:

- **Komponen primitif.** Semua komponen masih identik dengan shadcn-vue v2.8.2. Kliping
  tidak mengubah primitif tanpa alasan kuat — itu bagian dari janji stabilitas.
- **CLI.** Kliping masih memakai CLI `shadcn-vue`, termasuk registry bawaannya. Belum ada
  paket npm terpisah bernama Kliping.

::: tip Riwayat sebelum fork
Semua yang tercatat di bawah ini adalah pekerjaan tim [shadcn-vue](https://github.com/unovue/shadcn-vue),
  bukan Kliping. Kami mencantumkannya supaya Anda tahu fitur apa saja yang sudah ada di
  fondasi yang kami warisi. Untuk catatan rilis aslinya yang lengkap, lihat
  [changelog shadcn-vue](https://www.shadcn-vue.com/docs/changelog).
:::

## Warisan dari shadcn-vue

### Typeset

Satu file CSS yang menata seluruh hasil render markdown. Bungkus keluarannya dalam container
`typeset`, dan semua yang di dalamnya — heading, paragraf, list, tabel, kode, blockquote,
rumus matematika — ikut tertata. Yang di luar container tidak tersentuh.

Ritmenya diatur lewat tiga kendali saja: **size**, **leading**, dan **flow**. Ukuran heading,
indentasi list, jarak di bawah heading, semuanya diturunkan dari ketiganya.

```css
.typeset-docs {
  --typeset-font-body: var(--font-geist-sans);
  --typeset-font-heading: var(--font-geist-sans);
  --typeset-font-mono: var(--font-geist-mono);
  --typeset-size: 15px;
  --typeset-leading: 1.75;
  --typeset-flow: 1.25em;
}
```

Ukurannya menyesuaikan container, jadi konten yang sama mengecil di dalam bubble chat dan
membesar di dalam artikel. Warnanya mengikuti token tema Anda.

Buka [builder typeset](/typeset) untuk memilih font dan ritme, melihat pratinjaunya pada
konten sungguhan, lalu menyalin CSS-nya. Detail lengkapnya ada di [dokumentasi Typeset](/typeset).

### Questionnaire

Komponen untuk mengajukan serangkaian pertanyaan, satu per satu: pilihan tunggal, pilihan
ganda, isian bebas, dan pertanyaan yang boleh dilewati. Navigasi, pencatatan jawaban,
validasi, dan indikator progres sudah ditangani otomatis.

```bash
npx kliping@latest add questionnaire
```

Lihat [dokumentasi Questionnaire](/components/questionnaire).

### Komponen untuk antarmuka chat

Sekumpulan komponen yang dirancang untuk membangun antarmuka percakapan:

| Komponen | Kegunaan |
| --- | --- |
| [Message](/components/message) | Satu gelembung pesan beserta bagian-bagiannya. |
| [Message Scroller](/components/message-scroller) | Area gulir yang menempel di bawah saat pesan baru masuk. |
| [Bubble](/components/bubble) | Gelembung percakapan yang lebih ringkas. |
| [Attachment](/components/attachment) | Tampilan lampiran file di dalam percakapan. |
| [Marker](/components/marker) | Penanda di dalam aliran pesan. |

Ditambah dua utilitas: [scroll-fade](/utilities/scroll-fade) dan
[shimmer](/utilities/shimmer).

### Komponen tata letak & form

| Komponen | Kegunaan |
| --- | --- |
| [Spinner](/components/spinner) | Indikator memuat. |
| [Kbd](/components/kbd) | Menampilkan tombol keyboard. |
| [Button Group](/components/button-group) | Mengelompokkan beberapa tombol jadi satu kesatuan. |
| [Input Group](/components/input-group) | Menggabungkan input dengan tombol, ikon, atau teks. |
| [Field](/components/field) | Kerangka satu baris form: label, kontrol, deskripsi, pesan error. |
| [Item](/components/item) | Baris konten serbaguna dengan media, teks, dan aksi. |
| [Empty](/components/empty) | Tampilan saat belum ada data. |

### Perubahan di balik layar

- **Drawer** kini dibangun di atas Reka UI.
- **Data Table** kini memakai TanStack Table v9.
- **Chart** menerima sejumlah perbaikan.
- **Rhea** ditambahkan sebagai varian style baru.
- Seluruh primitif berpindah ke **Reka UI**.
