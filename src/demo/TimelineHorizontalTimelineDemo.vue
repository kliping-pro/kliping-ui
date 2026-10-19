<!-- example: 1. Horizontal Timeline -->
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
  { id: 'research-and-planning', dateTime: '2025-01', date: 'Jan - Mar', title: 'Q1', description: 'Research and planning' },
  { id: 'development-sprint', dateTime: '2025-04', date: 'Apr - Jun', title: 'Q2', description: 'Development sprint' },
  { id: 'beta-launch', dateTime: '2025-07', date: 'Jul - Sep', title: 'Q3', description: 'Beta launch' },
]
</script>

<template>
  <Timeline orientation="horizontal" :active-index="1" class="w-full">
    <TimelineItem v-for="item in timelineItems" :key="item.id">
      <TimelineDot />
      <TimelineConnector />
      <TimelineContent>
        <TimelineHeader>
          <TimelineTitle>{{ item.title }}</TimelineTitle>
          <TimelineTime :datetime="item.dateTime">{{ item.date }}</TimelineTime>
        </TimelineHeader>
        <TimelineDescription>{{ item.description }}</TimelineDescription>
      </TimelineContent>
    </TimelineItem>
  </Timeline>
</template>
