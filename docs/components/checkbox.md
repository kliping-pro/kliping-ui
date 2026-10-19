---
title: Checkbox
description: Kontrol yang memungkinkan pengguna berpindah antara tercentang dan tidak.
component: true
links:
  doc: https://reka-ui.com/docs/components/checkbox
  api: https://reka-ui.com/docs/components/checkbox#api-reference
---

<ComponentPreview name="CheckboxDemo" />


## Installation

<Tabs>

<TabItem value="cli" label="CLI">

```bash
npx kliping@latest add checkbox
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

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-pro/kliping-ui/tree/main/src/components/ui/checkbox) ke project Anda.

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
import { Checkbox } from '@/components/ui/checkbox'
</script>

<template>
  <Checkbox />
</template>
```

<!--@include: ./_api/checkbox.md-->
