---
title: Particles
description: Latar partikel yang melayang perlahan dan menjauhi kursor.
component: true
---

<ComponentPreview name="ParticlesDemo" />

## Installation

```bash
npx kliping@latest add particles
```

## Usage

Digambar di `<canvas>`, ukurannya mengikuti wadah. `color` berupa hex — untuk mode gelap, ganti nilainya dari state tema Anda. Makin besar `staticity`, makin sedikit partikel bereaksi pada kursor.

```vue
<script setup lang="ts">
import { Particles } from '@/components/ui/particles'
</script>

<template>
  <div class="relative h-72 overflow-hidden">
    <Particles class="absolute inset-0" color="#71717a" :quantity="120" />
  </div>
</template>
```

<!--@include: ./_api/particles.md-->
