<script lang="ts">
export const description = "Bilah bawah ponsel: ikon di atas namanya, empat kolom."
</script>

<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import BunLogo from '@/variants/tabs/components/BunLogo.vue'
import NpmLogo from '@/variants/tabs/components/NpmLogo.vue'
import PnpmLogo from '@/variants/tabs/components/PnpmLogo.vue'
import YarnLogo from '@/variants/tabs/components/YarnLogo.vue'

/**
 * Di sumbernya ikon tiap tab berupa JSX yang disimpan langsung di dalam data.
 * Di Vue yang disimpan komponennya, dan templatenya menggambarnya lewat
 * `<component :is>`.
 */
const tabs = [
  { name: 'pnpm', value: 'pnpm', icon: PnpmLogo },
  { name: 'npm', value: 'npm', icon: NpmLogo },
  { name: 'yarn', value: 'yarn', icon: YarnLogo },
  { name: 'bun', value: 'bun', icon: BunLogo },
]
</script>

<template>
  <Tabs class="w-full max-w-xs" :default-value="tabs[0].value">
    <TabsList class="grid w-full grid-cols-4 justify-start rounded-none bg-background py-0">
      <TabsTrigger
        v-for="tab in tabs"
        :key="tab.value"
        class="flex h-full flex-col rounded-none border-transparent border-b-2 bg-background py-2 data-[state=active]:border-primary data-[state=active]:shadow-none [&>svg]:h-5 [&>svg]:w-5 [&>svg]:shrink-0"
        :value="tab.value"
      >
        <component :is="tab.icon" />
        <code class="mt-0.5 text-[13px]">{{ tab.name }}</code>
      </TabsTrigger>
    </TabsList>
  </Tabs>
</template>
