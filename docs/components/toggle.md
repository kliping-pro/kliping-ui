---
title: Toggle
description: Tombol dua keadaan yang bisa dinyalakan atau dimatikan.
component: true
links:
  doc: https://reka-ui.com/docs/components/toggle
  api: https://reka-ui.com/docs/components/toggle#api-reference
---

<ComponentPreview name="ToggleDemo" />


## Installation

<Tabs>

<TabItem value="cli" label="CLI">

```bash
npx kliping@latest add toggle
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

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-pro/kliping-ui/tree/main/src/components/ui/toggle) ke project Anda.

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
import { Toggle } from '@/components/ui/toggle'
</script>

<template>
  <Toggle>Toggle</Toggle>
</template>
```

## Examples

### Bawaan

<ComponentPreview name="ToggleDemo" />


### Outline

<ComponentPreview name="ToggleOutlineDemo" />


### Dengan Teks

<ComponentPreview name="ToggleTextDemo" />


### Kecil

<ComponentPreview name="ToggleSmallDemo" />


### Besar

<ComponentPreview name="ToggleLargeDemo" />


### Nonaktif

<ComponentPreview name="ToggleDisabledDemo" />

<!--@include: ./_api/toggle.md-->
