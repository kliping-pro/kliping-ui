---
title: Carousel
description: Carousel dengan animasi dan gestur geser, dibangun memakai Embla.
component: true
---

<ComponentPreview name="CarouselDemo" />


## Installation

<Tabs>

<TabItem value="cli" label="CLI">

```bash
npx kliping@latest add carousel
```

</TabItem>

<TabItem value="manual" label="Manual">

<Steps>

<div class="kliping-step">

Pasang dependensi berikut:

```bash
npm install embla-carousel-vue
```

</div>

<div class="kliping-step">

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-pro/kliping-ui/tree/main/src/components/ui/carousel) ke project Anda.

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
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
</script>

<template>
  <Carousel>
    <CarouselContent>
      <CarouselItem>...</CarouselItem>
      <CarouselItem>...</CarouselItem>
      <CarouselItem>...</CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>
```

## Examples

### Ukuran

Untuk mengatur ukuran item, pakai utility class `basis` pada `<CarouselItem />`.

<ComponentPreview name="CarouselSize" />


```vue:line-numbers{5-7}
// 33% of the carousel width.
<template>
  <Carousel>
    <CarouselContent>
      <CarouselItem class="basis-1/3">
        ...
      </CarouselItem>
      <CarouselItem class="basis-1/3">
        ...
      </CarouselItem>
      <CarouselItem class="basis-1/3">
        ...
      </CarouselItem>
    </CarouselContent>
  </Carousel>
</template>
```

```vue:line-numbers{5-7}
// 50% on small screens and 33% on larger screens.
<template>
  <Carousel>
    <CarouselContent>
      <CarouselItem class="md:basis-1/2 lg:basis-1/3">
        ...
      </CarouselItem>
      <CarouselItem class="md:basis-1/2 lg:basis-1/3">
        ...
      </CarouselItem>
      <CarouselItem class="md:basis-1/2 lg:basis-1/3">
        ...
      </CarouselItem>
    </CarouselContent>
  </Carousel>
</template>
```

### Jarak Antar Item

Untuk mengatur jarak antar item, kami memakai utility `pl-[NILAI]` pada `<CarouselItem />` dan `-ml-[NILAI]` bernilai negatif pada `<CarouselContent />`.

::: tip 
**Kenapa begitu:** kami sempat mencoba properti `gap` atau layout `grid` pada
`<CarouselContent />`, tapi itu menuntut perhitungan dan pikiran ekstra untuk
mendapatkan jarak yang pas. Utility `pl-[NILAI]` dan `-ml-[NILAI]` ternyata
jauh lebih mudah dipakai.

Anda bebas mengubahnya di project sendiri kalau memang perlu.
:::

<ComponentPreview name="CarouselSpacing" />


```vue:line-numbers
<template>
  <Carousel>
    <CarouselContent class="-ml-4">
      <CarouselItem class="pl-4">
        ...
      </CarouselItem>
      <CarouselItem class="pl-4">
        ...
      </CarouselItem>
      <CarouselItem class="pl-4">
        ...
      </CarouselItem>
    </CarouselContent>
  </Carousel>
</template>
```

```vue:line-numbers
<template>
  <Carousel>
    <CarouselContent class="-ml-2 md:-ml-4">
      <CarouselItem class="pl-2 md:pl-4">
        ...
      </CarouselItem>
      <CarouselItem class="pl-2 md:pl-4">
        ...
      </CarouselItem>
      <CarouselItem class="pl-2 md:pl-4">
        ...
      </CarouselItem>
    </CarouselContent>
  </Carousel>
</template>
```

### Orientasi

Pakai prop `orientation` untuk menentukan arah carousel.

<ComponentPreview name="CarouselOrientation" />


```vue
<Carousel orientation="vertical | horizontal">
  ...
</Carousel>
```

## Opsi

Opsi bisa diteruskan ke carousel lewat prop `opts`. Keterangan lengkapnya ada di [dokumentasi Embla Carousel](https://www.embla-carousel.com/api/options/).

```vue:line-numbers{3-6}
<template>
  <Carousel
    :opts="{
      align: 'start',
      loop: true,
    }"
  >
    <CarouselContent>
      <CarouselItem>...</CarouselItem>
      <CarouselItem>...</CarouselItem>
      <CarouselItem>...</CarouselItem>
    </CarouselContent>
  </Carousel>
</template>
```

## API

### Cara 1

Pakai emit `@init-api` pada komponen `<Carousel />` untuk menangkap instance API-nya.

<ComponentPreview name="CarouselApi" />


### Cara 2

Bisa juga diakses lewat template ref pada komponen `<Carousel />`.

```vue:line-numbers{2,5,10}
<script setup lang="ts">
const carouselContainerRef = ref<InstanceType<typeof Carousel> | null>(null)

function accessApi() {
  carouselContainerRef.value?.carouselApi.on('select', () => {})
}
</script>

<template>
  <Carousel ref="carouselContainerRef">
    ...
  </Carousel>
</template>
```

## Event

Event bisa didengarkan lewat API. Untuk mendapatkan instance API-nya, pakai emit `@init-api` pada komponen `<Carousel />`.

```vue:line-numbers{5,7-9,25}
<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { useCarousel } from '@/components/ui/carousel'

const api = ref<CarouselApi>()

function setApi(val: CarouselApi) {
  api.value = val
}

const stop = watch(api, (api) => {
  if (!api)
    return

  // Watch only once or use watchOnce() in @vueuse/core
  nextTick(() => stop())

  api.on('select', () => {
    // Do something on select.
  })
})
</script>

<template>
  <Carousel @init-api="setApi">
    ...
  </Carousel>
</template>
```

Keterangan lengkap soal event ada di [dokumentasi Embla Carousel](https://www.embla-carousel.com/api/events/).

## Slot Props

Slot props yang reaktif seperti `carouselRef, canScrollNext..Prev, scrollNext..Prev` bisa Anda ambil lewat direktif `v-slot` pada `<Carousel v-slot="slotProps" />` untuk memperluas fungsinya.

```vue:line-numbers{2}
<template>
  <Carousel v-slot="{ canScrollNext, canScrollPrev }">
    ...
    <CarouselPrevious v-if="canScrollPrev" />
    <CarouselNext v-if="canScrollNext" />
  </Carousel>
</template>
```

## Plugins

Pakai prop `plugins` untuk menambahkan plugin ke carousel.

```bash
npm install embla-carousel-autoplay
```

```vue:line-numbers{2,8-10}
<script setup lang="ts">
import Autoplay from 'embla-carousel-autoplay'
</script>

<template>
  <Carousel
    class="w-full max-w-xs"
    :plugins="[Autoplay({
      delay: 2000,
    })]"
  >
    ...
  </Carousel>
</template>
```

<ComponentPreview name="CarouselPlugin" />


Keterangan lengkap soal plugin ada di [dokumentasi Embla Carousel](https://www.embla-carousel.com/api/plugins/).

<!--@include: ./_api/carousel.md-->
