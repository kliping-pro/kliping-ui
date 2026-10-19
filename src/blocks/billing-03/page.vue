<script lang="ts">
export const description = "Daftar invoice dengan lencana status jatuh tempo, nominal, dan tombol unduh."
</script>

<script setup lang="ts">
import { DownloadIcon } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const DATA = [
  {
    name: "INV-24 #MS-415646",
    date: "October 15, 2024",
    amount: 2500,
    badge: "24 Days",
    isOverdue: false,
  },
  {
    name: "INV-23 #MS-415740",
    date: "October 10, 2024",
    amount: 1750,
    badge: "20 Days",
    isOverdue: false,
  },
  {
    name: "INV-22 #MS-946285",
    date: "September 15, 2024",
    amount: 1500,
    badge: "18 Days",
    isOverdue: false,
  },
  {
    name: "INV-21 #MS-739734",
    date: "September 10, 2024",
    amount: 2990,
    badge: "3 Days Overdue",
    isOverdue: true,
  },
  {
    name: "INV-20 #MS-848649",
    date: "August 15, 2024",
    amount: 3500,
    badge: "3 Days Overdue",
    isOverdue: true,
  },
]

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})
</script>

<template>
  <div class="mx-auto max-w-xl p-6">
    <div class="dark:bg-card rounded-xl border bg-white p-6 shadow-sm">
      <div class="flex items-start justify-between gap-4">
        <div>
          <h2 class="font-semibold">Invoices</h2>
          <p class="text-muted-foreground text-sm">
            Track and monitor your financial activity.
          </p>
        </div>
        <Button size="sm" variant="outline">
          Export
        </Button>
      </div>
      <div class="mt-6">
        <div v-for="({ name, date, amount, badge, isOverdue }, index) in DATA" :key="name">
          <div class="flex flex-wrap items-center justify-between gap-6 py-6">
            <div class="basis-full space-y-0.5 sm:basis-auto">
              <p class="text-lg font-semibold">{{ name }}</p>
              <p class="text-muted-foreground text-sm">{{ date }}</p>
            </div>
            <Badge
              :variant="isOverdue ? 'destructive' : 'default'"
              :class="
                isOverdue
                  ? 'w-max sm:ml-auto'
                  : 'w-max bg-green-100 text-green-800 hover:bg-green-100 sm:ml-auto'
              "
            >
              {{ badge }}
            </Badge>
            <p class="text-end text-sm font-semibold">
              {{ currency.format(amount) }}
            </p>
            <Button aria-label="Download invoice" size="icon" variant="ghost" class="h-8 w-8">
              <DownloadIcon class="h-5 w-5" />

            </Button>
          </div>
          <Separator v-if="index < DATA.length - 1" />
        </div>
      </div>
    </div>
  </div>
</template>
