---
title: useDeepCompareEffect
description: "Bereaksi pada perubahan isi objek, bukan penggantian referensinya."
---

<ComponentPreview name="UseDeepCompareEffectDemo" code="none" />

<NativeClassCallout equivalent="watch(src, cb, { deep: true })" />

Sudah bawaan Vue:

```ts
watch(filter, reload, { deep: true })
```

`deep: true` menelusuri seluruh isi objeknya, jadi mengubah satu properti di dalam
sudah cukup untuk memicunya.

**Tapi seringkali ada yang lebih murah.** Penelusuran dalam berjalan di setiap
pemeriksaan, dan untuk objek besar itu terasa. Kalau yang benar-benar Anda pedulikan
cuma beberapa properti, pantau getter-nya saja:

```ts
watch(() => [filter.type, filter.order], reload)
```

Lebih murah, dan maksudnya lebih terbaca. Lihat
[`useCustomCompareEffect`](/hooks/use-custom-compare-effect).
