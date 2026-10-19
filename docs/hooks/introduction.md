---
title: Introduction
description: "37 composable Vue siap pasang, nol dependensi, dipasang lewat CLI kliping."
---

Kliping Hooks adalah kumpulan composable Vue yang dipasang lewat CLI `kliping`
yang sama dengan yang Anda pakai untuk komponen — `npx kliping@latest add use-boolean`. Berkasnya mendarat di
`@/composables/` dan jadi milik Anda sepenuhnya — bukan paket yang harus
di-`import`, bukan versi yang harus di-upgrade.

Semuanya ditulis dengan Composition API: `ref`, `computed`, `watch`,
`effectScope`. Tidak ada paket yang ikut terpasang, dan tidak ada lapisan
kompatibilitas apa pun di dalamnya.

## Tiga hal yang membedakannya

### Nol dependensi

Tidak ada satu pun composable di sini yang mengimpor paket luar — termasuk
VueUse. Kalau memasang `@kliping/use-mouse` memaksa Anda menambah satu paket,
Anda akan memakai paketnya langsung, dan registry ini kehilangan alasan
keberadaannya.

`useDebounceFn` dan `useThrottleFn` ditulis sendiri, masing-masing di bawah 90
baris, bukan membungkus pustaka utilitas. Seluruh 37 composable bersama-sama
69 KB gzip.

### Dibersihkan lewat scope, bukan lewat komponen

Setiap pendengar peristiwa, pengamat, dan timer dilepas di `onScopeDispose()` —
bukan `onUnmounted()`. Bedanya terasa saat sebuah composable dipanggil dari
composable lain, atau dari `effectScope()` lepas: di sana `onUnmounted` diam
saja, dan yang tersisa adalah kebocoran yang tidak pernah terlihat sampai
halamannya melambat tanpa sebab yang jelas.

Tiap composable yang memasang sesuatu punya uji yang membuktikan ia benar-benar
melepasnya.

### Argumennya menerima ref, getter, atau nilai biasa

`useDebounce(kata, 300)` bekerja apa adanya. Begitu juga `useDebounce(() =>
props.kata, 300)` dan `useDebounce(refKata, 300)`. Semuanya dibaca lewat
`toValue()`, jadi Anda tidak perlu mengingat bentuk mana yang diterima
composable yang mana — ketiganya selalu diterima.

Hal yang sama berlaku untuk target elemen: `useEventListener` menerima elemen,
`useTemplateRef()` ke elemen, `useTemplateRef()` ke komponen, atau getter yang
mengembalikan salah satunya.

## Lima belas pola yang tidak perlu dipasang

Sebagian pola yang di pustaka lain butuh composable tersendiri, di Vue sudah
dijawab bahasanya. `useMount` adalah `onMounted`. `useUnmount` adalah
`onUnmounted`. `useLatest` tidak menyelesaikan apa pun, karena `setup()` berjalan
sekali dan closure Anda tidak pernah memegang nilai basi. `useMemoizedFn` tidak
menyelesaikan apa pun, karena fungsi yang didefinisikan di `setup()` sudah stabil
selamanya.

Halamannya tetap ada — katalognya lengkap, satu pun tidak hilang — tapi isinya
menjelaskan padanan bawaannya, bukan perintah pemasangan. Yang mencari `useMount`
akan menemukannya di Siklus Hidup, lalu membaca di sana kenapa `onMounted` sudah
cukup.

## Apa yang ada di sini

| Kelompok | Jumlah | Isi |
|---|---|---|
| State | 7 | Menyimpan dan mengubah nilai |
| Lanjutan | 6 | Pola yang lebih jarang; tiga di antaranya sudah dijawab Vue |
| Siklus Hidup | 16 | Menjadwalkan, menunda, bereaksi pada perubahan |
| Peramban | 21 | Membaca dan mengikuti keadaan peramban |
| Pengembangan | 1 | Alat bantu saat mencari sebab |
| Paket Luar | 4 | Menunjuk padanan Vue-nya |
| Pustaka | 4 | Helper bersama, ikut terpasang sendiri |

**37 di antaranya benar-benar mengirim berkas.** Sisanya halaman penjelasan.

## Lisensi

MIT. Katalog dan bentuk API-nya berutang pada beberapa pustaka yang lebih dulu
ada; rantai atribusinya ada di [Credits](/credits).
