<script setup lang="ts">
import { ref } from 'vue'
import { composeEventHandlers, composeRefs } from '@/lib/composition'
import { Button } from '@/components/ui/button'

const log = ref<string[]>([])

const localRef = ref<Element | null>(null)
const secondRef = ref<Element | null>(null)

// Disusun di skrip, bukan di templat. Ungkapan templat sudah membuka bungkus
// ref-nya, jadi `composeRefs(localRef)` di sana menerima nilainya — bukan
// wadahnya — dan tidak ada yang akan pernah tersimpan.
const attachRefs = composeRefs(localRef, secondRef)

// Penangan pemakai jalan lebih dulu; yang bawaan dilewati kalau peristiwanya
// sudah dicegah. Tombol kedua membuktikannya.
const handleClick = composeEventHandlers<MouseEvent>(
  () => log.value.push('consumer handler'),
  () => log.value.push('built-in handler'),
)

const handlePreventedClick = composeEventHandlers<MouseEvent>(
  (event) => {
    log.value.push('consumer handler (prevents default)')
    event.preventDefault()
  },
  () => log.value.push('built-in handler'),
)
</script>

<template>
  <div class="flex flex-col items-start gap-3">
    <div :ref="attachRefs" class="rounded-md border px-3 py-2 text-sm">
      This element is stored in two refs at once.
    </div>

    <div class="flex gap-2">
      <Button variant="outline" @click="handleClick">
        Default
      </Button>
      <Button variant="outline" @click="handlePreventedClick">
        Prevented
      </Button>
      <Button variant="ghost" @click="log = []">
        Clear
      </Button>
    </div>

    <ol class="text-muted-foreground text-sm">
      <li v-for="(c, i) in log" :key="i">
        {{ i + 1 }}. {{ c }}
      </li>
    </ol>
  </div>
</template>
