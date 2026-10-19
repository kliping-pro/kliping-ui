---
title: Border Beam
description: Sinar cahaya yang berjalan mengelilingi tepi sebuah elemen.
component: true
---

<ComponentPreview name="BorderBeamDemo" />

## Installation

```bash
npx kliping@latest add border-beam
```

## Usage

Taruh sebagai anak terakhir elemen yang ingin dikelilingi. Induknya harus `relative`, `overflow-hidden`, dan punya `rounded-*` — sinarnya mewarisi radius itu. Animasinya murni CSS (`offset-path`), tanpa JavaScript per frame.

```vue
<script setup lang="ts">
import { BorderBeam } from '@/components/ui/border-beam'
</script>

<template>
  <Card class="relative overflow-hidden">
    …
    <BorderBeam :duration="8" :size="100" />
  </Card>
</template>
```

<!--@include: ./_api/border-beam.md-->
