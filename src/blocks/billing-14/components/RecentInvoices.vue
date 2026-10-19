<script setup lang="ts">
import { ArrowRightIcon, DownloadIcon } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const INVOICES = [
  { id: "INV-2026-0148", date: "Oct 1, 2026", amount: "$1,240.00", status: "Open" },
  { id: "INV-2026-0139", date: "Sep 1, 2026", amount: "$1,186.50", status: "Paid" },
  { id: "INV-2026-0127", date: "Aug 1, 2026", amount: "$1,112.00", status: "Paid" },
  { id: "INV-2026-0112", date: "Jul 1, 2026", amount: "$1,098.00", status: "Paid" },
]
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Recent invoices</CardTitle>
      <CardDescription>Your last four billing periods.</CardDescription>
      <CardAction>
        <Button variant="ghost" size="sm">
          View all
          <ArrowRightIcon />
        </Button>
      </CardAction>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead class="hidden sm:table-cell">Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead class="text-right">Amount</TableHead>
            <TableHead class="hidden w-10 sm:table-cell"><span class="sr-only">Download</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="invoice in INVOICES" :key="invoice.id">
            <TableCell>
              <p class="font-medium">{{ invoice.id }}</p>
              <p class="text-muted-foreground text-xs sm:hidden">{{ invoice.date }}</p>
            </TableCell>
            <TableCell class="text-muted-foreground hidden sm:table-cell">{{ invoice.date }}</TableCell>
            <TableCell>
              <Badge
                variant="outline"
                :class="invoice.status === 'Paid' ? 'border-transparent bg-primary/10 text-primary' : 'text-muted-foreground'"
              >
                {{ invoice.status }}
              </Badge>
            </TableCell>
            <TableCell class="text-right font-medium tabular-nums">{{ invoice.amount }}</TableCell>
            <TableCell class="hidden sm:table-cell">
              <Button variant="ghost" size="icon" class="size-8" :aria-label="`Download ${invoice.id}`">
                <DownloadIcon />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</template>
