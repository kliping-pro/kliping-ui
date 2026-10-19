<script lang="ts">
export const description = "Kerapatan barisnya bisa diatur — rapat, sedang, atau longgar."
</script>

<script setup lang="ts">
import type { RowSelectionState } from '@tanstack/vue-table'
import type { Payment } from '@/variants/table/components/payments'
import { FlexRender, useTable } from '@tanstack/vue-table'
import { MoreHorizontal, Rows2, Rows3, Rows4 } from '@lucide/vue'
import { createReusableTemplate } from '@vueuse/core'
import { h, ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { createColumns, data, features } from '@/variants/table/components/payments'

const density = ref<string>()

const DENSITY_CLASSES: Record<string, string> = {
  compact: '[&_td]:py-px [&_th]:py-px',
  standard: '[&_td]:py-1 [&_th]:py-1',
  flexible: '[&_td]:py-2 [&_th]:py-1',
}

const [DefineActions, ReuseActions] = createReusableTemplate<{ payment: Payment }>()

const columns = createColumns(payment => h(ReuseActions, { payment }))

const rowSelection = ref<RowSelectionState>({})

const table = useTable({
  features,
  data,
  columns,
  state: {
    get rowSelection() { return rowSelection.value },
  },
  onRowSelectionChange: (updater) => {
    rowSelection.value = typeof updater === 'function' ? updater(rowSelection.value) : updater
  },
})

function copyId(id: string) {
  navigator.clipboard.writeText(id)
}
</script>

<template>
  <DefineActions v-slot="{ payment }">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button class="h-8 w-8 p-0" variant="ghost">
          <span class="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem @click="copyId(payment.id)">
          Copy payment ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View customer</DropdownMenuItem>
        <DropdownMenuItem>View payment details</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </DefineActions>

  <div class="w-full">
    <div class="flex items-center gap-2 py-4">
      <Input
        class="max-w-sm"
        :model-value="table.getColumn('email')?.getFilterValue() as string"
        placeholder="Filter emails..."
        @update:model-value="table.getColumn('email')?.setFilterValue($event)"
      />
      <Select v-model="density">
        <SelectTrigger class="ml-auto w-[180px]">
          <SelectValue placeholder="Density" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Density</SelectLabel>
            <SelectItem value="compact">
              <div class="flex items-center gap-2">
                <Rows4 class="h-4 w-4" /> Compact
              </div>
            </SelectItem>
            <SelectItem value="standard">
              <div class="flex items-center gap-2">
                <Rows3 class="h-4 w-4" /> Standard
              </div>
            </SelectItem>
            <SelectItem value="flexible">
              <div class="flex items-center gap-2">
                <Rows2 class="h-4 w-4" /> Flexible
              </div>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

    <div class="rounded-md border">
      <Table :class="cn(density && DENSITY_CLASSES[density])">
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender v-if="!header.isPlaceholder" :header="header" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            :data-state="row.getIsSelected() && 'selected'"
          >
            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender :cell="cell" />
            </TableCell>
          </TableRow>
          <TableRow v-if="!table.getRowModel().rows.length">
            <TableCell class="h-24 text-center" :colspan="columns.length">
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <div class="flex items-center justify-end space-x-2 py-4">
      <div class="flex-1 text-muted-foreground text-sm">
        {{ table.getFilteredSelectedRowModel().rows.length }} of
        {{ table.getFilteredRowModel().rows.length }} row(s) selected.
      </div>
      <div class="space-x-2">
        <Button
          :disabled="!table.getCanPreviousPage()"
          size="sm"
          variant="outline"
          @click="table.previousPage()"
        >
          Previous
        </Button>
        <Button
          :disabled="!table.getCanNextPage()"
          size="sm"
          variant="outline"
          @click="table.nextPage()"
        >
          Next
        </Button>
      </div>
    </div>
  </div>
</template>
