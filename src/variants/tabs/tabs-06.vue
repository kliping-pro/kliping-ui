<script lang="ts">
export const description = "Tab berbentuk map arsip yang menyatu dengan isinya."
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
  <Tabs class="w-full max-w-xs" :default-value="tabs[0].value">
    <TabsList class="w-full justify-start rounded-none border-b bg-background p-0">
      <TabsTrigger v-for="tab in tabs"
        class="-mb-0.5 h-full rounded-none rounded-t border border-b-border bg-background group-data-[variant=default]/tabs-list:rounded-b-none group-data-[variant=default]/tabs-list:data-active:border-border group-data-[variant=default]/tabs-list:data-active:border-b-background group-data-[variant=default]/tabs-list:data-active:shadow-none"
        :key="tab.value"
        :value="tab.value"
      >
        <code class="text-[13px]">{{ tab.name }}</code>
      </TabsTrigger>
    </TabsList>

    <TabsContent v-for="tab in tabs" :key="tab.value" :value="tab.value">
      <div class="flex min-h-10 items-center justify-between gap-2 rounded-md border py-1 pr-1.5 pl-3">
        <code class="text-[13px]">{{ tab.content }}</code>
        <Button class="h-7 w-7" size="icon" variant="secondary">
          <Copy class="h-3.5! w-3.5!" />
        </Button>
      </div>
    </TabsContent>
  </Tabs>
</template>
