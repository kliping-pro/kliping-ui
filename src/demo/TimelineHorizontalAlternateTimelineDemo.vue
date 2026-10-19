<!-- example: 4. Horizontal Alternate Timeline -->
<script setup lang="ts">
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

const timelineItems = [
  { id: 'company-founded', dateTime: '2023-06', date: 'June 2023', title: 'Company Founded', description: 'Started with a team of five.' },
  { id: 'series-a-funding', dateTime: '2024-03', date: 'March 2024', title: 'Series A Funding', description: 'Raised $10M seed funding.' },
  { id: 'product-launch', dateTime: '2025-01', date: 'January 2025', title: 'Product Launch', description: 'Released MVP to beta testers.' },
]
</script>

<template>
  <Timeline variant="alternate" orientation="horizontal" :active-index="1" class="w-full">
    <TimelineItem v-for="item in timelineItems" :key="item.id">
      <TimelineDot />
      <TimelineConnector />
      <TimelineContent>
        <TimelineHeader>
          <TimelineTime :datetime="item.dateTime">{{ item.date }}</TimelineTime>
          <TimelineTitle>{{ item.title }}</TimelineTitle>
        </TimelineHeader>
        <TimelineDescription>{{ item.description }}</TimelineDescription>
      </TimelineContent>
    </TimelineItem>
  </Timeline>
</template>
