<script setup lang="ts">
import { FingerprintIcon } from '@lucide/vue'
import { ref } from 'vue'
import { Button } from '@/components/ui/button'

const count = ref(0)

// Fungsi yang dideklarasikan di setup lahir sekali. Identitasnya tidak pernah
// berubah, jadi tidak ada yang perlu dijaga.
function increment() {
  count.value += 1
}

const initialIdentity = increment
const isSame = ref(true)

function check() {
  isSame.value = increment === initialIdentity
  increment()
}
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Stable Function
      </h3>
      <p class="text-muted-foreground text-sm">
        A function declared in setup keeps the same identity forever.
      </p>
    </div>

    <div class="divide-y rounded-lg border bg-muted/40">
      <div class="flex items-center justify-between px-4 py-3">
        <span class="text-muted-foreground text-sm">Calls</span>
        <span class="font-mono font-semibold text-sm tabular-nums">{{ count }}</span>
      </div>
      <div class="flex items-center justify-between px-4 py-3">
        <span class="text-muted-foreground text-sm">Same identity</span>
        <span
          class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium text-xs transition-colors"
          :class="isSame ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'"
        >
          <span class="size-1.5 rounded-full" :class="isSame ? 'bg-primary-foreground' : 'bg-muted-foreground'" />
          {{ isSame ? 'True' : 'False' }}
        </span>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <Button class="col-span-2" @click="check">
        <FingerprintIcon />
        Call and compare
      </Button>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      <code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground">fn === firstFn</code> stays true on every call.
    </p>
  </div>
</template>
