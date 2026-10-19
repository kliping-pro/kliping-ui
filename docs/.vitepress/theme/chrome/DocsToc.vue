<script setup lang="ts">
import type { Header } from 'vitepress'
import { AlignLeftIcon } from '@lucide/vue'
import { useData, useRoute } from 'vitepress'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string, variant?: 'list' | 'menu' }>()

const { page, theme } = useData()
const route = useRoute()

const levels = computed<[number, number]>(() => {
  const level = theme.value.outline
  const value = typeof level === 'object' && level !== null && 'level' in level ? level.level : level
  if (Array.isArray(value))
    return [value[0], value[1]]
  if (value === 'deep')
    return [2, 6]
  if (typeof value === 'number')
    return [value, value]
  return [2, 3]
})

/**
 * Judul-judul halaman diratakan jadi satu deret.
 *
 * `page.headers` datang bersarang sesuai tingkatan judulnya. Yang digambar di
 * sini datar, dan kedalamannya cuma dipakai untuk menjorokkan teksnya — sama
 * seperti daftar isi di shadcn-vue.
 */
const headings = computed(() => {
  const result: Header[] = []
  const [min, max] = levels.value

  function walk(children: Header[]) {
    for (const h of children) {
      if (h.level >= min && h.level <= max)
        result.push(h)
      if (h.children)
        walk(h.children)
    }
  }

  walk(page.value.headers ?? [])
  return result
})

const label = computed(() =>
  typeof theme.value.outline === 'object' && theme.value.outline?.label
    ? theme.value.outline.label
    : 'On This Page',
)

const active = ref('')
let observer: IntersectionObserver | undefined

function observe() {
  observer?.disconnect()
  if (!headings.value.length)
    return

  // rootMargin bawah -80%: sebuah judul dihitung aktif begitu masuk pita
  // sempit di bagian atas layar, bukan saat baru menyentuh tepi bawah. Tanpa
  // itu, judul yang masih jauh di bawah sudah menyalakan penandanya.
  observer = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting)
        active.value = e.target.id
    }
  }, { rootMargin: '0% 0% -80% 0%' })

  for (const h of headings.value) {
    const el = document.getElementById(h.slug)
    if (el)
      observer.observe(el)
  }
}

onMounted(observe)
onBeforeUnmount(() => observer?.disconnect())
// Halaman berganti tanpa memuat ulang dokumen, jadi pengamatnya dipasang ulang
// setiap rute berubah — judul yang lama sudah tidak ada di dokumen.
watch(() => route.path, () => requestAnimationFrame(observe))
</script>

<template>
  <!--
    Di layar sempit daftar isi tidak muat di samping, dan ditumpuk di atas
    prosa ia mendorong isi halaman turun sebelum pembaca sempat membacanya.
    Jadi bentuknya jadi menu.
  -->
  <DropdownMenu v-if="props.variant === 'menu' && headings.length">
    <DropdownMenuTrigger as-child>
      <Button variant="outline" size="sm" :class="cn('h-8 gap-1.5', props.class)">
        <AlignLeftIcon class="size-3.5" />
        {{ label }}
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start" class="no-scrollbar max-h-[70svh] w-64">
      <DropdownMenuItem
        v-for="h in headings"
        :key="h.slug"
        as-child
        :data-depth="h.level"
        class="data-[depth=3]:pl-6"
      >
        <a :href="`${route.path}#${h.slug}`">{{ h.title }}</a>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  <div v-else-if="headings.length" :class="cn('flex flex-col gap-2 p-4 pt-0 text-sm', props.class)">
    <p class="bg-background text-muted-foreground h-6 text-xs font-medium">
      {{ label }}
    </p>
    <a
      v-for="h in headings"
      :key="h.slug"
      :href="`${route.path}#${h.slug}`"
      class="text-muted-foreground hover:text-foreground data-[active=true]:text-foreground text-[0.8rem] no-underline transition-colors data-[active=true]:font-medium data-[depth=3]:pl-4 data-[depth=4]:pl-6 data-[depth=5]:pl-8"
      :data-active="h.slug === active"
      :data-depth="h.level"
    >
      {{ h.title }}
    </a>
  </div>
</template>
