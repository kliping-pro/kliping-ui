---
title: useEffectWithTarget
description: "Menjalankan sesuatu terhadap elemen DOM yang boleh berganti."
---

<ComponentPreview name="UseEffectWithTargetDemo" code="none" />

<NativeClassCallout equivalent="lib/target + watch" />

Di Kliping ini turun jadi **helper**, bukan composable yang dipasang sendiri.
`toValue()` sudah menyelesaikan ref dan getter sekaligus, jadi yang tersisa cuma
satu hal: instance komponen yang menyimpan elemennya di `$el`.

```ts
import { getTargetElement } from '@/lib/target'

watch(
  () => getTargetElement(target),
  (element) => {
    if (!element) return
    // pasang di sini — dan lepas yang lama lebih dulu
  },
  { immediate: true, flush: 'post' },
)
```

Dua opsi di baris terakhir itu penting: `immediate` supaya target yang sudah ada
sejak awal tidak menunggu perubahan yang tidak akan datang, dan `flush: 'post'`
supaya template ref-nya sudah terisi saat gilirannya tiba.

[`getTargetElement`](/hooks/target) ikut terpasang otomatis bersama composable mana pun
yang membutuhkannya.
