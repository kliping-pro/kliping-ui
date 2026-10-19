---
title: Marker
description: Menampilkan status sebaris, catatan sistem, baris berbingkai, atau pemisah berlabel di dalam percakapan.
component: true 
---

<ComponentPreview name="MarkerDemo" previewClass="h-auto theme-blue" />

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

```bash
npx kliping@latest add marker
```

</TabItem>

<TabItem value="manual" label="Manual">

<Steps>

<div class="kliping-step">

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-pro/kliping-ui/tree/main/src/components/ui/marker) ke project Anda.

</div>

<div class="kliping-step">

Sesuaikan path import dengan struktur project Anda.

</div>

</Steps>

</TabItem>

</Tabs>

## Usage

```vue:line-numbers
<script setup lang="ts">
import { Marker, MarkerContent, MarkerIcon, } from '@/components/ui/marker'
</script>

<template>
  <Marker>
    <MarkerIcon>
      <CheckIcon />
    </MarkerIcon>
    <MarkerContent>Explored 4 files</MarkerContent>
  </Marker>
</template>
```

## Composition

Susunan berikut adalah cara membangun sebuah marker:

```text
Marker
├── MarkerIcon
└── MarkerContent
```

## Features

- Tersedia varian marker sebaris, baris bergaris tepi, dan pemisah berlabel.
- Slot ikon dekoratif yang disembunyikan dari teknologi bantu.
- Elemen akar polimorfik lewat `render`, untuk marker berupa tautan dan tombol.
- Bisa dipadukan dengan utility [`shimmer`](/utilities/shimmer) untuk teks status yang mengalir.
- Style tiap bagian bisa disesuaikan lewat prop `class`.

## Examples

### Varian

Pakai `variant` untuk berpindah antara marker sebaris, baris bergaris tepi, dan pemisah berlabel.

<ComponentPreview name="MarkerVariantsDemo" previewClass="h-auto theme-blue" />

| Variant     | Description                                          |
| ----------- | ---------------------------------------------------- |
| `default`   | An inline marker for status, notes, and actions.     |
| `border`    | A default marker with a bottom border under the row. |
| `separator` | A centered label with divider lines on each side.    |

### Status

Isi `role="status"` dan sertakan [`Spinner`](/components/spinner) pada marker yang sedang berjalan, supaya pembaruannya ikut dibacakan.

<ComponentPreview name="MarkerStatusDemo" previewClass="h-auto theme-blue" />

### Shimmer

Tambahkan utility class [`shimmer`](/utilities/shimmer) pada `MarkerContent` untuk efek teks mengalir. Cara pemasangannya ada di dokumentasi shimmer.

<ComponentPreview name="MarkerShimmerDemo" previewClass="h-auto theme-blue" />

### Separator

Pakai varian `separator` untuk pembatas berlabel di dalam percakapan, misalnya tanggal atau jeda antar bagian.

<ComponentPreview name="MarkerSeparatorDemo" previewClass="h-auto theme-blue" />

### Garis Tepi

Pakai varian `border` untuk baris status yang tetap mengikuti perataan marker bawaan sekaligus memisahkan baris berikutnya.

<ComponentPreview name="MarkerBorderDemo" previewClass="h-auto theme-blue" />

### Dengan Ikon

Pakai `MarkerIcon` untuk menampilkan ikon di samping konten. Pakai `flex-col` kalau ikonnya ingin ditumpuk di atas konten.

<ComponentPreview name="MarkerIconDemo" previewClass="h-auto theme-blue" />

### Tautan dan Tombol

Ubah marker menjadi tautan atau tombol lewat prop `render` pada `Marker`.

<ComponentPreview name="MarkerLinkButtonDemo" previewClass="h-auto theme-blue" />

