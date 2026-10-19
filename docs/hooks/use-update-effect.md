---
title: useUpdateEffect
description: "Efek yang melewatkan jalan pertamanya. Itu perilaku bawaan watch()."
---

<ComponentPreview name="UseUpdateEffectDemo" code="none" />

<NativeClassCallout equivalent="watch()" />

`watch` di Vue **memang** tidak berjalan saat pertama kali dipasang:

```ts
watch(query, (value, oldValue) => {
  search(value)   // hanya saat kueri benar-benar berubah
})
```

Ini bukan padanan yang mirip — ini perilaku bawaannya. Yang justru butuh
disebutkan adalah kebalikannya:

```ts
watch(query, search, { immediate: true })   // ikut jalan sekali di awal
```

`watch` juga memberi nilai lama dan barunya sekaligus, jadi membandingkan keduanya
tidak butuh penampung terpisah.
