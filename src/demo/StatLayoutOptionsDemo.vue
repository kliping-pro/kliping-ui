<!-- example: 2. Layout Options -->
<script setup lang="ts">
import { ArrowUp, Users } from '@lucide/vue'
import {
  Stat,
  StatDescription,
  StatIndicator,
  StatLabel,
  StatSeparator,
  StatTrend,
  StatValue,
} from '@/components/stat'
</script>

<template>
  <div class="grid w-full gap-4 sm:grid-cols-2">
    <Stat>
      <StatLabel>Active Subscribers</StatLabel>
      <StatValue>2,847</StatValue>
      <StatIndicator variant="icon" color="success">
        <Users />
      </StatIndicator>
      <StatDescription>Total number of active subscribers as of today</StatDescription>
    </Stat>

    <Stat>
      <StatLabel>Monthly Revenue</StatLabel>
      <StatValue>$12,450</StatValue>
      <StatIndicator variant="icon" color="info">
        <ArrowUp />
      </StatIndicator>
      <StatSeparator />
      <StatTrend trend="up">
        <ArrowUp />
        +15.3% from last month
      </StatTrend>
      <StatDescription>Revenue generated in the current billing period</StatDescription>
    </Stat>
  </div>
</template>
