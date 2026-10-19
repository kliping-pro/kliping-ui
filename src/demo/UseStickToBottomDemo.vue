<script setup lang="ts">
import { ArrowDownIcon, PlusIcon } from '@lucide/vue'
import { ref, useTemplateRef } from 'vue'
import { Button } from '@/components/ui/button'
import { useStickToBottom } from '@/composables/use-stick-to-bottom'

const container = useTemplateRef<HTMLDivElement>('container')
const messages = ref([
  { from: 'them', text: 'Hey there!' },
  { from: 'me', text: 'This is a chat window.' },
  { from: 'them', text: 'New messages keep it pinned to the end.' },
  { from: 'me', text: 'And if I scroll up to read?' },
  { from: 'them', text: 'Then it leaves you alone until you come back.' },
])

const { isAtBottom, isSticky, scrollToBottom } = useStickToBottom(container)

function addMessage() {
  const n = messages.value.length + 1
  messages.value.push({ from: n % 2 ? 'them' : 'me', text: `Message #${n}` })
}
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Stick to Bottom
      </h3>
      <p class="text-muted-foreground text-sm">
        Follows new content, unless you scroll up to read.
      </p>
    </div>

    <div class="relative">
      <div ref="container" class="flex h-56 flex-col gap-2 overflow-y-auto overscroll-contain rounded-lg border bg-muted/40 p-3">
        <div
          v-for="(p, i) in messages"
          :key="i"
          class="max-w-[80%] rounded-lg px-3 py-2 text-sm"
          :class="p.from === 'me' ? 'self-end bg-primary text-primary-foreground' : 'self-start border bg-background'"
        >
          {{ p.text }}
        </div>
      </div>
      <Transition
        enter-active-class="transition duration-200"
        leave-active-class="transition duration-150"
        enter-from-class="translate-y-2 opacity-0"
        leave-to-class="translate-y-2 opacity-0"
      >
        <Button
          v-if="!isAtBottom"
          size="icon"
          variant="outline"
          class="-translate-x-1/2 absolute bottom-3 left-1/2 size-8 rounded-full shadow-sm"
          aria-label="Scroll to bottom"
          @click="scrollToBottom()"
        >
          <ArrowDownIcon />
        </Button>
      </Transition>
    </div>

    <div class="divide-y rounded-lg border bg-muted/40">
      <div v-for="row in [{ label: 'Sticky', value: isSticky }, { label: 'At bottom', value: isAtBottom }]" :key="row.label" class="flex items-center justify-between px-4 py-3">
        <span class="text-muted-foreground text-sm">{{ row.label }}</span>
        <span
          class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium text-xs transition-colors"
          :class="row.value ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'"
        >
          <span class="size-1.5 rounded-full" :class="row.value ? 'bg-primary-foreground' : 'bg-muted-foreground'" />
          {{ row.value ? 'True' : 'False' }}
        </span>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <Button class="col-span-2" @click="addMessage">
        <PlusIcon />
        Add message
      </Button>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      Scroll up, then add a message — the view isn't yanked down.
    </p>
  </div>
</template>
