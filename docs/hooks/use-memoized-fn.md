---
title: useMemoizedFn
description: "Identitas fungsi yang stabil. Di Vue sudah begitu sejak awal."
---

<ComponentPreview name="UseMemoizedFnDemo" code="none" />

<NativeClassCallout equivalent="fungsi biasa" />

Fungsi yang dideklarasikan di `setup()` lahir sekali, dan identitasnya tidak pernah
berubah selama komponennya hidup.

```ts
const send = () => { /* … */ }
// `send` hari ini dan `send` sepuluh render lagi adalah objek yang sama persis
```

Artinya mengopernya sebagai prop ke komponen anak aman: anaknya tidak akan
menggambar ulang hanya karena identitas fungsinya berganti, karena memang tidak
pernah berganti.

Yang **memang** perlu dibungkus adalah nilai turunan yang mahal dihitung, dan
untuk itu ada `computed()`:

```ts
const total = computed(() => items.value.reduce((n, i) => n + i.harga, 0))
```
