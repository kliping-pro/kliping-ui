---
title: Kbd
description: Menampilkan tombol keyboard yang ditekan pengguna.
component: true
---

<ComponentPreview name="KbdDemo" />

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

```bash
npx kliping@latest add kbd
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

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-pro/kliping-ui/tree/main/src/components/ui/kbd) ke project Anda.

</div>

<div class="kliping-step">

Sesuaikan path import dengan struktur project Anda.

</div>

</Steps>

</TabItem>

</Tabs>

## Usage

```vue
<script setup lang="ts">
import { Kbd } from '@/components/ui/kbd'
</script>

<template>
  <Kbd>Ctrl</Kbd>
</template>
```

## Examples

### Grup

Pakai komponen `KbdGroup` untuk mengelompokkan beberapa tombol keyboard.

<ComponentPreview name="KbdGroupDemo" />

### Button

Letakkan komponen `Kbd` di dalam `Button` untuk menampilkan tombol keyboard di dalam tombol.

<ComponentPreview name="KbdWithButton" />

### Tooltip

Letakkan komponen `Kbd` di dalam `Tooltip` untuk menampilkan tooltip yang memuat tombol keyboard.

<ComponentPreview name="KbdWithTooltip" />

### Input Group

Letakkan komponen `Kbd` di dalam `InputGroupAddon` untuk menampilkan tombol keyboard di dalam input group.

<ComponentPreview name="KbdWithInputGroup" />

<!--@include: ./_api/kbd.md#requirements-->

<!--@include: ./_api/kbd.md#anatomy-->

## API Reference

### Kbd

Pakai komponen `Kbd` untuk menampilkan satu tombol keyboard.

<!--@include: ./_api/kbd.md#Kbd-->

```vue
<Kbd>
Ctrl
</Kbd>
```

### KbdGroup

Pakai komponen `KbdGroup` untuk mengelompokkan beberapa komponen `Kbd`.

<!--@include: ./_api/kbd.md#KbdGroup-->

```vue
<KbdGroup>
  <Kbd>Ctrl</Kbd>
  <Kbd>B</Kbd>
</KbdGroup>
```

<!--@include: ./_api/kbd.md#css-variables-->

<!--@include: ./_api/kbd.md#credits-->
