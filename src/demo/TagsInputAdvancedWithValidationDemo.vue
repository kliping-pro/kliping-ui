<!-- example: 2. With Validation -->
<script setup lang="ts">
import type { AcceptableInputValue } from 'reka-ui'
import { ref, watch } from 'vue'
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputLabel,
  TagsInputList,
} from '@/components/tags-input-advanced'

const MAX = 6
const tricks = ref<AcceptableInputValue[]>([])
const message = ref('')

// Duplikat dan batas `max` ditolak TagsInput sendiri (event `invalid`);
// aturan isi (≥ 3 huruf, bukan "ollie") diperiksa di sini.
watch(tricks, (next, previous) => {
  const added = next.filter(value => !previous.includes(value))
  const rejected = added.filter(value => String(value).length <= 2 || String(value).toLowerCase().includes('ollie'))
  if (rejected.length) {
    tricks.value = next.filter(value => !rejected.includes(value))
    message.value = `${rejected.join(', ')} is not a valid trick.`
  }
  else if (added.length) {
    message.value = ''
  }
})

function onInvalid(value: AcceptableInputValue) {
  message.value = tricks.value.length >= MAX ? `Up to ${MAX} tricks are allowed.` : `${value} already exists.`
}
</script>

<template>
  <div class="w-full max-w-sm">
    <TagsInput v-model="tricks" :max="MAX" add-on-paste @invalid="onInvalid">
      <TagsInputLabel>Tricks</TagsInputLabel>
      <TagsInputList>
        <TagsInputItem v-for="trick in tricks" :key="String(trick)" :value="trick">
          {{ trick }}
        </TagsInputItem>
        <TagsInputInput placeholder="Add trick..." />
      </TagsInputList>
      <p class="text-muted-foreground text-sm">
        Add up to 6 tricks with at least 3 characters, excluding "ollie".
      </p>
      <p v-if="message" class="text-destructive text-sm" role="alert">
        {{ message }}
      </p>
    </TagsInput>
  </div>
</template>
