---
title: useCustomCompareEffect
description: "Bereaksi hanya pada bagian yang Anda pedulikan."
---

<ComponentPreview name="UseCustomCompareEffectDemo" code="none" />

<NativeClassCallout equivalent="watch(() => key(src), cb)" />

Di Vue tidak perlu pembanding: pantau **getter** yang mengembalikan nilai yang
ingin dibandingkan. Yang dipantau jadi nilai turunannya, bukan objeknya.

```ts
// Hanya bereaksi saat id-nya berganti, walau objeknya baru tiap kali
watch(() => user.value.id, reload)

// Beberapa kunci sekaligus
watch(() => [filter.type, filter.order], reload)

// Bahkan hasil perhitungan
watch(() => items.value.length, onCountChange)
```

Ini lebih murah daripada `deep: true`, dan maksudnya lebih terbaca: yang tertulis
di getter itulah yang dipedulikan, tidak lebih.
