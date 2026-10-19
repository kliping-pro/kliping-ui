---
title: Button
description: Menampilkan tombol, atau komponen lain yang tampil seperti tombol.
featured: true
component: true
---

<ComponentPreview name="ButtonDemo" />

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

```bash
npx kliping@latest add button
```

</TabItem>

<TabItem value="manual" label="Manual">

<Steps>

<div class="kliping-step">

Pasang dependensi berikut:

```bash
npm install reka-ui
```

</div>

<div class="kliping-step">

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-pro/kliping-ui/tree/main/src/components/ui/button) ke project Anda.

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
import { Button } from '@/components/ui/button'
</script>

<template>
  <Button variant="outline">
    Button
  </Button>
</template>
```

## Bentuk Kursor

Tailwind v4 [berganti](https://tailwindcss.com/docs/upgrade-guide#buttons-use-the-default-cursor) dari `cursor: pointer` ke `cursor: default` untuk komponen tombol.

Kalau Anda ingin mempertahankan perilaku `cursor: pointer`, tambahkan kode berikut ke file CSS Anda:

Perilaku ini juga bisa diaktifkan saat menyiapkan project lewat `npx kliping@latest init --pointer`.

```css:line-numbers [tailwind.css]
@layer base {
  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }
}
```

## Examples

### Ukuran

<ComponentPreview name="ButtonSize" class="mb-4" />

### Bawaan

<ComponentPreview name="ButtonDefault" class="mb-4" />

### Outline

<ComponentPreview name="ButtonOutline" class="mb-4" />

### Secondary

<ComponentPreview name="ButtonSecondary" class="mb-4" />

### Ghost

<ComponentPreview name="ButtonGhost" class="mb-4" />

### Destructive

<ComponentPreview name="ButtonDestructive" class="mb-4" />

### Link

<ComponentPreview name="ButtonLink" class="mb-4" />

### Icon

<ComponentPreview name="ButtonIcon" class="mb-4" />

```vue:line-numbers
<template>
  <Button variant="outline" size="icon" aria-label="Submit">
    <CircleFadingArrowUpIcon />
  </Button>
</template>
```

### Dengan Ikon

Jarak antara ikon dan teks menyesuaikan otomatis dengan ukuran tombol. Anda tidak perlu menambahkan margin pada ikonnya.

<ComponentPreview name="ButtonWithIcon" class="mb-4" />

### Sudut Membulat

Pakai class `rounded-full` untuk membuat tombol berbentuk bulat penuh.

<ComponentPreview name="ButtonRounded" class="mb-4" />

### Spinner

<ComponentPreview name="ButtonLoading" class="mb-4" />

### Button Group

<ComponentPreview name="ButtonGroupDemo" class="mb-4" />

Untuk membuat kelompok tombol, pakai komponen `ButtonGroup`. Keterangan lengkapnya ada di dokumentasi [Button Group](/components/button-group).

### Link (asChild)

Pakai prop `as-child` untuk membuat komponen lain tampil seperti tombol. Berikut contoh tautan yang tampil seperti tombol.

```vue:line-numbers
<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <Button as-child>
    <a href="/login">Login</a>
  </Button>
</template>
```

<!--@include: ./_api/button.md#requirements-->

## API Reference

### Button

Komponen `Button` adalah pembungkus elemen `button` yang menambahkan beragam style dan fungsi.

<!--@include: ./_api/button.md#Button-->

<!--@include: ./_api/button.md#css-variables-->

<!--@include: ./_api/button.md#credits-->
