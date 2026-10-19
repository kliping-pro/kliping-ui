---
title: Dot Pattern
description: Latar pola titik, bisa dengan titik yang berdenyut.
component: true
---

<ComponentPreview name="DotPatternDemo" />

## Installation

```bash
npx kliping@latest add dot-pattern
```

## Usage

Mengisi wadahnya (`absolute inset-0`). Warna titik mengikuti `fill` — timpa dengan kelas `fill-*`. `glow` membuat titik berdenyut bergantian.

```vue
<script setup lang="ts">
import { DotPattern } from '@/components/ui/dot-pattern'
</script>

<template>
  <div class="relative h-72 overflow-hidden">
    <DotPattern glow class="mask-[radial-gradient(300px_circle_at_center,white,transparent)]" />
  </div>
</template>
```

<!--@include: ./_api/dot-pattern.md-->
