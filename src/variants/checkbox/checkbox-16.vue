<script lang="ts">
export const description = "Tabel pengaturan pemberitahuan, kepalanya menempel saat digulir."
</script>

<script setup lang="ts">
import {
  Bell,
  CalendarCheck,
  CalendarCog,
  CalendarPlus,
  CalendarX,
  type LucideIcon,
} from '@lucide/vue'
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from '@/components/ui/checkbox'

interface NotificationType {
  label: string;
  value: string;
  icon: LucideIcon;
}

const notificationTypes: NotificationType[] = [
  { label: "New Booking", value: "new-booking", icon: CalendarPlus },
  { label: "Booking Cancelled", value: "booking-cancelled", icon: CalendarX },
  { label: "Booking Updated", value: "booking-updated", icon: CalendarCog },
  { label: "Booking Reminder", value: "booking-reminder-1", icon: Bell },
  {
    label: "Booking Confirmation",
    value: "booking-confirmation",
    icon: CalendarCheck,
  },
  { label: "Payment Reminder", value: "payment-reminder", icon: Bell },
  { label: "Upcoming Reminder", value: "upcoming-reminder", icon: Bell },
]
</script>

<template>
  <div>
    <Label class="ps-1 font-medium">Notification Settings</Label>
    <div class="mt-2.5 rounded-lg border bg-muted/30">
      <ScrollArea class="h-64">
        <table class="w-full">
          <thead class="sticky top-0 z-1 rounded-t-lg bg-muted/80 backdrop-blur-sm">
            <tr class="rounded-t-lg border-b *:first:rounded-tl-lg *:last:rounded-tr-lg">
              <th class="p-3 text-left font-medium text-muted-foreground text-xs">
                Notification Type
              </th>
              <th class="w-16 p-3 font-medium text-muted-foreground text-xs">
                In-App
              </th>
              <th class="w-16 p-3 font-medium text-muted-foreground text-xs">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(notificationType, index) in notificationTypes"
              class="border-b last:border-b-0"
              :key="notificationType.value"
            >
              <td class="p-3">
                <div class="flex items-center gap-2.5">
                  <component :is="notificationType.icon" class="size-4 text-muted-foreground" />
                  <span class="text-sm">{{ notificationType.label }}</span>
                </div>
              </td>
              <td class="p-3 text-center">
                <Checkbox
                  class="bg-background"
                  :default-checked="index < 3"
                  :id="`${notificationType.value}-in-app`"
                  :value="`${notificationType.value}-in-app`"
                />
              </td>
              <td class="p-3 text-center">
                <Checkbox
                  class="bg-background"
                  :default-checked="index < 3"
                  :id="`${notificationType.value}-email`"
                  :value="`${notificationType.value}-email`"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </ScrollArea>
    </div>
  </div>
</template>
