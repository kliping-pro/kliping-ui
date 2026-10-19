<!-- example: 2. With Custom Filter -->
<script setup lang="ts">
import { computed, ref } from 'vue'
import { Mention, MentionContent, MentionInput, MentionItem } from '@/components/mention'

const commands = [
  { id: '1', name: 'help', description: 'Show available commands' },
  { id: '2', name: 'clear', description: 'Clear the console' },
  { id: '3', name: 'restart', description: 'Restart the application' },
  { id: '4', name: 'reload', description: 'Reload the current page' },
  { id: '5', name: 'quit', description: 'Exit the application' },
]

const text = ref('')

// Mention tidak menyaring sarannya sendiri — daftarnya yang Anda render.
// Kata setelah `/` terakhir dibaca dari teksnya, lalu dicocokkan dari awal
// (bukan "memuat"), seperti perintah di terminal.
const term = computed(() => text.value.match(/\/(\w*)$/)?.[1] ?? '')
const filtered = computed(() =>
  commands.filter(command => command.name.startsWith(term.value.toLowerCase())),
)
</script>

<template>
  <Mention v-model="text" trigger="/" class="w-full max-w-[400px]">
    <MentionInput placeholder="Type / to use a command..." :rows="3" />
    <MentionContent>
      <MentionItem v-for="command in filtered" :key="command.id" :value="command.name">
        <span class="font-mono text-sm">{{ command.name }}</span>
        <span class="text-xs text-muted-foreground">{{ command.description }}</span>
      </MentionItem>
      <div v-if="!filtered.length" class="px-2 py-1.5 text-sm text-muted-foreground">
        No commands found.
      </div>
    </MentionContent>
  </Mention>
</template>
