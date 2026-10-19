---
title: useDeepCompareLayoutEffect
description: "Perubahan isi objek yang ditangani sebelum peramban menggambar."
---

<ComponentPreview name="UseDeepCompareLayoutEffectDemo" code="none" />

<NativeClassCallout equivalent="watch(src, cb, { deep: true, flush: 'sync' })" />

```ts
watch(box, updatePosition, { deep: true, flush: 'sync' })
```

`flush` menentukan **kapan** callback-nya berjalan, dan Vue punya tiga:

| `flush` | Kapan |
|---|---|
| `'pre'` | sebelum komponennya digambar ulang — bawaan |
| `'post'` | sesudah DOM-nya diperbarui — untuk mengukur |
| `'sync'` | seketika saat sumbernya berubah |

Pakai `'sync'` hanya kalau memang perlu. Pekerjaan sinkron di jalur ini menahan
pembaruan berikutnya, dan untuk sebagian besar penyesuaian tata letak, `'post'`
justru yang benar — di sana DOM-nya sudah ada dan bisa diukur.
