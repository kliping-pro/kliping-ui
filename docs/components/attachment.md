---
title: Attachment
description: Menampilkan lampiran berupa berkas atau gambar, lengkap dengan media, metadata, status unggah, dan aksinya.
component: true
---

<ComponentPreview name="AttachmentDemo" previewClass="h-auto theme-blue bg-surface dark:bg-background" />

Komponen `Attachment` menampilkan lampiran berupa berkas atau gambar beserta media, nama, dan metadatanya, ditambah aksi dan status unggah kalau diperlukan. Cocok untuk berkas dan gambar di kolom penulisan chat, utas pesan, dan daftar unggahan.

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

```bash
npx kliping@latest add attachment
```

</TabItem>

<TabItem value="manual" label="Manual">

<Steps>

<div class="kliping-step">

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-pro/kliping-ui/tree/main/src/components/ui/attachment) ke project Anda.

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
import { FileTextIcon, XIcon } from '@lucide/vue'
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from '@/components/ui/attachment'
</script>

<template>
  <Attachment>
    <AttachmentMedia>
      <FileTextIcon />
    </AttachmentMedia>
    <AttachmentContent>
      <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
      <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
    </AttachmentContent>
    <AttachmentActions>
      <AttachmentAction aria-label="Remove sales-dashboard.pdf">
        <XIcon />
      </AttachmentAction>
    </AttachmentActions>
  </Attachment>
</template>
```

## Composition

Susunan berikut adalah cara membangun sebuah attachment:

```text
Attachment
├── AttachmentMedia
├── AttachmentContent
│   ├── AttachmentTitle
│   └── AttachmentDescription
├── AttachmentActions
│   └── AttachmentAction
└── AttachmentTrigger
```

Pakai `AttachmentGroup` untuk menata beberapa lampiran dalam satu baris yang bisa digulir:

```text
AttachmentGroup
├── Attachment
└── Attachment
```

## Features

- Media berupa ikon maupun gambar lewat `AttachmentMedia`.
- Status unggah `idle`, `uploading`, `processing`, `error`, dan `done`, lengkap dengan style bawaan dan efek shimmer selagi berjalan.
- Tiga pilihan ukuran, dengan orientasi mendatar atau tegak.
- `AttachmentTrigger` seluas kartu yang membuka tautan atau dialog, tanpa mengganggu tombol aksi yang tetap bisa diklik sendiri.
- `AttachmentGroup` yang bisa digulir dengan efek snap dan pudar di tepinya.
- Style tiap bagian bisa disesuaikan lewat atribut `class` Vue.

## Examples

### Image

Isi `variant="image"` pada `AttachmentMedia` lalu taruh `<img>` di dalamnya. Pakai `orientation="vertical"` kalau medianya ingin ditumpuk di atas konten.

<ComponentPreview name="AttachmentImageDemo" previewClass="h-auto theme-blue bg-surface dark:bg-background" />

### Status

Isi `state` sesuai tahapan unggahnya. `uploading` dan `processing` membuat judulnya berkilat, sedangkan `error` mengubah tampilannya jadi bernuansa peringatan.

<ComponentPreview name="AttachmentStatesDemo" previewClass="h-auto theme-blue bg-surface dark:bg-background" />

### Ukuran

Pakai `size` untuk berpindah antara `default`, `sm`, dan `xs`.

<ComponentPreview name="AttachmentSizesDemo" previewClass="h-auto theme-blue bg-surface dark:bg-background" />

### Grup

Bungkus beberapa lampiran dengan `AttachmentGroup` untuk menatanya dalam satu baris mendatar yang bisa digulir, dengan efek snap dan pudar di tepinya.

<ComponentPreview name="AttachmentGroupDemo" previewClass="h-auto theme-blue bg-surface dark:bg-background" />

### Trigger

Tambahkan `AttachmentTrigger` supaya seluruh kartu bisa membuka tautan atau dialog. Ia mengisi kartu di belakang tombol aksi, jadi tombolnya tetap bisa diklik.

<ComponentPreview name="AttachmentTriggerDemo" previewClass="h-auto theme-blue bg-surface dark:bg-background" />

```vue:line-numbers
<template>
  <Dialog>
    <Attachment>
      <!-- media, content, actions -->
      <DialogTrigger as-child>
        <AttachmentTrigger aria-label="Preview research-summary.pdf" />
      </DialogTrigger>
    </Attachment>
    <DialogContent>
      <!-- ... -->
    </DialogContent>
  </Dialog>
