<script setup lang="ts">
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CopyIcon,
  FileIcon,
  FolderIcon,
} from '@lucide/vue'
import { useClipboard } from '@vueuse/core'
import { withBase } from 'vitepress'
import { computed, ref, watch } from 'vue'
import { Button } from '@/components/ui/button'

/**
 * Tab Code sebuah block: pohon berkas di kiri, satu berkas di kanan — meniru
 * shadcn-vue. Dipakai BlockViewer di halaman kategori dan BlockDetail di
 * halaman satu block.
 *
 * Kodenya diambil dari `/code/blocks/<name>.json` dan `/code/blocks/<name>/<n>.html`
 * — berkas statis yang sudah disorot saat build oleh `scripts/generate-code.mjs` —
 * dan baru saat `active` pertama kali benar. Selama pembaca cuma melihat
 * pratinjaunya, tidak ada satu byte pun kode yang diambil.
 *
 * Jalur dan impornya sudah ditulis ulang ke bentuk yang diterima pemakai —
 * `pages/dashboard/index.vue`, `@/components/AppSidebar.vue` — bukan jalur di
 * dalam repo ini.
 */
const props = withDefaults(defineProps<{
  name: string
  active: boolean
  /**
   * Folder manifesnya di bawah `/code/` — `blocks`, `variants`, `charts`,
   * `hooks`, atau `templates`.
   * Varian dan grafik cuma satu berkas, dan sorotannya sudah ada untuk halaman
   * live-nya; manifesnya menunjuk ke sana lewat `file` alih-alih menyorotnya
   * dua kali.
   */
  folder?: string
}>(), { folder: 'blocks' })

interface CodeFile {
  /** Jalur berkasnya di project pemakai. */
  path: string
  n: number
  /** Berkas tersorot milik halaman lain yang dipakai ulang, relatif terhadap `/code/`. */
  file?: string
}

const files = ref<CodeFile[]>([])
const selected = ref(0)
const highlighted = ref<Record<number, string>>({})
const loading = ref(false)
const failed = ref(false)

/**
 * Mengambil daftar berkasnya sekali, saat tab Kode pertama kali dibuka, lalu
 * berkas pertamanya — halamannya.
 *
 * Dipanggil dari `watch` di bawah, bukan dari `onMounted`: satu halaman galeri
 * memuat sampai delapan belas block, dan mengambil kode kedelapan belasnya
 * saat halaman dibuka berarti membayar penuh untuk sesuatu yang mungkin tidak
 * pernah dilihat.
 */
async function loadFiles() {
  if (files.value.length || loading.value)
    return

  loading.value = true
  try {
    const response = await fetch(withBase(`/code/${props.folder}/${props.name}.json`))
    if (!response.ok)
      throw new Error(String(response.status))
    files.value = (await response.json()) as CodeFile[]
    await select(0)
  }
  catch {
    failed.value = true
  }
  finally {
    loading.value = false
  }
}

/** Menampilkan satu berkas; sorotannya diambil sekali lalu disimpan. */
async function select(n: number) {
  selected.value = n
  if (highlighted.value[n])
    return
  try {
    const file = files.value.find(b => b.n === n)?.file
    const response = await fetch(withBase(file ? `/code/${file}` : `/code/${props.folder}/${props.name}/${n}.html`))
    if (!response.ok)
      throw new Error(String(response.status))
    highlighted.value = { ...highlighted.value, [n]: await response.text() }
  }
  catch {
    failed.value = true
  }
}

watch(() => props.active, (active) => {
  if (active)
    void loadFiles()
}, { immediate: true })

const activeFile = computed(() => files.value.find(b => b.n === selected.value))

/**
 * Pohon berkasnya, diratakan jadi baris-baris berkedalaman.
 *
 * Semua folder terbuka sejak awal, seperti di hulu. Baris yang foldernya
 * dilipat tidak digambar.
 */
const collapsed = ref(new Set<string>())

