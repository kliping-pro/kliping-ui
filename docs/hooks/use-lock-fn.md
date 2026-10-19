---
title: useLockFn
description: "Membungkus fungsi async supaya tidak bisa jalan dua kali bersamaan."
---

<ComponentPreview name="UseLockFnDemo" code="none" />

Gunanya satu dan konkret: tombol kirim yang ditekan dua kali tidak mengirim
dua kali. Panggilan yang datang saat panggilan sebelumnya belum selesai
diabaikan — bukan diantrikan, bukan ditunda.

Kuncinya dilepas di `finally`, jadi ikut terlepas juga saat fungsinya
melempar. Tanpa itu satu kegagalan mengunci tombolnya selamanya, dan itu
jenis cacat yang cuma muncul di hari yang buruk.

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

<InstallCLI name="use-lock-fn" />

Tanpa dependensi — tidak ada berkas lain yang ikut terpasang.

</TabItem>

<TabItem value="manual" label="Manual">

Salin kode berikut ke project Anda.

```ts [composables/use-lock-fn.ts]
export function useLockFn<P extends any[] = any[], V = any>(fn: (...args: P) => Promise<V>) {
  let locked = false

  return async (...args: P): Promise<V | undefined> => {
    if (locked) return undefined

    locked = true
    try {
      return await fn(...args)
    } finally {
      locked = false
    }
  }
}
```

</TabItem>

</Tabs>

## Requirements

| Requirement | Value |
|---|---|
| Project | Vue 3.5+, alias `@` — disiapkan `kliping init` |
| Files | `composables/use-lock-fn.ts` |

## API Reference

```ts
export function useLockFn<P extends any[] = any[], V = any>(
  fn: (...args: P) => Promise<V>,
)
```

### Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `fn` | `(...args: P) => Promise<V>` | — | Async function to guard. |

### Returns

`(...args: P) => Promise<V \| undefined>` — Wrapped function; calls made while a previous call is pending are ignored and resolve to `undefined`.

## Credits

Berasal dari [shadcn-hooks](https://github.com/Debbl/shadcn-hooks) (MIT, Copyright (c) 2025 Brendan Dash). Rantai lengkapnya di [Credits](/credits).
