<script setup lang="ts">
import { ReceiptTextIcon } from '@lucide/vue'

export interface InvoiceLine {
  label: string
  amount: number
}

const props = defineProps<{
  date: string
  lines: InvoiceLine[]
  cancelled?: boolean
}>()

const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

function total() {
  return props.lines.reduce((sum, l) => sum + l.amount, 0)
}
</script>

<template>
  <section class="bg-card text-card-foreground flex flex-col rounded-lg border">
    <div class="flex h-12 items-center gap-3 border-b px-5">
      <ReceiptTextIcon class="text-muted-foreground size-4" />
      <h3 class="text-sm font-medium">
        Next invoice
      </h3>
    </div>
    <div v-if="cancelled" class="text-muted-foreground flex flex-1 items-center p-5 text-sm">
      No upcoming invoices. Your plan ends on {{ date }}.
    </div>
    <div v-else class="flex flex-1 flex-col p-5">
      <p class="text-3xl font-semibold tracking-tight tabular-nums">
        {{ usd.format(total()) }}
      </p>
      <p class="text-muted-foreground text-sm">
        Due {{ date }}
      </p>
      <dl class="mt-4 space-y-2 border-t pt-4 text-sm">
        <div
          v-for="line in lines"
          :key="line.label"
          class="flex items-center justify-between gap-4"
        >
          <dt class="text-muted-foreground">
            {{ line.label }}
          </dt>
          <dd :class="['tabular-nums', line.amount < 0 && 'text-primary']">
            {{ line.amount < 0 ? '−' : '' }}{{ usd.format(Math.abs(line.amount)) }}
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>
