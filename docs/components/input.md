---
title: Input
description: Menampilkan isian form, atau komponen lain yang tampil seperti isian form.
component: true
---

<ComponentPreview name="InputDemo" class="[&_input]:max-w-xs" />


## Installation

<Tabs>

<TabItem value="cli" label="CLI">

```bash
npx kliping@latest add input
```

</TabItem>

<TabItem value="manual" label="Manual">

<Steps>

<div class="kliping-step">

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-pro/kliping-ui/tree/main/src/components/ui/input) ke project Anda.

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
import { Input } from '@/components/ui/input'
</script>

<template>
  <Input />
</template>
```

## Examples

### Bawaan

<ComponentPreview name="InputDemo" class="[&_input]:max-w-xs" />


### Berkas

<ComponentPreview name="InputFile" />


### Nonaktif

<ComponentPreview name="InputDisabled" class="[&_input]:max-w-xs" />


### Dengan Label

<ComponentPreview name="InputWithLabel" />


### Dengan Tombol

<ComponentPreview name="InputWithButton" />

<!--@include: ./_api/input.md-->
