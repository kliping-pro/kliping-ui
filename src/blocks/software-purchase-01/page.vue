<script lang="ts">
export const description = "Detail permintaan pembelian software dua kolom dengan card persetujuan Approve/Discard."
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import SoftwarePurchaseCard from '@/blocks/software-purchase-01/components/SoftwarePurchaseCard.vue'

const decision = ref<'approved' | 'discarded' | null>(null)

const statusLabel = computed(() => {
  if (decision.value === 'approved')
    return 'Approved'
  if (decision.value === 'discarded')
    return 'Discarded'
  return 'Pending Approval'
})

const handleApprove = () => {
  decision.value = 'approved'
}

const handleDiscard = () => {
  decision.value = 'discarded'
}
</script>

<template>
  <div class="flex min-h-screen w-full items-center justify-center p-6">
    <div class="flex w-full max-w-6xl flex-col gap-8 lg:flex-row">
      <!-- Left side - Purchase Details -->
      <div class="flex flex-1 flex-col gap-6">
        <div class="flex flex-col gap-2">
          <h1 class="text-3xl font-bold">Software Purchase Request</h1>
          <p class="text-muted-foreground">
            Review and approve the software purchase details below
          </p>
        </div>

        <Separator />

        <div class="flex flex-col gap-6">
          <div>
            <h2 class="mb-4 text-xl font-semibold">Purchase Details</h2>
            <div class="grid gap-4">
              <div class="flex flex-col gap-1.5">
                <span class="text-sm font-medium">Software Name</span>
                <span class="text-muted-foreground">
                  Enterprise Cloud Suite
                </span>
              </div>
              <div class="flex flex-col gap-1.5">
                <span class="text-sm font-medium">Vendor</span>
                <span class="text-muted-foreground">
                  CloudTech Solutions Inc.
                </span>
              </div>
              <div class="flex flex-col gap-1.5">
                <span class="text-sm font-medium">License Type</span>
                <span class="text-muted-foreground">
                  Commercial License
                </span>
              </div>
              <div class="flex flex-col gap-1.5">
                <span class="text-sm font-medium">Contract Duration</span>
                <span class="text-muted-foreground">12 months</span>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h2 class="mb-4 text-xl font-semibold">
              Billing Information
            </h2>
            <div class="grid gap-4">
              <div class="flex flex-col gap-1.5">
                <span class="text-sm font-medium">Billing Cycle</span>
                <span class="text-muted-foreground">Monthly</span>
              </div>
              <div class="flex flex-col gap-1.5">
                <span class="text-sm font-medium">Payment Method</span>
                <span class="text-muted-foreground">
                  Corporate Credit Card
                </span>
              </div>
              <div class="flex flex-col gap-1.5">
                <span class="text-sm font-medium">Cost Center</span>
                <span class="text-muted-foreground">
                  Engineering Department
                </span>
              </div>
              <div class="flex flex-col gap-1.5">
                <span class="text-sm font-medium">Annual Total</span>
                <span class="text-muted-foreground font-semibold">
                  $30,000
                </span>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h2 class="mb-4 text-xl font-semibold">
              Additional Information
            </h2>
            <div class="grid gap-4">
              <div class="flex flex-col gap-1.5">
                <span class="text-sm font-medium">Requested By</span>
                <span class="text-muted-foreground">
                  John Smith (Engineering Manager)
                </span>
              </div>
              <div class="flex flex-col gap-1.5">
                <span class="text-sm font-medium">Request Date</span>
                <span class="text-muted-foreground">
                  December 28, 2024
                </span>
              </div>
              <div class="flex flex-col gap-1.5">
                <span class="text-sm font-medium">Status</span>
                <Badge variant="secondary" class="w-fit">
                  {{ statusLabel }}
                </Badge>
              </div>
              <div class="flex flex-col gap-1.5">
                <span class="text-sm font-medium">Justification</span>
                <p class="text-muted-foreground text-sm leading-relaxed">
                  This software is critical for our cloud infrastructure
                  management and will enable the engineering team to scale
                  operations more efficiently. The per-seat pricing model
                  aligns with our team growth projections for Q1 2025.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right side - Software Purchase Card -->
      <div class="flex items-start justify-center lg:sticky lg:top-6 lg:h-fit lg:w-[400px]">
        <SoftwarePurchaseCard
          software-name="Enterprise Cloud Suite"
          start-date="2025-01-15"
          :seats="50"
          pricing-type="per-seat"
          price="$2,500"
          @approve="handleApprove"
          @discard="handleDiscard"
        />
      </div>
    </div>
  </div>
</template>
