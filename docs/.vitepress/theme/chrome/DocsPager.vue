<script setup lang="ts">
import { ArrowLeftIcon, ArrowRightIcon } from '@lucide/vue'
import { useData, useRoute, withBase } from 'vitepress'
import { computed } from 'vue'
import { Button } from '@/components/ui/button'
import { flatten, prevNext, sidebarFor } from './navigation'

const props = defineProps<{ variant?: 'icon' | 'label' }>()

const { theme } = useData()
const route = useRoute()

const neighbors = computed(() =>
  prevNext(route.path, flatten(sidebarFor(theme.value.sidebar, route.path))),
)
const prevLabel = computed(() => theme.value.docFooter?.prev || 'Previous')
const nextLabel = computed(() => theme.value.docFooter?.next || 'Next')
</script>

<template>
  <!-- Sepasang tombol ikon, duduk di samping judul halaman. -->
  <template v-if="props.variant === 'icon'">
    <Button
      v-if="neighbors.prev"
      as-child
      variant="secondary"
      size="icon"
      class="ml-auto size-8 rounded-full shadow-none md:size-7"
    >
      <a :href="withBase(neighbors.prev.link)">
        <ArrowLeftIcon />
        <span class="sr-only">{{ prevLabel }}</span>
      </a>
    </Button>
    <Button
      v-if="neighbors.next"
      as-child
      variant="secondary"
      size="icon"
      class="size-8 rounded-full shadow-none md:size-7"
    >
      <a :href="withBase(neighbors.next.link)">
        <span class="sr-only">{{ nextLabel }}</span>
        <ArrowRightIcon />
      </a>
    </Button>
  </template>

  <!-- Sepasang kartu di kaki halaman, di dalam grid dua kolom milik DocsShell —
       pola yang sama dengan kartu lain di situs: radius kartu, border yang
       menegas dan berbayang saat disorot. Nama halamannya bisa panjang
       (`useDeepCompareLayoutEffect`), jadi dipotong dengan elipsis. Kartu
       berikutnya selalu di kolom kedua, juga saat yang sebelumnya tidak ada. -->
  <template v-else>
    <a
      v-if="neighbors.prev"
      :href="withBase(neighbors.prev.link)"
      class="flex min-w-0 flex-col gap-1 kliping-card p-4 no-underline"
    >
      <span class="flex items-center gap-1 text-muted-foreground text-xs">
        <ArrowLeftIcon class="size-3.5" /> {{ prevLabel }}
      </span>
      <span class="truncate font-medium text-foreground text-sm">{{ neighbors.prev.text }}</span>
    </a>
    <a
      v-if="neighbors.next"
      :href="withBase(neighbors.next.link)"
      class="col-start-2 flex min-w-0 flex-col items-end gap-1 kliping-card p-4 text-right no-underline"
    >
      <span class="flex items-center gap-1 text-muted-foreground text-xs">
        {{ nextLabel }} <ArrowRightIcon class="size-3.5" />
      </span>
      <span class="w-full truncate font-medium text-foreground text-sm">{{ neighbors.next.text }}</span>
    </a>
  </template>
</template>
