<script setup lang="ts">
import { withBase } from 'vitepress'
import { computed } from 'vue'
import { Badge } from '@/components/ui/badge'
import hookSnippets from '@/registry/hook-snippets.json'
import hookGallery from '@/registry/hook-gallery.json'
import { hookCategories } from './hooks'

/**
 * Isi satu halaman kategori Hooks (`/hooks/state`, `/hooks/browser`, …).
 *
 * Datanya dari `hooks.ts`, sumber yang sama dengan halaman All dan
 * pencariannya. Halaman Kelas B dan Paket Luar tidak punya entri registry
 * karena memang tidak ada berkas yang dipasang; keduanya ditandai supaya
 * pembaca tahu sebelum mengkliknya.
 *
 * Thumbnail tiap kartu adalah jendela terminal berisi cuplikan pemakaiannya,
 * meniru shadcn.io. Cuplikannya ditulis tangan di `src/composables/snippets.json`
 * dan sudah disorot saat build, jadi yang dikirim ke peramban cuma HTML-nya.
 */
const props = defineProps<{ category: string }>()

const k = computed(() => hookCategories.find(x => x.slug === props.category))

const snippets = hookSnippets as Record<string, string>

/**
 * Kartu membuka pratinjau penuhnya — demo selebar layar, seperti block — kalau
 * composable-nya punya demo; dokumentasinya satu tab dari sana. Halaman
 * padanan tanpa demo langsung membuka dokumentasinya.
 */
const target = (name: string) => (name in hookGallery.demo ? `/hooks/${name}/preview` : `/hooks/${name}`)

/** Nama berkasnya di project pemakai, seperti yang dipasang CLI. */
const fileName = (name: string) => (name.startsWith('use-') ? `${name}.ts` : `lib/${name}.ts`)
</script>

<template>
  <section v-if="k" class="not-prose flex flex-col gap-4">
    <p class="text-muted-foreground text-sm">
      {{ k.items.length }} {{ k.items.length === 1 ? 'composable' : 'composables' }}
    </p>

    <!-- Nama composable adalah satu kata panjang. Kolomnya dikunci ke lebar
         wadah (`grid-cols-1`, bukan kolom implisit yang ikut melebar), dan
         namanya dipotong dengan elipsis kalau tidak muat di samping lencananya. -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <a
        v-for="i in k.items"
        :key="i.name"
        :href="withBase(target(i.name))"
        class="group flex min-w-0 flex-col kliping-card overflow-hidden no-underline"
      >
        <!-- Selalu gelap, di tema apa pun: ini potret editor, bukan bagian halaman. -->
        <div class="flex aspect-[16/9] flex-col bg-[#0d1117] text-[#e6edf3]">
          <div class="flex h-7 shrink-0 items-center gap-1.5 border-white/10 border-b px-3">
            <span class="size-2 rounded-full bg-[#ff5f57]" />
            <span class="size-2 rounded-full bg-[#febc2e]" />
            <span class="size-2 rounded-full bg-[#28c840]" />
            <span class="ml-2 truncate font-mono text-[10px] text-white/40">{{ fileName(i.name) }}</span>
          </div>
          <div class="flex min-h-0 flex-1 items-center overflow-hidden px-4">
            <pre
              class="kliping-snippet m-0 w-full overflow-hidden bg-transparent p-0 font-mono text-[11px] leading-[1.6] break-words whitespace-pre-wrap"
            ><code v-html="snippets[i.name] ?? ''" /></pre>
          </div>
        </div>
        <div class="flex flex-col gap-1 p-3">
          <div class="flex items-center gap-2">
            <span class="min-w-0 flex-1 truncate font-mono text-sm font-medium text-foreground">{{ i.title }}</span>
            <Badge v-if="i.explanationOnly" variant="secondary" class="shrink-0 text-[10px]">
              no install
            </Badge>
            <Badge v-else variant="outline" class="shrink-0 font-mono text-[10px] text-muted-foreground uppercase tracking-wide">
              {{ k.name }}
            </Badge>
          </div>
          <p class="text-muted-foreground line-clamp-2 text-xs">
            {{ i.description ?? 'Lihat halamannya untuk padanan Vue-nya.' }}
          </p>
        </div>
      </a>
    </div>
  </section>
</template>
