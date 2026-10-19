<script setup lang="ts">
import { ArrowUpRightIcon, SearchIcon } from '@lucide/vue'
import { computed, ref } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { registries } from '@/lib/registries'

/**
 * Daftar registry komunitas yang sudah tertanam di CLI.
 *
 * Di upstream ini `::registry-directory`, sebuah komponen MDC yang menarik
 * datanya lewat API registry milik aplikasi Nuxt. Skrip konversi membuangnya,
 * dan halaman Direktori kehilangan seluruh daftarnya.
 *
 * Di sini datanya berupa berkas TypeScript biasa yang ikut dibundel saat build,
 * dan penyaringannya berjalan di peramban atas daftar yang sudah ada — tidak
 * ada permintaan jaringan sama sekali.
 */
const query = ref('')
const activeTag = ref<string | null>(null)

const allTags = computed(() => {
  const tag = new Set<string>()
  for (const r of registries) r.tags?.forEach(t => tag.add(t))
  return [...tag].sort()
})

const results = computed(() => {
  const term = query.value.trim().toLowerCase()
  return registries.filter((r) => {
    const matchesTag = !activeTag.value || r.tags?.includes(activeTag.value)
    const matchesTerm = !term
      || r.title.toLowerCase().includes(term)
      || r.name.toLowerCase().includes(term)
      || r.description.toLowerCase().includes(term)
    return matchesTag && matchesTerm
  })
})
</script>

<template>
  <div class="not-prose my-6 flex flex-col gap-4">
    <!-- Pencarian mengambil satu baris penuh: dijajarkan dengan deretan tag,
         tag-nya melipat jadi dua baris dan kotak pencariannya tergencet. -->
    <div class="relative">
      <SearchIcon class="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
      <Input v-model="query" placeholder="Search registries…" class="w-full pl-9" />
    </div>

    <div class="flex flex-wrap items-center gap-1.5">
      <button
        v-for="tag in allTags"
        :key="tag"
        type="button"
        @click="activeTag = activeTag === tag ? null : tag"
      >
        <Badge :variant="activeTag === tag ? 'default' : 'secondary'" class="cursor-pointer">
          {{ tag }}
        </Badge>
      </button>
    </div>

    <div class="grid gap-3 sm:grid-cols-2">
      <a
        v-for="r in results"
        :key="r.name"
        :href="r.homepage"
        target="_blank"
        rel="noreferrer"
        class="kliping-card flex flex-col gap-2 p-4 no-underline!"
      >
        <div class="flex items-center gap-2">
          <!-- eslint-disable-next-line vue/no-v-html -- markup logo berasal dari berkas data di repo ini, bukan dari masukan pembaca -->
          <span v-if="r.logo" class="text-foreground inline-flex size-5 items-center justify-center [&>svg]:size-5" v-html="r.logo" />
          <span class="text-foreground font-medium">{{ r.title }}</span>
          <ArrowUpRightIcon class="text-muted-foreground ml-auto size-4" />
        </div>
        <code class="text-muted-foreground w-fit text-xs">{{ r.name }}</code>
        <p class="text-muted-foreground m-0 text-sm">
          {{ r.description }}
        </p>
      </a>
    </div>

    <p v-if="!results.length" class="text-muted-foreground text-sm">
      No registries found.
    </p>
  </div>
</template>
