---
title: getTargetElement
description: "Membaca elemen DOM dari ref, getter, elemen, atau instance komponen."
---

<ComponentPreview name="TargetDemo" code="none" />

Membaca sebuah elemen DOM dari bentuk apa pun yang wajar dikirim orang.

Targetnya boleh datang dalam empat bentuk: elemennya langsung, `ref` ke
elemen, `ref` ke instance komponen, atau getter yang mengembalikan salah
satunya.

`toValue()` sudah menyelesaikan ref dan getter sekaligus, jadi yang tersisa
untuk ditangani di sini cuma satu: instance komponen, yang menyimpan elemen
akarnya di `$el`. Menyerahkan `useTemplateRef()` yang menunjuk komponen — bukan
elemen — adalah kesalahan paling sering terjadi, dan tanpa penanganan ini
pendengarnya diam-diam terpasang di objek yang tidak punya `addEventListener`.

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

<InstallCLI name="target" />

Tanpa dependensi — tidak ada berkas lain yang ikut terpasang.

</TabItem>

<TabItem value="manual" label="Manual">

Salin kode berikut ke project Anda.

```ts [lib/target.ts]
import { toValue } from 'vue'
import type { ComponentPublicInstance, MaybeRefOrGetter } from 'vue'

export type TargetType = HTMLElement | SVGElement | Element | Window | Document

export type TargetValue = TargetType | ComponentPublicInstance | null | undefined

/** An element, a component instance, a `ref` to either, or a getter returning one. */
export type BasicTarget = MaybeRefOrGetter<TargetValue>

export function getTargetElement(target?: BasicTarget): TargetType | undefined {
  const value = toValue(target)
  if (value == null) return undefined

  const element = (value as ComponentPublicInstance).$el ?? value
  return (element as TargetType | null) ?? undefined
}
```

</TabItem>

</Tabs>

<!--@include: ./_api/target.md-->
