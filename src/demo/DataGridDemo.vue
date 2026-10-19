<script setup lang="ts">
import type { DataGridColumn } from '@/components/data-grid'
import { ref } from 'vue'
import { DataGrid, DataGridCell } from '@/components/data-grid'

const columns: DataGridColumn[] = [
  { id: 'sku', title: 'SKU', width: 96, editable: false },
  { id: 'name', title: 'Item name' },
  { id: 'unit', title: 'Unit', width: 88 },
  { id: 'quantity', title: 'Quantity', width: 88, align: 'right' },
  { id: 'price', title: 'Price', width: 120, align: 'right' },
]

const data = ref([
  { sku: 'ITM-001', name: 'A4 paper, 80gsm', unit: 'ream', quantity: '12', price: '4.50' },
  { sku: 'ITM-002', name: 'Black printer ink', unit: 'bottle', quantity: '6', price: '18.90' },
  { sku: 'ITM-003', name: 'Plastic folder', unit: 'dozen', quantity: '20', price: '6.20' },
  { sku: 'ITM-004', name: 'Blue pen', unit: 'box', quantity: '15', price: '5.75' },
  { sku: 'ITM-005', name: 'Large stapler', unit: 'each', quantity: '4', price: '14.00' },
  { sku: 'ITM-006', name: 'Receipt paper', unit: 'roll', quantity: '30', price: '1.80' },
  { sku: 'ITM-007', name: 'Brown envelope', unit: 'pack', quantity: '10', price: '3.99' },
  { sku: 'ITM-008', name: 'Whiteboard marker', unit: 'box', quantity: '8', price: '8.40' },
])

const lastChange = ref<string>()

function logChange(row: number, columnId: string, value: string) {
  lastChange.value = `row ${row + 1}, ${columnId} → ${value || '(empty)'}`
}
</script>

<template>
  <div class="flex w-full flex-col gap-3">
    <DataGrid v-slot="{ row }" v-model="data" :columns="columns" @change="logChange">
      <DataGridCell v-for="(column, i) in columns" :key="column.id" :row="row" :column="i" />
    </DataGrid>

    <p class="text-muted-foreground text-sm">
      Click a cell, then use the arrow keys to move. Enter or F2 starts editing,
      typing a letter replaces the contents, Escape cancels, and Delete clears.
      Shift with the arrow keys selects several cells; Ctrl+C copies them in a
      form you can paste into Excel, and Ctrl+V pastes them back.
      The <b>SKU</b> column is intentionally read-only.
    </p>

    <p v-if="lastChange" class="text-muted-foreground text-sm">
      Last change: <code>{{ lastChange }}</code>
    </p>
  </div>
</template>
