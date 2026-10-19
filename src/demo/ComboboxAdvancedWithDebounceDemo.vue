<!-- example: 4. With Debounce -->
<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import {
  Combobox,
  ComboboxAnchor,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxLoading,
  ComboboxTrigger,
} from '@/components/combobox-advanced'

const tricks = [
  { label: 'Kickflip', value: 'kickflip' },
  { label: 'Heelflip', value: 'heelflip' },
  { label: 'Tre Flip', value: 'tre-flip' },
  { label: 'FS 540', value: 'fs-540' },
  { label: 'Casper flip 360 flip', value: 'casper-flip-360-flip' },
  { label: 'Kickflip Backflip', value: 'kickflip-backflip' },
  { label: '360 Varial McTwist', value: '360-varial-mc-twist' },
  { label: 'The 900', value: 'the-900' },
]

const value = ref('')
const search = ref('')
const loading = ref(false)
const results = ref(tricks)

// Ketikan ditunda 300 ms, lalu "permintaan server" disimulasikan 400–700 ms.
// Penyaringan bawaan dimatikan: hasilnya datang dari pencarian ini.
let timer: ReturnType<typeof setTimeout> | undefined
let request = 0
watch(search, (term) => {
  clearTimeout(timer)
  timer = setTimeout(async () => {
    const id = ++request
    loading.value = true
    await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 300))
    if (id !== request) return
    results.value = tricks.filter(trick => trick.label.toLowerCase().includes(term.toLowerCase()))
    loading.value = false
  }, 300)
})
onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <div class="w-full max-w-xs">
    <Combobox v-model="value" ignore-filter>
      <ComboboxLabel>Trick</ComboboxLabel>
      <ComboboxAnchor>
        <ComboboxInput v-model="search" placeholder="Search trick..." />
        <ComboboxTrigger />
      </ComboboxAnchor>
      <ComboboxContent>
        <ComboboxLoading v-if="loading">
          Searching tricks...
        </ComboboxLoading>
        <template v-else>
          <ComboboxEmpty>No trick found.</ComboboxEmpty>
          <ComboboxItem v-for="trick in results" :key="trick.value" :value="trick.value" outset>
            {{ trick.label }}
          </ComboboxItem>
        </template>
      </ComboboxContent>
    </Combobox>
  </div>
</template>
