<script setup lang="ts">
import { ref, shallowRef, triggerRef } from 'vue'
import { Button } from '@/components/ui/button'

const regular = ref({ n: 0 })
const shallow = shallowRef({ n: 0 })

// `triggerRef` harus dipanggil dari script: di template, `dangkal` sudah
// dibuka jadi objeknya, bukan ref-nya lagi.
function bumpShallow(force: boolean) {
  shallow.value.n += 1
  if (force)
    triggerRef(shallow)
}
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Force Update
      </h3>
      <p class="text-muted-foreground text-sm">
        A mutated shallowRef stays silent until you trigger it.
      </p>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <div class="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
        <span class="font-mono text-muted-foreground text-xs">ref</span>
        <span class="font-mono font-semibold text-2xl tabular-nums">{{ regular.n }}</span>
      </div>
      <div class="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
        <span class="font-mono text-muted-foreground text-xs">shallowRef</span>
        <span class="font-mono font-semibold text-2xl tabular-nums">{{ shallow.n }}</span>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <Button variant="secondary" @click="regular.n += 1">
        Bump ref
      </Button>
      <Button variant="outline" @click="bumpShallow(false)">
        Bump silently
      </Button>
      <Button class="col-span-2" @click="bumpShallow(true)">
        Bump shallowRef + triggerRef
      </Button>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      Only an in-place mutated <code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground">shallowRef</code> needs a push.
    </p>
  </div>
</template>
