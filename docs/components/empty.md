---
title: Empty
description: Menampilkan keadaan saat belum ada data yang bisa ditampilkan.
component: true
---

<ComponentPreview name="EmptyDemo" class="[&_.preview]:p-0" />

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

```bash
npx kliping@latest add empty
```

</TabItem>

<TabItem value="manual" label="Manual">

<Steps>

<div class="kliping-step">

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-pro/kliping-ui/tree/main/src/components/ui/empty) ke project Anda.

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
import { FolderOpen } from '@lucide/vue'
import { Button } from '@/registry/default/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/registry/default/ui/empty'
</script>

<template>
  <Empty>
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <FolderOpen />
      </EmptyMedia>
    </EmptyHeader>
    <EmptyTitle>No data</EmptyTitle>
    <EmptyDescription>No data found</EmptyDescription>
    <EmptyContent>
      <Button>Add data</Button>
    </EmptyContent>
  </Empty>
</template>
```

## Examples

### Outline

Pakai utility class `border` untuk membuat empty state bergaris tepi.

<ComponentPreview name="EmptyOutlineDemo" class="[&_.preview]:p-6 md:[&_.preview]:p-10" />

### Latar

Pakai utility `bg-*` dan `bg-gradient-*` untuk memberi latar pada empty state.

<ComponentPreview name="EmptyBackgroundDemo" class="[&_.preview]:p-0" />

### Avatar

Pakai komponen `EmptyMedia` untuk menampilkan avatar di dalam empty state.

<ComponentPreview name="EmptyAvatarDemo" class="[&_.preview]:p-0" />

### Grup Avatar

Pakai komponen `EmptyMedia` untuk menampilkan sekelompok avatar di dalam empty state.

<ComponentPreview name="EmptyAvatarGroupDemo" class="[&_.preview]:p-0" />

### InputGroup

Anda bisa menyisipkan komponen `InputGroup` ke dalam `EmptyContent`.

<ComponentPreview name="EmptyInputGroupDemo" class="[&_.preview]:p-0" />

<!--@include: ./_api/empty.md#requirements-->

<!--@include: ./_api/empty.md#anatomy-->

## API Reference

### Empty

Komponen utama empty state. Membungkus komponen `EmptyHeader` dan `EmptyContent`.

<!--@include: ./_api/empty.md#Empty-->

```vue
<template>
  <Empty>
    <EmptyHeader />
    <EmptyContent />
  </Empty>
</template>
```

### EmptyHeader

Komponen `EmptyHeader` membungkus media, judul, dan keterangan empty state.

<!--@include: ./_api/empty.md#EmptyHeader-->

```vue
<template>
  <EmptyHeader>
    <EmptyMedia />
    <EmptyTitle />
    <EmptyDescription />
  </EmptyHeader>
</template>
```

### EmptyMedia

Pakai komponen `EmptyMedia` untuk menampilkan media empty state, misalnya ikon atau gambar. Komponen lain seperti avatar juga bisa diletakkan di sini.

<!--@include: ./_api/empty.md#EmptyMedia-->

```vue
<template>
  <EmptyMedia variant="icon">
    <Icon />
  </EmptyMedia>
</template>
```

```vue
<template>
  <EmptyMedia>
    <Avatar>
      <AvatarImage src="..." />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  </EmptyMedia>
</template>
```

### EmptyTitle

Pakai komponen `EmptyTitle` untuk menampilkan judul empty state.

<!--@include: ./_api/empty.md#EmptyTitle-->

```vue
<template>
  <EmptyTitle>No data</EmptyTitle>
</template>
```

### EmptyDescription

Pakai komponen `EmptyDescription` untuk menampilkan keterangan empty state.

<!--@include: ./_api/empty.md#EmptyDescription-->

```vue
<template>
  <EmptyDescription>You do not have any notifications.</EmptyDescription>
</template>
```

### EmptyContent

Pakai komponen `EmptyContent` untuk menampilkan isi empty state, misalnya tombol, input, atau tautan.

<!--@include: ./_api/empty.md#EmptyContent-->

```vue
<template>
  <EmptyContent>
    <Button>Add Project</Button>
  </EmptyContent>
</template>
```

<!--@include: ./_api/empty.md#css-variables-->

<!--@include: ./_api/empty.md#credits-->
