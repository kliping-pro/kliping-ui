---
title: Native Select
description: Elemen select bawaan HTML yang di-style agar menyatu dengan design system Anda.
component: true
---

::: tip 
Kalau Anda butuh select yang di-style penuh, lihat komponen [Select](/components/select).
:::

<ComponentPreview name="NativeSelectDemo" />

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

```bash
npx kliping@latest add native-select
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

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-pro/kliping-ui/tree/main/src/components/ui/native-select) ke project Anda.

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
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from '@/components/ui/native-select'
</script>

<template>
  <NativeSelect>
    <NativeSelectOption value="">
      Select a fruit
    </NativeSelectOption>
    <NativeSelectOption value="apple">
      Apple
    </NativeSelectOption>
    <NativeSelectOption value="banana">
      Banana
    </NativeSelectOption>
    <NativeSelectOption value="blueberry">
      Blueberry
    </NativeSelectOption>
    <NativeSelectOption value="grapes" disabled>
      Grapes
    </NativeSelectOption>
    <NativeSelectOption value="pineapple">
      Pineapple
    </NativeSelectOption>
  </NativeSelect>
</template>
```

## Examples

### Dengan Grup

Kelompokkan pilihan memakai `NativeSelectOptGroup` agar lebih tertata.

<ComponentPreview name="NativeSelectGroupsDemo" />

```vue:line-numbers
<template>
  <NativeSelect>
    <NativeSelectOption value="">
      Select a food
    </NativeSelectOption>
    <NativeSelectOptGroup label="Fruits">
      <NativeSelectOption value="apple">
        Apple
      </NativeSelectOption>
      <NativeSelectOption value="banana">
        Banana
      </NativeSelectOption>
      <NativeSelectOption value="blueberry">
        Blueberry
      </NativeSelectOption>
    </NativeSelectOptGroup>
    <NativeSelectOptGroup label="Vegetables">
      <NativeSelectOption value="carrot">
        Carrot
      </NativeSelectOption>
      <NativeSelectOption value="broccoli">
        Broccoli
      </NativeSelectOption>
      <NativeSelectOption value="spinach">
        Spinach
      </NativeSelectOption>
    </NativeSelectOptGroup>
  </NativeSelect>
</template>
```

### Keadaan Nonaktif

Nonaktifkan satu pilihan tertentu, atau seluruh komponen select sekaligus.

<ComponentPreview name="NativeSelectDisabledDemo" />

### Keadaan Tidak Valid

Tampilkan kesalahan validasi lewat atribut `aria-invalid` beserta style error-nya.

<ComponentPreview name="NativeSelectInvalidDemo" />

```vue:line-numbers
<template>
  <NativeSelect aria-invalid="true">
    <NativeSelectOption value="">
      Select a country
    </NativeSelectOption>
    <NativeSelectOption value="us">
      United States
    </NativeSelectOption>
    <NativeSelectOption value="uk">
      United Kingdom
    </NativeSelectOption>
    <NativeSelectOption value="ca">
      Canada
    </NativeSelectOption>
  </NativeSelect>
</template>
```

### Integrasi dengan Form

Bisa dipakai bersama library form seperti VeeValidate untuk komponen yang dikendalikan dari luar.

<ComponentPreview name="NativeSelectFormDemo" />

<!-- ### Input Group Integration

Padukan dengan `InputGroup` untuk susunan input yang lebih rumit.

<ComponentPreview name="NativeSelectInputGroupDemo" />

-->

## Native Select dibanding Select

- Pakai `NativeSelect` kalau Anda butuh perilaku asli browser, performa lebih ringan, atau dropdown yang nyaman di mobile.
- Pakai `Select` kalau Anda butuh style kustom, animasi, atau interaksi yang lebih rumit.

Komponen `NativeSelect` menyediakan fungsi select bawaan HTML dengan tampilan yang selaras dengan design system Anda.

## Accessibility

- Komponen ini mempertahankan seluruh fitur aksesibilitas select bawaan HTML.
- Pembaca layar bisa menelusuri pilihan memakai tombol panah.
- Ikon panahnya ditandai `aria-hidden="true"` supaya tidak dibacakan dua kali.
- Pakai `aria-label` atau `aria-labelledby` kalau butuh konteks tambahan.

```vue:line-numbers
<template>
  <NativeSelect aria-label="Choose your preferred language">
    <NativeSelectOption value="en">
      English
    </NativeSelectOption>
    <NativeSelectOption value="es">
      Spanish
    </NativeSelectOption>
    <NativeSelectOption value="fr">
      French
    </NativeSelectOption>
  </NativeSelect>
</template>
```

<!--@include: ./_api/native-select.md#requirements-->

<!--@include: ./_api/native-select.md#anatomy-->

## API Reference

### NativeSelect

Komponen select utama yang membungkus elemen select bawaan HTML.

<!--@include: ./_api/native-select.md#NativeSelect-->

Semua prop lain diteruskan ke elemen `<select>` di baliknya.

```vue
<NativeSelect>
  <NativeSelectOption value="option1">Option 1</NativeSelectOption>
  <NativeSelectOption value="option2">Option 2</NativeSelectOption>
</NativeSelect>
```

### NativeSelectOption

Mewakili satu pilihan di dalam select.

<!--@include: ./_api/native-select.md#NativeSelectOption-->

Semua prop lain diteruskan ke elemen `<option>` di baliknya.

```vue
<template>
  <NativeSelectOption value="apple">
    Apple
  </NativeSelectOption>
  <NativeSelectOption value="banana" disabled>
    Banana
  </NativeSelectOption>
</template>
```

### NativeSelectOptGroup

Mengelompokkan pilihan-pilihan yang berkaitan agar lebih tertata.

<!--@include: ./_api/native-select.md#NativeSelectOptGroup-->

Semua prop lain diteruskan ke elemen `<optgroup>` di baliknya.

```vue
<template>
  <NativeSelectOptGroup label="Fruits">
    <NativeSelectOption value="apple">
      Apple
    </NativeSelectOption>
    <NativeSelectOption value="banana">
      Banana
    </NativeSelectOption>
  </NativeSelectOptGroup>
</template>
```

<!--@include: ./_api/native-select.md#css-variables-->

<!--@include: ./_api/native-select.md#credits-->
