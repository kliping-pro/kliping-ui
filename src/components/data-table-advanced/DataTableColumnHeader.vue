<script setup lang="ts">
import type { AnyColumn } from './types'
import type { HTMLAttributes } from 'vue'
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon, EyeOffIcon } from '@lucide/vue'
import { computed } from 'vue'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

/**
 * Kepala kolom yang bisa diurutkan dan disembunyikan.
 *
 * Kolom yang tidak bisa diurutkan tetap menggambar judulnya, tanpa tombol.
 * Itu bukan penambal: judul yang hilang di kolom yang kebetulan tidak bisa
 * diurutkan membuat tabelnya terlihat rusak.
 *
 * Arah pengurutan ditandai panah, bukan segitiga kecil yang lazim dipakai
 * tabel. Panah naik berarti kecil ke besar dan itu terbaca tanpa perlu
 * dihafal.
 */
const props = defineProps<{
  /** TanStack column this header sorts and hides. */
  column: AnyColumn
  /** Header label text. */
  title: string
  class?: HTMLAttributes['class']
}>()

/** `getCanSort` only exists when `rowSortingFeature` is registered. */
const canSort = computed(() => props.column.getCanSort?.() ?? false)
const canHide = computed(() => props.column.getCanHide?.() ?? false)

const direction = computed(() => props.column.getIsSorted?.() ?? false)

function sort(desc: boolean) {
  props.column.toggleSorting?.(desc)
}

function clearSort() {
  props.column.clearSorting?.()
}

function hide() {
  props.column.toggleVisibility?.(false)
}
</script>

<template>
  <div
    v-if="!canSort && !canHide"
    :class="cn('font-medium', props.class)"
    data-slot="data-table-column-header"
  >
    {{ props.title }}
  </div>

  <DropdownMenu v-else>
    <DropdownMenuTrigger as-child>
      <Button
        :class="cn('-ml-3 h-8 data-[state=open]:bg-accent', props.class)"
        data-slot="data-table-column-header"
        size="sm"
        variant="ghost"
      >
        <span>{{ props.title }}</span>
        <ArrowDownIcon v-if="direction === 'desc'" />
        <ArrowUpIcon v-else-if="direction === 'asc'" />
        <ChevronsUpDownIcon v-else />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="start">
      <template v-if="canSort">
        <DropdownMenuItem @click="sort(false)">
          <ArrowUpIcon class="text-muted-foreground/70" /> Asc
        </DropdownMenuItem>
        <DropdownMenuItem @click="sort(true)">
          <ArrowDownIcon class="text-muted-foreground/70" /> Desc
        </DropdownMenuItem>
        <DropdownMenuItem v-if="direction" @click="clearSort">
          <ChevronsUpDownIcon class="text-muted-foreground/70" /> Unsorted
        </DropdownMenuItem>
      </template>

      <DropdownMenuSeparator v-if="canSort && canHide" />

      <DropdownMenuItem v-if="canHide" @click="hide">
        <EyeOffIcon class="text-muted-foreground/70" /> Hide
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
