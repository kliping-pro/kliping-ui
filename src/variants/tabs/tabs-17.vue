<script lang="ts">
export const description = "Tegak di dalam kotak bergaris, tiap tab dipisahkan garis."
</script>

<script setup lang="ts">
import { Bot, Settings, User } from '@lucide/vue'
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const tabs = [
  {
    value: "profile",
    icon: User,
  },
  {
    value: "chat",
    icon: Bot,
  },
  {
    value: "settings",
    icon: Settings,
  },
]
</script>

<template>
  <Tabs
    class="flex w-full flex-row items-start justify-center gap-2"
    :default-value="tabs[0].value"
    orientation="vertical"
  >
    <TabsList class="flex h-auto shrink-0 flex-col divide-y border p-0">
      <TabsTrigger v-for="item in tabs"
        :class="cn(
          'h-10 rounded-none bg-background px-2.5 py-2 first:rounded-t-md last:rounded-b-md',
          'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground'
        )"
        :key="item.value"
        :value="item.value"
      >
        <component :is="item.icon" class="h-5 w-5" />
      </TabsTrigger>
    </TabsList>

    <div class="flex aspect-14/9 w-full max-w-60 grow items-center justify-center rounded-lg border p-6">
      <TabsContent v-for="item in tabs" :key="item.value" :value="item.value">
        <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <component :is="item.icon" />
        </div>
        <p class="mt-4 text-center font-medium text-lg text-muted-foreground capitalize tracking-tight">
          {{ item.value }}
        </p>
      </TabsContent>
    </div>
  </Tabs>
</template>
