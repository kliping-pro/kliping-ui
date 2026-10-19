<script lang="ts">
export const description = "Halaman penagihan lengkap: ringkasan paket, cuplikan pemakaian, metode pembayaran, dan invoice terbaru dalam satu layar."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { InfoIcon, XIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import PaymentMethodCard from '@/blocks/billing-14/components/PaymentMethodCard.vue'
import PlanSummary from '@/blocks/billing-14/components/PlanSummary.vue'
import RecentInvoices from '@/blocks/billing-14/components/RecentInvoices.vue'
import UsageSnapshot from '@/blocks/billing-14/components/UsageSnapshot.vue'

const notice = ref(true)
</script>

<template>
  <div class="bg-background min-h-svh">
    <div class="mx-auto max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-muted-foreground text-sm">Settings / Rasa Studio</p>
          <h1 class="text-2xl font-semibold tracking-tight">Billing</h1>
        </div>
        <Tabs default-value="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div
        v-if="notice"
        class="bg-primary/5 border-primary/20 flex items-start gap-3 rounded-lg border p-4 text-sm"
      >
        <InfoIcon class="text-primary mt-0.5 size-4 shrink-0" />
        <p class="flex-1">
          You're using <span class="font-medium">85% of your API requests</span>.
          Upgrade before Oct 31 to avoid throttling.
        </p>
        <Button
          variant="ghost"
          size="icon"
          class="-my-1.5 size-7 shrink-0"
          aria-label="Dismiss"
          @click="notice = false"
        >
          <XIcon />
        </Button>
      </div>

      <div class="grid gap-6 lg:grid-cols-3">
        <div class="space-y-6 lg:col-span-2">
          <PlanSummary />
          <UsageSnapshot />
        </div>
        <PaymentMethodCard class="self-start" />
      </div>

      <RecentInvoices />
    </div>
  </div>
</template>
