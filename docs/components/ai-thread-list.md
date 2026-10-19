---
title: "AI Thread List"
description: "Daftar percakapan untuk aplikasi AI: percakapan baru, pencarian, kelompok Today/Yesterday/Earlier, arsip, dan hapus."
new: true
---

<ComponentPreview name="AiThreadListDemo" />

## Installation

```bash
npx kliping@latest add ai-thread-list
```

## Usage

Letakkan di samping [`AiThread`](/components/ai-chat), di dalam `AuiProvider` yang sama:

```vue
<script setup lang="ts">
import { AISDKChat } from '@assistant-ui/ai-sdk'
import { AuiConfig, AuiProvider } from '@assistant-ui/vue'
import { AiThread } from '@/components/ui/ai-chat'
import { AiThreadList } from '@/components/ui/ai-thread-list'

const config = AuiConfig({ threads: AISDKChat() })
</script>

<template>
  <AuiProvider :config="config">
    <div class="flex h-dvh">
      <AiThreadList class="w-64 border-r p-2" />
      <AiThread class="flex-1" />
    </div>
  </AuiProvider>
</template>
```

Pencarian dan menu arsip/hapus muncul bila runtime-nya mendukung banyak percakapan.

<!--@include: ./_api/ai-thread-list.md-->
