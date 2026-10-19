---
title: useEffectEvent
description: "Membaca nilai terbaru dari dalam efek tanpa memasang ulang efeknya."
---

<ComponentPreview name="UseEffectEventDemo" code="none" />

<NativeClassCallout equivalent="tidak perlu" />

Masalah yang dipecahkan hook ini berasal dari daftar dependensi — dan Vue tidak
punya daftar dependensi.

`watch` dan `watchEffect` melacak sendiri apa yang mereka baca, dan fungsi yang
ditulis di `setup()` selalu membaca nilai terbaru. Jadi membaca sesuatu dari dalam
efek tidak pernah memaksa efeknya dipasang ulang:

```ts
const delay = ref(1000)
const message = ref('hello')

// Intervalnya hanya dipasang ulang saat `delay` berubah.
// `message` dibaca apa adanya, dan tidak berpengaruh sama sekali.
useInterval(() => send(message.value), delay)
```

Kalau Anda memang ingin sesuatu **memicu** pemasangan ulang, cukup masukkan ke
sumber yang dipantau:

```ts
watch([delay, message], restart)
```

Yang dipantau ditentukan oleh apa yang Anda tulis di sumbernya, bukan oleh apa yang
kebetulan dibaca di dalam badannya.
