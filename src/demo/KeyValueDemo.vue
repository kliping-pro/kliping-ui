<script setup lang="ts">
import { ref } from 'vue'
import type { KeyValueEntry } from '@/components/key-value'
import {
  KeyValue,
  KeyValueAdd,
  KeyValueError,
  KeyValueItem,
  KeyValueKeyInput,
  KeyValueList,
  KeyValueRemove,
  KeyValueValueInput,
} from '@/components/key-value'

const entries = ref<KeyValueEntry[]>([
  { id: 'a', key: 'API_URL', value: 'https://api.example.com' },
])

const VALID_NAME = /^[A-Z_][A-Z0-9_]*$/

function validateKey(key: string) {
  return VALID_NAME.test(key) ? undefined : 'Use uppercase letters, digits, and underscores only.'
}
</script>

<template>
  <div class="flex w-full max-w-lg flex-col gap-3">
    <KeyValue v-model="entries" key-placeholder="VARIABLE_NAME" :max-items="8" :validate-key="validateKey" value-placeholder="value">
      <KeyValueList v-slot="{ entry }">
        <div class="flex flex-col gap-1">
          <KeyValueItem :entry="entry">
            <KeyValueKeyInput />
            <KeyValueValueInput />
            <KeyValueRemove />
          </KeyValueItem>
          <KeyValueError class="pl-1" :entry="entry" />
        </div>
      </KeyValueList>
      <KeyValueAdd />
    </KeyValue>

    <p class="text-muted-foreground text-sm">
      Copy several <code>NAME=value</code> lines and paste them into a key field —
      each one becomes its own row.
    </p>
  </div>
</template>
