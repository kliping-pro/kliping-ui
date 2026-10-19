<!-- example: 1. Stacked Banners -->
<script setup lang="ts">
import type { BannerVariant } from '@/components/banner'
import { AlertCircle, CheckCircle, Info, ServerCrash, Sparkles, TriangleAlert } from '@lucide/vue'
import { ref } from 'vue'
import {
  ANIMATION_DURATION,
  Banner,
  BannerActions,
  BannerClose,
  BannerContent,
  BannerDescription,
  BannerIcon,
  Banners,
  BannerTitle,
} from '@/components/banner'
import { Button } from '@/components/ui/button'

interface QueuedBanner {
  id: number
  kind: keyof typeof templates
}

const templates = {
  info: { variant: 'info', priority: 0, icon: Info, title: 'Information', description: 'This is an informational message.' },
  success: { variant: 'success', priority: 0, icon: CheckCircle, title: 'Success!', description: 'Your changes have been saved successfully.' },
  warning: { variant: 'warning', priority: 0, icon: TriangleAlert, title: 'Warning', description: 'Please review your changes before continuing.' },
  destructive: { variant: 'destructive', priority: 0, icon: AlertCircle, title: 'Action required', description: 'Your session is about to expire. Please save your work.' },
  version: { variant: 'info', priority: 0, icon: Sparkles, title: 'New version available', description: 'Version 2.0 is now available with exciting new features.' },
  outage: { variant: 'destructive', priority: 10, icon: ServerCrash, title: 'System outage', description: 'Some services are currently unavailable. We\'re working on it.' },
} satisfies Record<string, { variant: BannerVariant, priority: number, icon: unknown, title: string, description: string }>

const queue = ref<QueuedBanner[]>([])
let nextId = 0

function add(kind: QueuedBanner['kind']) {
  queue.value = [...queue.value, { id: nextId++, kind }]
}

// Pita yang ditutup dilepas dari antrean setelah animasi keluarnya selesai.
function remove(id: number, immediately = false) {
  setTimeout(() => {
    queue.value = queue.value.filter(item => item.id !== id)
  }, immediately ? 0 : ANIMATION_DURATION)
}
</script>

<template>
  <div class="flex w-full flex-col gap-6">
    <Banners :max-visible="1" strategy="static" class="overflow-hidden rounded-md border empty:hidden">
      <Banner
        v-for="item in queue"
        :key="item.id"
        :variant="templates[item.kind].variant"
        :priority="templates[item.kind].priority"
        @dismiss="remove(item.id)"
      >
        <BannerIcon>
          <component :is="templates[item.kind].icon" />
        </BannerIcon>
        <BannerContent>
          <BannerTitle>{{ templates[item.kind].title }}</BannerTitle>
          <BannerDescription>{{ templates[item.kind].description }}</BannerDescription>
        </BannerContent>
        <BannerActions v-if="item.kind === 'warning'">
          <Button size="sm">
            Review
          </Button>
          <Button size="sm" variant="ghost" @click="remove(item.id, true)">
            Skip
          </Button>
        </BannerActions>
        <BannerActions v-else-if="item.kind === 'destructive' || item.kind === 'version'">
          <Button size="sm" :variant="item.kind === 'destructive' ? 'destructive' : 'default'">
            {{ item.kind === 'destructive' ? 'Save now' : 'Update' }}
          </Button>
          <BannerClose />
        </BannerActions>
        <BannerClose v-else />
      </Banner>
    </Banners>

    <div class="flex flex-col gap-2.5">
      <h3 class="text-base font-semibold">
        Stacked Banners ({{ queue.length }} in queue)
      </h3>
      <div class="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" @click="add('info')">
          Add Info
        </Button>
        <Button variant="outline" size="sm" @click="add('success')">
          Add Success
        </Button>
        <Button variant="outline" size="sm" @click="add('warning')">
          Add Warning
        </Button>
        <Button variant="outline" size="sm" @click="add('destructive')">
          Add Destructive
        </Button>
      </div>
    </div>
    <div class="flex flex-col gap-2.5">
      <h3 class="text-base font-semibold">
        Priority
      </h3>
      <div class="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" @click="add('version')">
          App Version (priority: 0)
        </Button>
        <Button variant="outline" size="sm" @click="add('outage')">
          System Health (priority: 10)
        </Button>
      </div>
      <div class="text-muted-foreground text-sm">
        Higher priority banners jump ahead in the queue.
        <br>
        Try adding the app version banner first, then the system health banner.
      </div>
    </div>
  </div>
</template>
