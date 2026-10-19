<!-- example: 2. With Validation -->
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
  { id: '1', key: 'API_KEY', value: 'sk-1234567890' },
  { id: '2', key: 'invalid key', value: '' },
  { id: '3', key: 'API_KEY', value: 'duplicate' },
])

// Validasi di sini hanya untuk kunci (`validateKey`); kunci ganda ditolak oleh
// komponennya sendiri karena `allowDuplicateKeys` mati.
function validateKey(key: string) {
  if (!key)
    return 'Key is required'
  if (!/^[A-Z_][A-Z0-9_]*$/.test(key))
    return 'Must be uppercase with underscores'
  return undefined
}
</script>

<template>
  <KeyValue
    v-model="entries"
    class="w-full max-w-lg"
    key-placeholder="KEY"
    value-placeholder="value"
    :validate-key="validateKey"
  >
    <KeyValueList v-slot="{ entry }">
      <div class="flex flex-col gap-1">
        <KeyValueItem :entry="entry">
          <KeyValueKeyInput class="font-mono" />
          <KeyValueValueInput class="font-mono" />
          <KeyValueRemove />
        </KeyValueItem>
        <KeyValueError class="pl-1" :entry="entry" />
      </div>
    </KeyValueList>
    <KeyValueAdd />
  </KeyValue>
</template>
