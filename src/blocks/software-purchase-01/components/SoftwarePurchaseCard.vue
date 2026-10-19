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
  softwareName?: string
  startDate?: string
  seats?: number
  pricingType?: "per-seat" | "flat-rate" | "usage-based"
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
  approve: []
  discard: []
}>()

const pricingTypeLabel = computed(() => ({
  "per-seat": "Per Seat",
  "flat-rate": "Flat Rate",
  "usage-based": "Usage Based",
})[props.pricingType])

// timeZone UTC keeps the SSR and client output identical for a date-only string.
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
