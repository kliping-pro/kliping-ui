---
title: useQuery
description: "Padanan Vue-nya sudah ada dan resmi: @tanstack/vue-query."
---

<NativeClassCallout equivalent="@tanstack/vue-query" />

Cache, revalidasi, dedupe permintaan, dan status `pending`/`error` untuk
pengambilan data. Registry ini tidak mengirim apa pun untuk itu, karena TanStack
sudah merawat adapter Vue-nya sendiri.

```bash
npm i @tanstack/vue-query
```

```ts
import { useQuery } from '@tanstack/vue-query'

const { data, isPending, error } = useQuery({
  queryKey: ['produk'],
  queryFn: () => fetch('/api/produk').then(r => r.json()),
})
```

Yang dikembalikan sudah berupa `ref`, jadi langsung bisa dipakai di template
tanpa pembungkus apa pun.

`queryKey` juga boleh berisi `ref` — begitu nilainya berubah, permintaannya
dijalankan ulang sendiri:

```ts
const halaman = ref(1)

const { data } = useQuery({
  queryKey: ['produk', halaman],
  queryFn: () => fetch(`/api/produk?hal=${halaman.value}`).then(r => r.json()),
})
```

Menyalin ulang pembungkusnya ke sini cuma menambah satu lapisan yang harus
dijaga tetap sejalan dengan paket aslinya — dan yang akan tertinggal versi tiap
kali paketnya naik.
