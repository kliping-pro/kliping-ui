<script setup lang="ts">
import { HashIcon, XIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { useHash } from '@/composables/use-hash'

const hash = useHash()
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        URL Hash
      </h3>
      <p class="text-muted-foreground text-sm">
        Reads and writes the hash in the address bar.
      </p>
    </div>

    <div class="flex items-center justify-between gap-4 rounded-lg border bg-muted/40 px-4 py-3">
      <span class="shrink-0 text-muted-foreground text-sm">Current hash</span>
      <code
        class="truncate rounded-sm bg-muted px-1.5 py-0.5 font-mono text-xs"
        :class="hash ? 'text-foreground' : 'text-muted-foreground'"
      >{{ hash || 'empty' }}</code>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <Button :variant="hash === '#one' ? 'default' : 'outline'" @click="hash = '#one'">
        <HashIcon />
        one
      </Button>
      <Button :variant="hash === '#two' ? 'default' : 'outline'" @click="hash = '#two'">
        <HashIcon />
        two
      </Button>
      <Button variant="secondary" class="col-span-2" :disabled="!hash" @click="hash = ''">
        <XIcon />
        Clear hash
      </Button>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      The address bar updates too, and the back button still works.
    </p>
  </div>
</template>
