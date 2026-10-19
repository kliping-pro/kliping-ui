<script setup lang="ts">
import { CheckIcon, CopyIcon } from '@lucide/vue'
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useClipboard } from '@/composables/use-clipboard'

const text = ref('Kliping — Vue components, ready to clip.')
const { copy, copied, isSupported } = useClipboard()
const lastCopied = ref('')

async function handleCopy() {
  await copy(text.value)
  lastCopied.value = text.value
}
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Copy to Clipboard
      </h3>
      <p class="text-muted-foreground text-sm">
        Copies text, with a "copied" flag that resets itself.
      </p>
    </div>

    <div class="flex flex-col gap-2">
      <Label for="clipboard-text">Text to copy</Label>
      <Input id="clipboard-text" v-model="text" />
    </div>

    <div class="flex flex-col divide-y rounded-lg border bg-muted/40">
      <div class="flex items-center justify-between gap-4 px-4 py-3">
        <span class="text-muted-foreground text-sm">Status</span>
        <span
          class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium text-xs transition-colors"
          :class="copied ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'"
        >
          <span class="size-1.5 rounded-full" :class="copied ? 'bg-primary-foreground' : 'bg-muted-foreground'" />
          {{ copied ? 'Copied' : 'Idle' }}
        </span>
      </div>
      <div class="flex items-center justify-between gap-4 px-4 py-3">
        <span class="shrink-0 text-muted-foreground text-sm">Last copied</span>
        <span class="truncate font-mono text-xs" :class="lastCopied ? 'text-foreground' : 'text-muted-foreground'">{{ lastCopied || '—' }}</span>
      </div>
    </div>

    <Button class="w-full" :disabled="!isSupported || !text" @click="handleCopy">
      <CheckIcon v-if="copied" />
      <CopyIcon v-else />
      {{ copied ? 'Copied' : 'Copy' }}
    </Button>

    <p class="text-center text-muted-foreground text-xs">
      <template v-if="isSupported">
        <code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground">copied</code> switches off after 1.5 s.
      </template>
      <template v-else>
        The Clipboard API is only available in a secure context (HTTPS or localhost).
      </template>
    </p>
  </div>
</template>
