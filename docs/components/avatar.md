---
title: Avatar
description: Elemen gambar dengan cadangan tampilan untuk mewakili pengguna.
component: true
links:
  doc: https://reka-ui.com/docs/components/avatar
  api: https://reka-ui.com/docs/components/avatar#api-reference
---

<ComponentPreview name="AvatarDemo" class="[&_.preview]:min-h-[200px]" />


## Installation

<Tabs>

<TabItem value="cli" label="CLI">

```bash
npx kliping@latest add avatar
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

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-pro/kliping-ui/tree/main/src/components/ui/avatar) ke project Anda.

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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
</script>

<template>
  <Avatar>
    <AvatarImage src="https://github.com/shadcn.png" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
</template>
```

<!--@include: ./_api/avatar.md-->
