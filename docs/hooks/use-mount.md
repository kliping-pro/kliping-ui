---
title: useMount
description: "Menjalankan sesuatu setelah komponennya terpasang."
---

<ComponentPreview name="UseMountDemo" code="none" />

<NativeClassCallout equivalent="onMounted()" />

Sudah bawaan Vue:

```ts
import { onMounted } from 'vue'

onMounted(() => {
  measureWidth()
})
```

Berjalan sekali, setelah elemennya benar-benar ada di dokumen — jadi aman untuk
mengukur, memasang pengamat, atau menyentuh apa pun milik peramban.

**Sekaligus penjaga SSR.** `onMounted` tidak pernah berjalan saat halaman dirender
di server, jadi tidak perlu penjagaan tambahan.

Di luar komponen — misalnya di dalam composable yang dipanggil dari `effectScope()` —
`onMounted` tidak punya komponen untuk disangkutkan. Untuk itu Kliping memakai
[`tryOnMounted`](/hooks/try-on-mounted), yang bekerja di kedua tempat.
