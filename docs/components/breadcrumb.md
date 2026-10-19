---
title: Breadcrumb
description: Menampilkan jalur menuju halaman saat ini lewat susunan tautan berjenjang.
component: true
---

<ComponentPreview name="BreadcrumbDemo" class="[&_.preview]:p-2" />


## Installation

<Tabs>

<TabItem value="cli" label="CLI">

```bash
npx kliping@latest add breadcrumb
```

</TabItem>

<TabItem value="manual" label="Manual">

<Steps>

<div class="kliping-step">

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-pro/kliping-ui/tree/main/src/components/ui/breadcrumb) ke project Anda.

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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="/components">
          Components
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>
```

## Examples

### Pemisah Kustom

Sisipkan komponen Anda sendiri sebagai isi `<BreadcrumbSeparator />` untuk membuat pemisah kustom.

<ComponentPreview name="BreadcrumbCustomSeparatorDemo" />


```vue:line-numbers{2,12-14}
<script setup lang="ts">
import { SlashIcon } from '@lucide/vue'
// ...
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>
        <SlashIcon />
      </BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbLink href="/components">
          Components
        </BreadcrumbLink>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>
```

----

### Dropdown
Padukan `<BreadcrumbItem />` dengan `<DropdownMenu />` untuk membuat dropdown di dalam breadcrumb.

<ComponentPreview name="BreadcrumbDropdownDemo" />


```vue:line-numbers{2-7,13-22}
<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
//...
</script>

<template>
  <BreadcrumbItem>
    <DropdownMenu>
      <DropdownMenuTrigger>
        Components
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem>Documentation</DropdownMenuItem>
        <DropdownMenuItem>Themes</DropdownMenuItem>
        <DropdownMenuItem>GitHub</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </BreadcrumbItem>
</template>
```

----

### Terlipat

Tersedia komponen `<BreadcrumbEllipsis />` untuk menampilkan keadaan terlipat saat breadcrumb terlalu panjang.

<ComponentPreview name="BreadcrumbCollapsedDemo" />


```vue:line-numbers{2,11}
<script setup lang="ts">
import { BreadcrumbEllipsis } from "@/components/ui/breadcrumb"
//...
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <!-- ... -->
      <BreadcrumbItem>
        <BreadcrumbEllipsis />
      </BreadcrumbItem>
    <!-- ... -->
    </BreadcrumbList>
  </Breadcrumb>
</template>
```

----

### Komponen Link
Untuk memakai komponen link dari library routing Anda, gunakan prop `as-child` pada `<BreadcrumbLink />`.

<ComponentPreview name="BreadcrumbLinkDemo" />


```vue:line-numbers{2,10-12}
<script setup lang="ts">
import { NuxtLink } from '#components'
// ...
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink as-child>
          <NuxtLink to="/">
            Home
          </NuxtLink>
        </BreadcrumbLink>
      </BreadcrumbItem>
      {/* ... */}
    </BreadcrumbList>
  </Breadcrumb>
</template>
```

----

### Responsif
Berikut contoh breadcrumb responsif yang memadukan `<BreadcrumbItem />` dengan `<BreadcrumbEllipsis />`, `<DropdownMenu />`, dan `<Drawer />`.

Tampilannya berupa dropdown di desktop dan drawer di mobile.

<ComponentPreview name="BreadcrumbResponsiveDemo" />

<!--@include: ./_api/breadcrumb.md-->
