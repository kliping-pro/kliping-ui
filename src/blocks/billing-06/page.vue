<script lang="ts">
export const description = "Riwayat invoice dalam tabel dengan ringkasan saldo, filter status, lencana Paid/Open/Overdue, tombol unduh, dan paginasi."
</script>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  CircleAlertIcon,
  CircleCheckIcon,
  CheckIcon,
  ClockIcon,
  DownloadIcon,
  FileTextIcon,
  SearchIcon,
} from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type Status = "paid" | "open" | "overdue"

interface Invoice {
  id: string
  period: string
  issued: string
  due: string
  amount: number
  status: Status
}

const INVOICES: Invoice[] = [
  { id: "INV-2026-0148", period: "Pro plan · Oct 2026", issued: "Oct 1, 2026", due: "Oct 15, 2026", amount: 1240, status: "open" },
  { id: "INV-2026-0139", period: "Pro plan · Sep 2026", issued: "Sep 1, 2026", due: "Sep 15, 2026", amount: 1186.5, status: "overdue" },
  { id: "INV-2026-0127", period: "Pro plan · Aug 2026", issued: "Aug 1, 2026", due: "Aug 15, 2026", amount: 1112, status: "paid" },
  { id: "INV-2026-0118", period: "Extra seats · Jul 2026", issued: "Jul 18, 2026", due: "Aug 1, 2026", amount: 180, status: "paid" },
  { id: "INV-2026-0112", period: "Pro plan · Jul 2026", issued: "Jul 1, 2026", due: "Jul 15, 2026", amount: 1098, status: "paid" },
  { id: "INV-2026-0101", period: "Pro plan · Jun 2026", issued: "Jun 1, 2026", due: "Jun 15, 2026", amount: 1064.25, status: "paid" },
  { id: "INV-2026-0093", period: "Pro plan · May 2026", issued: "May 1, 2026", due: "May 15, 2026", amount: 1020, status: "paid" },
  { id: "INV-2026-0087", period: "Storage add-on · Apr 2026", issued: "Apr 22, 2026", due: "May 6, 2026", amount: 60, status: "paid" },
  { id: "INV-2026-0080", period: "Pro plan · Apr 2026", issued: "Apr 1, 2026", due: "Apr 15, 2026", amount: 980, status: "paid" },
  { id: "INV-2026-0071", period: "Pro plan · Mar 2026", issued: "Mar 1, 2026", due: "Mar 15, 2026", amount: 960, status: "paid" },
  { id: "INV-2026-0064", period: "Pro plan · Feb 2026", issued: "Feb 1, 2026", due: "Feb 15, 2026", amount: 940, status: "paid" },
  { id: "INV-2026-0052", period: "Pro plan · Jan 2026", issued: "Jan 1, 2026", due: "Jan 15, 2026", amount: 920, status: "paid" },
]

const STATUS = {
  paid: {
    label: "Paid",
    icon: CircleCheckIcon,
    class: "border-transparent bg-primary/10 text-primary",
  },
  open: {
    label: "Open",
    icon: ClockIcon,
    class: "text-muted-foreground",
  },
  overdue: {
    label: "Overdue",
    icon: CircleAlertIcon,
    class: "border-transparent bg-destructive/10 text-red-700 dark:text-destructive",
  },
} satisfies Record<Status, { label: string, icon: unknown, class: string }>

const PER_PAGE = 5

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

const query = ref("")
const status = ref<"all" | Status>("all")
const page = ref(1)
const downloaded = ref<string[]>([])

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return INVOICES.filter(invoice =>
    (status.value === "all" || invoice.status === status.value)
    && (!q || `${invoice.id} ${invoice.period}`.toLowerCase().includes(q)),
  )
})

const visible = computed(() =>
  filtered.value.slice((page.value - 1) * PER_PAGE, page.value * PER_PAGE),
)

watch([query, status], () => {
  page.value = 1
})

const outstanding = computed(() =>
  INVOICES.filter(i => i.status !== "paid").reduce((sum, i) => sum + i.amount, 0),
)
const paidThisYear = computed(() =>
  INVOICES.filter(i => i.status === "paid").reduce((sum, i) => sum + i.amount, 0),
)

const summary = computed(() => [
  { label: "Outstanding", value: currency.format(outstanding.value), hint: "2 invoices awaiting payment" },
  { label: "Paid in 2026", value: currency.format(paidThisYear.value), hint: "10 invoices settled" },
  { label: "Next invoice", value: "Nov 1, 2026", hint: "Estimated $1,240.00" },
])

