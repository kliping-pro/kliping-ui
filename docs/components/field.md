---
title: Field
description: Menggabungkan label, kontrol, dan teks bantuan menjadi satu baris form yang mudah diakses.
component: true
---

<ComponentPreview name="FieldDemo" class="[&_.preview]:h-[800px] [&_.preview]:p-6 md:[&_.preview]:h-[850px]" />

## Installation

```bash
npx kliping@latest add field
```

## Usage

```vue:line-numbers
<script setup lang="ts">
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from '@/components/ui/field'
</script>

<template>
  <FieldSet>
    <FieldLegend>Profile</FieldLegend>
    <FieldDescription>This appears on invoices and emails.</FieldDescription>
    <FieldGroup>
      <Field>
        <FieldLabel for="name">
          Full name
        </FieldLabel>
        <Input id="name" autocomplete="off" placeholder="Evil Rabbit" />
        <FieldDescription>This appears on invoices and emails.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel for="username">
          Username
        </FieldLabel>
        <Input id="username" autocomplete="off" aria-invalid />
        <FieldError>Choose another username.</FieldError>
      </Field>
      <Field orientation="horizontal">
        <Switch id="newsletter" />
        <FieldLabel for="newsletter">
          Subscribe to the newsletter
        </FieldLabel>
      </Field>
    </FieldGroup>
  </FieldSet>
</template>
```

## Anatomy

Keluarga komponen `Field` dirancang untuk menyusun form yang mudah diakses. Susunan satu field pada umumnya seperti ini:

```vue:line-numbers
<template>
  <Field>
    <FieldLabel for="input-id">
      Label
    </FieldLabel>
    <!-- Input, Select, Switch, etc. -->
    <FieldDescription>Optional helper text.</FieldDescription>
    <FieldError>Validation message.</FieldError>
  </Field>
</template>
```

- `Field` adalah pembungkus inti untuk satu field.
- `FieldContent` adalah kolom flex yang menyatukan label dan keterangan. Tidak perlu dipakai kalau field Anda tanpa keterangan.
- Bungkus field-field yang berkaitan dengan `FieldGroup`, dan pakai `FieldSet` bersama `FieldLegend` untuk pengelompokan yang bermakna.

## Examples

### Input

<ComponentPreview name="FieldInputDemo" class="!mb-4 [&_.preview]:p-6" />

### Textarea

<ComponentPreview name="FieldTextareaDemo" class="!mb-4 [&_.preview]:p-6" />

### Select

<ComponentPreview name="FieldSelectDemo" class="!mb-4 [&_.preview]:p-6" />

### Slider

<ComponentPreview name="FieldSliderDemo" class="!mb-4 [&_.preview]:p-6" />

### Fieldset

<ComponentPreview name="FieldFieldsetDemo" class="!mb-4 [&_.preview]:p-6" />

### Checkbox

<ComponentPreview name="FieldCheckboxDemo" class="!mb-4 [&_.preview]:p-6" />

### Radio

<ComponentPreview name="FieldRadioDemo" class="!mb-4 [&_.preview]:p-6" />

### Switch

<ComponentPreview name="FieldSwitchDemo" class="!mb-4 [&_.preview]:p-6" />

### Kartu Pilihan

Bungkus komponen `Field` di dalam `FieldLabel` untuk membuat kelompok field yang bisa dipilih. Cara ini berlaku untuk komponen `RadioItem`, `Checkbox`, dan `Switch`.

<ComponentPreview name="FieldChoiceCardDemo" class="!mb-4 [&_.preview]:p-6" />

### Field Group

Tumpuk komponen `Field` memakai `FieldGroup`. Tambahkan `FieldSeparator` untuk memisahkannya.

<ComponentPreview name="FieldGroupDemo" class="!mb-4 [&_.preview]:p-6" />

## Tata Letak Responsif

