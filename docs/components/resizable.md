---
title: Resizable
description: Kelompok panel yang bisa diubah ukurannya, mudah diakses, dan mendukung navigasi keyboard.
component: true
links:
  doc: https://reka-ui.com/docs/components/splitter
  api: https://reka-ui.com/docs/components/splitter#api-reference
---

<ComponentPreview name="ResizableDemo" />


## Installation

<Tabs>

<TabItem value="cli" label="CLI">

```bash
npx kliping@latest add resizable
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

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-pro/kliping-ui/tree/main/src/components/ui/resizable) ke project Anda.

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
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
</script>

<template>
  <ResizablePanelGroup direction="horizontal">
    <ResizablePanel>One</ResizablePanel>
    <ResizableHandle />
    <ResizablePanel>Two</ResizablePanel>
  </ResizablePanelGroup>
</template>
```

<!--@include: ./_api/resizable.md-->