```tsx:line-numbers
import { Marker, MarkerContent } from "@/components/ui/marker"

<template>
  <Marker as-child>
    <a href="#links-and-buttons">
      <MarkerIcon>
        <GitBranchIcon />
      </MarkerIcon>
      <MarkerContent>View the pull request</MarkerContent>
    </a>
  </Marker>
</template>
```

## Accessibility

`Marker` bersifat presentasional secara bawaan. Makna yang tepat bergantung pada cara Anda memakainya, jadi pilih role sesuai maksudnya, bukan mengandalkan satu nilai bawaan.

### Status dan Progres

Untuk marker yang sedang berjalan seperti "Sedang berpikir..." atau tool yang aktif, isi `role="status"` supaya teknologi bantu membacakan pembaruannya begitu muncul. `Marker` meneruskan `role` ke elemen di baliknya.

```tsx:line-numbers
<Marker role="status">
  <MarkerIcon>
    <Spinner />
  </MarkerIcon>
  <MarkerContent>Compacting conversation</MarkerContent>
</Marker>
```

### Pemisah Berlabel

Pemisah yang memuat teks — misalnya tanggal atau label bagian — tidak butuh role. Garis pembatasnya hanya pseudo-element CSS yang dekoratif, dan teksnya dibacakan sebagai konten biasa.

```tsx:line-numbers
<Marker variant="separator">
  <MarkerContent>Today</MarkerContent>
</Marker>
```

::: tip 
**Catatan:** jangan menambahkan `role="separator"` pada pembatas berlabel. Sebuah separator
mengambil nama aksesibelnya dari `aria-label`, bukan dari teksnya, dan isinya
dianggap presentasional — sehingga label yang terlihat justru tidak akan
dibacakan. Simpan `role="separator"` untuk pembatas yang memang tanpa teks bermakna.
:::

### Marker Bergaris Tepi

Marker bergaris tepi punya makna yang sama dengan marker biasa. Garis bawahnya dekoratif, jadi pilih `role="status"`, `render`, atau tanpa role sama sekali, sesuai tujuan markernya.

```tsx:line-numbers
<Marker variant="border">
  <MarkerIcon>
    <FileTextIcon />
  </MarkerIcon>
  <MarkerContent>Opened implementation notes</MarkerContent>
</Marker>
```

### Ikon Dekoratif

`MarkerIcon` bersifat dekoratif dan disembunyikan dari teknologi bantu lewat `aria-hidden`, jadi maknanya dipegang `MarkerContent` di sebelahnya. Untuk marker yang hanya berisi ikon, berilah `aria-label` atau teks yang terlihat supaya tidak terbaca kosong.

```tsx:line-numbers
<Marker aria-label="Synced">
  <MarkerIcon>
    <CheckIcon />
  </MarkerIcon>
</Marker>
```

### Marker yang Interaktif

Kalau marker berfungsi sebagai tautan atau pemicu aksi, tampilkan sebagai `<button>` atau `<a>` sungguhan lewat prop `render`, supaya bisa di-focus dan punya role yang benar. Nama aksesibelnya diambil dari teks marker.

```tsx:line-numbers
<Marker as-child>
  <a href="/files" >
    <MarkerIcon>
      <FileTextIcon />
    </MarkerIcon>
    <MarkerContent>Explored 4 files</MarkerContent>
  </a>
</Marker>
```

<!--@include: ./_api/marker.md#requirements-->

<!--@include: ./_api/marker.md#anatomy-->

## API Reference

### Marker

Elemen akar marker. Berkasnya juga mengekspor `markerVariants` supaya style marker bisa Anda pakai ulang di komponen sendiri.

<!--@include: ./_api/marker.md#Marker-->

### MarkerIcon

Slot ikon dekoratif. Disembunyikan dari teknologi bantu lewat `aria-hidden`.

<!--@include: ./_api/marker.md#MarkerIcon-->

### MarkerContent

Isi teks marker.

<!--@include: ./_api/marker.md#MarkerContent-->

<!--@include: ./_api/marker.md#css-variables-->