</template>
```

## Accessibility

`AttachmentAction` menghasilkan `Button`, sedangkan `AttachmentTrigger` menghasilkan `<button>` sungguhan (atau elemen Anda sendiri lewat `as-child`). Ikuti panduan di bawah agar keduanya bisa dioperasikan dan dibacakan dengan benar.

### Beri label pada aksi yang hanya berupa ikon

`AttachmentAction` biasanya hanya berupa ikon, jadi berilah masing-masing `aria-label` yang menjelaskan aksinya dan sasarannya.

```vue:line-numbers
<template>
  <AttachmentAction aria-label="Remove sales-dashboard.pdf">
    <XIcon />
  </AttachmentAction>
</template>
```

### Beri label pada trigger

`AttachmentTrigger` menutupi seluruh kartu tanpa teks sendiri, jadi berilah `aria-label` yang menjelaskan apa yang terjadi saat ia diaktifkan.

```vue:line-numbers
<template>
  <AttachmentTrigger as-child>
    <a
      :href="url"
      target="_blank"
      rel="noreferrer"
      aria-label="Open workspace.png"
    />
  </AttachmentTrigger>
</template>
```

Trigger-nya berada di belakang tombol aksi dalam urutan tumpukan, jadi `AttachmentAction` dan `AttachmentTrigger` tidak saling menghalangi — keduanya tetap bisa di-focus dan diklik secara terpisah.

### Menggulir lewat keyboard

`AttachmentGroup` bergulir mendatar. Kalau lampirannya interaktif — punya trigger atau tombol aksi — pengguna keyboard bisa menjangkau item di luar layar lewat tombol Tab. Untuk deretan lampiran yang hanya bersifat tampilan, buat grupnya sendiri bisa di-focus dan digulir dengan menambahkan `tabindex="0"`, `role="group"`, dan `aria-label`.

### Makna yang tidak bergantung warna

Status `error` memakai warna peringatan. Cantumkan alasan kegagalannya di `AttachmentDescription` supaya maknanya tidak bergantung pada warna semata.

<!--@include: ./_api/attachment.md#requirements-->

<!--@include: ./_api/attachment.md#anatomy-->

## API Reference

### Attachment

Wadah terluar attachment.

<!--@include: ./_api/attachment.md#Attachment-->

### AttachmentMedia

Slot media untuk ikon atau pratinjau gambar.

<!--@include: ./_api/attachment.md#AttachmentMedia-->

### AttachmentContent

Membungkus judul dan keterangan.

<!--@include: ./_api/attachment.md#AttachmentContent-->

### AttachmentTitle

Nama lampirannya. Berkilat selagi statusnya `uploading` atau `processing`.

<!--@include: ./_api/attachment.md#AttachmentTitle-->

### AttachmentDescription

Metadata tambahan seperti tipe berkas, ukuran, atau status unggah.

<!--@include: ./_api/attachment.md#AttachmentDescription-->

### AttachmentActions

Wadah untuk satu atau beberapa aksi, diratakan ke sisi akhir lampiran.

<!--@include: ./_api/attachment.md#AttachmentActions-->

### AttachmentAction

Tombol aksi. Menghasilkan [`Button`](/components/button) dan menerima atribut Vue yang diteruskan, misalnya `aria-label`.

<!--@include: ./_api/attachment.md#AttachmentAction-->

### AttachmentTrigger

Lapisan seluas kartu yang mengaktifkan lampiran. Menghasilkan `<button>` secara bawaan dan menerima atribut Vue yang diteruskan, misalnya `aria-label`.

<!--@include: ./_api/attachment.md#AttachmentTrigger-->

### AttachmentGroup

Menata lampiran dalam satu baris mendatar yang bisa digulir dengan efek snap.

<!--@include: ./_api/attachment.md#AttachmentGroup-->

<!--@include: ./_api/attachment.md#css-variables-->
