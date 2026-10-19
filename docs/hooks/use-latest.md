---
title: useLatest
description: "Nilai terbaru di dalam closure. Di Vue tidak perlu apa pun \u2014 setup() berjalan sekali."
---

<ComponentPreview name="UseLatestDemo" code="none" />

<NativeClassCallout equivalent="variabel biasa di setup()" />

`setup()` berjalan **sekali**. Variabel yang dideklarasikan di dalamnya lahir sekali
pula, dan fungsi apa pun yang menangkapnya akan selalu membaca nilai terbarunya —
tidak ada salinan basi yang perlu disegarkan.

```ts
const message = ref('hello')

// Dijadwalkan sekarang, dibaca nanti. Yang terbaca tetap nilai terbaru.
setTimeout(() => console.log(message.value), 1500)
```

Itu sebabnya `useEventListener` di Kliping memanggil handler-nya langsung, tanpa
penampung apa pun:

```ts
useEventListener('resize', () => recalculate(width.value))
```

Kalau yang Anda cari adalah **nilai sebelumnya**, itu hal yang berbeda dan memang
butuh composable: [`usePrevious`](/hooks/use-previous).
