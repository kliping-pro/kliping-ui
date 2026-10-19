---
title: Hover Card
description: Menampilkan pratinjau konten di balik sebuah tautan bagi pengguna yang melihat layar.
component: true
links:
  doc: https://reka-ui.com/docs/components/hover-card
  api: https://reka-ui.com/docs/components/hover-card#api-reference
---

<ComponentPreview name="HoverCardDemo" />


## Installation

<Tabs>

<TabItem value="cli" label="CLI">

```bash
npx kliping@latest add hover-card
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

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-pro/kliping-ui/tree/main/src/components/ui/hover-card) ke project Anda.

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
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
</script>

<template>
  <HoverCard>
    <HoverCardTrigger>Hover</HoverCardTrigger>
    <HoverCardContent>
      The Vue Framework – created and maintained by Evan You.
    </HoverCardContent>
  </HoverCard>
</template>
```

<!--@include: ./_api/hover-card.md-->
