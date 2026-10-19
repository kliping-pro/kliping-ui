<script setup lang="ts">
/**
 * Kartu ringkasan dengan grafik area kecil di bawahnya.
 *
 * Sumbernya memakai Recharts. Di sini grafiknya digambar `@unovis/vue`, yang
 * sudah dipakai seluruh grafik di project ini — bukan pustaka kedua yang
 * ditambahkan cuma untuk satu kartu.
 *
 * Bedanya bukan sekadar nama: Recharts menyusun grafiknya dari komponen yang
 * saling mengabarkan lewat context, sedangkan Unovis menerima fungsi pengambil
 * nilai. Jadi `dataKey="subscription"` di sana jadi `:y="(d) => d.subscription"`
 * di sini — yang diserahkan bukan nama kolomnya, melainkan cara membacanya.
 */
import type { ChartConfig } from '@/components/ui/chart'
import type { HTMLAttributes } from 'vue'
import { VisArea, VisXYContainer } from '@unovis/vue'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ChartContainer } from '@/components/ui/chart'
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const data = [
  { month: 1, revenue: 10_400, subscription: 40 },
  { month: 2, revenue: 14_405, subscription: 90 },
  { month: 3, revenue: 9400, subscription: 200 },
  { month: 4, revenue: 8200, subscription: 278 },
  { month: 5, revenue: 7000, subscription: 89 },
  { month: 6, revenue: 9600, subscription: 239 },
  { month: 7, revenue: 11_244, subscription: 78 },
  { month: 8, revenue: 26_475, subscription: 89 },
]

type Data = typeof data[number]

const chartConfig = {
  revenue: { label: 'Revenue', color: 'var(--primary)' },
  subscription: { label: 'Subscriptions', color: 'var(--primary)' },
} satisfies ChartConfig
</script>

<template>
  <Card
    :class="cn(
      'overflow-hidden rounded-none rounded-tl-xl border-b-0 border-r-0 border-border/60 pb-0 shadow-none lg:hidden xl:flex',
      props.class,
    )"
  >
    <CardHeader>
      <CardTitle class="text-3xl">
        +2,350
      </CardTitle>
      <CardDescription>+180.1% from last month</CardDescription>
      <CardAction>
        <Button size="sm" variant="ghost">
          View More
        </Button>
      </CardAction>
    </CardHeader>
    <CardContent class="mt-auto flex-1 p-0">
      <ChartContainer class="size-full max-h-28" :config="chartConfig">
        <VisXYContainer :data="data" :margin="{ left: 0, right: 0 }">
          <VisArea
            :x="(d: Data) => d.month"
            :y="(d: Data) => d.subscription"
            :color="chartConfig.subscription.color"
            :opacity="0.05"
          />
        </VisXYContainer>
      </ChartContainer>
    </CardContent>
  </Card>
</template>
