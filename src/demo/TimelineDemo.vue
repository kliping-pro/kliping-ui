<script setup lang="ts">
import { Check, CircleDashed, Loader2 } from '@lucide/vue'
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineDot,
  TimelineHeader,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from '@/components/timeline'

const steps = [
  { title: 'Order placed', time: '09:12', description: 'Payment confirmed.' },
  { title: 'Packing', time: '10:40', description: 'Items are being prepared at the Denver warehouse.' },
  { title: 'In transit', time: '13:05', description: 'The courier is on the way to your address.' },
  { title: 'Delivered', time: '—', description: 'Awaiting delivery.' },
]
</script>

<template>
  <Timeline :active-index="2" class="w-full max-w-md">
    <TimelineItem v-for="(step, i) in steps" :key="step.title">
      <TimelineDot>
        <Check v-if="i < 2" class="size-2.5" />
        <Loader2 v-else-if="i === 2" class="size-2.5 animate-spin" />
        <CircleDashed v-else class="size-2.5" />
      </TimelineDot>
      <TimelineConnector />
      <TimelineContent>
        <TimelineHeader>
          <TimelineTitle>{{ step.title }}</TimelineTitle>
          <TimelineTime>{{ step.time }}</TimelineTime>
        </TimelineHeader>
        <TimelineDescription>{{ step.description }}</TimelineDescription>
      </TimelineContent>
    </TimelineItem>
  </Timeline>
</template>
