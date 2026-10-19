---
title: useCreation
description: "Objek yang dibuat sekali. Di Vue itu perilaku bawaan setup()."
---

<ComponentPreview name="UseCreationDemo" code="none" />

<NativeClassCallout equivalent="nilai biasa, atau computed()" />

Tidak ada render kedua yang membuat isi `setup()` lahir lagi. Objek mahal cukup
dibuat sebagai nilai biasa:

```ts
const pengurai = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' })
```

Dibuat sekali, dipakai selamanya — tanpa pembungkus, tanpa daftar dependensi.

Yang butuh perhitungan ulang saat sumbernya berubah adalah hal berbeda, dan itu
`computed()`:

```ts
const terformat = computed(() => pengurai.format(price.value))
```

Bedanya sederhana: nilai biasa untuk yang **tetap**, `computed()` untuk yang
**mengikuti**.
