---
title: Logos
description: Kumpulan logo contoh untuk block dan pratinjau.
component: true
---

<ComponentPreview name="LogosDemo" />

## Installation

```bash
npx kliping@latest add logos
```

## Usage

Delapan logo SVG fiktif yang dipakai bersama block logo-cloud, team, dan testimonials — ganti dengan logo Anda sendiri. Warnanya `currentColor`, jadi ikut warna teks induknya; semuanya `aria-hidden`, jadi beri nama perusahaan sebagai teks di dekatnya bila logonya bermakna.

```vue
<script setup lang="ts">
import { Logo01, Logo02 } from '@/components/ui/logos'
</script>

<template>
  <Logo01 class="h-8 text-muted-foreground" />
</template>
```

<!--@include: ./_api/logos.md-->
