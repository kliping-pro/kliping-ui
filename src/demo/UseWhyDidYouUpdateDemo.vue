<script setup lang="ts">
import { HashIcon, TagIcon } from '@lucide/vue'
import { reactive, ref, watch } from 'vue'
import { Button } from '@/components/ui/button'
import { useWhyDidYouUpdate } from '@/composables/use-why-did-you-update'

const props = reactive({ count: 0, label: 'static' })
useWhyDidYouUpdate('ExampleCard', props)

// Cerminan dari apa yang dicetak ke konsol, supaya terlihat di halaman juga.
interface LogEntry { id: number, key: string, from: unknown, to: unknown }
const log = ref<LogEntry[]>([])
let nextId = 0
let previous = { ...props }

watch(
  () => ({ ...props }),
  (current) => {
    for (const key of Object.keys(current) as (keyof typeof current)[]) {
      if (!Object.is(previous[key], current[key]))
        log.value = [{ id: ++nextId, key, from: previous[key], to: current[key] }, ...log.value].slice(0, 3)
    }
    previous = current
  },
)

function display(v: unknown) {
  return typeof v === 'string' ? `"${v}"` : String(v)
}
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Why Did You Update
      </h3>
      <p class="text-muted-foreground text-sm">
        Logs which props changed, with their old and new values.
      </p>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <div class="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
        <span class="text-muted-foreground text-xs">count</span>
        <span class="font-mono font-semibold text-lg tabular-nums">{{ props.count }}</span>
      </div>
      <div class="flex min-w-0 flex-col gap-1 rounded-lg border bg-muted/40 p-3">
        <span class="text-muted-foreground text-xs">label</span>
        <span class="truncate font-mono font-semibold text-lg">"{{ props.label }}"</span>
      </div>
    </div>

    <div class="rounded-lg border bg-muted/40">
      <div class="flex items-center justify-between gap-3 border-b px-4 py-2 text-xs">
        <span class="text-muted-foreground">Update log</span>
        <span class="truncate font-mono text-muted-foreground">ExampleCard</span>
      </div>
      <ul v-if="log.length" class="divide-y">
        <li v-for="c in log" :key="c.id" class="flex items-center justify-between gap-3 px-4 py-2.5 font-mono text-xs">
          <span class="text-foreground">{{ c.key }}</span>
          <span class="truncate text-muted-foreground">
            {{ display(c.from) }} <span class="text-foreground">→ {{ display(c.to) }}</span>
          </span>
        </li>
      </ul>
      <p v-else class="px-4 py-4 text-center text-muted-foreground text-xs">
        No updates yet.
      </p>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <Button @click="props.count += 1">
        <HashIcon />
        Bump count
      </Button>
      <Button variant="secondary" @click="props.label = `label-${Date.now() % 1000}`">
        <TagIcon />
        New label
      </Button>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      The same entries are printed to the browser console (dev only).
    </p>
  </div>
</template>
