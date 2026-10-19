---
title: Switch
description: Kontrol yang memungkinkan pengguna berpindah antara aktif dan tidak aktif.
component: true
links:
  doc: https://reka-ui.com/docs/components/switch
  api: https://reka-ui.com/docs/components/switch#api-reference
---

<ComponentPreview name="SwitchDemo" />


## Installation

<Tabs>

<TabItem value="cli" label="CLI">

```bash
npx kliping@latest add switch
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

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-pro/kliping-ui/tree/main/src/components/ui/switch) ke project Anda.

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
import { Switch } from '@/components/ui/switch'
</script>

<template>
  <Switch />
</template>
```

<!--@include: ./_api/switch.md-->
