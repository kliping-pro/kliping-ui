---
title: useUpdate
description: "Memaksa gambar ulang. Di Vue hampir tidak pernah dibutuhkan."
---

<ComponentPreview name="UseUpdateDemo" code="none" />

<NativeClassCallout equivalent="ubah ref-nya; triggerRef() untuk shallowRef" />

Vue menggambar ulang karena datanya berubah, bukan karena disuruh. Kalau tampilan
tidak ikut berubah, yang salah hampir selalu bukan ketiadaan pemicu — melainkan
datanya memang tidak reaktif.

```ts
const count = ref(0)
count.value += 1   // tampilannya ikut, tanpa diminta
```

Satu-satunya kasus yang butuh dorongan adalah `shallowRef` yang isinya diutak-atik
di tempat. Reaktivitasnya sengaja dangkal, jadi perubahan di dalamnya memang tidak
terlihat:

```ts
const items = shallowRef([1, 2, 3])

items.value.push(4)   // tidak terlihat
triggerRef(items)     // baru terlihat
```

Kalau Anda sering memanggil `triggerRef`, biasanya `shallowRef`-nya yang salah
pilih — `ref` biasa akan bekerja sendiri.
