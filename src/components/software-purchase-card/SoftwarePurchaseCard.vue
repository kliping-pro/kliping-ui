<script setup lang="ts">
import { computed } from 'vue'
import { CalendarIcon, CreditCardIcon, DollarSignIcon, UsersIcon } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export interface SoftwarePurchaseCardProps {
  /** Product name shown as the card title. */
  softwareName?: string
  /** Start date as an ISO date string, shown in long US format. */
  startDate?: string
  /** Number of seats, shown as "N users". */
  seats?: number
  /** Pricing model shown in the badge: per-seat, flat-rate, or usage-based. */
  pricingType?: "per-seat" | "flat-rate" | "usage-based"
  /** Preformatted price text; labeled "Monthly Cost" for per-seat, otherwise "Price". */
  price?: string
}

const props = withDefaults(defineProps<SoftwarePurchaseCardProps>(), {
  softwareName: "Enterprise Cloud Suite",
  startDate: "2025-01-15",
  seats: 50,
  pricingType: "per-seat",
  price: "$2,500",
})

const emit = defineEmits<{
  /** The approve button was clicked. */
  approve: []
  /** The discard button was clicked. */
  discard: []
}>()

const pricingTypeLabel = computed(() => ({
  "per-seat": "Per Seat",
  "flat-rate": "Flat Rate",
  "usage-based": "Usage Based",
})[props.pricingType])

// Zona waktu UTC: tanggal tanpa jam diurai sebagai tengah malam UTC, dan
// tanpa ini server dan peramban di zona barat menampilkan hari yang berbeda.
const formattedStartDate = computed(() =>
  new Date(props.startDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }),
)
</script>

<template>
  <Card class="w-full max-w-md">
    <CardHeader>
      <CardTitle class="flex items-center justify-between">
        {{ softwareName }}
        <Badge variant="secondary">{{ pricingTypeLabel }}</Badge>
      </CardTitle>
    </CardHeader>
    <CardContent class="flex flex-col gap-4">
      <div class="flex items-center gap-3 text-sm">
        <CalendarIcon class="text-muted-foreground size-4" />
        <div class="flex flex-col gap-0.5">
          <span class="text-muted-foreground text-xs">Start Date</span>
          <span class="font-medium">
            {{ formattedStartDate }}
          </span>
        </div>
      </div>

      <div class="flex items-center gap-3 text-sm">
        <UsersIcon class="text-muted-foreground size-4" />
        <div class="flex flex-col gap-0.5">
          <span class="text-muted-foreground text-xs">Seats</span>
          <span class="font-medium">{{ seats }} users</span>
        </div>
      </div>

      <div class="flex items-center gap-3 text-sm">
        <CreditCardIcon class="text-muted-foreground size-4" />
        <div class="flex flex-col gap-0.5">
          <span class="text-muted-foreground text-xs">Pricing Type</span>
          <span class="font-medium">{{ pricingTypeLabel }}</span>
        </div>
      </div>

      <div class="flex items-center gap-3 text-sm">
        <DollarSignIcon class="text-muted-foreground size-4" />
        <div class="flex flex-col gap-0.5">
          <span class="text-muted-foreground text-xs">
            {{ pricingType === "per-seat" ? "Monthly Cost" : "Price" }}
          </span>
          <span class="text-lg font-semibold">{{ price }}</span>
        </div>
      </div>
    </CardContent>
    <CardFooter class="flex gap-3">
      <Button variant="outline" class="flex-1" @click="emit('discard')">
        Discard
      </Button>
      <Button class="flex-1" @click="emit('approve')">
        Approve
      </Button>
    </CardFooter>
  </Card>
</template>
