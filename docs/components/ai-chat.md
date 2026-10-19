---
title: "AI Chat"
description: "Antarmuka chat untuk aplikasi AI: percakapan, pesan berformat markdown, penalaran, pemanggilan alat, lampiran, dan saran — dibangun di atas primitif chat headless."
new: true
---

<ComponentPreview name="AiChatDemo" />

Demo di atas membalas langsung di peramban (runtime "echo"), tanpa server dan tanpa
kunci API. Di aplikasi Anda, pesan dikirim ke model lewat [AI SDK](https://ai-sdk.dev).

## Installation

```bash
npx kliping@latest add ai-chat
```

Untuk menyambung ke model lewat AI SDK, pasang juga runtime-nya. `@assistant-ui/ai-sdk`
menjalankan state chat AI SDK di atas runtime bersama, jadi ia butuh `react` terpasang
walaupun React tidak merender apa pun:

```bash
npm install @assistant-ui/ai-sdk ai react
```

## Usage

Bungkus `AiThread` dengan `AuiProvider`. Di Nuxt, jadikan komponen ini khusus klien
(`.client.vue`): renderer server Vue tidak pernah membuang effect scope, jadi provider
yang dirender di server menyisakan satu runtime per permintaan.

```vue
<!-- app/components/Assistant.client.vue -->
<script setup lang="ts">
import { AISDKChat } from '@assistant-ui/ai-sdk'
import { AuiConfig, AuiProvider } from '@assistant-ui/vue'
import { AiThread } from '@/components/ui/ai-chat'

const config = AuiConfig({ threads: AISDKChat() })
</script>

<template>
  <AuiProvider :config="config">
    <AiThread class="h-dvh" />
  </AuiProvider>
</template>
```

`AISDKChat()` mengirim percakapan ke `/api/chat`. Rute itu cukup mengembalikan aliran
dari `streamText` — misalnya di Nuxt:

```ts
// server/api/chat.post.ts
import { anthropic } from '@ai-sdk/anthropic'
import { convertToModelMessages, streamText, type UIMessage } from 'ai'

export default defineEventHandler(async (event) => {
  const { messages } = await readBody<{ messages: UIMessage[] }>(event)
  const result = streamText({
    model: anthropic('claude-sonnet-5-5'),
    messages: await convertToModelMessages(messages),
  })
  return result.toUIMessageStreamResponse()
})
```

Pasang `@ai-sdk/anthropic` dan isi `ANTHROPIC_API_KEY` di `.env`. Penyedia model lain
(OpenAI, Google, …) tinggal mengganti paket `@ai-sdk/*`-nya.

## Parts

| Bagian | Berkas | Isi |
|---|---|---|
| `AiThread` | `components/ui/ai-chat/ai-thread.vue` | daftar pesan, saran pembuka, gulir ke bawah, kotak tulis dengan lampiran, kirim/berhenti |
| `AiMessage` | `components/ui/ai-chat/ai-message.vue` | satu pesan: sunting, salin, buat ulang, pilih cabang |
| `AiMarkdownText` | `components/ui/ai-chat/ai-markdown-text.vue` | teks markdown (markdown-it, HTML mentah dimatikan) |
| `AiReasoning` | `components/ui/ai-chat/ai-reasoning.vue` | penalaran model yang bisa dibuka-tutup, terbuka selama mengalir |
| `AiToolFallback` | `components/ui/ai-chat/ai-tool-fallback.vue` | pemanggilan alat: status, durasi, argumen, persetujuan dan pertanyaan |

Daftar percakapan ada di [AI Thread List](/components/ai-thread-list).

<!--@include: ./_api/ai-chat.md-->
