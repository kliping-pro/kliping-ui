<!-- example: 1. Variants -->
<script setup lang="ts">
import { DollarSign, TrendingUp } from '@lucide/vue'
import { Stat, StatIndicator, StatLabel, StatTrend, StatValue } from '@/components/stat'
</script>

<template>
  <div class="grid w-full gap-4 sm:grid-cols-2">
    <Stat>
      <StatLabel>Default Indicator</StatLabel>
      <StatValue>2,350</StatValue>
      <StatIndicator>
        <TrendingUp />
      </StatIndicator>
    </Stat>

    <Stat>
      <StatLabel>Icon Variant</StatLabel>
      <StatValue>$45,231</StatValue>
      <StatIndicator variant="icon" color="success">
        <DollarSign />
      </StatIndicator>
    </Stat>

    <Stat>
      <StatLabel>Badge Variant</StatLabel>
      <StatValue>1,234</StatValue>
      <StatIndicator variant="badge" color="info">
        +24
      </StatIndicator>
    </Stat>

    <Stat>
      <StatLabel>Warning Color</StatLabel>
      <StatValue>89%</StatValue>
      <StatIndicator variant="icon" color="warning">
        <TrendingUp />
      </StatIndicator>
      <StatTrend trend="down">
        Capacity threshold reached
      </StatTrend>
    </Stat>
  </div>
</template>
