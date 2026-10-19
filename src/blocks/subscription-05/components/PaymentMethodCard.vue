<script setup lang="ts">
import { CreditCardIcon, MailIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'

defineProps<{
  brand: string
  last4: string
  expires: string
  email: string
  address: string
}>()
</script>

<template>
  <section class="bg-card text-card-foreground flex flex-col rounded-lg border">
    <div class="flex h-12 items-center justify-between gap-3 border-b px-5">
      <div class="flex items-center gap-3">
        <CreditCardIcon class="text-muted-foreground size-4" />
        <h3 class="text-sm font-medium">
          Payment method
        </h3>
      </div>
      <Button variant="ghost" size="sm" class="-mr-2">
        Update
      </Button>
    </div>
    <div class="flex flex-1 flex-col gap-4 p-5">
      <div class="flex items-center gap-4">
        <!-- Card face -->
        <div class="from-foreground/90 to-foreground/70 text-background relative flex h-14 w-22 shrink-0 flex-col justify-between rounded-md bg-linear-to-br p-2 shadow-sm">
          <div class="bg-background/40 h-2.5 w-4 rounded-[3px]" />
          <span class="text-[10px] font-semibold tracking-wider uppercase">{{ brand }}</span>
        </div>
        <div class="min-w-0">
          <p class="text-sm font-medium tabular-nums">
            {{ brand }} ···· {{ last4 }}
          </p>
          <p class="text-muted-foreground text-sm">
            Expires {{ expires }}
          </p>
        </div>
      </div>
      <dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
        <dt class="text-muted-foreground">
          Billing address
        </dt>
        <dd class="text-right">
          {{ address }}
        </dd>
        <dt class="text-muted-foreground">
          Auto-pay
        </dt>
        <dd class="text-right">
          On · charged on renewal
        </dd>
      </dl>
      <div class="text-muted-foreground mt-auto flex items-center gap-2 border-t pt-4 text-sm">
        <MailIcon class="size-4 shrink-0" />
        <span class="truncate">Receipts go to <span class="text-foreground">{{ email }}</span></span>
      </div>
    </div>
  </section>
</template>
