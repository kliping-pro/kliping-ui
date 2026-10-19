<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Settings2Icon } from '@lucide/vue'
import { computed } from 'vue'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import type { AnyTable } from './types'
import { getHideableColumns } from './types'

/**
 * Menu memilih kolom mana yang terlihat.
 *
 * Yang ditawarkan cuma kolom beraksesor. Kolom tampilan — kotak centang
 * pemilih baris, tombol aksi di ujung kanan — tidak punya judul yang bisa
 * dibaca dan menyembunyikannya membuat tabelnya tidak bisa dipakai lagi.
 */
const props = defineProps<{
  /** TanStack table instance whose hideable columns are listed. */
  table: AnyTable
  /** Readable titles per column, keyed by id; without it, the id is used. */
  labels?: Record<string, string>
  class?: HTMLAttributes['class']
}>()

const columns = computed(() => getHideableColumns(props.table))

function getLabel(id: string) {
  return props.labels?.[id] ?? id
}

function isVisible(id: string) {
  return props.table.getColumn(id)?.getIsVisible?.() ?? true
}

function toggle(id: string, value: boolean) {
  props.table.getColumn(id)?.toggleVisibility?.(value)
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        :class="cn('ml-auto h-8', props.class)"
        data-slot="data-table-view-options"
        size="sm"
        variant="outline"
      >
        <Settings2Icon /> View
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end" class="w-44">
      <DropdownMenuLabel>Columns</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuCheckboxItem
        v-for="k in columns"
        :key="k.id"
        class="capitalize"
        :model-value="isVisible(k.id)"
        @update:model-value="toggle(k.id, $event)"
      >
        {{ getLabel(k.id) }}
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
