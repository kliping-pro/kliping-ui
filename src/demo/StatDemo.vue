<script setup lang="ts">
import { TrendingDown, TrendingUp, Users } from '@lucide/vue'
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
      <StatLabel>Visitors this month</StatLabel>
      <StatValue>128,430</StatValue>
      <StatIndicator color="success" variant="icon">
        <Users />
      </StatIndicator>
      <StatSeparator />
      <StatTrend trend="up">
        <TrendingUp /> 12.4% from last month
      </StatTrend>
      <StatDescription>Counted from unique sessions.</StatDescription>
    </Stat>

    <Stat>
      <StatLabel>Average load time</StatLabel>
      <StatValue>1.8s</StatValue>
      <StatIndicator color="warning" variant="badge">
        p75
      </StatIndicator>
      <StatSeparator />
      <StatTrend trend="down">
        <TrendingDown /> 0.3s slower
      </StatTrend>
      <StatDescription>Measured on mobile devices.</StatDescription>
    </Stat>
  </div>
</template>
