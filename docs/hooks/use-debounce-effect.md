---
title: useDebounceEffect
description: "Efek yang menunggu perubahannya berhenti."
---

<ComponentPreview name="UseDebounceEffectDemo" code="none" />

<NativeClassCallout equivalent="watch + useDebounceFn" />

Dirangkai dari dua bagian yang sudah ada di registry ini:

```ts
import { useDebounceFn } from '@/composables/use-debounce-fn'

const { run } = useDebounceFn(() => search(query.value), 300)
watch(query, run)
```

Kalau yang dibutuhkan adalah **nilainya** yang tertunda, bukan efeknya, ada yang
lebih ringkas: [`useDebounce`](/hooks/use-debounce).

```ts
const debouncedQuery = useDebounce(query, 300)
// lalu pakai kueriTertunda di computed, watch, atau langsung di template
```
