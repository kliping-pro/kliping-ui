<script lang="ts">
export const description = "Riwayat transaksi per bulan dengan ikon tren naik/turun dan date picker."
</script>

<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import type { DateValue } from '@internationalized/date'
import { CalendarDate, getLocalTimeZone } from '@internationalized/date'
import { CalendarIcon, ChevronDownIcon, ChevronUpIcon, ClockIcon } from '@lucide/vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

type Status = "increasing" | "decreasing" | "pending"

const DATA: Record<string, { name: string, date: string, value: number, status: Status }[]> = {
  "March 2023": [
    {
      name: "Netflix",
      date: "27 March 2026, at 12:30 PM",
      value: 2500,
      status: "decreasing",
    },
    {
      name: "Apple",
      date: "27 March 2026, at 04:30 AM",
      value: 2000,
      status: "increasing",
    },
  ],
  "February 2023": [
    {
      name: "Stripe",
      date: "26 March 2026, at 13:45 PM",
      value: 2500,
      status: "decreasing",
    },
    {
      name: "HubSpot",
      date: "26 March 2023, at 12:30 PM",
      value: 750,
      status: "increasing",
    },
    {
      name: "Figma",
      date: "26 March 2023, at 08:30 AM",
      value: 1400,
      status: "increasing",
    },
    {
      name: "Webflow",
      date: "26 March 2023, at 05:00 AM",
      value: 0,
      status: "pending",
    },
  ],
}

const ICONS = {
  increasing: ChevronUpIcon,
  decreasing: ChevronDownIcon,
  pending: ClockIcon,
}

const COLORS = {
  increasing: "text-green-700 dark:text-green-500",
  decreasing: "text-red-600",
  pending: "text-muted-foreground",
}

const ICON_COLORS = {
  increasing: "text-green-600",
  decreasing: "text-red-600",
  pending: "text-black dark:text-white",
}

const PREFIX = {
  increasing: "+",
  decreasing: "-",
  pending: "",
}

const date = ref(new CalendarDate(2024, 10, 10)) as Ref<DateValue>

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

// Setara `format(date, "PPP")` dari date-fns, mis. "October 10th, 2024".
const formatPPP = (value: DateValue) => {
  const d = value.toDate(getLocalTimeZone())
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(d)
  const day = d.getDate()
  const suffix = day % 100 >= 11 && day % 100 <= 13
    ? 'th'
    : ({ 1: 'st', 2: 'nd', 3: 'rd' } as Record<number, string>)[day % 10] ?? 'th'
  return `${month} ${day}${suffix}, ${d.getFullYear()}`
}
</script>

<template>
  <div class="mx-auto max-w-xl p-6">
    <div class="dark:bg-card rounded-xl border bg-white p-6 shadow-sm">
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 class="font-semibold">History Transactions</h2>
          <p class="text-muted-foreground text-sm">
            Track and monitor your financial activity.
          </p>
        </div>
        <Popover>
          <PopoverTrigger as-child>
            <Button
              variant="outline"
              :class="cn(
                'w-full justify-start text-left font-normal sm:w-48',
                !date && 'text-muted-foreground',
              )"
            >
              <CalendarIcon class="mr-2 h-4 w-4" />
              <template v-if="date">{{ formatPPP(date) }}</template>
              <span v-else>Pick a date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-auto p-0" align="start">
            <Calendar
              v-model="date"
              prevent-deselect
              initial-focus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div class="mt-6">
        <div v-for="(month, key) in Object.keys(DATA)" :key="key" class="mb-6 last:mb-0">
          <p class="text-muted-foreground mb-2 ml-2.5 font-semibold">
            {{ month }}
          </p>
          <div class="space-y-2">
            <div
              v-for="{ name, value, date: when, status } in DATA[month]"
              :key="name"
              class="flex items-center gap-4 rounded-lg border p-4"
            >
              <div class="bg-card text-card-foreground hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl border shadow-sm sm:flex">
                <component
                  :is="ICONS[status]"
                  :class="cn('h-5 w-5', ICON_COLORS[status])"
                />
              </div>
              <div class="mx-0 space-y-0.5 sm:mx-2">
                <p class="font-semibold">{{ name }}</p>
                <p class="text-muted-foreground text-sm">
                  {{ when }}
                </p>
              </div>
              <p
                :class="cn(
                  'mx-2 ml-auto text-sm font-semibold',
                  COLORS[status],
                )"
              >
                {{ PREFIX[status] }} {{ value ? currency.format(value) : "Pending" }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
