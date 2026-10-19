---
title: Badge
description: Menampilkan badge, atau komponen lain yang tampil seperti badge.
component: true
---

<ComponentPreview name="BadgeDemo" />


## Installation

<Tabs>

<TabItem value="cli" label="CLI">

```bash
npx kliping@latest add badge
```

</TabItem>

<TabItem value="manual" label="Manual">

<Steps>

<div class="kliping-step">

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-pro/kliping-ui/tree/main/src/components/ui/badge) ke project Anda.

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
import { Badge } from '@/components/ui/badge'
</script>

<template>
  <Badge variant="default | outline | secondary | destructive">
    Badge
  </Badge>
</template>
```

### Link

Pakai prop `as-child` untuk membuat komponen lain tampil seperti badge. Berikut contoh tautan yang tampil seperti badge.

```vue:line-numbers
<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
</script>

<template>
  <Badge as-child>
    <a href="#">Badge</a>
  </Badge>
</template>
```

<!--@include: ./_api/badge.md-->
