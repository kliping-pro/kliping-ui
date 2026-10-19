---
title: isBrowser
description: "Penjaga agar kode yang menyentuh window tidak ikut dijalankan di server."
---

<ComponentPreview name="IsBrowserDemo" code="none" />

Apakah kode ini sedang berjalan di peramban.

Dokumentasi Kliping dirender di server oleh VitePress. Satu sentuhan ke
`window` di tingkat modul membuat build gagal, bukan membuat halamannya
salah — jadi penjaganya harus berupa nilai yang bisa dibaca kapan saja,
termasuk saat modulnya baru dimuat.

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

<InstallCLI name="is-browser" />

Tanpa dependensi — tidak ada berkas lain yang ikut terpasang.

</TabItem>

<TabItem value="manual" label="Manual">

Salin kode berikut ke project Anda.

```ts [lib/is-browser.ts]
export const isBrowser = typeof window !== 'undefined'
```

</TabItem>

</Tabs>

<!--@include: ./_api/is-browser.md-->
