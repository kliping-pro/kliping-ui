---
title: Label
description: Menampilkan label yang mudah diakses dan terhubung ke sebuah kontrol.
component: true
links:
  doc: https://reka-ui.com/docs/components/label
  api: https://reka-ui.com/docs/components/label#api-reference
---

<ComponentPreview name="LabelDemo" />


## Installation

<Tabs>

<TabItem value="cli" label="CLI">

```bash
npx kliping@latest add label
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

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-pro/kliping-ui/tree/main/src/components/ui/label) ke project Anda.

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
import { Label } from '@/components/ui/label'
</script>

<template>
  <Label for="email">Your email address</Label>
</template>
```

<!--@include: ./_api/label.md-->
