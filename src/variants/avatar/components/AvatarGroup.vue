<script setup lang="ts">
import { cloneVNode, computed, useSlots } from 'vue'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

/**
 * Tumpukan avatar dengan hitungan sisanya.
 *
 * Sumbernya membaca anaknya lewat `React.Children` — menghitung, memotong,
 * membalik urutan, lalu menyalin tiap elemen dengan `cloneElement` untuk
 * menambahkan cincin latarnya. Vue punya jalan yang sama bentuknya: slot
 * bawaan dipanggil sebagai fungsi, hasilnya daftar VNode biasa, dan
 * `cloneVNode` menggabungkan kelas baru dengan kelas yang sudah ada.
 *
 * Yang dipertahankan dari sumbernya: pemakainya cukup menulis `<Avatar>` satu
 * per satu sebagai anak, tanpa memindahkan datanya ke prop.
 */
const props = defineProps<{
  /** How many avatars to show; the rest collapse into a single circle. */
  max?: number
  class?: string
}>()

const slots = useSlots()

const allAvatars = computed(() => slots.default?.() ?? [])

// Dibalik urutannya karena wadahnya `flex-row-reverse`: yang pertama di
// sumbernya harus berakhir paling depan, dan tumpukannya menindih ke kiri.
const visibleAvatars = computed(() =>
  allAvatars.value
    .slice(0, props.max)
    .reverse()
    .map(v => cloneVNode(v, { class: 'ring-2 ring-background' })),
)

const remaining = computed(() =>
  props.max ? Math.max(allAvatars.value.length - props.max, 1) : 0,
)
</script>

<template>
  <div :class="cn('flex flex-row-reverse items-center', props.class)">
    <Avatar v-if="remaining > 0" class="relative -ml-2 ring-2 ring-background hover:z-10">
      <AvatarFallback class="bg-muted-foreground text-white">
        +{{ remaining }}
      </AvatarFallback>
    </Avatar>
    <div v-for="(avatar, index) in visibleAvatars" :key="index" class="relative -ml-2 hover:z-10">
      <component :is="avatar" />
    </div>
  </div>
</template>