function download(id: string) {
  if (!downloaded.value.includes(id))
    downloaded.value = [...downloaded.value, id]
}
</script>

<template>
  <div class="mx-auto max-w-5xl p-4 sm:p-6">
    <div class="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
      <div
        v-for="item in summary"
        :key="item.label"
        class="bg-card rounded-lg border p-4 last:col-span-2 sm:last:col-span-1"
      >
        <p class="text-muted-foreground text-sm">{{ item.label }}</p>
        <p class="mt-1 text-xl font-semibold tracking-tight tabular-nums sm:text-2xl">
          {{ item.value }}
        </p>
        <p class="text-muted-foreground mt-1 text-xs">{{ item.hint }}</p>
      </div>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Invoice history</CardTitle>
        <CardDescription>
          Download past invoices and keep track of what is still due.
        </CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            <DownloadIcon />
            <span class="hidden sm:inline">Download all</span>
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent class="space-y-4">
        <div class="flex flex-col gap-3 sm:flex-row">
          <InputGroup class="sm:max-w-xs">
            <InputGroupInput v-model="query" placeholder="Search invoices" aria-label="Search invoices" />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
          <Select v-model="status">
            <SelectTrigger class="w-full sm:w-40" aria-label="Filter by status">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div class="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader class="bg-muted/50">
              <TableRow>
                <TableHead class="pl-4">Invoice</TableHead>
                <TableHead class="hidden md:table-cell">Issued</TableHead>
                <TableHead class="hidden lg:table-cell">Due</TableHead>
                <TableHead class="hidden sm:table-cell">Status</TableHead>
                <TableHead class="text-right">Amount</TableHead>
                <TableHead class="w-12 pr-4">
                  <span class="sr-only">Download</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="invoice in visible" :key="invoice.id">
                <TableCell class="pl-4">
                  <div class="flex items-center gap-3">
                    <div class="bg-muted text-muted-foreground hidden size-9 shrink-0 place-items-center rounded-md sm:grid">
                      <FileTextIcon class="size-4" />
                    </div>
                    <div class="min-w-0">
                      <p class="font-medium">{{ invoice.id }}</p>
                      <p class="text-muted-foreground truncate text-xs">
                        {{ invoice.period }}
                      </p>
                      <Badge variant="outline" :class="['mt-1.5 sm:hidden', STATUS[invoice.status].class]">
                        <component :is="STATUS[invoice.status].icon" />
                        {{ STATUS[invoice.status].label }}
                      </Badge>
                    </div>
                  </div>
                </TableCell>
                <TableCell class="text-muted-foreground hidden md:table-cell">
                  {{ invoice.issued }}
                </TableCell>
                <TableCell class="text-muted-foreground hidden lg:table-cell">
                  {{ invoice.due }}
                </TableCell>
                <TableCell class="hidden sm:table-cell">
                  <Badge variant="outline" :class="STATUS[invoice.status].class">
                    <component :is="STATUS[invoice.status].icon" />
                    {{ STATUS[invoice.status].label }}
                  </Badge>
                </TableCell>
                <TableCell class="text-right font-medium tabular-nums">
                  {{ currency.format(invoice.amount) }}
                </TableCell>
                <TableCell class="pr-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    class="size-8"
                    :aria-label="`Download ${invoice.id}`"
                    @click="download(invoice.id)"
                  >
                    <CheckIcon v-if="downloaded.includes(invoice.id)" class="text-primary" />
                    <DownloadIcon v-else />
                  </Button>
                </TableCell>
              </TableRow>
              <TableEmpty v-if="visible.length === 0" :colspan="6">
                No invoices match your filters.
              </TableEmpty>
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <CardFooter class="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <p class="text-muted-foreground text-sm">
          Showing
          <span class="text-foreground font-medium">{{ visible.length }}</span>
          of
          <span class="text-foreground font-medium">{{ filtered.length }}</span>
          invoices
        </p>
        <Pagination
          v-if="filtered.length > PER_PAGE"
          v-slot="{ page: current }"
          v-model:page="page"
          :items-per-page="PER_PAGE"
          :total="filtered.length"
          :sibling-count="1"
          class="mx-0 w-auto"
        >
          <PaginationContent v-slot="{ items }">
            <PaginationPrevious />
            <template v-for="(item, index) in items" :key="index">
              <PaginationItem
                v-if="item.type === 'page'"
                :value="item.value"
                :is-active="item.value === current"
              >
                {{ item.value }}
              </PaginationItem>
              <PaginationEllipsis v-else :index="index" />
            </template>
            <PaginationNext />
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  </div>
</template>
