<!-- example: 1. With Paste Support -->
<script setup lang="ts">
import { ClipboardIcon } from '@lucide/vue'
import { ref } from 'vue'
import type { KeyValueEntry } from '@/components/key-value'
import {
  KeyValue,
  KeyValueAdd,
  KeyValueItem,
  KeyValueKeyInput,
  KeyValueList,
  KeyValueRemove,
  KeyValueValueInput,
} from '@/components/key-value'

const entries = ref<KeyValueEntry[]>([])
</script>

<template>
  <div class="flex w-full max-w-lg flex-col gap-4">
    <div class="flex flex-col gap-2 rounded-lg border bg-muted/50 p-4">
      <div class="flex items-center gap-2">
        <ClipboardIcon class="size-4" />
        <p class="text-sm font-medium">
          Paste Support
        </p>
      </div>
      <p class="text-xs text-muted-foreground">
        Copy these lines and paste them into a key field:
      </p>
      <pre class="rounded bg-background p-2 text-xs">API_KEY=sk-1234567890
DATABASE_URL=postgresql://localhost
PORT=3000</pre>
    </div>
    <KeyValue v-model="entries" key-placeholder="KEY" value-placeholder="value">
      <KeyValueList v-slot="{ entry }">
        <KeyValueItem :entry="entry">
          <KeyValueKeyInput class="font-mono" />
          <KeyValueValueInput class="font-mono" />
          <KeyValueRemove />
        </KeyValueItem>
      </KeyValueList>
      <KeyValueAdd />
    </KeyValue>
  </div>
</template>
