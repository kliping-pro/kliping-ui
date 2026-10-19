<script setup lang="ts">
import { Stack, StackItem } from '@/components/stack'

const notifications = [
  { title: 'File uploaded', body: 'august-report.pdf finished uploading.' },
  { title: 'New comment', body: 'Olivia mentioned you in a discussion.' },
  { title: 'Deployment complete', body: 'Version 1.4.0 is live.' },
  { title: 'Invoice sent', body: "This month's invoice has been sent." },
  { title: 'Backup created', body: 'The daily backup has been saved.' },
]
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-4">
    <p class="text-muted-foreground text-sm">
      Hover over the stack to expand it.
    </p>

    <div class="h-56">
      <Stack expand-on-hover :item-count="3">
        <StackItem v-for="notification in notifications" :key="notification.title">
          <p class="font-medium text-sm">
            {{ notification.title }}
          </p>
          <p class="text-muted-foreground text-sm">
            {{ notification.body }}
          </p>
        </StackItem>
      </Stack>
    </div>
  </div>
</template>
