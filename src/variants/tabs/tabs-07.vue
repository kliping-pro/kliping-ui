<script lang="ts">
export const description = "Tab berikon logo pengelola paket."
</script>

<script setup lang="ts">
import { Copy } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import BunLogo from '@/variants/tabs/components/BunLogo.vue'
import NpmLogo from '@/variants/tabs/components/NpmLogo.vue'
import PnpmLogo from '@/variants/tabs/components/PnpmLogo.vue'
import YarnLogo from '@/variants/tabs/components/YarnLogo.vue'

/**
 * Di sumbernya ikon tiap tab berupa JSX yang disimpan langsung di dalam data.
 * Di Vue yang disimpan komponennya, dan templatenya menggambarnya lewat
 * `<component :is>` — bentuk yang sama gunanya, tanpa menaruh potongan
 * tampilan di tempat data.
 */
const tabs = [
  { name: 'pnpm', value: 'pnpm', content: 'pnpm dlx kliping@latest add tabs', icon: PnpmLogo },
  { name: 'npm', value: 'npm', content: 'npx kliping@latest add tabs', icon: NpmLogo },
  { name: 'yarn', value: 'yarn', content: 'yarn dlx kliping@latest add tabs', icon: YarnLogo },
  { name: 'bun', value: 'bun', content: 'bunx --bun kliping@latest add tabs', icon: BunLogo },
]
</script>

<template>
  <Tabs class="w-full max-w-xs" :default-value="tabs[0].value">
    <TabsList class="h-auto flex-wrap p-1 sm:h-9 group-data-horizontal/tabs:h-9">
      <TabsTrigger
        v-for="tab in tabs"
        :key="tab.value"
        class="px-2.5 sm:px-3"
        :value="tab.value"
      >
        <code class="flex items-center gap-1 text-[13px] [&>svg]:h-4 [&>svg]:w-4">
          <component :is="tab.icon" /> {{ tab.name }}
        </code>
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
