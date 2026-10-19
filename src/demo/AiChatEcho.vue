<script setup lang="ts">
import { RuntimeAdapter, Suggestions } from '@assistant-ui/core/store'
import { AuiConfig, AuiProvider } from '@assistant-ui/vue'
import { AiThread } from '@/components/ai-chat'
import { AiThreadList } from '@/components/ai-thread-list'
import { createEchoRuntime } from './ai-echo-runtime'

// Dibuat di dalam komponen ini, yang hanya dirender di peramban (lihat
// AiChatDemo): renderer server Vue tidak pernah membuang effect scope, jadi
// provider di server akan menyisakan satu runtime per permintaan.
const props = defineProps<{ withThreadList?: boolean }>()

const config = AuiConfig({
  threads: RuntimeAdapter(createEchoRuntime()),
  suggestions: Suggestions([
    { title: 'Say hello', label: 'a friendly opener', prompt: 'Hello there!' },
    { title: 'Ask anything', label: 'it will echo back', prompt: 'What can you do?' },
  ]),
})
</script>

<template>
  <AuiProvider :config="config">
    <div class="flex h-[32rem] w-full overflow-hidden rounded-lg border">
      <AiThreadList v-if="props.withThreadList" class="w-56 shrink-0 border-r p-2 max-sm:hidden" />
      <AiThread class="min-w-0 flex-1" />
    </div>
  </AuiProvider>
</template>
