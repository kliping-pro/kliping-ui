---
title: useOs
description: "Sistem operasi yang sedang dipakai, ditebak dari navigator."
---

<ComponentPreview name="UseOsDemo" code="none" />

Sistem operasi yang sedang dipakai, ditebak dari `navigator`.

Dipakai untuk hal-hal kecil yang memang berbeda per sistem: menampilkan ⌘K
atau Ctrl+K, memilih kata "Bagikan" atau "Kirim". **Jangan** dipakai untuk
memutuskan kemampuan — untuk itu periksa kemampuannya langsung, karena
`userAgent` bisa dipalsukan dan sering memang dipalsukan.

Bernilai `undetermined` saat dirender di server dan pada gambaran pertama di
peramban, lalu terisi setelah terpasang. Mengisinya lebih awal akan membuat
HTML server berbeda dari gambaran pertama, dan Vue menggambar ulang bagian
itu — persis masalah yang membuat sumbernya menunda pembacaan ini juga.

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

<InstallCLI name="use-os" />

Ikut terpasang sendiri: [`try-on-mounted`](/hooks/try-on-mounted).

</TabItem>

<TabItem value="manual" label="Manual">

Salin dulu [`is-browser`](/hooks/is-browser), [`try-on-mounted`](/hooks/try-on-mounted) — masing-masing memuat sumbernya di halamannya sendiri — lalu tempel berkas ini.

```ts [composables/use-os.ts]
import { readonly, ref } from 'vue'
import { tryOnMounted } from '@/lib/try-on-mounted'

export type OperatingSystem =
  'undetermined' | 'macos' | 'ios' | 'windows' | 'android' | 'linux' | 'chromeos'

interface NavigatorWithUserAgentData extends Navigator {
  userAgentData?: { platform?: string }
}

export function getOs(): OperatingSystem {
  if (typeof navigator === 'undefined') return 'undetermined'

  const nav = navigator as NavigatorWithUserAgentData
  const platform = (nav.userAgentData?.platform ?? navigator.platform ?? '').toLowerCase()
  const userAgent = navigator.userAgent.toLowerCase()
  const touchPoints = navigator.maxTouchPoints ?? 0

  if (userAgent.includes('android')) return 'android'

  if (/iphone|ipad|ipod/.test(userAgent) || (platform === 'macintel' && touchPoints > 1))
    return 'ios'

  if (userAgent.includes('cros')) return 'chromeos'
  if (platform.includes('win') || userAgent.includes('win')) return 'windows'
  if (platform.includes('mac') || userAgent.includes('mac')) return 'macos'
  if (platform.includes('linux') || userAgent.includes('linux')) return 'linux'

  return 'undetermined'
}

export function useOs() {
  const os = ref<OperatingSystem>('undetermined')

  tryOnMounted(() => {
    os.value = getOs()
  })

  return readonly(os)
}
```

</TabItem>

</Tabs>

## Requirements

| Requirement | Value |
|---|---|
| Project | Vue 3.5+, alias `@` — disiapkan `kliping init` |
| Kliping items | `try-on-mounted` |
| Files | `composables/use-os.ts` |

## API Reference

```ts
export type OperatingSystem =
  | 'undetermined'
  | 'macos'
  | 'ios'
  | 'windows'
  | 'android'
  | 'linux'
  | 'chromeos'

export function getOs(): OperatingSystem

export function useOs()
```

### getOs

#### Parameters

Tanpa parameter.

#### Returns

`OperatingSystem` — Operating system detected from the user agent, read once; `undetermined` outside the browser.

### useOs

#### Parameters

Tanpa parameter.

#### Returns

`Readonly<Ref<OperatingSystem, OperatingSystem>>` — Detected operating system, `undetermined` until mounted. Reactive, read-only.

## Credits

Berasal dari [shadcn-hooks](https://github.com/Debbl/shadcn-hooks) (MIT, Copyright (c) 2025 Brendan Dash). Rantai lengkapnya di [Credits](/credits).
