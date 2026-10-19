<script lang="ts">
export const description = "Blok kode bertab, satu tab per berkas."
</script>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { highlightCode } from '@/lib/highlight-code'
import { cn } from '@/lib/utils'

const code = `<script setup lang="ts">
const user = {
  name: 'John Doe',
  role: 'Frontend Developer',
  experience: '2+ years',
}
<\/script>

<template>
  <div class="rounded-lg border p-4">
    <h2 class="text-lg font-semibold">{{ user.name }}</h2>
    <p>{{ user.role }}</p>
    <p class="text-sm text-muted-foreground">
      Experience: {{ user.experience }}
    </p>
  </div>
</template>
`

const files = ['ProfileCard.vue', 'profile.ts', 'App.vue']

const html = ref('')

onMounted(async () => {
  html.value = await highlightCode(code)
})
</script>

<template>
  <div class="flex min-h-dvh items-center justify-center px-6">
    <div class="w-full max-w-2xl rounded-lg border border-border/70 bg-muted/70 p-1 pt-0">
      <Tabs default-value="ProfileCard.vue">
        <!-- Ketiga nama berkas baru muat sebaris mulai ±360px. Di bawah sm
             deretnya boleh membungkus ke baris kedua (tinggi tabnya dikunci
             karena h-full tab tidak berlaku pada daftar h-auto) alih-alih
             memotong nama berkas terakhir. -->
        <TabsList
          :class="cn(
            'max-w-full items-end justify-start gap-2 rounded-none bg-transparent pb-0 ps-2 pt-0.5 max-sm:h-auto max-sm:min-h-9 max-sm:flex-wrap max-sm:gap-y-0 max-sm:*:h-8.25 max-sm:*:flex-none',
            '*:rounded-none *:border-0 *:border-b-2 *:text-muted-foreground',
            '*:data-active:border-foreground *:data-active:bg-transparent *:data-active:text-foreground *:data-active:!shadow-none',
          )"
        >
          <TabsTrigger v-for="b in files" :key="b" :value="b">
            {{ b }}
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div
        :class="cn(
          'grid',
          '[&>pre]:overflow-auto [&>pre]:rounded-lg [&>pre]:border [&>pre]:border-border/70 [&>pre]:p-6 [&>pre]:text-sm [&>pre]:leading-[1.6] dark:[&>pre]:border-border/80',
        )"
        v-html="html"
      />
    </div>
  </div>
</template>
