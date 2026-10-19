<script lang="ts">
export const description = "Potongan kode tersorot, satu blok polos di tengah halaman."
</script>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { highlightCode } from '@/lib/highlight-code'
import { cn } from '@/lib/utils'

// Contohnya Vue, bukan TSX seperti di sumbernya. Block ini dipasang orang yang
// sedang membangun antarmuka Vue; memperlihatkan komponen React di dalamnya
// akan aneh sekaligus tidak berguna.
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

// Disorot setelah terpasang, bukan saat disusun: penyorotnya cuma ada di
// peramban, dan memanggilnya saat render server akan menggantung build.
onMounted(async () => {
  html.value = await highlightCode(code)
})
</script>

<template>
  <div class="flex min-h-dvh items-center justify-center px-6">
    <div
      :class="cn(
        'grid w-full max-w-2xl',
        '[&>pre]:overflow-auto [&>pre]:rounded-lg [&>pre]:border [&>pre]:border-border/50 [&>pre]:p-6 [&>pre]:text-sm [&>pre]:leading-[1.6] not-dark:[&>pre]:!bg-muted/60 dark:[&>pre]:border-border/80',
      )"
      v-html="html"
    />
  </div>
</template>