Kalau Anda memakai Tailwind CSS v3, Anda perlu memasang [`@tailwindcss/container-queries`](https://github.com/tailwindlabs/tailwindcss-container-queries).

- **Field tegak:** orientasi bawaan menumpuk label, kontrol, dan teks bantuan — cocok untuk tata letak yang mengutamakan mobile.
- **Field mendatar:** isi `orientation="horizontal"` pada `Field` agar label dan kontrolnya bersebelahan. Padukan dengan `FieldContent` supaya keterangannya tetap sejajar.
- **Field responsif:** isi `orientation="responsive"` agar susunan kolomnya menyesuaikan otomatis di dalam induk yang sadar ukuran container. Pakai class `@container/field-group` pada `FieldGroup` untuk berganti orientasi di breakpoint tertentu.

<ComponentPreview name="FieldResponsiveDemo" class="!mb-4 [&_.preview]:h-[650px] [&_.preview]:p-6 [&_.preview]:md:h-[500px] [&_.preview]:md:p-10" />

## Validasi dan Pesan Error

- Tambahkan `data-invalid` pada `Field` untuk mengubah seluruh blok menjadi keadaan error.
- Tambahkan `aria-invalid` pada input-nya sendiri demi teknologi bantu.
- Tempatkan `FieldError` tepat setelah kontrolnya, atau di dalam `FieldContent`, supaya pesan error tetap sejajar dengan field-nya.

```vue:line-numbers
<template>
  <Field data-invalid>
    <FieldLabel for="email">
      Email
    </FieldLabel>
    <Input id="email" type="email" aria-invalid />
    <FieldError>Enter a valid email address.</FieldError>
  </Field>
</template>
```

## Accessibility

  - `FieldSet` dan `FieldLegend` menjaga kontrol yang berkaitan tetap satu kelompok bagi pengguna keyboard dan teknologi bantu.
  - `Field` menghasilkan `role="group"`, sehingga kontrol di dalamnya mewarisi pelabelan dari `FieldLabel` dan `FieldLegend`.
  - Pakai `FieldSeparator` seperlunya saja, supaya batas antar bagian tetap jelas terbaca pembaca layar.

<!--@include: ./_api/field.md#requirements-->

<!--@include: ./_api/field.md#anatomy-->

## API Reference

### FieldSet

Wadah yang menghasilkan `fieldset` bermakna, lengkap dengan pengaturan jarak bawaan.

<!--@include: ./_api/field.md#FieldSet-->

```vue
<template>
  <FieldSet>
    <FieldLegend>Delivery</FieldLegend>
    <FieldGroup>
      <!-- Fields -->
    </FieldGroup>
  </FieldSet>
</template>
```

### FieldLegend

Elemen legend untuk sebuah `FieldSet`. Ganti ke varian `label` agar ukurannya selaras dengan label.

<!--@include: ./_api/field.md#FieldLegend-->

```vue
<FieldLegend variant="label">
Notification Preferences
</FieldLegend>
```

`FieldLegend` punya dua varian: `legend` dan `label`. Varian `label` memakai ukuran dan perataan seperti label — berguna kalau `FieldSet` Anda bersarang.

### FieldGroup

Pembungkus tata letak yang menumpuk komponen `Field` dan mengaktifkan container query untuk orientasi responsif.

<!--@include: ./_api/field.md#FieldGroup-->

```vue
<template>
  <FieldGroup class="@container/field-group flex flex-col gap-6">
    <Field><!-- Fields --></Field>
    <Field><!-- Fields --></Field>
  </FieldGroup>
</template>
```

### Field

Pembungkus inti untuk satu field. Mengatur orientasi, style keadaan tidak valid, dan jarak antar elemen.

<!--@include: ./_api/field.md#Field-->

```vue
<Field orientation="horizontal">
  <FieldLabel for="remember">Remember me</FieldLabel>
  <Switch id="remember" />
</Field>
```

### FieldContent

Kolom flex yang menyatukan kontrol dan keterangannya saat label berada di samping kontrol. Tidak perlu dipakai kalau field Anda tanpa keterangan.

<!--@include: ./_api/field.md#FieldContent-->

```vue
<Field>
  <Checkbox id="notifications" />
  <FieldContent>
    <FieldLabel for="notifications">Notifications</FieldLabel>
    <FieldDescription>Email, SMS, and push options.</FieldDescription>
  </FieldContent>
</Field>
```

### FieldLabel

Label yang style-nya cocok baik untuk input langsung maupun `Field` yang bersarang di dalamnya.

<!--@include: ./_api/field.md#FieldLabel-->

```vue
<FieldLabel for="email">
Email
</FieldLabel>
```

### FieldTitle

Menampilkan judul bergaya label di dalam `FieldContent`.

<!--@include: ./_api/field.md#FieldTitle-->

```vue
<FieldContent>
  <FieldTitle>Enable Touch ID</FieldTitle>
  <FieldDescription>Unlock your device faster.</FieldDescription>
</FieldContent>
```

### FieldDescription

Slot teks bantuan yang otomatis menyeimbangkan baris panjang pada tata letak mendatar.

<!--@include: ./_api/field.md#FieldDescription-->

```vue
<FieldDescription>
We never share your email with anyone.
</FieldDescription>
```

### FieldSeparator

Pembatas visual antar bagian di dalam `FieldGroup`. Bisa diisi konten sebaris kalau perlu.

<!--@include: ./_api/field.md#FieldSeparator-->

```vue
<FieldSeparator>
Or continue with
</FieldSeparator>
```

### FieldError

Wadah pesan error yang mudah diakses. Bisa diisi langsung, atau menerima array `errors` — misalnya dari `vee-validate`.

<!--@include: ./_api/field.md#FieldError-->

```vue
<FieldError :errors="errors.username" />
```

Kalau array `errors` memuat lebih dari satu pesan, komponen ini otomatis menampilkannya sebagai daftar.

`FieldError` juga menerima issue dari validator mana pun yang menerapkan [Standard Schema](https://standardschema.dev/), termasuk Zod, Valibot, dan ArkType. Teruskan array `issues` dari hasil validasi skema untuk menampilkan daftar error yang seragam lintas library.

<!--@include: ./_api/field.md#css-variables-->

<!--@include: ./_api/field.md#credits-->
