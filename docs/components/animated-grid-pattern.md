---
title: Animated Grid Pattern
description: Latar pola kisi dengan kotak yang menyala dan meredup bergantian.
component: true
---

<ComponentPreview name="AnimatedGridPatternDemo" />

## Installation

```bash
npx kliping@latest add animated-grid-pattern
```

## Usage

Letakkan di dalam wadah `relative` dengan `overflow-hidden`; polanya mengisi wadah itu. Kotak yang menyala dipilih acak dan berganti tiap `duration` detik. Pakai `mask-*` untuk memudarkan tepinya, dan `skew-y-*` untuk kesan miring.

```vue
<script setup lang="ts">
import { AnimatedGridPattern } from '@/components/ui/animated-grid-pattern'
</script>

<template>
  <div class="relative h-72 overflow-hidden">
    <AnimatedGridPattern :num-squares="30" :max-opacity="0.1" />
  </div>
</template>
```

<!--@include: ./_api/animated-grid-pattern.md-->
