<script lang="ts">
export const description = "Berdiri tegak di kiri, isinya di kanan."
</script>

<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const tabs = [
  {
    name: "Home",
    value: "home",
  },
  {
    name: "Profile",
    value: "profile",
  },
  {
    name: "Messages",
    value: "messages",
  },
  {
    name: "Settings",
    value: "settings",
  },
]
</script>

<template>
  <Tabs
    class="flex w-full max-w-md flex-row items-start justify-center gap-4"
    :default-value="tabs[0].value"
    orientation="vertical"
  >
    <TabsList class="grid h-auto w-fit shrink-0 grid-cols-1 gap-1">
      <TabsTrigger v-for="tab in tabs" class="ps-2.5" :key="tab.value" :value="tab.value">
        {{ tab.name }}
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
