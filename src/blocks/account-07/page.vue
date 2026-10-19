<script lang="ts">
export const description = "Daftar sesi aktif per perangkat dengan lokasi, waktu, dan tombol hapus."
</script>

<script setup lang="ts">
import {
  ClockIcon,
  ComputerIcon,
  GlobeIcon,
  ShieldCheckIcon,
  SmartphoneIcon,
  XIcon,
} from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const ACTIVE_SESSIONS = [
  {
    id: 1,
    type: "Laptop",
    icon: ComputerIcon,
    location: "New York, USA",
    coordinates: "40.7128° N, 74.0060° W",
    isCurrent: true,
    lastActive: "2 hours ago",
    browser: "Chrome 114.0",
    os: "macOS 13.4",
  },
  {
    id: 2,
    type: "Smartphone",
    icon: SmartphoneIcon,
    location: "Florida, USA",
    coordinates: "27.9944° N, 81.7603° W",
    isCurrent: false,
    lastActive: "Yesterday at 3:45 PM",
    browser: "Safari 16.5",
    os: "iOS 16.5",
  },
  {
    id: 3,
    type: "Desktop",
    icon: ComputerIcon,
    location: "Tokyo, Japan",
    coordinates: "35.6895° N, 139.6917° E",
    isCurrent: false,
    lastActive: "3 days ago",
    browser: "Firefox 112.0",
    os: "Windows 11",
  },
]
</script>

<template>
  <div class="mx-auto max-w-5xl p-6">
    <Card class="bg-card border p-8">
      <div class="border-b pb-6">
        <div class="flex items-center gap-3">
          <div class="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
            <ShieldCheckIcon class="text-primary h-6 w-6" />
          </div>
          <div>
            <h2 class="text-2xl font-semibold tracking-tight">
              Active Sessions
            </h2>
            <p class="text-muted-foreground mt-1 text-sm">
              Manage and monitor devices that have access to your account
            </p>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div
          v-for="(session, index) in ACTIVE_SESSIONS"
          :key="session.id"
          :class="`flex items-center justify-between gap-6 py-4 ${
            index !== ACTIVE_SESSIONS.length - 1 ? 'border-border border-b' : ''
          }`"
        >
          <div class="flex items-center gap-4">
            <div
              class="bg-muted/50 flex h-12 w-12 items-center justify-center rounded-lg"
            >
              <component
                :is="session.icon"
                :class="`h-6 w-6 ${session.isCurrent ? 'text-primary' : 'text-muted-foreground'}`"
              />
            </div>

            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <h4 class="font-semibold">{{ session.type }} Session</h4>
                <Badge
                  v-if="session.isCurrent"
                  variant="outline"
                  class="border-green-500 bg-green-50 text-green-700"
                >
                  Current Session
                </Badge>
              </div>

              <div class="text-muted-foreground space-y-1 text-sm">
                <div class="flex items-center gap-2">
                  <GlobeIcon class="h-4 w-4" />
                  <span>{{ session.location }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <ClockIcon class="h-4 w-4" />
                  <span>Last active: {{ session.lastActive }}</span>
                </div>
                <div>
                  {{ session.browser }} on {{ session.os }}
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <Button v-if="!session.isCurrent" variant="destructive" size="sm">
              <XIcon class="mr-2 h-4 w-4" />
              Remove
            </Button>
          </div>
        </div>
      </div>

      <div class="bg-muted/50 mt-6 rounded-lg border p-4">
        <div class="flex items-start gap-3">
          <ShieldCheckIcon class="mt-0.5 h-5 w-5 text-blue-500" />
          <div>
            <h4 class="mb-1 text-sm font-medium">Security Tip</h4>
            <p class="text-muted-foreground text-sm">
              If you notice any suspicious activity, immediately remove the
              session and change your account password. Enable two-factor
              authentication for additional security.
            </p>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>
