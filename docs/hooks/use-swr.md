---
title: useSwr
description: "Padanan Vue-nya: swrv — tapi pertimbangkan @tanstack/vue-query lebih dulu."
---

<NativeClassCallout equivalent="swrv" />

Pola stale-while-revalidate: tampilkan data lama lebih dulu, ambil yang baru di
belakang, tukar begitu datang. Untuk Vue, paketnya bernama `swrv`.

```bash
npm i swrv
```

```ts
import useSWRV from 'swrv'

const { data, error, isValidating } = useSWRV(
  '/api/produk',
  url => fetch(url).then(r => r.json()),
)
```

## Pertimbangkan `@tanstack/vue-query` lebih dulu

Keduanya menyelesaikan masalah yang sama — cache, revalidasi, dedupe — tapi
[`@tanstack/vue-query`](/hooks/use-query) jauh lebih aktif dirawat, dan
dokumentasi Vue-nya jauh lebih lengkap.

`swrv` masuk akal kalau bentuk API SWR memang yang Anda inginkan, atau kalau
backend dan konvensi tim Anda sudah tersusun di sekitarnya. Di luar itu,
vue-query pilihan yang lebih aman untuk project baru.
