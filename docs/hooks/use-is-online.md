---
title: useIsOnline
description: "Apakah peramban merasa sedang tersambung."
---

<ComponentPreview name="UseIsOnlineDemo" code="none" />

Perlu disebut supaya tidak dipercaya berlebihan: `navigator.onLine` cuma tahu
ada tidaknya sambungan jaringan, bukan ada tidaknya internet. Wi-Fi yang
tersambung ke router mati tetap dilaporkan `true`. Untuk keperluan yang
sungguh-sungguh, satu permintaan kecil ke server sendiri lebih bisa dipercaya
daripada nilai ini.

Bernilai `true` saat dirender di server: menganggap orang tersambung sampai
terbukti sebaliknya lebih baik daripada mengedipkan pesan "Anda offline" pada
setiap pemuatan halaman pertama.

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

<InstallCLI name="use-is-online" />

Ikut terpasang sendiri: [`is-browser`](/hooks/is-browser), [`try-on-mounted`](/hooks/try-on-mounted), [`use-event-listener`](/hooks/use-event-listener).

</TabItem>

<TabItem value="manual" label="Manual">

Salin dulu [`is-browser`](/hooks/is-browser), [`try-on-mounted`](/hooks/try-on-mounted), [`target`](/hooks/target), [`use-event-listener`](/hooks/use-event-listener) — masing-masing memuat sumbernya di halamannya sendiri — lalu tempel berkas ini.

```ts [composables/use-is-online.ts]
import { readonly, ref } from 'vue'
import { isBrowser } from '@/lib/is-browser'
import { tryOnMounted } from '@/lib/try-on-mounted'
import { useEventListener } from '@/composables/use-event-listener'

export function useIsOnline() {
  const isOnline = ref(true)

  const update = () => {
    if (isBrowser) isOnline.value = navigator.onLine
  }

  tryOnMounted(update)
  useEventListener(['online', 'offline'], update)

  return readonly(isOnline)
}
```

</TabItem>

</Tabs>

## Requirements

| Requirement | Value |
|---|---|
| Project | Vue 3.5+, alias `@` — disiapkan `kliping init` |
| Kliping items | `is-browser`, `try-on-mounted`, `use-event-listener` |
| Files | `composables/use-is-online.ts` |

## API Reference

```ts
export function useIsOnline()
```

### Parameters

Tanpa parameter.

### Returns

`Readonly<Ref<boolean, boolean>>` — Whether the browser is online. Reactive, read-only.

## Credits

Berasal dari [shadcn-hooks](https://github.com/Debbl/shadcn-hooks) (MIT, Copyright (c) 2025 Brendan Dash). Rantai lengkapnya di [Credits](/credits).
