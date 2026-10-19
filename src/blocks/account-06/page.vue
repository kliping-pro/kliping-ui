<script lang="ts">
export const description = "Tabel preferensi notifikasi dengan switch Email, Push, dan SMS per aktivitas."
</script>

<script setup lang="ts">
import { BellIcon, MailIcon, MessageSquareIcon, SmartphoneIcon } from '@lucide/vue'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'

const TABLE_HEAD = [
  { label: "Activity", icon: BellIcon },
  { label: "Email", icon: MailIcon },
  { label: "Push", icon: SmartphoneIcon },
  { label: "SMS", icon: MessageSquareIcon },
]

const NOTIFICATIONS = [
  {
    title: "Mentions",
    description: "Notify when another user mentions you in a comment",
    category: "Social",
    email: true,
    push: false,
    sms: true,
  },
  {
    title: "Comments",
    description: "Notify when another user comments on your item",
    category: "Social",
    email: true,
    push: false,
    sms: true,
  },
  {
    title: "New Follower",
    description: "Notify when someone starts following you",
    category: "Social",
    email: false,
    push: true,
    sms: false,
  },
  {
    title: "Login Activity",
    description: "Alert when logging in from a new device or location",
    category: "Security",
    email: true,
    push: true,
    sms: true,
  },
  {
    title: "Password Changed",
    description: "Immediate notification when password is updated",
    category: "Security",
    email: true,
    push: true,
    sms: true,
  },
  {
    title: "Product Updates",
    description: "Get notified about new features and improvements",
    category: "Product",
    email: true,
    push: false,
    sms: false,
  },
]

const rowClasses = (index: number) =>
  index === NOTIFICATIONS.length - 1 ? "py-6" : "border-border border-b py-6"
</script>

<template>
  <div class="mx-auto max-w-5xl p-6">
    <Card class="bg-card border p-8">
      <div class="border-b pb-6">
        <h2 class="text-2xl font-semibold tracking-tight">
          Notification Preferences
        </h2>
        <p class="text-muted-foreground mt-2 text-sm">
          Customize how you receive notifications. These settings apply to all
          activities you're monitoring across the platform.
        </p>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full min-w-[40rem] table-auto text-left">
          <thead>
            <tr class="border-b">
              <th
                v-for="(head, i) in TABLE_HEAD"
                :key="head.label"
                :class="`${
                  i === 0 ? 'py-4 pr-4' : 'p-4 text-center'
                } font-semibold`"
              >
                <div
                  :class="`flex items-center gap-2 ${
                    i !== 0 ? 'justify-center' : ''
                  }`"
                >
                  <component :is="head.icon" class="text-muted-foreground h-4 w-4" />
                  <span class="text-sm">{{ head.label }}</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(notification, index) in NOTIFICATIONS"
              :key="notification.title"
              class="group hover:bg-muted/50"
            >
              <td :class="`${rowClasses(index)} pr-4`">
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <p class="font-semibold">{{ notification.title }}</p>
                    <span class="text-muted-foreground rounded-full border px-2 py-0.5 text-xs">
                      {{ notification.category }}
                    </span>
                  </div>
                  <p class="text-muted-foreground text-sm">
                    {{ notification.description }}
                  </p>
                </div>
              </td>
              <td :class="`${rowClasses(index)} px-4`">
                <div class="flex justify-center">
                  <Switch
                    :id="`email-${index}`"
                    :default-value="notification.email"
                    :aria-label="`Email notifications for ${notification.title}`"
                  />
                </div>
              </td>
              <td :class="`${rowClasses(index)} px-4`">
                <div class="flex justify-center">
                  <Switch
                    :id="`push-${index}`"
                    :default-value="notification.push"
                    :aria-label="`Push notifications for ${notification.title}`"
                  />
                </div>
              </td>
              <td :class="`${rowClasses(index)} px-4`">
                <div class="flex justify-center">
                  <Switch
                    :id="`sms-${index}`"
                    :default-value="notification.sms"
                    :aria-label="`SMS notifications for ${notification.title}`"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="bg-muted/50 mt-6 rounded-lg border p-4">
        <div class="flex items-start gap-3">
          <BellIcon class="text-muted-foreground mt-0.5 h-5 w-5" />
          <div>
            <h4 class="mb-1 text-sm font-medium">
              About Notification Delivery
            </h4>
            <p class="text-muted-foreground text-sm">
              Email notifications are sent instantly. Push notifications
              require the mobile app. SMS notifications may incur carrier
              charges. You can change these settings at any time.
            </p>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>
