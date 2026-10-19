---
title: Progress
description: Menampilkan indikator kemajuan sebuah proses, biasanya berbentuk bilah progres.
component: true
links:
  doc: https://reka-ui.com/docs/components/progress
  api: https://reka-ui.com/docs/components/progress#api-reference
---

<ComponentPreview name="ProgressDemo" />


## Installation

<Tabs>

<TabItem value="cli" label="CLI">

```bash
npx kliping@latest add progress
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

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-pro/kliping-ui/tree/main/src/components/ui/progress) ke project Anda.

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
import { Progress } from '@/components/ui/progress'
</script>

<template>
  <Progress :model-value="33" />
</template>
```

<!--@include: ./_api/progress.md-->
