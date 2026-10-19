<!-- example: 2. RTL Timeline -->
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
  { id: 'registration-opened', dateTime: '2025-01-01', date: 'January 1, 2025', title: 'Registration Opened', description: 'Online registration portal opens.' },
  { id: 'early-bird-deadline', dateTime: '2025-02-15', date: 'February 15, 2025', title: 'Early Bird Deadline', description: 'Last day for early bird pricing.' },
  { id: 'event-day', dateTime: '2025-03-01', date: 'March 1, 2025', title: 'Event Day', description: 'Main event begins at 9:00 AM.' },
]
</script>

<template>
  <Timeline dir="rtl" :active-index="1" class="w-full max-w-md">
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
