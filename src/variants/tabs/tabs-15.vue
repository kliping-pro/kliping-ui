<script lang="ts">
export const description = "Tegak dengan tab aktif diisi warna utama."
</script>

<script setup lang="ts">
import { Bot, Home, Settings, User } from '@lucide/vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const tabs = [
  {
    name: "Home",
    value: "home",
    icon: Home,
  },
  {
    name: "Profile",
    value: "profile",
    icon: User,
  },
  {
    name: "Messages",
    value: "messages",
    icon: Bot,
  },
  {
    name: "Settings",
    value: "settings",
    icon: Settings,
  },
]
</script>

<template>
  <Tabs
    class="flex w-full max-w-md flex-row items-start justify-center gap-4"
    :default-value="tabs[0].value"
    orientation="vertical"
  >
    <TabsList class="grid shrink-0 grid-cols-1 gap-1 bg-background p-0">
      <TabsTrigger v-for="tab in tabs"
        class="justify-start px-3 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        :key="tab.value"
        :value="tab.value"
      >
        <component :is="tab.icon" class="me-2 h-5 w-5" /> {{ tab.name }}
      </TabsTrigger>
    </TabsList>

    <div class="flex h-40 w-full max-w-xs items-center justify-center rounded-md border font-medium text-muted-foreground">
      <TabsContent v-for="tab in tabs"
        class="flex h-full items-center justify-center"
        :key="tab.value"
        :value="tab.value"
      >
        {{ tab.name }} Content
      </TabsContent>
    </div>
  </Tabs>
</template>
