<script setup lang="ts">
import type { AnyTable } from './types'
import type { HTMLAttributes } from 'vue'
import { XIcon } from '@lucide/vue'
import { computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

/**
 * Bilah di atas tabel: kotak cari, saringan, dan tombol menghapus saringan.
 *
 * Tombol hapusnya cuma muncul kalau ada yang bisa dihapus. Tombol yang selalu
 * ada tapi kadang tidak berbuat apa-apa mengajari pemakainya untuk tidak
 * mempercayainya.
 */
const props = defineProps<{
  /** TanStack table instance the search box and reset button act on. */
  table: AnyTable
  /** The column filtered by the search box; without it, no search box is rendered. */
  searchColumn?: string
  /** Placeholder of the search box; defaults to 'Search…'. */
  searchPlaceholder?: string
  class?: HTMLAttributes['class']
}>()

const t = computed(() => props.table)

const hasFilters = computed(() => (t.value.store.state.columnFilters?.length ?? 0) > 0)

const search = computed(() => {
  const column = props.searchColumn ? props.table.getColumn(props.searchColumn) : undefined
  return (column as { getFilterValue?: () => unknown } | undefined)?.getFilterValue?.() ?? ''
})

function setSearch(value: string | number) {
  const column = props.searchColumn ? props.table.getColumn(props.searchColumn) : undefined
  ;(column as { setFilterValue?: (n: unknown) => void } | undefined)?.setFilterValue?.(String(value) || undefined)
}
</script>

<template>
  <div
    :class="cn('flex flex-wrap items-center gap-2', props.class)"
    data-slot="data-table-toolbar"
  >
    <Input
      v-if="props.searchColumn"
      class="h-8 w-full max-w-56"
      :model-value="String(search)"
      :placeholder="props.searchPlaceholder ?? 'Search…'"
      @update:model-value="setSearch"
    />

    <slot />

    <Button
      v-if="hasFilters"
      class="h-8 px-2"
      size="sm"
      variant="ghost"
      @click="t.resetColumnFilters?.()"
    >
      Reset <XIcon />
    </Button>

    <slot name="right" />
  </div>
</template>
