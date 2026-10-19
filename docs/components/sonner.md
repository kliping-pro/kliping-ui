---
title: Sonner
description: Komponen notifikasi toast untuk Vue dengan pilihan desain yang sudah ditentukan.
component: true
links:
  doc: https://vue-sonner.vercel.app/
---

<ComponentPreview name="SonnerDemo" />


## Installation

<Tabs>

<TabItem value="cli" label="CLI">

```bash
npx kliping@latest add sonner
```

</TabItem>

<TabItem value="manual" label="Manual">

<Steps>

<div class="kliping-step">

Pasang dependensi berikut:

```bash
npm install vue-sonner
```

</div>

<div class="kliping-step">

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-pro/kliping-ui/tree/main/src/components/ui/sonner) ke project Anda.

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
import { toast } from 'vue-sonner'
import { Button } from '@/components/ui/button'
</script>

<template>
  <Button @click="() => toast('My first toast')">
    Give me a toast
  </Button>
</template>
```

## Installation

Komponen `<Toaster />` beserta CSS-nya wajib ada supaya toast bisa tampil. Pasang keduanya di layout paling luar aplikasi Anda.

```vue:line-numbers
<script setup lang="ts">
import 'vue-sonner/style.css'
import { Toaster } from '@/components/ui/sonner'
</script>

<template>
  <div>
    <main>
      <!-- Your app content -->
    </main>
    <Toaster />
  </div>
</template>
```

## Examples

### Tipe

<ComponentPreview name="SonnerTypesDemo" />


### Dengan Dialog

<ComponentPreview name="SonnerWithDialogDemo" />

<!--@include: ./_api/sonner.md-->
