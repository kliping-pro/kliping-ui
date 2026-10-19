<script lang="ts">
export const description = "Angka di samping judul tab."
</script>

<script setup lang="ts">
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const tabs = [
  {
    name: "Profile",
    value: "profile",
  },
  {
    name: "Projects",
    value: "projects",
    count: "10",
  },
  {
    name: "Messages",
    value: "messages",
    count: "5",
  },
  {
    name: "Settings",
    value: "settings",
  },
]
</script>

<template>
  <Tabs :default-value="tabs[0].value">
    <TabsList class="h-auto flex-wrap sm:h-9">
      <TabsTrigger v-for="feature in tabs" :key="feature.value" :value="feature.value">
        {{ feature.name }}
        <Badge v-if="feature.count" class="min-w-5.5 px-1">{{ feature.count }}</Badge>
      </TabsTrigger>
    </TabsList>
  </Tabs>
</template>
