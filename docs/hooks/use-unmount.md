---
title: useUnmount
description: "Membersihkan saat komponennya dilepas."
---

<ComponentPreview name="UseUnmountDemo" code="none" />

<NativeClassCallout equivalent="onUnmounted() atau onScopeDispose()" />

Vue punya dua, dan bedanya penting:

```ts
import { onScopeDispose, onUnmounted } from 'vue'

onUnmounted(() => { /* hanya di dalam komponen */ })
onScopeDispose(() => { /* di mana pun, termasuk effectScope() lepas */ })
```

**Seluruh composable Kliping memakai `onScopeDispose`.** Alasannya konkret:
composable dipanggil oleh composable lain, yang belum tentu dipanggil dari sebuah
komponen. Di sana `onUnmounted` diam saja, dan yang tersisa adalah pendengar yang
tidak pernah dilepas.

```ts
if (getCurrentScope())
  onScopeDispose(cleanup)
```

Penjagaan `getCurrentScope()` membuatnya aman dipanggil di mana pun, termasuk di
luar scope mana pun.
