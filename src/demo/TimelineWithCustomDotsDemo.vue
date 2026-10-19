<!-- example: 5. With Custom Dots -->
<script setup lang="ts">
import { Code, Layers, Rocket } from '@lucide/vue'
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
  { id: 'project-kickoff', dateTime: '2025-01-15', date: 'January 15, 2025', title: 'Project Kickoff', description: 'Initial meeting to define scope.', icon: Rocket },
  { id: 'design-phase', dateTime: '2025-02-01', date: 'February 1, 2025', title: 'Design Phase', description: 'Created wireframes and mockups.', icon: Layers },
  { id: 'development', dateTime: '2025-03-01', date: 'March 1, 2025', title: 'Development', description: 'Building core features.', icon: Code },
]
</script>

<template>
  <Timeline :active-index="1" class="w-full max-w-md [--timeline-dot-size:2rem]">
    <TimelineItem v-for="item in timelineItems" :key="item.id">
      <TimelineDot>
        <component :is="item.icon" class="size-3.5" />
      </TimelineDot>
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
