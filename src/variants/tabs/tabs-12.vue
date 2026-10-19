<script lang="ts">
export const description = "Tab miring, dipisahkan jarak."
</script>

<script setup lang="ts">
import { Copy } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const tabs = [
  {
    name: "pnpm",
    value: "pnpm",
    content: "pnpm dlx shadcn@latest add tabs",
  },
  {
    name: "npm",
    value: "npm",
    content: "npx shadcn@latest add tabs",
  },
  {
    name: "yarn",
    value: "yarn",
    content: "npx shadcn@latest add tabs",
  },
  {
    name: "bun",
    value: "bun",
    content: "bunx --bun shadcn@latest add tabs",
  },
]
</script>

<template>
  <Tabs class="w-full max-w-68" :default-value="tabs[0].value">
    <TabsList class="w-full justify-start gap-2 rounded-none border-b bg-background p-0">
      <TabsTrigger v-for="tab in tabs"
        class="h-full -skew-x-12 rounded-none border border-transparent border-b-[3px] bg-background data-[state=active]:border-primary data-[state=active]:shadow-none"
        :key="tab.value"
        :value="tab.value"
      >
        <code class="text-[13px]">{{ tab.name }}</code>
      </TabsTrigger>
    </TabsList>

    <TabsContent v-for="tab in tabs" :key="tab.value" :value="tab.value">
      <div class="-ml-2 flex h-10 -skew-x-12 items-center justify-between gap-2 border pr-1.5 pl-3">
        <code class="max-w-[33ch] overflow-hidden text-ellipsis whitespace-nowrap text-[13px]">
          {{ tab.content }}
        </code>
        <Button
          class="h-7 w-7 shrink-0 rounded-none"
          size="icon"
          variant="secondary"
        >
          <Copy class="h-3.5! w-3.5!" />
        </Button>
      </div>
    </TabsContent>
  </Tabs>
</template>
