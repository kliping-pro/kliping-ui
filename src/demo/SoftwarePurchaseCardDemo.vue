<script setup lang="ts">
import { ref } from 'vue'
import { SoftwarePurchaseCard } from '@/components/software-purchase-card'

const status = ref<'pending' | 'approved' | 'discarded'>('pending')
</script>

<template>
  <div class="flex w-full flex-col items-center gap-3">
    <SoftwarePurchaseCard
      software-name="Design Suite Pro"
      start-date="2026-11-01"
      :seats="25"
      pricing-type="per-seat"
      price="$1,250"
      @approve="status = 'approved'"
      @discard="status = 'discarded'"
    />
    <p class="text-muted-foreground text-sm">
      Status: <span class="font-medium text-foreground">{{ status }}</span>
    </p>
  </div>
</template>