const rows = computed(() => {
  const result: { kind: 'folder' | 'file', name: string, key: string, depth: number, n?: number }[] = []
  const seen = new Set<string>()
  for (const b of files.value) {
    const parts = b.path.split('/')
    for (let i = 0; i < parts.length - 1; i++) {
      const key = parts.slice(0, i + 1).join('/')
      if (!seen.has(key)) {
        seen.add(key)
        result.push({ kind: 'folder', name: parts[i], key, depth: i })
      }
    }
    result.push({ kind: 'file', name: parts.at(-1)!, key: b.path, depth: parts.length - 1, n: b.n })
  }
  return result.filter(r => ![...collapsed.value].some(f => r.key.startsWith(`${f}/`)))
})

function toggleFolder(key: string) {
  const next = new Set(collapsed.value)
  if (next.has(key))
    next.delete(key)
  else
    next.add(key)
  collapsed.value = next
}

const codePanel = ref<HTMLElement>()
const { copy: copyCode, copied: codeCopied } = useClipboard()

function copyFile() {
  const text = codePanel.value?.querySelector('pre code')?.textContent
  if (text)
    void copyCode(text)
}
</script>

<template>
  <div class="kliping-block-code flex overflow-hidden rounded-lg border bg-(--code)">
    <aside class="hidden w-72 shrink-0 flex-col border-r md:flex">
      <div class="text-muted-foreground flex h-12 shrink-0 items-center border-b px-4 text-sm font-medium">
        Files
      </div>
      <ul class="flex flex-1 flex-col gap-0.5 overflow-auto p-2 text-sm">
        <li v-for="r in rows" :key="r.key">
          <button
            v-if="r.kind === 'folder'"
            type="button"
            class="flex h-8 w-full items-center gap-2 rounded-lg pr-3 text-left transition-colors hover:bg-pill"
            :style="{ paddingLeft: `${8 + r.depth * 20}px` }"
            @click="toggleFolder(r.key)"
          >
            <ChevronRightIcon v-if="collapsed.has(r.key)" class="text-muted-foreground size-4 shrink-0" />
            <ChevronDownIcon v-else class="text-muted-foreground size-4 shrink-0" />
            <FolderIcon class="size-4 shrink-0" />
            <span class="truncate">{{ r.name }}</span>
          </button>
          <button
            v-else
            type="button"
            class="flex h-8 w-full items-center gap-2 rounded-lg pr-3 text-left transition-colors"
            :class="r.n === selected ? 'bg-pill text-foreground font-medium' : 'hover:bg-pill'"
            :style="{ paddingLeft: `${8 + r.depth * 20 + 24}px` }"
            @click="select(r.n!)"
          >
            <FileIcon class="size-4 shrink-0" />
            <span class="truncate">{{ r.name }}</span>
          </button>
        </li>
      </ul>
    </aside>

    <div class="flex min-w-0 flex-1 flex-col">
      <div class="flex h-12 shrink-0 items-center gap-2 border-b px-4 text-sm">
        <FileIcon class="size-4 shrink-0" />
        <span class="hidden truncate font-medium md:inline">{{ activeFile?.path }}</span>
        <!-- Di layar sempit pohon berkasnya tidak muat; pilihannya pindah ke sini. -->
        <select
          v-if="files.length"
          class="min-w-0 flex-1 truncate bg-transparent text-base font-medium outline-none md:hidden"
          :value="selected"
          aria-label="File"
          @change="select(Number(($event.target as HTMLSelectElement).value))"
        >
          <option v-for="b in files" :key="b.n" :value="b.n">
            {{ b.path }}
          </option>
        </select>
        <Button
          variant="ghost"
          size="icon"
          class="ml-auto size-7 shrink-0"
          :aria-label="codeCopied ? 'Copied' : 'Copy code'"
          @click="copyFile"
        >
          <CheckIcon v-if="codeCopied" />
          <CopyIcon v-else />
        </Button>
      </div>

      <div ref="codePanel" class="min-h-0 flex-1 overflow-auto">
        <div v-if="highlighted[selected]" class="vp-doc" v-html="highlighted[selected]" />
        <p v-else-if="failed" class="text-muted-foreground px-4 py-6 text-sm">
          Failed to load the code. Reload the page to try again.
        </p>
        <p v-else class="text-muted-foreground px-4 py-6 text-sm">
          Loading code…
        </p>
      </div>
    </div>
  </div>
</template>
