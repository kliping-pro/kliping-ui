---
title: Laravel
description: Memasang dan mengonfigurasi Kliping di project Laravel dengan Inertia.
---

<Steps>

### Buat project

Mulai dengan membuat project Laravel baru berisi Inertia dan Vue lewat installer Laravel:

```bash
laravel new my-app --vue
```

Starter kit Vue dari Laravel sudah berisi Tailwind CSS v4, alias `@` yang menunjuk
`resources/js`, dan `components.json`. Karena itu `kliping init` tidak perlu dijalankan — CLI
`kliping` langsung bisa memasang item dari registry Kliping ke project ini.

::: tip `init` belum menyiapkan Laravel otomatis
Kalau project Laravel Anda **tidak** dibuat dari starter kit di atas, `kliping init` tidak akan
  memasang Tailwind CSS dan alias `@` untuk Anda seperti di Vite atau Nuxt. Siapkan keduanya
  sendiri dulu — lihat [Manual Installation](/installation/manual) — lalu jalankan
  `npx kliping@latest init`.
:::

### Tambahkan komponen

Sekarang Anda bisa mulai menambahkan komponen ke project.

```bash
npx kliping@latest add switch
```

Perintah di atas menambahkan komponen `Switch` ke `resources/js/components/ui/switch`. Setelah itu, import seperti ini:

```vue:line-numbers{2,7} [resources/js/pages/index.vue]
<script setup lang="ts">
import { Switch } from '@/Components/ui/switch'
</script>

<template>
  <div>
    <Switch />
  </div>
</template>
```

</Steps>
