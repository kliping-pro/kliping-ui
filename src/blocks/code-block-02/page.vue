<script lang="ts">
export const description = "Blok kode berkepala dengan nama berkas dan tombol salin."
</script>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CodeBlockHeader from '@/blocks/code-block-02/components/CodeBlockHeader.vue'
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

const html = ref('')

onMounted(async () => {
  html.value = await highlightCode(code)
})
</script>

<template>
  <div class="flex min-h-dvh items-center justify-center px-6">
    <div class="w-full max-w-2xl rounded-lg border border-border/70 bg-muted/70 p-1 pt-0">
      <CodeBlockHeader :code="code" />
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
