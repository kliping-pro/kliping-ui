<script setup lang="ts">
import type { AnyTable } from './types'
import type { Component, HTMLAttributes } from 'vue'
import { CheckIcon, PlusCircleIcon } from '@lucide/vue'
import { computed } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

export interface FilterOption {
  label: string
  value: string
  icon?: Component
}

/**
 * Saringan pilihan ganda dengan hitungan di sebelah tiap pilihan.
 *
 * Hitungannya dari `getFacetedUniqueValues`, yang menghitung dari baris yang
 * sudah lolos saringan lain — jadi angka nol berarti benar-benar tidak ada
 * yang akan muncul kalau pilihan itu ditambahkan, bukan sekadar tidak ada di
 * seluruh data.
 */
const props = defineProps<{
  /** TanStack table instance that owns the filtered column. */
  table: AnyTable
  /** Id of the column whose filter value this control sets. */
  column: string
  /** Label of the filter trigger button and search placeholder. */
  title: string
  /** Selectable values, each with a label and optional icon; counts come from faceted values. */
  options: FilterOption[]
  class?: HTMLAttributes['class']
}>()

const column = computed(() => props.table.getColumn(props.column))

const selected = computed(() => new Set((column.value?.getFilterValue?.() as string[]) ?? []))
const counts = computed(() => column.value?.getFacetedUniqueValues?.() ?? new Map<unknown, number>())

function toggle(value: string) {
  const next = new Set(selected.value)
  if (next.has(value)) next.delete(value)
  else next.add(value)

  // Himpunan kosong dikirim sebagai `undefined`, bukan sebagai larik kosong.
  // Larik kosong tetap terhitung sebagai saringan aktif, dan tombol "hapus
  // saringan" akan tetap tergambar setelah pilihan terakhir dilepas.
  column.value?.setFilterValue?.(next.size ? [...next] : undefined)
}
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        :class="cn('h-8 border-dashed', props.class)"
        data-slot="data-table-faceted-filter"
        size="sm"
        variant="outline"
      >
        <PlusCircleIcon /> {{ props.title }}
        <template v-if="selected.size">
          <Separator class="mx-0.5 h-4" orientation="vertical" />
          <Badge class="rounded-sm px-1 font-normal lg:hidden" variant="secondary">
            {{ selected.size }}
          </Badge>
          <span class="hidden gap-1 lg:flex">
            <Badge v-if="selected.size > 2" class="rounded-sm px-1 font-normal" variant="secondary">
              {{ selected.size }} selected
            </Badge>
            <template v-else>
              <Badge
                v-for="p in props.options.filter(o => selected.has(o.value))"
                :key="p.value"
                class="rounded-sm px-1 font-normal"
                variant="secondary"
              >
                {{ p.label }}
              </Badge>
            </template>
          </span>
        </template>
      </Button>
    </PopoverTrigger>

    <PopoverContent align="start" class="w-52 p-0">
      <Command>
        <CommandInput :placeholder="props.title" />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              v-for="p in props.options"
              :key="p.value"
              :value="p.value"
              @select="toggle(p.value)"
            >
              <span
                class="flex size-4 items-center justify-center rounded-[4px] border"
                :class="selected.has(p.value) ? 'border-primary bg-primary text-primary-foreground' : 'border-input'"
              >
                <CheckIcon v-if="selected.has(p.value)" class="size-3" />
              </span>
              <component :is="p.icon" v-if="p.icon" class="size-4 text-muted-foreground" />
              <span>{{ p.label }}</span>
              <span v-if="counts.get(p.value)" class="ml-auto font-mono text-muted-foreground text-xs">
                {{ counts.get(p.value) }}
              </span>
            </CommandItem>
          </CommandGroup>

          <template v-if="selected.size">
            <CommandSeparator />
            <CommandGroup>
              <CommandItem class="justify-center" value="__clear" @select="column?.setFilterValue?.(undefined)">
                Clear filters
              </CommandItem>
            </CommandGroup>
          </template>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
