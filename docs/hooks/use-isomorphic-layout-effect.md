---
title: useIsomorphicLayoutEffect
description: "Efek yang aman saat dirender di server. Di Vue tidak ada yang perlu dipilih."
---

<ComponentPreview name="UseIsomorphicLayoutEffectDemo" code="none" />

<NativeClassCallout equivalent="onMounted()" />

`onMounted` tidak pernah berjalan di server, jadi tidak ada dua jalur yang harus
dipilih:

```ts
onMounted(() => {
  width.value = window.innerWidth   // aman
})
```

Yang perlu diperhatikan justru **hasil gambarnya**, bukan efeknya: nilai yang cuma
bisa diketahui di peramban harus punya nilai awal yang sama di server dan pada
gambaran pertama, kalau tidak Vue akan membuang bagian itu lalu menggambarnya ulang.

```ts
const width = ref<number | null>(null)   // null di server, null di gambar pertama
```

Untuk keperluan yang benar-benar harus berjalan **sebelum** peramban menggambar,
ada `flush: 'sync'` — tapi jarang benar-benar dibutuhkan:

```ts
watch(source, updatePosition, { flush: 'sync' })
```
