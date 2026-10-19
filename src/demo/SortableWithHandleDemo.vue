<!-- example: 2. With Handle -->
<script setup lang="ts">
import { ref } from 'vue'
import {
  Sortable,
  SortableContent,
  SortableItem,
  SortableItemHandle,
} from '@/components/sortable'
import { Table, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const tricks = ref([
  { id: '1', title: 'The 900', difficulty: 'Expert', points: 9000 },
  { id: '2', title: 'Indy Backflip', difficulty: 'Advanced', points: 4000 },
  { id: '3', title: 'Pizza Guy', difficulty: 'Intermediate', points: 1500 },
  { id: '4', title: '360 Varial McTwist', difficulty: 'Expert', points: 5000 },
])
</script>

<template>
  <Sortable v-model="tricks" class="w-full">
    <Table class="w-full">
      <TableHeader>
        <TableRow class="bg-accent/50">
          <TableHead class="w-[50px]">
            <span class="sr-only">Reorder</span>
          </TableHead>
          <TableHead>Trick</TableHead>
          <TableHead>Difficulty</TableHead>
          <TableHead class="text-right">
            Points
          </TableHead>
        </TableRow>
      </TableHeader>
      <!-- Wadah sortable dirender sebagai <tbody>; tata letak flex bawaannya
           ditimpa supaya tetap baris tabel. -->
      <SortableContent as="tbody" class="table-row-group">
        <SortableItem
          v-for="trick in tricks"
          :key="trick.id"
          as="tr"
          class="table-row border-b bg-background transition-colors hover:bg-muted/50"
          :value="trick.id"
        >
          <TableCell class="w-[50px]">
            <SortableItemHandle class="size-8" />
          </TableCell>
          <TableCell class="font-medium">
            {{ trick.title }}
          </TableCell>
          <TableCell class="text-muted-foreground">
            {{ trick.difficulty }}
          </TableCell>
          <TableCell class="text-right text-muted-foreground">
            {{ trick.points }}
          </TableCell>
        </SortableItem>
      </SortableContent>
    </Table>
  </Sortable>
</template>
