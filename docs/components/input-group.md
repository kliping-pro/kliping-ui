---
title: Input Group
description: Menyisipkan informasi atau aksi tambahan ke dalam input maupun textarea.
component: true
---

<ComponentPreview name="InputGroupDemo" class="[&_.preview]:p-4" />

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

```bash
npx kliping@latest add input-group
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

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-pro/kliping-ui/tree/main/src/components/ui/input-group) ke project Anda.

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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group'
</script>

<template>
  <InputGroup>
    <InputGroupInput placeholder="Search..." />
    <InputGroupAddon>
      <SearchIcon />
    </InputGroupAddon>
    <InputGroupAddon align="inline-end">
      <InputGroupButton>Search</InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
</template>
```

## Examples

### Icon

<ComponentPreview name="InputGroupWithIcon" class="[&_.preview]:p-4" />

### Text

Menampilkan keterangan teks tambahan di samping input.

<ComponentPreview name="InputGroupWithText" class="[&_.preview]:p-4" />

### Button

Menambahkan tombol untuk menjalankan aksi di dalam input group.

<ComponentPreview name="InputGroupWithButton" class="[&_.preview]:p-4" />

### Tooltip

Menambahkan tooltip untuk memberi konteks atau bantuan tambahan.

<ComponentPreview name="InputGroupWithTooltip" class="[&_.preview]:p-4" />

### Textarea

Input group juga bisa dipakai bersama textarea. Untuk perataannya, gunakan `block-start` atau `block-end`.

<ComponentPreview name="InputGroupWithTextarea" class="[&_.preview]:p-4" />

### Spinner

Menampilkan indikator pemuatan selagi input diproses.

<ComponentPreview name="InputGroupWithSpinner" class="[&_.preview]:p-4" />

### Label

Menambahkan label di dalam input group agar lebih mudah diakses.

<ComponentPreview name="InputGroupWithLabel" class="[&_.preview]:p-4" />

### Dropdown

Memadukan input group dengan dropdown menu untuk interaksi yang lebih rumit.

<ComponentPreview name="InputGroupWithDropdown" class="[&_.preview]:p-4" />

### Button Group

Membungkus input group dengan button group untuk membuat awalan dan akhiran.

<ComponentPreview name="InputGroupWithButtonGroup" class="[&_.preview]:p-4" />

### Input Kustom

Tambahkan atribut `data-slot="input-group-control"` pada input kustom Anda agar perilaku dan state focus-nya ditangani otomatis.

Tidak ada style bawaan yang diterapkan ke input kustom. Style-nya Anda atur sendiri lewat prop `class`.

<ComponentPreview name="InputGroupWithCustomInput" class="!mb-4 [&_.preview]:p-4" />

```vue:line-numbers
<script setup lang="ts">
import { InputGroup, InputGroupAddon, InputGroupButton } from '@/components/ui/input-group'
</script>

<template>
  <div class="grid w-full max-w-sm gap-6">
    <InputGroup>
      <textarea
        data-slot="input-group-control"
        class="flex field-sizing-content min-h-16 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
        placeholder="Autoresize textarea..."
      />
      <InputGroupAddon align="block-end">
        <InputGroupButton class="ml-auto" size="sm" variant="default">
          Submit
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  </div>
</template>
```

<!--@include: ./_api/input-group.md#requirements-->

<!--@include: ./_api/input-group.md#anatomy-->

## API Reference

### InputGroup

Komponen utama yang membungkus input dan addon.

<!--@include: ./_api/input-group.md#InputGroup-->

```vue
<InputGroup>
  <InputGroupInput />
  <InputGroupAddon />
</InputGroup>
```

### InputGroupAddon

Menampilkan ikon, teks, tombol, atau konten lain di samping input.

::: tip Focus Navigation
Agar navigasi focus berjalan benar, komponen `InputGroupAddon` sebaiknya diletakkan
setelah input. Posisinya diatur lewat prop `align`.
:::

<!--@include: ./_api/input-group.md#InputGroupAddon-->

```vue
<InputGroupAddon align="inline-end">
  <SearchIcon />
</InputGroupAddon>
```

**Untuk `<InputGroupInput />`, pakai perataan `inline-start` atau `inline-end`. Untuk `<InputGroupTextarea />`, pakai `block-start` atau `block-end`.**

Satu `InputGroupAddon` bisa memuat beberapa `InputGroupButton` sekaligus beserta ikon.

```vue
<InputGroupAddon>
  <InputGroupButton>Button</InputGroupButton>
  <InputGroupButton>Button</InputGroupButton>
</InputGroupAddon>
```

### InputGroupButton

Menampilkan tombol di dalam input group.

<!--@include: ./_api/input-group.md#InputGroupButton-->

```vue
<InputGroupButton>
Button
</InputGroupButton>

<InputGroupButton size="icon-xs" aria-label="Copy">
  <CopyIcon />
</InputGroupButton>
```

### InputGroupInput

Pengganti `<Input />` saat membangun input group. Style input group-nya sudah diterapkan, dan komponen ini memakai `data-slot="input-group-control"` yang seragam untuk menangani state focus.

<!--@include: ./_api/input-group.md#InputGroupInput-->

Semua prop lain diteruskan ke komponen `<Input />` di baliknya.

```vue
<InputGroup>
  <InputGroupInput placeholder="Enter text..." />
  <InputGroupAddon>
    <SearchIcon />
  </InputGroupAddon>
</InputGroup>
```

### InputGroupTextarea

Pengganti `<Textarea />` saat membangun input group. Style-nya sudah diterapkan, dan komponen ini memakai `data-slot="input-group-control"` yang seragam untuk menangani state focus.

<!--@include: ./_api/input-group.md#InputGroupTextarea-->

Semua prop lain diteruskan ke komponen `<Textarea />` di baliknya.

```vue
<InputGroup>
  <InputGroupTextarea placeholder="Enter message..." />
  <InputGroupAddon align="block-end">
    <InputGroupButton>Send</InputGroupButton>
  </InputGroupAddon>
</InputGroup>
```

### InputGroupText

<!--@include: ./_api/input-group.md#InputGroupText-->

<!--@include: ./_api/input-group.md#css-variables-->

<!--@include: ./_api/input-group.md#credits-->
