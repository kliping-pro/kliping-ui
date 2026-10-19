---
title: useThrottleEffect
description: "Efek yang dijatah paling sering sekali per jeda."
---

<ComponentPreview name="UseThrottleEffectDemo" code="none" />

<NativeClassCallout equivalent="watch + useThrottleFn" />

```ts
import { useThrottleFn } from '@/composables/use-throttle-fn'

const { run } = useThrottleFn(() => savePosition(scrollY.value), 200)
watch(scrollY, run)
```

Untuk nilai, bukan efek: [`useThrottle`](/hooks/use-throttle).

Bedanya dengan debounce sering tertukar, jadi disebutkan sekali lagi: **debounce
menunggu sampai berhenti, throttle tetap jalan tapi dijatah.** Untuk pengetikan
pakai debounce; untuk scroll dan gerakan penunjuk pakai throttle.
