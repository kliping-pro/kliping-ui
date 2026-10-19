<script lang="ts">
export const description = "Keadaan kosong berbingkai putus-putus."
</script>

<script setup lang="ts">
import { ImportIcon, PlusIcon, Receipt } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from "@/lib/utils"
</script>

<template>
  <div class="px-6 py-10">
    <div
      :class="cn(
        'mx-auto max-w-2xl rounded-xl border bg-muted/50 p-1.5',
        'not-dark:*:data-[slot=table-container]:shadow/3 dark:*:data-[slot=table-container]:shadow/50 *:data-[slot=table-container]:rounded-lg *:data-[slot=table-container]:border *:data-[slot=table-container]:bg-background dark:*:data-[slot=table-container]:border-foreground/12'
      )"
    >
      <Table>
        <TableHeader>
          <TableRow class="bg-muted/50 *:px-3 sm:*:px-4">
            <TableHead class="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead class="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow class="rounded-b-lg">
            <TableCell class="font-medium" :colspan="4">
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <Receipt />
                  </EmptyMedia>
                  <EmptyTitle>No Invoices Yet</EmptyTitle>
                  <EmptyDescription>
                    You haven't created any invoices yet. Get started by
                    creating your first invoice.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <div class="flex flex-wrap gap-2 *:mx-auto">
                    <Button>
                      <PlusIcon /> Create Invoice
                    </Button>
                    <Button variant="outline">
                      <ImportIcon /> Import Invoice
                    </Button>
                  </div>
                </EmptyContent>
              </Empty>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
